var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent = __decorate([
        Component({
            selector: 'header-component',
            template: "\n    <ion-navbar>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-20>\n            <button\n              ion-button\n              icon-only\n              clear\n              small\n              menuToggle>\n              <img style=\"height: 100%;width: 100%;border-radius: 50%\" src=\"assets/imgs/pp.png\">\n            </button>\n          </ion-col>\n          <ion-col col-20 offset-30>\n            <img style=\"height: 100%;width: 100%\" src=\"assets/imgs/dashboard_logo.png\">\n          </ion-col>\n          <ion-col col-10 offset-30 style=\"display: inline-flex;align-items: center;\">\n            <button\n              ion-button\n              icon-only\n              clear\n              small\n              right\n              menuToggle>\n              <ion-icon style=\"color:lightgray\" name=\"notifications\"></ion-icon>\n            </button>\n            <button\n              right\n              ion-button\n              icon-only\n              clear\n              small\n              menuToggle>\n              <ion-icon style=\"color:lightgray\" name=\"search\"></ion-icon>\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-navbar>"
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.js.map