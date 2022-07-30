import { Component } from '@angular/core';
import type { Songs, Song } from 'models/song.model';
import type { Tracks, Track} from 'models/library.model';
import * as plist from 'plist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Interview Example';

  loadSongs(e:Event){
    var fr:FileReader = new FileReader();
    var event:HTMLInputElement = (e.target as HTMLInputElement)

    if (event != null){
      var file:File = event.files![0]; // gets the first file selected

      fr.readAsText(file)
      fr.onload = function() {
        if (fr.result != null){
          var contents:string = fr.result as string // reads in the file as text first
          console.log(contents);
          var obj:string = plist.parse(contents) as string;
          var tracks:Tracks = JSON.parse(JSON.stringify(obj));
          console.log(JSON.stringify(obj))
          Object.keys(tracks.Tracks).forEach( (key:string) => {
            let track:Track = tracks.Tracks[key]
            console.log(track["Release Date"])
          });
        }
      }
      };
  }
}


