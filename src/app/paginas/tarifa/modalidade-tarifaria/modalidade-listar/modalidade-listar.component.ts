import { Component, OnInit } from '@angular/core';
import {IModalidadeTarifaria} from '../../../../../contracts/IModalidadeTarifaria';
import {TarifaService} from '../../../../../services/tarifa.service';

@Component({
  selector: 'app-modalidade-listar',
  templateUrl: './modalidade-listar.component.html',
  styleUrls: ['./modalidade-listar.component.scss']
})
export class ModalidadeListarComponent implements OnInit {

  listaModalidades: IModalidadeTarifaria[] = [];

  constructor( public tarifaService: TarifaService ) { }

  ngOnInit() {
    this.carregarLista();
  }

  carregarLista() {
    this.tarifaService
        .listarModalidadeTarifaria()
        .subscribe(resp => this.listaModalidades = resp);
  }


}
