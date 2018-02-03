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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = (function () {
    function SignupPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemone = true;
        this.itemtwo = true;
        this.itemthree = true;
        this.itemfour = true;
        this.itemfive = true;
        this.itemsix = true;
        this.itemseven = true;
        this.itemeight = true;
        this.itemnine = true;
        this.setItemsBooleanOpposite();
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.onSignUp = function (form) {
    };
    SignupPage.prototype.setItemsBooleanOpposite = function () {
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
    };
    SignupPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map