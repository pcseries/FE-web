import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProductsComponent } from './see-products.component';

describe('SeeProductsComponent', () => {
  let component: SeeProductsComponent;
  let fixture: ComponentFixture<SeeProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
