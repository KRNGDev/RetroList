import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonMenuButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonFooter, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonLabel, IonText, IonImg, IonItem, IonCardSubtitle, IonChip, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/servicio/auth/auth.service';
import { DataRAService } from 'src/app/servicio/data/data-ra.service';
import { Juego } from 'src/app/interface/juego';
import { addIcons } from 'ionicons';
import{arrowBackOutline } from 'ionicons/icons';
import { CarruselCardComponent } from 'src/app/component/carrusel-card/carrusel-card.component';

@Component({
  selector: 'app-ficha-juego',
  templateUrl: './ficha-juego.page.html',
  styleUrls: ['./ficha-juego.page.scss'],
  standalone: true,
  imports: [IonBackButton,CarruselCardComponent, IonChip, IonCardSubtitle, IonItem, IonImg, IonText, IonLabel, IonCol, IonRow, IonGrid, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonIcon, IonButton, IonFooter, IonButtons,IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FichaJuegoPage implements OnInit {
  private dato:string='';
   juego:Juego={}as Juego;

  constructor(private activatedRoute:ActivatedRoute,private location: Location,private http: AuthService,private datosService : DataRAService) { 
    addIcons({arrowBackOutline});
  }



  //ESta AMl revisar 
  async mostrarJuego(): Promise<Juego>{
    try{
    const gameSummary = await this.http.sumaryGame(this.dato, this.datosService.getKey());
     this.juego=gameSummary;
     return this.juego;
    } catch (error) {
      console.error('Error: juego no cargado.', error);
     return this.juego;
    }

  }

  pagAtras() {
    this.location.back();
  }

  ngOnInit() {
    this.dato = this.activatedRoute.snapshot.paramMap.get('id') as string;
    console.log(this.dato);
    this.mostrarJuego();
  }

}
