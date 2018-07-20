import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../servicies/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  search = '';

  constructor( public spotifySerice: SpotifyService ) { }

  searchArtist() {

    if (this.search.length !== 0) {
      return;
    }
    this.spotifySerice.getToken().subscribe( token => {
      this.spotifySerice.getArtists( this.search, String( token ) ).subscribe();
    });
  }

  ngOnInit() {
  }

}
