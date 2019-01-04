import { Component, OnInit } from '@angular/core';
import {EmpresaService} from '../../../../services/empresas.services';
import {IEmpresa} from '../../../../contracts/IEmpresa';
import {MatSnackBar} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-empresa-listar',
  templateUrl: './empresa-listar.component.html',
  styleUrls: ['./empresa-listar.component.scss']
})
export class EmpresaListarComponent implements OnInit {

    titulo = 'empresas';

    empresas: IEmpresa[] = [];

    constructor(
        public empresaService: EmpresaService, public toastr: ToastrService ) { }

    ngOnInit() {
        this.carregarEmpresas();
    }

    carregarEmpresas() {
        this.empresaService.listar()
            .subscribe(resposta => {
                this.empresas = resposta;
            });
    }

    deletarEmpresa(empresaId: number) {
        this.empresaService.remover(empresaId)
            .subscribe(
                sucesso => {
                    this.carregarEmpresas();
                    this.toastr.success('Removido com Sucesso', 'Sucesso!');
                    // this.openSnackBar('Removido com Sucesso' , '' );
                },
                erro => {
                    this.toastr.warning(erro, 'Error!');
                    // this.openSnackBar(erro , '' );
                }
            );
      //  this.reloadView();
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

}
