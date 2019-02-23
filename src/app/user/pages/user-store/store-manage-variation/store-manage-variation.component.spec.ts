import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManageVariationComponent } from './store-manage-variation.component';

describe('StoreManageVariationComponent', () => {
  let component: StoreManageVariationComponent;
  let fixture: ComponentFixture<StoreManageVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreManageVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreManageVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
