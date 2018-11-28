import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPerfil} from '../../../../contracts/IPerfil';
import {PerfilService} from '../../../../services/perfil.service';
import {NotificacoesService} from '../../../../services/notificacoes.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pagina} from '../../../../models/pagina';

@Component({
  selector: 'app-perfil-cadastro',
  templateUrl: './perfil-cadastro.component.html',
  styleUrls: ['./perfil-cadastro.component.scss']
})
export class PerfilCadastroComponent extends Pagina implements OnInit, OnDestroy {


    titulo = 'cadastrar um perfil';

    public perfilId: number;

    public perfil: IPerfil ;

    public nomeForm: string;

    public tipoForm: number = 0;

    constructor(
                public perfilService: PerfilService,
                public roteador: Router,
                public rota: ActivatedRoute) { super();  }

    ngOnInit() {



        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap
            .subscribe((parametros: Params) => {this.perfilId = parametros.get('id');});


        if (this.roteador.url.endsWith('editar')) {
            this.titulo = 'editar o perfil';
            this.tipoForm = 1;
            this.carregarPerfilSelecionado();
        }
        if (this.roteador.url.endsWith('ver')) {
            this.titulo = 'dados do perfil';
            this.carregarPerfilSelecionado();
        }

    }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }

    carregarPerfilSelecionado() {
        this.perfilService
            .getPerfilById(this.perfilId)
            .subscribe(resp => {
                  this.perfil = resp;
                  this.nomeForm = this.perfil.nome;
                }
            );
    }


    salvar(value: IPerfil) {

        if (this.tipoForm === 1) {

            this.perfil.nome = value.nome;

            this.perfilService
                .editar(this.perfilId, this.perfil)
                .subscribe(
                sucesso => {
                    console.log('Editado bem sucedido');
                    setTimeout( () => {
                        this.roteador.navigate(['/perfil']);
                    }, 1500 );
                } ,
                erro => {
                    console.log(erro);
                }

            );
        } else {
            this.perfilService
                .criar(value)
                .subscribe(
                    sucesso => {
                        console.log('Cadastro bem sucedido');
                        setTimeout( () => {
                            this.roteador.navigate(['/perfil']);
                        }, 1500 );
                    } ,
                    erro => {
                        console.log(erro);
                    }

                );
        }



    }


}
