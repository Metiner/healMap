var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, Events } from 'ionic-angular';
import { GoogleMapsProvider } from "../../providers/google-maps/google-maps";
import { GoogleMapsCluster } from "../../providers/google-maps-cluster/google-maps-cluster";
import { HealMapLib } from "../../services/healMapLib";
import { Geolocation } from "@ionic-native/geolocation";
var MapPage = (function () {
    function MapPage(navCtrl, navParams, platform, maps, mapCluster, healmapLib, loadingCtrl, geolocation, eventCtrl, changeDetector) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.maps = maps;
        this.mapCluster = mapCluster;
        this.healmapLib = healmapLib;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.eventCtrl = eventCtrl;
        this.changeDetector = changeDetector;
        this.providers = ['Doctor', 'Dentist', 'Pharmacy', 'Hospital', 'Veterinary Care', 'Physiotherapist', 'Beauty Salon', 'Masseur', 'Nurse', 'Nutritionist', 'Personal Trainer'];
        this.providersFromGoogle = [];
        this.providerIds = [];
        this.showProviderDetails = false;
        this.selectedProviderToShowInDetails = {};
        this.selectedProviders = [];
        this.eventCtrl.subscribe('providerDetailOnClick', function (provider, showProviderDetails, providerIcon) {
            _this.selectedProviderToShowInDetails = provider;
            _this.providerIcon = providerIcon;
            _this.showProviderDetails = showProviderDetails;
            _this.changeDetector.detectChanges();
        });
    }
    MapPage_1 = MapPage;
    MapPage.prototype.ionViewWillEnter = function () {
        this.setCenter();
    };
    MapPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var loading = _this.loadingCtrl.create({
                content: "Map is Loading"
            });
            loading.present();
            _this.initMap().then(function (map) {
                _this.map = map;
                _this.getCenterOfMap();
                loading.dismiss();
            });
        });
    };
    MapPage.prototype.setCenter = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (location) {
            _this.userCurrentLocation = location;
            var lat = location.coords.latitude;
            var lng = location.coords.longitude;
            if (_this.map) {
                _this.map.setCenter({
                    lat: lat,
                    lng: lng
                });
            }
        });
    };
    MapPage.prototype.initializeFind = function () {
        var _this = this;
        if (this.radar) {
            this.radar.setMap(null);
        }
        if (this.selectedProviders.length < 1) {
            this.healmapLib.showToast('Please select at least one category!', 3000, "bottom");
        }
        else {
            this.getCenterOfMap().then(function (center) {
                _this.dragStartPosition = center;
                _this.dragEndPosition = center;
                _this.center = center;
                _this.radar = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.2,
                    strokeWeight: 5,
                    fillColor: '#FF0000',
                    fillOpacity: 0.1,
                    map: _this.map,
                    center: _this.center,
                    radius: 400
                });
                _this.getProvidersFromGoogle(center).then(function (providersFromGoogle) {
                    _this.mapCluster.addCluster(_this.map, providersFromGoogle, _this.selectedProviders);
                });
            });
        }
        this.map.addListener("dragend", function () {
            _this.getCenterOfMap().then(function (center) {
                _this.center = center;
            });
        });
    };
    MapPage.prototype.getCenterOfMap = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.center = _this.map.getCenter();
            resolve(_this.map.getCenter());
        });
    };
    MapPage.prototype.initMap = function () {
        var _this = this;
        return new Promise((function (resolve) {
            _this.maps.init(_this.mapRef.nativeElement, _this.pleaseConnect.nativeElement).then(function (map) {
                resolve(map);
            }).catch(function (error) {
                console.log(error);
            });
        }));
    };
    MapPage.prototype.getProvidersFromGoogle = function (center) {
        var _this = this;
        this.providersFromGoogle = [];
        return new Promise(function (resolve) {
            _this.getRadius().then(function (radius) {
                _this.calculateDistance().then(function (calculatedDistance) {
                    try {
                        _this.healmapLib.getVenueFromGoogleMaps(center.lat(), center.lng(), 300, _this.selectedProviders, '', calculatedDistance).subscribe(function (response) {
                            var objects = response.json().results;
                            objects.forEach(function (element) {
                                _this.providersFromGoogle.push(element);
                                _this.providerIds.push(element.id);
                            });
                            resolve(_this.providersFromGoogle);
                        });
                    }
                    catch (e) {
                        console.log(e);
                    }
                });
            });
        });
    };
    MapPage.prototype.onFilterButton = function (pressedButton, providerName) {
        providerName = providerName.toLowerCase();
        providerName = providerName.replace(' ', '_');
        if (pressedButton.pressed) {
            this.removeFromProviderArray(providerName);
            pressedButton.style = 'pressedButtonStyle';
            pressedButton.pressed = false;
        }
        else {
            this.mapReadyFirstToUse = true;
            this.selectedProviders.push(providerName);
            pressedButton.style = 'notPressedButtonStyle';
            pressedButton.pressed = true;
        }
    };
    //sets the center of map to users current location
    MapPage.prototype.locateMe = function () {
        this.setCenter();
        this.setMarker(this.userCurrentLocation.coords.latitude, this.userCurrentLocation.coords.longitude);
    };
    MapPage.prototype.getRadius = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var map = _this.map;
            var bounds = map.getBounds();
            var center = map.getCenter();
            if (bounds && center) {
                var ne = bounds.getNorthEast();
                _this.radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
            }
            return resolve(_this.radius);
        });
    };
    MapPage.prototype.calculateDistance = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.calculatedDistance = google.maps.geometry.spherical.computeDistanceBetween(_this.dragStartPosition, _this.dragEndPosition);
            resolve(_this.calculatedDistance);
        });
    };
    MapPage.prototype.setMarker = function (lat, lng) {
        this.LatLng = new google.maps.LatLng(lat, lng);
        if (this.currentLocationMarker === undefined) {
            this.currentLocationMarker = new google.maps.Marker({
                position: this.LatLng,
                map: this.map,
                animation: google.maps.Animation.BOUNCE,
                icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
            });
            this.currentLocationMarker.setMap(this.map);
        }
    };
    MapPage.prototype.removeFromProviderArray = function (providerName) {
        var index = this.selectedProviders.indexOf(providerName);
        if (index > -1) {
            this.selectedProviders.splice(index, 1);
        }
    };
    //finds providers from the observable area.
    MapPage.prototype.find = function () {
        this.initializeFind();
    };
    MapPage.page = MapPage_1;
    __decorate([
        ViewChild('map_canvas'),
        __metadata("design:type", ElementRef)
    ], MapPage.prototype, "mapRef", void 0);
    __decorate([
        ViewChild('pleaseConnect'),
        __metadata("design:type", ElementRef)
    ], MapPage.prototype, "pleaseConnect", void 0);
    MapPage = MapPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-map',
            templateUrl: 'map.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Platform,
            GoogleMapsProvider,
            GoogleMapsCluster,
            HealMapLib,
            LoadingController,
            Geolocation,
            Events,
            ChangeDetectorRef])
    ], MapPage);
    return MapPage;
    var MapPage_1;
}());
export { MapPage };
//# sourceMappingURL=map.js.map