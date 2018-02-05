import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {HealMapLib} from "../../services/healMapLib";
import {WriteReviewPage} from "../write-review/write-review";
import {ReviewsPage} from "../reviews/reviews";
import {Retro} from "../../components/googleMapStyle";
import {LaunchNavigator} from "@ionic-native/launch-navigator";
import {ChatPage} from "../chat/chat";
import {Provider} from "../../models/provider";

declare var google;

@IonicPage()
@Component({
  selector: 'page-provider',
  templateUrl: 'provider.html',
})
export class ProviderPage {

  @ViewChild('map_canvas') mapRef : ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  map: any;
  expand=false;
  provider: Provider;
  retro = Retro;
  ownProfile = false;

  constructor(public geolocation:Geolocation,
              public platform:Platform,
              public maps:GoogleMapsProvider,
              public navParams:NavParams,
              public healMapLib:HealMapLib,
              public navCtrl:NavController,
              public launchNavigator: LaunchNavigator,
              public changeDetector:ChangeDetectorRef) {

    if(this.navParams.data){
        this.provider = this.navParams.data;
        if(this.provider.id == this.healMapLib.provider.id){
          this.ownProfile = true;
        }
    }

    this.platform.ready().then(()=>{
      this.maps.init(this.mapRef.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
        this.map = map;

        var position = {
          lat:Number(this.provider.lat),
          lng:Number(this.provider.lng)
        };

        let mapOptions = {
          center: position,
          zoom: 17,
          streetViewControl:false,
          mapTypeControl:false,
          keyboardShortcuts:false,
          fullScreenControl:false,
          clickableIcons:false,
          styles:this.retro,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map.setOptions(mapOptions);
        this.createMarker();
      });
    })
  }

  expandMap(){
    this.expand = !this.expand;
    this.changeDetector.detectChanges();}

  writeReview(){
    this.navCtrl.push(WriteReviewPage,this.provider);
  }

  seeMoreReview(){
    this.navCtrl.push(ReviewsPage,{'reviews':this.provider.comments,'provider':this.provider});
  }


  createMarker(){

    let providerProfession = this.provider.profession.name.toLowerCase();
    let providerIcon;
    if (providerProfession == 'doctor') {

      providerIcon = 'http://healmap.cleverapps.io/img/doctor_icon.png';
    }
    else if (providerProfession == 'pharmacy') {
      providerIcon = 'http://healmap.cleverapps.io/img/pharmacists_icon.png';
    }
    else if (providerProfession == 'hospital') {

      providerIcon = 'http://healmap.cleverapps.io/img/hospital_icon.png';
    }
    else if (providerProfession == 'veterinary_care') {
      providerIcon = 'http://healmap.cleverapps.io/img/animal_icon.png';
    }
    else if (providerProfession == 'psychotherapist') {
      providerIcon = 'http://healmap.cleverapps.io/img/psychologist_icon.png';
    }
    else if (providerProfession == 'beauty_salon' || providerProfession == 'beauty saloon') {
      providerIcon = 'http://healmap.cleverapps.io/img/beauty_icon.png';
    }
    else if (providerProfession == 'dentist') {
      providerIcon = 'http://healmap.cleverapps.io/img/dentist_icon.png';
    }
    else if (providerProfession == 'physiotherapist') {
      providerIcon = 'http://healmap.cleverapps.io/img/ftr_icon.png';
    }

    let markerIcon = {
      url: providerIcon,
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0), // used if icon is a part of sprite, indicates image position in sprite
      anchor: new google.maps.Point(20, 40) // lets offset the marker image
    };

    // this code convert string lat,lng variables to number, if it comes from healmap's servers.
    var position = {
      lat:Number(this.provider.lat),
      lng:Number(this.provider.lng)
    };
    //----------------------------
    let marker = new google.maps.Marker({
      position: position,
      icon: markerIcon,
      map:this.map
    });

    marker.addListener('click',()=>{

      let destination = [Number(this.provider.lat),Number(this.provider.lng)];

      this.launchNavigator.navigate(destination)
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
    })
  }

  async onChat(){
    await this.healMapLib.sendThreadRequest(this.provider.user.id).then(success=>{
      console.log(success.json());
      this.healMapLib.showAlert("Great !","Request has been sent. \nNotification will send after provider's acceptation.",["Ok"]);
    }).catch(error=>{
      this.healMapLib.showToast("Something happened :(",3000,"bottom");
    })
  }
}
