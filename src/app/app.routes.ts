import { Routes } from '@angular/router';
import { AcceuilComponent } from './pages/acceuil/acceuil.component'; // Remplacez Acceuil par le nom de votre composant d'accueil
import { ManagerComponent } from './pages/manager/manager.component';
import { EmployeComponent } from './pages/employe/employe.component';

export const routes: Routes = [
    { path: '', component: AcceuilComponent },
    { path: 'manager', component: ManagerComponent },
    { path: 'employe', component: EmployeComponent },
    { path: '**', redirectTo: '' }
];
