import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTitleComponent } from './top-title.component';

describe('TopTitleComponent', () => {
  let component: TopTitleComponent;
  let fixture: ComponentFixture<TopTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
