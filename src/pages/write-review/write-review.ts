import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {HealMapLib} from "../../services/healMapLib";


@IonicPage()
@Component({
  selector: 'page-write-review',
  templateUrl: 'write-review.html',
})
export class WriteReviewPage {

  provider:any;
  @ViewChild(Content) content:Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib:HealMapLib) {
      this.provider = this.navParams.data;
  }


  onCommentSubmit(form: NgForm) {
    this.healMapLib.createReview(this.provider.provider_id,form.value.comment,form.value.star).subscribe(data => {
      // newlyAdded.newlyAdded = 'newlyAdded';
      // this.comment.comments.push(newlyAdded);
      setTimeout(()=>{
        this.scrollToNewlyAddedComment();
      },200)
      form.reset();
    });
  }

  scrollToNewlyAddedComment(){
    let newlyAddedComment:any = document.getElementById('newlyAdded');
    //this.content.scrollTo(0,newlyAddedComment.offsetTop,1000);
  }
}
