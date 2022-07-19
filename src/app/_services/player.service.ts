import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newMusic } from '../_helpers/factories';
import { IMusic } from '../_interfaces/IMusic';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentMusic = new BehaviorSubject<IMusic>(newMusic());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getMusicCurrent();
  }

  async getMusicCurrent(){
    clearTimeout(this.timerId);

    // music
    const music = await this.spotifyService.getMusicCurrent();
    this.setMusicCurrent(music);

    //  loop
    this.timerId = setInterval(async () => {
      await this.getMusicCurrent();
    }, 5000)
  }

  setMusicCurrent(music: IMusic){
    this.currentMusic.next(music);
  }

  async backMusic(){
    await this.spotifyService.backMusic();
  }

  async nextMusic() {
    await this.spotifyService.nextMusic();
  }
}
