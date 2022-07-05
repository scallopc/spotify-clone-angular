import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/_services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    this.TokenUrlCallback();
  }

  openSpotify(){
    window.location.href = this.spotifyService.getUrlLogin();
  }

  TokenUrlCallback() {
    const token = this.spotifyService.getTokenUrlCallback();
    if(!!token){
      this.spotifyService.accessToken(token);
      this.router.navigate(['/player/home']);
    }
  }
}
