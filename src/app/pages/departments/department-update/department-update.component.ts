import { Component, OnInit } from '@angular/core';
import { TokenadminService } from '../../../services/tokenadmin.service';
import { DepartmentService } from '../../../services/departments.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'department-update',
  templateUrl: './department-update.component.html',
  styleUrls: ['./department-update.component.css']
})
export class DepartmentUpdateComponent implements OnInit {
  token:any;
  logged:any = false;
  loading:any = false;

  idEnterprise:any = false;
  name:any;
  description:any;
  phone:any;
  status:any;
  id:any;

  message:any;
  alert:any = false;

  listadoEnterprises:any = [];

  constructor(
    private _tokenAdminService: TokenadminService,
    private _departmentService: DepartmentService,
    private _enterpriseService:EnterpriseService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');

    this.token = this._tokenAdminService.cargarValoresLocalStorage();
    if(this.token != null){
      this.logged = true;
      this.getEnterprises();
      this.findOne(this.id);
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

  findOne(id){
    this._departmentService.findOne(id)
    .subscribe((resp: any) => {
      this.idEnterprise = resp[0].idEnterprise;
      this.name = resp[0].name;
      this.phone = resp[0].phone;
      this.description = resp[0].description;
      this.status = resp[0].status;
    });   
  }

  update(){
    if(this.idEnterprise != "" && this.name != "" && this.phone != "" && this.description != ""  
    && this.idEnterprise != undefined && this.name != undefined && this.phone != undefined && this.description != undefined 
    && this.idEnterprise != null && this.name != null && this.phone != null && this.description != null){
      this.loading = true;
      this._departmentService.update(this.idEnterprise, this.name, this.description, this.phone, this.status, this.id)
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
