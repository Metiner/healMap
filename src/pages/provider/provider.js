var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { mapExpandAnimation } from "../../components/animations";
import { Geolocation } from "@ionic-native/geolocation";
import { GoogleMapsCluster } from "../../providers/google-maps-cluster/google-maps-cluster";
import { GoogleMapsProvider } from "../../providers/google-maps/google-maps";
var ProviderPage = (function () {
    function ProviderPage(geolocation, platform, maps, mapCluster) {
        this.geolocation = geolocation;
        this.platform = platform;
        this.maps = maps;
        this.mapCluster = mapCluster;
        this.expanded = false;
        this.marginTop = -500;
    }
    ProviderPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var mapLoaded = _this.maps.init(_this.mapRef.nativeElement, _this.pleaseConnect.nativeElement).then(function (map) {
                //this.mapCluster.addCluster(map);
            });
        });
    };
    ProviderPage.prototype.expandMap = function () {
        if (this.marginTop == -500) {
            this.marginTop = -100;
        }
        else {
            this.marginTop = -500;
        }
        this.expanded = !this.expanded;
    };
    __decorate([
        ViewChild('map_canvas'),
        __metadata("design:type", ElementRef)
    ], ProviderPage.prototype, "mapRef", void 0);
    __decorate([
        ViewChild('pleaseConnect'),
        __metadata("design:type", ElementRef)
    ], ProviderPage.prototype, "pleaseConnect", void 0);
    ProviderPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-provider',
            templateUrl: 'provider.html',
            animations: [mapExpandAnimation]
        }),
        __metadata("design:paramtypes", [Geolocation,
            Platform,
            GoogleMapsProvider,
            GoogleMapsCluster])
    ], ProviderPage);
    return ProviderPage;
}());
export { ProviderPage };
//# sourceMappingURL=provider.js.map