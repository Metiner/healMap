import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {GoogleMapsCluster} from "../../providers/google-maps-cluster/google-maps-cluster";
import {HealMapLib} from "../../services/healMapLib";
import {Geolocation} from "@ionic-native/geolocation";
declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  [x: string]: any;

  @ViewChild('map_canvas') mapRef : ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect : ElementRef;

  providers = ['Doctor','Dentist','Hospital','Beauty Salon','Pharmacy','Veterinary Care','Physiotherapist'];
  providersFromGoogle=[];
  providerIds=[];
  map;
  center;
  dragStartPosition;
  dragEndPosition;
  calculatedDistance;
  radius;
  mapReadyFirstToUse=true;
  selectedProviders = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform:Platform,
              public maps: GoogleMapsProvider,
              public mapCluster: GoogleMapsCluster,
              private healmapLib: HealMapLib,
              public geolocation:Geolocation) {



  }

  ionViewWillEnter(){
    if(this.map){
      this.map.setCenter({
        lat: this.center.lat(),
        lng: this.center.lng()
      });
    }
  }

  ionViewDidLoad() {
    this.mapReadyFirstToUse = true;
    this.platform.ready().then(()=>{
      this.initMap().then(map=>{

        this.map = map;

        this.map.addListener("idle",()=>{
          if(this.mapReadyFirstToUse) {

            this.getCenterOfMap().then(center => {
              this.dragEndPosition = center;
              this.center = center;
              this.getProvidersFromGoogle(center, this.selectedProviders).then(providersFromGoogle => {
                this.mapCluster.addCluster(this.map, providersFromGoogle);
              })
            })
          }
        })

        this.map.addListener("dragstart",()=>{
          this.getCenterOfMap().then(center=>{
            this.dragStartPosition = center;
            this.mapReadyFirstToUse = false;
          })
      })

        this.map.addListener("dragend",()=>{
          this.getCenterOfMap().then(center=>{
            this.dragEndPosition = center;
            this.center = center;
            this.getProvidersFromGoogle(center,this.selectedProviders).then(providersFromGoogle=>{
              this.mapCluster.addCluster(this.map,providersFromGoogle);
            })
          })
          this.mapReadyFirstToUse= false;
        })
      })
    })
  }

  getCenterOfMap(){
    return new Promise((resolve) =>{
      this.center = this.map.getCenter();
      resolve(this.map.getCenter());
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


  getProvidersFromGoogle(center,providerName){


    this.providersFromGoogle = [];

    return new Promise((resolve) => {

        this.getRadius().then(radius=>{

          this.calculateDistance().then(calculatedDistance=>{


            this.healmapLib.getVenueFromGoogleMaps(center.lat(),center.lng(),radius,this.selectedProviders,'',calculatedDistance).subscribe(response=>{
              var objects = response.json().results;


              objects.forEach(element =>{


                  if(this.providerIds.indexOf(element.id) == -1){
                    this.providersFromGoogle.push(element);
                    this.providerIds.push(element.id);
                  }else{
                    this.providersFromGoogle = [];
                  }
                }
              )
              resolve(this.providersFromGoogle);
            });
          })
        })
      })


  }
  onFilterButton(pressedButton,providerName) {



    // map.addListener("zoom_changed",()=>{
    //   console.log(map.getBounds().getNorthEast() + " --- " + map.getBounds().getSouthWest());
    // })
    providerName = providerName.toLowerCase();
    providerName = providerName.replace(' ','_');
    if(pressedButton.pressed){

      this.removeFromProviderArray(providerName);
      console.log(this.selectedProviders);

      pressedButton.style = 'pressedButtonStyle';
      pressedButton.pressed = false;

    }else{

      this.selectedProviders.push(providerName);

      console.log(this.selectedProviders);
      this.getProvidersFromGoogle(this.center,this.selectedProviders);
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
        this.radius = google.maps.geometry.spherical.computeDistanceBetween(center,ne);
      }
      return resolve(this.radius);
    })

  }


  calculateDistance(){
    return new Promise<boolean>((resolve)=>{
      this.calculatedDistance = google.maps.geometry.spherical.computeDistanceBetween(this.dragStartPosition,this.dragEndPosition);
      resolve(this.calculatedDistance);
    })
  }



  removeFromProviderArray(providerName){
    var index = this.selectedProviders.indexOf(providerName);
    if(index > -1){
      this.selectedProviders.splice(index,1);
    }
  }


}
