import { TestBed } from '@angular/core/testing';

import { SolutionversionService } from './solutionversion.service';

describe('SolutionversionService', () => {
  let service: SolutionversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
