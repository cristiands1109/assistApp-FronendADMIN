import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { UiService } from '../../../services/ui.service';
import { Estados } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-editar-estado',
  templateUrl: './editar-estado.component.html',
  styles: [
  ]
})
export class EditarEstadoComponent implements OnInit {

  public formEstado: FormGroup;
  public estadoSeleccionado: Estados
  // condicionales
  public estadoCargado: boolean = false;
  public formSubmited: boolean =  false;
  constructor(  private fb: FormBuilder,
                private manetenimientoService: MantenimientoService,
                private uiService: UiService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();

    this.formEstado = this.fb.group({
      descripcion: ['', [Validators.required]]
    })
  }


  
  getParams(){
    this.activatedRoute.params.subscribe(({estadosID})=>{
      console.log(estadosID);
      if( estadosID === 'nuevo') {
        this.estadoCargado = true;
      } else {
        this.obtenerEstadobyID(estadosID)
      }
    })
  }

  obtenerEstadobyID(estadosID: string) {
    this.manetenimientoService.getEstadobyID(estadosID).subscribe(estado => {
      this.estadoSeleccionado = estado;
      this.formEstado.setValue({descripcion: this.estadoSeleccionado.descripcion})
      this.estadoCargado = true;
    })
  }


  crear(){
    this.formSubmited = true
    if(this.estadoSeleccionado) {
      if(this.formEstado.invalid) {
        return
      } else { 
        const data = {
          descripcion: this.formEstado.get('descripcion').value
        }
        this.manetenimientoService.editarEstado(data, this.estadoSeleccionado.estadosID).subscribe(({msg})=> {
          this.uiService.onSuccess(msg);
          this.router.navigateByUrl('dashboard/estados')
        }, error => {
          console.log(error);
        })
      }
    } else {

        // crear
        if(this.formEstado.invalid) {
          return
        } else {
          const data = {
            descripcion: this.formEstado.get('descripcion').value
          }
    
          this.manetenimientoService.crearEstado(data).subscribe(({msg})=> {
            this.uiService.onSuccess(msg);
            this.router.navigateByUrl('/dashboard/estados')
          }, error => {
            const msgError = error.error.msg
            this.uiService.onError(msgError)
            this.formSubmited = false;
            this.formEstado.reset();
          })

        }

    }



  }

  campoNoValido(campo: string) {
    if(this.formEstado.get(campo).invalid && this.formSubmited) {
      
      return true

    } else {
      return false
    }

  }



}
