import { Injectable } from '@angular/core';
import { GraphControls, graphControlsDefault } from 'models/graphSelections';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphsControlService {

  private _graphControls: BehaviorSubject<GraphControls> = new BehaviorSubject(graphControlsDefault);
  public readonly graphControls: BehaviorSubject<GraphControls> = this._graphControls;

  constructor() { }

  sendControls(controls: GraphControls){
    console.log("sending new controls")
    console.log(controls)
    this._graphControls.next(controls)
  }
}
