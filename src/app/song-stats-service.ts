import { Injectable } from '@angular/core';
import { Track } from 'models/library.model';
import { ArtistStats, LibraryStats, TrackStats } from 'models/stat.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongStatsService {
  // inital value of empty array since no library loaded
  private _library: BehaviorSubject<Track[]> = new BehaviorSubject(Array());
  private _libraryStats: BehaviorSubject<LibraryStats[]> = new BehaviorSubject(Array());
  private _artistStats: BehaviorSubject<ArtistStats[]> = new BehaviorSubject(Array());
  private _songStats: BehaviorSubject<TrackStats[]> = new BehaviorSubject(Array());

  // publically accessible data
  public readonly library: BehaviorSubject<Track[]> = this._library;
  public readonly libraryStats: BehaviorSubject<LibraryStats[]> = this._libraryStats;
  public readonly artistStats: BehaviorSubject<ArtistStats[]> = this._artistStats;
  public readonly trackStats: BehaviorSubject<TrackStats[]> = this._songStats;
  constructor() { }

  // updates all subscribed components with the new library
  sendLibrary(library: Track[]){
    this._library.next(library)
  }

  sendLibraryStats(libraryStats: LibraryStats[]){
    this._libraryStats.next(libraryStats)
  }

  sendArtistStats(artistStats: ArtistStats[]){
    this._artistStats.next(artistStats)
  }

  sendsongStats(songStats: TrackStats[]){
    this._songStats.next(songStats)
  }

  updateLibraryStats(library: Track[]){
    let totalTime: number = 0;
    let totalSkips: number = 0;
    let totalPlays: number = library.length;
    let firstDate: Date = new Date();
    let lastDate: Date = new Date();
    if (library.length > 0){
      firstDate = library[0].endTime;
      lastDate = library[library.length-1].endTime;
    }

    library.forEach(track => {
      totalTime = totalTime + track.msPlayed;
      // if the track was played for less than 5 seconds it is considered skipped
      if (track.msPlayed < 5000) {
        totalSkips = totalSkips + 1;
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
    return library;
  }

}
