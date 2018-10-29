import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCNComponent } from './test-cn.component';

describe('TestCNComponent', () => {
  let component: TestCNComponent;
  let fixture: ComponentFixture<TestCNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
