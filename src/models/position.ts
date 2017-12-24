export class Position{


  constructor(longitude: number, latitude: number) {
    this._longitude = longitude;
    this._latitude = latitude;
  }

  private _longitude: number;
  private _latitude: number;


  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }
}
