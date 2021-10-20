import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { Nivel } from '../../../interfaces/interfaces';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-editar-nivel',
  templateUrl: './editar-nivel.component.html',
  styles: [
  ]
})
export class EditarNivelComponent implements OnInit {

  formNivel: FormGroup
  public nivelSeleccionado: Nivel;
  public data: Nivel[] = [];
  public prioridadesUtilizas: string;
  // ondicionales
  public nivelCargado: boolean = false;
  public formSubmited: boolean = false;
  public noeditar: boolean = false;
  public errorcrear: boolean = false;
  


  constructor(  private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private mantenimientoService: MantenimientoService,
                private uiService: UiService,
                private router: Router) { }

  ngOnInit(): void {

    this.getParams();
    this.formNivel = this.fb.group({
      descripcion: ['', [Validators.required]],
      prioridad: ['', [Validators.required]]
    })
  }


  getParams(){
    this.activatedRoute.params.subscribe(({nivelID})=>{
      console.log(nivelID);
      if(nivelID === "nuevo") {
        this.getPrioridad()
        this.noeditar = true;
        this.nivelCargado = true
      } else {
        this.obtenerNivelbyID(nivelID)
      }
    })
  }

  obtenerNivelbyID(nivelID){
    this.mantenimientoService.getNivelbyID(nivelID).subscribe( nivel => {
      this.nivelSeleccionado = nivel;
      this.formNivel.setValue({
        descripcion: this.nivelSeleccionado.descripcion,
        prioridad: this.nivelSeleccionado.prioridad
      })
      this.nivelCargado = true;
    })
  }

  crear() {
    this.formSubmited = true;
    if(this.nivelSeleccionado) {
      if(this.formNivel.invalid) {
        return
      } else {
        const data = {
          descripcion: this.formNivel.get('descripcion').value,
          prioridad: this.formNivel.get('prioridad').value
        }
        this.mantenimientoService.editarNivel(data, this.nivelSeleccionado.nivelID).subscribe(({msg})=> { 
          this.uiService.onSuccess(msg);
          this.router.navigateByUrl('dashboard/niveles')
        }, error => {
          console.warn(error);
        })
      }
    } else {
      if(this.formNivel.invalid) {
        return
      } else {
        const data = {
          descripcion: this.formNivel.get('descripcion').value,
          prioridad: this.formNivel.get('prioridad').value
        }
        this.mantenimientoService.crearNivel(data).subscribe(({msg}) => {
          this.uiService.onSuccess(msg);
          this.router.navigateByUrl('/dashboard/niveles')
        }, error => {
          const msgError = error.error.msg
            this.uiService.onError(msgError)
            this.errorcrear = true;
            this.formSubmited = false;
            this.formNivel.reset();
        })
      }
        
    }

  }

  getPrioridad(){
    this.mantenimientoService.getNiveles().subscribe(({total, nivel})=> {
        this.data = nivel
        const prioridades = []
        let cont = 0
        for (let i = 0; i < total; i++) {
          if(this.data[i].prioridad) {
            prioridades[cont] = this.data[i].prioridad
            cont++
          }
        }
        this.prioridadesUtilizas = prioridades.toString();
    })
  }


  campoNoValido(campo: string) {
    if(this.formNivel.get(campo).invalid && this.formSubmited) {
      
      return true

    } else {
      return false
    }

  }

}
