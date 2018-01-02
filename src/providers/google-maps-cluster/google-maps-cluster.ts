import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';
import {LoadingController} from "ionic-angular";
import {Events} from "ionic-angular";

declare var google;
@Injectable()
export class GoogleMapsCluster {

  markerClusterers = new Map<string,MarkerClusterer>();
  addedMarkers:string[]=[];

  constructor(public http: Http,
              private loadingCtrl:LoadingController,
              private eventCtrl:Events) {
  }



  // initialization function for adding marker cluster.
  addCluster(map,providersFromGoogle,selectedProviders) {

    const loading = this.loadingCtrl.create({
      content: "Finding..."
    })
    loading.present();
    let markers=[];
    let imagePath;

    selectedProviders.forEach(provider => {
      let filteredProviders=[];
      switch (provider) {
      case 'doctor':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'doctor'){
            this.createMarkers(filteredProviders,provider,element).then(markers=>{
              markers = markers;
            })
          }
        })
        console.log(markers);
        this.createMarkerCluster(map, markers,imagePath).then(createdMarkerCluster =>{
          this.markerClusterers.set(provider,createdMarkerCluster);
        });
         break;
      case 'dentist':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'dentist'){
            this.createMarkers(filteredProviders,provider,element).then(markers=>{
              this.createMarkerCluster(map, markers,imagePath).then(createdMarkerCluster =>{
                this.markerClusterers.set(provider,createdMarkerCluster);
              });
            })
          }
        })
        break;
      case 'pharmacy':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'pharmacy'){
            this.createMarkers(filteredProviders,provider,element).then(markers=>{
              this.createMarkerCluster(map, markers,imagePath).then(createdMarkerCluster =>{
                this.markerClusterers.set(provider,createdMarkerCluster);
              });
            })
          }
        })
        break;
      case 'veterinary_care':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'veterinary_care'){
            this.createMarkers(filteredProviders,provider,element).then(markers=>{
              this.createMarkerCluster(map, markers,imagePath).then(createdMarkerCluster =>{
                this.markerClusterers.set(provider,createdMarkerCluster);
              });
            })
          }
        })
        break;
      case 'hospital':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'hospital'){
            this.createMarkers(filteredProviders,provider,element).then(markers=>{
              this.createMarkerCluster(map, markers,imagePath).then(createdMarkerCluster =>{
                this.markerClusterers.set(provider,createdMarkerCluster);
              });
            })
          }
        })
        break;
      case 'beauty_salon':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'beauty_salon'){
            this.createMarkers(filteredProviders,provider,element).then(markers=>{
              this.createMarkerCluster(map, markers,imagePath).then(createdMarkerCluster =>{
                this.markerClusterers.set(provider,createdMarkerCluster);
              });
            })
          }
        })
        break;
      case 'psychotherapist':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'psychotherapist'){
            this.createMarkers(filteredProviders,provider,element).then(markers=>{
              this.createMarkerCluster(map, markers,imagePath).then(createdMarkerCluster =>{
                this.markerClusterers.set(provider,createdMarkerCluster);
              });
            })
          }
        })
        break;
    }
    })
    loading.dismiss();
  }
      //Creates markers with given provider array.
      createMarkers(filteredProviders,imagePath,element){

          return new Promise((resolve)=>{

          imagePath = 'assets/imgs/veterinary_care/m';
          filteredProviders.push(element);
          let markers = filteredProviders.map((provider) => {
            if(this.checkIfMarkerAlreadyAdded(provider.geometry.location)){

              console.log("var aynısı");
              return;
            }else{
              let providerProffession = provider.types[0];
              let providerIcon;
              if (providerProffession == 'doctor') {
                providerIcon = 'http://healmap.cleverapps.io/img/doctor_icon.png';
              } else if (providerProffession == 'pharmacy') {
                providerIcon = 'http://healmap.cleverapps.io/img/pharmacists_icon.png';
              } else if (providerProffession == 'hospital') {
              }
              else if (providerProffession == 'veterinary_care') {
                providerIcon = 'http://healmap.cleverapps.io/img/animal_icon.png';
              }
              else if (providerProffession == 'psychotherapist') {
                providerIcon = 'http://healmap.cleverapps.io/img/psychologist_icon.png';
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
              this.addedMarkers.push(marker.position.lat()+marker.position.lng());
              return marker;
            }
          });
          resolve(markers);
          })

      }


      //Creates markerCluster with given markers.
      createMarkerCluster(map,markers,imagePath){
        let markerClusterer:MarkerClusterer;
        return new Promise((resolve) =>{
          markerClusterer= new MarkerClusterer(map, markers, {imagePath: imagePath,gridSize: 60});
          resolve(markerClusterer);
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
          cluster.addMarkers(markers);
        })
      }

      //checks if marker already added.
      checkIfMarkerAlreadyAdded(location):boolean{
        this.addedMarkers.forEach(element=>{
          let latlong = location.lat + location.lng;
            if(element===latlong){
             return true;
            }
            else{
             return false;
            }
          });
        return false;
      }
}
