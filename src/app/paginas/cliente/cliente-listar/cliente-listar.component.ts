import { Component, OnInit } from '@angular/core';
import {ICliente} from '../../../../contracts/ICliente';
import {ClientesService} from '../../../../services/clientes.service';
import {IGestor} from '../../../../contracts/IGestor';
import {GestoresService} from '../../../../services/gestores.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.scss']
})
export class ClienteListarComponent implements OnInit {

    listaClientes: ICliente[];
    public gestores: IGestor[] = [];

  constructor( private clientesService: ClientesService,
               private gestoresService: GestoresService,
               private toastr: ToastrService, ) { }

  ngOnInit() {
    this.carregarLista();
  }

    carregarLista() {
        this.carregarGestores();

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
                    this.toastr.success('Removido com Sucesso', 'Sucesso!');
                  //  this.openSnackBar('Removido com Sucesso' , '', 'green-snackbar' );
                },
                erro => {
                    this.toastr.warning(erro, 'Error!');
                  //  this.openSnackBar(erro , '', 'red-snackbar' );
                }
            );
    }

    aplicaMascara(v: string): string {

        // Remove tudo o que não é dígito
        v = v.replace(/\D/g, '' );

       /* if (v.length <= 14) { // CPF

            // Coloca um ponto entre o terceiro e o quarto dígitos
            v = v.replace(/(\d{3})(\d)/,  '$1.$2' );

            // Coloca um ponto entre o terceiro e o quarto dígitos
            // de novo (para o segundo bloco de números)
            v = v.replace(/(\d{3})(\d)/, '$1.$2');

            // Coloca um hífen entre o terceiro e o quarto dígitos
            v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        } else {  */ // CNPJ

            // Coloca ponto entre o segundo e o terceiro dígitos
            v = v.replace(/^(\d{2})(\d)/, '$1.$2' );

            // Coloca ponto entre o quinto e o sexto dígitos
            v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3' );

            // Coloca uma barra entre o oitavo e o nono dígitos
            v = v.replace(/\.(\d{3})(\d)/, '.$1/$2' );

            // Coloca um hífen depois do bloco de quatro dígitos
            v = v.replace(/(\d{4})(\d)/, '$1-$2' );

       // }

        return v

    }

    exibirGestorNome(valor: number): string {
        let nome = '';
        for (let x = 0; x < this.gestores.length; x++) {
            const gestObj: IGestor = this.gestores[x];
            if (gestObj.id === valor) {
                nome = gestObj.nome;
                break;
            }
        }
        return nome;
    }
    carregarGestores() {
        this.gestoresService.listar().subscribe(gestores => {
            this.gestores = gestores;
        });
    }

}
