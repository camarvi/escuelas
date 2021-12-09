import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscaralum',
  templateUrl: './buscaralum.component.html',
  styleUrls: ['./buscaralum.component.css']
})
export class BuscaralumComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  buscarExpediente(num_exp: string) {
    console.log("Dentro de buscar Expediente");
    console.log(num_exp);
  }



}
