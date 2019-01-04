import {Component, OnDestroy, OnInit} from '@angular/core';
import {TarifaService} from '../../../../../services/tarifa.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ISubGrupoTarifario} from '../../../../../contracts/ISubGrupoTarifario';
import {Pagina} from '../../../../../models/pagina';

@Component({
  selector: 'app-subgrupo-ver',
  templateUrl: './subgrupo-ver.component.html',
  styleUrls: ['./subgrupo-ver.component.scss']
})
export class SubgrupoVerComponent extends Pagina implements OnInit, OnDestroy {
    titulo  = 'Dados do SubGrupo';
    subgrupoId: number;
    listaSubgrupo: ISubGrupoTarifario[] = [];
    subGrupo: ISubGrupoTarifario;

  constructor( public tarifaService: TarifaService,
               public roteador: Router,
               public rota: ActivatedRoute ) { super(); }

    ngOnInit() {
        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
            this.subgrupoId = parametros.get('id');
        });


        if (this.roteador.url.endsWith('ver')) {

            this.carregarSelecionado();
        }


    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }

    carregarSelecionado() {
        this.tarifaService
            .verSubGrupoTarifario(this.subgrupoId)
            .subscribe(resp => {
                this.subGrupo = resp;
                this.listaSubgrupo.push(this.subGrupo);
            });
    }

}
