import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
// SERVICIO
import { EscuelasService } from '../../../services/escuelas.service';
// INTERFACES
import { InformeAlumnosInterface } from '../../../interfaces/informe-response';
import { EscuelasInterface } from '../../../interfaces/auxiliares-response';

// GENERAR PDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  public cargando : boolean = false;
  public informealumnos : InformeAlumnosInterface[] = [];
  escuelas: EscuelasInterface[] = [];
  nombre_escuela : string;
  anyo_informe : string = "";
  anyo_actual : string;

  constructor(private escuelaService : EscuelasService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.escuelaService.getListaescuelas()
        .subscribe ( resp => {
          this.escuelas = resp;
        //  console.log(this.escuelas);
        });
    let hoy : Date = new Date(); 
    this.anyo_actual = hoy.getFullYear().toString();     

  }

  buscarAlumnos(anyo : string, cod_escuela : string) {
   
    //console.log("Dentro de Buscar Alumnos");
    //console.log(anyo);
    //console.log("Codigo escuela " + cod_escuela);
    this.cargando = true;
    
    let indice = Number(cod_escuela) - 1;
    this.nombre_escuela = this.escuelas[indice].DESC_ESCUELA;
    this.anyo_informe = anyo;
    if ((anyo.length>3)) {
      this.escuelaService.getAlumnosEscuelaAnyo(cod_escuela,anyo)
          .subscribe( (resp: InformeAlumnosInterface[]) =>{
            // console.log(resp); 
             this.informealumnos = resp;
             this.cargando = false; 
          });
    }  
  }


/****************  GENERAR TABLA EN PDF  *****************************/


generarTablaPdf(){

  
  const header =[['Nº Exp', 'Alumno', 'F.Nac', 'Curso', 'Cuota', 'F.Alta', 'F.Var', 'C.Var']];
  const tableData = [];

  let nuevoRegistro = ['','',''];
 
  for (var i=0;i<this.informealumnos.length;i++){

    nuevoRegistro = [this.informealumnos[i].NUM_EXPEDIENTE.toString(),
                    this.informealumnos[i].NOMBRE_ALUMNO.toString(),
                    this.informealumnos[i].FECHA_NACIMIENTO.toString(),
                    this.informealumnos[i].DESC_CURSO.toString(),
                    this.informealumnos[i].CUOTA_MES.toFixed(2).toString(),
                    this.informealumnos[i].FECHA_ALTA.toString(),
                    this.informealumnos[i].FECHA_VARIACION.toString(),
                    this.informealumnos[i].COD_VARIACION.toString()];
   // nuevoRegistro = ['150', '19' , '19/06/2021' ];
    tableData.push(nuevoRegistro);                  
  }
  
  var pdf = new jsPDF({ orientation : 'landscape', });
  pdf.setFont("courier", "bold");
  pdf.setFontSize(16);

  let titulo = this.nombre_escuela +  " Año Academico :" + this.anyo_informe; // + this.nombre_mercadillo;
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
 





/*****************  FIN GENERAR TABLA EN PDF **************************/

}
