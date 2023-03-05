import { Component, OnInit } from '@angular/core';
import { TokenadminService } from '../../../services/tokenadmin.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'enterprises-update',
  templateUrl: './enterprises-update.component.html',
  styleUrls: ['./enterprises-update.component.css']
})
export class EnterprisesUpdateComponent implements OnInit {
  token:any;
  logged:any = false;
  loading:any = false;

  name:any;
  phone:any;
  address:any;
  status:any;
  id:any;

  message:any;
  alert:any = false;

  constructor(
    private _tokenAdminService: TokenadminService,
    private _enterpriseService: EnterpriseService,
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
    this._enterpriseService.findOne(id)
    .subscribe((resp: any) => {
      this.name = resp[0].name;
      this.phone = resp[0].phone;
      this.address = resp[0].address;
      this.status = resp[0].status;
    });   
  }

  update(){
    if(this.name != "" && this.phone != "" && this.address != ""  
    && this.name != undefined && this.phone != undefined && this.address != undefined 
    && this.name != null && this.phone != null && this.address != null){
      this.loading = true;
      this._enterpriseService.update(this.name, this.phone, this.address, this.status, this.id)
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
