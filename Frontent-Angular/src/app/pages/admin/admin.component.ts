import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title: string = '';
  description: string = '';
  price: number | null = null;
  imageUrl: string = '';
  vouchers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchVouchers();
  }

  addVoucher() {
    const newVoucher = {
      title: this.title,
      description: this.description,
      price: this.price,
      imageUrl: this.imageUrl
    };

    this.http.post('http://localhost:8080/api/admin/add-voucher', newVoucher).subscribe({
      next: () => {
        alert('Voucher added successfully!');
        this.fetchVouchers();
        this.clearForm();
      },
      error: () => {
        alert('Failed to add voucher!');
      }
    });
  }

  fetchVouchers() {
    this.http.get<any[]>('http://localhost:8080/api/vouchers').subscribe({
      next: (data) => {
        this.vouchers = data;
      },
      error: () => {
        alert('Failed to fetch vouchers');
      }
    });
  }



  deleteVoucher(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/api/admin/delete-voucher/${id}`).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Voucher has been deleted.', 'success');
            this.fetchVouchers();
          },error: (err) => {
            console.error('Delete error:', err);
            Swal.fire('Deleted!', 'Voucher has been deleted.', 'success');
          }
        });
      }
    });
  }
  

  clearForm() {
    this.title = '';
    this.description = '';
    this.price = null;
    this.imageUrl = '';
  }
}
