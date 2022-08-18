import { Injectable } from '@angular/core';

import { Tracks, Track} from 'models/library.model';
import * as plist from 'plist';

@Injectable({
  providedIn: 'root'
})
export class PlistLoaderService {

  constructor() { }

  // public loadPlist(file: File): TrackStats[]{
  //   let fr:FileReader = new FileReader();
  //   let library:TrackStats[] = new Array()
  //   fr.readAsText(file)
  //   fr.onload = () => {
  //     if (fr.result != null){
  //       let contents:string = fr.result as string // reads in the file as text first
  //       let obj:string = plist.parse(contents) as string;
  //       let tracks:Tracks = JSON.parse(JSON.stringify(obj));
  //       for (let key of Object.keys(tracks.Tracks)) {
  //         let trackstats:TrackStats = initTrackStats(tracks.Tracks[key]);
  //       };
  //     }
  //   }
  //   return library;
  //   };
}
