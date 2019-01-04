export interface IConcessionaria {
  id: number;
  agua: boolean;
  energia: boolean;
  telefonia: boolean;
  mesReajuste: number;
  descontoICMS: number;
  dataInicioOperacao: Date;
  dataFimOperacao: Date;
  email: string;
  website: string;
  razaoSocial: string;
  cnpj: string;
  nomeCurto: string;
}
