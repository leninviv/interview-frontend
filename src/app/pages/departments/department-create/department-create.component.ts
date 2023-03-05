import { Component, OnInit } from '@angular/core';
import { TokenadminService } from '../../../services/tokenadmin.service';
import { DepartmentService } from '../../../services/departments.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {
  token:any;
  logged:any = false;
  loading:any = false;

  idEnterprise:any = false;
  name:any;
  description:any;
  phone:any;

  message:any;
  alert:any = false;

  listadoEnterprises:any = [];

  constructor(
    private _tokenAdminService: TokenadminService,
    private _departmentService: DepartmentService,
    private _enterpriseService:EnterpriseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this._tokenAdminService.cargarValoresLocalStorage();
    if(this.token != null){
      this.logged = true;
      this.getEnterprises();
    }else{
      this.logged = false;
    }
  }

  getEnterprises(){
    this._enterpriseService.findAll("", 5000, 0)
    .subscribe((resp: any) => {
      this.listadoEnterprises = resp.lista;
    });
  }

  create(){
    if(this.idEnterprise != "" && this.name != "" && this.phone != "" && this.description != ""  
    && this.idEnterprise != undefined && this.name != undefined && this.phone != undefined && this.description != undefined 
    && this.idEnterprise != null && this.name != null && this.phone != null && this.description != null){
      this.loading = true;
      this._departmentService.create(this.idEnterprise, this.name, this.description, this.phone)
      .subscribe((resp: any) => {
        this.loading = false;
        this.router.navigate(["departments"]);
      });
    }else{
      this.message = "Existen campos vacios en el formulario";
      this.alert = true;
    }
  }
}
