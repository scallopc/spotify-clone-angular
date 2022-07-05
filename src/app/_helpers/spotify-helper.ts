import { addMilliseconds, format } from "date-fns";
import { IArtist } from "../_interfaces/IArtist";
import { IPlaylist } from "../_interfaces/IPlaylist";
import { ISong } from "../_interfaces/ISong";
import { IUser } from "../_interfaces/IUser";
import { newPlaylist, newSong } from "./factories";


export function SpotifyUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser{
   return {
     id: user.id,
     name: user.display_name,
     imageUrl: user.images.pop().url
   }
}

export function SpotifyPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.pop().url
  };
}

export function SpotifySinglePlaylist(playlist: SpotifyApi.SinglePlaylistResponse ): IPlaylist {
  if (!playlist)
    return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.shift().url,
    songs: []
  }

}

export function SpotifyArtists(spotifyArtist: SpotifyApi.ArtistObjectFull) :  IArtist{
  return {
    id: spotifyArtist.id,
    imageUrl: spotifyArtist.images.sort((a,b) => a.width - b.width).pop().url,
    name: spotifyArtist.name
  };
}

export function SpotifyTrack(spotifyTrack: SpotifyApi.TrackObjectFull) : ISong{
  
  if (!spotifyTrack)
    return newSong();

  const msToMinute = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }
  
  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imageUrl: spotifyTrack.album.images.shift().url,
      name: spotifyTrack.album.name
    },
    artists: spotifyTrack.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    time: msToMinute(spotifyTrack.duration_ms),
  }
}
