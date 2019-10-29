const editorCanvas = document.querySelector('#editor-canvas');
const ctx = editorCanvas.getContext('2d');

const SCALE = 3;
const walls = [];

const drawWalls = () => {
  walls.forEach(({ v1, v2 }) => {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(v1.x * SCALE, v1.y * SCALE);
    ctx.lineTo(v2.x * SCALE, v2.y * SCALE);
    ctx.stroke();
  });
}

const loop = () => {
  ctx.clearRect(0, 0, 800, 800);
  drawWalls();

  ctx.fillStyle = "#ff0000";
  window.requestAnimationFrame(loop);
}


const newWall = {};

editorCanvas.addEventListener('mousedown', (event) => {
  const pos = {
    x: event.layerX / SCALE,
    y: event.layerY / SCALE,
  };

  if (newWall.v1) {
    newWall.v2 = pos;

    walls.push({
      v1: newWall.v1,
      v2: newWall.v2,
      height: 1,
    });

    newWall.v1 = null;

    return;
  }

  newWall.v1 = pos;
});

loop();
