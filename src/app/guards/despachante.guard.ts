import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DespachanteGuard implements CanActivate {
  rol: string;

  constructor( private usuarioService: UsuarioService) {
    this.rol = this.usuarioService.usuario.rol;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean>{
      console.log('despachante guard');
      const valido = this.usuarioService.rolDespachante(this.rol).then(resp => {
        if( resp ) { return true} else {return false}
      })
    return valido;
  }
  
}
