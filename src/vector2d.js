export default class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  static addVectors(v0, v1) {
    return new Vector2d(v0.x + v1.x, v0.y + v1.y);
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  mul(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  div(scalar) {
    this.x /= scalar;
    this.y /= scalar;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const m = this.mag();
    this.div(m);
  }

  rotateAroundVector(vector, angle, inRadians) {
    if (inRadians) {
        angle = angle * (180 / Math.PI);
    }

    let { x, y } = this;

    x -= vector.x;
    y -= vector.y

    this.x = x * Math.cos(angle) - y * Math.sin(angle);
    this.y = y * Math.cos(angle) + x * Math.sin(angle);

    this.x += vector.x;
    this.y += vector.y;
  }

  static magnitude(v1, v2) {
    return Math.sqrt(
      Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2)
    );
  }

  static findAngle(v0, v1, v2) {
    let a = Math.pow(v1.x - v0.x, 2) + Math.pow(v1.y - v0.y, 2);
    let b = Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2);
    let c = Math.pow(v2.x - v0.x, 2) + Math.pow(v2.y - v0.y, 2);

    let delta = (a + b - c) / Math.sqrt(4 * a * b);
    let angle = Math.acos(delta);

    if (delta < -1) {
      return Math.PI;
    } else if (delta > 1) {
      return 0;
    }

    if (v0.y > v1.y) {
      angle = 2 * Math.PI - angle;
    }

    return angle;
  }
}
