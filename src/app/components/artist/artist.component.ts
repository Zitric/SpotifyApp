import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../servicies/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {

  artist: any = {};
  topTracks: any[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               public spotifyService: SpotifyService ) { }

  ngOnInit() {

      this.activatedRoute.params
        .map( params => params.id )
        .subscribe( id => {

          console.log( id );
          this.spotifyService.getArtist( id ).subscribe( artist => {
              this.artist = artist;
              console.log( artist );
          });
          this.spotifyService.getTopTracks( id )
            .map( ( response: any ) => response.tracks )
            .subscribe( topTracks => {
                this.topTracks = topTracks;
                console.log ( topTracks );
          });
      });
  }

}
