import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { IonHeader, IonMenuButton, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonButtons } from '@ionic/angular/standalone';
import { arrowBackOutline, fitnessOutline, walkOutline, golfOutline, restaurantOutline, bookOutline, globeOutline, colorPaletteOutline } from 'ionicons/icons';
import { DataRAService } from '../servicio/data/data-ra.service';
import { UserRA } from '../interface/usr-ra';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, IonCard, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  loginUser: UserRA ;
  constructor(private dataUserService: DataRAService) {
    addIcons({ arrowBackOutline, fitnessOutline, walkOutline, globeOutline, restaurantOutline, bookOutline, colorPaletteOutline });   
    this.loginUser = dataUserService.getUser();
   
  }

  getLogin():UserRA{
    this.loginUser = this.dataUserService.getUser();    
    return this.loginUser ;
  }

boton(){
  console.log("muestra key "+this.dataUserService.getKey());
}



}
