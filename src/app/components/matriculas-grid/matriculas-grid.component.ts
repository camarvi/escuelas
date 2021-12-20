import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';

import { MatriculasInterface } from '../../interfaces/matricula-response';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-matriculas-grid',
  templateUrl: './matriculas-grid.component.html',
  styleUrls: ['./matriculas-grid.component.css']
})
export class MatriculasGridComponent implements OnInit {

  @Input() matriculas! : MatriculasInterface[];
  @Output()
  propagar = new EventEmitter<string>();

  @Output()
  propagaEditar = new EventEmitter<MatriculasInterface>();

  constructor() { }

  ngOnInit(): void {
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
        this.matriculas.splice(indice,1);
        this.propagar.emit(id);
        
       } 
  
    });
     
    }


  editar(matricula : MatriculasInterface) {
      this.propagaEditar.emit(matricula);
    }

}
