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

export class EmployeeService {
      url: string = dominio_ws;

    constructor(
        public http: HttpClient,
        private _tokenAdminService: TokenadminService,
        private router: Router,
    ) { }

    findAll(search: string, limit: number, page: number){
        let url_query = this.url + 'employees/read';
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

    findAllxDepartmentxEmpleado(employee: number, limit: number, page: number){
        let url_query = this.url + 'employees/readdepartament';
        const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': this._tokenAdminService.cargarValoresLocalStorage()
        }

        return this.http.get(url_query+"?employee="+employee+"&limit="+limit+"&page="+page, {headers: headerDict})
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
        let url_query = this.url + 'employees/readone';
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


    create(name:string, surname:string, age:number, email:string, position:string){
        let url_query = this.url + 'employees/create';
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': this._tokenAdminService.cargarValoresLocalStorage()
        }

        return this.http.post(url_query, { name: name, surname: surname, age: age, email:email, position:position}, {headers: headerDict})
        .pipe((resp: any) => {
            return resp;
        })
        .pipe(catchError(err => {
            this._tokenAdminService.limpiarTokenUser();
            this.router.navigate(["login"]);
            return err;
        }))
    }

    createDepartmentxEmployee(idDepartment:number, idEmployee:number){
        let url_query = this.url + 'employees/createdepartment';
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': this._tokenAdminService.cargarValoresLocalStorage()
        }

        return this.http.post(url_query, { idDepartment: idDepartment, idEmployee: idEmployee}, {headers: headerDict})
        .pipe((resp: any) => {
            return resp;
        })
        .pipe(catchError(err => {
            this._tokenAdminService.limpiarTokenUser();
            this.router.navigate(["login"]);
            return err;
        }))
    }

    update(name:string, surname:string, age:number, email:string, position:string, status:boolean, id:number){
        let url_query = this.url + 'employees/update';
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': this._tokenAdminService.cargarValoresLocalStorage()
        }

        return this.http.put(url_query+"?id="+id, { name: name, surname: surname, age: age, email:email, position:position, status:status}, {headers: headerDict})
        .pipe((resp: any) => {
            return resp;
        })
        .pipe(catchError(err => {
            this._tokenAdminService.limpiarTokenUser();
            this.router.navigate(["login"]);
            return err;
        }))
        
    }

    deleteDepartmentxEmpleado(id:number){
        let url_query = this.url + 'employees/deletedepartment';
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': this._tokenAdminService.cargarValoresLocalStorage()
        }

        return this.http.delete(url_query+"?id="+id, {})
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
