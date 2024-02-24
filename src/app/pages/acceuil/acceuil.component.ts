import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { HoraireOuvertureComponent } from '../../component/horaire-ouverture/horaire-ouverture.component';
import { SalonService, SalonServiceModel } from '../../services/salonService.service';
interface ServiceData {
  page: number;
  size: number;
  services: any[]; // Vous pouvez remplacer any[] par le type spécifique des services si vous le connaissez
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
    HoraireOuvertureComponent
  ],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  title = 'salon-beaute';
  showFormulaireGetRDV: boolean = true;
  dataSource: SalonServiceModel[] = [];

  constructor(private http: HttpClient, private salonService: SalonService) {
  }

  ngOnInit(): void {
    this.dataSource = this.salonService.getSalonServices();
    /* 
    this.http.get<ServiceData>(`${this.apiUrl}/services/${this.page}/${this.size}`)
      .subscribe(data => {
        this.services = data.services;
      });
      */
  }

  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 0;

  get currentServices(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.totalPages = Math.ceil(this.dataSource.length / this.pageSize);
    return this.dataSource.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  setShowFormulaireRDV() {
    this.showFormulaireGetRDV = true;
  }

  setHiddenFormulaireRDV() {
    this.showFormulaireGetRDV = false;
  }

  /* exemple pour simulation */
  invoiceItems: any[] = [
    { name: 'Maquillage jour', duration: '60 min', price: 10000 },
    { name: 'Coiffure spéciale', duration: '45 min', price: 8000 },
  ];

  displayedColumns: string[] = ['name', 'duration', 'price'];

  calculateTotal(): number {
    return this.invoiceItems.reduce((acc, curr) => acc + curr.price, 0);
  }

}
