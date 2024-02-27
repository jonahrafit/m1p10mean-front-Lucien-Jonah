import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogModule } from 'primeng/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CalendarModule } from 'primeng/calendar';
import moment from 'moment';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { HoraireOuvertureComponent } from '../../component/horaire-ouverture/horaire-ouverture.component';
import { SalonService } from '../../services/salonService/salon.service';
import { Subscription, catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee/employee.service';
import { IEmployeeResponse } from '../../models/IEmployeeResponse';
import { IEmployee } from '../../models/IEmployee';
interface ServiceData {
  page: number;
  size: number;
  services: any[];
}

interface SalonServiceModel {
  page: number,
  size: number,
  total: number,
  services: Salon[]
}

interface Salon {
  _id: string,
  nom: string,
  prix: number,
  duree: number,
  commission: number
}

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    HoraireOuvertureComponent,
    DialogModule,
    MatSelectModule,
    CalendarModule,
    FormsModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnDestroy {
  title = 'salon-beaute';
  salonServicesData!: SalonServiceModel;
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 0;
  currentPageEmployeeByService: number = 1;
  pageSizeEmployeeByService: number = 7;
  totalPagesEmployeeByService: number = 0;
  _serviceSelected!: Salon;
  showModalRendezVous = false;
  dateRendezVous: Date | undefined;
  _employeeHasService: IEmployeeResponse | undefined;
  subscritpions: Subscription[] = [];
  _employeHasServiceSelected: IEmployee | undefined;

  constructor(
    private http: HttpClient,
    private salonService: SalonService,
    private messageService: MessageService,
    private employeService: EmployeeService) {
  }

  ngOnDestroy(): void {
    this.subscritpions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.getSalonServices(this.currentPage,
      this.pageSize);
  }

  private getSalonServices(page = 1, size = 4) {
    const sub = this.salonService.getServices(page, size).subscribe(data => {
      this.salonServicesData = data as SalonServiceModel;
      this.totalPages = Math.ceil(this.salonServicesData.total / size);
    });
    this.subscritpions.push(sub);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.getSalonServices(this.currentPage, this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.getSalonServices(this.currentPage, this.pageSize);
  }

  nextPageEmployeeByService(): void {
    if (this.currentPageEmployeeByService < this.totalPagesEmployeeByService) {
      this.currentPageEmployeeByService++;
    }
    this.getEmployeesHasService(this.currentPageEmployeeByService, this.pageSizeEmployeeByService);
  }

  previousPageEmployeeByService(): void {
    if (this.currentPageEmployeeByService > 1) {
      this.currentPageEmployeeByService--;
    }
    this.getEmployeesHasService(this.currentPageEmployeeByService, this.pageSizeEmployeeByService);
  }


  displayedColumns: string[] = ['name', 'duration', 'price'];


  prendreRendezVous(service: Salon) {
    this._serviceSelected = service;
    this.dateRendezVous = new Date();
    this.showModalRendezVous = true;
    this.getEmployeesHasService();
  }

  getEmployeesHasService(page = 1, size = 7) {
    const sub = this.employeService.getEmployeeHasService(this._serviceSelected._id, page, size)
      .subscribe(response => {
        this._employeeHasService = response as IEmployeeResponse;
      });
    this.subscritpions.push(sub);
  }

  employeHasServiceSelected(employe: IEmployee) {
    this._employeHasServiceSelected = employe
  }

  initializeModalRendezVous() {
    this.showModalRendezVous = false;
    this._employeHasServiceSelected = undefined;
    this._employeeHasService = undefined;
  }

  enregistreRendezVous() {
    if (this._employeHasServiceSelected && this.dateRendezVous) {
      const date = moment(this.dateRendezVous);
      const formattedDate = date.format('YYYY-MM-DDTHH:mm:ss.SSSZ').replace(date.utcOffset().toString(), '+00:00');

      const sub = this.employeService.enregistrerRendezVous(this._serviceSelected._id, this._employeHasServiceSelected?._id, formattedDate)
        .subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enregistrement rendez-vous reussie' })
          console.log("🚀 ~ AcceuilComponent ~ enregistreRendezVous ~ response:", response);
          this.initializeModalRendezVous();
        });
      this.subscritpions.push(sub);
    }

  }


}
