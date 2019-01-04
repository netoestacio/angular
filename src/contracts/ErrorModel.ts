export interface ErrorModel {

    Tensao: string[];
    PerfilId: string[];
    EmpresaId: string[];
    NomeCurto: string[];
    NumeroPasta: string[];
    ConcessionariaId: string[];
    EnderecoPrincipal: {
        'CidadeId': string[],
        'EstadoId': string[]
    };
    ClienteId: string[];
    Agua: string[];
    Energia: string[];
    Nome: string[];
}
