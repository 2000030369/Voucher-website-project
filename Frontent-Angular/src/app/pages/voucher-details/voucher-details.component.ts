declare var Razorpay: any; 

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherService } from '../../services/voucher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voucher-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.css']
})
export class VoucherDetailsComponent implements OnInit {
  voucher: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private voucherService: VoucherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.voucherService.getVoucherById(id).subscribe({
      next: (data) => {
        this.voucher = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching voucher details:', error);
        this.loading = false;
      }
    });
  }

  buyNow() {
    const options = {
      key: 'rzp_test_0BFvCTiVXEa2yG', 
      amount: this.voucher.price * 100, 
      currency: 'INR',
      name: 'Voucher Purchase',
      description: this.voucher.title,
      image: this.voucher.image,
      handler: (response: any) => {
        console.log(response);
        const uniqueCode = this.generateUniqueCode();
        this.router.navigate(['/checkout'], {
          state: { voucher: this.voucher, uniqueCode: uniqueCode, paymentId: response.razorpay_payment_id }
        });
      },
      prefill: {
        email: 'test@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  generateUniqueCode(): string {
    const now = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `VC-${now}-${random}`;
  }
}
