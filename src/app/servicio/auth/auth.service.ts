import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CapacitorHttp } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://retroachievements.org/API/';
  private perfil = 'API_GetUserProfile.php';
  private resumenJuego = 'API_GetGame.php';
  private playJuegos = 'API_GetUserRecentlyPlayedGames.php';
  private ultimosLogros = 'API_GetUserRecentAchievements.php';

  constructor(private http: HttpClient, private platform: Platform) {}

  // Función para manejar la lógica de la solicitud HTTP según la plataforma
  private async makeHttpRequest(endpoint: string, params: any): Promise<any> {
    const url = this.apiUrl + endpoint;
    
    if (this.platform.is('android')) {
      // Usamos el plugin HTTP de Capacitor para Android
      const options = { url, params };
      try {
        const response = await CapacitorHttp.get(options);
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Fallo en la conexión');
        }
      } catch (error) {
        throw new Error('Fallo en la conexión: ' + error);
      }
    } else {
      // Usamos HttpClient para otras plataformas
      try {
        return this.http.get(url, { params }).toPromise();
      } catch (error) {
        throw new Error('Fallo en la conexión: ' + error);
      }
    }
  }

  async login(username: string, apiKey: string) {
    const params = { u: username, y: apiKey };
    return this.makeHttpRequest(this.perfil, params);
  }

  async sumaryGame(ideGame: string, apiKey: string) {
    const params = { i: ideGame, y: apiKey };
    return this.makeHttpRequest(this.resumenJuego, params);
  }
  
  async allPlayGame(username: string, apiKey: string) {
    const params = { u: username, y: apiKey };
    return this.makeHttpRequest(this.playJuegos, params);
  }
  
  async allAchievements(username: string, apiKey: string) {
    const params = { u: username, y: apiKey ,m:20000000};
    return this.makeHttpRequest(this.ultimosLogros, params);
  }
}
