import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pagina} from '../../../../../models/pagina';
import {IResolucao} from '../../../../../contracts/IResolucao';
import {IConcessionaria} from '../../../../../contracts/IConcessionaria';
import {ResolucaoService} from '../../../../../services/resolucao.service';
import {ConcessionariasService} from '../../../../../services/concessionarias.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MatSnackBar} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {IIcms} from '../../../../../contracts/IIcms';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../../components/date.adapter';
import {statsErrorsToString} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/stats';

@Component({
  selector: 'app-resolucao-cadastro',
  templateUrl: './resolucao-cadastro.component.html',
  styleUrls: ['./resolucao-cadastro.component.scss'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
export class ResolucaoCadastroComponent extends Pagina implements OnInit, OnDestroy {

    titulo = 'Cadastro de Resolução';
    tipoForm = 0;
    listaConcessionaria: IConcessionaria[] = [];
    resolucaoEdit: IResolucao = new class implements IResolucao {
        anexoBase: string;
        concessionaria: IConcessionaria;
        concessionariaId: number;
        dataPublicacao: Date;
        fimVigencia: Date;
        id: number;
        incluiCOFINS: boolean;
        incluiICMS: boolean;
        incluiPIS: boolean;
        inicioVigencia: Date;
        numero: number;
        percentualReajuste: number;
        statusResolucao: number;
    };
    resolucao: IResolucao = new class implements IResolucao {
        anexoBase: string;
        concessionaria: IConcessionaria;
        concessionariaId: number;
        dataPublicacao: Date;
        fimVigencia: Date;
        id: number;
        incluiCOFINS: boolean;
        incluiICMS: boolean;
        incluiPIS: boolean;
        inicioVigencia: Date;
        numero: number;
        percentualReajuste: number;
        statusResolucao: number;
    };

    resolucaoId: number;
    concessionariaId: number;

    numero: number;
    dataPublicacao: Date;
    inicioVigencia: Date;
    fimVigencia: Date;
    status: number;
    anexoBase: string;
    reajuste: number;
    icms: boolean;
    pis: boolean;
    cofins: boolean;



  constructor( public resolucaoService: ResolucaoService,
               public concessionariaService: ConcessionariasService,
               public roteador: Router,
               public toastr: ToastrService,
               public rota: ActivatedRoute) { super(); }

  ngOnInit() {
      this.carregarLista();

      this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

      this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
          this.resolucaoId = parametros.get('id');
      });


      if (this.roteador.url.endsWith('editar')) {
          this.tipoForm = 1;
          this.titulo = 'Editar a Resolução';
          this.resolucaoService
              .ver(this.resolucaoId)
              .subscribe(resp => {
                console.log(JSON.stringify(resp));
                  this.preencherFomulario(resp);
              });

      }
  }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }


  carregarLista() {
    this.concessionariaService.listar().subscribe( resp => this.listaConcessionaria = resp );
  }

  preencherFomulario(valor: IResolucao) {
      this.numero = valor.numero;
      this.reajuste = valor.percentualReajuste;
      this.status = valor.statusResolucao;
      this.anexoBase = valor.anexoBase;
      this.inicioVigencia = valor.inicioVigencia;
      this.fimVigencia = valor.fimVigencia;
      this.dataPublicacao = valor.dataPublicacao;
      this.concessionariaId  = valor.concessionariaId;
      this.icms = valor.incluiICMS;
      this.pis = valor.incluiPIS;
      this.cofins = valor.incluiCOFINS;

  }

    preencherNovo(valor: IResolucao) {

        this.resolucao.numero = this.numero;
        this.resolucao.percentualReajuste = this.reajuste;
        this.resolucao.statusResolucao = this.status;
        this.resolucao.anexoBase = this.anexoBase;
        this.resolucao.inicioVigencia = this.inicioVigencia;
        this.resolucao.fimVigencia = this.fimVigencia;
        this.resolucao.dataPublicacao = this.dataPublicacao;
        this.resolucao.concessionariaId  = this.concessionariaId;
        this.resolucao.incluiICMS = this.icms;
        this.resolucao.incluiPIS = this.pis;
        this.resolucao.incluiCOFINS = this.cofins;
    }

    salvar(value: IResolucao) {
        if (this.tipoForm === 1) {

            this.preencherNovo(value);
            this.resolucao.id = this.resolucaoId;
            this.resolucaoService
                .editar(this.resolucaoId, this.resolucao)
                .subscribe(
                    sucesso => {
                        this.toastr.success('Editado com Sucesso', 'Sucesso!');
                        setTimeout( () => {
                            this.roteador.navigate(['/tarifa/resolucao']);
                        }, 1500 );
                    } ,
                    erro => {
                        this.toastr.warning(erro.toString(), 'Error!');
                    }

                );
        } else {
            console.log(value);

            this.preencherNovo(value);

            console.log(JSON.stringify(this.resolucao));

           // const formValido = this.validaError(value);


                this.resolucaoService
                    .criar(this.resolucao)
                    .subscribe(
                        sucesso => {
                            this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');
                            setTimeout( () => {
                                this.roteador.navigate(['/tarifa/resolucao']);
                            }, 1500 );
                        } ,
                        erro => {
                            console.log(erro);
                            this.toastr.warning(erro.toString(), 'Error!');
                        }

                    );


        }
    }


   /* validaError(valor: IResolucao): boolean {
        let valido = false;
        if (valor.concessionariaId != null) {
            if (valor.percentualReajuste != null) {
                valido = true;
            }
        }
        return valido;
    }*/

}
