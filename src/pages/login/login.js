var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Events, IonicPage, LoadingController, NavController } from 'ionic-angular';
import { ProviderOrpatientsPage } from "../provider-orpatients/provider-orpatients";
import { HealMapLib } from "../../services/healMapLib";
import { MapPage } from "../map/map";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, healMapLib, loadingCtrl, eventCtrl) {
        this.navCtrl = navCtrl;
        this.healMapLib = healMapLib;
        this.loadingCtrl = loadingCtrl;
        this.eventCtrl = eventCtrl;
        this.providerOrPatientPage = ProviderOrpatientsPage;
        this.itemone = true;
        this.itemtwo = true;
        this.itemthree = true;
        this.itemfour = true;
        this.itemfive = true;
        this.itemsix = true;
        this.itemseven = true;
        this.itemeight = true;
        this.itemnine = true;
        this.itemten = true;
        this.itemeleven = true;
        this.setItemsBooleanOpposite();
    }
    // Standart login
    LoginPage.prototype.onLogin = function (form) {
        var _this = this;
        this.healMapLib.login(form.value.email, form.value.password).subscribe(function (data) {
            // this.onLoginLogo = true;
            if (data.json() != null && data.json().success == true) {
                _this.setItemsBooleanOpposite();
                setTimeout(function () {
                    _this.setStorageAndUserInfoAfterSuccessLogin(data.json());
                }, 1100);
            }
        }, function (error) {
            _this.healMapLib.showAlert(" ", "Yanlış e-mail veya parola girdiniz.", ["Tamam"]);
        });
    };
    //sets the user info to benimfirsatimlib's static user variable and stores token in local storage
    LoginPage.prototype.setStorageAndUserInfoAfterSuccessLogin = function (data) {
        var loading = this.loadingCtrl.create({
            content: "Giriş yapılıyor..."
        });
        loading.present();
        this.healMapLib.setUserInfoAfterLogin(data.user);
        this.eventCtrl.publish('user.login', ' ');
        this.healMapLib.storageControl("user", data);
        this.navCtrl.push(MapPage);
        loading.dismiss();
        this.healMapLib.showToast("Giriş yapıldı", 1500, "bottom");
    };
    // Onsignup Page
    LoginPage.prototype.onSignUp = function () {
        this.navCtrl.push(this.providerOrPatientPage);
    };
    // Continue As a guest
    LoginPage.prototype.onGuest = function () {
        this.navCtrl.popToRoot();
    };
    LoginPage.prototype.setItemsBooleanOpposite = function () {
        var _this = this;
        setTimeout(function () {
            _this.itemone = !_this.itemone;
        }, 0);
        setTimeout(function () {
            _this.itemtwo = !_this.itemtwo;
        }, 100);
        setTimeout(function () {
            _this.itemthree = !_this.itemthree;
        }, 200);
        setTimeout(function () {
            _this.itemfour = !_this.itemfour;
        }, 300);
        setTimeout(function () {
            _this.itemfive = !_this.itemfive;
        }, 400);
        setTimeout(function () {
            _this.itemsix = !_this.itemsix;
        }, 500);
        setTimeout(function () {
            _this.itemseven = !_this.itemseven;
        }, 600);
        setTimeout(function () {
            _this.itemeight = !_this.itemeight;
        }, 700);
        setTimeout(function () {
            _this.itemnine = !_this.itemnine;
        }, 800);
        setTimeout(function () {
            _this.itemten = !_this.itemten;
        }, 900);
        setTimeout(function () {
            _this.itemeleven = !_this.itemeleven;
        }, 1000);
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            HealMapLib,
            LoadingController,
            Events])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map