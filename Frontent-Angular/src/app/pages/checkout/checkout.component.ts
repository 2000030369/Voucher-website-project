
import confetti from 'canvas-confetti';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
  export class CheckoutComponent {
    voucher: any;
    uniqueCode: string = '';
    paymentDone = false;
  
    constructor(private router: Router) {
      const nav = this.router.getCurrentNavigation();
      this.voucher = nav?.extras.state?.['voucher'];
      this.uniqueCode = nav?.extras.state?.['uniqueCode'];
      this.paymentDone = true;
    }
  }

  

