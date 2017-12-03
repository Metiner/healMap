import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage } from 'ionic-angular';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-provider',
  templateUrl: 'provider.html',
})
export class ProviderPage {


  @ViewChild('map_canvas') mapRef : ElementRef;
  map: any;

  constructor() {
  }

  ionViewDidLoad() {
    this.loadMap();
  }


  // to load google map with its options.
  loadMap() {

    // location
    const location = new google.maps.LatLng(39.9334,32.8597);

    // options

    var options = {
      center:location,
      zoom:10
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement,options);
  }

}
