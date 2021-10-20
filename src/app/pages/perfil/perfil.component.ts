import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario, Departamento, Ciudad, Role } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public usuario: Usuario;
  public ciudad: Ciudad[];
  public departamento: Departamento[];
  public perfilForm: FormGroup;
  public ciudades: Ciudad[];

  public formSubmited = false;
  usuarioCargado = false;
  cargandoCiudad = false;

  constructor(  private fb: FormBuilder,   
                private usuarioService: UsuarioService,
                private uiService: UiService) { 

    this.usuario = this.usuarioService.usuario
  }
  
  ngOnInit() {
    // this.obtenerDepActual();
    // this.obtenerCiuActual();
    console.log(this.usuario);
    this.obtenerDep()
    if(this.usuario.ciudad) {
      console.log('tiene ciudad');
      this.ciudadActual()
      this.perfilForm = this.fb.group({
        nombre: [this.usuario.nombre, [Validators.required]],
        apellido: [this.usuario.apellido, [Validators.required]],
        ciudad: [this.usuario.ciudad, [Validators.required]],
        departamento: [this.usuario.departamento, [Validators.required]]
      })
    } else {
      console.log('no tiene ciudad');
      this.perfilForm = this.fb.group({
        nombre: [this.usuario.nombre, [Validators.required]],
        apellido: [this.usuario.apellido, [Validators.required]],
        ciudad: ['', [Validators.required]],
        departamento: ['', [Validators.required]]
      })
    }
    // this.obtenerCiu();
    
  }


  actualizarPerfil() {
    console.log(this.perfilForm.value);
  }

  obtenerDep() {
    this.usuarioCargado = false
   this.usuarioService.getDepartamento().subscribe(resp => {
     this.departamento = resp.Departamento;
    //  console.log(this.departamento);
   }, (err => {
     console.log(err);
   }))
  }

  ciudadActual() {
    // this.cargandoCiudad = false;
    if(this.usuario.departamento.length == 0 ){
      this.ciudades = [];
      // console.log('no hay departamento');
      return;
    }
    this.usuarioService.getCiudadesporDepartamento(this.usuario.departamento).subscribe(resp=> {
      // console.log(resp.Ciudad);
      this.ciudades = resp.Ciudad
      this.usuarioCargado = true
    })
  }


  obtenerCiudad(evento) {
    this.cargandoCiudad = true
    this.perfilForm.patchValue({'ciudad': ''})
    // console.log(
    //   this.perfilForm.get('ciudad').valid
    // );
    this.usuarioService.getCiudadesporDepartamento(evento).subscribe(resp => {
      this.ciudades = resp.Ciudad;
      this.cargandoCiudad = false
    })
  }

  ciudadSeleccinada() {
    
  }


  registrar(){
    this.formSubmited = true
    if(this.perfilForm.invalid) {
      return;
    }
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarUsuario(this.perfilForm.value).subscribe(resp => {
      this.usuario.nombre = resp.usuario.nombre;
      this.usuario.apellido = resp.usuario.apellido;
      this.usuario.celular = resp.usuario.celular;
      this.usuario.ciudad = resp.usuario.ciudad['_id'];
      this.usuario.departamento = resp.usuario.departamento['_id']

      console.log('depar',resp.usuario.departamento['_id']);
      console.log('ciudad',resp.usuario.ciudad['_id']);
      this.uiService.onSuccess(resp.msg);
    },(error => {
      const msgError = error.error.errors[0].msg
      this.uiService.onError(msgError)
    }))
  }

  campoNoValido(campo: string) {
    if(this.perfilForm.get(campo).invalid && this.formSubmited) {
      
      return true

    } else {
      return false
    }
  }
  // obtenerCiudad(evento: Event){

  // }

  // obtenerDepActual(){
  //   this.usuarioService.getDepartamentoActual().subscribe(resp => {
  //     this.depActual = resp;
  //   })
  // }

  // obtenerCiuActual(){
  //   this.usuarioService.getCiudadActual().subscribe(resp => {
  //     this.ciuActual = resp
  //   })
  // }

}
