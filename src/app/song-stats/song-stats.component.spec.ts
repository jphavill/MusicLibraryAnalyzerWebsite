import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongStatsComponent } from './song-stats.component';

describe('SongStatsComponent', () => {
  let component: SongStatsComponent;
  let fixture: ComponentFixture<SongStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
