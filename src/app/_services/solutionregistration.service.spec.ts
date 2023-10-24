import { TestBed } from '@angular/core/testing';

import { SolutionregistrationService } from './solutionregistration.service';

describe('SolutionregistrationService', () => {
  let service: SolutionregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
