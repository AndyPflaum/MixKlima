import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteOrdersComponent } from './dialog-delete-orders.component';

describe('DialogDeleteOrdersComponent', () => {
  let component: DialogDeleteOrdersComponent;
  let fixture: ComponentFixture<DialogDeleteOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeleteOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
