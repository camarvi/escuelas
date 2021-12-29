import { Component, OnInit } from '@angular/core';
// IMPORTAR EL SERVICIO
import { EscuelasService } from '../../../services/escuelas.service';
// IMPORTAR INTERFACE
import { MesesInterface } from '../../../interfaces/auxiliares-response';


@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.css']
})
export class RecibosComponent implements OnInit {

  meses : MesesInterface[];
  anyo_actual : string;
  

  constructor(private escuelaService : EscuelasService) { }

  ngOnInit(): void {
    this.escuelaService.getMeses()
        .subscribe( (resp : MesesInterface[])=>{
          this.meses = resp;
          console.log("Listado Meses");
          console.log(this.meses);
        });
    let hoy : Date = new Date(); 
    this.anyo_actual = hoy.getFullYear().toString();   
    
  }

  generarRecibos(anyo : string, cod_mes : string) {
    

  }

}
