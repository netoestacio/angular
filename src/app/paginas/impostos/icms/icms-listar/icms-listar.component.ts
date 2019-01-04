import { Component, OnInit } from '@angular/core';
import {IIcms} from '../../../../../contracts/IIcms';
import {ImpostoService} from '../../../../../services/imposto.service';
import {MatSnackBar} from '@angular/material';
import {IConcessionaria} from '../../../../../contracts/IConcessionaria';
import {ConcessionariasService} from '../../../../../services/concessionarias.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-icms-listar',
  templateUrl: './icms-listar.component.html',
  styleUrls: ['./icms-listar.component.scss']
})
export class IcmsListarComponent implements OnInit {

    listaIcms: IIcms[] = [];
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
        .listarIcms()
        .subscribe(resp => {
                this.listaIcms = resp;
        });
  }

    deletarIcms(valorId: number) {
        this.impostoService.deletarIcms(valorId)
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
