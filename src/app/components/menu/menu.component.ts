import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlaylist } from 'src/app/_interfaces/IPlaylist';
import { SpotifyService } from 'src/app/_services/spotify.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuSelected = 'Home';
  playlists: IPlaylist[] = [];

  constructor(private router: Router, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  selectMenu(menu: string) {
    this.menuSelected = menu;
    this.router.navigateByUrl('player/home');
  }

  irParaPlaylist(playlistId: string){
    this.menuSelected = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }

  async getPlaylists() {
    this.playlists = await this.spotifyService.getPlaylistUser();
    //console.log('playlists', this.playlists);
  }
}
