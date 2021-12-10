import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { TutorInterface } from '../interfaces/tutor-response';
import { ExpedienteInterface } from '../interfaces/expediente-response';
import { MatriculasInterface } from '../interfaces/matricula-response';

// TABLAS AUXILIARES
import { EscuelasInterface, ParentescoInterface, CursosInterface, VariacionesInterface } from '../interfaces/auxiliares-response';


@Injectable({
  providedIn: 'root'
})
export class EscuelasService {

  // ESTOY TIRANDO DEL BACKEND DE MERCADILLOS, EL PUERTO 3500 CORRESPONDE CON 
  //BACKEND DE ESCUELAS_INFANTILES
  private baseUrl: string = 'http://localhost:3500';

  constructor(private http: HttpClient) { }

// ******************  RELLENAR COMBOX (TABLAS AUX) *******************************

//router.get('/variaciones' , getVariaciones);

//getSexo(): Observable<Sexo[]> {
//  return this.http.get<Sexo[]>(`${this.baseUrl}/sexo`);
//}


getListaescuelas() : Observable<EscuelasInterface[]> {
  return this.http.get<EscuelasInterface[]>(`${this.baseUrl}/listaescuelas`);
}

getParentesco() : Observable<ParentescoInterface[]>{
  return this.http.get<ParentescoInterface[]>(`${this.baseUrl}/parentesco`);
}

getCursos() : Observable<CursosInterface[]>{
  return this.http.get<CursosInterface[]>(`${this.baseUrl}/cursos`);
}

getVariaciones() : Observable<VariacionesInterface[]> {
  return this.http.get<VariacionesInterface[]>(`${this.baseUrl}/variaciones`);
} 

// ---------------   FIN RELLANAR COMBOX --------------------------------------------



 //**************** BUSCAR TUTOR  ***********************************************
 
 buscarTutorAp1(ap1: string): Observable<TutorInterface[]> {

  return this.http.get<TutorInterface[]>(`${this.baseUrl}/tutor_ap/${ap1}`);

}

buscarTutorAp1Ap2(ap1: string, ap2: string): Observable<TutorInterface[]> {
  return this.http.get<TutorInterface[]>(`${this.baseUrl}/tutor_ap/${ap1}/${ap2}`);
}

buscarTutorNif(nif: string): Observable<TutorInterface[]> {
  return this.http.get<TutorInterface[]>(`${this.baseUrl}/tutor/${nif}`);
}

// *************** FIN BUSCAR TUTOR *******************************************

// ------------------  OPERACIONES CON EXPEDIENTES  ---------------------
// BUSQUEDAS
buscarExpedientesTutor(codtutor : string) : Observable<ExpedienteInterface[]> {
  return this.http.get<ExpedienteInterface[]>(`${this.baseUrl}/expediente_tutor/${codtutor}`);
}

//buscarExpedientesNif(nif : string) : Observable<ExpedienteInterface[]>{
//  return this.http.get<ExpedienteInterface[]>(`${this.baseUrl}/expediente_nif/${nif}`);
//}

// ********************     FIN OPERACIONES EXPEDIENTES

// ---------------------- OPERACIONES CON MATRICULAS ------------------------------

buscarMatriculasExp(cod_exp : string) : Observable<MatriculasInterface[]> {
  return this.http.get<MatriculasInterface[]>(`${this.baseUrl}/matriculas/${cod_exp}`);
}

}
