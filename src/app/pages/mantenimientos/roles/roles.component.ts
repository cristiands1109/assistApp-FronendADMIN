import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { Role } from '../../../interfaces/interfaces';
import { UiService } from '../../../services/ui.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: [
  ]
})
export class RolesComponent implements OnInit {

  public roles: Role[] = [];

  // condicionales
  rolCargado: boolean = false;
  sinRegistro: boolean = false;

  constructor(  private mantenimientoService: MantenimientoService, private uiService: UiService) { }

  ngOnInit(): void {
    this.getRoles();
  }


  getRoles() {
    this.mantenimientoService.getRoles().subscribe(({total, Roles}) => {
      this.roles = Roles;
      this.rolCargado = true
      this.sinRegistro = false;
      console.log('roles', this.roles);
    }, (error) => {
      if (error.error.total === 0){
        this.sinRegistro = true;
        this.rolCargado = true
      }
    })
  }

  eliminarRol(rol){
    console.log(rol);
    if( rol.rolID === "60df6e599f7e430e2dcea452") {
      return this.uiService.onAlgoAndaMal(`No puede eliminar el rol ${rol.descripcion}`)
    }
    this.uiService.confirmDeleteRol(rol).then((result) => {
      if (result.isConfirmed) {
        this.mantenimientoService.eliminarRol(rol.rolID).subscribe(resp => {
          this.getRoles();
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado',
            'success'
          )
        });
      }
    });
  }

}
