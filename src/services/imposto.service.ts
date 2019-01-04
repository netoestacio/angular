import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../environments/environment.prod';
import {Observable} from 'rxjs';
import {IPisPasep} from '../contracts/IPisPasep';
import {IIcms} from '../contracts/IIcms';
import {ICofins} from '../contracts/ICofins';

@Injectable({providedIn: 'root'})
export class ImpostoService {
    private url: string;

    constructor(private api: ApiService) {
        this.url = environment.apiEndpoint;
    }
////////////////////////////////////////// PIS //////////////////////////////////////////////////////
    listarPis(): Observable<IPisPasep[]> {
        return this.api.get(this.url + '/pispasep');
    }

    verPis(id: Number) {
        return this.api.get(this.url  + '/pispasep/' + id);
    }

    criarPis(valor: IPisPasep) {
        return this.api.post(this.url  + '/pispasep', valor);
    }

    editarPis(id: number, valor: IPisPasep) {
        return this.api.put(this.url  + '/pispasep/' + id, valor );
    }

    deletarPis(id: number) {
        return this.api.remover(this.url  + '/pispasep', id);
    }

    ////////////////////////////////////////// ICMS //////////////////////////////////////////////////////

    // Criar
    criarIcms(valor: IIcms): Observable<IIcms> {
        return this.api.post(this.url + '/icms', valor);
    }

    // Ver
    verIcms(id: number): Observable<IIcms> {
        const url = this.url + '/icms/' + id;
        return this.api.get(url);
    }

    listarIcms(): Observable<IIcms[]> {
        return this.api.get(this.url + '/icms');
    }

    // Deletar
    deletarIcms(id: number): Observable<IIcms> {
        return this.api.remover(this.url + '/icms', id);
    }

    editarIcms(id: number, valor: IIcms) {
        return this.api.put ( this.url + '/icms/' + id, valor );
    }
    ////////////////////////////////////////// Cofins //////////////////////////////////////////////////////

    // Criar
    criarCofins(valor: ICofins): Observable<ICofins> {
        return this.api.post(this.url + '/cofins', valor);
    }

    // Ver
    verCofins(id: number): Observable<ICofins> {
        const url = this.url + '/cofins/' + id;
        return this.api.get(url);
    }

    listarCofins(): Observable<ICofins[]> {
        return this.api.get(this.url + '/cofins');
    }

    // Deletar
    deletarCofins(id: number): Observable<ICofins> {
        return this.api.remover(this.url + '/cofins', id);
    }

    editarCofins(id: number, valor: ICofins) {
        return this.api.put ( this.url + '/cofins/' + id, valor );
    }


}
