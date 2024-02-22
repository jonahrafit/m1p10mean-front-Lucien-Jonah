import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface ServiceData {
  page: number;
  size: number;
  services: any[]; // Vous pouvez remplacer any[] par le type spécifique des services si vous le connaissez
}

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  title = 'salon-beaute';
  page = 1;
  size = 50;
  services: any[] = [];
  apiUrl = 'http://localhost:3001'; // Remplacez ceci par l'URL de votre API

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
}
