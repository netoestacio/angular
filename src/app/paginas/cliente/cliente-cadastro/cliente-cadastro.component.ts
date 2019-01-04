import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICliente} from '../../../../contracts/ICliente';
import {ClientesService} from '../../../../services/clientes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pagina} from '../../../../models/pagina';
import {GestoresService} from '../../../../services/gestores.service';
import {IGestor} from '../../../../contracts/IGestor';
import {MatSnackBar} from '@angular/material';
import {IConcessionaria} from '../../../../contracts/IConcessionaria';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent extends Pagina implements OnInit, OnDestroy {

    titulo = 'Cadastro de cliente';
    public tipoForm = 0;

    public clienteId;
    public razaoSocial: string;
    public cnpj: string;
    public nomeCurto: string;
    public ativo = true;
    public gestorId: number;
    statusChk = false;

    public cliente: ICliente;
    public gestores: IGestor[] = [];

    public mask = [/\d/, /\d/, '.' , /\d/, /\d/, /\d/,  '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

    constructor(public clientesService: ClientesService,
                private gestoresService: GestoresService,
                public roteador: Router,
               // public snackBar: MatSnackBar,
                private toastr: ToastrService,
                public rota: ActivatedRoute ) { super(); }

  ngOnInit() {

        this.carregarGestores()

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


  salvar(value: ICliente) {
       // value.id = this.clienteId;

      value.cnpj = value.cnpj.replace('.', '');
      value.cnpj = value.cnpj.replace('.', '');
      value.cnpj = value.cnpj.replace('/', '');
      value.cnpj = value.cnpj.replace('-', '');

        value.ativo = this.statusChk;
        value.gestorId = this.gestorId;

        console.log(value);

        if (this.tipoForm === 1) {

            value.id = this.clienteId;
            console.log(value);

            this.clientesService
                .editar(this.clienteId, value)
                .subscribe(
                    sucesso => {
                     //   this.openSnackBar('Editado com Sucesso' , '' );
                        this.toastr.success('Editado com Sucesso', 'Sucesso!');
                        setTimeout( () => {
                            this.roteador.navigate(['/cliente']);
                        }, 1500 );
                    } ,
                    erro => {
                        this.toastr.warning(erro, 'Error!');
                        console.log(erro);
                    }

                );

        } else {

            const formValido = this.validaError(value);
            if (formValido === true) {
                this.clientesService
                    .criar(value)
                    .subscribe(
                        sucesso => {
                           // this.openSnackBar('Cadastrado com Sucesso' , '' );
                            this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');
                            setTimeout( () => {
                                this.roteador.navigate(['/cliente']);
                            }, 1500 );
                        }

                    );
            } else {
                const msg = 'Erro ao Cadastrar verifique os campos e tente novamente';
                this.toastr.warning(msg, 'Error!');
                // this.openSnackBar(msg, '' );
            }
        }
  }

  carregarSelecionado() {
    this.clientesService
        .ver(this.clienteId)
        .subscribe(resp => {
           this.cliente = resp;
           this.preencherFormulario(this.cliente);
        });
  }

    carregarGestores() {
        this.gestoresService.listar().subscribe(gestores => {
            this.gestores = gestores;
        });
    }

  preencherFormulario(valor: ICliente) {
        this.razaoSocial = valor.razaoSocial;
        this.cnpj = valor.cnpj;
        this.nomeCurto = valor.nomeCurto;
        this.gestorId = valor.gestorId;
        this.statusChk = valor.ativo;
  }



    validaError(valor: ICliente): boolean {
        let valido = false;
        if (valor.razaoSocial != null) {
            if (valor.cnpj != null) {
                if (valor.gestorId != null) {
                    valido = true;
                }
            }
        }
        return valido;
    }

}
