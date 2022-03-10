//@ts-check

class Point {
  /** 
   * @param {number!} x x coordinate
   * @param {number!} y y coordinate
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return other.x === this.x && other.y === this.y;
  }
}

// Collection of points
class Ship {
  /** 
   * @param {Point!} location location of ship
   * @param {number!} length length of ship
   */
  constructor(location, length) {
    /**
     * Location of ship
     * @type {Point!}
     * @private
     */
    this.location = location;

    /**
     * Length of ship
     * @type {number!}
     * @private
     */
    this.length = length;
  }

  // constructor(private location: Point, private length: number) {}

  /** @returns {Point[]} */
  getAllPoints() {
    //loop through length to get points
    let points = [];
    for (let index = 0; index < this.length; index++) {
      points.push(new Point(this.location.x + index, this.location.y));
    }
    return points;
  }

  /** @param {Point} point */
  containsPoint(point) {
    // return point.x >= this.x && point.x < (this.x + this.length) && point.y === this.y;

    const allPoints = this.getAllPoints();
    return allPoints.some((p) => point.equals(p));
  }
}

class Gameboard {
  /** @param {Ship[]} ships */
  constructor(ships) {
    this.ships = ships;

    /**
     * State (TODO add more detail)
     * @type {("default"|"hit"|"miss")[][]}
     * @private
     */
    this.state = Array.from(Array(10), () => Array(10).fill("default"));
  }

  /** @param {Point} point */
  fire(point) {
    const cellState = this.state[point.x][point.y];

    if (cellState !== "default") {
      return;
    }

    // HIT: some ship contains point
    // MISS: not hit

    // happy path
    const isHit = this.ships.some((ship) => ship.containsPoint(point));
    this.state[point.x][point.y] = isHit ? "hit" : "miss";
  }

  /**
   * @param {Point!} point
   * @returns {"default"|"hit"|"miss"}
   */
  getState(point) {
    return this.state[point.x][point.y];
  }
}

module.exports = { Point, Ship, Gameboard };



// 1. Data models
// 2. Class (OOP)
// 3. Methods
// 4. Implementation