import { Component, OnInit } from '@angular/core';
import { graphCategory, GraphControls, graphDataType } from 'models/graphSelections';

@Component({
  selector: 'app-graphs-page',
  templateUrl: './graphs-page.component.html',
  styleUrls: ['./graphs-page.component.sass']
})
export class GraphsPageComponent implements OnInit {

  graphControls: GraphControls = {
    dataType: graphDataType.Plays,
    categortyType: graphCategory.Artist,
    percent: false,
    dateMin: new Date(),
    dateMax: new Date()
  }
  constructor() {

   }

  ngOnInit(): void {
  }

  updateGraphControls(value: GraphControls): void{
    this.graphControls = value;
    console.log("updating")
  }
}
