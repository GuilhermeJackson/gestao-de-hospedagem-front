import { Injectable } from '@angular/core';
import { Guest } from '../model/guest.model';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from './ApiConfigService';
import { Reserve } from '../model/reserve.model';

@Injectable({
    providedIn: 'root',
})
export class ReserveService {
    private ReserveUrl = "api/reserva";

    constructor(
        private http: HttpClient,
        private appConfig: AppConfigService) { }

    createReserve(reserve: Reserve): Observable<Reserve> {
        const url = `${this.appConfig.apiBaseUrl}${this.ReserveUrl}`
        console.log("URL: "+url)
        return this.http.post<Reserve>(url, reserve);
    }

}