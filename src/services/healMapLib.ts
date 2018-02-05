
import {Http, RequestOptions,Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {AlertController, Events, LoadingController, ToastController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {Provider} from "../models/provider";


@Injectable()
export class HealMapLib{
  api_address = 'https://healmap.cleverapps.io';
  googleMapsApiAdress = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  private _provider:Provider;
  private _token:string ="";

  constructor(private http:Http,
              private alertCtrl:AlertController,
              private toastCtrl:ToastController,
              private storageCtrl:Storage,
              public loadingCtrl:LoadingController,
              public eventCtrl:Events){}


  public async login(email,password):Promise<boolean> {

    this.provider = new Provider();
    let flag = false;
    await this.http.post(this.api_address + '/users/sign_in.json', {
      "user": {
        "email": email,
        "password": password
      }
    }).toPromise()
      .then(success => {
        this.token = success.json().token;
        this.provider.user = success.json().user;
        flag = true;
      }).catch(error => {
        this.showToast("Please check credentials.", 3000, "bottom");

        return new Promise<boolean>((resolve) => {
          resolve(false);
        });
      });

    //If user has provider profile, provider profile must set on user object like below.
    if (this.provider.user.provider_id != undefined) {
      await this.getProviderProfile(this.provider.user.provider_id)
        .then(success => {
          this.provider = success.json();
          flag = true;
        })
        .catch(error => {
          this.showToast("Something went wrong!", 3000, "bottom");
          return new Promise<boolean>((resolve) => {
            resolve(false);
          });
        })
    }


    if (flag) {
      const loading = this.loadingCtrl.create({

      })
      this.setTokenAndProviderAfterSuccessLogin(this.provider,this.token);
      return new Promise<boolean>((resolve) => {
        resolve(true);
      });
    }
    else{
      return new Promise<boolean>((resolve) => {
        resolve(false);
      });
    }
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
    return this.http.get(this.api_address + '/users/login_check',opt);
  }

  // to set request header for authentication
  private setHeader():RequestOptions{

    let opt:RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Authorization',this.token);

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
    return this.http.post(this.api_address + '/user/location/venue',{venue_id:venue_id},opt);
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


  //########## GETTING PROVIDER FROM HEALMAP AND GOOGLE MAP SERVERS WITH GIVEN LAN,LNG,RADIUS PARAMETERS

  // For getting providers from googleMap servers due to given lat,long radius parameters.
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

    return this.http.get(this.googleMapsApiAdress+'location='+lat+','+long+'&radius='+radius+'&types='+typesString+'&name='+name+'&key=AIzaSyBcO1IqeLhU6f45OGXay4eqyW5n2KalyUo').toPromise();

  }
  // For getting providers from healMap servers due to given lang, lng parameters.
  public getProvidersToMap(lat_top_left,lat_bottom_right,lng_top_left,lng_bottom_right,profession_ids){
    let professionIds = "";
    for(let professionId of profession_ids){
      if(professionId != undefined)
        professionIds += "&profession_ids=" + professionId;
    }
    return this.http.get(this.api_address + '/query?lat_top_left=' + lat_top_left + '&lat_bottom_right=' +lat_bottom_right + '&lng_top_left=' + lng_top_left + '&lng_bottom_right=' + lng_bottom_right + professionIds).toPromise();
  }

  //######################################################################################################

  // it obvious :d
  public showAlert(title:string,subTitle:string,buttons:any[]) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  // it obvious :d
  public showToast(message: string,duration:number,position:string){

    const toast = this.toastCtrl.create({
      message : message,
      duration : duration,
      position : position
    })
    toast.present();
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

  // Returns provider proffessions from healmap's server.
  public getProfessions(){
    return this.http.get(this.api_address + '/app_data');
  }

  // Function creates provider profile into user's object.
  public createProviderProfile(form){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/provider/create',{'profession_id':form.value.profession_id,'description':form.value.name},opt);
  }

  // It returns user's provider profile if it exists, from HealMap's servers,
  public getProviderProfile(provider_id){
    return this.http.get(this.api_address + '/provider/'+provider_id).toPromise();
  }

  // It updates provider's location with given lat,lng parameters which selected in settings/profileSettings.
  public updateLocation(lat,lng){
    let opt = this.setHeader();
    return this.http.post(this.api_address+'/provider/update_position' ,{lat:lat,lng:lng},opt).toPromise();
  }

  // It adds review to providers profile in servers
  public createReview(provider_id,review,star){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/provider/' + provider_id +'/comment',{comment_body:review,score:star},opt);
  }

  // Returns given provider's reviews
  public getReviews(provider_id){
    return this.http.get(this.api_address + '/provider/' + provider_id + '/comments');
  }

  // Updates user's basic profile informations.
  public updateUserInfo(form,base64ImageToUpload){
    let opt = this.setHeader();
    return this.http.put(this.api_address + '/users.json',{user:{name:form.value.name,surname:form.value.surname,phone_no:form.value.phone,avatar:base64ImageToUpload,password:form.value.password,password_confirmation:form.value.password_confirmation}},opt).toPromise();
  }

  // Updates user's provider description if it exists.
  public updateProviderInfo(description,provider_id){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/provider/' + provider_id ,{description:description},opt).toPromise();
  }


  //sets the user info to user variable and stores token
  setTokenAndProviderAfterSuccessLogin(provider,token){
    this.provider = provider;
    this.token = token;
    this.eventCtrl.publish('user.login',' ');
    this.showToast("Logged in.",1500,"bottom");
  }


  //sends thread request for chat.
  sendThreadRequest(receiver_id){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/threads/request',{receiver_id:receiver_id},opt).toPromise();
  }

  //gets chat threads
  getThread(){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/threads',opt).toPromise();
  }

  get provider(): Provider {
    return this._provider;
  }

  set provider(value: Provider) {
    this._provider = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }




}
