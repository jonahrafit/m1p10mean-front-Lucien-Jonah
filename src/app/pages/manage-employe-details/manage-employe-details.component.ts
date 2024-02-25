import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CalendarTestComponent } from '../../component/calendar-test/calendar-test.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-manage-employe-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CalendarTestComponent, MatListModule],
  templateUrl: './manage-employe-details.component.html',
  styleUrl: './manage-employe-details.component.css'
})
export class ManageEmployeDetailsComponent {
  longText: string = "Text";
  email: string = "jonahrafit.ram@hotmail.com";
  nom: string = "Jonah"
  prenom: string = "Fitia"

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Identifiant de l\'employé:', id);
    });
  }

}
