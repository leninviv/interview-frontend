import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { TokenadminService } from './tokenadmin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { dominio_ws } from '../config/configuraciones_globales';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = dominio_ws;

  constructor(
    public http: HttpClient,
    private _tokenAdminService: TokenadminService,
    private router: Router,
  ) { }


  auth(username: string, password: string): Observable<any> {
    let url_query = this.url + 'login/auth';

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    return this.http.get(url_query+"?username="+username+"&password="+password, {headers: headerDict})
      .pipe(map((resp: any) => {
        if (resp.status === 'error') {
          return resp;
        }

        let token = resp.token;
        this._tokenAdminService.limpiarTokenUser();
        this._tokenAdminService.crearTokenUsuarioLocalStorage(token);
        return resp;
      }))
      .pipe(catchError(err => {
        return err;
      }))
  }

  logout() {
    this._tokenAdminService.limpiarTokenUser();  
  }

}
