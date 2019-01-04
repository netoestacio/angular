import {environment} from './../environments/environment';
import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IPerfil} from '../contracts/IPerfil';


@Injectable({providedIn: 'root'})
export class PerfilService {

    public url: string = environment.apiEndpoint + '/perfis';

    constructor(public api: ApiService) {
    }

    listar(): Observable<IPerfil[]> {

        return this.api.get(this.url);
    }

    criar(perfil: IPerfil) {
        return this.api.post(this.url, perfil);
    }

    editar(id: number, perfil: IPerfil) {
        return this.api.put(this.url + '/' + id, perfil);
    }

    remover(id: number) {
        return this.api.remover(this.url, id);
    }

    getPerfilById(id: number): Observable<IPerfil> {
        return this.api.get(this.url + '/' + id);
    }

}
