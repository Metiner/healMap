import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, LoadingController} from 'ionic-angular';
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
  calculatedDistance;
  radius;
  selectedProviders = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform:Platform,
              public maps: GoogleMapsProvider,
              public mapCluster: GoogleMapsCluster,
              private healmapLib: HealMapLib,
              private loadingCtrl:LoadingController,
              public geolocation:Geolocation) {



  }

  ionViewWillEnter(){
    if(this.map){
      console.log(this.center);
      this.map.setCenter({
        lat: this.center.lat(),
        lng: this.center.lng()
      });
    }
  }

  ionViewDidLoad(){
    this.platform.ready().then(()=>{
      const loading = this.loadingCtrl.create({
        content: "Map is Loading"
      })
      loading.present();
        this.initMap().then(map=> {
          this.map = map;
          loading.dismiss();
        })
    })
  }

  initializeFind() {


        if(this.selectedProviders.length < 1){
          this.healmapLib.showToast('Please select at least one category!',3000,"bottom");
        }else{
          this.getCenterOfMap().then(center => {
            this.dragStartPosition = center;
            this.dragEndPosition = center;
            this.center = center;

            this.getProvidersFromGoogle(center).then(providersFromGoogle => {
              this.mapCluster.addCluster(this.map, providersFromGoogle);
            })
          })
        }



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


  getProvidersFromGoogle(center){


    this.providersFromGoogle = [];

    return new Promise((resolve) => {

        this.getRadius().then(radius=>{

          this.calculateDistance().then(calculatedDistance=>{


            try{


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
            }catch (e){

              console.log(e);
            }
          })
        })
      })


  }
  onFilterButton(pressedButton,providerName) {



    providerName = providerName.toLowerCase();
    providerName = providerName.replace(' ','_');
    if(pressedButton.pressed){

      this.removeFromProviderArray(providerName);

      pressedButton.style = 'pressedButtonStyle';
      pressedButton.pressed = false;

    }else{

      this.mapReadyFirstToUse = true;
      this.selectedProviders.push(providerName);

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

  //finds providers from the observable area.
  find(){

    this.initializeFind();
  }


}
