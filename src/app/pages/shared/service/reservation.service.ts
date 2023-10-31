import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './ApiConfigService';
import { Reserve } from '../model/reserve.model';
import { Guest } from '../model/guest.model';

@Injectable({
    providedIn: 'root',
})
export class ReserveService {
    private reserveUrl = "api/reserva";

    constructor(
        private http: HttpClient,
        private appConfig: AppConfigService) { }

    createReserve(reserve: Reserve): Observable<Reserve> {
        const url = `${this.appConfig.apiBaseUrl}${this.reserveUrl}`
        console.log("URL: " + reserve.checkin)
        return this.http.post<Reserve>(url, reserve);
    }
}
