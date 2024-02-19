import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { eventNames } from 'process';

export interface TempEmploye {
  nom: String,
  prenom: String,
  email: String,
  estValide: boolean,
  estConfirme: boolean,
  tauxCommission: number
}

const ELEMENT_DATA: TempEmploye[] =
  [
    {
      nom: "Doe",
      prenom: "John",
      email: "john.doe@example.com",
      estValide: false,
      estConfirme: false,
      tauxCommission: 0.15
    },
    {
      nom: "Smith",
      prenom: "Alice",
      email: "alice.smith@example.com",
      estValide: true,
      estConfirme: false,
      tauxCommission: 0.12
    },
    {
      nom: "Johnson",
      prenom: "Michael",
      email: "michael.johnson@example.com",
      estValide: true,
      estConfirme: true,
      tauxCommission: 0.18
    },
    {
      nom: "Brown",
      prenom: "Emily",
      email: "emily.brown@example.com",
      estValide: false,
      estConfirme: true,
      tauxCommission: 0.2
    },
    {
      nom: "Williams",
      prenom: "James",
      email: "james.williams@example.com",
      estValide: true,
      estConfirme: false,
      tauxCommission: 0.17
    },
    {
      nom: "Jones",
      prenom: "Jessica",
      email: "jessica.jones@example.com",
      estValide: false,
      estConfirme: true,
      tauxCommission: 0.16
    },
    {
      nom: "Garcia",
      prenom: "David",
      email: "david.garcia@example.com",
      estValide: true,
      estConfirme: true,
      tauxCommission: 0.14
    },
    {
      nom: "Martinez",
      prenom: "Sophia",
      email: "sophia.martinez@example.com",
      estValide: false,
      estConfirme: false,
      tauxCommission: 0.19
    },
    {
      nom: "Hernandez",
      prenom: "Daniel",
      email: "daniel.hernandez@example.com",
      estValide: true,
      estConfirme: true,
      tauxCommission: 0.13
    },
    {
      nom: "Lopez",
      prenom: "Olivia",
      email: "olivia.lopez@example.com",
      estValide: false,
      estConfirme: false,
      tauxCommission: 0.21
    },
    {
      nom: "Gonzalez",
      prenom: "Liam",
      email: "liam.gonzalez@example.com",
      estValide: true,
      estConfirme: true,
      tauxCommission: 0.22
    },
    {
      nom: "Wilson",
      prenom: "Charlotte",
      email: "charlotte.wilson@example.com",
      estValide: false,
      estConfirme: true,
      tauxCommission: 0.23
    },
    {
      nom: "Anderson",
      prenom: "Ethan",
      email: "ethan.anderson@example.com",
      estValide: true,
      estConfirme: false,
      tauxCommission: 0.24
    },
    {
      nom: "Taylor",
      prenom: "Ava",
      email: "ava.taylor@example.com",
      estValide: false,
      estConfirme: false,
      tauxCommission: 0.25
    },
    {
      nom: "Thomas",
      prenom: "Noah",
      email: "noah.thomas@example.com",
      estValide: true,
      estConfirme: true,
      tauxCommission: 0.26
    },
    {
      nom: "Moore",
      prenom: "Isabella",
      email: "isabella.moore@example.com",
      estValide: false,
      estConfirme: true,
      tauxCommission: 0.27
    },
    {
      nom: "Jackson",
      prenom: "Mia",
      email: "mia.jackson@example.com",
      estValide: true,
      estConfirme: false,
      tauxCommission: 0.28
    },
    {
      nom: "White",
      prenom: "Elijah",
      email: "elijah.white@example.com",
      estValide: false,
      estConfirme: false,
      tauxCommission: 0.29
    },
    {
      nom: "Harris",
      prenom: "Amelia",
      email: "amelia.harris@example.com",
      estValide: true,
      estConfirme: true,
      tauxCommission: 0.30
    },
    {
      nom: "Martin",
      prenom: "Benjamin",
      email: "benjamin.martin@example.com",
      estValide: false,
      estConfirme: true,
      tauxCommission: 0.31
    }
  ];

@Component({
  selector: 'app-manage-employe',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    CommonModule],
  templateUrl: './manage-employe.component.html',
  styleUrl: './manage-employe.component.css'
})
export class ManageEmployeComponent {
  displayedColumns: string[] = ['Nom', 'Prenom', 'Email', 'Commission', 'isValide', 'Action'];
  dataSource = new MatTableDataSource<TempEmploye>(ELEMENT_DATA);

  applyFilter(event: any) {
    var value = event.target.value;
    value = value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: TempEmploye, filter: string) => {
      return data.nom.toLowerCase().includes(filter) ||
        data.prenom.toLowerCase().includes(filter) ||
        data.email.toLowerCase().includes(filter);
    };
    this.dataSource.filter = value;
  }

  applyFilterByStatus(event: any) {
    var value = event.target.value;
    if (value) {
      value = value.trim().toLowerCase();
      switch (value) {
        case 'nonconfirme':
          this.dataSource.filterPredicate = (data: TempEmploye) => !data.estConfirme;
          break;
        case 'nonvalide':
          this.dataSource.filterPredicate = (data: TempEmploye) => !data.estValide;
          break;
        case 'valide':
          this.dataSource.filterPredicate = (data: TempEmploye) => data.estValide;
          break;
      }
      this.dataSource.filter = value;
    }
  }

  validerMail() {
    alert('validation email');
  }
}
