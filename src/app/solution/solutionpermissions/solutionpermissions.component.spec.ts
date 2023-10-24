import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionpermissionsComponent } from './solutionpermissions.component';

describe('SolutionpermissionsComponent', () => {
  let component: SolutionpermissionsComponent;
  let fixture: ComponentFixture<SolutionpermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionpermissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionpermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
