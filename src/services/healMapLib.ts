
import {Http, RequestOptions,Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {AlertController, ToastController} from "ionic-angular";
import {User} from "../models/user";
import {Storage} from "@ionic/storage";


@Injectable()
export class HealMapLib{
  api_address = 'https://healmap.cleverapps.io';
  googleMapsApiAdress = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  static user;
  static token:string ="";
  constructor(private http:Http,
              private alertCtrl:AlertController,
              private toastCtrl:ToastController,
              private storageCtrl:Storage){}


  public login(email,password){
      console.log(email+" " +password);
      return this.http.post(this.api_address + '/users/sign_in.json',{"user":{"email":email,"password":password}});
  }

  public signUp(formValues){
    return this.http.post(this.api_address + '/users.json',
      {"user":{"email":formValues.value.email,
                     "password":formValues.value.password,
                      "name":formValues.value.name,
                      "surname":formValues.value.surname,
                      "phone_no":formValues.value.tel}});
  }

  public checkLogin(){
    let opt = this.setHeader();
    console.log(opt);
    return this.http.get(this.api_address + '/users/login_check',opt);
  }


  // Function for setting key and value on devices storage.
  public storageControl(key:string,value:string){
    this.storageCtrl.set(key,value)
      .then( success =>{
          this.setTokenFromStorage();
          return success;
        }
      )
      .catch(
        err => {
          this.showToast(err,3000,"bottom");
        }
      );

  }

  // sets token to static variable named token in this class after login.
  public setTokenFromStorage():string{
    this.storageCtrl.get("user").then(data=>{
        HealMapLib.token= data.token;
        return HealMapLib.token;
      }
    ).catch(err=> {
      this.showToast(err,300,"bottom");
    })
    return '';
  }


  // to set request header for authentication
  private setHeader():RequestOptions{

    let opt:RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Authorization',HealMapLib.token);

    opt = new RequestOptions({
      headers:myHeaders
    });

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

  getVenueFromGoogleMaps(lat,long,radius,types,name,distance){

    let typesString="";
    if(types.length > 0){
      types.forEach(element=>{
        if(types.indexOf(element) == types.length-1){
          typesString += element;
        }else{
          typesString += element + '|'
        }
      })
    }

    return this.http.get(this.googleMapsApiAdress+'location='+lat+','+long+'&radius='+radius+'&types='+typesString+'&name='+name+'&key=AIzaSyBcO1IqeLhU6f45OGXay4eqyW5n2KalyUo');

  }

  public showAlert(title:string,subTitle:string,buttons:any[]) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }
  public showToast(message: string,duration:number,position:string){

    const toast = this.toastCtrl.create({
      message : message,
      duration : duration,
      position : position
    })
    toast.present();
  }


  // sets user object to user static variable which locates in this class after login.
  public setUserInfoAfterLogin(user:any){
    console.log(user);
    let u:User=new User();
    Object.assign(u,user);
    HealMapLib.user = u;
  }

  //It removes all of users from device local storage.
  public logOutFromStorageAndAuth(){
    this.storageCtrl.clear().then(
      data => {
        return true;
      }
    ).catch(err =>{
      this.showToast(err,3000,"bottom");
      return false;
    })
  }
  public getProfessions(){
    return this.http.get(this.api_address + '/app_data');
  }

  public createProviderProfile(form){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/provider/create',{'profession_id':form.value.profession_id,'description':form.value.name},opt);
  }
  public getUserInfoFromStorage(){
    return this.storageCtrl.get('user');
  }
  public getProviderProfile(provider_id){
    return this.http.get(this.api_address + '/provider/'+provider_id);
  }

  public updateLocation(lat,lng){
    let opt = this.setHeader();
    return this.http.post(this.api_address+'/provider/update_position' ,{lat:lat,lng:lng},opt);
  }


  public createReview(provider_id,review,star){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/provider/' + provider_id +'/comment',{comment_body:review,score:star},opt);
  }

  public getReviews(provider_id){
    return this.http.get(this.api_address + '/provider/' + provider_id + '/comments');
  }
  getProvidersToMap(lat_top_left,lat_bottom_right,lng_top_left,lng_bottom_right){
    return this.http.get(this.api_address + '/query?lat_top_left=' + lat_top_left + '&lat_bottom_right=' +lat_bottom_right + '&lng_top_left=' + lng_top_left + '&lng_bottom_right=' + lng_bottom_right);
  }
}
