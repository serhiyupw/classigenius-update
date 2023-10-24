import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegratorsComponent } from './integrators.component';

describe('IntegratorsComponent', () => {
  let component: IntegratorsComponent;
  let fixture: ComponentFixture<IntegratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
