import { Component, OnInit, Output } from '@angular/core';

import {Demo, Track} from 'models/library.model';

import { SongStatsService } from 'app/song-stats-service';
import { EventEmitter } from '@angular/core';
import demoData from '../../../assets/json/demoSpotify.json'

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
    this.songStatsService.library.subscribe(response => this.neverSelected = response.length == 0)
  }

  updateLoading(value: boolean): void{
    this.loadingEvent.emit(value);
  }

  uploadSongs(file:File): void{
    this.updateSongs(Array())
    this.updateLoading(true)
    this.neverSelected = false;
    this.loadSongs(file).then((library:Track[]) => this.updateSongs(library))
  }

  getSelectedFile(e:Event): File {
    let event:HTMLInputElement = (e.target as HTMLInputElement)
    let file:File = event.files![0];
    return file
  }

  loadDemoSongs(): void {
    let library:Track[] = new Array()
    let data: Demo[] = demoData
    for (var song of data){
      let tempSong:Track ={
        "endTime": new Date(song.endTime),
        "artistName": song.artistName,
        "trackName": song.trackName,
        "msPlayed": song.msPlayed
      }
      library.push(tempSong)
    }
    this.updateSongs(library)
  }

  loadUserSongs(e:Event): void {
    let file: File = this.getSelectedFile(e)
    this.uploadSongs(file)
  }

  async loadSongs(file:File): Promise<Track[]>{
    let library: Track[] = await this.loadSpotify(file);
    console.log(library)
    return library;
  }

  updateSongs(library: Track[]){
    this.songStatsService.sendLibrary(library)
    console.log("sent songs")
    this.updateLoading(false)
  }


  async loadSpotify(file: File): Promise<Track[]>{
    return new Promise<Track[]> (
      (resolve, reject) => {
        let fr:FileReader = new FileReader();
        let library:Track[] = new Array()

        fr.readAsText(file)
        fr.onload = () => {
          let contents:string = fr.result as string
          library = JSON.parse(contents);
          resolve(library);
        }
      }
    )

   };

}
