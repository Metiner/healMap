import {User} from "./user";

export class Review{

  private _body:string;
  private _user:User;


  get body(): string {
    return this._body;
  }

  set body(value: string) {
    this._body = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
