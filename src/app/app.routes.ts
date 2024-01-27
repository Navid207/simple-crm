import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { DashboardComponent } from './main-content/dashboard/dashboard.component';
import { UsersComponent } from './main-content/users/users.component';
import { UserDetailComponent } from './main-content/users/user-detail/user-detail.component';
import { CompaniesComponent } from './main-content/companies/companies.component';
import { AddNewCompanyComponent } from './main-content/companies/add-new-company/add-new-company.component';


export const routes: Routes = [
    { path: '', component: MainContentComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'users', component: UsersComponent},
    { path: 'user/:id', component: UserDetailComponent},
    { path: 'companies', component: CompaniesComponent},
    { path: 'companies/new_Company', component: AddNewCompanyComponent},
    
];
