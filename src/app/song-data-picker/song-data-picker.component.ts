import { Component, OnInit } from '@angular/core';
import { PlistLoaderService } from 'app/plist-loader.service';

import { Tracks, Track, TrackStats, initTrackStats} from 'models/library.model';
import * as plist from 'plist';
import { Key } from 'protractor';

@Component({
  selector: 'app-song-data-picker',
  templateUrl: './song-data-picker.component.html',
  styleUrls: ['./song-data-picker.component.sass']
})
export class SongDataPickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loadSongs(e:Event){
    let event:HTMLInputElement = (e.target as HTMLInputElement)

    if (event != null){
      let file:File = event.files![0]; // gets the first file selected
      this.loadPlist(file);
    }
  }

  loadPlist(file: File): TrackStats[]{
    let fr:FileReader = new FileReader();
    let library:TrackStats[] = new Array()
    fr.readAsText(file)
    fr.onload = () => {
      if (fr.result != null){
        let contents:string = fr.result as string // reads in the file as text first
        let obj:string = plist.parse(contents) as string;
        let tracks:Tracks = JSON.parse(JSON.stringify(obj));
        for (let key of Object.keys(tracks.Tracks)) {
          let trackstats:TrackStats = <TrackStats> {
            "Name":                   '',
            "Artist":                 '',
            "Album Artist":         '',
            "Album":                  '',
            "Genre":                  '',
            "Total Time":           0,
            "Date Modified":        new Date(0),
            "Date Added":           new Date(0),
            "Play Count":           0,
            "Play Date UTC":        new Date(0),
            "Skip Count":           0,
            "Skip Date":            new Date(0),
            "Release Date":         new Date(0),
            "Sort Album":           '',
            "Sort Artist":          '',
            "Sort Name":            '',
        };
          for (let prop of Object.keys(trackstats)) {
            // console.log(prop);
            console.log("---------");
            console.log(prop);
            console.log(tracks.Tracks[key as keyof Tracks][prop as keyof Track])
            console.log(trackstats[prop as keyof TrackStats])
            trackstats[prop as keyof TrackStats] = tracks.Tracks[key as keyof Tracks][prop as keyof Track]
            // trackstats[prop as keyof TrackStats] = tracks[key as keyof Tracks][prop as keyof Track];
          }
          // console.log("track stats below");
          // console.log(trackstats)
        };
      }
    }

    return library;
    };

}
