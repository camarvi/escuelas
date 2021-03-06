import { Component, OnInit } from '@angular/core';

import { ActivatedRoute , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { NgForm } from '@angular/forms';

import { CuotaInterface } from '../../../interfaces/cuota-response';
import { ExpedienteModel } from '../../../models/expediente.model';
import { CuotasModel } from '../../../models/cuotas.model';

// IMPORTAR EL SERVICIO
import { EscuelasService } from '../../../services/escuelas.service';
import { FechasService } from '../../../services/fechas.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-listacuotas',
  templateUrl: './listacuotas.component.html',
  styleUrls: ['./listacuotas.component.css']
})
export class ListacuotasComponent implements OnInit {

  public cuotas : CuotaInterface[] = [];
  public cargando : boolean = false;
  public codmatricula : string = "";
  public codexpediente : string = "";
  public anyo : string = "";
  public cuotarecibida : number = 0;
  public expediente = new ExpedienteModel();


  public dni : string = "";
  public nombrealumno : string = "";

  nuevaCuota : CuotasModel = new CuotasModel();

  constructor(private route : ActivatedRoute,private escuelaService : EscuelasService,
              private fechaService : FechasService,
              private location : Location, 
              private router : Router) { }

  ngOnInit(): void {

    this.codmatricula =  this.route.snapshot.paramMap.get('codmatricula');
    this.codexpediente = this.route.snapshot.paramMap.get('expediente');
    this.anyo = this.route.snapshot.paramMap.get('anyo');
    this.cuotarecibida = Number(this.route.snapshot.paramMap.get('cuota'));
    

    this.nuevaCuota.COD_MATRICULA = Number(this.codmatricula);
    this.nuevaCuota.CUOTA = this.cuotarecibida;

    // console.log("Objeto Nueva Cuota (Cod_Cuota): " + this.nuevaCuota.COD_CUOTA);
    // console.log("Objeto Nueva Cuota (Matricula): " + this.nuevaCuota.COD_CUOTA);
    // // this.nuevaCuota.F_INICIO = this.fechaService.mostrarfecha(this.nuevaCuota.F_INICIO);
    // this.nuevaCuota.F_FIN = this.fechaService.mostrarfecha(this.nuevaCuota.F_FIN);

    this.nuevaCuota.F_INICIO = this.fechaService.mostrarfecha('01/01/' + this.anyo);
    this.nuevaCuota.F_FIN = this.fechaService.mostrarfecha('31/12/' + this.anyo);
   
    this.escuelaService.getCuotasMatricula(this.codmatricula)
      .subscribe( (resp : CuotaInterface[])=>{
        this.cuotas = resp;
      //  console.log(resp);
      });
      
     this.escuelaService.buscarExpedienteId(this.codexpediente)
        .subscribe((resp : ExpedienteModel)=>{
          this.expediente = resp[0];
        //  console.log(this.expediente);
        })

  }


 guardarCuota(forma : NgForm) {
    
   // console.log("Dentro de guardar matricula")
   if (forma.invalid) {
    // recorrer los elementos del formulario para que se dispare las validaciones
    Object.values(forma.controls).forEach((control) => {
      control.markAsTouched(); //Lo pongo como pulsado
    });
    return;
  }

  let peticion : Observable<any>;

  if (this.nuevaCuota.COD_CUOTA!==0 ){
    //console.log("Modificando Cuota");
    this.nuevaCuota.F_INICIO = this.fechaService.almacenaFecha(this.nuevaCuota.F_INICIO);
    this.nuevaCuota.F_FIN = this.fechaService.almacenaFecha(this.nuevaCuota.F_FIN);
    this.nuevaCuota.COD_MATRICULA = Number(this.codmatricula); 
    peticion = this.escuelaService.updateCuota(this.nuevaCuota);
    
  } else { //NUEVO REGISTRO
    // console.log("Alta nueva Cuota");
    // console.log("Datos NUEVA CUOTA INICIO : " + this.fechaService.almacenaFecha(this.nuevaCuota.F_INICIO));
    // console.log("Datos NUEVA CUOTA FIN : " + this.fechaService.almacenaFecha(this.nuevaCuota.F_FIN));
    this.nuevaCuota.F_INICIO = this.fechaService.almacenaFecha(this.nuevaCuota.F_INICIO);
    this.nuevaCuota.F_FIN = this.fechaService.almacenaFecha(this.nuevaCuota.F_FIN);
    this.nuevaCuota.COD_MATRICULA = Number(this.codmatricula); // Number(this.numexp);
    peticion = this.escuelaService.newCuota(this.nuevaCuota);
 
  }

peticion.subscribe( resp => {
  
  Swal.fire({
    title : "Cuota",
    text : 'Se almaceno correctamente..',
    icon : 'success'
  });
  //  this.nuevaCuota = new CuotasModel();
  //  this.nuevaCuota.F_INICIO = this.fechaService.mostrarfecha(this.nuevaCuota.F_INICIO);
  //  this.nuevaCuota.F_FIN = this.fechaService.mostrarfecha(this.nuevaCuota.F_FIN);
  
  this.ngOnInit();

  });

  this.ngOnInit();  
  this.nuevaCuota = new CuotasModel();
  this.nuevaCuota.F_INICIO = this.fechaService.mostrarfecha(this.nuevaCuota.F_INICIO);
  this.nuevaCuota.F_FIN = this.fechaService.mostrarfecha(this.nuevaCuota.F_FIN);
 
 }

