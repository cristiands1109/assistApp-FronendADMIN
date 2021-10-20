import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSubmited = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    celular: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(  private fb: FormBuilder,
                private router: Router,
                private usuarioService: UsuarioService,
                private uiService: UiService
                ) { }



  ngOnInit(): void {
  }


  crearRegistro() {
    this.formSubmited = true;
    if(this.registerForm.invalid) {
      return;
    }
    this.usuarioService.registrarUsuario(this.registerForm.value).subscribe(resp => {
      const msgExitoso = resp.msg
      this.uiService.onSuccess(msgExitoso)
      this.router.navigateByUrl('/dashboard')
    }, (error => {
      const msgError = error.error.errors[0].msg
      this.uiService.onError(msgError)
    }));
  }


  campoNoValido(campo: string) : boolean {

    if(this.registerForm.get(campo).invalid && this.formSubmited) {
      
      return true

    } else {
      return false
    }


  }

}
