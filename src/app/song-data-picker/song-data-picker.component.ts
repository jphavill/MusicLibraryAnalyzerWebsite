import { Component, OnInit, Output } from '@angular/core';

import {Track} from 'models/library.model';

import { SongStatsService } from 'app/song-stats-service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-song-data-picker',
  templateUrl: './song-data-picker.component.html',
  styleUrls: ['./song-data-picker.component.sass']
})
export class SongDataPickerComponent implements OnInit {
  @Output() loadingEvent = new EventEmitter<boolean>();
  neverSelected:boolean = true;
  constructor(private songStatsService: SongStatsService) { }

  ngOnInit(): void {
  }

  updateLoading(value: boolean): void{
    this.loadingEvent.emit(value);
  }

  uploadSongs(e:Event): void{
    this.updateSongs(Array())
    this.updateLoading(true)
    this.neverSelected = false;
    this.loadSongs(e).then((library:Track[]) => this.updateSongs(library))
  }

  async loadSongs(e:Event): Promise<Track[]>{
    let event:HTMLInputElement = (e.target as HTMLInputElement)
    let file:File = event.files![0]; // gets the first file selected
    let library: Track[] = await this.loadSpotify(file); // awaits the file being loaded and parsed to json
    return library;
  }

  updateSongs(library: Track[]){
    this.songStatsService.sendLibrary(library)
    this.updateLoading(false)
  }


  async loadSpotify(file: File): Promise<Track[]>{ // loads the file and returns it parsed as json
    return new Promise<Track[]> (
      (resolve, reject) => {
        let fr:FileReader = new FileReader();
        let library:Track[] = new Array()

        fr.readAsText(file) // read the file
        fr.onload = () => { // when the file is read
          let contents:string = fr.result as string // reads in the file as text first
          library = JSON.parse(contents);
          resolve(library); // since it is done succesfully resolve the promise
        }
      }
    )

   };

}
