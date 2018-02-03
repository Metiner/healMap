var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, RequestOptions, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "ionic-angular";
import { User } from "../models/user";
import { Storage } from "@ionic/storage";
var HealMapLib = (function () {
    function HealMapLib(http, alertCtrl, toastCtrl, storageCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.storageCtrl = storageCtrl;
        this.api_address = 'https://healmap.cleverapps.io';
        this.googleMapsApiAdress = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    }
    HealMapLib_1 = HealMapLib;
    HealMapLib.prototype.login = function (email, password) {
        return this.http.post(this.api_address + '/users/sign_in.json', { "user": { "email": email, "password": password } });
    };
    HealMapLib.prototype.signUp = function (email, password) {
        console.log(email + ' ' + password);
        return this.http.post(this.api_address + '/users.json', { "user": { "email": email, "password": password } });
    };
    HealMapLib.prototype.checkLogin = function () {
        var opt = this.setHeader();
        console.log(opt);
        return this.http.get(this.api_address + '/users/login_check', opt);
    };
    // Function for setting key and value on devices storage.
    HealMapLib.prototype.storageControl = function (key, value) {
        var _this = this;
        this.storageCtrl.set(key, value)
            .then(function (success) {
            _this.setTokenFromStorage();
            return success;
        })
            .catch(function (err) {
            _this.showToast(err, 3000, "bottom");
        });
    };
    // sets token to static variable named token in this class after login.
    HealMapLib.prototype.setTokenFromStorage = function () {
        var _this = this;
        this.storageCtrl.get("user").then(function (data) {
            HealMapLib_1.token = data.token;
            return HealMapLib_1.token;
        }).catch(function (err) {
            _this.showToast(err, 300, "bottom");
        });
        return '';
    };
    // to set request header for authentication
    HealMapLib.prototype.setHeader = function () {
        var opt;
        var myHeaders = new Headers;
        myHeaders.set('Authorization', HealMapLib_1.token);
        opt = new RequestOptions({
            headers: myHeaders
        });
        return opt;
    };
    HealMapLib.prototype.updateLocationPrecise = function (lat, long) {
        var opt = this.setHeader();
        return this.http.post(this.api_address + '/users/location/precise', { lat: lat, long: long }, opt);
    };
    HealMapLib.prototype.updateLocationVenue = function (venue_id) {
        var opt = this.setHeader();
        return this.http.post(this.api_address + '/user/location/venue', { venue_id: venue_id });
    };
    HealMapLib.prototype.getVenuesDetails = function (venue_ids) {
        //This request will show up details regarding to a place, with users currently there.
        //This request doesnt need any headers, guests should be able to check for this request too.
        // let query_params = new URLSearchParams();
        // for(let venue_id of venue_ids){
        //   query_params.append('venue_id',venue_id);
        // }
        // I am not sure about this query params stuff yet, I haven't tested it.
        return this.http.get(this.api_address + '/venue/details', { params: { venue_ids: venue_ids } });
    };
    // The arguments for this function is north-east and south-west of an area, which is going to be used in the search.
    // This request will only bring the people without any venue attached.
    HealMapLib.prototype.getLocationDetails = function (sw_lat, sw_long, ne_lat, ne_long) {
        return this.http.get(this.api_address + '/location/all', { params: { sw_lat: sw_lat, sw_long: sw_long, ne_lat: ne_lat, ne_long: ne_long } });
    };
    HealMapLib.prototype.getVenueFromGoogleMaps = function (lat, long, radius, types, name, distance) {
        var typesString = "";
        if (types.length > 0) {
            types.forEach(function (element) {
                if (types.indexOf(element) == types.length - 1) {
                    typesString += element;
                }
                else {
                    typesString += element + '|';
                }
            });
        }
        return this.http.get(this.googleMapsApiAdress + 'location=' + lat + ',' + long + '&radius=' + radius + '&types=' + typesString + '&name=' + name + '&key=AIzaSyBcO1IqeLhU6f45OGXay4eqyW5n2KalyUo');
    };
    HealMapLib.prototype.showAlert = function (title, subTitle, buttons) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: buttons
        });
        alert.present();
    };
    HealMapLib.prototype.showToast = function (message, duration, position) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position
        });
        toast.present();
    };
    // sets user object to user static variable which locates in this class after login.
    HealMapLib.prototype.setUserInfoAfterLogin = function (user) {
        var u = new User();
        Object.assign(u, user);
        HealMapLib_1.user = u;
    };
    HealMapLib.token = "";
    HealMapLib = HealMapLib_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            AlertController,
            ToastController,
            Storage])
    ], HealMapLib);
    return HealMapLib;
    var HealMapLib_1;
}());
export { HealMapLib };
//# sourceMappingURL=healMapLib.js.map