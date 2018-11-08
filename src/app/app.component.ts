import { Component, OnInit } from '@angular/core';
import { query } from './lib';
import { Character } from './character';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  // 会場の緯度経度
  latlng = {
    lat: 36.109997,
    lng: 136.273388
  }

  characters: Character[]

  constructor(
    private scrollToService: ScrollToService
  ) {}

  ngOnInit() {
    // this.mashup()
    this.initMap()
  }

  initMap() {
    if (!window['google']) {
      console.log('google is empty. retrying.')
      setTimeout(() => {
        this.initMap()
      }, 1000)
      return
    }

    // Create a map object and specify the DOM element
    // for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: this.latlng,
      zoom: 16,
      streetViewControl: false,
      fullscreenControl: false
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
      map: map,
      position: this.latlng,
      title: 'Hello World!'
    });
  }

  mashup() {
    this.characters = query(this.latlng)
    this.scrollToService.scrollTo({
      target: 'result'
    })
  }
}
