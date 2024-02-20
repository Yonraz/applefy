import { SimplifiedArtistObjectType } from "../artistTypes/artistTypes";
import { ImageObjectType } from "../playlistTypes/playlistTypes";

export interface AlbumObjectType {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string; //spotify url for the playlist
  };
  href: string;
  id: string;
  images: ImageObjectType[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: SimplifiedArtistObjectType[];
}
