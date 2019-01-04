import { IContato } from '../contracts/IContato';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'FiltroContatoPipe'})
export class FiltroContatoPipe implements PipeTransform {

  transform(lista: IContato[], query: string) {

    query = query
              .trim()
              .toLowerCase();
    if (query) {
      return lista.filter(
        item => {
          item.nome.toLowerCase().includes(query);
        });
    } else {
      return lista;
    }

  }

}
