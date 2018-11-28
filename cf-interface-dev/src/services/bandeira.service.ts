import {Injectable} from '@angular/core';

import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {IBandeiraTarifa} from '../contracts/IBandeiraTarifa';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class BandeiraService {

    public url: string;

    constructor(public api: ApiService) {
        this.url = environment.apiEndpoint + '/bandeirastarifarias';
    }

    criar() {

    }

    listar(): Observable<IBandeiraTarifa[]> {
        return this.api.get(this.url);
    }

    ver() {

    }

    remover() {

    }

    editar() {

    }

}
