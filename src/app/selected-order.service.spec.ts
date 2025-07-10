import { TestBed } from '@angular/core/testing';

import { SelectedOrderService } from './selected-order.service';

describe('SelectedOrderService', () => {
  let service: SelectedOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
