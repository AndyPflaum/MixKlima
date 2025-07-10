import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAirConditioningComponent } from './dialog-add-air-conditioning.component';

describe('DialogAddAirConditioningComponent', () => {
  let component: DialogAddAirConditioningComponent;
  let fixture: ComponentFixture<DialogAddAirConditioningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddAirConditioningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddAirConditioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
