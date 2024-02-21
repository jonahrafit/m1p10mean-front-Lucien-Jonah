import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeDetailsComponent } from './manage-employe-details.component';

describe('ManageEmployeDetailsComponent', () => {
  let component: ManageEmployeDetailsComponent;
  let fixture: ComponentFixture<ManageEmployeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmployeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageEmployeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
