const assert = require('assert');
const Ferry = require('../ferry');
const Car = require('../car');

// Test suite for Ferry class
describe('Ferry Class', () => {
    
    it('should allow a car to board if within limits', () => {
        const ferry = new Ferry(5, 10);
        const car = new Car('red', 4);
        assert.strictEqual(ferry.board(car), 'accepted');
        assert.strictEqual(ferry.carCount, 1);
        assert.strictEqual(ferry.peopleCount, 4);
    });

    it('should reject a car if car limit is exceeded', () => {
        const ferry = new Ferry(1, 10);
        const car1 = new Car('red', 4);
        const car2 = new Car('blue', 2);
        ferry.board(car1);
        assert.strictEqual(ferry.board(car2), 'rejected');
    });

    it('should reject a car if people limit is exceeded', () => {
        const ferry = new Ferry(5, 4);
        const car = new Car('red', 5);
        assert.strictEqual(ferry.board(car), 'rejected');
    });

    it('should correctly track the number of cars of a specific color', () => {
        const ferry = new Ferry(5, 10);
        const redCar1 = new Car('red', 2);
        const redCar2 = new Car('red', 3);
        const blueCar = new Car('blue', 2);

        ferry.board(redCar1);
        ferry.board(redCar2);
        ferry.board(blueCar);

        assert.strictEqual(ferry.countCarsByColor('red'), 2);
        assert.strictEqual(ferry.countCarsByColor('blue'), 1);
    });

    it('should update the counts correctly when a car leaves the ferry', () => {
        const ferry = new Ferry(5, 10);
        const car1 = new Car('red', 4);
        const car2 = new Car('blue', 2);

        ferry.board(car1);
        ferry.board(car2);
        ferry.leave(car1);

        assert.strictEqual(ferry.carCount, 1);
        assert.strictEqual(ferry.peopleCount, 2);
    });

    it('should give a 50% discount after 3 trips on the same ferry', () => {
        const ferry = new Ferry(5, 10);
        const car = new Car('red', 2);

        ferry.board(car); // 1st trip
        ferry.board(car); // 2nd trip
        assert.strictEqual(ferry.board(car), 'half price!');
    });

    it('should give a free trip after 7 trips on any ferry', () => {
        const ferry1 = new Ferry(5, 10);
        const ferry2 = new Ferry(5, 10);
        const car = new Car('red', 2);

        ferry1.board(car); // 1st trip
        ferry1.board(car); // 2nd trip
        ferry1.board(car); // 3rd trip
        ferry1.board(car); // 4th trip
        ferry1.board(car); // 5th trip
        ferry1.board(car); // 6th trip
        ferry1.board(car); // 1st trip
        assert.strictEqual(ferry1.board(car), 'you go free!');
    });
});
