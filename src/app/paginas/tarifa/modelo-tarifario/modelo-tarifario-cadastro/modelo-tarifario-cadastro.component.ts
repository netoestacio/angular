import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISubGrupoTarifario} from '../../../../../contracts/ISubGrupoTarifario';
import {IModalidadeTarifaria} from '../../../../../contracts/IModalidadeTarifaria';
import {ModeloTarifaService} from '../../../../../services/modeloTarifa.service';
import {TarifaService} from '../../../../../services/tarifa.service';
import {IComponenteTarifario} from '../../../../../contracts/IComponenteTarifario';
import {IModeloTarifario, ModeloTarifarioComponente} from '../../../../../contracts/IModeloTarifario';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Pagina} from '../../../../../models/pagina';

@Component({
  selector: 'app-modelo-tarifario-cadastro',
  templateUrl: './modelo-tarifario-cadastro.component.html',
  styleUrls: ['./modelo-tarifario-cadastro.component.scss']
})
export class ModeloTarifarioCadastroComponent extends Pagina implements OnInit, OnDestroy {

  titulo = 'Cadastro de Modelo-Tarifário';
  modeloId: number;

   tipoComponente: number;

   componenteId: number;

      modeloTarifario: IModeloTarifario = new class implements IModeloTarifario {
          descricao: string;
          id: number;
          modalidadeTarifaria: IModalidadeTarifaria;
          modalidadeTarifariaId: number;
          modeloTarifarioComponente: ModeloTarifarioComponente[];
          subgrupoTarifario: ISubGrupoTarifario;
          subgrupoTarifarioId: number;
      };

  listaSubgrupo: ISubGrupoTarifario[] = [];
  listaModalidade: IModalidadeTarifaria[] = [];
  listaComponentes: IComponenteTarifario[] = [];
    listaComponentesView: IComponenteTarifario[] = [];

  listaCPModelo: ModeloTarifarioComponente[] = [];
    tipoForm = 0;
  subgrupoId: number;
  subGrupoNome = '';
  modalidadeId: number;
  modalidadeNome = '';
  descricaoModelo = '';

  constructor( public modeloService: ModeloTarifaService,
               public tarifaService: TarifaService,
               public roteador: Router,
               public toastr: ToastrService,
               public rota: ActivatedRoute ) { super(); }

