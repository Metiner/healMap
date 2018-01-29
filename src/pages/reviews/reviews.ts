import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WriteReviewPage} from "../write-review/write-review";

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class ReviewsPage {

  reviews = [];
  reviewCount = 0;
  provider:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reviews = this.navParams.get('reviews');
    this.provider = this.navParams.get('provider');
    this.reviewCount = this.reviews.length;
  }

  writeReview(){
    this.navCtrl.push(WriteReviewPage,this.provider);
  }



}
