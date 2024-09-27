import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FichaJuegoPage } from './ficha-juego.page';

describe('FichaJuegoPage', () => {
  let component: FichaJuegoPage;
  let fixture: ComponentFixture<FichaJuegoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaJuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
