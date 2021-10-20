import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Ciudad, Departamento, Usuario, Role } from '../../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styles: [
  ]
})
export class EditarUsuarioComponent implements OnInit {

  usuarioSeleccionado: Usuario;
  public editarUsuarioForm: FormGroup
  public departamento: Departamento[];
  public ciudades: Ciudad[];
  public roles: Role[]
  
  // condicionales
  public cargandoCiudad: boolean = true;
  public usuarioCargado: boolean = true
  public formSubmited = false;




  constructor(  private activatedRoute: ActivatedRoute,
                private uiService: UiService, 
                private usuarioService: UsuarioService,
                private fb: FormBuilder) { }


  ngOnInit(): void {
    this.getParams()
    this.obtenerDep()
    this.obtenerRoles();
  
    this.editarUsuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      rol: ['', [Validators.required]]
    })
  }



  getUsuariobyID(celular: string) {
    this.usuarioService.getUsuariobyID(celular).subscribe(usuario => {
      this.usuarioSeleccionado = usuario;
      console.log(usuario);
      // console.log('creo que hay validar', usuario.departamento);
      let {nombre, apellido, rol, ciudad, departamento} = usuario
      if(!departamento) {
        console.log('no departamento');
        departamento = ''
        ciudad = ''
        this.usuarioCargado = false
        this.cargandoCiudad = false
      }
      this.editarUsuarioForm.setValue({nombre, apellido, rol, ciudad, departamento})
      this.ciudadActual(departamento);
    })
  }

  getParams() {
    this.activatedRoute.params.subscribe(({celular}) => {
      console.log(celular);
      this.getUsuariobyID(celular)
    })
  }



  obtenerDep() {
    this.usuarioService.getDepartamento().subscribe(resp => {
      console.log(resp.Departamento);
      this.departamento = resp.Departamento;
      // console.log(this.departamento);
    }, (err => {
      console.log(err);
    }))
   }
 
   ciudadActual(departamentoActual: string) {
     if(departamentoActual.length == 0 ){
       this.ciudades = [];
       // console.log('no hay departamento');
       return;
     }
     this.usuarioService.getCiudadesporDepartamento(departamentoActual).subscribe(resp=> {
       // console.log(resp.Ciudad);
       this.ciudades = resp.Ciudad
       this.cargandoCiudad = false
       this.usuarioCargado = false;
     })
   }
 
 
   obtenerCiudad(evento) {
     this.cargandoCiudad = true
     this.editarUsuarioForm.patchValue({'ciudad': ''})
     // console.log(
     //   this.perfilForm.get('ciudad').valid
     // );
     this.usuarioService.getCiudadesporDepartamento(evento).subscribe(resp => {
       this.ciudades = resp.Ciudad;
       this.cargandoCiudad = false
     })
   }

   obtenerRoles() {
     this.usuarioService.obtenerRoles().subscribe(({Roles}) => {
       console.log(Roles);
       this.roles = Roles
     })
   }


   actualizar() {
     this.formSubmited = true;
     if(this.editarUsuarioForm.invalid) {
      return;
    }
    console.log(this.editarUsuarioForm.value);
    // return
    const celular = this.usuarioSeleccionado.celular
    this.usuarioService.actualizarUsuario(this.editarUsuarioForm.value, celular).subscribe(resp => {
      console.log(resp);
      this.uiService.onSuccess(resp.msg);
    },(error => {
      const msgError = error.error.errors[0].msg
      this.uiService.onError(msgError)
    }))
     console.log(this.editarUsuarioForm.valid);
     console.log(this.editarUsuarioForm.value);
   }

   campoNoValido(campo: string) {
    if(this.editarUsuarioForm.get(campo).invalid && this.formSubmited) {
      
      return true

    } else {
      return false
    }
  }






}
