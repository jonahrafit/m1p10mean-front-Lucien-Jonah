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

import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-manage-employe',
  standalone: true,
  imports: [CommonModule,
    ConfirmDialogModule,
    MatTableModule,
    MatIcon,
    MatFormField,
    MatLabel,
    MatFormField,
    MatOption,
    MatSelect,
    MatInputModule,
    ToastModule],
  templateUrl: './manage-employe.component.html',
  styleUrls: ['./manage-employe.component.css'],
  providers: [ConfirmationService, MessageService]
})

export class ManageEmployeComponent {
  employeeServiceData!: IEmployeeResponse;
  currentPage: number = 1;
  pageSize: number = 6;
  employeeHasService!: IEmployeeResponse;
  dataSource: MatTableDataSource<IEmployee> = new MatTableDataSource<IEmployee>([]); // Initialise avec un tableau vide de type IEmployee
  employeSelected!: IEmployee;

  constructor(private http: HttpClient,
    private employeeService: EmployeeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
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

  applyFilterByStatus() {
    const value = this.statusSelected;
    console.log('Valeur sélectionnée : ', value);
    if (value) {
      switch (value) {
        case 'nonConfirme':
          this.dataSource.filterPredicate = (data: IEmployee) => !data.estConfirme;
          break;
        case 'nonValide':
          this.dataSource.filterPredicate = (data: IEmployee) => !data.estValide;
          break;
        case 'valide':
          this.dataSource.filterPredicate = (data: IEmployee) => data.estConfirme && data.estValide;
          break;
        case 'tous':
          this.dataSource.filterPredicate = () => true;
          break;
      }
      this.dataSource.filter = 'trigger';
    }
  }

  confirm(id: string, options: { estValide: boolean, estConfirme: boolean, tauxCommission: number }) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment valider ce compte ? ' + id,
      header: 'Confirmation',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectLabel: 'Non, Merci',
      acceptLabel: 'Oui',
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        console.log('ID ____ ', id);
        this.employeeService.valideCompteEmploye(id, options)
          .subscribe(() => {
            this.messageService.add({
              severity: 'info',
              summary: 'Validé',
              detail: 'Vous avez validé ce compte',
              life: 3000
            });
            this.getListEmploye(this.currentPage, this.pageSize);
          }, error => {
            console.error("Erreur lors de la validation du compte :", error);
            // Gérer les erreurs ici
          });
      },
    });
  }
}
