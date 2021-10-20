import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})


export class ModalImagenComponent implements OnInit {

  

  public ocultarModal: boolean = false;
  constructor( public uiService: UiService) { }
  
  ngOnInit(): void {
  }

  

  cerrarModal() {
    this.uiService.cerrarModal();
  }

}
