import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionpermissionFormComponent } from './solutionpermission-form.component';

describe('SolutionpermissionFormComponent', () => {
  let component: SolutionpermissionFormComponent;
  let fixture: ComponentFixture<SolutionpermissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionpermissionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionpermissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
