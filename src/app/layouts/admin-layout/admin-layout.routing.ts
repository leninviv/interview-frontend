import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { EnterprisesComponent } from '../../pages/enterprises/enterprises.component';
import { EnterprisesCreateComponent } from '../../pages/enterprises/enterprises-create/enterprises-create.component';
import { EnterprisesUpdateComponent } from '../../pages/enterprises/enterprises-update/enterprises-update.component';
import { UserCreateComponent } from '../../pages/user/user-create/user-create.component';
import { UserUpdateComponent } from '../../pages/user/user-update/user-update.component';

import { DepartmentsComponent } from '../../pages/departments/departments.component';
import { DepartmentCreateComponent } from '../../pages/departments/department-create/department-create.component';
import { DepartmentUpdateComponent } from '../../pages/departments/department-update/department-update.component';
import { EmployeesComponent } from '../../pages/employees/employees.component';
import { EmployeeCreateComponent } from '../../pages/employees/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from '../../pages/employees/employee-update/employee-update.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'login',      component: DashboardComponent },
    { path: 'enterprises', component: EnterprisesComponent },
    { path: 'enterprises/create',  component: EnterprisesCreateComponent },
    { path: 'enterprises/update/:id',  component: EnterprisesUpdateComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/create', component: UserCreateComponent },
    { path: 'user/update/:id', component: UserUpdateComponent },
    { path: 'departments', component: DepartmentsComponent },
    { path: 'departments/create', component: DepartmentCreateComponent },
    { path: 'departments/update/:id', component: DepartmentUpdateComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'employees/create', component: EmployeeCreateComponent },
    { path: 'employees/update/:id', component: EmployeeUpdateComponent },
    
    /*{ path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }*/
];
