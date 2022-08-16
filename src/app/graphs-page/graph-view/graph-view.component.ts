import { Component, OnInit } from '@angular/core';
import { SongStatsService } from 'app/song-stats-service';
import { ChartScales, NestedTickOptions } from 'chart.js';
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
  artistPlaysList: number[] = Array()

  chartHeight: number = 0

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


  constructor(private songStatsService: SongStatsService) { }

  ngOnInit(): void {
    this.songStatsService.libraryStats.subscribe(response => this.libraryStats = response)
    this.songStatsService.artistStats.subscribe(response => this.artistStats = this.updateArtistStats(response))
  }

  updateArtistStats(artistStats: Map<string, ArtistStats>): Map<string, ArtistStats>{
    this.artistList = [ ...artistStats.keys()]
    this.artistPlaysList = Array.from(artistStats.values(), (entry) => (entry.totalPlays))
    this.chartData = [{data: this.artistPlaysList, label: 'plays'}]
    this.chartHeight = this.chartData[0].data.length * 20
    console.log(this.chartHeight)
    // this.updateGraph(artistStats)
    return artistStats
  }

  artistMapFunc( artist: ArtistStats): {data: number[], label: string}{
    let label: string = artist.name;
    let data: number = artist.totalPlays;
    return {data: [data], label: label}
  }

  updateGraph(artistStats: Map<string, ArtistStats>){
    let result: {data: number[], label: string}[] = Array.from(artistStats.values(), (entry) => this.artistMapFunc(entry))
    if (result.length > 10){
      this.chartData = result.slice(0,10)
    } else {
      this.chartData = result;
    }
  }


}
