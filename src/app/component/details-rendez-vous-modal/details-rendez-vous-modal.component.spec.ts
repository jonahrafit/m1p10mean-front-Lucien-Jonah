import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRendezVousModalComponent } from './details-rendez-vous-modal.component';

describe('DetailsRendezVousModalComponent', () => {
  let component: DetailsRendezVousModalComponent;
  let fixture: ComponentFixture<DetailsRendezVousModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsRendezVousModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsRendezVousModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
