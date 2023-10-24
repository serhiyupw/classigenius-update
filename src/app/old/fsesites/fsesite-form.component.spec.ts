import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsesiteFormComponent } from './fsesite-form.component';

describe('FsesiteFormComponent', () => {
  let component: FsesiteFormComponent;
  let fixture: ComponentFixture<FsesiteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsesiteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsesiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
