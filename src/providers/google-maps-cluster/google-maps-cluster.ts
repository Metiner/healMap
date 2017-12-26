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
      let providerIcon;
      console.log(providersFromGoogle);
      //Convert locations into array of markers
      let markers = providersFromGoogle.map((provider) => {
        let providerProffession = provider.types[0];
        if(providerProffession == 'doctor'){
          providerIcon = 'http://healmap.cleverapps.io/img/doctor_icon.png'
        }else if(providerProffession == 'pharmacy'){
          providerIcon = 'http://healmap.cleverapps.io/img/pharmacists_icon.png'

        }else if(providerProffession == 'hospital'){
        }
        else if(providerProffession == 'veterinary_care'){
          providerIcon = 'http://healmap.cleverapps.io/img/animal_icon.png'
        }
        else if(providerProffession == 'psychotherapist'){
          providerIcon = 'http://healmap.cleverapps.io/img/psychologist_icon.png'
        }
        else if(providerProffession == 'beauty_salon'){
        }

        var markerIcon = {
          url: providerIcon,
          scaledSize: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0), // used if icon is a part of sprite, indicates image position in sprite
          anchor: new google.maps.Point(20,40) // lets offset the marker image
        };
        console.log(provider);
        return new google.maps.Marker({
          position: provider.geometry.location,
          icon: markerIcon,
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
