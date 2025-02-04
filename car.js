// Car class definition
class Car {
    constructor(colour, passengerCount) {
        this._colour = colour;
        this._passengerCount = passengerCount;
        this._tripCount = 0; // To track the number of trips for discounts
    }

    get colour() {
        return this._colour;
    }

    get passengerCount() {
        return this._passengerCount;
    }

    incrementTripCount() {
        this._tripCount++;
    }

    get tripCount() {
        return this._tripCount;
    }
}

module.exports = Car;
