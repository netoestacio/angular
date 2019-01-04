import {Component, OnDestroy, OnInit} from '@angular/core';
import {IConcessionaria} from '../../../../../contracts/IConcessionaria';
import {ICofins} from '../../../../../contracts/ICofins';
import {ImpostoService} from '../../../../../services/imposto.service';
import {ConcessionariasService} from '../../../../../services/concessionarias.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Pagina} from '../../../../../models/pagina';
import {IIcms} from '../../../../../contracts/IIcms';

@Component({
  selector: 'app-icms-ver',
  templateUrl: './icms-ver.component.html',
  styleUrls: ['./icms-ver.component.scss']
})
export class IcmsVerComponent extends Pagina implements OnInit, OnDestroy {

    titulo = 'Dados de ICMS';

    listaConcessionaria: IConcessionaria[] = [];
    listaIcms: IIcms[] = [];
    icms: IIcms;
    icmsID: number;



    constructor( public impostoService: ImpostoService,
                 public concessionariaService: ConcessionariasService,
                 public roteador: Router,
                 public snackBar: MatSnackBar,
                 public rota: ActivatedRoute) { super(); }


    ngOnInit() {
        this.concessionariaService
            .listar()
            .subscribe(resp => {
                this.listaConcessionaria = resp;
            });

        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
            this.icmsID = parametros.get('id');
        });


        if (this.roteador.url.endsWith('ver')) {
            this.titulo = 'dados do cofins';
            this.impostoService
                .verIcms(this.icmsID)
                .subscribe(resp => {
                    this.icms = resp;
                    this.listaIcms.push(this.icms);
                });

        }

    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }



    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action , {
            duration: 2000,
        });
    }


    exibirMes(valor: number) {
        let result: string;
        switch (valor) {
            case 1:
                result = 'Janeiro';
                break;
            case 2:
                result = 'Fevereiro';
                break;
            case 3:
                result = 'Março';
                break;
            case 4:
                result = 'Abril';
                break;
            case 5:
                result = 'Maio';
                break;
            case 6:
                result = 'Junho';
                break;
            case 7:
                result = 'Julho';
                break;
            case 8:
                result = 'Agosto';
                break;
            case 9:
                result = 'Setembro';
                break;
            case 10:
                result = 'Outubro';
                break;
            case 11:
                result = 'Novembro';
                break;
            case 12:
                result = 'Dezembro';
                break;
        }
        return result;
    }

    exibirNomeConcessionaria(valor: number): string {
        let nmConcessionaria = '';
        for (let x = 0; x < this.listaConcessionaria.length; x++) {
            const vr: IConcessionaria = this.listaConcessionaria[x];
            if (valor === vr.id) {
                nmConcessionaria = vr.nomeCurto;
                break;
            }
        }
        return nmConcessionaria;
    }

}
