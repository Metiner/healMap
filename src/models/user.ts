
export class User{

  private _id:number;
  private _avatar_url:string;
  private _email:string;
  private _name:string;
  private _phone_no:number;
  private _provider_id:number;
  private _surname:string;


  constructor() {
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get avatar_url(): string {
    return this._avatar_url;
  }

  set avatar_url(value: string) {
    this._avatar_url = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get phone_no(): number {
    return this._phone_no;
  }

  set phone_no(value: number) {
    this._phone_no = value;
  }

  get provider_id(): number {
    return this._provider_id;
  }

  set provider_id(value: number) {
    this._provider_id = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }
}
