import { Injectable } from '@angular/core';
import { Guest } from '../model/guest.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './ApiConfigService';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GuestService {
    private guestUrl = "api/hospede";
    private url = environment.api;

    constructor(
        private http: HttpClient,
        private appConfig: AppConfigService) { }

    createGuest(guest: Guest): Observable<Guest> {
        const url = `${this.appConfig.apiBaseUrl}${this.guestUrl}`
        return this.http.post<Guest>(url, guest);
    }

    getListGuest() {
        const url = `${this.appConfig.apiBaseUrl}${this.guestUrl}`;
        return this.http.get<Guest[]>(this.url+this.guestUrl);
    }

    searchGuest(name: string, phone: string, cpf: string): Observable<Guest[]> {
        const params = { name, phone, cpf };
        return this.http.get<Guest[]>(`${this.appConfig.apiBaseUrl}${this.guestUrl}`, { params });
      }
}
