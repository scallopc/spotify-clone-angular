import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newSong } from '../_helpers/factories';
import { ISong } from '../_interfaces/ISong';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  songCurrent = new BehaviorSubject<ISong>(newSong());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getSongCurrent();
  }

  async getSongCurrent(){
    clearTimeout(this.timerId);

    // music
    const music = await this.spotifyService.getSongCurrent();
    this.setMusicCurrent(music);

    //  loop
    this.timerId = setInterval(async () => {
      await this.getSongCurrent();
    }, 5000)
  }

  setMusicCurrent(music: ISong){
    this.songCurrent.next(music);
  }

//   async previousSong(){
//     await this.spotifyService.previousSong();
//   }

//   async nextSong() {
//     await this.spotifyService.nextSong();
//   }
}
