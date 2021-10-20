import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { TipoEmergencia } from '../../../interfaces/interfaces';
import { UiService } from '../../../services/ui.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-emergencias',
  templateUrl: './tipo-emergencias.component.html',
  styles: [
  ]
})
export class TipoEmergenciasComponent implements OnInit {


  public tipoEmergencia: TipoEmergencia[] = [];

  public tipoEMcargado: boolean = false;
  public sinRegistro: boolean = false;
  constructor(  private mantenimientoService: MantenimientoService,
                private uiService: UiService) { }

  ngOnInit(): void {
    this.getTipoEmergencia();
  }


  getTipoEmergencia() {
    this.mantenimientoService.getTipoEmergencia().subscribe(({total, tipoEmergenciaDB}) => {
        this.tipoEmergencia = tipoEmergenciaDB
        this.tipoEMcargado = true
        console.log(this.tipoEmergencia);
    })
  }


  eliminarRol(tipoEM) {
    this.uiService.confirmDeleteTipoEM(tipoEM).then((result) => {
      if (result.isConfirmed) {
        this.mantenimientoService.deleteTipoEmergencia(tipoEM.tipoEmergenciaID).subscribe(resp => {
          this.getTipoEmergencia();
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado',
            'success'
          )
        });
      }
    });
  }
}
