import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CapacitorHttp } from '@capacitor/core'; 

import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://retroachievements.org/API/API_GetUserProfile.php';

  constructor(private http: HttpClient, private platform: Platform) {}

  async login(username: string, apiKey: string) {
    const params = {
      u: username,
      y: apiKey,
      // Añadir cualquier otro parámetro necesario
    };

    if (this.platform.is('android')) {
      // Usamos el plugin HTTP de Capacitor para Android
      const options = {
        url: this.apiUrl,
        params: params
      };

      const response = await CapacitorHttp.get(options);
      return response.data;
    } else {
      // Usamos HttpClient para otras plataformas
      return this.http.get(this.apiUrl, { params }).toPromise();
    }
  }
}
