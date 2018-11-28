import { IUnidade } from './IUnidade';

export class IContato {
  id: number;
  nome: string;
  telefone: number;
  celular: number;
  email: string;
  codigoAreaTelefone: number;
  codigoAreaCelular: number;
  ocupacao: string;
  clienteId: number;
  cliente: null;
  contatoUnidades: IContatoUnidade[];
}

export class IContatoUnidade {
    contatoId: number;
    unidadeI: number;
    contato: IContato;
    unidade: IUnidade;
}
