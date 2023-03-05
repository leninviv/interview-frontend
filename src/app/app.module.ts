import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EnterprisesComponent } from './pages/enterprises/enterprises.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { EnterprisesCreateComponent } from './pages/enterprises/enterprises-create/enterprises-create.component';
import { EnterprisesUpdateComponent } from './pages/enterprises/enterprises-update/enterprises-update.component';
import { UserCreateComponent } from './pages/user/user-create/user-create.component';
import { UserUpdateComponent } from './pages/user/user-update/user-update.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { DepartmentCreateComponent } from './pages/departments/department-create/department-create.component';
import { DepartmentUpdateComponent } from './pages/departments/department-update/department-update.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeCreateComponent } from './pages/employees/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './pages/employees/employee-update/employee-update.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    EnterprisesComponent,
    EnterprisesCreateComponent,
    EnterprisesUpdateComponent,
    UserCreateComponent,
    UserUpdateComponent,
    DepartmentsComponent,
    DepartmentCreateComponent,
    DepartmentUpdateComponent,
    EmployeesComponent,
    EmployeeCreateComponent,
    EmployeeUpdateComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
