import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { NoresultadosComponent } from './noresultados/noresultados.component';
import { TutorGridComponent } from './tutor-grid/tutor-grid.component';
import { CargandoComponent } from './cargando/cargando.component';


@NgModule({
  declarations: [
    NavbarComponent,
    NoresultadosComponent,
    TutorGridComponent,
    CargandoComponent
  ],
  exports : [
    NavbarComponent,
    NoresultadosComponent,
    TutorGridComponent,
    CargandoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
