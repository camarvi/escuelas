import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  constructor() { }


  mostrarfecha(fecharecibida:string) 
  {
    console.log("Dentro MostrarFecha");
    console.log(fecharecibida);
    let arrayFecha = fecharecibida.split('/');
    let dia: string = arrayFecha[0];
    let mes : string = arrayFecha[1];
    let anio : string = arrayFecha[2];
  
    if (dia.length==1) {
      dia = "0" + dia;
    }
    if (mes.length==1) {
      mes = "0" + mes;
    }
    let fechaok : string = anio + "-" + mes + "-" + dia;
    console.log(fechaok);
   return  fechaok;
  }

}
