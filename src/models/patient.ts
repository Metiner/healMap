export class Patient{

  private _id: number;
  private _email: String;
  private _name: String;
  private _surname: String;
  private _phone: number;
  private _aboutMe: String;
  private _adress: String;


  constructor(id: number, email: String, name: String, surname: String, phone: number) {
    this._id = id;
    this._email = email;
    this._name = name;
    this._surname = surname;
    this._phone = phone;
  }


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

  get adress(): String {
    return this._adress;
  }

  set adress(value: String) {
    this._adress = value;
  }
}
