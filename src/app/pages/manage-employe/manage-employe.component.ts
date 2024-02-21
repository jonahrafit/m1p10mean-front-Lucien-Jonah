import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table'; // Ne pas importer MatTableModule car il est déjà importé dans le module principal
import { EmployeeService, TempEmploye } from '../../services/employe.service';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-manage-employe',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIcon, MatFormField, MatLabel, MatFormField, MatOption, MatSelect],
  templateUrl: './manage-employe.component.html',
  styleUrls: ['./manage-employe.component.css']
})
export class ManageEmployeComponent implements OnInit {
  displayedColumns: string[] = ['Nom', 'Prenom', 'Email', 'Commission', 'isValide', 'Action'];
  statusSelected: string = 'tous';
  dataSource: MatTableDataSource<TempEmploye>;

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.dataSource = new MatTableDataSource<TempEmploye>();
  }

  ngOnInit(): void {
    this.dataSource.data = this.employeeService.getEmployees(); // Assigner les données à la propriété data de MatTableDataSource
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const value = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: TempEmploye, filter: string) => {
      return data.nom.toLowerCase().includes(filter) ||
        data.prenom.toLowerCase().includes(filter) ||
        data.email.toLowerCase().includes(filter);
    };
    this.dataSource.filter = value;
  }

  applyFilterByStatus() {
    const value = this.statusSelected;
    console.log('Valeur sélectionnée : ', value);
    if (value) {
      switch (value) {
        case 'nonConfirme':
          this.dataSource.filterPredicate = (data: TempEmploye) => !data.estConfirme;
          break;
        case 'nonValide':
          this.dataSource.filterPredicate = (data: TempEmploye) => !data.estValide;
          break;
        case 'valide':
          this.dataSource.filterPredicate = (data: TempEmploye) => data.estConfirme && data.estValide;
          break;
        case 'tous':
          this.dataSource.filterPredicate = () => true;
          break;
      }
      this.dataSource.filter = 'trigger';
    }
  }

  validerMail() {
    alert('validation email');
  }

  goToDetailsPage(_id: string) {
    console.log(_id);
    this.router.navigateByUrl('manage/employe/' + _id);
  }
}
