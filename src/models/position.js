var Position = (function () {
    function Position(longitude, latitude) {
        this._longitude = longitude;
        this._latitude = latitude;
    }
    Object.defineProperty(Position.prototype, "longitude", {
        get: function () {
            return this._longitude;
        },
        set: function (value) {
            this._longitude = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "latitude", {
        get: function () {
            return this._latitude;
        },
        set: function (value) {
            this._latitude = value;
        },
        enumerable: true,
        configurable: true
    });
    return Position;
}());
export { Position };
//# sourceMappingURL=position.js.map