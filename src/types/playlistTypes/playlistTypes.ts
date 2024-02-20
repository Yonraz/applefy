import { TrackObjectType } from "../trackTypes/trackTypes";

export interface ImageObjectType {
  url: string;
  height: number;
  width: number;
}
export interface TracksObjectType {
  href: string;
  total: number;
}
export interface OwnerObjectType {
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}
export interface SimplifiedPlaylistObjectType {
  collaborative: boolean;
  description: string;
  external_urls: object;
  href: string;
  id: string;
  images: Array<ImageObjectType>;
  name: string;
  public: boolean;
  snapshot_id: string;
  tracks: TracksObjectType;
  type: string;
  uri: string;
  owner: OwnerObjectType;
}

export interface PlaylistTracksObjectType {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: PlaylistTrackObjectType[];
}
export interface PlaylistTrackObjectType {
  added_at: string;
  track: TrackObjectType;
}

export interface PlaylistResponseObject {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string; //spotify url for the playlist
  };
  followers: { href: string; followers: number };
  id: string;
  images: ImageObjectType[];
  name: string;
  owner: OwnerObjectType;
  public: boolean;
  snapshot_id: string;
  tracks: PlaylistTracksObjectType;
  type: string;
  uri: string;
}
