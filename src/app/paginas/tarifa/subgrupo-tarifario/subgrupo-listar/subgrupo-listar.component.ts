import { Component, OnInit } from '@angular/core';
import {TarifaService} from '../../../../../services/tarifa.service';
import {ISubGrupoTarifario} from '../../../../../contracts/ISubGrupoTarifario';

@Component({
  selector: 'app-subgrupo-listar',
  templateUrl: './subgrupo-listar.component.html',
  styleUrls: ['./subgrupo-listar.component.scss']
})
export class SubgrupoListarComponent implements OnInit {

  listaSubgrupo: ISubGrupoTarifario[] = [];

  constructor(  public tarifaService: TarifaService ) { }

  ngOnInit() {
    this.carregarLista()
  }

  carregarLista() {
    this.tarifaService
        .listarSubGrupoTarifario()
        .subscribe(resp => this.listaSubgrupo = resp);
  }

}
