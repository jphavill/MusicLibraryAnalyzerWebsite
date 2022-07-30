export interface Tracks {
  Tracks: {[id: string]: Track};
}

export interface Track {
  "Track ID":             number;
  Name:                   string;
  Artist:                 string;
  "Album Artist":         string;
  Album:                  string;
  Genre:                  string;
  Kind:                   string;
  Size:                   number;
  "Total Time":           number;
  "Disc Number":          number;
  "Disc Count":           number;
  "Track Number":         number;
  "Track Count":          number;
  Year:                   number;
  "Date Modified":        Date;
  "Date Added":           Date;
  "Bit Rate":             number;
  "Sample Rate":          number;
  "Volume Adjustment":    number;
  Equalizer:              string;
  "Play Count":           number;
  "Play Date":            number;
  "Play Date UTC":        Date;
  "Skip Count"?:          number;
  "Skip Date"?:           Date;
  "Release Date":         Date;
  Normalization:          number;
  "Artwork Count"?:       number;
  "Sort Album":           string;
  "Sort Artist":          string;
  "Sort Name":            string;
  "Persistent ID":        string;
  "Track Type":           string;
  Protected:              boolean;
  "Apple Music":          boolean;
  Location:               string;
  "File Folder Count":    number;
  "Library Folder Count": number;
}
