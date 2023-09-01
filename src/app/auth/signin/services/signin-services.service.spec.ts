import { TestBed } from '@angular/core/testing';

import { SigninServicesService } from './signin-services.service';

describe('SigninServicesService', () => {
  let service: SigninServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
