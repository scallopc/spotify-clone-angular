import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { newSong } from 'src/app/_helpers/factories';
import { ISong } from 'src/app/_interfaces/ISong';
import { PlayerService } from 'src/app/_services/player.service';
import { SpotifyService } from 'src/app/_services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  song: ISong[] = []
  songCurrent: ISong = newSong();

  subs: Subscription[] = [];

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.songs();
    this.songsCurrent();
  }

  async songs() {
    this.song = await this.spotifyService.getSongs();
    console.log('music', this.song)

  }

  songsCurrent(){
    const sub = this.playerService.songCurrent.subscribe(music => {
      this.songCurrent = music;
    });

    this.subs.push(sub);
  }

  artists(song: ISong){
    return song.artists.map(artist => artist.name).join(', ');
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
 
  async playMusic(music: ISong){
    await this.spotifyService.playMusic(music.id);
    this.playerService.setMusicCurrent(music);
  }
  
}