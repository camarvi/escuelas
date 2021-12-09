import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listaexpediente',
  templateUrl: './listaexpediente.component.html',
  styleUrls: ['./listaexpediente.component.css']
})
export class ListaexpedienteComponent implements OnInit {

  //public parcelas : ParcelaInterface[] = [];
  public cargando : boolean = false;
  public codtutor : string = "";
  public dni : string = "";
  public nomtutor : string = "";

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    
    //codtutor/:dni/:nomtutor


    this.codtutor=  this.route.snapshot.paramMap.get('exp');
    this.dni = this.route.snapshot.paramMap.get('dni');
    this.nomtutor = this.route.snapshot.paramMap.get('nomtutor');
    
    console.log("num_exp : " + this.codtutor);
    console.log("dni : " + this.dni);
    console.log("nom_tutor : " + this.nomtutor);

    this.cargando = true;

  }

}
