import { map } from './map';
import Vector2d from './vector2d';
import { InputManager } from './inputManager';

import { getImageDataFromImage, copyPixel } from './imageData.helper';

const mapValue = (input, a, b, c, d) => {
  return c + ((d - c) / (b - a)) * (input - a);
};

const walls = [
  {
    v1: new Vector2d(10, 30),
    v2: new Vector2d(90, 100),
  },
  {
    v1: new Vector2d(30, 10),
    v2: new Vector2d(100, 60),
  },
  {
    v1: new Vector2d(40, 10),
    v2: new Vector2d(80, 60),
  },
];

/*
  Todo: sorting, 
*/

const objects = [
  {
    id: 0,
    pos: new Vector2d(11, 18),
    type: 'AMMO',
    vMove: -160,
    uDiv: 4,
    vDiv: 4
  },
  {
    id: 1,
    pos: new Vector2d(5, 17),
    type: 'AMMO',
    vMove: 160,
    uDiv: 4,
    vDiv: 4
  },
];

const ctx = document.querySelector('#game-canvas').getContext('2d');
const floorCtx = document.querySelector('#floor-canvas').getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

const canvas = document.querySelector('#game-canvas');

const mouseMove = e => {
  playerLookY -= e.movementY;

  const rotSpeed = -e.movementX / 1000;

  const oldDirX = playerDir.x;
  playerDir.x = playerDir.x * Math.cos(rotSpeed) - playerDir.y * Math.sin(rotSpeed);
  playerDir.y = oldDirX * Math.sin(rotSpeed) + playerDir.y * Math.cos(rotSpeed);

  const oldPlaneX = planeX;
  planeX = planeX * Math.cos(rotSpeed) - planeY * Math.sin(rotSpeed);
  planeY = oldPlaneX * Math.sin(rotSpeed) + planeY * Math.cos(rotSpeed);
}

let pointerlockvalue = false;
document.addEventListener('pointerlockchange', event => {
  pointerlockvalue = !pointerlockvalue;

  if (pointerlockvalue) {
    canvas.addEventListener('mousemove', mouseMove);
  } else {
    canvas.removeEventListener('mousemove', mouseMove);
  }
});

canvas.addEventListener('mousedown', () => {
  canvas.requestPointerLock();
})

InputManager.init('#game-canvas');

const textureSize = 16;

let playerDir = new Vector2d(1, -1);
let playerLookY = 0;

let planeX = 0.62;
let planeY = 0.66;

let rayCastingImageData;
let floorImageData;
let celingImageData;
let ammoImageData;
let wallImageData;

let zBuffer = [];

const saveInBuffer = (x, y, rayLength, id) => {
  if (!zBuffer[x]) {
    zBuffer[x] = [];
    zBuffer[x][y] = { rayLength, id };
    return true;
  }

  if (!zBuffer[x][y]) {
    zBuffer[x][y] = { rayLength, id };
    return true;
  }

  if (zBuffer[x][y].rayLength < rayLength) {
    return false;
  }

  zBuffer[x][y] = { rayLength, id };
  return true;
}


// function drawFloorInLowerWalls(backWall, playerPos, ray, stepX, stepY, x) {
  // const { dir, drawEnd } = ray;
//
  // let backWallPerpWallDist;
  // let backWallMapPos = backWall.mapPos;
  // if (backWall.side === 0) {
    // backWallPerpWallDist = (backWallMapPos.x - playerPos.x + (1 - stepX) / 2) / dir.x;
  // } else {
    // backWallPerpWallDist = (backWallMapPos.y - playerPos.y + (1 - stepY) / 2) / dir.y;
  // }
//
  // let backWallFloorLineHeigth = Math.floor(Math.abs(resolutionHeight / backWallPerpWallDist));
  // let floorStart = resolutionHeight / 2 + backWallFloorLineHeigth / 2;
  // let floorEnd = floorStart - backWallFloorLineHeigth / 3;
  // ctx.fillStyle = 'blue';
  // ctx.fillRect(x, floorEnd, 1, drawEnd - floorEnd);
