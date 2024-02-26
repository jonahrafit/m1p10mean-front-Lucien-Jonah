import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutHoraireTravailComponent } from './ajout-horaire-travail.component';

describe('AjoutHoraireTravailComponent', () => {
  let component: AjoutHoraireTravailComponent;
  let fixture: ComponentFixture<AjoutHoraireTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutHoraireTravailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutHoraireTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
