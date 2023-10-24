import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultplantypeFormComponent } from './defaultplantype-form.component';

describe('DefaultplantypeFormComponent', () => {
  let component: DefaultplantypeFormComponent;
  let fixture: ComponentFixture<DefaultplantypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultplantypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultplantypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
