import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logros } from 'src/app/interface/logros';

register();

@Component({
  selector: 'app-carrusel-card',
  templateUrl: './carrusel-card.component.html',
  styleUrls: ['./carrusel-card.component.scss'],
  standalone: true,
  imports: [ CommonModule,RouterLink,RouterLinkActive ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarruselCardComponent   {

  @Input() logros:Logros[]=[];
  
  constructor() { }

 

}
