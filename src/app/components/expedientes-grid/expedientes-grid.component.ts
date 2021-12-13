import { Component, OnInit, Input } from '@angular/core';
import { ExpedienteInterface } from '../../interfaces/expediente-response';

import { Router } from '@angular/router';

@Component({
  selector: 'app-expedientes-grid',
  templateUrl: './expedientes-grid.component.html',
  styleUrls: ['./expedientes-grid.component.css']
})
export class ExpedientesGridComponent implements OnInit {

@Input() expedientes! : ExpedienteInterface[];

  constructor(private router : Router) { }

  ngOnInit(): void {
  }


  verDetalleExp(id_expediente : number) {
    
    // [routerLink]="['/listaexpediente', tutor.IDPERSONA ,tutor.NIF , tutor.APE1 + ' ' + tutor.APE2 + ' ' + tutor.NOMBRE]"
       
      this.router.navigate(['/detalle_exp', id_expediente],{skipLocationChange: true, replaceUrl: false});
  
    //    [routerLink]="['/detalle_exp', expediente.NUM_EXPEDIENTE]" >

    }

}
