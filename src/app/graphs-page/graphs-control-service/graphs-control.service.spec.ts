import { TestBed } from '@angular/core/testing';

import { GraphsControlService } from './graphs-control.service';
import { graphControlsDefault } from 'models/graphSelections';

describe('GraphsControlService', () => {
  let service: GraphsControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphsControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set default graph controls', () => {
    expect(service.graphControls.getValue()).toBe(graphControlsDefault)
  });
});
