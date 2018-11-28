import {IContato} from './IContato';
import {IEmpresa} from './IEmpresa';
import {IConcessionaria} from './IConcessionaria';
import {IEndereco} from './IEndereco';

export interface IUnidade {
    id: number;
    empresaId: number;
    numeroPasta: number;
    cuc: string;
    website: string;
    tipo: string;
    tensao: number;
    concessionariaId: number;
    cnpjSite: string;
    cnpjAdicional: string;
    perfilId: number;
    conjuntoEletrico: string;
    inscricaoEstadual: string;
    inscricaoEstadualIsento: boolean;
    instalacao: string;
    medidor: number;
    status: number;
    statusSlider: boolean;
    dataInicioOperacao: Date;
    dataFimOperacao: Date;
    dataAtivacao: Date;
    dataDesativacao: Date;
    creditoICMS: boolean;
    enderecoPrincipalId: number;
    enderecoFaturamentoId: number;
    enderecoFaturamentoCopy: boolean;
    incentivoTUSD: number;
    scda: number;
    sgm: number;
    empresa: IEmpresa;
    concessionaria: IConcessionaria;
    perfil: number;
    enderecoPrincipal: IEndereco;
    enderecoFaturamento: IEndereco;
    contato: IContato[];
    razaoSocial: string;
    cnpj: string;
    nomeCurto: string;

    faturamento: number;
    descontoIrrigacao: number;
    codigoPagamento: number;
    formaPagamento: number;
    centroCusto: string;
    pagamentoAgrupado: boolean;

    contratoId: number;
    classeId: number;
    subgrupoId: number;
    percentualPerdas: number;
    bancoCapacitor: boolean;
    consumoEstimado: boolean;
    telemetria: boolean;
    led: boolean;
    energiaFotovoltaica: boolean;
    automacaoArCondicionado: boolean;
    automacaoIluminacao: boolean;
    localizacaoId: number;

}
