import { Component, OnInit } from '@angular/core';
import { GraphControls, graphControlsDefault } from 'models/graphSelections';

@Component({
  selector: 'app-graphs-page',
  templateUrl: './graphs-page.component.html',
  styleUrls: ['./graphs-page.component.sass']
})
export class GraphsPageComponent implements OnInit {

  graphControls: GraphControls = graphControlsDefault
  constructor() {

   }

  ngOnInit(): void {
  }

  updateGraphControls(value: GraphControls): void{
    this.graphControls = value;
  }
}
