import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseactivationsComponent } from './licenseactivations.component';

describe('LicenseactivationsComponent', () => {
  let component: LicenseactivationsComponent;
  let fixture: ComponentFixture<LicenseactivationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseactivationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseactivationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