// }

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

  for (let y = Math.floor(drawStart); y < resolutionHeight + Math.abs(playerLookY); y++) {
    const currentDist = resolutionHeight / (2 * y - resolutionHeight);
    const weight = currentDist / perpWallDist;

    const currentFloorX = (weight * floorXWall + (1 - weight) * playerPos.x);
    const currentFloorY = (weight * floorYWall + (1 - weight) * playerPos.y);

    const floorTexX = Math.floor(currentFloorX * textureSize) % textureSize;
    const floorTexY = Math.floor(currentFloorY * textureSize) % textureSize;

    const alpha = Math.floor(mapValue(currentDist, 0, 7, 255, 0));

    copyPixel(floorImageData, floorTexX, floorTexY, textureSize, rayCastingImageData, x, y + playerLookY, resolutionWidth, alpha);
    copyPixel(celingImageData, floorTexX, floorTexY, textureSize, rayCastingImageData, x, resolutionHeight - y + playerLookY, resolutionWidth, alpha);
  }
}

map.walls = [];

const playerPos = new Vector2d(40, 22);
function castRays(rayDir) {
  const hitWalls = [];

  for (let i = 0; i < walls.length; i++) {
    const { v1, v2 } = walls[i];

    const x1 = v1.x;
    const y1 = v1.y;
    const x2 = v2.x;
    const y2 = v2.y;

    const x3 = playerPos.x;
    const y3 = playerPos.y;

    const x4 = playerPos.x + rayDir.x;
    const y4 = playerPos.y + rayDir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (den === 0) { 
      continue;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t <= 0 || t >= 1 || u <= 0) {
      continue;
    }

    hitWalls.push({
      id: 4,
      mapPos: new Vector2d(x1 + t * (x2 - x1), y1 + t * (y2 - y1)),
      value: 1,
      side: 0,
    });
  }

  return [hitWalls];
}

const resolutionWidth = 800;
const resolutionHeight = 600;

const drawObjects = () => {
  objects.forEach(obj => {
    const { uDiv = 1, vDiv = 1, vMove = 0 } = obj;

    const spriteX = obj.pos.x - playerPos.x;
    const spriteY = obj.pos.y - playerPos.y;

    const len = Vector2d.magnitude(obj.pos, playerPos);

    const invDet = 1 / (planeX * playerDir.y - playerDir.x * planeY);
    const transformX = invDet * (playerDir.y * spriteX - playerDir.x * spriteY);
    const transformY = invDet * (-planeY * spriteX + planeX * spriteY);

    const spriteScreenX = Math.floor((resolutionWidth / 2) * (1 + transformX / transformY));

    const vMoveScreen = Math.floor(vMove / transformY) + playerLookY;

    const texWidth = 16;
    const texHeight = 16;

    const spriteHeight = Math.abs(Math.floor(resolutionHeight / transformY)) / vDiv;

    let drawStartY = -spriteHeight / 2 + resolutionHeight / 2 + vMoveScreen;
    if (drawStartY < 0 - playerLookY) drawStartY = 0;
    let drawEndY = spriteHeight / 2 + resolutionHeight / 2 + vMoveScreen;
    if (drawEndY >= resolutionHeight - playerLookY) drawEndY = resolutionHeight - 1;

    const spriteWidth = Math.abs(Math.floor(resolutionHeight / transformY)) / uDiv;
    let drawStartX = -spriteWidth / 2 + spriteScreenX;
    if (drawStartX < 0) drawStartX = 0;
    let drawEndX = spriteWidth / 2 + spriteScreenX;
    if (drawEndX >= resolutionWidth) drawEndX = resolutionHeight - 1;

    for (let stripe = Math.floor(drawStartX); stripe < drawEndX; stripe++) {
      const texX = Math.floor(256 * (stripe - (-spriteWidth / 2 + spriteScreenX)) * texWidth / spriteWidth) / 256;
      if (transformY > 0) {
        for(let y = Math.floor(drawStartY); y < drawEndY; y++) {
          const d = (y - vMoveScreen) * 256 - resolutionHeight * 128 + spriteHeight * 128;
          const texY = ((d * texHeight) / spriteHeight) / 256;

          if (saveInBuffer(stripe, y, len, obj.id)) {
            copyPixel(ammoImageData, texX, texY, textureSize, rayCastingImageData, stripe, y, resolutionWidth);
          }
        }
      }
    }
  });
};

