import { Component, OnInit } from '@angular/core';

import {IResolucao} from '../../../../../contracts/IResolucao';
import {ResolucaoService} from '../../../../../services/resolucao.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-resolucao-listar',
  templateUrl: './resolucao-listar.component.html',
  styleUrls: ['./resolucao-listar.component.scss']
})
export class ResolucaoListarComponent implements OnInit {

    listaResolucao: IResolucao[] = [];

  constructor( public resolucaoService: ResolucaoService,
               public toastr: ToastrService ) { }

  ngOnInit() {
    this.carregarLista();
  }

  carregarLista() {
    this.resolucaoService
        .listar()
        .subscribe(resp => this.listaResolucao = resp);
  }

  deletarResolucao(id: number) {
      this.resolucaoService
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
  }

}
