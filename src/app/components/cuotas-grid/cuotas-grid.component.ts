import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {  CuotaInterface } from '../../interfaces/cuota-response';

@Component({
  selector: 'app-cuotas-grid',
  templateUrl: './cuotas-grid.component.html',
  styleUrls: ['./cuotas-grid.component.css']
})
export class CuotasGridComponent implements OnInit {

  @Input() cuotas! : CuotaInterface[];
  @Output()
  propagar = new EventEmitter<string>();

  @Output()
  propagaEditar = new EventEmitter<CuotaInterface>();

  constructor(private router : Router) { }

  ngOnInit(): void {
    
    console.log("Dentro componente cuotas");
    console.log(this.cuotas);

  }


  eliminar(id, indice : number){
    
    Swal.fire({
      title:'¿Está seguro ?',
      text :`Está seguro que desea borrar el registro`,
      icon : 'question',
      showConfirmButton : true,
      showCancelButton : true
    }).then( resp => {
  
       if (resp.value) {
        this.cuotas.splice(indice,1);
        this.propagar.emit(id);
        
       } 
  
    });
     
    }


  editar(cuota : CuotaInterface) {
      this.propagaEditar.emit(cuota);
    }


}
