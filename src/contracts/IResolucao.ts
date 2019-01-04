import {IConcessionaria} from './IConcessionaria';

export interface IResolucao {
    id: number;
    numero: number;
    dataPublicacao: Date;
    inicioVigencia: Date;
    fimVigencia: Date;
    concessionariaId: number;
    anexoBase: string;
    percentualReajuste: number;
    incluiICMS: boolean;
    incluiCOFINS: boolean;
    incluiPIS: boolean;
    statusResolucao: number;
    concessionaria: IConcessionaria;
}