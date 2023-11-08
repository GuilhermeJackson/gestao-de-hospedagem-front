import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './ApiConfigService';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentUrl = "api/payment";
  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService) { }

  getPayment(id: number): Observable<Payment> {
    const params = { id };
    return this.http.get<Payment>(`${this.appConfig.apiBaseUrl}${this.paymentUrl}`, { params });
  }
}
