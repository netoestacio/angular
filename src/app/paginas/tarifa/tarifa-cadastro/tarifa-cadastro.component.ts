import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITarifa} from '../../../../contracts/ITarifa';
import {IModeloTarifario, IPrecoComponente, ModeloTarifarioComponente} from '../../../../contracts/IModeloTarifario';
import {ISubGrupoTarifario} from '../../../../contracts/ISubGrupoTarifario';
import {IResolucao} from '../../../../contracts/IResolucao';
import {Pagina} from '../../../../models/pagina';
import {TarifaService} from '../../../../services/tarifa.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IModalidadeTarifaria} from '../../../../contracts/IModalidadeTarifaria';
import {ComponenteFormulario, IComponenteTarifario} from '../../../../contracts/IComponenteTarifario';
import {ResolucaoService} from '../../../../services/resolucao.service';

@Component({
  selector: 'app-tarifa-cadastro',
  templateUrl: './tarifa-cadastro.component.html',
  styleUrls: ['./tarifa-cadastro.component.scss']
})
export class TarifaCadastroComponent extends Pagina implements OnInit, OnDestroy {

  titulo = 'Cadastro de Tarifa';
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

  tarifaId: number;

  isModelo = false;

  modeloTarifario: IModeloTarifario /* = new class implements IModeloTarifario {
    descricao: string;
    id: number;
    modalidadeTarifariaId: number;
    modeloTarifarioComponentes: ModelTarifa[];
    subgrupoTarifarioId: number;
  } */

  modalidadeId: number;
  resolucaoId: number;
  subgrupoId: number;

  subGrupo: ISubGrupoTarifario = new class implements ISubGrupoTarifario {
    descricao: string;
    id: number;
  };

  componente1: IComponenteTarifario;

  modeloId: number;

  kwhp: number;
  kwhfp: number;
  mwhp: number;
  mwhfp: number;

  mwh: number;

  listaSubgrupo: ISubGrupoTarifario[] = [];
  listaModalidade: IModalidadeTarifaria[] = [];
  listaModeloTarifario: IModeloTarifario[] = [];
  listaResolucoes: IResolucao[] = [];

  bandeira_verde = 0;
  bandeira_amarela = 0;
  bandeira_vermelha1 = 0;
  bandeira_vermelha2 = 0;

  listaModelTarifa: ModeloTarifarioComponente[] = [];

  listaComponentes: IComponenteTarifario[] = [];
  listaPrecosTE: ComponenteFormulario[] = [];
  listaPrecosTUSD: ComponenteFormulario[] = [];
  listaPrecosPrev: IPrecoComponente[] = [];



  valor: number;

  constructor(  public tarifaService: TarifaService,
                public resolucaoService: ResolucaoService,
                public roteador: Router,
                public toastr: ToastrService,
                public rota: ActivatedRoute) { super(); }

