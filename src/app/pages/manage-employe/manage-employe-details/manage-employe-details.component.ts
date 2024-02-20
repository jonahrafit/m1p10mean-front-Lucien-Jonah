import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-employe-details',
  standalone: true,
  imports: [],
  templateUrl: './manage-employe-details.component.html',
  styleUrl: './manage-employe-details.component.css'
})
export class ManageEmployeDetailsComponent {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Identifiant de l\'employé:', id);
    });
  }

}
