import Vector2d from './vector2d';
import { InputManager } from './inputManager';

import { getImageDataFromImage } from './imageData.helper';
import { playerMovementSpeed, cameraMinY, cameraMaxY } from './config';
import RaycastRenderer from './raycastRenderer';

const player = {
  position: new Vector2d(20, 20),
  dir: new Vector2d(1, -1),
};

const walls = [
  {
    v1: new Vector2d(30, 0),
    v2: new Vector2d(30, 30),
  },
  {
    v1: new Vector2d(30, 30),
    v2: new Vector2d(0, 30),
  },
  {
    v1: new Vector2d(20, 20),
    v2: new Vector2d(0, 20),
  },

  {
    v1: new Vector2d(10, 10),
    v2: new Vector2d(0, 10),
  },
  {
    v1: new Vector2d(0, 30),
    v2: new Vector2d(0, 0),
  },
  {
    v1: new Vector2d(0, 0),
    v2: new Vector2d(30, 0),
  },
];

const objects = [
  {
    id: 0,
    pos: new Vector2d(15, 15),
    type: 'AMMO',
    vMove: -160,
    uDiv: 4,
    vDiv: 4
  },
  {
    id: 1,
    pos: new Vector2d(25, 17),
    type: 'AMMO',
    vMove: 160,
    uDiv: 4,
    vDiv: 4
  },
  {
    id: 2,
    pos: new Vector2d(5, 15),
    type: 'AMMO',
    vMove: 0,
    uDiv: 4,
    vDiv: 4
  },
];

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

const raycastRenderer = new RaycastRenderer(ctx);
const camera = raycastRenderer.getCamera();

const mouseMove = e => {
  if (
    e.movementY > 0 && camera.lookY > cameraMinY ||
    e.movementY < 0 && camera.lookY < cameraMaxY
  ) {
    camera.lookY -= e.movementY;
  }

  const rotSpeed = e.movementX / 1000;

  const oldDirX = player.dir.x;
  player.dir.x = player.dir.x * Math.cos(rotSpeed) - player.dir.y * Math.sin(rotSpeed);
  player.dir.y = oldDirX * Math.sin(rotSpeed) + player.dir.y * Math.cos(rotSpeed);

  const oldPlaneX = camera.planeX;
  camera.planeX = camera.planeX * Math.cos(rotSpeed) - camera.planeY * Math.sin(rotSpeed);
  camera.planeY = oldPlaneX * Math.sin(rotSpeed) + camera.planeY * Math.cos(rotSpeed);
}

let pointerlockvalue = false;
document.addEventListener('pointerlockchange', () => {
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

const playerMovement = () => {
  if (InputManager.keys[87] && InputManager.keys[87].isDown) {
    player.position.y += player.dir.y * playerMovementSpeed;
    player.position.x += player.dir.x * playerMovementSpeed;
  }

  if (InputManager.keys[83] && InputManager.keys[83].isDown) {
    player.position.y -= player.dir.y * playerMovementSpeed;
    player.position.x -= player.dir.x * playerMovementSpeed;
  }

};

const loop = () => {
  playerMovement();
  raycastRenderer.update(player, objects, walls);
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
  const wallImageData = getImageDataFromImage(asset);
  walls.forEach(wall => wall.texture = wallImageData);
  return loadAsset('Floor.png')
}).then(asset => {
  window.floorImageData = getImageDataFromImage(asset);
  return loadAsset('Celling.png')
}).then(asset => {
  window.celingImageData = getImageDataFromImage(asset);
  return loadAsset('Ammo.png')
}).then(asset => {
  const ammoImageData = getImageDataFromImage(asset);
  objects.forEach(object => { object.texture = ammoImageData })
  window.requestAnimationFrame(loop);
});
