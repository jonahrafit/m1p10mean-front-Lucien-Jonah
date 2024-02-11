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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogModule } from 'primeng/dialog';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Output() disableModal = new EventEmitter<any>();
  loginForm!: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  constructor() {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}

  onHide() {
    this.closeModal();
    console.log('🚀 ~ LoginComponent ~ onHide:', this.visible);
  }

  private closeModal() {
    this.visible = false;
    this.disableModal.emit(false);
  }

  seConnecter() {
    console.log(
      '🚀 ~ LoginComponent ~ seConnecter:',
      this.loginForm.get('userName')?.hasError('email')
    );
    console.log(
      '🚀 ~ LoginComponent ~ seConnecter:',
      this.loginForm.get('userName')?.hasError('required')
    );
  }
}
