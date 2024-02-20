import { SimplifiedArtistObjectType } from "../artistTypes/artistTypes";
import { AlbumObjectType } from "../objectTypes/objectTypes";

export interface TrackObjectType {
  album: AlbumObjectType;
  artists: SimplifiedArtistObjectType[];
  duration_ms: number;
  explicit: boolean;
  name: string;
  id: string;
  uri: string;
}

export interface TracksFromSearchType {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: TrackObjectType[];
}