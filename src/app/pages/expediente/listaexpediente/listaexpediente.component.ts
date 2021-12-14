import { Component, OnInit } from '@angular/core';


import { ActivatedRoute , Router} from '@angular/router';
import { Location } from '@angular/common';
import { ExpedienteInterface } from '../../../interfaces/expediente-response'; 
// IMPORTAR EL SERVICIO
import { EscuelasService } from '../../../services/escuelas.service';





@Component({
  selector: 'app-listaexpediente',
  templateUrl: './listaexpediente.component.html',
  styleUrls: ['./listaexpediente.component.css']
})
export class ListaexpedienteComponent implements OnInit {

  //public parcelas : ParcelaInterface[] = [];
  public expedientes : ExpedienteInterface[] = [];
  public cargando : boolean = false;
  public codtutor : string = "";
  public dni : string = "";
  public nomtutor : string = "";



  constructor(private route : ActivatedRoute,private escuelaService : EscuelasService,
              private location : Location, 
              private router : Router) { }

  ngOnInit(): void {
    
    //codtutor/:dni/:nomtutor


    this.codtutor =  this.route.snapshot.paramMap.get('codtutor');
    this.dni = this.route.snapshot.paramMap.get('dni');
    this.nomtutor = this.route.snapshot.paramMap.get('nomtutor');
    
    this.cargando = true;
    
    this.escuelaService.buscarExpedientesTutor(this.codtutor)
        .subscribe( (resp)=>{
          this.expedientes = resp;
          console.log("Respuesta del servicio Busca Exp Tutor");
          console.log(resp);
          this.cargando = false;
        });
      }


    onRegresar(){

        this.location.back();
    
    }


    verTipo(posicion : number){
      this.router.navigate(['/tutoralum', posicion, "FRANCISCO"]);
    }

    verTipo2(posicion : number) {
    // this.router.navigate(['/tutoralum', posicion, "FRANCISCO"], {skipLocationChange: true, replaceUrl: false});
    //  this.router.navigate(['/tutoralum', posicion, "FRANCISCO"], {skipLocationChange: true, replaceUrl: true});

      this.router.navigate(['/tutoralum', posicion, "FRANCISCO"], {skipLocationChange: true});
  

    }

    nuevoExp() {
         
        this.router.navigate(['/detalle_exp', 'nuevo'],{skipLocationChange: true, replaceUrl: false});
    
      }

  }


