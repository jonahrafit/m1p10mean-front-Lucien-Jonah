import { Component } from '@angular/core';
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

import { HoraireOuvertureComponent } from '../../component/horaire-ouverture/horaire-ouverture.component';
import { SalonService } from '../../services/salonService/salon.service';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee/employee.service';
// import { SalonService, SalonServiceModel } from '../../services/salonService.service';
interface ServiceData {
  page: number;
  size: number;
  services: any[]; // Vous pouvez remplacer any[] par le type spécifique des services si vous le connaissez
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
    FormsModule
  ],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  title = 'salon-beaute';
  salonServicesData!: SalonServiceModel;
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 0;
  serviceIdSelected!: string;
  showModalRendezVous = false;
  dateRendezVous: Date | undefined;
  employeeHasService!: IEmployeeResponse;

  constructor(private http: HttpClient, private salonService: SalonService, private employeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getSalonServices(this.currentPage, this.pageSize);
  }

  private getSalonServices(page = 1, size = 4) {
    this.salonService.getServices(page, size).subscribe(data => {
      console.log("🚀 ~ AcceuilComponent ~ this.salonService.getServices ~ data:", data);
      this.salonServicesData = data as SalonServiceModel;
      this.totalPages = Math.ceil(this.salonServicesData.total / size);
    });
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


  /* exemple pour simulation */
  invoiceItems: any[] = [
    { name: 'Maquillage jour', duration: '60 min', price: 10000 },
    { name: 'Coiffure spéciale', duration: '45 min', price: 8000 },
  ];

  displayedColumns: string[] = ['name', 'duration', 'price'];


  prendreRendezVous(serviceId: string) {
    this.serviceIdSelected = serviceId;
    this.dateRendezVous = new Date();
    this.showModalRendezVous = true;
    // TODO: GET EMPLOYEES WHICH HAS THE SERVICE SELECTED
    // 
  }

  // getEmployeesHasService(serviceId: string) {
  //   this.employeService.getEmployeeHasService(serviceId, 1, 10)
  //     .subscribe(response => {

  //     })
  // }


}
