import {environment} from './../environments/environment';
import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IResolucao} from '../contracts/IResolucao';
import {IBandeiraTarifa} from '../contracts/IBandeiraTarifa';


@Injectable({providedIn: 'root'})
export class ResolucaoService {

    public url: string = environment.apiEndpoint + '/resolucoes';

    constructor(public api: ApiService) {}

    listar(): Observable<IResolucao[]> {

        return this.api.get(this.url);
    }

    ver(id: number): Observable<IResolucao>  {
        const url = this.url + '/' + id;
        return this.api.get(url);
    }

    criar(resolucao: IResolucao) {
        return this.api.post(this.url, resolucao);
    }

    editar(id: number, resolucao: IResolucao) {
        return this.api.put(this.url + '/' + id, resolucao);
    }

    remover(id: number) {
        return this.api.remover(this.url, id);
    }


}