  ngOnInit() {
    this.carregarListas();

      this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

      this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
          this.modeloId = parametros.get('id');
      });


      if (this.roteador.url.endsWith('editar')) {
          this.tipoForm = 1;
          this.titulo = 'Editar a Modelo';
            this.preencherModelo();
      }


  }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }

    preencherModelo() {
        this.modeloService
            .ver(this.modeloId)
            .subscribe(resp => {
                this.modeloTarifario = resp;
                this.descricaoModelo = this.modeloTarifario.descricao;
                this.subGrupoNome = this.modeloTarifario.subgrupoTarifario.descricao;
                this.exibeSubGrupo();
                this.modalidadeNome = this.modeloTarifario.modalidadeTarifaria.descricao;
                this.exibeModalidade();
                this.modeloTarifario.modeloTarifarioComponente.forEach( (x) => {
                    this.tarifaService
                        .verComponenteTarifario(x.componenteTarifarioId)
                        .subscribe(res => {
                            this.listaComponentesView.push(res);

                            let componenteTeste: ModeloTarifarioComponente = new class implements ModeloTarifarioComponente {
                                componenteTarifario: IComponenteTarifario[];
                                componenteTarifarioId: number;
                                modeloTarifarioId: number;
                            };
                            componenteTeste.componenteTarifarioId = res.id;
                            this.listaCPModelo.push(componenteTeste);

                        });
                } );
                console.log(this.modeloTarifario);
            });

        console.log(this.listaCPModelo);
    }


  carregarListas() {
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

    this.modeloService
        .listarComponentesTarifarios()
        .subscribe(resp => {
            this.listaComponentes = resp;
        });
  }


  adicionarComponente() {
      console.log(this.tipoComponente);

          let componenteTeste: ModeloTarifarioComponente = new class implements ModeloTarifarioComponente {
              componenteTarifario: IComponenteTarifario[];
              componenteTarifarioId: number;
              modeloTarifarioId: number;
          };

        let valid = true;

        this.listaComponentes.forEach( (x) => {

                if ( x.id == this.componenteId) {
                    componenteTeste.componenteTarifarioId = x.id;

                    valid = this.verificaLista(componenteTeste.componenteTarifarioId);

                        if (valid === false) {

                            this.listaComponentesView.push( x );
                            this.listaCPModelo.push(componenteTeste);
                        } else {
                            this.toastr.warning('Componente ja Existente', 'Aviso!');
                        }

                    console.log(this.listaCPModelo);
                    console.log(this.listaComponentesView);
                }
        });

          this.tipoComponente = 0;

  }

  removerComponente(valor: IComponenteTarifario) {
      for (let x = 0; x < this.listaCPModelo.length; x++ ) {
         // console.log(this.listaCPModelo[x].componenteTarifarioId);
          if (this.listaCPModelo[x].componenteTarifarioId === valor.id) {
              this.listaCPModelo.splice(x, 1);
              for (let i = 0 ; i < this.listaComponentesView.length; i++) {
                  if (this.listaComponentesView[x].id === valor.id) {
                      this.listaComponentesView.splice(x, 1);
                  }
              }
          }
      }
  }

  verificaLista(id: number): boolean {
      console.log('Verificando');
      let valid = false;
      if (this.listaCPModelo.length > 0) {
          for (let x = 0; x < this.listaCPModelo.length; x++ ) {
              if (this.listaCPModelo[x].componenteTarifarioId === id) {
                  valid = true;
              }
          }
      }

      return valid;
  }

  exibeSubGrupo() {

      let resultado: number;
      for (let x = 0; x < this.listaSubgrupo.length; x++) {
          const y: ISubGrupoTarifario = this.listaSubgrupo[x];
          console.log('loop');
          if (y.descricao === this.subGrupoNome) {
              resultado = y.id;
              console.log(y);
              break;
          }
      }
      this.subgrupoId = resultado;
      console.log(this.subGrupoNome);
  }

  exibeModalidade() {

      let resultado: number;
      for (let x = 0; x < this.listaModalidade.length; x++) {
          const y: IModalidadeTarifaria = this.listaModalidade[x];
          console.log('loop');
          if (y.descricao === this.modalidadeNome) {
              resultado = y.id;
              console.log(y);
              break;
          }
      }
     this.modalidadeId = resultado;
      console.log(this.modalidadeNome);
  }

  exibeTipo(valor): string {
      console.log(valor);
      let resultado = '';

      switch ( valor ) {
          case '1':
              resultado = 'TUSD';
              break;
          case '2':
              resultado = 'TE';
              break;
      }
      return resultado;
  }


  salvar() {

      this.modeloTarifario.descricao = this.descricaoModelo;
      this.modeloTarifario.modalidadeTarifariaId = this.modalidadeId;
      this.modeloTarifario.subgrupoTarifarioId = this.subgrupoId;
      this.modeloTarifario.modeloTarifarioComponente  = this.listaCPModelo;

      console.log(JSON.stringify(this.modeloTarifario));

      if (this.tipoForm === 1) {

          console.log(JSON.stringify(this.modeloTarifario));

            this.modeloService
                .editar(this.modeloId, this.modeloTarifario)
                .subscribe(
                    sucesso => {
                        this.toastr.success('Editado com Sucesso', 'Sucesso!');
                        setTimeout( () => {
                            this.roteador.navigate(['/tarifa/modelo-tarifario/']);
                        }, 1500 );
                    } ,
                    erro => {
                        console.log(erro);
                        this.toastr.warning(erro, 'Error!');
                    }

                );
      } else {
          this.modeloService
              .criar(this.modeloTarifario)
              .subscribe(
                  sucesso => {
                      this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');
                      setTimeout( () => {
                          this.roteador.navigate(['/tarifa/modelo-tarifario/']);
                      }, 1500 );
                  } ,
                  erro => {
                      console.log(erro);
                      this.toastr.warning(erro, 'Error!');
                  }

              );
      }

  }

}
