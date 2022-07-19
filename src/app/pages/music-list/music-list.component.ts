import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/_helpers/factories';
import { IMusic } from 'src/app/_interfaces/IMusic';
import { PlayerService } from 'src/app/_services/player.service';
import { SpotifyService } from 'src/app/_services/spotify.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {

  bannerImageUrl = ''; 
  bannerText = '';
  title = '';
  
  musics: IMusic[] = [];
  musicCurrent: IMusic = newMusic();


  subs: Subscription[] = []

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
    ) { }


  ngOnInit(): void {
    this.getMusicCurrent();
    this.getMusics();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());  
  }

  getMusicCurrent(){
    const sub = this.playerService.currentMusic.subscribe(m => {
      this.musicCurrent = m;
    });

    this.subs.push(sub);
  }

  getMusics(){
    const sub = this.activedRoute.paramMap
      .subscribe(async params => {
        const type = params.get('type');
        const id = params.get('id');
        await this.page(type, id);
      });
    
    this.subs.push(sub);
  }

  async page(type: string, id: string){
    if(type === 'playlist')
      await this.getPlaylist(id);
    else
      await this.getArtistId(id);
  }

  async getPlaylist(playlistId: string){
    const playlistMusics = await this.spotifyService.getMusicsPlaylist(playlistId);
    this.getDataPage(playlistMusics.name, playlistMusics.imageUrl, playlistMusics.musics);
    this.title = 'Musicas Playlist: ' + playlistMusics.name;
    console.log('playlist', playlistMusics)
  }
  
  async getArtistId(artistaId: string){}

  getArtists(music: IMusic){
    return music.artists.map(artist => artist.name).join(', ');
  }

  
  getDataPage(bannerText: string, bannerImage: string, musics: IMusic[]){
    this.bannerImageUrl = bannerImage;
    this.bannerText = bannerText;
    this.musics = musics;
  }

  async playerMusic(music: IMusic){
    await this.spotifyService.playMusic(music.id);
    this.playerService.setMusicCurrent(music);
  }

}
