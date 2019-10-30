import { copyPixel } from './imageData.helper';
import { resolutionWidth, resolutionHeight } from './config';
import Vector2d from './vector2d';

const textureSize = 16;
const mapValue = (input, a, b, c, d) => {
  return c + ((d - c) / (b - a)) * (input - a);
};

/*
const renderType = {
  WALL: 'WALL',
  OBJECT: 'OBJECT'
};

TODO: 

1. sort ALL objects that will be rendered by length from player/camera position,
1.5 FUCK! I need to change drawObject method because now it's just drawing object, there is no ray casting
1.6 Or I could find a way to merge drawWall and drawObject somehow together? :thinking: 
2. for each ray (x) draw all objects from further to nearest,
*/

export default class RaycastRenderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.rayCastingImageData = new ImageData(resolutionWidth, resolutionHeight);
    this.camera = {
      planeX: 0.62,
      planeY: 0.66,
      lookY: 0,
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

      hitWalls.push({
        id: 4,
        mapPos: new Vector2d(x1 + t * (x2 - x1), y1 + t * (y2 - y1)),
        height,
        texture,
        side: 0,
      });
    }

    return [hitWalls];
  }

// function drawFloorInLowerWalls(backWall, window.playerPos, ray, stepX, stepY, x) {
  // const { dir, drawEnd } = ray;
//
  // let backWallPerpWallDist;
  // let backWallMapPos = backWall.mapPos;
  // if (backWall.side === 0) {
    // backWallPerpWallDist = (backWallMapPos.x - window.playerPos.x + (1 - stepX) / 2) / dir.x;
  // } else {
    // backWallPerpWallDist = (backWallMapPos.y - window.playerPos.y + (1 - stepY) / 2) / dir.y;
  // }
//
  // let backWallFloorLineHeigth = Math.floor(Math.abs(resolutionHeight / backWallPerpWallDist));
  // let floorStart = resolutionHeight / 2 + backWallFloorLineHeigth / 2;
  // let floorEnd = floorStart - backWallFloorLineHeigth / 3;
  // ctx.fillStyle = 'blue';
  // ctx.fillRect(x, floorEnd, 1, drawEnd - floorEnd);
// }

  // drawFloorAndCeling(mapPos, side, wallX, ray, x) {
    // const { perpWallDist, drawStart, dir } = ray;
    // let floorXWall;
    // let floorYWall;
//
    // if(side === 0 && dir.x > 0) {
      // floorXWall = mapPos.x;
      // floorYWall = mapPos.y + wallX;
    // } else if(side === 0 && dir.x < 0) {
      // floorXWall = mapPos.x + 1.0;
      // floorYWall = mapPos.y + wallX;
    // } else if(side === 1 && dir.y > 0) {
      // floorXWall = mapPos.x + wallX;
      // floorYWall = mapPos.y;
    // } else {
      // floorXWall = mapPos.x + wallX;
      // floorYWall = mapPos.y + 1.0;
    // }
//
    // for (let y = Math.floor(drawStart); y < resolutionHeight + Math.abs(this.camera.lookY); y++) {
      // const currentDist = resolutionHeight / (2 * y - resolutionHeight);
      // const weight = currentDist / perpWallDist;
//
      // const currentFloorX = (weight * floorXWall + (1 - weight) * playerPos.x);
      // const currentFloorY = (weight * floorYWall + (1 - weight) * playerPos.y);
//
      // const floorTexX = Math.floor(currentFloorX * textureSize) % textureSize;
      // const floorTexY = Math.floor(currentFloorY * textureSize) % textureSize;
//
      // const alpha = Math.floor(mapValue(currentDist, 0, 7, 255, 0));
//
      // copyPixel(floorImageData, floorTexX, floorTexY, textureSize, this.rayCastingImageData, x, y + camera.lookY, resolutionWidth, alpha);
      // copyPixel(celingImageData, floorTexX, floorTexY, textureSize, this.rayCastingImageData, x, resolutionHeight - y + camera.lookY, resolutionWidth, alpha);
    // }
  // }
