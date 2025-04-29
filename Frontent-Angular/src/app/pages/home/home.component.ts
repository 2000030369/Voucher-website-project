import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { VoucherService } from '../../services/voucher.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vouchers: any[] = [];

  constructor(private voucherService: VoucherService) {}

  ngOnInit() {
    this.voucherService.getAllVouchers().subscribe(
      (data) => {
        this.vouchers = data;
      },
      (error) => {
        console.error('Error fetching vouchers:', error);
      }
    );
  }
}
