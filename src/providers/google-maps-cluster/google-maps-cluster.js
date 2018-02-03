var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';
import { LoadingController } from "ionic-angular";
import { Events } from "ionic-angular";
var GoogleMapsCluster = (function () {
    function GoogleMapsCluster(http, loadingCtrl, eventCtrl) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.eventCtrl = eventCtrl;
        this.markerClusterers = new Map();
        this.addedMarkers = [];
    }
    // initialization function for adding marker cluster.
    GoogleMapsCluster.prototype.addCluster = function (map, providersFromGoogle, selectedProviders) {
        var _this = this;
        console.log(providersFromGoogle);
        var loading = this.loadingCtrl.create({
            content: "Finding..."
        });
        loading.present();
        var markers = [];
        var imagePath;
        selectedProviders.forEach(function (provider) {
            var filteredProviders = [];
            switch (provider) {
                case 'doctor':
                    for (var i = 0; i < providersFromGoogle.length; i++) {
                        if (providersFromGoogle[i].types[0] == 'doctor') {
                            imagePath = 'assets/imgs/doctor/m';
                            markers.push(_this.createMarker(providersFromGoogle[i]));
                        }
                    }
                    _this.markerClusterers.set(provider, _this.createMarkerCluster(map, markers, imagePath));
                    break;
                case 'dentist':
                    for (var i = 0; i < providersFromGoogle.length; i++) {
                        if (providersFromGoogle[i].types[0] == 'dentist') {
                            imagePath = 'assets/imgs/dentist/m';
                            markers.push(_this.createMarker(providersFromGoogle[i]));
                        }
                    }
                    _this.markerClusterers.set(provider, _this.createMarkerCluster(map, markers, imagePath));
                    break;
                case 'pharmacy':
                    for (var i = 0; i < providersFromGoogle.length; i++) {
                        if (providersFromGoogle[i].types[0] == 'pharmacy') {
                            imagePath = 'assets/imgs/pharmacy/m';
                            markers.push(_this.createMarker(providersFromGoogle[i]));
                        }
                    }
                    _this.markerClusterers.set(provider, _this.createMarkerCluster(map, markers, imagePath));
                    break;
                case 'veterinary_care':
                    for (var i = 0; i < providersFromGoogle.length; i++) {
                        if (providersFromGoogle[i].types[0] == 'veterinary_care') {
                            imagePath = 'assets/imgs/veterinary_care/m';
                            markers.push(_this.createMarker(providersFromGoogle[i]));
                        }
                    }
                    _this.markerClusterers.set(provider, _this.createMarkerCluster(map, markers, imagePath));
                    break;
                case 'hospital':
                    for (var i = 0; i < providersFromGoogle.length; i++) {
                        if (providersFromGoogle[i].types[0] == 'hospital') {
                            imagePath = 'assets/imgs/doctor/m';
                            markers.push(_this.createMarker(providersFromGoogle[i]));
                        }
                    }
                    _this.markerClusterers.set(provider, _this.createMarkerCluster(map, markers, imagePath));
                    break;
                case 'beauty_salon':
                    for (var i = 0; i < providersFromGoogle.length; i++) {
                        if (providersFromGoogle[i].types[0] == 'beauty_salon') {
                            imagePath = 'assets/imgs/beauty_salon/m';
                            markers.push(_this.createMarker(providersFromGoogle[i]));
                        }
                    }
                    _this.markerClusterers.set(provider, _this.createMarkerCluster(map, markers, imagePath));
                    break;
                case 'psychotherapist':
                    for (var i = 0; i < providersFromGoogle.length; i++) {
                        if (providersFromGoogle[i].types[0] == 'psychotherapist') {
                            imagePath = 'assets/imgs/psychotherapist/m';
                            markers.push(_this.createMarker(providersFromGoogle[i]));
                        }
                    }
                    _this.markerClusterers.set(provider, _this.createMarkerCluster(map, markers, imagePath));
                    break;
                case 'physiotherapist':
                    for (var i = 0; i < providersFromGoogle.length; i++) {
                        if (providersFromGoogle[i].types[0] == 'physiotherapist') {
                            imagePath = 'assets/imgs/physiotherapist/m';
                            markers.push(_this.createMarker(providersFromGoogle[i]));
                        }
                    }
                    _this.markerClusterers.set(provider, _this.createMarkerCluster(map, markers, imagePath));
                    break;
            }
        });
        loading.dismiss();
    };
    //Creates markers with given provider array.
    GoogleMapsCluster.prototype.createMarker = function (element) {
        var _this = this;
        var imagePath;
        if (this.checkIfMarkerAlreadyAdded(element.geometry.location)) {
            console.log("var aynısı");
            return;
        }
        else {
            var providerProffession = element.types[0];
            var providerIcon_1;
            if (providerProffession == 'doctor') {
                providerIcon_1 = 'http://healmap.cleverapps.io/img/doctor_icon.png';
            }
            else if (providerProffession == 'pharmacy') {
                providerIcon_1 = 'http://healmap.cleverapps.io/img/pharmacists_icon.png';
            }
            else if (providerProffession == 'hospital') {
                providerIcon_1 = 'http://healmap.cleverapps.io/img/hospital_icon.png';
            }
            else if (providerProffession == 'veterinary_care') {
                providerIcon_1 = 'http://healmap.cleverapps.io/img/animal_icon.png';
            }
            else if (providerProffession == 'psychotherapist') {
                providerIcon_1 = 'http://healmap.cleverapps.io/img/psychologist_icon.png';
            }
            else if (providerProffession == 'beauty_salon') {
                providerIcon_1 = 'http://healmap.cleverapps.io/img/beauty_icon.png';
            }
            else if (providerProffession == 'dentist') {
                providerIcon_1 = 'http://healmap.cleverapps.io/img/dentist_icon.png';
            }
            else if (providerProffession == 'physiotherapist') {
                providerIcon_1 = 'http://healmap.cleverapps.io/img/ftr_icon.png';
            }
            var markerIcon = {
                url: providerIcon_1,
                scaledSize: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40) // lets offset the marker image
            };
            var marker = new google.maps.Marker({
                position: element.geometry.location,
                icon: markerIcon,
            });
            marker.addListener('click', function () {
                _this.eventCtrl.publish('providerDetailOnClick', element, true, providerIcon_1);
            });
            this.addedMarkers.push(marker.position.lat() + marker.position.lng());
            return marker;
        }
    };
    //Creates markerCluster with given markers.
    GoogleMapsCluster.prototype.createMarkerCluster = function (map, markers, imagePath) {
        var markerClusterer;
        markerClusterer = new MarkerClusterer(map, markers, { imagePath: imagePath, gridSize: 60 });
        return markerClusterer;
    };
    //Clears markers from given cluster.
    GoogleMapsCluster.prototype.clearClusters = function () {
        this.markerClusterers.forEach(function (cluster) {
            cluster.clearMarkers();
        });
    };
    //Adds additional given markers to cluster
    GoogleMapsCluster.prototype.addMarkersToCluster = function (markers, clusterName) {
        this.markerClusterers.forEach(function (cluster) {
            cluster.addMarkers(markers);
        });
    };
    //checks if marker already added.
    GoogleMapsCluster.prototype.checkIfMarkerAlreadyAdded = function (location) {
        for (var i = 0; i < this.addedMarkers.length; i++) {
            var latlong = location.lat + location.lng;
            if (this.addedMarkers[i] === latlong) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    GoogleMapsCluster = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            LoadingController,
            Events])
    ], GoogleMapsCluster);
    return GoogleMapsCluster;
}());
export { GoogleMapsCluster };
//# sourceMappingURL=google-maps-cluster.js.map