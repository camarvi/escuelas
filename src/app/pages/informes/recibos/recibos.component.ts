import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
// IMPORTAR EL SERVICIO
import { EscuelasService } from '../../../services/escuelas.service';
// IMPORTAR INTERFACE
import { MesesInterface } from '../../../interfaces/auxiliares-response';
import { ReciboInterface, ReciboTxtInterface } from '../../../interfaces/recibo-response';

// GENERAR PDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  constructor(private escuelaService : EscuelasService, private datePipe : DatePipe) { }

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


  generarReciboTxt(anyo : string, cod_mes : string, anyocargo : string) {
    
    this.cargando = false; //true;
    let fecha_busqueda : string;
    let indice : number;
    
    let date = new Date(parseInt(anyo),parseInt(cod_mes)-1,1);

    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let anyoFecha = primerDia.getFullYear();
    let mesFecha = (primerDia.getMonth() + 1).toString();
  
    // console.log('primerDiayear ' + anyoFecha);
    // console.log('primerDiamonth ' + mesFecha);
    // console.log('UltimaDia ' + ultimoDia.getDate());

   if (mesFecha.length<2){
     mesFecha = '0' + mesFecha;
   }
    
    let finicio =  anyoFecha + mesFecha + '01';
    let ffin =  anyoFecha + mesFecha + ultimoDia.getDate();
 
   
    indice = Number(cod_mes) -1;
    
    if (cod_mes.length>1){
      fecha_busqueda = '01_' + cod_mes + '_' + anyo
    } else {
      fecha_busqueda = '01_0' + cod_mes + '_' + anyo
    }

    console.log("Fecha Busqueda :" + fecha_busqueda);
    console.log("ANYO : " + anyo);
    console.log("MES : " + this.meses[indice].DES_MES.toUpperCase());
    
    console.log("primerDia : " + finicio  );
    console.log("ultimoDia : " + ffin  );

    this.escuelaService.getRecibosEscuelaTxt(fecha_busqueda,finicio,ffin,anyo,
      this.meses[indice].DES_MES.toUpperCase(),anyocargo)
          .subscribe( (resp : ReciboTxtInterface[]) => {
              console.log(resp);
          }); 

  }


  generarTablaPdf() {
    console.log("Dentro de generar Tabla PDF");

    const header =[['Dni', 'Tutor', 'Alumno', 'Periodo', 'Ref', 'Curso', 'Importe']];
    const tableData = [];

    let nuevoRegistro = ['','',''];

    for (var i=0;i<this.recibosAlumnos.length;i++){

      nuevoRegistro = [this.recibosAlumnos[i].NIF.toString(),
                      this.recibosAlumnos[i].NOMBRE_TUTOR.toString(),
                      this.recibosAlumnos[i].NOMBRE_ALUMNO.toString(),
                      this.periodo.toString(),
                      this.recibosAlumnos[i].NUM_EXPEDIENTE.toString(),
                      this.recibosAlumnos[i].DESC_CURSO.toString(),
                      this.recibosAlumnos[i].CUOTA.toString()];
      tableData.push(nuevoRegistro);                  
    }
    
    var pdf = new jsPDF({ orientation : 'landscape', });
    pdf.setFont("courier", "bold");
    pdf.setFontSize(16);
  
    let titulo = " Recibos Periodo " + this.periodo.toString(); // + this.nombre_mercadillo;
    pdf.text(titulo, 35 , 15);
    //Poner una linea debajo
    const textWidth = pdf.getTextWidth(titulo);
    pdf.setLineWidth(0.7);
    pdf.line(35,17,35 + textWidth , 17);
   
    (pdf as any).autoTable({
      head: header,
      body:tableData,
      tableLineColor : [44,62,80],
      tableLineWidth: 0.75,
      styles:{
        font : "courier",
        lineColor : [44, 62, 80],
        lineWidth: 0.55
            },
      headerStyles: {
        fillColor: [186, 235 , 236],
        lineColor: [44, 62, 80],
        lineWidth: 0.55,
        fontSize: 11
      },
      bodyStyles: {
        fillColor : [242, 251, 251], //[254,255,241], //[255, 255, 255],
        lineColor : [44, 62, 80],
        lineWidth : 0.55,
        textColor : 50
      },
      alternateRowStyles: {
        fillColor : [255, 255, 255],
        lineColor : [44, 62, 80],
        lineWidth : 0.55,
        textColor : 50
      },
      margin:{ top : 25},
      theme: 'plain',
      didDrawCell: (data:any) => {
          //console.log(data.column.index)
      }
    })
  
    // PONER EL NUMERO DE LA PAGINA
    
    const pageCount = pdf.getNumberOfPages();
    pdf.setFont("courier", "normal");
    pdf.setFontSize(12);
    
    for (var j=1;j<=pageCount;j++){
      pdf.setPage(j);
      pdf.text('Pagina ' + String(j) + ' de ' + String(pageCount),250,15);
    }
  
    let hoy : Date = new Date();
    let nombre_archivo = "listadoalumnos"+ this.datePipe.transform(hoy, 'dd_MM_yyy') + ".pdf";
    pdf.save(nombre_archivo);
  


  }

}