//
  drawObjects(player, objects) {
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
      const { uDiv = 1, vDiv = 1, vMove = 0, texture } = obj;

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

      /*
        TODO 2:
        I think I could use drawStartX and drawEndX to properly sort objects and draw them while raycasting,
        because if drawStartX === x then it should draw walls => objects etc.
      */

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
      });

      for (let stripe = Math.floor(drawStartX); stripe < drawEndX; stripe++) {
        const texX = Math.floor(256 * (stripe - (-spriteWidth / 2 + spriteScreenX)) * texWidth / spriteWidth) / 256;
        if (transformY > 0) {
          for(let y = Math.floor(drawStartY); y < drawEndY; y++) {
            const d = (y - vMoveScreen) * 256 - resolutionHeight * 128 + spriteHeight * 128;
            const texY = ((d * texHeight) / spriteHeight) / 256;

            copyPixel(texture, texX, texY, textureSize, this.rayCastingImageData, stripe, y, resolutionWidth);
          }
        }
      }
    });

    return sortedObjects
      .sort((obj1, obj2) => {
        return obj1.drawStartX - obj2.drawStartX;
      });
  };

  drawWalls(player, walls, objects) {
    const { position, dir } = player;

    for (let x = 0; x < resolutionWidth; x++) {
      const cameraX = 2 * x / resolutionWidth - 1; 
      const rayDir = new Vector2d(dir.x + this.camera.planeX * cameraX, dir.y + this.camera.planeY * cameraX);

      const [hitWalls] = this.castRays(position, rayDir, walls);

      hitWalls.reverse().forEach(hitWall => {
        const ray = {};
        ray.dir = rayDir;

        let { mapPos, texture } = hitWall;
        const side = 1;

        ray.perpWallDist = (mapPos.x - position.x) / ray.dir.x;

        let lineHeight = Math.floor(Math.abs(resolutionHeight / ray.perpWallDist));

        ray.drawStart = (resolutionHeight + lineHeight) / 2;
        ray.drawEnd = ray.drawStart - lineHeight;

        let wallX;
        if (side === 0) {
          wallX = position.y + ray.perpWallDist * ray.dir.y;
        } else {
          wallX = position.x + ray.perpWallDist * ray.dir.x;
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
        lineHeight;

        let mapValueMin = offsetDE ? offsetDE : 0;
        let mapValueMax = offsetDS ? offsetDS : lineHeight;

        const objectsToDraw = objects.filter(obj => {
          return obj.drawStartX === Math.floor(ray.drawStart);
        });

        const drawAheadWall = objectsToDraw.filter(obj => obj.len < ray.perpWallDist);
        // const drawBehindWall = objectToDraw.filter(obj => obj.len > ray.perpWallDist);

        if (drawAheadWall.length) {
          drawAheadWall.forEach(({
            drawStartX,
            drawEndX,
            drawStartY,
            drawEndY,
            spriteScreenX, 
            spriteWidth,
            spriteHeight,
            transformY,
            texWidth,
            texHeight,
            vMoveScreen,
            obj,
          }) => {
            console.log('draw');
            const texX = Math.floor(256 * (x - (-spriteWidth / 2 + spriteScreenX)) * texWidth / spriteWidth) / 256;
            if (transformY > 0) {
              for(let y = Math.floor(drawStartY); y < drawEndY; y++) {
                const d = (y - vMoveScreen) * 256 - resolutionHeight * 128 + spriteHeight * 128;
                const texY = ((d * texHeight) / spriteHeight) / 256;

                copyPixel(obj.texture, texX, texY, textureSize, this.rayCastingImageData, x, y, resolutionWidth);
              }
            }
          });
        }

        for (let i = this.camera.lookY < 0 ? this.camera.lookY : 0; i < lineHeight + (this.camera.lookY > 0 ? this.camera.lookY : 0); i++) {
          const textureY = Math.floor(
            mapValue(i,
              mapValueMin,
              mapValueMax,
              0,
              textureSize
            )
          );

          copyPixel(texture, textureX, textureY, textureSize, this.rayCastingImageData, Math.floor(x), Math.floor(ray.drawStart - i + this.camera.lookY), resolutionWidth);
        }
      });
    }
  }

  update(player, objects, walls) {
    this.rayCastingImageData = new ImageData(resolutionWidth, resolutionHeight);
    this.ctx.clearRect(0, 0, 800, 400);
    const sortedObjects = this.drawObjects(player, objects);
    this.drawWalls(player, walls, sortedObjects);
    this.ctx.putImageData(this.rayCastingImageData, 0, 0);
  }
}

