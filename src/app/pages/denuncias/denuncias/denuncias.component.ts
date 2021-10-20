import { Component, OnInit, OnDestroy } from '@angular/core';
import { DenunciaService } from '../../../services/denuncia.service';
import { Emergencia, Usuario } from '../../../interfaces/interfaces';
import { UiService } from '../../../services/ui.service';
import { timer, Subscription, Observable } from 'rxjs';



@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styles: []
})



export class DenunciasComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public Emergencias: Emergencia[] = [];
  // condicionales 
  public cargandoDenuncia: boolean = false;
  public sinRegistro: boolean = false;
  constructor(private denunciaService: DenunciaService, private uiService: UiService) { 
    this.getDenuncias();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    
    this.getDenuncias();
    this.subscription =  this.denunciaService.refresh.subscribe(()=> {
      this.getDenuncias();
    })
  }



  getDenuncias() {
    // peticion desestructurada http
    this.denunciaService.getDenuncias().subscribe(({total, Emergencia}) => {

      // creamos un arreglo temporal que almacenara todas las emergencias
      let data: Emergencia[] = [];

      /**
       * contador que nos servira para insertar las emergencias que 
       * aun no estan emitidas
       */
      let cont = 0;

      // cargamos el arreglo temporal con las emergencias
      data = Emergencia

      // reiniciamos el arreglo que tendra las emergencias a mostrar
      this.Emergencias = []

      // ciclo for que nos servira para hacer el recorrido de las emergencias 
      for (let i = 0; i < total; i++) {
    
        // condicional, preguntamos si la emergencia no se encuentra emitida para mostrarla
        if(data[i].emitido === false) {

          // en caso que la emergencia cumpla con la condicion, procedemos a insertar en el arreglo
          // creado para mostrarla
          this.Emergencias[cont] = data[i]

          // incrementamos el contador
          cont = cont+ 1
        }
      }

      // inversamos el arreglo a mostrar para que se muestren primero las emergencias emitidas recientemente
      this.Emergencias.reverse();
      

      // condicional, preguntamos si el arreglo esta vacio
      // en el caso que esta vacio cambiamos la bandera de sin registro
      if(this.Emergencias.length <= 0) {

        // bandera sin registro
        this.sinRegistro = true;

        // bandera de carga
        this.cargandoDenuncia = true
      } else {
        // en caso que tenga un registro cambiamos la bandera de sin registro
        this.sinRegistro = false
        this.cargandoDenuncia = true
      }

    }, error => {
      console.warn(error);
      
      // en caso que haya un error en la request se procede al cambio de bandera
      this.cargandoDenuncia = true;
      this.sinRegistro = true;
    })
  }

 

  abrirModal(emergencia: Emergencia) {
    this.uiService.abrirModal(emergencia.img);
  }





}
