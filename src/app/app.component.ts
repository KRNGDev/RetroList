import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { IonApp,IonThumbnail, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonTitle, IonFooter, IonAvatar, IonHeader, IonCard, IonCardSubtitle } from '@ionic/angular/standalone';
import { mailOutline, exit, exitOutline, exitSharp, search, searchCircle, searchOutline, searchSharp, searchCircleOutline, searchCircleSharp, library, libraryOutline, librarySharp, planet, planetOutline, planetSharp, home, homeOutline, homeSharp, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { UserRA } from './interface/usr-ra';
import { DataRAService } from './servicio/data/data-ra.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',  
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonCardSubtitle,RouterLink, RouterLinkActive,IonThumbnail, IonCard, IonHeader, IonAvatar, IonFooter, IonTitle,  CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,],
})
export class AppComponent {
  private loginUser: UserRA ;
  constructor(private dataUserService: DataRAService) {
    addIcons({ mailOutline, exit, exitOutline, exitSharp, search, searchCircle, searchOutline, searchSharp, searchCircleOutline, searchCircleSharp, library, libraryOutline, librarySharp, planet, planetOutline, planetSharp, home, homeOutline, homeSharp, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
    this.loginUser = dataUserService.getUser();
  }
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Perfil', url: '/perfil', icon: 'search' },
    { title: 'Mi lista', url: '/pages/milista', icon: 'library' },
  ];
  getLogin():UserRA{
    this.loginUser = this.dataUserService.getUser();    
    return this.loginUser ;
  }
}
