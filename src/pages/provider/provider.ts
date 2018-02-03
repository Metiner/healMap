import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {mapExpandAnimation} from "../../components/animations";
import {Geolocation} from "@ionic-native/geolocation";
import {GoogleMapsCluster} from "../../providers/google-maps-cluster/google-maps-cluster";
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {HealMapLib} from "../../services/healMapLib";
import {WriteReviewPage} from "../write-review/write-review";
import {Review} from "../../models/review";
import {ReviewsPage} from "../reviews/reviews";
import {User} from "../../models/user";
import {Retro} from "../../components/googleMapStyle";
import {LaunchNavigator,LaunchNavigatorOptions} from "@ionic-native/launch-navigator";

declare var google;

@IonicPage()
@Component({
  selector: 'page-provider',
  templateUrl: 'provider.html',
  animations: [mapExpandAnimation]
})
export class ProviderPage {

  @ViewChild('map_canvas') mapRef : ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  map: any;
  expanded: boolean =false;
  marginTop= -500;
  user: User;
  reviewCount=0;
  reviews = [];
  retro = Retro;

  constructor(public geolocation:Geolocation,
              public platform:Platform,
              public maps:GoogleMapsProvider,
              public mapCluster:GoogleMapsCluster,
              public navParams:NavParams,
              public healMapLib:HealMapLib,
              public navCtrl:NavController,
              public launchNavigator: LaunchNavigator) {

    this.user = this.healMapLib.user;

    console.log(this.navParams);
    if(this.navParams){
      this.healMapLib.getReviews(this.healMapLib.user.provider_id).subscribe(response=>{
        response.json().forEach(element=>{
          let review:Review = new Review();
          Object.assign(review,element);
          this.reviews.push(review);
          this.reviewCount = this.reviews.length;
        })
        },error2 => {
        this.healMapLib.showToast(error2.message,3000,'bottom');
      })
    }
    this.platform.ready().then(()=>{
      this.maps.init(this.mapRef.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
        this.map = map;
        var position = {
          lat:Number(this.user.providerProfile.lat),
          lng:Number(this.user.providerProfile.lng)
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
    if(this.marginTop == -500){
      this.marginTop = -100
    }else{
      this.marginTop = -500
    }
    this.expanded = !this.expanded;
  }

  writeReview(){
    this.navCtrl.push(WriteReviewPage,this.healMapLib.user);
  }

  seeMoreReview(){
    this.navCtrl.push(ReviewsPage,{'reviews':this.reviews,'provider':this.healMapLib.user});
  }


  createMarker(){

    let providerProfession = this.user.providerProfile.profession.name;
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
    else if (providerProfession == 'beauty_salon' || providerProfession.toLowerCase() == 'beauty saloon') {
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
      lat:Number(this.user.providerProfile.lat),
      lng:Number(this.user.providerProfile.lng)
    };
    console.log(position);
    //----------------------------
    let marker = new google.maps.Marker({
      position: position,
      icon: markerIcon,
      map:this.map
    });

    marker.addListener('click',()=>{

      let destination = [Number(this.user.providerProfile.lat),Number(this.user.providerProfile.lng)];

      this.launchNavigator.navigate(destination)
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
    })
  }

}
