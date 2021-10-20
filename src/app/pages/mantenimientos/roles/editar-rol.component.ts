import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../../interfaces/interfaces';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styles: [
  ]
})
export class EditarRolComponent implements OnInit {
  
  public rolFom: FormGroup
  public rolSeleccionado: Role;

  // condicionales
  public rolCargado: boolean = false;
  public formSubmited: boolean = false;


  constructor(  private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private mantenimientoService: MantenimientoService,
    private uiService: UiService,
    private router: Router) { }



  ngOnInit(): void {
    this.getParams();

    this.rolFom = this.fb.group({
      descripcion: ['', [Validators.required]]
    })
  }


  getParams() {
    this.activatedRoute.params.subscribe(({rolID}) => {
      console.log(rolID);
      if(rolID === "nuevo") {
        this.rolCargado = true;
      } else {
        this.obtenerRol(rolID)
      }
    })
  }

  obtenerRol(rolID: string) {
    this.mantenimientoService.obtenerRolbyID(rolID).subscribe( rol => {
      this.rolSeleccionado = rol
      console.log(this.rolSeleccionado);
      this.rolFom.setValue({descripcion: this.rolSeleccionado.descripcion})
      this.rolCargado = true;
    })
  }

  crear() {
    this.formSubmited = true;
    if(this.rolSeleccionado) {
      if (this.rolFom.invalid) {
        return
      } else {
        const data = {
          descripcion: this.rolFom.get('descripcion').value
        }
        this.mantenimientoService.editarRol(this.rolSeleccionado.rolID, data).subscribe(({msg}) => {
            this.uiService.onSuccess(msg)
            this.router.navigateByUrl('/dashboard/roles')
        }, error => {
          const msgError = error.error.errors[0].msg;
          this.uiService.onError(msgError)
        })
      }
    } else {
      console.log('crear');
      // crear
      if(this.rolFom.invalid){
        return
      } else {
        const data = {
          descripcion: this.rolFom.get('descripcion').value
        }

        // this.uiService.onSuccess(resp.msg);
        // this.router.navigateByUrl('/dashboard/denuncias')
        this.mantenimientoService.creaRol(data).subscribe(({msg}) => {
          this.uiService.onSuccess(msg)
          this.router.navigateByUrl('/dashboard/roles')
        }, error => {
          const msgError = error.error.msg;
          this.rolFom.reset();
          this.uiService.onError(msgError)
        })
      }
      
    }
  }

  campoNoValido(campo: string) {
    if(this.rolFom.get(campo).invalid && this.formSubmited) {
      
      return true

    } else {
      return false
    }

  }



}
