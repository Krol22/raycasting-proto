// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3Imd1":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "0fa2489aa94c8731ee2aee9f3fafb3e2";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
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
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
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
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"5rkFb":[function(require,module,exports) {
var _vector2d = require('./vector2d');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _vector2dDefault = _parcelHelpers.interopDefault(_vector2d);
var _inputManager = require('./inputManager');
var _imageDataHelper = require('./imageData.helper');
var _config = require('./config');
var _raycastRenderer = require('./raycastRenderer');
var _raycastRendererDefault = _parcelHelpers.interopDefault(_raycastRenderer);
const pointingAtSpan = document.querySelector('#pointing-at');
const player = {
  position: new _vector2dDefault.default(20, 20),
  dir: new _vector2dDefault.default(1, -1),
  pointing: 'nothing'
};
const walls = [{
  v1: new _vector2dDefault.default(30, 0),
  v2: new _vector2dDefault.default(30, 30)
}, {
  v1: new _vector2dDefault.default(30, 30),
  v2: new _vector2dDefault.default(0, 30)
}, {
  v1: new _vector2dDefault.default(20, 20),
  v2: new _vector2dDefault.default(0, 20)
}, {
  v1: new _vector2dDefault.default(10, 10),
  v2: new _vector2dDefault.default(0, 10)
}, {
  v1: new _vector2dDefault.default(0, 30),
  v2: new _vector2dDefault.default(0, 0)
}, {
  v1: new _vector2dDefault.default(0, 0),
  v2: new _vector2dDefault.default(30, 0)
}];
const objects = [{
  id: 0,
  pos: new _vector2dDefault.default(15, 15),
  type: 'AMMO',
  vMove: -160,
  uDiv: 4,
  vDiv: 4
}, {
  id: 1,
  pos: new _vector2dDefault.default(25, 17),
  type: 'AMMO',
  vMove: 160,
  uDiv: 4,
  vDiv: 4
}, {
  id: 2,
  pos: new _vector2dDefault.default(5, 15),
  type: 'AMMO',
  vMove: 0,
  uDiv: 4,
  vDiv: 4
}];
const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
const raycastRenderer = new _raycastRendererDefault.default(ctx);
const camera = raycastRenderer.getCamera();
const mouseMove = e => {
  if (e.movementY > 0 && camera.lookY > _config.cameraMinY || e.movementY < 0 && camera.lookY < _config.cameraMaxY) {
    camera.lookY -= e.movementY;
  }
  const rotSpeed = e.movementX / 1000;
  const oldDirX = player.dir.x;
  player.dir.x = player.dir.x * Math.cos(rotSpeed) - player.dir.y * Math.sin(rotSpeed);
  player.dir.y = oldDirX * Math.sin(rotSpeed) + player.dir.y * Math.cos(rotSpeed);
  const oldPlaneX = camera.planeX;
  camera.planeX = camera.planeX * Math.cos(rotSpeed) - camera.planeY * Math.sin(rotSpeed);
  camera.planeY = oldPlaneX * Math.sin(rotSpeed) + camera.planeY * Math.cos(rotSpeed);
};
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
});
_inputManager.InputManager.init('#game-canvas');
const playerMovement = () => {
  if (_inputManager.InputManager.keys[87] && _inputManager.InputManager.keys[87].isDown) {
    player.position.y += player.dir.y * _config.playerMovementSpeed;
    player.position.x += player.dir.x * _config.playerMovementSpeed;
  }
  if (_inputManager.InputManager.keys[83] && _inputManager.InputManager.keys[83].isDown) {
    player.position.y -= player.dir.y * _config.playerMovementSpeed;
    player.position.x -= player.dir.x * _config.playerMovementSpeed;
  }
};
const loop = () => {
  playerMovement();
  raycastRenderer.update(player, objects, walls);
  pointingAtSpan.innerHTML = `${raycastRenderer.getCamera().pointingAt}`;
  window.requestAnimationFrame(loop);
};
const loadAsset = src => {
  console.log(src);
  return new Promise(resolve => {
    console.log('test123');
    const asset = new Image();
    asset.src = src;
    asset.onload = () => {
      resolve(asset);
    };
    asset.onerror = err => {
      console.log(err);
    };
  });
};
console.log("test");
loadAsset('./Wall.png').then(asset => {
  console.log("test123");
  const wallImageData = _imageDataHelper.getImageDataFromImage(asset);
  walls.forEach(wall => wall.texture = wallImageData);
  return loadAsset('Floor.png');
}).then(asset => {
  window.floorImageData = _imageDataHelper.getImageDataFromImage(asset);
  return loadAsset('Celling.png');
}).then(asset => {
  window.celingImageData = _imageDataHelper.getImageDataFromImage(asset);
  return loadAsset('Ammo.png');
}).then(asset => {
  const ammoImageData = _imageDataHelper.getImageDataFromImage(asset);
  objects.forEach(object => {
    object.texture = ammoImageData;
  });
  window.requestAnimationFrame(loop);
});

},{"./vector2d":"4iGxp","./inputManager":"3lak5","./imageData.helper":"6uO1X","./config":"5yJJr","./raycastRenderer":"uafQo","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"4iGxp":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  static addVectors(v0, v1) {
    return new Vector2d(v0.x + v1.x, v0.y + v1.y);
  }
  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }
  mul(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }
  div(scalar) {
    this.x /= scalar;
    this.y /= scalar;
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize() {
    const m = this.mag();
    this.div(m);
  }
  rotateAroundVector(vector, angle, inRadians) {
    if (inRadians) {
      angle = angle * (180 / Math.PI);
    }
    let {x, y} = this;
    x -= vector.x;
    y -= vector.y;
    this.x = x * Math.cos(angle) - y * Math.sin(angle);
    this.y = y * Math.cos(angle) + x * Math.sin(angle);
    this.x += vector.x;
    this.y += vector.y;
  }
  static magnitude(v1, v2) {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
  }
  static findAngle(v0, v1, v2) {
    let a = Math.pow(v1.x - v0.x, 2) + Math.pow(v1.y - v0.y, 2);
    let b = Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2);
    let c = Math.pow(v2.x - v0.x, 2) + Math.pow(v2.y - v0.y, 2);
    let delta = (a + b - c) / Math.sqrt(4 * a * b);
    let angle = Math.acos(delta);
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
}
exports.default = Vector2d;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"3lak5":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "InputManager", function () {
  return InputManager;
});
var _vector2d = require('./vector2d');
var _vector2dDefault = _parcelHelpers.interopDefault(_vector2d);
const restartKeyState = key => {
  key.isPressed = false;
  key.wasPressed = false;
  key.isDown = false;
};
const InputManager = {
  _canvas: null,
  keys: {},
  mouseState: {
    pos: new _vector2dDefault.default(0, 0),
    posInCanvas: new _vector2dDefault.default(0, 0),
    prevPos: new _vector2dDefault.default(0, 0),
    mouse1: false,
    mouse2: false
  },
  init(canvasSelector) {
    this._canvas = document.querySelector(canvasSelector);
    this._initKeyBoardEvents();
    this._initMouseEvents();
    for (let i = 0; i < 255; i++) {
      this.keys[i] = {
        isPressed: false,
        wasPressed: false,
        isDown: false
      };
    }
  },
  update() {
    Object.keys(this.keys).forEach(keyCode => {
      if (this.keys[keyCode].wasPressed) {
        this.keys[keyCode].isDown = true;
        this.keys[keyCode].isPressed = false;
      }
      if (!this.keys[keyCode].isDown) {
        this.keys[keyCode].wasPressed = this.keys[keyCode].isPressed;
      }
    });
  },
  _initKeyBoardEvents() {
    window.addEventListener('keydown', e => {
      if (!this.keys[e.keyCode]) {
        this.keys[e.keyCode] = {
          isPressed: true,
          wasPressed: false,
          isDown: false
        };
        return;
      } else {
        this.keys[e.keyCode].isDown = true;
      }
      if (!this.keys[e.keyCode].isDown) {
        this.keys[e.keyCode].isPressed = true;
      }
    });
    window.addEventListener('keyup', e => {
      restartKeyState(this.keys[e.keyCode]);
    });
  },
  _initMouseEvents() {
    window.addEventListener('mousemove', e => {
      const boundingRect = this._canvas.getBoundingClientRect();
      const pos = new _vector2dDefault.default(Math.floor(e.clientX), Math.floor(e.clientY));
      const posInCanvas = new _vector2dDefault.default(pos.x - Math.floor(boundingRect.x), pos.y - Math.floor(boundingRect.y));
      this.mouseState.prevPos = this.mouseState.pos;
      this.mouseState.pos = pos;
      this.mouseState.posInCanvas = posInCanvas;
    });
    // #TODO: finish after getting normal mouse
    window.addEventListener('mousedown', e => {
      if (e.button === 0) {
        this.mouseState.mouse1 = true;
      }
      if (e.button === 2) {
        this.mouseState.mouse2 = true;
      }
    });
    window.addEventListener('mouseup', e => {
      if (e.button === 0) {
        this.mouseState.mouse1 = false;
      }
      if (e.button === 2) {
        this.mouseState.mouse2 = false;
      }
    });
  }
};

},{"./vector2d":"4iGxp","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6uO1X":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getImageDataFromImage", function () {
  return getImageDataFromImage;
});
_parcelHelpers.export(exports, "copyPixel", function () {
  return copyPixel;
});
const getImageDataFromImage = image => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 0, 0);
  return ctx.getImageData(0, 0, image.width, image.height);
};
const copyPixel = (sourceImageData, sx, sy, ssize, destImageData, dx, dy, dsize, alpha) => {
  const sourceIndex = (Math.floor(sy) * ssize + Math.floor(sx)) * 4;
  const destIndex = (Math.floor(dy) * dsize + Math.floor(dx)) * 4;
  addPixelToImageData(sourceImageData, sourceIndex, destImageData, destIndex, alpha);
};
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
exports.default = {
  copyPixel,
  getImageDataFromImage
};

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5yJJr":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "resolutionWidth", function () {
  return resolutionWidth;
});
_parcelHelpers.export(exports, "resolutionHeight", function () {
  return resolutionHeight;
});
_parcelHelpers.export(exports, "playerMovementSpeed", function () {
  return playerMovementSpeed;
});
_parcelHelpers.export(exports, "viewSkipDistance", function () {
  return viewSkipDistance;
});
_parcelHelpers.export(exports, "viewDistance", function () {
  return viewDistance;
});
_parcelHelpers.export(exports, "viewDistanceObjectFix", function () {
  return viewDistanceObjectFix;
});
_parcelHelpers.export(exports, "viewDistanceWallFix", function () {
  return viewDistanceWallFix;
});
_parcelHelpers.export(exports, "cameraMinY", function () {
  return cameraMinY;
});
_parcelHelpers.export(exports, "cameraMaxY", function () {
  return cameraMaxY;
});
const resolutionWidth = 800;
const resolutionHeight = 600;
const playerMovementSpeed = 0.1;
const viewSkipDistance = 14;
const viewDistance = 14;
const viewDistanceObjectFix = 1.5;
const viewDistanceWallFix = 1.5;
const cameraMinY = -300;
const cameraMaxY = 200;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"uafQo":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _vector2d = require('./vector2d');
var _vector2dDefault = _parcelHelpers.interopDefault(_vector2d);
var _imageDataHelper = require('./imageData.helper');
var _config = require('./config');
/*
TODO:
1. Fix performance on floor and celing,
max number of iterations should be
resolutionWidth * resolutionHeight
but it's goes above this number,
*/
const textureSize = 16;
const mapValue = (input, a, b, c, d) => {
  return c + (d - c) / (b - a) * (input - a);
};
class RaycastRenderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.rayCastingImageData = new ImageData(_config.resolutionWidth, _config.resolutionHeight);
    this.camera = {
      planeX: 0.62,
      planeY: 0.66,
      lookY: 0,
      pointingAt: ''
    };
  }
  getCamera() {
    return this.camera;
  }
  castRays(playerPosition, rayDir, walls) {
    const hitWalls = [];
    for (let i = 0; i < walls.length; i++) {
      const {v1, v2, height, texture} = walls[i];
      const x1 = v1.x;
      const y1 = v1.y;
      const x2 = v2.x;
      const y2 = v2.y;
      const x3 = playerPosition.x;
      const y3 = playerPosition.y;
      const x4 = playerPosition.x + rayDir.x;
      const y4 = playerPosition.y + rayDir.y;
      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (den === 0) {
        continue;
      }
      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
      if (t <= 0 || t >= 1 || u <= 0) {
        continue;
      }
      const mapPos = new _vector2dDefault.default(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
      const len = _vector2dDefault.default.magnitude(mapPos, playerPosition);
      hitWalls.push({
        id: 4,
        side: 0,
        len,
        mapPos,
        height,
        texture,
        type: 'WALL'
      });
    }
    return [hitWalls];
  }
  prepareObjectToDraw(player, objects) {
    const {position, dir} = player;
    const {planeX, planeY, lookY} = this.camera;
    const sortedObjects = [];
    const texWidth = 16;
    const texHeight = 16;
    objects.sort((obj1, obj2) => {
      const len = _vector2dDefault.default.magnitude(obj1.pos, position);
      const len2 = _vector2dDefault.default.magnitude(obj2.pos, position);
      return len2 - len;
    }).forEach(obj => {
      const {uDiv = 1, vDiv = 1, vMove = 0} = obj;
      const spriteX = obj.pos.x - position.x;
      const spriteY = obj.pos.y - position.y;
      const invDet = 1 / (planeX * dir.y - dir.x * planeY);
      const transformX = invDet * (dir.y * spriteX - dir.x * spriteY);
      const transformY = invDet * (-planeY * spriteX + planeX * spriteY);
      const len = _vector2dDefault.default.magnitude(obj.pos, position);
      const spriteScreenX = Math.floor(_config.resolutionWidth / 2 * (1 + transformX / transformY));
      const vMoveScreen = Math.floor(vMove / transformY) + lookY;
      const spriteHeight = Math.abs(Math.floor(_config.resolutionHeight / transformY)) / vDiv;
      let drawStartY = -spriteHeight / 2 + _config.resolutionHeight / 2 + vMoveScreen;
      if (drawStartY < 0 - lookY) drawStartY = 0;
      let drawEndY = spriteHeight / 2 + _config.resolutionHeight / 2 + vMoveScreen;
      if (drawEndY >= _config.resolutionHeight - lookY) drawEndY = _config.resolutionHeight - 1;
      const spriteWidth = Math.abs(Math.floor(_config.resolutionHeight / transformY)) / uDiv;
      let drawStartX = -spriteWidth / 2 + spriteScreenX;
      if (drawStartX < 0) drawStartX = 0;
      let drawEndX = spriteWidth / 2 + spriteScreenX;
      if (drawEndX >= _config.resolutionWidth) drawEndX = _config.resolutionHeight - 1;
      sortedObjects.push({
        drawStartX: Math.floor(drawStartX),
        drawEndX: Math.floor(drawEndX),
        drawStartY,
        drawEndY,
        vMoveScreen,
        obj,
        len,
        spriteScreenX,
        spriteWidth,
        spriteHeight,
        transformY,
        texWidth,
        texHeight,
        type: 'OBJECT'
      });
    });
    return sortedObjects;
  }
  drawFloor(player, element, ray, x) {
    const {mapPos} = element;
    const {position} = player;
    const {perpWallDist, drawStart} = ray;
    for (let y = drawStart; y < _config.resolutionHeight - this.camera.lookY; y++) {
      const currentDist = _config.resolutionHeight / (2 * y - _config.resolutionHeight);
      const weight = currentDist / perpWallDist;
      const currentFloorX = weight * mapPos.x + (1 - weight) * position.x;
      const currentFloorY = weight * mapPos.y + (1 - weight) * position.y;
      const floorTexX = ~~(currentFloorX * textureSize) % textureSize;
      const floorTexY = ~~(currentFloorY * textureSize) % textureSize;
      const alpha = mapValue(currentDist, 0, _config.viewDistance, 255, 0);
      _imageDataHelper.copyPixel(window.floorImageData, floorTexX, floorTexY, textureSize, this.rayCastingImageData, x, y + this.camera.lookY, _config.resolutionWidth, alpha);
    }
  }
  drawCeling(player, element, ray, x) {
    const {mapPos} = element;
    const {position} = player;
    const {perpWallDist, drawEnd} = ray;
    if (drawEnd < 0) {
      return;
    }
    for (let y = 0 - this.camera.lookY; y < drawEnd; y++) {
      const currentDist = _config.resolutionHeight / (_config.resolutionHeight - 2 * y);
      const weight = currentDist / perpWallDist;
      const currentFloorX = weight * mapPos.x + (1 - weight) * position.x;
      const currentFloorY = weight * mapPos.y + (1 - weight) * position.y;
      const floorTexX = ~~(currentFloorX * textureSize) % textureSize;
      const floorTexY = ~~(currentFloorY * textureSize) % textureSize;
      const alpha = mapValue(currentDist, 0, _config.viewDistance, 255, 0);
      _imageDataHelper.copyPixel(window.celingImageData, floorTexX, floorTexY, textureSize, this.rayCastingImageData, x, y + this.camera.lookY, _config.resolutionWidth, alpha);
    }
  }
  drawObject(object, x) {
    const {drawStartY, drawEndY, vMoveScreen, spriteScreenX, spriteWidth, spriteHeight, transformY, texWidth, texHeight, obj, len} = object;
    const alpha = mapValue(len, 0, _config.viewDistance * _config.viewDistanceObjectFix, 254, 0);
    const texX = Math.floor(256 * (x - (-spriteWidth / 2 + spriteScreenX)) * texWidth / spriteWidth) / 256;
    if (transformY > 0) {
      for (let y = Math.floor(drawStartY); y < drawEndY; y++) {
        if (x === _config.resolutionWidth / 2 && y === _config.resolutionHeight / 2) {
          this.camera.pointingAt = obj.type;
        }
        const d = (y - vMoveScreen) * 256 - _config.resolutionHeight * 128 + spriteHeight * 128;
        const texY = d * texHeight / spriteHeight / 256;
        _imageDataHelper.copyPixel(obj.texture, texX, texY, textureSize, this.rayCastingImageData, x, y, _config.resolutionWidth, alpha);
      }
    }
  }
  drawWall(player, wall, x, rayDir, isClosestWall) {
    const {position} = player;
    const ray = {};
    ray.dir = rayDir;
    let {mapPos, texture} = wall;
    ray.perpWallDist = (mapPos.x - position.x) / ray.dir.x;
    let lineHeight = Math.floor(Math.abs(_config.resolutionHeight / ray.perpWallDist));
    ray.drawStart = (_config.resolutionHeight + lineHeight) / 2;
    ray.drawEnd = ray.drawStart - lineHeight;
    let wallX = position.y + ray.perpWallDist * ray.dir.y;
    wallX += position.x + ray.perpWallDist * ray.dir.x;
    wallX -= Math.floor(wallX);
    const textureX = Math.floor((wallX - Math.floor(wallX)) * textureSize);
    let offsetDS = 0;
    if (ray.drawStart > _config.resolutionHeight) {
      offsetDS = ray.drawStart;
      ray.drawStart = _config.resolutionHeight;
    }
    let offsetDE = 0;
    if (ray.drawEnd < 0) {
      offsetDE = ray.drawEnd;
      ray.drawEnd = 0;
    }
    lineHeight = ray.drawStart - ray.drawEnd;
    lineHeight;
    let mapValueMin = offsetDE ? offsetDE : 0;
    let mapValueMax = offsetDS ? offsetDS : lineHeight;
    const alpha = mapValue(_vector2dDefault.default.magnitude(position, mapPos), 0, _config.viewDistance * _config.viewDistanceWallFix, 255, 0);
    for (let i = this.camera.lookY < 0 ? this.camera.lookY : 0; i < lineHeight + (this.camera.lookY > 0 ? this.camera.lookY : 0); i++) {
      const textureY = Math.floor(mapValue(i, mapValueMin, mapValueMax, 0, textureSize));
      _imageDataHelper.copyPixel(texture, textureX, textureY, textureSize, this.rayCastingImageData, Math.floor(x), Math.floor(ray.drawStart - i + this.camera.lookY), _config.resolutionWidth, alpha);
    }
    if (isClosestWall) {
      this.drawFloor(player, wall, ray, x);
      this.drawCeling(player, wall, ray, x);
    }
  }
  draw(player, walls, objects) {
    const {position, dir} = player;
    for (let x = 0; x < _config.resolutionWidth; x++) {
      const cameraX = 2 * x / _config.resolutionWidth - 1;
      const rayDir = new _vector2dDefault.default(dir.x + this.camera.planeX * cameraX, dir.y + this.camera.planeY * cameraX);
      const [hitWalls] = this.castRays(position, rayDir, walls);
      const visibleObjects = objects.filter(({drawStartX, drawEndX}) => {
        return drawStartX < x && x < drawEndX;
      });
      const elementsToDraw = [...hitWalls, ...visibleObjects].sort((elem1, elem2) => elem2.len - elem1.len);
      let lastElementIndex = 0;
      for (let i = elementsToDraw.length - 1; i > 0; i--) {
        if (elementsToDraw[i].type === 'WALL') {
          lastElementIndex = i;
          break;
        }
      }
      elementsToDraw.forEach((element, index) => {
        if (element.type === 'WALL') {
          this.drawWall(player, element, x, rayDir, lastElementIndex === index);
          return;
        }
        if (element.type === 'OBJECT') {
          this.drawObject(element, x);
          return;
        }
      });
    }
  }
  update(player, objects, walls) {
    this.camera.pointingAt = 'WORLD';
    this.rayCastingImageData = new ImageData(_config.resolutionWidth, _config.resolutionHeight);
    this.ctx.clearRect(0, 0, 800, 400);
    const preparedObjects = this.prepareObjectToDraw(player, objects);
    this.draw(player, walls, preparedObjects);
    this.ctx.putImageData(this.rayCastingImageData, 0, 0);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(_config.resolutionWidth / 2 - 2, _config.resolutionHeight / 2 - 2, 2, 2);
  }
}
exports.default = RaycastRenderer;

},{"./vector2d":"4iGxp","./imageData.helper":"6uO1X","./config":"5yJJr","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["3Imd1","5rkFb"], "5rkFb", "parcelRequire427e")

//# sourceMappingURL=index.3fafb3e2.js.map
