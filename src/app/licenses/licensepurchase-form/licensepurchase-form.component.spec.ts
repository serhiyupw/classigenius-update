import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensepurchaseFormComponent } from './licensepurchase-form.component';

describe('LicensepurchaseFormComponent', () => {
  let component: LicensepurchaseFormComponent;
  let fixture: ComponentFixture<LicensepurchaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicensepurchaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicensepurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
