import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  images = ["assets/imgs/doctor.jpg","assets/imgs/doctor2.jpg","assets/imgs/doctor3.jpg"]
  constructor(public navCtrl: NavController) {

  }

}
