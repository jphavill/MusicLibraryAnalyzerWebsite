import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphControlsComponent } from './graph-controls.component';
import { graphControlsDefault, graphDataType } from 'models/graphSelections';

describe('GraphControlsComponent', () => {
  let component: GraphControlsComponent;
  let fixture: ComponentFixture<GraphControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set graph controls', () => {
    component.setControls(graphControlsDefault)
    expect(component.dateMin.getDay()).toBe(graphControlsDefault.dateMin.getDay())
    expect(component.dateMax.getDay()).toBe(graphControlsDefault.dateMax.getDay())
    expect(component.dataType).toBe(graphControlsDefault.dataType)
    expect(component.categoryType).toBe(graphControlsDefault.categortyType)
    expect(component.percent).toBe(graphControlsDefault.percent)
    expect(component.sortDirection).toBe(graphControlsDefault.sortDirection)
  });

  it('should disable percentage if SkipsPerPlay is selected', () => {
    component.setControls(graphControlsDefault)
    component.dataType = graphDataType.SkipsPerPlay
    component.percent = true
    component.updateControls()
    expect(component.percent).toBe(false)
  });

  it('should not disable percentage if a datatype other than SkipsPerPlay is selected', () => {
    component.setControls(graphControlsDefault)
    component.dataType = graphDataType.Plays
    component.percent = true
    component.updateControls()
    expect(component.percent).toBe(true)
  });

  it('should set defaultDateMin and defaultDateMax', () => {
    let minDate = '2023-06-25'
    let maxDate = '2023-06-30'
    component.libraryStats = [
      {'totalPlays': 1, 'averageSkips': 1, 'stdSkips': 1, 'totalSkips': 1, 'totalTime': 1, 'firstDate': new Date(minDate), 'lastDate': new Date(maxDate)},
    ]
    component.setDefaultDate()

    expect(component.defaultDateMin.getDay()).toBe(new Date(minDate).getDay())
    expect(component.defaultDateMax.getDay()).toBe(new Date(maxDate).getDay())
  });
});
