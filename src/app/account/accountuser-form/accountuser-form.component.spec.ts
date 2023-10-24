import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountuserFormComponent } from './accountuser-form.component';

describe('AccountuserFormComponent', () => {
  let component: AccountuserFormComponent;
  let fixture: ComponentFixture<AccountuserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountuserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountuserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
