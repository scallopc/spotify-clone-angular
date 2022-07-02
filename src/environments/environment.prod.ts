export const environment = {
  production: true
};

export const spotifyConfiguration = {
  clientId: '7b44193c745c4150ab017e5c9d0ef847',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/login/',
  scopes: [
    "user-read-currently-playing", 
    "user-read-recently-played", 
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "user-library-read",
    "playlist-read-private", 
    "playlist-read-collaborative" 
  ]
};
