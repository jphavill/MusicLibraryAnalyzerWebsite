import { TestBed } from '@angular/core/testing';

import { GraphsControlService } from './graphs-control.service';

describe('GraphsControlService', () => {
  let service: GraphsControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphsControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
