export class MapObject{

  private _geometry = {};
  private _icon:string;
  private _name:string;
  private _types = [];


  get geometry(): {} {
    return this._geometry;
  }

  set geometry(value: {}) {
    this._geometry = value;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get types(): Array<string> {
    return this._types;
  }

  set types(value: Array<string>) {
    this._types = value;
  }
}
