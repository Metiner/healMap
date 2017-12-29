import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';
import {LoadingController} from "ionic-angular";
import {Events} from "ionic-angular";

declare var google;
@Injectable()
export class GoogleMapsCluster {

  imagePath;
  markerClusterers = new Map<string,MarkerClusterer>();

  constructor(public http: Http,
              private loadingCtrl:LoadingController,
              private eventCtrl:Events) {
  }



  // initialization function for adding marker cluster.
  addCluster(map,providersFromGoogle,selectedProviders) {

    let filteredProviders=[];
    let markers;
    let imagePath;
    selectedProviders.forEach(provider => {
    switch (provider) {
      case 'doctor':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'doctor'){
            filteredProviders.push(element);
          }
        })
            break;
      case 'dentist':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'dentist'){
            filteredProviders.push(element);
          }
        })
        break;
      case 'pharmacy':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'pharmacy'){
            filteredProviders.push(element);
          }
        })
        break;
      case 'veterinary_care':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'veterinary_care'){
            filteredProviders.push(element);
          }
        })
        break;
      case 'hospital':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'hospital'){
            filteredProviders.push(element);
          }
        })
        break;
      case 'beauty_salon':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'beauty_salon'){
            filteredProviders.push(element);
          }
        })
    }
      this.createMarkers(filteredProviders).then(response => {
        markers = response;

        this.clearClusters();
        this.createMarkerCluster(map, markers).then(createdMarkerCluster =>{
          this.markerClusterers.set(provider,createdMarkerCluster);
          console.log(this.markerClusterers);
        });
      })
    })
  }
      //Creates markers with given provider array.
      createMarkers(filteredProviders){

        return new Promise((resolve)=>{

          let markers = filteredProviders.map((provider) => {
            let providerProffession = provider.types[0];
            let providerIcon;
            if (providerProffession == 'doctor') {
              providerIcon = 'http://healmap.cleverapps.io/img/doctor_icon.png'
              this.imagePath = 'assets/imgs/doctor/m';
            } else if (providerProffession == 'pharmacy') {
              providerIcon = 'http://healmap.cleverapps.io/img/pharmacists_icon.png'
              this.imagePath = 'assets/imgs/pharmacy/m';
            } else if (providerProffession == 'hospital') {
            }
            else if (providerProffession == 'veterinary_care') {
              this.imagePath = 'assets/imgs/veterinary_care/m';
              providerIcon = 'http://healmap.cleverapps.io/img/animal_icon.png'
            }
            else if (providerProffession == 'psychotherapist') {
              this.imagePath = 'assets/imgs/psychotherapist/m';
              providerIcon = 'http://healmap.cleverapps.io/img/psychologist_icon.png'
            }
            else if (providerProffession == 'beauty_salon') {
            }

            let markerIcon = {
              url: providerIcon,
              scaledSize: new google.maps.Size(40, 40),
              origin: new google.maps.Point(0, 0), // used if icon is a part of sprite, indicates image position in sprite
              anchor: new google.maps.Point(20, 40) // lets offset the marker image
            };
            let marker = new google.maps.Marker({
              position: provider.geometry.location,
              icon: markerIcon,
            });
            marker.addListener('click',()=>{
              this.eventCtrl.publish('providerDetailOnClick',provider,true,providerIcon);
            })
            return marker;
          });
          resolve(markers);
        })
      }


      //Creates markerCluster with given markers.
      createMarkerCluster(map,markers){
        let markerClusterer:MarkerClusterer;
        return new Promise((resolve) =>{
          const loading = this.loadingCtrl.create({
            content: "Finding..."
          })
          loading.present();
          markerClusterer= new MarkerClusterer(map, markers, {imagePath: this.imagePath,gridSize: 40});
          resolve(markerClusterer);
          loading.dismiss();
        })
      }

      //Clears markers from given cluster.
      clearClusters(){
          this.markerClusterers.forEach(cluster=>{

            cluster.clearMarkers();
          })
      }

      //Adds additional given markers to cluster
      addMarkersToCluster(markers,clusterName){
        this.markerClusterers.forEach(cluster=>{
          console.log(cluster);
          cluster.addMarkers(markers);
        })
      }
}
