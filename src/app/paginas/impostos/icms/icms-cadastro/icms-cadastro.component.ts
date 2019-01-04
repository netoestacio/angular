import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImpostoService} from '../../../../../services/imposto.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MatSnackBar} from '@angular/material';
import {Pagina} from '../../../../../models/pagina';
import {ConcessionariasService} from '../../../../../services/concessionarias.service';
import {IIcms} from '../../../../../contracts/IIcms';
import {IEmpresa} from '../../../../../contracts/IEmpresa';
import {IConcessionaria} from '../../../../../contracts/IConcessionaria';
import {ToastrService} from 'ngx-toastr';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../../components/date.adapter';

@Component({
  selector: 'app-icms-cadastro',
  templateUrl: './icms-cadastro.component.html',
  styleUrls: ['./icms-cadastro.component.scss'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
export class IcmsCadastroComponent extends Pagina implements OnInit, OnDestroy  {

    titulo = 'Cadastro de ICMS';

    icmsId: number;
    icms: IIcms;
    icmsEdit: IIcms = new class implements IIcms {
        aliquota: number;
        concessionariaId: number;
        fimVigencia: Date;
        id: number;
        inicioVigencia: Date;
    };
    tipoForm = 0;
    listaConcessionarias: IConcessionaria[] = [];

    id: number;
    concessionariaId: number;
    fimVigencia: Date;
    inicioVigencia: Date;
    vlAliquota: number;


  constructor( public impostoService: ImpostoService,
               public concessionariaService: ConcessionariasService,
               public roteador: Router,
               private toastr: ToastrService,
               public rota: ActivatedRoute ) { super(); }

  ngOnInit() {
      this.concessionariaService
          .listar()
          .subscribe(resp => {
              this.listaConcessionarias = resp;
          });

      this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

      this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
          this.icmsId = parametros.get('id');
      });


      if (this.roteador.url.endsWith('editar')) {
          this.tipoForm = 1;
          this.titulo = 'Editar o ICMS';
          this.impostoService
              .verIcms(this.icmsId)
              .subscribe(resp => {
                  this.icms = resp;
                  this.preencherFormulario(this.icms);
              });

      }

  }

  ngOnDestroy() {
      this.espectador.unsubscribe();
  }


    preencherFormulario(valor: IIcms) {
        this.id =  valor.id;
        this.concessionariaId = valor.concessionariaId;
        this.vlAliquota = valor.aliquota;
        this.inicioVigencia = valor.inicioVigencia;
        this.fimVigencia = valor.fimVigencia;
    }

    preencherIcms(valor: IIcms) {
        this.icmsEdit.id =  this.icmsId;
        this.icmsEdit.concessionariaId = valor.concessionariaId;
        this.icmsEdit.aliquota = this.vlAliquota;
        this.icmsEdit.inicioVigencia = valor.inicioVigencia;
        this.icmsEdit.fimVigencia = valor.fimVigencia;
    }


    salvar(value: IIcms) {
        if (this.tipoForm === 1) {

            this.preencherIcms(value);
                console.log(this.icmsEdit);
            this.impostoService
                .editarIcms(this.icmsId, this.icmsEdit)
                .subscribe(
                    sucesso => {
                        this.toastr.success('Editado com Sucesso', 'Sucesso!');
                        setTimeout( () => {
                            this.roteador.navigate(['/impostos/icms']);
                        }, 1500 );
                    } ,
                    erro => {
                        this.toastr.warning(erro.toString(), 'Error!');
                    }

                );
        } else {
            console.log(JSON.stringify(value));

            const formValido = this.validaError(value);

            if (formValido === true) {
                this.impostoService
                    .criarIcms(value)
                    .subscribe(
                        sucesso => {
                            this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');
                            setTimeout( () => {
                                this.roteador.navigate(['/impostos/icms']);
                            }, 1500 );
                        } ,
                        erro => {
                            console.log(erro);
                            this.toastr.warning(erro.toString(), 'Error!');
                        }

                    );
            } else {
                const msg = 'Erro ao Cadastrar verifique os campos e tente novamente';
                this.toastr.warning(msg, 'Error!');

            }

        }
    }

 /*   openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action , {
            duration: 2000,
        });
    }*/

    validaError(valor: IIcms): boolean {
        let valido = false;
        if (valor.concessionariaId != null) {
                valido = true;
        }
        return valido;
    }

}
