import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventApi } from '@fullcalendar/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-details-rendez-vous-modal',
  standalone: true,
  imports: [MatDialogModule, MatCardModule],
  templateUrl: './details-rendez-vous-modal.component.html',
  styleUrl: './details-rendez-vous-modal.component.css'
})
export class DetailsRendezVousModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailsRendezVousModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventApi
  ) {
    console.log(data);
    console.log('DATA = ', data.extendedProps['fait']);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

