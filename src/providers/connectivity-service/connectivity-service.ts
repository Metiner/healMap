import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";
import {Network} from "@ionic-native/network";
import {Observable} from "rxjs/Observable";

declare var Connection;

@Injectable()
export class ConnectivityServiceProvider {

  onDevice: boolean;

  constructor(public platform:Platform,
              private network:Network){
    this.onDevice = this.platform.is('cordova');
  }

  isOnline():boolean{
    if(this.onDevice && this.network.type){
      return this.network.type !== Connection.NONE;
    }
    else{
      return navigator.onLine;
    }
  }

  isOffline():boolean{
    if(this.onDevice && this.network.type){
      return this.network.type === Connection.NONE;
    }
    else{
      return !navigator.onLine;
    }
  }
  watchOnline(): Observable<any> {
    return this.network.onConnect();
  }

  watchOffline(): Observable<any> {
    return this.network.onDisconnect();
  }

}
