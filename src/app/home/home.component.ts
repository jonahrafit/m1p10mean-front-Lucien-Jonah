import { Component, OnInit, Output } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DockModule } from 'primeng/dock';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SpeedDialModule,
    ToastModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    DockModule,
    AutoCompleteModule,
    FormsModule,
    TableModule,
    TagModule,
    LoginComponent,
    CommonModule,
    // DialogModule,
    // MatInputModule,
    // MatFormFieldModule,
    // ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  items: MenuItem[] = [];
  searchData: any;
  selectedItems: any[] | undefined;
  @Output() visible: boolean = false;
  // loginForm!: FormGroup;

  // Example data for products
  products: any[] = [
    { name: 'Product A', price: 19.99, category: 'Electronics', quantity: 5 },
    { name: 'Product B', price: 29.99, category: 'Clothing', quantity: 10 },
    { name: 'Product C', price: 9.99, category: 'Accessories', quantity: 15 },
  ];

  constructor(
    private messageService: MessageService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // this.initiateLoginForm();
    this.items = [
      {
        label: 'Finder',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg',
      },
      {
        label: 'App Store',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg',
      },
      {
        label: 'Photos',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg',
      },
      {
        label: 'Trash',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
      },
    ];
  }

  // private initiateLoginForm() {
  //   this.loginForm = this.formBuilder.group({
  //     userName: ['', Validators.email, Validators.required],
  //     password: ['', Validators.required],
  //   });
  // }

  search(event: AutoCompleteCompleteEvent) {
    this.searchData = [...Array(10).keys()].map(
      (item) => event.query + '-' + item
    );
  }

  filterCountry(event: any) {
    console.log(event);
  }

  toLogin() {
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
  }
}
