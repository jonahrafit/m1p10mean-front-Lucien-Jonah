import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventApi } from '@fullcalendar/core';

@Component({
  selector: 'app-details-rendez-vous-modal',
  standalone: true,
  imports: [],
  templateUrl: './details-rendez-vous-modal.component.html',
  styleUrl: './details-rendez-vous-modal.component.css'
})
export class DetailsRendezVousModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailsRendezVousModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventApi
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

