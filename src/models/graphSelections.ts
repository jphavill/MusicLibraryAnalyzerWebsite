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

export const graphControlsDefault: GraphControls = {
  dataType: graphDataType.Plays,
  categortyType: graphCategory.Artist,
  percent: false,
  dateMin: new Date(),
  dateMax: new Date(),
  sortDirection: sortDirection.descending
}
