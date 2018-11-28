import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import {PerfilComponent} from '../../paginas/perfil/perfil.component';
import {PerfilCadastroComponent} from '../../paginas/perfil/perfil-cadastro/perfil-cadastro.component';
import {ClienteComponent} from '../../paginas/cliente/cliente.component';
import {ClienteCadastroComponent} from '../../paginas/cliente/cliente-cadastro/cliente-cadastro.component';
import {PerfilVerComponent} from '../../paginas/perfil/perfil-ver/perfil-ver.component';
import {ClienteVerComponent} from '../../paginas/cliente/cliente-ver/cliente-ver.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'perfil',         component: PerfilComponent },
    { path: 'perfil/:id/editar', component: PerfilCadastroComponent },
    { path: 'perfil/:id/ver', component: PerfilVerComponent },
    { path: 'perfil/cadastro', component: PerfilCadastroComponent },
    { path: 'cliente',         component: ClienteComponent },
    { path: 'cliente/:id/editar', component: ClienteCadastroComponent },
    { path: 'cliente/cadastro', component: ClienteCadastroComponent },
    { path: 'cliente/:id/ver', component: ClienteVerComponent },

];
