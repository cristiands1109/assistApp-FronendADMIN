import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


// servicios
import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  constructor(  private router: Router,
                private fb: FormBuilder, 
                private usuarioService: UsuarioService,
                private uiService: UiService) { }

  public formSubmited = false;

  public loginForm = this.fb.group({
    celular: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  ngOnInit(): void {
  }

  onLogin() {
    this.formSubmited = true;
    this.usuarioService.loginUsuario(this.loginForm.value).subscribe(resp => {
      console.log(resp);
      const msgExitoso = resp.msg;
      this.uiService.onSuccess(msgExitoso);
      this.router.navigateByUrl('/dashboard')
    },(error => {
      this.uiService.onError('Autenticacion incorrecta')
    }))
    
  }


  campoNoValido(campo: string) : boolean {

    if(this.loginForm.get(campo).invalid && this.formSubmited) {
      
      return true

    } else {
      return false
    }


  }

}
