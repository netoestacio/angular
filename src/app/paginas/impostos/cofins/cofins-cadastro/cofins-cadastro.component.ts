import {Component, OnDestroy, OnInit} from '@angular/core';
import {IConcessionaria} from '../../../../../contracts/IConcessionaria';
import {IPisPasep} from '../../../../../contracts/IPisPasep';
import {ImpostoService} from '../../../../../services/imposto.service';
import {ConcessionariasService} from '../../../../../services/concessionarias.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Pagina} from '../../../../../models/pagina';
import {ICofins} from '../../../../../contracts/ICofins';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cofins-cadastro',
  templateUrl: './cofins-cadastro.component.html',
  styleUrls: ['./cofins-cadastro.component.scss']
})
export class CofinsCadastroComponent extends Pagina implements OnInit, OnDestroy  {

    titulo = 'Cadastro de COFINS';

    listaConcessionarias: IConcessionaria[] = [];
    cofins: ICofins;
    confinsEdit: ICofins = new class implements ICofins {
        aliquota: number;
        ano: number;
        concessionariaId: number;
        id: number;
        mes: number;
        tipoCofins: number;
    };
    cofinsId: number;

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
            this.cofinsId = parametros.get('id');
        });


        if (this.roteador.url.endsWith('editar')) {
            this.tipoForm = 1;
            this.titulo = 'Editar o COFINS';
            this.impostoService
                .verCofins(this.cofinsId)
                .subscribe(resp => {
                    this.cofins = resp;
                    this.preencherFormulario(this.cofins);
                });

        }

    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }


    preencherFormulario(valor: ICofins) {
        this.id =  valor.id;
        this.concessionariaId = valor.concessionariaId;
        this.aliquota = valor.aliquota;
        this.tipo = valor.tipoCofins;
        this.mes = valor.mes;
        this.ano = valor.ano;
    }

    preecherCofins(valor: ICofins) {
        this.confinsEdit.id = this.cofinsId;
        this.confinsEdit.mes = valor.mes;
        this.confinsEdit.concessionariaId = valor.concessionariaId;
        this.confinsEdit.tipoCofins = this.tipo;
        this.confinsEdit.ano = valor.ano;
        this.confinsEdit.aliquota = valor.aliquota;
    }

    salvar(value: ICofins) {

        if (this.tipoForm === 1) {

            this.preecherCofins(value);

            console.log(JSON.stringify(this.confinsEdit));

            this.impostoService
                .editarCofins(this.cofinsId, this.confinsEdit)
                .subscribe(
                    sucesso => {
                        this.toastr.success('Editado com Sucesso' , 'Sucesso!');
                        setTimeout( () => {
                            this.roteador.navigate(['/impostos/cofins']);
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
                value.tipoCofins = this.tipo;
                this.impostoService
                    .criarCofins(value)
                    .subscribe(
                        sucesso => {
                            this.toastr.success('Cadastrado com Sucesso', 'Sucesso!');
                            setTimeout( () => {
                                this.roteador.navigate(['/impostos/cofins']);
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


    validaError(valor: ICofins): boolean {
        let valido = false;
        if (valor.concessionariaId != null) {
            if (valor.aliquota != null) {
                valido = true;
            }
        }
        return valido;
    }


}
