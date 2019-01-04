export interface IGestor {
    id: number;
    cargoId: number;
    nome: string;
    email: string;
    exigirNovaSenha: string;
    senha: string;
    dataCadastro: Date;
    dataUltimoAcesso: Date;
    ativo: boolean;
    deletado: boolean;
    fotografia: string;
}
