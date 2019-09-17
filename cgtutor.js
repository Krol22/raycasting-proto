import { map } from './map';
console.log(map);

const MAP_WIDTH = 24;
const MAP_HEIGHT = 24;

const ctx = document.querySelector('#game-canvas').getContext('2d');

let posX = 22;
let posY = 12;
let dirX = -1;
let dirY = 0;

let planeX = 0;
let planeY = 0.66;

let time = 0;
let oldTime = 0;

let cameraX, rayDirX, rayDirY;

let w = 400;
let h = 400;

const update = () => {
  // cast 'RAYS';
  for (let x = 0; x < w; x++) {
    cameraX = 2 * x / w - 1; 

    // get ray direction
    rayDirX = dirX + planeX * cameraX;
    rayDirY = dirY + planeY * cameraX;

    // -------- DDA ---------

    // get player coords;
    const mapX = Math.floor(posX);
    const mapY = Math.floor(posY);

    // length of ray from current position to next x or y-side
    let sideDistX, sideDistY;

    // length of ray from one x or y-side to next x or y-side
    let deltaDistX = Math.abs(1 / rayDirX);
    let deltaDistY = Math.abs(1 / rayDirY);
    let prepWallDist;

    // direction of step
    let stepX;
    let stepY;

    let hit = false;
    let side; // 0 if x-axis side was hit 1 when y-axis side was hit

    // calculate step & initial sideDist,

    if (rayDirX < 0) {
      stepX = -1;
      sideDistX = (posX - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1.0 - posX) * deltaDistX;
    }
    if (rayDirY < 0) {
      stepY = -1;
      sideDistY = (posY - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1.0 - posY) * deltaDistY;
    } 

    // Actual DDA
    while (!hit) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
      }

      if (map[mapX][mapY] > 0) {
        hit = true;
      }
    }

    // ------- DDA DONE -------

    // Calculate distance projected on camera
    if (side = 0) {
      prepWallDist = (mapX - posX + (1 - stepX) / 2) / rayDirX;
    } else {
      prepWallDist = (mapY - posY + (1 - stepY) / 2) / rayDirY;
    }

    // Calculate col height;
    let lineHeight = h / prepWallDist;

    // calculate lowest and highest pixel;

    let drawStart = -lineHeight / 2 + h / 2;
    if (drawStart < 0) drawStart = 0;

    let drawEnd = lineHeight / 2 + h / 2;
    if (drawEnd >= h) drawEnd = h - 1;

    let color;
    switch(map[mapX][mapY]) {
      case(1): {
        color= 'red';
        break;
      }
      case(2): {
        color= 'green';
        break;
      }
      case(3): {
        color= 'blue';
        break;
      }
      case(4): {
        color= 'white';
        break;
      }
      default: {
        color= 'yellow';
      }
    }

    ctx.save();
    ctx.translate(x * 10, drawStart);
    ctx.moveTo(0, 0);
    ctx.fillStyle = color;
    ctx.rect(0, 0, x * 10, drawEnd);
    ctx.restore();
  }
};

const loop = () => {
  update(); 
  window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);
