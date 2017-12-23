
import {Http, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class HealMapLib{
  api_address = 'https://healmap.cleverapps.io';
  googleMapsApiAdress = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  static token:string ="";
  constructor(private http:Http){}


  public signUp(email,password){
    console.log(email +' '+ password);
    return this.http.post(this.api_address + '/users.json',{"user":{"email":email,"password":password}});
  }

  public checkLogin(){
    let opt = this.setHeader();
    console.log(opt);
    return this.http.get(this.api_address + '/users/login_check',opt);
  }

  public signupOrLogin(email,name,avatar_url,uid,authResponse,provider_name){
    let opt = this.setHeader();
    return this.http.post(this.api_address+'/users/auto_oauth',{"email":email,"name":name,"avatar_url":avatar_url,"uid":uid,"provider":provider_name,login_data:authResponse},opt);
  }

  public signIn(email,password){
    console.log(email,password);
    return this.http.post(this.api_address + '/users/sign_in.json',{"user":{"email":email,"password":password}});
  }

  // to set request header for authentication
  private setHeader():RequestOptions{

    let opt:RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Authorization',HealMapLib.token);

    //TODO : Something wrong here, probably with imports and stuff, I'll fix it later on.
    // opt = new RequestOptions({
    //   headers:myHeaders
    // });

    return opt;
  }


  updateLocationPrecise(lat,long){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/users/location/precise',{lat:lat,long:long},opt);
  }

  updateLocationVenue(venue_id){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/user/location/venue',{venue_id:venue_id});
  }

  getVenuesDetails(venue_ids){
    //This request will show up details regarding to a place, with users currently there.
    //This request doesnt need any headers, guests should be able to check for this request too.

    // let query_params = new URLSearchParams();
    // for(let venue_id of venue_ids){
    //   query_params.append('venue_id',venue_id);
    // }
    // I am not sure about this query params stuff yet, I haven't tested it.
    return this.http.get(this.api_address + '/venue/details',{params:{venue_ids:venue_ids}});
  }

  // The arguments for this function is north-east and south-west of an area, which is going to be used in the search.
  // This request will only bring the people without any venue attached.
  getLocationDetails(sw_lat,sw_long,ne_lat,ne_long){
    return this.http.get(this.api_address + '/location/all',{params:{sw_lat:sw_lat,sw_long:sw_long,ne_lat:ne_lat,ne_long:ne_long}})
  }

  getVenueFromGoogleMaps(lat,long,radius,types,name){
    return this.http.get(this.googleMapsApiAdress+'location='+lat.toString()+','+long.toString()+'&radius='+radius+'&types='+types+'&name='+name+'&key=AIzaSyBcO1IqeLhU6f45OGXay4eqyW5n2KalyUo');
  }

}
