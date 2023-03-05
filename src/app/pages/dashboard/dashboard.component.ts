import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { TokenadminService } from '../../services/tokenadmin.service';
import { Router } from '@angular/router';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  username:any;
  password:any;

  loading:any = false;
  
  message:any;
  alert:any = false;
  
  token:any;
  logged:any = false;
  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _tokenAdminService: TokenadminService,
  ) { }


    ngOnInit(){
      this.token = this._tokenAdminService.cargarValoresLocalStorage();
      if(this.token != null){
        this.logged = true;
      }else{
        this.logged = false;
      }
    }

    login(){
      this.alert = false;
      if(this.username != "" && this.password != "" 
        && this.username != undefined && this.password != undefined
        && this.username != null && this.password != null){
          this.loading = true;
          
          this._loginService.auth(this.username, this.password)
            .subscribe((resp: any) => {
              if(resp.status == "error"){
                this.message = resp.message;
                this.alert = true;
              }else if (resp.status == "ok"){
                this.logged = true;
              }
    
              this.loading = false;
            });
      }else{
        this.message = "Existen campos vacios en el formulario";
        this.alert = true;
      }
    }

    logout(){
      this._loginService.logout();
      this.logged = false;
    }
}
