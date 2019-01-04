import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ConcessionariasService} from '../../../../services/concessionarias.service';
import {Pagina} from '../../../../models/pagina';
import {IConcessionaria} from '../../../../contracts/IConcessionaria';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS} from '../../../components/date.adapter';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-concessionaria-cadastro',
  templateUrl: './concessionaria-cadastro.component.html',
  styleUrls: ['./concessionaria-cadastro.component.scss'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
export class ConcessionariaCadastroComponent extends Pagina implements OnInit, OnDestroy {

    public titulo = 'cadastrar uma concessionária';
    public tipoForm = 0;

    public concessionaria: IConcessionaria = new class implements IConcessionaria {
        agua: boolean;
        cnpj: string;
        dataFimOperacao: Date;
        dataInicioOperacao: Date;
        descontoICMS: number;
        email: string;
        energia: boolean;
        id: number;
        mesReajuste: number;
        nomeCurto: string;
        razaoSocial: string;
        telefonia: boolean;
        website: string;
    };

    public id: number;
    public concessionariaId: number;
    public agua = false;
    public energia = false;
    public telefonia = false;
    public mesReajuste: number;
    public descontoICMS: number;
    public dataInicioOperacao: Date;
    public dataFimOperacao: Date;
    public email: string;
    public website: string;
    public razaoSocial: string;
    public cnpj: string;
    public nomeCurto: string;

    public mask = [/\d/, /\d/, '.' , /\d/, /\d/, /\d/,  '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
              public roteador: Router,
              public rota: ActivatedRoute,
              public toastr: ToastrService,
              public concessionariaService: ConcessionariasService ) { super(); }


    ngOnInit() {
        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => { this.concessionariaId = parametros.get('id'); });

        if (this.roteador.url.endsWith('editar')) {
          this.tipoForm = 1;
          this.titulo = 'editar a concessionária';
            this.carregarConcessionariaSelecionada();
        }


    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }


    carregarConcessionariaSelecionada() {
      this.concessionariaService
          .getConcessionariaById(this.concessionariaId)
          .subscribe(resp => {
                this.concessionaria = resp;
                this.preencherFormulario(this.concessionaria);
              }
          );
    }

    conversorData(strData: string ): string {
        const data = new Date(strData);
        const strArray = [
            '01', '02', '03', '04', '05', '06',
            '07', '08', '09', '10', '11', '12'
        ];
        const d = data.getDate();
        const m = strArray[data.getMonth()];
        const y = data.getFullYear();

        const value = '' + y + '-' + m + '-' + (d <= 9 ? '0' + d : d);

        return value;
    }

    preencherFormulario(valor: IConcessionaria) {

            this.id = valor.id;
            this.agua = valor.agua;
            this.energia = valor.energia;
            this.mesReajuste = valor.mesReajuste;
            this.descontoICMS = valor.descontoICMS;
            this.dataInicioOperacao = valor.dataInicioOperacao;
            this.dataFimOperacao = valor.dataFimOperacao;
            this.email = valor.email;
            this.website = valor.website;
            this.razaoSocial = valor.razaoSocial;
            this.cnpj = valor.cnpj;
            this.nomeCurto = valor.nomeCurto;
            this.telefonia = valor.telefonia;

            console.log(JSON.stringify(valor));
    }

    preencherConcessionaria(valor: IConcessionaria) {

        this.concessionaria.agua = this.agua
        this.concessionaria.energia = this.energia;
        this.concessionaria.telefonia = this.telefonia;
        this.concessionaria.mesReajuste = valor.mesReajuste;
        this.concessionaria.descontoICMS = valor.descontoICMS;
        this.concessionaria.dataInicioOperacao = this.dataInicioOperacao;
        this.concessionaria.dataFimOperacao = this.dataFimOperacao;
        this.concessionaria.email = valor.email;
        this.concessionaria.website = valor.website;
        this.concessionaria.razaoSocial = valor.razaoSocial;

        valor.cnpj = valor.cnpj.replace('.', '');
        valor.cnpj = valor.cnpj.replace('.', '');
        valor.cnpj = valor.cnpj.replace('/', '');
        valor.cnpj = valor.cnpj.replace('-', '');

        this.concessionaria.cnpj = valor.cnpj;
        this.concessionaria.nomeCurto = valor.nomeCurto;
    }

    salvar(value: IConcessionaria) {

      this.preencherConcessionaria(value);

    if (this.tipoForm === 1) {

            this.concessionaria.id = this.concessionariaId;

            console.log(this.concessionaria);

                this.concessionariaService
                  .editar(this.concessionariaId, this.concessionaria)
                  .subscribe(
                      sucesso => {
                          this.toastr.success('Editado com Sucesso', 'Sucesso!');
                         // this.openSnackBar('Editado com Sucesso' , '' );
                          setTimeout( () => {
                              this.roteador.navigate(['/concessionaria']);
                          }, 1500 );
                      } ,
                      erro => {
                          this.toastr.warning(erro.toString(), 'Error!');
                      }

                  );

            } else {

                const formValido = this.validaError(value);

                console.log(this.concessionaria);

                if (formValido === true) {
                    this.concessionariaService
                        .criar(this.concessionaria)
                        .subscribe(
                            sucesso => {
                               // this.openSnackBar('Cadastrado com Sucesso' , '' );
                                this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');
                                setTimeout( () => {
                                    this.roteador.navigate(['/concessionaria']);
                                }, 1500 );
                            },
                            erro => {
                                this.toastr.warning(erro.toString(), 'Error!');
                        });
                }
                if (formValido === false) {
                    const msg = 'Erro ao Cadastrar verifique os campos e tente novamente';
                    this.toastr.warning(msg, 'Error!');
                   // this.openSnackBar(msg, '' );
                }

            }

    }
/*
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action , {
            duration: 2000,
        });
    }
 */

    validaError(valor: IConcessionaria): boolean {
      let valido = false;
        if (valor.razaoSocial != null) {
            if (valor.cnpj != null) {
                if (valor.agua !== false || valor.energia !== false) {
                    if (valor.dataInicioOperacao != null) {
                        valido = true;
                    }

                }
            }
        }
      return valido;
    }

}
