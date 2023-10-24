import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegratorFormComponent } from './integrator-form.component';

describe('IntegratorFormComponent', () => {
  let component: IntegratorFormComponent;
  let fixture: ComponentFixture<IntegratorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegratorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
