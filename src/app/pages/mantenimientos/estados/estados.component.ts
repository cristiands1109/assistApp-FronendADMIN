import { Component, OnInit } from '@angular/core';
import { Estados } from '../../../interfaces/interfaces';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { UiService } from '../../../services/ui.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styles: [
  ]
})
export class EstadosComponent implements OnInit {

  public estados: Estados[] = []

  public estadoCargado: boolean = false;
  public sinRegistro: boolean = false;

  constructor(  private mantenimientoService: MantenimientoService, 
                private uiService: UiService) { }

  ngOnInit(): void {
    this.obtenerEstados();
  }



  obtenerEstados(){
    this.mantenimientoService.getEstados().subscribe(({total, estados})=>{
      
      this.estados = estados;
      this.sinRegistro = false;
      this.estadoCargado = true;
    }, error => {
      if(error.error.total === 0) {
        this.estadoCargado = true;
        this.sinRegistro = true
      }
    })
  }


  eliminarEstado(estado) {
    this.uiService.confirmDeleteEstado(estado).then((result) => {
      if(result.isConfirmed) {
        this.mantenimientoService.deleteEstado(estado.estadosID).subscribe(resp => {
          this.obtenerEstados();
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado',
            'success'
          )
        })
      }
    })
  }

}
