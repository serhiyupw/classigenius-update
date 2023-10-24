import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientplansComponent } from './clientplans.component';

describe('ClientplansComponent', () => {
  let component: ClientplansComponent;
  let fixture: ComponentFixture<ClientplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
