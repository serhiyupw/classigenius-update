import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageFormComponent } from './landingpage-form.component';

describe('LandingpageFormComponent', () => {
  let component: LandingpageFormComponent;
  let fixture: ComponentFixture<LandingpageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingpageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
