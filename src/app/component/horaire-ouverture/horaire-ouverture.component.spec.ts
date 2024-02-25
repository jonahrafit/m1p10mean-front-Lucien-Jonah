import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireOuvertureComponent } from './horaire-ouverture.component';

describe('HoraireOuvertureComponent', () => {
  let component: HoraireOuvertureComponent;
  let fixture: ComponentFixture<HoraireOuvertureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoraireOuvertureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoraireOuvertureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
