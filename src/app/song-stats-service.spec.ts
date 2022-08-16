import { TestBed } from '@angular/core/testing';

import { SongStatsService } from './song-stats-service';

describe('SongStatsServiceService', () => {
  let service: SongStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
