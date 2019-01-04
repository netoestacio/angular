import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {IContato} from '../contracts/IContato';

@Injectable({providedIn: 'root'})
export class ContatoService {

    public url = environment.apiEndpoint + '/contatos';

    public listaContatos: IContato[] = [];

    constructor(public api: ApiService) {
    }

    ver(id: number): Observable<IContato> {
        return this.api.get(this.url + id);
    }

    listar(): Observable<IContato[]> {
        return this.api.get(this.url);
    }

    listarContatoUnidade(unidadeId: number): Observable<IContato[]> {
        return this.api.get(this.url + '?unidadeid=' + unidadeId);
    }

    criar(contato: IContato ): Observable<IContato> {
        return this.api.post(this.url, contato);
    }

    vincularContatounidade(unidadeId: number) {

      console.log(unidadeId);
      for (const item of this.listaContatos) {

        console.log(`${this.url}/${item.id}/unidades/${unidadeId}`);

         this.api.associar(`${this.url}/${item.id}/unidades/${unidadeId} `).subscribe((resp: JSON) => console.log(resp) );

      }
    }

    desvincularContatounidade(unidadeId: number, contatoId: number) {
      this.api.remover(this.url, contatoId + '/unidades/' + unidadeId)
          .subscribe( (resp: JSON) => console.log(resp) );
    }

    editar(contato: IContato): Observable<IContato> {
        return this.api.put(this.url, contato);
    }

    deletar(id) {
        return this.api.remover(this.url, id);
    }

    memoriaVirtualContato(valor: IContato[]) {
        this.listaContatos = valor;
    }

    getMemoria() {
      return this.listaContatos;
    }

}
