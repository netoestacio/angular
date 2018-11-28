import {environment} from '../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ILogradouro } from '../contracts/ILogradouro';
import { IEstado } from '../contracts/IEstado';
import { ICidade } from '../contracts/ICidade';
import { ApiService } from './api.service';
import { IEndereco } from '../contracts/IEndereco';

@Injectable({providedIn: 'root'})
export class EnderecoService {

  public endpoint: string;

  public url: string = environment.apiEndpoint;

  public enderecos: IEndereco[] = [];

  constructor(public api: ApiService) {}

  getEnderecoById(id: number): Observable<IEndereco> {
    return this.api.get(this.url + '/enderecos/' + id);
  }

  getEnderecoFaturaById(id: number): Observable<IEndereco> {
    return this.api.get(this.url + '/enderecos/' + id);
  }

  listarCidades(): Observable<ICidade[]> {
    this.endpoint = '/enderecos/cidades';
    return this.api.get(this.url + this.endpoint);
  }

  listarCidadesEstado(uf: string): Observable<ICidade[]> {
    this.endpoint = '/enderecos/cidades?EstadoId=' + uf;
    return this.api.get(this.url + this.endpoint);
  }

  listarEstados(): Observable<IEstado[]> {
    this.endpoint = '/enderecos/estados';
    return this.api.get(this.url + this.endpoint);
  }

  listarTipoLogradoro(): Observable<ILogradouro[]> {
    this.endpoint = '/enderecos/tiposlogradouro';
    return this.api.get(this.url + this.endpoint);
  }

}
