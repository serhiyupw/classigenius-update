import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientplanFormComponent } from './clientplan-form.component';

describe('ClientplanFormComponent', () => {
  let component: ClientplanFormComponent;
  let fixture: ComponentFixture<ClientplanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientplanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientplanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
