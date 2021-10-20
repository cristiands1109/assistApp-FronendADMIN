import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { UiService } from '../../../services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEmergencia } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-editar-tipo-emergencia',
  templateUrl: './editar-tipo-emergencia.component.html',
  styles: [
  ]
})
export class EditarTipoEmergenciaComponent implements OnInit {


  tipoemForm: FormGroup;
  public tipoEMseleccionado: TipoEmergencia;
  //condicionales
  public tipoEMcargado: boolean = false;
  public formSubmited: boolean = false;

  constructor(  private mantenimientoService: MantenimientoService,
                private uiService: UiService,
                private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private router: Router) { }

  ngOnInit(): void {
    this.getParams();
    this.tipoemForm = this.fb.group({
      descripcion: ['',[Validators.required]]
    })
  }

  getParams(){
    this.activatedRoute.params.subscribe(({tipoemID})=>{
      console.log(tipoemID);
      if(tipoemID === "nuevo"){
        this.tipoEMcargado = true;
      } else {
        this.obtenerTipoEMbyID(tipoemID);
      }
    })
  }


  crear() {
    this.formSubmited = true
    if(this.tipoEMseleccionado){
      if(this.tipoemForm.invalid) {
        return
      } else {
        const data = {
          descripcion: this.tipoemForm.get('descripcion').value
        }
        this.mantenimientoService.editarEM(this.tipoEMseleccionado.tipoEmergenciaID, data).subscribe(({msg}) => {
          this.uiService.onSuccess(msg);
          this.router.navigateByUrl('/dashboard/tipo-emergencias')
        }, error => {
          const msgError = error.error.errors[0].msg;
          this.uiService.onError(msgError)
        })
      }
    } else {

      if(this.tipoemForm.invalid){
        return
      } else {
        const data = {
          descripcion: this.tipoemForm.get('descripcion').value
        }
        this.mantenimientoService.crearTipoEM(data).subscribe(({msg}) => {
          this.uiService.onSuccess(msg)
          this.router.navigateByUrl('/dashboard/tipo-emergencias')
        }, error => {
          const msgError = error.error.msg;
          this.tipoemForm.reset();
          this.uiService.onError(msgError)
        })
      }
    }
  }

  obtenerTipoEMbyID(tipoemID: string) {
      this.mantenimientoService.getTipoEMbyID(tipoemID).subscribe(({tipoEmergenciaDB}) => {
        this.tipoEMseleccionado = tipoEmergenciaDB;
        this.tipoemForm.setValue({ descripcion: tipoEmergenciaDB.descripcion})
        this.tipoEMcargado = true;
      })
  }


  campoNoValido(campo: string) {
    if(this.tipoemForm.get(campo).invalid && this.formSubmited) {
      
      return true

    } else {
      return false
    }

  }

}
