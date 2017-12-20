export class Position{


  constructor(longitude: string, latitude: string) {
    this._longitude = longitude;
    this._latitude = latitude;
  }

  private _longitude: string;
  private _latitude: string;


  get longitude(): string {
    return this._longitude;
  }

  set longitude(value: string) {
    this._longitude = value;
  }

  get latitude(): string {
    return this._latitude;
  }

  set latitude(value: string) {
    this._latitude = value;
  }
}
