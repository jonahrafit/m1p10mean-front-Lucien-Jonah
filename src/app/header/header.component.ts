import { InscriptionComponent } from '../auth/inscription/inscription.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DockModule } from 'primeng/dock';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SpeedDialModule,
    ToastModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    DockModule,
    AutoCompleteModule,
    FormsModule,
    TableModule,
    TagModule,
    LoginComponent,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() visible: boolean = false;
  isLoggedIn: boolean = true; // Ajout d'une variable pour suivre l'état de connexion de l'utilisateur
  user: any = {
    nom: 'Jonah',
    prenom: 'Fitia'
  }; // Ajout d'une variable pour stocker les détails de l'utilisateur connecté

  constructor(private dialog: MatDialog) { }

  toLogin() {
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
  }

  openDialog() {
    this.dialog.open(InscriptionComponent);
  }

}
