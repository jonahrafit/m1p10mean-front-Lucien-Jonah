import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { IEmployeeResponse } from '../../models/IEmployeeResponse';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../../models/IEmployee';

import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table'; // Ne pas importer MatTableModule car il est déjà importé dans le module principal
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-manage-employe',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatIcon,
    MatFormField,
    MatLabel,
    MatFormField,
    MatOption,
    MatSelect,
    MatInputModule],
  templateUrl: './manage-employe.component.html',
  styleUrls: ['./manage-employe.component.css']
})

export class ManageEmployeComponent implements OnInit {
  employeeServiceData: IEmployeeResponse = { employees: [] };
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;
  employeeHasService!: IEmployeeResponse;
  dataSource: MatTableDataSource<IEmployee> = new MatTableDataSource<IEmployee>([]); // Initialise avec un tableau vide de type IEmployee

  constructor(private http: HttpClient,
    private employeeService: EmployeeService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getListEmploye(this.currentPage, this.pageSize);
  }

  private getListEmploye(page: number, size: number): void {
    this.employeeService.getAllEmployee(page, size).subscribe(data => {
      console.log("🚀 ~ ManageEmployeComponent ~ this.employeeService.getEmployeeById ~ data:", data);
      this.employeeServiceData = data as IEmployeeResponse;
      this.dataSource.data = this.employeeServiceData.employees || []; // Mettre à jour dataSource.data avec les données
    });
  }

  validerMail() {
    alert('validation email');
  }

  goToDetailsPage(_id: string) {
    console.log(_id);
    this.router.navigateByUrl('manage/employe/' + _id);
  }

  displayedColumns: string[] = ['Nom', 'Prenom', 'Email', 'Commission', 'isValide', 'Action'];
  statusSelected: string = 'tous';

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const value = filterValue.trim().toLowerCase();
    /*this.dataSource.filterPredicate = (data: IEmployeeResponse, filter: string) => {
      return data.employees.nom.toLowerCase().includes(filter) ||
        data.employees.prenom.toLowerCase().includes(filter) ||
        data.employees.email.toLowerCase().includes(filter);
    };*/
    this.dataSource.filter = value;
  }

  applyFilterByStatus() {
    const value = this.statusSelected;
    console.log('Valeur sélectionnée : ', value);
    if (value) {
      switch (value) {
        /* case 'nonConfirme':
          this.dataSource.filterPredicate = (data: TempEmploye) => !data.estConfirme;
          break;
        case 'nonValide':
          this.dataSource.filterPredicate = (data: TempEmploye) => !data.estValide;
          break;
        case 'valide':
          this.dataSource.filterPredicate = (data: TempEmploye) => data.estConfirme && data.estValide;
          break;
          */
        case 'tous':
          this.dataSource.filterPredicate = () => true;
          break;
      }
      this.dataSource.filter = 'trigger';
    }
  }

}
