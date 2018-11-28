import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';


import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule
} from '@angular/material';
import {PerfilComponent} from '../../paginas/perfil/perfil.component';

import {ListarComponent} from '../../paginas/perfil/listar/listar.component';
import {PerfilCadastroComponent} from '../../paginas/perfil/perfil-cadastro/perfil-cadastro.component';
import {PerfilVerComponent} from '../../paginas/perfil/perfil-ver/perfil-ver.component';
import {ClienteComponent} from '../../paginas/cliente/cliente.component';
import {ClienteCadastroComponent} from '../../paginas/cliente/cliente-cadastro/cliente-cadastro.component';
import {ClienteListarComponent} from '../../paginas/cliente/cliente-listar/cliente-listar.component';
import {ClienteVerComponent} from '../../paginas/cliente/cliente-ver/cliente-ver.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
      MatCheckboxModule
  ],
  declarations: [
    DashboardComponent,
      PerfilComponent,
      ListarComponent,
      PerfilCadastroComponent,
      PerfilVerComponent,
      ClienteComponent,
      ClienteCadastroComponent,
      ClienteListarComponent,
      ClienteVerComponent


  ]
})

export class AdminLayoutModule {}
