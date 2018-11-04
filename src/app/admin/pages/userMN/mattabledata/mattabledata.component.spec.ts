import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MattabledataComponent } from './mattabledata.component';

describe('MattabledataComponent', () => {
  let component: MattabledataComponent;
  let fixture: ComponentFixture<MattabledataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MattabledataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MattabledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
