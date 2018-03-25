import { TestBed, inject } from '@angular/core/testing';

import { UserRegisterationService } from './user-registeration.service';

describe('UserRegisterationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRegisterationService]
    });
  });

  it('should be created', inject([UserRegisterationService], (service: UserRegisterationService) => {
    expect(service).toBeTruthy();
  }));
});
