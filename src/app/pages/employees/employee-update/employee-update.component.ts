import { Component, OnInit } from '@angular/core';
import { TokenadminService } from '../../../services/tokenadmin.service';
import { EmployeeService } from '../../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../../services/departments.service';
@Component({
  selector: 'employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  token:any;
  logged:any = false;
  loading:any = false;

  name:any;
  surname:any;
  age:any;
  email:any;
  position:any;
  status:any;
  id:any;

  message:any;
  alert:any = false;
  alert2:any = false;

  idDepartment:any;
  listadoDepartamentos:any = [];
  listadoEmployeexDepartamento:any = [];
  
  constructor(
    private _tokenAdminService: TokenadminService,
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');

    this.token = this._tokenAdminService.cargarValoresLocalStorage();
    if(this.token != null){
      this.logged = true;
      this.findOne(this.id);
      this.findAllDepartments();
    }else{
      this.logged = false;
    }
  }

  findOne(id){
    this._employeeService.findOne(id)
    .subscribe((resp: any) => {
      this.name = resp[0].name;
      this.surname = resp[0].surname;
      this.age = resp[0].age;
      this.email = resp[0].email;
      this.position = resp[0].position;
      this.status = resp[0].status;
    });   
  }

  findAllDepartments(){
    this._departmentService.findAll("", 5000, 0)
    .subscribe((resp: any) => {
      this.listadoDepartamentos = resp.lista;
      this.findAllEmployeexDepartment();
    });   
  }

  findAllEmployeexDepartment(){
    this.listadoEmployeexDepartamento = [];
    this._employeeService.findAllxDepartmentxEmpleado(this.id, 5000, 0)
    .subscribe((resp: any) => {
      let listaDexEmp = resp.lista;
      console.log(listaDexEmp);
      for (let i = 0; i < listaDexEmp.length; i++) {
        for (let j = 0; j < this.listadoDepartamentos.length; j++) {
          if(listaDexEmp[i].idDepartment == this.listadoDepartamentos[j].id){
            this.listadoEmployeexDepartamento.push({id:listaDexEmp[i].id, name: this.listadoDepartamentos[j].name })
          }        
        }        
      }
    });   
  }

  update(){
    if(this.name != "" && this.surname != "" && this.age != "" && this.email != "" && this.position != ""   
    && this.name != undefined && this.surname != undefined && this.age != undefined && this.email != undefined  && this.position != undefined 
    && this.name != null && this.surname != null && this.age != null && this.email != null  && this.position != null ){
      this.loading = true;
      this._employeeService.update(this.name, this.surname, this.age, this.email, this.position, this.status, this.id)
      .subscribe((resp: any) => {
        this.loading = false;
        this.router.navigate(["employees"]);
      });
    }else{
      this.message = "Existen campos vacios en el formulario";
      this.alert = true;
    }
  }

  addDepartment(){
    if(this.idDepartment != "" && this.idDepartment != null && this.idDepartment != undefined){
      this._employeeService.createDepartmentxEmployee(this.idDepartment, this.id)
      .subscribe((resp: any) => {
        this.findAllEmployeexDepartment();        
      });   
    }else{
      this.message = "Existen campos vacios en el formulario";
      this.alert2 = true;
    }
  }
  
  deleteDepartment(id){
    this._employeeService.deleteDepartmentxEmpleado(id)
      .subscribe((resp: any) => {
        this.findAllEmployeexDepartment();        
     });   
  }
}
