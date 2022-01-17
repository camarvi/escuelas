import { Component, OnInit } from '@angular/core';

import { ActivatedRoute , Router} from '@angular/router';
import { Location } from '@angular/common';

import { CuotaInterface } from '../../../interfaces/cuota-response';
import { ExpedienteModel } from '../../../models/expediente.model';

// IMPORTAR EL SERVICIO
import { EscuelasService } from '../../../services/escuelas.service';


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
  public expediente = new ExpedienteModel();


  public dni : string = "";
  public nombrealumno : string = "";


  constructor(private route : ActivatedRoute,private escuelaService : EscuelasService,
    private location : Location, 
    private router : Router) { }

  ngOnInit(): void {

    this.codmatricula =  this.route.snapshot.paramMap.get('codmatricula');
    this.codexpediente = this.route.snapshot.paramMap.get('expediente');
    this.anyo = this.route.snapshot.paramMap.get('anyo');
    
    console.log("Codigo Matricula :" + this.codmatricula);
    console.log("Codigo Expediente : " + this.codexpediente);
    console.log("Anyo Expediente : " + this.anyo);
    this.escuelaService.getCuotasMatricula(this.codmatricula)
      .subscribe( (resp : CuotaInterface[])=>{
        console.log(resp);
      });
      
     this.escuelaService.buscarExpedienteId(this.codexpediente)
        .subscribe((resp : ExpedienteModel)=>{
          this.expediente = resp[0];
          console.log(this.expediente);
        })

  }

}
