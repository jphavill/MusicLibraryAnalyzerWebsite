import { TestBed } from '@angular/core/testing';

import { SongStatsServiceService } from './song-stats-service';

describe('SongStatsServiceService', () => {
  let service: SongStatsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongStatsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
