import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenadminService {
  myToken: any;

  constructor(@Inject(DOCUMENT) private _document, private router: Router) {
    this.cargarValoresLocalStorage();
  }

  crearTokenUsuarioLocalStorage(token: any) {
    if (!localStorage.getItem('interview')) {
      localStorage.setItem('interview', token);
    }
  }

  cargarValoresLocalStorage() {
    this.myToken = localStorage.getItem('interview');
    return this.myToken;
  }

  limpiarTokenUser() {
    if (localStorage.getItem('interview')) {
      localStorage.removeItem('interview');
      this.myToken = {};
    }
  }
}
