import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { EscuelasService } from '../../../services/escuelas.service';
import { FechasService } from '../../../services/fechas.service';

import { ExpedienteModel } from '../../../models/expediente.model';

import { EscuelasInterface,ParentescoInterface,VariacionesInterface,CursosInterface
    } from '../../../interfaces/auxiliares-response';
import { MatriculasInterface } from '../../../interfaces/matricula-response';
import { MatriculaModel } from '../../../models/matricula.model';

import { TutorInterface } from '../../../interfaces/tutor-response';




@Component({
  selector: 'app-detalle-exp',
  templateUrl: './detalle-exp.component.html',
  styleUrls: ['./detalle-exp.component.css'],
})
export class DetalleExpComponent implements OnInit {
  public expediente = new ExpedienteModel();
  public nombreTutor: string;
  public dniTutor: string;

  public editarExp: boolean = false;
  public numexp: string;
 
  matriculas: MatriculasInterface[] = [];
  escuelas: EscuelasInterface[] = [];
  listaParentesco: ParentescoInterface[] = [];
  tiposVariaciones: VariacionesInterface[] = [];
  listaCursos : CursosInterface[] = [];

  mesjulioactivo: boolean = false;

  nuevaMatricula : MatriculaModel = new MatriculaModel();

  

  constructor(
    private escuelaService: EscuelasService,
    private fechaService: FechasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.numexp = this.route.snapshot.paramMap.get('numexp');

    console.log('DATOS DEL EXPEDIENTE MODEL');
    console.log(this.expediente);
    console.log('FIN DATOS DEL EXPEDIENTE MODEL');

    if (this.numexp !== 'nuevo') {
      this.editarExp = true;
      this.escuelaService
        .buscarExpedienteId(this.numexp)
        .subscribe((resp: ExpedienteModel) => {
          this.expediente = resp[0];
          this.expediente.NUM_EXPEDIENTE = parseInt(this.numexp);
          console.log(this.expediente);
          this.nombreTutor =
            this.expediente.NOMBRE_TUTOR +
            ' ' +
            this.expediente.APE1_TUTOR +
            ' ' +
            this.expediente.APE2_TUTOR;
          console.log(this.nombreTutor);
          this.dniTutor = this.expediente.NIF_TUTOR;

          this.expediente.FECHA_ALTA = this.fechaService.mostrarfecha(
            this.expediente.FECHA_ALTA
          );

          this.expediente.FECHA_NACIMIENTO = this.fechaService.mostrarfecha(
            this.expediente.FECHA_NACIMIENTO
          );

          this.expediente.FECHA_VARIACION = this.fechaService.mostrarfecha(
            this.expediente.FECHA_VARIACION
          );

          this.expediente.FECHA_GESTION = this.fechaService.mostrarfecha(
            this.expediente.FECHA_GESTION
          );

          if (this.expediente.MES_JULIO == 'Y') {
            this.mesjulioactivo = true;
          }
          // CARGAR LAS MATRICULAS DEL EXPEDIENTE

          if (this.expediente.NUM_EXPEDIENTE > 0) {
            this.escuelaService
              .buscarMatriculasExp(this.numexp)
              .subscribe((resp) => {
                this.matriculas = resp;
                console.log('Matriculas el expediente');
                console.log(this.matriculas);
              });
          }
        });
    } else {
      // ALTA NUEVO CARGO LOS DATOS DEL TUTOR

      const codtutor = this.route.snapshot.paramMap.get('codtutor');

      if (Number.isInteger(Number(codtutor))) {
        this.expediente.COD_TUTOR = Number(codtutor);
        this.escuelaService
          .buscarTutorId(codtutor)
          .subscribe((resp: TutorInterface) => {
            //this.datosTutor = resp;
            console.log(resp);
            this.nombreTutor =
              resp[0].NOMBRE + ' ' + resp[0].APE1 + ' ' + resp[0].APE2;
            this.dniTutor = resp[0].NIF;
            //console.log(this.datosTutor);
          });
      }
    }

    this.cargaCombox();
  }

  cargaCombox() {
    combineLatest([
      this.escuelaService.getListaescuelas(),
      this.escuelaService.getVariaciones(),
      this.escuelaService.getParentesco(),
      this.escuelaService.getCursos()
    ]).subscribe(([escuelas, tiposVariaciones, parentesco, cursos]) => {
      this.escuelas = escuelas;
      this.tiposVariaciones = tiposVariaciones,
      this.listaParentesco = parentesco,
      this.listaCursos = cursos
    });
  }

