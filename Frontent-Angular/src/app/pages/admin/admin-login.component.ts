import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    const adminEmail = 'rishabh@admin.com';  
    const adminPassword = 'rishabh1209';          

    if (this.email === adminEmail && this.password === adminPassword) {
      this.router.navigate(['/admin']);  
    } else {
      this.errorMessage = 'Invalid credentials!';
    }
  }
}
