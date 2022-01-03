import { Component, OnInit , Input} from '@angular/core';

// Importar Interface
import { ReciboInterface } from '../../interfaces/recibo-response';


@Component({
  selector: 'app-recibos-grid',
  templateUrl: './recibos-grid.component.html',
  styleUrls: ['./recibos-grid.component.css']
})
export class RecibosGridComponent implements OnInit {

  @Input() recibosAlumnos! : ReciboInterface[];
  @Input() periodo! : string;
  
  constructor() { }

  ngOnInit(): void {
     

  }

}
