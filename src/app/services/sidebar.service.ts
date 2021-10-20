import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = []
  
  constructor() { }

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu'))

  }

  // menu: any[] = [
  //   {
  //     titulo: 'Despachante',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Denuncias', url: 'denuncias' },
  //       { titulo: 'Alertas', url: 'alertas' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Roles', url: 'roles' },
  //       { titulo: 'Departamentos', url: 'departamentos' },
  //       { titulo: 'Ciudades', url: 'ciudades' },
  //       { titulo: 'Estados', url: 'estados' },
  //       { titulo: 'Niveles', url: 'niveles' },
  //       { titulo: 'Tipo Emergencia', url: 'tipo-emergencias' }
  //       // { titulo: 'Despachante', url: 'despachantes' }
  //     ]
  //   }
  // ];

}
