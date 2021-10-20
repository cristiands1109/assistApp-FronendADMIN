import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRegistro, RespCreacionUsuario, AuthLogin, RespLoginUsuario, Usuario, Departamento, RespuestaDepartamento, Ciudad, RespCiudad, RespAcualizacionUsuario, RespuestaRoles, Role, RespUsuarioGET } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { tap, map, catchError, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UiService } from './ui.service';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  public usuario: Usuario;
  public departamento: Departamento[];
  public depActual: Departamento;

  roles: Role[];
  
  constructor( private http: HttpClient, private router: Router, private uiService: UiService) { }


  get userID(): string {
    return this.usuario.usuarioID || '';
  }



  registrarUsuario(usuario: AuthRegistro) {
    console.log('creando usuario');
    return this.http.post<RespCreacionUsuario>(`${url}usuario`, usuario).pipe(
      tap( resp => {
        localStorage.setItem('token', resp.token)
        localStorage.setItem('menu', JSON.stringify(resp.menu))
      })
    )
  }

  loginUsuario(usuario: AuthLogin) {
      console.log('login usuario');
      return this.http.post<RespLoginUsuario>(`${url}auth`,usuario).pipe(
        tap( resp => {
          localStorage.setItem('token', resp.token)
          localStorage.setItem('menu', JSON.stringify(resp.menu))
        })
      )
  }

  actualizarUsuario(data: {nombre: string, apellido: string, ciudad: string, departamento: string, rol?: string} , id?: string) {
      console.log('usuario registro');
      console.log(data);
      // return
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'x-token': token
      })
      if(id) {
        console.log('vien el id');
        console.log(id);
        return this.http.put<RespAcualizacionUsuario>(`${url}usuario/${id}`,data, {headers})
      } else {
        console.log('no hay id');
        return this.http.put<RespAcualizacionUsuario>(`${url}usuario/${this.usuario.celular}`,data, {headers})
      }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login')
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<RespLoginUsuario>(`${url}auth/renew`,{headers}).pipe(
      tap(resp => {
        this.usuario = resp.usuario
        localStorage.setItem('token', resp.token)
        localStorage.setItem('menu', JSON.stringify(resp.menu))
      }),
      map(resp => true),
      catchError(error => of (false))
    )
  }

  getDepartamento() {
    return this.http.get<RespuestaDepartamento>(`${url}departamento/`);
  }


  getCiudadesporDepartamento(depID: string) {
    return this.http.get<RespCiudad>(`${url}ciudad/consulta/${depID}`);
  }


  rolAdmin(rol: string) {
  
    return new Promise(resolve => {
      this.http.get<RespuestaRoles>(`${url}rol`).subscribe(resp => {
            const roles: Role[] = [...resp.Roles]
            const a: Role = roles.find(role => role.rolID === this.usuario.rol )
            if(a.descripcion === 'ADMIN_ROL'){

              resolve(true);
            } else {

              resolve(false)
            }
      }, error => {
        if(error) {
          resolve(false);
        }
      })
    })
  }

  rolDespachante(rol: string) {
    return new Promise(resolve => {
      this.http.get<RespuestaRoles>(`${url}rol`).subscribe(resp => {
            const roles: Role[] = [...resp.Roles]
            const a: Role = roles.find(role => role.rolID === this.usuario.rol )
            if(a.descripcion === 'DEP_ROL' || a.descripcion === 'ADMIN_ROL'){

              resolve(true);
            } else {

              resolve(false)
            }
      }, error => {
        if(error) {
          resolve(false);
        }
      })
    })

  }

  cargarUsuarios(){
    return this.http.get<RespUsuarioGET>(`${url}usuario`)
  }


  eliminarUsuario(usuario: Usuario) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.delete(`${url}usuario/${usuario.celular}`, {headers})
    console.log('eliminando');
  }

  getUsuariobyID(celular: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<Usuario>(`${url}usuario/${celular}`,{headers})
  }

  obtenerRoles() {
    return this.http.get<RespuestaRoles>(`${url}rol`)
  }
}
