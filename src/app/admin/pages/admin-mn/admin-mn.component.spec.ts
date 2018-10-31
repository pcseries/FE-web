import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMNComponent } from './admin-mn.component';

describe('AdminMNComponent', () => {
  let component: AdminMNComponent;
  let fixture: ComponentFixture<AdminMNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
