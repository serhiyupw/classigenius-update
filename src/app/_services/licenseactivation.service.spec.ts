import { TestBed } from '@angular/core/testing';

import { LicenseactivationService } from './licenseactivation.service';

describe('LicenseactivationService', () => {
  let service: LicenseactivationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseactivationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
