import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsesystemFormComponent } from './fsesystem-form.component';

describe('FsesystemFormComponent', () => {
  let component: FsesystemFormComponent;
  let fixture: ComponentFixture<FsesystemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsesystemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsesystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
