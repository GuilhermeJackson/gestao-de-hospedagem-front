import { Injectable } from '@angular/core';
import { Guest } from '../model/guest.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from './ApiConfigService';
import { GuestFilter } from '../model/guest-filter.model';

@Injectable({
    providedIn: 'root',
})
export class GuestService {
    private guestUrl = "api/hospede";

    constructor(
        private http: HttpClient,
        private appConfig: AppConfigService) { }

    createGuest(guest: Guest): Observable<Guest> {
        const url = `${this.appConfig.apiBaseUrl}${this.guestUrl}`
        return this.http.post<Guest>(url, guest);
    }

    getListGuest() {
        const url = `${this.appConfig.apiBaseUrl}${this.guestUrl}`;
        return this.http.get<Guest[]>(url);
    }

    searchGuest(name: string, phone: string, cpf: string): Observable<Guest[]> {
        const params = { name, phone, cpf };
        return this.http.get<Guest[]>(`${this.appConfig.apiBaseUrl}${this.guestUrl}`, { params });
      }
}
