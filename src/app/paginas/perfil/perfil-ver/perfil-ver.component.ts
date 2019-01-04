import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPerfil} from '../../../../contracts/IPerfil';
import {PerfilService} from '../../../../services/perfil.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pagina} from '../../../../models/pagina';

@Component({
  selector: 'app-perfil-ver',
  templateUrl: './perfil-ver.component.html',
  styleUrls: ['./perfil-ver.component.scss']
})
export class PerfilVerComponent extends Pagina implements OnInit, OnDestroy {


    titulo = 'cadastrar um perfil';

    public perfilId: number;

    public perfil: IPerfil ;
    listaPerfis: IPerfil[] = [];

    public nomeForm: string;

    public tipoForm = 0;

    constructor(
        public perfilService: PerfilService,
        public roteador: Router,
        public rota: ActivatedRoute) { super();  }

    ngOnInit() {



        this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

        this.espectador = this.rota.paramMap
            .subscribe((parametros: Params) => {this.perfilId = parametros.get('id');});


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
                    this.listaPerfis.push(this.perfil);
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
