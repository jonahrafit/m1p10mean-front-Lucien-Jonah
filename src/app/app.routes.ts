import { Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component'; // Remplacez Acceuil par le nom de votre composant d'accueil
import { ManagerComponent } from './manager/manager.component'; // Remplacez ManagerComponent par le nom de votre composant Manager
import { EmployeComponent } from './employe/employe.component';
export const routes: Routes = [
    { path: '', component: AcceuilComponent },
    { path: 'manager', component: ManagerComponent },
    { path: 'employe', component: EmployeComponent },
    { path: '**', redirectTo: '' }
];
