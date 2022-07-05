import { Component, OnInit } from '@angular/core';
import { IArtist } from 'src/app/_interfaces/IArtist';
import { SpotifyService } from 'src/app/_services/spotify.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {

  artists: IArtist[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.searchTopArtists();
  }

  async searchTopArtists(){
    this.artists = await this.spotifyService.getTopArtists(5);
  }

}
