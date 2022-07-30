export interface Songs {
  Songs: Song[];
}

export interface Song {
  title:   string;
  release: string;
  artist:  string;
}

export interface Spotify {
  tracks:        Album[];
  albums:        Album[];
  shows:         any[];
  episodes:      any[];
  bannedTracks:  any[];
  artists:       Artist[];
  bannedArtists: any[];
  other:         any[];
}

export interface Album {
  artist: string;
  album:  string;
  uri:    string;
  track?: string;
}

export interface Artist {
  name: string;
  uri:  string;
}
