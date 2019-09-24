import { map } from './map';
import Vector2d from './vector2d';
import { InputManager } from './inputManager';

const mapValue = (input, a, b, c, d) => {
  return c + ((d - c) / (b - a)) * (input - a);
};

const objects = [
  {
    pos: new Vector2d(11, 18),
    type: 'AMMO',
  },
];

const ctx = document.querySelector('#game-canvas').getContext('2d');
const floorCtx = document.querySelector('#floor-canvas').getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

InputManager.init('#game-canvas');

const textureSize = 16;

let playerPos = new Vector2d(12, 18);
let playerDir = new Vector2d(-1, 0);

let planeX = 0;
let planeY = 0.66;

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

function drawFloorInLowerWalls(backWall, playerPos, ray, stepX, stepY, x) {
  const { dir, drawEnd } = ray;

  let backWallPerpWallDist;
  let backWallMapPos = backWall.mapPos;
  if (backWall.side === 0) {
    backWallPerpWallDist = (backWallMapPos.x - playerPos.x + (1 - stepX) / 2) / dir.x;
  } else {
    backWallPerpWallDist = (backWallMapPos.y - playerPos.y + (1 - stepY) / 2) / dir.y;
  }

  let backWallFloorLineHeigth = Math.floor(Math.abs(resolutionHeight / backWallPerpWallDist));
  let floorStart = resolutionHeight / 2 + backWallFloorLineHeigth / 2;
  let floorEnd = floorStart - backWallFloorLineHeigth / 3;
  ctx.fillStyle = 'blue';
  ctx.fillRect(x, floorEnd, 1, drawEnd - floorEnd);
}

function drawFloorAndCeling(mapPos, side, wallX, ray, x) {
  const { perpWallDist, drawStart, dir } = ray;
  let floorXWall; 
  let floorYWall;

  if(side === 0 && dir.x > 0) {
    floorXWall = mapPos.x;
    floorYWall = mapPos.y + wallX;
  } else if(side === 0 && dir.x < 0) {
    floorXWall = mapPos.x + 1.0;
    floorYWall = mapPos.y + wallX;
  } else if(side === 1 && dir.y > 0) {
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

    const destFloorIndex = (resolutionWidth * y + x) * 4;
    const destCeilIndex = (resolutionWidth * (resolutionHeight - y) + x) * 4;

    addPixelToImageData(floorImageData, sourceIndex, rayCastingImageData, destFloorIndex, 255);
    addPixelToImageData(celingImageData, sourceIndex, rayCastingImageData, destCeilIndex, 255);
  }
}

function DDA(rayDir) {
  const hitWalls = [];
  const mapPos = new Vector2d(Math.floor(playerPos.x), Math.floor(playerPos.y));

  let side;
  let sideDistX, sideDistY;
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

const drawObjects = (playerPos, rayDir, x) => {
  objects.forEach(({ pos }) => {
    const angle = Vector2d.findAngle(Vector2d.addVectors(playerPos, rayDir), playerPos, pos);
    if (angle < Math.PI / 6) {
      ctx.fillStyle = 'red';
      ctx.fillRect(x, 50, 10, 10);
    }
  });
};

const update = () => {
  for (let x = 0; x < resolutionWidth; x++) {
    const cameraX = 2 * x / resolutionWidth - 1; 
    const rayDir = new Vector2d(playerDir.x + planeX * cameraX, playerDir.y + planeY * cameraX);

    drawObjects(playerPos, rayDir, x);

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

      let textureX = Math.floor((wallX - Math.floor(wallX)) * textureSize);
      ctx.drawImage(image, textureX, 0, 1, textureSize, x, ray.drawEnd, 1, lineHeight / (value === 3 ? value : 1));
      drawFloorAndCeling(mapPos, side, wallX, ray, x);
      if (value === 3 && backWall) {
        drawFloorInLowerWalls(backWall, playerPos, ray, stepX, stepY, x);
      }

    });
  }
};

const rotSpeed = 0.07;
const movementSpeed = 0.1;
const playerMovement = () => {
  if (InputManager.keys[87] && InputManager.keys[87].isDown) {
    playerPos.y += playerDir.y * movementSpeed;
    playerPos.x += playerDir.x * movementSpeed;
  }

  if (InputManager.keys[83] && InputManager.keys[83].isDown) {
    playerPos.y -= playerDir.y * movementSpeed;
    playerPos.x -= playerDir.x * movementSpeed;
  }

  if (InputManager.keys[68] && InputManager.keys[68].isDown) {
    const oldDirX = playerDir.x;
    playerDir.x = playerDir.x * Math.cos(-rotSpeed) - playerDir.y * Math.sin(-rotSpeed);
    playerDir.y = oldDirX * Math.sin(-rotSpeed) + playerDir.y * Math.cos(-rotSpeed);

    const oldPlaneX = planeX;
    planeX = planeX * Math.cos(-rotSpeed) - planeY * Math.sin(-rotSpeed);
    planeY = oldPlaneX * Math.sin(-rotSpeed) + planeY * Math.cos(-rotSpeed);
  }

  if (InputManager.keys[65] && InputManager.keys[65].isDown) {
    const oldDirX = playerDir.x;
    playerDir.x = playerDir.x * Math.cos(rotSpeed) - playerDir.y * Math.sin(rotSpeed);
    playerDir.y = oldDirX * Math.sin(rotSpeed) + playerDir.y * Math.cos(rotSpeed);

    const oldPlaneX = planeX;
    planeX = planeX * Math.cos(rotSpeed) - planeY * Math.sin(rotSpeed);
    planeY = oldPlaneX * Math.sin(rotSpeed) + planeY * Math.cos(rotSpeed);
  }
};

const loop = () => {
  ctx.clearRect(0, 0, 800, 400);
  floorCtx.clearRect(0, 0, 800, 400);
  ctx.save();
  rayCastingImageData = new ImageData(resolutionWidth, resolutionHeight);
  update(); 
  ctx.restore();
  // floorCtx.putImageData(rayCastingImageData, 0, 0);
  window.requestAnimationFrame(loop);

  playerMovement();
};

window.addEventListener('keydown', e => {
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
