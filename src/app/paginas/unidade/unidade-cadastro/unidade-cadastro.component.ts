import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientesService} from '../../../../services/clientes.service';
import {EmpresaService} from '../../../../services/empresas.services';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ICliente} from '../../../../contracts/ICliente';
import {IFichaTecnica} from '../../../../contracts/IFichaTecnica';
import {Pagina} from '../../../../models/pagina';
import {IEmpresa} from '../../../../contracts/IEmpresa';
import {ConcessionariasService} from '../../../../services/concessionarias.service';
import {IConcessionaria} from '../../../../contracts/IConcessionaria';
import {IPerfil} from '../../../../contracts/IPerfil';
import {PerfilService} from '../../../../services/perfil.service';
import {IUnidade} from '../../../../contracts/IUnidade';
import {IContato} from '../../../../contracts/IContato';
import {IEndereco} from '../../../../contracts/IEndereco';
import {DateAdapter, MAT_DATE_FORMATS, MatDialog, MatSnackBar} from '@angular/material';
import {ContatoService} from '../../../../services/contato.service';
import {ILogradouro} from '../../../../contracts/ILogradouro';
import {EnderecoService} from '../../../../services/endereco.service';
import {IEstado} from '../../../../contracts/IEstado';
import {ICidade} from '../../../../contracts/ICidade';
import {UnidadeService} from '../../../../services/unidade.service';
import {ApiService} from '../../../../services/api.service';

import {ErrorModel} from '../../../../contracts/ErrorModel';
import {ToastrService} from 'ngx-toastr';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../components/date.adapter';



