import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/servicio/auth/auth.service';
import { Router } from '@angular/router';

import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonLabel, IonItem, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage {
  username: string = '';
  apiKey: string = '';

  constructor(private router: Router,private retroAuthService: AuthService, private alertCtrl: AlertController) {}

  async login() {
    if (this.username && this.apiKey) {
      try {
        const userSummary = await this.retroAuthService.login(this.username, this.apiKey);
        console.log('Inicio de sesión exitoso:', userSummary);


        this.router.navigate(['/home']);
        // Guardar el estado de la sesión, redirigir o cualquier otra acción necesaria
      } catch (error) {
        this.showAlert('Error', 'Inicio de sesión fallido. Verifica tus credenciales.');
      }
    } else {
      this.showAlert('Error', 'Por favor, ingresa el nombre de usuario y la clave API.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}