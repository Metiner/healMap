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
        for(let i=0;i<providersFromGoogle.length;i++){
          if(providersFromGoogle[i].types[0] == 'dentist'){
            imagePath = 'assets/imgs/dentist/m';
            markers.push(this.createMarker(providersFromGoogle[i]));
          }
        }
        this.markerClusterers.set(provider,this.createMarkerCluster(map, markers,imagePath));
        break;
      case 'pharmacy':
        for(let i=0;i<providersFromGoogle.length;i++){
          if(providersFromGoogle[i].types[0] == 'pharmacy'){
            imagePath = 'assets/imgs/pharmacy/m';
            markers.push(this.createMarker(providersFromGoogle[i]));
          }
        }
        this.markerClusterers.set(provider,this.createMarkerCluster(map, markers,imagePath));

        break;
      case 'veterinary_care':
        for(let i=0;i<providersFromGoogle.length;i++){
          if(providersFromGoogle[i].types[0] == 'veterinary_care'){
            imagePath = 'assets/imgs/veterinary_care/m';
            markers.push(this.createMarker(providersFromGoogle[i]));
          }
        }
        this.markerClusterers.set(provider,this.createMarkerCluster(map, markers,imagePath));

        break;
      case 'hospital':
        for(let i=0;i<providersFromGoogle.length;i++){
          if(providersFromGoogle[i].types[0] == 'hospital'){
            imagePath = 'assets/imgs/doctor/m';
            markers.push(this.createMarker(providersFromGoogle[i]));
          }
        }
        this.markerClusterers.set(provider,this.createMarkerCluster(map, markers,imagePath));

        break;
      case 'beauty_salon':
        console.log(providersFromGoogle);
        for(let i=0;i<providersFromGoogle.length;i++){
          if(providersFromGoogle[i].types[0] == 'beauty_salon' || providersFromGoogle[i].types[0] == 'beauty saloon'){
            imagePath = 'assets/imgs/beauty_salon/m';
            markers.push(this.createMarker(providersFromGoogle[i]));
          }
        }
        this.markerClusterers.set(provider,this.createMarkerCluster(map, markers,imagePath));

        break;
      case 'psychotherapist':
        for(let i=0;i<providersFromGoogle.length;i++){
          if(providersFromGoogle[i].types[0] == 'psychotherapist'){
            imagePath = 'assets/imgs/psychotherapist/m';
            markers.push(this.createMarker(providersFromGoogle[i]));
          }
        }
        this.markerClusterers.set(provider,this.createMarkerCluster(map, markers,imagePath));

        break;
      case 'physiotherapist':
        for(let i=0;i<providersFromGoogle.length;i++){
          if(providersFromGoogle[i].types[0] == 'physiotherapist'){
            imagePath = 'assets/imgs/physiotherapist/m';
            markers.push(this.createMarker(providersFromGoogle[i]));
          }
        }
        this.markerClusterers.set(provider,this.createMarkerCluster(map, markers,imagePath));

        break;
    }
    })
    loading.dismiss();
  }
      //Creates markers with given provider array.
      createMarker(element){

            if(this.checkIfMarkerAlreadyAdded(element.geometry.location)){
              console.log("var aynısı");
              return;
            }else{
              let providerProffession = element.types[0];
              let providerIcon;
              if (providerProffession == 'doctor') {

                providerIcon = 'http://healmap.cleverapps.io/img/doctor_icon.png';
              }
              else if (providerProffession == 'pharmacy') {
                providerIcon = 'http://healmap.cleverapps.io/img/pharmacists_icon.png';
              }
              else if (providerProffession == 'hospital') {

                providerIcon = 'http://healmap.cleverapps.io/img/hospital_icon.png';
              }
              else if (providerProffession == 'veterinary_care') {
                providerIcon = 'http://healmap.cleverapps.io/img/animal_icon.png';
              }
              else if (providerProffession == 'psychotherapist') {
                providerIcon = 'http://healmap.cleverapps.io/img/psychologist_icon.png';
              }
              else if (providerProffession == 'beauty_salon' || providerProffession.toLowerCase() == 'beauty saloon') {
                providerIcon = 'http://healmap.cleverapps.io/img/beauty_icon.png';
              }
              else if (providerProffession == 'dentist') {
                providerIcon = 'http://healmap.cleverapps.io/img/dentist_icon.png';
              }
              else if (providerProffession == 'physiotherapist') {
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
                lat:Number(element.geometry.location.lat),
                lng:Number(element.geometry.location.lng)
              }
              //----------------------------

              let marker = new google.maps.Marker({
                position: position,
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
        markerClusterer= new MarkerClusterer(map, markers, {imagePath: imagePath,gridSize: 60});
        return markerClusterer;
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


        for(let i=0;i<this.addedMarkers.length;i++){
          let latlong = location.lat + location.lng;
          if(this.addedMarkers[i]===latlong){
            return true;
          }
          else{
            return false;
          }
        }
        return false;
        }

}
