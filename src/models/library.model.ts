export interface Tracks {
  Tracks: {[id: string]: Track};
}

export interface Track {
  "endTime":           Date;
  "artistName":        string;
  "trackName":         string;
  "msPlayed":          number;
}

export interface Demo {
  "endTime":           string;
  "artistName":        string;
  "trackName":         string;
  "msPlayed":          number;
}
