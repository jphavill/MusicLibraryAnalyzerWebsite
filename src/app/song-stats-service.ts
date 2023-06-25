import { Injectable, OnInit } from '@angular/core';
import { GraphControls, graphControlsDefault } from 'models/graphSelections';
import { Track } from 'models/library.model';
import { ArtistStats, LibraryStats, TrackStats } from 'models/stat.model';
import { BehaviorSubject } from 'rxjs';
import { GraphsControlService } from './graphs-page/graphs-control-service/graphs-control.service';

@Injectable({
  providedIn: 'root'
})
export class SongStatsService implements OnInit{
  // inital value of empty array since no library loaded
  private _library: BehaviorSubject<Track[]> = new BehaviorSubject(Array());
  private _libraryStats: BehaviorSubject<LibraryStats[]> = new BehaviorSubject(Array());
  private _artistStats: BehaviorSubject<Map<string, ArtistStats>> = new BehaviorSubject(new Map<string, ArtistStats>());
  private _songStats: BehaviorSubject<Map<string, TrackStats>> = new BehaviorSubject(new Map<string, TrackStats>());

  // publically accessible data
  public readonly library: BehaviorSubject<Track[]> = this._library;
  public readonly libraryStats: BehaviorSubject<LibraryStats[]> = this._libraryStats;
  public readonly artistStats: BehaviorSubject<Map<string, ArtistStats>> = this._artistStats;
  public readonly trackStats: BehaviorSubject<Map<string, TrackStats>> = this._songStats;

  private graphControls: GraphControls = graphControlsDefault

  constructor(private graphControlsService: GraphsControlService) {

    this.graphControlsService.graphControls.subscribe(response => this.updateGraphControls(response))
  }


  ngOnInit(): void {

  }
  // updates all subscribed components with the new library
  sendLibrary(library: Track[]){
    if (library.length > 0){
      this.graphControls.dateMin = new Date(library[0].endTime)
      this.graphControls.dateMax = new Date(library[library.length-1].endTime)
      this.graphControlsService.sendControls(this.graphControls)
    }
    this._library.next(library)
  }

  sendLibraryStats(libraryStats: LibraryStats[]){
    this._libraryStats.next(libraryStats)
  }

  sendArtistStats(artistStats: Map<string, ArtistStats>){
    this._artistStats.next(artistStats)
  }

  sendTrackStats(songStats: Map<string, TrackStats>){
    this._songStats.next(songStats)
  }

  updateGraphControls(graphControls: GraphControls){
    this.graphControls = graphControls
    this.updateLibraryStats(this.library.getValue())
  }

  updateLibraryStats(library: Track[]){
    // Library Stats
    let totalTime: number = 0;
    let totalSkips: number = 0;
    let totalPlays: number = library.length;
    let firstDate: Date = new Date();
    let lastDate: Date = new Date();
    if (library.length > 0){
      firstDate = library[0].endTime;
      lastDate = library[library.length-1].endTime;
    }

    // Artist Stats
    let tempArtistStats = new Map<string, ArtistStats>()
    let tempTrackStats = new Map<string, TrackStats>()

    // Song Stats
    library = library.filter((track: Track) => (new Date(track.endTime) >= this.graphControls.dateMin) && (new Date(track.endTime) <= this.graphControls.dateMax))
    library.forEach(track => {
      let skip: boolean = track.msPlayed < 5000
      totalTime = totalTime + track.msPlayed;
      // if the track was played for less than 5 seconds it is considered skipped
      if (skip) {
        totalSkips = totalSkips + 1;
      }

      // Artist Stats
      if (!tempArtistStats.has(track.artistName)){
        tempArtistStats.set(track.artistName, {
          "name": track.artistName,
          "totalPlays": 1,
          "totalTime": track.msPlayed,
          "totalSkips": skip ? 1 : 0,
        })
      } else {
        let tempArtistStat: ArtistStats = tempArtistStats.get(track.artistName)!
        tempArtistStats.set(track.artistName, {
          "name": track.artistName,
          "totalPlays": tempArtistStat.totalPlays + 1,
          "totalTime": tempArtistStat.totalTime + track.msPlayed,
          "totalSkips": tempArtistStat.totalSkips + (skip ? 1 : 0),
        })
      }

      // Track Stats

      if (!tempTrackStats.has(track.trackName)){
        tempTrackStats.set(track.trackName, {
          "name": track.trackName,
          "totalPlays": 1,
          "totalTime": track.msPlayed,
          "totalSkips": skip ? 1 : 0,
          "datePlayed": track.endTime
        })
      } else {
        let tempTrackStat: TrackStats = tempTrackStats.get(track.trackName)!
        tempTrackStats.set(track.trackName, {
          "name": track.trackName,
          "totalPlays": tempTrackStat.totalPlays + 1,
          "totalTime": tempTrackStat.totalTime + track.msPlayed,
          "totalSkips": tempTrackStat.totalSkips + (skip ? 1 : 0),
          "datePlayed": track.endTime
        })
      }
    })
    this.sendLibraryStats(Array({
      "totalPlays": totalPlays,
      "totalTime": totalTime,
      "totalSkips": totalSkips,
      "averageSkips": 0,
      "stdSkips": 0,
      "firstDate": firstDate,
      "lastDate": lastDate,
    }))

    this.sendArtistStats(tempArtistStats)
    this.sendTrackStats(tempTrackStats)
    return library;
  }

}
