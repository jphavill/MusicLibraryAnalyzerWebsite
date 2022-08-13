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
  public readonly library: Observable<Track[]> = this._library.asObservable();
  public readonly libraryStats: Observable<LibraryStats[]> = this._libraryStats.asObservable();
  public readonly artistStats: Observable<ArtistStats[]> = this._artistStats.asObservable();
  public readonly trackStats: Observable<TrackStats[]> = this._songStats.asObservable();
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
    }))
    return library;
  }

}
