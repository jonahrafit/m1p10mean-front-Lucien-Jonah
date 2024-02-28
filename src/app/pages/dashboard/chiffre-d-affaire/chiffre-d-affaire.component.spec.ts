import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreDAffaireComponent } from './chiffre-d-affaire.component';

describe('ChiffreDAffaireComponent', () => {
  let component: ChiffreDAffaireComponent;
  let fixture: ComponentFixture<ChiffreDAffaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiffreDAffaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiffreDAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
