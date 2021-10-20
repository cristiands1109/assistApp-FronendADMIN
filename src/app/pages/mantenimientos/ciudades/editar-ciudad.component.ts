import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { UiService } from '../../../services/ui.service';
import { Ciudad } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styles: [
  ]
})
export class EditarCiudadComponent implements OnInit {

  ciudadForm: FormGroup
  ciudadSeleccionada: Ciudad;
  departamentoSeleccionado: string;
  public ciudadCargada: boolean = false;
  public formSubmited: boolean = false;
  constructor(private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private mantenimientoService: MantenimientoService,
              private uiService: UiService) { }

  async ngOnInit() {
    this.ciudadForm = this.fb.group({
      departamento: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    })
    await this.getParams();
  }

  
  getParams(){
    // this.activatedRoute.params.subscribe(resp => {
    //   console.log(resp);
    // })
    this.activatedRoute.params.subscribe(({ciudadID, depID})=>{
      if(ciudadID === "nuevo") {
        this.departamentoSeleccionado = depID;
        console.log('params',this.departamentoSeleccionado);
        this.getDepartamentobyID(this.departamentoSeleccionado);
        console.log('nuevo');
      } else {
        console.log('ciudadID', ciudadID);
        this.getCiudadbyID(ciudadID)
      }
    })
  }
  
  getCiudadbyID(ciudadID: string){
      this.mantenimientoService.obtenerCiudadbyID(ciudadID).subscribe( ciudad => {
        this.ciudadSeleccionada = ciudad
        console.log('ciudad seleccionada', ciudad);
        console.log('ciudad seleccionada', ciudad.departamento['_id']);
        this.departamentoSeleccionado = ciudad.departamento['_id']
        this.ciudadForm.setValue({
          departamento: this.ciudadSeleccionada.departamento.descripcion,
          descripcion: this.ciudadSeleccionada.descripcion
        })
        this.ciudadCargada = true
      })
  }

  getDepartamentobyID(departamentoID){
    // const departamentoID = localStorage.getItem('departamento');
    // console.log(departamentoID);
    this.mantenimientoService.getDepartamentosbyID(departamentoID).subscribe(({descripcion})=> {
      this.ciudadForm.setValue({
        departamento: descripcion,
        descripcion: ''
      })
      this.ciudadCargada = true
    })
  }

  crear(){
    this.formSubmited = true;
    if(this.ciudadForm.invalid) {
      return
    }
    if(this.ciudadSeleccionada) {
      console.log('editar');
      const data = {
        descripcion: this.ciudadForm.get('descripcion').value
      }
      this.mantenimientoService.editarCiudad(this.ciudadSeleccionada.ciudadID, data).subscribe(({msg}) => {
        this.uiService.onSuccess(msg),
        this.router.navigateByUrl('dashboard/ciudades')
      }, error => {
        const msgError = error.error.errors[0].msg
        this.uiService.onError(msgError)
      })
    } else {
      console.log('crear');
      const data = {
        descripcion: this.ciudadForm.get('descripcion').value,
        departamento: this.departamentoSeleccionado
      }
      this.mantenimientoService.crearCiudad(data).subscribe(({msg}) => {
        this.uiService.onSuccess(msg);
        this.router.navigateByUrl('dashboard/ciudades')
      }, error => {
        const msgError = error.error.msg
        this.uiService.onError(msgError)
      })
    }
  }
}
