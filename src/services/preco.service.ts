import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {ApiService} from './api.service';

@Injectable({providedIn: 'root'})
export class PrecoService {
    public url: string = environment.apiEndpoint ;

    constructor(public api: ApiService) {
    }

    listar() {}

    ver() {}

    editar() {}

    remover() {}

}
