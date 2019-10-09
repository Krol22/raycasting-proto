// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = void 0;
var map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
exports.map = map;
},{}],"vector2d.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector2d =
/*#__PURE__*/
function () {
  function Vector2d(x, y) {
    _classCallCheck(this, Vector2d);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector2d, [{
    key: "add",
    value: function add(vector) {
      this.x += vector.x;
      this.y += vector.y;
    }
  }, {
    key: "sub",
    value: function sub(vector) {
      this.x -= vector.x;
      this.y -= vector.y;
    }
  }, {
    key: "mul",
    value: function mul(scalar) {
      this.x *= scalar;
      this.y *= scalar;
    }
  }, {
    key: "div",
    value: function div(scalar) {
      this.x /= scalar;
      this.y /= scalar;
    }
  }, {
    key: "mag",
    value: function mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var m = this.mag();
      this.div(m);
    }
  }, {
    key: "rotateAroundVector",
    value: function rotateAroundVector(vector, angle, inRadians) {
      if (inRadians) {
        angle = angle * (180 / Math.PI);
      }

      var x = this.x,
          y = this.y;
      x -= vector.x;
      y -= vector.y;
      this.x = x * Math.cos(angle) - y * Math.sin(angle);
      this.y = y * Math.cos(angle) + x * Math.sin(angle);
      this.x += vector.x;
      this.y += vector.y;
    }
  }], [{
    key: "addVectors",
    value: function addVectors(v0, v1) {
      return new Vector2d(v0.x + v1.x, v0.y + v1.y);
    }
  }, {
    key: "magnitude",
    value: function magnitude(v1, v2) {
      return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }
  }, {
    key: "findAngle",
    value: function findAngle(v0, v1, v2) {
      var a = Math.pow(v1.x - v0.x, 2) + Math.pow(v1.y - v0.y, 2);
      var b = Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2);
      var c = Math.pow(v2.x - v0.x, 2) + Math.pow(v2.y - v0.y, 2);
      var delta = (a + b - c) / Math.sqrt(4 * a * b);
      var angle = Math.acos(delta);

      if (delta < -1) {
        return Math.PI;
      } else if (delta > 1) {
        return 0;
      }

      if (v0.y > v1.y) {
        angle = 2 * Math.PI - angle;
      }

      return angle;
    }
  }]);

  return Vector2d;
}();

exports.default = Vector2d;
},{}],"inputManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputManager = void 0;

