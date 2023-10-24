import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionversionsComponent } from './solutionversions.component';

describe('SolutionversionsComponent', () => {
  let component: SolutionversionsComponent;
  let fixture: ComponentFixture<SolutionversionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionversionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionversionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
