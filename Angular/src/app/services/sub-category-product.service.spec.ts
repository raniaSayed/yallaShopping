import { TestBed, inject } from '@angular/core/testing';

import { SubCategoryProductService } from './sub-category-product.service';

describe('SubCategoryProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubCategoryProductService]
    });
  });

  it('should be created', inject([SubCategoryProductService], (service: SubCategoryProductService) => {
    expect(service).toBeTruthy();
  }));
});
