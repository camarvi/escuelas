import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest , Observable } from 'rxjs';

import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { EscuelasService } from '../../../services/escuelas.service';
import { FechasService } from '../../../services/fechas.service';

import { ExpedienteModel } from '../../../models/expediente.model';
import { EscuelasInterface, ParentescoInterface, VariacionesInterface } from '../../../interfaces/auxiliares-response';

@Component({
  selector: 'app-detalle-exp',
  templateUrl: './detalle-exp.component.html',
  styleUrls: ['./detalle-exp.component.css']
})
export class DetalleExpComponent implements OnInit {

  public expediente =  new ExpedienteModel();
  public nombreTutor : string;
  public dniTutor : string;
  
  escuelas : EscuelasInterface[] = [];
  listaParentesco : ParentescoInterface[] = [];
  tiposVariaciones : VariacionesInterface[] = [];
  

  constructor(private escuelaService : EscuelasService, 
              private fechaService : FechasService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const numexp =  this.route.snapshot.paramMap.get('numexp');
    //console.log("NUM EXP RECIBIDO");
    //console.log(this.numexp);
   //
    if (numexp!=='nuevo'){
      this.escuelaService.buscarExpedienteId(numexp)
          .subscribe( (resp : ExpedienteModel) => {
            this.expediente = resp[0];
            this.expediente.NUM_EXPEDIENTE = parseInt(numexp);
            console.log(this.expediente);
            this.nombreTutor = this.expediente.NOMBRE_TUTOR + ' ' + 
                            this.expediente.APE1_TUTOR + ' ' + this.expediente.APE2_TUTOR;
            console.log(this.nombreTutor);
            this.dniTutor = this.expediente.NIF_TUTOR;
            
            //console.log(this.expediente.FECHA_ALTA.toString());
            //console.log(this.fechaService.mostrarfecha(this.expediente.FECHA_ALTA));

            this.expediente.FECHA_ALTA = this.fechaService.mostrarfecha(this.expediente.FECHA_ALTA);
            //console.log(this.expediente.FECHA_ALTA);

            this.expediente.FECHA_NACIMIENTO = this.fechaService.mostrarfecha(this.expediente.FECHA_NACIMIENTO);
            //console.log(this.expediente.FECHA_ALTA);

            //this.nuevaTarifa.F_INICIO = tarifaRecibida.F_INICIO.toString();
            //this.nuevaTarifa.F_INICIO = this.fechasService.mostrarfecha(this.nuevaTarifa.F_INICIO);

          });
    }

    this.cargaCombox();

  
  }

  cargaCombox(){

    combineLatest([
      this.escuelaService.getListaescuelas(),
      this.escuelaService.getParentesco()
    ]).subscribe( ([escuelas,parentesco]) =>{
      this.escuelas = escuelas;  
      this.listaParentesco = parentesco
    });
  }


  guardar( forma : NgForm){

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
  
    // if (this.usuario.IDPERSONA !==0 ){
    //   peticion = this.mercadillosService.updateUsuario(this.usuario);
    // } else { //NUEVO REGISTRO  
    //   peticion = this.mercadillosService.crearUsuario(this.usuario);   
    // }

    //   peticion.subscribe( resp => {       
    //     Swal.fire({
    //       title : this.usuario.NOMBRE,
    //       text : 'Se actualizo correctamente..',
    //       icon : 'success'
    //     });

    //     });
  
  }

}
