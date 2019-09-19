import { map } from './map';

// const MAP_WIDTH = 24;
// const MAP_HEIGHT = 24;
//
const mapValue = (input, a, b, c, d) => {
  return c + ((d - c) / (b - a)) * (input - a);
};

const ctx = document.querySelector('#game-canvas').getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;

let posX = 22;
let posY = 10;
let dirX = -1;
let dirY = 0;

let offset = 0;

let planeX = 0;
let planeY = 0.66;

// let time = 0;
// let oldTime = 0;
//
let cameraX, rayDirX, rayDirY;

let image;

let w = 800;
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

    // length of ray from one x or y-side to next x or y-side
    // let deltaDistX = Math.abs(1 / rayDirX);
    // let deltaDistY = Math.abs(1 / rayDirY);
    let deltaDistX = Math.sqrt(1 + (rayDirY * rayDirY) / (rayDirX * rayDirX));
    let deltaDistY = Math.sqrt(1 + (rayDirX * rayDirX) / (rayDirY * rayDirY));
    let perpWallDist;

    // direction of step
    let stepX;
    let stepY;

    // length of ray from current position to next x or y-side
    let sideDistX, sideDistY;

    let hit = false;
    let side; // 0 if x-axis side was hit 1 when y-axis side was hit

    // calculate step & initial sideDist,

    if (rayDirX < 0) {
      stepX = -1;
      sideDistX = (posX - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1 - posX) * deltaDistX;
    }
    if (rayDirY < 0) {
      stepY = -1;
      sideDistY = (posY - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1 - posY) * deltaDistY;
    } 

    const hitWalls = [];
    // Actual DDA
    while (true) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        mapX = Math.floor(mapX);
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        mapY = Math.floor(mapY);
        side = 1;
      }

      if (map[mapX][mapY] > 0) {
        hitWalls.push({
          mapX,
          mapY,
          side,
          value: map[mapX][mapY],
        });
        if (map[mapX][mapY] === 1) {
          break;
        }
      }
    }

    // ------- DDA DONE -------

    // Calculate distance projected on camera
    hitWalls.reverse().forEach(({mapX, mapY, side, value}) => {
      if (side === 0) {
        perpWallDist = (mapX - posX + (1 - stepX) / 2) / rayDirX;
      } else {
        perpWallDist = (mapY - posY + (1 - stepY) / 2) / rayDirY;
      }

      // if (value === 3) {
        // perpWallDist = perpWallDist * 4;
      // }

      // Calculate col height;
      let lineHeight = Math.floor(Math.abs(h / perpWallDist));

      // calculate lowest and highest pixel;
      let drawStart = h / 2 + lineHeight / 2 ;
      let drawEnd = drawStart - lineHeight;
      // if (drawStart < 0) drawStart = 0;

      if (value === 3) {
        drawStart = h / 2 + lineHeight / 2;
        drawEnd = drawStart - lineHeight / value; 
      }

      if (value === 2) {
        drawStart = h / 2 + lineHeight / 2;
        drawEnd = drawStart - lineHeight * value * 1.2; 
      }
      // let drawEnd = drawStart - 5 * 10 + 20;
      // if (value === 3) {
      // }

      let color;
      switch(map[mapX][mapY]) {
        case(1): {
          color= 'red';
          if (side === 1) {
            color = 'salmon';
          }
          break;
        }
        case(2): {
          color= 'green';
          if (side === 1) {
            color = 'springgreen';
          }
          break;
        }
        case(3): {
          color= 'blue';
          if (side === 1) {
            color = 'skyblue';
          }
          break;
        }
        case(4): {
          color= 'white';
          if (side === 1) {
            color = 'whitesmoke';
          }
          break;
        }
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, drawStart, 1, drawEnd - drawStart);

      let wallX
      if (side === 0) {
        wallX = posY + perpWallDist * rayDirY;
      } else {
        wallX = posX + perpWallDist * rayDirX;
      }

      wallX -= Math.floor(wallX);

      let textureSize = 15;
      let textureX = Math.floor(wallX * textureSize);

      if (value === 2) {
        ctx.drawImage(image, textureX, 0, 1, textureSize, x, drawEnd, 1, lineHeight * 1.2 * value);
      } else if (value === 3) {
        ctx.drawImage(image, textureX, 0, 1, textureSize, x, drawEnd, 1, lineHeight / value);
      } else {
        ctx.drawImage(image, textureX, 0, 1, textureSize, x, drawEnd, 1, lineHeight);
      }

      const val2 = mapValue(perpWallDist, 0, 15, 0, 0.5);
      ctx.fillStyle = `rgba(0, 0, 0, ${val2})`;
      ctx.fillRect(x, drawStart, 1, drawEnd - drawStart);
    });
    // WALL TEXTURES

    // FOG
  }
};

const loop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 400);
  update(); 
  window.requestAnimationFrame(loop);
};

const rotSpeed = 0.1;

window.addEventListener('keydown', e => {
  if (e.key === 'w') {
    posY += dirY * 0.2;
    posX += dirX * 0.2;
  }
  if (e.key === 's') {
    posY -= dirY * 0.2;
    posX -= dirX * 0.2;
  }

  if (e.key === 'd') {
    const oldDirX = dirX;
    dirX = dirX * Math.cos(-rotSpeed) - dirY * Math.sin(-rotSpeed);
    dirY = oldDirX * Math.sin(-rotSpeed) + dirY * Math.cos(-rotSpeed);

    const oldPlaneX = planeX;
    planeX = planeX * Math.cos(-rotSpeed) - planeY * Math.sin(-rotSpeed);
    planeY = oldPlaneX * Math.sin(-rotSpeed) + planeY * Math.cos(-rotSpeed);
  }
  
  if (e.key === 'a') {
    const oldDirX = dirX;
    dirX = dirX * Math.cos(rotSpeed) - dirY * Math.sin(rotSpeed);
    dirY = oldDirX * Math.sin(rotSpeed) + dirY * Math.cos(rotSpeed);

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
}

loadAsset('Wall.png').then((asset) => {
  image = asset
  window.requestAnimationFrame(loop);

})
