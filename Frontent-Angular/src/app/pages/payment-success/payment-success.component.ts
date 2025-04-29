import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {
  voucherCode: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.voucherCode = this.generateVoucherCode();
  }

  generateVoucherCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  goToHome() {
    this.router.navigate(['/']);
  }
  copyCode() {
    const codeElement = document.getElementById('voucherCode');
    if (codeElement) {
      const code = codeElement.innerText;
      navigator.clipboard.writeText(code).then(() => {
        alert('Voucher code copied to clipboard!');
      });
    }
  }
  
}
