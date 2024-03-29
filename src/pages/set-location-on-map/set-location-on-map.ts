import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, PopoverController} from 'ionic-angular';
import {GoogleMapsCluster} from "../../providers/google-maps-cluster/google-maps-cluster";
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {Geolocation} from "@ionic-native/geolocation";
import {HealMapLib} from "../../services/healMapLib";
declare var google;

@IonicPage()
@Component({
  selector: 'page-set-location-on-map',
  templateUrl: 'set-location-on-map.html',
})
export class SetLocationOnMapPage {

  @ViewChild('map_canvas') mapRef : ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  map;
  markers = [];
  callback;

  constructor(public geolocation:Geolocation,
              public platform:Platform,
              public maps:GoogleMapsProvider,
              public mapCluster:GoogleMapsCluster,
              public navParams:NavParams,
              public healMapLib:HealMapLib,
              public navCtrl:NavController) {
      this.callback = this.navParams.get('callback')
  }

  ionViewWillEnter(){
    this.setCenter();
  }

  ionViewDidLoad() {
    this.platform.ready().then(()=>{
      let mapLoaded = this.maps.init(this.mapRef.nativeElement, this.pleaseConnect.nativeElement).then((map) => {

        this.map = map;
        this.map.addListener("click",event=>{
          let position = {
            lat:event.latLng.lat(),
            lng:event.latLng.lng()
          }

          if(this.markers.length<1){
            this.markers.push(
              new google.maps.Marker({
                position: position
              })
            )
            this.setMapToMarker(this.map)

          }else{
            this.setMapToMarker(null)
            this.markers = []

            this.markers.push(
              new google.maps.Marker({
                position: position
              })
            )
            this.setMapToMarker(this.map)

          }
        })
      });
    })
  }

  setMapToMarker(map){
    this.markers.forEach(element=>{
      element.setMap(map);
    })
  }

  saveMyPin(markers){
    this.callback(markers).then(()=>{
      this.navCtrl.pop();
    });
  }

  setCenter(){
    this.geolocation.getCurrentPosition().then(location=> {

      let lat = location.coords.latitude;
      let lng = location.coords.longitude;


      if(this.map){
        this.map.setCenter({
          lat: lat,
          lng: lng
        })
      }

    })
  }

}
