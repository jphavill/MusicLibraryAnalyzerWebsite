import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { graphCategory, GraphControls, graphDataType } from 'models/graphSelections';

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
  percent: boolean = false;

  @Output() graphControlsEvent = new EventEmitter<GraphControls>();


  categoriesKeys = Object.keys(this.categories);
  categoriesValues = Object.values(graphCategory)
  dataTypesKeys = Object.keys(this.dataTypes);
  dataTypesValues = Object.values(graphDataType)

  // graph defaults to displaying how many plays each artist had
  categoryType: graphCategory = graphCategory.Artist
  dataType: graphDataType = graphDataType.Plays

  constructor(private songStatsService: SongStatsService) {
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

  updateControls(): void {
    console.log({
      dataType: this.dataType,
        categortyType: this.categoryType,
        percent: this.percent,
        dateMin: this.dateMin,
        dateMax: this.dateMax
    })
    this.graphControlsEvent.emit(
      {
        dataType: this.dataType,
        categortyType: this.categoryType,
        percent: this.percent,
        dateMin: this.dateMin,
        dateMax: this.dateMax
      }
    )
  }

}
