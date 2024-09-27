import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Juego } from 'src/app/interface/juego';
import { JuegoLista } from 'src/app/interface/juegoLista';
import { register } from 'swiper/element/bundle';

import { RouterLink, RouterLinkActive } from '@angular/router';

register();

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
  standalone: true,
  imports: [ CommonModule,RouterLink,RouterLinkActive ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarruselComponent {
  @Input() juegos:JuegoLista[]=[];
}
