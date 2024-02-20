import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeComponent } from './manage-employe.component';

describe('ManageEmployeComponent', () => {
  let component: ManageEmployeComponent;
  let fixture: ComponentFixture<ManageEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
