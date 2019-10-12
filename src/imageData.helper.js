export const getImageDataFromImage = image => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 0, 0);
  return ctx.getImageData(0, 0, image.width, image.height);
}

export const copyPixel = (sourceImageData, sx, sy, ssize, destImageData, dx, dy, dsize, alpha) => {
  const sourceIndex = ((Math.floor(sy) * ssize) + Math.floor(sx)) * 4;
  const destIndex = ((Math.floor(dy) * dsize) + Math.floor(dx)) * 4;

  addPixelToImageData(sourceImageData, sourceIndex, destImageData, destIndex, alpha);
}

function addPixelToImageData(sourceData, sourceIndex, dest, destIndex, alpha) {
  if(!sourceData.data[sourceIndex + 3]) {
    return;
  }

  dest.data[destIndex] = sourceData.data[sourceIndex];
  dest.data[destIndex + 1] = sourceData.data[sourceIndex + 1];
  dest.data[destIndex + 2] = sourceData.data[sourceIndex + 2];
  dest.data[destIndex + 3] = sourceData.data[sourceIndex + 3];

  if (alpha) {
    dest.data[destIndex + 3] = alpha;
    return;
  }
}

export default {
  copyPixel,
  getImageDataFromImage
}
