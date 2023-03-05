import { Component, OnInit } from '@angular/core';

import { TokenadminService } from '../../../services/tokenadmin.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  token:any;
  logged:any = false;
  loading:any = false;

  username:any;
  password:any="";
  rol:any;
  status:any;
  id:any;

  message:any;
  alert:any = false;

  constructor(
    private _tokenAdminService: TokenadminService,
    private _userService: UserService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');

    this.token = this._tokenAdminService.cargarValoresLocalStorage();
    if(this.token != null){
      this.logged = true;
      this.findOne(this.id);
    }else{
      this.logged = false;
    }
  }

  findOne(id){
    this._userService.findOne(id)
    .subscribe((resp: any) => {
      this.username = resp[0].username;
      this.rol = resp[0].rol;
      this.status = resp[0].status;
    });   
  }

  update(){
    if(this.username != "" && this.rol != ""  
    && this.username != undefined && this.rol != undefined 
    && this.username != null && this.rol != null){
      this.loading = true;
      this._userService.update(this.username, this.password, this.rol, this.status, this.id)
      .subscribe((resp: any) => {
        this.loading = false;
        if(resp.status == "error"){
          this.message = resp.message;
          this.alert = true;
        }else{
          this.router.navigate(["user"]);
        }
      });
    }else{
      this.message = "Existen campos vacios en el formulario";
      this.alert = true;
    }

  }

}
