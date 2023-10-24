import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsesitesComponent } from './fsesites.component';

describe('FsesitesComponent', () => {
  let component: FsesitesComponent;
  let fixture: ComponentFixture<FsesitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsesitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsesitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
