import {environment} from './../environments/environment';
import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IModalidadeTarifaria} from '../contracts/IModalidadeTarifaria';
import {ISubGrupoTarifario} from '../contracts/ISubGrupoTarifario';
import {ITarifa} from '../contracts/ITarifa';
import {IModeloTarifario} from '../contracts/IModeloTarifario';
import {IComponenteTarifario} from '../contracts/IComponenteTarifario';



@Injectable({providedIn: 'root'})
export class TarifaService {

    public url: string = environment.apiEndpoint ;

    constructor(public api: ApiService) {
    }

    listarModalidadeTarifaria(): Observable<IModalidadeTarifaria[]> {
        return this.api.get(this.url + '/modalidadeTarifarias');
    }

    verModalidadeTarifaria(id: number): Observable<IModalidadeTarifaria>  {
        return this.api.get(this.url + '/modalidadeTarifarias/' + id);
    }

    listarSubGrupoTarifario(): Observable<ISubGrupoTarifario[]> {
        return this.api.get(this.url + '/subgrupotarifarios');
    }

    verSubGrupoTarifario(id: number): Observable<ISubGrupoTarifario>  {
        return this.api.get(this.url + '/subgrupotarifarios/' + id);
    }

   listarTarifas(): Observable<ITarifa[]> {
      return  this.api.get(this.url + '/tarifas');
   }

   verTarifa(id: number): Observable<ITarifa> {
       return  this.api.get(this.url + '/tarifas/' + id);
   }


   listarModelosTarifarios(): Observable<IModeloTarifario[]> {
        return this.api.get( this.url + '/modelosTarifarios');
   }

   verModeloTarifario(id: number): Observable<IModeloTarifario> {
       return this.api.get( this.url + '/modelosTarifarios/' + id);
   }

   verComponenteTarifario(id: number): Observable<IComponenteTarifario> {
       return this.api.get( this.url + '/componentesTarifarios/' + id);
   }

   editarTarifa(id: number, valor) {
        console.log(this.url + '/tarifas/' + id, valor);
       return  this.api.put(this.url + '/tarifas/' + id, valor);
   }

   removerTarifa(id: number) {
       return  this.api.remover(this.url + '/tarifas', id);
   }

    criarTarifa(valor) {
        return  this.api.post(this.url + '/tarifas/', valor);
    }



}
