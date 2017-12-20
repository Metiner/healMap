import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {GoogleMapsCluster} from "../../providers/google-maps-cluster/google-maps-cluster";
import {HealMapLib} from "../../services/healMapLib";
import {Geolocation} from "@ionic-native/geolocation";
import {Position} from "../../models/position";


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map_canvas') mapRef : ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect : ElementRef;

  providers = ['Doctor','Nurse','PT','Volunteer','Pharmacy'];
  providersFromGoogle;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform:Platform,
              public maps: GoogleMapsProvider,
              public mapCluster: GoogleMapsCluster,
              private healmapLib: HealMapLib,
              public geolocation:Geolocation) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(()=>{

      this.getProvidersFromGoole().then(response=>{
        let mapLoaded = this.maps.init(this.mapRef.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
          this.mapCluster.addCluster(map,this.providersFromGoogle);
        });
      });
    })
  }



  getProvidersFromGoole(){

    return new Promise((resolve) => {
      this.getCurrentPosition().then(response=>{
        this.healmapLib.getVenueFromGoogleMaps(response.latitude,response.longitude,500,'pharmacy','').subscribe(response=>{
          console.log(response.json());
          var objects = response.json().results;
          this.providersFromGoogle= [];
          objects.forEach(element =>{
            this.providersFromGoogle.push(element);
          })
          resolve(this.providersFromGoogle);
        });
      })
    })

  }
  getCurrentPosition(){

    return new Promise<Position>((resolve)=>{
      this.geolocation.getCurrentPosition().then(position => {

        var currentPosition:Position = new Position(position.coords.longitude.toString(),position.coords.latitude.toString());
        resolve(currentPosition);
    });
    });
  }

  onFilterButton(pressedButton) {
    // var map = this.maps.getMap();
    //
    // map.addListener("bounds_changed",()=>{
    //   console.log(map.getBounds().getNorthEast() + " --- " + map.getBounds().getSouthWest());
    // })
    // map.addListener("zoom_changed",()=>{
    //   console.log(map.getBounds().getNorthEast() + " --- " + map.getBounds().getSouthWest());
    // })
    if(pressedButton.pressed){
      pressedButton.style = 'pressedButtonStyle';
      pressedButton.pressed = false;
    }else{
      pressedButton.style = 'notPressedButtonStyle';
      pressedButton.pressed = true;
    }
  }
}
