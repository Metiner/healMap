import {Provider} from "./provider";

export class User{

  private _id: number;
  private _email: String;
  private _name: String;
  private _surname: String;
  private _phone: number;
  private _aboutMe: String;
  private _address: String;
  private _providerProfile:Provider;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): String {
    return this._email;
  }

  set email(value: String) {
    this._email = value;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get surname(): String {
    return this._surname;
  }

  set surname(value: String) {
    this._surname = value;
  }

  get phone(): number {
    return this._phone;
  }

  set phone(value: number) {
    this._phone = value;
  }

  get aboutMe(): String {
    return this._aboutMe;
  }

  set aboutMe(value: String) {
    this._aboutMe = value;
  }

  get address(): String {
    return this._address;
  }

  set address(value: String) {
    this._address = value;
  }

  get providerProfile(): Provider {
    return this._providerProfile;
  }

  set providerProfile(value: Provider) {
    this._providerProfile = value;
  }
}
