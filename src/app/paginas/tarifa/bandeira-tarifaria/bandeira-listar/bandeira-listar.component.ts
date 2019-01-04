import { Component, OnInit } from '@angular/core';
import {IBandeiraTarifa} from '../../../../../contracts/IBandeiraTarifa';
import {BandeiraService} from '../../../../../services/bandeira.service';
import {MatSnackBar} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-bandeira-listar',
  templateUrl: './bandeira-listar.component.html',
  styleUrls: ['./bandeira-listar.component.scss']
})
export class BandeiraListarComponent implements OnInit {

  listaBandeiras: IBandeiraTarifa[] = [];

  constructor( public bandeiraService: BandeiraService,
               public toastr: ToastrService ) { }

  ngOnInit() {
    this.carregarLista();
  }

  carregarLista() {
    this.bandeiraService
        .listar()
        .subscribe(resp => this.listaBandeiras = resp );
  }

  deletarBandeira(valorId: number) {
    this.bandeiraService
        .remover(valorId)
        .subscribe(
            sucesso => {
                this.carregarLista();
                this.toastr.success('Removido com Sucesso', 'Sucesso!');
            },
            erro => {
                this.toastr.warning(erro, 'Error!');
            }
        );
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

   /* openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action , {
            duration: 2000,
        });
    }*/

}
