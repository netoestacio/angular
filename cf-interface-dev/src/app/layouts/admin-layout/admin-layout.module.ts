import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
} from '@angular/material';

import {PerfilComponent} from '../../paginas/perfil/perfil.component';

import {ListarComponent} from '../../paginas/perfil/listar/listar.component';
import {PerfilCadastroComponent} from '../../paginas/perfil/perfil-cadastro/perfil-cadastro.component';
import {PerfilVerComponent} from '../../paginas/perfil/perfil-ver/perfil-ver.component';
import {ClienteComponent} from '../../paginas/cliente/cliente.component';
import {ClienteCadastroComponent} from '../../paginas/cliente/cliente-cadastro/cliente-cadastro.component';
import {ClienteListarComponent} from '../../paginas/cliente/cliente-listar/cliente-listar.component';
import {ClienteVerComponent} from '../../paginas/cliente/cliente-ver/cliente-ver.component';
import {ConcessionariaComponent} from '../../paginas/concessionaria/concessionaria.component';
import {ConcessionariaListaComponent} from '../../paginas/concessionaria/concessionaria-lista/concessionaria-lista.component';
import {ConcessionariaCadastroComponent} from '../../paginas/concessionaria/concessionaria-cadastro/concessionaria-cadastro.component';
import {ConcessionariaVerComponent} from '../../paginas/concessionaria/concessionaria-ver/concessionaria-ver.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
      MatButtonModule,
      MatFormFieldModule,
      MatTooltipModule,
      MatAutocompleteModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatStepperModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
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
      ClienteVerComponent,
      ConcessionariaComponent,
      ConcessionariaListaComponent,
      ConcessionariaCadastroComponent,
      ConcessionariaVerComponent,


  ]
})

export class AdminLayoutModule {}
