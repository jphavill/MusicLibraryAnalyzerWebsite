import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { graphCategory, graphDataType } from 'models/graphSelections';

import { SongStatsService } from 'app/song-stats-service';
import { LibraryStats } from 'models/stat.model'

@Component({
  selector: 'app-graph-controls',
  templateUrl: './graph-controls.component.html',
  styleUrls: ['./graph-controls.component.sass']
})
export class GraphControlsComponent implements OnInit {

  libraryStats: LibraryStats[] = Array();

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  dateMin: Date = new Date()
  dateMax: Date = new Date()


  categories = graphCategory;
  dataTypes = graphDataType;
  percentChecked: boolean = false;

  categoriesKeys = Array();
  dataTypesKeys = Array();

  // graph defaults to displaying how many plays each artist had
  category: string = graphCategory.Artist.toString()
  dataType: string = graphDataType.Plays.toString()

  constructor(private songStatsService: SongStatsService) {
    this.categoriesKeys = Object.keys(this.categories).filter(f => !isNaN(Number(f)));
    this.dataTypesKeys = Object.keys(this.dataTypes).filter(f => !isNaN(Number(f)));
  }

  setDefaultDate(){
    this.range.patchValue(
      {
        start: new Date(this.libraryStats[0].firstDate),
        end: new Date(this.libraryStats[0].lastDate)
      }
    )
    this.dateMin = new Date(this.libraryStats[0].firstDate)
    this.dateMax = new Date(this.libraryStats[0].lastDate)
  }

  ngOnInit(): void {
    this.songStatsService.libraryStats.subscribe(response => this.libraryStats = response)
    if (this.libraryStats.length > 0){
      this.setDefaultDate()
    }


  }

}
