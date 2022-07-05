import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../_services/spotify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanLoad {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');

    if (!token) {
      return this.authenticateNone();
    }

    return new Promise(async (res) => {
      const userToken = await this.spotifyService.initUser();
      if (userToken)
        res(true);
      else
        res(this.authenticateNone());
    })
  }

  authenticateNone() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}

