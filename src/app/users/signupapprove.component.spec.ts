import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupapproveComponent } from './signupapprove.component';

describe('SignupapproveComponent', () => {
  let component: SignupapproveComponent;
  let fixture: ComponentFixture<SignupapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
