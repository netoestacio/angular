import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISubGrupoTarifario} from '../../../../../contracts/ISubGrupoTarifario';
import {TarifaService} from '../../../../../services/tarifa.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pagina} from '../../../../../models/pagina';
import {IModalidadeTarifaria} from '../../../../../contracts/IModalidadeTarifaria';

@Component({
  selector: 'app-modalidade-ver',
  templateUrl: './modalidade-ver.component.html',
  styleUrls: ['./modalidade-ver.component.scss']
})
export class ModalidadeVerComponent extends Pagina implements OnInit, OnDestroy  {

    titulo = 'Dados da Modalidade';
    modalidadeId: number;
    listaModalidade: IModalidadeTarifaria[] = [];
    modalidade: IModalidadeTarifaria;

    constructor( public tarifaService: TarifaService,
                 public roteador: Router,
                 public rota: ActivatedRoute ) { super(); }

    ngOnInit() {
        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
            this.modalidadeId = parametros.get('id');
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
            .verModalidadeTarifaria(this.modalidadeId)
            .subscribe(resp => {
                this.modalidade = resp;
                this.listaModalidade.push(this.modalidade);
            });
    }


}
