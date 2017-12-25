import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';
import {LoadingController} from "ionic-angular";
declare var google;
@Injectable()
export class GoogleMapsCluster {

  markerCluster: any;

  constructor(public http: Http,
              private loadingCtrl:LoadingController) {
  }

  addCluster(map,providersFromGoogle){

    if(google.maps){

      //Convert locations into array of markers
      let markers = providersFromGoogle.map((provider) => {
        return new google.maps.Marker({
          position: provider.geometry.location,
          label: provider.name,
          icon: provider.icon,
        });
      });


      const loading = this.loadingCtrl.create({
        content: "Finding..."
      })
      loading.present();
        this.markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/imgs/m'});
        loading.dismiss();
    } else {
      console.warn('Google maps needs to be loaded before adding a cluster');
    }

  }

}
