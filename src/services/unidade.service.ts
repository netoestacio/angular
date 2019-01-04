import {EnderecoService} from './endereco.service';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {ApiService} from './api.service';
import {Injectable} from '@angular/core';

import {IUnidade} from '../contracts/IUnidade';

@Injectable({providedIn: 'root'})
export class UnidadeService {

    public url: string = environment.apiEndpoint + '/unidades';

    constructor(public api: ApiService, public enderecoService: EnderecoService) {
    }

    listar(): Observable<IUnidade[]> {
        return this.api.get(this.url);
    }

    criar(valor) {
        return this.api.post(this.url, valor);
    }

    editar(id: number, unidade: IUnidade) {
        return this.api.put(this.url + '/' + id, unidade);
    }

    remover(id: number) {
        return this.api.remover(this.url, id);
    }

    getUnidadeById(id: number): Observable<IUnidade> {
        return this.api.get(this.url + '/' + id);
    }
}
