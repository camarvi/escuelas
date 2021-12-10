import { Component, OnInit, Input } from '@angular/core';
import { ExpedienteInterface } from '../../interfaces/expediente-response';

@Component({
  selector: 'app-expedientes-grid',
  templateUrl: './expedientes-grid.component.html',
  styleUrls: ['./expedientes-grid.component.css']
})
export class ExpedientesGridComponent implements OnInit {

@Input() expedientes! : ExpedienteInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
