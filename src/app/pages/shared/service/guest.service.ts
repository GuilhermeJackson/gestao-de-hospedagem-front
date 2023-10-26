import { Injectable } from '@angular/core';
import { Guest } from '../model/guest.model';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from './ApiConfigService';

@Injectable({
    providedIn: 'root',
})
export class GuestService {
    private guestUrl = "api/hospede";

    constructor(
        private http: HttpClient,
        private appConfig: AppConfigService) { }

    createUser(guest: Guest): Observable<Guest> {
        const url = `${this.appConfig.apiBaseUrl}${this.guestUrl}`
        console.log("URL: "+url)
        return this.http.post<Guest>(url, guest);
    }

}
