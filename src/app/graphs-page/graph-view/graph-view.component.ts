import { Component, OnInit } from '@angular/core';
import { SongStatsService } from 'app/song-stats-service';
import { LibraryStats, ArtistStats } from 'models/stat.model'

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.sass']
})
export class GraphViewComponent implements OnInit {
  libraryStats: LibraryStats[] = Array();
  artistStats: Map<string, ArtistStats> = new Map<string, ArtistStats>();
  artistList: string[] = Array()

  constructor(private songStatsService: SongStatsService) { }

  ngOnInit(): void {
    this.songStatsService.libraryStats.subscribe(response => this.libraryStats = response)
    this.songStatsService.artistStats.subscribe(response => this.artistStats = this.updateArtistStats(response))
  }

  updateArtistStats(artistStats: Map<string, ArtistStats>): Map<string, ArtistStats>{
    this.artistList = [ ...artistStats.keys()]
    return artistStats
  }


}
