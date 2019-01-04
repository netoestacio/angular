import { Component, OnInit } from '@angular/core';
import {ModeloTarifaService} from '../../../../../services/modeloTarifa.service';
import {IModeloTarifario} from '../../../../../contracts/IModeloTarifario';
import {TarifaService} from '../../../../../services/tarifa.service';
import {ISubGrupoTarifario} from '../../../../../contracts/ISubGrupoTarifario';
import {IModalidadeTarifaria} from '../../../../../contracts/IModalidadeTarifaria';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-modelo-tarifario-listar',
  templateUrl: './modelo-tarifario-listar.component.html',
  styleUrls: ['./modelo-tarifario-listar.component.scss']
})
export class ModeloTarifarioListarComponent implements OnInit {

  listaModelos: IModeloTarifario[] = [];
  listaSubgrupo: ISubGrupoTarifario[] = [];
  listaModalidade: IModalidadeTarifaria[] = [];


  constructor( public modeloService: ModeloTarifaService,
               public toastr: ToastrService,
               public tarifaService: TarifaService ) { }

  ngOnInit() {
    this.carregarListas();
  }

  carregarListas() {
      this.modeloService
          .listar()
          .subscribe(resp => {
              this.listaModelos = resp;
             // console.log(JSON.stringify(this.listaModelos));
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

  removerModelo(valor: number) {
      this.modeloService
          .remover(valor)
          .subscribe(
              sucesso => {
                  this.carregarListas();
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
