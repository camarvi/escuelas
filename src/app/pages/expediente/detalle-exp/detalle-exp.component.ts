import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-exp',
  templateUrl: './detalle-exp.component.html',
  styleUrls: ['./detalle-exp.component.css']
})
export class DetalleExpComponent implements OnInit {

  private numexp : string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.numexp =  this.route.snapshot.paramMap.get('numexp');
    console.log("NUM EXP RECIBIDO");
    console.log(this.numexp);
   
  }

}
