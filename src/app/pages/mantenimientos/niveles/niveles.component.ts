import { Component, OnInit } from '@angular/core';
import { Nivel } from '../../../interfaces/interfaces';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { UiService } from '../../../services/ui.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styles: [
  ]
})
export class NivelesComponent implements OnInit {

  public niveles: Nivel[] = [];

  //condicionales
  public sinRegistro: boolean = false;
  public estadoCargado: boolean = false;

  constructor(  private mantenimientoService: MantenimientoService, 
                private uiService: UiService) { }

  ngOnInit(): void {
    this.obtenerNiveles();
  }

  obtenerNiveles() {
    this.mantenimientoService.getNiveles().subscribe(({total, nivel}) => {
      this.niveles = nivel;
      this.sinRegistro = false;
      this.estadoCargado = true;
    }, error => {
      if(error.error.total === 0) {
        this.estadoCargado = true;
        this.sinRegistro = true
      }
    })
  }


  eliminarNivel(nivel){
    this.uiService.confirmDeleteNivel(nivel).then((result) => {
      if(result.isConfirmed) {
        this.mantenimientoService.deleteNivel(nivel.nivelID).subscribe(resp => {
          this.obtenerNiveles();
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
