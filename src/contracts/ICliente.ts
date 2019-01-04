import {IGestor} from './IGestor';

export interface ICliente {
    id: number;
    razaoSocial: string;
    cnpj: string;
    nomeCurto: string;
    gestorId: number;
    ativo: boolean;
    gestor: IGestor;
}
