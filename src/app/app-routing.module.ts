import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BuscaralumComponent } from './pages/alumnos/buscaralum/buscaralum.component';
import { BuscartutorComponent } from './pages/tutor/buscartutor/buscartutor.component';
import { ListaexpedienteComponent } from './pages/expediente/listaexpediente/listaexpediente.component';
import { TutoralumComponent } from './pages/alumnos/tutoralum/tutoralum.component';
import { DetalleExpComponent } from './pages/expediente/detalle-exp/detalle-exp.component';
// LISTADOS
import { AlumnosComponent } from './pages/informes/alumnos/alumnos.component';
import { RecibosComponent } from './pages/informes/recibos/recibos.component';

//CUOTAS
import { ListacuotasComponent } from './pages/cuotas/listacuotas/listacuotas.component';

const routes : Routes=[
  { path: 'home', component: HomeComponent },
  { path: 'tutoralum/:id/:nombre', component: TutoralumComponent },
  { path: 'buscaralumno' , component: BuscaralumComponent },
  { path: 'buscartutor' , component: BuscartutorComponent },
  { path: 'listaexpediente/:codtutor/:dni/:nomtutor', component: ListaexpedienteComponent },
  { path: 'detalle_exp/:numexp', component : DetalleExpComponent },
  { path: 'detalle_exp/:numexp/:codtutor' , component : DetalleExpComponent },
  { path: 'listadoalumnos' , component: AlumnosComponent },
  { path: 'recibos' , component : RecibosComponent},
  { path: 'listadocuotas/:anyo/:codmatricula/:expediente/:cuota' , component : ListacuotasComponent}, 
  { path: '**', redirectTo : '/home' }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes )
  ],
  exports : [
    RouterModule
  ]

})
export class AppRoutingModule { }
