import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminGuard } from '../guards/admin.guard';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './mantenimientos/usuarios/editar-usuario.component';
import { DenunciasComponent } from './denuncias/denuncias/denuncias.component';
import { EmitirDenunciaComponent } from './denuncias/denuncias/emitir-denuncia.component';
import { AlertasComponent } from './denuncias/alertas/alertas.component';
import { EditarAlertaComponent } from './denuncias/alertas/editar-alerta.component';
import { DepartamentosComponent } from './mantenimientos/departamentos/departamentos.component';
import { CiudadesComponent } from './mantenimientos/ciudades/ciudades.component';
import { EstadosComponent } from './mantenimientos/estados/estados.component';
import { NivelesComponent } from './mantenimientos/niveles/niveles.component';
import { RolesComponent } from './mantenimientos/roles/roles.component';
import { TipoEmergenciasComponent } from './mantenimientos/tipoEmergencias/tipo-emergencias.component';
import { EditarRolComponent } from './mantenimientos/roles/editar-rol.component';
import { EditarEstadoComponent } from './mantenimientos/estados/editar-estado.component';
import { EditarNivelComponent } from './mantenimientos/niveles/editar-nivel.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { EditarTipoEmergenciaComponent } from './mantenimientos/tipoEmergencias/editar-tipo-emergencia.component';
import { EditarDepartamentoComponent } from './mantenimientos/departamentos/editar-departamento.component';
import { EditarCiudadComponent } from './mantenimientos/ciudades/editar-ciudad.component';
import { DespachanteGuard } from '../guards/despachante.guard';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Perfil de usuario' }},

            // denuncias
            { path: 'denuncias', canActivate:[DespachanteGuard], component: DenunciasComponent, data: { titulo: 'Denuncias' }},
            { path: 'denuncia/:emergenciaID', canActivate:[DespachanteGuard], component: EmitirDenunciaComponent, data: { titulo: 'Emitir Denuncia' }},
            { path: 'alertas', canActivate:[DespachanteGuard], component: AlertasComponent, data: { titulo: 'Alertas' }},
            { path: 'alerta/:emergenciaID', canActivate:[DespachanteGuard], component: EditarAlertaComponent, data: { titulo: 'Alerta' }},

            // mantenimientos
            {path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios' }},
            {path: 'usuario/:celular', canActivate: [AdminGuard], component: EditarUsuarioComponent, data: { titulo: 'Actualizar Usuario' }},
            {path: 'roles', canActivate: [AdminGuard], component: RolesComponent, data: { titulo: 'Roles' }},
            {path: 'rol/:rolID', canActivate: [AdminGuard], component: EditarRolComponent, data: { titulo: 'Mantenimiento Rol' }},
            {path: 'rol/nuevo', component: EditarRolComponent, data: { titulo: 'Mantenimiento Rol' }},
            {path: 'estados', canActivate: [AdminGuard], component: EstadosComponent, data: { titulo: 'Estados' }},
            {path: 'estado/:estadosID', canActivate: [AdminGuard], component: EditarEstadoComponent, data: { titulo: 'Mantenimiento Estado' }},
            {path: 'estado/nuevo', canActivate: [AdminGuard], component: EditarEstadoComponent, data: { titulo: 'Mantenimiento Estado' }},
            {path: 'niveles', canActivate: [AdminGuard], component: NivelesComponent, data: { titulo: 'Niveles' }},
            {path: 'nivel/:nivelID', canActivate: [AdminGuard], component: EditarNivelComponent, data: { titulo: 'Mantenimiento Nivel' }},
            {path: 'nivel/nuevo', canActivate: [AdminGuard], component: EditarNivelComponent, data: { titulo: 'Mantenimiento Nivel' }},
            {path: 'tipo-emergencias', canActivate:[AdminGuard], component: TipoEmergenciasComponent, data: { titulo: 'Tipo Emergencias' }},
            {path: 'tipo-emergencia/:tipoemID', canActivate: [AdminGuard], component: EditarTipoEmergenciaComponent, data: { titulo: 'Mantenimiento Tipo Emergencia' }},
            {path: 'tipo-emergencia/nuevo', canActivate: [AdminGuard], component: EditarTipoEmergenciaComponent, data: { titulo: 'Mantenimiento Tipo Emergencia' }},
            {path: 'departamentos', canActivate: [AdminGuard], component: DepartamentosComponent, data: { titulo: 'Departamentos' }},
            {path: 'departamento/:departamentoID', canActivate: [AdminGuard], component: EditarDepartamentoComponent, data: { titulo: 'Mantenimiento Departamento' }},
            {path: 'departamento/nuevo', canActivate: [AdminGuard], component: EditarDepartamentoComponent, data: { titulo: 'Mantenimiento Departamento' }},
            {path: 'ciudades', canActivate: [AdminGuard], component: CiudadesComponent, data: { titulo: 'Ciudades' }},
            {path: 'ciudad/:ciudadID', canActivate: [AdminGuard], component: EditarCiudadComponent, data: { titulo: 'Mantenimiento Ciudad' }},
            {path: 'ciudad/:ciudadID/:depID', canActivate: [AdminGuard], component: EditarCiudadComponent, data: { titulo: 'Mantenimiento Ciudad' }},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


