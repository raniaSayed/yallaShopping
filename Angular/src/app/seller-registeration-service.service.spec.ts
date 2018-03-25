import { TestBed, inject } from '@angular/core/testing';

import { SellerRegisterationServiceService } from './seller-registeration-service.service';

describe('SellerRegisterationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerRegisterationServiceService]
    });
  });

  it('should be created', inject([SellerRegisterationServiceService], (service: SellerRegisterationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
