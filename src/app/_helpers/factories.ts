
import { IArtist } from "../_interfaces/IArtist";
import { IPlaylist } from "../_interfaces/IPlaylist";
import { IMusic } from "../_interfaces/IMusic";

export function newArtist(): IArtist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    musics: []
  };
}

export function newMusic(): IMusic {
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
    musics: []
  }
}