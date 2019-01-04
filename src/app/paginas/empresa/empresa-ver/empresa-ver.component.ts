import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pagina} from '../../../../models/pagina';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ConcessionariasService} from '../../../../services/concessionarias.service';
import {EmpresaService} from '../../../../services/empresas.services';
import {IEmpresa} from '../../../../contracts/IEmpresa';

@Component({
  selector: 'app-empresa-ver',
  templateUrl: './empresa-ver.component.html',
  styleUrls: ['./empresa-ver.component.scss']
})
export class EmpresaVerComponent extends Pagina implements OnInit, OnDestroy {

  titulo = 'dados da empresa';
  public empresaId: number;
  public empresas: IEmpresa[] = [];
  public empresa: IEmpresa;

  constructor(public empresaService: EmpresaService,
              public roteador: Router,
              public rota: ActivatedRoute ) { super(); }

  ngOnInit() {
      this.bloquearEdicao = (!this.roteador.url.endsWith('editar') && !this.roteador.url.endsWith('cadastro'));

      this.espectador = this.rota.paramMap.subscribe((parametros: Params) => {
          this.empresaId = parametros.get('id');
      });


      if (this.roteador.url.endsWith('ver')) {
          this.titulo = 'dados da empresa';
          this.carregarSelecionado();
      }


  }

    ngOnDestroy() {
        this.espectador.unsubscribe();
    }


    carregarSelecionado() {
        this.empresaService
            .getEmpresaById(this.empresaId)
            .subscribe(resp => {
                this.empresa = resp;
                this.empresas.push(this.empresa);
            });
    }

    aplicaMascara(v: string): string {

        // Remove tudo o que não é dígito
        v = v.replace(/\D/g, '' );

        /* if (v.length <= 14) { // CPF

             // Coloca um ponto entre o terceiro e o quarto dígitos
             v = v.replace(/(\d{3})(\d)/,  '$1.$2' );

             // Coloca um ponto entre o terceiro e o quarto dígitos
             // de novo (para o segundo bloco de números)
             v = v.replace(/(\d{3})(\d)/, '$1.$2');

             // Coloca um hífen entre o terceiro e o quarto dígitos
             v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

         } else {  */ // CNPJ

        // Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})(\d)/, '$1.$2' );

        // Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3' );

        // Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2' );

        // Coloca um hífen depois do bloco de quatro dígitos
        v = v.replace(/(\d{4})(\d)/, '$1-$2' );

        // }

        return v

    }

}
