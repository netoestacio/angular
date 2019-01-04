import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {IModeloTarifario} from '../contracts/IModeloTarifario';
import {IComponenteTarifario} from '../contracts/IComponenteTarifario';

@Injectable({providedIn: 'root'})
export class ModeloTarifaService {

    public url  =  '';

    constructor(public api: ApiService) {
        this.url = environment.apiEndpoint + '/modelosTarifarios';
    }

    listar(): Observable<IModeloTarifario[]> {
        return this.api.get( this.url);
    }

    ver(id: number): Observable<IModeloTarifario> {
        return this.api.get( this.url + '/' + id);
    }

    criar(valor: IModeloTarifario) {
        return this.api.post(this.url, valor);
    }

    editar(id: number, valor: IModeloTarifario) {
        return this.api.put(this.url + '/' + id, valor);
    }

    remover(id: number) {
        return this.api.remover(this.url, id);
    }

    listarComponentesTarifarios(): Observable<IComponenteTarifario[]> {
        return this.api.get(environment.apiEndpoint + '/componentesTarifarios');
    }

}