  ngOnInit() {
    this.carregarLista();

    this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

    this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
      this.tarifaId = parametros.get('id');
    });


    if (this.roteador.url.endsWith('editar')) {
      this.tipoForm = 1;
      this.titulo = 'Editar a Tarifa';
      this.preencherFormulario();
    }


  }

  ngOnDestroy() {
    this.espectador.unsubscribe();
  }

  carregarLista() {
    this.resolucaoService
        .listar()
        .subscribe(resp => {
          this.listaResolucoes = resp;
        });

    this.tarifaService
        .listarSubGrupoTarifario()
        .subscribe(resp => this.listaSubgrupo = resp);

    this.tarifaService
        .listarModalidadeTarifaria()
        .subscribe(resp => this.listaModalidade = resp);

    this.tarifaService
        .listarModelosTarifarios()
        .subscribe(resp => {
          this.listaModeloTarifario = resp
        });
  }

  preencherModelo() {
    this.isModelo = true;
    this.listaPrecosTUSD = [];
    this.listaPrecosTE = [];
//    console.log(this.modeloId);
    this.tarifaService
        .verSubGrupoTarifario(this.subgrupoId)
        .subscribe(resp => this.subGrupo = resp);

    this.tarifaService
        .verModeloTarifario(this.modeloId)
        .subscribe( (resp: IModeloTarifario) => {
          this.modeloTarifario = resp;
          this.listaModelTarifa = resp.modeloTarifarioComponente;

          this.listaModelTarifa.forEach((x) => {

            this.tarifaService
                .verComponenteTarifario(x.componenteTarifarioId)
                .subscribe(res => {
                  this.listaComponentes.push(res);

                  let preco: ComponenteFormulario = new class implements ComponenteFormulario {
                    componente: IComponenteTarifario;
                    componenteTarifarioId: number;
                    ordem: number;
                    precoUnitario: number;
                    tamanho: number;
                  };
                  preco.componente = res;
                  preco.ordem = 1;
                  preco.tamanho = 0;
                  preco.componenteTarifarioId = res.id;
                  console.log(preco.componente.tipoComponenteTarifario);

                  if (preco.componente.tipoComponenteTarifario === 1) {
                    preco.precoUnitario = 0;
                    this.listaPrecosTE.push(preco);
                  } else {
                    this.listaPrecosTUSD.push(preco);
                  }

                });

          });

        });

  }

  preencherFormulario() {
    this.tarifaService
        .verTarifa(this.tarifaId)
        .subscribe(resp => {
          this.tarifa = resp;
          this.subgrupoId = resp.subgrupoTarifarioId;
          this.modalidadeId = resp.modalidadeTarifaria.id;
          this.resolucaoId = resp.resolucaoId;
          this.modeloId = resp.subgrupoTarifarioId;

          this.bandeira_verde = resp.adicionalBandeiraVerde;
          this.bandeira_amarela = resp.adicionalBandeiraAmarela;
          this.bandeira_vermelha1 = resp.adicionalBandeiraVermelhaP1;
          this.bandeira_vermelha2 = resp.adicionalBandeiraVermelhaP2;

            for (let i = 0 ; i < this.tarifa.precos.length; i++) {
              let preco: ComponenteFormulario = new class implements ComponenteFormulario {
                componente: IComponenteTarifario;
                componenteTarifarioId: number;
                ordem: number;
                precoUnitario: number;
                tamanho: number;
              };
                  const x: IPrecoComponente = this.tarifa.precos[i];

                  this.tarifaService
                        .verComponenteTarifario(x.componenteTarifarioId)
                        .subscribe(res => {
                          preco.componente = res;
                        });
                  setTimeout( () => {
                    preco.precoUnitario = this.tarifa.precos[i].precoUnitario;
                    preco.tamanho = this.tarifa.precos[i].tamanho;
                    preco.ordem = this.tarifa.precos[i].ordem;

                    if (preco.componente.tipoComponenteTarifario === 1) {
                      this.listaPrecosTE.push(preco);
                    } else {
                      this.listaPrecosTUSD.push(preco);
                    }
                    this.isModelo = true;
                  }, 200 );

            }


        });
  }


  calculoBandeira(valor: number, tipo: number): number {
    let resultado: number;
    if (valor !== 0) {
      switch (tipo) {
        case 1:
          resultado = valor + this.bandeira_verde;
          break;
        case 2:
          resultado = valor + this.bandeira_amarela;
          break;
        case 3:
          resultado = valor + this.bandeira_vermelha1;
          break;
        case 4:
          resultado = valor + this.bandeira_vermelha2;
          break;
      }
    } else {
      resultado = 0;
    }

    return resultado;
  }


  salvar() {

    if (this.tipoForm === 1) {
      const tarifaReq = this.preencherTarifa();

      console.log(JSON.stringify(tarifaReq));


      this.tarifaService
          .editarTarifa(this.tarifaId, tarifaReq)
          .subscribe(
              sucesso => {
                this.toastr.success('Editado com Sucesso', 'Sucesso!');
                setTimeout( () => {
                  this.roteador.navigate(['/tarifa']);
                }, 1500 );
              } ,
              erro => {
                console.log(erro);
                this.toastr.warning(erro, 'Error!');
              }

          );


    } else {
      const tarifaReq = this.preencherTarifa();

      console.log(JSON.stringify(tarifaReq));

      this.tarifaService
          .criarTarifa(tarifaReq)
          .subscribe(
              sucesso => {
                this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');
                setTimeout( () => {
                  this.roteador.navigate(['/tarifa']);
                }, 1500 );
              } ,
              erro => {
                console.log(erro);
                this.toastr.warning(erro, 'Error!');
              }

          );
    }


  }

  preencherTarifa(): TarifaModel {

    for (let x  = 0; x < this.listaPrecosTE.length; x++) {

      let precoPrev: IPrecoComponente = new class implements IPrecoComponente {
        componenteTarifarioId: number;
        ordem: number;
        precoUnitario: number;
        tamanho: number;
      };
      console.log(this.listaPrecosTE[x].componente.id);
      precoPrev.componenteTarifarioId = this.listaPrecosTE[x].componente.id;
      precoPrev.ordem = this.listaPrecosTE[x].ordem;
      precoPrev.precoUnitario = this.listaPrecosTE[x].precoUnitario;
      precoPrev.tamanho = this.listaPrecosTE[x].tamanho;

      this.listaPrecosPrev.push(precoPrev);
    }

    for (let x  = 0; x < this.listaPrecosTUSD.length; x++) {

      let precoPrev2: IPrecoComponente = new class implements IPrecoComponente {
        componenteTarifarioId: number;
        ordem: number;
        precoUnitario: number;
        tamanho: number;
      };

      console.log(this.listaPrecosTUSD[x].componente.id);
      precoPrev2.componenteTarifarioId = this.listaPrecosTUSD[x].componente.id;
      precoPrev2.ordem = this.listaPrecosTUSD[x].ordem;
      precoPrev2.precoUnitario = this.listaPrecosTUSD[x].precoUnitario;
      precoPrev2.tamanho = this.listaPrecosTUSD[x].tamanho;

      this.listaPrecosPrev.push(precoPrev2);
    }

    let tarifaTeste: TarifaModel = new class implements TarifaModel {
      id: number;
      modalidadeTarifariaId: number;
      modeloTarifarioId: number;
      adicionalBandeiraVerde: number;
      adicionalBandeiraAmarela: number;
      adicionalBandeiraVermelhaP1: number;
      adicionalBandeiraVermelhaP2: number;
      precos: IPrecoComponente[];
      resolucaoId: number;
      subgrupoTarifarioId: number;
    }

    if (this.tarifa.id != null) {
      tarifaTeste.id = this.tarifa.id;
    }
    tarifaTeste.modalidadeTarifariaId = this.modalidadeId;
    tarifaTeste.modeloTarifarioId = this.modeloId;
    tarifaTeste.subgrupoTarifarioId = this.subgrupoId;
    tarifaTeste.resolucaoId = this.resolucaoId;
    tarifaTeste.adicionalBandeiraVerde = this.bandeira_verde;
    tarifaTeste.adicionalBandeiraAmarela = this.bandeira_amarela;
    tarifaTeste.adicionalBandeiraVermelhaP1 = this.bandeira_vermelha1;
    tarifaTeste.adicionalBandeiraVermelhaP2 = this.bandeira_vermelha2;
    tarifaTeste.precos = this.listaPrecosPrev;

   // console.log(JSON.stringify(tarifaTeste));

    return tarifaTeste;
  }

}

export interface TarifaModel {
  id: number;
  modalidadeTarifariaId: number;
  modeloTarifarioId: number;
  resolucaoId: number;
  adicionalBandeiraVerde: number;
  adicionalBandeiraAmarela: number;
  adicionalBandeiraVermelhaP1: number;
  adicionalBandeiraVermelhaP2: number;
  subgrupoTarifarioId: number;
  precos: IPrecoComponente[];
}

