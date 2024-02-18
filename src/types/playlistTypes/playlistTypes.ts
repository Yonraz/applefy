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
