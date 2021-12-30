import { Component, OnInit } from '@angular/core';
// IMPORTAR EL SERVICIO
import { EscuelasService } from '../../../services/escuelas.service';
// IMPORTAR INTERFACE
import { MesesInterface } from '../../../interfaces/auxiliares-response';
import { ReciboInterface } from '../../../interfaces/recibo-response';

@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.css']
})
export class RecibosComponent implements OnInit {

  meses : MesesInterface[] = [];
  anyo_actual : string;
  periodo : string;
  public cargando : boolean = false;
  public recibosAlumnos : ReciboInterface[] = [];

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
    
    // console.log("Dentro de Generar Recibos");
    // console.log("Anyo : " + anyo);
    // console.log("Mes periodo : " + cod_mes);
    this.cargando = true;
    let fecha_busqueda : string;
    let indice : number;
    indice = Number(cod_mes) -1;

    if (cod_mes.length>1){
      fecha_busqueda = '01_' + cod_mes + '_' + anyo
    } else {
      fecha_busqueda = '01_0' + cod_mes + '_' + anyo
    }

    this.escuelaService.getRecibosEscuela(fecha_busqueda,anyo)
        .subscribe ( (resp:ReciboInterface[] )=>{
          this.recibosAlumnos = resp;
          //console.log(this.recibosAlumnos);
          this.cargando = false;
          this.periodo = (this.meses[indice].DES_MES + ' ' + anyo);
          this.periodo = this.periodo.toUpperCase();
        //  console.log("MES PERIODO : " + this.meses[1].DES_MES);
          //console.log("Mes periodo " +  this.periodo);
        })

  }

  generarTablaPdf() {
    console.log("Dentro de generar Tabla PDF");
  }

}
