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

    console.log(providersFromGoogle);
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
        for(let i=0;i<providersFromGoogle.length;i++){
          if(providersFromGoogle[i].types[0] == 'doctor'){
            imagePath = 'assets/imgs/doctor/m';
            markers.push(this.createMarker(providersFromGoogle[i]));
          }
        }
          this.markerClusterers.set(provider,this.createMarkerCluster(map, markers,imagePath));

         break;
      case 'dentist':
        providersFromGoogle.forEach(element => {
          if(element.types[0] == 'dentist'){
            this.createMarker(element).then(markers=>{
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
            imagePath = 'assets/imgs/pharmacy/m';
            this.createMarker(element).then(markers=>{
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
            imagePath = 'assets/imgs/veterinary_care/m';
            this.createMarker(element).then(markers=>{
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
            this.createMarker(element).then(markers=>{
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
            this.createMarker(element).then(markers=>{
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
            this.createMarker(element).then(markers=>{
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
      createMarker(element){

            let imagePath;
            if(this.checkIfMarkerAlreadyAdded(element.geometry.location)){

              console.log("var aynısı");
              return;
            }else{
              let providerProffession = element.types[0];
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
                position: element.geometry.location,
                icon: markerIcon,
              });
              marker.addListener('click',()=>{
                this.eventCtrl.publish('providerDetailOnClick',element,true,providerIcon);
              })
              this.addedMarkers.push(marker.position.lat()+marker.position.lng());
              return marker;
            }



      }


      //Creates markerCluster with given markers.
      createMarkerCluster(map,markers,imagePath){
        let markerClusterer:MarkerClusterer;
        console.log(map);
        console.log(markers);
        console.log(imagePath);
        markerClusterer= new MarkerClusterer(map, markers, {imagePath: imagePath,gridSize: 60});
        return markerClusterer;
        // return new Promise((resolve) =>{
        //
        //   resolve(markerClusterer);
        // })
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
