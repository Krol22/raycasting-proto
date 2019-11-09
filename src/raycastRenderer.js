import Vector2d from './vector2d';

import { copyPixel } from './imageData.helper';
import { 
  resolutionWidth, 
  resolutionHeight,
  viewDistance,
  viewDistanceWallFix,
  viewDistanceObjectFix,
} from './config';

/*
  TODO:
  1. Fix performance on floor and celing, 
     max number of iterations should be 
     resolutionWidth * resolutionHeight 
     but it's goes above this number,
*/

const textureSize = 16;

const mapValue = (input, a, b, c, d) => {
  return c + ((d - c) / (b - a)) * (input - a);
};

export default class RaycastRenderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.rayCastingImageData = new ImageData(resolutionWidth, resolutionHeight);
    this.camera = {
      planeX: 0.62,
      planeY: 0.66,
      lookY: 0,
      pointingAt: '',
    };
  }

  getCamera() {
    return this.camera;
  }

  castRays(playerPosition, rayDir, walls) {
    const hitWalls = [];

    for (let i = 0; i < walls.length; i++) {
      const { v1, v2, height, texture } = walls[i];

      const x1 = v1.x;
      const y1 = v1.y;
      const x2 = v2.x;
      const y2 = v2.y;

      const x3 = playerPosition.x;
      const y3 = playerPosition.y;

      const x4 = playerPosition.x + rayDir.x;
      const y4 = playerPosition.y + rayDir.y;

      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

      if (den === 0) { 
        continue;
      }

      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

      if (t <= 0 || t >= 1 || u <= 0) {
        continue;
      }

      const mapPos = new Vector2d(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
      const len = Vector2d.magnitude(mapPos, playerPosition);

      hitWalls.push({
        id: 4,
        side: 0,
        len,
        mapPos,
        height,
        texture,
        type: 'WALL',
      });
    }

    return [hitWalls];
  }

  prepareObjectToDraw(player, objects) {
    const { position, dir } = player;
    const { planeX, planeY, lookY } = this.camera;

    const sortedObjects = [];

    const texWidth = 16;
    const texHeight = 16;

    objects.sort((obj1, obj2) => {
      const len = Vector2d.magnitude(obj1.pos, position);
      const len2 = Vector2d.magnitude(obj2.pos, position);

      return len2 - len;
    }).forEach(obj => {
      const { uDiv = 1, vDiv = 1, vMove = 0 } = obj;

      const spriteX = obj.pos.x - position.x;
      const spriteY = obj.pos.y - position.y;

      const invDet = 1 / (planeX * dir.y - dir.x * planeY);
      const transformX = invDet * (dir.y * spriteX - dir.x * spriteY);
      const transformY = invDet * (- planeY * spriteX + planeX * spriteY);

      const len = Vector2d.magnitude(obj.pos, position);

      const spriteScreenX = Math.floor((resolutionWidth / 2) * (1 + transformX / transformY));

      const vMoveScreen = Math.floor(vMove / transformY) + lookY;

      const spriteHeight = Math.abs(Math.floor(resolutionHeight / transformY)) / vDiv;

      let drawStartY = -spriteHeight / 2 + resolutionHeight / 2 + vMoveScreen;
      if (drawStartY < 0 - lookY) drawStartY = 0;
      let drawEndY = spriteHeight / 2 + resolutionHeight / 2 + vMoveScreen;
      if (drawEndY >= resolutionHeight - lookY) drawEndY = resolutionHeight - 1;

      const spriteWidth = Math.abs(Math.floor(resolutionHeight / transformY)) / uDiv;
      let drawStartX = -spriteWidth / 2 + spriteScreenX;
      if (drawStartX < 0) drawStartX = 0;
      let drawEndX = spriteWidth / 2 + spriteScreenX;
      if (drawEndX >= resolutionWidth) drawEndX = resolutionHeight - 1;

      sortedObjects.push({
        drawStartX: Math.floor(drawStartX),
        drawEndX: Math.floor(drawEndX),
        drawStartY,
        drawEndY,
        vMoveScreen,
        obj,
        len,
        spriteScreenX, 
        spriteWidth,
        spriteHeight,
        transformY,
        texWidth,
        texHeight,
        type: 'OBJECT',
      });

    });

    return sortedObjects;
  }

  drawFloor(player, element, ray, x) {
    const { mapPos } = element;
    const { position } = player;
    const { perpWallDist, drawStart } = ray;

    for (let y = drawStart; y < resolutionHeight - this.camera.lookY; y++) {
      const currentDist = resolutionHeight / (2 * y - resolutionHeight);

      const weight = currentDist / perpWallDist;

      const currentFloorX = (weight * mapPos.x + (1 - weight) * position.x);
      const currentFloorY = (weight * mapPos.y + (1 - weight) * position.y);

      const floorTexX = ~~(currentFloorX * textureSize) % textureSize;
      const floorTexY = ~~(currentFloorY * textureSize) % textureSize;

      const alpha = mapValue(currentDist, 0, viewDistance, 255, 0);

      copyPixel(window.floorImageData, floorTexX, floorTexY, textureSize, this.rayCastingImageData, x, y + this.camera.lookY, resolutionWidth, alpha);
    }
  }

  drawCeling(player, element, ray, x) {
    const { mapPos } = element;
    const { position } = player;
    const { perpWallDist, drawEnd } = ray;

    if (drawEnd < 0) {
      return;
    }

    for (let y = 0 - this.camera.lookY; y < drawEnd; y++) {
      const currentDist = resolutionHeight / (resolutionHeight - 2 * y);
      const weight = currentDist / perpWallDist;

      const currentFloorX = (weight * mapPos.x + (1 - weight) * position.x);
      const currentFloorY = (weight * mapPos.y + (1 - weight) * position.y);

      const floorTexX = ~~(currentFloorX * textureSize) % textureSize;
      const floorTexY = ~~(currentFloorY * textureSize) % textureSize;

      const alpha = mapValue(currentDist, 0, viewDistance, 255, 0);

      copyPixel(window.celingImageData, floorTexX, floorTexY, textureSize, this.rayCastingImageData, x, y + this.camera.lookY, resolutionWidth, alpha);
    }
  }


  drawObject(object, x) {
    const {
      drawStartY,
      drawEndY,
      vMoveScreen,
      spriteScreenX, 
      spriteWidth,
      spriteHeight,
      transformY,
      texWidth,
      texHeight,
      obj,
      len,
    } = object;

    const alpha = mapValue(len, 0, viewDistance * viewDistanceObjectFix, 254, 0);

    const texX = Math.floor(256 * (x - (-spriteWidth / 2 + spriteScreenX)) * texWidth / spriteWidth) / 256;
    if (transformY > 0) {
      for(let y = Math.floor(drawStartY); y < drawEndY; y++) {
        if (x === resolutionWidth / 2 && y === resolutionHeight / 2) {
          this.camera.pointingAt = obj.type;  
        }
        const d = (y - vMoveScreen) * 256 - resolutionHeight * 128 + spriteHeight * 128;
        const texY = ((d * texHeight) / spriteHeight) / 256;

        copyPixel(obj.texture, texX, texY, textureSize, this.rayCastingImageData, x, y, resolutionWidth, alpha);
      }
    }
  }

  drawWall(player, wall, x, rayDir, isClosestWall) {
    const { position } = player;

    const ray = {};
    ray.dir = rayDir;

    let { mapPos, texture } = wall;

    ray.perpWallDist = (mapPos.x - position.x) / ray.dir.x;

    let lineHeight = Math.floor(Math.abs(resolutionHeight / ray.perpWallDist));

    ray.drawStart = (resolutionHeight + lineHeight) / 2;
    ray.drawEnd = ray.drawStart - lineHeight;

    let wallX = position.y + ray.perpWallDist * ray.dir.y;
    wallX += position.x + ray.perpWallDist * ray.dir.x;
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
    lineHeight;

    let mapValueMin = offsetDE ? offsetDE : 0;
    let mapValueMax = offsetDS ? offsetDS : lineHeight;

    const alpha = mapValue(Vector2d.magnitude(position, mapPos), 0, viewDistance * viewDistanceWallFix, 255, 0);

    for (let i = this.camera.lookY < 0 ? this.camera.lookY : 0; i < lineHeight + (this.camera.lookY > 0 ? this.camera.lookY : 0); i++) {
      const textureY = Math.floor(
        mapValue(i,
          mapValueMin,
          mapValueMax,
          0,
          textureSize
        )
      );

      copyPixel(texture, textureX, textureY, textureSize, this.rayCastingImageData, Math.floor(x), Math.floor(ray.drawStart - i + this.camera.lookY), resolutionWidth, alpha);
    }

    if (isClosestWall) {
      this.drawFloor(player, wall, ray, x);
      this.drawCeling(player, wall, ray, x);
    }
  }

  draw(player, walls, objects) {
    const { position, dir } = player;

    for (let x = 0; x < resolutionWidth; x++) {
      const cameraX = 2 * x / resolutionWidth - 1; 
      const rayDir = new Vector2d(dir.x + this.camera.planeX * cameraX, dir.y + this.camera.planeY * cameraX);

      const [hitWalls] = this.castRays(position, rayDir, walls);
      const visibleObjects = objects.filter(({ drawStartX, drawEndX }) => {
        return drawStartX < x && x < drawEndX; 
      });

      const elementsToDraw = [...hitWalls, ...visibleObjects].sort((elem1, elem2) => elem2.len - elem1.len);

      let lastElementIndex = 0;
      for (let i = elementsToDraw.length - 1; i > 0; i--) {
        if (elementsToDraw[i].type === 'WALL') {
          lastElementIndex = i;
          break;
        }
      }

      elementsToDraw.forEach((element, index) => {
        if (element.type === 'WALL') {
          this.drawWall(player, element, x, rayDir, lastElementIndex === index);
          return;
        }

        if (element.type === 'OBJECT') {
          this.drawObject(element, x);
          return;
        }
      });
    }
  }

  update(player, objects, walls) {
    this.camera.pointingAt = 'WORLD';
    this.rayCastingImageData = new ImageData(resolutionWidth, resolutionHeight);
    this.ctx.clearRect(0, 0, 800, 400);
    const preparedObjects = this.prepareObjectToDraw(player, objects);
    this.draw(player, walls, preparedObjects);

    this.ctx.putImageData(this.rayCastingImageData, 0, 0);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      resolutionWidth / 2 - 2,
      resolutionHeight / 2 - 2,
      2,
      2,
    );
  }
}

