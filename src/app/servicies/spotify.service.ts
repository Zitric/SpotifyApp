import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  arrayArtists: any[] = [];

  urlSpotify: string = 'https://api.spotify.com/v1/';
  tokenSpotify: string = 'BQCsezR9z1ksAGlzcw395JkEZYWkDzxlNu5vVVVEFUXpnJFkw81L45TpJeyAlvZZH9AxArWf6R-PYZGPywc';

  constructor( public http: HttpClient ) {
    console.log('The service is working');
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenSpotify
    });
    return headers;
  }

  getArtists(search: string) {
    const urlSearch = this.urlSpotify + 'search?query=' + search + '&type=artist&offset=0&limit=20';
    return this.http.get(urlSearch, { headers: this.getHeaders() })
      .map( ( response: any ) => {
        this.arrayArtists = response.artists.items;
        return this.arrayArtists;
    });
  }

  getArtist( id: string ) {
    const urlArtist = this.urlSpotify + 'artists/' + id;
    return this.http.get(urlArtist, { headers: this.getHeaders() });
  }

  getTopTracks( id: string ){
    const urlTopTracks = this.urlSpotify + 'artists/' + id + '/top-tracks?country=es';
    return this.http.get( urlTopTracks, { headers: this.getHeaders() });
  }

}
