import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, LoadingController, Events} from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {GoogleMapsCluster} from "../../providers/google-maps-cluster/google-maps-cluster";
import {HealMapLib} from "../../services/healMapLib";
import {Geolocation} from "@ionic-native/geolocation";
import {MapObject} from "../../models/mapObject";
import {ProviderPage} from "../provider/provider";

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

  static page = MapPage;

  providers = ['Doctor','Dentist','Pharmacy','Hospital','Veterinary Care','Physiotherapist','Beauty Salon','Masseur','Nurse','Nutritionist','Personal Trainer'];
  providersFromGoogle=[];
  providerIds=[];
  map;
  center;
  radius;
  LatLng;
  radar;
  providerIcon;
  currentLocationMarker;
  userCurrentLocation;
  selectedProviderProfile;
  showProviderDetails = false;
  selectedProviderToShowInDetails = {};
  selectedProviders = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform:Platform,
              public maps: GoogleMapsProvider,
              public mapCluster: GoogleMapsCluster,
              private healmapLib: HealMapLib,
              private loadingCtrl:LoadingController,
              public geolocation:Geolocation,
              private eventCtrl:Events,
              private changeDetector:ChangeDetectorRef) {

    console.log(this.navCtrl.length());

  }

  ionViewWillEnter(){

    this.showProviderDetails = false;
    this.setCenter();
    this.platform.ready().then(()=>{


      const loading = this.loadingCtrl.create({
        content: "Map is Loading"
      })
      loading.present();
      this.initMap().then(map=> {
        this.map = map;
        this.getCenterOfMap();
        loading.dismiss();
      })
    })

    this.eventCtrl.subscribe('providerDetailOnClick',(provider,showProviderDetails,providerIcon)=>{

      this.changeDetector.detectChanges();
      this.selectedProviderProfile = provider.profile;
      this.selectedProviderToShowInDetails = provider;
      this.providerIcon = providerIcon;
      this.showProviderDetails = showProviderDetails;


    })
  }

  setCenter(){
    this.geolocation.getCurrentPosition().then(location=> {
      this.userCurrentLocation = location;
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

  initializeFind() {

      if(this.radar){
        this.radar.setMap(null);
      }
      if(this.selectedProviders.length < 1){
          this.healmapLib.showToast('Please select at least one category!',3000,"bottom");
        }else{


          this.getCenterOfMap().then(center => {
            this.dragStartPosition = center;
            this.dragEndPosition = center;
            this.center = center;

            // this.radar = new google.maps.Circle({
            //   strokeColor: '#FF0000',
            //   strokeOpacity: 0.2,
            //   strokeWeight: 5,
            //   fillColor: '#FF0000',
            //   fillOpacity: 0.1,
            //   map: this.map,
            //   center: this.center,
            //   radius: 400
            // });

            this.getProvidersFromGoogle(center).then(providersFromGoogle => {

              this.mapCluster.addCluster(this.map, providersFromGoogle,this.selectedProviders);

            })

          })
        }

        this.map.addListener("dragend",()=>{

          this.getCenterOfMap().then(center=>{
            this.center = center;
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


    async getProvidersFromGoogle(center){


    this.providersFromGoogle = [];
    let self = this;

    this.getRadius();

    let calculatedDistance = this.calculateDistance();


    try{

      // await this.healmapLib.getVenueFromGoogleMaps(center.lat(),center.lng(),300,this.selectedProviders,'',calculatedDistance).then(response=>{
      //
      //   let jsonObject = JSON.parse(response.data);
      //
      //   var objects = jsonObject.results;
      //   objects.forEach(element =>{
      //
      //       this.providersFromGoogle.push(element);
      //       this.providerIds.push(element.id);
      //     }
      //   )
      //
      // }).catch(error=>{
      //   console.log(error);
      // });

      //for getting profession_id corresponding with it's name.
      let selectedProviderIds = [];
      for(let providerName of self.selectedProviders){
        selectedProviderIds.push(this.getProfessionId(providerName))
      }
      var bounds = this.map.getBounds();
      var NECorner = bounds.getNorthEast();
      var SWCorner = bounds.getSouthWest();
      var NWCorner = new google.maps.LatLng(NECorner.lat(), SWCorner.lng());
      var SECorner = new google.maps.LatLng(SWCorner.lat(), NECorner.lng());

      // these providers comes from healmaplib, not google, the process makes these providers look alike google response. Nothing fancy.
      await this.healmapLib.getProvidersToMap(NWCorner.lat(),SECorner.lat(),NWCorner.lng(),SECorner.lng(),selectedProviderIds).then(response=>{
         var providers = response.json();
        providers.forEach(element=>{

          let providerObject = new MapObject();
          providerObject.name = element.user.name + ' ' + element.user.surname;
          providerObject.icon = element.user.avatar_url;
          providerObject.geometry = {location:{lat:element.lat,lng:element.lng}};
          providerObject.types = [element.profession.name.toLowerCase()];
          providerObject.profile = element;
          this.providersFromGoogle.push(providerObject);
        })
      },error2 => {
        this.healmapLib.showToast(error2.message,3000,"bottom");
      }).catch(error=>{
        console.log(error);
      })

      //------------------------------------------------------------------

      return(this.providersFromGoogle);

    }catch (e){
      console.log(e);
    }
  }


  // It returns profession_id corresponding with it's name.
  getProfessionId(professionName:string){

    let professions = [{"id":1,"name":"veterinary_care"},{"id":2,"name":"beauty_salon"},{"id":3,"name":"Caretaker"},{"id":4,"name":"Dentist"},{"id":5,"name":"Doctor"},{"id":6,"name":"Psysiotherapist"},{"id":7,"name":"Masor"},{"id":8,"name":"Nurse"},{"id":9,"name":"Nutritionist"},{"id":10,"name":"Pharmacist"},{"id":11,"name":"Psychologist"},{"id":12,"name":"personal_trainer"}];
    for(let profession of professions){
      if(profession.name.toLowerCase() == professionName)
        return profession.id;
    }
    return 100;//no suitable profession on server.
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

  //sets the center of map to users current location
  locateMe(){

      this.setCenter();
      this.setMarker(this.userCurrentLocation.coords.latitude,this.userCurrentLocation.coords.longitude);

  }

  getRadius(){

      var map = this.map;
      var bounds = map.getBounds();
      var center = map.getCenter();
      if(bounds && center){
        var ne = bounds.getNorthEast();
        this.radius = google.maps.geometry.spherical.computeDistanceBetween(center,ne);
      }
  }


  calculateDistance(){
      return google.maps.geometry.spherical.computeDistanceBetween(this.dragStartPosition,this.dragEndPosition);
  }

  setMarker(lat,lng){

       this.LatLng = new google.maps.LatLng(lat,lng);

       if(this.currentLocationMarker === undefined){
         this.currentLocationMarker = new google.maps.Marker({
           position:this.LatLng,
           map:this.map,
           animation:google.maps.Animation.BOUNCE,
           icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
         })
         this.currentLocationMarker.setMap(this.map);
       }
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

  // If user tap, "profile" button it routes to selected provider's profile.
  goToProviderProfile(){
    console.log(this.selectedProviderProfile);
    this.navCtrl.push(ProviderPage,this.selectedProviderProfile);
  }
}
