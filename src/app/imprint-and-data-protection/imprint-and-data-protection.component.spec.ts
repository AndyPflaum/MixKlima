import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintAndDataProtectionComponent } from './imprint-and-data-protection.component';

describe('ImprintAndDataProtectionComponent', () => {
  let component: ImprintAndDataProtectionComponent;
  let fixture: ComponentFixture<ImprintAndDataProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintAndDataProtectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImprintAndDataProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
