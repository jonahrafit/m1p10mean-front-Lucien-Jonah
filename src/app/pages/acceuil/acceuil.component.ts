import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
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
    MatTableModule],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  title = 'salon-beaute';
  page = 1;
  size = 50;
  services: any[] = [];
  apiUrl = 'http://localhost:3001'; // Remplacez ceci par l'URL de votre API
  showFormulaireGetRDV: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ServiceData>(`${this.apiUrl}/services/${this.page}/${this.size}`)
      .subscribe(data => {
        this.services = data.services;
      });
  }

  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 0;

  get currentServices(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.totalPages = Math.ceil(this.services.length / this.pageSize);
    return this.services.slice(startIndex, startIndex + this.pageSize);
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
    // Add more items as needed
  ];

  displayedColumns: string[] = ['name', 'duration', 'price', 'total'];

  calculateTotal(): number {
    return this.invoiceItems.reduce((acc, curr) => acc + curr.price, 0);
  }

  isFooterRow = (index: number, item: any) => item.name === 'total';
}
