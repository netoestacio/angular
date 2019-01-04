import {IModeloTarifario} from './IModeloTarifario';

export interface IComponenteTarifario {
    id: number;
    descricao: string;
    tipoComponenteTarifario: number;
   // modeloTarifarioComponente: any[];
}

export interface ComponenteFormulario {
    componente: IComponenteTarifario
    componenteTarifarioId: number;
    ordem: number;
    tamanho: number;
    precoUnitario: number;
}
