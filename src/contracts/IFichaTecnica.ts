export interface IFichaTecnica {
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
}
