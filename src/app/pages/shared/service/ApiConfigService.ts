import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class AppConfigService {
    apiBaseUrl = "http://localhost:8080/";
  }
  