import { Component, OnInit } from '@angular/core';
import {IPerfil} from '../../../../contracts/IPerfil';
import {PerfilService} from '../../../../services/perfil.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  public listaPerfis: IPerfil[] = [];

  constructor(public perfilService: PerfilService) { }

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
                  console.log('OK');
              },
              erro => {
                  console.log(erro);
              }
          );

      this.reloadView();

  }

    reloadView() {
        setTimeout( () => {
            window.location.reload();
        }, 1500 );
    }

}
