import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutoralum',
  templateUrl: './tutoralum.component.html',
  styleUrls: ['./tutoralum.component.css']
})
export class TutoralumComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(parametros =>{
      // console.log("DENTRO DE HOME"); 
      // console.log(parametros);
      // console.log(parametros['id']);
      // console.log(parametros['nombre']);

      });
   }

  ngOnInit(): void {
  }

}
