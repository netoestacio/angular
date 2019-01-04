import { ApiService } from './api.service';
import { ICliente } from '../contracts/ICliente';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import { Injectable } from '@angular/core';
import {IEmpresa} from '../contracts/IEmpresa';

@Injectable()
export class ClientesService {

    public url: string;

    constructor(public api: ApiService) {
        this.url = environment.apiEndpoint + '/clientes';
    }

    // Criar
    criar(cliente: ICliente): Observable<ICliente> {
        return this.api.post(this.url, cliente);
    }

    // Ver
    ver(id: number): Observable<ICliente> {
        const url = this.url + '/' + id;
        return this.api.get(url);
    }

    listar(): Observable<ICliente[]> {
        return this.api.get(this.url);
    }

    // Deletar
    deletar(id: number): Observable<ICliente> {
        return this.api.remover(this.url, id);
    }

    editar(id: number, cliente: ICliente) {
        return this.api.put ( this.url + '/' + id, cliente );
    }
}
