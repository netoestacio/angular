import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

import {IEmpresa} from '../contracts/IEmpresa';
import {ApiService} from './api.service';

@Injectable({providedIn: 'root'})
export class EmpresaService {

    public url = '';
    public clienteId: number;

    constructor(public api: ApiService) {
        this.url = environment.apiEndpoint + '/empresas';
    }

    listar(): Observable<IEmpresa[]> {
        return this.api.get(this.url);
    }

    criar(empresa: IEmpresa): Observable<IEmpresa[]> {

        empresa.statusSlider ? empresa.status = 1 : empresa.status = 0;

        return this.api.post(this.url, empresa);
    }

    listarPorCliente(id: number): Observable<IEmpresa[]> {
        return this.api.get(this.url + '?clienteId=' + id);
    }

    getEmpresaById(id: number) {
        return this.api.get(this.url + '/' + id);
    }

    editar(id: number, empresa: IEmpresa) {
        return this.api.put(this.url + '/' + id, empresa);
    }

    remover(id: number) {
        return this.api.remover(this.url, id);
    }

    testeCliente(id: number) {
      this.getEmpresaById(id)
        .subscribe((resp: IEmpresa) => {
         this.clienteId = resp.clienteId;
        });
    }

    salvarId(valor) {
        this.clienteId = valor;
    }

    getClienteId() {
      return this.clienteId;
    }
}
