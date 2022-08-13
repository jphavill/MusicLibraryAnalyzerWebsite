export interface Tracks {
  Tracks: {[id: string]: Track};
}

export interface Track {
  "endTime":           Date;
  "artistName":        string;
  "trackName":         string;
  "msPlayed":          number;
}
