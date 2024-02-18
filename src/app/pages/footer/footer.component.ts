import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Détecte le défilement de la page pour afficher ou masquer le bouton de retour vers le haut
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const backToTopButton = document.getElementById('back-to-top-button');
    if (backToTopButton) {
      if (scrollY >= 200) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    }
  }
}
