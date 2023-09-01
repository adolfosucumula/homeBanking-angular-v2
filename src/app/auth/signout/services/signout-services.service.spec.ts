import { TestBed } from '@angular/core/testing';

import { SignoutServicesService } from './signout-services.service';

describe('SignoutServicesService', () => {
  let service: SignoutServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignoutServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
