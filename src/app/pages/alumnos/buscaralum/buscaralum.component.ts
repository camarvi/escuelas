import { Component, OnInit } from '@angular/core';

import { ExpedienteInterface } from '../../../interfaces/expediente-response'; 
// iIMPORTAR EL SERVICIO
import { EscuelasService } from '../../../services/escuelas.service';


@Component({
  selector: 'app-buscaralum',
  templateUrl: './buscaralum.component.html',
  styleUrls: ['./buscaralum.component.css']
})
export class BuscaralumComponent implements OnInit {

  public expedientes : ExpedienteInterface[] = [];
  public cargando : boolean = false;

  constructor(private escuelaService : EscuelasService) { }

  ngOnInit(): void {
  }

  buscarExpediente(num_exp: string, nombreAlumno : string) {

   this.cargando = true;

    //if (Number.isInteger(Number(num_exp)) && num_exp.length>1){
    if (num_exp.length>0) {  
      console.log("buscar por codigo");
      this.escuelaService.buscarExpedienteId(num_exp.toString())
          .subscribe( resp => {
             this.expedientes[0] = resp[0];
             console.log("Datos del expediente buscado"); 
             console.log(this.expedientes);
             this.cargando = false; 
          }); 
    } else {
      // BUSCAR POR NOMBRE ALUMNO
      console.log("Buscar por nombre");
      if (nombreAlumno.length>1) {
        this.escuelaService.buscarExpedienteNomAlum(nombreAlumno.toUpperCase())
            .subscribe( resp => {
              console.log(resp);
              this.expedientes = resp;
              console.log(this.expedientes);
              this.cargando = false
            })
      }
    }
 
    this.cargando = false;

  }



}
