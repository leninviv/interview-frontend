import { Component, OnInit } from '@angular/core';
import { TokenadminService } from '../../../services/tokenadmin.service';
import { EmployeeService } from '../../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  token:any;
  logged:any = false;
  loading:any = false;

  name:any;
  surname:any;
  age:any;
  email:any;
  position:any;

  message:any;
  alert:any = false;

  constructor(
    private _tokenAdminService: TokenadminService,
    private _employeeService: EmployeeService,
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
    if(this.name != "" && this.surname != "" && this.age != "" && this.email != "" && this.position != ""   
    && this.name != undefined && this.surname != undefined && this.age != undefined && this.email != undefined  && this.position != undefined 
    && this.name != null && this.surname != null && this.age != null && this.email != null  && this.position != null ){
      this.loading = true;
      this._employeeService.create(this.name, this.surname, this.age, this.email, this.position)
      .subscribe((resp: any) => {
        this.loading = false;
        this.router.navigate(["employees"]);
      });
    }else{
      this.message = "Existen campos vacios en el formulario";
      this.alert = true;
    }
  }
}
