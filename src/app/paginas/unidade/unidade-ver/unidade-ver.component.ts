import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUnidade} from '../../../../contracts/IUnidade';
import {Pagina} from '../../../../models/pagina';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {UnidadeService} from '../../../../services/unidade.service';
import {ClientesService} from '../../../../services/clientes.service';
import {EmpresaService} from '../../../../services/empresas.services';
import {PerfilService} from '../../../../services/perfil.service';
import {EnderecoService} from '../../../../services/endereco.service';
import {ConcessionariasService} from '../../../../services/concessionarias.service';
import {ContatoService} from '../../../../services/contato.service';
import {IEndereco} from '../../../../contracts/IEndereco';
import {IContato} from '../../../../contracts/IContato';
import {IFinanceiro} from '../../../../contracts/IFinanceiro';
import {IEficienciaEnergetica} from '../../../../contracts/IEficienciaEnergetica';
import {IFichaTecnica} from '../../../../contracts/IFichaTecnica';
import {IConcessionaria} from '../../../../contracts/IConcessionaria';
import {IEmpresa} from '../../../../contracts/IEmpresa';
import {ICliente} from '../../../../contracts/ICliente';
import {IPerfil} from '../../../../contracts/IPerfil';
import {ILogradouro} from '../../../../contracts/ILogradouro';
import {IEstado} from '../../../../contracts/IEstado';
import {ICidade} from '../../../../contracts/ICidade';
import {DateAdapter, MAT_DATE_FORMATS, MatDialog, MatSnackBar} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../components/date.adapter';

