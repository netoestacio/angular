import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import { IGestor } from '../contracts/IGestor';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GestoresService {

    public url: string;

    constructor(public dados: HttpClient) {
        this.url = environment.apiEndpoint;
    }

    // Obter todos os gestores
    listar() {
        return this.dados.get<IGestor[]>(this.url + '/gestores').pipe(
            map((resposta: IGestor[]) => {
                return resposta;
            })
        );
    }
}
