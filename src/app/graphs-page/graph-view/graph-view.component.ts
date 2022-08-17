import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { SongStatsService } from 'app/song-stats-service';
import { graphCategory, GraphControls, graphDataType, sortDirection } from 'models/graphSelections';
import { LibraryStats, ArtistStats, TrackStats } from 'models/stat.model'
import { chartOptions } from './graphSettings';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.sass']
})
export class GraphViewComponent implements OnInit {
  libraryStats: LibraryStats[] = Array();
  artistStats: Map<string, ArtistStats> = new Map<string, ArtistStats>();
  trackStats: Map<string, TrackStats> = new Map<string, TrackStats>();

  chartXValues: string[] = Array()
  chartYValues: number[] = Array()

  chartHeight: number = 0

  @Input() graphControls: GraphControls = {
    dataType: graphDataType.Plays,
    categortyType: graphCategory.Artist,
    percent: false,
    dateMin: new Date(),
    dateMax: new Date(),
    sortDirection: sortDirection.descending
  }

  chartLabels: string[] = Array()

  chartData = [
    {
      data: Array(),
      label: ''
    },
  ];

  chartOptions = chartOptions

  artistLabels: Array<string> = Array()


  constructor(private songStatsService: SongStatsService) {}

  ngOnInit(): void {
    this.songStatsService.libraryStats.subscribe(response => this.updateLibraryStats(response))
    this.songStatsService.artistStats.subscribe(response => this.updateArtistStats(response))
    this.songStatsService.trackStats.subscribe(response => this.updateTrackStats(response))
  }

  ngOnChanges(changes: SimpleChange) {
    this.updateStats()
  }

  updateLibraryStats(libraryStats: LibraryStats[]): void{
    this.libraryStats = libraryStats
    this.updateStats()
  }

  updateArtistStats(artistStats: Map<string, ArtistStats>): void{
    this.artistStats = artistStats
    this.updateStats()
  }

  updateTrackStats(trackStats: Map<string, TrackStats>): void{
    this.trackStats = trackStats
    this.updateStats()
  }


  updateStats(){
    let mapFunc: (v: ArtistStats, k: number) => number
    let label: string
    let chartXValues = new Array()

    let stats: ArtistStats[] | TrackStats[]
    switch(this.graphControls.categortyType) {
      case graphCategory.Song: {
        stats = Array.from(this.trackStats.values())
        break;
      }
      default: {
        stats = Array.from(this.artistStats.values())
        break;
      }
    }

    switch(this.graphControls.dataType) {
      case graphDataType.Plays: {
        mapFunc = function(entry: ArtistStats | TrackStats) { return entry.totalPlays }
        label = 'Plays'
        break;
      }
      case graphDataType.Time: {
        mapFunc = function(entry: ArtistStats | TrackStats) { return Math.round(entry.totalTime / 600) / 100}
        label = 'Time (Minutes)'
        break;
      }
      case graphDataType.Skips: {
        mapFunc = function(entry: ArtistStats | TrackStats) { return entry.totalSkips }
        label = 'Skips'
        break;
      }

      default: {
        mapFunc = function(entry: ArtistStats | TrackStats) { return entry.totalSkips / entry.totalPlays }
        label = 'Skips Per Play'
        break;
      }
    }

    stats.sort((a: ArtistStats | TrackStats, b: ArtistStats | TrackStats) => (mapFunc(a, 0) > mapFunc(b, 0)) ? this.graphControls.sortDirection: -1 * this.graphControls.sortDirection)
    this.chartYValues = Array.from(stats, mapFunc)
    this.chartXValues = Array.from(stats, (entry) => entry.name)
    this.chartData = [{data: this.chartYValues, label: label}]
    this.chartHeight = this.chartYValues.length * 20 + 70
  }

}
