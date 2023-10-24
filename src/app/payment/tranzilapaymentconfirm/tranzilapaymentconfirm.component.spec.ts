import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranzilapaymentconfirmComponent } from './tranzilapaymentconfirm.component';

describe('TranzilapaymentconfirmComponent', () => {
  let component: TranzilapaymentconfirmComponent;
  let fixture: ComponentFixture<TranzilapaymentconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranzilapaymentconfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranzilapaymentconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
