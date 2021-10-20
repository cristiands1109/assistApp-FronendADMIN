import { Component, OnInit } from '@angular/core';
import { Emergencia, Nivel, TipoEmergencia, Estados } from '../../../interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergenciaService } from '../../../services/emergencia.service';
import { UsuarioService } from '../../../services/usuario.service';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-emitir-denuncia',
  templateUrl: './emitir-denuncia.component.html',
  styles: [
  ]
})
export class EmitirDenunciaComponent implements OnInit {

  emergenciaSeleccionada: Emergencia;
  public emitirEmergenciaForm: FormGroup;
  public niveles: Nivel[];
  public estados: Estados[];
  public tipo_emergencia: TipoEmergencia[];

  // condicionales
  public formSubmited = false;
  public emergenciaCargada: boolean = false;

  constructor(  private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private emergenciaService: EmergenciaService,
                private usuarioService: UsuarioService,
                private uiService: UiService,
                private router: Router) { }

  ngOnInit(): void {
    this.getParams();
    this.getNiveles();
    this.getEstado();
    this.emitirEmergenciaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      relatoria: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      tipo_emergencia: ['',],
      estado: ['',],
      latitud: ['', ],
      longitud: ['', ],
    })
  }

  getEmergenciabyID(emergenciaID: string) {
    this.emergenciaService.getEmergenciabyID(emergenciaID).subscribe(emergencia => {
      this.emergenciaSeleccionada = emergencia
      console.log('Emergencia seleccionada', this.emergenciaSeleccionada); // PRUEBA 
      let {denunciante: {nombre, apellido}, relatoria, direccion, latitud, longitud,tipo_emergencia:{descripcion}} = emergencia
      this.emitirEmergenciaForm.setValue({nombre, apellido, relatoria, direccion, latitud, longitud, tipo_emergencia: descripcion, nivel: '', estado: ''})
      this.emergenciaCargada = true;
    }, error => {
      console.log(error);
    })
  }


  getParams(){
    this.activatedRoute.params.subscribe(({emergenciaID}) => {
      console.log('ID emergencia', emergenciaID);
      this.getEmergenciabyID(emergenciaID);
    })
  }

  getNiveles() {
    this.emergenciaService.getNiveles().subscribe(niveles => {
      // console.log(niveles);
      this.niveles = niveles.nivel
      console.log('niveles', this.niveles);
    })
  }

  getTipoEmergencia() {
    this.emergenciaService.getTipoEmergencia().subscribe(tipo_emergencia => {
      this.tipo_emergencia = tipo_emergencia.tipoEmergenciaDB;
      console.log('tipos de emergencias', this.tipo_emergencia);
    })
  }
  
  getEstado() {
    this.emergenciaService.getEstado().subscribe(estados => {
      // console.log(estados.estados);
      this.estados = estados.estados
      console.log('estados', this.estados);
    })
  }

  emitirAlerta() {

    console.log(this.emitirEmergenciaForm);

    // console.log(tipoEM);
    if(this.emitirEmergenciaForm.invalid){
      console.log('no valido');
      return
    } else {
      const data = {
        emergencia: this.emergenciaSeleccionada.emergenciaID,
        operador: this.usuarioService.userID,
      }
      
      if(this.emergenciaSeleccionada.emitido === true) {return}

      /**  EMISION DE LA NOTIFICACION */
      const datosEM = {
        tipoEM: this.emitirEmergenciaForm.get('tipo_emergencia').value,
        direccion: this.emitirEmergenciaForm.get('direccion').value
      }
      if(datosEM.tipoEM === 'ACCIDENTE') {
        console.log(datosEM.tipoEM);
        this.emitirNotificacion(datosEM.tipoEM, datosEM.direccion)
  
      } else {
        if (datosEM.tipoEM === 'INCENDIO') {
          this.emitirNotificacion(datosEM.tipoEM, datosEM.direccion)
        }
      }
      /**  FIN DE LA EMISION DE LA NOTIFICACION */


      this.editarEmergencia(this.emergenciaSeleccionada.emergenciaID);
      this.emergenciaService.emitirAlerta(data).subscribe(resp => {
        console.log('emitir editar alerta');
        this.uiService.onSuccess(resp.msg);
        this.router.navigateByUrl('/dashboard/denuncias')
      }, error => {
        const msgError = error.error.msg
        this.uiService.onError(msgError)
        this.router.navigateByUrl('/dashboard/denuncias')
      })
      console.log(data);
    }
  }

  emitirNotificacion(titulo: string, direccion: string) {
    this.emergenciaService.emitirNotificacion(titulo, direccion).subscribe(notificacion => {
      console.log(notificacion);
    }, (error) => {
      console.log(error);
    })
  }

  editarEmergencia(emergenciaID: string) {
    const data = {
      nivel: this.emitirEmergenciaForm.get('nivel').value,
      estados: this.emitirEmergenciaForm.get('estado').value,
      emitido: true
    }
    this.emergenciaService.editarEmergencia(emergenciaID, data).subscribe(resp => {
      this.uiService.onSuccess(resp.msg);
    }, error => {
      console.log(error);
      const msgError = error.error.errors[0].msg;
      this.uiService.onError(msgError);
    })

    console.log(data);
  }

}
