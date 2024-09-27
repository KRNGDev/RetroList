import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { IonHeader, IonThumbnail, IonMenuButton, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonButtons, IonChip, IonAvatar, IonLabel, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonList, IonGrid, IonCol, IonCardSubtitle, IonBackButton } from '@ionic/angular/standalone';
import { arrowBackOutline, fitnessOutline, walkOutline, golfOutline, restaurantOutline, bookOutline, globeOutline, colorPaletteOutline, callOutline, mailOutline, personOutline, locationOutline, closeCircle, trophyOutline, searchOutline } from 'ionicons/icons';
import { UserRA } from 'src/app/interface/usr-ra';
import { Juego } from 'src/app/interface/juego';
import { JuegoLista } from 'src/app/interface/juegoLista';
import { DataRAService } from 'src/app/servicio/data/data-ra.service';
import { Logros } from 'src/app/interface/logros';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarruselComponent } from 'src/app/component/carrusel/carrusel.component';
import { CarruselCardComponent } from 'src/app/component/carrusel-card/carrusel-card.component';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonBackButton,CarruselComponent,CarruselCardComponent, IonCardSubtitle,RouterLink, RouterLinkActive, IonCol, IonGrid, IonList, IonItem, CommonModule, IonThumbnail, IonCardContent, IonCardTitle, IonCardHeader, IonLabel, IonAvatar, IonChip, IonButtons, IonMenuButton, IonCard, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class PerfilPage implements OnInit {

  loginUser: UserRA;
  ultimoJuego: Juego = {} as Juego;
  playGames: JuegoLista[] = [];
  ultimosLogros: Logros[] = [];

  constructor(private dataUserService: DataRAService) {
    addIcons({trophyOutline,searchOutline,closeCircle,locationOutline,callOutline,mailOutline,personOutline,arrowBackOutline,fitnessOutline,walkOutline,globeOutline,restaurantOutline,bookOutline,colorPaletteOutline});
    this.loginUser = dataUserService.getUser();

  }
  getDate(){
    const fechaOriginal= this.loginUser.MemberSince;
    const fecha= new Date(fechaOriginal);
// Extraer el día, mes y año
const dia = fecha.getDate().toString().padStart(2, '0'); // Asegura que sea de dos dígitos
const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
const año = fecha.getFullYear();

const fechaFormateada = `${dia}/${mes}/${año}`;

    return fechaFormateada;
  }

  getLogin(): UserRA {
    this.loginUser = this.dataUserService.getUser();
    return this.loginUser;
  }

  async getJuego(): Promise<Juego> {
    await this.dataUserService.gameId();
    this.ultimoJuego = this.dataUserService.getLastGame();
    console.log("cojo juego ", this.ultimoJuego.Title);
    return this.ultimoJuego;
  }

  async getPlayGames(): Promise<JuegoLista[]> {
    try {
      await this.dataUserService.playGames();
      this.playGames = this.dataUserService.getPlayGame();
      return this.playGames;
    } catch (error) {
      console.error('Error obteniendo los juegos:', error);
      // Considera lanzar el error o devolver un array vacío en caso de error
      throw error;
    }
  }
  async getUltimosLogros(): Promise<Logros[]> {
    try {
      await this.dataUserService.Logros();
      this.ultimosLogros = this.dataUserService.getLogros();
      return this.ultimosLogros;
    } catch (error) {
      console.error('Error obteniendo los logros:', error);
      // Considera lanzar el error o devolver un array vacío en caso de error
      throw error;
    }
  }

  ngOnInit(): void {
    this.getJuego();
    this.getPlayGames();
    this.getUltimosLogros();

  }
}
