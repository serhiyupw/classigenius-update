import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngtegrationplanFormComponent } from './ingtegrationplan-form.component';

describe('IngtegrationplanFormComponent', () => {
  let component: IngtegrationplanFormComponent;
  let fixture: ComponentFixture<IngtegrationplanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngtegrationplanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngtegrationplanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
