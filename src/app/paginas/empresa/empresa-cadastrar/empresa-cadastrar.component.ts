import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pagina} from '../../../../models/pagina';
import {IEmpresa} from '../../../../contracts/IEmpresa';
import {EmpresaService} from '../../../../services/empresas.services';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ClientesService} from '../../../../services/clientes.service';
import {ICliente} from '../../../../contracts/ICliente';
import {MatSnackBar} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-empresa-cadastrar',
  templateUrl: './empresa-cadastrar.component.html',
  styleUrls: ['./empresa-cadastrar.component.scss']
})
export class EmpresaCadastrarComponent extends Pagina implements OnInit, OnDestroy {

    titulo = 'cadastrar uma empresa';
    tipoForm = 0;

    id: number;
    status: number;
    statusChk = false;
    clienteId: number;
    razaoSocial: string;
    cnpj: string;
    nomeCurto: string;
    empresaId: number;
    empresa: IEmpresa;
    clientes: ICliente[] = [];

    public mask = [/\d/, /\d/, '.' , /\d/, /\d/, /\d/,  '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

    constructor(public clienteService: ClientesService,
                public empresaService: EmpresaService,
                public roteador: Router,
                public toastr: ToastrService,
                public rota: ActivatedRoute) { super(); }

    ngOnInit() {
        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
            this.empresaId = parametros.get('id');
        });

        this.clienteService.listar().subscribe(resp => this.clientes = resp);


        if (this.roteador.url.endsWith('editar')) {
          this.tipoForm = 1;
          this.titulo = 'editar a empresa';
          this.empresaService
              .getEmpresaById(this.empresaId)
              .subscribe(resp => {
                  this.empresa = resp;
                  this.preencherFormulario(this.empresa);
              });

        }
        if (this.roteador.url.endsWith('ver')) {
          this.titulo = 'dados da empresa';
        }

    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }

    preencherFormulario(valor: IEmpresa) {
        this.id =  valor.id;
        this.status = valor.status;
        this.statusChk = valor.status === 1 ? true : false;
        this.clienteId = valor.clienteId;
        this.razaoSocial = valor.razaoSocial;

       /* valor.cnpj = valor.cnpj.replace('.', '');
        valor.cnpj = valor.cnpj.replace('.', '');
        valor.cnpj = valor.cnpj.replace('/', '');
        valor.cnpj = valor.cnpj.replace('-', ''); */

        this.cnpj = valor.cnpj;
        this.nomeCurto = valor.nomeCurto;
    }

    salvar(value: IEmpresa) {
        value.status = this.statusChk === true ? 1 : 0;
        value.cnpj = value.cnpj.replace('.', '');
        value.cnpj = value.cnpj.replace('.', '');
        value.cnpj = value.cnpj.replace('/', '');
        value.cnpj = value.cnpj.replace('-', '');

        if (this.tipoForm === 1) {
            value.id = this.empresaId;

            this.empresaService
                .editar(this.empresaId, value)
                .subscribe(
                    sucesso => {
                        this.toastr.success('Editado com Sucesso', 'Sucesso!');
                        setTimeout( () => {
                            this.roteador.navigate(['/empresa']);
                        }, 1500 );
                    } ,
                    erro => {
                        this.toastr.warning(erro, 'Error!');
                        console.log(erro);
                    }

                );
        } else {
          console.log(JSON.stringify(value));

          const formValido = this.validaError(value);

          if (formValido === true) {
              this.empresaService
                  .criar(value)
                  .subscribe(
                      sucesso => {
                          this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');
                          setTimeout( () => {
                              this.roteador.navigate(['/empresa']);
                          }, 1500 );
                      } ,
                      erro => {
                          this.toastr.warning(erro, 'Error!');
                          console.log(erro);
                      }

                  );
          } else {
              const msg = 'Erro ao Cadastrar verifique os campos e tente novamente';
              this.toastr.warning(msg, 'Error!');
          }

        }

    }

   /* openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action , {
            duration: 2000,
        });
    }*/

    validaError(valor: IEmpresa): boolean {
        let valido = false;
        if (valor.razaoSocial != null) {
            if (valor.cnpj != null) {
                if (valor.clienteId != null) {
                    valido = true;
                }
            }
        }
        return valido;
    }

}
