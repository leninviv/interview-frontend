import { Component, OnInit } from '@angular/core';
import { TokenadminService } from '../../../services/tokenadmin.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  token:any;
  logged:any = false;
  loading:any = false;

  username:any;
  password:any;
  rol:any;

  message:any;
  alert:any = false;
  constructor(
    private _tokenAdminService: TokenadminService,
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this._tokenAdminService.cargarValoresLocalStorage();
    if(this.token != null){
      this.logged = true;
    }else{
      this.logged = false;
    }
  }

  
  create(){
    if(this.username != "" && this.password != "" && this.rol != ""  
    && this.username != undefined && this.password != undefined && this.rol != undefined 
    && this.username != null && this.password != null && this.rol != null){
      this.loading = true;
      this._userService.create(this.username, this.password, this.rol)
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
