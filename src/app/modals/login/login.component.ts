import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DialogModule,
    MatButtonModule,
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Output() disableModal = new EventEmitter<any>();
  loginForm!: FormGroup;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnDestroy(): void { }

  ngOnInit(): void {
    // Initialize loginForm in ngOnInit
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onHide() {
    this.closeModal();
    console.log('🚀 ~ LoginComponent ~ onHide:', this.visible);
  }

  private closeModal() {
    this.visible = false;
    this.disableModal.emit(false);
  }

  seConnecter() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Appelez votre service Web ici avec les données du formulaire
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Réponse du service:', response);
          this.loginForm.reset();
        },
        (error) => {
          // Gérez les erreurs du service Web
          console.error('Erreur lors de l\'appel du service:', error);
        }
      );
    }
  }
}
