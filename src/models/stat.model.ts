export interface LibraryStats {
  "totalPlays": number;
  "totalTime": number;
  "totalSkips": number;
  "averageSkips": number;
  "stdSkips": number;
  "firstDate": Date;
  "lastDate": Date;
}

export interface ArtistStats {
  "name": string;
  "totalPlays": number;
  "totalTime": number;
  "totalSkips": number;
  "averageSkips": number;
  "stdSkips": number;
}

export interface TrackStats {
  "name": string;
  "totalPlays": number;
  "totalTime": number;
  "totalSkips": number;
  "averageSkips": number;
  "stdSkips": number;
  "datePlayed": Date;
}

