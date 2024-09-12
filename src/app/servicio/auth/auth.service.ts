import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CapacitorHttp } from '@capacitor/core';

import { Platform } from '@ionic/angular';
import { UserRA } from 'src/app/interface/usr-ra';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://retroachievements.org/API/API_GetUserProfile.php';

  constructor(private http: HttpClient, private platform: Platform) { }

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
      try {
        const response = await CapacitorHttp.get(options);
        console.log(response.status);
        if (response.status === 200) {
          return response.data;
        } else {
          throw Error("fallo en la conexion");
        }
      } catch (error) {
        throw Error("fallo en la conexion error: " + error);
      }

    } else {
      // Usamos HttpClient para otras plataformas
      try {
        return this.http.get(this.apiUrl, { params });
      } catch (error) {
        throw Error("fallo en la conexion error: " + error);
      }

    }
  }
}
