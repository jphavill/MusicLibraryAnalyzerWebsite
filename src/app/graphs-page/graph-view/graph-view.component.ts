import { Component, OnInit } from '@angular/core';
import { SongStatsService } from 'app/song-stats-service';
import { LibraryStats } from 'models/stat.model'

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.sass']
})
export class GraphViewComponent implements OnInit {
  libraryStats: LibraryStats[] = Array();

  constructor(private songStatsService: SongStatsService) { }

  ngOnInit(): void {
    this.songStatsService.libraryStats.subscribe(response => this.libraryStats = response)
  }


}
