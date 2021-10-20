import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Emergencia, RespNivel, RespTipoEmergencia, RespuestaEstados, RespuestaAlertaPost, RespEmergenciaPut } from '../interfaces/interfaces';


const url = environment.url;
@Injectable({
  providedIn: 'root'
})

export class EmergenciaService {

  constructor(private http: HttpClient) { }





  getEmergenciabyID(emergenciaID: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })

    return this.http.get<Emergencia>(`${url}emergencia/${emergenciaID}`, {headers});
  }

  editarEmergencia(emergenciaID: string, data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.put<RespEmergenciaPut>(`${url}emergencia/${emergenciaID}`,data,{headers});
  }

  getNiveles() {
    return this.http.get<RespNivel>(`${url}nivel`);
  }

  getTipoEmergencia(){
    return this.http.get<RespTipoEmergencia>(`${url}tipoemergencia`);
  }

  getEstado() {
    return this.http.get<RespuestaEstados>(`${url}estado`);
  }

  emitirNotificacion(titulo: string, direccion: string) {

    const osurl = environment.osurl
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic Yjc2Yjk0NTYtNTNhNS00OWEyLWI2ZTUtODQwY2EzZTMyN2Fm'
    })

    const notificacion = { 
    "app_id": "42df7310-9a74-42e4-95e9-473d8e25dd89",
    "included_segments": ["Subscribed Users"],
    "contents": {"en": `${direccion}`, "es": `${direccion}`},
    "headings": {"en": `${titulo}`, "es": `${titulo}`}
  }
    return this.http.post(`${osurl}`,notificacion,{headers})
  }

  emitirAlerta(data){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.post<RespuestaAlertaPost>(`${url}alerta`,data, {headers})
  }
}
