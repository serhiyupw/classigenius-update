import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsesystemsComponent } from './fsesystems.component';

describe('FsesystemsComponent', () => {
  let component: FsesystemsComponent;
  let fixture: ComponentFixture<FsesystemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsesystemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsesystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
