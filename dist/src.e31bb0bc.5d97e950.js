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
})({"build/src.e31bb0bc.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = function (modules, cache, entry, globalName) {
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
        } // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.


        if (previousRequire) {
          return previousRequire(name, true);
        } // Try the node require function if it exists.


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

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
    var mainExports = newRequire(entry[entry.length - 1]); // CommonJS

    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
      module.exports = mainExports; // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      }); // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  } // Override the current require with this new one


  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
}({
  "vector2d.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

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
  }, {}],
  "inputManager.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.InputManager = void 0;

    var _vector2d = _interopRequireDefault(require("./vector2d"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

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
  }, {
    "./vector2d": "vector2d.js"
  }],
  "imageData.helper.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = exports.copyPixel = exports.getImageDataFromImage = void 0;

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

    var _default = {
      copyPixel: copyPixel,
      getImageDataFromImage: getImageDataFromImage
    };
    exports.default = _default;
  }, {}],
  "config.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cameraMaxY = exports.cameraMinY = exports.viewDistanceWallFix = exports.viewDistanceObjectFix = exports.viewDistance = exports.viewSkipDistance = exports.playerMovementSpeed = exports.resolutionHeight = exports.resolutionWidth = void 0;
    var resolutionWidth = 800;
    exports.resolutionWidth = resolutionWidth;
    var resolutionHeight = 600;
    exports.resolutionHeight = resolutionHeight;
    var playerMovementSpeed = 0.1;
    exports.playerMovementSpeed = playerMovementSpeed;
    var viewSkipDistance = 14;
    exports.viewSkipDistance = viewSkipDistance;
    var viewDistance = 14;
    exports.viewDistance = viewDistance;
    var viewDistanceObjectFix = 1.5;
    exports.viewDistanceObjectFix = viewDistanceObjectFix;
    var viewDistanceWallFix = 1.5;
    exports.viewDistanceWallFix = viewDistanceWallFix;
    var cameraMinY = -300;
    exports.cameraMinY = cameraMinY;
    var cameraMaxY = 200;
    exports.cameraMaxY = cameraMaxY;
  }, {}],
  "raycastRenderer.js": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _vector2d = _interopRequireDefault(require("./vector2d"));

    var _imageData = require("./imageData.helper");

    var _config = require("./config");

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    function _iterableToArrayLimit(arr, i) {
      if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
        return;
      }

      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    /*
      TODO:
      1. Fix performance on floor and celing, 
         max number of iterations should be 
         resolutionWidth * resolutionHeight 
         but it's goes above this number,
    */


    var textureSize = 16;

    var mapValue = function mapValue(input, a, b, c, d) {
      return c + (d - c) / (b - a) * (input - a);
    };

    var RaycastRenderer =
    /*#__PURE__*/
    function () {
      function RaycastRenderer(ctx) {
        _classCallCheck(this, RaycastRenderer);

        this.ctx = ctx;
        this.rayCastingImageData = new ImageData(_config.resolutionWidth, _config.resolutionHeight);
        this.camera = {
          planeX: 0.62,
          planeY: 0.66,
          lookY: 0,
          pointingAt: ''
        };
      }

      _createClass(RaycastRenderer, [{
        key: "getCamera",
        value: function getCamera() {
          return this.camera;
        }
      }, {
        key: "castRays",
        value: function castRays(playerPosition, rayDir, walls) {
          var hitWalls = [];

          for (var i = 0; i < walls.length; i++) {
            var _walls$i = walls[i],
                v1 = _walls$i.v1,
                v2 = _walls$i.v2,
                height = _walls$i.height,
                texture = _walls$i.texture;
            var x1 = v1.x;
            var y1 = v1.y;
            var x2 = v2.x;
            var y2 = v2.y;
            var x3 = playerPosition.x;
            var y3 = playerPosition.y;
            var x4 = playerPosition.x + rayDir.x;
            var y4 = playerPosition.y + rayDir.y;
            var den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

            if (den === 0) {
              continue;
            }

            var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

            if (t <= 0 || t >= 1 || u <= 0) {
              continue;
            }

            var mapPos = new _vector2d.default(x1 + t * (x2 - x1), y1 + t * (y2 - y1));

            var len = _vector2d.default.magnitude(mapPos, playerPosition);

            hitWalls.push({
              id: 4,
              side: 0,
              len: len,
              mapPos: mapPos,
              height: height,
              texture: texture,
              type: 'WALL'
            });
          }

          return [hitWalls];
        }
      }, {
        key: "prepareObjectToDraw",
        value: function prepareObjectToDraw(player, objects) {
          var position = player.position,
              dir = player.dir;
          var _this$camera = this.camera,
              planeX = _this$camera.planeX,
              planeY = _this$camera.planeY,
              lookY = _this$camera.lookY;
          var sortedObjects = [];
          var texWidth = 16;
          var texHeight = 16;
          objects.sort(function (obj1, obj2) {
            var len = _vector2d.default.magnitude(obj1.pos, position);

            var len2 = _vector2d.default.magnitude(obj2.pos, position);

            return len2 - len;
          }).forEach(function (obj) {
            var _obj$uDiv = obj.uDiv,
                uDiv = _obj$uDiv === void 0 ? 1 : _obj$uDiv,
                _obj$vDiv = obj.vDiv,
                vDiv = _obj$vDiv === void 0 ? 1 : _obj$vDiv,
                _obj$vMove = obj.vMove,
                vMove = _obj$vMove === void 0 ? 0 : _obj$vMove;
            var spriteX = obj.pos.x - position.x;
            var spriteY = obj.pos.y - position.y;
            var invDet = 1 / (planeX * dir.y - dir.x * planeY);
            var transformX = invDet * (dir.y * spriteX - dir.x * spriteY);
            var transformY = invDet * (-planeY * spriteX + planeX * spriteY);

            var len = _vector2d.default.magnitude(obj.pos, position);

            var spriteScreenX = Math.floor(_config.resolutionWidth / 2 * (1 + transformX / transformY));
            var vMoveScreen = Math.floor(vMove / transformY) + lookY;
            var spriteHeight = Math.abs(Math.floor(_config.resolutionHeight / transformY)) / vDiv;
            var drawStartY = -spriteHeight / 2 + _config.resolutionHeight / 2 + vMoveScreen;
            if (drawStartY < 0 - lookY) drawStartY = 0;
            var drawEndY = spriteHeight / 2 + _config.resolutionHeight / 2 + vMoveScreen;
            if (drawEndY >= _config.resolutionHeight - lookY) drawEndY = _config.resolutionHeight - 1;
            var spriteWidth = Math.abs(Math.floor(_config.resolutionHeight / transformY)) / uDiv;
            var drawStartX = -spriteWidth / 2 + spriteScreenX;
            if (drawStartX < 0) drawStartX = 0;
            var drawEndX = spriteWidth / 2 + spriteScreenX;
            if (drawEndX >= _config.resolutionWidth) drawEndX = _config.resolutionHeight - 1;
            sortedObjects.push({
              drawStartX: Math.floor(drawStartX),
              drawEndX: Math.floor(drawEndX),
              drawStartY: drawStartY,
              drawEndY: drawEndY,
              vMoveScreen: vMoveScreen,
              obj: obj,
              len: len,
              spriteScreenX: spriteScreenX,
              spriteWidth: spriteWidth,
              spriteHeight: spriteHeight,
              transformY: transformY,
              texWidth: texWidth,
              texHeight: texHeight,
              type: 'OBJECT'
            });
          });
          return sortedObjects;
        }
      }, {
        key: "drawFloor",
        value: function drawFloor(player, element, ray, x) {
          var mapPos = element.mapPos;
          var position = player.position;
          var perpWallDist = ray.perpWallDist,
              drawStart = ray.drawStart;

          for (var y = drawStart; y < _config.resolutionHeight - this.camera.lookY; y++) {
            var currentDist = _config.resolutionHeight / (2 * y - _config.resolutionHeight);
            var weight = currentDist / perpWallDist;
            var currentFloorX = weight * mapPos.x + (1 - weight) * position.x;
            var currentFloorY = weight * mapPos.y + (1 - weight) * position.y;
            var floorTexX = ~~(currentFloorX * textureSize) % textureSize;
            var floorTexY = ~~(currentFloorY * textureSize) % textureSize;
            var alpha = mapValue(currentDist, 0, _config.viewDistance, 255, 0);
            (0, _imageData.copyPixel)(window.floorImageData, floorTexX, floorTexY, textureSize, this.rayCastingImageData, x, y + this.camera.lookY, _config.resolutionWidth, alpha);
          }
        }
      }, {
        key: "drawCeling",
        value: function drawCeling(player, element, ray, x) {
          var mapPos = element.mapPos;
          var position = player.position;
          var perpWallDist = ray.perpWallDist,
              drawEnd = ray.drawEnd;

          if (drawEnd < 0) {
            return;
          }

          for (var y = 0 - this.camera.lookY; y < drawEnd; y++) {
            var currentDist = _config.resolutionHeight / (_config.resolutionHeight - 2 * y);
            var weight = currentDist / perpWallDist;
            var currentFloorX = weight * mapPos.x + (1 - weight) * position.x;
            var currentFloorY = weight * mapPos.y + (1 - weight) * position.y;
            var floorTexX = ~~(currentFloorX * textureSize) % textureSize;
            var floorTexY = ~~(currentFloorY * textureSize) % textureSize;
            var alpha = mapValue(currentDist, 0, _config.viewDistance, 255, 0);
            (0, _imageData.copyPixel)(window.celingImageData, floorTexX, floorTexY, textureSize, this.rayCastingImageData, x, y + this.camera.lookY, _config.resolutionWidth, alpha);
          }
        }
      }, {
        key: "drawObject",
        value: function drawObject(object, x) {
          var drawStartY = object.drawStartY,
              drawEndY = object.drawEndY,
              vMoveScreen = object.vMoveScreen,
              spriteScreenX = object.spriteScreenX,
              spriteWidth = object.spriteWidth,
              spriteHeight = object.spriteHeight,
              transformY = object.transformY,
              texWidth = object.texWidth,
              texHeight = object.texHeight,
              obj = object.obj,
              len = object.len;
          var alpha = mapValue(len, 0, _config.viewDistance * _config.viewDistanceObjectFix, 254, 0);
          var texX = Math.floor(256 * (x - (-spriteWidth / 2 + spriteScreenX)) * texWidth / spriteWidth) / 256;

          if (transformY > 0) {
            for (var y = Math.floor(drawStartY); y < drawEndY; y++) {
              if (x === _config.resolutionWidth / 2 && y === _config.resolutionHeight / 2) {
                this.camera.pointingAt = obj.type;
              }

              var d = (y - vMoveScreen) * 256 - _config.resolutionHeight * 128 + spriteHeight * 128;
              var texY = d * texHeight / spriteHeight / 256;
              (0, _imageData.copyPixel)(obj.texture, texX, texY, textureSize, this.rayCastingImageData, x, y, _config.resolutionWidth, alpha);
            }
          }
        }
      }, {
        key: "drawWall",
        value: function drawWall(player, wall, x, rayDir, isClosestWall) {
          var position = player.position;
          var ray = {};
          ray.dir = rayDir;
          var mapPos = wall.mapPos,
              texture = wall.texture;
          ray.perpWallDist = (mapPos.x - position.x) / ray.dir.x;
          var lineHeight = Math.floor(Math.abs(_config.resolutionHeight / ray.perpWallDist));
          ray.drawStart = (_config.resolutionHeight + lineHeight) / 2;
          ray.drawEnd = ray.drawStart - lineHeight;
          var wallX = position.y + ray.perpWallDist * ray.dir.y;
          wallX += position.x + ray.perpWallDist * ray.dir.x;
          wallX -= Math.floor(wallX);
          var textureX = Math.floor((wallX - Math.floor(wallX)) * textureSize);
          var offsetDS = 0;

          if (ray.drawStart > _config.resolutionHeight) {
            offsetDS = ray.drawStart;
            ray.drawStart = _config.resolutionHeight;
          }

          var offsetDE = 0;

          if (ray.drawEnd < 0) {
            offsetDE = ray.drawEnd;
            ray.drawEnd = 0;
          }

          lineHeight = ray.drawStart - ray.drawEnd;
          lineHeight;
          var mapValueMin = offsetDE ? offsetDE : 0;
          var mapValueMax = offsetDS ? offsetDS : lineHeight;
          var alpha = mapValue(_vector2d.default.magnitude(position, mapPos), 0, _config.viewDistance * _config.viewDistanceWallFix, 255, 0);

          for (var i = this.camera.lookY < 0 ? this.camera.lookY : 0; i < lineHeight + (this.camera.lookY > 0 ? this.camera.lookY : 0); i++) {
            var textureY = Math.floor(mapValue(i, mapValueMin, mapValueMax, 0, textureSize));
            (0, _imageData.copyPixel)(texture, textureX, textureY, textureSize, this.rayCastingImageData, Math.floor(x), Math.floor(ray.drawStart - i + this.camera.lookY), _config.resolutionWidth, alpha);
          }

          if (isClosestWall) {
            this.drawFloor(player, wall, ray, x);
            this.drawCeling(player, wall, ray, x);
          }
        }
      }, {
        key: "draw",
        value: function draw(player, walls, objects) {
          var _this = this;

          var position = player.position,
              dir = player.dir;

          var _loop = function _loop(x) {
            var cameraX = 2 * x / _config.resolutionWidth - 1;
            var rayDir = new _vector2d.default(dir.x + _this.camera.planeX * cameraX, dir.y + _this.camera.planeY * cameraX);

            var _this$castRays = _this.castRays(position, rayDir, walls),
                _this$castRays2 = _slicedToArray(_this$castRays, 1),
                hitWalls = _this$castRays2[0];

            var visibleObjects = objects.filter(function (_ref) {
              var drawStartX = _ref.drawStartX,
                  drawEndX = _ref.drawEndX;
              return drawStartX < x && x < drawEndX;
            });
            var elementsToDraw = [].concat(_toConsumableArray(hitWalls), _toConsumableArray(visibleObjects)).sort(function (elem1, elem2) {
              return elem2.len - elem1.len;
            });
            var lastElementIndex = 0;

            for (var i = elementsToDraw.length - 1; i > 0; i--) {
              if (elementsToDraw[i].type === 'WALL') {
                lastElementIndex = i;
                break;
              }
            }

            elementsToDraw.forEach(function (element, index) {
              if (element.type === 'WALL') {
                _this.drawWall(player, element, x, rayDir, lastElementIndex === index);

                return;
              }

              if (element.type === 'OBJECT') {
                _this.drawObject(element, x);

                return;
              }
            });
          };

          for (var x = 0; x < _config.resolutionWidth; x++) {
            _loop(x);
          }
        }
      }, {
        key: "update",
        value: function update(player, objects, walls) {
          this.camera.pointingAt = 'WORLD';
          this.rayCastingImageData = new ImageData(_config.resolutionWidth, _config.resolutionHeight);
          this.ctx.clearRect(0, 0, 800, 400);
          var preparedObjects = this.prepareObjectToDraw(player, objects);
          this.draw(player, walls, preparedObjects);
          this.ctx.putImageData(this.rayCastingImageData, 0, 0);
          this.ctx.fillStyle = 'red';
          this.ctx.fillRect(_config.resolutionWidth / 2 - 2, _config.resolutionHeight / 2 - 2, 2, 2);
        }
      }]);

      return RaycastRenderer;
    }();

    exports.default = RaycastRenderer;
  }, {
    "./vector2d": "vector2d.js",
    "./imageData.helper": "imageData.helper.js",
    "./config": "config.js"
  }],
  "index.js": [function (require, module, exports) {
    "use strict";

    var _vector2d = _interopRequireDefault(require("./vector2d"));

    var _inputManager = require("./inputManager");

    var _imageData = require("./imageData.helper");

    var _config = require("./config");

    var _raycastRenderer = _interopRequireDefault(require("./raycastRenderer"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var pointingAtSpan = document.querySelector('#pointing-at');
    var player = {
      position: new _vector2d.default(20, 20),
      dir: new _vector2d.default(1, -1),
      pointing: 'nothing'
    };
    var walls = [{
      v1: new _vector2d.default(30, 0),
      v2: new _vector2d.default(30, 30)
    }, {
      v1: new _vector2d.default(30, 30),
      v2: new _vector2d.default(0, 30)
    }, {
      v1: new _vector2d.default(20, 20),
      v2: new _vector2d.default(0, 20)
    }, {
      v1: new _vector2d.default(10, 10),
      v2: new _vector2d.default(0, 10)
    }, {
      v1: new _vector2d.default(0, 30),
      v2: new _vector2d.default(0, 0)
    }, {
      v1: new _vector2d.default(0, 0),
      v2: new _vector2d.default(30, 0)
    }];
    var objects = [{
      id: 0,
      pos: new _vector2d.default(15, 15),
      type: 'AMMO',
      vMove: -160,
      uDiv: 4,
      vDiv: 4
    }, {
      id: 1,
      pos: new _vector2d.default(25, 17),
      type: 'AMMO',
      vMove: 160,
      uDiv: 4,
      vDiv: 4
    }, {
      id: 2,
      pos: new _vector2d.default(5, 15),
      type: 'AMMO',
      vMove: 0,
      uDiv: 4,
      vDiv: 4
    }];
    var canvas = document.querySelector('#game-canvas');
    var ctx = canvas.getContext('2d');
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    var raycastRenderer = new _raycastRenderer.default(ctx);
    var camera = raycastRenderer.getCamera();

    var mouseMove = function mouseMove(e) {
      if (e.movementY > 0 && camera.lookY > _config.cameraMinY || e.movementY < 0 && camera.lookY < _config.cameraMaxY) {
        camera.lookY -= e.movementY;
      }

      var rotSpeed = e.movementX / 1000;
      var oldDirX = player.dir.x;
      player.dir.x = player.dir.x * Math.cos(rotSpeed) - player.dir.y * Math.sin(rotSpeed);
      player.dir.y = oldDirX * Math.sin(rotSpeed) + player.dir.y * Math.cos(rotSpeed);
      var oldPlaneX = camera.planeX;
      camera.planeX = camera.planeX * Math.cos(rotSpeed) - camera.planeY * Math.sin(rotSpeed);
      camera.planeY = oldPlaneX * Math.sin(rotSpeed) + camera.planeY * Math.cos(rotSpeed);
    };

    var pointerlockvalue = false;
    document.addEventListener('pointerlockchange', function () {
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

    var playerMovement = function playerMovement() {
      if (_inputManager.InputManager.keys[87] && _inputManager.InputManager.keys[87].isDown) {
        player.position.y += player.dir.y * _config.playerMovementSpeed;
        player.position.x += player.dir.x * _config.playerMovementSpeed;
      }

      if (_inputManager.InputManager.keys[83] && _inputManager.InputManager.keys[83].isDown) {
        player.position.y -= player.dir.y * _config.playerMovementSpeed;
        player.position.x -= player.dir.x * _config.playerMovementSpeed;
      }
    };

    var loop = function loop() {
      playerMovement();
      raycastRenderer.update(player, objects, walls);
      pointingAtSpan.innerHTML = "".concat(raycastRenderer.getCamera().pointingAt);
      window.requestAnimationFrame(loop);
    };

    var loadAsset = function loadAsset(src) {
      console.log(src);
      return new Promise(function (resolve) {
        console.log('test123');
        var asset = new Image();
        asset.src = src;

        asset.onload = function () {
          resolve(asset);
        };

        asset.onerror = function (err) {
          console.log(err);
        };
      });
    };

    console.log("test");
    loadAsset('./Wall.png').then(function (asset) {
      console.log("test123");
      var wallImageData = (0, _imageData.getImageDataFromImage)(asset);
      walls.forEach(function (wall) {
        return wall.texture = wallImageData;
      });
      return loadAsset('Floor.png');
    }).then(function (asset) {
      window.floorImageData = (0, _imageData.getImageDataFromImage)(asset);
      return loadAsset('Celling.png');
    }).then(function (asset) {
      window.celingImageData = (0, _imageData.getImageDataFromImage)(asset);
      return loadAsset('Ammo.png');
    }).then(function (asset) {
      var ammoImageData = (0, _imageData.getImageDataFromImage)(asset);
      objects.forEach(function (object) {
        object.texture = ammoImageData;
      });
      window.requestAnimationFrame(loop);
    });
  }, {
    "./vector2d": "vector2d.js",
    "./inputManager": "inputManager.js",
    "./imageData.helper": "imageData.helper.js",
    "./config": "config.js",
    "./raycastRenderer": "raycastRenderer.js"
  }],
  "../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js": [function (require, module, exports) {
    var global = arguments[3];
    var OVERLAY_ID = '__parcel__error__overlay__';
    var OldModule = module.bundle.Module;

    function Module(moduleName) {
      OldModule.call(this, moduleName);
      this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
          this._acceptCallbacks.push(fn || function () {});
        },
        dispose: function dispose(fn) {
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
      var ws = new WebSocket(protocol + '://' + hostname + ':' + "62593" + '/');

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
  }, {}]
}, {}, ["../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js", "index.js"], null);
},{}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62738" + '/');

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
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","build/src.e31bb0bc.js"], null)
//# sourceMappingURL=/src.e31bb0bc.5d97e950.js.map