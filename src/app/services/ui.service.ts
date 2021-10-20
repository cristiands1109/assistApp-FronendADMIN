import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { UsuarioService } from './usuario.service';
import { Usuario, Role, Estados, Nivel, TipoEmergencia, Departamento, Ciudad } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private _ocultarModal: boolean = true;
  img: string;
  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() { }

 /********************ALERTS************************************/ 

  onError(mensaje: string) {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon:'error',
      confirmButtonColor: '#3085d6'
    })
  }

  onSuccess(mensaje: string) {
    Swal.fire({
      title: 'Aceptado',
      text: mensaje,
      icon: 'success',
      confirmButtonColor: '#3085d6'
    })
  }

  onAlgoAndaMal(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
      // footer: '<a href="">Why do I have this issue?</a>'
    })
  }


  confirm(usuario: Usuario) {
    return Swal.fire({
      title: 'Esta seguro que desea continuar?',
      text: `Esta a punto de eliminar a ${usuario.nombre} ${usuario.apellido}`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    })
  }


  confirmDeleteRol(rol: Role) {
    return Swal.fire({
      title: 'Esta seguro que desea continuar?',
      text: `Esta a punto de eliminar ${rol.descripcion}`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    })
  }

  confirmDeleteTipoEM(tipoEM: TipoEmergencia) {
    return Swal.fire({
      title: 'Esta seguro que desea continuar?',
      text: `Esta a punto de eliminar ${tipoEM.descripcion}`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    })
  }

  confirmDeleteDepartamento(departamento: Departamento) {
    return Swal.fire({
      title: 'Esta seguro que desea continuar?',
      text: `Esta a punto de eliminar ${departamento.descripcion}`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    })
  }

  confirmDeleteCiudad(ciudad: Ciudad) {
    return Swal.fire({
      title: 'Esta seguro que desea continuar?',
      text: `Esta a punto de eliminar ${ciudad.descripcion}`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    })
  }

  confirmDeleteEstado(estado: Estados) {
    return Swal.fire({
      title: 'Esta seguro que desea continuar?',
      text: `Esta a punto de eliminar ${estado.descripcion}`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    })
  }

  confirmDeleteNivel(nivel: Nivel) {
    return Swal.fire({
      title: 'Esta seguro que desea continuar?',
      text: `Esta a punto de eliminar ${nivel.descripcion}`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    })
  }

 /********************MODAL************************************/ 


 abrirModal(img?: string){
   this._ocultarModal = false;
   this.img = img
 }

cerrarModal() {
  this._ocultarModal = true;
}



}



