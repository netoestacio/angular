
import {environment} from '../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IConcessionaria } from '../contracts/IConcessionaria';
import { ApiService } from './api.service';

@Injectable({providedIn: 'root'})
export class ConcessionariasService {

  public url = environment.apiEndpoint + '/concessionarias';

  constructor(public api: ApiService) {}

  listar(): Observable<IConcessionaria[]> {
    return this.api.get(this.url);
  }

  criar(concessionaria: IConcessionaria) {
    return this.api.post(this.url, concessionaria);
  }

  editar(id: number, concessionaria: IConcessionaria) {
    return this.api.put(this.url + '/' + id, concessionaria);
  }

  remover(id: number) {
    return this.api.remover(this.url, id);
  }

  getConcessionariaById(id: number): Observable<IConcessionaria> {
    return this.api.get(this.url + '/' + id);
  }
}
