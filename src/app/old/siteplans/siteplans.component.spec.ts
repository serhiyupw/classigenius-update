import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteplansComponent } from './siteplans.component';

describe('SiteplansComponent', () => {
  let component: SiteplansComponent;
  let fixture: ComponentFixture<SiteplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