const update = () => {
  objects.forEach(obj => obj.drawn = false);
  for (let x = 0; x < resolutionWidth; x++) {
    const cameraX = 2 * x / resolutionWidth - 1; 
    const rayDir = new Vector2d(playerDir.x + planeX * cameraX, playerDir.y + planeY * cameraX);

    const [hitWalls] = castRays(rayDir);

    // Calculate distance projected on camera
    hitWalls.reverse().forEach(hitWall => {
      const ray = {};
      ray.dir = rayDir;

      let { mapPos } = hitWall;
      const side = 1;

      ray.perpWallDist = (mapPos.x - playerPos.x) / ray.dir.x;

      // Calculate col height;
      let lineHeight = Math.floor(Math.abs(resolutionHeight / ray.perpWallDist));

      // calculate lowest and highest pixel of wall;
      ray.drawStart = (resolutionHeight + lineHeight) / 2;
      ray.drawEnd = ray.drawStart - lineHeight;

      let wallX;
      if (side === 0) {
        wallX = playerPos.y + ray.perpWallDist * ray.dir.y;
      } else {
        wallX = playerPos.x + ray.perpWallDist * ray.dir.x;
      }

      wallX -= Math.floor(wallX);

      const textureX = Math.floor((wallX - Math.floor(wallX)) * textureSize);

      let offsetDS = 0;
      if (ray.drawStart > resolutionHeight) {
        offsetDS = ray.drawStart;
        ray.drawStart = resolutionHeight;
      }

      let offsetDE = 0;
      if (ray.drawEnd < 0) {
        offsetDE = ray.drawEnd;
        ray.drawEnd = 0;
      }

      lineHeight = ray.drawStart - ray.drawEnd;

      let mapValueMin = offsetDE ? offsetDE : 0;
      let mapValueMax = offsetDS ? offsetDS : lineHeight;

      for (let i = playerLookY < 0 ? playerLookY : 0; i < lineHeight + (playerLookY > 0 ? playerLookY : 0); i++) {
        const textureY = Math.floor(
          mapValue(i, 
            mapValueMin,
            mapValueMax,
            0, 
            textureSize
          )
        );

        // if (saveInBuffer(Math.floor(x), Math.floor(ray.drawStart - i + playerLookY), ray.perpWallDist, hitWall.id)) {
          copyPixel(wallImageData, textureX, textureY, textureSize, rayCastingImageData, Math.floor(x), Math.floor(ray.drawStart - i + playerLookY), resolutionWidth);
        // }
      }
    });

  }

  drawObjects(playerPos, playerDir);
};

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

};

const loop = () => {
  zBuffer = [];
  playerMovement();
  floorCtx.clearRect(0, 0, 800, 400);
  rayCastingImageData = new ImageData(resolutionWidth, resolutionHeight);
  update();
  floorCtx.putImageData(rayCastingImageData, 0, 0);
  window.requestAnimationFrame(loop);
};

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
  wallImageData = getImageDataFromImage(asset);
  return loadAsset('Floor.png')
}).then(asset => {
  floorImageData = getImageDataFromImage(asset);
  return loadAsset('Celling.png')
}).then(asset => {
  celingImageData = getImageDataFromImage(asset);
  return loadAsset('Ammo.png')
}).then(asset => {
  ammoImageData = getImageDataFromImage(asset);
  window.requestAnimationFrame(loop);
});
