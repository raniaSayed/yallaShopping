import { TestBed, inject } from '@angular/core/testing';

import { GetSellerProductsService } from './get-seller-products.service';

describe('GetSellerProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSellerProductsService]
    });
  });

  it('should be created', inject([GetSellerProductsService], (service: GetSellerProductsService) => {
    expect(service).toBeTruthy();
  }));
});
