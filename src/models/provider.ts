import {User} from "./user";
import {Profession} from "./profession";

export class Provider extends User{

  private _professionId: String;
  private _profession:Profession;
  private _comment_count:number;
  private _comments:string[];
  private _description: String;
  private _lat:String;
  private _lng:String;


  get professionId(): String {
    return this._professionId;
  }

  set professionId(value: String) {
    this._professionId = value;
  }

  get profession(): Profession {
    return this._profession;
  }

  set profession(value: Profession) {
    this._profession = value;
  }

  get comment_count(): number {
    return this._comment_count;
  }

  set comment_count(value: number) {
    this._comment_count = value;
  }

  get comments(): string[] {
    return this._comments;
  }

  set comments(value: string[]) {
    this._comments = value;
  }

  get description(): String {
    return this._description;
  }

  set description(value: String) {
    this._description = value;
  }

  get lat(): String {
    return this._lat;
  }

  set lat(value: String) {
    this._lat = value;
  }

  get lng(): String {
    return this._lng;
  }

  set lng(value: String) {
    this._lng = value;
  }
}
