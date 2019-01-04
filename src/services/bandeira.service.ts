import {Injectable} from '@angular/core';

import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {IBandeiraTarifa} from '../contracts/IBandeiraTarifa';
import {environment} from '../environments/environment';
import {ICofins} from '../contracts/ICofins';

@Injectable({providedIn: 'root'})
export class BandeiraService {

    public url: string;

    constructor(public api: ApiService) {
        this.url = environment.apiEndpoint;
    }

    criar(valor: IBandeiraTarifa): Observable<IBandeiraTarifa> {
        return this.api.post(this.url +  '/bandeirastarifarias', valor);
    }

    listar(): Observable<IBandeiraTarifa[]> {
        return this.api.get(this.url +  '/bandeirastarifarias');
    }

    ver(id: number): Observable<IBandeiraTarifa>  {
        const url = this.url + '/bandeirastarifarias/' + id;
        return this.api.get(url);
    }

    remover(id: number): Observable<IBandeiraTarifa> {
        return this.api.remover(this.url + '/bandeirastarifarias', id);
    }

    editar(id: number, valor: IBandeiraTarifa) {
        return this.api.put ( this.url + '/bandeirastarifarias/' + id, valor );
    }

}
