import {Observable} from 'rxjs/internal/Observable';
import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class FaturaService {

    public url = '';

    constructor(public api: ApiService) {
        this.url = environment.apiEndpoint + '/faturas';
    }

    listar(): Observable<any> {
      return this.api.get(this.url);
    }

    criar(fatura) {
        // return this.api.post(this.url, fatura);
    }

    ver(id: number) {
        // return this.api.get(this.url,id);
    }

    editar(fatura) {
        // return this.api.put(this.url, fatura);
    }

    remover(id: number) {
        // return this.api.remover(this.url, id);
    }


}
