import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components/components.module';

import { HomeComponent } from './home/home.component';
import { BuscaralumComponent } from './alumnos/buscaralum/buscaralum.component';
import { BuscartutorComponent } from './tutor/buscartutor/buscartutor.component';


@NgModule({
  declarations: [
    HomeComponent,
    BuscartutorComponent,
    BuscaralumComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class PagesModule { }
