import {Provider} from "./provider";

export class User{

  public _id: number;
  public _email: String;
  public _name: String;
  public _surname: String;
  public _phone: number;
  public _providerProfile:Provider;


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


  get providerProfile(): Provider {
    return this._providerProfile;
  }

  set providerProfile(value: Provider) {
    this._providerProfile = value;
  }
}
