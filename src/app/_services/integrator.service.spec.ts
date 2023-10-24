import { TestBed } from '@angular/core/testing';

import { IntegratorService } from './integrator.service';

describe('IntegratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntegratorService = TestBed.get(IntegratorService);
    expect(service).toBeTruthy();
  });
});
