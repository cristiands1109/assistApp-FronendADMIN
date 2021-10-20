import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergenciaService } from '../../../services/emergencia.service';
import { UsuarioService } from '../../../services/usuario.service';
import { UiService } from '../../../services/ui.service';
import { Emergencia, Nivel, Estados, TipoEmergencia } from '../../../interfaces/interfaces';
import { DenunciaService } from '../../../services/denuncia.service';



@Component({
  selector: 'app-editar-alerta',
  templateUrl: './editar-alerta.component.html',
  styles: [
  ]
})
export class EditarAlertaComponent implements OnInit {

  emergenciaSeleccionada;
  public alertaForm: FormGroup;
  public niveles: Nivel[];
  public estados: Estados[];
  public tipo_emergencia: TipoEmergencia[];

  // condicionales
  public formSubmited = false;
  public emergenciaCargada: boolean = false;

  constructor(  private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private emergenciaService: EmergenciaService,
                private denunciaService: DenunciaService,
                private usuarioService: UsuarioService,
                private uiService: UiService,
                private router: Router) { }

  ngOnInit(): void {
    this.getParams();
    this.getNiveles();
    this.getEstado();
    this.alertaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      relatoria: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
      tipoemergencia: ['', [Validators.required]],
      nivel: [{value: '', disabled: true}, [Validators.required]],
      estados: ['', [Validators.required]]
    })
    
  }

  getEmergenciabyID(emergenciaID: string) {
    this.denunciaService.getEmergenciabyID(emergenciaID).subscribe(emergencia => {
      this.emergenciaSeleccionada = emergencia
      console.log(this.emergenciaSeleccionada);
      const { denunciante: {nombre, apellido}, relatoria, direccion, latitud, longitud, tipo_emergencia:{descripcion}, nivel:{_id: nivelID}, estados: {_id: estadosID}} = this.emergenciaSeleccionada
      this.alertaForm.setValue({nombre, apellido, direccion, relatoria, latitud, longitud, tipoemergencia:descripcion, nivel:nivelID, estados: estadosID})
      console.log(this.alertaForm.value);
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
    console.log(this.alertaForm);
    if(this.alertaForm.invalid){
      console.log('no valido');
      return
    } else {
      // const data = {
      //   estado: false
      // }
      this.editarEmergencia(this.emergenciaSeleccionada.emergenciaID);
      // this.emergenciaService.emitirAlerta(data).subscribe(resp => {
      //   this.uiService.onSuccess(resp.msg);
      //   this.router.navigateByUrl('/dashboard/denuncias')
      // }, error => {
      //   const msgError = error.error.msg
      //   this.uiService.onError(msgError)
      //   this.router.navigateByUrl('/dashboard/denuncias')
      // })
    }
  }

  editarEmergencia(emergenciaID: string) {
    const data = {
      estados: this.alertaForm.get('estados').value
    }
    this.emergenciaService.editarEmergencia(emergenciaID, data).subscribe(resp => {
      this.uiService.onSuccess(resp.msg);
      this.router.navigateByUrl('/dashboard/alertas')
    }, error => {
      console.log(error);
      const msgError = error.error.errors[0].msg;
      this.uiService.onError(msgError);
      this.router.navigateByUrl('/dashboard/alertas')
    })

    console.log(data);
  }


}
