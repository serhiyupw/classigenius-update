import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalsFormComponent } from './globals-form.component';

describe('GlobalsFormComponent', () => {
  let component: GlobalsFormComponent;
  let fixture: ComponentFixture<GlobalsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
