import { ISong } from "./ISong";

export interface IPlaylist {
  id: string,
  name: string,
  imageUrl: string,
  songs?: ISong[]
}