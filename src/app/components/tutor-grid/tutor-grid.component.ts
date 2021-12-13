import { Component, OnInit, Input } from '@angular/core';
import {TutorInterface } from '../../interfaces/tutor-response';

import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-grid',
  templateUrl: './tutor-grid.component.html',
  styleUrls: ['./tutor-grid.component.css']
})
export class TutorGridComponent implements OnInit {

  @Input() tutores!: TutorInterface[];

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  verFicha(idpersona : number, dni:string, nombretutor : string) {
    
  // [routerLink]="['/listaexpediente', tutor.IDPERSONA ,tutor.NIF , tutor.APE1 + ' ' + tutor.APE2 + ' ' + tutor.NOMBRE]"
     
    this.router.navigate(['/listaexpediente', idpersona, dni, nombretutor],{skipLocationChange: true, replaceUrl: false});

  }

}
