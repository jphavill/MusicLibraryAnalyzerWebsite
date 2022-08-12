import { Component, OnInit } from '@angular/core';
import { SongStatsService } from 'app/song-stats-service';
import { Track } from 'models/library.model';

@Component({
  selector: 'app-song-stats',
  templateUrl: './song-stats.component.html',
  styleUrls: ['./song-stats.component.sass']
})
export class SongStatsComponent implements OnInit {
  loading:boolean = false;
  libraryLoaded:boolean = false;
  library: Track[] = Array();

  constructor(private songStatsService: SongStatsService) { }

  ngOnInit(): void {
    this.songStatsService.library.subscribe(response => this.library = response)
  }

}
