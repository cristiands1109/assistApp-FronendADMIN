import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/interfaces';
import { UiService } from '../../../services/ui.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public usuariosGET: Usuario[];
  public cargando: boolean = true;
  constructor( private usuarioService: UsuarioService, private uiService: UiService) { 
    this.getUsuarios()
  }

  ngOnInit(): void {
  }

  getUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios().subscribe(({Usuario}) => {
      this.usuariosGET = Usuario
      this.cargando = false
    })
  }

  eliminarUsuario(usuario: Usuario) {

    if( usuario.usuarioID === this.usuarioService.userID ){
      return this.uiService.onAlgoAndaMal('No puede auto-eliminar')
    }
    console.log('hola no sucede nada');
    this.uiService.confirm(usuario).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(resp => {
          this.getUsuarios();
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado',
            'success'
          )
        });
      }
    });
    console.log(usuario);
  }

}
