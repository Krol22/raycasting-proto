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
})({"index.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MAP_ROWS = 24;
var MAP_COLS = 24;
var canvas = document.querySelector('#game-canvas');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = 'white';
var mouseX = 0;
var mouseY = 0;
var scene = [];
window.addEventListener('mousemove', function (e) {
  mouseX = e.x;
  mouseY = e.y;
});

var map = function map(input, a, b, c, d) {
  return c + (d - c) / (b - a) * (input - a);
};

var Particle =
/*#__PURE__*/
function () {
  function Particle() {
    _classCallCheck(this, Particle);

    this.posX = 100;
    this.posY = 200;
    this.rays = [];

    for (var i = -Math.PI; i < Math.PI; i += Math.PI / 100) {
      this.rays.push(new Ray(this.posX, this.posY, i));
    }
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.beginPath();
      ctx.translate(this.posX, this.posY);
      ctx.arc(0, 0, 2, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();
    }
  }, {
    key: "update",
    value: function update() {
      this.posX = mouseX;
      this.posY = mouseY;
      this.rays = [];

      for (var i = -Math.PI / 6; i < Math.PI / 6; i += Math.PI / 200) {
        this.rays.push(new Ray(this.posX, this.posY, i));
      }
    }
  }, {
    key: "look",
    value: function look(walls) {
      var _this = this;

      var scene = [];
      var firstAndLastPairs = [];
      this.rays.forEach(function (ray, index) {
        var closest = null;
        var record = Infinity;
        walls.forEach(function (wall) {
          var pt = ray.cast(wall);

          if (pt) {
            var d = Math.sqrt(Math.pow(_this.posX - pt.x, 2) + Math.pow(_this.posY - pt.y, 2));

            if (d < record) {
              record = d;
              closest = pt;
            }
          }
        });

        if (closest) {
          ctx.save();
          ctx.beginPath();
          ctx.translate(_this.posX, _this.posY);
          ctx.moveTo(0, 0);
          ctx.lineTo(closest.x - _this.posX, closest.y - _this.posY);
          ctx.stroke();
          ctx.restore();
        }

        scene[index] = record;
      });
      return scene;
    }
  }]);

  return Particle;
}();

var Boundary =
/*#__PURE__*/
function () {
  function Boundary(x1, y1, x2, y2) {
    _classCallCheck(this, Boundary);

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  _createClass(Boundary, [{
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = '3';
      ctx.translate(this.x1, this.y1);
      ctx.moveTo(0, 0);
      ctx.lineTo(this.x2 - this.x1, this.y2 - this.y1);
      ctx.stroke();
      ctx.restore();
    }
  }]);

  return Boundary;
}();

var Ray =
/*#__PURE__*/
function () {
  function Ray(x, y, angle) {
    _classCallCheck(this, Ray);

    this.posX = x;
    this.posY = y;
    this.dirX = Math.sin(angle);
    this.dirY = Math.cos(angle);
  }

  _createClass(Ray, [{
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = '1';
      ctx.translate(this.posX, this.posY);
      ctx.moveTo(0, 0);
      ctx.lineTo(this.dirX * 50, this.dirY * 50);
      ctx.stroke();
      ctx.restore();
    }
  }, {
    key: "setDirection",
    value: function setDirection(x, y) {
      this.dirX = x - this.posX;
      this.dirY = y - this.posY;
      var len = Math.sqrt(Math.pow(this.dirX, 2) + Math.pow(this.dirY, 2));
      this.dirX = this.dirX / len;
      this.dirY = this.dirY / len;
    }
  }, {
    key: "cast",
    value: function cast(wall) {
      this.wall = wall;
      var x1 = wall.x1,
          x2 = wall.x2,
          y1 = wall.y1,
          y2 = wall.y2;
      var x3 = this.posX;
      var y3 = this.posY;
      var x4 = this.posX + this.dirX;
      var y4 = this.posY + this.dirY;
      var den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4); // ray and wall are parallel

      if (den === 0) {
        return;
      }

      var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

      if (t <= 0 || t >= 1 || u <= 0) {
        return;
      }

      return {
        x: x1 + t * (x2 - x1),
        y: y1 + t * (y2 - y1)
      };
    }
  }]);

  return Ray;
}();

var wall = new Boundary(300, 100, 300, 300);
var wall2 = new Boundary(300, 100, 200, 300);
var wall3 = new Boundary(100, 200, 300, 200);
var wall4 = new Boundary(0, 0, 400, 0);
var wall5 = new Boundary(0, 0, 0, 400);
var wall6 = new Boundary(400, 0, 400, 400);
var wall7 = new Boundary(400, 400, 0, 400);
var walls = [wall, wall2, wall3, wall4, wall5, wall6, wall7];
var particle = new Particle();

var update = function update() {
  ctx.clearRect(0, 0, 800, 600);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 600);
  walls.forEach(function (wall) {
    wall.draw();
  });
  var scene = particle.look(walls);
  particle.draw();
  particle.update();
  var width = 400 / scene.length;
  scene.forEach(function (col, index) {
    ctx.save();
    ctx.translate(400, 0);
    var mapped = map(col, 0, 400, 400, 0);
    var white = map(col, 0, 400, 1, 0);
    ctx.fillStyle = "rgba(255, 255, 255, ".concat(white, ")");
    ctx.fillRect(index * width, (400 - mapped) / 2, width, mapped);
    ctx.restore();
  }); // ray.draw();
  // ray.setDirection(mouseX, mouseY);
  // //
  // let pt = ray.cast(wall);
  // if (pt) {
  // ctx.save();
  // ctx.beginPath();
  // ctx.translate(pt.x, pt.y);
  // ctx.arc(0, 0, 10, 0, 2 * Math.PI);
  // ctx.stroke();
  // ctx.restore();
  // }
};

var loop = function loop() {
  update();
  window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);
},{}],"../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56679" + '/');

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
},{}]},{},["../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/raycasting-proto.e31bb0bc.js.map