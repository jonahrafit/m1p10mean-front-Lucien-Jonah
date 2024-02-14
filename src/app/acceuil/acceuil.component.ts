import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

interface Service {
  nom: string;
  duree: number; // durée en minutes
  description?: string; // description facultative du service
  prix: number; // prix du service
}

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {
  title = 'salon-beaute';
  services: Service[] = [
    {
      nom: "Coiffure",
      duree: 60,
      description: "Coupe de cheveux et coiffage",
      prix: 30
    },
    {
      nom: "Manucure",
      duree: 45,
      description: "Soins des ongles et pose de vernis",
      prix: 25
    },
    {
      nom: "Massage relaxant",
      duree: 90,
      description: "Massage relaxant pour détendre les muscles",
      prix: 50
    },
  ];

}

