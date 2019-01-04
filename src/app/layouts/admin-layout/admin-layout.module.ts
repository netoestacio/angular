import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TextMaskModule } from 'angular2-text-mask';

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
    MatToolbarModule, MAT_CHECKBOX_CLICK_ACTION,
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
import {SelectGestorComponent} from '../../components/select/select-gestor/select-gestor.component';
import {EmpresaComponent} from '../../paginas/empresa/empresa.component';
import {EmpresaListarComponent} from '../../paginas/empresa/empresa-listar/empresa-listar.component';
import {EmpresaVerComponent} from '../../paginas/empresa/empresa-ver/empresa-ver.component';
import {EmpresaCadastrarComponent} from '../../paginas/empresa/empresa-cadastrar/empresa-cadastrar.component';
import {UnidadeComponent} from '../../paginas/unidade/unidade.component';
import {UnidadeVerComponent} from '../../paginas/unidade/unidade-ver/unidade-ver.component';
import {UnidadeListarComponent} from '../../paginas/unidade/unidade-listar/unidade-listar.component';
import {UnidadeCadastroComponent} from '../../paginas/unidade/unidade-cadastro/unidade-cadastro.component';
import {ClientesService} from '../../../services/clientes.service';
import {GestoresService} from '../../../services/gestores.service';
import {ApiService} from '../../../services/api.service';
import {NotificacoesService} from '../../../services/notificacoes.service';
import {BandeiraService} from '../../../services/bandeira.service';
import {ConcessionariasService} from '../../../services/concessionarias.service';
import {ContatoService} from '../../../services/contato.service';
import {EmpresaService} from '../../../services/empresas.services';
import {EnderecoService} from '../../../services/endereco.service';
import {FaturaService} from '../../../services/faturas.service';
import {GlobalService} from '../../../services/global.service';
import {ImpostoService} from '../../../services/imposto.service';
import {PerfilService} from '../../../services/perfil.service';
import {UnidadeService} from '../../../services/unidade.service';
import {IcmsComponent} from '../../paginas/impostos/icms/icms.component';
import {PisComponent} from '../../paginas/impostos/pis/pis.component';
import {CofinsComponent} from '../../paginas/impostos/cofins/cofins.component';
import {UserPerfilComponent} from '../../paginas/usuario/user-perfil/user-perfil.component';
import {UserCadastroComponent} from '../../paginas/usuario/user-cadastro/user-cadastro.component';
import {CofinsCadastroComponent} from '../../paginas/impostos/cofins/cofins-cadastro/cofins-cadastro.component';
import {PisCadastroComponent} from '../../paginas/impostos/pis/pis-cadastro/pis-cadastro.component';
import {IcmsCadastroComponent} from '../../paginas/impostos/icms/icms-cadastro/icms-cadastro.component';
import {IcmsListarComponent} from '../../paginas/impostos/icms/icms-listar/icms-listar.component';
import {PisListarComponent} from '../../paginas/impostos/pis/pis-listar/pis-listar.component';
import {CofinsListarComponent} from '../../paginas/impostos/cofins/cofins-listar/cofins-listar.component';
import {BandeiraTarifariaComponent} from '../../paginas/tarifa/bandeira-tarifaria/bandeira-tarifaria.component';
import {BandeiraListarComponent} from '../../paginas/tarifa/bandeira-tarifaria/bandeira-listar/bandeira-listar.component';
import {BandeiraCadastroComponent} from '../../paginas/tarifa/bandeira-tarifaria/bandeira-cadastro/bandeira-cadastro.component';
import {ModalidadeTarifariaComponent} from '../../paginas/tarifa/modalidade-tarifaria/modalidade-tarifaria.component';
import {ModalidadeListarComponent} from '../../paginas/tarifa/modalidade-tarifaria/modalidade-listar/modalidade-listar.component';
import {TarifaService} from '../../../services/tarifa.service';
import {SubgrupoTarifarioComponent} from '../../paginas/tarifa/subgrupo-tarifario/subgrupo-tarifario.component';
import {SubgrupoListarComponent} from '../../paginas/tarifa/subgrupo-tarifario/subgrupo-listar/subgrupo-listar.component';
import {SubgrupoVerComponent} from '../../paginas/tarifa/subgrupo-tarifario/subgrupo-ver/subgrupo-ver.component';
import {ModalidadeVerComponent} from '../../paginas/tarifa/modalidade-tarifaria/modalidade-ver/modalidade-ver.component';
import {CofinsVerComponent} from '../../paginas/impostos/cofins/cofins-ver/cofins-ver.component';
import {IcmsVerComponent} from '../../paginas/impostos/icms/icms-ver/icms-ver.component';
import {PisVerComponent} from '../../paginas/impostos/pis/pis-ver/pis-ver.component';
import {BandeiraVerComponent} from '../../paginas/tarifa/bandeira-tarifaria/bandeira-ver/bandeira-ver.component';
import {ResolucaoComponent} from '../../paginas/tarifa/resolucao/resolucao.component';
import {ResolucaoCadastroComponent} from '../../paginas/tarifa/resolucao/resolucao-cadastro/resolucao-cadastro.component';
import {ResolucaoListarComponent} from '../../paginas/tarifa/resolucao/resolucao-listar/resolucao-listar.component';
import {ResolucaoVerComponent} from '../../paginas/tarifa/resolucao/resolucao-ver/resolucao-ver.component';
import {ResolucaoService} from '../../../services/resolucao.service';
import {TarifaVerComponent} from '../../paginas/tarifa/tarifa-ver/tarifa-ver.component';
import {TarifaCadastroComponent} from '../../paginas/tarifa/tarifa-cadastro/tarifa-cadastro.component';
import {TarifaListarComponent} from '../../paginas/tarifa/tarifa-listar/tarifa-listar.component';
import {ModeloTarifarioComponent} from '../../paginas/tarifa/modelo-tarifario/modelo-tarifario.component';
import {ModeloTarifarioCadastroComponent} from '../../paginas/tarifa/modelo-tarifario/modelo-tarifario-cadastro/modelo-tarifario-cadastro.component';
import {ModeloTarifarioListarComponent} from '../../paginas/tarifa/modelo-tarifario/modelo-tarifario-listar/modelo-tarifario-listar.component';
import {ModeloTarifarioVerComponent} from '../../paginas/tarifa/modelo-tarifario/modelo-tarifario-ver/modelo-tarifario-ver.component';
import {ModeloTarifaService} from '../../../services/modeloTarifa.service';
import {ViewService} from '../../../services/view.service';


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
      TextMaskModule,

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
      SelectGestorComponent,
      EmpresaComponent,
      EmpresaListarComponent,
      EmpresaVerComponent,
      EmpresaCadastrarComponent,
      UnidadeComponent,
      UnidadeVerComponent,
      UnidadeListarComponent,
      UnidadeCadastroComponent,
      IcmsComponent,
      PisComponent,
      CofinsComponent,
      UserPerfilComponent,
      UserCadastroComponent,
      CofinsCadastroComponent,
      PisCadastroComponent,
      IcmsCadastroComponent,
      IcmsListarComponent,
      PisListarComponent,
      CofinsListarComponent,
      BandeiraTarifariaComponent,
      BandeiraListarComponent,
      BandeiraCadastroComponent,
      ModalidadeTarifariaComponent,
      ModalidadeListarComponent,
      SubgrupoTarifarioComponent,
      SubgrupoListarComponent,
      SubgrupoVerComponent,
      ModalidadeVerComponent,
      CofinsVerComponent,
      IcmsVerComponent,
      PisVerComponent,
      BandeiraVerComponent,
      ResolucaoComponent,
      ResolucaoCadastroComponent,
      ResolucaoListarComponent,
      ResolucaoVerComponent,
      TarifaVerComponent,
      TarifaCadastroComponent,
      TarifaListarComponent,
      ModeloTarifarioComponent,
      ModeloTarifarioCadastroComponent,
      ModeloTarifarioListarComponent,
      ModeloTarifarioVerComponent,

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
        TarifaService,
        ResolucaoService,
        ModeloTarifaService,
        ViewService,
        {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
    ],
})

export class AdminLayoutModule {}
