import { ICliente } from '../contracts/ICliente';
import { PipeTransform } from '@angular/core';

export class FiltroIdentificacao implements PipeTransform {

  transform(clientes: ICliente[] , identificacao: string) {
        identificacao = identificacao
        .trim()
        .toLowerCase();

      if (identificacao) {
          return clientes.filter(cliente =>
              cliente.nomeCurto.toLowerCase().includes(identificacao)
          );
      } else {
          return clientes;
      }

  }

}
