import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {ClientesService} from '../services/clientes.service';
import {GestoresService} from '../services/gestores.service';
import {ApiService} from '../services/api.service';
import {NotificacoesService} from '../services/notificacoes.service';
import {BandeiraService} from '../services/bandeira.service';
import {ConcessionariasService} from '../services/concessionarias.service';
import {ContatoService} from '../services/contato.service';
import {EmpresaService} from '../services/empresas.services';
import {EnderecoService} from '../services/endereco.service';
import {FaturaService} from '../services/faturas.service';
import {GlobalService} from '../services/global.service';
import {ImpostoService} from '../services/imposto.service';
import {PerfilService} from '../services/perfil.service';
import {UnidadeService} from '../services/unidade.service';
import {HttpClientModule} from '@angular/common/http';
import {MAT_CHECKBOX_CLICK_ACTION} from '@angular/material';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,


  ],
  providers: [
      ClientesService,
      GestoresService,
      ApiService,
      NotificacoesService,
      ApiService,
      BandeiraService,
      ConcessionariasService,
      ContatoService,
      EmpresaService,
      EnderecoService,
      FaturaService,
      GlobalService,
      ImpostoService,
      PerfilService,
      UnidadeService,
      {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
