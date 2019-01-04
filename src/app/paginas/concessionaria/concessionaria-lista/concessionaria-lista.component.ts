import { Component, OnInit } from '@angular/core';
import {ConcessionariasService} from '../../../../services/concessionarias.service';
import {IConcessionaria} from '../../../../contracts/IConcessionaria';
import {MatSnackBar} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-concessionaria-lista',
  templateUrl: './concessionaria-lista.component.html',
  styleUrls: ['./concessionaria-lista.component.scss']
})
export class ConcessionariaListaComponent implements OnInit {

    titulo = 'concessionárias';
    concessionarias: IConcessionaria[] = [];

  constructor( public concessionarisService: ConcessionariasService,
                private toastr: ToastrService ) { }

  ngOnInit() {
    this.carregarConcessionarias();
  }

    carregarConcessionarias() {
        this.concessionarisService.listar()
            .subscribe(resposta => {
                this.concessionarias = resposta;
            });
    }

    deletarConcessionaria(id: number) {
        this.concessionarisService.remover(id)
            .subscribe(
                sucesso => {
                    this.carregarConcessionarias();
                    this.toastr.success('Removido com Sucesso', 'Sucesso!');
                   // this.openSnackBar('Removido com Sucesso' , '' );
                },
                erro => {
                    this.toastr.warning(erro, 'Error!');
                    console.log(erro);
                }
            );
    }

    exibeServico(valor: IConcessionaria) {
     let resultado = '';
        if (valor.agua === true) {
            resultado = resultado + 'Água |';
        }
        if (valor.energia === true) {
            resultado = resultado + ' Energia |';
        }
        if (valor.telefonia === true) {
            resultado = resultado + ' Telefonia';
        }
        return resultado;

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
