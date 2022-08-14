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
  private _artistStats: BehaviorSubject<Map<string, ArtistStats>> = new BehaviorSubject(new Map<string, ArtistStats>());
  private _songStats: BehaviorSubject<Map<string, TrackStats>> = new BehaviorSubject(new Map<string, TrackStats>());

  // publically accessible data
  public readonly library: BehaviorSubject<Track[]> = this._library;
  public readonly libraryStats: BehaviorSubject<LibraryStats[]> = this._libraryStats;
  public readonly artistStats: BehaviorSubject<Map<string, ArtistStats>> = this._artistStats;
  public readonly trackStats: BehaviorSubject<Map<string, TrackStats>> = this._songStats;
  constructor() { }

  // updates all subscribed components with the new library
  sendLibrary(library: Track[]){
    this._library.next(library)
  }

  sendLibraryStats(libraryStats: LibraryStats[]){
    this._libraryStats.next(libraryStats)
  }

  sendArtistStats(artistStats: Map<string, ArtistStats>){
    this._artistStats.next(artistStats)
  }

  sendsongStats(songStats: Map<string, TrackStats>){
    this._songStats.next(songStats)
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

    // Song Stats

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
          "totalTime": tempArtistStat.totalPlays + track.msPlayed,
          "totalSkips": tempArtistStat.totalSkips + (skip ? 1 : 0),
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
    console.log(tempArtistStats)
    return library;
  }

}
