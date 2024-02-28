import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReservationParJourComponent } from './reservation-par-jour/reservation-par-jour.component';
import { TempsMoyenDeTravailComponent } from './temps-moyen-de-travail/temps-moyen-de-travail.component';
import { ChiffreDAffaireComponent } from './chiffre-d-affaire/chiffre-d-affaire.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    ReservationParJourComponent,
    TempsMoyenDeTravailComponent,
    ChiffreDAffaireComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  constructor() { }
}