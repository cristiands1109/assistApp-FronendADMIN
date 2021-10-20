import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { UiService } from '../../../services/ui.service';
import { Departamento } from '../../../interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.component.html',
  styles: [
  ]
})
export class EditarDepartamentoComponent implements OnInit {

  departamentoForm: FormGroup
  public departamentosSeleccionado: Departamento;;
  

  // condicionales
  public departamentoCargado: boolean = false;
  public formSubmited: boolean = false;

  constructor( private mantenimientoService: MantenimientoService,
                private uiService: UiService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private router: Router) { }

  ngOnInit(): void {
    this.getParams();
    this.departamentoForm = this.fb.group({
      descripcion: ['', Validators.required]
    })
  }


  getParams(){
    this.activatedRoute.params.subscribe(({departamentoID})=>{
      console.log(departamentoID);
      if(departamentoID === "nuevo"){
        this.departamentoCargado = true
      } else {
        this.getDepartamentobyID(departamentoID)
      }
    })
  }

  getDepartamentobyID(departamentoID: string){
    this.mantenimientoService.getDepartamentosbyID(departamentoID).subscribe( departamento => {
      this.departamentosSeleccionado = departamento
      this.departamentoForm.setValue({descripcion: departamento.descripcion});
      this.departamentoCargado = true
    })
  }

  crear(){
    this.formSubmited = true;
    if(this.departamentoForm.invalid) {
      return
    }
    if(this.departamentosSeleccionado) {
      const data = {
        descripcion: this.departamentoForm.get('descripcion').value
      }
      this.mantenimientoService.editarDepartamento(this.departamentosSeleccionado.departamentoID, data).subscribe(({msg})=> {
        this.uiService.onSuccess(msg)
        this.router.navigateByUrl('dashboard/departamentos')
      }, error => {
        const msgError = error.error.errors[0].msg;
        this.uiService.onError(msgError)
      })
    } else {
      const data = {
        descripcion: this.departamentoForm.get('descripcion').value
      }
      this.mantenimientoService.crearDepartamento(data).subscribe(({msg})=> {
        this.uiService.onSuccess(msg)
        this.router.navigateByUrl('dashboard/departamentos')
      }, error => {
        const msgError = error.error.msg;
        this.departamentoForm.reset();
        this.uiService.onError(msgError);
      })
    }
  }

  campoNoValido(campo: string) {
    if(this.departamentoForm.get(campo).invalid && this.formSubmited) {
      
      return true

    } else {
      return false
    }

  }
  

}
