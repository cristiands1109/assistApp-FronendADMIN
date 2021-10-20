import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { UiService } from '../../../services/ui.service';
import { Departamento } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styles: [
  ]
})
export class DepartamentosComponent implements OnInit {

  public departamentos: Departamento[] = [];

  // condicionales
  public sinRegistro: boolean = false
  public departamentoCargado: boolean = false;

  constructor( private mantenimientoService: MantenimientoService,
                private uiService: UiService) { }

  ngOnInit(): void {
    this.getDepartamentos();
  }


  getDepartamentos(){
    this.mantenimientoService.getDepartamentos().subscribe(({total, Departamento})=>{
     
      this.departamentos = Departamento
      this.departamentoCargado = true
    }, error => {
      if( error.error.total === 0 ) {
        this.departamentoCargado = true;
        this.sinRegistro = true;
      }
    })
  }

  eliminarDepartamento(departamento){
    this.uiService.confirmDeleteDepartamento(departamento).then((result) => {
      if( result.isConfirmed) {
        this.mantenimientoService.deleteDepartamento(departamento.departamentoID).subscribe(resp => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado',
            'success'
          )
          this.getDepartamentos();
        })
      }
    })
  }
}
