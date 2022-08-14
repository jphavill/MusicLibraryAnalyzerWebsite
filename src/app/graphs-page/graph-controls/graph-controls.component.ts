import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { graphCategory, graphDataType } from 'models/graphSelections';

@Component({
  selector: 'app-graph-controls',
  templateUrl: './graph-controls.component.html',
  styleUrls: ['./graph-controls.component.sass']
})
export class GraphControlsComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  categories = graphCategory;
  dataTypes = graphDataType;
  percentChecked: boolean = false;

  categoriesKeys = Array();
  dataTypesKeys = Array();

  // graph defaults to displaying how many plays each artist had
  category: string = graphCategory.Artist.toString()
  dataType: string = graphDataType.Plays.toString()

  constructor() {
    this.categoriesKeys = Object.keys(this.categories).filter(f => !isNaN(Number(f)));
    this.dataTypesKeys = Object.keys(this.dataTypes).filter(f => !isNaN(Number(f)));
   }

  ngOnInit(): void {

  }

}
