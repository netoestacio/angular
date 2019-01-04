import { Component, OnInit } from '@angular/core';
import {IUnidade} from '../../../../contracts/IUnidade';
import {UnidadeService} from '../../../../services/unidade.service';
import {MatSnackBar} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-unidade-listar',
  templateUrl: './unidade-listar.component.html',
  styleUrls: ['./unidade-listar.component.scss']
})
export class UnidadeListarComponent implements OnInit {

    titulo = 'unidades';

    unidades: IUnidade[] = [];

    constructor(
        public unidadeService: UnidadeService, public toastr: ToastrService ) { }

    ngOnInit() {
        this.carregarUnidades();
    }

    carregarUnidades() {
        this.unidadeService.listar()
            .subscribe(resposta => {
                this.unidades = resposta;
            });
    }

    deletarUnidade(unidadeId: number) {
        console.log(unidadeId);
        this.unidadeService.remover(unidadeId)
            .subscribe(
                sucesso => {
                    this.carregarUnidades();
                   // this.openSnackBar('Excluido com Sucesso' , '' );
                    this.toastr.success('Excluido com Sucesso', 'Sucesso!');
                },
                erro => {
                    this.toastr.warning(erro, 'Error!');
                   // this.openSnackBar(erro, '' );
                });

       // this.reloadView();
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
