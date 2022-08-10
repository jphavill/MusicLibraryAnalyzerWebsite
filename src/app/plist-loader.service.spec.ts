import { TestBed } from '@angular/core/testing';

import { PlistLoaderService } from './plist-loader.service';

describe('PlistLoaderService', () => {
  let service: PlistLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlistLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
