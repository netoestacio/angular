import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBandeiraTarifa} from '../../../../../contracts/IBandeiraTarifa';
import {BandeiraService} from '../../../../../services/bandeira.service';
import {MatSnackBar} from '@angular/material';
import {Pagina} from '../../../../../models/pagina';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-bandeira-ver',
  templateUrl: './bandeira-ver.component.html',
  styleUrls: ['./bandeira-ver.component.scss']
})
export class BandeiraVerComponent extends Pagina implements OnInit, OnDestroy {

    listaBandeiras: IBandeiraTarifa[] = [];
    bandeira: IBandeiraTarifa;
    bandeiraId: number;

    constructor( public bandeiraService: BandeiraService,
                 public roteador: Router,
                 public snackBar: MatSnackBar,
                 public rota: ActivatedRoute ) { super(); }

    ngOnInit() {

        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
            this.bandeiraId = parametros.get('id');
        });


        if (this.roteador.url.endsWith('ver')) {
            this.titulo = 'dados do cofins';
            this.bandeiraService
                .ver(this.bandeiraId)
                .subscribe(resp => {
                    this.bandeira = resp;
                    this.listaBandeiras.push(this.bandeira);
                });

        }

    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }

    carregarLista() {
        this.bandeiraService
            .listar()
            .subscribe(resp => this.listaBandeiras = resp );
    }


    exibirBandeira(valor) {
        let result: string;
        switch (valor) {
            case 1:
                result = 'Verde';
                break;
            case 2:
                result = 'Amarela';
                break;
            case 3:
                result = 'Vermelha I';
                break;
            case 4:
                result = 'Vermelha II';
                break;
        }
        return result;
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action , {
            duration: 2000,
        });
    }

}