  guardar(forma: NgForm) {
    let miExpediente = new ExpedienteModel();

    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere',
      text: 'Guardando información..',
      icon: 'info',
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    miExpediente = this.expediente;

    if (this.mesjulioactivo) {
      miExpediente.MES_JULIO = 'Y';
    } else {
      miExpediente.MES_JULIO = 'N';
    }

    miExpediente.FECHA_NACIMIENTO = this.fechaService.almacenaFecha(
      this.expediente.FECHA_NACIMIENTO
    );
    miExpediente.FECHA_VARIACION = this.fechaService.almacenaFecha(
      this.expediente.FECHA_VARIACION
    );
    miExpediente.FECHA_ALTA = this.fechaService.almacenaFecha(
      this.expediente.FECHA_ALTA
    );

    if (this.expediente.NUM_EXPEDIENTE !== 0) {
      // MODIFICAR EL REGISTRO ACTUAL
      console.log('MODIFICAR LOS SIGUIENTES DATOS');
      console.log(this.expediente);
      // peticion = this.escuelaService.updateExpedienteId(this.expediente);
      miExpediente.FECHA_GESTION = this.fechaService.almacenaFecha(
        this.expediente.FECHA_GESTION
      );
      peticion = this.escuelaService.updateExpedienteId(miExpediente);
    } else {
      // NUEVO REGISTRO

      peticion = this.escuelaService.newExpediente(miExpediente);
      //Al insertar el registro, ya lo puedo editar
      this.editarExp = true;
      //this.numexp = this.expediente.NUM_EXPEDIENTE.toString();
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: 'Expediente Número ' + this.expediente.NUM_EXPEDIENTE,
        text: 'Se almaceno correctamente..',
        icon: 'success',
      });
      this.expediente.FECHA_ALTA = this.fechaService.mostrarfecha(
        this.expediente.FECHA_ALTA
      );
      this.expediente.FECHA_NACIMIENTO = this.fechaService.mostrarfecha(
        this.expediente.FECHA_NACIMIENTO
      );
      this.expediente.FECHA_VARIACION = this.fechaService.mostrarfecha(
        this.expediente.FECHA_VARIACION
      );
      this.expediente.FECHA_GESTION = this.fechaService.mostrarfecha(
        this.expediente.FECHA_GESTION
      );
    });
  }



  guardarMatricula(forma : NgForm) {


    console.log("Dentro de guardar matricula")
    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }

    let peticion : Observable<any>;

    if (this.nuevaMatricula.COD_MATRICULA!==0 ){
      console.log("Modificando Matricula");
      peticion = this.escuelaService.updateMatriculaId(this.nuevaMatricula);
    //  peticion = this.escuelaService (modificaMatricula)  
      
    } else { //NUEVO REGISTRO
      console.log("Alta nueva Matricula");
      this.nuevaMatricula.NUM_EXPEDIENTE = this.expediente.NUM_EXPEDIENTE; // Number(this.numexp);
      peticion = this.escuelaService.newMatricula(this.nuevaMatricula);
    //  peticion = this.escuelaService.newMatricula(this.nuevaMatricula);  
   
    }

  peticion.subscribe( resp => {
    
    Swal.fire({
      title : "Matricula",
      text : 'Se almaceno correctamente..',
      icon : 'success'
    });
    this.nuevaMatricula = new MatriculaModel();
    // this.ngOnInit();
   
    });

    this.ngOnInit();  

   



  }

  reiniciar() {
    this.nuevaMatricula = new MatriculaModel();
    this.nuevaMatricula.ANYO_ACADEMICO = 0;
    this.nuevaMatricula.CUOTA_MES = 0;
    this.nuevaMatricula.NUM_EXPEDIENTE = 0;
    console.log(this.nuevaMatricula);
  }

  eliminarExpediente(numexp: string) {
    
    Swal.fire({
      title:'¿Estas seguro?',
      text:`Estás seguro de borrar el expediente`,
      icon : "question",
      showConfirmButton : true,
      showCancelButton : true
    }).then( resp =>{
    
        if (resp.value){
          //Eliminar el registro
          this.escuelaService.deleteExpediente(numexp).subscribe();
          // VOLVER AL LISTADO DE EXPEDIENTES DEL TUTOR
          this.router.navigate(['/listaexpediente',
            this.expediente.COD_TUTOR,
            this.expediente.NIF_TUTOR,
            this.expediente.NOMBRE_TUTOR + ' ' + this.expediente.APE1_TUTOR + ' ' + this.expediente.APE2_TUTOR],
            { skipLocationChange: true, replaceUrl: false });  
        }
    
    });

    
  }

 
  eliminarMatricula(id: string){
    console.log("Elimnar matricula");
    console.log(id);
    this.escuelaService.deleteMatriculaId(id)
      .subscribe( resp => {
          Swal.fire({
             title : "Eliminar",
             text : 'Registro eliminado correctamente..',
             icon : 'success'
          });
        });
  }


 // RECIBE LOS DATOS DEL EVENTO (propagar)="procesaPropagar($event)"
  procesaPropagar(codigo : string) {
   this.eliminarMatricula(codigo);
  }

  procesaPropagarEditar(matriculaRecibida : MatriculasInterface) {
    
    console.log("Datos Matricula Recibida");
    console.log(matriculaRecibida);

    this.nuevaMatricula.COD_MATRICULA = matriculaRecibida.COD_MATRICULA;
    this.nuevaMatricula.ANYO_ACADEMICO = matriculaRecibida.ANYO_ACADEMICO;
    this.nuevaMatricula.CUOTA_MES = matriculaRecibida.CUOTA_MES;
    this.nuevaMatricula.COD_CURSO = matriculaRecibida.COD_CURSO;
   
  }


}
