import { Component, OnInit } from '@angular/core';
import {IPerfil} from '../../../../contracts/IPerfil';
import {PerfilService} from '../../../../services/perfil.service';
import {MatSnackBar} from '@angular/material';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  public listaPerfis: IPerfil[] = [];

  constructor(public perfilService: PerfilService,
              public toastr: ToastrService ) { }

  ngOnInit() {
      this.carregarLista()
  }

  carregarLista() {
    this.perfilService
        .listar()
        .subscribe(resp => {
          this.listaPerfis = resp;
        });
  }

  excluirPerfil(id: number) {
      this.perfilService
          .remover(id)
          .subscribe(
              sucesso => {
                  this.carregarLista();
                  this.toastr.success('Removido com Sucesso', 'Sucesso!');
                  // this.openSnackBar('Removido com Sucesso' , '' );
              },
              erro => {
                  this.toastr.warning(erro, 'Error!');
                  // this.openSnackBar(erro , '' );
              }
          );

      // this.reloadView();

  }

    /*  openSnackBar(message: string, action: string) {
          this.snackBar.open(message, action , {
              duration: 2000,
          });
      }

      reloadView() {
          setTimeout( () => {
              window.location.reload();
          }, 1500 );
      } */

}
