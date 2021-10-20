import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './mantenimientos/usuarios/editar-usuario.component';
import { DenunciasComponent } from './denuncias/denuncias/denuncias.component';
import { EmitirDenunciaComponent } from './denuncias/denuncias/emitir-denuncia.component';
import { AlertasComponent } from './denuncias/alertas/alertas.component';
import { EditarAlertaComponent } from './denuncias/alertas/editar-alerta.component';
import { DepartamentosComponent } from './mantenimientos/departamentos/departamentos.component';
import { CiudadesComponent } from './mantenimientos/ciudades/ciudades.component';
import { TipoEmergenciasComponent } from './mantenimientos/tipoEmergencias/tipo-emergencias.component';
import { RolesComponent } from './mantenimientos/roles/roles.component';
import { NivelesComponent } from './mantenimientos/niveles/niveles.component';
import { EstadosComponent } from './mantenimientos/estados/estados.component';
import { EditarDepartamentoComponent } from './mantenimientos/departamentos/editar-departamento.component';
import { EditarCiudadComponent } from './mantenimientos/ciudades/editar-ciudad.component';
import { EditarEstadoComponent } from './mantenimientos/estados/editar-estado.component';
import { EditarNivelComponent } from './mantenimientos/niveles/editar-nivel.component';
import { EditarTipoEmergenciaComponent } from './mantenimientos/tipoEmergencias/editar-tipo-emergencia.component';
import { EditarRolComponent } from './mantenimientos/roles/editar-rol.component';




@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    PerfilComponent,
    UsuariosComponent,
    EditarUsuarioComponent,
    DenunciasComponent,
    EmitirDenunciaComponent,
    AlertasComponent,
    EditarAlertaComponent,
    DepartamentosComponent,
    CiudadesComponent,
    TipoEmergenciasComponent,
    RolesComponent,
    NivelesComponent,
    EstadosComponent,
    EditarDepartamentoComponent,
    EditarCiudadComponent,
    EditarEstadoComponent,
    EditarNivelComponent,
    EditarTipoEmergenciaComponent,
    EditarRolComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    UsuariosComponent,
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
