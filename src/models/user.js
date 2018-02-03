var User = (function () {
    function User() {
    }
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._email = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "surname", {
        get: function () {
            return this._surname;
        },
        set: function (value) {
            this._surname = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "phone", {
        get: function () {
            return this._phone;
        },
        set: function (value) {
            this._phone = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "aboutMe", {
        get: function () {
            return this._aboutMe;
        },
        set: function (value) {
            this._aboutMe = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "address", {
        get: function () {
            return this._address;
        },
        set: function (value) {
            this._address = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "providerProfile", {
        get: function () {
            return this._providerProfile;
        },
        set: function (value) {
            this._providerProfile = value;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
export { User };
//# sourceMappingURL=user.js.map