import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MADOComponent } from './mado.component';

describe('MADOComponent', () => {
  let component: MADOComponent;
  let fixture: ComponentFixture<MADOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MADOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MADOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