  eliminarCuota(id: string){
    // console.log("Eliminar Cuota");
    // console.log(id);
    this.escuelaService.deleteCuotaId(id)
      .subscribe( resp => {
          Swal.fire({
             title : "Eliminar",
             text : 'Cuota eliminada correctamente..',
             icon : 'success'
          });
        });
  }
  

   // RECIBE LOS DATOS DEL EVENTO (propagar)="procesaPropagar($event)"
   procesaPropagar(codigo : string) {
  
    // console.log("EliminarMatricula");
    // console.log("Codigo Cuota recibido " + codigo);
     this.eliminarCuota(codigo);
   
  }
 
   procesaPropagarEditar(cuotaRecibida : CuotaInterface) {
     
    // console.log("Datos Cuota Recibida");
    // console.log(cuotaRecibida);
    
     this.nuevaCuota.COD_CUOTA = cuotaRecibida.COD_CUOTA;
     this.nuevaCuota.COD_MATRICULA = cuotaRecibida.COD_MATRICULA;
     this.nuevaCuota.CUOTA = cuotaRecibida.CUOTA;
     this.nuevaCuota.F_INICIO = this.fechaService.mostrarfecha(cuotaRecibida.F_INICIO);
     this.nuevaCuota.F_FIN = this.fechaService.mostrarfecha(cuotaRecibida.F_FIN);

    
   }
 
   reiniciar() {
     this.nuevaCuota = new CuotasModel();
     this.nuevaCuota.COD_CUOTA = 0;
     this.nuevaCuota.COD_MATRICULA = Number(this.codmatricula);
     this.nuevaCuota.F_INICIO = this.fechaService.mostrarfecha('01/01/' + this.anyo);
     this.nuevaCuota.F_FIN = this.fechaService.mostrarfecha('31/12/' + this.anyo);

  }

  verDetalleExp(id_expediente : number) {
    
    // [routerLink]="['/listaexpediente', tutor.IDPERSONA ,tutor.NIF , tutor.APE1 + ' ' + tutor.APE2 + ' ' + tutor.NOMBRE]"
       
      this.router.navigate(['/detalle_exp', id_expediente],{skipLocationChange: true, replaceUrl: false});
  
    //    [routerLink]="['/detalle_exp', expediente.NUM_EXPEDIENTE]" >

    }

  // COMPROBAR QUE LAS FECHAS ESTAN DENTRO DEL A??O EN CURSO
  
  compruebaFechas(forma : NgForm){
    
    let compruebaInicio : number;
    let compruebaFinal : number;

    compruebaInicio = Number(this.nuevaCuota.F_INICIO.slice(0,4));
    compruebaFinal = Number(this.nuevaCuota.F_FIN.slice(0,4));
    
    //console.log("A??o Inicio " + compruebaInicio); 
    //console.log("A??o Final " + compruebaFinal);

    if (compruebaFinal==Number(this.anyo) && compruebaInicio == Number(this.anyo) ){
      this.guardarCuota(forma)
    } else {
       Swal.fire({
         title : "Cuota",
         text : 'Error en el rango de fechas..',
         icon : 'error'
       });
     
    }

  }


}
