import { TestBed, inject } from '@angular/core/testing';

import { TopProductsService } from './top-products.service';

describe('TopProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopProductsService]
    });
  });

  it('should be created', inject([TopProductsService], (service: TopProductsService) => {
    expect(service).toBeTruthy();
  }));
});
