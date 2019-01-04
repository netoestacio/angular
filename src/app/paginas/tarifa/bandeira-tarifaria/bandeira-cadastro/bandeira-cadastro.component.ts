import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pagina} from '../../../../../models/pagina';
import {IIcms} from '../../../../../contracts/IIcms';
import {IConcessionaria} from '../../../../../contracts/IConcessionaria';
import {ImpostoService} from '../../../../../services/imposto.service';
import {ConcessionariasService} from '../../../../../services/concessionarias.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MatSnackBar} from '@angular/material';
import {IBandeiraTarifa} from '../../../../../contracts/IBandeiraTarifa';
import {BandeiraService} from '../../../../../services/bandeira.service';
import {ToastrService} from 'ngx-toastr';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../../components/date.adapter';

@Component({
  selector: 'app-bandeira-cadastro',
  templateUrl: './bandeira-cadastro.component.html',
  styleUrls: ['./bandeira-cadastro.component.scss'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
export class BandeiraCadastroComponent extends Pagina implements OnInit, OnDestroy {

    titulo = 'Cadastro de Bandeira-Tarifária';

    bandeiraId: number;
    bandeira: IBandeiraTarifa;
    tipoForm = 0;

    id: number;
    tipoBandeira: number;
    fimVigencia: Date;
    inicioVigencia: Date;
    observacao: string;


    constructor( public bandeiraService: BandeiraService,
                 public roteador: Router,
                 public toastr: ToastrService,
                public rota: ActivatedRoute) { super(); }

    ngOnInit() {

        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
            this.bandeiraId = parametros.get('id');
        });


        if (this.roteador.url.endsWith('editar')) {
            this.tipoForm = 1;
            this.titulo = 'editar a bandeira';
            this.bandeiraService
                .ver(this.bandeiraId)
                .subscribe(resp => {
                    this.bandeira = resp;
                    this.preencherFormulario(this.bandeira);
                });

        }

    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }


    preencherFormulario(valor: IBandeiraTarifa) {
        this.id =  valor.id;
        this.tipoBandeira = valor.tipoBandeira;
        this.observacao = valor.observacao;
        this.inicioVigencia = valor.inicioVigencia;
        this.fimVigencia = valor.fimVigencia;
    }


    salvar(value: IBandeiraTarifa) {
        if (this.tipoForm === 1) {
            value.id = this.bandeiraId;

            this.bandeiraService
                .editar(this.bandeiraId, value)
                .subscribe(
                    sucesso => {
                        this.toastr.success('Editado com Sucesso', 'Sucesso!');
                        setTimeout( () => {
                            this.roteador.navigate(['/tarifa/bandeira-tarifaria']);
                        }, 1500 );
                    } ,
                    erro => {
                        console.log(erro);
                        this.toastr.warning(erro.toString(), 'Error!');
                    }

                );
        } else {
            console.log(JSON.stringify(value));

            const formValido = this.validaError(value);

            if (formValido === true) {
                this.bandeiraService
                    .criar(value)
                    .subscribe(
                        sucesso => {
                            this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');
                            setTimeout( () => {
                                this.roteador.navigate(['/tarifa/bandeira-tarifaria']);
                            }, 1500 );
                        } ,
                        erro => {
                            this.toastr.warning(erro.toString(), 'Error!');
                        }

                    );
            } else {
                const msg = 'Erro ao Cadastrar verifique os campos e tente novamente';
                this.toastr.warning(msg, 'Error!');
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

    validaError(valor: IBandeiraTarifa): boolean {
        let valido = false;
        if (valor.inicioVigencia != null) {
            if (valor.fimVigencia != null) {
                valido = true;
            }
        }
        return valido;
    }

}
