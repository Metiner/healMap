import {User} from "./user";

export class Provider{

  private _id:number;
  private _comment_count:number;
  private _comments:any[];
  private _description:string;
  private _lat:string;
  private _lng:string;
  private _profession:any;
  private _user:User;

  constructor() {
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get comment_count(): number {
    return this._comment_count;
  }

  set comment_count(value: number) {
    this._comment_count = value;
  }

  get comments(): any[] {
    return this._comments;
  }

  set comments(value: any[]) {
    this._comments = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get lat(): string {
    return this._lat;
  }

  set lat(value: string) {
    this._lat = value;
  }

  get lng(): string {
    return this._lng;
  }

  set lng(value: string) {
    this._lng = value;
  }

  get profession(): any {
    return this._profession;
  }

  set profession(value: any) {
    this._profession = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
