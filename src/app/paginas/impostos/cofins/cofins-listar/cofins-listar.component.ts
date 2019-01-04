import { Component, OnInit } from '@angular/core';
import {IPisPasep} from '../../../../../contracts/IPisPasep';
import {IConcessionaria} from '../../../../../contracts/IConcessionaria';
import {ImpostoService} from '../../../../../services/imposto.service';
import {ConcessionariasService} from '../../../../../services/concessionarias.service';
import {MatSnackBar} from '@angular/material';
import {ICofins} from '../../../../../contracts/ICofins';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cofins-listar',
  templateUrl: './cofins-listar.component.html',
  styleUrls: ['./cofins-listar.component.scss']
})
export class CofinsListarComponent implements OnInit {


    listaCofins: ICofins[] = [];
    listaConcessionaria: IConcessionaria [] = [];

    constructor( public impostoService: ImpostoService ,
                 public concessionariaService: ConcessionariasService,
                 public toastr: ToastrService ) { }

    ngOnInit() {
        this.carregarLista();
    }

    carregarLista() {
        this.concessionariaService.listar().subscribe(resp => this.listaConcessionaria = resp);
        this.impostoService
            .listarCofins()
            .subscribe(resp => {
                this.listaCofins = resp;
            });
    }

    deletarPis(valorId: number) {
        this.impostoService.deletarCofins(valorId)
            .subscribe(
                sucesso => {
                    this.carregarLista();
                    this.toastr.success('Removido com Sucesso' , 'Sucesso!');
                },
                erro => {
                    this.toastr.warning(erro, 'Error!');
                }
            );

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
