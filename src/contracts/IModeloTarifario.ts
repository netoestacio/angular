import {IComponenteTarifario} from './IComponenteTarifario';
import {IModalidadeTarifaria} from './IModalidadeTarifaria';
import {ISubGrupoTarifario} from './ISubGrupoTarifario';

export interface IModeloTarifario {
    id: number;
    descricao: string;
    modalidadeTarifariaId: number;
    subgrupoTarifarioId: number;
    modeloTarifarioComponente: ModeloTarifarioComponente[];
    modalidadeTarifaria: IModalidadeTarifaria;
    subgrupoTarifario: ISubGrupoTarifario;
}

export interface  ModeloTarifarioComponente {
    modeloTarifarioId: number;
    componenteTarifarioId: number;
    componenteTarifario: IComponenteTarifario[];
}

export interface IPrecoComponente {
    componenteTarifarioId: number;
    ordem: number;
    tamanho: number;
    precoUnitario: number;
}
