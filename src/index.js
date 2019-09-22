import { map } from './map';
import Vector2d from './vector2d';

const MAP_WIDTH = 24;
const MAP_HEIGHT = 24;
const textureSize = 16;
//
const mapValue = (input, a, b, c, d) => {
  return c + ((d - c) / (b - a)) * (input - a);
};

const ctx = document.querySelector('#game-canvas').getContext('2d');
const floorCtx = document.querySelector('#floor-canvas').getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

let playerPos = new Vector2d(11, 16);
let playerDir = new Vector2d(-1, 0);

let planeX = 0;
let planeY = 0.96;

let rayCastingImageData;
let floorImageData;
let celingImageData;

const getImageData = image => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 0, 0);
  return ctx.getImageData(0, 0, image.width, image.height);
};

function addPixelToImageData(sourceData, sourceIndex, dest, destIndex, alpha) {
  dest.data[destIndex] = sourceData.data[sourceIndex];
  dest.data[destIndex + 1] = sourceData.data[sourceIndex + 1];
  dest.data[destIndex + 2] = sourceData.data[sourceIndex + 2];
  dest.data[destIndex + 3] = alpha;
}

function drawFloorInLowerWalls(backWall, playerPos, rayDir, stepX, stepY, drawEnd, x) {
  let backWallPerpWallDist;
  let backWallMapPos = backWall.mapPos;
  if (backWall.side === 0) {
    backWallPerpWallDist = (backWallMapPos.x - playerPos.x + (1 - stepX) / 2) / rayDir.x;
  } else {
    backWallPerpWallDist = (backWallMapPos.y - playerPos.y + (1 - stepY) / 2) / rayDir.y;
  }

  let backWallFloorLineHeigth = Math.floor(Math.abs(resolutionHeight / backWallPerpWallDist));
  let floorStart = resolutionHeight / 2 + backWallFloorLineHeigth / 2;
  let floorEnd = floorStart - backWallFloorLineHeigth / 3;
  ctx.fillStyle = 'blue';
  ctx.fillRect(x, floorEnd, 1, drawEnd - floorEnd);
}

function drawFloorAndCeling(mapPos, side, rayDir, wallX, drawStart, perpWallDist, x) {
  let floorXWall; 
  let floorYWall;

  if(side === 0 && rayDir.x > 0) {
    floorXWall = mapPos.x;
    floorYWall = mapPos.y + wallX;
  } else if(side === 0 && rayDir.x < 0) {
    floorXWall = mapPos.x + 1.0;
    floorYWall = mapPos.y + wallX;
  } else if(side === 1 && rayDir.y > 0) {
    floorXWall = mapPos.x + wallX;
    floorYWall = mapPos.y;
  } else {
    floorXWall = mapPos.x + wallX;
    floorYWall = mapPos.y + 1.0;
  }

  for (let y = Math.floor(drawStart); y < resolutionHeight; y++) {
    let currentDist = resolutionHeight / (2 * y - resolutionHeight);
    let weight = currentDist / perpWallDist;

    let currentFloorX = (weight * floorXWall + (1 - weight) * playerPos.x);
    let currentFloorY = (weight * floorYWall + (1 - weight) * playerPos.y);

    let floorTexX = Math.floor(currentFloorX * textureSize) % textureSize;
    let floorTexY = Math.floor(currentFloorY * textureSize) % textureSize;

    const sourceIndex = ((textureSize * floorTexY) + floorTexX) * 4;

    const alpha = mapValue(currentDist, 0, 8, 255, 0);

    const destFloorIndex = (resolutionWidth * y + x) * 4;
    const destCeilIndex = (resolutionWidth * (resolutionHeight - y) + x) * 4;

    addPixelToImageData(floorImageData, sourceIndex, rayCastingImageData, destFloorIndex, alpha);
    addPixelToImageData(celingImageData, sourceIndex, rayCastingImageData, destCeilIndex, alpha);

    // ctx.fillStyle = `rgba(0, 0, 0, ${val2})`;
    // ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
    // ctx.fillRect(Math.floor(x), h - Math.floor(y), 1, 1);
  }
}

function DDA(rayDir) {
  const hitWalls = [];
  const mapPos = new Vector2d(Math.floor(playerPos.x), Math.floor(playerPos.y));

  let sideDistX, sideDistY;
  let side;
  let stepX, stepY;

  const deltaDistX = Math.sqrt(1 + (rayDir.y * rayDir.y) / (rayDir.x * rayDir.x));
  const deltaDistY = Math.sqrt(1 + (rayDir.x * rayDir.x) / (rayDir.y * rayDir.y));
  
  if (rayDir.x < 0) {
    stepX = -1;
    sideDistX = (playerPos.x - mapPos.x) * deltaDistX;
  } else {
    stepX = 1;
    sideDistX = (mapPos.x + 1 - playerPos.x) * deltaDistX;
  }
  if (rayDir.y < 0) {
    stepY = -1;
    sideDistY = (playerPos.y - mapPos.y) * deltaDistY;
  } else {
    stepY = 1;
    sideDistY = (mapPos.y + 1 - playerPos.y) * deltaDistY;
  } 

  while (true) {
    if (sideDistX < sideDistY) {
      sideDistX += deltaDistX;
      mapPos.x += stepX;
      mapPos.x = Math.floor(mapPos.x);
      side = 0;
    } else {
      sideDistY += deltaDistY;
      mapPos.y += stepY;
      mapPos.y = Math.floor(mapPos.y);
      side = 1;
    }

    if (map[mapPos.x][mapPos.y] > 0) {
      let newWall = {
        mapPos: new Vector2d(mapPos.x, mapPos.y),
        value: map[mapPos.x][mapPos.y],
        side,
      };

      let backWallX = mapPos.x;
      let backWallY = mapPos.y;
      let backWallSide;

      if (sideDistX < sideDistY) {
        backWallX += stepX;
        backWallX = Math.floor(backWallX);
        backWallSide = 0;
      } else {
        backWallY += stepY;
        backWallY = Math.floor(backWallY);
        backWallSide = 1;
      }

      let backWall = {
        mapPos: new Vector2d(backWallX, backWallY),
        side: backWallSide,
        value: 3,
      };

      newWall.backWall = backWall;
      hitWalls.push(newWall);

      if (map[mapPos.x][mapPos.y] !== 3) {
        break;
      }
    }
  }

  return [hitWalls, stepX, stepY];
}

