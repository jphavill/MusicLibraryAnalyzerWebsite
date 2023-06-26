import { Component, OnInit, SimpleChange } from '@angular/core';
import { SongStatsService } from 'app/song-stats-service';
import { ChartOptions } from 'chart.js';
import { graphCategory, GraphControls, graphControlsDefault, graphDataType } from 'models/graphSelections';
import { LibraryStats, ArtistStats, TrackStats } from 'models/stat.model'
import { GraphsControlService } from '../graphs-control-service/graphs-control.service';
import { ChartElement, chartOptions, chartOptionsPercent } from './graphSettings';

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

  graphControls: GraphControls = graphControlsDefault

  chartLabels: string[] = Array()

  chartData = [
    {
      data: Array(),
      label: ''
    },
  ];

  chartOptions: ChartOptions = chartOptions

  artistLabels: Array<string> = Array()

  selectedIndex: number = -1
  isMobileLayout: boolean = false

  stats: ArtistStats[] | TrackStats[] = Array()


  constructor(private songStatsService: SongStatsService, private graphControlService: GraphsControlService) {}

  ngOnInit(): void {
    this.songStatsService.libraryStats.subscribe(response => this.updateLibraryStats(response))
    this.songStatsService.artistStats.subscribe(response => this.updateArtistStats(response))
    this.songStatsService.trackStats.subscribe(response => this.updateTrackStats(response))

    this.graphControlService.graphControls.subscribe(response => this.updateControls(response))
    this.updateStats()
    window.onresize = () => this.isMobileLayout = window.innerWidth < 1050;
  }

  updateSelected( active: Array<ChartElement>){
    if (active.length > 0){
      this.selectedIndex = active[0]._index
    }
  }



  updateControls(controls: GraphControls){
    this.graphControls = controls
    this.updateStats()
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
    let mapFunc: (v: ArtistStats | TrackStats) => number
    let label: string

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

    label = this.graphControls.percent ? "% of All " + label : label
    let totalToDivide: number
    if (this.graphControls.percent) {
      this.chartOptions = chartOptionsPercent
      totalToDivide =  Array.from(stats, mapFunc).reduce((totalToDivide, current) => totalToDivide + current)
    } else {
      this.chartOptions = chartOptions
    }

    this.chartOptions.onClick = (event: PointerEvent, active: Array<ChartElement> ) => { this.updateSelected(active) }

    stats.sort((a: ArtistStats | TrackStats, b: ArtistStats | TrackStats) => (mapFunc(a) > mapFunc(b)) ? this.graphControls.sortDirection: -1 * this.graphControls.sortDirection)
    this.stats = stats
    this.chartYValues = this.graphControls.percent? Array.from(stats, mapFunc).map((entry) => entry / totalToDivide * 100) : Array.from(stats, mapFunc)
    this.chartXValues = Array.from(stats, (entry) => entry.name)
    this.chartData = [{data: this.chartYValues, label: label}]
    this.chartHeight = this.chartYValues.length * 20 + 70
    this.selectedIndex = -1
  }

}
