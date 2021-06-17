import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../models/user.ui';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, pipe, identity } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TableUI } from '../models/table.ui';


@Injectable()
export class UserServiceService {
  private url: string = 'https://60bf627697295a0017c4297e.mockapi.io/Usuarios';

  /* Para refrescar la tabla */
  /* Subject son Observables que además pueden manejar múltiples suscripciones a un único flujo */
  public refreshtabla = new Subject<void>();
  get: any;
  /* Para refrescar la tabla */



  constructor(private http: HttpClient) { }

  /* Funcion para refrescar tabla */
  getActualizaTabla() {
    return this.refreshtabla;
  }

  getUserGrid(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  /* Antes de que el componente reciba la data se va ejecutar
    al momento de guardar: this.refreshtabla.next();
    tap*/
  postUserGrid(user: User): Observable<any> {
    return this.http.post<any>(this.url, user).pipe(
      tap(() => {
        this.refreshtabla.next();
      })
    );
  }

  /*Eliminar y se muestra en mi observable */
  deleteUserGrid(id: number): Observable<any> {
    /* const url = this.url + id;
    return this.http.delete(url); */
    return this.http.delete(this.url + '/' + id).pipe(
      tap(() => {
        this.refreshtabla.next();
      })
    );
  }

  updateUserGrid(user: User): Observable<any> {
    return this.http.put(this.url + '/' + user.id,user).pipe(
      tap(() => {
        this.refreshtabla.next();
      })
    );;
  }

  /*
 updateUserGrid(user: User): Observable<any> {
    return this.http.put<any>(this.url+user.id,user);
  }   
   updateUserGrid(id: number): Observable<any> {
    const url= this.url +'/'+ id;
    return this.http.put(url,id);
  }
  updateUserGrid(id: number): Observable<any> {
    const url = this.url + user.id;
    return this.http.put<any>(url, user);
  }
  updateUserGrid(user: User): Observable<any> {
    return this.http.put(${this.moviesURL}/${movie.id},)
  }
  */
}