@Component({
  selector: 'app-unidade-ver',
  templateUrl: './unidade-ver.component.html',
  styleUrls: ['./unidade-ver.component.scss'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
export class UnidadeVerComponent extends Pagina implements OnInit, OnDestroy {

    tipoForm = 0;
    unidadeId: number;
    unidade: IUnidade = new class implements IUnidade {
        automacaoArCondicionado: boolean;
        automacaoIluminacao: boolean;
        bancoCapacitor: boolean;
        centroCusto: string;
        classeId: number;
        cnpj: string;
        cnpjAdicional: string;
        cnpjSite: string;
        codigoPagamento: number;
        concessionaria: IConcessionaria;
        concessionariaId: number;
        conjuntoEletrico: string;
        consumoEstimado: boolean;
        contato: IContato[];
        contratoId: number;
        creditoICMS: boolean;
        cuc: string;
        dataAtivacao: Date;
        dataDesativacao: Date;
        dataFimOperacao: Date;
        dataInicioOperacao: Date;
        descontoIrrigacao: number;
        empresa: IEmpresa;
        empresaId: number;
        enderecoFaturamento: IEndereco;
        enderecoFaturamentoCopy: boolean;
        enderecoFaturamentoId: number;
        enderecoPrincipal: IEndereco;
        enderecoPrincipalId: number;
        energiaFotovoltaica: boolean;
        faturamento: number;
        formaPagamento: number;
        id: number;
        incentivoTUSD: number;
        inscricaoEstadual: string;
        inscricaoEstadualIsento: boolean;
        instalacao: string;
        led: boolean;
        localizacaoId: number;
        medidor: number;
        nomeCurto: string;
        numeroPasta: number;
        pagamentoAgrupado: boolean;
        percentualPerdas: number;
        perfil: number;
        perfilId: number;
        razaoSocial: string;
        scda: number;
        sgm: number;
        status: number;
        statusSlider: boolean;
        subgrupoId: number;
        telemetria: boolean;
        tensao: number;
        tipo: string;
        website: string;
    };
    clienteId: number;
    clienteNome: string;
    empresaId: number;
    empresaNome: string;
    concessonariaId: number;
    concesionariaNome: string;
    perfilId: number;
    perfilNome: string;

    statusChk: boolean;
    razaoSocial: string;
    nomeCurto: string;
    cnpj: string;
    cnpjadicional: string;
    cnpjsite: string;
    pasta: number;
    inscricaoEstadual: string;
    conjuntoEletrico: string;
    instalacao: string;
    medidor: number;
    datainicio: Date;
    dataFim: Date;

    /* Ficha Tecnica */
    bancoCapacitor = false;
    telemetria = false;
    consumoEstimado = false;
    creditoIcms = false;
    contratoId: number;
    classeId: number;
    subGrupoId: number;
    tensaoId: number;
    incentivoTusd: number;
    perdasPorcento: number;

    /*Informação Extra*/
    isentoIE = false;
    localizacaoId: number;
    cuc: string;
    scda: number;
    sgm: number;
    /*Contato*/
    btnAtivo = true;
    formContato = false;
    contato: IContato;
    nome: string;
    telefone: number;
    celular: number;
    email: string;
    codigoAreaTelefone: number;
    codigoAreaCelular: number;
    ocupacao: string;

    /*Endereço*/
    endereco: IEndereco = new class implements IEndereco {
        bairro: string;
        cep: string;
        cidadeId: number;
        complemento: string;
        estadoId: string;
        id: number;
        logradouro: string;
        numero: number;
        tipoLogradouroId: number;
    };
    logradouroId: number;
    logradouro: string;
    bairro: string;
    numero: number;
    cep: string;
    estadoId: string;

    cidadeId: number;
    cidadeNome: string;
    complemento: string;
    enderecoFatura = false;

    /*Eficiencia Energetica*/
    led = false;
    fotovoltaico = false;
    ar = false;
    iluminacao = false;

    /*Finaceiro*/
    faturamento: number;
    descontoIrrigacao: number;
    codigoPagamento: number;
    formaPagamento: number;
    centroCusto: string;
    pagamentoAgrupado = false;

    /*Listas*/
    clientes: ICliente[] = [];
    empresas: IEmpresa[] = [];
    concessionarias: IConcessionaria[] = [];
    perfis: IPerfil[] = [];
    contatos: IContato[] = [];
    tipoLogradouro: ILogradouro[] = [];
    listaEstados: IEstado[] = [];
    listaCidade: ICidade[] = [];

    constructor(public clienteService: ClientesService,
                public empresaService: EmpresaService,
                public perfilService: PerfilService,
                public enderecoService: EnderecoService,
                public concessionariaService: ConcessionariasService,
                public contatoService: ContatoService,
                public unidadeService: UnidadeService,
                public roteador: Router,
                public rota: ActivatedRoute,
                public dialog: MatDialog,
                public toastr: ToastrService) {  super(); }

    ngOnInit() {

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
            this.unidadeId = parametros.get('id');
        });

        this.carregarListas();

        if (this.roteador.url.endsWith('ver')) {

            this.tipoForm = 1;
            this.titulo = 'dados da unidade';

            this.unidadeService
                .getUnidadeById(this.unidadeId)
                .subscribe(resp => {
                    this.preencherFormulario(resp);
                });

        }

    }

    carregarListas() {

        this.clienteService.listar().subscribe(resp => this.clientes = resp);
        this.empresaService.listar().subscribe(resp => this.empresas = resp);
        this.concessionariaService.listar().subscribe(resp => this.concessionarias = resp);
        this.perfilService.listar().subscribe(resp => this.perfis = resp);
        this.enderecoService.listarTipoLogradoro().subscribe( resp => this.tipoLogradouro = resp );
        this.enderecoService.listarEstados().subscribe( resp => this.listaEstados = resp );

    }

    carregarCidadeEstado(valor) {
        this.enderecoService
            .listarCidadesEstado(valor)
            .subscribe( resp => {
                    this.listaCidade = resp;
                    console.log(this.listaCidade);
                }
            );
    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }



    ativarContato() {
        this.btnAtivo = false;
    }

    removeDocument(doc: IContato) {
        console.log(doc);
        let arrContato: IContato[] = [];
        this.contatos.forEach( (item, index) => {
            // tslint:disable-next-line:curly
            if (item.id === doc.id) {

                arrContato =  this.contatos.splice(index, 1 , doc);
            }
        });
        this.contatos = arrContato;
    }

    remover(valor: IContato) {
        this.removeDocument(valor);
        console.log(this.contatos);

        if (this.unidadeId !== null) {
            this.contatoService.desvincularContatounidade( this.unidadeId, valor.id );
            console.log(this.unidadeId);
            console.log(this.contatos);
        }

    }

    reset() {
        this.formContato = false;
        this.nome = null;
        this.telefone = null;
        this.celular = null;
        this.email = null;
        this.codigoAreaTelefone = null;
        this.codigoAreaCelular = null;
        this.ocupacao = null;
    }

    salvar(value: IUnidade) {

        this.preencherEndereco();
        this.preencherUnidade();
        this.contatoService.memoriaVirtualContato(this.contatos);

        if (this.tipoForm === 1 ) {

            this.unidade.id = this.unidadeId;
            console.log(JSON.stringify(this.unidade));

            this.unidadeService
                .editar(this.unidadeId, this.unidade)
                .subscribe(
                    sucesso => {
                       // this.openSnackBar('Editado com Sucesso' , '' );
                        this.toastr.success('Editado com Sucesso', 'Sucesso!');
                        setTimeout( () => {
                            this.roteador.navigate(['/unidade']);
                        }, 1500 );
                    } ,
                    erro => {
                       // this.openSnackBar(erro , '' );
                        this.toastr.warning(erro, 'Error!');
                    }

                );

        } else {

            this.unidadeService
                .criar(this.unidade)
                .subscribe(
                    (sucesso: IUnidade)  => {
                        this.contatoService.vincularContatounidade(sucesso.id);
                      //  this.openSnackBar('Cadastrado com Sucesso' , '' );
                        this.toastr.success('Cadastro com Sucesso', 'Sucesso!');
                        setTimeout( () => {
                            this.roteador.navigate(['/unidade']);
                        }, 1500 );
                    } ,
                    erro => {
                     //   this.openSnackBar(erro , '' );
                        this.toastr.warning(erro, 'Error!');
                    }

                );
        }

    }

    preencherUnidade() {

        this.unidade.empresaId  = this.empresaId;
        this.unidade.numeroPasta = this.pasta;
        this.unidade.cuc = this.cuc;
        this.unidade.tensao = this.tensaoId;
        this.unidade.concessionariaId = this.concessonariaId;
        this.unidade.cnpjSite = this.cnpjsite;
        this.unidade.cnpjAdicional = this.cnpjadicional;
        this.unidade.perfilId = this.perfilId;
        this.unidade.conjuntoEletrico = this.conjuntoEletrico;
        this.unidade.inscricaoEstadual = this.inscricaoEstadual
        this.unidade.inscricaoEstadualIsento = this.isentoIE;
        this.unidade.instalacao = this.instalacao;
        this.unidade.medidor = this.medidor;
        this.unidade.status = this.statusChk !== false ? 1 : 0;
        this.unidade.statusSlider = this.statusChk;
        this.unidade.dataInicioOperacao = this.datainicio;
        this.unidade.dataFimOperacao = this.dataFim;
        this.unidade.dataAtivacao = this.datainicio;
        this.unidade.dataDesativacao = this.dataFim;
        this.unidade.creditoICMS = this.creditoIcms;
        this.unidade.incentivoTUSD = this.incentivoTusd;
        this.unidade.scda = this.scda;
        this.unidade.sgm = this.sgm;
        this.unidade.enderecoPrincipal = this.endereco;
        this.unidade.enderecoFaturamento = this.enderecoFatura === true ? this.endereco : null;
        this.unidade.contato = this.contatos;
        this.unidade.razaoSocial = this.razaoSocial;
        this.unidade.cnpj = this.cnpj;
        this.unidade.nomeCurto = this.nomeCurto;

        this.unidade.faturamento = this.faturamento;
        this.unidade.descontoIrrigacao = this.descontoIrrigacao;
        this.unidade.codigoPagamento = this.codigoPagamento;
        this.unidade.formaPagamento = this.formaPagamento;
        this.unidade.centroCusto = this.centroCusto;
        this.unidade.pagamentoAgrupado = this.pagamentoAgrupado;

        this.unidade.contratoId = -1;
        this.unidade.classeId = -1;
        this.unidade.subgrupoId = -1;
        this.unidade.percentualPerdas = this.perdasPorcento;
        this.unidade.bancoCapacitor = this.bancoCapacitor;
        this.unidade.consumoEstimado = this.consumoEstimado;
        this.unidade.telemetria = this.telemetria;
        this.unidade.led = this.led;
        this.unidade.energiaFotovoltaica = this.fotovoltaico;
        this.unidade.automacaoArCondicionado = this.ar;
        this.unidade.automacaoIluminacao = this.iluminacao;
        this.unidade.localizacaoId = -1;


    }

    preencherEndereco() {

        this.endereco.tipoLogradouroId = this.logradouroId;
        this.endereco.logradouro = this.logradouro;
        this.endereco.bairro = this.bairro;
        this.endereco.numero = this.numero;
        this.endereco.cep = this.cep;
        this.endereco.estadoId = this.estadoId;
        this.endereco.cidadeId = this.cidadeId;
        this.endereco.complemento = this.complemento;

    }

    preencherFormulario(valor: IUnidade) {
      //  console.log( JSON.stringify(valor) );

        this.empresaService
            .getEmpresaById(valor.empresaId)
            .subscribe((resp: IEmpresa) => {
                this.clienteId = resp.clienteId;
                this.empresaNome = resp.nomeCurto;
            });

        this.prencherFormEndereco(valor.enderecoPrincipalId);

        setTimeout( () => {
            this.empresaId = valor.empresaId;

            this.concessonariaId = valor.concessionariaId;
            this.concessionariaService
                .getConcessionariaById(this.concessonariaId)
                .subscribe(resp => {
                    this.concesionariaNome = resp.nomeCurto
                });

            this.perfilId = valor.perfilId;
            this.perfilService
                .getPerfilById(this.perfilId)
                .subscribe(resp => {
                    this.perfilNome = resp.nome
                });

            this.clienteService
                .ver(this.clienteId)
                .subscribe(resp => {
                    this.clienteNome = resp.nomeCurto
                });

            this.statusChk = valor.status === 1 ? true : false;
            this.razaoSocial = valor.razaoSocial;
            this.nomeCurto = valor.nomeCurto;
            this.cnpj = valor.cnpj;
            this.cnpjadicional = valor.cnpjAdicional;
            this.cnpjsite = valor.cnpjSite;
            this.pasta = valor.numeroPasta;
            this.inscricaoEstadual = valor.inscricaoEstadual;
            this.conjuntoEletrico = valor.conjuntoEletrico;
            this.instalacao = valor.instalacao;

            this.datainicio = valor.dataAtivacao;
            this.dataFim = valor.dataDesativacao;

            this.bancoCapacitor = valor.bancoCapacitor;
            this.telemetria = valor.telemetria;
            this.consumoEstimado = valor.consumoEstimado;
            this.creditoIcms = valor.creditoICMS;
            this.contratoId = valor.contratoId;
            this.classeId = valor.classeId;
            this.subGrupoId = valor.subgrupoId;
            this.tensaoId = valor.tensao;
            this.incentivoTusd = valor.incentivoTUSD;
            this.perdasPorcento = valor.percentualPerdas;

            this.isentoIE = valor.inscricaoEstadualIsento;
            this.localizacaoId = valor.localizacaoId;
            this.cuc = valor.cuc;
            this.scda = valor.scda;
            this.sgm = valor.sgm;

            this.led = valor.led;
            this.fotovoltaico = valor.energiaFotovoltaica;
            this.ar = valor.automacaoArCondicionado;
            this.iluminacao = valor.automacaoIluminacao;

            this.faturamento = valor.faturamento;
            this.descontoIrrigacao = valor.descontoIrrigacao;
            this.codigoPagamento = valor.codigoPagamento;
            this.formaPagamento = valor.formaPagamento;
            this.centroCusto = valor.centroCusto;
            this.pagamentoAgrupado = valor.pagamentoAgrupado;

            this.contatoService
                .listarContatoUnidade(this.unidadeId)
                .subscribe(res => this.contatos = res);



            this.btnAtivo = false;

        }, 300 );

    }

    prencherFormEndereco(id: number) {
        this.enderecoService
            .getEnderecoById(id)
            .subscribe((resp: IEndereco) => {

                this.carregarCidadeEstado(resp.estadoId);

                setTimeout( () => {
                    this.logradouroId = resp.tipoLogradouroId;
                    this.logradouro = resp.logradouro;
                    this.bairro = resp.bairro;
                    this.numero = resp.numero;
                    this.cep = resp.cep;
                    this.estadoId = resp.estadoId;
                    this.cidadeId = resp.cidadeId;
                    this.complemento = resp.complemento;
                }, 100);

            });

    }
    exibeCidade(valor: number): string {
        let resultado = '';
            for (let x = 0 ; x < this.listaCidade.length; x++) {
                if (this.listaCidade[x].id == valor) {
                    resultado = this.listaCidade[x].nome;
                    break;
                }
            }
        return resultado;
    }

    exibeEstado(valor: string): string {
       let resultado = '';
        for (let x = 0 ; x < this.listaEstados.length; x++) {
            if (this.listaEstados[x].id == valor) {
                resultado = this.listaEstados[x].nome;
                break;
            }
        }
        return resultado;
    }

    exibeTensao(valor: number): string {
        let resultado = '';
        switch (valor) {
            case 1:
                resultado = 'Alta';
                break;
            case 2:
                resultado = 'Media';
                break;
            case 3:
                resultado = 'Baixa';
                break;
        }
        return resultado;
    }

    exibeFaturamento(valor: number): string {
        let resultado = '';
            switch (valor) {
                case 1:
                    resultado = 'Monofásico';
                    break;
                case 2:
                    resultado = 'Bifásico';
                    break;
                case 3:
                    resultado = 'Trifásico';
                    break;
            }
        return resultado;
    }

    exibeLogradouro(id: number) {
        this.tipoLogradouro.forEach( (x) =>{
            if (id == x.id) {

            }
        });
    }

}
