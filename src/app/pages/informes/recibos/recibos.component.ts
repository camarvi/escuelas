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

// GENERAR TXT
// import { DomSanitizer } from '@angular/platform-browser';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.css']
})
export class RecibosComponent implements OnInit {

  meses : MesesInterface[] = [];
  anyo_actual : string;
  periodo : string;
  contador_lineas : number = 0;
  lineasFichero : string = "";

  public lineasRecibos : ReciboTxtInterface[] = [];

  public cargando : boolean = false;
  public recibosAlumnos : ReciboInterface[] = [];
  fileUrl;

  constructor(private escuelaService : EscuelasService, 
              private datePipe : DatePipe) { }
            //  private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.escuelaService.getMeses()
        .subscribe( (resp : MesesInterface[])=>{
          this.meses = resp;     
  
        });
    let hoy : Date = new Date(); 
    this.anyo_actual = hoy.getFullYear().toString();   
    
  }

 async generarRecibos(anyo : string, cod_mes : string) {

    this.cargando = true;
    let fecha_busqueda : string;
    let indice : number;
    indice = Number(cod_mes) -1;
    

    if (cod_mes.length>1){
      fecha_busqueda = '01_' + cod_mes + '_' + anyo
    } else {
      fecha_busqueda = '01_0' + cod_mes + '_' + anyo
    }
    
      let resultado = await this.escuelaService.getRecibosEscuela(fecha_busqueda,anyo,cod_mes);
       // .subscribe ( (resp:ReciboInterface[] )=>{
          //this.recibosAlumnos=resp;
          this.recibosAlumnos = this.recibosAlumnos.concat(resultado);
          
          //this.results = this.results.concat(data.results);
               
          //console.log(this.recibosAlumnos);
          
        //  this.periodo = (this.meses[indice].DES_MES + ' ' + anyo);
        //  this.periodo = this.periodo.toUpperCase();
      
      //  })

  }


  async generarReciboTxt(anyo : string, cod_mes : string, anyocargo : string, contador_linea : string)  {
    
    let linea : string;
   

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
    //let nombre_fichero = "Recibos_" + cod_mes + "_" + anyo + ".txt";
   
    indice = Number(cod_mes) -1;
    
    if (cod_mes.length>1){
      fecha_busqueda = '01_' + cod_mes + '_' + anyo
    } else {
      fecha_busqueda = '01_0' + cod_mes + '_' + anyo
    }

    // console.log("Fecha Busqueda :" + fecha_busqueda);
    // console.log("ANYO : " + anyo);
    // console.log("MES : " + this.meses[indice].DES_MES.toUpperCase());
    
    // console.log("primerDia : " + finicio  );
    // console.log("ultimoDia : " + ffin  );
    let i : number;  

  // if ((Number(cod_mes)>0 && Number(cod_mes)<7)) {  
  if (Number(cod_mes)!=8) {    

    console.log('this.contador_lineas ' + this.contador_lineas);

    this.lineasRecibos =await this.escuelaService.
              getRecibosEscuelaTxt(fecha_busqueda,finicio,ffin,anyo,
                          this.meses[indice].DES_MES.toUpperCase(),anyocargo,Number(this.contador_lineas));

    this.contador_lineas = this.contador_lineas + this.lineasRecibos.length;
   
      // .subscribe( (resp : ReciboTxtInterface[]) => {
      //       this.lineasRecibos = resp;  
      //       this.contador_lineas = this.contador_lineas + resp.length;
            if (this.lineasRecibos.length>0){
            //  console.log("GENERANDO EL FOR");
              for (i=0; i<this.lineasRecibos.length; i++){
                linea = this.lineasRecibos[i].CAMPO1 + this.lineasRecibos[i].CAMPO2 +
                   this.lineasRecibos[i].CAMPO3 + 
                   this.lineasRecibos[i].CAMPO4 +
                   this.lineasRecibos[i].CAMPO5 +
                   this.lineasRecibos[i].CAMPO6 +
                   this.lineasRecibos[i].CAMPO7 +
                   this.lineasRecibos[i].CAMPO8 +
                   this.lineasRecibos[i].CAMPO9 +
                   this.lineasRecibos[i].CAMPO10 +
                   this.lineasRecibos[i].CAMPO11 +
                   this.lineasRecibos[i].CAMPO12 +
                   this.lineasRecibos[i].CAMPO14 +
                   this.lineasRecibos[i].CAMPO15 +
                   this.lineasRecibos[i].CAMPO16 +
                   this.lineasRecibos[i].CAMPO17 +
                   this.lineasRecibos[i].CAMPO18 +
                   this.lineasRecibos[i].CAMPO19 +
                   this.lineasRecibos[i].CAMPO20 +
                   this.lineasRecibos[i].CAMPO21 +
                   this.lineasRecibos[i].CAMPO22 +
                   this.lineasRecibos[i].CAMPO23 +
                   this.lineasRecibos[i].CAMPO24 +
                   this.lineasRecibos[i].CAMPO25 + "\n";
              
                this.lineasFichero = this.lineasFichero + linea ;
                
              }
           // CODIGO QUE FUNCIONA OK 
          //  this.ficheroReciboTxt(lineasFichero,nombre_fichero,Number(cod_mes));

          // PENDIENTE DE COMPROBAR
             
          }       
 
   }  else {
      Swal.fire({
        title : "Error",
        text : 'El periodo no es valido..',
        icon : 'warning'
      });
    }

  }






  // generarReciboTxt(anyo : string, cod_mes : string, anyocargo : string, contador_linea : string)  {
    
  //   let linea : string;
   

  //   this.cargando = false; //true;
  //   let fecha_busqueda : string;
  //   let indice : number;
    
  //   let date = new Date(parseInt(anyo),parseInt(cod_mes)-1,1);

  //   var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
  //   var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  //   let anyoFecha = primerDia.getFullYear();
  //   let mesFecha = (primerDia.getMonth() + 1).toString();
  
  //   // console.log('primerDiayear ' + anyoFecha);
  //   // console.log('primerDiamonth ' + mesFecha);
  //   // console.log('UltimaDia ' + ultimoDia.getDate());

  //  if (mesFecha.length<2){
  //    mesFecha = '0' + mesFecha;
  //  }
    
  //   let finicio =  anyoFecha + mesFecha + '01';
  //   let ffin =  anyoFecha + mesFecha + ultimoDia.getDate();
  //   let nombre_fichero = "Recibos_" + cod_mes + "_" + anyo + ".txt";
   
  //   indice = Number(cod_mes) -1;
    
  //   if (cod_mes.length>1){
  //     fecha_busqueda = '01_' + cod_mes + '_' + anyo
  //   } else {
  //     fecha_busqueda = '01_0' + cod_mes + '_' + anyo
  //   }

  //   // console.log("Fecha Busqueda :" + fecha_busqueda);
  //   // console.log("ANYO : " + anyo);
  //   // console.log("MES : " + this.meses[indice].DES_MES.toUpperCase());
    
  //   // console.log("primerDia : " + finicio  );
  //   // console.log("ultimoDia : " + ffin  );
  //   let i : number;  

  // // if ((Number(cod_mes)>0 && Number(cod_mes)<7)) {  
  // if (Number(cod_mes)!=8) {    
  //   this.escuelaService.getRecibosEscuelaTxt(fecha_busqueda,finicio,ffin,anyo,
  //     this.meses[indice].DES_MES.toUpperCase(),anyocargo,Number(this.contador_lineas))
  //     .subscribe( (resp : ReciboTxtInterface[]) => {
  //           this.lineasRecibos = resp;  
  //           this.contador_lineas = this.contador_lineas + resp.length;
  //           if (this.lineasRecibos.length>0){
  //           //  console.log("GENERANDO EL FOR");
  //             for (i=0; i<this.lineasRecibos.length; i++){
  //               linea = this.lineasRecibos[i].CAMPO1 + this.lineasRecibos[i].CAMPO2 +
  //                  this.lineasRecibos[i].CAMPO3 + 
  //                  this.lineasRecibos[i].CAMPO4 +
  //                  this.lineasRecibos[i].CAMPO5 +
  //                  this.lineasRecibos[i].CAMPO6 +
  //                  this.lineasRecibos[i].CAMPO7 +
  //                  this.lineasRecibos[i].CAMPO8 +
  //                  this.lineasRecibos[i].CAMPO9 +
  //                  this.lineasRecibos[i].CAMPO10 +
  //                  this.lineasRecibos[i].CAMPO11 +
  //                  this.lineasRecibos[i].CAMPO12 +
  //                  this.lineasRecibos[i].CAMPO14 +
  //                  this.lineasRecibos[i].CAMPO15 +
  //                  this.lineasRecibos[i].CAMPO16 +
  //                  this.lineasRecibos[i].CAMPO17 +
  //                  this.lineasRecibos[i].CAMPO18 +
  //                  this.lineasRecibos[i].CAMPO19 +
  //                  this.lineasRecibos[i].CAMPO20 +
  //                  this.lineasRecibos[i].CAMPO21 +
  //                  this.lineasRecibos[i].CAMPO22 +
  //                  this.lineasRecibos[i].CAMPO23 +
  //                  this.lineasRecibos[i].CAMPO24 +
  //                  this.lineasRecibos[i].CAMPO25 + "\n";
              
  //               this.lineasFichero = this.lineasFichero + linea ;
                
  //             }
  //          // CODIGO QUE FUNCIONA OK 
  //         //  this.ficheroReciboTxt(lineasFichero,nombre_fichero,Number(cod_mes));

  //         // PENDIENTE DE COMPROBAR
             
  //         }       

  //         });  
  //  }  else {
  //     Swal.fire({
  //       title : "Error",
  //       text : 'El periodo no es valido..',
  //       icon : 'warning'
  //     });
  //   }

  // }



  ficheroReciboTxt(contenido : string , nombre_fichero : string) {
    
    const data = contenido;
    //  const blob = new Blob([data], { type: 'application/octet-stream;charset=ansi;' });
    const blob = new Blob([data], { type: 'text/plain;charset=ansi' });
    let fileURL = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = fileURL;
    a.download = nombre_fichero;

    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(fileURL);
    a.remove();


  }

  generarTablaPdf() {
    //console.log("Dentro de generar Tabla PDF");

    const header =[['Dni', 'Tutor', 'Alumno', 'Periodo', 'Ref', 'Curso', 'Importe']];
    const tableData = [];

    let nuevoRegistro = ['','',''];

    let importeFinal : number = 0;

    for (var i=0;i<this.recibosAlumnos.length;i++){

      importeFinal = importeFinal + this.recibosAlumnos[i].CUOTA;
      nuevoRegistro = [this.recibosAlumnos[i].NIF.toString(),
                      this.recibosAlumnos[i].NOMBRE_TUTOR.toString(),
                      this.recibosAlumnos[i].NOMBRE_ALUMNO.toString(),
                     // this.periodo.toString(),
                      this.recibosAlumnos[i].PERIODO.toString(),
                      this.recibosAlumnos[i].NUM_EXPEDIENTE.toString(),
                      this.recibosAlumnos[i].DESC_CURSO.toString(),
                    //  this.recibosAlumnos[i].CUOTA.toString(),
                      parseFloat(this.recibosAlumnos[i].CUOTA.toString()).toFixed(2)];
      tableData.push(nuevoRegistro);                  
    }
    
    console.log(importeFinal);

    var pdf = new jsPDF({ orientation : 'landscape', });
    pdf.setFont("courier", "bold");
    pdf.setFontSize(14);
  
   // let titulo = "Periodo " + this.periodo.toString() + "   Importe Recibos : " + importeFinal.toString() // + this.nombre_mercadillo;
   let titulo = "Listado Emision    Importe Recibos : " + parseFloat(importeFinal.toString()).toFixed(2) // + this.nombre_mercadillo;
   
   pdf.text(titulo, 35 , 15);
    //Poner una linea debajo
    const textWidth = pdf.getTextWidth(titulo);
    pdf.setLineWidth(0.7);
    pdf.line(35,17,35 + textWidth , 17);
   
    // let tituloImporte = " Importe Periodo : " + importeFinal.toString(); // + this.nombre_mercadillo;
    // pdf.text(tituloImporte, 50 , 15);
    // //Poner una linea debajo
    // const textWidth2 = pdf.getTextWidth(tituloImporte);
    // pdf.setLineWidth(0.7);
    // pdf.line(50,17,50 + textWidth2 , 17);

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


async generaTxtVariosMeses(ejercicio : string,desde: string,hasta : string ,anyocargo : string,contador : string){

  let conFor : number = 0;
  let nomFichero : string = "Recibos_" + desde + '_' + hasta + '_' + ejercicio + '.txt';
 
  this.contador_lineas = Number(contador);

  // INICIAR VALORES ANTES BUCLE
  this.lineasFichero = "";
  this.lineasRecibos = [];

  if (Number(desde)<=Number(hasta)) {
    
      for (conFor=Number(desde);conFor<=Number(hasta);conFor++) {
        await this.generarReciboTxt(ejercicio, conFor.toString(), anyocargo, '0'); 
      }

      //this.ficheroReciboTxt(this.lineasFichero,"pruebavarios.txt"); 
      this.ficheroReciboTxt(this.lineasFichero,nomFichero);
    } else {
      Swal.fire({
               title : "Error",
               text : 'El periodo no es valido..',
               icon : 'warning'
             });
    }



  }

async generarRecibosVariosMeses(anyo : string, mes_desde : string, mes_hasta : string) {

  let conFor : number = 0; 
  this.recibosAlumnos = [];

   if (Number(mes_desde)<=Number(mes_hasta)) {
    this.cargando = true; 
    for (conFor=Number(mes_desde);conFor<=Number(mes_hasta);conFor++) {
      await this.generarRecibos(anyo, conFor.toString()); 
    }
    this.cargando = false;
   } else {
    Swal.fire({
      title : "Error",
      text : 'El periodo no es valido..',
      icon : 'warning'
    });
   }


  } 
   
}