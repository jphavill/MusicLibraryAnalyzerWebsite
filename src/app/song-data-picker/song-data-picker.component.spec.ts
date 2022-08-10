import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDataPickerComponent } from './song-data-picker.component';

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
});
