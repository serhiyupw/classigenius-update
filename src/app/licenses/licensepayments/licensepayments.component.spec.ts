import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensepaymentsComponent } from './licensepayments.component';

describe('LicensepaymentsComponent', () => {
  let component: LicensepaymentsComponent;
  let fixture: ComponentFixture<LicensepaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicensepaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicensepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
