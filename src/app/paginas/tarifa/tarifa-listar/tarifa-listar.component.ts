import { Component, OnInit } from '@angular/core';
import {TarifaService} from '../../../../services/tarifa.service';
import {ToastrService} from 'ngx-toastr';
import {ITarifa} from '../../../../contracts/ITarifa';
import {ISubGrupoTarifario} from '../../../../contracts/ISubGrupoTarifario';
import {IModalidadeTarifaria} from '../../../../contracts/IModalidadeTarifaria';

@Component({
  selector: 'app-tarifa-listar',
  templateUrl: './tarifa-listar.component.html',
  styleUrls: ['./tarifa-listar.component.scss']
})
export class TarifaListarComponent implements OnInit {

  listaTarifas: ITarifa[] = [];
  listaSubgrupo: ISubGrupoTarifario[] = [];
  listaModalidade: IModalidadeTarifaria[] = [];


  constructor( public tarifaService: TarifaService,
               public toastr: ToastrService ) { }

  ngOnInit() {
   this.carregarLista()
  }

  carregarLista() {
    this.tarifaService
        .listarTarifas()
        .subscribe(resp => {
          this.listaTarifas = resp;
         // console.log( JSON.stringify(this.listaTarifas) );
        });

    this.tarifaService
        .listarModalidadeTarifaria()
        .subscribe(resp => {
          this.listaModalidade = resp;
        });

    this.tarifaService
        .listarSubGrupoTarifario()
        .subscribe(resp => {
          this.listaSubgrupo = resp;
        });

  }

  exibirModalidade(id: number): string {
    let resultado = '';
    for (let x = 0; x < this.listaModalidade.length; x++) {
      const y: IModalidadeTarifaria = this.listaModalidade[x];
      if (y.id === id) {
        resultado = y.descricao;
        break;
      }
    }
    return resultado;
  }

  exibirSubGrupo(id: number): string {
    let resultado = '';
    for (let x = 0; x < this.listaSubgrupo.length; x++) {
      const y: ISubGrupoTarifario = this.listaSubgrupo[x];
      if (y.id === id) {
        resultado = y.descricao;
        break;
      }
    }
    return resultado;
  }

  removerTarifa(id: number) {
      this.tarifaService
          .removerTarifa(id)
          .subscribe(
              sucesso => {
                this.carregarLista();
                this.toastr.success('Removido com Sucesso', 'Sucesso!');
                // this.openSnackBar('Removido com Sucesso' , '' );
              },
              erro => {
                this.toastr.warning(erro, 'Error!');
                // this.openSnackBar(erro , '' );
              }
          );
  }

}
