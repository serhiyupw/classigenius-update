import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseupgradeFormComponent } from './licenseupgrade-form.component';

describe('LicenseupgradeFormComponent', () => {
  let component: LicenseupgradeFormComponent;
  let fixture: ComponentFixture<LicenseupgradeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseupgradeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseupgradeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
