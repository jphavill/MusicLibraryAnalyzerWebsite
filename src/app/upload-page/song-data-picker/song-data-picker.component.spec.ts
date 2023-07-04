import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDataPickerComponent } from './song-data-picker.component';
import { Demo, Track } from 'models/library.model';
import demoData from '../../../assets/json/demoSpotify.json'

describe('SongDataPickerComponent', () => {
  let component: SongDataPickerComponent;
  let fixture: ComponentFixture<SongDataPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongDataPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongDataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update library when library is loaded', () => {
    const spy = spyOn(component, "updateSongs")

    component.loadDemoSongs()

    expect(spy).toHaveBeenCalled()
  });

  it ('should load demo library correctly', () => {
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

    let correctFirstEntry = {
      "endTime": new Date(demoData[0].endTime),
      "artistName": demoData[0].artistName,
      "trackName": demoData[0].trackName,
      "msPlayed": demoData[0].msPlayed
    }
    let correctLastEntry = {
      "endTime": new Date(demoData[demoData.length-1].endTime),
      "artistName": demoData[demoData.length-1].artistName,
      "trackName": demoData[demoData.length-1].trackName,
      "msPlayed": demoData[demoData.length-1].msPlayed
    }

    expect(library.length).toBe(1309)
    expect(library[0]).toEqual(correctFirstEntry)
    expect(library[library.length-1]).toEqual(correctLastEntry)
  })

  it('should emit false when library loaded', () => {
    spyOn(component.loadingEvent, "emit")

    component.loadDemoSongs()

    expect(component.loadingEvent.emit).toHaveBeenCalled()
    expect(component.loadingEvent.emit).toHaveBeenCalledWith(false)

  });

  it('should update #neverSelected when library loaded', () => {
    component.loadDemoSongs()
    expect(component.neverSelected).toBe(false)
  })
});
