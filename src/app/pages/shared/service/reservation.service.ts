import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './ApiConfigService';
import { Reserve } from '../model/reserve.model';
import { GuestWithReserve } from '../model/guest-with-reserve.model';

@Injectable({
    providedIn: 'root',
})
export class ReserveService {
    private reserveUrl = "api/reserva";
    private reserveCheckinUrl = "api/reserva/atendente/checkin";
    private reserveCheckoutUrl = "api/reserva/atendente/checkout";
    constructor(
        private http: HttpClient,
        private appConfig: AppConfigService) { }

    createReserve(reserve: Reserve): Observable<Reserve> {
        const url = `${this.appConfig.apiBaseUrl}${this.reserveUrl}`
        return this.http.post<Reserve>(url, reserve);
    }

    // getReserveWithGuest(): Observable<GuestWithReserve[]> {
    //     const url = `${this.appConfig.apiBaseUrl}${this.reserveUrl}`
    //     return this.http.get<GuestWithReserve[]>(url);
    // }

    getReserveWithoutCheckin(): Observable<GuestWithReserve[]> {
        const url = `${this.appConfig.apiBaseUrl}${this.reserveCheckinUrl}`
        return this.http.get<GuestWithReserve[]>(url);
    }

    getReserveWithoutCheckout(): Observable<GuestWithReserve[]> {
        const url = `${this.appConfig.apiBaseUrl}${this.reserveCheckoutUrl}`
        return this.http.get<GuestWithReserve[]>(url);
    }

    saveCheckinGuest(id: {id: number}): Observable<{id: number}> {
        const url = `${this.appConfig.apiBaseUrl}${this.reserveCheckinUrl}`
        return this.http.post<{id: number}>(url, id);
    }

    saveChekoutGuest(id: {id: number}): Observable<{id: number}> {
        const url = `${this.appConfig.apiBaseUrl}${this.reserveCheckoutUrl}`
        return this.http.post<{id: number}>(url, id);
    }
}
