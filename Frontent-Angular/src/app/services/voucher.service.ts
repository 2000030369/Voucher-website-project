import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voucher } from '.././models/voucher.model'; 


@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  
  private apiUrl = 'http://localhost:8080/api/vouchers';
  constructor(private http: HttpClient) {}

  getAllVouchers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getVoucherById(id: number): Observable<Voucher> {
    return this.http.get<Voucher>(`http://localhost:8080/api/vouchers/${id}`);
  }
  
  
  
}
