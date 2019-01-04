import {Component, OnDestroy, OnInit} from '@angular/core';
import {IConcessionaria} from '../../../../../contracts/IConcessionaria';
import {IPisPasep} from '../../../../../contracts/IPisPasep';
import {Pagina} from '../../../../../models/pagina';
import {ImpostoService} from '../../../../../services/imposto.service';
import {ConcessionariasService} from '../../../../../services/concessionarias.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {IIcms} from '../../../../../contracts/IIcms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pis-cadastro',
  templateUrl: './pis-cadastro.component.html',
  styleUrls: ['./pis-cadastro.component.scss']
})
export class PisCadastroComponent  extends Pagina implements OnInit, OnDestroy   {

    titulo = 'Cadastro de PIS/PASEP';


    listaConcessionarias: IConcessionaria[] = [];
    pis: IPisPasep;
    pisEdit: IPisPasep = new class implements IPisPasep {
        aliquota: number;
        ano: number;
        concessionariaId: number;
        id: number;
        mes: number;
        tipoPisPasep: number;
    };
    pisId: number;

  id: number;
  mes: number;
  ano: number;
  concessionariaId: number;
  aliquota: number;
  tipo: number;
  tipoForm = 0;

    constructor( public impostoService: ImpostoService,
                 public concessionariaService: ConcessionariasService,
                 public roteador: Router,
                 public toastr: ToastrService,
                 public rota: ActivatedRoute) { super(); }


    ngOnInit() {
        this.concessionariaService
            .listar()
            .subscribe(resp => {
                this.listaConcessionarias = resp;
            });

        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
            this.pisId = parametros.get('id');
        });


        if (this.roteador.url.endsWith('editar')) {
            this.tipoForm = 1;
            this.titulo = 'Editar o PIS/PASEP';
            this.impostoService
                .verPis(this.pisId)
                .subscribe(resp => {
                    this.pis = resp;
                    this.preencherFormulario(this.pis);
                });

        }

    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }


    preencherFormulario(valor: IPisPasep) {
        this.id =  valor.id;
        this.concessionariaId = valor.concessionariaId;
        this.aliquota = valor.aliquota;
        this.tipo = valor.tipoPisPasep;
        this.mes = valor.mes;
        this.ano = valor.ano;
    }

    preencherPisPasep(valor: IPisPasep) {
        this.pisEdit.id = this.pisId;
        this.pisEdit.mes = valor.mes;
        this.pisEdit.concessionariaId = valor.concessionariaId;
        this.pisEdit.tipoPisPasep = this.tipo;
        this.pisEdit.ano = valor.ano;
        this.pisEdit.aliquota = valor.aliquota;
    }

    salvar(value: IPisPasep) {
        if (this.tipoForm === 1) {
            this.preencherPisPasep(value);

            this.impostoService
                .editarPis(this.pisId, this.pisEdit)
                .subscribe(
                    sucesso => {
                        this.toastr.success('Editado com Sucesso' , 'Sucesso!');
                        setTimeout( () => {
                            this.roteador.navigate(['/impostos/pis']);
                        }, 1500 );
                    } ,
                    erro => {
                        this.toastr.warning(erro, 'Error!');
                    }

                );
        } else {
            console.log(JSON.stringify(value));

            const formValido = this.validaError(value);

            if (formValido === true) {
                value.tipoPisPasep = this.tipo;
                this.impostoService
                    .criarPis(value)
                    .subscribe(
                        sucesso => {
                            this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');
                            setTimeout( () => {
                                this.roteador.navigate(['/impostos/pis']);
                            }, 1500 );
                        } ,
                        erro => {
                            this.toastr.warning(erro, 'Error!');
                        }

                    );
            } else {
                const msg = 'Erro ao Cadastrar verifique os campos e tente novamente';
                this.toastr.warning(msg, 'Error!');
            }

        }
    }


    validaError(valor: IPisPasep): boolean {
        let valido = false;
        if (valor.concessionariaId != null) {
            if (valor.aliquota != null) {
                valido = true;
            }
        }
        return valido;
    }

}
