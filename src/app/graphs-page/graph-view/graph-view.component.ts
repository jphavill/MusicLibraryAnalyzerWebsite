import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { SongStatsService } from 'app/song-stats-service';
import { ChartScales } from 'chart.js';
import { graphCategory, GraphControls, graphDataType } from 'models/graphSelections';
import { LibraryStats, ArtistStats, TrackStats } from 'models/stat.model'

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.sass']
})
export class GraphViewComponent implements OnInit {
  libraryStats: LibraryStats[] = Array();
  artistStats: Map<string, ArtistStats> = new Map<string, ArtistStats>();
  artistList: string[] = Array()
  artistDataList: number[] = Array()

  chartHeight: number = 0

  @Input() graphControls: GraphControls = {
    dataType: graphDataType.Plays,
    categortyType: graphCategory.Artist,
    percent: false,
    dateMin: new Date(),
    dateMax: new Date()
  }

  chartData = [
    {
      data: [1],
      label: 'Account A'
    },
  ];

  scales: ChartScales = {
    xAxes: [
      {
          position: 'top',
          ticks: {
              maxRotation: 90,
              minRotation: 80
          }
      }

  ],
  yAxes: [
    {
        ticks: {

            callback: function(value) {
              let valueS = (value as string)
              if (valueS.length <= 23) {
                return valueS
              }
              return valueS.substring(0, 20) + '...'
            },
            maxRotation: 90,
            minRotation: 0
        }

    }
  ]
  }

  chartOptions = {
    responsive: true,
    scales: this.scales,
    maintainAspectRatio: false
  };

  artistLabels: Array<string> = Array()


  constructor(private songStatsService: SongStatsService) {}

  ngOnInit(): void {
    this.songStatsService.libraryStats.subscribe(response => this.libraryStats = response)
    this.songStatsService.artistStats.subscribe(response => this.updateArtistStats(response))
  }

  ngOnChanges(changes: SimpleChange) {
    console.log(changes)
    this.updateArtistStats(this.artistStats)
  }

  updateArtistStats(artistStats: Map<string, ArtistStats>): Map<string, ArtistStats>{
    this.artistStats = artistStats
    let mapFunc
    let label: string
    switch(this.graphControls.dataType) {
      case graphDataType.Plays: {
        mapFunc = function(entry: ArtistStats | TrackStats) { return entry.totalPlays }
        label = 'Plays'
        break;
      }
      case graphDataType.Time: {
        mapFunc = function(entry: ArtistStats | TrackStats) { return entry.totalTime }
        label = 'Time'
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

    this.artistDataList = Array.from(artistStats.values(), mapFunc)
    this.artistList = [ ...artistStats.keys()]
    this.chartData = [{data: this.artistDataList, label: label}]
    this.chartHeight = this.chartData[0].data.length * 20
    return artistStats
  }

}
