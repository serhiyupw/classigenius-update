import { TestBed } from '@angular/core/testing';

import { LicensepaymentService } from './licensepayment.service';

describe('LicensepaymentService', () => {
  let service: LicensepaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicensepaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
