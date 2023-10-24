import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteplanFormComponent } from './siteplan-form.component';

describe('SiteplanFormComponent', () => {
  let component: SiteplanFormComponent;
  let fixture: ComponentFixture<SiteplanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteplanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteplanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
