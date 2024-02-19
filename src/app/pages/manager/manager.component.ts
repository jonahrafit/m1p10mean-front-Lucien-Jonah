import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ManageEmployeComponent } from './manage-employe/manage-employe.component';
@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatTabsModule, ManageEmployeComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

}
