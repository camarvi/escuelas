import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest , Observable } from 'rxjs';

import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { EscuelasService } from '../../../services/escuelas.service';
import { FechasService } from '../../../services/fechas.service';

import { ExpedienteModel } from '../../../models/expediente.model';

import { EscuelasInterface, ParentescoInterface, VariacionesInterface } from '../../../interfaces/auxiliares-response';
import { MatriculasInterface } from '../../../interfaces/matricula-response';
import { TutorInterface } from '../../../interfaces/tutor-response';

@Component({
  selector: 'app-detalle-exp',
  templateUrl: './detalle-exp.component.html',
  styleUrls: ['./detalle-exp.component.css']
})
export class DetalleExpComponent implements OnInit {

  public expediente =  new ExpedienteModel();
  public nombreTutor : string;
  public dniTutor : string;
  public editarExp : boolean = false;
  //public datosTutor : TutorInterface; 
  
  matriculas : MatriculasInterface[] = [];
  escuelas : EscuelasInterface[] = [];
  listaParentesco : ParentescoInterface[] = [];
  tiposVariaciones : VariacionesInterface[] = [];
  
  mesjulioactivo : boolean = false;

  constructor(private escuelaService : EscuelasService, 
              private fechaService : FechasService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const numexp =  this.route.snapshot.paramMap.get('numexp');

    console.log("DATOS DEL EXPEDIENTE MODEL");
    console.log(this.expediente);
    console.log("FIN DATOS DEL EXPEDIENTE MODEL");

    if (numexp!=='nuevo'){
      this.editarExp = true;
      this.escuelaService.buscarExpedienteId(numexp)
          .subscribe( (resp : ExpedienteModel) => {
            this.expediente = resp[0];
            this.expediente.NUM_EXPEDIENTE = parseInt(numexp);
            console.log(this.expediente);
            this.nombreTutor = this.expediente.NOMBRE_TUTOR + ' ' + 
                            this.expediente.APE1_TUTOR + ' ' + this.expediente.APE2_TUTOR;
            console.log(this.nombreTutor);
            this.dniTutor = this.expediente.NIF_TUTOR;
      
            this.expediente.FECHA_ALTA = this.fechaService.mostrarfecha(this.expediente.FECHA_ALTA);
                
            this.expediente.FECHA_NACIMIENTO = this.fechaService.mostrarfecha(this.expediente.FECHA_NACIMIENTO);
            
            this.expediente.FECHA_VARIACION = this.fechaService.mostrarfecha(this.expediente.FECHA_VARIACION);

            this.expediente.FECHA_GESTION = this.fechaService.mostrarfecha(this.expediente.FECHA_GESTION);

            if (this.expediente.MES_JULIO == "Y") {
              this.mesjulioactivo = true;
            }
          // CARGAR LAS MATRICULAS DEL EXPEDIENTE

          if (this.expediente.NUM_EXPEDIENTE>0) {
            this.escuelaService.buscarMatriculasExp(numexp)
                .subscribe( (resp ) =>{
                  this.matriculas = resp;
                  console.log("Matriculas el expediente");
                  console.log(this.matriculas);
                });
          }
   
          });
    } else { // ALTA NUEVO CARGO LOS DATOS DEL TUTOR
      
      const codtutor = this.route.snapshot.paramMap.get('codtutor');
     
      // var numberValue = Number(stringToConvert);
      if (Number.isInteger(Number(codtutor))) {
        this.expediente.COD_TUTOR = Number(codtutor);
        this.escuelaService.buscarTutorId(codtutor)
        .subscribe( (resp : TutorInterface) => {
          //this.datosTutor = resp;
          console.log(resp);
          this.nombreTutor = resp[0].NOMBRE + ' ' + resp[0].APE1 + ' ' + resp[0].APE2;
          this.dniTutor = resp[0].NIF;
          //console.log(this.datosTutor);
        });
      }   
    }

    this.cargaCombox();

  
  }

  cargaCombox(){

    combineLatest([
      this.escuelaService.getListaescuelas(),
      this.escuelaService.getVariaciones(),
      this.escuelaService.getParentesco()
      
    ]).subscribe( ([escuelas,tiposVariaciones,parentesco]) =>{
      this.escuelas = escuelas;  
      this.tiposVariaciones = tiposVariaciones,
      this.listaParentesco = parentesco
    });
  }


  guardar( forma : NgForm){

    let miExpediente =  new ExpedienteModel();

    console.log("Mes julio");
    console.log(this.mesjulioactivo);

    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }

    Swal.fire({
      allowOutsideClick : false,
      title : 'Espere',
      text: 'Guardando información..',
      icon : 'info'
    });
    Swal.showLoading();
 
    let peticion : Observable<any>;

    miExpediente  =this.expediente;

   if (this.expediente.NUM_EXPEDIENTE !==0) { 
     // MODIFICAR EL REGISTRO ACTUAL
     peticion = this.escuelaService.updateExpedienteId(this.expediente);
   } else {
        
      miExpediente.FECHA_NACIMIENTO = this.fechaService.almacenaFecha(this.expediente.FECHA_NACIMIENTO);
      miExpediente.FECHA_VARIACION = this.fechaService.almacenaFecha(this.expediente.FECHA_VARIACION);
      miExpediente.FECHA_ALTA = this.fechaService.almacenaFecha(this.expediente.FECHA_ALTA);
     
      if (this.mesjulioactivo) {
        miExpediente.MES_JULIO = "Y";
      } else {
        miExpediente.MES_JULIO = "N";
      }

     peticion = this.escuelaService.newExpediente(miExpediente);  
     //Al insertar el registro, ya lo puedo editar
     this.editarExp = true;
   }

   peticion.subscribe( resp =>{
     Swal.fire({
      title : 'Expediente Número ' + this.expediente.NUM_EXPEDIENTE,
      text : 'Se almaceno correctamente..',
      icon : 'success'
     });
   })
  
   this.expediente.FECHA_ALTA = this.fechaService.mostrarfecha(this.expediente.FECHA_ALTA);
                
   this.expediente.FECHA_NACIMIENTO = this.fechaService.mostrarfecha(this.expediente.FECHA_NACIMIENTO);
   
   this.expediente.FECHA_VARIACION = this.fechaService.mostrarfecha(this.expediente.FECHA_VARIACION);

   this.expediente.FECHA_GESTION = this.fechaService.mostrarfecha(this.expediente.FECHA_GESTION);

  
  }


}
