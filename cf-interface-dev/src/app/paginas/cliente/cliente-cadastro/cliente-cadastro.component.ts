import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICliente} from '../../../../contracts/ICliente';
import {ClientesService} from '../../../../services/clientes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pagina} from '../../../../models/pagina';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent extends Pagina implements OnInit, OnDestroy {

    titulo = 'Cadastro de cliente';
    public tipoForm = 0;

    public clienteId;
    public razaoSocial: string;
    public cnpj: string;
    public nomeCurto: string;
    public ativo: boolean;

    public cliente: ICliente;

    constructor(public clientesService: ClientesService,
                public roteador: Router,
                public rota: ActivatedRoute ) { super(); }

  ngOnInit() {

      this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

      this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
          this.clienteId = parametros.get('id');
      });

      if (this.roteador.url.endsWith('editar')) {
          this.tipoForm = 1;
          this.titulo = 'edição do cliente';
          this.carregarSelecionado();
      }
      if (this.roteador.url.endsWith('ver')) {
          this.titulo = 'dados do cliente';
          this.carregarSelecionado();
      }


  }

  ngOnDestroy() {
      this.espectador.unsubscribe();
  }

  carregarSelecionado() {
    this.clientesService
        .ver(this.clienteId)
        .subscribe(resp => {
           this.cliente = resp;
           this.preencherFormulario(this.cliente);
        });
  }

  preencherFormulario(valor: ICliente) {
        this.razaoSocial = valor.razaoSocial;
        this.cnpj = valor.cnpj;
        this.nomeCurto = valor.nomeCurto;
        this.ativo = valor.ativo;
  }

}
