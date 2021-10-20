import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RespuestaRoles, Role, Usuario } from '../interfaces/interfaces';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  rol: string;

  constructor( private usuarioService: UsuarioService) {

    this.rol = this.usuarioService.usuario.rol;

  }

 canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{

      console.log('adminGuard');
      const valido = this.usuarioService.rolAdmin(this.rol).then( resp => {
        if(resp) { return true } else { return false }
      })

      return valido;
  }
  
}
