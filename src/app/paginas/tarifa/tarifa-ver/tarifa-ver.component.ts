import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pagina} from '../../../../models/pagina';

import {ActivatedRoute, Params, Router} from '@angular/router';

import {TarifaService} from '../../../../services/tarifa.service';
import {ITarifa} from '../../../../contracts/ITarifa';
import {IModeloTarifario, IPrecoComponente} from '../../../../contracts/IModeloTarifario';
import {IResolucao} from '../../../../contracts/IResolucao';
import {ISubGrupoTarifario} from '../../../../contracts/ISubGrupoTarifario';
import {IModalidadeTarifaria} from '../../../../contracts/IModalidadeTarifaria';
import {ComponenteFormulario, IComponenteTarifario} from '../../../../contracts/IComponenteTarifario';

@Component({
  selector: 'app-tarifa-ver',
  templateUrl: './tarifa-ver.component.html',
  styleUrls: ['./tarifa-ver.component.scss']
})
export class TarifaVerComponent extends Pagina implements OnInit, OnDestroy {

  titulo = '';
  tipoForm = 0;

  public tarifa: ITarifa = new class implements ITarifa {
    adicionalBandeiraAmarela: number;
    adicionalBandeiraVerde: number;
    adicionalBandeiraVermelhaP1: number;
    adicionalBandeiraVermelhaP2: number;
    id: number;
    modalidadeId: number;
    modalidadeTarifaria: IModalidadeTarifaria;
    modeloTarifario: IModeloTarifario;
    modeloTarifarioId: number;
    precos: IPrecoComponente[];
    resolucao: IResolucao;
    resolucaoId: number;
    subgrupoTarifario: ISubGrupoTarifario;
    subgrupoTarifarioId: number;
  };

  id: number;
  modalidadeTarifaria: IModalidadeTarifaria;
  modalidadeNome: string;
  modeloTarifario: IModeloTarifario;
  modeloNome: string;
  resolucao: IResolucao;
  resolucaoNumero: number;
  subgrupoTarifario: ISubGrupoTarifario;
  subgrupoNome: string;
  listaComponentes: PrecoBandeira[] = [];
  tarifaId: number;

  bandeiraVerde: number;
  bandeiraAmarelo: number;
  bandeiraVermelho1: number;
  bandeiraVermelho2: number;

  constructor(public tarifaService: TarifaService,
              public roteador: Router,
              public rota: ActivatedRoute) {
    super();
  }

  ngOnInit() {

    this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

    this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
      this.tarifaId = parametros.get('id');
    });


    if (this.roteador.url.endsWith('ver')) {
      this.titulo = 'Dados da Tarifa';
      this.tarifaService
          .verTarifa(this.tarifaId)
          .subscribe(resp => {
            console.log(JSON.stringify(resp));
            this.tarifa = resp;
            this.preencherTarifa(resp);
          });

    }

  }

  ngOnDestroy() {
    this.espectador.unsubscribe();
  }

  preencherTarifa(valor: ITarifa) {
    

    this.tarifaService.verSubGrupoTarifario(valor.subgrupoTarifarioId).subscribe(resp => {
      this.subgrupoTarifario = resp;
    });
    this.tarifaService.verModalidadeTarifaria(valor.modalidadeTarifaria.id).subscribe(resp => {
      this.modalidadeTarifaria = resp;
    });

    this.id = valor.id;
    this.modalidadeTarifaria = valor.modalidadeTarifaria;
    this.modalidadeNome = this.modalidadeTarifaria.descricao;
    this.resolucao = valor.resolucao;
    this.resolucaoNumero = valor.resolucao.numero;
    this.subgrupoTarifario = valor.subgrupoTarifario;
    this.subgrupoNome = this.subgrupoTarifario.descricao;
    this.bandeiraVerde = valor.adicionalBandeiraVerde;
    this.bandeiraAmarelo = valor.adicionalBandeiraAmarela;
    this.bandeiraVermelho1 = valor.adicionalBandeiraVermelhaP1;
    this.bandeiraVermelho2 = valor.adicionalBandeiraVermelhaP2;

    for (let i = 0; i < valor.precos.length; i++) {
      let preco: PrecoBandeira = new class implements PrecoBandeira {
       /* bandeiraAmarelo: number;
        bandeiraVerde: number;
        bandeiraVermelho1: number;
        bandeiraVermelho2: number; */
        componente: IComponenteTarifario;
        componenteTarifarioId: number;
        ordem: number;
        precoUnitario: number;
        tamanho: number;
      };

      const x: IPrecoComponente = valor.precos[i];

      this.tarifaService
          .verComponenteTarifario(x.componenteTarifarioId)
          .subscribe(res => {
            preco.componente = res;
          });
      setTimeout(() => {
        preco.precoUnitario = valor.precos[i].precoUnitario;
        preco.tamanho = valor.precos[i].tamanho;
        preco.ordem = valor.precos[i].ordem;
        this.listaComponentes.push(preco);
      }, 200);

    }

  }

  calculoBandeira(valor: number, tipo: number): number {
    let resultado = 0;
    switch (tipo) {
      case 1:
        resultado = valor + this.bandeiraVerde;
        break;
      case 2:
        resultado = valor + this.bandeiraAmarelo;
        break;
      case 3:
        resultado = valor + this.bandeiraVermelho1;
        break;
      case 4:
        resultado = valor + this.bandeiraVermelho2;
        break;
    }

    return resultado;
  }

}

export interface PrecoBandeira {
  componente: IComponenteTarifario;
  componenteTarifarioId: number;
  ordem: number;
  precoUnitario: number;
  tamanho: number;
/*  bandeiraVerde: number;
  bandeiraAmarelo: number;
  bandeiraVermelho1: number;
  bandeiraVermelho2: number; */
}
