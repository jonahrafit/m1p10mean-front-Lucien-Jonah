import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempsMoyenDeTravailComponent } from './temps-moyen-de-travail.component';

describe('TempsMoyenDeTravailComponent', () => {
  let component: TempsMoyenDeTravailComponent;
  let fixture: ComponentFixture<TempsMoyenDeTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempsMoyenDeTravailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempsMoyenDeTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
