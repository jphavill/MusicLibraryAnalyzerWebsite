import { Injectable } from '@angular/core';
import { Track } from 'models/library.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongStatsService {
  // inital value of empty array since no library loaded
  private _library: BehaviorSubject<Track[]> = new BehaviorSubject(Array());

  // publically accessible data
  public readonly library: Observable<Track[]> = this._library.asObservable();
  constructor() { }

  // updates all subscribed components with the new library
  sendLibrary(library: Track[]){
    this._library.next(library)
  }
}
