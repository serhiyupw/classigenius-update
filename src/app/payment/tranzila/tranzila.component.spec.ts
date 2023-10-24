import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranzilaComponent } from './tranzila.component';

describe('TranzilaComponent', () => {
  let component: TranzilaComponent;
  let fixture: ComponentFixture<TranzilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranzilaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranzilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
