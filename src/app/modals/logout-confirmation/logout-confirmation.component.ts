import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logout-confirmation',
  standalone: true,
  templateUrl: './logout-confirmation.component.html',
  styleUrls: ['./logout-confirmation.component.css']
})
export class LogoutConfirmationComponent {

  @Output() confirmLogout = new EventEmitter<void>();

  constructor() { }

  logout() {
    this.confirmLogout.emit();
  }

  closeModal() {

  }
}
