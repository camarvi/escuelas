import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { NoresultadosComponent } from './noresultados/noresultados.component';
import { TutorGridComponent } from './tutor-grid/tutor-grid.component';
import { CargandoComponent } from './cargando/cargando.component';
import { MatriculasGridComponent } from './matriculas-grid/matriculas-grid.component';
import { ExpedientesGridComponent } from './expedientes-grid/expedientes-grid.component';
import { InformealumGridComponent } from './informealum-grid/informealum-grid.component';
import { RecibosGridComponent } from './recibos-grid/recibos-grid.component';
import { CuotasGridComponent } from './cuotas-grid/cuotas-grid.component';


@NgModule({
  declarations: [
    NavbarComponent,
    NoresultadosComponent,
    TutorGridComponent,
    CargandoComponent,
    MatriculasGridComponent,
    ExpedientesGridComponent,
    InformealumGridComponent,
    RecibosGridComponent,
    CuotasGridComponent
  ],
  exports : [
    NavbarComponent,
    NoresultadosComponent,
    TutorGridComponent,
    CargandoComponent,
    MatriculasGridComponent,
    ExpedientesGridComponent,
    InformealumGridComponent,
    RecibosGridComponent,
    CuotasGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
