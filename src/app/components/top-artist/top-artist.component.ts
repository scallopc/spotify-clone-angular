import { Component, OnInit } from '@angular/core';
import { IArtist } from 'src/app/_interfaces/IArtist';
import { newArtist } from 'src/app/_helpers/factories';
import { SpotifyService } from 'src/app/_services/spotify.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss']
})
export class TopArtistComponent implements OnInit {

  topArtist: IArtist = newArtist();

  constructor( private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.artist();
  }

  async artist(){
    const artist = await this.spotifyService.getTopArtists(1);
    if (!!artist)
      this.topArtist = artist.pop();

      //console.log('artista', this.topArtist)

  }
}