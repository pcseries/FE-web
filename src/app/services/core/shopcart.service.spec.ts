import { TestBed, inject } from '@angular/core/testing';

import { ShopcartService } from './shopcart.service';

describe('ShopcartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopcartService]
    });
  });

  it('should be created', inject([ShopcartService], (service: ShopcartService) => {
    expect(service).toBeTruthy();
  }));
});
