import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { IonHeader,IonThumbnail, IonMenuButton, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonButtons, IonChip, IonAvatar, IonLabel, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonList, IonGrid, IonCol } from '@ionic/angular/standalone';
import { arrowBackOutline, fitnessOutline, walkOutline, golfOutline, restaurantOutline, bookOutline, globeOutline, colorPaletteOutline, callOutline, mailOutline, personOutline, locationOutline } from 'ionicons/icons';
import { DataRAService } from '../servicio/data/data-ra.service';
import { UserRA } from '../interface/usr-ra';
import { environment } from 'src/environments/environment.prod';
import { Juego } from '../interface/juego';
import { JuegoLista } from '../interface/juegoLista';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCol, IonGrid, IonList, IonItem,CommonModule,IonThumbnail, IonCardContent, IonCardTitle, IonCardHeader, IonLabel, IonAvatar, IonChip, IonButtons, IonMenuButton, IonCard, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  loginUser: UserRA ;
  ultimoJuego:Juego= {} as Juego;
  playGames:JuegoLista[]=[];

  constructor(private dataUserService: DataRAService) {
    addIcons({callOutline,mailOutline,personOutline,locationOutline,arrowBackOutline,fitnessOutline,walkOutline,globeOutline,restaurantOutline,bookOutline,colorPaletteOutline});   
    this.loginUser = dataUserService.getUser();
   
  }

  getLogin():UserRA{
    this.loginUser = this.dataUserService.getUser();    
    return this.loginUser ;
  }
  
  async getJuego():Promise<Juego>{
    await this.dataUserService.gameId();
    this.ultimoJuego=this.dataUserService.getLastGame();
    console.log("cojo juego ",this.ultimoJuego.Title);
    return this.ultimoJuego;
  }

  async getPlayGames():Promise<JuegoLista[]>{
    try {
    await this.dataUserService.playGames();
    this.playGames=this.dataUserService.getPlayGame();
    return this.playGames;
  } catch (error) {
    console.error('Error obteniendo los juegos:', error);
    // Considera lanzar el error o devolver un array vacío en caso de error
    throw error;
  }
    
  }
  

boton(){
  console.log("muestra key "+this.dataUserService.getKey());
}


ngOnInit(): void {
    this.getJuego();
    this.getPlayGames();
    
}
}
