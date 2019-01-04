import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pagina} from '../../../../../models/pagina';
import {ModeloTarifaService} from '../../../../../services/modeloTarifa.service';
import {TarifaService} from '../../../../../services/tarifa.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ISubGrupoTarifario} from '../../../../../contracts/ISubGrupoTarifario';
import {IModalidadeTarifaria} from '../../../../../contracts/IModalidadeTarifaria';
import {IComponenteTarifario} from '../../../../../contracts/IComponenteTarifario';
import {IModeloTarifario} from '../../../../../contracts/IModeloTarifario';

@Component({
  selector: 'app-modelo-tarifario-ver',
  templateUrl: './modelo-tarifario-ver.component.html',
  styleUrls: ['./modelo-tarifario-ver.component.scss']
})
export class ModeloTarifarioVerComponent extends Pagina implements OnInit, OnDestroy{

  titulo = 'Dados do Modelo-Tarifário';
  modeloId: number;
  modelo: IModeloTarifario;
  listaSubgrupo: ISubGrupoTarifario[] = [];
  listaModalidade: IModalidadeTarifaria[] = [];
  listaComponentes: IComponenteTarifario[] = [];

  descricaoModelo: string;
  subGrupoNome: string;
  modalidadeNome: string;

  constructor( public modeloService: ModeloTarifaService,
               public tarifaService: TarifaService,
               public roteador: Router,
               public toastr: ToastrService,
               public rota: ActivatedRoute ) { super(); }

  ngOnInit() {
   // this.carregarListas();

    this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
      this.modeloId = parametros.get('id');
    });


    if (this.roteador.url.endsWith('ver')) {
      this.preencherModelo();
    }

  }
  ngOnDestroy(): void {
    this.espectador.unsubscribe();
  }


  preencherModelo() {
    this.modeloService
        .ver(this.modeloId)
        .subscribe(resp => {
          this.modelo = resp;
          this.descricaoModelo = this.modelo.descricao;
          this.subGrupoNome = this.modelo.subgrupoTarifario.descricao;
          this.modalidadeNome = this.modelo.modalidadeTarifaria.descricao;
          this.modelo.modeloTarifarioComponente.forEach( (x) => {
                this.tarifaService
                    .verComponenteTarifario(x.componenteTarifarioId)
                    .subscribe(res => {
                        this.listaComponentes.push(res);
                    });
          } );
        });
  }

  exibeTipo(valor: number): string {
    if (valor === 1) {
      return 'TUSD';
    } else {
      return 'TE';
    }
  }

}
