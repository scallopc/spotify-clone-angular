import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { newArtist, newMusic } from 'src/app/_helpers/factories';
import { IArtist } from 'src/app/_interfaces/IArtist';
import { IMusic } from 'src/app/_interfaces/IMusic';
import { PlayerService } from 'src/app/_services/player.service';
import { SpotifyService } from 'src/app/_services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  topArtist: IArtist = newArtist();
  musics: IMusic[] = []
  musicCurrent: IMusic = newMusic();
  bannerImageUrl = ''; 
  bannerText = '';
  
  subs: Subscription[] = [];

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.musicsAll();
    this.currentMusic();
    this.getTopartist();
  }

  async musicsAll() {
    this.musics = await this.spotifyService.getMusics();
  }

  currentMusic(){
    const sub = this.playerService.currentMusic.subscribe(music => {
      this.musicCurrent = music;
    });

    this.subs.push(sub);
  }

  artists(music: IMusic){
    return music.artists.map(artist => artist.name).join(', ');
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
 
  async playMusic(music: IMusic){
    await this.spotifyService.playMusic(music.id);
    this.playerService.setMusicCurrent(music);
  }
  
  async getTopartist() {

    const artist = await this.spotifyService.getTopArtists(1);
    if (!!artist)
      this.topArtist = artist.pop();
      this.getDataPage(this.topArtist.name, this.topArtist.imageUrl);
    //console.log('artista', this.topArtist)
  }

  getDataPage(bannerText: string, bannerImage: string) {
    this.bannerImageUrl = bannerImage;
    this.bannerText = bannerText;
  }

}