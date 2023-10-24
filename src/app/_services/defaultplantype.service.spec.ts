import { TestBed } from '@angular/core/testing';

import { DefaultplantypeService } from './defaultplantype.service';

describe('DefaultplantypeService', () => {
  let service: DefaultplantypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultplantypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
