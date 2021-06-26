import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Auth} from "../interfaces/auth.interface";
import {map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth{
    return {...this._auth!};
  }

  constructor(private _http: HttpClient) { }

  verifyAuth(): Observable<boolean> | boolean{

    if(!localStorage.getItem('id')){
      return of(false); //resolve observable
    }

    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
      .pipe(
        map( auth => {
          console.log('map', auth);
          return true;
        })
      );
  }

  login(){
    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('id', auth.id))
      );
  }
}
