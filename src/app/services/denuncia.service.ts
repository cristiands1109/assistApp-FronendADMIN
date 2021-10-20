import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespEmergencia, RespuestaAlertaPut } from '../interfaces/interfaces';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  private _refresh = new Subject<void>()
  constructor(private http: HttpClient) { }


  get refresh() {
    return this._refresh;
  }

  getDenuncias(){
    // return this.http.get<RespEmergencia>(`${url}emergencia`);
    return this.http.get<RespEmergencia>(`${url}emergencia`).pipe(
      tap(()=> {
        this._refresh.next();
      })
    )
  }


  getEmergenciabyID(emergenciaID: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })

    return this.http.get(`${url}emergencia/${emergenciaID}`, {headers});
  }

  editarAlerta(data){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.post<RespuestaAlertaPut>(`${url}alerta`,data, {headers})
  }


}
