
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class HealMapLib{
  api_adress = 'https://healmap.cleverapps.io';
  googleMapsApiAdress = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  constructor(private http:Http){}



  getVenueFromGoogleMaps(lat,long,radius,types,name){
    return this.http.get(this.googleMapsApiAdress+'location='+lat.toString()+','+long.toString()+'&radius='+radius+'&types='+types+'&name='+name+'&key=AIzaSyBcO1IqeLhU6f45OGXay4eqyW5n2KalyUo');
  }

}
