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
import { ConnectivityServiceProvider } from "../connectivity-service/connectivity-service";
import { Geolocation } from "@ionic-native/geolocation";
import { Retro } from "../../components/googleMapStyle";
var GoogleMapsProvider = (function () {
    function GoogleMapsProvider(connectivityService, geolocation) {
        this.connectivityService = connectivityService;
        this.geolocation = geolocation;
        this.mapInitialised = false;
        this.retro = Retro;
    }
    GoogleMapsProvider.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        return this.loadGoogleMaps();
    };
    GoogleMapsProvider.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                if (_this.connectivityService.isOnline()) {
                    window['mapInit'] = function () {
                        _this.initMap().then(function (map) {
                            resolve(map);
                        });
                        _this.enableMap();
                    };
                    var script = document.createElement("script");
                    script.id = "googleMaps";
                    if (_this.apiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + _this.apiKey + '&callback=mapInit';
                    }
                    else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (_this.connectivityService.isOnline()) {
                    _this.initMap().then(function (map) {
                        resolve(map);
                    });
                    _this.enableMap();
                }
                else {
                    _this.disableMap();
                }
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMapsProvider.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            _this.geolocation.getCurrentPosition().then(function (position) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                    center: latLng,
                    zoom: 16,
                    maxZoom: 22,
                    minZoom: 15,
                    streetViewControl: false,
                    mapTypeControl: false,
                    keyboardShortcuts: false,
                    fullScreenControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.map = new google.maps.Map(_this.mapElement, mapOptions);
                _this.map.setOptions({ styles: _this.retro });
                resolve(_this.map);
            });
        });
    };
    GoogleMapsProvider.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMapsProvider.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMapsProvider.prototype.addConnectivityListeners = function () {
        var _this = this;
        this.connectivityService.watchOnline().subscribe(function () {
            console.log("online");
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMaps();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    _this.enableMap();
                }
            }, 2000);
        }, function (error2) {
            error2.toString();
        });
        this.connectivityService.watchOffline().subscribe(function () {
            console.log("offline");
            _this.disableMap();
        });
    };
    GoogleMapsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ConnectivityServiceProvider,
            Geolocation])
    ], GoogleMapsProvider);
    return GoogleMapsProvider;
}());
export { GoogleMapsProvider };
//# sourceMappingURL=google-maps.js.map