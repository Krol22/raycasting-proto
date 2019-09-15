import { map } from './map';

const MAP_ROWS = 24;
const MAP_COLS = 24;

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'white'; 

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.x;
  mouseY = e.y;
});

class Particle {
  constructor() {
    this.posX = 100;
    this.posY = 200;
    this.rays = [];
    for (let i = -Math.PI; i < Math.PI; i+=Math.PI / 100) {
      this.rays.push(new Ray(this.posX, this.posY, i));
    }
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.posX, this.posY);
    ctx.arc(0, 0, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
    // for (let i = 0; i < this.rays.length; i++) {
      // this.rays[i].draw();
    // }
  }

  update() {
    this.posX = mouseX;
    this.posY = mouseY;
    this.rays = [];
    for (let i = -Math.PI; i < Math.PI; i += Math.PI / 100) {
      this.rays.push(new Ray(this.posX, this.posY, i));
    }
  }

  look(walls) {
    this.rays.forEach(ray => {
      let closest = null;
      let record = Infinity;
      walls.forEach(wall => {
        const pt = ray.cast(wall);
        if (pt) {
          const d = Math.sqrt(Math.pow(this.posX - pt.x, 2) + Math.pow(this.posY - pt.y ,2));
          if (d < record) {
            record = d;
            closest = pt;
          }

        }
      });

      if (closest) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.posX, this.posY);
        ctx.moveTo(0, 0);
        ctx.lineTo(closest.x - this.posX, closest.y - this.posY);
        ctx.stroke();
        ctx.restore();
      }
    });
  }
}

class Boundary {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  draw() {
    ctx.save();
    ctx.beginPath();    
    ctx.lineWidth = '3';
    ctx.translate(this.x1, this.y1);
    ctx.moveTo(0, 0);
    ctx.lineTo(this.x2 - this.x1, this.y2 - this.y1);
    ctx.stroke();
    ctx.restore();
  }
}

class Ray {
  constructor(x, y, angle) {
    this.posX = x;
    this.posY = y;
    this.dirX = Math.sin(angle);
    this.dirY = Math.cos(angle);
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.translate(this.posX, this.posY);
    ctx.moveTo(0, 0);
    ctx.lineTo(this.dirX * 50, this.dirY * 50)
    ctx.stroke();
    ctx.restore();
  }

  setDirection(x, y) {
    this.dirX = x - this.posX;
    this.dirY = y - this.posY;

    const len = Math.sqrt(Math.pow(this.dirX, 2) + Math.pow(this.dirY, 2));
    this.dirX = this.dirX / len;
    this.dirY = this.dirY / len;
  }

  cast(wall) {
    const { x1, x2, y1, y2 } = wall;

    const x3 = this.posX;
    const y3 = this.posY;

    const x4 = this.posX + this.dirX;
    const y4 = this.posY + this.dirY;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    // ray and wall are parallel
    if (den === 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t <= 0 || t >= 1 || u <= 0) {
      return;
    }

    return {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1)
    };
  }
}

const wall = new Boundary(300, 100, 300, 300);
const wall2 = new Boundary(300, 100, 200, 300);
const wall3 = new Boundary(100, 200, 300, 100);
const walls = [
  wall,
  wall2,
  wall3,
];

const particle = new Particle();

const update = () => {
  ctx.clearRect(0, 0, 800, 600);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 600);
  walls.forEach(wall => {
    wall.draw();
  });

  particle.look(walls);
  particle.draw();
  particle.update();
  // ray.draw();
  // ray.setDirection(mouseX, mouseY);
// //
  // let pt = ray.cast(wall);
  // if (pt) {
    // ctx.save();
    // ctx.beginPath();
    // ctx.translate(pt.x, pt.y);
    // ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    // ctx.stroke();
    // ctx.restore();
  // }
};

const loop = () => {
  update();
  window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);
