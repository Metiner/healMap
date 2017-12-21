import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {GoogleMapsCluster} from "../../providers/google-maps-cluster/google-maps-cluster";
import {HealMapLib} from "../../services/healMapLib";
import {Geolocation} from "@ionic-native/geolocation";
import {Position} from "../../models/position";
declare var google;

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
  map;

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
      this.initMap().then(map=>{
        this.map = map;

        this.map.addListener("tilesloaded",()=>{

        this.getCurrentPosition().then(currentPosition=>{
          this.getProvidersFromGoogle(currentPosition).then(providersFromGoogle=>{
            this.mapCluster.addCluster(this.map,providersFromGoogle);

          })
        })

        });
        })


    })
  }

  initMap(){
    return new Promise((resolve => {
      this.maps.init(this.mapRef.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
        resolve(map);
      }).catch(error=>{
        console.log(error);
      });
    }))
  }


  getProvidersFromGoogle(currentPosition){

    return new Promise((resolve) => {

        this.getRadius().then(radius=>{

          this.healmapLib.getVenueFromGoogleMaps(currentPosition.latitude,currentPosition.longitude,radius,'pharmacy','').subscribe(response=>{
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

  getRadius(){
    return new Promise((resolve) => {

      var map = this.map;
      var bounds = map.getBounds();
      var center = map.getCenter();
      if(bounds && center){
        var ne = bounds.getNorthEast();
        var radius = google.maps.geometry.spherical.computeDistanceBetween(center,ne);
      }
      return resolve(radius);
    })

  }
}
