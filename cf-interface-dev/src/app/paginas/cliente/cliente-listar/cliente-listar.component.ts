import { Component, OnInit } from '@angular/core';
import {ICliente} from '../../../../contracts/ICliente';
import {ClientesService} from '../../../../services/clientes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.scss']
})
export class ClienteListarComponent implements OnInit {

    listaClientes: ICliente[];

  constructor( private clientesService: ClientesService ) { }

  ngOnInit() {
    this.carregarLista();
  }

    carregarLista() {
      this.clientesService
          .listar()
          .subscribe(resp => {
            this.listaClientes = resp;
          });
    }

    deletar(id) {
        this.clientesService.deletar(id)
            .subscribe(
                sucesso => {
                   this.carregarLista();
                    console.log('OK');
                },
                erro => {
                    console.log(erro);
                }
            );
    }

    reloadView() {
        setTimeout( () => {
            window.location.reload();
        }, 1500 );
    }



}
