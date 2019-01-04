import {IResolucao} from './IResolucao';
import {ISubGrupoTarifario} from './ISubGrupoTarifario';
import {IModeloTarifario, IPrecoComponente} from './IModeloTarifario';
import {IModalidadeTarifaria} from './IModalidadeTarifaria';
import {IComponenteTarifario} from './IComponenteTarifario';

export interface ITarifa {
    id: number;
    resolucaoId:  number;
    modalidadeId:  number;
    subgrupoTarifarioId:  number;
    modeloTarifarioId:  number;
    resolucao: IResolucao;
    modalidadeTarifaria: IModalidadeTarifaria;
    subgrupoTarifario: ISubGrupoTarifario;
    modeloTarifario: IModeloTarifario;

    adicionalBandeiraVerde: number;
    adicionalBandeiraAmarela: number;
    adicionalBandeiraVermelhaP1: number;
    adicionalBandeiraVermelhaP2: number;

    precos: IPrecoComponente[];
}


