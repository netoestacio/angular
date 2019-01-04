import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import {PerfilComponent} from '../../paginas/perfil/perfil.component';
import {PerfilCadastroComponent} from '../../paginas/perfil/perfil-cadastro/perfil-cadastro.component';
import {ClienteComponent} from '../../paginas/cliente/cliente.component';
import {ClienteCadastroComponent} from '../../paginas/cliente/cliente-cadastro/cliente-cadastro.component';
import {PerfilVerComponent} from '../../paginas/perfil/perfil-ver/perfil-ver.component';
import {ClienteVerComponent} from '../../paginas/cliente/cliente-ver/cliente-ver.component';
import {ConcessionariaCadastroComponent} from '../../paginas/concessionaria/concessionaria-cadastro/concessionaria-cadastro.component';
import {ConcessionariaComponent} from '../../paginas/concessionaria/concessionaria.component';
import {ConcessionariaVerComponent} from '../../paginas/concessionaria/concessionaria-ver/concessionaria-ver.component';
import {EmpresaComponent} from '../../paginas/empresa/empresa.component';
import {EmpresaCadastrarComponent} from '../../paginas/empresa/empresa-cadastrar/empresa-cadastrar.component';
import {EmpresaVerComponent} from '../../paginas/empresa/empresa-ver/empresa-ver.component';
import {UnidadeComponent} from '../../paginas/unidade/unidade.component';
import {UnidadeCadastroComponent} from '../../paginas/unidade/unidade-cadastro/unidade-cadastro.component';
import {UnidadeVerComponent} from '../../paginas/unidade/unidade-ver/unidade-ver.component';
import {IcmsComponent} from '../../paginas/impostos/icms/icms.component';
import {PisComponent} from '../../paginas/impostos/pis/pis.component';
import {CofinsComponent} from '../../paginas/impostos/cofins/cofins.component';
import {IcmsCadastroComponent} from '../../paginas/impostos/icms/icms-cadastro/icms-cadastro.component';
import {PisCadastroComponent} from '../../paginas/impostos/pis/pis-cadastro/pis-cadastro.component';
import {CofinsCadastroComponent} from '../../paginas/impostos/cofins/cofins-cadastro/cofins-cadastro.component';
import {UserPerfilComponent} from '../../paginas/usuario/user-perfil/user-perfil.component';
import {UserCadastroComponent} from '../../paginas/usuario/user-cadastro/user-cadastro.component';
import {BandeiraCadastroComponent} from '../../paginas/tarifa/bandeira-tarifaria/bandeira-cadastro/bandeira-cadastro.component';
import {BandeiraTarifariaComponent} from '../../paginas/tarifa/bandeira-tarifaria/bandeira-tarifaria.component';
import {ModalidadeTarifariaComponent} from '../../paginas/tarifa/modalidade-tarifaria/modalidade-tarifaria.component';
import {SubgrupoTarifarioComponent} from '../../paginas/tarifa/subgrupo-tarifario/subgrupo-tarifario.component';
import {SubgrupoVerComponent} from '../../paginas/tarifa/subgrupo-tarifario/subgrupo-ver/subgrupo-ver.component';
import {ModalidadeVerComponent} from '../../paginas/tarifa/modalidade-tarifaria/modalidade-ver/modalidade-ver.component';
import {CofinsVerComponent} from '../../paginas/impostos/cofins/cofins-ver/cofins-ver.component';
import {PisVerComponent} from '../../paginas/impostos/pis/pis-ver/pis-ver.component';
import {IcmsVerComponent} from '../../paginas/impostos/icms/icms-ver/icms-ver.component';
import {BandeiraVerComponent} from '../../paginas/tarifa/bandeira-tarifaria/bandeira-ver/bandeira-ver.component';
import {ResolucaoComponent} from '../../paginas/tarifa/resolucao/resolucao.component';
import {ResolucaoVerComponent} from '../../paginas/tarifa/resolucao/resolucao-ver/resolucao-ver.component';
import {ResolucaoCadastroComponent} from '../../paginas/tarifa/resolucao/resolucao-cadastro/resolucao-cadastro.component';
import {TarifaListarComponent} from '../../paginas/tarifa/tarifa-listar/tarifa-listar.component';
import {TarifaVerComponent} from '../../paginas/tarifa/tarifa-ver/tarifa-ver.component';
import {TarifaCadastroComponent} from '../../paginas/tarifa/tarifa-cadastro/tarifa-cadastro.component';
import {ModeloTarifarioComponent} from '../../paginas/tarifa/modelo-tarifario/modelo-tarifario.component';
import {ModeloTarifarioCadastroComponent} from '../../paginas/tarifa/modelo-tarifario/modelo-tarifario-cadastro/modelo-tarifario-cadastro.component';
import {ModeloTarifarioVerComponent} from '../../paginas/tarifa/modelo-tarifario/modelo-tarifario-ver/modelo-tarifario-ver.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
   // { path: 'dashboard/:id',      component: DashboardComponent },

    { path: 'perfil',         component: PerfilComponent },
    { path: 'perfil/:id/editar', component: PerfilCadastroComponent },
    { path: 'perfil/:id/ver', component: PerfilVerComponent },
    { path: 'perfil/cadastro', component: PerfilCadastroComponent },

    { path: 'cliente',         component: ClienteComponent },
    { path: 'cliente/:id/editar', component: ClienteCadastroComponent },
    { path: 'cliente/cadastro', component: ClienteCadastroComponent },
    { path: 'cliente/:id/ver', component: ClienteVerComponent },

    { path: 'concessionaria',         component: ConcessionariaComponent },
    { path: 'concessionaria/:id/editar', component: ConcessionariaCadastroComponent },
    { path: 'concessionaria/cadastro', component: ConcessionariaCadastroComponent },
    { path: 'concessionaria/:id/ver', component: ConcessionariaVerComponent },

    { path: 'empresa',         component: EmpresaComponent },
    { path: 'empresa/:id/editar', component: EmpresaCadastrarComponent },
    { path: 'empresa/cadastro', component: EmpresaCadastrarComponent },
    { path: 'empresa/:id/ver', component: EmpresaVerComponent },

    { path: 'unidade',         component: UnidadeComponent },
    { path: 'unidade/:id/editar', component: UnidadeCadastroComponent },
    { path: 'unidade/cadastro', component: UnidadeCadastroComponent },
    { path: 'unidade/:id/ver', component: UnidadeVerComponent },

    { path: 'impostos/icms', component: IcmsComponent },
    { path: 'impostos/icms/icms-cadastro', component: IcmsCadastroComponent },
    { path: 'impostos/icms/:id/editar', component: IcmsCadastroComponent },
    { path: 'impostos/icms/:id/ver', component: IcmsVerComponent },

    { path: 'impostos/pis', component: PisComponent },
    { path: 'impostos/pis/pis-cadastro', component: PisCadastroComponent },
    { path: 'impostos/pis/:id/editar', component: PisCadastroComponent },
    { path: 'impostos/pis/:id/ver', component: PisVerComponent },

    { path: 'impostos/cofins', component: CofinsComponent },
    { path: 'impostos/cofins/:id/editar', component: CofinsCadastroComponent },
    { path: 'impostos/cofins/cofins-cadastro', component: CofinsCadastroComponent },
    { path: 'impostos/cofins/:id/ver', component: CofinsVerComponent },

    { path: 'usuario/user-perfil', component: UserPerfilComponent },
    { path: 'usuario/user-cadastro', component: UserCadastroComponent },

    { path: 'tarifa', component: TarifaListarComponent },
    { path: 'tarifa/:id/ver', component: TarifaVerComponent },
    { path: 'tarifa/:id/editar', component: TarifaCadastroComponent },
    { path: 'tarifa/tarifa-cadastro', component: TarifaCadastroComponent },

    { path: 'tarifa/bandeira-tarifaria', component: BandeiraTarifariaComponent },
    { path: 'tarifa/bandeira-tarifaria/:id/ver', component: BandeiraVerComponent },
    { path: 'tarifa/bandeira-tarifaria/:id/editar', component: BandeiraCadastroComponent },
    { path: 'tarifa/bandeira-tarifaria/bandeira-cadastro', component: BandeiraCadastroComponent },

    { path: 'tarifa/modalidade-tarifaria', component: ModalidadeTarifariaComponent },
    { path: 'tarifa/modalidade-tarifaria/:id/ver', component: ModalidadeVerComponent },

    { path: 'tarifa/subgrupo-tarifario', component: SubgrupoTarifarioComponent },
    { path: 'tarifa/subgrupo-tarifario/:id/ver', component: SubgrupoVerComponent },

    { path: 'tarifa/resolucao', component: ResolucaoComponent },
    { path: 'tarifa/resolucao/:id/ver', component: ResolucaoVerComponent },
    { path: 'tarifa/resolucao/:id/editar', component: ResolucaoCadastroComponent },
    { path: 'tarifa/resolucao/resolucao-cadastro', component: ResolucaoCadastroComponent },

    { path: 'tarifa/modelo-tarifario', component:  ModeloTarifarioComponent },
    { path: 'tarifa/modelo-tarifario/:id/ver', component: ModeloTarifarioVerComponent },
    { path: 'tarifa/modelo-tarifario/:id/editar', component: ModeloTarifarioCadastroComponent },
    { path: 'tarifa/modelo-tarifario/cadastro', component: ModeloTarifarioCadastroComponent },
];
