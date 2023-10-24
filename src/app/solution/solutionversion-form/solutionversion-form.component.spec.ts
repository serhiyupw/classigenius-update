import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionversionFormComponent } from './solutionversion-form.component';

describe('SolutionversionFormComponent', () => {
  let component: SolutionversionFormComponent;
  let fixture: ComponentFixture<SolutionversionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionversionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionversionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