let image;
const resolutionWidth = 800;
const resolutionHeight = 400;

const update = () => {
  for (let x = 0; x < resolutionWidth; x++) {
    const cameraX = 2 * x / resolutionWidth - 1; 
    const rayDir = new Vector2d(playerDir.x + planeX * cameraX, playerDir.y + planeY * cameraX);

    const [hitWalls, stepX, stepY] = DDA(rayDir);

    // Calculate distance projected on camera
    hitWalls.reverse().forEach(hitWall => {
      const ray = {};
      ray.dir = rayDir;

      let { mapPos, side, value, backWall } = hitWall;

      if (side === 0) {
        ray.perpWallDist = (mapPos.x - playerPos.x + (1 - stepX) / 2) / ray.dir.x;
      } else {
        ray.perpWallDist = (mapPos.y - playerPos.y + (1 - stepY) / 2) / ray.dir.y;
      }

      // Calculate col height;
      let lineHeight = Math.floor(Math.abs(resolutionHeight / ray.perpWallDist));

      // calculate lowest and highest pixel of wall;
      ray.drawStart = (resolutionHeight + lineHeight) / 2 ;
      ray.drawEnd = ray.drawStart - lineHeight / (value === 3 ? value : 1);

      let wallX;
      if (side === 0) {
        wallX = playerPos.y + ray.perpWallDist * ray.dir.y;
      } else {
        wallX = playerPos.x + ray.perpWallDist * ray.dir.x;
      }

      wallX -= Math.floor(wallX);

      if (value === 3 && backWall) {
        drawFloorInLowerWalls(backWall, playerPos, rayDir, stepX, stepY, ray.drawEnd, x);
      }

      let textureX = Math.floor((wallX - Math.floor(wallX)) * textureSize);
      ctx.drawImage(image, textureX, 0, 1, textureSize, x, ray.drawEnd, 1, lineHeight / (value === 3 ? value : 1));

      drawFloorAndCeling(mapPos, side, ray.dir, wallX, ray.drawStart, ray.perpWallDist, x);
    });
  }
};

const loop = () => {
  ctx.clearRect(0, 0, 800, 400);
  floorCtx.clearRect(0, 0, 800, 400);
  ctx.save();
  rayCastingImageData = new ImageData(resolutionWidth, resolutionHeight);
  update(); 
  ctx.restore();
  floorCtx.putImageData(rayCastingImageData, 0, 0);
  window.requestAnimationFrame(loop);
};

const rotSpeed = 0.1;

window.addEventListener('keydown', e => {
  if (e.key === 'w') {
    playerPos.y += playerDir.y * 0.2;
    playerPos.x += playerDir.x * 0.2;
  }
  if (e.key === 's') {
    playerPos.y -= playerDir.y * 0.2;
    playerPos.x -= playerDir.x * 0.2;
  }

  if (e.key === 'd') {
    const oldDirX = playerDir.x;
    playerDir.x = playerDir.x * Math.cos(-rotSpeed) - playerDir.y * Math.sin(-rotSpeed);
    playerDir.y = oldDirX * Math.sin(-rotSpeed) + playerDir.y * Math.cos(-rotSpeed);

    const oldPlaneX = planeX;
    planeX = planeX * Math.cos(-rotSpeed) - planeY * Math.sin(-rotSpeed);
    planeY = oldPlaneX * Math.sin(-rotSpeed) + planeY * Math.cos(-rotSpeed);
  }
  
  if (e.key === 'a') {
    const oldDirX = playerDir.x;
    playerDir.x = playerDir.x * Math.cos(rotSpeed) - playerDir.y * Math.sin(rotSpeed);
    playerDir.y = oldDirX * Math.sin(rotSpeed) + playerDir.y * Math.cos(rotSpeed);

    const oldPlaneX = planeX;
    planeX = planeX * Math.cos(rotSpeed) - planeY * Math.sin(rotSpeed);
    planeY = oldPlaneX * Math.sin(rotSpeed) + planeY * Math.cos(rotSpeed);

  }

  if (e.key === 'q') {
    offset += 10;
  } 

  if (e.key === 'z') {
    offset -= 10;
  }
});

const loadAsset = (src) => {
  return new Promise(resolve => {
    const asset = new Image();
    asset.src = src;
    asset.onload = () => {
      resolve(asset);
    }
  });
};

loadAsset('Wall.png').then((asset) => {
  image = asset;
  return loadAsset('Floor.png')
}).then(asset => {
  floorImageData = getImageData(asset)
  return loadAsset('Celling.png')
}).then(asset => {
  celingImageData = getImageData(asset);
  window.requestAnimationFrame(loop);
});
