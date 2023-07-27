import { TestBed } from '@angular/core/testing';

import { ProductServerService } from './product-server.service';

describe('ProductServerService', () => {
  let service: ProductServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
