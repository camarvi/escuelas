import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { TutorInterface } from '../interfaces/tutor-response';


@Injectable({
  providedIn: 'root'
})
export class EscuelasService {

  // ESTOY TIRANDO DEL BACKEND DE MERCADILLOS, EL PUERTO 3500 CORRESPONDE CON 
  //BACKEND DE ESCUELAS_INFANTILES
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

 // BUSCAR TUTOR
 
 buscarUsuarioAp1(ap1: string): Observable<TutorInterface[]> {

  return this.http.get<TutorInterface[]>(`${this.baseUrl}/persona_ap/${ap1}`);

}

buscarUsuarioAp1Ap2(ap1: string, ap2: string): Observable<TutorInterface[]> {
  return this.http.get<TutorInterface[]>(`${this.baseUrl}/persona_ap/${ap1}/${ap2}`);
}

buscarUsuarioNombre(nombre: string, ap1: string): Observable<TutorInterface[]> {
  return this.http.get<TutorInterface[]>(`${this.baseUrl}/persona_nombre/${nombre}/${ap1}`);
}

buscarUsuarioNif(nif: string): Observable<TutorInterface[]> {
  return this.http.get<TutorInterface[]>(`${this.baseUrl}/persona/${nif}`);
}

}
