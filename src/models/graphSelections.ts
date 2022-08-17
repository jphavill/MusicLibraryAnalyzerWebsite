export enum graphCategory {
  Song = 'Song',
  Artist = 'Artist'
};

export enum graphDataType {
  Plays = 'Plays',
  Time = 'Time',
  Skips = 'Skips',
  SkipsPerPlay = 'SkipsPerPlay'
};

export interface GraphControls {
  dataType: graphDataType,
  categortyType: graphCategory,
  percent: boolean,
  dateMin: Date,
  dateMax: Date,
  sortDirection: sortDirection,
}

export enum sortDirection{
  ascending = 1,
  descending = -1
};

