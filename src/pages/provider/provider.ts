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
  provider: any;
  description = "";
  profession = "";
  reviewCount=0;
  reviews = [];

  constructor(public geolocation:Geolocation,
              public platform:Platform,
              public maps:GoogleMapsProvider,
              public mapCluster:GoogleMapsCluster,
              public navParams:NavParams,
              public healMapLib:HealMapLib,
              public navCtrl:NavController) {

    if(this.navParams){
      this.provider = this.navParams.data;

      this.healMapLib.getProviderProfile(this.provider.provider_id).subscribe(response=>{
      this.description = response.json().description;
      this.profession = response.json().profession;
      },error=>{
        console.log(error);
      })

      this.healMapLib.getReviews(this.provider.provider_id).subscribe(response=>{
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
  }

  ionViewDidLoad() {
    this.platform.ready().then(()=>{
      let mapLoaded = this.maps.init(this.mapRef.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
        //this.mapCluster.addCluster(map);
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
    this.navCtrl.push(WriteReviewPage,this.provider);
  }

  seeMoreReview(){
    this.navCtrl.push(ReviewsPage,{'reviews':this.reviews,'provider':this.provider});
  }
}
