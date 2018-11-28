export interface ICliente {
    id: number;
    razaoSocial: string;
    cnpj: string;
    nomeCurto: string;
    gestorId: number;
    ativo: boolean;
}