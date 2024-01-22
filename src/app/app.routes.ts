import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { DashboardComponent } from './main-content/dashboard/dashboard.component';
import { UsersComponent } from './main-content/users/users.component';


export const routes: Routes = [
    { path: '', component: MainContentComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'users', component: UsersComponent},
];