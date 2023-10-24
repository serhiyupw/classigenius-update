import { TestBed } from '@angular/core/testing';

import { SolutionpermissionService } from './solutionpermission.service';

describe('SolutionpermissionService', () => {
  let service: SolutionpermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionpermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
