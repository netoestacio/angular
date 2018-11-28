export interface IConcessionaria {
  id: number;
  agua: boolean;
  energia: boolean;
  mesReajuste: number;
  descontoICMS: number;
  dataInicioOperacao: Date;
  dataFimOperacao: Date;
  email: string;
  website: string;
  razaoSocial: string;
  cnpj: number;
  nomeCurto: string;
}
