// Ferry class definition
class Ferry {
    constructor(maxCars, maxPeople) {
        this.maxCars = maxCars;
        this.maxPeople = maxPeople;
        this._carCount = 0;
        this._peopleCount = 0;
        this.cars = []; // To keep track of cars on the ferry
    }

    board(car) {
        // Check if adding this car would exceed the limits
        if (this._carCount + 1 <= this.maxCars && this._peopleCount + car.passengerCount <= this.maxPeople) {
            car.incrementTripCount();
            this._carCount++;
            this._peopleCount += car.passengerCount;
            this.cars.push(car);

            // Determine the discount or free trip
            if (car.tripCount === 7) {
                return 'you go free!';
            } else if (car.tripCount === 3) {
                return 'half price!';
            } else {
                return 'accepted';
            }
        } else {
            return 'rejected';
        }
    }

    leave(car) {
        const carIndex = this.cars.indexOf(car);
        if (carIndex !== -1) {
            this._carCount--;
            this._peopleCount -= car.passengerCount;
            this.cars.splice(carIndex, 1);
        }
    }

    countCarsByColor(colour) {
        return this.cars.filter(car => car.colour === colour).length;
    }

    get carCount() {
        return this._carCount;
    }

    get peopleCount() {
        return this._peopleCount;
    }
}

module.exports = Ferry;