var _vector2d = _interopRequireDefault(require("./vector2d"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var restartKeyState = function restartKeyState(key) {
  key.isPressed = false;
  key.wasPressed = false;
  key.isDown = false;
};

var InputManager = {
  _canvas: null,
  keys: {},
  mouseState: {
    pos: new _vector2d.default(0, 0),
    posInCanvas: new _vector2d.default(0, 0),
    prevPos: new _vector2d.default(0, 0),
    mouse1: false,
    mouse2: false
  },
  init: function init(canvasSelector) {
    this._canvas = document.querySelector(canvasSelector);

    this._initKeyBoardEvents();

    this._initMouseEvents();

    for (var i = 0; i < 255; i++) {
      this.keys[i] = {
        isPressed: false,
        wasPressed: false,
        isDown: false
      };
    }
  },
  update: function update() {
    var _this = this;

    Object.keys(this.keys).forEach(function (keyCode) {
      if (_this.keys[keyCode].wasPressed) {
        _this.keys[keyCode].isDown = true;
        _this.keys[keyCode].isPressed = false;
      }

      if (!_this.keys[keyCode].isDown) {
        _this.keys[keyCode].wasPressed = _this.keys[keyCode].isPressed;
      }
    });
  },
  _initKeyBoardEvents: function _initKeyBoardEvents() {
    var _this2 = this;

    window.addEventListener('keydown', function (e) {
      if (!_this2.keys[e.keyCode]) {
        _this2.keys[e.keyCode] = {
          isPressed: true,
          wasPressed: false,
          isDown: false
        };
        return;
      } else {
        _this2.keys[e.keyCode].isDown = true;
      }

      if (!_this2.keys[e.keyCode].isDown) {
        _this2.keys[e.keyCode].isPressed = true;
      }
    });
    window.addEventListener('keyup', function (e) {
      restartKeyState(_this2.keys[e.keyCode]);
    });
  },
  _initMouseEvents: function _initMouseEvents() {
    var _this3 = this;

    window.addEventListener('mousemove', function (e) {
      var boundingRect = _this3._canvas.getBoundingClientRect();

      var pos = new _vector2d.default(Math.floor(e.clientX), Math.floor(e.clientY));
      var posInCanvas = new _vector2d.default(pos.x - Math.floor(boundingRect.x), pos.y - Math.floor(boundingRect.y));
      _this3.mouseState.prevPos = _this3.mouseState.pos;
      _this3.mouseState.pos = pos;
      _this3.mouseState.posInCanvas = posInCanvas;
    }); // #TODO: finish after getting normal mouse

    window.addEventListener('mousedown', function (e) {
      if (e.button === 0) {
        _this3.mouseState.mouse1 = true;
      }

      if (e.button === 2) {
        _this3.mouseState.mouse2 = true;
      }
    });
    window.addEventListener('mouseup', function (e) {
      if (e.button === 0) {
        _this3.mouseState.mouse1 = false;
      }

      if (e.button === 2) {
        _this3.mouseState.mouse2 = false;
      }
    });
  }
};
exports.InputManager = InputManager;
},{"./vector2d":"vector2d.js"}],"imageData.helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyPixel = exports.getImageDataFromImage = void 0;

var getImageDataFromImage = function getImageDataFromImage(image) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 0, 0);
  return ctx.getImageData(0, 0, image.width, image.height);
};

exports.getImageDataFromImage = getImageDataFromImage;

var copyPixel = function copyPixel(sourceImageData, sx, sy, ssize, destImageData, dx, dy, dsize, alpha) {
  var sourceIndex = (Math.floor(sy) * ssize + Math.floor(sx)) * 4;
  var destIndex = (Math.floor(dy) * dsize + Math.floor(dx)) * 4;
  addPixelToImageData(sourceImageData, sourceIndex, destImageData, destIndex, alpha);
};

exports.copyPixel = copyPixel;

