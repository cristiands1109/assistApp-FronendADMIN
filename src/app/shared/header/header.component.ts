import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  constructor( private usuarioService: UsuarioService) { 
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  logOut() {
    this.usuarioService.logOut();
  }

}
