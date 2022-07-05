import { ISong } from "./ISong";

export interface IArtist {
  id: string,
  name: string,
  imageUrl: string,
  songs?: ISong[]
}