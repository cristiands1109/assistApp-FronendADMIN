import { Component, OnInit } from '@angular/core';
import { Ciudad, Departamento } from '../../../interfaces/interfaces';
import { UiService } from '../../../services/ui.service';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styles: [
  ]
})
export class CiudadesComponent implements OnInit {


  public ciudades: Ciudad [] = [];
  public departamentos: Departamento [] = [];
  public ciudadCargada: boolean = false;
  public seleccionoCiudad: boolean = false
  public sinRegistro: boolean = false
  public obtenerDepSeleccionado: string;
  public departamentoSeleccionado: string;

  constructor(  private uiService: UiService,
                private mantenimientoService: MantenimientoService,
                private router: Router) { }
 
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem('departamento')
  }

  ngOnInit(): void {
    if(localStorage.getItem('departamento')){
      this.obtenerDepartamentos();
      this.obtenerDepSeleccionado = localStorage.getItem('departamento')
      this.obtenerCiudad(this.obtenerDepSeleccionado)
    } else {
      this.obtenerDepartamentos();
    }
  }


  obtenerDepartamentos(){
    this.mantenimientoService.getDepartamentos().subscribe(({Departamento})=>{
      this.departamentos = Departamento
    })
  }
  
  depSeleccionado(departamentoID){
    this.mantenimientoService.getDepartamentosbyID(departamentoID).subscribe(departamento => {
      localStorage.setItem('departamento', departamento.departamentoID)
    })
  }


  editar(ciu) {
    console.log(ciu.departamento);
    this.depSeleccionado(ciu.departamento)
    // this.router.navigateByUrl(`/dashboard/cuidad/${ciu.ciudadID}`)
    // [routerLink]="['/dashboard/cuidad',ciu.ciudadID]" 
  }
  eliminarCiudad(ciudad) {
    
    this.uiService.confirmDeleteCiudad(ciudad).then((result) => {
      if (result.isConfirmed) {
        this.mantenimientoService.deleteCiudad(ciudad.ciudadID).subscribe(resp => {
          this.obtenerCiudad(ciudad.departamento);
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado',
            'success'
          )
        });
      }
    });

  }

  nuevo(){
    this.depSeleccionado(this.departamentoSeleccionado)
    this.router.navigateByUrl(`/dashboard/ciudad/nuevo/${this.departamentoSeleccionado}`)
    // [routerLink]="['/dashboard/ciudad/nuevo']"
  }

  obtenerCiudad(evento) {
    // this.depSeleccionado(evento)
    this.departamentoSeleccionado = evento;
    this.seleccionoCiudad = true;
    this.ciudadCargada = false
    console.log(evento);
    if(evento === "null") {
      this.ciudadCargada = false;
      this.seleccionoCiudad = false
      return
    }
    this.mantenimientoService.obtenerCiudadesbyDepartamento(evento).subscribe(({Ciudad}) => {
      this.ciudades = Ciudad;
      this.ciudadCargada = true;
    })
  }



}
