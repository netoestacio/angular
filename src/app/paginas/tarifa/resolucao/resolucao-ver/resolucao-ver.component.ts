import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pagina} from '../../../../../models/pagina';
import {BandeiraService} from '../../../../../services/bandeira.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MatSnackBar} from '@angular/material';
import {IResolucao} from '../../../../../contracts/IResolucao';
import {ResolucaoService} from '../../../../../services/resolucao.service';
import {IConcessionaria} from '../../../../../contracts/IConcessionaria';
import {ConcessionariasService} from '../../../../../services/concessionarias.service';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../../components/date.adapter';

@Component({
  selector: 'app-resolucao-ver',
  templateUrl: './resolucao-ver.component.html',
  styleUrls: ['./resolucao-ver.component.scss'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
export class ResolucaoVerComponent extends Pagina implements OnInit, OnDestroy {

    resolucao: IResolucao;
    resolucaoId: number;
    concessionariaId: number;
    concessionariaNome: string;
    listaConcessionaria: IConcessionaria[] = [];

    numero: number;
    dataPublicacao: Date;
    inicioVigencia: Date;
    fimVigencia: Date;
    status: number;
    statusNome: string;
    anexoBase: string;
    reajuste: number;
    icms: boolean;
    pis: boolean;
    cofins: boolean;

    constructor( public resolucaoService: ResolucaoService,
                 public roteador: Router,
                 public concessionariaService: ConcessionariasService,
                 public rota: ActivatedRoute ) { super(); }
    ngOnInit() {
        this.concessionariaService.listar().subscribe( resp => this.listaConcessionaria = resp );
        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
            this.resolucaoId = parametros.get('id');
        });


        if (this.roteador.url.endsWith('ver')) {
            this.titulo = 'Dados da Resolução';
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


    preencherFomulario(valor: IResolucao) {
        this.numero = valor.numero;
        this.reajuste = valor.percentualReajuste;
        this.status = valor.statusResolucao;
        if (this.status == 1) {
            this.statusNome = 'Ativa';
        } else {
            this.statusNome = 'Revogada';
        }
        this.anexoBase = valor.anexoBase;
        this.inicioVigencia = valor.inicioVigencia;
        this.fimVigencia = valor.fimVigencia;
        this.dataPublicacao = valor.dataPublicacao;

        this.concessionariaId  = valor.concessionariaId;
        this.concessionariaService.getConcessionariaById(this.concessionariaId).subscribe(resp => {
            this.concessionariaNome = resp.nomeCurto;
        });
        this.icms = valor.incluiICMS;
        this.pis = valor.incluiPIS;
        this.cofins = valor.incluiCOFINS;

    }


}
