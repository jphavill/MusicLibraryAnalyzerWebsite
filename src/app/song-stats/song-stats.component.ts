import { Component, OnInit } from '@angular/core';
import { SongStatsService } from 'app/song-stats-service';
import { Track } from 'models/library.model';
import { LibraryStats } from 'models/stat.model';

@Component({
  selector: 'app-song-stats',
  templateUrl: './song-stats.component.html',
  styleUrls: ['./song-stats.component.sass']
})
export class SongStatsComponent implements OnInit {
  loading:boolean = false;
  libraryLoaded:boolean = false;
  library: Track[] = Array();
  libraryStats: LibraryStats[] = Array();
  displayedColumns: string[] = ['Artist Name', 'Track Name'];
  displayedColumnsLS: string[] = ['Total Plays', 'Total Time', 'Total Skips'];

  constructor(private songStatsService: SongStatsService) { }

  ngOnInit(): void {
    this.songStatsService.library.subscribe(response => this.library = this.songStatsService.updateLibraryStats(response))
    this.songStatsService.libraryStats.subscribe(response => this.libraryStats = response)
  }

}
