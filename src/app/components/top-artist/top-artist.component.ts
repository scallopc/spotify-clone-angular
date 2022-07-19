import { Component, Input, OnInit } from '@angular/core';
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
  @Input() ImageUrl = '';
  @Input() Text = '';
 
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    
  }

}