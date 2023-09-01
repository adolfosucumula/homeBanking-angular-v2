import { TestBed } from '@angular/core/testing';

import { SignupServicesService } from './signup-services.service';

describe('SignupServicesService', () => {
  let service: SignupServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
