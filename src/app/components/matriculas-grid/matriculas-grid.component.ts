import { Component, OnInit, Input } from '@angular/core';

import { MatriculasInterface } from '../../interfaces/matricula-response';

@Component({
  selector: 'app-matriculas-grid',
  templateUrl: './matriculas-grid.component.html',
  styleUrls: ['./matriculas-grid.component.css']
})
export class MatriculasGridComponent implements OnInit {

  @Input() matriculas! : MatriculasInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
