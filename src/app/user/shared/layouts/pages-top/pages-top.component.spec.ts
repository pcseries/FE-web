import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesTopComponent } from './pages-top.component';

describe('PagesTopComponent', () => {
  let component: PagesTopComponent;
  let fixture: ComponentFixture<PagesTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
