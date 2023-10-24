import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewusersetpasswordFormComponent } from './newusersetpassword-form.component';

describe('NewusersetpasswordFormComponent', () => {
  let component: NewusersetpasswordFormComponent;
  let fixture: ComponentFixture<NewusersetpasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewusersetpasswordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewusersetpasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
