import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegratorplansComponent } from './integratorplans.component';

describe('IntegratorplansComponent', () => {
  let component: IntegratorplansComponent;
  let fixture: ComponentFixture<IntegratorplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegratorplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegratorplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
