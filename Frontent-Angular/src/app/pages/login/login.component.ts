import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  

  login() {
    this.loading = true;
    this.errorMessage = '';

    this.http.post('http://localhost:8080/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log('Login Success Response:', res);
        localStorage.setItem('loggedIn', 'true');
        this.loading = false;
        if (res.success) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Invalid email or password, please try again!';
        }
      },
      error: (err) => {
        console.log('Login Error:', err);
        this.loading = false;
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
