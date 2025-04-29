
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router'; 
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  loading: boolean = false;
  constructor(private http: HttpClient, private router: Router){}
  register() {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill all fields!');
      return;
    }
  
    this.http.post('http://localhost:8080/api/users/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }, { responseType: 'text' as 'json' }) 
    .subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res); 
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        console.log('Error:', err);
        alert('❌ Registration failed!');
      }
    });
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'Please login now.',
      timer: 2000,
      showConfirmButton: false
    });
    this.router.navigate(['/login']);
  }
}  