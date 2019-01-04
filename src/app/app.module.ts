import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {FiltroContatoPipe} from '../pipes/filtro-contato.pipe';


@NgModule({
  imports: [
    /*  AdminLayoutModule, */
    BrowserAnimationsModule,
    FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
      ToastrModule.forRoot({
          timeOut: 2000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
      }),

    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FiltroContatoPipe,

  ],
  providers: [

   /*
    Service Migrados para AdminlayoutModule
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
     */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
