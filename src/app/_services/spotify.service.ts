import { Injectable } from '@angular/core';
import { spotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../_interfaces/IUser';
import { SpotifyArtists, SpotifyPlaylist, SpotifyTrack, SpotifyUser } from '../_helpers/spotify-helper';
import { IPlaylist } from '../_interfaces/IPlaylist';
import { IArtist } from '../_interfaces/IArtist';
import { ISong } from '../_interfaces/ISong';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async initUser() {
    if (!!this.user)
      return true;

    const token = localStorage.getItem('token');

    if (!token)
      return false;

    try {
      this.accessToken(token);
      await this.getSpotifyUser();
      return !!this.user;

    } catch (ex) {
      return false;
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUser(userInfo);
  }

  getUrlLogin() {
    const authEndpoint = `${spotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${spotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${spotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${spotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenUrlCallback() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  accessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
    //this.spotifyApi.skipToNext();
  }

  async getPlaylistUser(offset = 0, limit = 50): Promise<IPlaylist[]>{
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit });
    //console.log('playlists', playlists);
    return playlists.items.map(SpotifyPlaylist);
  }

  async getTopArtists(limit = 10):Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtists);
    //console.log('artista', artists)
  }

  async getSongs(offset=0, limit=50): Promise<ISong[]>{
    const songs = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return songs.items.map(x => SpotifyTrack(x.track));
    //console.log('artista',  songs.items.map(x => SpotifyTrack(x.track)))
    
  }

  async getSongCurrent(): Promise<ISong>{
    const musicSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrack(musicSpotify.item);
  }

  async playMusic(musicId: string){
    await this.spotifyApi.queue(musicId);
    await this.spotifyApi.skipToNext();
  }
}
