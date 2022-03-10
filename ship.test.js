//@ts-check

// specifications
const { Ship, Point, Gameboard } = require("./ship.js");

describe("containsPoint", () => {
  it("returns true if ship contains point", () => {
    //given
    let myShip = new Ship(new Point(0, 0), 2);

    ///action
    let isContainingPoint = myShip.containsPoint(new Point(1, 0));

    expect(isContainingPoint).toEqual(true);
  });

  it("returns false if ship does not contain point", () => {
    //given
    let myShip = new Ship(new Point(0, 0), 2);

    ///action
    let isContainingPoint = myShip.containsPoint(new Point(3, 0));

    expect(isContainingPoint).toEqual(false);
  });
});

describe("getAllPoints", () => {
  it("getAllPoints returns all points", () => {
    // Given ...
    let myShip = new Ship(new Point(0, 0), 2);

    // Action ...
    let allPoints = myShip.getAllPoints();

    // Expect
    expect(allPoints).toEqual([new Point(0, 0), new Point(1, 0)]);
  });
});

describe("fire", () => {
  it("updates cell state to hit if some ship contains given point", () => {
    // Given ...
    let myShip = new Ship(new Point(0, 0), 2);
    let myShip2 = new Ship(new Point(0, 1), 2);
    const gameboard = new Gameboard([myShip, myShip2]);

    expect(gameboard.getState(new Point(1, 1))).toEqual("default");

    // Action ...
    gameboard.fire(new Point(1, 1));

    // Expect
    expect(gameboard.getState(new Point(1, 1))).toEqual("hit");
  });

  it("updates cell state to miss if no ship contains given point", () => {
    // Given ...
    const gameboard = new Gameboard([new Ship(new Point(1, 2), 3)]);

    expect(gameboard.getState(new Point(3, 3))).toEqual("default");

    // Action ...
    gameboard.fire(new Point(3, 3));

    // Expect
    expect(gameboard.getState(new Point(3, 3))).toEqual("miss");
  });

  it("doesnt update cell state if it is already fired at", () => {
    //given
    let myShip = new Ship(new Point(0, 0), 2);
    let myShip2 = new Ship(new Point(0, 1), 2);
    const gameboard = new Gameboard([myShip, myShip2]);

    gameboard.fire(new Point(0, 1));

    expect(gameboard.getState(new Point(0, 1))).toEqual("hit");

    //action
    gameboard.fire(new Point(0, 1));

    //expect

    expect(gameboard.getState(new Point(0, 1))).toEqual("hit");
  });
});
