
import { IArtist } from "../_interfaces/IArtist";
import { IPlaylist } from "../_interfaces/IPlaylist";
import { ISong } from "../_interfaces/ISong";

export function newArtist(): IArtist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    songs: []
  };
}

export function newSong(): ISong {
  return {
    id: '',
    album: {
      id: '',
      imageUrl: '',
      name: '',
    },
    artists: [],
    time: '',
    title: ''
  }
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    songs: []
  }
}