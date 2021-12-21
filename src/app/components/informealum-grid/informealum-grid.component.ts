import { Component, OnInit , Input } from '@angular/core';
import { InformeAlumnosInterface } from '../../interfaces/informe-response';

@Component({
  selector: 'app-informealum-grid',
  templateUrl: './informealum-grid.component.html',
  styleUrls: ['./informealum-grid.component.css']
})
export class InformealumGridComponent implements OnInit {

  @Input() informealumnos! : InformeAlumnosInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
