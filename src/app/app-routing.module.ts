import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BuscaralumComponent } from './pages/alumnos/buscaralum/buscaralum.component';
import { BuscartutorComponent } from './pages/tutor/buscartutor/buscartutor.component';
import { ListaexpedienteComponent } from './pages/expediente/listaexpediente/listaexpediente.component';

const routes : Routes=[
  { path: 'home', component: HomeComponent },
  { path: 'buscaralumno' , component: BuscaralumComponent },
  { path: 'buscartutor' , component: BuscartutorComponent },
  { path: 'listaexpediente/:codtutor/:dni/:nomtutor', component: ListaexpedienteComponent},
  { path: '**', redirectTo : '/home'}

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
