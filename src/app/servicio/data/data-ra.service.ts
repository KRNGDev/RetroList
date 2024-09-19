import { Injectable } from '@angular/core';
import { UserRA } from 'src/app/interface/usr-ra';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../auth/auth.service';
import { Juego } from 'src/app/interface/juego';
import { JuegoLista } from 'src/app/interface/juegoLista';
import { Logros } from 'src/app/interface/logros';

const USR_RAIZ = "userLogin";
const KEY_RAIZ = "keyLogin";

@Injectable({
  providedIn: 'root'
})
export class DataRAService {
  private datosUser: UserRA = this.getDefaultUserRA();
  private apiKey: string = '';
  private ultimoJuego: Juego = {} as Juego;
  private juegosJugados: JuegoLista[] = [];
  private ultimosLogros:Logros[]=[];

  constructor(private storage: Storage, private http: AuthService) {
    this.init();
  }

  private async init(): Promise<void> {
    this.storage = await this.storage.create();
    await this.cargarDatos(USR_RAIZ, (data) => this.datosUser = this.validarUserRA(data));
    await this.cargarDatos(KEY_RAIZ, (data) => this.apiKey = this.validarApiKey(data));
  }

  private validarApiKey(data: any): string {
    return typeof data === 'string' ? data : '';
  }

  private validarUserRA(data: any): UserRA {
    if (data && typeof data === 'object') {
      return {
        User: data.User || '',
        UserPic: data.UserPic || '',
        MemberSince: data.MemberSince || '',
        RichPresenceMsg: data.RichPresenceMsg || '',
        LastGameID: data.LastGameID || 0,
        ContribCount: data.ContribCount || 0,
        ContribYield: data.ContribYield || 0,
        TotalPoints: data.TotalPoints || 0,
        TotalSoftcorePoints: data.TotalSoftcorePoints || 0,
        TotalTruePoints: data.TotalTruePoints || 0,
        Permissions: data.Permissions || 0,
        Untracked: data.Untracked || 0,
        ID: data.ID || 0,
        UserWallActive: data.UserWallActive || false,
        Motto: data.Motto || ''
      };
    }
    return this.getDefaultUserRA();
  }

  setUser(data: UserRA): void {
    this.datosUser = data;
    this.guardarDatos(USR_RAIZ, data);
  }

  getUser(): UserRA {
    return this.datosUser;
  }

  setKey(data: string): void {
    this.apiKey = data;
    this.guardarDatos(KEY_RAIZ, data);
  }

  getKey(): string {
    return this.apiKey;
  }

  setLastGame(data: Juego): void {
    this.ultimoJuego = data;
  }
  
  getLastGame(): Juego {
    return this.ultimoJuego;
  }

  setPlayGame(data: JuegoLista[]): void {
    this.juegosJugados = data;
  }
  getPlayGame():JuegoLista[]{
    return this.juegosJugados;
  }
  
  setLogros(data: Logros[]): void {
    this.ultimosLogros = data;
  }
  getLogros():Logros[]{
    return this.ultimosLogros;
  }


  private async cargarDatos<T>(nodo: string, callback: (data: T | null) => void): Promise<void> {
    try {
      const data = await this.storage.get(nodo);
      if (data !== null) {
        callback(data);
      } else {
        // Considerar el uso de un servicio de logging en lugar de console.log
        console.log(`Datos no encontrados para ${nodo}`);
      }
    } catch (error) {
      console.error(`Error cargando ${nodo}:`, error);
    }
  }

  private async guardarDatos<T>(nodo: string, data: T): Promise<void> {
    try {
      await this.storage.set(nodo, data);
      // Considerar el uso de un servicio de logging en lugar de console.log
      console.log(`${nodo} guardado correctamente`);
    } catch (error) {
      console.error(`Error guardando ${nodo}:`, error);
    }
  }

  async gameId(): Promise<void> {
    try {
      console.log("Datos del usuario:", this.datosUser);
      //actualizo datos de usuario

      const userSummary = await this.http.login(this.datosUser.User, this.apiKey);
      this.setUser(userSummary);
      console.log("Datos del usuario actualizado:", this.datosUser);
      const gameSummary = await this.http.sumaryGame(String(this.datosUser.LastGameID), this.apiKey);
      this.setLastGame(gameSummary);
      console.log('Último Juego:', gameSummary);
    } catch (error) {
      console.error('Error: juego no cargado.', error);
    }
  }

  async playGames(){
    try{
    const todosLosJuegos = await this.http.allPlayGame(this.datosUser.User, this.apiKey);
    this.setPlayGame(todosLosJuegos);
    } catch (error){
      console.error('Error: lista de juegos jugados .', error);
    }
  }

  async Logros(){
    try{
      const todosLosLogros= await this.http.allAchievements(this.datosUser.User, this.apiKey);
      this.setLogros(todosLosLogros);
      console.log('Último logro:', todosLosLogros);
      } catch (error){
        console.error('Error: lista de juegos jugados .', error);
      }
  }

  private getDefaultUserRA(): UserRA {
    return {
      User: '',
      UserPic: '',
      MemberSince: new Date(),
      RichPresenceMsg: '',
      LastGameID: 0,
      ContribCount: 0,
      ContribYield: 0,
      TotalPoints: 0,
      TotalSoftcorePoints: 0,
      TotalTruePoints: 0,
      Permissions: 0,
      Untracked: 0,
      ID: 0,
      UserWallActive: false,
      Motto: ''
    };
  }
}
