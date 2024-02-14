import { Component, Output } from '@angular/core';
import { InscriptionComponent } from '../inscription/inscription.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() visible: boolean = false;

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
