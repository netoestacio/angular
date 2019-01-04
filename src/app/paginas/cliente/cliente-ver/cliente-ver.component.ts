import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICliente} from '../../../../contracts/ICliente';
import {IGestor} from '../../../../contracts/IGestor';
import {ClientesService} from '../../../../services/clientes.service';
import {GestoresService} from '../../../../services/gestores.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pagina} from '../../../../models/pagina';

@Component({
  selector: 'app-cliente-ver',
  templateUrl: './cliente-ver.component.html',
  styleUrls: ['./cliente-ver.component.scss']
})
export class ClienteVerComponent extends Pagina implements OnInit, OnDestroy {

    titulo = 'Cadastro de cliente';
    public tipoForm = 0;

    public clienteId;
    public listaClientes: ICliente[] = [];
    public cliente: ICliente;
    public gestores: IGestor[] = [];
    public gestorNome: string;


    constructor(public clientesService: ClientesService,
                private gestoresService: GestoresService,
                public roteador: Router,
                public rota: ActivatedRoute ) { super(); }

    ngOnInit() {

        this.carregarGestores();

        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
            this.clienteId = parametros.get('id');
        });

        if (this.roteador.url.endsWith('editar')) {
            this.tipoForm = 1;
            this.titulo = 'edição do cliente';
            this.carregarSelecionado();
        }
        if (this.roteador.url.endsWith('ver')) {
            this.titulo = 'dados do cliente';
            this.carregarSelecionado();
        }


    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }

   /* exibirGestorNome(valor: number): string {
        let nome = '';
        console.log(valor);
        for (let x = 0; x < this.gestores.length; x++) {
            if (this.gestores[x].id === valor) {
                nome = this.gestores[x].nome;
            }
        }
        return nome;
    } */

    carregarSelecionado() {
        this.clientesService
            .ver(this.clienteId)
            .subscribe(resp => {
                this.cliente = resp;
                console.log(this.cliente);
                this.listaClientes.push(this.cliente);
            });
    }

    carregarGestores() {
        this.gestoresService.listar().subscribe(gestores => {
            this.gestores = gestores;
        });
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
