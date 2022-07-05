import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/_interfaces/IUser';
import { SpotifyService } from 'src/app/_services/spotify.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: IUser = null;

  constructor(private router: Router, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.user = this.spotifyService.user;
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
