import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-ajout-horaire-travail',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './ajout-horaire-travail.component.html',
  styleUrl: './ajout-horaire-travail.component.css'
})
export class AjoutHoraireTravailComponent {
  constructor(
    public dialogRef: MatDialogRef<AjoutHoraireTravailComponent>
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
