import {Provider} from "./provider";

export class Profession extends Provider{

  private _professionName:String;


  get professionName(): String {
    return this._professionName;
  }

  set professionName(value: String) {
    this._professionName = value;
  }
}
