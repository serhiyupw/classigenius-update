import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilicensepurchaseFormComponent } from './multilicensepurchase-form.component';

describe('MultilicensepurchaseFormComponent', () => {
  let component: MultilicensepurchaseFormComponent;
  let fixture: ComponentFixture<MultilicensepurchaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultilicensepurchaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultilicensepurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
