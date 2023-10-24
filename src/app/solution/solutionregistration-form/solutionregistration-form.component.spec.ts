import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionregistrationFormComponent } from './solutionregistration-form.component';

describe('SolutionregistrationFormComponent', () => {
  let component: SolutionregistrationFormComponent;
  let fixture: ComponentFixture<SolutionregistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionregistrationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionregistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
