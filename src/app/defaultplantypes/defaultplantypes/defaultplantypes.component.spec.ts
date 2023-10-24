import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultplantypesComponent } from './defaultplantypes.component';

describe('DefaultplantypesComponent', () => {
  let component: DefaultplantypesComponent;
  let fixture: ComponentFixture<DefaultplantypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultplantypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultplantypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
