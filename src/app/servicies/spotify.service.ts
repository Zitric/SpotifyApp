import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpotifyService {

  arrayArtists: any[] = [];

  urlSpotify = 'https://api.spotify.com/v1/';
  urlSearch = 'https://api.spotify.com/v1/search/';
  urlArtist = 'https://api.spotify.com/v1/artist/';
  tokenSpotify = 'BQCsezR9z1ksAGlzcw395JkEZYWkDzxlNu5vVVVEFUXpnJFkw81L45TpJeyAlvZZH9AxArWf6R-PYZGPywc';

  constructor( public http: HttpClient ) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenSpotify
    });
    return headers;
  }

  //======================================================

  getTokenFromSpotify() {

    const url = 'https://spotifygeneratetoken.herokuapp.com/get_token';
    const client_id = '0fec79b7340b40b39ebb3a6e79f42af5';
    const client_secret = 'e7ec1b4d07bb4d8e86a846e30b361679';
    const grant_type = 'client_credentials';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const data = JSON.stringify ({
      client_id: client_id,
      client_secret: client_secret,
      grant_type: grant_type

    });

    return this.http.post(url, data, { headers })
      .map(res => {
        const token =
          JSON.stringify({
            token: 'Bearer ' + res['_body'],
            time: new Date()
          });
        if (window.localStorage) {
          localStorage['spotifyToken'] = token;
        }

        return 'Bearer ' + res['_body'];
      });
  }

  isTokenExpired() {
    const last = new Date( JSON.parse( localStorage.spotifyToken ).time );
    const now = new Date();
    const diff = ( Number(now) - Number(last) ) / (1000);
    return (diff >= 3600);
  }

  getToken() {
    if (localStorage.spotifyToken && !this.isTokenExpired() ) {
      const localTokenObj = JSON.parse( localStorage.spotifyToken );

      const localToken = new Observable( observer => {
        observer.next( localTokenObj.token );
        observer.complete();
      });
      console.log('TOKEN EXTRAIDO DE LOCALSTORAGE');
      return localToken;

    } else {
      console.log('TOKEN de Spotify');
      return this.getTokenFromSpotify();
    }
  }

  //======================================================

  getArtists(search: string, token?: string) {
    // const urlSearch = this.urlSpotify + 'search?query=' + search + '&type=artist&offset=0&limit=20';

    const headers = new Headers();
    headers.append( 'Authorization', token);

    const query = `?q=${ search }&type=artist`;
    const url = this.urlSearch + query ;

    // return this.http.get(urlSearch, { headers: this.getHeaders() })
    return this.http.get( url, { headers })
      .map( ( response: any ) => {
        this.arrayArtists = response.artists.items;
        return this.arrayArtists;
    });
  }

  getArtist( id: string, token: string ) {
    // const urlArtist = this.urlSpotify + 'artists/' + id;

    const headers = new Headers();
    headers.append( 'Authorization', token);

    const url = this.urlArtist + '/' + id ;

    // return this.http.get(urlArtist, { headers: this.getHeaders() });
    return this.http.get( url, { headers });
  }

  getTopTracks( id: string ) {
    // const urlTopTracks = this.urlSpotify + 'artists/' + id + '/top-tracks?country=es';
    // return this.http.get( urlTopTracks, { headers: this.getHeaders() });
  }

}