function addPixelToImageData(sourceData, sourceIndex, dest, destIndex, alpha) {
  if (!sourceData.data[sourceIndex + 3]) {
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
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _map = require("./map");

var _vector2d = _interopRequireDefault(require("./vector2d"));

var _inputManager = require("./inputManager");

var _imageData = require("./imageData.helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var mapValue = function mapValue(input, a, b, c, d) {
  return c + (d - c) / (b - a) * (input - a);
};
/*

  Todo: sorting, 
  Figure out how values vMove, uDiv, vDiv corelates with each other,

*/


var objects = [{
  pos: new _vector2d.default(11, 18),
  type: 'AMMO',
  vMove: -160,
  uDiv: 4,
  vDiv: 4
}, {
  pos: new _vector2d.default(11, 20),
  type: 'AMMO',
  vMove: 160,
  uDiv: 4,
  vDiv: 4
}];
var ctx = document.querySelector('#game-canvas').getContext('2d');
var floorCtx = document.querySelector('#floor-canvas').getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
var canvas = document.querySelector('#game-canvas');

var mouseMove = function mouseMove(e) {
  playerLookY -= e.movementY;
  var rotSpeed = -e.movementX / 1000;
  var oldDirX = playerDir.x;
  playerDir.x = playerDir.x * Math.cos(rotSpeed) - playerDir.y * Math.sin(rotSpeed);
  playerDir.y = oldDirX * Math.sin(rotSpeed) + playerDir.y * Math.cos(rotSpeed);
  var oldPlaneX = planeX;
  planeX = planeX * Math.cos(rotSpeed) - planeY * Math.sin(rotSpeed);
  planeY = oldPlaneX * Math.sin(rotSpeed) + planeY * Math.cos(rotSpeed);
};

var pointerlockvalue = false;
document.addEventListener('pointerlockchange', function (event) {
  pointerlockvalue = !pointerlockvalue;

  if (pointerlockvalue) {
    canvas.addEventListener('mousemove', mouseMove);
  } else {
    canvas.removeEventListener('mousemove', mouseMove);
  }
});
canvas.addEventListener('mousedown', function () {
  canvas.requestPointerLock();
});

_inputManager.InputManager.init('#game-canvas');

var textureSize = 16;
var playerPos = new _vector2d.default(12, 18);
var playerDir = new _vector2d.default(-1, 0);
var playerLookY = 100;
var planeX = 0.0;
var planeY = 0.66;
var rayCastingImageData;
var floorImageData;
var celingImageData;
var ammoImageData;
var wallImageData;

function drawFloorInLowerWalls(backWall, playerPos, ray, stepX, stepY, x) {
  var dir = ray.dir,
      drawEnd = ray.drawEnd;
  var backWallPerpWallDist;
  var backWallMapPos = backWall.mapPos;

  if (backWall.side === 0) {
    backWallPerpWallDist = (backWallMapPos.x - playerPos.x + (1 - stepX) / 2) / dir.x;
  } else {
    backWallPerpWallDist = (backWallMapPos.y - playerPos.y + (1 - stepY) / 2) / dir.y;
  }

  var backWallFloorLineHeigth = Math.floor(Math.abs(resolutionHeight / backWallPerpWallDist));
  var floorStart = resolutionHeight / 2 + backWallFloorLineHeigth / 2;
  var floorEnd = floorStart - backWallFloorLineHeigth / 3;
  ctx.fillStyle = 'blue';
  ctx.fillRect(x, floorEnd, 1, drawEnd - floorEnd);
}

function drawFloorAndCeling(mapPos, side, wallX, ray, x) {
  var perpWallDist = ray.perpWallDist,
      drawStart = ray.drawStart,
      dir = ray.dir;
  var floorXWall;
  var floorYWall;

  if (side === 0 && dir.x > 0) {
    floorXWall = mapPos.x;
    floorYWall = mapPos.y + wallX;
  } else if (side === 0 && dir.x < 0) {
    floorXWall = mapPos.x + 1.0;
    floorYWall = mapPos.y + wallX;
  } else if (side === 1 && dir.y > 0) {
    floorXWall = mapPos.x + wallX;
    floorYWall = mapPos.y;
  } else {
    floorXWall = mapPos.x + wallX;
    floorYWall = mapPos.y + 1.0;
  }

  for (var y = Math.floor(drawStart); y < resolutionHeight + Math.abs(playerLookY); y++) {
    var currentDist = resolutionHeight / (2 * y - resolutionHeight);
    var weight = currentDist / perpWallDist;
    var currentFloorX = weight * floorXWall + (1 - weight) * playerPos.x;
    var currentFloorY = weight * floorYWall + (1 - weight) * playerPos.y;
    var floorTexX = Math.floor(currentFloorX * textureSize) % textureSize;
    var floorTexY = Math.floor(currentFloorY * textureSize) % textureSize;
    var alpha = Math.floor(mapValue(currentDist, 0, 7, 255, 0));
    (0, _imageData.copyPixel)(floorImageData, floorTexX, floorTexY, textureSize, rayCastingImageData, x, y + playerLookY, resolutionWidth, alpha);
    (0, _imageData.copyPixel)(celingImageData, floorTexX, floorTexY, textureSize, rayCastingImageData, x, resolutionHeight - y + playerLookY, resolutionWidth, alpha);
  }
}

function DDA(rayDir) {
  var hitWalls = [];
  var mapPos = new _vector2d.default(Math.floor(playerPos.x), Math.floor(playerPos.y));
  var side;
  var sideDistX, sideDistY;
  var stepX, stepY;
  var deltaDistX = Math.sqrt(1 + rayDir.y * rayDir.y / (rayDir.x * rayDir.x));
  var deltaDistY = Math.sqrt(1 + rayDir.x * rayDir.x / (rayDir.y * rayDir.y));

  if (rayDir.x < 0) {
    stepX = -1;
    sideDistX = (playerPos.x - mapPos.x) * deltaDistX;
  } else {
    stepX = 1;
    sideDistX = (mapPos.x + 1 - playerPos.x) * deltaDistX;
  }

  if (rayDir.y < 0) {
    stepY = -1;
    sideDistY = (playerPos.y - mapPos.y) * deltaDistY;
  } else {
    stepY = 1;
    sideDistY = (mapPos.y + 1 - playerPos.y) * deltaDistY;
  }

  while (true) {
    if (sideDistX < sideDistY) {
      sideDistX += deltaDistX;
      mapPos.x += stepX;
      mapPos.x = Math.floor(mapPos.x);
      side = 0;
    } else {
      sideDistY += deltaDistY;
      mapPos.y += stepY;
      mapPos.y = Math.floor(mapPos.y);
      side = 1;
    }

    if (_map.map[mapPos.x][mapPos.y] > 0) {
      var newWall = {
        mapPos: new _vector2d.default(mapPos.x, mapPos.y),
        value: _map.map[mapPos.x][mapPos.y],
        side: side
      };
      var backWallX = mapPos.x;
      var backWallY = mapPos.y;
      var backWallSide = void 0;

      if (sideDistX < sideDistY) {
        backWallX += stepX;
        backWallX = Math.floor(backWallX);
        backWallSide = 0;
      } else {
        backWallY += stepY;
        backWallY = Math.floor(backWallY);
        backWallSide = 1;
      }

      var backWall = {
        mapPos: new _vector2d.default(backWallX, backWallY),
        side: backWallSide,
        value: 3
      };
      newWall.backWall = backWall;
      hitWalls.push(newWall);

      if (_map.map[mapPos.x][mapPos.y] !== 3) {
        break;
      }
    }
  }

  return [hitWalls, stepX, stepY];
}

var resolutionWidth = 800;
var resolutionHeight = 400;

var drawObjects = function drawObjects() {
  objects.forEach(function (obj) {
    var _obj$uDiv = obj.uDiv,
        uDiv = _obj$uDiv === void 0 ? 1 : _obj$uDiv,
        _obj$vDiv = obj.vDiv,
        vDiv = _obj$vDiv === void 0 ? 1 : _obj$vDiv,
        _obj$vMove = obj.vMove,
        vMove = _obj$vMove === void 0 ? 0 : _obj$vMove;
    var spriteX = obj.pos.x - playerPos.x;
    var spriteY = obj.pos.y - playerPos.y;

    if (spriteX === 0 && spriteY === 0) {
      return;
    }

    var invDet = 1 / (planeX * playerDir.y - playerDir.x * planeY);
    var transformX = invDet * (playerDir.y * spriteX - playerDir.x * spriteY);
    var transformY = invDet * (-planeY * spriteX + planeX * spriteY);
    var spriteScreenX = Math.floor(resolutionWidth / 2 * (1 + transformX / transformY));
    var vMoveScreen = Math.floor(vMove / transformY) + playerLookY;
    var texWidth = 16;
    var texHeight = 16;
    var spriteHeight = Math.abs(Math.floor(resolutionHeight / transformY)) / vDiv;
    var drawStartY = -spriteHeight / 2 + resolutionHeight / 2 + vMoveScreen;
    if (drawStartY < 0 - playerLookY) drawStartY = 0;
    var drawEndY = spriteHeight / 2 + resolutionHeight / 2 + vMoveScreen;
    if (drawEndY >= resolutionHeight - playerLookY) drawEndY = resolutionHeight - 1;
    var spriteWidth = Math.abs(Math.floor(resolutionHeight / transformY)) / uDiv;
    var drawStartX = -spriteWidth / 2 + spriteScreenX;
    if (drawStartX < 0) drawStartX = 0;
    var drawEndX = spriteWidth / 2 + spriteScreenX;
    if (drawEndX >= resolutionWidth) drawEndX = resolutionHeight - 1;

    for (var stripe = Math.floor(drawStartX); stripe < drawEndX; stripe++) {
      var texX = Math.floor(256 * (stripe - (-spriteWidth / 2 + spriteScreenX)) * texWidth / spriteWidth) / 256;

      if (transformY > 0) {
        for (var y = Math.floor(drawStartY); y < drawEndY; y++) {
          var d = (y - vMoveScreen) * 256 - resolutionHeight * 128 + spriteHeight * 128;
          var texY = d * texHeight / spriteHeight / 256;
          (0, _imageData.copyPixel)(ammoImageData, texX, texY, textureSize, rayCastingImageData, stripe, y, resolutionWidth);
        }
      }
    }
  });
};

var update = function update() {
  objects.forEach(function (obj) {
    return obj.drawn = false;
  });

  var _loop = function _loop(x) {
    var cameraX = 2 * x / resolutionWidth - 1;
    var rayDir = new _vector2d.default(playerDir.x + planeX * cameraX, playerDir.y + planeY * cameraX);

    var _DDA = DDA(rayDir),
        _DDA2 = _slicedToArray(_DDA, 3),
        hitWalls = _DDA2[0],
        stepX = _DDA2[1],
        stepY = _DDA2[2]; // Calculate distance projected on camera


    hitWalls.reverse().forEach(function (hitWall) {
      var ray = {};
      ray.dir = rayDir;
      var mapPos = hitWall.mapPos,
          side = hitWall.side,
          value = hitWall.value,
          backWall = hitWall.backWall;

      if (side === 0) {
        ray.perpWallDist = (mapPos.x - playerPos.x + (1 - stepX) / 2) / ray.dir.x;
      } else {
        ray.perpWallDist = (mapPos.y - playerPos.y + (1 - stepY) / 2) / ray.dir.y;
      } // Calculate col height;


      var lineHeight = Math.floor(Math.abs(resolutionHeight / ray.perpWallDist)); // calculate lowest and highest pixel of wall;

      ray.drawStart = (resolutionHeight + lineHeight) / 2;
      ray.drawEnd = ray.drawStart - lineHeight / (value === 3 ? value : 1);
      var wallX;

      if (side === 0) {
        wallX = playerPos.y + ray.perpWallDist * ray.dir.y;
      } else {
        wallX = playerPos.x + ray.perpWallDist * ray.dir.x;
      }

      wallX -= Math.floor(wallX);
      drawFloorAndCeling(mapPos, side, wallX, ray, x);
      var textureX = Math.floor((wallX - Math.floor(wallX)) * textureSize);

      for (var i = 0; i < Math.floor(lineHeight / (value === 3 ? value : 1)); i++) {
        if (Math.floor(ray.drawStart - i + playerLookY) > resolutionHeight) {
          continue;
        }

        var textureY = Math.floor(mapValue(i, 0, lineHeight, 0, textureSize));
        (0, _imageData.copyPixel)(wallImageData, textureX, textureY, textureSize, rayCastingImageData, x, ray.drawStart - i + playerLookY, resolutionWidth);
      }

      if (value === 3 && backWall) {// drawFloorInLowerWalls(backWall, playerPos, ray, stepX, stepY, x);
      }
    });
  };

  for (var x = 0; x < resolutionWidth; x++) {
    _loop(x);
  }

  drawObjects(playerPos, playerDir);
};

var rotSpeed = 0.07;
var movementSpeed = 0.1;

var playerMovement = function playerMovement() {
  if (_inputManager.InputManager.keys[87] && _inputManager.InputManager.keys[87].isDown) {
    playerPos.y += playerDir.y * movementSpeed;
    playerPos.x += playerDir.x * movementSpeed;
  }

  if (_inputManager.InputManager.keys[83] && _inputManager.InputManager.keys[83].isDown) {
    playerPos.y -= playerDir.y * movementSpeed;
    playerPos.x -= playerDir.x * movementSpeed;
  }

  if (_inputManager.InputManager.keys[68] && _inputManager.InputManager.keys[68].isDown) {// playerPos.y -= playerDir.y * movementSpeed;
    // playerPos.x += playerDir.x * movementSpeed;
  }

  if (_inputManager.InputManager.keys[65] && _inputManager.InputManager.keys[65].isDown) {} // playerPos.y += playerDir.y * movementSpeed;
  // playerPos.x -= playerDir.x * movementSpeed;
  // if (InputManager.keys[68] && InputManager.keys[68].isDown) {
  // const oldDirX = playerDir.x;
  // playerDir.x = playerDir.x * Math.cos(-rotSpeed) - playerDir.y * Math.sin(-rotSpeed);
  // playerDir.y = oldDirX * Math.sin(-rotSpeed) + playerDir.y * Math.cos(-rotSpeed);
  //
  // const oldPlaneX = planeX;
  // planeX = planeX * Math.cos(-rotSpeed) - planeY * Math.sin(-rotSpeed);
  // planeY = oldPlaneX * Math.sin(-rotSpeed) + planeY * Math.cos(-rotSpeed);
  // }
  //
  // if (InputManager.keys[65] && InputManager.keys[65].isDown) {
  // const oldDirX = playerDir.x;
  // playerDir.x = playerDir.x * Math.cos(rotSpeed) - playerDir.y * Math.sin(rotSpeed);
  // playerDir.y = oldDirX * Math.sin(rotSpeed) + playerDir.y * Math.cos(rotSpeed);
  //
  // const oldPlaneX = planeX;
  // planeX = planeX * Math.cos(rotSpeed) - planeY * Math.sin(rotSpeed);
  // planeY = oldPlaneX * Math.sin(rotSpeed) + planeY * Math.cos(rotSpeed);
  // }
  //
  // playerLookY += Math.floor((InputManager.mouseState.prevPos.y - InputManager.mouseState.pos.y));

};

var loop = function loop() {
  ctx.clearRect(0, 0, 800, 400);
  floorCtx.clearRect(0, 0, 800, 400);
  ctx.save();
  rayCastingImageData = new ImageData(resolutionWidth, resolutionHeight);
  update();
  floorCtx.putImageData(rayCastingImageData, 0, 0);
  ctx.restore();
  window.requestAnimationFrame(loop);
  playerMovement();
};

window.addEventListener('keydown', function (e) {
  if (e.key === 'q') {
    offset += 10;
  }

  if (e.key === 'z') {
    offset -= 10;
  }
});

var loadAsset = function loadAsset(src) {
  return new Promise(function (resolve) {
    var asset = new Image();
    asset.src = src;

    asset.onload = function () {
      resolve(asset);
    };
  });
};

loadAsset('Wall.png').then(function (asset) {
  wallImageData = (0, _imageData.getImageDataFromImage)(asset);
  return loadAsset('Floor.png');
}).then(function (asset) {
  floorImageData = (0, _imageData.getImageDataFromImage)(asset);
  return loadAsset('Celling.png');
}).then(function (asset) {
  celingImageData = (0, _imageData.getImageDataFromImage)(asset);
  return loadAsset('Ammo.png');
}).then(function (asset) {
  ammoImageData = (0, _imageData.getImageDataFromImage)(asset);
  window.requestAnimationFrame(loop);
});
},{"./map":"map.js","./vector2d":"vector2d.js","./inputManager":"inputManager.js","./imageData.helper":"imageData.helper.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50001" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map