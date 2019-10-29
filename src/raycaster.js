import Vector2d from './vector2d';

const drawObjects = (player, objects) => {
  const playerPos = player.pos;
  const playerDir = player.dir;

  objects.sort((obj1, obj2) => {
    const len = Vector2d.magnitude(obj1.pos, playerPos);
    const len2 = Vector2d.magnitude(obj2.pos, playerPos);

    return len2 - len;
  }).forEach(obj => {
    const { uDiv = 1, vDiv = 1, vMove = 0 } = obj;

    const spriteX = obj.pos.x - playerPos.x;
    const spriteY = obj.pos.y - playerPos.y;

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

          copyPixel(ammoImageData, texX, texY, textureSize, rayCastingImageData, stripe, y, resolutionWidth);
        }
      }
    }
  });
};

export default (player, objects) => {
  drawObjects(player, objects);
  drawWalls(); 
};
