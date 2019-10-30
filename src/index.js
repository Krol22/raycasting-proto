import Vector2d from './vector2d';
import { InputManager } from './inputManager';

import { getImageDataFromImage, copyPixel } from './imageData.helper';
import { playerMovementSpeed } from './config';
import RaycastRenderer from './raycastRenderer';

const walls = [
  {
    v1: new Vector2d(40, 10),
    v2: new Vector2d(80, 60),
    height: 4,
  },
];

const objects = [
  {
    id: 0,
    pos: new Vector2d(42, 18),
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

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

const raycastRenderer = new RaycastRenderer(ctx);
const camera = raycastRenderer.getCamera();

const mouseMove = e => {
  camera.lookY -= e.movementY;
  const rotSpeed = e.movementX / 1000;

  const oldDirX = player.dir.x;
  player.dir.x = player.dir.x * Math.cos(rotSpeed) - player.dir.y * Math.sin(rotSpeed);
  player.dir.y = oldDirX * Math.sin(rotSpeed) + player.dir.y * Math.cos(rotSpeed);

  const oldPlaneX = camera.planeX;
  camera.planeX = camera.planeX * Math.cos(rotSpeed) - camera.planeY * Math.sin(rotSpeed);
  camera.planeY = oldPlaneX * Math.sin(rotSpeed) + camera.planeY * Math.cos(rotSpeed);
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

const player = {
  position: new Vector2d(40, 22),
  dir: new Vector2d(1, -1),
};

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
  walls[0].texture = wallImageData;
  return loadAsset('Floor.png')
}).then(asset => {
  // floorImageData = getImageDataFromImage(asset);
  return loadAsset('Celling.png')
}).then(asset => {
  // celingImageData = getImageDataFromImage(asset);
  return loadAsset('Ammo.png')
}).then(asset => {
  const ammoImageData = getImageDataFromImage(asset);
  objects.forEach(object => { object.texture = ammoImageData })
  window.requestAnimationFrame(loop);
});
