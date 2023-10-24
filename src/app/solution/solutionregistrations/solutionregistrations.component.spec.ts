import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionregistrationsComponent } from './solutionregistrations.component';

describe('SolutionregistrationsComponent', () => {
  let component: SolutionregistrationsComponent;
  let fixture: ComponentFixture<SolutionregistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionregistrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionregistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
