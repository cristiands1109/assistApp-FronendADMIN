import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaRoles, Role, RespuestaRolPost, RespuestaRolPut, RespuestaRolDelete, RespuestaEstados, RespuestaEstadoPost, Estados, RespuestaEstadoPut, RespuestaEstadoDelete, RespNivel, RespuestaNivelPost, RespuestaNivelDelete, Nivel, RespuestaNivelPut, RespTipoEmergencia, RespTipoEmergenciaGet, RespTipoEmergenciaPut, RespTipoEmergenciaPost, RespuestaDepartamento, RespuestaDepartamentoDelete, Departamento, RespuestaDepartamentoPut, RespuestaDepartamentoPost, RespCiudad, Ciudad, RespCiudadPut, RespCiudadPost, RespCiudadDelete } from '../interfaces/interfaces';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})

export class MantenimientoService {
  
  
  constructor( private http: HttpClient) { }




  /*************************************************************************/
  /******************************** ROLES **********************************/
  /*************************************************************************/
  getRoles() {
      return this.http.get<RespuestaRoles>(`${url}rol`);
  }

  creaRol(data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })

    return this.http.post<RespuestaRolPost>(`${url}rol`,data,{headers})
  }

  obtenerRolbyID(rolID: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<Role>(`${url}rol/${rolID}`,{headers})
  }

  editarRol(rolID: string, data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.put<RespuestaRolPut>(`${url}rol/${rolID}`,data, {headers})
  }


  eliminarRol(rolID: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.delete<RespuestaRolDelete>(`${url}rol/${rolID}`, {headers})
  }



  /*************************************************************************/
  /******************************* ESTADOS *********************************/
  /*************************************************************************/

  getEstados() {
    return this.http.get<RespuestaEstados>(`${url}estado`);
  }


  crearEstado(data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.post<RespuestaEstadoPost>(`${url}estado`, data, {headers})
  }

  getEstadobyID(estadosID: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<Estados>(`${url}estado/${estadosID}`, {headers})
  }

  editarEstado(data, estadosID: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.put<RespuestaEstadoPut>(`${url}estado/${estadosID}`, data, {headers})
  }

  deleteEstado(estadosID) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })

    return this.http.delete<RespuestaEstadoDelete>(`${url}estado/${estadosID}`, {headers})
  }


  /*************************************************************************/
  /******************************* NIVELES *********************************/
  /*************************************************************************/

  getNiveles() {
    return this.http.get<RespNivel>(`${url}nivel`);
  }


  deleteNivel(nivelID) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })

    return this.http.delete<RespuestaNivelDelete>(`${url}nivel/${nivelID}`, {headers})
  }


  getNivelbyID(nivelID: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<Nivel>(`${url}nivel/${nivelID}`, {headers})
  }

  editarNivel(data, nivelID: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.put<RespuestaNivelPut>(`${url}nivel/${nivelID}`, data, {headers})
  }

  crearNivel(data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.post<RespuestaNivelPost>(`${url}nivel`, data, {headers})
  }


  /*************************************************************************/
  /*********************** TIPO EMERGENCIA *********************************/
  /*************************************************************************/


  getTipoEmergencia(){
    return this.http.get<RespTipoEmergencia>(`${url}tipoemergencia`);
  }


  deleteTipoEmergencia(tipoemID) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })

    return this.http.delete<RespuestaNivelDelete>(`${url}tipoemergencia/${tipoemID}`, {headers})
  }


  getTipoEMbyID(tipoemID: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<RespTipoEmergenciaGet>(`${url}tipoemergencia/${tipoemID}`, {headers})
  }

  editarEM(tipoemID: string, data){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })

    return this.http.put<RespTipoEmergenciaPut>(`${url}tipoemergencia/${tipoemID}`, data, {headers})
  }

  crearTipoEM(data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.post<RespTipoEmergenciaPost>(`${url}tipoemergencia`, data, {headers})
  }


   /*************************************************************************/
  /************************** DEPARTAMENTO **********************************/
  /*************************************************************************/

  getDepartamentos() {
    return this.http.get<RespuestaDepartamento>(`${url}departamento`);
  }
  getDepartamentosbyID(departamentoID) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<Departamento>(`${url}departamento/${departamentoID}`, {headers});
  }

  editarDepartamento(departamentoID: string, data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.put<RespuestaDepartamentoPut>(`${url}departamento/${departamentoID}`, data, {headers});
  }

  crearDepartamento(data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.post<RespuestaDepartamentoPost>(`${url}departamento`, data, {headers});
  }

  deleteDepartamento(departamentoID: string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })

    return this.http.delete<RespuestaDepartamentoDelete>(`${url}departamento/${departamentoID}`, {headers})
  }


   /*************************************************************************/
  /************************** CIUDADES **********************************/
  /*************************************************************************/


  obtenerCiudadesbyDepartamento(departamentoID) {
    return this.http.get<RespCiudad>(`${url}ciudad/consulta/${departamentoID}`)
  }

  obtenerCiudadbyID(ciudadID){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<Ciudad>(`${url}ciudad/${ciudadID}`, {headers})
  }


  editarCiudad(ciudadID: string, data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.put<RespCiudadPut>(`${url}ciudad/${ciudadID}`, data, {headers});
  }

  crearCiudad(data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.post<RespCiudadPost>(`${url}ciudad`, data, {headers});
  }

  deleteCiudad(ciudadID: string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })

    return this.http.delete<RespCiudadDelete>(`${url}ciudad/${ciudadID}`, {headers})
  }

}
