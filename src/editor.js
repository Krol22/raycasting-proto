const editorCanvas = document.querySelector('#editor-canvas');
const ctx = editorCanvas.getContext('2d');

const drawWalls = () => {
  window.walls.forEach(({ v1, v2 }) => {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.stroke();
  });
}

const loop = () => {
  ctx.clearRect(0, 0, 400, 400);
  drawWalls();

  ctx.fillStyle = "#ff0000";
  ctx.fillRect(window.playerPos.x, window.playerPos.y, 4, 4);
  window.requestAnimationFrame(loop);
}


const newWall = {};

editorCanvas.addEventListener('mousedown', (event) => {
  const pos = {
    x: event.layerX,
    y: event.layerY,
  };

  if (newWall.v1) {
    newWall.v2 = pos;

    window.walls.push({
      v1: newWall.v1,
      v2: newWall.v2,
    });

    newWall.v1 = null;

    return;
  }

  newWall.v1 = pos;
});

loop();