@Component({
  selector: 'app-unidade-cadastro',
  templateUrl: './unidade-cadastro.component.html',
  styleUrls: ['./unidade-cadastro.component.scss'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
export class UnidadeCadastroComponent extends Pagina implements OnInit, OnDestroy {

    titulo = 'Cadastro de unidade';

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

    public mask = [/\d/, /\d/, '.' , /\d/, /\d/, /\d/,  '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    public mask2 = [/\d/, /\d/, /\d/,  '.', /\d/, /\d/, /\d/,  '.', /\d/, /\d/, /\d/,  '.', /\d/, /\d/, /\d/];
    clienteId: number;
    empresaId: number;
    concessonariaId: number;
    perfilId: number;

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
  /*  medidor: number; */
    dataAtivacao: Date;
    dataDesativacao: Date;

    /* Ficha Tecnica */
    fichaTecnica = new class implements IFichaTecnica{
        id: number;
        inicioVigencia: Date;
        tensaoId: number;
        concessionariaid: number;
        contratoId: number;
        classeId: number;
        faturamento: number;
        bancoCapacitor: boolean;
        consumoEstimado: boolean;
        telemetria: boolean;
        led: boolean;
        energiaFotovoltaica: boolean;
        automacaoAr: boolean;
        automacaoIlimunacao: boolean;
    };

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
    addNovo = true;
    formContato = true;
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
    listaContatoAdd: IContato[] = [];

  constructor(public apiService: ApiService,
              public clienteService: ClientesService,
              public empresaService: EmpresaService,
              public perfilService: PerfilService,
              public enderecoService: EnderecoService,
              public concessionariaService: ConcessionariasService,
              public contatoService: ContatoService,
              public unidadeService: UnidadeService,
              public roteador: Router,
              public rota: ActivatedRoute,
              public dialog: MatDialog,
              private toastr: ToastrService) {  super(); }

  ngOnInit() {
      this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
          this.unidadeId = parametros.get('id');
      });

      if (this.tipoForm === 0) {
          this.btnAtivo = true;
            this.contatoService.listar().subscribe(resp => this.listaContatoAdd = resp);
      }

      this.carregarListas();

      if (this.roteador.url.endsWith('editar')) {
          this.tipoForm = 1;
          this.addNovo = false;
          this.titulo = 'editar a unidade';

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

    carregarEmpresaCliente() {
      this.addNovo = false;
      this.empresaService.listarPorCliente(this.clienteId).subscribe(resp => {
          this.empresas = resp;
          this.empresaId = this.empresas[0].id;
      });

    }

    carregarCidadeEstado() {
        this.enderecoService.listarCidadesEstado(this.estadoId).subscribe( resp => this.listaCidade = resp );
    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }

    adicionarContatoLista(valor: IContato) {
      this.contatos.push(valor);
    }


    salvarContato(valor: IContato) {

      valor.clienteId = this.clienteId;

      console.log(JSON.stringify(valor));
        this.btnAtivo = false;
        this.formContato = true;
        this.contatoService
          .criar(valor)
          .subscribe(resp => {
              this.contato = resp;
              this.contatos.push(this.contato);
          });

        setTimeout( () => {

            this.reset();
            console.log('Fechando Contato');
        }, 500 );
    }

    ativarContato() {
      this.btnAtivo = true;
      this.formContato = false;
    }


    remover(valor) {

      console.log(valor);

        for (let x = 0 ; x < this.contatos.length; x++) {

            const item: IContato = this.contatos[x];

            if (item.id === valor) {
                console.log(x);
                    this.contatos.splice(x, 1);
                break;
            }

        }


        if (this.unidadeId !== null) {
            console.log(this.unidadeId, valor);
            this.contatoService.desvincularContatounidade( this.unidadeId, valor);
            this.contatoService.listarContatoUnidade(this.unidadeId).subscribe(resp => this.contatos = resp);
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
                    //  this.openSnackBar('Editado com Sucesso' , '' );
                      this.toastr.success('Editado com Sucesso', 'Sucesso!');
                      setTimeout( () => {
                          this.roteador.navigate(['/unidade']);
                      }, 1500 );
                  } ,
                  erro => {
                    //  this.openSnackBar(erro , '' );
                      this.toastr.warning( erro.toString(), 'Error!');
                  }

              );

      } else {

          this.unidadeService
              .criar(this.unidade)
              .subscribe(
                  (sucesso: IUnidade)  => {
                      this.contatoService.vincularContatounidade(sucesso.id);
                      console.log(this.unidade);

                      this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');

                      setTimeout( () => {
                          this.roteador.navigate(['/unidade']);
                      }, 1500 );
                  } ,
                  erro => {
                      const teste: ErrorModel = erro;
                      const msg = 'Erro ao Cadastrar verifique os Campos :' + this.validaError(teste);
                      this.toastr.warning(msg, 'Error!');
                      this.toastr.warning(erro.toString(), 'Error!');
                  }

              );
      }

    }

    validaError(valor: ErrorModel): string {

      let msgErros = '';
            if (valor.PerfilId != null) {
              msgErros = msgErros + ' Perfil ';
            }
            if (valor.Tensao != null) {
              msgErros = msgErros + ', Tensão ';
            }
            if (valor.NumeroPasta != null) {
              msgErros = msgErros + ', Numero Pasta ';
            }
            if (valor.ConcessionariaId != null) {
                msgErros = msgErros + ', Concessionaria ';
            }
            if (valor.NumeroPasta != null) {
                msgErros = msgErros + ', Numero Pasta ';
            }
            if (valor.EmpresaId != null) {
                msgErros = msgErros + ', Empresa ';
            }
            if (valor.EnderecoPrincipal != null) {
                if (valor.EnderecoPrincipal.EstadoId != null) {
                    msgErros = msgErros + ', Estado ';
                }
                if (valor.EnderecoPrincipal.CidadeId != null) {
                    msgErros = msgErros + ', Cidade ';
                }
            }

            return msgErros;

    }

    preencherUnidade() {

        this.unidade.empresaId  = this.empresaId;
        this.unidade.numeroPasta = this.pasta;
        this.unidade.cuc = this.cuc;
        this.unidade.tensao = this.tensaoId;
        this.unidade.concessionariaId = this.concessonariaId;

        this.cnpjsite = this.cnpjsite.replace('.', '');
        this.cnpjsite = this.cnpjsite.replace('.', '');
        this.cnpjsite = this.cnpjsite.replace('/', '');
        this.cnpjsite = this.cnpjsite.replace('-', '');

        this.unidade.cnpjSite = this.cnpjsite;

        this.cnpjadicional = this.cnpjadicional.replace('.', '');
        this.cnpjadicional = this.cnpjadicional.replace('.', '');
        this.cnpjadicional = this.cnpjadicional.replace('/', '');
        this.cnpjadicional = this.cnpjadicional.replace('-', '');

        this.unidade.cnpjAdicional = this.cnpjadicional;
        this.unidade.perfilId = this.perfilId;
        this.unidade.conjuntoEletrico = this.conjuntoEletrico;
        this.unidade.inscricaoEstadual = this.inscricaoEstadual
        this.unidade.inscricaoEstadualIsento = this.isentoIE;
        this.unidade.instalacao = this.instalacao;
      /*  this.unidade.medidor = this.medidor; */
        this.unidade.status = this.statusChk !== false ? 1 : 0;
        this.unidade.statusSlider = this.statusChk;
        this.unidade.dataAtivacao = this.dataAtivacao;
        this.unidade.dataDesativacao = this.dataDesativacao;
        this.unidade.creditoICMS = this.creditoIcms;
        this.unidade.incentivoTUSD = this.incentivoTusd;
        this.unidade.scda = this.scda;
        this.unidade.sgm = this.sgm;
        this.unidade.enderecoPrincipal = this.endereco;
        this.unidade.enderecoFaturamento = this.enderecoFatura === true ? this.endereco : null;
        this.unidade.contato = this.contatos;
        this.unidade.razaoSocial = this.razaoSocial;

        this.cnpj = this.cnpj.replace('.', '');
        this.cnpj = this.cnpj.replace('.', '');
        this.cnpj = this.cnpj.replace('/', '');
        this.cnpj = this.cnpj.replace('-', '');

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

        console.log(valor);

        this.empresaService
            .getEmpresaById(valor.empresaId)
            .subscribe((resp: IEmpresa) => {
                this.clienteId = resp.clienteId;
            });


            setTimeout( () => {
            this.empresaId = valor.empresaId

            this.concessonariaId = valor.concessionariaId
            this.perfilId = valor.perfilId

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

            this.dataAtivacao = valor.dataAtivacao;
            this.dataDesativacao = valor.dataDesativacao;

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
                .subscribe(res => {
                    this.contatos = res;
                    console.log('Conctato lista');
                    console.log(this.contatos);
                });

            this.prencherFormEndereco(valor.enderecoPrincipalId);

        }, 300 );

    }

    prencherFormEndereco(id: number) {
        this.enderecoService
            .getEnderecoById(id)
            .subscribe((resp: IEndereco) => {
                this.estadoId = resp.estadoId;
                this.carregarCidadeEstado();

                setTimeout( () => {
                    this.logradouroId = resp.tipoLogradouroId;
                    this.logradouro = resp.logradouro;
                    this.bairro = resp.bairro;
                    this.numero = resp.numero;
                    this.cep = resp.cep;
                    this.estadoId = resp.estadoId;
                    this.cidadeId = resp.cidadeId;
                    this.complemento = resp.complemento;
                }, 300);

            });
    }



}
