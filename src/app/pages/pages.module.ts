import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components/components.module';
import { FormsModule }   from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { BuscaralumComponent } from './alumnos/buscaralum/buscaralum.component';
import { BuscartutorComponent } from './tutor/buscartutor/buscartutor.component';
import { ListaexpedienteComponent } from './expediente/listaexpediente/listaexpediente.component';
//import { TutoralumComponent } from './alumnos/tutoralum/tutoralum.component';
import { DetalleExpComponent } from './expediente/detalle-exp/detalle-exp.component';
import { AlumnosComponent } from './informes/alumnos/alumnos.component';



@NgModule({
  declarations: [
    HomeComponent,
    BuscartutorComponent,
    BuscaralumComponent,
    ListaexpedienteComponent,
    //TutoralumComponent,
    DetalleExpComponent,
    AlumnosComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
