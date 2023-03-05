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

export class DepartmentService {
      url: string = dominio_ws;

    constructor(
        public http: HttpClient,
        private _tokenAdminService: TokenadminService,
        private router: Router,
    ) { }

    findAll(search: string, limit: number, page: number){
        let url_query = this.url + 'departments/read';
        const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': this._tokenAdminService.cargarValoresLocalStorage()
        }

        return this.http.get(url_query+"?search="+search+"&limit="+limit+"&page="+page, {headers: headerDict})
        .pipe(map((resp: any) => {
            return resp;
        }))
        .pipe(catchError(err => {
            this._tokenAdminService.limpiarTokenUser();
            this.router.navigate(["login"]);
            return err;
        }))
    }

    findOne(id: number){
        let url_query = this.url + 'departments/readone';
        const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': this._tokenAdminService.cargarValoresLocalStorage()
        }

        return this.http.get(url_query+"?id="+id, {headers: headerDict})
        .pipe(map((resp: any) => {
            return resp;
        }))
        .pipe(catchError(err => {
            this._tokenAdminService.limpiarTokenUser();
            this.router.navigate(["login"]);
            return err;
        }))
    }


    create(idEnterprise:number, name:string, description:string, phone:string){
        let url_query = this.url + 'departments/create';
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': this._tokenAdminService.cargarValoresLocalStorage()
        }

        return this.http.post(url_query, { idEnterprise: idEnterprise, name: name, description: description, phone:phone}, {headers: headerDict})
        .pipe((resp: any) => {
            return resp;
        })
        .pipe(catchError(err => {
            this._tokenAdminService.limpiarTokenUser();
            this.router.navigate(["login"]);
            return err;
        }))
    }

    update(idEnterprise:number, name:string, description:string, phone:string, status:boolean, id:number){
        let url_query = this.url + 'departments/update';
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': this._tokenAdminService.cargarValoresLocalStorage()
        }

        return this.http.put(url_query+"?id="+id, { idEnterprise: idEnterprise, name: name, description: description, phone:phone, status:status}, {headers: headerDict})
        .pipe((resp: any) => {
            return resp;
        })
        .pipe(catchError(err => {
            this._tokenAdminService.limpiarTokenUser();
            this.router.navigate(["login"]);
            return err;
        }))
        
    }

}
