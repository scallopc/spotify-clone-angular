import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/_helpers/factories';
import { IMusic } from 'src/app/_interfaces/IMusic';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {

  
  music: IMusic = newMusic();
  subs: Subscription[] = []

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.musicPlaying();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  musicPlaying(){
    const sub = this.playerService.currentMusic.subscribe(m => {
      this.music = m;
    });

    this.subs.push(sub);
  }

  backMusic(){
    this.playerService.backMusic();
  }

  nextMusic(){
    this.playerService.nextMusic();
  }

}
