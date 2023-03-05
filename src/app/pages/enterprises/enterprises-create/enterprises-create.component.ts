import { Component, OnInit } from '@angular/core';
import { TokenadminService } from '../../../services/tokenadmin.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'enterprises-create',
  templateUrl: './enterprises-create.component.html',
  styleUrls: ['./enterprises-create.component.css']
})
export class EnterprisesCreateComponent implements OnInit {
  token:any;
  logged:any = false;
  loading:any = false;

  name:any;
  phone:any;
  address:any;

  message:any;
  alert:any = false;

  constructor(
    private _tokenAdminService: TokenadminService,
    private _enterpriseService: EnterpriseService,
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
    if(this.name != "" && this.phone != "" && this.address != ""  
    && this.name != undefined && this.phone != undefined && this.address != undefined 
    && this.name != null && this.phone != null && this.address != null){
      this.loading = true;
      this._enterpriseService.create(this.name, this.phone, this.address)
      .subscribe((resp: any) => {
        this.loading = false;
        this.router.navigate(["enterprises"]);
      });
    }else{
      this.message = "Existen campos vacios en el formulario";
      this.alert = true;
    }
  }
}
