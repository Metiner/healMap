import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {GoogleMapsCluster} from "../../providers/google-maps-cluster/google-maps-cluster";




@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map_canvas') mapRef : ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect : ElementRef;

  providers = ['Doctor','Nurse','PT','Volunteer','Pharmacy'];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform:Platform,
              public maps: GoogleMapsProvider,
              public mapCluster: GoogleMapsCluster) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(()=>{
      let mapLoaded = this.maps.init(this.mapRef.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
        this.mapCluster.addCluster(map);
      });
    })
  }

  onFilterButton(pressedButton) {
    var map = this.maps.getMap();

    map.addListener("bounds_changed",()=>{
      console.log(map.getBounds().getNorthEast() + " --- " + map.getBounds().getSouthWest());
    })
    map.addListener("zoom_changed",()=>{
      console.log(map.getBounds().getNorthEast() + " --- " + map.getBounds().getSouthWest());
    })
    if(pressedButton.pressed){
      pressedButton.style = 'pressedButtonStyle';
      pressedButton.pressed = false;
    }else{
      pressedButton.style = 'notPressedButtonStyle';
      pressedButton.pressed = true;
    }
  }
}
