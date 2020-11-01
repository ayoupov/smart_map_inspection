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
})({"../node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../node_modules/parcel/src/builtins/bundle-url.js"}],"../node_modules/jspdf/dist/jspdf.es.min.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GState = l;
exports.ShadingPattern = d;
exports.TilingPattern = p;
exports.jsPDF = g;
exports.AcroFormTextField = exports.AcroFormRadioButton = exports.AcroFormPushButton = exports.AcroFormPasswordField = exports.AcroFormListBox = exports.AcroFormEditBox = exports.AcroFormComboBox = exports.AcroFormChoiceField = exports.AcroFormCheckBox = exports.AcroFormButton = exports.AcroFormAppearance = exports.AcroForm = exports.default = void 0;

/** @license
 *
 * jsPDF - PDF Document creation from JavaScript
 * Version 2.1.1 Built on 2020-09-07T12:58:19.950Z
 *                      CommitID 00000000
 *
 * Copyright (c) 2010-2020 James Hall <james@parall.ax>, https://github.com/MrRio/jsPDF
 *               2015-2020 yWorks GmbH, http://www.yworks.com
 *               2015-2020 Lukas Holländer <lukas.hollaender@yworks.com>, https://github.com/HackbrettXXX
 *               2016-2018 Aras Abbasi <aras.abbasi@gmail.com>
 *               2010 Aaron Spike, https://github.com/acspike
 *               2012 Willow Systems Corporation, willow-systems.com
 *               2012 Pablo Hess, https://github.com/pablohess
 *               2012 Florian Jenett, https://github.com/fjenett
 *               2013 Warren Weckesser, https://github.com/warrenweckesser
 *               2013 Youssef Beddad, https://github.com/lifof
 *               2013 Lee Driscoll, https://github.com/lsdriscoll
 *               2013 Stefan Slonevskiy, https://github.com/stefslon
 *               2013 Jeremy Morel, https://github.com/jmorel
 *               2013 Christoph Hartmann, https://github.com/chris-rock
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 James Makes, https://github.com/dollaruw
 *               2014 Diego Casorran, https://github.com/diegocr
 *               2014 Steven Spungin, https://github.com/Flamenco
 *               2014 Kenneth Glassey, https://github.com/Gavvers
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Contributor(s):
 *    siefkenj, ahwolf, rickygu, Midnith, saintclair, eaparango,
 *    kim3er, mfo, alnorth, Flamenco
 */
var t = function () {
  return "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this;
}();

function e() {
  t.console && "function" == typeof t.console.log && t.console.log.apply(t.console, arguments);
}

var n = {
  log: e,
  warn: function (n) {
    t.console && ("function" == typeof t.console.warn ? t.console.warn.apply(t.console, arguments) : e.call(null, arguments));
  },
  error: function (n) {
    t.console && ("function" == typeof t.console.error ? t.console.error.apply(t.console, arguments) : e(n));
  }
};
/**
 * @license
 * FileSaver.js
 * A saveAs() FileSaver implementation.
 *
 * By Eli Grey, http://eligrey.com
 *
 * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
 * source  : http://purl.eligrey.com/github/FileSaver.js
 */

function r(t, e, r) {
  var i = new XMLHttpRequest();
  i.open("GET", t), i.responseType = "blob", i.onload = function () {
    u(i.response, e, r);
  }, i.onerror = function () {
    n.error("could not download file");
  }, i.send();
}

function i(t) {
  var e = new XMLHttpRequest();
  e.open("HEAD", t, !1);

  try {
    e.send();
  } catch (t) {}

  return e.status >= 200 && e.status <= 299;
}

function a(t) {
  try {
    t.dispatchEvent(new MouseEvent("click"));
  } catch (n) {
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), t.dispatchEvent(e);
  }
}

var o,
    s,
    u = t.saveAs || ("object" != typeof window || window !== t ? function () {} : "download" in HTMLAnchorElement.prototype ? function (e, n, o) {
  var s = t.URL || t.webkitURL,
      u = document.createElement("a");
  n = n || e.name || "download", u.download = n, u.rel = "noopener", "string" == typeof e ? (u.href = e, u.origin !== location.origin ? i(u.href) ? r(e, n, o) : a(u, u.target = "_blank") : a(u)) : (u.href = s.createObjectURL(e), setTimeout(function () {
    s.revokeObjectURL(u.href);
  }, 4e4), setTimeout(function () {
    a(u);
  }, 0));
} : "msSaveOrOpenBlob" in navigator ? function (t, e, o) {
  if (e = e || t.name || "download", "string" == typeof t) {
    if (i(t)) r(t, e, o);else {
      var s = document.createElement("a");
      s.href = t, s.target = "_blank", setTimeout(function () {
        a(s);
      });
    }
  } else navigator.msSaveOrOpenBlob(function (t, e) {
    return void 0 === e ? e = {
      autoBom: !1
    } : "object" != typeof e && (n.warn("Deprecated: Expected third argument to be a object"), e = {
      autoBom: !e
    }), e.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob([String.fromCharCode(65279), t], {
      type: t.type
    }) : t;
  }(t, o), e);
} : function (e, n, i, a) {
  if ((a = a || open("", "_blank")) && (a.document.title = a.document.body.innerText = "downloading..."), "string" == typeof e) return r(e, n, i);
  var o = "application/octet-stream" === e.type,
      s = /constructor/i.test(t.HTMLElement) || t.safari,
      u = /CriOS\/[\d]+/.test(navigator.userAgent);

  if ((u || o && s) && "object" == typeof FileReader) {
    var c = new FileReader();
    c.onloadend = function () {
      var t = c.result;
      t = u ? t : t.replace(/^data:[^;]*;/, "data:attachment/file;"), a ? a.location.href = t : location = t, a = null;
    }, c.readAsDataURL(e);
  } else {
    var h = t.URL || t.webkitURL,
        l = h.createObjectURL(e);
    a ? a.location = l : location.href = l, a = null, setTimeout(function () {
      h.revokeObjectURL(l);
    }, 4e4);
  }
});
/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * {@link   http://www.phpied.com/rgb-color-parser-in-javascript/}
 * @license Use it if you like it
 */

function c(t) {
  var e;
  t = t || "", this.ok = !1, "#" == t.charAt(0) && (t = t.substr(1, 6));
  t = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "00ffff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000000",
    blanchedalmond: "ffebcd",
    blue: "0000ff",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "00ffff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dodgerblue: "1e90ff",
    feldspar: "d19275",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "ff00ff",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgrey: "d3d3d3",
    lightgreen: "90ee90",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslateblue: "8470ff",
    lightslategray: "778899",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "00ff00",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "ff00ff",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370d8",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "d87093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    red: "ff0000",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    violetred: "d02090",
    wheat: "f5deb3",
    white: "ffffff",
    whitesmoke: "f5f5f5",
    yellow: "ffff00",
    yellowgreen: "9acd32"
  }[t = (t = t.replace(/ /g, "")).toLowerCase()] || t;

  for (var n = [{
    re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
    example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
    process: function (t) {
      return [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])];
    }
  }, {
    re: /^(\w{2})(\w{2})(\w{2})$/,
    example: ["#00ff00", "336699"],
    process: function (t) {
      return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)];
    }
  }, {
    re: /^(\w{1})(\w{1})(\w{1})$/,
    example: ["#fb0", "f0f"],
    process: function (t) {
      return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)];
    }
  }], r = 0; r < n.length; r++) {
    var i = n[r].re,
        a = n[r].process,
        o = i.exec(t);
    o && (e = a(o), this.r = e[0], this.g = e[1], this.b = e[2], this.ok = !0);
  }

  this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r, this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g, this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b, this.toRGB = function () {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  }, this.toHex = function () {
    var t = this.r.toString(16),
        e = this.g.toString(16),
        n = this.b.toString(16);
    return 1 == t.length && (t = "0" + t), 1 == e.length && (e = "0" + e), 1 == n.length && (n = "0" + n), "#" + t + e + n;
  };
}

function h(e) {
  if ("object" != typeof e) throw new Error("Invalid Context passed to initialize PubSub (jsPDF-module)");
  var r = {};
  this.subscribe = function (t, e, n) {
    if (n = n || !1, "string" != typeof t || "function" != typeof e || "boolean" != typeof n) throw new Error("Invalid arguments passed to PubSub.subscribe (jsPDF-module)");
    r.hasOwnProperty(t) || (r[t] = {});
    var i = Math.random().toString(35);
    return r[t][i] = [e, !!n], i;
  }, this.unsubscribe = function (t) {
    for (var e in r) if (r[e][t]) return delete r[e][t], 0 === Object.keys(r[e]).length && delete r[e], !0;

    return !1;
  }, this.publish = function (i) {
    if (r.hasOwnProperty(i)) {
      var a = Array.prototype.slice.call(arguments, 1),
          o = [];

      for (var s in r[i]) {
        var u = r[i][s];

        try {
          u[0].apply(e, a);
        } catch (e) {
          t.console && n.error("jsPDF PubSub Error", e.message, e);
        }

        u[1] && o.push(s);
      }

      o.length && o.forEach(this.unsubscribe);
    }
  }, this.getTopics = function () {
    return r;
  };
}

function l(t) {
  if (!(this instanceof l)) return new l(t);
  var e = "opacity,stroke-opacity".split(",");

  for (var n in t) t.hasOwnProperty(n) && e.indexOf(n) >= 0 && (this[n] = t[n]);

  this.id = "", this.objectNumber = -1;
}

function f(t, e) {
  this.gState = t, this.matrix = e, this.id = "", this.objectNumber = -1;
}

function d(t, e, n, r, i) {
  if (!(this instanceof d)) return new d(t, e, n, r, i);
  this.type = "axial" === t ? 2 : 3, this.coords = e, this.colors = n, f.call(this, r, i);
}

function p(t, e, n, r, i) {
  if (!(this instanceof p)) return new p(t, e, n, r, i);
  this.boundingBox = t, this.xStep = e, this.yStep = n, this.stream = "", this.cloneIndex = 0, f.call(this, r, i);
}

function g(e) {
  var r,
      i = "string" == typeof arguments[0] ? arguments[0] : "p",
      a = arguments[1],
      o = arguments[2],
      f = arguments[3],
      m = [],
      v = 1,
      b = 16,
      y = "S";
  "object" == typeof (e = e || {}) && (i = e.orientation, a = e.unit || a, o = e.format || o, f = e.compress || e.compressPdf || f, v = "number" == typeof e.userUnit ? Math.abs(e.userUnit) : 1, void 0 !== e.precision && (r = e.precision), void 0 !== e.floatPrecision && (b = e.floatPrecision), y = e.defaultPathOperation || "S"), m = e.filters || (!0 === f ? ["FlateEncode"] : m), a = a || "mm", i = ("" + (i || "P")).toLowerCase();
  var w = e.putOnlyUsedFonts || !1,
      N = {},
      L = {
    internal: {},
    __private__: {}
  };
  L.__private__.PubSub = h;

  var x = "1.3",
      A = L.__private__.getPdfVersion = function () {
    return x;
  };

  L.__private__.setPdfVersion = function (t) {
    x = t;
  };

  var _ = {
    a0: [2383.94, 3370.39],
    a1: [1683.78, 2383.94],
    a2: [1190.55, 1683.78],
    a3: [841.89, 1190.55],
    a4: [595.28, 841.89],
    a5: [419.53, 595.28],
    a6: [297.64, 419.53],
    a7: [209.76, 297.64],
    a8: [147.4, 209.76],
    a9: [104.88, 147.4],
    a10: [73.7, 104.88],
    b0: [2834.65, 4008.19],
    b1: [2004.09, 2834.65],
    b2: [1417.32, 2004.09],
    b3: [1000.63, 1417.32],
    b4: [708.66, 1000.63],
    b5: [498.9, 708.66],
    b6: [354.33, 498.9],
    b7: [249.45, 354.33],
    b8: [175.75, 249.45],
    b9: [124.72, 175.75],
    b10: [87.87, 124.72],
    c0: [2599.37, 3676.54],
    c1: [1836.85, 2599.37],
    c2: [1298.27, 1836.85],
    c3: [918.43, 1298.27],
    c4: [649.13, 918.43],
    c5: [459.21, 649.13],
    c6: [323.15, 459.21],
    c7: [229.61, 323.15],
    c8: [161.57, 229.61],
    c9: [113.39, 161.57],
    c10: [79.37, 113.39],
    dl: [311.81, 623.62],
    letter: [612, 792],
    "government-letter": [576, 756],
    legal: [612, 1008],
    "junior-legal": [576, 360],
    ledger: [1224, 792],
    tabloid: [792, 1224],
    "credit-card": [153, 243]
  };

  L.__private__.getPageFormats = function () {
    return _;
  };

  var S = L.__private__.getPageFormat = function (t) {
    return _[t];
  };

  o = o || "a4";
  var P = {
    COMPAT: "compat",
    ADVANCED: "advanced"
  },
      k = P.COMPAT;

  function F() {
    this.saveGraphicsState(), ot(new Dt(Nt, 0, 0, -Nt, 0, Cn() * Nt).toString() + " cm"), this.setFontSize(this.getFontSize() / Nt), y = "n", k = P.ADVANCED;
  }

  function I() {
    this.restoreGraphicsState(), y = "S", k = P.COMPAT;
  }

  L.advancedAPI = function (t) {
    var e = k === P.COMPAT;
    return e && F.call(this), "function" != typeof t || (t(this), e && I.call(this)), this;
  }, L.compatAPI = function (t) {
    var e = k === P.ADVANCED;
    return e && I.call(this), "function" != typeof t || (t(this), e && F.call(this)), this;
  }, L.isAdvancedAPI = function () {
    return k === P.ADVANCED;
  };

  var C,
      j = function (t) {
    if (k !== P.ADVANCED) throw new Error(t + " is only available in 'advanced' API mode. You need to call advancedAPI() first.");
  },
      B = L.roundToPrecision = L.__private__.roundToPrecision = function (t, e) {
    var n = r || e;
    if (isNaN(t) || isNaN(n)) throw new Error("Invalid argument passed to jsPDF.roundToPrecision");
    return t.toFixed(n).replace(/0+$/, "");
  };

  C = L.hpf = L.__private__.hpf = "number" == typeof b ? function (t) {
    if (isNaN(t)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return B(t, b);
  } : "smart" === b ? function (t) {
    if (isNaN(t)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return B(t, t > -1 && t < 1 ? 16 : 5);
  } : function (t) {
    if (isNaN(t)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return B(t, 16);
  };

  var O = L.f2 = L.__private__.f2 = function (t) {
    if (isNaN(t)) throw new Error("Invalid argument passed to jsPDF.f2");
    return B(t, 2);
  },
      M = L.__private__.f3 = function (t) {
    if (isNaN(t)) throw new Error("Invalid argument passed to jsPDF.f3");
    return B(t, 3);
  },
      E = L.scale = L.__private__.scale = function (t) {
    if (isNaN(t)) throw new Error("Invalid argument passed to jsPDF.scale");
    return k === P.COMPAT ? t * Nt : k === P.ADVANCED ? t : void 0;
  },
      q = function (t) {
    return k === P.COMPAT ? Cn() - t : k === P.ADVANCED ? t : void 0;
  },
      R = function (t) {
    return E(q(t));
  };

  L.__private__.setPrecision = L.setPrecision = function (t) {
    "number" == typeof parseInt(t, 10) && (r = parseInt(t, 10));
  };

  var T,
      D = "00000000000000000000000000000000",
      U = L.__private__.getFileId = function () {
    return D;
  },
      z = L.__private__.setFileId = function (t) {
    return D = void 0 !== t && /^[a-fA-F0-9]{32}$/.test(t) ? t.toUpperCase() : D.split("").map(function () {
      return "ABCDEF0123456789".charAt(Math.floor(16 * Math.random()));
    }).join("");
  };

  L.setFileId = function (t) {
    return z(t), this;
  }, L.getFileId = function () {
    return U();
  };

  var H = L.__private__.convertDateToPDFDate = function (t) {
    var e = t.getTimezoneOffset(),
        n = e < 0 ? "+" : "-",
        r = Math.floor(Math.abs(e / 60)),
        i = Math.abs(e % 60),
        a = [n, J(r), "'", J(i), "'"].join("");
    return ["D:", t.getFullYear(), J(t.getMonth() + 1), J(t.getDate()), J(t.getHours()), J(t.getMinutes()), J(t.getSeconds()), a].join("");
  },
      W = L.__private__.convertPDFDateToDate = function (t) {
    var e = parseInt(t.substr(2, 4), 10),
        n = parseInt(t.substr(6, 2), 10) - 1,
        r = parseInt(t.substr(8, 2), 10),
        i = parseInt(t.substr(10, 2), 10),
        a = parseInt(t.substr(12, 2), 10),
        o = parseInt(t.substr(14, 2), 10);
    return new Date(e, n, r, i, a, o, 0);
  },
      V = L.__private__.setCreationDate = function (t) {
    var e;
    if (void 0 === t && (t = new Date()), t instanceof Date) e = H(t);else {
      if (!/^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|-0[0-9]|-1[0-1])'(0[0-9]|[1-5][0-9])'?$/.test(t)) throw new Error("Invalid argument passed to jsPDF.setCreationDate");
      e = t;
    }
    return T = e;
  },
      G = L.__private__.getCreationDate = function (t) {
    var e = T;
    return "jsDate" === t && (e = W(T)), e;
  };

  L.setCreationDate = function (t) {
    return V(t), this;
  }, L.getCreationDate = function (t) {
    return G(t);
  };

  var Y,
      J = L.__private__.padd2 = function (t) {
    return ("0" + parseInt(t)).slice(-2);
  },
      X = L.__private__.padd2Hex = function (t) {
    return ("00" + (t = t.toString())).substr(t.length);
  },
      K = 0,
      Z = [],
      $ = [],
      Q = 0,
      tt = [],
      et = [],
      nt = !1,
      rt = $,
      it = function () {
    K = 0, Q = 0, $ = [], Z = [], tt = [], Jt = Vt(), Xt = Vt();
  };

  L.__private__.setCustomOutputDestination = function (t) {
    nt = !0, rt = t;
  };

  var at = function (t) {
    nt || (rt = t);
  };

  L.__private__.resetCustomOutputDestination = function () {
    nt = !1, rt = $;
  };

  var ot = L.__private__.out = function (t) {
    return t = t.toString(), Q += t.length + 1, rt.push(t), rt;
  },
      st = L.__private__.write = function (t) {
    return ot(1 === arguments.length ? t.toString() : Array.prototype.join.call(arguments, " "));
  },
      ut = L.__private__.getArrayBuffer = function (t) {
    for (var e = t.length, n = new ArrayBuffer(e), r = new Uint8Array(n); e--;) r[e] = t.charCodeAt(e);

    return n;
  },
      ct = [["Helvetica", "helvetica", "normal", "WinAnsiEncoding"], ["Helvetica-Bold", "helvetica", "bold", "WinAnsiEncoding"], ["Helvetica-Oblique", "helvetica", "italic", "WinAnsiEncoding"], ["Helvetica-BoldOblique", "helvetica", "bolditalic", "WinAnsiEncoding"], ["Courier", "courier", "normal", "WinAnsiEncoding"], ["Courier-Bold", "courier", "bold", "WinAnsiEncoding"], ["Courier-Oblique", "courier", "italic", "WinAnsiEncoding"], ["Courier-BoldOblique", "courier", "bolditalic", "WinAnsiEncoding"], ["Times-Roman", "times", "normal", "WinAnsiEncoding"], ["Times-Bold", "times", "bold", "WinAnsiEncoding"], ["Times-Italic", "times", "italic", "WinAnsiEncoding"], ["Times-BoldItalic", "times", "bolditalic", "WinAnsiEncoding"], ["ZapfDingbats", "zapfdingbats", "normal", null], ["Symbol", "symbol", "normal", null]];

  L.__private__.getStandardFonts = function () {
    return ct;
  };

  var ht = e.fontSize || 16;

  L.__private__.setFontSize = L.setFontSize = function (t) {
    return ht = k === P.ADVANCED ? t / Nt : t, this;
  };

  var lt,
      ft = L.__private__.getFontSize = L.getFontSize = function () {
    return k === P.COMPAT ? ht : ht * Nt;
  },
      dt = e.R2L || !1;

  L.__private__.setR2L = L.setR2L = function (t) {
    return dt = t, this;
  }, L.__private__.getR2L = L.getR2L = function () {
    return dt;
  };

  var pt,
      gt = L.__private__.setZoomMode = function (t) {
    var e = [void 0, null, "fullwidth", "fullheight", "fullpage", "original"];
    if (/^\d*\.?\d*%$/.test(t)) lt = t;else if (isNaN(t)) {
      if (-1 === e.indexOf(t)) throw new Error('zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "' + t + '" is not recognized.');
      lt = t;
    } else lt = parseInt(t, 10);
  };

  L.__private__.getZoomMode = function () {
    return lt;
  };

  var mt,
      vt = L.__private__.setPageMode = function (t) {
    if (-1 == [void 0, null, "UseNone", "UseOutlines", "UseThumbs", "FullScreen"].indexOf(t)) throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "' + t + '" is not recognized.');
    pt = t;
  };

  L.__private__.getPageMode = function () {
    return pt;
  };

  var bt = L.__private__.setLayoutMode = function (t) {
    if (-1 == [void 0, null, "continuous", "single", "twoleft", "tworight", "two"].indexOf(t)) throw new Error('Layout mode must be one of continuous, single, twoleft, tworight. "' + t + '" is not recognized.');
    mt = t;
  };

  L.__private__.getLayoutMode = function () {
    return mt;
  }, L.__private__.setDisplayMode = L.setDisplayMode = function (t, e, n) {
    return gt(t), bt(e), vt(n), this;
  };
  var yt = {
    title: "",
    subject: "",
    author: "",
    keywords: "",
    creator: ""
  };
  L.__private__.getDocumentProperty = function (t) {
    if (-1 === Object.keys(yt).indexOf(t)) throw new Error("Invalid argument passed to jsPDF.getDocumentProperty");
    return yt[t];
  }, L.__private__.getDocumentProperties = function () {
    return yt;
  }, L.__private__.setDocumentProperties = L.setProperties = L.setDocumentProperties = function (t) {
    for (var e in yt) yt.hasOwnProperty(e) && t[e] && (yt[e] = t[e]);

    return this;
  }, L.__private__.setDocumentProperty = function (t, e) {
    if (-1 === Object.keys(yt).indexOf(t)) throw new Error("Invalid arguments passed to jsPDF.setDocumentProperty");
    return yt[t] = e;
  };

  var wt,
      Nt,
      Lt,
      xt,
      At,
      _t = {},
      St = {},
      Pt = [],
      kt = {},
      Ft = {},
      It = {},
      Ct = {},
      jt = null,
      Bt = 0,
      Ot = [],
      Mt = new h(L),
      Et = e.hotfixes || [],
      qt = {},
      Rt = {},
      Tt = [],
      Dt = function (t, e, n, r, i, a) {
    if (!(this instanceof Dt)) return new Dt(t, e, n, r, i, a);
    isNaN(t) && (t = 1), isNaN(e) && (e = 0), isNaN(n) && (n = 0), isNaN(r) && (r = 1), isNaN(i) && (i = 0), isNaN(a) && (a = 0), this._matrix = [t, e, n, r, i, a];
  };

  Object.defineProperty(Dt.prototype, "sx", {
    get: function () {
      return this._matrix[0];
    },
    set: function (t) {
      this._matrix[0] = t;
    }
  }), Object.defineProperty(Dt.prototype, "shy", {
    get: function () {
      return this._matrix[1];
    },
    set: function (t) {
      this._matrix[1] = t;
    }
  }), Object.defineProperty(Dt.prototype, "shx", {
    get: function () {
      return this._matrix[2];
    },
    set: function (t) {
      this._matrix[2] = t;
    }
  }), Object.defineProperty(Dt.prototype, "sy", {
    get: function () {
      return this._matrix[3];
    },
    set: function (t) {
      this._matrix[3] = t;
    }
  }), Object.defineProperty(Dt.prototype, "tx", {
    get: function () {
      return this._matrix[4];
    },
    set: function (t) {
      this._matrix[4] = t;
    }
  }), Object.defineProperty(Dt.prototype, "ty", {
    get: function () {
      return this._matrix[5];
    },
    set: function (t) {
      this._matrix[5] = t;
    }
  }), Object.defineProperty(Dt.prototype, "a", {
    get: function () {
      return this._matrix[0];
    },
    set: function (t) {
      this._matrix[0] = t;
    }
  }), Object.defineProperty(Dt.prototype, "b", {
    get: function () {
      return this._matrix[1];
    },
    set: function (t) {
      this._matrix[1] = t;
    }
  }), Object.defineProperty(Dt.prototype, "c", {
    get: function () {
      return this._matrix[2];
    },
    set: function (t) {
      this._matrix[2] = t;
    }
  }), Object.defineProperty(Dt.prototype, "d", {
    get: function () {
      return this._matrix[3];
    },
    set: function (t) {
      this._matrix[3] = t;
    }
  }), Object.defineProperty(Dt.prototype, "e", {
    get: function () {
      return this._matrix[4];
    },
    set: function (t) {
      this._matrix[4] = t;
    }
  }), Object.defineProperty(Dt.prototype, "f", {
    get: function () {
      return this._matrix[5];
    },
    set: function (t) {
      this._matrix[5] = t;
    }
  }), Object.defineProperty(Dt.prototype, "rotation", {
    get: function () {
      return Math.atan2(this.shx, this.sx);
    }
  }), Object.defineProperty(Dt.prototype, "scaleX", {
    get: function () {
      return this.decompose().scale.sx;
    }
  }), Object.defineProperty(Dt.prototype, "scaleY", {
    get: function () {
      return this.decompose().scale.sy;
    }
  }), Object.defineProperty(Dt.prototype, "isIdentity", {
    get: function () {
      return 1 === this.sx && 0 === this.shy && 0 === this.shx && 1 === this.sy && 0 === this.tx && 0 === this.ty;
    }
  }), Dt.prototype.join = function (t) {
    return [this.sx, this.shy, this.shx, this.sy, this.tx, this.ty].map(C).join(t);
  }, Dt.prototype.multiply = function (t) {
    var e = t.sx * this.sx + t.shy * this.shx,
        n = t.sx * this.shy + t.shy * this.sy,
        r = t.shx * this.sx + t.sy * this.shx,
        i = t.shx * this.shy + t.sy * this.sy,
        a = t.tx * this.sx + t.ty * this.shx + this.tx,
        o = t.tx * this.shy + t.ty * this.sy + this.ty;
    return new Dt(e, n, r, i, a, o);
  }, Dt.prototype.decompose = function () {
    var t = this.sx,
        e = this.shy,
        n = this.shx,
        r = this.sy,
        i = this.tx,
        a = this.ty,
        o = Math.sqrt(t * t + e * e),
        s = (t /= o) * n + (e /= o) * r;
    n -= t * s, r -= e * s;
    var u = Math.sqrt(n * n + r * r);
    return s /= u, t * (r /= u) < e * (n /= u) && (t = -t, e = -e, s = -s, o = -o), {
      scale: new Dt(o, 0, 0, u, 0, 0),
      translate: new Dt(1, 0, 0, 1, i, a),
      rotate: new Dt(t, e, -e, t, 0, 0),
      skew: new Dt(1, 0, s, 1, 0, 0)
    };
  }, Dt.prototype.toString = function (t) {
    return this.join(" ");
  }, Dt.prototype.inversed = function () {
    var t = this.sx,
        e = this.shy,
        n = this.shx,
        r = this.sy,
        i = this.tx,
        a = this.ty,
        o = 1 / (t * r - e * n),
        s = r * o,
        u = -e * o,
        c = -n * o,
        h = t * o;
    return new Dt(s, u, c, h, -s * i - c * a, -u * i - h * a);
  }, Dt.prototype.applyToPoint = function (t) {
    var e = t.x * this.sx + t.y * this.shx + this.tx,
        n = t.x * this.shy + t.y * this.sy + this.ty;
    return new xn(e, n);
  }, Dt.prototype.applyToRectangle = function (t) {
    var e = this.applyToPoint(t),
        n = this.applyToPoint(new xn(t.x + t.w, t.y + t.h));
    return new An(e.x, e.y, n.x - e.x, n.y - e.y);
  }, Dt.prototype.clone = function () {
    var t = this.sx,
        e = this.shy,
        n = this.shx,
        r = this.sy,
        i = this.tx,
        a = this.ty;
    return new Dt(t, e, n, r, i, a);
  }, L.Matrix = Dt;

  var Ut = L.matrixMult = function (t, e) {
    return e.multiply(t);
  },
      zt = new Dt(1, 0, 0, 1, 0, 0);

  L.unitMatrix = L.identityMatrix = zt;

  var Ht = function (t, e) {
    if (!Ft[t]) {
      var n = (e instanceof d ? "Sh" : "P") + (Object.keys(kt).length + 1).toString(10);
      e.id = n, Ft[t] = n, kt[n] = e, Mt.publish("addPattern", e);
    }
  };

  L.ShadingPattern = d, L.TilingPattern = p, L.addShadingPattern = function (t, e) {
    return j("addShadingPattern()"), Ht(t, e), this;
  }, L.beginTilingPattern = function (t) {
    j("beginTilingPattern()"), Sn(t.boundingBox[0], t.boundingBox[1], t.boundingBox[2] - t.boundingBox[0], t.boundingBox[3] - t.boundingBox[1], t.matrix);
  }, L.endTilingPattern = function (t, e) {
    j("endTilingPattern()"), e.stream = et[Y].join("\n"), Ht(t, e), Mt.publish("endTilingPattern", e), Tt.pop().restore();
  };

  var Wt = L.__private__.newObject = function () {
    var t = Vt();
    return Gt(t, !0), t;
  },
      Vt = L.__private__.newObjectDeferred = function () {
    return K++, Z[K] = function () {
      return Q;
    }, K;
  },
      Gt = function (t, e) {
    return e = "boolean" == typeof e && e, Z[t] = Q, e && ot(t + " 0 obj"), t;
  },
      Yt = L.__private__.newAdditionalObject = function () {
    var t = {
      objId: Vt(),
      content: ""
    };
    return tt.push(t), t;
  },
      Jt = Vt(),
      Xt = Vt(),
      Kt = L.__private__.decodeColorString = function (t) {
    var e = t.split(" ");

    if (2 !== e.length || "g" !== e[1] && "G" !== e[1]) {
      if (5 === e.length && ("k" === e[4] || "K" === e[4])) {
        e = [(1 - e[0]) * (1 - e[3]), (1 - e[1]) * (1 - e[3]), (1 - e[2]) * (1 - e[3]), "r"];
      }
    } else {
      var n = parseFloat(e[0]);
      e = [n, n, n, "r"];
    }

    for (var r = "#", i = 0; i < 3; i++) r += ("0" + Math.floor(255 * parseFloat(e[i])).toString(16)).slice(-2);

    return r;
  },
      Zt = L.__private__.encodeColorString = function (t) {
    var e;
    "string" == typeof t && (t = {
      ch1: t
    });
    var n = t.ch1,
        r = t.ch2,
        i = t.ch3,
        a = t.ch4,
        o = "draw" === t.pdfColorType ? ["G", "RG", "K"] : ["g", "rg", "k"];

    if ("string" == typeof n && "#" !== n.charAt(0)) {
      var s = new c(n);
      if (s.ok) n = s.toHex();else if (!/^\d*\.?\d*$/.test(n)) throw new Error('Invalid color "' + n + '" passed to jsPDF.encodeColorString.');
    }

    if ("string" == typeof n && /^#[0-9A-Fa-f]{3}$/.test(n) && (n = "#" + n[1] + n[1] + n[2] + n[2] + n[3] + n[3]), "string" == typeof n && /^#[0-9A-Fa-f]{6}$/.test(n)) {
      var u = parseInt(n.substr(1), 16);
      n = u >> 16 & 255, r = u >> 8 & 255, i = 255 & u;
    }

    if (void 0 === r || void 0 === a && n === r && r === i) {
      if ("string" == typeof n) e = n + " " + o[0];else switch (t.precision) {
        case 2:
          e = O(n / 255) + " " + o[0];
          break;

        case 3:
        default:
          e = M(n / 255) + " " + o[0];
      }
    } else if (void 0 === a || "object" == typeof a) {
      if (a && !isNaN(a.a) && 0 === a.a) return e = ["1.", "1.", "1.", o[1]].join(" ");
      if ("string" == typeof n) e = [n, r, i, o[1]].join(" ");else switch (t.precision) {
        case 2:
          e = [O(n / 255), O(r / 255), O(i / 255), o[1]].join(" ");
          break;

        default:
        case 3:
          e = [M(n / 255), M(r / 255), M(i / 255), o[1]].join(" ");
      }
    } else if ("string" == typeof n) e = [n, r, i, a, o[2]].join(" ");else switch (t.precision) {
      case 2:
        e = [O(n), O(r), O(i), O(a), o[2]].join(" ");
        break;

      case 3:
      default:
        e = [M(n), M(r), M(i), M(a), o[2]].join(" ");
    }
    return e;
  },
      $t = L.__private__.getFilters = function () {
    return m;
  },
      Qt = L.__private__.putStream = function (t) {
    var e = (t = t || {}).data || "",
        n = t.filters || $t(),
        r = t.alreadyAppliedFilters || [],
        i = t.addLength1 || !1,
        a = e.length,
        o = {};
    !0 === n && (n = ["FlateEncode"]);
    var s = t.additionalKeyValues || [],
        u = (o = void 0 !== g.API.processDataByFilters ? g.API.processDataByFilters(e, n) : {
      data: e,
      reverseChain: []
    }).reverseChain + (Array.isArray(r) ? r.join(" ") : r.toString());
    if (0 !== o.data.length && (s.push({
      key: "Length",
      value: o.data.length
    }), !0 === i && s.push({
      key: "Length1",
      value: a
    })), 0 != u.length) if (u.split("/").length - 1 == 1) s.push({
      key: "Filter",
      value: u
    });else {
      s.push({
        key: "Filter",
        value: "[" + u + "]"
      });

      for (var c = 0; c < s.length; c += 1) if ("DecodeParms" === s[c].key) {
        for (var h = [], l = 0; l < o.reverseChain.split("/").length - 1; l += 1) h.push("null");

        h.push(s[c].value), s[c].value = "[" + h.join(" ") + "]";
      }
    }
    ot("<<");

    for (var f = 0; f < s.length; f++) ot("/" + s[f].key + " " + s[f].value);

    ot(">>"), 0 !== o.data.length && (ot("stream"), ot(o.data), ot("endstream"));
  },
      te = L.__private__.putPage = function (t) {
    var e = t.number,
        n = t.data,
        r = t.objId,
        i = t.contentsObjId;
    Gt(r, !0), ot("<</Type /Page"), ot("/Parent " + t.rootDictionaryObjId + " 0 R"), ot("/Resources " + t.resourceDictionaryObjId + " 0 R"), ot("/MediaBox [" + parseFloat(C(t.mediaBox.bottomLeftX)) + " " + parseFloat(C(t.mediaBox.bottomLeftY)) + " " + C(t.mediaBox.topRightX) + " " + C(t.mediaBox.topRightY) + "]"), null !== t.cropBox && ot("/CropBox [" + C(t.cropBox.bottomLeftX) + " " + C(t.cropBox.bottomLeftY) + " " + C(t.cropBox.topRightX) + " " + C(t.cropBox.topRightY) + "]"), null !== t.bleedBox && ot("/BleedBox [" + C(t.bleedBox.bottomLeftX) + " " + C(t.bleedBox.bottomLeftY) + " " + C(t.bleedBox.topRightX) + " " + C(t.bleedBox.topRightY) + "]"), null !== t.trimBox && ot("/TrimBox [" + C(t.trimBox.bottomLeftX) + " " + C(t.trimBox.bottomLeftY) + " " + C(t.trimBox.topRightX) + " " + C(t.trimBox.topRightY) + "]"), null !== t.artBox && ot("/ArtBox [" + C(t.artBox.bottomLeftX) + " " + C(t.artBox.bottomLeftY) + " " + C(t.artBox.topRightX) + " " + C(t.artBox.topRightY) + "]"), "number" == typeof t.userUnit && 1 !== t.userUnit && ot("/UserUnit " + t.userUnit), Mt.publish("putPage", {
      objId: r,
      pageContext: Ot[e],
      pageNumber: e,
      page: n
    }), ot("/Contents " + i + " 0 R"), ot(">>"), ot("endobj");
    var a = n.join("\n");
    return k === P.ADVANCED && (a += "\nQ"), Gt(i, !0), Qt({
      data: a,
      filters: $t()
    }), ot("endobj"), r;
  },
      ee = L.__private__.putPages = function () {
    var t,
        e,
        n = [];

    for (t = 1; t <= Bt; t++) Ot[t].objId = Vt(), Ot[t].contentsObjId = Vt();

    for (t = 1; t <= Bt; t++) n.push(te({
      number: t,
      data: et[t],
      objId: Ot[t].objId,
      contentsObjId: Ot[t].contentsObjId,
      mediaBox: Ot[t].mediaBox,
      cropBox: Ot[t].cropBox,
      bleedBox: Ot[t].bleedBox,
      trimBox: Ot[t].trimBox,
      artBox: Ot[t].artBox,
      userUnit: Ot[t].userUnit,
      rootDictionaryObjId: Jt,
      resourceDictionaryObjId: Xt
    }));

    Gt(Jt, !0), ot("<</Type /Pages");
    var r = "/Kids [";

    for (e = 0; e < Bt; e++) r += n[e] + " 0 R ";

    ot(r + "]"), ot("/Count " + Bt), ot(">>"), ot("endobj"), Mt.publish("postPutPages");
  },
      ne = function (t) {
    var e = function (t, e) {
      return -1 !== t.indexOf(" ") ? "(" + _e(t, e) + ")" : _e(t, e);
    };

    Mt.publish("putFont", {
      font: t,
      out: ot,
      newObject: Wt,
      putStream: Qt,
      pdfEscapeWithNeededParanthesis: e
    }), !0 !== t.isAlreadyPutted && (t.objectNumber = Wt(), ot("<<"), ot("/Type /Font"), ot("/BaseFont /" + e(t.postScriptName)), ot("/Subtype /Type1"), "string" == typeof t.encoding && ot("/Encoding /" + t.encoding), ot("/FirstChar 32"), ot("/LastChar 255"), ot(">>"), ot("endobj"));
  },
      re = function () {
    for (var t in _t) _t.hasOwnProperty(t) && (!1 === w || !0 === w && N.hasOwnProperty(t)) && ne(_t[t]);
  },
      ie = function (t) {
    t.objectNumber = Wt();
    var e = [];
    e.push({
      key: "Type",
      value: "/XObject"
    }), e.push({
      key: "Subtype",
      value: "/Form"
    }), e.push({
      key: "BBox",
      value: "[" + [C(t.x), C(t.y), C(t.x + t.width), C(t.y + t.height)].join(" ") + "]"
    }), e.push({
      key: "Matrix",
      value: "[" + t.matrix.toString() + "]"
    });
    var n = t.pages[1].join("\n");
    Qt({
      data: n,
      additionalKeyValues: e
    }), ot("endobj");
  },
      ae = function () {
    for (var t in qt) qt.hasOwnProperty(t) && ie(qt[t]);
  },
      oe = function (t, e) {
    var n,
        r = [],
        i = 1 / (e - 1);

    for (n = 0; n < 1; n += i) r.push(n);

    if (r.push(1), 0 != t[0].offset) {
      var a = {
        offset: 0,
        color: t[0].color
      };
      t.unshift(a);
    }

    if (1 != t[t.length - 1].offset) {
      var o = {
        offset: 1,
        color: t[t.length - 1].color
      };
      t.push(o);
    }

    for (var s = "", u = 0, c = 0; c < r.length; c++) {
      for (n = r[c]; n > t[u + 1].offset;) u++;

      var h = t[u].offset,
          l = (n - h) / (t[u + 1].offset - h),
          f = t[u].color,
          d = t[u + 1].color;
      s += X(Math.round((1 - l) * f[0] + l * d[0]).toString(16)) + X(Math.round((1 - l) * f[1] + l * d[1]).toString(16)) + X(Math.round((1 - l) * f[2] + l * d[2]).toString(16));
    }

    return s.trim();
  },
      se = function (t, e) {
    e || (e = 21);
    var n = Wt(),
        r = oe(t.colors, e),
        i = [];
    i.push({
      key: "FunctionType",
      value: "0"
    }), i.push({
      key: "Domain",
      value: "[0.0 1.0]"
    }), i.push({
      key: "Size",
      value: "[" + e + "]"
    }), i.push({
      key: "BitsPerSample",
      value: "8"
    }), i.push({
      key: "Range",
      value: "[0.0 1.0 0.0 1.0 0.0 1.0]"
    }), i.push({
      key: "Decode",
      value: "[0.0 1.0 0.0 1.0 0.0 1.0]"
    }), Qt({
      data: r,
      additionalKeyValues: i,
      alreadyAppliedFilters: ["/ASCIIHexDecode"]
    }), ot("endobj"), t.objectNumber = Wt(), ot("<< /ShadingType " + t.type), ot("/ColorSpace /DeviceRGB");
    var a = "/Coords [" + C(parseFloat(t.coords[0])) + " " + C(parseFloat(t.coords[1])) + " ";
    2 === t.type ? a += C(parseFloat(t.coords[2])) + " " + C(parseFloat(t.coords[3])) : a += C(parseFloat(t.coords[2])) + " " + C(parseFloat(t.coords[3])) + " " + C(parseFloat(t.coords[4])) + " " + C(parseFloat(t.coords[5])), ot(a += "]"), t.matrix && ot("/Matrix [" + t.matrix.toString() + "]"), ot("/Function " + n + " 0 R"), ot("/Extend [true true]"), ot(">>"), ot("endobj");
  },
      ue = function (t, e) {
    var n = Vt(),
        r = Wt();
    e.push({
      resourcesOid: n,
      objectOid: r
    }), t.objectNumber = r;
    var i = [];
    i.push({
      key: "Type",
      value: "/Pattern"
    }), i.push({
      key: "PatternType",
      value: "1"
    }), i.push({
      key: "PaintType",
      value: "1"
    }), i.push({
      key: "TilingType",
      value: "1"
    }), i.push({
      key: "BBox",
      value: "[" + t.boundingBox.map(C).join(" ") + "]"
    }), i.push({
      key: "XStep",
      value: C(t.xStep)
    }), i.push({
      key: "YStep",
      value: C(t.yStep)
    }), i.push({
      key: "Resources",
      value: n + " 0 R"
    }), t.matrix && i.push({
      key: "Matrix",
      value: "[" + t.matrix.toString() + "]"
    }), Qt({
      data: t.stream,
      additionalKeyValues: i
    }), ot("endobj");
  },
      ce = function (t) {
    var e;

    for (e in kt) kt.hasOwnProperty(e) && (kt[e] instanceof d ? se(kt[e]) : kt[e] instanceof p && ue(kt[e], t));
  },
      he = function (t) {
    for (var e in t.objectNumber = Wt(), ot("<<"), t) switch (e) {
      case "opacity":
        ot("/ca " + O(t[e]));
        break;

      case "stroke-opacity":
        ot("/CA " + O(t[e]));
    }

    ot(">>"), ot("endobj");
  },
      le = function () {
    var t;

    for (t in It) It.hasOwnProperty(t) && he(It[t]);
  },
      fe = function () {
    for (var t in ot("/XObject <<"), qt) qt.hasOwnProperty(t) && qt[t].objectNumber >= 0 && ot("/" + t + " " + qt[t].objectNumber + " 0 R");

    Mt.publish("putXobjectDict"), ot(">>");
  },
      de = function () {
    for (var t in ot("/Font <<"), _t) _t.hasOwnProperty(t) && (!1 === w || !0 === w && N.hasOwnProperty(t)) && ot("/" + t + " " + _t[t].objectNumber + " 0 R");

    ot(">>");
  },
      pe = function () {
    if (Object.keys(kt).length > 0) {
      for (var t in ot("/Shading <<"), kt) kt.hasOwnProperty(t) && kt[t] instanceof d && kt[t].objectNumber >= 0 && ot("/" + t + " " + kt[t].objectNumber + " 0 R");

      Mt.publish("putShadingPatternDict"), ot(">>");
    }
  },
      ge = function (t) {
    if (Object.keys(kt).length > 0) {
      for (var e in ot("/Pattern <<"), kt) kt.hasOwnProperty(e) && kt[e] instanceof L.TilingPattern && kt[e].objectNumber >= 0 && kt[e].objectNumber < t && ot("/" + e + " " + kt[e].objectNumber + " 0 R");

      Mt.publish("putTilingPatternDict"), ot(">>");
    }
  },
      me = function () {
    if (Object.keys(It).length > 0) {
      var t;

      for (t in ot("/ExtGState <<"), It) It.hasOwnProperty(t) && It[t].objectNumber >= 0 && ot("/" + t + " " + It[t].objectNumber + " 0 R");

      Mt.publish("putGStateDict"), ot(">>");
    }
  },
      ve = function (t) {
    Gt(t.resourcesOid, !0), ot("<<"), ot("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"), de(), pe(), ge(t.objectOid), me(), fe(), ot(">>"), ot("endobj");
  },
      be = function () {
    var t = [];
    re(), le(), ae(), ce(t), Mt.publish("putResources"), t.forEach(ve), ve({
      resourcesOid: Xt,
      objectOid: Number.MAX_SAFE_INTEGER
    }), Mt.publish("postPutResources");
  },
      ye = function () {
    Mt.publish("putAdditionalObjects");

    for (var t = 0; t < tt.length; t++) {
      var e = tt[t];
      Gt(e.objId, !0), ot(e.content), ot("endobj");
    }

    Mt.publish("postPutAdditionalObjects");
  },
      we = function (t) {
    St[t.fontName] = St[t.fontName] || {}, St[t.fontName][t.fontStyle] = t.id;
  },
      Ne = function (t, e, n, r, i) {
    var a = {
      id: "F" + (Object.keys(_t).length + 1).toString(10),
      postScriptName: t,
      fontName: e,
      fontStyle: n,
      encoding: r,
      isStandardFont: i || !1,
      metadata: {}
    };
    return Mt.publish("addFont", {
      font: a,
      instance: this
    }), _t[a.id] = a, we(a), a.id;
  },
      Le = function (t) {
    for (var e = 0, n = ct.length; e < n; e++) {
      var r = Ne.call(this, t[e][0], t[e][1], t[e][2], ct[e][3], !0);
      !1 === w && (N[r] = !0);
      var i = t[e][0].split("-");
      we({
        id: r,
        fontName: i[0],
        fontStyle: i[1] || ""
      });
    }

    Mt.publish("addFonts", {
      fonts: _t,
      dictionary: St
    });
  },
      xe = function (e) {
    return e.foo = function () {
      try {
        return e.apply(this, arguments);
      } catch (e) {
        var n = e.stack || "";
        ~n.indexOf(" at ") && (n = n.split(" at ")[1]);
        var r = "Error in function " + n.split("\n")[0].split("<")[0] + ": " + e.message;
        if (!t.console) throw new Error(r);
        t.console.error(r, e), t.alert && alert(r);
      }
    }, e.foo.bar = e, e.foo;
  },
      Ae = function (t, e) {
    var n, r, i, a, o, s, u, c, h;

    if (i = (e = e || {}).sourceEncoding || "Unicode", o = e.outputEncoding, (e.autoencode || o) && _t[wt].metadata && _t[wt].metadata[i] && _t[wt].metadata[i].encoding && (a = _t[wt].metadata[i].encoding, !o && _t[wt].encoding && (o = _t[wt].encoding), !o && a.codePages && (o = a.codePages[0]), "string" == typeof o && (o = a[o]), o)) {
      for (u = !1, s = [], n = 0, r = t.length; n < r; n++) (c = o[t.charCodeAt(n)]) ? s.push(String.fromCharCode(c)) : s.push(t[n]), s[n].charCodeAt(0) >> 8 && (u = !0);

      t = s.join("");
    }

    for (n = t.length; void 0 === u && 0 !== n;) t.charCodeAt(n - 1) >> 8 && (u = !0), n--;

    if (!u) return t;

    for (s = e.noBOM ? [] : [254, 255], n = 0, r = t.length; n < r; n++) {
      if ((h = (c = t.charCodeAt(n)) >> 8) >> 8) throw new Error("Character at position " + n + " of string '" + t + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
      s.push(h), s.push(c - (h << 8));
    }

    return String.fromCharCode.apply(void 0, s);
  },
      _e = L.__private__.pdfEscape = L.pdfEscape = function (t, e) {
    return Ae(t, e).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  },
      Se = L.__private__.beginPage = function (t) {
    et[++Bt] = [], Ot[Bt] = {
      objId: 0,
      contentsObjId: 0,
      userUnit: Number(v),
      artBox: null,
      bleedBox: null,
      cropBox: null,
      trimBox: null,
      mediaBox: {
        bottomLeftX: 0,
        bottomLeftY: 0,
        topRightX: Number(t[0]),
        topRightY: Number(t[1])
      }
    }, Fe(Bt), at(et[Y]);
  },
      Pe = function (t, e) {
    var r, a, s;

    switch (i = e || i, "string" == typeof t && (r = S(t.toLowerCase()), Array.isArray(r) && (a = r[0], s = r[1])), Array.isArray(t) && (a = t[0] * Nt, s = t[1] * Nt), isNaN(a) && (a = o[0], s = o[1]), (a > 14400 || s > 14400) && (n.warn("A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400"), a = Math.min(14400, a), s = Math.min(14400, s)), o = [a, s], i.substr(0, 1)) {
      case "l":
        s > a && (o = [s, a]);
        break;

      case "p":
        a > s && (o = [s, a]);
    }

    Se(o), on(an), ot(pn), 0 !== wn && ot(wn + " J"), 0 !== Nn && ot(Nn + " j"), Mt.publish("addPage", {
      pageNumber: Bt
    });
  },
      ke = function (t) {
    t > 0 && t <= Bt && (et.splice(t, 1), Ot.splice(t, 1), Bt--, Y > Bt && (Y = Bt), this.setPage(Y));
  },
      Fe = function (t) {
    t > 0 && t <= Bt && (Y = t);
  },
      Ie = L.__private__.getNumberOfPages = L.getNumberOfPages = function () {
    return et.length - 1;
  },
      Ce = function (t, e, r) {
    var i,
        a = void 0;
    return r = r || {}, t = void 0 !== t ? t : _t[wt].fontName, e = void 0 !== e ? e : _t[wt].fontStyle, i = t.toLowerCase(), void 0 !== St[i] && void 0 !== St[i][e] ? a = St[i][e] : void 0 !== St[t] && void 0 !== St[t][e] ? a = St[t][e] : !1 === r.disableWarning && n.warn("Unable to look up font label for font '" + t + "', '" + e + "'. Refer to getFontList() for available fonts."), a || r.noFallback || null == (a = St.times[e]) && (a = St.times.normal), a;
  },
      je = L.__private__.putInfo = function () {
    for (var t in Wt(), ot("<<"), ot("/Producer (jsPDF " + g.version + ")"), yt) yt.hasOwnProperty(t) && yt[t] && ot("/" + t.substr(0, 1).toUpperCase() + t.substr(1) + " (" + _e(yt[t]) + ")");

    ot("/CreationDate (" + T + ")"), ot(">>"), ot("endobj");
  },
      Be = L.__private__.putCatalog = function (t) {
    var e = (t = t || {}).rootDictionaryObjId || Jt;

    switch (Wt(), ot("<<"), ot("/Type /Catalog"), ot("/Pages " + e + " 0 R"), lt || (lt = "fullwidth"), lt) {
      case "fullwidth":
        ot("/OpenAction [3 0 R /FitH null]");
        break;

      case "fullheight":
        ot("/OpenAction [3 0 R /FitV null]");
        break;

      case "fullpage":
        ot("/OpenAction [3 0 R /Fit]");
        break;

      case "original":
        ot("/OpenAction [3 0 R /XYZ null null 1]");
        break;

      default:
        var n = "" + lt;
        "%" === n.substr(n.length - 1) && (lt = parseInt(lt) / 100), "number" == typeof lt && ot("/OpenAction [3 0 R /XYZ null null " + O(lt) + "]");
    }

    switch (mt || (mt = "continuous"), mt) {
      case "continuous":
        ot("/PageLayout /OneColumn");
        break;

      case "single":
        ot("/PageLayout /SinglePage");
        break;

      case "two":
      case "twoleft":
        ot("/PageLayout /TwoColumnLeft");
        break;

      case "tworight":
        ot("/PageLayout /TwoColumnRight");
    }

    pt && ot("/PageMode /" + pt), Mt.publish("putCatalog"), ot(">>"), ot("endobj");
  },
      Oe = L.__private__.putTrailer = function () {
    ot("trailer"), ot("<<"), ot("/Size " + (K + 1)), ot("/Root " + K + " 0 R"), ot("/Info " + (K - 1) + " 0 R"), ot("/ID [ <" + D + "> <" + D + "> ]"), ot(">>");
  },
      Me = L.__private__.putHeader = function () {
    ot("%PDF-" + x), ot("%ºß¬à");
  },
      Ee = L.__private__.putXRef = function () {
    var t = "0000000000";
    ot("xref"), ot("0 " + (K + 1)), ot("0000000000 65535 f ");

    for (var e = 1; e <= K; e++) {
      "function" == typeof Z[e] ? ot((t + Z[e]()).slice(-10) + " 00000 n ") : void 0 !== Z[e] ? ot((t + Z[e]).slice(-10) + " 00000 n ") : ot("0000000000 00000 n ");
    }
  },
      qe = L.__private__.buildDocument = function () {
    it(), at($), Mt.publish("buildDocument"), Me(), ee(), ye(), be(), je(), Be();
    var t = Q;
    return Ee(), Oe(), ot("startxref"), ot("" + t), ot("%%EOF"), at(et[Y]), $.join("\n");
  },
      Re = L.__private__.getBlob = function (t) {
    return new Blob([ut(t)], {
      type: "application/pdf"
    });
  },
      Te = L.output = L.__private__.output = xe(function (e, r) {
    switch ("string" == typeof (r = r || {}) ? r = {
      filename: r
    } : r.filename = r.filename || "generated.pdf", e) {
      case void 0:
        return qe();

      case "save":
        L.save(r.filename);
        break;

      case "arraybuffer":
        return ut(qe());

      case "blob":
        return Re(qe());

      case "bloburi":
      case "bloburl":
        if (void 0 !== t.URL && "function" == typeof t.URL.createObjectURL) return t.URL && t.URL.createObjectURL(Re(qe())) || void 0;
        n.warn("bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.");
        break;

      case "datauristring":
      case "dataurlstring":
        var i = "",
            a = qe();

        try {
          i = s(a);
        } catch (t) {
          i = s(unescape(encodeURIComponent(a)));
        }

        return "data:application/pdf;filename=" + r.filename + ";base64," + i;

      case "pdfobjectnewwindow":
        if ("[object Window]" === Object.prototype.toString.call(t)) {
          var o = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><script src="' + (r.pdfObjectUrl || "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js") + '"><\/script><script >PDFObject.embed("' + this.output("dataurlstring") + '", ' + JSON.stringify(r) + ");<\/script></body></html>",
              u = t.open();
          return null !== u && u.document.write(o), u;
        }

        throw new Error("The option pdfobjectnewwindow just works in a browser-environment.");

      case "pdfjsnewwindow":
        if ("[object Window]" === Object.prototype.toString.call(t)) {
          var c = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe id="pdfViewer" src="' + (r.pdfJsUrl || "examples/PDF.js/web/viewer.html") + "?file=&downloadName=" + r.filename + '" width="500px" height="400px" /></body></html>',
              h = t.open();

          if (null !== h) {
            h.document.write(c);
            var l = this;

            h.document.documentElement.querySelector("#pdfViewer").onload = function () {
              h.document.title = r.filename, h.document.documentElement.querySelector("#pdfViewer").contentWindow.PDFViewerApplication.open(l.output("bloburl"));
            };
          }

          return h;
        }

        throw new Error("The option pdfjsnewwindow just works in a browser-environment.");

      case "dataurlnewwindow":
        if ("[object Window]" !== Object.prototype.toString.call(t)) throw new Error("The option dataurlnewwindow just works in a browser-environment.");
        var f = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe src="' + this.output("datauristring", r) + '"></iframe></body></html>',
            d = t.open();
        if (null !== d && (d.document.write(f), d.document.title = r.filename), d || "undefined" == typeof safari) return d;
        break;

      case "datauri":
      case "dataurl":
        return t.document.location.href = this.output("datauristring", r);

      default:
        return null;
    }
  }),
      De = function (t) {
    return !0 === Array.isArray(Et) && Et.indexOf(t) > -1;
  };

  switch (a) {
    case "pt":
      Nt = 1;
      break;

    case "mm":
      Nt = 72 / 25.4;
      break;

    case "cm":
      Nt = 72 / 2.54;
      break;

    case "in":
      Nt = 72;
      break;

    case "px":
      Nt = 1 == De("px_scaling") ? .75 : 96 / 72;
      break;

    case "pc":
    case "em":
      Nt = 12;
      break;

    case "ex":
      Nt = 6;
      break;

    default:
      throw new Error("Invalid unit: " + a);
  }

  V(), z();

  var Ue = L.__private__.getPageInfo = L.getPageInfo = function (t) {
    if (isNaN(t) || t % 1 != 0) throw new Error("Invalid argument passed to jsPDF.getPageInfo");
    return {
      objId: Ot[t].objId,
      pageNumber: t,
      pageContext: Ot[t]
    };
  },
      ze = L.__private__.getPageInfoByObjId = function (t) {
    if (isNaN(t) || t % 1 != 0) throw new Error("Invalid argument passed to jsPDF.getPageInfoByObjId");

    for (var e in Ot) if (Ot[e].objId === t) break;

    return Ue(e);
  },
      He = L.__private__.getCurrentPageInfo = L.getCurrentPageInfo = function () {
    return {
      objId: Ot[Y].objId,
      pageNumber: Y,
      pageContext: Ot[Y]
    };
  };

  L.addPage = function () {
    return Pe.apply(this, arguments), this;
  }, L.setPage = function () {
    return Fe.apply(this, arguments), at.call(this, et[Y]), this;
  }, L.insertPage = function (t) {
    return this.addPage(), this.movePage(Y, t), this;
  }, L.movePage = function (t, e) {
    var n, r;

    if (t > e) {
      n = et[t], r = Ot[t];

      for (var i = t; i > e; i--) et[i] = et[i - 1], Ot[i] = Ot[i - 1];

      et[e] = n, Ot[e] = r, this.setPage(e);
    } else if (t < e) {
      n = et[t], r = Ot[t];

      for (var a = t; a < e; a++) et[a] = et[a + 1], Ot[a] = Ot[a + 1];

      et[e] = n, Ot[e] = r, this.setPage(e);
    }

    return this;
  }, L.deletePage = function () {
    return ke.apply(this, arguments), this;
  }, L.__private__.text = L.text = function (t, e, n, r, i) {
    var a,
        o,
        s,
        u,
        c,
        h,
        l,
        f,
        d = (r = r || {}).scope || this;

    if ("number" == typeof t && "number" == typeof e && ("string" == typeof n || Array.isArray(n))) {
      var p = n;
      n = e, e = t, t = p;
    }

    if (arguments[3] instanceof Dt == !1 ? (s = arguments[4], u = arguments[5], "object" == typeof (l = arguments[3]) && null !== l || ("string" == typeof s && (u = s, s = null), "string" == typeof l && (u = l, l = null), "number" == typeof l && (s = l, l = null), r = {
      flags: l,
      angle: s,
      align: u
    })) : (j("The transform parameter of text() with a Matrix value"), f = i), isNaN(e) || isNaN(n) || null == t) throw new Error("Invalid arguments passed to jsPDF.text");
    if (0 === t.length) return d;
    var g = "",
        m = !1,
        v = "number" == typeof r.lineHeightFactor ? r.lineHeightFactor : rn,
        b = d.internal.scaleFactor;

    function y(t) {
      return t = t.split("\t").join(Array(r.TabLen || 9).join(" ")), _e(t, l);
    }

    function w(t) {
      for (var e, n = t.concat(), r = [], i = n.length; i--;) "string" == typeof (e = n.shift()) ? r.push(e) : Array.isArray(t) && (1 === e.length || void 0 === e[1] && void 0 === e[2]) ? r.push(e[0]) : r.push([e[0], e[1], e[2]]);

      return r;
    }

    function L(t, e) {
      var n;
      if ("string" == typeof t) n = e(t)[0];else if (Array.isArray(t)) {
        for (var r, i, a = t.concat(), o = [], s = a.length; s--;) "string" == typeof (r = a.shift()) ? o.push(e(r)[0]) : Array.isArray(r) && "string" == typeof r[0] && (i = e(r[0], r[1], r[2]), o.push([i[0], i[1], i[2]]));

        n = o;
      }
      return n;
    }

    var x = !1,
        A = !0;
    if ("string" == typeof t) x = !0;else if (Array.isArray(t)) {
      var _ = t.concat();

      o = [];

      for (var S, F = _.length; F--;) ("string" != typeof (S = _.shift()) || Array.isArray(S) && "string" != typeof S[0]) && (A = !1);

      x = A;
    }
    if (!1 === x) throw new Error('Type of text must be string or Array. "' + t + '" is not recognized.');
    "string" == typeof t && (t = t.match(/[\r?\n]/) ? t.split(/\r\n|\r|\n/g) : [t]);
    var I = ht / d.internal.scaleFactor,
        B = I * (rn - 1);

    switch (r.baseline) {
      case "bottom":
        n -= B;
        break;

      case "top":
        n += I - B;
        break;

      case "hanging":
        n += I - 2 * B;
        break;

      case "middle":
        n += I / 2 - B;
    }

    if ((h = r.maxWidth || 0) > 0 && ("string" == typeof t ? t = d.splitTextToSize(t, h) : "[object Array]" === Object.prototype.toString.call(t) && (t = d.splitTextToSize(t.join(" "), h))), a = {
      text: t,
      x: e,
      y: n,
      options: r,
      mutex: {
        pdfEscape: _e,
        activeFontKey: wt,
        fonts: _t,
        activeFontSize: ht
      }
    }, Mt.publish("preProcessText", a), t = a.text, s = (r = a.options).angle, f instanceof Dt == !1 && s && "number" == typeof s) {
      s *= Math.PI / 180, 0 === r.rotationDirection && (s = -s), k === P.ADVANCED && (s = -s);
      var O = Math.cos(s),
          M = Math.sin(s);
      f = new Dt(O, M, -M, O, 0, 0);
    } else s && s instanceof Dt && (f = s);

    k !== P.ADVANCED || f || (f = zt), void 0 !== (c = r.charSpace || bn) && (g += C(E(c)) + " Tc\n", this.setCharSpace(this.getCharSpace() || 0));
    r.lang;
    var q = -1,
        R = void 0 !== r.renderingMode ? r.renderingMode : r.stroke,
        T = d.internal.getCurrentPageInfo().pageContext;

    switch (R) {
      case 0:
      case !1:
      case "fill":
        q = 0;
        break;

      case 1:
      case !0:
      case "stroke":
        q = 1;
        break;

      case 2:
      case "fillThenStroke":
        q = 2;
        break;

      case 3:
      case "invisible":
        q = 3;
        break;

      case 4:
      case "fillAndAddForClipping":
        q = 4;
        break;

      case 5:
      case "strokeAndAddPathForClipping":
        q = 5;
        break;

      case 6:
      case "fillThenStrokeAndAddToPathForClipping":
        q = 6;
        break;

      case 7:
      case "addToPathForClipping":
        q = 7;
    }

    var D = void 0 !== T.usedRenderingMode ? T.usedRenderingMode : -1;
    -1 !== q ? g += q + " Tr\n" : -1 !== D && (g += "0 Tr\n"), -1 !== q && (T.usedRenderingMode = q), u = r.align || "left";
    var U,
        z = ht * v,
        H = d.internal.pageSize.getWidth(),
        W = _t[wt];
    c = r.charSpace || bn, h = r.maxWidth || 0, l = {};
    var V = [];

    if ("[object Array]" === Object.prototype.toString.call(t)) {
      var G;
      o = w(t), "left" !== u && (U = o.map(function (t) {
        return d.getStringUnitWidth(t, {
          font: W,
          charSpace: c,
          fontSize: ht,
          doKerning: !1
        }) * ht / b;
      }));
      var Y,
          J = 0;

      if ("right" === u) {
        e -= U[0], t = [], F = o.length;

        for (var X = 0; X < F; X++) 0 === X ? (Y = hn(e), G = ln(n)) : (Y = E(J - U[X]), G = -z), t.push([o[X], Y, G]), J = U[X];
      } else if ("center" === u) {
        e -= U[0] / 2, t = [], F = o.length;

        for (var K = 0; K < F; K++) 0 === K ? (Y = hn(e), G = ln(n)) : (Y = E((J - U[K]) / 2), G = -z), t.push([o[K], Y, G]), J = U[K];
      } else if ("left" === u) {
        t = [], F = o.length;

        for (var Z = 0; Z < F; Z++) t.push(o[Z]);
      } else {
        if ("justify" !== u) throw new Error('Unrecognized alignment option, use "left", "center", "right" or "justify".');
        t = [], F = o.length, h = 0 !== h ? h : H;

        for (var $ = 0; $ < F; $++) G = 0 === $ ? ln(n) : -z, Y = 0 === $ ? hn(e) : 0, $ < F - 1 && V.push(C(E((h - U[$]) / (o[$].split(" ").length - 1)))), t.push([o[$], Y, G]);
      }
    }

    var Q = "boolean" == typeof r.R2L ? r.R2L : dt;
    !0 === Q && (t = L(t, function (t, e, n) {
      return [t.split("").reverse().join(""), e, n];
    })), a = {
      text: t,
      x: e,
      y: n,
      options: r,
      mutex: {
        pdfEscape: _e,
        activeFontKey: wt,
        fonts: _t,
        activeFontSize: ht
      }
    }, Mt.publish("postProcessText", a), t = a.text, m = a.mutex.isHex || !1;
    var tt = _t[wt].encoding;
    "WinAnsiEncoding" !== tt && "StandardEncoding" !== tt || (t = L(t, function (t, e, n) {
      return [y(t), e, n];
    })), o = w(t), t = [];

    for (var et, nt, rt, it = 0, at = 1, st = Array.isArray(o[0]) ? at : it, ut = "", ct = function (t, e, n) {
      var i = "";
      return n instanceof Dt ? (n = "number" == typeof r.angle ? Ut(n, new Dt(1, 0, 0, 1, t, e)) : Ut(new Dt(1, 0, 0, 1, t, e), n), k === P.ADVANCED && (n = Ut(new Dt(1, 0, 0, -1, 0, 0), n)), i = n.join(" ") + " Tm\n") : i = C(t) + " " + C(e) + " Td\n", i;
    }, lt = 0; lt < o.length; lt++) {
      switch (ut = "", st) {
        case at:
          rt = (m ? "<" : "(") + o[lt][0] + (m ? ">" : ")"), et = parseFloat(o[lt][1]), nt = parseFloat(o[lt][2]);
          break;

        case it:
          rt = (m ? "<" : "(") + o[lt] + (m ? ">" : ")"), et = hn(e), nt = ln(n);
      }

      void 0 !== V && void 0 !== V[lt] && (ut = V[lt] + " Tw\n"), 0 === lt ? t.push(ut + ct(et, nt, f) + rt) : st === it ? t.push(ut + rt) : st === at && t.push(ut + ct(et, nt, f) + rt);
    }

    t = st === it ? t.join(" Tj\nT* ") : t.join(" Tj\n"), t += " Tj\n";
    var ft = "BT\n/";
    return ft += wt + " " + ht + " Tf\n", ft += C(ht * v) + " TL\n", ft += mn + "\n", ft += g, ft += t, ot(ft += "ET"), N[wt] = !0, d;
  };

  var We = L.__private__.clip = L.clip = function (t) {
    return ot("evenodd" === t ? "W*" : "W"), this;
  };

  L.clipEvenOdd = function () {
    return We("evenodd");
  }, L.__private__.discardPath = L.discardPath = function () {
    return ot("n"), this;
  };

  var Ve = L.__private__.isValidStyle = function (t) {
    var e = !1;
    return -1 !== [void 0, null, "S", "D", "F", "DF", "FD", "f", "f*", "B", "B*", "n"].indexOf(t) && (e = !0), e;
  };

  L.__private__.setDefaultPathOperation = L.setDefaultPathOperation = function (t) {
    return Ve(t) && (y = t), this;
  };

  var Ge = L.__private__.getStyle = L.getStyle = function (t) {
    var e = y;

    switch (t) {
      case "D":
      case "S":
        e = "S";
        break;

      case "F":
        e = "f";
        break;

      case "FD":
      case "DF":
        e = "B";
        break;

      case "f":
      case "f*":
      case "B":
      case "B*":
        e = t;
    }

    return e;
  },
      Ye = L.close = function () {
    return ot("h"), this;
  };

  L.stroke = function () {
    return ot("S"), this;
  }, L.fill = function (t) {
    return Je("f", t), this;
  }, L.fillEvenOdd = function (t) {
    return Je("f*", t), this;
  }, L.fillStroke = function (t) {
    return Je("B", t), this;
  }, L.fillStrokeEvenOdd = function (t) {
    return Je("B*", t), this;
  };

  var Je = function (t, e) {
    "object" == typeof e ? Ze(e, t) : ot(t);
  },
      Xe = function (t) {
    null === t || k === P.ADVANCED && void 0 === t || (t = Ge(t), ot(t));
  };

  function Ke(t, e, n, r, i) {
    var a = new p(e || this.boundingBox, n || this.xStep, r || this.yStep, this.gState, i || this.matrix);
    a.stream = this.stream;
    var o = t + "$$" + this.cloneIndex++ + "$$";
    return Ht(o, a), a;
  }

  var Ze = function (t, e) {
    var n = Ft[t.key],
        r = kt[n];
    if (r instanceof d) ot("q"), ot($e(e)), r.gState && L.setGState(r.gState), ot(t.matrix.toString() + " cm"), ot("/" + n + " sh"), ot("Q");else if (r instanceof p) {
      var i = new Dt(1, 0, 0, -1, 0, Cn());
      t.matrix && (i = i.multiply(t.matrix || zt), n = Ke.call(r, t.key, t.boundingBox, t.xStep, t.yStep, i).id), ot("q"), ot("/Pattern cs"), ot("/" + n + " scn"), r.gState && L.setGState(r.gState), ot(e), ot("Q");
    }
  },
      $e = function (t) {
    switch (t) {
      case "f":
      case "F":
        return "W n";

      case "f*":
        return "W* n";

      case "B":
        return "W S";

      case "B*":
        return "W* S";

      case "S":
        return "W S";

      case "n":
        return "W n";
    }
  },
      Qe = L.moveTo = function (t, e) {
    return ot(C(E(t)) + " " + C(R(e)) + " m"), this;
  },
      tn = L.lineTo = function (t, e) {
    return ot(C(E(t)) + " " + C(R(e)) + " l"), this;
  },
      en = L.curveTo = function (t, e, n, r, i, a) {
    return ot([C(E(t)), C(R(e)), C(E(n)), C(R(r)), C(E(i)), C(R(a)), "c"].join(" ")), this;
  };

  L.__private__.line = L.line = function (t, e, n, r, i) {
    if (isNaN(t) || isNaN(e) || isNaN(n) || isNaN(r) || !Ve(i)) throw new Error("Invalid arguments passed to jsPDF.line");
    return k === P.COMPAT ? this.lines([[n - t, r - e]], t, e, [1, 1], i || "S") : this.lines([[n - t, r - e]], t, e, [1, 1]).stroke();
  }, L.__private__.lines = L.lines = function (t, e, n, r, i, a) {
    var o, s, u, c, h, l, f, d, p, g, m, v;
    if ("number" == typeof t && (v = n, n = e, e = t, t = v), r = r || [1, 1], a = a || !1, isNaN(e) || isNaN(n) || !Array.isArray(t) || !Array.isArray(r) || !Ve(i) || "boolean" != typeof a) throw new Error("Invalid arguments passed to jsPDF.lines");

    for (Qe(e, n), o = r[0], s = r[1], c = t.length, g = e, m = n, u = 0; u < c; u++) 2 === (h = t[u]).length ? (g = h[0] * o + g, m = h[1] * s + m, tn(g, m)) : (l = h[0] * o + g, f = h[1] * s + m, d = h[2] * o + g, p = h[3] * s + m, g = h[4] * o + g, m = h[5] * s + m, en(l, f, d, p, g, m));

    return a && Ye(), Xe(i), this;
  }, L.path = function (t) {
    for (var e = 0; e < t.length; e++) {
      var n = t[e],
          r = n.c;

      switch (n.op) {
        case "m":
          Qe(r[0], r[1]);
          break;

        case "l":
          tn(r[0], r[1]);
          break;

        case "c":
          en.apply(this, r);
          break;

        case "h":
          Ye();
      }
    }

    return this;
  }, L.__private__.rect = L.rect = function (t, e, n, r, i) {
    if (isNaN(t) || isNaN(e) || isNaN(n) || isNaN(r) || !Ve(i)) throw new Error("Invalid arguments passed to jsPDF.rect");
    return k === P.COMPAT && (r = -r), ot([C(E(t)), C(R(e)), C(E(n)), C(E(r)), "re"].join(" ")), Xe(i), this;
  }, L.__private__.triangle = L.triangle = function (t, e, n, r, i, a, o) {
    if (isNaN(t) || isNaN(e) || isNaN(n) || isNaN(r) || isNaN(i) || isNaN(a) || !Ve(o)) throw new Error("Invalid arguments passed to jsPDF.triangle");
    return this.lines([[n - t, r - e], [i - n, a - r], [t - i, e - a]], t, e, [1, 1], o, !0), this;
  }, L.__private__.roundedRect = L.roundedRect = function (t, e, n, r, i, a, o) {
    if (isNaN(t) || isNaN(e) || isNaN(n) || isNaN(r) || isNaN(i) || isNaN(a) || !Ve(o)) throw new Error("Invalid arguments passed to jsPDF.roundedRect");
    var s = 4 / 3 * (Math.SQRT2 - 1);
    return i = Math.min(i, .5 * n), a = Math.min(a, .5 * r), this.lines([[n - 2 * i, 0], [i * s, 0, i, a - a * s, i, a], [0, r - 2 * a], [0, a * s, -i * s, a, -i, a], [2 * i - n, 0], [-i * s, 0, -i, -a * s, -i, -a], [0, 2 * a - r], [0, -a * s, i * s, -a, i, -a]], t + i, e, [1, 1], o, !0), this;
  }, L.__private__.ellipse = L.ellipse = function (t, e, n, r, i) {
    if (isNaN(t) || isNaN(e) || isNaN(n) || isNaN(r) || !Ve(i)) throw new Error("Invalid arguments passed to jsPDF.ellipse");
    var a = 4 / 3 * (Math.SQRT2 - 1) * n,
        o = 4 / 3 * (Math.SQRT2 - 1) * r;
    return Qe(t + n, e), en(t + n, e - o, t + a, e - r, t, e - r), en(t - a, e - r, t - n, e - o, t - n, e), en(t - n, e + o, t - a, e + r, t, e + r), en(t + a, e + r, t + n, e + o, t + n, e), Xe(i), this;
  }, L.__private__.circle = L.circle = function (t, e, n, r) {
    if (isNaN(t) || isNaN(e) || isNaN(n) || !Ve(r)) throw new Error("Invalid arguments passed to jsPDF.circle");
    return this.ellipse(t, e, n, n, r);
  }, L.setFont = function (t, e) {
    return wt = Ce(t, e, {
      disableWarning: !1
    }), this;
  };

  var nn = L.__private__.getFont = L.getFont = function () {
    return _t[Ce.apply(L, arguments)];
  };

  L.__private__.getFontList = L.getFontList = function () {
    var t,
        e,
        n = {};

    for (t in St) if (St.hasOwnProperty(t)) for (e in n[t] = [], St[t]) St[t].hasOwnProperty(e) && n[t].push(e);

    return n;
  }, L.addFont = function (t, e, n, r) {
    return r = r || "Identity-H", Ne.call(this, t, e, n, r);
  };

  var rn,
      an = e.lineWidth || .200025,
      on = L.__private__.setLineWidth = L.setLineWidth = function (t) {
    return ot(C(E(t)) + " w"), this;
  };

  L.__private__.setLineDash = g.API.setLineDash = g.API.setLineDashPattern = function (t, e) {
    if (t = t || [], e = e || 0, isNaN(e) || !Array.isArray(t)) throw new Error("Invalid arguments passed to jsPDF.setLineDash");
    return t = t.map(function (t) {
      return C(E(t));
    }).join(" "), e = C(E(e)), ot("[" + t + "] " + e + " d"), this;
  };

  var sn = L.__private__.getLineHeight = L.getLineHeight = function () {
    return ht * rn;
  };

  L.__private__.getLineHeight = L.getLineHeight = function () {
    return ht * rn;
  };

  var un = L.__private__.setLineHeightFactor = L.setLineHeightFactor = function (t) {
    return "number" == typeof (t = t || 1.15) && (rn = t), this;
  },
      cn = L.__private__.getLineHeightFactor = L.getLineHeightFactor = function () {
    return rn;
  };

  un(e.lineHeight);

  var hn = L.__private__.getHorizontalCoordinate = function (t) {
    return E(t);
  },
      ln = L.__private__.getVerticalCoordinate = function (t) {
    return k === P.ADVANCED ? t : Ot[Y].mediaBox.topRightY - Ot[Y].mediaBox.bottomLeftY - E(t);
  },
      fn = L.__private__.getHorizontalCoordinateString = L.getHorizontalCoordinateString = function (t) {
    return C(hn(t));
  },
      dn = L.__private__.getVerticalCoordinateString = L.getVerticalCoordinateString = function (t) {
    return C(ln(t));
  },
      pn = e.strokeColor || "0 G";

  L.__private__.getStrokeColor = L.getDrawColor = function () {
    return Kt(pn);
  }, L.__private__.setStrokeColor = L.setDrawColor = function (t, e, n, r) {
    return pn = Zt({
      ch1: t,
      ch2: e,
      ch3: n,
      ch4: r,
      pdfColorType: "draw",
      precision: 2
    }), ot(pn), this;
  };
  var gn = e.fillColor || "0 g";
  L.__private__.getFillColor = L.getFillColor = function () {
    return Kt(gn);
  }, L.__private__.setFillColor = L.setFillColor = function (t, e, n, r) {
    return gn = Zt({
      ch1: t,
      ch2: e,
      ch3: n,
      ch4: r,
      pdfColorType: "fill",
      precision: 2
    }), ot(gn), this;
  };

  var mn = e.textColor || "0 g",
      vn = L.__private__.getTextColor = L.getTextColor = function () {
    return Kt(mn);
  };

  L.__private__.setTextColor = L.setTextColor = function (t, e, n, r) {
    return mn = Zt({
      ch1: t,
      ch2: e,
      ch3: n,
      ch4: r,
      pdfColorType: "text",
      precision: 3
    }), this;
  };

  var bn = e.charSpace,
      yn = L.__private__.getCharSpace = L.getCharSpace = function () {
    return parseFloat(bn || 0);
  };

  L.__private__.setCharSpace = L.setCharSpace = function (t) {
    if (isNaN(t)) throw new Error("Invalid argument passed to jsPDF.setCharSpace");
    return bn = t, this;
  };

  var wn = 0;
  L.CapJoinStyles = {
    0: 0,
    butt: 0,
    but: 0,
    miter: 0,
    1: 1,
    round: 1,
    rounded: 1,
    circle: 1,
    2: 2,
    projecting: 2,
    project: 2,
    square: 2,
    bevel: 2
  }, L.__private__.setLineCap = L.setLineCap = function (t) {
    var e = L.CapJoinStyles[t];
    if (void 0 === e) throw new Error("Line cap style of '" + t + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
    return wn = e, ot(e + " J"), this;
  };
  var Nn = 0;
  L.__private__.setLineJoin = L.setLineJoin = function (t) {
    var e = L.CapJoinStyles[t];
    if (void 0 === e) throw new Error("Line join style of '" + t + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
    return Nn = e, ot(e + " j"), this;
  }, L.__private__.setLineMiterLimit = L.__private__.setMiterLimit = L.setLineMiterLimit = L.setMiterLimit = function (t) {
    if (t = t || 0, isNaN(t)) throw new Error("Invalid argument passed to jsPDF.setLineMiterLimit");
    return ot(C(E(t)) + " M"), this;
  }, L.GState = l, L.setGState = function (t) {
    (t = "string" == typeof t ? It[Ct[t]] : Ln(null, t)).equals(jt) || (ot("/" + t.id + " gs"), jt = t);
  };

  var Ln = function (t, e) {
    if (!t || !Ct[t]) {
      var n = !1;

      for (var r in It) if (It.hasOwnProperty(r) && It[r].equals(e)) {
        n = !0;
        break;
      }

      if (n) e = It[r];else {
        var i = "GS" + (Object.keys(It).length + 1).toString(10);
        It[i] = e, e.id = i;
      }
      return t && (Ct[t] = e.id), Mt.publish("addGState", e), e;
    }
  };

  L.addGState = function (t, e) {
    return Ln(t, e), this;
  }, L.saveGraphicsState = function () {
    return ot("q"), Pt.push({
      key: wt,
      size: ht,
      color: mn
    }), this;
  }, L.restoreGraphicsState = function () {
    ot("Q");
    var t = Pt.pop();
    return wt = t.key, ht = t.size, mn = t.color, jt = null, this;
  }, L.setCurrentTransformationMatrix = function (t) {
    return ot(t.toString() + " cm"), this;
  }, L.comment = function (t) {
    return ot("#" + t), this;
  };

  var xn = function (t, e) {
    var n = t || 0;
    Object.defineProperty(this, "x", {
      enumerable: !0,
      get: function () {
        return n;
      },
      set: function (t) {
        isNaN(t) || (n = parseFloat(t));
      }
    });
    var r = e || 0;
    Object.defineProperty(this, "y", {
      enumerable: !0,
      get: function () {
        return r;
      },
      set: function (t) {
        isNaN(t) || (r = parseFloat(t));
      }
    });
    var i = "pt";
    return Object.defineProperty(this, "type", {
      enumerable: !0,
      get: function () {
        return i;
      },
      set: function (t) {
        i = t.toString();
      }
    }), this;
  },
      An = function (t, e, n, r) {
    xn.call(this, t, e), this.type = "rect";
    var i = n || 0;
    Object.defineProperty(this, "w", {
      enumerable: !0,
      get: function () {
        return i;
      },
      set: function (t) {
        isNaN(t) || (i = parseFloat(t));
      }
    });
    var a = r || 0;
    return Object.defineProperty(this, "h", {
      enumerable: !0,
      get: function () {
        return a;
      },
      set: function (t) {
        isNaN(t) || (a = parseFloat(t));
      }
    }), this;
  },
      _n = function () {
    this.page = Bt, this.currentPage = Y, this.pages = et.slice(0), this.pagesContext = Ot.slice(0), this.x = Lt, this.y = xt, this.matrix = At, this.width = Fn(Y), this.height = Cn(Y), this.outputDestination = rt, this.id = "", this.objectNumber = -1;
  };

  _n.prototype.restore = function () {
    Bt = this.page, Y = this.currentPage, Ot = this.pagesContext, et = this.pages, Lt = this.x, xt = this.y, At = this.matrix, In(Y, this.width), jn(Y, this.height), rt = this.outputDestination;
  };

  var Sn = function (t, e, n, r, i) {
    Tt.push(new _n()), Bt = Y = 0, et = [], Lt = t, xt = e, At = i, Se([n, r]);
  },
      Pn = function (t) {
    if (!Rt[t]) {
      var e = new _n(),
          n = "Xo" + (Object.keys(qt).length + 1).toString(10);
      e.id = n, Rt[t] = n, qt[n] = e, Mt.publish("addFormObject", e), Tt.pop().restore();
    }
  };

  for (var kn in L.beginFormObject = function (t, e, n, r, i) {
    return Sn(t, e, n, r, i), this;
  }, L.endFormObject = function (t) {
    return Pn(t), this;
  }, L.doFormObject = function (t, e) {
    var n = qt[Rt[t]];
    return ot("q"), ot(e.toString() + " cm"), ot("/" + n.id + " Do"), ot("Q"), this;
  }, L.getFormObject = function (t) {
    var e = qt[Rt[t]];
    return {
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height,
      matrix: e.matrix
    };
  }, L.save = function (e, n) {
    return e = e || "generated.pdf", (n = n || {}).returnPromise = n.returnPromise || !1, !1 === n.returnPromise ? (u(Re(qe()), e), "function" == typeof u.unload && t.setTimeout && setTimeout(u.unload, 911), this) : new Promise(function (n, r) {
      try {
        var i = u(Re(qe()), e);
        "function" == typeof u.unload && t.setTimeout && setTimeout(u.unload, 911), n(i);
      } catch (t) {
        r(t.message);
      }
    });
  }, g.API) g.API.hasOwnProperty(kn) && ("events" === kn && g.API.events.length ? function (t, e) {
    var n, r, i;

    for (i = e.length - 1; -1 !== i; i--) n = e[i][0], r = e[i][1], t.subscribe.apply(t, [n].concat("function" == typeof r ? [r] : r));
  }(Mt, g.API.events) : L[kn] = g.API[kn]);

  var Fn = L.getPageWidth = function (t) {
    return (Ot[t = t || Y].mediaBox.topRightX - Ot[t].mediaBox.bottomLeftX) / Nt;
  },
      In = L.setPageWidth = function (t, e) {
    Ot[t].mediaBox.topRightX = e * Nt + Ot[t].mediaBox.bottomLeftX;
  },
      Cn = L.getPageHeight = function (t) {
    return (Ot[t = t || Y].mediaBox.topRightY - Ot[t].mediaBox.bottomLeftY) / Nt;
  },
      jn = L.setPageHeight = function (t, e) {
    Ot[t].mediaBox.topRightY = e * Nt + Ot[t].mediaBox.bottomLeftY;
  };

  return L.internal = {
    pdfEscape: _e,
    getStyle: Ge,
    getFont: nn,
    getFontSize: ft,
    getCharSpace: yn,
    getTextColor: vn,
    getLineHeight: sn,
    getLineHeightFactor: cn,
    write: st,
    getHorizontalCoordinate: hn,
    getVerticalCoordinate: ln,
    getCoordinateString: fn,
    getVerticalCoordinateString: dn,
    collections: {},
    newObject: Wt,
    newAdditionalObject: Yt,
    newObjectDeferred: Vt,
    newObjectDeferredBegin: Gt,
    getFilters: $t,
    putStream: Qt,
    events: Mt,
    scaleFactor: Nt,
    pageSize: {
      getWidth: function () {
        return Fn(Y);
      },
      setWidth: function (t) {
        In(Y, t);
      },
      getHeight: function () {
        return Cn(Y);
      },
      setHeight: function (t) {
        jn(Y, t);
      }
    },
    output: Te,
    getNumberOfPages: Ie,
    pages: et,
    out: ot,
    f2: O,
    f3: M,
    getPageInfo: Ue,
    getPageInfoByObjId: ze,
    getCurrentPageInfo: He,
    getPDFVersion: A,
    Point: xn,
    Rectangle: An,
    Matrix: Dt,
    hasHotfix: De
  }, Object.defineProperty(L.internal.pageSize, "width", {
    get: function () {
      return Fn(Y);
    },
    set: function (t) {
      In(Y, t);
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(L.internal.pageSize, "height", {
    get: function () {
      return Cn(Y);
    },
    set: function (t) {
      jn(Y, t);
    },
    enumerable: !0,
    configurable: !0
  }), Le.call(L, ct), wt = "F1", Pe(o, i), Mt.publish("initialized"), L;
}

o = t.atob, s = t.btoa, l.prototype.equals = function (t) {
  var e,
      n = "id,objectNumber,equals";
  if (!t || typeof t != typeof this) return !1;
  var r = 0;

  for (e in this) if (!(n.indexOf(e) >= 0)) {
    if (this.hasOwnProperty(e) && !t.hasOwnProperty(e)) return !1;
    if (this[e] !== t[e]) return !1;
    r++;
  }

  for (e in t) t.hasOwnProperty(e) && n.indexOf(e) < 0 && r--;

  return 0 === r;
}, g.API = {
  events: []
}, g.version = "2.1.1";

var m,
    v = g.API,
    b = 1,
    y = function (t) {
  return t.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
},
    w = function (t) {
  return t.replace(/\\\\/g, "\\").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
},
    N = function (t) {
  return t.toFixed(2);
},
    L = function (t) {
  return t.toFixed(5);
};

v.__acroform__ = {};

var x = function (t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t;
},
    A = function (t) {
  return t * b;
},
    _ = function (t) {
  var e = new J(),
      n = ut.internal.getHeight(t) || 0,
      r = ut.internal.getWidth(t) || 0;
  return e.BBox = [0, 0, Number(N(r)), Number(N(n))], e;
},
    S = v.__acroform__.setBit = function (t, e) {
  if (t = t || 0, e = e || 0, isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBit");
  return t |= 1 << e;
},
    P = v.__acroform__.clearBit = function (t, e) {
  if (t = t || 0, e = e || 0, isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBit");
  return t &= ~(1 << e);
},
    k = v.__acroform__.getBit = function (t, e) {
  if (isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBit");
  return 0 == (t & 1 << e) ? 0 : 1;
},
    F = v.__acroform__.getBitForPdf = function (t, e) {
  if (isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBitForPdf");
  return k(t, e - 1);
},
    I = v.__acroform__.setBitForPdf = function (t, e) {
  if (isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBitForPdf");
  return S(t, e - 1);
},
    C = v.__acroform__.clearBitForPdf = function (t, e) {
  if (isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBitForPdf");
  return P(t, e - 1);
},
    j = v.__acroform__.calculateCoordinates = function (t) {
  var e = this.internal.getHorizontalCoordinate,
      n = this.internal.getVerticalCoordinate,
      r = t[0],
      i = t[1],
      a = t[2],
      o = t[3],
      s = {};
  return s.lowerLeft_X = e(r) || 0, s.lowerLeft_Y = n(i + o) || 0, s.upperRight_X = e(r + a) || 0, s.upperRight_Y = n(i) || 0, [Number(N(s.lowerLeft_X)), Number(N(s.lowerLeft_Y)), Number(N(s.upperRight_X)), Number(N(s.upperRight_Y))];
},
    B = function (t) {
  if (t.appearanceStreamContent) return t.appearanceStreamContent;

  if (t.V || t.DV) {
    var e = [],
        n = t.V || t.DV,
        r = O(t, n),
        i = m.internal.getFont(t.fontName, t.fontStyle).id;
    e.push("/Tx BMC"), e.push("q"), e.push("BT"), e.push(m.__private__.encodeColorString(t.color)), e.push("/" + i + " " + N(r.fontSize) + " Tf"), e.push("1 0 0 1 0 0 Tm"), e.push(r.text), e.push("ET"), e.push("Q"), e.push("EMC");
    var a = new _(t);
    return a.stream = e.join("\n"), a;
  }
},
    O = function (t, e) {
  var n = 0 === t.fontSize ? t.maxFontSize : t.fontSize,
      r = {
    text: "",
    fontSize: ""
  },
      i = (e = ")" == (e = "(" == e.substr(0, 1) ? e.substr(1) : e).substr(e.length - 1) ? e.substr(0, e.length - 1) : e).split(" "),
      a = n,
      o = ut.internal.getHeight(t) || 0;
  o = o < 0 ? -o : o;
  var s = ut.internal.getWidth(t) || 0;
  s = s < 0 ? -s : s;

  var u = function (e, n, r) {
    if (e + 1 < i.length) {
      var a = n + " " + i[e + 1];
      return M(a, t, r).width <= s - 4;
    }

    return !1;
  };

  a++;

  t: for (; a > 0;) {
    e = "", a--;
    var c,
        h,
        l = M("3", t, a).height,
        f = t.multiline ? o - a : (o - l) / 2,
        d = f += 2,
        p = 0,
        g = 0;

    if (a <= 0) {
      e = "(...) Tj\n", e += "% Width of Text: " + M(e, t, a = 12).width + ", FieldWidth:" + s + "\n";
      break;
    }

    var m = "",
        v = 0;

    for (var b in i) if (i.hasOwnProperty(b)) {
      m = " " == (m += i[b] + " ").substr(m.length - 1) ? m.substr(0, m.length - 1) : m;
      var w = parseInt(b),
          L = u(w, m, a),
          x = b >= i.length - 1;

      if (L && !x) {
        m += " ";
        continue;
      }

      if (L || x) {
        if (x) g = w;else if (t.multiline && (l + 2) * (v + 2) + 2 > o) continue t;
      } else {
        if (!t.multiline) continue t;
        if ((l + 2) * (v + 2) + 2 > o) continue t;
        g = w;
      }

      for (var A = "", _ = p; _ <= g; _++) A += i[_] + " ";

      switch (A = " " == A.substr(A.length - 1) ? A.substr(0, A.length - 1) : A, h = M(A, t, a).width, t.textAlign) {
        case "right":
          c = s - h - 2;
          break;

        case "center":
          c = (s - h) / 2;
          break;

        case "left":
        default:
          c = 2;
      }

      e += N(c) + " " + N(d) + " Td\n", e += "(" + y(A) + ") Tj\n", e += -N(c) + " 0 Td\n", d = -(a + 2), h = 0, p = g + 1, v++, m = "";
    } else ;

    break;
  }

  return r.text = e, r.fontSize = a, r;
},
    M = function (t, e, n) {
  var r = m.internal.getFont(e.fontName, e.fontStyle),
      i = m.getStringUnitWidth(t, {
    font: r,
    fontSize: parseFloat(n),
    charSpace: 0
  }) * parseFloat(n);
  return {
    height: m.getStringUnitWidth("3", {
      font: r,
      fontSize: parseFloat(n),
      charSpace: 0
    }) * parseFloat(n) * 1.5,
    width: i
  };
},
    E = {
  fields: [],
  xForms: [],
  acroFormDictionaryRoot: null,
  printedOut: !1,
  internal: null,
  isInitialized: !1
},
    q = function () {
  m.internal.acroformPlugin.acroFormDictionaryRoot.objId = void 0;
  var t = m.internal.acroformPlugin.acroFormDictionaryRoot.Fields;

  for (var e in t) if (t.hasOwnProperty(e)) {
    var n = t[e];
    n.objId = void 0, n.hasAnnotation && T.call(m, n);
  }
},
    R = function (t) {
  m.internal.acroformPlugin.printedOut && (m.internal.acroformPlugin.printedOut = !1, m.internal.acroformPlugin.acroFormDictionaryRoot = null), m.internal.acroformPlugin.acroFormDictionaryRoot || W.call(m), m.internal.acroformPlugin.acroFormDictionaryRoot.Fields.push(t);
},
    T = function (t) {
  var e = {
    type: "reference",
    object: t
  };
  void 0 === m.internal.getPageInfo(t.page).pageContext.annotations.find(function (t) {
    return t.type === e.type && t.object === e.object;
  }) && m.internal.getPageInfo(t.page).pageContext.annotations.push(e);
},
    D = function () {
  if (void 0 === m.internal.acroformPlugin.acroFormDictionaryRoot) throw new Error("putCatalogCallback: Root missing.");
  m.internal.write("/AcroForm " + m.internal.acroformPlugin.acroFormDictionaryRoot.objId + " 0 R");
},
    U = function () {
  m.internal.events.unsubscribe(m.internal.acroformPlugin.acroFormDictionaryRoot._eventID), delete m.internal.acroformPlugin.acroFormDictionaryRoot._eventID, m.internal.acroformPlugin.printedOut = !0;
},
    z = function (t) {
  var e = !t;

  for (var n in t || (m.internal.newObjectDeferredBegin(m.internal.acroformPlugin.acroFormDictionaryRoot.objId, !0), m.internal.acroformPlugin.acroFormDictionaryRoot.putStream()), t = t || m.internal.acroformPlugin.acroFormDictionaryRoot.Kids) if (t.hasOwnProperty(n)) {
    var r = t[n],
        i = [],
        a = r.Rect;

    if (r.Rect && (r.Rect = j.call(this, r.Rect)), m.internal.newObjectDeferredBegin(r.objId, !0), r.DA = ut.createDefaultAppearanceStream(r), "object" == typeof r && "function" == typeof r.getKeyValueListForStream && (i = r.getKeyValueListForStream()), r.Rect = a, r.hasAppearanceStream && !r.appearanceStreamContent) {
      var o = B.call(this, r);
      i.push({
        key: "AP",
        value: "<</N " + o + ">>"
      }), m.internal.acroformPlugin.xForms.push(o);
    }

    if (r.appearanceStreamContent) {
      var s = "";

      for (var u in r.appearanceStreamContent) if (r.appearanceStreamContent.hasOwnProperty(u)) {
        var c = r.appearanceStreamContent[u];

        if (s += "/" + u + " ", s += "<<", Object.keys(c).length >= 1 || Array.isArray(c)) {
          for (var n in c) if (c.hasOwnProperty(n)) {
            var h = c[n];
            "function" == typeof h && (h = h.call(this, r)), s += "/" + n + " " + h + " ", m.internal.acroformPlugin.xForms.indexOf(h) >= 0 || m.internal.acroformPlugin.xForms.push(h);
          }
        } else "function" == typeof (h = c) && (h = h.call(this, r)), s += "/" + n + " " + h, m.internal.acroformPlugin.xForms.indexOf(h) >= 0 || m.internal.acroformPlugin.xForms.push(h);

        s += ">>";
      }

      i.push({
        key: "AP",
        value: "<<\n" + s + ">>"
      });
    }

    m.internal.putStream({
      additionalKeyValues: i
    }), m.internal.out("endobj");
  }

  e && H.call(this, m.internal.acroformPlugin.xForms);
},
    H = function (t) {
  for (var e in t) if (t.hasOwnProperty(e)) {
    var n = e,
        r = t[e];
    m.internal.newObjectDeferredBegin(r && r.objId, !0), "object" == typeof r && "function" == typeof r.putStream && r.putStream(), delete t[n];
  }
},
    W = function () {
  if (void 0 !== this.internal && (void 0 === this.internal.acroformPlugin || !1 === this.internal.acroformPlugin.isInitialized)) {
    if (m = this, K.FieldNum = 0, this.internal.acroformPlugin = JSON.parse(JSON.stringify(E)), this.internal.acroformPlugin.acroFormDictionaryRoot) throw new Error("Exception while creating AcroformDictionary");
    b = m.internal.scaleFactor, m.internal.acroformPlugin.acroFormDictionaryRoot = new X(), m.internal.acroformPlugin.acroFormDictionaryRoot._eventID = m.internal.events.subscribe("postPutResources", U), m.internal.events.subscribe("buildDocument", q), m.internal.events.subscribe("putCatalog", D), m.internal.events.subscribe("postPutPages", z), m.internal.acroformPlugin.isInitialized = !0;
  }
},
    V = v.__acroform__.arrayToPdfArray = function (t) {
  if (Array.isArray(t)) {
    for (var e = "[", n = 0; n < t.length; n++) switch (0 !== n && (e += " "), typeof t[n]) {
      case "boolean":
      case "number":
      case "object":
        e += t[n].toString();
        break;

      case "string":
        "/" !== t[n].substr(0, 1) ? e += "(" + y(t[n].toString()) + ")" : e += t[n].toString();
    }

    return e += "]";
  }

  throw new Error("Invalid argument passed to jsPDF.__acroform__.arrayToPdfArray");
};

var G = function (t) {
  return (t = t || "").toString(), t = "(" + y(t) + ")";
},
    Y = function () {
  var t;
  Object.defineProperty(this, "objId", {
    configurable: !0,
    get: function () {
      return t || (t = m.internal.newObjectDeferred()), t;
    },
    set: function (e) {
      t = e;
    }
  });
};

Y.prototype.toString = function () {
  return this.objId + " 0 R";
}, Y.prototype.putStream = function () {
  var t = this.getKeyValueListForStream();
  m.internal.putStream({
    data: this.stream,
    additionalKeyValues: t
  }), m.internal.out("endobj");
}, Y.prototype.getKeyValueListForStream = function () {
  return function (t) {
    var e = [],
        n = Object.getOwnPropertyNames(t).filter(function (t) {
      return "content" != t && "appearanceStreamContent" != t && "_" != t.substring(0, 1);
    });

    for (var r in n) if (!1 === Object.getOwnPropertyDescriptor(t, n[r]).configurable) {
      var i = n[r],
          a = t[i];
      a && (Array.isArray(a) ? e.push({
        key: i,
        value: V(a)
      }) : a instanceof Y ? e.push({
        key: i,
        value: a.objId + " 0 R"
      }) : "function" != typeof a && e.push({
        key: i,
        value: a
      }));
    }

    return e;
  }(this);
};

var J = function () {
  Y.call(this), Object.defineProperty(this, "Type", {
    value: "/XObject",
    configurable: !1,
    writeable: !0
  }), Object.defineProperty(this, "Subtype", {
    value: "/Form",
    configurable: !1,
    writeable: !0
  }), Object.defineProperty(this, "FormType", {
    value: 1,
    configurable: !1,
    writeable: !0
  });
  var t,
      e = [];
  Object.defineProperty(this, "BBox", {
    configurable: !1,
    writeable: !0,
    get: function () {
      return e;
    },
    set: function (t) {
      e = t;
    }
  }), Object.defineProperty(this, "Resources", {
    value: "2 0 R",
    configurable: !1,
    writeable: !0
  }), Object.defineProperty(this, "stream", {
    enumerable: !1,
    configurable: !0,
    set: function (e) {
      t = e.trim();
    },
    get: function () {
      return t || null;
    }
  });
};

x(J, Y);

var X = function () {
  Y.call(this);
  var t,
      e = [];
  Object.defineProperty(this, "Kids", {
    enumerable: !1,
    configurable: !0,
    get: function () {
      return e.length > 0 ? e : void 0;
    }
  }), Object.defineProperty(this, "Fields", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      return e;
    }
  }), Object.defineProperty(this, "DA", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      if (t) return "(" + t + ")";
    },
    set: function (e) {
      t = e;
    }
  });
};

x(X, Y);

var K = function () {
  Y.call(this);
  var t = 4;
  Object.defineProperty(this, "F", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      return t;
    },
    set: function (e) {
      if (isNaN(e)) throw new Error('Invalid value "' + e + '" for attribute F supplied.');
      t = e;
    }
  }), Object.defineProperty(this, "showWhenPrinted", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(t, 3));
    },
    set: function (e) {
      !0 === Boolean(e) ? this.F = I(t, 3) : this.F = C(t, 3);
    }
  });
  var e = 0;
  Object.defineProperty(this, "Ff", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      return e;
    },
    set: function (t) {
      if (isNaN(t)) throw new Error('Invalid value "' + t + '" for attribute Ff supplied.');
      e = t;
    }
  });
  var n = [];
  Object.defineProperty(this, "Rect", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      if (0 !== n.length) return n;
    },
    set: function (t) {
      n = void 0 !== t ? t : [];
    }
  }), Object.defineProperty(this, "x", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return !n || isNaN(n[0]) ? 0 : n[0];
    },
    set: function (t) {
      n[0] = t;
    }
  }), Object.defineProperty(this, "y", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return !n || isNaN(n[1]) ? 0 : n[1];
    },
    set: function (t) {
      n[1] = t;
    }
  }), Object.defineProperty(this, "width", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return !n || isNaN(n[2]) ? 0 : n[2];
    },
    set: function (t) {
      n[2] = t;
    }
  }), Object.defineProperty(this, "height", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return !n || isNaN(n[3]) ? 0 : n[3];
    },
    set: function (t) {
      n[3] = t;
    }
  });
  var r = "";
  Object.defineProperty(this, "FT", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return r;
    },
    set: function (t) {
      switch (t) {
        case "/Btn":
        case "/Tx":
        case "/Ch":
        case "/Sig":
          r = t;
          break;

        default:
          throw new Error('Invalid value "' + t + '" for attribute FT supplied.');
      }
    }
  });
  var i = null;
  Object.defineProperty(this, "T", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      if (!i || i.length < 1) {
        if (this instanceof it) return;
        i = "FieldObject" + K.FieldNum++;
      }

      return "(" + y(i) + ")";
    },
    set: function (t) {
      i = t.toString();
    }
  }), Object.defineProperty(this, "fieldName", {
    configurable: !0,
    enumerable: !0,
    get: function () {
      return i;
    },
    set: function (t) {
      i = t;
    }
  });
  var a = "helvetica";
  Object.defineProperty(this, "fontName", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return a;
    },
    set: function (t) {
      a = t;
    }
  });
  var o = "normal";
  Object.defineProperty(this, "fontStyle", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return o;
    },
    set: function (t) {
      o = t;
    }
  });
  var s = 0;
  Object.defineProperty(this, "fontSize", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return s;
    },
    set: function (t) {
      s = t;
    }
  });
  var u = void 0;
  Object.defineProperty(this, "maxFontSize", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return void 0 === u ? 50 / b : u;
    },
    set: function (t) {
      u = t;
    }
  });
  var c = "black";
  Object.defineProperty(this, "color", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return c;
    },
    set: function (t) {
      c = t;
    }
  });
  var h = "/F1 0 Tf 0 g";
  Object.defineProperty(this, "DA", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      if (!(!h || this instanceof it || this instanceof ot)) return G(h);
    },
    set: function (t) {
      t = t.toString(), h = t;
    }
  });
  var l = null;
  Object.defineProperty(this, "DV", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      if (l) return this instanceof et == !1 ? G(l) : l;
    },
    set: function (t) {
      t = t.toString(), l = this instanceof et == !1 ? "(" === t.substr(0, 1) ? w(t.substr(1, t.length - 2)) : w(t) : t;
    }
  }), Object.defineProperty(this, "defaultValue", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return this instanceof et == !0 ? w(l.substr(1, l.length - 1)) : l;
    },
    set: function (t) {
      t = t.toString(), l = this instanceof et == !0 ? "/" + t : t;
    }
  });
  var f = null;
  Object.defineProperty(this, "V", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      if (f) return this instanceof et == !1 ? G(f) : f;
    },
    set: function (t) {
      t = t.toString(), f = this instanceof et == !1 ? "(" === t.substr(0, 1) ? w(t.substr(1, t.length - 2)) : w(t) : t;
    }
  }), Object.defineProperty(this, "value", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return this instanceof et == !0 ? w(f.substr(1, f.length - 1)) : f;
    },
    set: function (t) {
      t = t.toString(), f = this instanceof et == !0 ? "/" + t : t;
    }
  }), Object.defineProperty(this, "hasAnnotation", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return this.Rect;
    }
  }), Object.defineProperty(this, "Type", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return this.hasAnnotation ? "/Annot" : null;
    }
  }), Object.defineProperty(this, "Subtype", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return this.hasAnnotation ? "/Widget" : null;
    }
  });
  var d,
      p = !1;
  Object.defineProperty(this, "hasAppearanceStream", {
    enumerable: !0,
    configurable: !0,
    writeable: !0,
    get: function () {
      return p;
    },
    set: function (t) {
      t = Boolean(t), p = t;
    }
  }), Object.defineProperty(this, "page", {
    enumerable: !0,
    configurable: !0,
    writeable: !0,
    get: function () {
      if (d) return d;
    },
    set: function (t) {
      d = t;
    }
  }), Object.defineProperty(this, "readOnly", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 1));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 1) : this.Ff = C(this.Ff, 1);
    }
  }), Object.defineProperty(this, "required", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 2));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 2) : this.Ff = C(this.Ff, 2);
    }
  }), Object.defineProperty(this, "noExport", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 3));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 3) : this.Ff = C(this.Ff, 3);
    }
  });
  var g = null;
  Object.defineProperty(this, "Q", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      if (null !== g) return g;
    },
    set: function (t) {
      if (-1 === [0, 1, 2].indexOf(t)) throw new Error('Invalid value "' + t + '" for attribute Q supplied.');
      g = t;
    }
  }), Object.defineProperty(this, "textAlign", {
    get: function () {
      var t;

      switch (g) {
        case 0:
        default:
          t = "left";
          break;

        case 1:
          t = "center";
          break;

        case 2:
          t = "right";
      }

      return t;
    },
    configurable: !0,
    enumerable: !0,
    set: function (t) {
      switch (t) {
        case "right":
        case 2:
          g = 2;
          break;

        case "center":
        case 1:
          g = 1;
          break;

        case "left":
        case 0:
        default:
          g = 0;
      }
    }
  });
};

x(K, Y);

var Z = function () {
  K.call(this), this.FT = "/Ch", this.V = "()", this.fontName = "zapfdingbats";
  var t = 0;
  Object.defineProperty(this, "TI", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return t;
    },
    set: function (e) {
      t = e;
    }
  }), Object.defineProperty(this, "topIndex", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return t;
    },
    set: function (e) {
      t = e;
    }
  });
  var e = [];
  Object.defineProperty(this, "Opt", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return V(e);
    },
    set: function (t) {
      var n, r;
      r = [], "string" == typeof (n = t) && (r = function (t, e, n) {
        n || (n = 1);

        for (var r, i = []; r = e.exec(t);) i.push(r[n]);

        return i;
      }(n, /\((.*?)\)/g)), e = r;
    }
  }), this.getOptions = function () {
    return e;
  }, this.setOptions = function (t) {
    e = t, this.sort && e.sort();
  }, this.addOption = function (t) {
    t = (t = t || "").toString(), e.push(t), this.sort && e.sort();
  }, this.removeOption = function (t, n) {
    for (n = n || !1, t = (t = t || "").toString(); -1 !== e.indexOf(t) && (e.splice(e.indexOf(t), 1), !1 !== n););
  }, Object.defineProperty(this, "combo", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 18));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 18) : this.Ff = C(this.Ff, 18);
    }
  }), Object.defineProperty(this, "edit", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 19));
    },
    set: function (t) {
      !0 === this.combo && (!0 === Boolean(t) ? this.Ff = I(this.Ff, 19) : this.Ff = C(this.Ff, 19));
    }
  }), Object.defineProperty(this, "sort", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 20));
    },
    set: function (t) {
      !0 === Boolean(t) ? (this.Ff = I(this.Ff, 20), e.sort()) : this.Ff = C(this.Ff, 20);
    }
  }), Object.defineProperty(this, "multiSelect", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 22));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 22) : this.Ff = C(this.Ff, 22);
    }
  }), Object.defineProperty(this, "doNotSpellCheck", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 23));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 23) : this.Ff = C(this.Ff, 23);
    }
  }), Object.defineProperty(this, "commitOnSelChange", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 27));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 27) : this.Ff = C(this.Ff, 27);
    }
  }), this.hasAppearanceStream = !1;
};

exports.AcroFormChoiceField = Z;
x(Z, K);

var $ = function () {
  Z.call(this), this.fontName = "helvetica", this.combo = !1;
};

exports.AcroFormListBox = $;
x($, Z);

var Q = function () {
  $.call(this), this.combo = !0;
};

exports.AcroFormComboBox = Q;
x(Q, $);

var tt = function () {
  Q.call(this), this.edit = !0;
};

exports.AcroFormEditBox = tt;
x(tt, Q);

var et = function () {
  K.call(this), this.FT = "/Btn", Object.defineProperty(this, "noToggleToOff", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 15));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 15) : this.Ff = C(this.Ff, 15);
    }
  }), Object.defineProperty(this, "radio", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 16));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 16) : this.Ff = C(this.Ff, 16);
    }
  }), Object.defineProperty(this, "pushButton", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 17));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 17) : this.Ff = C(this.Ff, 17);
    }
  }), Object.defineProperty(this, "radioIsUnison", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 26));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 26) : this.Ff = C(this.Ff, 26);
    }
  });
  var t,
      e = {};
  Object.defineProperty(this, "MK", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      if (0 !== Object.keys(e).length) {
        var t,
            n = [];

        for (t in n.push("<<"), e) n.push("/" + t + " (" + e[t] + ")");

        return n.push(">>"), n.join("\n");
      }
    },
    set: function (t) {
      "object" == typeof t && (e = t);
    }
  }), Object.defineProperty(this, "caption", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return e.CA || "";
    },
    set: function (t) {
      "string" == typeof t && (e.CA = t);
    }
  }), Object.defineProperty(this, "AS", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      return t;
    },
    set: function (e) {
      t = e;
    }
  }), Object.defineProperty(this, "appearanceState", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return t.substr(1, t.length - 1);
    },
    set: function (e) {
      t = "/" + e;
    }
  });
};

exports.AcroFormButton = et;
x(et, K);

var nt = function () {
  et.call(this), this.pushButton = !0;
};

exports.AcroFormPushButton = nt;
x(nt, et);

var rt = function () {
  et.call(this), this.radio = !0, this.pushButton = !1;
  var t = [];
  Object.defineProperty(this, "Kids", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return t;
    },
    set: function (e) {
      t = void 0 !== e ? e : [];
    }
  });
};

exports.AcroFormRadioButton = rt;
x(rt, et);

var it = function () {
  var t, e;
  K.call(this), Object.defineProperty(this, "Parent", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      return t;
    },
    set: function (e) {
      t = e;
    }
  }), Object.defineProperty(this, "optionName", {
    enumerable: !1,
    configurable: !0,
    get: function () {
      return e;
    },
    set: function (t) {
      e = t;
    }
  });
  var n,
      r = {};
  Object.defineProperty(this, "MK", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      var t,
          e = [];

      for (t in e.push("<<"), r) e.push("/" + t + " (" + r[t] + ")");

      return e.push(">>"), e.join("\n");
    },
    set: function (t) {
      "object" == typeof t && (r = t);
    }
  }), Object.defineProperty(this, "caption", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return r.CA || "";
    },
    set: function (t) {
      "string" == typeof t && (r.CA = t);
    }
  }), Object.defineProperty(this, "AS", {
    enumerable: !1,
    configurable: !1,
    get: function () {
      return n;
    },
    set: function (t) {
      n = t;
    }
  }), Object.defineProperty(this, "appearanceState", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return n.substr(1, n.length - 1);
    },
    set: function (t) {
      n = "/" + t;
    }
  }), this.caption = "l", this.appearanceState = "Off", this._AppearanceType = ut.RadioButton.Circle, this.appearanceStreamContent = this._AppearanceType.createAppearanceStream(this.optionName);
};

x(it, K), rt.prototype.setAppearance = function (t) {
  if (!("createAppearanceStream" in t) || !("getCA" in t)) throw new Error("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");

  for (var e in this.Kids) if (this.Kids.hasOwnProperty(e)) {
    var n = this.Kids[e];
    n.appearanceStreamContent = t.createAppearanceStream(n.optionName), n.caption = t.getCA();
  }
}, rt.prototype.createOption = function (t) {
  var e = new it();
  return e.Parent = this, e.optionName = t, this.Kids.push(e), ct.call(this, e), e;
};

var at = function () {
  et.call(this), this.fontName = "zapfdingbats", this.caption = "3", this.appearanceState = "On", this.value = "On", this.textAlign = "center", this.appearanceStreamContent = ut.CheckBox.createAppearanceStream();
};

exports.AcroFormCheckBox = at;
x(at, et);

var ot = function () {
  K.call(this), this.FT = "/Tx", Object.defineProperty(this, "multiline", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 13));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 13) : this.Ff = C(this.Ff, 13);
    }
  }), Object.defineProperty(this, "fileSelect", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 21));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 21) : this.Ff = C(this.Ff, 21);
    }
  }), Object.defineProperty(this, "doNotSpellCheck", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 23));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 23) : this.Ff = C(this.Ff, 23);
    }
  }), Object.defineProperty(this, "doNotScroll", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 24));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 24) : this.Ff = C(this.Ff, 24);
    }
  }), Object.defineProperty(this, "comb", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 25));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 25) : this.Ff = C(this.Ff, 25);
    }
  }), Object.defineProperty(this, "richText", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 26));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 26) : this.Ff = C(this.Ff, 26);
    }
  });
  var t = null;
  Object.defineProperty(this, "MaxLen", {
    enumerable: !0,
    configurable: !1,
    get: function () {
      return t;
    },
    set: function (e) {
      t = e;
    }
  }), Object.defineProperty(this, "maxLength", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return t;
    },
    set: function (e) {
      Number.isInteger(e) && (t = e);
    }
  }), Object.defineProperty(this, "hasAppearanceStream", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return this.V || this.DV;
    }
  });
};

exports.AcroFormTextField = ot;
x(ot, K);

var st = function () {
  ot.call(this), Object.defineProperty(this, "password", {
    enumerable: !0,
    configurable: !0,
    get: function () {
      return Boolean(F(this.Ff, 14));
    },
    set: function (t) {
      !0 === Boolean(t) ? this.Ff = I(this.Ff, 14) : this.Ff = C(this.Ff, 14);
    }
  }), this.password = !0;
};

exports.AcroFormPasswordField = st;
x(st, ot);
var ut = {
  CheckBox: {
    createAppearanceStream: function () {
      return {
        N: {
          On: ut.CheckBox.YesNormal
        },
        D: {
          On: ut.CheckBox.YesPushDown,
          Off: ut.CheckBox.OffPushDown
        }
      };
    },
    YesPushDown: function (t) {
      var e = new _(t),
          n = [],
          r = m.internal.getFont(t.fontName, t.fontStyle).id,
          i = m.__private__.encodeColorString(t.color),
          a = O(t, t.caption);

      return n.push("0.749023 g"), n.push("0 0 " + N(ut.internal.getWidth(t)) + " " + N(ut.internal.getHeight(t)) + " re"), n.push("f"), n.push("BMC"), n.push("q"), n.push("0 0 1 rg"), n.push("/" + r + " " + N(a.fontSize) + " Tf " + i), n.push("BT"), n.push(a.text), n.push("ET"), n.push("Q"), n.push("EMC"), e.stream = n.join("\n"), e;
    },
    YesNormal: function (t) {
      var e = new _(t),
          n = m.internal.getFont(t.fontName, t.fontStyle).id,
          r = m.__private__.encodeColorString(t.color),
          i = [],
          a = ut.internal.getHeight(t),
          o = ut.internal.getWidth(t),
          s = O(t, t.caption);

      return i.push("1 g"), i.push("0 0 " + N(o) + " " + N(a) + " re"), i.push("f"), i.push("q"), i.push("0 0 1 rg"), i.push("0 0 " + N(o - 1) + " " + N(a - 1) + " re"), i.push("W"), i.push("n"), i.push("0 g"), i.push("BT"), i.push("/" + n + " " + N(s.fontSize) + " Tf " + r), i.push(s.text), i.push("ET"), i.push("Q"), e.stream = i.join("\n"), e;
    },
    OffPushDown: function (t) {
      var e = new _(t),
          n = [];
      return n.push("0.749023 g"), n.push("0 0 " + N(ut.internal.getWidth(t)) + " " + N(ut.internal.getHeight(t)) + " re"), n.push("f"), e.stream = n.join("\n"), e;
    }
  },
  RadioButton: {
    Circle: {
      createAppearanceStream: function (t) {
        var e = {
          D: {
            Off: ut.RadioButton.Circle.OffPushDown
          },
          N: {}
        };
        return e.N[t] = ut.RadioButton.Circle.YesNormal, e.D[t] = ut.RadioButton.Circle.YesPushDown, e;
      },
      getCA: function () {
        return "l";
      },
      YesNormal: function (t) {
        var e = new _(t),
            n = [],
            r = ut.internal.getWidth(t) <= ut.internal.getHeight(t) ? ut.internal.getWidth(t) / 4 : ut.internal.getHeight(t) / 4;
        r = Number((.9 * r).toFixed(5));
        var i = ut.internal.Bezier_C,
            a = Number((r * i).toFixed(5));
        return n.push("q"), n.push("1 0 0 1 " + L(ut.internal.getWidth(t) / 2) + " " + L(ut.internal.getHeight(t) / 2) + " cm"), n.push(r + " 0 m"), n.push(r + " " + a + " " + a + " " + r + " 0 " + r + " c"), n.push("-" + a + " " + r + " -" + r + " " + a + " -" + r + " 0 c"), n.push("-" + r + " -" + a + " -" + a + " -" + r + " 0 -" + r + " c"), n.push(a + " -" + r + " " + r + " -" + a + " " + r + " 0 c"), n.push("f"), n.push("Q"), e.stream = n.join("\n"), e;
      },
      YesPushDown: function (t) {
        var e = new _(t),
            n = [],
            r = ut.internal.getWidth(t) <= ut.internal.getHeight(t) ? ut.internal.getWidth(t) / 4 : ut.internal.getHeight(t) / 4,
            i = (r = Number((.9 * r).toFixed(5)), Number((2 * r).toFixed(5))),
            a = Number((i * ut.internal.Bezier_C).toFixed(5)),
            o = Number((r * ut.internal.Bezier_C).toFixed(5));
        return n.push("0.749023 g"), n.push("q"), n.push("1 0 0 1 " + L(ut.internal.getWidth(t) / 2) + " " + L(ut.internal.getHeight(t) / 2) + " cm"), n.push(i + " 0 m"), n.push(i + " " + a + " " + a + " " + i + " 0 " + i + " c"), n.push("-" + a + " " + i + " -" + i + " " + a + " -" + i + " 0 c"), n.push("-" + i + " -" + a + " -" + a + " -" + i + " 0 -" + i + " c"), n.push(a + " -" + i + " " + i + " -" + a + " " + i + " 0 c"), n.push("f"), n.push("Q"), n.push("0 g"), n.push("q"), n.push("1 0 0 1 " + L(ut.internal.getWidth(t) / 2) + " " + L(ut.internal.getHeight(t) / 2) + " cm"), n.push(r + " 0 m"), n.push(r + " " + o + " " + o + " " + r + " 0 " + r + " c"), n.push("-" + o + " " + r + " -" + r + " " + o + " -" + r + " 0 c"), n.push("-" + r + " -" + o + " -" + o + " -" + r + " 0 -" + r + " c"), n.push(o + " -" + r + " " + r + " -" + o + " " + r + " 0 c"), n.push("f"), n.push("Q"), e.stream = n.join("\n"), e;
      },
      OffPushDown: function (t) {
        var e = new _(t),
            n = [],
            r = ut.internal.getWidth(t) <= ut.internal.getHeight(t) ? ut.internal.getWidth(t) / 4 : ut.internal.getHeight(t) / 4;
        r = Number((.9 * r).toFixed(5));
        var i = Number((2 * r).toFixed(5)),
            a = Number((i * ut.internal.Bezier_C).toFixed(5));
        return n.push("0.749023 g"), n.push("q"), n.push("1 0 0 1 " + L(ut.internal.getWidth(t) / 2) + " " + L(ut.internal.getHeight(t) / 2) + " cm"), n.push(i + " 0 m"), n.push(i + " " + a + " " + a + " " + i + " 0 " + i + " c"), n.push("-" + a + " " + i + " -" + i + " " + a + " -" + i + " 0 c"), n.push("-" + i + " -" + a + " -" + a + " -" + i + " 0 -" + i + " c"), n.push(a + " -" + i + " " + i + " -" + a + " " + i + " 0 c"), n.push("f"), n.push("Q"), e.stream = n.join("\n"), e;
      }
    },
    Cross: {
      createAppearanceStream: function (t) {
        var e = {
          D: {
            Off: ut.RadioButton.Cross.OffPushDown
          },
          N: {}
        };
        return e.N[t] = ut.RadioButton.Cross.YesNormal, e.D[t] = ut.RadioButton.Cross.YesPushDown, e;
      },
      getCA: function () {
        return "8";
      },
      YesNormal: function (t) {
        var e = new _(t),
            n = [],
            r = ut.internal.calculateCross(t);
        return n.push("q"), n.push("1 1 " + N(ut.internal.getWidth(t) - 2) + " " + N(ut.internal.getHeight(t) - 2) + " re"), n.push("W"), n.push("n"), n.push(N(r.x1.x) + " " + N(r.x1.y) + " m"), n.push(N(r.x2.x) + " " + N(r.x2.y) + " l"), n.push(N(r.x4.x) + " " + N(r.x4.y) + " m"), n.push(N(r.x3.x) + " " + N(r.x3.y) + " l"), n.push("s"), n.push("Q"), e.stream = n.join("\n"), e;
      },
      YesPushDown: function (t) {
        var e = new _(t),
            n = ut.internal.calculateCross(t),
            r = [];
        return r.push("0.749023 g"), r.push("0 0 " + N(ut.internal.getWidth(t)) + " " + N(ut.internal.getHeight(t)) + " re"), r.push("f"), r.push("q"), r.push("1 1 " + N(ut.internal.getWidth(t) - 2) + " " + N(ut.internal.getHeight(t) - 2) + " re"), r.push("W"), r.push("n"), r.push(N(n.x1.x) + " " + N(n.x1.y) + " m"), r.push(N(n.x2.x) + " " + N(n.x2.y) + " l"), r.push(N(n.x4.x) + " " + N(n.x4.y) + " m"), r.push(N(n.x3.x) + " " + N(n.x3.y) + " l"), r.push("s"), r.push("Q"), e.stream = r.join("\n"), e;
      },
      OffPushDown: function (t) {
        var e = new _(t),
            n = [];
        return n.push("0.749023 g"), n.push("0 0 " + N(ut.internal.getWidth(t)) + " " + N(ut.internal.getHeight(t)) + " re"), n.push("f"), e.stream = n.join("\n"), e;
      }
    }
  },
  createDefaultAppearanceStream: function (t) {
    var e = m.internal.getFont(t.fontName, t.fontStyle).id,
        n = m.__private__.encodeColorString(t.color);

    return "/" + e + " " + t.fontSize + " Tf " + n;
  }
};
exports.AcroFormAppearance = ut;
ut.internal = {
  Bezier_C: .551915024494,
  calculateCross: function (t) {
    var e = ut.internal.getWidth(t),
        n = ut.internal.getHeight(t),
        r = Math.min(e, n);
    return {
      x1: {
        x: (e - r) / 2,
        y: (n - r) / 2 + r
      },
      x2: {
        x: (e - r) / 2 + r,
        y: (n - r) / 2
      },
      x3: {
        x: (e - r) / 2,
        y: (n - r) / 2
      },
      x4: {
        x: (e - r) / 2 + r,
        y: (n - r) / 2 + r
      }
    };
  }
}, ut.internal.getWidth = function (t) {
  var e = 0;
  return "object" == typeof t && (e = A(t.Rect[2])), e;
}, ut.internal.getHeight = function (t) {
  var e = 0;
  return "object" == typeof t && (e = A(t.Rect[3])), e;
};

var ct = v.addField = function (t) {
  if (W.call(this), !(t instanceof K)) throw new Error("Invalid argument passed to jsPDF.addField.");
  return R.call(this, t), t.page = m.internal.getCurrentPageInfo().pageNumber, this;
};

v.AcroFormChoiceField = Z, v.AcroFormListBox = $, v.AcroFormComboBox = Q, v.AcroFormEditBox = tt, v.AcroFormButton = et, v.AcroFormPushButton = nt, v.AcroFormRadioButton = rt, v.AcroFormCheckBox = at, v.AcroFormTextField = ot, v.AcroFormPasswordField = st, v.AcroFormAppearance = ut, v.AcroForm = {
  ChoiceField: Z,
  ListBox: $,
  ComboBox: Q,
  EditBox: tt,
  Button: et,
  PushButton: nt,
  RadioButton: rt,
  CheckBox: at,
  TextField: ot,
  PasswordField: st,
  Appearance: ut
}, g.AcroForm = {
  ChoiceField: Z,
  ListBox: $,
  ComboBox: Q,
  EditBox: tt,
  Button: et,
  PushButton: nt,
  RadioButton: rt,
  CheckBox: at,
  TextField: ot,
  PasswordField: st,
  Appearance: ut
};
var ht = g.AcroForm;
/** @license
 * jsPDF addImage plugin
 * Copyright (c) 2012 Jason Siefken, https://github.com/siefkenj/
 *               2013 Chris Dowling, https://github.com/gingerchris
 *               2013 Trinh Ho, https://github.com/ineedfat
 *               2013 Edwin Alejandro Perez, https://github.com/eaparango
 *               2013 Norah Smith, https://github.com/burnburnrocket
 *               2014 Diego Casorran, https://github.com/diegocr
 *               2014 James Robb, https://github.com/jamesbrobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

exports.AcroForm = ht;
!function (t) {
  t.__addimage__ = {};

  var e = "UNKNOWN",
      n = {
    PNG: [[137, 80, 78, 71]],
    TIFF: [[77, 77, 0, 42], [73, 73, 42, 0]],
    JPEG: [[255, 216, 255, 224, void 0, void 0, 74, 70, 73, 70, 0], [255, 216, 255, 225, void 0, void 0, 69, 120, 105, 102, 0, 0], [255, 216, 255, 219], [255, 216, 255, 238]],
    JPEG2000: [[0, 0, 0, 12, 106, 80, 32, 32]],
    GIF87a: [[71, 73, 70, 56, 55, 97]],
    GIF89a: [[71, 73, 70, 56, 57, 97]],
    WEBP: [[82, 73, 70, 70, void 0, void 0, void 0, void 0, 87, 69, 66, 80]],
    BMP: [[66, 77], [66, 65], [67, 73], [67, 80], [73, 67], [80, 84]]
  },
      r = t.__addimage__.getImageFileTypeByImageData = function (t, r) {
    var i, a;
    r = r || e;
    var o,
        s,
        u,
        c = e;
    if (A(t)) for (u in n) for (o = n[u], i = 0; i < o.length; i += 1) {
      for (s = !0, a = 0; a < o[i].length; a += 1) if (void 0 !== o[i][a] && o[i][a] !== t[a]) {
        s = !1;
        break;
      }

      if (!0 === s) {
        c = u;
        break;
      }
    } else for (u in n) for (o = n[u], i = 0; i < o.length; i += 1) {
      for (s = !0, a = 0; a < o[i].length; a += 1) if (void 0 !== o[i][a] && o[i][a] !== t.charCodeAt(a)) {
        s = !1;
        break;
      }

      if (!0 === s) {
        c = u;
        break;
      }
    }
    return c === e && r !== e && (c = r), c;
  },
      i = function (t) {
    for (var e = this.internal.write, n = this.internal.putStream, r = (0, this.internal.getFilters)(); -1 !== r.indexOf("FlateEncode");) r.splice(r.indexOf("FlateEncode"), 1);

    t.objectId = this.internal.newObject();
    var a = [];

    if (a.push({
      key: "Type",
      value: "/XObject"
    }), a.push({
      key: "Subtype",
      value: "/Image"
    }), a.push({
      key: "Width",
      value: t.width
    }), a.push({
      key: "Height",
      value: t.height
    }), t.colorSpace === b.INDEXED ? a.push({
      key: "ColorSpace",
      value: "[/Indexed /DeviceRGB " + (t.palette.length / 3 - 1) + " " + ("sMask" in t && void 0 !== t.sMask ? t.objectId + 2 : t.objectId + 1) + " 0 R]"
    }) : (a.push({
      key: "ColorSpace",
      value: "/" + t.colorSpace
    }), t.colorSpace === b.DEVICE_CMYK && a.push({
      key: "Decode",
      value: "[1 0 1 0 1 0 1 0]"
    })), a.push({
      key: "BitsPerComponent",
      value: t.bitsPerComponent
    }), "decodeParameters" in t && void 0 !== t.decodeParameters && a.push({
      key: "DecodeParms",
      value: "<<" + t.decodeParameters + ">>"
    }), "transparency" in t && Array.isArray(t.transparency)) {
      for (var o = "", s = 0, u = t.transparency.length; s < u; s++) o += t.transparency[s] + " " + t.transparency[s] + " ";

      a.push({
        key: "Mask",
        value: "[" + o + "]"
      });
    }

    void 0 !== t.sMask && a.push({
      key: "SMask",
      value: t.objectId + 1 + " 0 R"
    });
    var c = void 0 !== t.filter ? ["/" + t.filter] : void 0;

    if (n({
      data: t.data,
      additionalKeyValues: a,
      alreadyAppliedFilters: c
    }), e("endobj"), "sMask" in t && void 0 !== t.sMask) {
      var h = "/Predictor " + t.predictor + " /Colors 1 /BitsPerComponent " + t.bitsPerComponent + " /Columns " + t.width,
          l = {
        width: t.width,
        height: t.height,
        colorSpace: "DeviceGray",
        bitsPerComponent: t.bitsPerComponent,
        decodeParameters: h,
        data: t.sMask
      };
      "filter" in t && (l.filter = t.filter), i.call(this, l);
    }

    t.colorSpace === b.INDEXED && (this.internal.newObject(), n({
      data: S(new Uint8Array(t.palette))
    }), e("endobj"));
  },
      a = function () {
    var t = this.internal.collections.addImage_images;

    for (var e in t) i.call(this, t[e]);
  },
      u = function () {
    var t,
        e = this.internal.collections.addImage_images,
        n = this.internal.write;

    for (var r in e) n("/I" + (t = e[r]).index, t.objectId, "0", "R");
  },
      c = function () {
    this.internal.collections.addImage_images || (this.internal.collections.addImage_images = {}, this.internal.events.subscribe("putResources", a), this.internal.events.subscribe("putXobjectDict", u));
  },
      h = function () {
    var t = this.internal.collections.addImage_images;
    return c.call(this), t;
  },
      l = function () {
    return Object.keys(this.internal.collections.addImage_images).length;
  },
      f = function (e) {
    return "function" == typeof t["process" + e.toUpperCase()];
  },
      d = function (t) {
    return "object" == typeof t && 1 === t.nodeType;
  },
      p = function (e, n) {
    if ("IMG" === e.nodeName && e.hasAttribute("src")) {
      var r = "" + e.getAttribute("src");
      if (0 === r.indexOf("data:image/")) return o(unescape(r).split("base64,").pop());
      var i = t.loadFile(r, !0);
      if (void 0 !== i) return i;
    }

    if ("CANVAS" === e.nodeName) {
      var a;

      switch (n) {
        case "PNG":
          a = "image/png";
          break;

        case "WEBP":
          a = "image/webp";
          break;

        case "JPEG":
        case "JPG":
        default:
          a = "image/jpeg";
      }

      return o(e.toDataURL(a, 1).split("base64,").pop());
    }
  },
      g = function (t) {
    var e = this.internal.collections.addImage_images;
    if (e) for (var n in e) if (t === e[n].alias) return e[n];
  },
      m = function (t, e, n) {
    return t || e || (t = -96, e = -96), t < 0 && (t = -1 * n.width * 72 / t / this.internal.scaleFactor), e < 0 && (e = -1 * n.height * 72 / e / this.internal.scaleFactor), 0 === t && (t = e * n.width / n.height), 0 === e && (e = t * n.height / n.width), [t, e];
  },
      v = function (t, e, n, r, i, a) {
    var o = m.call(this, n, r, i),
        s = this.internal.getCoordinateString,
        u = this.internal.getVerticalCoordinateString,
        c = h.call(this);

    if (n = o[0], r = o[1], c[i.index] = i, a) {
      a *= Math.PI / 180;

      var l = Math.cos(a),
          f = Math.sin(a),
          d = function (t) {
        return t.toFixed(4);
      },
          p = [d(l), d(f), d(-1 * f), d(l), 0, 0, "cm"];
    }

    this.internal.write("q"), a ? (this.internal.write([1, "0", "0", 1, s(t), u(e + r), "cm"].join(" ")), this.internal.write(p.join(" ")), this.internal.write([s(n), "0", "0", s(r), "0", "0", "cm"].join(" "))) : this.internal.write([s(n), "0", "0", s(r), s(t), u(e + r), "cm"].join(" ")), this.isAdvancedAPI() && this.internal.write([1, 0, 0, -1, 0, 0, "cm"].join(" ")), this.internal.write("/I" + i.index + " Do"), this.internal.write("Q");
  },
      b = t.color_spaces = {
    DEVICE_RGB: "DeviceRGB",
    DEVICE_GRAY: "DeviceGray",
    DEVICE_CMYK: "DeviceCMYK",
    CAL_GREY: "CalGray",
    CAL_RGB: "CalRGB",
    LAB: "Lab",
    ICC_BASED: "ICCBased",
    INDEXED: "Indexed",
    PATTERN: "Pattern",
    SEPARATION: "Separation",
    DEVICE_N: "DeviceN"
  };

  t.decode = {
    DCT_DECODE: "DCTDecode",
    FLATE_DECODE: "FlateDecode",
    LZW_DECODE: "LZWDecode",
    JPX_DECODE: "JPXDecode",
    JBIG2_DECODE: "JBIG2Decode",
    ASCII85_DECODE: "ASCII85Decode",
    ASCII_HEX_DECODE: "ASCIIHexDecode",
    RUN_LENGTH_DECODE: "RunLengthDecode",
    CCITT_FAX_DECODE: "CCITTFaxDecode"
  };

  var y = t.image_compression = {
    NONE: "NONE",
    FAST: "FAST",
    MEDIUM: "MEDIUM",
    SLOW: "SLOW"
  },
      w = t.__addimage__.sHashCode = function (t) {
    var e,
        n,
        r = 0;
    if ("string" == typeof t) for (n = t.length, e = 0; e < n; e++) r = (r << 5) - r + t.charCodeAt(e), r |= 0;else if (A(t)) for (n = t.byteLength / 2, e = 0; e < n; e++) r = (r << 5) - r + t[e], r |= 0;
    return r;
  },
      N = t.__addimage__.validateStringAsBase64 = function (t) {
    (t = t || "").toString().trim();
    var e = !0;
    return 0 === t.length && (e = !1), t.length % 4 != 0 && (e = !1), !1 === /^[A-Za-z0-9+/]+$/.test(t.substr(0, t.length - 2)) && (e = !1), !1 === /^[A-Za-z0-9/][A-Za-z0-9+/]|[A-Za-z0-9+/]=|==$/.test(t.substr(-2)) && (e = !1), e;
  },
      L = t.__addimage__.extractImageFromDataUrl = function (t) {
    var e = (t = t || "").split("base64,"),
        n = null;

    if (2 === e.length) {
      var r = /^data:(\w*\/\w*);*(charset=[\w=-]*)*;*$/.exec(e[0]);
      Array.isArray(r) && (n = {
        mimeType: r[1],
        charset: r[2],
        data: e[1]
      });
    }

    return n;
  },
      x = t.__addimage__.supportsArrayBuffer = function () {
    return "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array;
  };

  t.__addimage__.isArrayBuffer = function (t) {
    return x() && t instanceof ArrayBuffer;
  };

  var A = t.__addimage__.isArrayBufferView = function (t) {
    return x() && "undefined" != typeof Uint32Array && (t instanceof Int8Array || t instanceof Uint8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array);
  },
      _ = t.__addimage__.binaryStringToUint8Array = function (t) {
    for (var e = t.length, n = new Uint8Array(e), r = 0; r < e; r++) n[r] = t.charCodeAt(r);

    return n;
  },
      S = t.__addimage__.arrayBufferToBinaryString = function (t) {
    try {
      return o(s(String.fromCharCode.apply(null, t)));
    } catch (e) {
      if ("undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.reduce) return new Uint8Array(t).reduce(function (t, e) {
        return t.push(String.fromCharCode(e)), t;
      }, []).join("");
    }
  };

  t.addImage = function () {
    var t, n, r, i, a, o, s, u, h;

    if ("number" == typeof arguments[1] ? (n = e, r = arguments[1], i = arguments[2], a = arguments[3], o = arguments[4], s = arguments[5], u = arguments[6], h = arguments[7]) : (n = arguments[1], r = arguments[2], i = arguments[3], a = arguments[4], o = arguments[5], s = arguments[6], u = arguments[7], h = arguments[8]), "object" == typeof (t = arguments[0]) && !d(t) && "imageData" in t) {
      var l = t;
      t = l.imageData, n = l.format || n || e, r = l.x || r || 0, i = l.y || i || 0, a = l.w || l.width || a, o = l.h || l.height || o, s = l.alias || s, u = l.compression || u, h = l.rotation || l.angle || h;
    }

    var f = this.internal.getFilters();
    if (void 0 === u && -1 !== f.indexOf("FlateEncode") && (u = "SLOW"), isNaN(r) || isNaN(i)) throw new Error("Invalid coordinates passed to jsPDF.addImage");
    c.call(this);
    var p = P.call(this, t, n, s, u);
    return v.call(this, r, i, a, o, p, h), this;
  };

  var P = function (n, i, a, o) {
    var s, u, c;

    if ("string" == typeof n && r(n) === e) {
      n = unescape(n);
      var h = k(n, !1);
      ("" !== h || void 0 !== (h = t.loadFile(n, !0))) && (n = h);
    }

    if (d(n) && (n = p(n, i)), i = r(n, i), !f(i)) throw new Error("addImage does not support files of type '" + i + "', please ensure that a plugin for '" + i + "' support is added.");
    if ((null == (c = a) || 0 === c.length) && (a = function (t) {
      return "string" == typeof t || A(t) ? w(t) : null;
    }(n)), (s = g.call(this, a)) || (x() && (n instanceof Uint8Array || (u = n, n = _(n))), s = this["process" + i.toUpperCase()](n, l.call(this), a, function (e) {
      return e && "string" == typeof e && (e = e.toUpperCase()), e in t.image_compression ? e : y.NONE;
    }(o), u)), !s) throw new Error("An unknown error occurred whilst processing the image.");
    return s;
  },
      k = t.__addimage__.convertBase64ToBinaryString = function (t, e) {
    var n;
    e = "boolean" != typeof e || e;
    var r,
        i = "";

    if ("string" == typeof t) {
      r = null !== (n = L(t)) ? n.data : t;

      try {
        i = o(r);
      } catch (t) {
        if (e) throw N(r) ? new Error("atob-Error in jsPDF.convertBase64ToBinaryString " + t.message) : new Error("Supplied Data is not a valid base64-String jsPDF.convertBase64ToBinaryString ");
      }
    }

    return i;
  };

  t.getImageProperties = function (n) {
    var i,
        a,
        o = "";
    if (d(n) && (n = p(n)), "string" == typeof n && r(n) === e && ("" === (o = k(n, !1)) && (o = t.loadFile(n) || ""), n = o), a = r(n), !f(a)) throw new Error("addImage does not support files of type '" + a + "', please ensure that a plugin for '" + a + "' support is added.");
    if (!x() || n instanceof Uint8Array || (n = _(n)), !(i = this["process" + a.toUpperCase()](n))) throw new Error("An unknown error occurred whilst processing the image");
    return i.fileType = a, i;
  };
}(g.API),
/**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t) {
  var e = function (t) {
    if (void 0 !== t && "" != t) return !0;
  };

  g.API.events.push(["addPage", function (t) {
    this.internal.getPageInfo(t.pageNumber).pageContext.annotations = [];
  }]), t.events.push(["putPage", function (t) {
    for (var n, r, i, a = this.internal.getCoordinateString, o = this.internal.getVerticalCoordinateString, s = this.internal.getPageInfoByObjId(t.objId), u = t.pageContext.annotations, c = !1, h = 0; h < u.length && !c; h++) switch ((n = u[h]).type) {
      case "link":
        (e(n.options.url) || e(n.options.pageNumber)) && (c = !0);
        break;

      case "reference":
      case "text":
      case "freetext":
        c = !0;
    }

    if (0 != c) {
      this.internal.write("/Annots [");

      for (var l = 0; l < u.length; l++) switch ((n = u[l]).type) {
        case "reference":
          this.internal.write(" " + n.object.objId + " 0 R ");
          break;

        case "text":
          var f = this.internal.newAdditionalObject(),
              d = this.internal.newAdditionalObject(),
              p = n.title || "Note";
          i = "<</Type /Annot /Subtype /Text " + (r = "/Rect [" + a(n.bounds.x) + " " + o(n.bounds.y + n.bounds.h) + " " + a(n.bounds.x + n.bounds.w) + " " + o(n.bounds.y) + "] ") + "/Contents (" + n.contents + ")", i += " /Popup " + d.objId + " 0 R", i += " /P " + s.objId + " 0 R", i += " /T (" + p + ") >>", f.content = i;
          var g = f.objId + " 0 R";
          i = "<</Type /Annot /Subtype /Popup " + (r = "/Rect [" + a(n.bounds.x + 30) + " " + o(n.bounds.y + n.bounds.h) + " " + a(n.bounds.x + n.bounds.w + 30) + " " + o(n.bounds.y) + "] ") + " /Parent " + g, n.open && (i += " /Open true"), i += " >>", d.content = i, this.internal.write(f.objId, "0 R", d.objId, "0 R");
          break;

        case "freetext":
          r = "/Rect [" + a(n.bounds.x) + " " + o(n.bounds.y) + " " + a(n.bounds.x + n.bounds.w) + " " + o(n.bounds.y + n.bounds.h) + "] ";
          var m = n.color || "#000000";
          i = "<</Type /Annot /Subtype /FreeText " + r + "/Contents (" + n.contents + ")", i += " /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#" + m + ")", i += " /Border [0 0 0]", i += " >>", this.internal.write(i);
          break;

        case "link":
          if (n.options.name) {
            var v = this.annotations._nameMap[n.options.name];
            n.options.pageNumber = v.page, n.options.top = v.y;
          } else n.options.top || (n.options.top = 0);

          if (r = "/Rect [" + a(n.x) + " " + o(n.y) + " " + a(n.x + n.w) + " " + o(n.y + n.h) + "] ", i = "", n.options.url) i = "<</Type /Annot /Subtype /Link " + r + "/Border [0 0 0] /A <</S /URI /URI (" + n.options.url + ") >>";else if (n.options.pageNumber) {
            switch (i = "<</Type /Annot /Subtype /Link " + r + "/Border [0 0 0] /Dest [" + this.internal.getPageInfo(n.options.pageNumber).objId + " 0 R", n.options.magFactor = n.options.magFactor || "XYZ", n.options.magFactor) {
              case "Fit":
                i += " /Fit]";
                break;

              case "FitH":
                i += " /FitH " + n.options.top + "]";
                break;

              case "FitV":
                n.options.left = n.options.left || 0, i += " /FitV " + n.options.left + "]";
                break;

              case "XYZ":
              default:
                var b = o(n.options.top);
                n.options.left = n.options.left || 0, void 0 === n.options.zoom && (n.options.zoom = 0), i += " /XYZ " + n.options.left + " " + b + " " + n.options.zoom + "]";
            }
          }
          "" != i && (i += " >>", this.internal.write(i));
      }

      this.internal.write("]");
    }
  }]), t.createAnnotation = function (t) {
    var e = this.internal.getCurrentPageInfo();

    switch (t.type) {
      case "link":
        this.link(t.bounds.x, t.bounds.y, t.bounds.w, t.bounds.h, t);
        break;

      case "text":
      case "freetext":
        e.pageContext.annotations.push(t);
    }
  }, t.link = function (t, e, n, r, i) {
    this.internal.getCurrentPageInfo().pageContext.annotations.push({
      x: t,
      y: e,
      w: n,
      h: r,
      options: i,
      type: "link"
    });
  }, t.textWithLink = function (t, e, n, r) {
    var i = this.getTextWidth(t),
        a = this.internal.getLineHeight() / this.internal.scaleFactor;
    return this.text(t, e, n, r), n += .2 * a, this.link(e, n - a, i, a, r), i;
  }, t.getTextWidth = function (t) {
    var e = this.internal.getFontSize();
    return this.getStringUnitWidth(t) * e / this.internal.scaleFactor;
  };
}(g.API),
/**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t) {
  var e = {
    1569: [65152],
    1570: [65153, 65154],
    1571: [65155, 65156],
    1572: [65157, 65158],
    1573: [65159, 65160],
    1574: [65161, 65162, 65163, 65164],
    1575: [65165, 65166],
    1576: [65167, 65168, 65169, 65170],
    1577: [65171, 65172],
    1578: [65173, 65174, 65175, 65176],
    1579: [65177, 65178, 65179, 65180],
    1580: [65181, 65182, 65183, 65184],
    1581: [65185, 65186, 65187, 65188],
    1582: [65189, 65190, 65191, 65192],
    1583: [65193, 65194],
    1584: [65195, 65196],
    1585: [65197, 65198],
    1586: [65199, 65200],
    1587: [65201, 65202, 65203, 65204],
    1588: [65205, 65206, 65207, 65208],
    1589: [65209, 65210, 65211, 65212],
    1590: [65213, 65214, 65215, 65216],
    1591: [65217, 65218, 65219, 65220],
    1592: [65221, 65222, 65223, 65224],
    1593: [65225, 65226, 65227, 65228],
    1594: [65229, 65230, 65231, 65232],
    1601: [65233, 65234, 65235, 65236],
    1602: [65237, 65238, 65239, 65240],
    1603: [65241, 65242, 65243, 65244],
    1604: [65245, 65246, 65247, 65248],
    1605: [65249, 65250, 65251, 65252],
    1606: [65253, 65254, 65255, 65256],
    1607: [65257, 65258, 65259, 65260],
    1608: [65261, 65262],
    1609: [65263, 65264, 64488, 64489],
    1610: [65265, 65266, 65267, 65268],
    1649: [64336, 64337],
    1655: [64477],
    1657: [64358, 64359, 64360, 64361],
    1658: [64350, 64351, 64352, 64353],
    1659: [64338, 64339, 64340, 64341],
    1662: [64342, 64343, 64344, 64345],
    1663: [64354, 64355, 64356, 64357],
    1664: [64346, 64347, 64348, 64349],
    1667: [64374, 64375, 64376, 64377],
    1668: [64370, 64371, 64372, 64373],
    1670: [64378, 64379, 64380, 64381],
    1671: [64382, 64383, 64384, 64385],
    1672: [64392, 64393],
    1676: [64388, 64389],
    1677: [64386, 64387],
    1678: [64390, 64391],
    1681: [64396, 64397],
    1688: [64394, 64395],
    1700: [64362, 64363, 64364, 64365],
    1702: [64366, 64367, 64368, 64369],
    1705: [64398, 64399, 64400, 64401],
    1709: [64467, 64468, 64469, 64470],
    1711: [64402, 64403, 64404, 64405],
    1713: [64410, 64411, 64412, 64413],
    1715: [64406, 64407, 64408, 64409],
    1722: [64414, 64415],
    1723: [64416, 64417, 64418, 64419],
    1726: [64426, 64427, 64428, 64429],
    1728: [64420, 64421],
    1729: [64422, 64423, 64424, 64425],
    1733: [64480, 64481],
    1734: [64473, 64474],
    1735: [64471, 64472],
    1736: [64475, 64476],
    1737: [64482, 64483],
    1739: [64478, 64479],
    1740: [64508, 64509, 64510, 64511],
    1744: [64484, 64485, 64486, 64487],
    1746: [64430, 64431],
    1747: [64432, 64433]
  },
      n = {
    65247: {
      65154: 65269,
      65156: 65271,
      65160: 65273,
      65166: 65275
    },
    65248: {
      65154: 65270,
      65156: 65272,
      65160: 65274,
      65166: 65276
    },
    65165: {
      65247: {
        65248: {
          65258: 65010
        }
      }
    },
    1617: {
      1612: 64606,
      1613: 64607,
      1614: 64608,
      1615: 64609,
      1616: 64610
    }
  },
      r = {
    1612: 64606,
    1613: 64607,
    1614: 64608,
    1615: 64609,
    1616: 64610
  },
      i = [1570, 1571, 1573, 1575];
  t.__arabicParser__ = {};

  var a = t.__arabicParser__.isInArabicSubstitutionA = function (t) {
    return void 0 !== e[t.charCodeAt(0)];
  },
      o = t.__arabicParser__.isArabicLetter = function (t) {
    return "string" == typeof t && /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/.test(t);
  },
      s = t.__arabicParser__.isArabicEndLetter = function (t) {
    return o(t) && a(t) && e[t.charCodeAt(0)].length <= 2;
  },
      u = t.__arabicParser__.isArabicAlfLetter = function (t) {
    return o(t) && i.indexOf(t.charCodeAt(0)) >= 0;
  };

  t.__arabicParser__.arabicLetterHasIsolatedForm = function (t) {
    return o(t) && a(t) && e[t.charCodeAt(0)].length >= 1;
  };

  var c = t.__arabicParser__.arabicLetterHasFinalForm = function (t) {
    return o(t) && a(t) && e[t.charCodeAt(0)].length >= 2;
  };

  t.__arabicParser__.arabicLetterHasInitialForm = function (t) {
    return o(t) && a(t) && e[t.charCodeAt(0)].length >= 3;
  };

  var h = t.__arabicParser__.arabicLetterHasMedialForm = function (t) {
    return o(t) && a(t) && 4 == e[t.charCodeAt(0)].length;
  },
      l = t.__arabicParser__.resolveLigatures = function (t) {
    var e = 0,
        r = n,
        i = "",
        a = 0;

    for (e = 0; e < t.length; e += 1) void 0 !== r[t.charCodeAt(e)] ? (a++, "number" == typeof (r = r[t.charCodeAt(e)]) && (i += String.fromCharCode(r), r = n, a = 0), e === t.length - 1 && (r = n, i += t.charAt(e - (a - 1)), e -= a - 1, a = 0)) : (r = n, i += t.charAt(e - a), e -= a, a = 0);

    return i;
  };

  t.__arabicParser__.isArabicDiacritic = function (t) {
    return void 0 !== t && void 0 !== r[t.charCodeAt(0)];
  };

  var f = t.__arabicParser__.getCorrectForm = function (t, e, n) {
    return o(t) ? !1 === a(t) ? -1 : !c(t) || !o(e) && !o(n) || !o(n) && s(e) || s(t) && !o(e) || s(t) && u(e) || s(t) && s(e) ? 0 : h(t) && o(e) && !s(e) && o(n) && c(n) ? 3 : s(t) || !o(n) ? 1 : 2 : -1;
  },
      d = function (t) {
    var n = 0,
        r = 0,
        i = 0,
        a = "",
        s = "",
        u = "",
        c = (t = t || "").split("\\s+"),
        h = [];

    for (n = 0; n < c.length; n += 1) {
      for (h.push(""), r = 0; r < c[n].length; r += 1) a = c[n][r], s = c[n][r - 1], u = c[n][r + 1], o(a) ? (i = f(a, s, u), h[n] += -1 !== i ? String.fromCharCode(e[a.charCodeAt(0)][i]) : a) : h[n] += a;

      h[n] = l(h[n]);
    }

    return h.join(" ");
  },
      p = t.__arabicParser__.processArabic = t.processArabic = function () {
    var t,
        e = "string" == typeof arguments[0] ? arguments[0] : arguments[0].text,
        n = [];

    if (Array.isArray(e)) {
      var r = 0;

      for (n = [], r = 0; r < e.length; r += 1) Array.isArray(e[r]) ? n.push([d(e[r][0]), e[r][1], e[r][2]]) : n.push([d(e[r])]);

      t = n;
    } else t = d(e);

    return "string" == typeof arguments[0] ? t : (arguments[0].text = t, arguments[0]);
  };

  t.events.push(["preProcessText", p]);
}(g.API), g.API.autoPrint = function (t) {
  var e;

  switch ((t = t || {}).variant = t.variant || "non-conform", t.variant) {
    case "javascript":
      this.addJS("print({});");
      break;

    case "non-conform":
    default:
      this.internal.events.subscribe("postPutResources", function () {
        e = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/S /Named"), this.internal.out("/Type /Action"), this.internal.out("/N /Print"), this.internal.out(">>"), this.internal.out("endobj");
      }), this.internal.events.subscribe("putCatalog", function () {
        this.internal.out("/OpenAction " + e + " 0 R");
      });
  }

  return this;
},
/**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t) {
  var e = function () {
    var t = void 0;
    Object.defineProperty(this, "pdf", {
      get: function () {
        return t;
      },
      set: function (e) {
        t = e;
      }
    });
    var e = 150;
    Object.defineProperty(this, "width", {
      get: function () {
        return e;
      },
      set: function (t) {
        e = isNaN(t) || !1 === Number.isInteger(t) || t < 0 ? 150 : t, this.getContext("2d").pageWrapXEnabled && (this.getContext("2d").pageWrapX = e + 1);
      }
    });
    var n = 300;
    Object.defineProperty(this, "height", {
      get: function () {
        return n;
      },
      set: function (t) {
        n = isNaN(t) || !1 === Number.isInteger(t) || t < 0 ? 300 : t, this.getContext("2d").pageWrapYEnabled && (this.getContext("2d").pageWrapY = n + 1);
      }
    });
    var r = [];
    Object.defineProperty(this, "childNodes", {
      get: function () {
        return r;
      },
      set: function (t) {
        r = t;
      }
    });
    var i = {};
    Object.defineProperty(this, "style", {
      get: function () {
        return i;
      },
      set: function (t) {
        i = t;
      }
    }), Object.defineProperty(this, "parentNode", {});
  };

  e.prototype.getContext = function (t, e) {
    var n;
    if ("2d" !== (t = t || "2d")) return null;

    for (n in e) this.pdf.context2d.hasOwnProperty(n) && (this.pdf.context2d[n] = e[n]);

    return this.pdf.context2d._canvas = this, this.pdf.context2d;
  }, e.prototype.toDataURL = function () {
    throw new Error("toDataURL is not implemented.");
  }, t.events.push(["initialized", function () {
    this.canvas = new e(), this.canvas.pdf = this;
  }]);
}(g.API),
/**
 * @license
 * ====================================================================
 * Copyright (c) 2013 Youssef Beddad, youssef.beddad@gmail.com
 *               2013 Eduardo Menezes de Morais, eduardo.morais@usp.br
 *               2013 Lee Driscoll, https://github.com/lsdriscoll
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 James Hall, james@parall.ax
 *               2014 Diego Casorran, https://github.com/diegocr
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function (t) {
  var e = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },
      n = !1,
      r = function () {
    void 0 === this.internal.__cell__ && (this.internal.__cell__ = {}, this.internal.__cell__.padding = 3, this.internal.__cell__.headerFunction = void 0, this.internal.__cell__.margins = Object.assign({}, e), this.internal.__cell__.margins.width = this.getPageWidth(), i.call(this));
  },
      i = function () {
    this.internal.__cell__.lastCell = new a(), this.internal.__cell__.pages = 1;
  },
      a = function () {
    var t = arguments[0];
    Object.defineProperty(this, "x", {
      enumerable: !0,
      get: function () {
        return t;
      },
      set: function (e) {
        t = e;
      }
    });
    var e = arguments[1];
    Object.defineProperty(this, "y", {
      enumerable: !0,
      get: function () {
        return e;
      },
      set: function (t) {
        e = t;
      }
    });
    var n = arguments[2];
    Object.defineProperty(this, "width", {
      enumerable: !0,
      get: function () {
        return n;
      },
      set: function (t) {
        n = t;
      }
    });
    var r = arguments[3];
    Object.defineProperty(this, "height", {
      enumerable: !0,
      get: function () {
        return r;
      },
      set: function (t) {
        r = t;
      }
    });
    var i = arguments[4];
    Object.defineProperty(this, "text", {
      enumerable: !0,
      get: function () {
        return i;
      },
      set: function (t) {
        i = t;
      }
    });
    var a = arguments[5];
    Object.defineProperty(this, "lineNumber", {
      enumerable: !0,
      get: function () {
        return a;
      },
      set: function (t) {
        a = t;
      }
    });
    var o = arguments[6];
    return Object.defineProperty(this, "align", {
      enumerable: !0,
      get: function () {
        return o;
      },
      set: function (t) {
        o = t;
      }
    }), this;
  };

  a.prototype.clone = function () {
    return new a(this.x, this.y, this.width, this.height, this.text, this.lineNumber, this.align);
  }, a.prototype.toArray = function () {
    return [this.x, this.y, this.width, this.height, this.text, this.lineNumber, this.align];
  }, t.setHeaderFunction = function (t) {
    return r.call(this), this.internal.__cell__.headerFunction = "function" == typeof t ? t : void 0, this;
  }, t.getTextDimensions = function (t, e) {
    r.call(this);
    var n = (e = e || {}).fontSize || this.getFontSize(),
        i = e.font || this.getFont(),
        a = e.scaleFactor || this.internal.scaleFactor,
        o = 0,
        s = 0,
        u = 0;

    if (!Array.isArray(t) && "string" != typeof t) {
      if ("number" != typeof t) throw new Error("getTextDimensions expects text-parameter to be of type String or type Number or an Array of Strings.");
      t = String(t);
    }

    const c = e.maxWidth;
    c > 0 ? "string" == typeof t ? t = this.splitTextToSize(t, c) : "[object Array]" === Object.prototype.toString.call(t) && (t = this.splitTextToSize(t.join(" "), c)) : t = Array.isArray(t) ? t : [t];

    for (var h = 0; h < t.length; h++) o < (u = this.getStringUnitWidth(t[h], {
      font: i
    }) * n) && (o = u);

    return 0 !== o && (s = t.length), {
      w: o /= a,
      h: Math.max((s * n * this.getLineHeightFactor() - n * (this.getLineHeightFactor() - 1)) / a, 0)
    };
  }, t.cellAddPage = function () {
    r.call(this), this.addPage();
    var t = this.internal.__cell__.margins || e;
    return this.internal.__cell__.lastCell = new a(t.left, t.top, void 0, void 0), this.internal.__cell__.pages += 1, this;
  };

  var o = t.cell = function () {
    var t;
    t = arguments[0] instanceof a ? arguments[0] : new a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]), r.call(this);
    var i = this.internal.__cell__.lastCell,
        o = this.internal.__cell__.padding,
        s = this.internal.__cell__.margins || e,
        u = this.internal.__cell__.tableHeaderRow,
        c = this.internal.__cell__.printHeaders;
    return void 0 !== i.lineNumber && (i.lineNumber === t.lineNumber ? (t.x = (i.x || 0) + (i.width || 0), t.y = i.y || 0) : i.y + i.height + t.height + s.bottom > this.getPageHeight() ? (this.cellAddPage(), t.y = s.top, c && u && (this.printHeaderRow(t.lineNumber, !0), t.y += u[0].height)) : t.y = i.y + i.height || t.y), void 0 !== t.text[0] && (this.rect(t.x, t.y, t.width, t.height, !0 === n ? "FD" : void 0), "right" === t.align ? this.text(t.text, t.x + t.width - o, t.y + o, {
      align: "right",
      baseline: "top"
    }) : "center" === t.align ? this.text(t.text, t.x + t.width / 2, t.y + o, {
      align: "center",
      baseline: "top",
      maxWidth: t.width - o - o
    }) : this.text(t.text, t.x + o, t.y + o, {
      align: "left",
      baseline: "top",
      maxWidth: t.width - o - o
    })), this.internal.__cell__.lastCell = t, this;
  };

  t.table = function (t, n, u, c, h) {
    if (r.call(this), !u) throw new Error("No data for PDF table.");

    var l,
        f,
        d,
        p,
        g = [],
        m = [],
        v = [],
        b = {},
        y = {},
        w = [],
        N = [],
        L = (h = h || {}).autoSize || !1,
        x = !1 !== h.printHeaders,
        A = h.css && void 0 !== h.css["font-size"] ? 16 * h.css["font-size"] : h.fontSize || 12,
        _ = h.margins || Object.assign({
      width: this.getPageWidth()
    }, e),
        S = "number" == typeof h.padding ? h.padding : 3,
        P = h.headerBackgroundColor || "#c8c8c8";

    if (i.call(this), this.internal.__cell__.printHeaders = x, this.internal.__cell__.margins = _, this.internal.__cell__.table_font_size = A, this.internal.__cell__.padding = S, this.internal.__cell__.headerBackgroundColor = P, this.setFontSize(A), null == c) m = g = Object.keys(u[0]), v = g.map(function () {
      return "left";
    });else if (Array.isArray(c) && "object" == typeof c[0]) for (g = c.map(function (t) {
      return t.name;
    }), m = c.map(function (t) {
      return t.prompt || t.name || "";
    }), v = g.map(function (t) {
      return t.align || "left";
    }), l = 0; l < c.length; l += 1) y[c[l].name] = c[l].width * (19.049976 / 25.4);else Array.isArray(c) && "string" == typeof c[0] && (m = g = c, v = g.map(function () {
      return "left";
    }));
    if (L) for (l = 0; l < g.length; l += 1) {
      for (b[p = g[l]] = u.map(function (t) {
        return t[p];
      }), this.setFont(void 0, "bold"), w.push(this.getTextDimensions(m[l], {
        fontSize: this.internal.__cell__.table_font_size,
        scaleFactor: this.internal.scaleFactor
      }).w), f = b[p], this.setFont(void 0, "normal"), d = 0; d < f.length; d += 1) w.push(this.getTextDimensions(f[d], {
        fontSize: this.internal.__cell__.table_font_size,
        scaleFactor: this.internal.scaleFactor
      }).w);

      y[p] = Math.max.apply(null, w) + S + S, w = [];
    }

    if (x) {
      var k = {};

      for (l = 0; l < g.length; l += 1) k[g[l]] = {}, k[g[l]].text = m[l], k[g[l]].align = v[l];

      var F = s.call(this, k, y);
      N = g.map(function (e) {
        return new a(t, n, y[e], F, k[e].text, void 0, k[e].align);
      }), this.setTableHeaderRow(N), this.printHeaderRow(1, !1);
    }

    var I = c.reduce(function (t, e) {
      return t[e.name] = e.align, t;
    }, {});

    for (l = 0; l < u.length; l += 1) {
      var C = s.call(this, u[l], y);

      for (d = 0; d < g.length; d += 1) o.call(this, new a(t, n, y[g[d]], C, u[l][g[d]], l + 2, I[g[d]]));
    }

    return this.internal.__cell__.table_x = t, this.internal.__cell__.table_y = n, this;
  };

  var s = function (t, e) {
    var n = this.internal.__cell__.padding,
        r = this.internal.__cell__.table_font_size,
        i = this.internal.scaleFactor;
    return Object.keys(t).map(function (e) {
      return [e, t[e]];
    }).map(function (t) {
      var e = t[0],
          n = t[1];
      return "object" == typeof n ? [e, n.text] : [e, n];
    }).map(function (t) {
      var r = t[0],
          i = t[1];
      return this.splitTextToSize(i, e[r] - n - n);
    }, this).map(function (t) {
      return this.getLineHeightFactor() * t.length * r / i + n + n;
    }, this).reduce(function (t, e) {
      return Math.max(t, e);
    }, 0);
  };

  t.setTableHeaderRow = function (t) {
    r.call(this), this.internal.__cell__.tableHeaderRow = t;
  }, t.printHeaderRow = function (t, e) {
    if (r.call(this), !this.internal.__cell__.tableHeaderRow) throw new Error("Property tableHeaderRow does not exist.");
    var i;

    if (n = !0, "function" == typeof this.internal.__cell__.headerFunction) {
      var s = this.internal.__cell__.headerFunction(this, this.internal.__cell__.pages);

      this.internal.__cell__.lastCell = new a(s[0], s[1], s[2], s[3], void 0, -1);
    }

    this.setFont(void 0, "bold");

    for (var u = [], c = 0; c < this.internal.__cell__.tableHeaderRow.length; c += 1) i = this.internal.__cell__.tableHeaderRow[c].clone(), e && (i.y = this.internal.__cell__.margins.top || 0, u.push(i)), i.lineNumber = t, this.setFillColor(this.internal.__cell__.headerBackgroundColor), o.call(this, i);

    u.length > 0 && this.setTableHeaderRow(u), this.setFont(void 0, "normal"), n = !1;
  };
}(g.API), function (t) {
  var e,
      r,
      i,
      a,
      o,
      s,
      u,
      h,
      l,
      f = function (t) {
    return t = t || {}, this.isStrokeTransparent = t.isStrokeTransparent || !1, this.strokeOpacity = t.strokeOpacity || 1, this.strokeStyle = t.strokeStyle || "#000000", this.fillStyle = t.fillStyle || "#000000", this.isFillTransparent = t.isFillTransparent || !1, this.fillOpacity = t.fillOpacity || 1, this.font = t.font || "10px sans-serif", this.textBaseline = t.textBaseline || "alphabetic", this.textAlign = t.textAlign || "left", this.lineWidth = t.lineWidth || 1, this.lineJoin = t.lineJoin || "miter", this.lineCap = t.lineCap || "butt", this.path = t.path || [], this.transform = void 0 !== t.transform ? t.transform.clone() : new h(), this.globalCompositeOperation = t.globalCompositeOperation || "normal", this.globalAlpha = t.globalAlpha || 1, this.clip_path = t.clip_path || [], this.currentPoint = t.currentPoint || new s(), this.miterLimit = t.miterLimit || 10, this.lastPoint = t.lastPoint || new s(), this.ignoreClearRect = "boolean" != typeof t.ignoreClearRect || t.ignoreClearRect, this;
  };

  t.events.push(["initialized", function () {
    this.context2d = new d(this), e = this.internal.f2, r = this.internal.getCoordinateString, i = this.internal.getVerticalCoordinateString, a = this.internal.getHorizontalCoordinate, o = this.internal.getVerticalCoordinate, s = this.internal.Point, u = this.internal.Rectangle, h = this.internal.Matrix, l = new f();
  }]);

  var d = function (t) {
    Object.defineProperty(this, "canvas", {
      get: function () {
        return {
          parentNode: !1,
          style: !1
        };
      }
    });
    var e = t;
    Object.defineProperty(this, "pdf", {
      get: function () {
        return e;
      }
    });
    var n = !1;
    Object.defineProperty(this, "pageWrapXEnabled", {
      get: function () {
        return n;
      },
      set: function (t) {
        n = Boolean(t);
      }
    });
    var r = !1;
    Object.defineProperty(this, "pageWrapYEnabled", {
      get: function () {
        return r;
      },
      set: function (t) {
        r = Boolean(t);
      }
    });
    var i = 0;
    Object.defineProperty(this, "posX", {
      get: function () {
        return i;
      },
      set: function (t) {
        isNaN(t) || (i = t);
      }
    });
    var a = 0;
    Object.defineProperty(this, "posY", {
      get: function () {
        return a;
      },
      set: function (t) {
        isNaN(t) || (a = t);
      }
    });
    var o = !1;
    Object.defineProperty(this, "autoPaging", {
      get: function () {
        return o;
      },
      set: function (t) {
        o = Boolean(t);
      }
    });
    var s = 0;
    Object.defineProperty(this, "lastBreak", {
      get: function () {
        return s;
      },
      set: function (t) {
        s = t;
      }
    });
    var u = [];
    Object.defineProperty(this, "pageBreaks", {
      get: function () {
        return u;
      },
      set: function (t) {
        u = t;
      }
    }), Object.defineProperty(this, "ctx", {
      get: function () {
        return l;
      },
      set: function (t) {
        t instanceof f && (l = t);
      }
    }), Object.defineProperty(this, "path", {
      get: function () {
        return l.path;
      },
      set: function (t) {
        l.path = t;
      }
    });
    var c = [];
    Object.defineProperty(this, "ctxStack", {
      get: function () {
        return c;
      },
      set: function (t) {
        c = t;
      }
    }), Object.defineProperty(this, "fillStyle", {
      get: function () {
        return this.ctx.fillStyle;
      },
      set: function (t) {
        var e;
        e = p(t), this.ctx.fillStyle = e.style, this.ctx.isFillTransparent = 0 === e.a, this.ctx.fillOpacity = e.a, this.pdf.setFillColor(e.r, e.g, e.b, {
          a: e.a
        }), this.pdf.setTextColor(e.r, e.g, e.b, {
          a: e.a
        });
      }
    }), Object.defineProperty(this, "strokeStyle", {
      get: function () {
        return this.ctx.strokeStyle;
      },
      set: function (t) {
        var e = p(t);
        this.ctx.strokeStyle = e.style, this.ctx.isStrokeTransparent = 0 === e.a, this.ctx.strokeOpacity = e.a, 0 === e.a ? this.pdf.setDrawColor(255, 255, 255) : (e.a, this.pdf.setDrawColor(e.r, e.g, e.b));
      }
    }), Object.defineProperty(this, "lineCap", {
      get: function () {
        return this.ctx.lineCap;
      },
      set: function (t) {
        -1 !== ["butt", "round", "square"].indexOf(t) && (this.ctx.lineCap = t, this.pdf.setLineCap(t));
      }
    }), Object.defineProperty(this, "lineWidth", {
      get: function () {
        return this.ctx.lineWidth;
      },
      set: function (t) {
        isNaN(t) || (this.ctx.lineWidth = t, this.pdf.setLineWidth(t));
      }
    }), Object.defineProperty(this, "lineJoin", {
      get: function () {
        return this.ctx.lineJoin;
      },
      set: function (t) {
        -1 !== ["bevel", "round", "miter"].indexOf(t) && (this.ctx.lineJoin = t, this.pdf.setLineJoin(t));
      }
    }), Object.defineProperty(this, "miterLimit", {
      get: function () {
        return this.ctx.miterLimit;
      },
      set: function (t) {
        isNaN(t) || (this.ctx.miterLimit = t, this.pdf.setMiterLimit(t));
      }
    }), Object.defineProperty(this, "textBaseline", {
      get: function () {
        return this.ctx.textBaseline;
      },
      set: function (t) {
        this.ctx.textBaseline = t;
      }
    }), Object.defineProperty(this, "textAlign", {
      get: function () {
        return this.ctx.textAlign;
      },
      set: function (t) {
        -1 !== ["right", "end", "center", "left", "start"].indexOf(t) && (this.ctx.textAlign = t);
      }
    }), Object.defineProperty(this, "font", {
      get: function () {
        return this.ctx.font;
      },
      set: function (t) {
        var e;

        if (this.ctx.font = t, null !== (e = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i.exec(t))) {
          var n = e[1],
              r = (e[2], e[3]),
              i = e[4],
              a = (e[5], e[6]),
              o = /^([.\d]+)((?:%|in|[cem]m|ex|p[ctx]))$/i.exec(i)[2];
          i = "px" === o ? Math.floor(parseFloat(i) * this.pdf.internal.scaleFactor) : "em" === o ? Math.floor(parseFloat(i) * this.pdf.getFontSize()) : Math.floor(parseFloat(i) * this.pdf.internal.scaleFactor), this.pdf.setFontSize(i);
          var s = "";
          ("bold" === r || parseInt(r, 10) >= 700 || "bold" === n) && (s = "bold"), "italic" === n && (s += "italic"), 0 === s.length && (s = "normal");

          for (var u = "", c = a.replace(/"|'/g, "").split(/\s*,\s*/), h = {
            arial: "Helvetica",
            Arial: "Helvetica",
            verdana: "Helvetica",
            Verdana: "Helvetica",
            helvetica: "Helvetica",
            Helvetica: "Helvetica",
            "sans-serif": "Helvetica",
            fixed: "Courier",
            monospace: "Courier",
            terminal: "Courier",
            cursive: "Times",
            fantasy: "Times",
            serif: "Times"
          }, l = 0; l < c.length; l++) {
            if (void 0 !== this.pdf.internal.getFont(c[l], s, {
              noFallback: !0,
              disableWarning: !0
            })) {
              u = c[l];
              break;
            }

            if ("bolditalic" === s && void 0 !== this.pdf.internal.getFont(c[l], "bold", {
              noFallback: !0,
              disableWarning: !0
            })) u = c[l], s = "bold";else if (void 0 !== this.pdf.internal.getFont(c[l], "normal", {
              noFallback: !0,
              disableWarning: !0
            })) {
              u = c[l], s = "normal";
              break;
            }
          }

          if ("" === u) for (var f = 0; f < c.length; f++) if (h[c[f]]) {
            u = h[c[f]];
            break;
          }
          u = "" === u ? "Times" : u, this.pdf.setFont(u, s);
        }
      }
    }), Object.defineProperty(this, "globalCompositeOperation", {
      get: function () {
        return this.ctx.globalCompositeOperation;
      },
      set: function (t) {
        this.ctx.globalCompositeOperation = t;
      }
    }), Object.defineProperty(this, "globalAlpha", {
      get: function () {
        return this.ctx.globalAlpha;
      },
      set: function (t) {
        this.ctx.globalAlpha = t;
      }
    }), Object.defineProperty(this, "ignoreClearRect", {
      get: function () {
        return this.ctx.ignoreClearRect;
      },
      set: function (t) {
        this.ctx.ignoreClearRect = Boolean(t);
      }
    });
  };

  d.prototype.fill = function () {
    N.call(this, "fill", !1);
  }, d.prototype.stroke = function () {
    N.call(this, "stroke", !1);
  }, d.prototype.beginPath = function () {
    this.path = [{
      type: "begin"
    }];
  }, d.prototype.moveTo = function (t, e) {
    if (isNaN(t) || isNaN(e)) throw n.error("jsPDF.context2d.moveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.moveTo");
    var r = this.ctx.transform.applyToPoint(new s(t, e));
    this.path.push({
      type: "mt",
      x: r.x,
      y: r.y
    }), this.ctx.lastPoint = new s(t, e);
  }, d.prototype.closePath = function () {
    var t = new s(0, 0),
        e = 0;

    for (e = this.path.length - 1; -1 !== e; e--) if ("begin" === this.path[e].type && "object" == typeof this.path[e + 1] && "number" == typeof this.path[e + 1].x) {
      t = new s(this.path[e + 1].x, this.path[e + 1].y), this.path.push({
        type: "lt",
        x: t.x,
        y: t.y
      });
      break;
    }

    "object" == typeof this.path[e + 2] && "number" == typeof this.path[e + 2].x && this.path.push(JSON.parse(JSON.stringify(this.path[e + 2]))), this.path.push({
      type: "close"
    }), this.ctx.lastPoint = new s(t.x, t.y);
  }, d.prototype.lineTo = function (t, e) {
    if (isNaN(t) || isNaN(e)) throw n.error("jsPDF.context2d.lineTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.lineTo");
    var r = this.ctx.transform.applyToPoint(new s(t, e));
    this.path.push({
      type: "lt",
      x: r.x,
      y: r.y
    }), this.ctx.lastPoint = new s(r.x, r.y);
  }, d.prototype.clip = function () {
    this.ctx.clip_path = JSON.parse(JSON.stringify(this.path)), N.call(this, null, !0);
  }, d.prototype.quadraticCurveTo = function (t, e, r, i) {
    if (isNaN(r) || isNaN(i) || isNaN(t) || isNaN(e)) throw n.error("jsPDF.context2d.quadraticCurveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.quadraticCurveTo");
    var a = this.ctx.transform.applyToPoint(new s(r, i)),
        o = this.ctx.transform.applyToPoint(new s(t, e));
    this.path.push({
      type: "qct",
      x1: o.x,
      y1: o.y,
      x: a.x,
      y: a.y
    }), this.ctx.lastPoint = new s(a.x, a.y);
  }, d.prototype.bezierCurveTo = function (t, e, r, i, a, o) {
    if (isNaN(a) || isNaN(o) || isNaN(t) || isNaN(e) || isNaN(r) || isNaN(i)) throw n.error("jsPDF.context2d.bezierCurveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.bezierCurveTo");
    var u = this.ctx.transform.applyToPoint(new s(a, o)),
        c = this.ctx.transform.applyToPoint(new s(t, e)),
        h = this.ctx.transform.applyToPoint(new s(r, i));
    this.path.push({
      type: "bct",
      x1: c.x,
      y1: c.y,
      x2: h.x,
      y2: h.y,
      x: u.x,
      y: u.y
    }), this.ctx.lastPoint = new s(u.x, u.y);
  }, d.prototype.arc = function (t, e, r, i, a, o) {
    if (isNaN(t) || isNaN(e) || isNaN(r) || isNaN(i) || isNaN(a)) throw n.error("jsPDF.context2d.arc: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.arc");

    if (o = Boolean(o), !this.ctx.transform.isIdentity) {
      var u = this.ctx.transform.applyToPoint(new s(t, e));
      t = u.x, e = u.y;
      var c = this.ctx.transform.applyToPoint(new s(0, r)),
          h = this.ctx.transform.applyToPoint(new s(0, 0));
      r = Math.sqrt(Math.pow(c.x - h.x, 2) + Math.pow(c.y - h.y, 2));
    }

    Math.abs(a - i) >= 2 * Math.PI && (i = 0, a = 2 * Math.PI), this.path.push({
      type: "arc",
      x: t,
      y: e,
      radius: r,
      startAngle: i,
      endAngle: a,
      counterclockwise: o
    });
  }, d.prototype.arcTo = function (t, e, n, r, i) {
    throw new Error("arcTo not implemented.");
  }, d.prototype.rect = function (t, e, r, i) {
    if (isNaN(t) || isNaN(e) || isNaN(r) || isNaN(i)) throw n.error("jsPDF.context2d.rect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.rect");
    this.moveTo(t, e), this.lineTo(t + r, e), this.lineTo(t + r, e + i), this.lineTo(t, e + i), this.lineTo(t, e), this.lineTo(t + r, e), this.lineTo(t, e);
  }, d.prototype.fillRect = function (t, e, r, i) {
    if (isNaN(t) || isNaN(e) || isNaN(r) || isNaN(i)) throw n.error("jsPDF.context2d.fillRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.fillRect");

    if (!g.call(this)) {
      var a = {};
      "butt" !== this.lineCap && (a.lineCap = this.lineCap, this.lineCap = "butt"), "miter" !== this.lineJoin && (a.lineJoin = this.lineJoin, this.lineJoin = "miter"), this.beginPath(), this.rect(t, e, r, i), this.fill(), a.hasOwnProperty("lineCap") && (this.lineCap = a.lineCap), a.hasOwnProperty("lineJoin") && (this.lineJoin = a.lineJoin);
    }
  }, d.prototype.strokeRect = function (t, e, r, i) {
    if (isNaN(t) || isNaN(e) || isNaN(r) || isNaN(i)) throw n.error("jsPDF.context2d.strokeRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.strokeRect");
    m.call(this) || (this.beginPath(), this.rect(t, e, r, i), this.stroke());
  }, d.prototype.clearRect = function (t, e, r, i) {
    if (isNaN(t) || isNaN(e) || isNaN(r) || isNaN(i)) throw n.error("jsPDF.context2d.clearRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.clearRect");
    this.ignoreClearRect || (this.fillStyle = "#ffffff", this.fillRect(t, e, r, i));
  }, d.prototype.save = function (t) {
    t = "boolean" != typeof t || t;

    for (var e = this.pdf.internal.getCurrentPageInfo().pageNumber, n = 0; n < this.pdf.internal.getNumberOfPages(); n++) this.pdf.setPage(n + 1), this.pdf.internal.out("q");

    if (this.pdf.setPage(e), t) {
      this.ctx.fontSize = this.pdf.internal.getFontSize();
      var r = new f(this.ctx);
      this.ctxStack.push(this.ctx), this.ctx = r;
    }
  }, d.prototype.restore = function (t) {
    t = "boolean" != typeof t || t;

    for (var e = this.pdf.internal.getCurrentPageInfo().pageNumber, n = 0; n < this.pdf.internal.getNumberOfPages(); n++) this.pdf.setPage(n + 1), this.pdf.internal.out("Q");

    this.pdf.setPage(e), t && 0 !== this.ctxStack.length && (this.ctx = this.ctxStack.pop(), this.fillStyle = this.ctx.fillStyle, this.strokeStyle = this.ctx.strokeStyle, this.font = this.ctx.font, this.lineCap = this.ctx.lineCap, this.lineWidth = this.ctx.lineWidth, this.lineJoin = this.ctx.lineJoin);
  }, d.prototype.toDataURL = function () {
    throw new Error("toDataUrl not implemented.");
  };

  var p = function (t) {
    var e, n, r, i;
    if (!0 === t.isCanvasGradient && (t = t.getColor()), !t) return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      style: t
    };
    if (/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/.test(t)) e = 0, n = 0, r = 0, i = 0;else {
      var a = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(t);
      if (null !== a) e = parseInt(a[1]), n = parseInt(a[2]), r = parseInt(a[3]), i = 1;else if (null !== (a = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(t))) e = parseInt(a[1]), n = parseInt(a[2]), r = parseInt(a[3]), i = parseFloat(a[4]);else {
        if (i = 1, "string" == typeof t && "#" !== t.charAt(0)) {
          var o = new c(t);
          t = o.ok ? o.toHex() : "#000000";
        }

        4 === t.length ? (e = t.substring(1, 2), e += e, n = t.substring(2, 3), n += n, r = t.substring(3, 4), r += r) : (e = t.substring(1, 3), n = t.substring(3, 5), r = t.substring(5, 7)), e = parseInt(e, 16), n = parseInt(n, 16), r = parseInt(r, 16);
      }
    }
    return {
      r: e,
      g: n,
      b: r,
      a: i,
      style: t
    };
  },
      g = function () {
    return this.ctx.isFillTransparent || 0 == this.globalAlpha;
  },
      m = function () {
    return Boolean(this.ctx.isStrokeTransparent || 0 == this.globalAlpha);
  };

  d.prototype.fillText = function (t, e, r, i) {
    if (isNaN(e) || isNaN(r) || "string" != typeof t) throw n.error("jsPDF.context2d.fillText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.fillText");

    if (i = isNaN(i) ? void 0 : i, !g.call(this)) {
      r = x.call(this, r);
      var a = O(this.ctx.transform.rotation),
          o = this.ctx.transform.scaleX;
      k.call(this, {
        text: t,
        x: e,
        y: r,
        scale: o,
        angle: a,
        align: this.textAlign,
        maxWidth: i
      });
    }
  }, d.prototype.strokeText = function (t, e, r, i) {
    if (isNaN(e) || isNaN(r) || "string" != typeof t) throw n.error("jsPDF.context2d.strokeText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.strokeText");

    if (!m.call(this)) {
      i = isNaN(i) ? void 0 : i, r = x.call(this, r);
      var a = O(this.ctx.transform.rotation),
          o = this.ctx.transform.scaleX;
      k.call(this, {
        text: t,
        x: e,
        y: r,
        scale: o,
        renderingMode: "stroke",
        angle: a,
        align: this.textAlign,
        maxWidth: i
      });
    }
  }, d.prototype.measureText = function (t) {
    if ("string" != typeof t) throw n.error("jsPDF.context2d.measureText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.measureText");

    var e = this.pdf,
        r = this.pdf.internal.scaleFactor,
        i = e.internal.getFontSize(),
        a = e.getStringUnitWidth(t) * i / e.internal.scaleFactor,
        o = function (t) {
      var e = (t = t || {}).width || 0;
      return Object.defineProperty(this, "width", {
        get: function () {
          return e;
        }
      }), this;
    };

    return new o({
      width: a *= Math.round(96 * r / 72 * 1e4) / 1e4
    });
  }, d.prototype.scale = function (t, e) {
    if (isNaN(t) || isNaN(e)) throw n.error("jsPDF.context2d.scale: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.scale");
    var r = new h(t, 0, 0, e, 0, 0);
    this.ctx.transform = this.ctx.transform.multiply(r);
  }, d.prototype.rotate = function (t) {
    if (isNaN(t)) throw n.error("jsPDF.context2d.rotate: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.rotate");
    var e = new h(Math.cos(t), Math.sin(t), -Math.sin(t), Math.cos(t), 0, 0);
    this.ctx.transform = this.ctx.transform.multiply(e);
  }, d.prototype.translate = function (t, e) {
    if (isNaN(t) || isNaN(e)) throw n.error("jsPDF.context2d.translate: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.translate");
    var r = new h(1, 0, 0, 1, t, e);
    this.ctx.transform = this.ctx.transform.multiply(r);
  }, d.prototype.transform = function (t, e, r, i, a, o) {
    if (isNaN(t) || isNaN(e) || isNaN(r) || isNaN(i) || isNaN(a) || isNaN(o)) throw n.error("jsPDF.context2d.transform: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.transform");
    var s = new h(t, e, r, i, a, o);
    this.ctx.transform = this.ctx.transform.multiply(s);
  }, d.prototype.setTransform = function (t, e, n, r, i, a) {
    t = isNaN(t) ? 1 : t, e = isNaN(e) ? 0 : e, n = isNaN(n) ? 0 : n, r = isNaN(r) ? 1 : r, i = isNaN(i) ? 0 : i, a = isNaN(a) ? 0 : a, this.ctx.transform = new h(t, e, n, r, i, a);
  }, d.prototype.drawImage = function (t, e, n, r, i, a, o, s, c) {
    var l = this.pdf.getImageProperties(t),
        f = 1,
        d = 1,
        p = 1,
        g = 1;
    void 0 !== r && void 0 !== s && (p = s / r, g = c / i, f = l.width / r * s / r, d = l.height / i * c / i), void 0 === a && (a = e, o = n, e = 0, n = 0), void 0 !== r && void 0 === s && (s = r, c = i), void 0 === r && void 0 === s && (s = l.width, c = l.height);

    for (var m, b = this.ctx.transform.decompose(), N = O(b.rotate.shx), x = new h(), A = (x = (x = (x = x.multiply(b.translate)).multiply(b.skew)).multiply(b.scale)).applyToRectangle(new u(a - e * p, o - n * g, r * f, i * d)), _ = v.call(this, A), S = [], P = 0; P < _.length; P += 1) -1 === S.indexOf(_[P]) && S.push(_[P]);

    if (w(S), this.autoPaging) for (var k = S[0], F = S[S.length - 1], I = k; I < F + 1; I++) {
      if (this.pdf.setPage(I), 0 !== this.ctx.clip_path.length) {
        var C = this.path;
        m = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = y(m, this.posX, -1 * this.pdf.internal.pageSize.height * (I - 1) + this.posY), L.call(this, "fill", !0), this.path = C;
      }

      var j = JSON.parse(JSON.stringify(A));
      j = y([j], this.posX, -1 * this.pdf.internal.pageSize.height * (I - 1) + this.posY)[0], this.pdf.addImage(t, "JPEG", j.x, j.y, j.w, j.h, null, null, N);
    } else this.pdf.addImage(t, "JPEG", A.x, A.y, A.w, A.h, null, null, N);
  };

  var v = function (t, e, n) {
    var r = [];

    switch (e = e || this.pdf.internal.pageSize.width, n = n || this.pdf.internal.pageSize.height, t.type) {
      default:
      case "mt":
      case "lt":
        r.push(Math.floor((t.y + this.posY) / n) + 1);
        break;

      case "arc":
        r.push(Math.floor((t.y + this.posY - t.radius) / n) + 1), r.push(Math.floor((t.y + this.posY + t.radius) / n) + 1);
        break;

      case "qct":
        var i = M(this.ctx.lastPoint.x, this.ctx.lastPoint.y, t.x1, t.y1, t.x, t.y);
        r.push(Math.floor(i.y / n) + 1), r.push(Math.floor((i.y + i.h) / n) + 1);
        break;

      case "bct":
        var a = E(this.ctx.lastPoint.x, this.ctx.lastPoint.y, t.x1, t.y1, t.x2, t.y2, t.x, t.y);
        r.push(Math.floor(a.y / n) + 1), r.push(Math.floor((a.y + a.h) / n) + 1);
        break;

      case "rect":
        r.push(Math.floor((t.y + this.posY) / n) + 1), r.push(Math.floor((t.y + t.h + this.posY) / n) + 1);
    }

    for (var o = 0; o < r.length; o += 1) for (; this.pdf.internal.getNumberOfPages() < r[o];) b.call(this);

    return r;
  },
      b = function () {
    var t = this.fillStyle,
        e = this.strokeStyle,
        n = this.font,
        r = this.lineCap,
        i = this.lineWidth,
        a = this.lineJoin;
    this.pdf.addPage(), this.fillStyle = t, this.strokeStyle = e, this.font = n, this.lineCap = r, this.lineWidth = i, this.lineJoin = a;
  },
      y = function (t, e, n) {
    for (var r = 0; r < t.length; r++) switch (t[r].type) {
      case "bct":
        t[r].x2 += e, t[r].y2 += n;

      case "qct":
        t[r].x1 += e, t[r].y1 += n;

      case "mt":
      case "lt":
      case "arc":
      default:
        t[r].x += e, t[r].y += n;
    }

    return t;
  },
      w = function (t) {
    return t.sort(function (t, e) {
      return t - e;
    });
  },
      N = function (t, e) {
    for (var n, r, i = this.fillStyle, a = this.strokeStyle, o = this.lineCap, s = this.lineWidth, u = s * this.ctx.transform.scaleX, c = this.lineJoin, h = JSON.parse(JSON.stringify(this.path)), l = JSON.parse(JSON.stringify(this.path)), f = [], d = 0; d < l.length; d++) if (void 0 !== l[d].x) for (var p = v.call(this, l[d]), g = 0; g < p.length; g += 1) -1 === f.indexOf(p[g]) && f.push(p[g]);

    for (var m = 0; m < f.length; m++) for (; this.pdf.internal.getNumberOfPages() < f[m];) b.call(this);

    if (w(f), this.autoPaging) for (var N = f[0], x = f[f.length - 1], A = N; A < x + 1; A++) {
      if (this.pdf.setPage(A), this.fillStyle = i, this.strokeStyle = a, this.lineCap = o, this.lineWidth = u, this.lineJoin = c, 0 !== this.ctx.clip_path.length) {
        var _ = this.path;
        n = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = y(n, this.posX, -1 * this.pdf.internal.pageSize.height * (A - 1) + this.posY), L.call(this, t, !0), this.path = _;
      }

      r = JSON.parse(JSON.stringify(h)), this.path = y(r, this.posX, -1 * this.pdf.internal.pageSize.height * (A - 1) + this.posY), !1 !== e && 0 !== A || L.call(this, t, e), this.lineWidth = s;
    } else this.lineWidth = u, L.call(this, t, e), this.lineWidth = s;
    this.path = h;
  },
      L = function (t, e) {
    if (("stroke" !== t || e || !m.call(this)) && ("stroke" === t || e || !g.call(this))) {
      for (var n, r, i = [], a = this.path, o = 0; o < a.length; o++) {
        var s = a[o];

        switch (s.type) {
          case "begin":
            i.push({
              begin: !0
            });
            break;

          case "close":
            i.push({
              close: !0
            });
            break;

          case "mt":
            i.push({
              start: s,
              deltas: [],
              abs: []
            });
            break;

          case "lt":
            var u = i.length;
            if (!isNaN(a[o - 1].x) && (n = [s.x - a[o - 1].x, s.y - a[o - 1].y], u > 0)) for (; u >= 0; u--) if (!0 !== i[u - 1].close && !0 !== i[u - 1].begin) {
              i[u - 1].deltas.push(n), i[u - 1].abs.push(s);
              break;
            }
            break;

          case "bct":
            n = [s.x1 - a[o - 1].x, s.y1 - a[o - 1].y, s.x2 - a[o - 1].x, s.y2 - a[o - 1].y, s.x - a[o - 1].x, s.y - a[o - 1].y], i[i.length - 1].deltas.push(n);
            break;

          case "qct":
            var c = a[o - 1].x + 2 / 3 * (s.x1 - a[o - 1].x),
                h = a[o - 1].y + 2 / 3 * (s.y1 - a[o - 1].y),
                l = s.x + 2 / 3 * (s.x1 - s.x),
                f = s.y + 2 / 3 * (s.y1 - s.y),
                d = s.x,
                p = s.y;
            n = [c - a[o - 1].x, h - a[o - 1].y, l - a[o - 1].x, f - a[o - 1].y, d - a[o - 1].x, p - a[o - 1].y], i[i.length - 1].deltas.push(n);
            break;

          case "arc":
            i.push({
              deltas: [],
              abs: [],
              arc: !0
            }), Array.isArray(i[i.length - 1].abs) && i[i.length - 1].abs.push(s);
        }
      }

      r = e ? null : "stroke" === t ? "stroke" : "fill";

      for (var v = 0; v < i.length; v++) {
        if (i[v].arc) {
          for (var b = i[v].abs, y = 0; y < b.length; y++) {
            var w = b[y];
            "arc" === w.type ? A.call(this, w.x, w.y, w.radius, w.startAngle, w.endAngle, w.counterclockwise, void 0, e) : F.call(this, w.x, w.y);
          }

          _.call(this, r), this.pdf.internal.out("h");
        }

        if (!i[v].arc && !0 !== i[v].close && !0 !== i[v].begin) {
          var N = i[v].start.x,
              L = i[v].start.y;
          I.call(this, i[v].deltas, N, L);
        }
      }

      r && _.call(this, r), e && S.call(this);
    }
  },
      x = function (t) {
    var e = this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor,
        n = e * (this.pdf.internal.getLineHeightFactor() - 1);

    switch (this.ctx.textBaseline) {
      case "bottom":
        return t - n;

      case "top":
        return t + e - n;

      case "hanging":
        return t + e - 2 * n;

      case "middle":
        return t + e / 2 - n;

      case "ideographic":
        return t;

      case "alphabetic":
      default:
        return t;
    }
  };

  d.prototype.createLinearGradient = function () {
    var t = function () {};

    return t.colorStops = [], t.addColorStop = function (t, e) {
      this.colorStops.push([t, e]);
    }, t.getColor = function () {
      return 0 === this.colorStops.length ? "#000000" : this.colorStops[0][1];
    }, t.isCanvasGradient = !0, t;
  }, d.prototype.createPattern = function () {
    return this.createLinearGradient();
  }, d.prototype.createRadialGradient = function () {
    return this.createLinearGradient();
  };

  var A = function (t, e, n, r, i, a, o, s) {
    for (var u = j.call(this, n, r, i, a), c = 0; c < u.length; c++) {
      var h = u[c];
      0 === c && P.call(this, h.x1 + t, h.y1 + e), C.call(this, t, e, h.x2, h.y2, h.x3, h.y3, h.x4, h.y4);
    }

    s ? S.call(this) : _.call(this, o);
  },
      _ = function (t) {
    switch (t) {
      case "stroke":
        this.pdf.internal.out("S");
        break;

      case "fill":
        this.pdf.internal.out("f");
    }
  },
      S = function () {
    this.pdf.clip(), this.pdf.discardPath();
  },
      P = function (t, e) {
    this.pdf.internal.out(r(t) + " " + i(e) + " m");
  },
      k = function (t) {
    var e;

    switch (t.align) {
      case "right":
      case "end":
        e = "right";
        break;

      case "center":
        e = "center";
        break;

      case "left":
      case "start":
      default:
        e = "left";
    }

    var n = this.ctx.transform.applyToPoint(new s(t.x, t.y)),
        r = this.ctx.transform.decompose(),
        i = new h();
    i = (i = (i = i.multiply(r.translate)).multiply(r.skew)).multiply(r.scale);

    for (var a, o, c, l = this.pdf.getTextDimensions(t.text), f = this.ctx.transform.applyToRectangle(new u(t.x, t.y, l.w, l.h)), d = i.applyToRectangle(new u(t.x, t.y - l.h, l.w, l.h)), p = v.call(this, d), g = [], m = 0; m < p.length; m += 1) -1 === g.indexOf(p[m]) && g.push(p[m]);

    if (w(g), !0 === this.autoPaging) for (var b = g[0], N = g[g.length - 1], x = b; x < N + 1; x++) {
      if (this.pdf.setPage(x), 0 !== this.ctx.clip_path.length) {
        var A = this.path;
        a = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = y(a, this.posX, -1 * this.pdf.internal.pageSize.height * (x - 1) + this.posY), L.call(this, "fill", !0), this.path = A;
      }

      var _ = JSON.parse(JSON.stringify(f));

      _ = y([_], this.posX, -1 * this.pdf.internal.pageSize.height * (x - 1) + this.posY)[0], t.scale >= .01 && (o = this.pdf.internal.getFontSize(), this.pdf.setFontSize(o * t.scale), c = this.lineWidth, this.lineWidth = c * t.scale), this.pdf.text(t.text, _.x, _.y, {
        angle: t.angle,
        align: e,
        renderingMode: t.renderingMode,
        maxWidth: t.maxWidth
      }), t.scale >= .01 && (this.pdf.setFontSize(o), this.lineWidth = c);
    } else t.scale >= .01 && (o = this.pdf.internal.getFontSize(), this.pdf.setFontSize(o * t.scale), c = this.lineWidth, this.lineWidth = c * t.scale), this.pdf.text(t.text, n.x + this.posX, n.y + this.posY, {
      angle: t.angle,
      align: e,
      renderingMode: t.renderingMode,
      maxWidth: t.maxWidth
    }), t.scale >= .01 && (this.pdf.setFontSize(o), this.lineWidth = c);
  },
      F = function (t, e, n, a) {
    n = n || 0, a = a || 0, this.pdf.internal.out(r(t + n) + " " + i(e + a) + " l");
  },
      I = function (t, e, n) {
    return this.pdf.lines(t, e, n, null, null);
  },
      C = function (t, n, r, i, s, u, c, h) {
    this.pdf.internal.out([e(a(r + t)), e(o(i + n)), e(a(s + t)), e(o(u + n)), e(a(c + t)), e(o(h + n)), "c"].join(" "));
  },
      j = function (t, e, n, r) {
    for (var i = 2 * Math.PI, a = Math.PI / 2; e > n;) e -= i;

    var o = Math.abs(n - e);
    o < i && r && (o = i - o);

    for (var s = [], u = r ? -1 : 1, c = e; o > 1e-5;) {
      var h = c + u * Math.min(o, a);
      s.push(B.call(this, t, c, h)), o -= Math.abs(h - c), c = h;
    }

    return s;
  },
      B = function (t, e, n) {
    var r = (n - e) / 2,
        i = t * Math.cos(r),
        a = t * Math.sin(r),
        o = i,
        s = -a,
        u = o * o + s * s,
        c = u + o * i + s * a,
        h = 4 / 3 * (Math.sqrt(2 * u * c) - c) / (o * a - s * i),
        l = o - h * s,
        f = s + h * o,
        d = l,
        p = -f,
        g = r + e,
        m = Math.cos(g),
        v = Math.sin(g);
    return {
      x1: t * Math.cos(e),
      y1: t * Math.sin(e),
      x2: l * m - f * v,
      y2: l * v + f * m,
      x3: d * m - p * v,
      y3: d * v + p * m,
      x4: t * Math.cos(n),
      y4: t * Math.sin(n)
    };
  },
      O = function (t) {
    return 180 * t / Math.PI;
  },
      M = function (t, e, n, r, i, a) {
    var o = t + .5 * (n - t),
        s = e + .5 * (r - e),
        c = i + .5 * (n - i),
        h = a + .5 * (r - a),
        l = Math.min(t, i, o, c),
        f = Math.max(t, i, o, c),
        d = Math.min(e, a, s, h),
        p = Math.max(e, a, s, h);
    return new u(l, d, f - l, p - d);
  },
      E = function (t, e, n, r, i, a, o, s) {
    var c,
        h,
        l,
        f,
        d,
        p,
        g,
        m,
        v,
        b,
        y,
        w,
        N,
        L,
        x = n - t,
        A = r - e,
        _ = i - n,
        S = a - r,
        P = o - i,
        k = s - a;

    for (h = 0; h < 41; h++) v = (g = (l = t + (c = h / 40) * x) + c * ((d = n + c * _) - l)) + c * (d + c * (i + c * P - d) - g), b = (m = (f = e + c * A) + c * ((p = r + c * S) - f)) + c * (p + c * (a + c * k - p) - m), 0 == h ? (y = v, w = b, N = v, L = b) : (y = Math.min(y, v), w = Math.min(w, b), N = Math.max(N, v), L = Math.max(L, b));

    return new u(Math.round(y), Math.round(w), Math.round(N - y), Math.round(L - w));
  };
}(g.API);
/**
 * @license
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var lt = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29];

function ft() {
  var t = this;

  function e(t, e) {
    var n = 0;

    do {
      n |= 1 & t, t >>>= 1, n <<= 1;
    } while (--e > 0);

    return n >>> 1;
  }

  t.build_tree = function (n) {
    var r,
        i,
        a,
        o = t.dyn_tree,
        s = t.stat_desc.static_tree,
        u = t.stat_desc.elems,
        c = -1;

    for (n.heap_len = 0, n.heap_max = 573, r = 0; r < u; r++) 0 !== o[2 * r] ? (n.heap[++n.heap_len] = c = r, n.depth[r] = 0) : o[2 * r + 1] = 0;

    for (; n.heap_len < 2;) o[2 * (a = n.heap[++n.heap_len] = c < 2 ? ++c : 0)] = 1, n.depth[a] = 0, n.opt_len--, s && (n.static_len -= s[2 * a + 1]);

    for (t.max_code = c, r = Math.floor(n.heap_len / 2); r >= 1; r--) n.pqdownheap(o, r);

    a = u;

    do {
      r = n.heap[1], n.heap[1] = n.heap[n.heap_len--], n.pqdownheap(o, 1), i = n.heap[1], n.heap[--n.heap_max] = r, n.heap[--n.heap_max] = i, o[2 * a] = o[2 * r] + o[2 * i], n.depth[a] = Math.max(n.depth[r], n.depth[i]) + 1, o[2 * r + 1] = o[2 * i + 1] = a, n.heap[1] = a++, n.pqdownheap(o, 1);
    } while (n.heap_len >= 2);

    n.heap[--n.heap_max] = n.heap[1], function (e) {
      var n,
          r,
          i,
          a,
          o,
          s,
          u = t.dyn_tree,
          c = t.stat_desc.static_tree,
          h = t.stat_desc.extra_bits,
          l = t.stat_desc.extra_base,
          f = t.stat_desc.max_length,
          d = 0;

      for (a = 0; a <= 15; a++) e.bl_count[a] = 0;

      for (u[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < 573; n++) (a = u[2 * u[2 * (r = e.heap[n]) + 1] + 1] + 1) > f && (a = f, d++), u[2 * r + 1] = a, r > t.max_code || (e.bl_count[a]++, o = 0, r >= l && (o = h[r - l]), s = u[2 * r], e.opt_len += s * (a + o), c && (e.static_len += s * (c[2 * r + 1] + o)));

      if (0 !== d) {
        do {
          for (a = f - 1; 0 === e.bl_count[a];) a--;

          e.bl_count[a]--, e.bl_count[a + 1] += 2, e.bl_count[f]--, d -= 2;
        } while (d > 0);

        for (a = f; 0 !== a; a--) for (r = e.bl_count[a]; 0 !== r;) (i = e.heap[--n]) > t.max_code || (u[2 * i + 1] !== a && (e.opt_len += (a - u[2 * i + 1]) * u[2 * i], u[2 * i + 1] = a), r--);
      }
    }(n), function (t, n, r) {
      var i,
          a,
          o,
          s = [],
          u = 0;

      for (i = 1; i <= 15; i++) s[i] = u = u + r[i - 1] << 1;

      for (a = 0; a <= n; a++) 0 !== (o = t[2 * a + 1]) && (t[2 * a] = e(s[o]++, o));
    }(o, t.max_code, n.bl_count);
  };
}

function dt(t, e, n, r, i) {
  this.static_tree = t, this.extra_bits = e, this.extra_base = n, this.elems = r, this.max_length = i;
}

ft._length_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28], ft.base_length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0], ft.base_dist = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576], ft.d_code = function (t) {
  return t < 256 ? lt[t] : lt[256 + (t >>> 7)];
}, ft.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], ft.extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], ft.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], ft.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], dt.static_ltree = [12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8, 130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42, 8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8, 22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8, 222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113, 8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8, 69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8, 173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9, 51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9, 427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379, 9, 251, 9, 507, 9, 7, 9, 263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23, 9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9, 399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9, 223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7, 40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8, 99, 8, 227, 8], dt.static_dtree = [0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5, 25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5], dt.static_l_desc = new dt(dt.static_ltree, ft.extra_lbits, 257, 286, 15), dt.static_d_desc = new dt(dt.static_dtree, ft.extra_dbits, 0, 30, 15), dt.static_bl_desc = new dt(null, ft.extra_blbits, 0, 19, 7);

function pt(t, e, n, r, i) {
  this.good_length = t, this.max_lazy = e, this.nice_length = n, this.max_chain = r, this.func = i;
}

var gt,
    mt,
    vt,
    bt = [new pt(0, 0, 0, 0, 0), new pt(4, 4, 8, 4, 1), new pt(4, 5, 16, 8, 1), new pt(4, 6, 32, 32, 1), new pt(4, 4, 16, 16, 2), new pt(8, 16, 32, 32, 2), new pt(8, 16, 128, 128, 2), new pt(8, 32, 128, 256, 2), new pt(32, 128, 258, 1024, 2), new pt(32, 258, 258, 4096, 2)],
    yt = ["need dictionary", "stream end", "", "", "stream error", "data error", "", "buffer error", "", ""];

function wt(t, e, n, r) {
  var i = t[2 * e],
      a = t[2 * n];
  return i < a || i === a && r[e] <= r[n];
}

function Nt() {
  var t,
      e,
      n,
      r,
      i,
      a,
      o,
      s,
      u,
      c,
      h,
      l,
      f,
      d,
      p,
      g,
      m,
      v,
      b,
      y,
      w,
      N,
      L,
      x,
      A,
      _,
      S,
      P,
      k,
      F,
      I,
      C,
      j,
      B,
      O,
      M,
      E,
      q,
      R,
      T,
      D,
      U = this,
      z = new ft(),
      H = new ft(),
      W = new ft();

  function V() {
    var t;

    for (t = 0; t < 286; t++) I[2 * t] = 0;

    for (t = 0; t < 30; t++) C[2 * t] = 0;

    for (t = 0; t < 19; t++) j[2 * t] = 0;

    I[512] = 1, U.opt_len = U.static_len = 0, M = q = 0;
  }

  function G(t, e) {
    var n,
        r,
        i = -1,
        a = t[1],
        o = 0,
        s = 7,
        u = 4;

    for (0 === a && (s = 138, u = 3), t[2 * (e + 1) + 1] = 65535, n = 0; n <= e; n++) r = a, a = t[2 * (n + 1) + 1], ++o < s && r === a || (o < u ? j[2 * r] += o : 0 !== r ? (r !== i && j[2 * r]++, j[32]++) : o <= 10 ? j[34]++ : j[36]++, o = 0, i = r, 0 === a ? (s = 138, u = 3) : r === a ? (s = 6, u = 3) : (s = 7, u = 4));
  }

  function Y(t) {
    U.pending_buf[U.pending++] = t;
  }

  function J(t) {
    Y(255 & t), Y(t >>> 8 & 255);
  }

  function X(t, e) {
    var n,
        r = e;
    D > 16 - r ? (J(T |= (n = t) << D & 65535), T = n >>> 16 - D, D += r - 16) : (T |= t << D & 65535, D += r);
  }

  function K(t, e) {
    var n = 2 * t;
    X(65535 & e[n], 65535 & e[n + 1]);
  }

  function Z(t, e) {
    var n,
        r,
        i = -1,
        a = t[1],
        o = 0,
        s = 7,
        u = 4;

    for (0 === a && (s = 138, u = 3), n = 0; n <= e; n++) if (r = a, a = t[2 * (n + 1) + 1], !(++o < s && r === a)) {
      if (o < u) do {
        K(r, j);
      } while (0 != --o);else 0 !== r ? (r !== i && (K(r, j), o--), K(16, j), X(o - 3, 2)) : o <= 10 ? (K(17, j), X(o - 3, 3)) : (K(18, j), X(o - 11, 7));
      o = 0, i = r, 0 === a ? (s = 138, u = 3) : r === a ? (s = 6, u = 3) : (s = 7, u = 4);
    }
  }

  function $() {
    16 === D ? (J(T), T = 0, D = 0) : D >= 8 && (Y(255 & T), T >>>= 8, D -= 8);
  }

  function Q(t, e) {
    var n, r, i;

    if (U.pending_buf[E + 2 * M] = t >>> 8 & 255, U.pending_buf[E + 2 * M + 1] = 255 & t, U.pending_buf[B + M] = 255 & e, M++, 0 === t ? I[2 * e]++ : (q++, t--, I[2 * (ft._length_code[e] + 256 + 1)]++, C[2 * ft.d_code(t)]++), 0 == (8191 & M) && S > 2) {
      for (n = 8 * M, r = w - m, i = 0; i < 30; i++) n += C[2 * i] * (5 + ft.extra_dbits[i]);

      if (n >>>= 3, q < Math.floor(M / 2) && n < Math.floor(r / 2)) return !0;
    }

    return M === O - 1;
  }

  function tt(t, e) {
    var n,
        r,
        i,
        a,
        o = 0;
    if (0 !== M) do {
      n = U.pending_buf[E + 2 * o] << 8 & 65280 | 255 & U.pending_buf[E + 2 * o + 1], r = 255 & U.pending_buf[B + o], o++, 0 === n ? K(r, t) : (K((i = ft._length_code[r]) + 256 + 1, t), 0 !== (a = ft.extra_lbits[i]) && X(r -= ft.base_length[i], a), n--, K(i = ft.d_code(n), e), 0 !== (a = ft.extra_dbits[i]) && X(n -= ft.base_dist[i], a));
    } while (o < M);
    K(256, t), R = t[513];
  }

  function et() {
    D > 8 ? J(T) : D > 0 && Y(255 & T), T = 0, D = 0;
  }

  function nt(t, e, n) {
    X(0 + (n ? 1 : 0), 3), function (t, e, n) {
      et(), R = 8, n && (J(e), J(~e)), U.pending_buf.set(s.subarray(t, t + e), U.pending), U.pending += e;
    }(t, e, !0);
  }

  function rt(t, e, n) {
    var r,
        i,
        a = 0;
    S > 0 ? (z.build_tree(U), H.build_tree(U), a = function () {
      var t;

      for (G(I, z.max_code), G(C, H.max_code), W.build_tree(U), t = 18; t >= 3 && 0 === j[2 * ft.bl_order[t] + 1]; t--);

      return U.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
    }(), r = U.opt_len + 3 + 7 >>> 3, (i = U.static_len + 3 + 7 >>> 3) <= r && (r = i)) : r = i = e + 5, e + 4 <= r && -1 !== t ? nt(t, e, n) : i === r ? (X(2 + (n ? 1 : 0), 3), tt(dt.static_ltree, dt.static_dtree)) : (X(4 + (n ? 1 : 0), 3), function (t, e, n) {
      var r;

      for (X(t - 257, 5), X(e - 1, 5), X(n - 4, 4), r = 0; r < n; r++) X(j[2 * ft.bl_order[r] + 1], 3);

      Z(I, t - 1), Z(C, e - 1);
    }(z.max_code + 1, H.max_code + 1, a + 1), tt(I, C)), V(), n && et();
  }

  function it(e) {
    rt(m >= 0 ? m : -1, w - m, e), m = w, t.flush_pending();
  }

  function at() {
    var e, n, r, a;

    do {
      if (0 === (a = u - L - w) && 0 === w && 0 === L) a = i;else if (-1 === a) a--;else if (w >= i + i - 262) {
        s.set(s.subarray(i, i + i), 0), N -= i, w -= i, m -= i, r = e = f;

        do {
          n = 65535 & h[--r], h[r] = n >= i ? n - i : 0;
        } while (0 != --e);

        r = e = i;

        do {
          n = 65535 & c[--r], c[r] = n >= i ? n - i : 0;
        } while (0 != --e);

        a += i;
      }
      if (0 === t.avail_in) return;
      e = t.read_buf(s, w + L, a), (L += e) >= 3 && (l = ((l = 255 & s[w]) << g ^ 255 & s[w + 1]) & p);
    } while (L < 262 && 0 !== t.avail_in);
  }

  function ot(t) {
    var e,
        n,
        r = A,
        a = w,
        u = x,
        h = w > i - 262 ? w - (i - 262) : 0,
        l = F,
        f = o,
        d = w + 258,
        p = s[a + u - 1],
        g = s[a + u];
    x >= k && (r >>= 2), l > L && (l = L);

    do {
      if (s[(e = t) + u] === g && s[e + u - 1] === p && s[e] === s[a] && s[++e] === s[a + 1]) {
        a += 2, e++;

        do {} while (s[++a] === s[++e] && s[++a] === s[++e] && s[++a] === s[++e] && s[++a] === s[++e] && s[++a] === s[++e] && s[++a] === s[++e] && s[++a] === s[++e] && s[++a] === s[++e] && a < d);

        if (n = 258 - (d - a), a = d - 258, n > u) {
          if (N = t, u = n, n >= l) break;
          p = s[a + u - 1], g = s[a + u];
        }
      }
    } while ((t = 65535 & c[t & f]) > h && 0 != --r);

    return u <= L ? u : L;
  }

  function st(t) {
    return t.total_in = t.total_out = 0, t.msg = null, U.pending = 0, U.pending_out = 0, e = 113, r = 0, z.dyn_tree = I, z.stat_desc = dt.static_l_desc, H.dyn_tree = C, H.stat_desc = dt.static_d_desc, W.dyn_tree = j, W.stat_desc = dt.static_bl_desc, T = 0, D = 0, R = 8, V(), function () {
      var t;

      for (u = 2 * i, h[f - 1] = 0, t = 0; t < f - 1; t++) h[t] = 0;

      _ = bt[S].max_lazy, k = bt[S].good_length, F = bt[S].nice_length, A = bt[S].max_chain, w = 0, m = 0, L = 0, v = x = 2, y = 0, l = 0;
    }(), 0;
  }

  U.depth = [], U.bl_count = [], U.heap = [], I = [], C = [], j = [], U.pqdownheap = function (t, e) {
    for (var n = U.heap, r = n[e], i = e << 1; i <= U.heap_len && (i < U.heap_len && wt(t, n[i + 1], n[i], U.depth) && i++, !wt(t, r, n[i], U.depth));) n[e] = n[i], e = i, i <<= 1;

    n[e] = r;
  }, U.deflateInit = function (t, e, r, u, l, m) {
    return u || (u = 8), l || (l = 8), m || (m = 0), t.msg = null, -1 === e && (e = 6), l < 1 || l > 9 || 8 !== u || r < 9 || r > 15 || e < 0 || e > 9 || m < 0 || m > 2 ? -2 : (t.dstate = U, o = (i = 1 << (a = r)) - 1, p = (f = 1 << (d = l + 7)) - 1, g = Math.floor((d + 3 - 1) / 3), s = new Uint8Array(2 * i), c = [], h = [], O = 1 << l + 6, U.pending_buf = new Uint8Array(4 * O), n = 4 * O, E = Math.floor(O / 2), B = 3 * O, S = e, P = m, st(t));
  }, U.deflateEnd = function () {
    return 42 !== e && 113 !== e && 666 !== e ? -2 : (U.pending_buf = null, h = null, c = null, s = null, U.dstate = null, 113 === e ? -3 : 0);
  }, U.deflateParams = function (t, e, n) {
    var r = 0;
    return -1 === e && (e = 6), e < 0 || e > 9 || n < 0 || n > 2 ? -2 : (bt[S].func !== bt[e].func && 0 !== t.total_in && (r = t.deflate(1)), S !== e && (_ = bt[S = e].max_lazy, k = bt[S].good_length, F = bt[S].nice_length, A = bt[S].max_chain), P = n, r);
  }, U.deflateSetDictionary = function (t, n, r) {
    var a,
        u = r,
        f = 0;
    if (!n || 42 !== e) return -2;
    if (u < 3) return 0;

    for (u > i - 262 && (f = r - (u = i - 262)), s.set(n.subarray(f, f + u), 0), w = u, m = u, l = ((l = 255 & s[0]) << g ^ 255 & s[1]) & p, a = 0; a <= u - 3; a++) l = (l << g ^ 255 & s[a + 2]) & p, c[a & o] = h[l], h[l] = a;

    return 0;
  }, U.deflate = function (u, d) {
    var A, k, F, I, C, j;
    if (d > 4 || d < 0) return -2;
    if (!u.next_out || !u.next_in && 0 !== u.avail_in || 666 === e && 4 !== d) return u.msg = yt[4], -2;
    if (0 === u.avail_out) return u.msg = yt[7], -5;

    if (t = u, I = r, r = d, 42 === e && (k = 8 + (a - 8 << 4) << 8, (F = (S - 1 & 255) >> 1) > 3 && (F = 3), k |= F << 6, 0 !== w && (k |= 32), e = 113, Y((j = k += 31 - k % 31) >> 8 & 255), Y(255 & j)), 0 !== U.pending) {
      if (t.flush_pending(), 0 === t.avail_out) return r = -1, 0;
    } else if (0 === t.avail_in && d <= I && 4 !== d) return t.msg = yt[7], -5;

    if (666 === e && 0 !== t.avail_in) return u.msg = yt[7], -5;

    if (0 !== t.avail_in || 0 !== L || 0 !== d && 666 !== e) {
      switch (C = -1, bt[S].func) {
        case 0:
          C = function (e) {
            var r,
                a = 65535;

            for (a > n - 5 && (a = n - 5);;) {
              if (L <= 1) {
                if (at(), 0 === L && 0 === e) return 0;
                if (0 === L) break;
              }

              if (w += L, L = 0, r = m + a, (0 === w || w >= r) && (L = w - r, w = r, it(!1), 0 === t.avail_out)) return 0;
              if (w - m >= i - 262 && (it(!1), 0 === t.avail_out)) return 0;
            }

            return it(4 === e), 0 === t.avail_out ? 4 === e ? 2 : 0 : 4 === e ? 3 : 1;
          }(d);

          break;

        case 1:
          C = function (e) {
            for (var n, r = 0;;) {
              if (L < 262) {
                if (at(), L < 262 && 0 === e) return 0;
                if (0 === L) break;
              }

              if (L >= 3 && (l = (l << g ^ 255 & s[w + 2]) & p, r = 65535 & h[l], c[w & o] = h[l], h[l] = w), 0 !== r && (w - r & 65535) <= i - 262 && 2 !== P && (v = ot(r)), v >= 3) {
                if (n = Q(w - N, v - 3), L -= v, v <= _ && L >= 3) {
                  v--;

                  do {
                    w++, l = (l << g ^ 255 & s[w + 2]) & p, r = 65535 & h[l], c[w & o] = h[l], h[l] = w;
                  } while (0 != --v);

                  w++;
                } else w += v, v = 0, l = ((l = 255 & s[w]) << g ^ 255 & s[w + 1]) & p;
              } else n = Q(0, 255 & s[w]), L--, w++;
              if (n && (it(!1), 0 === t.avail_out)) return 0;
            }

            return it(4 === e), 0 === t.avail_out ? 4 === e ? 2 : 0 : 4 === e ? 3 : 1;
          }(d);

          break;

        case 2:
          C = function (e) {
            for (var n, r, a = 0;;) {
              if (L < 262) {
                if (at(), L < 262 && 0 === e) return 0;
                if (0 === L) break;
              }

              if (L >= 3 && (l = (l << g ^ 255 & s[w + 2]) & p, a = 65535 & h[l], c[w & o] = h[l], h[l] = w), x = v, b = N, v = 2, 0 !== a && x < _ && (w - a & 65535) <= i - 262 && (2 !== P && (v = ot(a)), v <= 5 && (1 === P || 3 === v && w - N > 4096) && (v = 2)), x >= 3 && v <= x) {
                r = w + L - 3, n = Q(w - 1 - b, x - 3), L -= x - 1, x -= 2;

                do {
                  ++w <= r && (l = (l << g ^ 255 & s[w + 2]) & p, a = 65535 & h[l], c[w & o] = h[l], h[l] = w);
                } while (0 != --x);

                if (y = 0, v = 2, w++, n && (it(!1), 0 === t.avail_out)) return 0;
              } else if (0 !== y) {
                if ((n = Q(0, 255 & s[w - 1])) && it(!1), w++, L--, 0 === t.avail_out) return 0;
              } else y = 1, w++, L--;
            }

            return 0 !== y && (n = Q(0, 255 & s[w - 1]), y = 0), it(4 === e), 0 === t.avail_out ? 4 === e ? 2 : 0 : 4 === e ? 3 : 1;
          }(d);

      }

      if (2 !== C && 3 !== C || (e = 666), 0 === C || 2 === C) return 0 === t.avail_out && (r = -1), 0;

      if (1 === C) {
        if (1 === d) X(2, 3), K(256, dt.static_ltree), $(), 1 + R + 10 - D < 9 && (X(2, 3), K(256, dt.static_ltree), $()), R = 7;else if (nt(0, 0, !1), 3 === d) for (A = 0; A < f; A++) h[A] = 0;
        if (t.flush_pending(), 0 === t.avail_out) return r = -1, 0;
      }
    }

    return 4 !== d ? 0 : 1;
  };
}

function Lt() {
  this.next_in_index = 0, this.next_out_index = 0, this.avail_in = 0, this.total_in = 0, this.avail_out = 0, this.total_out = 0;
}

function xt(t) {
  var e = new Lt(),
      n = new Uint8Array(512),
      r = t ? t.level : -1;
  void 0 === r && (r = -1), e.deflateInit(r), e.next_out = n, this.append = function (t, r) {
    var i,
        a = [],
        o = 0,
        s = 0,
        u = 0;

    if (t.length) {
      e.next_in_index = 0, e.next_in = t, e.avail_in = t.length;

      do {
        if (e.next_out_index = 0, e.avail_out = 512, 0 !== e.deflate(0)) throw new Error("deflating: " + e.msg);
        e.next_out_index && (512 === e.next_out_index ? a.push(new Uint8Array(n)) : a.push(new Uint8Array(n.subarray(0, e.next_out_index)))), u += e.next_out_index, r && e.next_in_index > 0 && e.next_in_index !== o && (r(e.next_in_index), o = e.next_in_index);
      } while (e.avail_in > 0 || 0 === e.avail_out);

      return i = new Uint8Array(u), a.forEach(function (t) {
        i.set(t, s), s += t.length;
      }), i;
    }
  }, this.flush = function () {
    var t,
        r,
        i = [],
        a = 0,
        o = 0;

    do {
      if (e.next_out_index = 0, e.avail_out = 512, 1 !== (t = e.deflate(4)) && 0 !== t) throw new Error("deflating: " + e.msg);
      512 - e.avail_out > 0 && i.push(new Uint8Array(n.subarray(0, e.next_out_index))), o += e.next_out_index;
    } while (e.avail_in > 0 || 0 === e.avail_out);

    return e.deflateEnd(), r = new Uint8Array(o), i.forEach(function (t) {
      r.set(t, a), a += t.length;
    }), r;
  };
}
/**
 * @license
 * jsPDF filters PlugIn
 * Copyright (c) 2014 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */


Lt.prototype = {
  deflateInit: function (t, e) {
    return this.dstate = new Nt(), e || (e = 15), this.dstate.deflateInit(this, t, e);
  },
  deflate: function (t) {
    return this.dstate ? this.dstate.deflate(this, t) : -2;
  },
  deflateEnd: function () {
    if (!this.dstate) return -2;
    var t = this.dstate.deflateEnd();
    return this.dstate = null, t;
  },
  deflateParams: function (t, e) {
    return this.dstate ? this.dstate.deflateParams(this, t, e) : -2;
  },
  deflateSetDictionary: function (t, e) {
    return this.dstate ? this.dstate.deflateSetDictionary(this, t, e) : -2;
  },
  read_buf: function (t, e, n) {
    var r = this.avail_in;
    return r > n && (r = n), 0 === r ? 0 : (this.avail_in -= r, t.set(this.next_in.subarray(this.next_in_index, this.next_in_index + r), e), this.next_in_index += r, this.total_in += r, r);
  },
  flush_pending: function () {
    var t = this.dstate.pending;
    t > this.avail_out && (t = this.avail_out), 0 !== t && (this.next_out.set(this.dstate.pending_buf.subarray(this.dstate.pending_out, this.dstate.pending_out + t), this.next_out_index), this.next_out_index += t, this.dstate.pending_out += t, this.total_out += t, this.avail_out -= t, this.dstate.pending -= t, 0 === this.dstate.pending && (this.dstate.pending_out = 0));
  }
}, function (t) {
  var e = function (t) {
    var e, n, r, i, a, o, s, u, c, h;

    for (/[^\x00-\xFF]/.test(t), n = [], r = 0, i = (t += e = "\0\0\0\0".slice(t.length % 4 || 4)).length; i > r; r += 4) 0 !== (a = (t.charCodeAt(r) << 24) + (t.charCodeAt(r + 1) << 16) + (t.charCodeAt(r + 2) << 8) + t.charCodeAt(r + 3)) ? (o = (a = ((a = ((a = ((a = (a - (h = a % 85)) / 85) - (c = a % 85)) / 85) - (u = a % 85)) / 85) - (s = a % 85)) / 85) % 85, n.push(o + 33, s + 33, u + 33, c + 33, h + 33)) : n.push(122);

    return function (t, e) {
      for (var n = e; n > 0; n--) t.pop();
    }(n, e.length), String.fromCharCode.apply(String, n) + "~>";
  },
      n = function (t) {
    var e,
        n,
        r,
        i,
        a,
        o = String,
        s = "length",
        u = 255,
        c = "charCodeAt",
        h = "slice",
        l = "replace";

    for (t[h](-2), t = t[h](0, -2)[l](/\s/g, "")[l]("z", "!!!!!"), r = [], i = 0, a = (t += e = "uuuuu"[h](t[s] % 5 || 5))[s]; a > i; i += 5) n = 52200625 * (t[c](i) - 33) + 614125 * (t[c](i + 1) - 33) + 7225 * (t[c](i + 2) - 33) + 85 * (t[c](i + 3) - 33) + (t[c](i + 4) - 33), r.push(u & n >> 24, u & n >> 16, u & n >> 8, u & n);

    return function (t, e) {
      for (var n = e; n > 0; n--) t.pop();
    }(r, e[s]), o.fromCharCode.apply(o, r);
  },
      r = function (t) {
    var e = new RegExp(/^([0-9A-Fa-f]{2})+$/);
    if (-1 !== (t = t.replace(/\s/g, "")).indexOf(">") && (t = t.substr(0, t.indexOf(">"))), t.length % 2 && (t += "0"), !1 === e.test(t)) return "";

    for (var n = "", r = 0; r < t.length; r += 2) n += String.fromCharCode("0x" + (t[r] + t[r + 1]));

    return n;
  },
      i = function (e) {
    for (var n, r, i, a, o, s = [], u = e.length; u--;) s[u] = e.charCodeAt(u);

    return n = t.adler32cs.from(e), e = (r = new xt(6)).append(new Uint8Array(s)), i = e, a = r.flush(), (o = new Uint8Array(i.byteLength + a.byteLength)).set(new Uint8Array(i), 0), o.set(new Uint8Array(a), i.byteLength), e = o, (s = new Uint8Array(e.byteLength + 6)).set(new Uint8Array([120, 156])), s.set(e, 2), s.set(new Uint8Array([255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255]), e.byteLength + 2), e = s.reduce(function (t, e) {
      return t + String.fromCharCode(e);
    }, "");
  };

  t.processDataByFilters = function (t, a) {
    var o = 0,
        s = t || "",
        u = [];

    for ("string" == typeof (a = a || []) && (a = [a]), o = 0; o < a.length; o += 1) switch (a[o]) {
      case "ASCII85Decode":
      case "/ASCII85Decode":
        s = n(s), u.push("/ASCII85Encode");
        break;

      case "ASCII85Encode":
      case "/ASCII85Encode":
        s = e(s), u.push("/ASCII85Decode");
        break;

      case "ASCIIHexDecode":
      case "/ASCIIHexDecode":
        s = r(s), u.push("/ASCIIHexEncode");
        break;

      case "ASCIIHexEncode":
      case "/ASCIIHexEncode":
        s = s.split("").map(function (t) {
          return ("0" + t.charCodeAt().toString(16)).slice(-2);
        }).join("") + ">", u.push("/ASCIIHexDecode");
        break;

      case "FlateEncode":
      case "/FlateEncode":
        s = i(s), u.push("/FlateDecode");
        break;

      default:
        throw new Error('The filter: "' + a[o] + '" is not implemented');
    }

    return {
      data: s,
      reverseChain: u.reverse().join(" ")
    };
  };
}(g.API),
/**
 * @license
 * jsPDF fileloading PlugIn
 * Copyright (c) 2018 Aras Abbasi (aras.abbasi@gmail.com)
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t) {
  t.loadFile = function (t, e, n) {
    return function (t, e, n) {
      e = !1 !== e, n = "function" == typeof n ? n : function () {};
      var r = void 0;

      try {
        r = function (t, e, n) {
          var r = new XMLHttpRequest(),
              i = 0,
              a = function (t) {
            var e = t.length,
                n = [],
                r = String.fromCharCode;

            for (i = 0; i < e; i += 1) n.push(r(255 & t.charCodeAt(i)));

            return n.join("");
          };

          if (r.open("GET", t, !e), r.overrideMimeType("text/plain; charset=x-user-defined"), !1 === e && (r.onload = function () {
            200 === r.status ? n(a(this.responseText)) : n(void 0);
          }), r.send(null), e && 200 === r.status) return a(r.responseText);
        }(t, e, n);
      } catch (t) {}

      return r;
    }(t, e, n);
  }, t.loadImageFile = t.loadFile;
}(g.API),
/**
 * @license
 * Copyright (c) 2018 Erik Koopmans
 * Released under the MIT License.
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (e) {
  function n() {
    return (t.html2canvas ? Promise.resolve(t.html2canvas) : require("_bundle_loader")(require.resolve("html2canvas"))).catch(function (t) {
      return Promise.reject(new Error("Could not load dompurify: " + t));
    }).then(function (t) {
      return t.default ? t.default : t;
    });
  }

  function r() {
    return (t.DOMPurify ? Promise.resolve(t.DOMPurify) : require("_bundle_loader")(require.resolve("dompurify"))).catch(function (t) {
      return Promise.reject(new Error("Could not load dompurify: " + t));
    }).then(function (t) {
      return t.default ? t.default : t;
    });
  }

  var i = function (t) {
    var e = typeof t;
    return "undefined" === e ? "undefined" : "string" === e || t instanceof String ? "string" : "number" === e || t instanceof Number ? "number" : "function" === e || t instanceof Function ? "function" : t && t.constructor === Array ? "array" : t && 1 === t.nodeType ? "element" : "object" === e ? "object" : "unknown";
  },
      a = function (t, e) {
    var n = document.createElement(t);

    for (var r in e.className && (n.className = e.className), e.innerHTML && e.dompurify && (n.innerHTML = e.dompurify.sanitize(e.innerHTML)), e.style) n.style[r] = e.style[r];

    return n;
  },
      o = function (t, e) {
    for (var n = 3 === t.nodeType ? document.createTextNode(t.nodeValue) : t.cloneNode(!1), r = t.firstChild; r; r = r.nextSibling) !0 !== e && 1 === r.nodeType && "SCRIPT" === r.nodeName || n.appendChild(o(r, e));

    return 1 === t.nodeType && ("CANVAS" === t.nodeName ? (n.width = t.width, n.height = t.height, n.getContext("2d").drawImage(t, 0, 0)) : "TEXTAREA" !== t.nodeName && "SELECT" !== t.nodeName || (n.value = t.value), n.addEventListener("load", function () {
      n.scrollTop = t.scrollTop, n.scrollLeft = t.scrollLeft;
    }, !0)), n;
  },
      s = function t(e) {
    var n = Object.assign(t.convert(Promise.resolve()), JSON.parse(JSON.stringify(t.template))),
        r = t.convert(Promise.resolve(), n);
    return r = (r = r.setProgress(1, t, 1, [t])).set(e);
  };

  (s.prototype = Object.create(Promise.prototype)).constructor = s, s.convert = function (t, e) {
    return t.__proto__ = e || s.prototype, t;
  }, s.template = {
    prop: {
      src: null,
      container: null,
      overlay: null,
      canvas: null,
      img: null,
      pdf: null,
      pageSize: null,
      callback: function () {}
    },
    progress: {
      val: 0,
      state: null,
      n: 0,
      stack: []
    },
    opt: {
      filename: "file.pdf",
      margin: [0, 0, 0, 0],
      enableLinks: !0,
      x: 0,
      y: 0,
      html2canvas: {},
      jsPDF: {},
      backgroundColor: "transparent"
    }
  }, s.prototype.from = function (t, e) {
    return this.then(function () {
      switch (e = e || function (t) {
        switch (i(t)) {
          case "string":
            return "string";

          case "element":
            return "canvas" === t.nodeName.toLowerCase ? "canvas" : "element";

          default:
            return "unknown";
        }
      }(t)) {
        case "string":
          return this.then(r).then(function (e) {
            return this.set({
              src: a("div", {
                innerHTML: t,
                dompurify: e
              })
            });
          });

        case "element":
          return this.set({
            src: t
          });

        case "canvas":
          return this.set({
            canvas: t
          });

        case "img":
          return this.set({
            img: t
          });

        default:
          return this.error("Unknown source type.");
      }
    });
  }, s.prototype.to = function (t) {
    switch (t) {
      case "container":
        return this.toContainer();

      case "canvas":
        return this.toCanvas();

      case "img":
        return this.toImg();

      case "pdf":
        return this.toPdf();

      default:
        return this.error("Invalid target.");
    }
  }, s.prototype.toContainer = function () {
    return this.thenList([function () {
      return this.prop.src || this.error("Cannot duplicate - no source HTML.");
    }, function () {
      return this.prop.pageSize || this.setPageSize();
    }]).then(function () {
      var t = {
        position: "relative",
        display: "inline-block",
        width: Math.max(this.prop.src.clientWidth, this.prop.src.scrollWidth, this.prop.src.offsetWidth) + "px",
        left: 0,
        right: 0,
        top: 0,
        margin: "auto",
        backgroundColor: this.opt.backgroundColor
      },
          e = o(this.prop.src, this.opt.html2canvas.javascriptEnabled);
      "BODY" === e.tagName && (t.height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) + "px"), this.prop.overlay = a("div", {
        className: "html2pdf__overlay",
        style: {
          position: "fixed",
          overflow: "hidden",
          zIndex: 1e3,
          left: "-100000px",
          right: 0,
          bottom: 0,
          top: 0
        }
      }), this.prop.container = a("div", {
        className: "html2pdf__container",
        style: t
      }), this.prop.container.appendChild(e), this.prop.container.firstChild.appendChild(a("div", {
        style: {
          clear: "both",
          border: "0 none transparent",
          margin: 0,
          padding: 0,
          height: 0
        }
      })), this.prop.container.style.float = "none", this.prop.overlay.appendChild(this.prop.container), document.body.appendChild(this.prop.overlay), this.prop.container.firstChild.style.position = "relative", this.prop.container.height = Math.max(this.prop.container.firstChild.clientHeight, this.prop.container.firstChild.scrollHeight, this.prop.container.firstChild.offsetHeight) + "px";
    });
  }, s.prototype.toCanvas = function () {
    var t = [function () {
      return document.body.contains(this.prop.container) || this.toContainer();
    }];
    return this.thenList(t).then(n).then(function (t) {
      var e = Object.assign({}, this.opt.html2canvas);
      return delete e.onrendered, t(this.prop.container, e);
    }).then(function (t) {
      (this.opt.html2canvas.onrendered || function () {})(t), this.prop.canvas = t, document.body.removeChild(this.prop.overlay);
    });
  }, s.prototype.toContext2d = function () {
    var t = [function () {
      return document.body.contains(this.prop.container) || this.toContainer();
    }];
    return this.thenList(t).then(n).then(function (t) {
      var e = this.opt.jsPDF,
          n = Object.assign({
        async: !0,
        allowTaint: !0,
        scale: 1,
        scrollX: this.opt.scrollX || 0,
        scrollY: this.opt.scrollY || 0,
        backgroundColor: "#ffffff",
        imageTimeout: 15e3,
        logging: !0,
        proxy: null,
        removeContainer: !0,
        foreignObjectRendering: !1,
        useCORS: !1
      }, this.opt.html2canvas);
      return delete n.onrendered, e.context2d.autoPaging = !0, e.context2d.posX = this.opt.x, e.context2d.posY = this.opt.y, n.windowHeight = n.windowHeight || 0, n.windowHeight = 0 == n.windowHeight ? Math.max(this.prop.container.clientHeight, this.prop.container.scrollHeight, this.prop.container.offsetHeight) : n.windowHeight, t(this.prop.container, n);
    }).then(function (t) {
      (this.opt.html2canvas.onrendered || function () {})(t), this.prop.canvas = t, document.body.removeChild(this.prop.overlay);
    });
  }, s.prototype.toImg = function () {
    return this.thenList([function () {
      return this.prop.canvas || this.toCanvas();
    }]).then(function () {
      var t = this.prop.canvas.toDataURL("image/" + this.opt.image.type, this.opt.image.quality);
      this.prop.img = document.createElement("img"), this.prop.img.src = t;
    });
  }, s.prototype.toPdf = function () {
    return this.thenList([function () {
      return this.toContext2d();
    }]).then(function () {
      this.prop.pdf = this.prop.pdf || this.opt.jsPDF;
    });
  }, s.prototype.output = function (t, e, n) {
    return "img" === (n = n || "pdf").toLowerCase() || "image" === n.toLowerCase() ? this.outputImg(t, e) : this.outputPdf(t, e);
  }, s.prototype.outputPdf = function (t, e) {
    return this.thenList([function () {
      return this.prop.pdf || this.toPdf();
    }]).then(function () {
      return this.prop.pdf.output(t, e);
    });
  }, s.prototype.outputImg = function (t) {
    return this.thenList([function () {
      return this.prop.img || this.toImg();
    }]).then(function () {
      switch (t) {
        case void 0:
        case "img":
          return this.prop.img;

        case "datauristring":
        case "dataurlstring":
          return this.prop.img.src;

        case "datauri":
        case "dataurl":
          return document.location.href = this.prop.img.src;

        default:
          throw 'Image output type "' + t + '" is not supported.';
      }
    });
  }, s.prototype.save = function (t) {
    return this.thenList([function () {
      return this.prop.pdf || this.toPdf();
    }]).set(t ? {
      filename: t
    } : null).then(function () {
      this.prop.pdf.save(this.opt.filename);
    });
  }, s.prototype.doCallback = function () {
    return this.thenList([function () {
      return this.prop.pdf || this.toPdf();
    }]).then(function () {
      this.prop.callback(this.prop.pdf);
    });
  }, s.prototype.set = function (t) {
    if ("object" !== i(t)) return this;
    var e = Object.keys(t || {}).map(function (e) {
      if (e in s.template.prop) return function () {
        this.prop[e] = t[e];
      };

      switch (e) {
        case "margin":
          return this.setMargin.bind(this, t.margin);

        case "jsPDF":
          return function () {
            return this.opt.jsPDF = t.jsPDF, this.setPageSize();
          };

        case "pageSize":
          return this.setPageSize.bind(this, t.pageSize);

        default:
          return function () {
            this.opt[e] = t[e];
          };
      }
    }, this);
    return this.then(function () {
      return this.thenList(e);
    });
  }, s.prototype.get = function (t, e) {
    return this.then(function () {
      var n = t in s.template.prop ? this.prop[t] : this.opt[t];
      return e ? e(n) : n;
    });
  }, s.prototype.setMargin = function (t) {
    return this.then(function () {
      switch (i(t)) {
        case "number":
          t = [t, t, t, t];

        case "array":
          if (2 === t.length && (t = [t[0], t[1], t[0], t[1]]), 4 === t.length) break;

        default:
          return this.error("Invalid margin array.");
      }

      this.opt.margin = t;
    }).then(this.setPageSize);
  }, s.prototype.setPageSize = function (t) {
    function e(t, e) {
      return Math.floor(t * e / 72 * 96);
    }

    return this.then(function () {
      (t = t || g.getPageSize(this.opt.jsPDF)).hasOwnProperty("inner") || (t.inner = {
        width: t.width - this.opt.margin[1] - this.opt.margin[3],
        height: t.height - this.opt.margin[0] - this.opt.margin[2]
      }, t.inner.px = {
        width: e(t.inner.width, t.k),
        height: e(t.inner.height, t.k)
      }, t.inner.ratio = t.inner.height / t.inner.width), this.prop.pageSize = t;
    });
  }, s.prototype.setProgress = function (t, e, n, r) {
    return null != t && (this.progress.val = t), null != e && (this.progress.state = e), null != n && (this.progress.n = n), null != r && (this.progress.stack = r), this.progress.ratio = this.progress.val / this.progress.state, this;
  }, s.prototype.updateProgress = function (t, e, n, r) {
    return this.setProgress(t ? this.progress.val + t : null, e || null, n ? this.progress.n + n : null, r ? this.progress.stack.concat(r) : null);
  }, s.prototype.then = function (t, e) {
    var n = this;
    return this.thenCore(t, e, function (t, e) {
      return n.updateProgress(null, null, 1, [t]), Promise.prototype.then.call(this, function (e) {
        return n.updateProgress(null, t), e;
      }).then(t, e).then(function (t) {
        return n.updateProgress(1), t;
      });
    });
  }, s.prototype.thenCore = function (t, e, n) {
    n = n || Promise.prototype.then;
    t && (t = t.bind(this)), e && (e = e.bind(this));
    var r = -1 !== Promise.toString().indexOf("[native code]") && "Promise" === Promise.name ? this : s.convert(Object.assign({}, this), Promise.prototype),
        i = n.call(r, t, e);
    return s.convert(i, this.__proto__);
  }, s.prototype.thenExternal = function (t, e) {
    return Promise.prototype.then.call(this, t, e);
  }, s.prototype.thenList = function (t) {
    var e = this;
    return t.forEach(function (t) {
      e = e.thenCore(t);
    }), e;
  }, s.prototype.catch = function (t) {
    t && (t = t.bind(this));
    var e = Promise.prototype.catch.call(this, t);
    return s.convert(e, this);
  }, s.prototype.catchExternal = function (t) {
    return Promise.prototype.catch.call(this, t);
  }, s.prototype.error = function (t) {
    return this.then(function () {
      throw new Error(t);
    });
  }, s.prototype.using = s.prototype.set, s.prototype.saveAs = s.prototype.save, s.prototype.export = s.prototype.output, s.prototype.run = s.prototype.then, g.getPageSize = function (t, e, n) {
    if ("object" == typeof t) {
      var r = t;
      t = r.orientation, e = r.unit || e, n = r.format || n;
    }

    e = e || "mm", n = n || "a4", t = ("" + (t || "P")).toLowerCase();
    var i,
        a = ("" + n).toLowerCase(),
        o = {
      a0: [2383.94, 3370.39],
      a1: [1683.78, 2383.94],
      a2: [1190.55, 1683.78],
      a3: [841.89, 1190.55],
      a4: [595.28, 841.89],
      a5: [419.53, 595.28],
      a6: [297.64, 419.53],
      a7: [209.76, 297.64],
      a8: [147.4, 209.76],
      a9: [104.88, 147.4],
      a10: [73.7, 104.88],
      b0: [2834.65, 4008.19],
      b1: [2004.09, 2834.65],
      b2: [1417.32, 2004.09],
      b3: [1000.63, 1417.32],
      b4: [708.66, 1000.63],
      b5: [498.9, 708.66],
      b6: [354.33, 498.9],
      b7: [249.45, 354.33],
      b8: [175.75, 249.45],
      b9: [124.72, 175.75],
      b10: [87.87, 124.72],
      c0: [2599.37, 3676.54],
      c1: [1836.85, 2599.37],
      c2: [1298.27, 1836.85],
      c3: [918.43, 1298.27],
      c4: [649.13, 918.43],
      c5: [459.21, 649.13],
      c6: [323.15, 459.21],
      c7: [229.61, 323.15],
      c8: [161.57, 229.61],
      c9: [113.39, 161.57],
      c10: [79.37, 113.39],
      dl: [311.81, 623.62],
      letter: [612, 792],
      "government-letter": [576, 756],
      legal: [612, 1008],
      "junior-legal": [576, 360],
      ledger: [1224, 792],
      tabloid: [792, 1224],
      "credit-card": [153, 243]
    };

    switch (e) {
      case "pt":
        i = 1;
        break;

      case "mm":
        i = 72 / 25.4;
        break;

      case "cm":
        i = 72 / 2.54;
        break;

      case "in":
        i = 72;
        break;

      case "px":
        i = .75;
        break;

      case "pc":
      case "em":
        i = 12;
        break;

      case "ex":
        i = 6;
        break;

      default:
        throw "Invalid unit: " + e;
    }

    var s,
        u = 0,
        c = 0;
    if (o.hasOwnProperty(a)) u = o[a][1] / i, c = o[a][0] / i;else try {
      u = n[1], c = n[0];
    } catch (t) {
      throw new Error("Invalid format: " + n);
    }
    if ("p" === t || "portrait" === t) t = "p", c > u && (s = c, c = u, u = s);else {
      if ("l" !== t && "landscape" !== t) throw "Invalid orientation: " + t;
      t = "l", u > c && (s = c, c = u, u = s);
    }
    return {
      width: c,
      height: u,
      unit: e,
      k: i,
      orientation: t
    };
  }, e.html = function (t, e) {
    (e = e || {}).callback = e.callback || function () {}, e.html2canvas = e.html2canvas || {}, e.html2canvas.canvas = e.html2canvas.canvas || this.canvas, e.jsPDF = e.jsPDF || this;
    var n = new s(e);
    return e.worker ? n : n.from(t).doCallback();
  };
}(g.API), g.API.addJS = function (t) {
  return vt = t, this.internal.events.subscribe("postPutResources", function () {
    gt = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/Names [(EmbeddedJS) " + (gt + 1) + " 0 R]"), this.internal.out(">>"), this.internal.out("endobj"), mt = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/S /JavaScript"), this.internal.out("/JS (" + vt + ")"), this.internal.out(">>"), this.internal.out("endobj");
  }), this.internal.events.subscribe("putCatalog", function () {
    void 0 !== gt && void 0 !== mt && this.internal.out("/Names <</JavaScript " + gt + " 0 R>>");
  }), this;
},
/**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t) {
  var e;
  t.events.push(["postPutResources", function () {
    var t = this,
        n = /^(\d+) 0 obj$/;
    if (this.outline.root.children.length > 0) for (var r = t.outline.render().split(/\r\n/), i = 0; i < r.length; i++) {
      var a = r[i],
          o = n.exec(a);

      if (null != o) {
        var s = o[1];
        t.internal.newObjectDeferredBegin(s, !1);
      }

      t.internal.write(a);
    }

    if (this.outline.createNamedDestinations) {
      var u = this.internal.pages.length,
          c = [];

      for (i = 0; i < u; i++) {
        var h = t.internal.newObject();
        c.push(h);
        var l = t.internal.getPageInfo(i + 1);
        t.internal.write("<< /D[" + l.objId + " 0 R /XYZ null null null]>> endobj");
      }

      var f = t.internal.newObject();
      t.internal.write("<< /Names [ ");

      for (i = 0; i < c.length; i++) t.internal.write("(page_" + (i + 1) + ")" + c[i] + " 0 R");

      t.internal.write(" ] >>", "endobj"), e = t.internal.newObject(), t.internal.write("<< /Dests " + f + " 0 R"), t.internal.write(">>", "endobj");
    }
  }]), t.events.push(["putCatalog", function () {
    this.outline.root.children.length > 0 && (this.internal.write("/Outlines", this.outline.makeRef(this.outline.root)), this.outline.createNamedDestinations && this.internal.write("/Names " + e + " 0 R"));
  }]), t.events.push(["initialized", function () {
    var t = this;
    t.outline = {
      createNamedDestinations: !1,
      root: {
        children: []
      }
    }, t.outline.add = function (t, e, n) {
      var r = {
        title: e,
        options: n,
        children: []
      };
      return null == t && (t = this.root), t.children.push(r), r;
    }, t.outline.render = function () {
      return this.ctx = {}, this.ctx.val = "", this.ctx.pdf = t, this.genIds_r(this.root), this.renderRoot(this.root), this.renderItems(this.root), this.ctx.val;
    }, t.outline.genIds_r = function (e) {
      e.id = t.internal.newObjectDeferred();

      for (var n = 0; n < e.children.length; n++) this.genIds_r(e.children[n]);
    }, t.outline.renderRoot = function (t) {
      this.objStart(t), this.line("/Type /Outlines"), t.children.length > 0 && (this.line("/First " + this.makeRef(t.children[0])), this.line("/Last " + this.makeRef(t.children[t.children.length - 1]))), this.line("/Count " + this.count_r({
        count: 0
      }, t)), this.objEnd();
    }, t.outline.renderItems = function (e) {
      for (var n = this.ctx.pdf.internal.getVerticalCoordinateString, r = 0; r < e.children.length; r++) {
        var i = e.children[r];
        this.objStart(i), this.line("/Title " + this.makeString(i.title)), this.line("/Parent " + this.makeRef(e)), r > 0 && this.line("/Prev " + this.makeRef(e.children[r - 1])), r < e.children.length - 1 && this.line("/Next " + this.makeRef(e.children[r + 1])), i.children.length > 0 && (this.line("/First " + this.makeRef(i.children[0])), this.line("/Last " + this.makeRef(i.children[i.children.length - 1])));
        var a = this.count = this.count_r({
          count: 0
        }, i);

        if (a > 0 && this.line("/Count " + a), i.options && i.options.pageNumber) {
          var o = t.internal.getPageInfo(i.options.pageNumber);
          this.line("/Dest [" + o.objId + " 0 R /XYZ 0 " + n(0) + " 0]");
        }

        this.objEnd();
      }

      for (var s = 0; s < e.children.length; s++) this.renderItems(e.children[s]);
    }, t.outline.line = function (t) {
      this.ctx.val += t + "\r\n";
    }, t.outline.makeRef = function (t) {
      return t.id + " 0 R";
    }, t.outline.makeString = function (e) {
      return "(" + t.internal.pdfEscape(e) + ")";
    }, t.outline.objStart = function (t) {
      this.ctx.val += "\r\n" + t.id + " 0 obj\r\n<<\r\n";
    }, t.outline.objEnd = function () {
      this.ctx.val += ">> \r\nendobj\r\n";
    }, t.outline.count_r = function (t, e) {
      for (var n = 0; n < e.children.length; n++) t.count++, this.count_r(t, e.children[n]);

      return t.count;
    };
  }]);
}(g.API),
/**
 * @license
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t) {
  var e = [192, 193, 194, 195, 196, 197, 198, 199];

  t.processJPEG = function (t, n, r, i, a, o) {
    var s,
        u = this.decode.DCT_DECODE,
        c = null;

    if ("string" == typeof t || this.__addimage__.isArrayBuffer(t) || this.__addimage__.isArrayBufferView(t)) {
      switch (t = a || t, t = this.__addimage__.isArrayBuffer(t) ? new Uint8Array(t) : t, (s = function (t) {
        for (var n, r = 256 * t.charCodeAt(4) + t.charCodeAt(5), i = t.length, a = {
          width: 0,
          height: 0,
          numcomponents: 1
        }, o = 4; o < i; o += 2) {
          if (o += r, -1 !== e.indexOf(t.charCodeAt(o + 1))) {
            n = 256 * t.charCodeAt(o + 5) + t.charCodeAt(o + 6), a = {
              width: 256 * t.charCodeAt(o + 7) + t.charCodeAt(o + 8),
              height: n,
              numcomponents: t.charCodeAt(o + 9)
            };
            break;
          }

          r = 256 * t.charCodeAt(o + 2) + t.charCodeAt(o + 3);
        }

        return a;
      }(t = this.__addimage__.isArrayBufferView(t) ? this.__addimage__.arrayBufferToBinaryString(t) : t)).numcomponents) {
        case 1:
          o = this.color_spaces.DEVICE_GRAY;
          break;

        case 4:
          o = this.color_spaces.DEVICE_CMYK;
          break;

        case 3:
          o = this.color_spaces.DEVICE_RGB;
      }

      c = {
        data: t,
        width: s.width,
        height: s.height,
        colorSpace: o,
        bitsPerComponent: 8,
        filter: u,
        index: n,
        alias: r
      };
    }

    return c;
  };
}(g.API);
/**
 * @license
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *               Chris G Jones <cjones@mozilla.com>
 *               Shaon Barman <shaon.barman@gmail.com>
 *               Vivien Nicolas <21@vingtetun.org>
 *               Justin D'Arcangelo <justindarc@gmail.com>
 *               Yury Delendik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var At,
    _t,
    St,
    Pt,
    kt,
    Ft = function () {
  function t() {
    this.pos = 0, this.bufferLength = 0, this.eof = !1, this.buffer = null;
  }

  return t.prototype = {
    ensureBuffer: function (t) {
      var e = this.buffer,
          n = e ? e.byteLength : 0;
      if (t < n) return e;

      for (var r = 512; r < t;) r <<= 1;

      for (var i = new Uint8Array(r), a = 0; a < n; ++a) i[a] = e[a];

      return this.buffer = i;
    },
    getByte: function () {
      for (var t = this.pos; this.bufferLength <= t;) {
        if (this.eof) return null;
        this.readBlock();
      }

      return this.buffer[this.pos++];
    },
    getBytes: function (t) {
      var e = this.pos;

      if (t) {
        this.ensureBuffer(e + t);

        for (var n = e + t; !this.eof && this.bufferLength < n;) this.readBlock();

        var r = this.bufferLength;
        n > r && (n = r);
      } else {
        for (; !this.eof;) this.readBlock();

        n = this.bufferLength;
      }

      return this.pos = n, this.buffer.subarray(e, n);
    },
    lookChar: function () {
      for (var t = this.pos; this.bufferLength <= t;) {
        if (this.eof) return null;
        this.readBlock();
      }

      return String.fromCharCode(this.buffer[this.pos]);
    },
    getChar: function () {
      for (var t = this.pos; this.bufferLength <= t;) {
        if (this.eof) return null;
        this.readBlock();
      }

      return String.fromCharCode(this.buffer[this.pos++]);
    },
    makeSubStream: function (t, e, n) {
      for (var r = t + e; this.bufferLength <= r && !this.eof;) this.readBlock();

      return new Stream(this.buffer, t, e, n);
    },
    skip: function (t) {
      t || (t = 1), this.pos += t;
    },
    reset: function () {
      this.pos = 0;
    }
  }, t;
}(),
    It = ("undefined" != typeof self && self || "undefined" != typeof window && window || "undefined" != typeof global && global || Function('return typeof this === "object" && this.content')() || Function("return this")()).FlateStream = function () {
  if ("undefined" != typeof Uint32Array) {
    var t = new Uint32Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
        e = new Uint32Array([3, 4, 5, 6, 7, 8, 9, 10, 65547, 65549, 65551, 65553, 131091, 131095, 131099, 131103, 196643, 196651, 196659, 196667, 262211, 262227, 262243, 262259, 327811, 327843, 327875, 327907, 258, 258, 258]),
        n = new Uint32Array([1, 2, 3, 4, 65541, 65543, 131081, 131085, 196625, 196633, 262177, 262193, 327745, 327777, 393345, 393409, 459009, 459137, 524801, 525057, 590849, 591361, 657409, 658433, 724993, 727041, 794625, 798721, 868353, 876545]),
        r = [new Uint32Array([459008, 524368, 524304, 524568, 459024, 524400, 524336, 590016, 459016, 524384, 524320, 589984, 524288, 524416, 524352, 590048, 459012, 524376, 524312, 589968, 459028, 524408, 524344, 590032, 459020, 524392, 524328, 59e4, 524296, 524424, 524360, 590064, 459010, 524372, 524308, 524572, 459026, 524404, 524340, 590024, 459018, 524388, 524324, 589992, 524292, 524420, 524356, 590056, 459014, 524380, 524316, 589976, 459030, 524412, 524348, 590040, 459022, 524396, 524332, 590008, 524300, 524428, 524364, 590072, 459009, 524370, 524306, 524570, 459025, 524402, 524338, 590020, 459017, 524386, 524322, 589988, 524290, 524418, 524354, 590052, 459013, 524378, 524314, 589972, 459029, 524410, 524346, 590036, 459021, 524394, 524330, 590004, 524298, 524426, 524362, 590068, 459011, 524374, 524310, 524574, 459027, 524406, 524342, 590028, 459019, 524390, 524326, 589996, 524294, 524422, 524358, 590060, 459015, 524382, 524318, 589980, 459031, 524414, 524350, 590044, 459023, 524398, 524334, 590012, 524302, 524430, 524366, 590076, 459008, 524369, 524305, 524569, 459024, 524401, 524337, 590018, 459016, 524385, 524321, 589986, 524289, 524417, 524353, 590050, 459012, 524377, 524313, 589970, 459028, 524409, 524345, 590034, 459020, 524393, 524329, 590002, 524297, 524425, 524361, 590066, 459010, 524373, 524309, 524573, 459026, 524405, 524341, 590026, 459018, 524389, 524325, 589994, 524293, 524421, 524357, 590058, 459014, 524381, 524317, 589978, 459030, 524413, 524349, 590042, 459022, 524397, 524333, 590010, 524301, 524429, 524365, 590074, 459009, 524371, 524307, 524571, 459025, 524403, 524339, 590022, 459017, 524387, 524323, 589990, 524291, 524419, 524355, 590054, 459013, 524379, 524315, 589974, 459029, 524411, 524347, 590038, 459021, 524395, 524331, 590006, 524299, 524427, 524363, 590070, 459011, 524375, 524311, 524575, 459027, 524407, 524343, 590030, 459019, 524391, 524327, 589998, 524295, 524423, 524359, 590062, 459015, 524383, 524319, 589982, 459031, 524415, 524351, 590046, 459023, 524399, 524335, 590014, 524303, 524431, 524367, 590078, 459008, 524368, 524304, 524568, 459024, 524400, 524336, 590017, 459016, 524384, 524320, 589985, 524288, 524416, 524352, 590049, 459012, 524376, 524312, 589969, 459028, 524408, 524344, 590033, 459020, 524392, 524328, 590001, 524296, 524424, 524360, 590065, 459010, 524372, 524308, 524572, 459026, 524404, 524340, 590025, 459018, 524388, 524324, 589993, 524292, 524420, 524356, 590057, 459014, 524380, 524316, 589977, 459030, 524412, 524348, 590041, 459022, 524396, 524332, 590009, 524300, 524428, 524364, 590073, 459009, 524370, 524306, 524570, 459025, 524402, 524338, 590021, 459017, 524386, 524322, 589989, 524290, 524418, 524354, 590053, 459013, 524378, 524314, 589973, 459029, 524410, 524346, 590037, 459021, 524394, 524330, 590005, 524298, 524426, 524362, 590069, 459011, 524374, 524310, 524574, 459027, 524406, 524342, 590029, 459019, 524390, 524326, 589997, 524294, 524422, 524358, 590061, 459015, 524382, 524318, 589981, 459031, 524414, 524350, 590045, 459023, 524398, 524334, 590013, 524302, 524430, 524366, 590077, 459008, 524369, 524305, 524569, 459024, 524401, 524337, 590019, 459016, 524385, 524321, 589987, 524289, 524417, 524353, 590051, 459012, 524377, 524313, 589971, 459028, 524409, 524345, 590035, 459020, 524393, 524329, 590003, 524297, 524425, 524361, 590067, 459010, 524373, 524309, 524573, 459026, 524405, 524341, 590027, 459018, 524389, 524325, 589995, 524293, 524421, 524357, 590059, 459014, 524381, 524317, 589979, 459030, 524413, 524349, 590043, 459022, 524397, 524333, 590011, 524301, 524429, 524365, 590075, 459009, 524371, 524307, 524571, 459025, 524403, 524339, 590023, 459017, 524387, 524323, 589991, 524291, 524419, 524355, 590055, 459013, 524379, 524315, 589975, 459029, 524411, 524347, 590039, 459021, 524395, 524331, 590007, 524299, 524427, 524363, 590071, 459011, 524375, 524311, 524575, 459027, 524407, 524343, 590031, 459019, 524391, 524327, 589999, 524295, 524423, 524359, 590063, 459015, 524383, 524319, 589983, 459031, 524415, 524351, 590047, 459023, 524399, 524335, 590015, 524303, 524431, 524367, 590079]), 9],
        i = [new Uint32Array([327680, 327696, 327688, 327704, 327684, 327700, 327692, 327708, 327682, 327698, 327690, 327706, 327686, 327702, 327694, 0, 327681, 327697, 327689, 327705, 327685, 327701, 327693, 327709, 327683, 327699, 327691, 327707, 327687, 327703, 327695, 0]), 5];
    return o.prototype = Object.create(Ft.prototype), o.prototype.getBits = function (t) {
      for (var e, n = this.codeSize, r = this.codeBuf, i = this.bytes, o = this.bytesPos; n < t;) void 0 === (e = i[o++]) && a("Bad encoding in flate stream"), r |= e << n, n += 8;

      return e = r & (1 << t) - 1, this.codeBuf = r >> t, this.codeSize = n -= t, this.bytesPos = o, e;
    }, o.prototype.getCode = function (t) {
      for (var e = t[0], n = t[1], r = this.codeSize, i = this.codeBuf, o = this.bytes, s = this.bytesPos; r < n;) {
        var u;
        void 0 === (u = o[s++]) && a("Bad encoding in flate stream"), i |= u << r, r += 8;
      }

      var c = e[i & (1 << n) - 1],
          h = c >> 16,
          l = 65535 & c;
      return (0 == r || r < h || 0 == h) && a("Bad encoding in flate stream"), this.codeBuf = i >> h, this.codeSize = r - h, this.bytesPos = s, l;
    }, o.prototype.generateHuffmanTable = function (t) {
      for (var e = t.length, n = 0, r = 0; r < e; ++r) t[r] > n && (n = t[r]);

      for (var i = 1 << n, a = new Uint32Array(i), o = 1, s = 0, u = 2; o <= n; ++o, s <<= 1, u <<= 1) for (var c = 0; c < e; ++c) if (t[c] == o) {
        var h = 0,
            l = s;

        for (r = 0; r < o; ++r) h = h << 1 | 1 & l, l >>= 1;

        for (r = h; r < i; r += u) a[r] = o << 16 | c;

        ++s;
      }

      return [a, n];
    }, o.prototype.readBlock = function () {
      function o(t, e, n, r, i) {
        for (var a = t.getBits(n) + r; a-- > 0;) e[p++] = i;
      }

      var s = this.getBits(3);

      if (1 & s && (this.eof = !0), 0 != (s >>= 1)) {
        var u, c;
        if (1 == s) u = r, c = i;else if (2 == s) {
          for (var h = this.getBits(5) + 257, l = this.getBits(5) + 1, f = this.getBits(4) + 4, d = Array(t.length), p = 0; p < f;) d[t[p++]] = this.getBits(3);

          for (var g = this.generateHuffmanTable(d), m = 0, v = (p = 0, h + l), b = new Array(v); p < v;) {
            var y = this.getCode(g);
            16 == y ? o(this, b, 2, 3, m) : 17 == y ? o(this, b, 3, 3, m = 0) : 18 == y ? o(this, b, 7, 11, m = 0) : b[p++] = m = y;
          }

          u = this.generateHuffmanTable(b.slice(0, h)), c = this.generateHuffmanTable(b.slice(h, v));
        } else a("Unknown block type in flate stream");

        for (var w = (j = this.buffer) ? j.length : 0, N = this.bufferLength;;) {
          var L = this.getCode(u);
          if (L < 256) N + 1 >= w && (w = (j = this.ensureBuffer(N + 1)).length), j[N++] = L;else {
            if (256 == L) return void (this.bufferLength = N);
            var x = (L = e[L -= 257]) >> 16;
            x > 0 && (x = this.getBits(x));
            m = (65535 & L) + x;
            L = this.getCode(c), (x = (L = n[L]) >> 16) > 0 && (x = this.getBits(x));
            var A = (65535 & L) + x;
            N + m >= w && (w = (j = this.ensureBuffer(N + m)).length);

            for (var _ = 0; _ < m; ++_, ++N) j[N] = j[N - A];
          }
        }
      } else {
        var S,
            P = this.bytes,
            k = this.bytesPos;
        void 0 === (S = P[k++]) && a("Bad block header in flate stream");
        var F = S;
        void 0 === (S = P[k++]) && a("Bad block header in flate stream"), F |= S << 8, void 0 === (S = P[k++]) && a("Bad block header in flate stream");
        var I = S;
        void 0 === (S = P[k++]) && a("Bad block header in flate stream"), (I |= S << 8) != (65535 & ~F) && a("Bad uncompressed block length in flate stream"), this.codeBuf = 0, this.codeSize = 0;
        var C = this.bufferLength,
            j = this.ensureBuffer(C + F),
            B = C + F;
        this.bufferLength = B;

        for (var O = C; O < B; ++O) {
          if (void 0 === (S = P[k++])) {
            this.eof = !0;
            break;
          }

          j[O] = S;
        }

        this.bytesPos = k;
      }
    }, o;
  }

  function a(t) {
    throw new Error(t);
  }

  function o(t) {
    var e = 0,
        n = t[e++],
        r = t[e++];
    -1 != n && -1 != r || a("Invalid header in flate stream"), 8 != (15 & n) && a("Unknown compression method in flate stream"), ((n << 8) + r) % 31 != 0 && a("Bad FCHECK in flate stream"), 32 & r && a("FDICT bit set in flate stream"), this.bytes = t, this.bytesPos = 2, this.codeSize = 0, this.codeBuf = 0, Ft.call(this);
  }
}(),
    Ct = function () {
  var e, n, r;

  function i(t) {
    var e, n, r, i, a, o, s, u, c, h, l, f, d, p;

    for (this.data = t, this.pos = 8, this.palette = [], this.imgData = [], this.transparency = {}, this.animation = null, this.text = {}, o = null;;) {
      switch (e = this.readUInt32(), c = function () {
        var t, e;

        for (e = [], t = 0; t < 4; ++t) e.push(String.fromCharCode(this.data[this.pos++]));

        return e;
      }.call(this).join("")) {
        case "IHDR":
          this.width = this.readUInt32(), this.height = this.readUInt32(), this.bits = this.data[this.pos++], this.colorType = this.data[this.pos++], this.compressionMethod = this.data[this.pos++], this.filterMethod = this.data[this.pos++], this.interlaceMethod = this.data[this.pos++];
          break;

        case "acTL":
          this.animation = {
            numFrames: this.readUInt32(),
            numPlays: this.readUInt32() || 1 / 0,
            frames: []
          };
          break;

        case "PLTE":
          this.palette = this.read(e);
          break;

        case "fcTL":
          o && this.animation.frames.push(o), this.pos += 4, o = {
            width: this.readUInt32(),
            height: this.readUInt32(),
            xOffset: this.readUInt32(),
            yOffset: this.readUInt32()
          }, a = this.readUInt16(), i = this.readUInt16() || 100, o.delay = 1e3 * a / i, o.disposeOp = this.data[this.pos++], o.blendOp = this.data[this.pos++], o.data = [];
          break;

        case "IDAT":
        case "fdAT":
          for ("fdAT" === c && (this.pos += 4, e -= 4), t = (null != o ? o.data : void 0) || this.imgData, f = 0; 0 <= e ? f < e : f > e; 0 <= e ? ++f : --f) t.push(this.data[this.pos++]);

          break;

        case "tRNS":
          switch (this.transparency = {}, this.colorType) {
            case 3:
              if (r = this.palette.length / 3, this.transparency.indexed = this.read(e), this.transparency.indexed.length > r) throw new Error("More transparent colors than palette size");
              if ((h = r - this.transparency.indexed.length) > 0) for (d = 0; 0 <= h ? d < h : d > h; 0 <= h ? ++d : --d) this.transparency.indexed.push(255);
              break;

            case 0:
              this.transparency.grayscale = this.read(e)[0];
              break;

            case 2:
              this.transparency.rgb = this.read(e);
          }

          break;

        case "tEXt":
          s = (l = this.read(e)).indexOf(0), u = String.fromCharCode.apply(String, l.slice(0, s)), this.text[u] = String.fromCharCode.apply(String, l.slice(s + 1));
          break;

        case "IEND":
          return o && this.animation.frames.push(o), this.colors = function () {
            switch (this.colorType) {
              case 0:
              case 3:
              case 4:
                return 1;

              case 2:
              case 6:
                return 3;
            }
          }.call(this), this.hasAlphaChannel = 4 === (p = this.colorType) || 6 === p, n = this.colors + (this.hasAlphaChannel ? 1 : 0), this.pixelBitlength = this.bits * n, this.colorSpace = function () {
            switch (this.colors) {
              case 1:
                return "DeviceGray";

              case 3:
                return "DeviceRGB";
            }
          }.call(this), void (this.imgData = new Uint8Array(this.imgData));

        default:
          this.pos += e;
      }

      if (this.pos += 4, this.pos > this.data.length) throw new Error("Incomplete or corrupt PNG file");
    }
  }

  i.prototype.read = function (t) {
    var e, n;

    for (n = [], e = 0; 0 <= t ? e < t : e > t; 0 <= t ? ++e : --e) n.push(this.data[this.pos++]);

    return n;
  }, i.prototype.readUInt32 = function () {
    return this.data[this.pos++] << 24 | this.data[this.pos++] << 16 | this.data[this.pos++] << 8 | this.data[this.pos++];
  }, i.prototype.readUInt16 = function () {
    return this.data[this.pos++] << 8 | this.data[this.pos++];
  }, i.prototype.decodePixels = function (t) {
    var e = this.pixelBitlength / 8,
        n = new Uint8Array(this.width * this.height * e),
        r = 0,
        i = this;
    if (null == t && (t = this.imgData), 0 === t.length) return new Uint8Array(0);

    function a(a, o, s, u) {
      var c,
          h,
          l,
          f,
          d,
          p,
          g,
          m,
          v,
          b,
          y,
          w,
          N,
          L,
          x,
          A,
          _,
          S,
          P,
          k,
          F,
          I = Math.ceil((i.width - a) / s),
          C = Math.ceil((i.height - o) / u),
          j = i.width == I && i.height == C;

      for (L = e * I, w = j ? n : new Uint8Array(L * C), p = t.length, N = 0, h = 0; N < C && r < p;) {
        switch (t[r++]) {
          case 0:
            for (f = _ = 0; _ < L; f = _ += 1) w[h++] = t[r++];

            break;

          case 1:
            for (f = S = 0; S < L; f = S += 1) c = t[r++], d = f < e ? 0 : w[h - e], w[h++] = (c + d) % 256;

            break;

          case 2:
            for (f = P = 0; P < L; f = P += 1) c = t[r++], l = (f - f % e) / e, x = N && w[(N - 1) * L + l * e + f % e], w[h++] = (x + c) % 256;

            break;

          case 3:
            for (f = k = 0; k < L; f = k += 1) c = t[r++], l = (f - f % e) / e, d = f < e ? 0 : w[h - e], x = N && w[(N - 1) * L + l * e + f % e], w[h++] = (c + Math.floor((d + x) / 2)) % 256;

            break;

          case 4:
            for (f = F = 0; F < L; f = F += 1) c = t[r++], l = (f - f % e) / e, d = f < e ? 0 : w[h - e], 0 === N ? x = A = 0 : (x = w[(N - 1) * L + l * e + f % e], A = l && w[(N - 1) * L + (l - 1) * e + f % e]), g = d + x - A, m = Math.abs(g - d), b = Math.abs(g - x), y = Math.abs(g - A), v = m <= b && m <= y ? d : b <= y ? x : A, w[h++] = (c + v) % 256;

            break;

          default:
            throw new Error("Invalid filter algorithm: " + t[r - 1]);
        }

        if (!j) {
          var B = ((o + N * u) * i.width + a) * e,
              O = N * L;

          for (f = 0; f < I; f += 1) {
            for (var M = 0; M < e; M += 1) n[B++] = w[O++];

            B += (s - 1) * e;
          }
        }

        N++;
      }
    }

    return t = (t = new It(t)).getBytes(), 1 == i.interlaceMethod ? (a(0, 0, 8, 8), a(4, 0, 8, 8), a(0, 4, 4, 8), a(2, 0, 4, 4), a(0, 2, 2, 4), a(1, 0, 2, 2), a(0, 1, 1, 2)) : a(0, 0, 1, 1), n;
  }, i.prototype.decodePalette = function () {
    var t, e, n, r, i, a, o, s, u;

    for (n = this.palette, a = this.transparency.indexed || [], i = new Uint8Array((a.length || 0) + n.length), r = 0, t = 0, e = o = 0, s = n.length; o < s; e = o += 3) i[r++] = n[e], i[r++] = n[e + 1], i[r++] = n[e + 2], i[r++] = null != (u = a[t++]) ? u : 255;

    return i;
  }, i.prototype.copyToImageData = function (t, e) {
    var n, r, i, a, o, s, u, c, h, l, f;
    if (r = this.colors, h = null, n = this.hasAlphaChannel, this.palette.length && (h = null != (f = this._decodedPalette) ? f : this._decodedPalette = this.decodePalette(), r = 4, n = !0), c = (i = t.data || t).length, o = h || e, a = s = 0, 1 === r) for (; a < c;) u = h ? 4 * e[a / 4] : s, l = o[u++], i[a++] = l, i[a++] = l, i[a++] = l, i[a++] = n ? o[u++] : 255, s = u;else for (; a < c;) u = h ? 4 * e[a / 4] : s, i[a++] = o[u++], i[a++] = o[u++], i[a++] = o[u++], i[a++] = n ? o[u++] : 255, s = u;
  }, i.prototype.decode = function () {
    var t;
    return t = new Uint8Array(this.width * this.height * 4), this.copyToImageData(t, this.decodePixels()), t;
  };

  var a = function () {
    if ("[object Window]" === Object.prototype.toString.call(t)) {
      try {
        n = t.document.createElement("canvas"), r = n.getContext("2d");
      } catch (t) {
        return !1;
      }

      return !0;
    }

    return !1;
  };

  return a(), e = function (t) {
    var e;
    if (!0 === a()) return r.width = t.width, r.height = t.height, r.clearRect(0, 0, t.width, t.height), r.putImageData(t, 0, 0), (e = new Image()).src = n.toDataURL(), e;
    throw new Error("This method requires a Browser with Canvas-capability.");
  }, i.prototype.decodeFrames = function (t) {
    var n, r, i, a, o, s, u, c;

    if (this.animation) {
      for (c = [], r = o = 0, s = (u = this.animation.frames).length; o < s; r = ++o) n = u[r], i = t.createImageData(n.width, n.height), a = this.decodePixels(new Uint8Array(n.data)), this.copyToImageData(i, a), n.imageData = i, c.push(n.image = e(i));

      return c;
    }
  }, i.prototype.renderFrame = function (t, e) {
    var n, r, i;
    return n = (r = this.animation.frames)[e], i = r[e - 1], 0 === e && t.clearRect(0, 0, this.width, this.height), 1 === (null != i ? i.disposeOp : void 0) ? t.clearRect(i.xOffset, i.yOffset, i.width, i.height) : 2 === (null != i ? i.disposeOp : void 0) && t.putImageData(i.imageData, i.xOffset, i.yOffset), 0 === n.blendOp && t.clearRect(n.xOffset, n.yOffset, n.width, n.height), t.drawImage(n.image, n.xOffset, n.yOffset);
  }, i.prototype.animate = function (t) {
    var e,
        n,
        r,
        i,
        a,
        o,
        s = this;
    return n = 0, o = this.animation, i = o.numFrames, r = o.frames, a = o.numPlays, (e = function () {
      var o, u;
      if (o = n++ % i, u = r[o], s.renderFrame(t, o), i > 1 && n / i < a) return s.animation._timeout = setTimeout(e, u.delay);
    })();
  }, i.prototype.stopAnimation = function () {
    var t;
    return clearTimeout(null != (t = this.animation) ? t._timeout : void 0);
  }, i.prototype.render = function (t) {
    var e, n;
    return t._png && t._png.stopAnimation(), t._png = this, t.width = this.width, t.height = this.height, e = t.getContext("2d"), this.animation ? (this.decodeFrames(e), this.animate(e)) : (n = e.createImageData(this.width, this.height), this.copyToImageData(n, this.decodePixels()), e.putImageData(n, 0, 0));
  }, i;
}();
/**
 * @license
 * (c) Dean McNamee <dean@gmail.com>, 2013.
 *
 * https://github.com/deanm/omggif
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
 * including animation and compression.  It does not rely on any specific
 * underlying system, so should run in the browser, Node, or Plask.
 */


function jt(t) {
  var e = 0;
  if (71 !== t[e++] || 73 !== t[e++] || 70 !== t[e++] || 56 !== t[e++] || 56 != (t[e++] + 1 & 253) || 97 !== t[e++]) throw new Error("Invalid GIF 87a/89a header.");
  var n = t[e++] | t[e++] << 8,
      r = t[e++] | t[e++] << 8,
      i = t[e++],
      a = i >> 7,
      o = 1 << (7 & i) + 1;
  t[e++];
  t[e++];
  var s = null,
      u = null;
  a && (s = e, u = o, e += 3 * o);
  var c = !0,
      h = [],
      l = 0,
      f = null,
      d = 0,
      p = null;

  for (this.width = n, this.height = r; c && e < t.length;) switch (t[e++]) {
    case 33:
      switch (t[e++]) {
        case 255:
          if (11 !== t[e] || 78 == t[e + 1] && 69 == t[e + 2] && 84 == t[e + 3] && 83 == t[e + 4] && 67 == t[e + 5] && 65 == t[e + 6] && 80 == t[e + 7] && 69 == t[e + 8] && 50 == t[e + 9] && 46 == t[e + 10] && 48 == t[e + 11] && 3 == t[e + 12] && 1 == t[e + 13] && 0 == t[e + 16]) e += 14, p = t[e++] | t[e++] << 8, e++;else for (e += 12;;) {
            if (!((P = t[e++]) >= 0)) throw Error("Invalid block size");
            if (0 === P) break;
            e += P;
          }
          break;

        case 249:
          if (4 !== t[e++] || 0 !== t[e + 4]) throw new Error("Invalid graphics extension block.");
          var g = t[e++];
          l = t[e++] | t[e++] << 8, f = t[e++], 0 == (1 & g) && (f = null), d = g >> 2 & 7, e++;
          break;

        case 254:
          for (;;) {
            if (!((P = t[e++]) >= 0)) throw Error("Invalid block size");
            if (0 === P) break;
            e += P;
          }

          break;

        default:
          throw new Error("Unknown graphic control label: 0x" + t[e - 1].toString(16));
      }

      break;

    case 44:
      var m = t[e++] | t[e++] << 8,
          v = t[e++] | t[e++] << 8,
          b = t[e++] | t[e++] << 8,
          y = t[e++] | t[e++] << 8,
          w = t[e++],
          N = w >> 6 & 1,
          L = 1 << (7 & w) + 1,
          x = s,
          A = u,
          _ = !1;

      if (w >> 7) {
        _ = !0;
        x = e, A = L, e += 3 * L;
      }

      var S = e;

      for (e++;;) {
        var P;
        if (!((P = t[e++]) >= 0)) throw Error("Invalid block size");
        if (0 === P) break;
        e += P;
      }

      h.push({
        x: m,
        y: v,
        width: b,
        height: y,
        has_local_palette: _,
        palette_offset: x,
        palette_size: A,
        data_offset: S,
        data_length: e - S,
        transparent_index: f,
        interlaced: !!N,
        delay: l,
        disposal: d
      });
      break;

    case 59:
      c = !1;
      break;

    default:
      throw new Error("Unknown gif block: 0x" + t[e - 1].toString(16));
  }

  this.numFrames = function () {
    return h.length;
  }, this.loopCount = function () {
    return p;
  }, this.frameInfo = function (t) {
    if (t < 0 || t >= h.length) throw new Error("Frame index out of range.");
    return h[t];
  }, this.decodeAndBlitFrameBGRA = function (e, r) {
    var i = this.frameInfo(e),
        a = i.width * i.height,
        o = new Uint8Array(a);
    Bt(t, i.data_offset, o, a);
    var s = i.palette_offset,
        u = i.transparent_index;
    null === u && (u = 256);
    var c = i.width,
        h = n - c,
        l = c,
        f = 4 * (i.y * n + i.x),
        d = 4 * ((i.y + i.height) * n + i.x),
        p = f,
        g = 4 * h;
    !0 === i.interlaced && (g += 4 * n * 7);

    for (var m = 8, v = 0, b = o.length; v < b; ++v) {
      var y = o[v];
      if (0 === l && (l = c, (p += g) >= d && (g = 4 * h + 4 * n * (m - 1), p = f + (c + h) * (m << 1), m >>= 1)), y === u) p += 4;else {
        var w = t[s + 3 * y],
            N = t[s + 3 * y + 1],
            L = t[s + 3 * y + 2];
        r[p++] = L, r[p++] = N, r[p++] = w, r[p++] = 255;
      }
      --l;
    }
  }, this.decodeAndBlitFrameRGBA = function (e, r) {
    var i = this.frameInfo(e),
        a = i.width * i.height,
        o = new Uint8Array(a);
    Bt(t, i.data_offset, o, a);
    var s = i.palette_offset,
        u = i.transparent_index;
    null === u && (u = 256);
    var c = i.width,
        h = n - c,
        l = c,
        f = 4 * (i.y * n + i.x),
        d = 4 * ((i.y + i.height) * n + i.x),
        p = f,
        g = 4 * h;
    !0 === i.interlaced && (g += 4 * n * 7);

    for (var m = 8, v = 0, b = o.length; v < b; ++v) {
      var y = o[v];
      if (0 === l && (l = c, (p += g) >= d && (g = 4 * h + 4 * n * (m - 1), p = f + (c + h) * (m << 1), m >>= 1)), y === u) p += 4;else {
        var w = t[s + 3 * y],
            N = t[s + 3 * y + 1],
            L = t[s + 3 * y + 2];
        r[p++] = w, r[p++] = N, r[p++] = L, r[p++] = 255;
      }
      --l;
    }
  };
}

function Bt(t, e, r, i) {
  for (var a = t[e++], o = 1 << a, s = o + 1, u = s + 1, c = a + 1, h = (1 << c) - 1, l = 0, f = 0, d = 0, p = t[e++], g = new Int32Array(4096), m = null;;) {
    for (; l < 16 && 0 !== p;) f |= t[e++] << l, l += 8, 1 === p ? p = t[e++] : --p;

    if (l < c) break;
    var v = f & h;

    if (f >>= c, l -= c, v !== o) {
      if (v === s) break;

      for (var b = v < u ? v : m, y = 0, w = b; w > o;) w = g[w] >> 8, ++y;

      var N = w;
      if (d + y + (b !== v ? 1 : 0) > i) return void n.log("Warning, gif stream longer than expected.");
      r[d++] = N;
      var L = d += y;

      for (b !== v && (r[d++] = N), w = b; y--;) w = g[w], r[--L] = 255 & w, w >>= 8;

      null !== m && u < 4096 && (g[u++] = m << 8 | N, u >= h + 1 && c < 12 && (++c, h = h << 1 | 1)), m = v;
    } else u = s + 1, h = (1 << (c = a + 1)) - 1, m = null;
  }

  return d !== i && n.log("Warning, gif stream shorter than expected."), r;
}
/**
 * @license
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Adobe Systems Incorporated nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


function Ot(t) {
  var e,
      n,
      r,
      i,
      a,
      o = Math.floor,
      s = new Array(64),
      u = new Array(64),
      c = new Array(64),
      h = new Array(64),
      l = new Array(65535),
      f = new Array(65535),
      d = new Array(64),
      p = new Array(64),
      g = [],
      m = 0,
      v = 7,
      b = new Array(64),
      y = new Array(64),
      w = new Array(64),
      N = new Array(256),
      L = new Array(2048),
      x = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63],
      A = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      _ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      S = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125],
      P = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250],
      k = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      F = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      I = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119],
      C = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];

  function j(t, e) {
    for (var n = 0, r = 0, i = new Array(), a = 1; a <= 16; a++) {
      for (var o = 1; o <= t[a]; o++) i[e[r]] = [], i[e[r]][0] = n, i[e[r]][1] = a, r++, n++;

      n *= 2;
    }

    return i;
  }

  function B(t) {
    for (var e = t[0], n = t[1] - 1; n >= 0;) e & 1 << n && (m |= 1 << v), n--, --v < 0 && (255 == m ? (O(255), O(0)) : O(m), v = 7, m = 0);
  }

  function O(t) {
    g.push(t);
  }

  function M(t) {
    O(t >> 8 & 255), O(255 & t);
  }

  function E(t, e, n, r, i) {
    for (var a, o = i[0], s = i[240], u = function (t, e) {
      var n,
          r,
          i,
          a,
          o,
          s,
          u,
          c,
          h,
          l,
          f = 0;

      for (h = 0; h < 8; ++h) {
        n = t[f], r = t[f + 1], i = t[f + 2], a = t[f + 3], o = t[f + 4], s = t[f + 5], u = t[f + 6];

        var p = n + (c = t[f + 7]),
            g = n - c,
            m = r + u,
            v = r - u,
            b = i + s,
            y = i - s,
            w = a + o,
            N = a - o,
            L = p + w,
            x = p - w,
            A = m + b,
            _ = m - b;

        t[f] = L + A, t[f + 4] = L - A;
        var S = .707106781 * (_ + x);
        t[f + 2] = x + S, t[f + 6] = x - S;
        var P = .382683433 * ((L = N + y) - (_ = v + g)),
            k = .5411961 * L + P,
            F = 1.306562965 * _ + P,
            I = .707106781 * (A = y + v),
            C = g + I,
            j = g - I;
        t[f + 5] = j + k, t[f + 3] = j - k, t[f + 1] = C + F, t[f + 7] = C - F, f += 8;
      }

      for (f = 0, h = 0; h < 8; ++h) {
        n = t[f], r = t[f + 8], i = t[f + 16], a = t[f + 24], o = t[f + 32], s = t[f + 40], u = t[f + 48];
        var B = n + (c = t[f + 56]),
            O = n - c,
            M = r + u,
            E = r - u,
            q = i + s,
            R = i - s,
            T = a + o,
            D = a - o,
            U = B + T,
            z = B - T,
            H = M + q,
            W = M - q;
        t[f] = U + H, t[f + 32] = U - H;
        var V = .707106781 * (W + z);
        t[f + 16] = z + V, t[f + 48] = z - V;
        var G = .382683433 * ((U = D + R) - (W = E + O)),
            Y = .5411961 * U + G,
            J = 1.306562965 * W + G,
            X = .707106781 * (H = R + E),
            K = O + X,
            Z = O - X;
        t[f + 40] = Z + Y, t[f + 24] = Z - Y, t[f + 8] = K + J, t[f + 56] = K - J, f++;
      }

      for (h = 0; h < 64; ++h) l = t[h] * e[h], d[h] = l > 0 ? l + .5 | 0 : l - .5 | 0;

      return d;
    }(t, e), c = 0; c < 64; ++c) p[x[c]] = u[c];

    var h = p[0] - n;
    n = p[0], 0 == h ? B(r[0]) : (B(r[f[a = 32767 + h]]), B(l[a]));

    for (var g = 63; g > 0 && 0 == p[g];) g--;

    if (0 == g) return B(o), n;

    for (var m, v = 1; v <= g;) {
      for (var b = v; 0 == p[v] && v <= g;) ++v;

      var y = v - b;

      if (y >= 16) {
        m = y >> 4;

        for (var w = 1; w <= m; ++w) B(s);

        y &= 15;
      }

      a = 32767 + p[v], B(i[(y << 4) + f[a]]), B(l[a]), v++;
    }

    return 63 != g && B(o), n;
  }

  function q(t) {
    (t = Math.min(Math.max(t, 1), 100), a != t) && (!function (t) {
      for (var e = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], n = 0; n < 64; n++) {
        var r = o((e[n] * t + 50) / 100);
        r = Math.min(Math.max(r, 1), 255), s[x[n]] = r;
      }

      for (var i = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], a = 0; a < 64; a++) {
        var l = o((i[a] * t + 50) / 100);
        l = Math.min(Math.max(l, 1), 255), u[x[a]] = l;
      }

      for (var f = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379], d = 0, p = 0; p < 8; p++) for (var g = 0; g < 8; g++) c[d] = 1 / (s[x[d]] * f[p] * f[g] * 8), h[d] = 1 / (u[x[d]] * f[p] * f[g] * 8), d++;
    }(t < 50 ? Math.floor(5e3 / t) : Math.floor(200 - 2 * t)), a = t);
  }

  this.encode = function (t, a) {
    a && q(a), g = new Array(), m = 0, v = 7, M(65496), M(65504), M(16), O(74), O(70), O(73), O(70), O(0), O(1), O(1), O(0), M(1), M(1), O(0), O(0), function () {
      M(65499), M(132), O(0);

      for (var t = 0; t < 64; t++) O(s[t]);

      O(1);

      for (var e = 0; e < 64; e++) O(u[e]);
    }(), function (t, e) {
      M(65472), M(17), O(8), M(e), M(t), O(3), O(1), O(17), O(0), O(2), O(17), O(1), O(3), O(17), O(1);
    }(t.width, t.height), function () {
      M(65476), M(418), O(0);

      for (var t = 0; t < 16; t++) O(A[t + 1]);

      for (var e = 0; e <= 11; e++) O(_[e]);

      O(16);

      for (var n = 0; n < 16; n++) O(S[n + 1]);

      for (var r = 0; r <= 161; r++) O(P[r]);

      O(1);

      for (var i = 0; i < 16; i++) O(k[i + 1]);

      for (var a = 0; a <= 11; a++) O(F[a]);

      O(17);

      for (var o = 0; o < 16; o++) O(I[o + 1]);

      for (var s = 0; s <= 161; s++) O(C[s]);
    }(), M(65498), M(12), O(3), O(1), O(0), O(2), O(17), O(3), O(17), O(0), O(63), O(0);
    var o = 0,
        l = 0,
        f = 0;
    m = 0, v = 7, this.encode.displayName = "_encode_";

    for (var d, p, N, x, j, R, T, D, U, z = t.data, H = t.width, W = t.height, V = 4 * H, G = 0; G < W;) {
      for (d = 0; d < V;) {
        for (j = V * G + d, T = -1, D = 0, U = 0; U < 64; U++) R = j + (D = U >> 3) * V + (T = 4 * (7 & U)), G + D >= W && (R -= V * (G + 1 + D - W)), d + T >= V && (R -= d + T - V + 4), p = z[R++], N = z[R++], x = z[R++], b[U] = (L[p] + L[N + 256 >> 0] + L[x + 512 >> 0] >> 16) - 128, y[U] = (L[p + 768 >> 0] + L[N + 1024 >> 0] + L[x + 1280 >> 0] >> 16) - 128, w[U] = (L[p + 1280 >> 0] + L[N + 1536 >> 0] + L[x + 1792 >> 0] >> 16) - 128;

        o = E(b, c, o, e, r), l = E(y, h, l, n, i), f = E(w, h, f, n, i), d += 32;
      }

      G += 8;
    }

    if (v >= 0) {
      var Y = [];
      Y[1] = v + 1, Y[0] = (1 << v + 1) - 1, B(Y);
    }

    return M(65497), new Uint8Array(g);
  }, t = t || 50, function () {
    for (var t = String.fromCharCode, e = 0; e < 256; e++) N[e] = t(e);
  }(), e = j(A, _), n = j(k, F), r = j(S, P), i = j(I, C), function () {
    for (var t = 1, e = 2, n = 1; n <= 15; n++) {
      for (var r = t; r < e; r++) f[32767 + r] = n, l[32767 + r] = [], l[32767 + r][1] = n, l[32767 + r][0] = r;

      for (var i = -(e - 1); i <= -t; i++) f[32767 + i] = n, l[32767 + i] = [], l[32767 + i][1] = n, l[32767 + i][0] = e - 1 + i;

      t <<= 1, e <<= 1;
    }
  }(), function () {
    for (var t = 0; t < 256; t++) L[t] = 19595 * t, L[t + 256 >> 0] = 38470 * t, L[t + 512 >> 0] = 7471 * t + 32768, L[t + 768 >> 0] = -11059 * t, L[t + 1024 >> 0] = -21709 * t, L[t + 1280 >> 0] = 32768 * t + 8421375, L[t + 1536 >> 0] = -27439 * t, L[t + 1792 >> 0] = -5329 * t;
  }(), q(t);
}
/**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */


function Mt(t, e) {
  if (this.pos = 0, this.buffer = t, this.datav = new DataView(t.buffer), this.is_with_alpha = !!e, this.bottom_up = !0, this.flag = String.fromCharCode(this.buffer[0]) + String.fromCharCode(this.buffer[1]), this.pos += 2, -1 === ["BM", "BA", "CI", "CP", "IC", "PT"].indexOf(this.flag)) throw new Error("Invalid BMP File");
  this.parseHeader(), this.parseBGR();
}

function Et(t) {
  function e(t) {
    if (!t) throw Error("assert :P");
  }

  function n(t, e, n) {
    for (var r = 0; 4 > r; r++) if (t[e + r] != n.charCodeAt(r)) return !0;

    return !1;
  }

  function r(t, e, n, r, i) {
    for (var a = 0; a < i; a++) t[e + a] = n[r + a];
  }

  function i(t, e, n, r) {
    for (var i = 0; i < r; i++) t[e + i] = n;
  }

  function a(t) {
    return new Int32Array(t);
  }

  function o(t, e) {
    for (var n = [], r = 0; r < t; r++) n.push(new e());

    return n;
  }

  function s(t, e) {
    var n = [];
    return function t(n, r, i) {
      for (var a = i[r], o = 0; o < a && (n.push(i.length > r + 1 ? [] : new e()), !(i.length < r + 1)); o++) t(n[o], r + 1, i);
    }(n, 0, t), n;
  }

  function u(t, e) {
    for (var n = "", r = 0; r < 4; r++) n += String.fromCharCode(t[e++]);

    return n;
  }

  function c(t, e) {
    return (t[e + 0] << 0 | t[e + 1] << 8 | t[e + 2] << 16) >>> 0;
  }

  function h(t, e) {
    return (t[e + 0] << 0 | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24) >>> 0;
  }

  new (Et = function () {
    var t = this;

    function u(t, e) {
      for (var n = 1 << e - 1 >>> 0; t & n;) n >>>= 1;

      return n ? (t & n - 1) + n : t;
    }

    function c(t, n, r, i, a) {
      e(!(i % r));

      do {
        t[n + (i -= r)] = a;
      } while (0 < i);
    }

    function h(t, n, r, i, o) {
      if (e(2328 >= o), 512 >= o) var s = a(512);else if (null == (s = a(o))) return 0;
      return function (t, n, r, i, o, s) {
        var h,
            f,
            d = n,
            p = 1 << r,
            g = a(16),
            m = a(16);

        for (e(0 != o), e(null != i), e(null != t), e(0 < r), f = 0; f < o; ++f) {
          if (15 < i[f]) return 0;
          ++g[i[f]];
        }

        if (g[0] == o) return 0;

        for (m[1] = 0, h = 1; 15 > h; ++h) {
          if (g[h] > 1 << h) return 0;
          m[h + 1] = m[h] + g[h];
        }

        for (f = 0; f < o; ++f) h = i[f], 0 < i[f] && (s[m[h]++] = f);

        if (1 == m[15]) return (i = new l()).g = 0, i.value = s[0], c(t, d, 1, p, i), p;
        var v,
            b = -1,
            y = p - 1,
            w = 0,
            N = 1,
            L = 1,
            x = 1 << r;

        for (f = 0, h = 1, o = 2; h <= r; ++h, o <<= 1) {
          if (N += L <<= 1, 0 > (L -= g[h])) return 0;

          for (; 0 < g[h]; --g[h]) (i = new l()).g = h, i.value = s[f++], c(t, d + w, o, x, i), w = u(w, h);
        }

        for (h = r + 1, o = 2; 15 >= h; ++h, o <<= 1) {
          if (N += L <<= 1, 0 > (L -= g[h])) return 0;

          for (; 0 < g[h]; --g[h]) {
            if (i = new l(), (w & y) != b) {
              for (d += x, v = 1 << (b = h) - r; 15 > b && !(0 >= (v -= g[b]));) ++b, v <<= 1;

              p += x = 1 << (v = b - r), t[n + (b = w & y)].g = v + r, t[n + b].value = d - n - b;
            }

            i.g = h - r, i.value = s[f++], c(t, d + (w >> r), o, x, i), w = u(w, h);
          }
        }

        return N != 2 * m[15] - 1 ? 0 : p;
      }(t, n, r, i, o, s);
    }

    function l() {
      this.value = this.g = 0;
    }

    function f() {
      this.value = this.g = 0;
    }

    function d() {
      this.G = o(5, l), this.H = a(5), this.jc = this.Qb = this.qb = this.nd = 0, this.pd = o(Tn, f);
    }

    function p(t, n, r, i) {
      e(null != t), e(null != n), e(2147483648 > i), t.Ca = 254, t.I = 0, t.b = -8, t.Ka = 0, t.oa = n, t.pa = r, t.Jd = n, t.Yc = r + i, t.Zc = 4 <= i ? r + i - 4 + 1 : r, S(t);
    }

    function g(t, e) {
      for (var n = 0; 0 < e--;) n |= k(t, 128) << e;

      return n;
    }

    function m(t, e) {
      var n = g(t, e);
      return P(t) ? -n : n;
    }

    function v(t, n, r, i) {
      var a,
          o = 0;

      for (e(null != t), e(null != n), e(4294967288 > i), t.Sb = i, t.Ra = 0, t.u = 0, t.h = 0, 4 < i && (i = 4), a = 0; a < i; ++a) o += n[r + a] << 8 * a;

      t.Ra = o, t.bb = i, t.oa = n, t.pa = r;
    }

    function b(t) {
      for (; 8 <= t.u && t.bb < t.Sb;) t.Ra >>>= 8, t.Ra += t.oa[t.pa + t.bb] << zn - 8 >>> 0, ++t.bb, t.u -= 8;

      x(t) && (t.h = 1, t.u = 0);
    }

    function y(t, n) {
      if (e(0 <= n), !t.h && n <= Un) {
        var r = L(t) & Dn[n];
        return t.u += n, b(t), r;
      }

      return t.h = 1, t.u = 0;
    }

    function w() {
      this.b = this.Ca = this.I = 0, this.oa = [], this.pa = 0, this.Jd = [], this.Yc = 0, this.Zc = [], this.Ka = 0;
    }

    function N() {
      this.Ra = 0, this.oa = [], this.h = this.u = this.bb = this.Sb = this.pa = 0;
    }

    function L(t) {
      return t.Ra >>> (t.u & zn - 1) >>> 0;
    }

    function x(t) {
      return e(t.bb <= t.Sb), t.h || t.bb == t.Sb && t.u > zn;
    }

    function A(t, e) {
      t.u = e, t.h = x(t);
    }

    function _(t) {
      t.u >= Hn && (e(t.u >= Hn), b(t));
    }

    function S(t) {
      e(null != t && null != t.oa), t.pa < t.Zc ? (t.I = (t.oa[t.pa++] | t.I << 8) >>> 0, t.b += 8) : (e(null != t && null != t.oa), t.pa < t.Yc ? (t.b += 8, t.I = t.oa[t.pa++] | t.I << 8) : t.Ka ? t.b = 0 : (t.I <<= 8, t.b += 8, t.Ka = 1));
    }

    function P(t) {
      return g(t, 1);
    }

    function k(t, e) {
      var n = t.Ca;
      0 > t.b && S(t);
      var r = t.b,
          i = n * e >>> 8,
          a = (t.I >>> r > i) + 0;

      for (a ? (n -= i, t.I -= i + 1 << r >>> 0) : n = i + 1, r = n, i = 0; 256 <= r;) i += 8, r >>= 8;

      return r = 7 ^ i + Wn[r], t.b -= r, t.Ca = (n << r) - 1, a;
    }

    function F(t, e, n) {
      t[e + 0] = n >> 24 & 255, t[e + 1] = n >> 16 & 255, t[e + 2] = n >> 8 & 255, t[e + 3] = n >> 0 & 255;
    }

    function I(t, e) {
      return t[e + 0] << 0 | t[e + 1] << 8;
    }

    function C(t, e) {
      return I(t, e) | t[e + 2] << 16;
    }

    function j(t, e) {
      return I(t, e) | I(t, e + 2) << 16;
    }

    function B(t, n) {
      var r = 1 << n;
      return e(null != t), e(0 < n), t.X = a(r), null == t.X ? 0 : (t.Mb = 32 - n, t.Xa = n, 1);
    }

    function O(t, n) {
      e(null != t), e(null != n), e(t.Xa == n.Xa), r(n.X, 0, t.X, 0, 1 << n.Xa);
    }

    function M() {
      this.X = [], this.Xa = this.Mb = 0;
    }

    function E(t, n, r, i) {
      e(null != r), e(null != i);
      var a = r[0],
          o = i[0];
      return 0 == a && (a = (t * o + n / 2) / n), 0 == o && (o = (n * a + t / 2) / t), 0 >= a || 0 >= o ? 0 : (r[0] = a, i[0] = o, 1);
    }

    function q(t, e) {
      return t + (1 << e) - 1 >>> e;
    }

    function R(t, e) {
      return ((4278255360 & t) + (4278255360 & e) >>> 0 & 4278255360) + ((16711935 & t) + (16711935 & e) >>> 0 & 16711935) >>> 0;
    }

    function T(e, n) {
      t[n] = function (n, r, i, a, o, s, u) {
        var c;

        for (c = 0; c < o; ++c) {
          var h = t[e](s[u + c - 1], i, a + c);
          s[u + c] = R(n[r + c], h);
        }
      };
    }

    function D() {
      this.ud = this.hd = this.jd = 0;
    }

    function U(t, e) {
      return ((4278124286 & (t ^ e)) >>> 1) + (t & e) >>> 0;
    }

    function z(t) {
      return 0 <= t && 256 > t ? t : 0 > t ? 0 : 255 < t ? 255 : void 0;
    }

    function H(t, e) {
      return z(t + (t - e + .5 >> 1));
    }

    function W(t, e, n) {
      return Math.abs(e - n) - Math.abs(t - n);
    }

    function V(t, e, n, r, i, a, o) {
      for (r = a[o - 1], n = 0; n < i; ++n) a[o + n] = r = R(t[e + n], r);
    }

    function G(t, e, n, r, i) {
      var a;

      for (a = 0; a < n; ++a) {
        var o = t[e + a],
            s = o >> 8 & 255,
            u = 16711935 & (u = (u = 16711935 & o) + ((s << 16) + s));
        r[i + a] = (4278255360 & o) + u >>> 0;
      }
    }

    function Y(t, e) {
      e.jd = t >> 0 & 255, e.hd = t >> 8 & 255, e.ud = t >> 16 & 255;
    }

    function J(t, e, n, r, i, a) {
      var o;

      for (o = 0; o < r; ++o) {
        var s = e[n + o],
            u = s >>> 8,
            c = s,
            h = 255 & (h = (h = s >>> 16) + ((t.jd << 24 >> 24) * (u << 24 >> 24) >>> 5));
        c = 255 & (c = (c = c + ((t.hd << 24 >> 24) * (u << 24 >> 24) >>> 5)) + ((t.ud << 24 >> 24) * (h << 24 >> 24) >>> 5));
        i[a + o] = (4278255360 & s) + (h << 16) + c;
      }
    }

    function X(e, n, r, i, a) {
      t[n] = function (t, e, n, r, o, s, u, c, h) {
        for (r = u; r < c; ++r) for (u = 0; u < h; ++u) o[s++] = a(n[i(t[e++])]);
      }, t[e] = function (e, n, o, s, u, c, h) {
        var l = 8 >> e.b,
            f = e.Ea,
            d = e.K[0],
            p = e.w;
        if (8 > l) for (e = (1 << e.b) - 1, p = (1 << l) - 1; n < o; ++n) {
          var g,
              m = 0;

          for (g = 0; g < f; ++g) g & e || (m = i(s[u++])), c[h++] = a(d[m & p]), m >>= l;
        } else t["VP8LMapColor" + r](s, u, d, p, c, h, n, o, f);
      };
    }

    function K(t, e, n, r, i) {
      for (n = e + n; e < n;) {
        var a = t[e++];
        r[i++] = a >> 16 & 255, r[i++] = a >> 8 & 255, r[i++] = a >> 0 & 255;
      }
    }

    function Z(t, e, n, r, i) {
      for (n = e + n; e < n;) {
        var a = t[e++];
        r[i++] = a >> 16 & 255, r[i++] = a >> 8 & 255, r[i++] = a >> 0 & 255, r[i++] = a >> 24 & 255;
      }
    }

    function $(t, e, n, r, i) {
      for (n = e + n; e < n;) {
        var a = (o = t[e++]) >> 16 & 240 | o >> 12 & 15,
            o = o >> 0 & 240 | o >> 28 & 15;
        r[i++] = a, r[i++] = o;
      }
    }

    function Q(t, e, n, r, i) {
      for (n = e + n; e < n;) {
        var a = (o = t[e++]) >> 16 & 248 | o >> 13 & 7,
            o = o >> 5 & 224 | o >> 3 & 31;
        r[i++] = a, r[i++] = o;
      }
    }

    function tt(t, e, n, r, i) {
      for (n = e + n; e < n;) {
        var a = t[e++];
        r[i++] = a >> 0 & 255, r[i++] = a >> 8 & 255, r[i++] = a >> 16 & 255;
      }
    }

    function et(t, e, n, i, a, o) {
      if (0 == o) for (n = e + n; e < n;) F(i, ((o = t[e++])[0] >> 24 | o[1] >> 8 & 65280 | o[2] << 8 & 16711680 | o[3] << 24) >>> 0), a += 32;else r(i, a, t, e, n);
    }

    function nt(e, n) {
      t[n][0] = t[e + "0"], t[n][1] = t[e + "1"], t[n][2] = t[e + "2"], t[n][3] = t[e + "3"], t[n][4] = t[e + "4"], t[n][5] = t[e + "5"], t[n][6] = t[e + "6"], t[n][7] = t[e + "7"], t[n][8] = t[e + "8"], t[n][9] = t[e + "9"], t[n][10] = t[e + "10"], t[n][11] = t[e + "11"], t[n][12] = t[e + "12"], t[n][13] = t[e + "13"], t[n][14] = t[e + "0"], t[n][15] = t[e + "0"];
    }

    function rt(t) {
      return t == Hr || t == Wr || t == Vr || t == Gr;
    }

    function it() {
      this.eb = [], this.size = this.A = this.fb = 0;
    }

    function at() {
      this.y = [], this.f = [], this.ea = [], this.F = [], this.Tc = this.Ed = this.Cd = this.Fd = this.lb = this.Db = this.Ab = this.fa = this.J = this.W = this.N = this.O = 0;
    }

    function ot() {
      this.Rd = this.height = this.width = this.S = 0, this.f = {}, this.f.RGBA = new it(), this.f.kb = new at(), this.sd = null;
    }

    function st() {
      this.width = [0], this.height = [0], this.Pd = [0], this.Qd = [0], this.format = [0];
    }

    function ut() {
      this.Id = this.fd = this.Md = this.hb = this.ib = this.da = this.bd = this.cd = this.j = this.v = this.Da = this.Sd = this.ob = 0;
    }

    function ct(t) {
      return alert("todo:WebPSamplerProcessPlane"), t.T;
    }

    function ht(t, e) {
      var n = t.T,
          i = e.ba.f.RGBA,
          a = i.eb,
          o = i.fb + t.ka * i.A,
          s = vi[e.ba.S],
          u = t.y,
          c = t.O,
          h = t.f,
          l = t.N,
          f = t.ea,
          d = t.W,
          p = e.cc,
          g = e.dc,
          m = e.Mc,
          v = e.Nc,
          b = t.ka,
          y = t.ka + t.T,
          w = t.U,
          N = w + 1 >> 1;

      for (0 == b ? s(u, c, null, null, h, l, f, d, h, l, f, d, a, o, null, null, w) : (s(e.ec, e.fc, u, c, p, g, m, v, h, l, f, d, a, o - i.A, a, o, w), ++n); b + 2 < y; b += 2) p = h, g = l, m = f, v = d, l += t.Rc, d += t.Rc, o += 2 * i.A, s(u, (c += 2 * t.fa) - t.fa, u, c, p, g, m, v, h, l, f, d, a, o - i.A, a, o, w);

      return c += t.fa, t.j + y < t.o ? (r(e.ec, e.fc, u, c, w), r(e.cc, e.dc, h, l, N), r(e.Mc, e.Nc, f, d, N), n--) : 1 & y || s(u, c, null, null, h, l, f, d, h, l, f, d, a, o + i.A, null, null, w), n;
    }

    function lt(t, n, r) {
      var i = t.F,
          a = [t.J];

      if (null != i) {
        var o = t.U,
            s = n.ba.S,
            u = s == Dr || s == Vr;
        n = n.ba.f.RGBA;
        var c = [0],
            h = t.ka;
        c[0] = t.T, t.Kb && (0 == h ? --c[0] : (--h, a[0] -= t.width), t.j + t.ka + t.T == t.o && (c[0] = t.o - t.j - h));
        var l = n.eb;
        h = n.fb + h * n.A;
        t = _r(i, a[0], t.width, o, c, l, h + (u ? 0 : 3), n.A), e(r == c), t && rt(s) && xr(l, h, u, o, c, n.A);
      }

      return 0;
    }

    function ft(t) {
      var e = t.ma,
          n = e.ba.S,
          r = 11 > n,
          i = n == qr || n == Tr || n == Dr || n == Ur || 12 == n || rt(n);
      if (e.memory = null, e.Ib = null, e.Jb = null, e.Nd = null, !En(e.Oa, t, i ? 11 : 12)) return 0;
      if (i && rt(n) && yn(), t.da) alert("todo:use_scaling");else {
        if (r) {
          if (e.Ib = ct, t.Kb) {
            if (n = t.U + 1 >> 1, e.memory = a(t.U + 2 * n), null == e.memory) return 0;
            e.ec = e.memory, e.fc = 0, e.cc = e.ec, e.dc = e.fc + t.U, e.Mc = e.cc, e.Nc = e.dc + n, e.Ib = ht, yn();
          }
        } else alert("todo:EmitYUV");

        i && (e.Jb = lt, r && vn());
      }

      if (r && !Ci) {
        for (t = 0; 256 > t; ++t) ji[t] = 89858 * (t - 128) + Si >> _i, Mi[t] = -22014 * (t - 128) + Si, Oi[t] = -45773 * (t - 128), Bi[t] = 113618 * (t - 128) + Si >> _i;

        for (t = Pi; t < ki; ++t) e = 76283 * (t - 16) + Si >> _i, Ei[t - Pi] = Vt(e, 255), qi[t - Pi] = Vt(e + 8 >> 4, 15);

        Ci = 1;
      }

      return 1;
    }

    function dt(t) {
      var n = t.ma,
          r = t.U,
          i = t.T;
      return e(!(1 & t.ka)), 0 >= r || 0 >= i ? 0 : (r = n.Ib(t, n), null != n.Jb && n.Jb(t, n, r), n.Dc += r, 1);
    }

    function pt(t) {
      t.ma.memory = null;
    }

    function gt(t, e, n, r) {
      return 47 != y(t, 8) ? 0 : (e[0] = y(t, 14) + 1, n[0] = y(t, 14) + 1, r[0] = y(t, 1), 0 != y(t, 3) ? 0 : !t.h);
    }

    function mt(t, e) {
      if (4 > t) return t + 1;
      var n = t - 2 >> 1;
      return (2 + (1 & t) << n) + y(e, n) + 1;
    }

    function vt(t, e) {
      return 120 < e ? e - 120 : 1 <= (n = ((n = $r[e - 1]) >> 4) * t + (8 - (15 & n))) ? n : 1;
      var n;
    }

    function bt(t, e, n) {
      var r = L(n),
          i = t[e += 255 & r].g - 8;
      return 0 < i && (A(n, n.u + 8), r = L(n), e += t[e].value, e += r & (1 << i) - 1), A(n, n.u + t[e].g), t[e].value;
    }

    function yt(t, n, r) {
      return r.g += t.g, r.value += t.value << n >>> 0, e(8 >= r.g), t.g;
    }

    function wt(t, n, r) {
      var i = t.xc;
      return e((n = 0 == i ? 0 : t.vc[t.md * (r >> i) + (n >> i)]) < t.Wb), t.Ya[n];
    }

    function Nt(t, n, i, a) {
      var o = t.ab,
          s = t.c * n,
          u = t.C;
      n = u + n;
      var c = i,
          h = a;

      for (a = t.Ta, i = t.Ua; 0 < o--;) {
        var l = t.gc[o],
            f = u,
            d = n,
            p = c,
            g = h,
            m = (h = a, c = i, l.Ea);

        switch (e(f < d), e(d <= l.nc), l.hc) {
          case 2:
            Yn(p, g, (d - f) * m, h, c);
            break;

          case 0:
            var v = f,
                b = d,
                y = h,
                w = c,
                N = (S = l).Ea;
            0 == v && (Vn(p, g, null, null, 1, y, w), V(p, g + 1, 0, 0, N - 1, y, w + 1), g += N, w += N, ++v);

            for (var L = 1 << S.b, x = L - 1, A = q(N, S.b), _ = S.K, S = S.w + (v >> S.b) * A; v < b;) {
              var P = _,
                  k = S,
                  F = 1;

              for (Gn(p, g, y, w - N, 1, y, w); F < N;) {
                var I = (F & ~x) + L;
                I > N && (I = N), (0, $n[P[k++] >> 8 & 15])(p, g + +F, y, w + F - N, I - F, y, w + F), F = I;
              }

              g += N, w += N, ++v & x || (S += A);
            }

            d != l.nc && r(h, c - m, h, c + (d - f - 1) * m, m);
            break;

          case 1:
            for (m = p, b = g, N = (p = l.Ea) - (w = p & ~(y = (g = 1 << l.b) - 1)), v = q(p, l.b), L = l.K, l = l.w + (f >> l.b) * v; f < d;) {
              for (x = L, A = l, _ = new D(), S = b + w, P = b + p; b < S;) Y(x[A++], _), Qn(_, m, b, g, h, c), b += g, c += g;

              b < P && (Y(x[A++], _), Qn(_, m, b, N, h, c), b += N, c += N), ++f & y || (l += v);
            }

            break;

          case 3:
            if (p == h && g == c && 0 < l.b) {
              for (b = h, p = m = c + (d - f) * m - (w = (d - f) * q(l.Ea, l.b)), g = h, y = c, v = [], w = (N = w) - 1; 0 <= w; --w) v[w] = g[y + w];

              for (w = N - 1; 0 <= w; --w) b[p + w] = v[w];

              Jn(l, f, d, h, m, h, c);
            } else Jn(l, f, d, p, g, h, c);

        }

        c = a, h = i;
      }

      h != i && r(a, i, c, h, s);
    }

    function Lt(t, n) {
      var r = t.V,
          i = t.Ba + t.c * t.C,
          a = n - t.C;

      if (e(n <= t.l.o), e(16 >= a), 0 < a) {
        var o = t.l,
            s = t.Ta,
            u = t.Ua,
            c = o.width;

        if (Nt(t, a, r, i), a = u = [u], e((r = t.C) < (i = n)), e(o.v < o.va), i > o.o && (i = o.o), r < o.j) {
          var h = o.j - r;
          r = o.j;
          a[0] += h * c;
        }

        if (r >= i ? r = 0 : (a[0] += 4 * o.v, o.ka = r - o.j, o.U = o.va - o.v, o.T = i - r, r = 1), r) {
          if (u = u[0], 11 > (r = t.ca).S) {
            var l = r.f.RGBA,
                f = (i = r.S, a = o.U, o = o.T, h = l.eb, l.A),
                d = o;

            for (l = l.fb + t.Ma * l.A; 0 < d--;) {
              var p = s,
                  g = u,
                  m = a,
                  v = h,
                  b = l;

              switch (i) {
                case Er:
                  tr(p, g, m, v, b);
                  break;

                case qr:
                  er(p, g, m, v, b);
                  break;

                case Hr:
                  er(p, g, m, v, b), xr(v, b, 0, m, 1, 0);
                  break;

                case Rr:
                  ir(p, g, m, v, b);
                  break;

                case Tr:
                  et(p, g, m, v, b, 1);
                  break;

                case Wr:
                  et(p, g, m, v, b, 1), xr(v, b, 0, m, 1, 0);
                  break;

                case Dr:
                  et(p, g, m, v, b, 0);
                  break;

                case Vr:
                  et(p, g, m, v, b, 0), xr(v, b, 1, m, 1, 0);
                  break;

                case Ur:
                  nr(p, g, m, v, b);
                  break;

                case Gr:
                  nr(p, g, m, v, b), Ar(v, b, m, 1, 0);
                  break;

                case zr:
                  rr(p, g, m, v, b);
                  break;

                default:
                  e(0);
              }

              u += c, l += f;
            }

            t.Ma += o;
          } else alert("todo:EmitRescaledRowsYUVA");

          e(t.Ma <= r.height);
        }
      }

      t.C = n, e(t.C <= t.i);
    }

    function xt(t) {
      var e;
      if (0 < t.ua) return 0;

      for (e = 0; e < t.Wb; ++e) {
        var n = t.Ya[e].G,
            r = t.Ya[e].H;
        if (0 < n[1][r[1] + 0].g || 0 < n[2][r[2] + 0].g || 0 < n[3][r[3] + 0].g) return 0;
      }

      return 1;
    }

    function At(t, n, r, i, a, o) {
      if (0 != t.Z) {
        var s = t.qd,
            u = t.rd;

        for (e(null != mi[t.Z]); n < r; ++n) mi[t.Z](s, u, i, a, i, a, o), s = i, u = a, a += o;

        t.qd = s, t.rd = u;
      }
    }

    function _t(t, n) {
      var r = t.l.ma,
          i = 0 == r.Z || 1 == r.Z ? t.l.j : t.C;
      i = t.C < i ? i : t.C;

      if (e(n <= t.l.o), n > i) {
        var a = t.l.width,
            o = r.ca,
            s = r.tb + a * i,
            u = t.V,
            c = t.Ba + t.c * i,
            h = t.gc;
        e(1 == t.ab), e(3 == h[0].hc), Kn(h[0], i, n, u, c, o, s), At(r, i, n, o, s, a);
      }

      t.C = t.Ma = n;
    }

    function St(t, n, r, i, a, o, s) {
      var u = t.$ / i,
          c = t.$ % i,
          h = t.m,
          l = t.s,
          f = r + t.$,
          d = f;
      a = r + i * a;
      var p = r + i * o,
          g = 280 + l.ua,
          m = t.Pb ? u : 16777216,
          v = 0 < l.ua ? l.Wa : null,
          b = l.wc,
          y = f < p ? wt(l, c, u) : null;
      e(t.C < o), e(p <= a);
      var w = !1;

      t: for (;;) {
        for (; w || f < p;) {
          var N = 0;

          if (u >= m) {
            var S = f - r;
            e((m = t).Pb), m.wd = m.m, m.xd = S, 0 < m.s.ua && O(m.s.Wa, m.s.vb), m = u + ti;
          }

          if (c & b || (y = wt(l, c, u)), e(null != y), y.Qb && (n[f] = y.qb, w = !0), !w) if (_(h), y.jc) {
            N = h, S = n;
            var P = f,
                k = y.pd[L(N) & Tn - 1];
            e(y.jc), 256 > k.g ? (A(N, N.u + k.g), S[P] = k.value, N = 0) : (A(N, N.u + k.g - 256), e(256 <= k.value), N = k.value), 0 == N && (w = !0);
          } else N = bt(y.G[0], y.H[0], h);
          if (h.h) break;

          if (w || 256 > N) {
            if (!w) if (y.nd) n[f] = (y.qb | N << 8) >>> 0;else {
              if (_(h), w = bt(y.G[1], y.H[1], h), _(h), S = bt(y.G[2], y.H[2], h), P = bt(y.G[3], y.H[3], h), h.h) break;
              n[f] = (P << 24 | w << 16 | N << 8 | S) >>> 0;
            }
            if (w = !1, ++f, ++c >= i && (c = 0, ++u, null != s && u <= o && !(u % 16) && s(t, u), null != v)) for (; d < f;) N = n[d++], v.X[(506832829 * N & 4294967295) >>> v.Mb] = N;
          } else if (280 > N) {
            if (N = mt(N - 256, h), S = bt(y.G[4], y.H[4], h), _(h), S = vt(i, S = mt(S, h)), h.h) break;
            if (f - r < S || a - f < N) break t;

            for (P = 0; P < N; ++P) n[f + P] = n[f + P - S];

            for (f += N, c += N; c >= i;) c -= i, ++u, null != s && u <= o && !(u % 16) && s(t, u);

            if (e(f <= a), c & b && (y = wt(l, c, u)), null != v) for (; d < f;) N = n[d++], v.X[(506832829 * N & 4294967295) >>> v.Mb] = N;
          } else {
            if (!(N < g)) break t;

            for (w = N - 280, e(null != v); d < f;) N = n[d++], v.X[(506832829 * N & 4294967295) >>> v.Mb] = N;

            N = f, e(!(w >>> (S = v).Xa)), n[N] = S.X[w], w = !0;
          }

          w || e(h.h == x(h));
        }

        if (t.Pb && h.h && f < a) e(t.m.h), t.a = 5, t.m = t.wd, t.$ = t.xd, 0 < t.s.ua && O(t.s.vb, t.s.Wa);else {
          if (h.h) break t;
          null != s && s(t, u > o ? o : u), t.a = 0, t.$ = f - r;
        }
        return 1;
      }

      return t.a = 3, 0;
    }

    function Pt(t) {
      e(null != t), t.vc = null, t.yc = null, t.Ya = null;
      var n = t.Wa;
      null != n && (n.X = null), t.vb = null, e(null != t);
    }

    function kt() {
      var e = new sn();
      return null == e ? null : (e.a = 0, e.xb = gi, nt("Predictor", "VP8LPredictors"), nt("Predictor", "VP8LPredictors_C"), nt("PredictorAdd", "VP8LPredictorsAdd"), nt("PredictorAdd", "VP8LPredictorsAdd_C"), Yn = G, Qn = J, tr = K, er = Z, nr = $, rr = Q, ir = tt, t.VP8LMapColor32b = Xn, t.VP8LMapColor8b = Zn, e);
    }

    function Ft(t, n, r, s, u) {
      var c = 1,
          f = [t],
          p = [n],
          g = s.m,
          m = s.s,
          v = null,
          b = 0;

      t: for (;;) {
        if (r) for (; c && y(g, 1);) {
          var w = f,
              N = p,
              x = s,
              S = 1,
              P = x.m,
              k = x.gc[x.ab],
              F = y(P, 2);
          if (x.Oc & 1 << F) c = 0;else {
            switch (x.Oc |= 1 << F, k.hc = F, k.Ea = w[0], k.nc = N[0], k.K = [null], ++x.ab, e(4 >= x.ab), F) {
              case 0:
              case 1:
                k.b = y(P, 3) + 2, S = Ft(q(k.Ea, k.b), q(k.nc, k.b), 0, x, k.K), k.K = k.K[0];
                break;

              case 3:
                var I,
                    C = y(P, 8) + 1,
                    j = 16 < C ? 0 : 4 < C ? 1 : 2 < C ? 2 : 3;

                if (w[0] = q(k.Ea, j), k.b = j, I = S = Ft(C, 1, 0, x, k.K)) {
                  var O,
                      M = C,
                      E = k,
                      T = 1 << (8 >> E.b),
                      D = a(T);
                  if (null == D) I = 0;else {
                    var U = E.K[0],
                        z = E.w;

                    for (D[0] = E.K[0][0], O = 1; O < 1 * M; ++O) D[O] = R(U[z + O], D[O - 1]);

                    for (; O < 4 * T; ++O) D[O] = 0;

                    E.K[0] = null, E.K[0] = D, I = 1;
                  }
                }

                S = I;
                break;

              case 2:
                break;

              default:
                e(0);
            }

            c = S;
          }
        }

        if (f = f[0], p = p[0], c && y(g, 1) && !(c = 1 <= (b = y(g, 4)) && 11 >= b)) {
          s.a = 3;
          break t;
        }

        var H;
        if (H = c) e: {
          var W,
              V,
              G,
              Y = s,
              J = f,
              X = p,
              K = b,
              Z = r,
              $ = Y.m,
              Q = Y.s,
              tt = [null],
              et = 1,
              nt = 0,
              rt = Qr[K];

          n: for (;;) {
            if (Z && y($, 1)) {
              var it = y($, 3) + 2,
                  at = q(J, it),
                  ot = q(X, it),
                  st = at * ot;
              if (!Ft(at, ot, 0, Y, tt)) break n;

              for (tt = tt[0], Q.xc = it, W = 0; W < st; ++W) {
                var ut = tt[W] >> 8 & 65535;
                tt[W] = ut, ut >= et && (et = ut + 1);
              }
            }

            if ($.h) break n;

            for (V = 0; 5 > V; ++V) {
              var ct = Xr[V];
              !V && 0 < K && (ct += 1 << K), nt < ct && (nt = ct);
            }

            var ht = o(et * rt, l),
                lt = et,
                ft = o(lt, d);
            if (null == ft) var dt = null;else e(65536 >= lt), dt = ft;
            var pt = a(nt);

            if (null == dt || null == pt || null == ht) {
              Y.a = 1;
              break n;
            }

            var gt = ht;

            for (W = G = 0; W < et; ++W) {
              var mt = dt[W],
                  vt = mt.G,
                  bt = mt.H,
                  wt = 0,
                  Nt = 1,
                  Lt = 0;

              for (V = 0; 5 > V; ++V) {
                ct = Xr[V], vt[V] = gt, bt[V] = G, !V && 0 < K && (ct += 1 << K);

                r: {
                  var xt,
                      At = ct,
                      _t = Y,
                      kt = pt,
                      It = gt,
                      Ct = G,
                      jt = 0,
                      Bt = _t.m,
                      Ot = y(Bt, 1);

                  if (i(kt, 0, 0, At), Ot) {
                    var Mt = y(Bt, 1) + 1,
                        Et = y(Bt, 1),
                        qt = y(Bt, 0 == Et ? 1 : 8);
                    kt[qt] = 1, 2 == Mt && (kt[qt = y(Bt, 8)] = 1);
                    var Rt = 1;
                  } else {
                    var Tt = a(19),
                        Dt = y(Bt, 4) + 4;

                    if (19 < Dt) {
                      _t.a = 3;
                      var Ut = 0;
                      break r;
                    }

                    for (xt = 0; xt < Dt; ++xt) Tt[Zr[xt]] = y(Bt, 3);

                    var zt = void 0,
                        Ht = void 0,
                        Wt = _t,
                        Vt = Tt,
                        Gt = At,
                        Yt = kt,
                        Jt = 0,
                        Xt = Wt.m,
                        Kt = 8,
                        Zt = o(128, l);

                    i: for (; h(Zt, 0, 7, Vt, 19);) {
                      if (y(Xt, 1)) {
                        var $t = 2 + 2 * y(Xt, 3);
                        if ((zt = 2 + y(Xt, $t)) > Gt) break i;
                      } else zt = Gt;

                      for (Ht = 0; Ht < Gt && zt--;) {
                        _(Xt);

                        var Qt = Zt[0 + (127 & L(Xt))];
                        A(Xt, Xt.u + Qt.g);
                        var te = Qt.value;
                        if (16 > te) Yt[Ht++] = te, 0 != te && (Kt = te);else {
                          var ee = 16 == te,
                              ne = te - 16,
                              re = Jr[ne],
                              ie = y(Xt, Yr[ne]) + re;
                          if (Ht + ie > Gt) break i;

                          for (var ae = ee ? Kt : 0; 0 < ie--;) Yt[Ht++] = ae;
                        }
                      }

                      Jt = 1;
                      break i;
                    }

                    Jt || (Wt.a = 3), Rt = Jt;
                  }

                  (Rt = Rt && !Bt.h) && (jt = h(It, Ct, 8, kt, At)), Rt && 0 != jt ? Ut = jt : (_t.a = 3, Ut = 0);
                }

                if (0 == Ut) break n;

                if (Nt && 1 == Kr[V] && (Nt = 0 == gt[G].g), wt += gt[G].g, G += Ut, 3 >= V) {
                  var oe,
                      se = pt[0];

                  for (oe = 1; oe < ct; ++oe) pt[oe] > se && (se = pt[oe]);

                  Lt += se;
                }
              }

              if (mt.nd = Nt, mt.Qb = 0, Nt && (mt.qb = (vt[3][bt[3] + 0].value << 24 | vt[1][bt[1] + 0].value << 16 | vt[2][bt[2] + 0].value) >>> 0, 0 == wt && 256 > vt[0][bt[0] + 0].value && (mt.Qb = 1, mt.qb += vt[0][bt[0] + 0].value << 8)), mt.jc = !mt.Qb && 6 > Lt, mt.jc) {
                var ue,
                    ce = mt;

                for (ue = 0; ue < Tn; ++ue) {
                  var he = ue,
                      le = ce.pd[he],
                      fe = ce.G[0][ce.H[0] + he];
                  256 <= fe.value ? (le.g = fe.g + 256, le.value = fe.value) : (le.g = 0, le.value = 0, he >>= yt(fe, 8, le), he >>= yt(ce.G[1][ce.H[1] + he], 16, le), he >>= yt(ce.G[2][ce.H[2] + he], 0, le), yt(ce.G[3][ce.H[3] + he], 24, le));
                }
              }
            }

            Q.vc = tt, Q.Wb = et, Q.Ya = dt, Q.yc = ht, H = 1;
            break e;
          }

          H = 0;
        }

        if (!(c = H)) {
          s.a = 3;
          break t;
        }

        if (0 < b) {
          if (m.ua = 1 << b, !B(m.Wa, b)) {
            s.a = 1, c = 0;
            break t;
          }
        } else m.ua = 0;

        var de = s,
            pe = f,
            ge = p,
            me = de.s,
            ve = me.xc;

        if (de.c = pe, de.i = ge, me.md = q(pe, ve), me.wc = 0 == ve ? -1 : (1 << ve) - 1, r) {
          s.xb = pi;
          break t;
        }

        if (null == (v = a(f * p))) {
          s.a = 1, c = 0;
          break t;
        }

        c = (c = St(s, v, 0, f, p, p, null)) && !g.h;
        break t;
      }

      return c ? (null != u ? u[0] = v : (e(null == v), e(r)), s.$ = 0, r || Pt(m)) : Pt(m), c;
    }

    function It(t, n) {
      var r = t.c * t.i,
          i = r + n + 16 * n;
      return e(t.c <= n), t.V = a(i), null == t.V ? (t.Ta = null, t.Ua = 0, t.a = 1, 0) : (t.Ta = t.V, t.Ua = t.Ba + r + n, 1);
    }

    function Ct(t, n) {
      var r = t.C,
          i = n - r,
          a = t.V,
          o = t.Ba + t.c * r;

      for (e(n <= t.l.o); 0 < i;) {
        var s = 16 < i ? 16 : i,
            u = t.l.ma,
            c = t.l.width,
            h = c * s,
            l = u.ca,
            f = u.tb + c * r,
            d = t.Ta,
            p = t.Ua;
        Nt(t, s, a, o), Sr(d, p, l, f, h), At(u, r, r + s, l, f, c), i -= s, a += s * t.c, r += s;
      }

      e(r == n), t.C = t.Ma = n;
    }

    function jt() {
      this.ub = this.yd = this.td = this.Rb = 0;
    }

    function Bt() {
      this.Kd = this.Ld = this.Ud = this.Td = this.i = this.c = 0;
    }

    function Ot() {
      this.Fb = this.Bb = this.Cb = 0, this.Zb = a(4), this.Lb = a(4);
    }

    function Mt() {
      this.Yb = function () {
        var t = [];
        return function t(e, n, r) {
          for (var i = r[n], a = 0; a < i && (e.push(r.length > n + 1 ? [] : 0), !(r.length < n + 1)); a++) t(e[a], n + 1, r);
        }(t, 0, [3, 11]), t;
      }();
    }

    function Et() {
      this.jb = a(3), this.Wc = s([4, 8], Mt), this.Xc = s([4, 17], Mt);
    }

    function qt() {
      this.Pc = this.wb = this.Tb = this.zd = 0, this.vd = new a(4), this.od = new a(4);
    }

    function Rt() {
      this.ld = this.La = this.dd = this.tc = 0;
    }

    function Tt() {
      this.Na = this.la = 0;
    }

    function Dt() {
      this.Sc = [0, 0], this.Eb = [0, 0], this.Qc = [0, 0], this.ia = this.lc = 0;
    }

    function Ut() {
      this.ad = a(384), this.Za = 0, this.Ob = a(16), this.$b = this.Ad = this.ia = this.Gc = this.Hc = this.Dd = 0;
    }

    function zt() {
      this.uc = this.M = this.Nb = 0, this.wa = Array(new Rt()), this.Y = 0, this.ya = Array(new Ut()), this.aa = 0, this.l = new Gt();
    }

    function Ht() {
      this.y = a(16), this.f = a(8), this.ea = a(8);
    }

    function Wt() {
      this.cb = this.a = 0, this.sc = "", this.m = new w(), this.Od = new jt(), this.Kc = new Bt(), this.ed = new qt(), this.Qa = new Ot(), this.Ic = this.$c = this.Aa = 0, this.D = new zt(), this.Xb = this.Va = this.Hb = this.zb = this.yb = this.Ub = this.za = 0, this.Jc = o(8, w), this.ia = 0, this.pb = o(4, Dt), this.Pa = new Et(), this.Bd = this.kc = 0, this.Ac = [], this.Bc = 0, this.zc = [0, 0, 0, 0], this.Gd = Array(new Ht()), this.Hd = 0, this.rb = Array(new Tt()), this.sb = 0, this.wa = Array(new Rt()), this.Y = 0, this.oc = [], this.pc = 0, this.sa = [], this.ta = 0, this.qa = [], this.ra = 0, this.Ha = [], this.B = this.R = this.Ia = 0, this.Ec = [], this.M = this.ja = this.Vb = this.Fc = 0, this.ya = Array(new Ut()), this.L = this.aa = 0, this.gd = s([4, 2], Rt), this.ga = null, this.Fa = [], this.Cc = this.qc = this.P = 0, this.Gb = [], this.Uc = 0, this.mb = [], this.nb = 0, this.rc = [], this.Ga = this.Vc = 0;
    }

    function Vt(t, e) {
      return 0 > t ? 0 : t > e ? e : t;
    }

    function Gt() {
      this.T = this.U = this.ka = this.height = this.width = 0, this.y = [], this.f = [], this.ea = [], this.Rc = this.fa = this.W = this.N = this.O = 0, this.ma = "void", this.put = "VP8IoPutHook", this.ac = "VP8IoSetupHook", this.bc = "VP8IoTeardownHook", this.ha = this.Kb = 0, this.data = [], this.hb = this.ib = this.da = this.o = this.j = this.va = this.v = this.Da = this.ob = this.w = 0, this.F = [], this.J = 0;
    }

    function Yt() {
      var t = new Wt();
      return null != t && (t.a = 0, t.sc = "OK", t.cb = 0, t.Xb = 0, ri || (ri = Zt)), t;
    }

    function Jt(t, e, n) {
      return 0 == t.a && (t.a = e, t.sc = n, t.cb = 0), 0;
    }

    function Xt(t, e, n) {
      return 3 <= n && 157 == t[e + 0] && 1 == t[e + 1] && 42 == t[e + 2];
    }

    function Kt(t, n) {
      if (null == t) return 0;
      if (t.a = 0, t.sc = "OK", null == n) return Jt(t, 2, "null VP8Io passed to VP8GetHeaders()");
      var r = n.data,
          a = n.w,
          o = n.ha;
      if (4 > o) return Jt(t, 7, "Truncated header.");
      var s = r[a + 0] | r[a + 1] << 8 | r[a + 2] << 16,
          u = t.Od;
      if (u.Rb = !(1 & s), u.td = s >> 1 & 7, u.yd = s >> 4 & 1, u.ub = s >> 5, 3 < u.td) return Jt(t, 3, "Incorrect keyframe parameters.");
      if (!u.yd) return Jt(t, 4, "Frame not displayable.");
      a += 3, o -= 3;
      var c = t.Kc;

      if (u.Rb) {
        if (7 > o) return Jt(t, 7, "cannot parse picture header");
        if (!Xt(r, a, o)) return Jt(t, 3, "Bad code word");
        c.c = 16383 & (r[a + 4] << 8 | r[a + 3]), c.Td = r[a + 4] >> 6, c.i = 16383 & (r[a + 6] << 8 | r[a + 5]), c.Ud = r[a + 6] >> 6, a += 7, o -= 7, t.za = c.c + 15 >> 4, t.Ub = c.i + 15 >> 4, n.width = c.c, n.height = c.i, n.Da = 0, n.j = 0, n.v = 0, n.va = n.width, n.o = n.height, n.da = 0, n.ib = n.width, n.hb = n.height, n.U = n.width, n.T = n.height, i((s = t.Pa).jb, 0, 255, s.jb.length), e(null != (s = t.Qa)), s.Cb = 0, s.Bb = 0, s.Fb = 1, i(s.Zb, 0, 0, s.Zb.length), i(s.Lb, 0, 0, s.Lb);
      }

      if (u.ub > o) return Jt(t, 7, "bad partition length");
      p(s = t.m, r, a, u.ub), a += u.ub, o -= u.ub, u.Rb && (c.Ld = P(s), c.Kd = P(s)), c = t.Qa;
      var h,
          l = t.Pa;

      if (e(null != s), e(null != c), c.Cb = P(s), c.Cb) {
        if (c.Bb = P(s), P(s)) {
          for (c.Fb = P(s), h = 0; 4 > h; ++h) c.Zb[h] = P(s) ? m(s, 7) : 0;

          for (h = 0; 4 > h; ++h) c.Lb[h] = P(s) ? m(s, 6) : 0;
        }

        if (c.Bb) for (h = 0; 3 > h; ++h) l.jb[h] = P(s) ? g(s, 8) : 255;
      } else c.Bb = 0;

      if (s.Ka) return Jt(t, 3, "cannot parse segment header");

      if ((c = t.ed).zd = P(s), c.Tb = g(s, 6), c.wb = g(s, 3), c.Pc = P(s), c.Pc && P(s)) {
        for (l = 0; 4 > l; ++l) P(s) && (c.vd[l] = m(s, 6));

        for (l = 0; 4 > l; ++l) P(s) && (c.od[l] = m(s, 6));
      }

      if (t.L = 0 == c.Tb ? 0 : c.zd ? 1 : 2, s.Ka) return Jt(t, 3, "cannot parse filter header");
      var f = o;
      if (o = h = a, a = h + f, c = f, t.Xb = (1 << g(t.m, 2)) - 1, f < 3 * (l = t.Xb)) r = 7;else {
        for (h += 3 * l, c -= 3 * l, f = 0; f < l; ++f) {
          var d = r[o + 0] | r[o + 1] << 8 | r[o + 2] << 16;
          d > c && (d = c), p(t.Jc[+f], r, h, d), h += d, c -= d, o += 3;
        }

        p(t.Jc[+l], r, h, c), r = h < a ? 0 : 5;
      }
      if (0 != r) return Jt(t, r, "cannot parse partitions");

      for (r = g(h = t.m, 7), o = P(h) ? m(h, 4) : 0, a = P(h) ? m(h, 4) : 0, c = P(h) ? m(h, 4) : 0, l = P(h) ? m(h, 4) : 0, h = P(h) ? m(h, 4) : 0, f = t.Qa, d = 0; 4 > d; ++d) {
        if (f.Cb) {
          var v = f.Zb[d];
          f.Fb || (v += r);
        } else {
          if (0 < d) {
            t.pb[d] = t.pb[0];
            continue;
          }

          v = r;
        }

        var b = t.pb[d];
        b.Sc[0] = ei[Vt(v + o, 127)], b.Sc[1] = ni[Vt(v + 0, 127)], b.Eb[0] = 2 * ei[Vt(v + a, 127)], b.Eb[1] = 101581 * ni[Vt(v + c, 127)] >> 16, 8 > b.Eb[1] && (b.Eb[1] = 8), b.Qc[0] = ei[Vt(v + l, 117)], b.Qc[1] = ni[Vt(v + h, 127)], b.lc = v + h;
      }

      if (!u.Rb) return Jt(t, 4, "Not a key frame.");

      for (P(s), u = t.Pa, r = 0; 4 > r; ++r) {
        for (o = 0; 8 > o; ++o) for (a = 0; 3 > a; ++a) for (c = 0; 11 > c; ++c) l = k(s, ci[r][o][a][c]) ? g(s, 8) : si[r][o][a][c], u.Wc[r][o].Yb[a][c] = l;

        for (o = 0; 17 > o; ++o) u.Xc[r][o] = u.Wc[r][hi[o]];
      }

      return t.kc = P(s), t.kc && (t.Bd = g(s, 8)), t.cb = 1;
    }

    function Zt(t, e, n, r, i, a, o) {
      var s = e[i].Yb[n];

      for (n = 0; 16 > i; ++i) {
        if (!k(t, s[n + 0])) return i;

        for (; !k(t, s[n + 1]);) if (s = e[++i].Yb[0], n = 0, 16 == i) return 16;

        var u = e[i + 1].Yb;

        if (k(t, s[n + 2])) {
          var c = t,
              h = 0;
          if (k(c, (f = s)[(l = n) + 3])) {
            if (k(c, f[l + 6])) {
              for (s = 0, l = 2 * (h = k(c, f[l + 8])) + (f = k(c, f[l + 9 + h])), h = 0, f = ii[l]; f[s]; ++s) h += h + k(c, f[s]);

              h += 3 + (8 << l);
            } else k(c, f[l + 7]) ? (h = 7 + 2 * k(c, 165), h += k(c, 145)) : h = 5 + k(c, 159);
          } else h = k(c, f[l + 4]) ? 3 + k(c, f[l + 5]) : 2;
          s = u[2];
        } else h = 1, s = u[1];

        u = o + ai[i], 0 > (c = t).b && S(c);
        var l,
            f = c.b,
            d = (l = c.Ca >> 1) - (c.I >> f) >> 31;
        --c.b, c.Ca += d, c.Ca |= 1, c.I -= (l + 1 & d) << f, a[u] = ((h ^ d) - d) * r[(0 < i) + 0];
      }

      return 16;
    }

    function $t(t) {
      var e = t.rb[t.sb - 1];
      e.la = 0, e.Na = 0, i(t.zc, 0, 0, t.zc.length), t.ja = 0;
    }

    function Qt(t, n) {
      if (null == t) return 0;
      if (null == n) return Jt(t, 2, "NULL VP8Io parameter in VP8Decode().");
      if (!t.cb && !Kt(t, n)) return 0;

      if (e(t.cb), null == n.ac || n.ac(n)) {
        n.ob && (t.L = 0);
        var s = Ti[t.L];

        if (2 == t.L ? (t.yb = 0, t.zb = 0) : (t.yb = n.v - s >> 4, t.zb = n.j - s >> 4, 0 > t.yb && (t.yb = 0), 0 > t.zb && (t.zb = 0)), t.Va = n.o + 15 + s >> 4, t.Hb = n.va + 15 + s >> 4, t.Hb > t.za && (t.Hb = t.za), t.Va > t.Ub && (t.Va = t.Ub), 0 < t.L) {
          var u = t.ed;

          for (s = 0; 4 > s; ++s) {
            var c;

            if (t.Qa.Cb) {
              var h = t.Qa.Lb[s];
              t.Qa.Fb || (h += u.Tb);
            } else h = u.Tb;

            for (c = 0; 1 >= c; ++c) {
              var l = t.gd[s][c],
                  f = h;

              if (u.Pc && (f += u.vd[0], c && (f += u.od[0])), 0 < (f = 0 > f ? 0 : 63 < f ? 63 : f)) {
                var d = f;
                0 < u.wb && (d = 4 < u.wb ? d >> 2 : d >> 1) > 9 - u.wb && (d = 9 - u.wb), 1 > d && (d = 1), l.dd = d, l.tc = 2 * f + d, l.ld = 40 <= f ? 2 : 15 <= f ? 1 : 0;
              } else l.tc = 0;

              l.La = c;
            }
          }
        }

        s = 0;
      } else Jt(t, 6, "Frame setup failed"), s = t.a;

      if (s = 0 == s) {
        if (s) {
          t.$c = 0, 0 < t.Aa || (t.Ic = Ui);

          t: {
            s = t.Ic;
            u = 4 * (d = t.za);
            var p = 32 * d,
                g = d + 1,
                m = 0 < t.L ? d * (0 < t.Aa ? 2 : 1) : 0,
                v = (2 == t.Aa ? 2 : 1) * d;
            if ((l = u + 832 + (c = 3 * (16 * s + Ti[t.L]) / 2 * p) + (h = null != t.Fa && 0 < t.Fa.length ? t.Kc.c * t.Kc.i : 0)) != l) s = 0;else {
              if (l > t.Vb) {
                if (t.Vb = 0, t.Ec = a(l), t.Fc = 0, null == t.Ec) {
                  s = Jt(t, 1, "no memory during frame initialization.");
                  break t;
                }

                t.Vb = l;
              }

              l = t.Ec, f = t.Fc, t.Ac = l, t.Bc = f, f += u, t.Gd = o(p, Ht), t.Hd = 0, t.rb = o(g + 1, Tt), t.sb = 1, t.wa = m ? o(m, Rt) : null, t.Y = 0, t.D.Nb = 0, t.D.wa = t.wa, t.D.Y = t.Y, 0 < t.Aa && (t.D.Y += d), e(!0), t.oc = l, t.pc = f, f += 832, t.ya = o(v, Ut), t.aa = 0, t.D.ya = t.ya, t.D.aa = t.aa, 2 == t.Aa && (t.D.aa += d), t.R = 16 * d, t.B = 8 * d, d = (p = Ti[t.L]) * t.R, p = p / 2 * t.B, t.sa = l, t.ta = f + d, t.qa = t.sa, t.ra = t.ta + 16 * s * t.R + p, t.Ha = t.qa, t.Ia = t.ra + 8 * s * t.B + p, t.$c = 0, f += c, t.mb = h ? l : null, t.nb = h ? f : null, e(f + h <= t.Fc + t.Vb), $t(t), i(t.Ac, t.Bc, 0, u), s = 1;
            }
          }

          if (s) {
            if (n.ka = 0, n.y = t.sa, n.O = t.ta, n.f = t.qa, n.N = t.ra, n.ea = t.Ha, n.Vd = t.Ia, n.fa = t.R, n.Rc = t.B, n.F = null, n.J = 0, !Cr) {
              for (s = -255; 255 >= s; ++s) Pr[255 + s] = 0 > s ? -s : s;

              for (s = -1020; 1020 >= s; ++s) kr[1020 + s] = -128 > s ? -128 : 127 < s ? 127 : s;

              for (s = -112; 112 >= s; ++s) Fr[112 + s] = -16 > s ? -16 : 15 < s ? 15 : s;

              for (s = -255; 510 >= s; ++s) Ir[255 + s] = 0 > s ? 0 : 255 < s ? 255 : s;

              Cr = 1;
            }

            ar = ce, or = ae, ur = oe, cr = se, hr = ue, sr = ie, lr = Je, fr = Xe, dr = $e, pr = Qe, gr = Ke, mr = Ze, vr = tn, br = en, yr = ze, wr = He, Nr = We, Lr = Ve, fi[0] = Ae, fi[1] = le, fi[2] = Le, fi[3] = xe, fi[4] = _e, fi[5] = Pe, fi[6] = Se, fi[7] = ke, fi[8] = Ie, fi[9] = Fe, li[0] = ve, li[1] = de, li[2] = pe, li[3] = ge, li[4] = be, li[5] = ye, li[6] = we, di[0] = Oe, di[1] = fe, di[2] = Ce, di[3] = je, di[4] = Ee, di[5] = Me, di[6] = qe, s = 1;
          } else s = 0;
        }

        s && (s = function (t, n) {
          for (t.M = 0; t.M < t.Va; ++t.M) {
            var o,
                s = t.Jc[t.M & t.Xb],
                u = t.m,
                c = t;

            for (o = 0; o < c.za; ++o) {
              var h = u,
                  l = c,
                  f = l.Ac,
                  d = l.Bc + 4 * o,
                  p = l.zc,
                  g = l.ya[l.aa + o];

              if (l.Qa.Bb ? g.$b = k(h, l.Pa.jb[0]) ? 2 + k(h, l.Pa.jb[2]) : k(h, l.Pa.jb[1]) : g.$b = 0, l.kc && (g.Ad = k(h, l.Bd)), g.Za = !k(h, 145) + 0, g.Za) {
                var m = g.Ob,
                    v = 0;

                for (l = 0; 4 > l; ++l) {
                  var b,
                      y = p[0 + l];

                  for (b = 0; 4 > b; ++b) {
                    y = ui[f[d + b]][y];

                    for (var w = oi[k(h, y[0])]; 0 < w;) w = oi[2 * w + k(h, y[w])];

                    y = -w, f[d + b] = y;
                  }

                  r(m, v, f, d, 4), v += 4, p[0 + l] = y;
                }
              } else y = k(h, 156) ? k(h, 128) ? 1 : 3 : k(h, 163) ? 2 : 0, g.Ob[0] = y, i(f, d, y, 4), i(p, 0, y, 4);

              g.Dd = k(h, 142) ? k(h, 114) ? k(h, 183) ? 1 : 3 : 2 : 0;
            }

            if (c.m.Ka) return Jt(t, 7, "Premature end-of-partition0 encountered.");

            for (; t.ja < t.za; ++t.ja) {
              if (c = s, h = (u = t).rb[u.sb - 1], f = u.rb[u.sb + u.ja], o = u.ya[u.aa + u.ja], d = u.kc ? o.Ad : 0) h.la = f.la = 0, o.Za || (h.Na = f.Na = 0), o.Hc = 0, o.Gc = 0, o.ia = 0;else {
                var N, L;
                h = f, f = c, d = u.Pa.Xc, p = u.ya[u.aa + u.ja], g = u.pb[p.$b];
                if (l = p.ad, m = 0, v = u.rb[u.sb - 1], y = b = 0, i(l, m, 0, 384), p.Za) var x = 0,
                    A = d[3];else {
                  w = a(16);

                  var _ = h.Na + v.Na;

                  if (_ = ri(f, d[1], _, g.Eb, 0, w, 0), h.Na = v.Na = (0 < _) + 0, 1 < _) ar(w, 0, l, m);else {
                    var S = w[0] + 3 >> 3;

                    for (w = 0; 256 > w; w += 16) l[m + w] = S;
                  }
                  x = 1, A = d[0];
                }
                var P = 15 & h.la,
                    F = 15 & v.la;

                for (w = 0; 4 > w; ++w) {
                  var I = 1 & F;

                  for (S = L = 0; 4 > S; ++S) P = P >> 1 | (I = (_ = ri(f, A, _ = I + (1 & P), g.Sc, x, l, m)) > x) << 7, L = L << 2 | (3 < _ ? 3 : 1 < _ ? 2 : 0 != l[m + 0]), m += 16;

                  P >>= 4, F = F >> 1 | I << 7, b = (b << 8 | L) >>> 0;
                }

                for (A = P, x = F >> 4, N = 0; 4 > N; N += 2) {
                  for (L = 0, P = h.la >> 4 + N, F = v.la >> 4 + N, w = 0; 2 > w; ++w) {
                    for (I = 1 & F, S = 0; 2 > S; ++S) _ = I + (1 & P), P = P >> 1 | (I = 0 < (_ = ri(f, d[2], _, g.Qc, 0, l, m))) << 3, L = L << 2 | (3 < _ ? 3 : 1 < _ ? 2 : 0 != l[m + 0]), m += 16;

                    P >>= 2, F = F >> 1 | I << 5;
                  }

                  y |= L << 4 * N, A |= P << 4 << N, x |= (240 & F) << N;
                }

                h.la = A, v.la = x, p.Hc = b, p.Gc = y, p.ia = 43690 & y ? 0 : g.ia, d = !(b | y);
              }
              if (0 < u.L && (u.wa[u.Y + u.ja] = u.gd[o.$b][o.Za], u.wa[u.Y + u.ja].La |= !d), c.Ka) return Jt(t, 7, "Premature end-of-file encountered.");
            }

            if ($t(t), u = n, c = 1, o = (s = t).D, h = 0 < s.L && s.M >= s.zb && s.M <= s.Va, 0 == s.Aa) t: {
              if (o.M = s.M, o.uc = h, On(s, o), c = 1, o = (L = s.D).Nb, h = (y = Ti[s.L]) * s.R, f = y / 2 * s.B, w = 16 * o * s.R, S = 8 * o * s.B, d = s.sa, p = s.ta - h + w, g = s.qa, l = s.ra - f + S, m = s.Ha, v = s.Ia - f + S, F = 0 == (P = L.M), b = P >= s.Va - 1, 2 == s.Aa && On(s, L), L.uc) for (I = (_ = s).D.M, e(_.D.uc), L = _.yb; L < _.Hb; ++L) {
                x = L, A = I;
                var C = (j = (U = _).D).Nb;
                N = U.R;
                var j = j.wa[j.Y + x],
                    B = U.sa,
                    O = U.ta + 16 * C * N + 16 * x,
                    M = j.dd,
                    E = j.tc;
                if (0 != E) if (e(3 <= E), 1 == U.L) 0 < x && wr(B, O, N, E + 4), j.La && Lr(B, O, N, E), 0 < A && yr(B, O, N, E + 4), j.La && Nr(B, O, N, E);else {
                  var q = U.B,
                      R = U.qa,
                      T = U.ra + 8 * C * q + 8 * x,
                      D = U.Ha,
                      U = U.Ia + 8 * C * q + 8 * x;
                  C = j.ld;
                  0 < x && (fr(B, O, N, E + 4, M, C), pr(R, T, D, U, q, E + 4, M, C)), j.La && (mr(B, O, N, E, M, C), br(R, T, D, U, q, E, M, C)), 0 < A && (lr(B, O, N, E + 4, M, C), dr(R, T, D, U, q, E + 4, M, C)), j.La && (gr(B, O, N, E, M, C), vr(R, T, D, U, q, E, M, C));
                }
              }

              if (s.ia && alert("todo:DitherRow"), null != u.put) {
                if (L = 16 * P, P = 16 * (P + 1), F ? (u.y = s.sa, u.O = s.ta + w, u.f = s.qa, u.N = s.ra + S, u.ea = s.Ha, u.W = s.Ia + S) : (L -= y, u.y = d, u.O = p, u.f = g, u.N = l, u.ea = m, u.W = v), b || (P -= y), P > u.o && (P = u.o), u.F = null, u.J = null, null != s.Fa && 0 < s.Fa.length && L < P && (u.J = fn(s, u, L, P - L), u.F = s.mb, null == u.F && 0 == u.F.length)) {
                  c = Jt(s, 3, "Could not decode alpha data.");
                  break t;
                }

                L < u.j && (y = u.j - L, L = u.j, e(!(1 & y)), u.O += s.R * y, u.N += s.B * (y >> 1), u.W += s.B * (y >> 1), null != u.F && (u.J += u.width * y)), L < P && (u.O += u.v, u.N += u.v >> 1, u.W += u.v >> 1, null != u.F && (u.J += u.v), u.ka = L - u.j, u.U = u.va - u.v, u.T = P - L, c = u.put(u));
              }

              o + 1 != s.Ic || b || (r(s.sa, s.ta - h, d, p + 16 * s.R, h), r(s.qa, s.ra - f, g, l + 8 * s.B, f), r(s.Ha, s.Ia - f, m, v + 8 * s.B, f));
            }
            if (!c) return Jt(t, 6, "Output aborted.");
          }

          return 1;
        }(t, n)), null != n.bc && n.bc(n), s &= 1;
      }

      return s ? (t.cb = 0, s) : 0;
    }

    function te(t, e, n, r, i) {
      i = t[e + n + 32 * r] + (i >> 3), t[e + n + 32 * r] = -256 & i ? 0 > i ? 0 : 255 : i;
    }

    function ee(t, e, n, r, i, a) {
      te(t, e, 0, n, r + i), te(t, e, 1, n, r + a), te(t, e, 2, n, r - a), te(t, e, 3, n, r - i);
    }

    function ne(t) {
      return (20091 * t >> 16) + t;
    }

    function re(t, e, n, r) {
      var i,
          o = 0,
          s = a(16);

      for (i = 0; 4 > i; ++i) {
        var u = t[e + 0] + t[e + 8],
            c = t[e + 0] - t[e + 8],
            h = (35468 * t[e + 4] >> 16) - ne(t[e + 12]),
            l = ne(t[e + 4]) + (35468 * t[e + 12] >> 16);
        s[o + 0] = u + l, s[o + 1] = c + h, s[o + 2] = c - h, s[o + 3] = u - l, o += 4, e++;
      }

      for (i = o = 0; 4 > i; ++i) u = (t = s[o + 0] + 4) + s[o + 8], c = t - s[o + 8], h = (35468 * s[o + 4] >> 16) - ne(s[o + 12]), te(n, r, 0, 0, u + (l = ne(s[o + 4]) + (35468 * s[o + 12] >> 16))), te(n, r, 1, 0, c + h), te(n, r, 2, 0, c - h), te(n, r, 3, 0, u - l), o++, r += 32;
    }

    function ie(t, e, n, r) {
      var i = t[e + 0] + 4,
          a = 35468 * t[e + 4] >> 16,
          o = ne(t[e + 4]),
          s = 35468 * t[e + 1] >> 16;
      ee(n, r, 0, i + o, t = ne(t[e + 1]), s), ee(n, r, 1, i + a, t, s), ee(n, r, 2, i - a, t, s), ee(n, r, 3, i - o, t, s);
    }

    function ae(t, e, n, r, i) {
      re(t, e, n, r), i && re(t, e + 16, n, r + 4);
    }

    function oe(t, e, n, r) {
      or(t, e + 0, n, r, 1), or(t, e + 32, n, r + 128, 1);
    }

    function se(t, e, n, r) {
      var i;

      for (t = t[e + 0] + 4, i = 0; 4 > i; ++i) for (e = 0; 4 > e; ++e) te(n, r, e, i, t);
    }

    function ue(t, e, n, r) {
      t[e + 0] && cr(t, e + 0, n, r), t[e + 16] && cr(t, e + 16, n, r + 4), t[e + 32] && cr(t, e + 32, n, r + 128), t[e + 48] && cr(t, e + 48, n, r + 128 + 4);
    }

    function ce(t, e, n, r) {
      var i,
          o = a(16);

      for (i = 0; 4 > i; ++i) {
        var s = t[e + 0 + i] + t[e + 12 + i],
            u = t[e + 4 + i] + t[e + 8 + i],
            c = t[e + 4 + i] - t[e + 8 + i],
            h = t[e + 0 + i] - t[e + 12 + i];
        o[0 + i] = s + u, o[8 + i] = s - u, o[4 + i] = h + c, o[12 + i] = h - c;
      }

      for (i = 0; 4 > i; ++i) s = (t = o[0 + 4 * i] + 3) + o[3 + 4 * i], u = o[1 + 4 * i] + o[2 + 4 * i], c = o[1 + 4 * i] - o[2 + 4 * i], h = t - o[3 + 4 * i], n[r + 0] = s + u >> 3, n[r + 16] = h + c >> 3, n[r + 32] = s - u >> 3, n[r + 48] = h - c >> 3, r += 64;
    }

    function he(t, e, n) {
      var r,
          i = e - 32,
          a = Or,
          o = 255 - t[i - 1];

      for (r = 0; r < n; ++r) {
        var s,
            u = a,
            c = o + t[e - 1];

        for (s = 0; s < n; ++s) t[e + s] = u[c + t[i + s]];

        e += 32;
      }
    }

    function le(t, e) {
      he(t, e, 4);
    }

    function fe(t, e) {
      he(t, e, 8);
    }

    function de(t, e) {
      he(t, e, 16);
    }

    function pe(t, e) {
      var n;

      for (n = 0; 16 > n; ++n) r(t, e + 32 * n, t, e - 32, 16);
    }

    function ge(t, e) {
      var n;

      for (n = 16; 0 < n; --n) i(t, e, t[e - 1], 16), e += 32;
    }

    function me(t, e, n) {
      var r;

      for (r = 0; 16 > r; ++r) i(e, n + 32 * r, t, 16);
    }

    function ve(t, e) {
      var n,
          r = 16;

      for (n = 0; 16 > n; ++n) r += t[e - 1 + 32 * n] + t[e + n - 32];

      me(r >> 5, t, e);
    }

    function be(t, e) {
      var n,
          r = 8;

      for (n = 0; 16 > n; ++n) r += t[e - 1 + 32 * n];

      me(r >> 4, t, e);
    }

    function ye(t, e) {
      var n,
          r = 8;

      for (n = 0; 16 > n; ++n) r += t[e + n - 32];

      me(r >> 4, t, e);
    }

    function we(t, e) {
      me(128, t, e);
    }

    function Ne(t, e, n) {
      return t + 2 * e + n + 2 >> 2;
    }

    function Le(t, e) {
      var n,
          i = e - 32;
      i = new Uint8Array([Ne(t[i - 1], t[i + 0], t[i + 1]), Ne(t[i + 0], t[i + 1], t[i + 2]), Ne(t[i + 1], t[i + 2], t[i + 3]), Ne(t[i + 2], t[i + 3], t[i + 4])]);

      for (n = 0; 4 > n; ++n) r(t, e + 32 * n, i, 0, i.length);
    }

    function xe(t, e) {
      var n = t[e - 1],
          r = t[e - 1 + 32],
          i = t[e - 1 + 64],
          a = t[e - 1 + 96];
      F(t, e + 0, 16843009 * Ne(t[e - 1 - 32], n, r)), F(t, e + 32, 16843009 * Ne(n, r, i)), F(t, e + 64, 16843009 * Ne(r, i, a)), F(t, e + 96, 16843009 * Ne(i, a, a));
    }

    function Ae(t, e) {
      var n,
          r = 4;

      for (n = 0; 4 > n; ++n) r += t[e + n - 32] + t[e - 1 + 32 * n];

      for (r >>= 3, n = 0; 4 > n; ++n) i(t, e + 32 * n, r, 4);
    }

    function _e(t, e) {
      var n = t[e - 1 + 0],
          r = t[e - 1 + 32],
          i = t[e - 1 + 64],
          a = t[e - 1 - 32],
          o = t[e + 0 - 32],
          s = t[e + 1 - 32],
          u = t[e + 2 - 32],
          c = t[e + 3 - 32];
      t[e + 0 + 96] = Ne(r, i, t[e - 1 + 96]), t[e + 1 + 96] = t[e + 0 + 64] = Ne(n, r, i), t[e + 2 + 96] = t[e + 1 + 64] = t[e + 0 + 32] = Ne(a, n, r), t[e + 3 + 96] = t[e + 2 + 64] = t[e + 1 + 32] = t[e + 0 + 0] = Ne(o, a, n), t[e + 3 + 64] = t[e + 2 + 32] = t[e + 1 + 0] = Ne(s, o, a), t[e + 3 + 32] = t[e + 2 + 0] = Ne(u, s, o), t[e + 3 + 0] = Ne(c, u, s);
    }

    function Se(t, e) {
      var n = t[e + 1 - 32],
          r = t[e + 2 - 32],
          i = t[e + 3 - 32],
          a = t[e + 4 - 32],
          o = t[e + 5 - 32],
          s = t[e + 6 - 32],
          u = t[e + 7 - 32];
      t[e + 0 + 0] = Ne(t[e + 0 - 32], n, r), t[e + 1 + 0] = t[e + 0 + 32] = Ne(n, r, i), t[e + 2 + 0] = t[e + 1 + 32] = t[e + 0 + 64] = Ne(r, i, a), t[e + 3 + 0] = t[e + 2 + 32] = t[e + 1 + 64] = t[e + 0 + 96] = Ne(i, a, o), t[e + 3 + 32] = t[e + 2 + 64] = t[e + 1 + 96] = Ne(a, o, s), t[e + 3 + 64] = t[e + 2 + 96] = Ne(o, s, u), t[e + 3 + 96] = Ne(s, u, u);
    }

    function Pe(t, e) {
      var n = t[e - 1 + 0],
          r = t[e - 1 + 32],
          i = t[e - 1 + 64],
          a = t[e - 1 - 32],
          o = t[e + 0 - 32],
          s = t[e + 1 - 32],
          u = t[e + 2 - 32],
          c = t[e + 3 - 32];
      t[e + 0 + 0] = t[e + 1 + 64] = a + o + 1 >> 1, t[e + 1 + 0] = t[e + 2 + 64] = o + s + 1 >> 1, t[e + 2 + 0] = t[e + 3 + 64] = s + u + 1 >> 1, t[e + 3 + 0] = u + c + 1 >> 1, t[e + 0 + 96] = Ne(i, r, n), t[e + 0 + 64] = Ne(r, n, a), t[e + 0 + 32] = t[e + 1 + 96] = Ne(n, a, o), t[e + 1 + 32] = t[e + 2 + 96] = Ne(a, o, s), t[e + 2 + 32] = t[e + 3 + 96] = Ne(o, s, u), t[e + 3 + 32] = Ne(s, u, c);
    }

    function ke(t, e) {
      var n = t[e + 0 - 32],
          r = t[e + 1 - 32],
          i = t[e + 2 - 32],
          a = t[e + 3 - 32],
          o = t[e + 4 - 32],
          s = t[e + 5 - 32],
          u = t[e + 6 - 32],
          c = t[e + 7 - 32];
      t[e + 0 + 0] = n + r + 1 >> 1, t[e + 1 + 0] = t[e + 0 + 64] = r + i + 1 >> 1, t[e + 2 + 0] = t[e + 1 + 64] = i + a + 1 >> 1, t[e + 3 + 0] = t[e + 2 + 64] = a + o + 1 >> 1, t[e + 0 + 32] = Ne(n, r, i), t[e + 1 + 32] = t[e + 0 + 96] = Ne(r, i, a), t[e + 2 + 32] = t[e + 1 + 96] = Ne(i, a, o), t[e + 3 + 32] = t[e + 2 + 96] = Ne(a, o, s), t[e + 3 + 64] = Ne(o, s, u), t[e + 3 + 96] = Ne(s, u, c);
    }

    function Fe(t, e) {
      var n = t[e - 1 + 0],
          r = t[e - 1 + 32],
          i = t[e - 1 + 64],
          a = t[e - 1 + 96];
      t[e + 0 + 0] = n + r + 1 >> 1, t[e + 2 + 0] = t[e + 0 + 32] = r + i + 1 >> 1, t[e + 2 + 32] = t[e + 0 + 64] = i + a + 1 >> 1, t[e + 1 + 0] = Ne(n, r, i), t[e + 3 + 0] = t[e + 1 + 32] = Ne(r, i, a), t[e + 3 + 32] = t[e + 1 + 64] = Ne(i, a, a), t[e + 3 + 64] = t[e + 2 + 64] = t[e + 0 + 96] = t[e + 1 + 96] = t[e + 2 + 96] = t[e + 3 + 96] = a;
    }

    function Ie(t, e) {
      var n = t[e - 1 + 0],
          r = t[e - 1 + 32],
          i = t[e - 1 + 64],
          a = t[e - 1 + 96],
          o = t[e - 1 - 32],
          s = t[e + 0 - 32],
          u = t[e + 1 - 32],
          c = t[e + 2 - 32];
      t[e + 0 + 0] = t[e + 2 + 32] = n + o + 1 >> 1, t[e + 0 + 32] = t[e + 2 + 64] = r + n + 1 >> 1, t[e + 0 + 64] = t[e + 2 + 96] = i + r + 1 >> 1, t[e + 0 + 96] = a + i + 1 >> 1, t[e + 3 + 0] = Ne(s, u, c), t[e + 2 + 0] = Ne(o, s, u), t[e + 1 + 0] = t[e + 3 + 32] = Ne(n, o, s), t[e + 1 + 32] = t[e + 3 + 64] = Ne(r, n, o), t[e + 1 + 64] = t[e + 3 + 96] = Ne(i, r, n), t[e + 1 + 96] = Ne(a, i, r);
    }

    function Ce(t, e) {
      var n;

      for (n = 0; 8 > n; ++n) r(t, e + 32 * n, t, e - 32, 8);
    }

    function je(t, e) {
      var n;

      for (n = 0; 8 > n; ++n) i(t, e, t[e - 1], 8), e += 32;
    }

    function Be(t, e, n) {
      var r;

      for (r = 0; 8 > r; ++r) i(e, n + 32 * r, t, 8);
    }

    function Oe(t, e) {
      var n,
          r = 8;

      for (n = 0; 8 > n; ++n) r += t[e + n - 32] + t[e - 1 + 32 * n];

      Be(r >> 4, t, e);
    }

    function Me(t, e) {
      var n,
          r = 4;

      for (n = 0; 8 > n; ++n) r += t[e + n - 32];

      Be(r >> 3, t, e);
    }

    function Ee(t, e) {
      var n,
          r = 4;

      for (n = 0; 8 > n; ++n) r += t[e - 1 + 32 * n];

      Be(r >> 3, t, e);
    }

    function qe(t, e) {
      Be(128, t, e);
    }

    function Re(t, e, n) {
      var r = t[e - n],
          i = t[e + 0],
          a = 3 * (i - r) + jr[1020 + t[e - 2 * n] - t[e + n]],
          o = Br[112 + (a + 4 >> 3)];
      t[e - n] = Or[255 + r + Br[112 + (a + 3 >> 3)]], t[e + 0] = Or[255 + i - o];
    }

    function Te(t, e, n, r) {
      var i = t[e + 0],
          a = t[e + n];
      return Mr[255 + t[e - 2 * n] - t[e - n]] > r || Mr[255 + a - i] > r;
    }

    function De(t, e, n, r) {
      return 4 * Mr[255 + t[e - n] - t[e + 0]] + Mr[255 + t[e - 2 * n] - t[e + n]] <= r;
    }

    function Ue(t, e, n, r, i) {
      var a = t[e - 3 * n],
          o = t[e - 2 * n],
          s = t[e - n],
          u = t[e + 0],
          c = t[e + n],
          h = t[e + 2 * n],
          l = t[e + 3 * n];
      return 4 * Mr[255 + s - u] + Mr[255 + o - c] > r ? 0 : Mr[255 + t[e - 4 * n] - a] <= i && Mr[255 + a - o] <= i && Mr[255 + o - s] <= i && Mr[255 + l - h] <= i && Mr[255 + h - c] <= i && Mr[255 + c - u] <= i;
    }

    function ze(t, e, n, r) {
      var i = 2 * r + 1;

      for (r = 0; 16 > r; ++r) De(t, e + r, n, i) && Re(t, e + r, n);
    }

    function He(t, e, n, r) {
      var i = 2 * r + 1;

      for (r = 0; 16 > r; ++r) De(t, e + r * n, 1, i) && Re(t, e + r * n, 1);
    }

    function We(t, e, n, r) {
      var i;

      for (i = 3; 0 < i; --i) ze(t, e += 4 * n, n, r);
    }

    function Ve(t, e, n, r) {
      var i;

      for (i = 3; 0 < i; --i) He(t, e += 4, n, r);
    }

    function Ge(t, e, n, r, i, a, o, s) {
      for (a = 2 * a + 1; 0 < i--;) {
        if (Ue(t, e, n, a, o)) if (Te(t, e, n, s)) Re(t, e, n);else {
          var u = t,
              c = e,
              h = n,
              l = u[c - 2 * h],
              f = u[c - h],
              d = u[c + 0],
              p = u[c + h],
              g = u[c + 2 * h],
              m = 27 * (b = jr[1020 + 3 * (d - f) + jr[1020 + l - p]]) + 63 >> 7,
              v = 18 * b + 63 >> 7,
              b = 9 * b + 63 >> 7;
          u[c - 3 * h] = Or[255 + u[c - 3 * h] + b], u[c - 2 * h] = Or[255 + l + v], u[c - h] = Or[255 + f + m], u[c + 0] = Or[255 + d - m], u[c + h] = Or[255 + p - v], u[c + 2 * h] = Or[255 + g - b];
        }
        e += r;
      }
    }

    function Ye(t, e, n, r, i, a, o, s) {
      for (a = 2 * a + 1; 0 < i--;) {
        if (Ue(t, e, n, a, o)) if (Te(t, e, n, s)) Re(t, e, n);else {
          var u = t,
              c = e,
              h = n,
              l = u[c - h],
              f = u[c + 0],
              d = u[c + h],
              p = Br[112 + ((g = 3 * (f - l)) + 4 >> 3)],
              g = Br[112 + (g + 3 >> 3)],
              m = p + 1 >> 1;
          u[c - 2 * h] = Or[255 + u[c - 2 * h] + m], u[c - h] = Or[255 + l + g], u[c + 0] = Or[255 + f - p], u[c + h] = Or[255 + d - m];
        }
        e += r;
      }
    }

    function Je(t, e, n, r, i, a) {
      Ge(t, e, n, 1, 16, r, i, a);
    }

    function Xe(t, e, n, r, i, a) {
      Ge(t, e, 1, n, 16, r, i, a);
    }

    function Ke(t, e, n, r, i, a) {
      var o;

      for (o = 3; 0 < o; --o) Ye(t, e += 4 * n, n, 1, 16, r, i, a);
    }

    function Ze(t, e, n, r, i, a) {
      var o;

      for (o = 3; 0 < o; --o) Ye(t, e += 4, 1, n, 16, r, i, a);
    }

    function $e(t, e, n, r, i, a, o, s) {
      Ge(t, e, i, 1, 8, a, o, s), Ge(n, r, i, 1, 8, a, o, s);
    }

    function Qe(t, e, n, r, i, a, o, s) {
      Ge(t, e, 1, i, 8, a, o, s), Ge(n, r, 1, i, 8, a, o, s);
    }

    function tn(t, e, n, r, i, a, o, s) {
      Ye(t, e + 4 * i, i, 1, 8, a, o, s), Ye(n, r + 4 * i, i, 1, 8, a, o, s);
    }

    function en(t, e, n, r, i, a, o, s) {
      Ye(t, e + 4, 1, i, 8, a, o, s), Ye(n, r + 4, 1, i, 8, a, o, s);
    }

    function nn() {
      this.ba = new ot(), this.ec = [], this.cc = [], this.Mc = [], this.Dc = this.Nc = this.dc = this.fc = 0, this.Oa = new ut(), this.memory = 0, this.Ib = "OutputFunc", this.Jb = "OutputAlphaFunc", this.Nd = "OutputRowFunc";
    }

    function rn() {
      this.data = [], this.offset = this.kd = this.ha = this.w = 0, this.na = [], this.xa = this.gb = this.Ja = this.Sa = this.P = 0;
    }

    function an() {
      this.nc = this.Ea = this.b = this.hc = 0, this.K = [], this.w = 0;
    }

    function on() {
      this.ua = 0, this.Wa = new M(), this.vb = new M(), this.md = this.xc = this.wc = 0, this.vc = [], this.Wb = 0, this.Ya = new d(), this.yc = new l();
    }

    function sn() {
      this.xb = this.a = 0, this.l = new Gt(), this.ca = new ot(), this.V = [], this.Ba = 0, this.Ta = [], this.Ua = 0, this.m = new N(), this.Pb = 0, this.wd = new N(), this.Ma = this.$ = this.C = this.i = this.c = this.xd = 0, this.s = new on(), this.ab = 0, this.gc = o(4, an), this.Oc = 0;
    }

    function un() {
      this.Lc = this.Z = this.$a = this.i = this.c = 0, this.l = new Gt(), this.ic = 0, this.ca = [], this.tb = 0, this.qd = null, this.rd = 0;
    }

    function cn(t, e, n, r, i, a, o) {
      for (t = null == t ? 0 : t[e + 0], e = 0; e < o; ++e) i[a + e] = t + n[r + e] & 255, t = i[a + e];
    }

    function hn(t, e, n, r, i, a, o) {
      var s;
      if (null == t) cn(null, null, n, r, i, a, o);else for (s = 0; s < o; ++s) i[a + s] = t[e + s] + n[r + s] & 255;
    }

    function ln(t, e, n, r, i, a, o) {
      if (null == t) cn(null, null, n, r, i, a, o);else {
        var s,
            u = t[e + 0],
            c = u,
            h = u;

        for (s = 0; s < o; ++s) c = h + (u = t[e + s]) - c, h = n[r + s] + (-256 & c ? 0 > c ? 0 : 255 : c) & 255, c = u, i[a + s] = h;
      }
    }

    function fn(t, n, i, o) {
      var s = n.width,
          u = n.o;
      if (e(null != t && null != n), 0 > i || 0 >= o || i + o > u) return null;

      if (!t.Cc) {
        if (null == t.ga) {
          var c;

          if (t.ga = new un(), (c = null == t.ga) || (c = n.width * n.o, e(0 == t.Gb.length), t.Gb = a(c), t.Uc = 0, null == t.Gb ? c = 0 : (t.mb = t.Gb, t.nb = t.Uc, t.rc = null, c = 1), c = !c), !c) {
            c = t.ga;
            var h = t.Fa,
                l = t.P,
                f = t.qc,
                d = t.mb,
                p = t.nb,
                g = l + 1,
                m = f - 1,
                b = c.l;
            if (e(null != h && null != d && null != n), mi[0] = null, mi[1] = cn, mi[2] = hn, mi[3] = ln, c.ca = d, c.tb = p, c.c = n.width, c.i = n.height, e(0 < c.c && 0 < c.i), 1 >= f) n = 0;else if (c.$a = h[l + 0] >> 0 & 3, c.Z = h[l + 0] >> 2 & 3, c.Lc = h[l + 0] >> 4 & 3, l = h[l + 0] >> 6 & 3, 0 > c.$a || 1 < c.$a || 4 <= c.Z || 1 < c.Lc || l) n = 0;else if (b.put = dt, b.ac = ft, b.bc = pt, b.ma = c, b.width = n.width, b.height = n.height, b.Da = n.Da, b.v = n.v, b.va = n.va, b.j = n.j, b.o = n.o, c.$a) t: {
              e(1 == c.$a), n = kt();

              e: for (;;) {
                if (null == n) {
                  n = 0;
                  break t;
                }

                if (e(null != c), c.mc = n, n.c = c.c, n.i = c.i, n.l = c.l, n.l.ma = c, n.l.width = c.c, n.l.height = c.i, n.a = 0, v(n.m, h, g, m), !Ft(c.c, c.i, 1, n, null)) break e;
                if (1 == n.ab && 3 == n.gc[0].hc && xt(n.s) ? (c.ic = 1, h = n.c * n.i, n.Ta = null, n.Ua = 0, n.V = a(h), n.Ba = 0, null == n.V ? (n.a = 1, n = 0) : n = 1) : (c.ic = 0, n = It(n, c.c)), !n) break e;
                n = 1;
                break t;
              }

              c.mc = null, n = 0;
            } else n = m >= c.c * c.i;
            c = !n;
          }

          if (c) return null;
          1 != t.ga.Lc ? t.Ga = 0 : o = u - i;
        }

        e(null != t.ga), e(i + o <= u);

        t: {
          if (n = (h = t.ga).c, u = h.l.o, 0 == h.$a) {
            if (g = t.rc, m = t.Vc, b = t.Fa, l = t.P + 1 + i * n, f = t.mb, d = t.nb + i * n, e(l <= t.P + t.qc), 0 != h.Z) for (e(null != mi[h.Z]), c = 0; c < o; ++c) mi[h.Z](g, m, b, l, f, d, n), g = f, m = d, d += n, l += n;else for (c = 0; c < o; ++c) r(f, d, b, l, n), g = f, m = d, d += n, l += n;
            t.rc = g, t.Vc = m;
          } else {
            if (e(null != h.mc), n = i + o, e(null != (c = h.mc)), e(n <= c.i), c.C >= n) n = 1;else if (h.ic || vn(), h.ic) {
              h = c.V, g = c.Ba, m = c.c;
              var y = c.i,
                  w = (b = 1, l = c.$ / m, f = c.$ % m, d = c.m, p = c.s, c.$),
                  N = m * y,
                  L = m * n,
                  A = p.wc,
                  S = w < L ? wt(p, f, l) : null;
              e(w <= N), e(n <= y), e(xt(p));

              e: for (;;) {
                for (; !d.h && w < L;) {
                  if (f & A || (S = wt(p, f, l)), e(null != S), _(d), 256 > (y = bt(S.G[0], S.H[0], d))) h[g + w] = y, ++w, ++f >= m && (f = 0, ++l <= n && !(l % 16) && _t(c, l));else {
                    if (!(280 > y)) {
                      b = 0;
                      break e;
                    }

                    y = mt(y - 256, d);
                    var P,
                        k = bt(S.G[4], S.H[4], d);

                    if (_(d), !(w >= (k = vt(m, k = mt(k, d))) && N - w >= y)) {
                      b = 0;
                      break e;
                    }

                    for (P = 0; P < y; ++P) h[g + w + P] = h[g + w + P - k];

                    for (w += y, f += y; f >= m;) f -= m, ++l <= n && !(l % 16) && _t(c, l);

                    w < L && f & A && (S = wt(p, f, l));
                  }
                  e(d.h == x(d));
                }

                _t(c, l > n ? n : l);

                break e;
              }

              !b || d.h && w < N ? (b = 0, c.a = d.h ? 5 : 3) : c.$ = w, n = b;
            } else n = St(c, c.V, c.Ba, c.c, c.i, n, Ct);

            if (!n) {
              o = 0;
              break t;
            }
          }

          i + o >= u && (t.Cc = 1), o = 1;
        }

        if (!o) return null;
        if (t.Cc && (null != (o = t.ga) && (o.mc = null), t.ga = null, 0 < t.Ga)) return alert("todo:WebPDequantizeLevels"), null;
      }

      return t.nb + i * s;
    }

    function dn(t, e, n, r, i, a) {
      for (; 0 < i--;) {
        var o,
            s = t,
            u = e + (n ? 1 : 0),
            c = t,
            h = e + (n ? 0 : 3);

        for (o = 0; o < r; ++o) {
          var l = c[h + 4 * o];
          255 != l && (l *= 32897, s[u + 4 * o + 0] = s[u + 4 * o + 0] * l >> 23, s[u + 4 * o + 1] = s[u + 4 * o + 1] * l >> 23, s[u + 4 * o + 2] = s[u + 4 * o + 2] * l >> 23);
        }

        e += a;
      }
    }

    function pn(t, e, n, r, i) {
      for (; 0 < r--;) {
        var a;

        for (a = 0; a < n; ++a) {
          var o = t[e + 2 * a + 0],
              s = 15 & (c = t[e + 2 * a + 1]),
              u = 4369 * s,
              c = (240 & c | c >> 4) * u >> 16;
          t[e + 2 * a + 0] = (240 & o | o >> 4) * u >> 16 & 240 | (15 & o | o << 4) * u >> 16 >> 4 & 15, t[e + 2 * a + 1] = 240 & c | s;
        }

        e += i;
      }
    }

    function gn(t, e, n, r, i, a, o, s) {
      var u,
          c,
          h = 255;

      for (c = 0; c < i; ++c) {
        for (u = 0; u < r; ++u) {
          var l = t[e + u];
          a[o + 4 * u] = l, h &= l;
        }

        e += n, o += s;
      }

      return 255 != h;
    }

    function mn(t, e, n, r, i) {
      var a;

      for (a = 0; a < i; ++a) n[r + a] = t[e + a] >> 8;
    }

    function vn() {
      xr = dn, Ar = pn, _r = gn, Sr = mn;
    }

    function bn(n, r, i) {
      t[n] = function (t, n, a, o, s, u, c, h, l, f, d, p, g, m, v, b, y) {
        var w,
            N = y - 1 >> 1,
            L = s[u + 0] | c[h + 0] << 16,
            x = l[f + 0] | d[p + 0] << 16;
        e(null != t);
        var A = 3 * L + x + 131074 >> 2;

        for (r(t[n + 0], 255 & A, A >> 16, g, m), null != a && (A = 3 * x + L + 131074 >> 2, r(a[o + 0], 255 & A, A >> 16, v, b)), w = 1; w <= N; ++w) {
          var _ = s[u + w] | c[h + w] << 16,
              S = l[f + w] | d[p + w] << 16,
              P = L + _ + x + S + 524296,
              k = P + 2 * (_ + x) >> 3;

          A = k + L >> 1, L = (P = P + 2 * (L + S) >> 3) + _ >> 1, r(t[n + 2 * w - 1], 255 & A, A >> 16, g, m + (2 * w - 1) * i), r(t[n + 2 * w - 0], 255 & L, L >> 16, g, m + (2 * w - 0) * i), null != a && (A = P + x >> 1, L = k + S >> 1, r(a[o + 2 * w - 1], 255 & A, A >> 16, v, b + (2 * w - 1) * i), r(a[o + 2 * w + 0], 255 & L, L >> 16, v, b + (2 * w + 0) * i)), L = _, x = S;
        }

        1 & y || (A = 3 * L + x + 131074 >> 2, r(t[n + y - 1], 255 & A, A >> 16, g, m + (y - 1) * i), null != a && (A = 3 * x + L + 131074 >> 2, r(a[o + y - 1], 255 & A, A >> 16, v, b + (y - 1) * i)));
      };
    }

    function yn() {
      vi[Er] = bi, vi[qr] = wi, vi[Rr] = yi, vi[Tr] = Ni, vi[Dr] = Li, vi[Ur] = xi, vi[zr] = Ai, vi[Hr] = wi, vi[Wr] = Ni, vi[Vr] = Li, vi[Gr] = xi;
    }

    function wn(t) {
      return t & ~Ii ? 0 > t ? 0 : 255 : t >> Fi;
    }

    function Nn(t, e) {
      return wn((19077 * t >> 8) + (26149 * e >> 8) - 14234);
    }

    function Ln(t, e, n) {
      return wn((19077 * t >> 8) - (6419 * e >> 8) - (13320 * n >> 8) + 8708);
    }

    function xn(t, e) {
      return wn((19077 * t >> 8) + (33050 * e >> 8) - 17685);
    }

    function An(t, e, n, r, i) {
      r[i + 0] = Nn(t, n), r[i + 1] = Ln(t, e, n), r[i + 2] = xn(t, e);
    }

    function _n(t, e, n, r, i) {
      r[i + 0] = xn(t, e), r[i + 1] = Ln(t, e, n), r[i + 2] = Nn(t, n);
    }

    function Sn(t, e, n, r, i) {
      var a = Ln(t, e, n);
      e = a << 3 & 224 | xn(t, e) >> 3, r[i + 0] = 248 & Nn(t, n) | a >> 5, r[i + 1] = e;
    }

    function Pn(t, e, n, r, i) {
      var a = 240 & xn(t, e) | 15;
      r[i + 0] = 240 & Nn(t, n) | Ln(t, e, n) >> 4, r[i + 1] = a;
    }

    function kn(t, e, n, r, i) {
      r[i + 0] = 255, An(t, e, n, r, i + 1);
    }

    function Fn(t, e, n, r, i) {
      _n(t, e, n, r, i), r[i + 3] = 255;
    }

    function In(t, e, n, r, i) {
      An(t, e, n, r, i), r[i + 3] = 255;
    }

    function Vt(t, e) {
      return 0 > t ? 0 : t > e ? e : t;
    }

    function Cn(e, n, r) {
      t[e] = function (t, e, i, a, o, s, u, c, h) {
        for (var l = c + (-2 & h) * r; c != l;) n(t[e + 0], i[a + 0], o[s + 0], u, c), n(t[e + 1], i[a + 0], o[s + 0], u, c + r), e += 2, ++a, ++s, c += 2 * r;

        1 & h && n(t[e + 0], i[a + 0], o[s + 0], u, c);
      };
    }

    function jn(t, e, n) {
      return 0 == n ? 0 == t ? 0 == e ? 6 : 5 : 0 == e ? 4 : 0 : n;
    }

    function Bn(t, e, n, r, i) {
      switch (t >>> 30) {
        case 3:
          or(e, n, r, i, 0);
          break;

        case 2:
          sr(e, n, r, i);
          break;

        case 1:
          cr(e, n, r, i);
      }
    }

    function On(t, e) {
      var n,
          a,
          o = e.M,
          s = e.Nb,
          u = t.oc,
          c = t.pc + 40,
          h = t.oc,
          l = t.pc + 584,
          f = t.oc,
          d = t.pc + 600;

      for (n = 0; 16 > n; ++n) u[c + 32 * n - 1] = 129;

      for (n = 0; 8 > n; ++n) h[l + 32 * n - 1] = 129, f[d + 32 * n - 1] = 129;

      for (0 < o ? u[c - 1 - 32] = h[l - 1 - 32] = f[d - 1 - 32] = 129 : (i(u, c - 32 - 1, 127, 21), i(h, l - 32 - 1, 127, 9), i(f, d - 32 - 1, 127, 9)), a = 0; a < t.za; ++a) {
        var p = e.ya[e.aa + a];

        if (0 < a) {
          for (n = -1; 16 > n; ++n) r(u, c + 32 * n - 4, u, c + 32 * n + 12, 4);

          for (n = -1; 8 > n; ++n) r(h, l + 32 * n - 4, h, l + 32 * n + 4, 4), r(f, d + 32 * n - 4, f, d + 32 * n + 4, 4);
        }

        var g = t.Gd,
            m = t.Hd + a,
            v = p.ad,
            b = p.Hc;

        if (0 < o && (r(u, c - 32, g[m].y, 0, 16), r(h, l - 32, g[m].f, 0, 8), r(f, d - 32, g[m].ea, 0, 8)), p.Za) {
          var y = u,
              w = c - 32 + 16;

          for (0 < o && (a >= t.za - 1 ? i(y, w, g[m].y[15], 4) : r(y, w, g[m + 1].y, 0, 4)), n = 0; 4 > n; n++) y[w + 128 + n] = y[w + 256 + n] = y[w + 384 + n] = y[w + 0 + n];

          for (n = 0; 16 > n; ++n, b <<= 2) y = u, w = c + Ri[n], fi[p.Ob[n]](y, w), Bn(b, v, 16 * +n, y, w);
        } else if (y = jn(a, o, p.Ob[0]), li[y](u, c), 0 != b) for (n = 0; 16 > n; ++n, b <<= 2) Bn(b, v, 16 * +n, u, c + Ri[n]);

        for (n = p.Gc, y = jn(a, o, p.Dd), di[y](h, l), di[y](f, d), b = v, y = h, w = l, 255 & (p = n >> 0) && (170 & p ? ur(b, 256, y, w) : hr(b, 256, y, w)), p = f, b = d, 255 & (n >>= 8) && (170 & n ? ur(v, 320, p, b) : hr(v, 320, p, b)), o < t.Ub - 1 && (r(g[m].y, 0, u, c + 480, 16), r(g[m].f, 0, h, l + 224, 8), r(g[m].ea, 0, f, d + 224, 8)), n = 8 * s * t.B, g = t.sa, m = t.ta + 16 * a + 16 * s * t.R, v = t.qa, p = t.ra + 8 * a + n, b = t.Ha, y = t.Ia + 8 * a + n, n = 0; 16 > n; ++n) r(g, m + n * t.R, u, c + 32 * n, 16);

        for (n = 0; 8 > n; ++n) r(v, p + n * t.B, h, l + 32 * n, 8), r(b, y + n * t.B, f, d + 32 * n, 8);
      }
    }

    function Mn(t, r, i, a, o, s, u, c, h) {
      var l = [0],
          f = [0],
          d = 0,
          p = null != h ? h.kd : 0,
          g = null != h ? h : new rn();
      if (null == t || 12 > i) return 7;
      g.data = t, g.w = r, g.ha = i, r = [r], i = [i], g.gb = [g.gb];

      t: {
        var m = r,
            b = i,
            y = g.gb;

        if (e(null != t), e(null != b), e(null != y), y[0] = 0, 12 <= b[0] && !n(t, m[0], "RIFF")) {
          if (n(t, m[0] + 8, "WEBP")) {
            y = 3;
            break t;
          }

          var w = j(t, m[0] + 4);

          if (12 > w || 4294967286 < w) {
            y = 3;
            break t;
          }

          if (p && w > b[0] - 8) {
            y = 7;
            break t;
          }

          y[0] = w, m[0] += 12, b[0] -= 12;
        }

        y = 0;
      }

      if (0 != y) return y;

      for (w = 0 < g.gb[0], i = i[0];;) {
        t: {
          var L = t;
          b = r, y = i;

          var x = l,
              A = f,
              _ = m = [0];

          if ((k = d = [d])[0] = 0, 8 > y[0]) y = 7;else {
            if (!n(L, b[0], "VP8X")) {
              if (10 != j(L, b[0] + 4)) {
                y = 3;
                break t;
              }

              if (18 > y[0]) {
                y = 7;
                break t;
              }

              var S = j(L, b[0] + 8),
                  P = 1 + C(L, b[0] + 12);

              if (2147483648 <= P * (L = 1 + C(L, b[0] + 15))) {
                y = 3;
                break t;
              }

              null != _ && (_[0] = S), null != x && (x[0] = P), null != A && (A[0] = L), b[0] += 18, y[0] -= 18, k[0] = 1;
            }

            y = 0;
          }
        }

        if (d = d[0], m = m[0], 0 != y) return y;
        if (b = !!(2 & m), !w && d) return 3;

        if (null != s && (s[0] = !!(16 & m)), null != u && (u[0] = b), null != c && (c[0] = 0), u = l[0], m = f[0], d && b && null == h) {
          y = 0;
          break;
        }

        if (4 > i) {
          y = 7;
          break;
        }

        if (w && d || !w && !d && !n(t, r[0], "ALPH")) {
          i = [i], g.na = [g.na], g.P = [g.P], g.Sa = [g.Sa];

          t: {
            S = t, y = r, w = i;
            var k = g.gb;
            x = g.na, A = g.P, _ = g.Sa;
            P = 22, e(null != S), e(null != w), L = y[0];
            var F = w[0];

            for (e(null != x), e(null != _), x[0] = null, A[0] = null, _[0] = 0;;) {
              if (y[0] = L, w[0] = F, 8 > F) {
                y = 7;
                break t;
              }

              var I = j(S, L + 4);

              if (4294967286 < I) {
                y = 3;
                break t;
              }

              var B = 8 + I + 1 & -2;

              if (P += B, 0 < k && P > k) {
                y = 3;
                break t;
              }

              if (!n(S, L, "VP8 ") || !n(S, L, "VP8L")) {
                y = 0;
                break t;
              }

              if (F[0] < B) {
                y = 7;
                break t;
              }

              n(S, L, "ALPH") || (x[0] = S, A[0] = L + 8, _[0] = I), L += B, F -= B;
            }
          }

          if (i = i[0], g.na = g.na[0], g.P = g.P[0], g.Sa = g.Sa[0], 0 != y) break;
        }

        i = [i], g.Ja = [g.Ja], g.xa = [g.xa];

        t: if (k = t, y = r, w = i, x = g.gb[0], A = g.Ja, _ = g.xa, S = y[0], L = !n(k, S, "VP8 "), P = !n(k, S, "VP8L"), e(null != k), e(null != w), e(null != A), e(null != _), 8 > w[0]) y = 7;else {
          if (L || P) {
            if (k = j(k, S + 4), 12 <= x && k > x - 12) {
              y = 3;
              break t;
            }

            if (p && k > w[0] - 8) {
              y = 7;
              break t;
            }

            A[0] = k, y[0] += 8, w[0] -= 8, _[0] = P;
          } else _[0] = 5 <= w[0] && 47 == k[S + 0] && !(k[S + 4] >> 5), A[0] = w[0];

          y = 0;
        }

        if (i = i[0], g.Ja = g.Ja[0], g.xa = g.xa[0], r = r[0], 0 != y) break;
        if (4294967286 < g.Ja) return 3;

        if (null == c || b || (c[0] = g.xa ? 2 : 1), u = [u], m = [m], g.xa) {
          if (5 > i) {
            y = 7;
            break;
          }

          c = u, p = m, b = s, null == t || 5 > i ? t = 0 : 5 <= i && 47 == t[r + 0] && !(t[r + 4] >> 5) ? (w = [0], k = [0], x = [0], v(A = new N(), t, r, i), gt(A, w, k, x) ? (null != c && (c[0] = w[0]), null != p && (p[0] = k[0]), null != b && (b[0] = x[0]), t = 1) : t = 0) : t = 0;
        } else {
          if (10 > i) {
            y = 7;
            break;
          }

          c = m, null == t || 10 > i || !Xt(t, r + 3, i - 3) ? t = 0 : (p = t[r + 0] | t[r + 1] << 8 | t[r + 2] << 16, b = 16383 & (t[r + 7] << 8 | t[r + 6]), t = 16383 & (t[r + 9] << 8 | t[r + 8]), 1 & p || 3 < (p >> 1 & 7) || !(p >> 4 & 1) || p >> 5 >= g.Ja || !b || !t ? t = 0 : (u && (u[0] = b), c && (c[0] = t), t = 1));
        }

        if (!t) return 3;
        if (u = u[0], m = m[0], d && (l[0] != u || f[0] != m)) return 3;
        null != h && (h[0] = g, h.offset = r - h.w, e(4294967286 > r - h.w), e(h.offset == h.ha - i));
        break;
      }

      return 0 == y || 7 == y && d && null == h ? (null != s && (s[0] |= null != g.na && 0 < g.na.length), null != a && (a[0] = u), null != o && (o[0] = m), 0) : y;
    }

    function En(t, e, n) {
      var r = e.width,
          i = e.height,
          a = 0,
          o = 0,
          s = r,
          u = i;
      if (e.Da = null != t && 0 < t.Da, e.Da && (s = t.cd, u = t.bd, a = t.v, o = t.j, 11 > n || (a &= -2, o &= -2), 0 > a || 0 > o || 0 >= s || 0 >= u || a + s > r || o + u > i)) return 0;

      if (e.v = a, e.j = o, e.va = a + s, e.o = o + u, e.U = s, e.T = u, e.da = null != t && 0 < t.da, e.da) {
        if (!E(s, u, n = [t.ib], a = [t.hb])) return 0;
        e.ib = n[0], e.hb = a[0];
      }

      return e.ob = null != t && t.ob, e.Kb = null == t || !t.Sd, e.da && (e.ob = e.ib < 3 * r / 4 && e.hb < 3 * i / 4, e.Kb = 0), 1;
    }

    function qn(t) {
      if (null == t) return 2;

      if (11 > t.S) {
        var e = t.f.RGBA;
        e.fb += (t.height - 1) * e.A, e.A = -e.A;
      } else e = t.f.kb, t = t.height, e.O += (t - 1) * e.fa, e.fa = -e.fa, e.N += (t - 1 >> 1) * e.Ab, e.Ab = -e.Ab, e.W += (t - 1 >> 1) * e.Db, e.Db = -e.Db, null != e.F && (e.J += (t - 1) * e.lb, e.lb = -e.lb);

      return 0;
    }

    function Rn(t, e, n, r) {
      if (null == r || 0 >= t || 0 >= e) return 2;

      if (null != n) {
        if (n.Da) {
          var i = n.cd,
              o = n.bd,
              s = -2 & n.v,
              u = -2 & n.j;
          if (0 > s || 0 > u || 0 >= i || 0 >= o || s + i > t || u + o > e) return 2;
          t = i, e = o;
        }

        if (n.da) {
          if (!E(t, e, i = [n.ib], o = [n.hb])) return 2;
          t = i[0], e = o[0];
        }
      }

      r.width = t, r.height = e;

      t: {
        var c = r.width,
            h = r.height;
        if (t = r.S, 0 >= c || 0 >= h || !(t >= Er && 13 > t)) t = 2;else {
          if (0 >= r.Rd && null == r.sd) {
            s = o = i = e = 0;
            var l = (u = c * zi[t]) * h;

            if (11 > t || (o = (h + 1) / 2 * (e = (c + 1) / 2), 12 == t && (s = (i = c) * h)), null == (h = a(l + 2 * o + s))) {
              t = 1;
              break t;
            }

            r.sd = h, 11 > t ? ((c = r.f.RGBA).eb = h, c.fb = 0, c.A = u, c.size = l) : ((c = r.f.kb).y = h, c.O = 0, c.fa = u, c.Fd = l, c.f = h, c.N = 0 + l, c.Ab = e, c.Cd = o, c.ea = h, c.W = 0 + l + o, c.Db = e, c.Ed = o, 12 == t && (c.F = h, c.J = 0 + l + 2 * o), c.Tc = s, c.lb = i);
          }

          if (e = 1, i = r.S, o = r.width, s = r.height, i >= Er && 13 > i) {
            if (11 > i) t = r.f.RGBA, e &= (u = Math.abs(t.A)) * (s - 1) + o <= t.size, e &= u >= o * zi[i], e &= null != t.eb;else {
              t = r.f.kb, u = (o + 1) / 2, l = (s + 1) / 2, c = Math.abs(t.fa);
              h = Math.abs(t.Ab);
              var f = Math.abs(t.Db),
                  d = Math.abs(t.lb),
                  p = d * (s - 1) + o;
              e &= c * (s - 1) + o <= t.Fd, e &= h * (l - 1) + u <= t.Cd, e = (e &= f * (l - 1) + u <= t.Ed) & c >= o & h >= u & f >= u, e &= null != t.y, e &= null != t.f, e &= null != t.ea, 12 == i && (e &= d >= o, e &= p <= t.Tc, e &= null != t.F);
            }
          } else e = 0;
          t = e ? 0 : 2;
        }
      }

      return 0 != t || null != n && n.fd && (t = qn(r)), t;
    }

    var Tn = 64,
        Dn = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215],
        Un = 24,
        zn = 32,
        Hn = 8,
        Wn = [0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
    T("Predictor0", "PredictorAdd0"), t.Predictor0 = function () {
      return 4278190080;
    }, t.Predictor1 = function (t) {
      return t;
    }, t.Predictor2 = function (t, e, n) {
      return e[n + 0];
    }, t.Predictor3 = function (t, e, n) {
      return e[n + 1];
    }, t.Predictor4 = function (t, e, n) {
      return e[n - 1];
    }, t.Predictor5 = function (t, e, n) {
      return U(U(t, e[n + 1]), e[n + 0]);
    }, t.Predictor6 = function (t, e, n) {
      return U(t, e[n - 1]);
    }, t.Predictor7 = function (t, e, n) {
      return U(t, e[n + 0]);
    }, t.Predictor8 = function (t, e, n) {
      return U(e[n - 1], e[n + 0]);
    }, t.Predictor9 = function (t, e, n) {
      return U(e[n + 0], e[n + 1]);
    }, t.Predictor10 = function (t, e, n) {
      return U(U(t, e[n - 1]), U(e[n + 0], e[n + 1]));
    }, t.Predictor11 = function (t, e, n) {
      var r = e[n + 0];
      return 0 >= W(r >> 24 & 255, t >> 24 & 255, (e = e[n - 1]) >> 24 & 255) + W(r >> 16 & 255, t >> 16 & 255, e >> 16 & 255) + W(r >> 8 & 255, t >> 8 & 255, e >> 8 & 255) + W(255 & r, 255 & t, 255 & e) ? r : t;
    }, t.Predictor12 = function (t, e, n) {
      var r = e[n + 0];
      return (z((t >> 24 & 255) + (r >> 24 & 255) - ((e = e[n - 1]) >> 24 & 255)) << 24 | z((t >> 16 & 255) + (r >> 16 & 255) - (e >> 16 & 255)) << 16 | z((t >> 8 & 255) + (r >> 8 & 255) - (e >> 8 & 255)) << 8 | z((255 & t) + (255 & r) - (255 & e))) >>> 0;
    }, t.Predictor13 = function (t, e, n) {
      var r = e[n - 1];
      return (H((t = U(t, e[n + 0])) >> 24 & 255, r >> 24 & 255) << 24 | H(t >> 16 & 255, r >> 16 & 255) << 16 | H(t >> 8 & 255, r >> 8 & 255) << 8 | H(t >> 0 & 255, r >> 0 & 255)) >>> 0;
    };
    var Vn = t.PredictorAdd0;
    t.PredictorAdd1 = V, T("Predictor2", "PredictorAdd2"), T("Predictor3", "PredictorAdd3"), T("Predictor4", "PredictorAdd4"), T("Predictor5", "PredictorAdd5"), T("Predictor6", "PredictorAdd6"), T("Predictor7", "PredictorAdd7"), T("Predictor8", "PredictorAdd8"), T("Predictor9", "PredictorAdd9"), T("Predictor10", "PredictorAdd10"), T("Predictor11", "PredictorAdd11"), T("Predictor12", "PredictorAdd12"), T("Predictor13", "PredictorAdd13");
    var Gn = t.PredictorAdd2;
    X("ColorIndexInverseTransform", "MapARGB", "32b", function (t) {
      return t >> 8 & 255;
    }, function (t) {
      return t;
    }), X("VP8LColorIndexInverseTransformAlpha", "MapAlpha", "8b", function (t) {
      return t;
    }, function (t) {
      return t >> 8 & 255;
    });
    var Yn,
        Jn = t.ColorIndexInverseTransform,
        Xn = t.MapARGB,
        Kn = t.VP8LColorIndexInverseTransformAlpha,
        Zn = t.MapAlpha,
        $n = t.VP8LPredictorsAdd = [];
    $n.length = 16, (t.VP8LPredictors = []).length = 16, (t.VP8LPredictorsAdd_C = []).length = 16, (t.VP8LPredictors_C = []).length = 16;

    var Qn,
        tr,
        er,
        nr,
        rr,
        ir,
        ar,
        or,
        sr,
        ur,
        cr,
        hr,
        lr,
        fr,
        dr,
        pr,
        gr,
        mr,
        vr,
        br,
        yr,
        wr,
        Nr,
        Lr,
        xr,
        Ar,
        _r,
        Sr,
        Pr = a(511),
        kr = a(2041),
        Fr = a(225),
        Ir = a(767),
        Cr = 0,
        jr = kr,
        Br = Fr,
        Or = Ir,
        Mr = Pr,
        Er = 0,
        qr = 1,
        Rr = 2,
        Tr = 3,
        Dr = 4,
        Ur = 5,
        zr = 6,
        Hr = 7,
        Wr = 8,
        Vr = 9,
        Gr = 10,
        Yr = [2, 3, 7],
        Jr = [3, 3, 11],
        Xr = [280, 256, 256, 256, 40],
        Kr = [0, 1, 1, 1, 0],
        Zr = [17, 18, 0, 1, 2, 3, 4, 5, 16, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        $r = [24, 7, 23, 25, 40, 6, 39, 41, 22, 26, 38, 42, 56, 5, 55, 57, 21, 27, 54, 58, 37, 43, 72, 4, 71, 73, 20, 28, 53, 59, 70, 74, 36, 44, 88, 69, 75, 52, 60, 3, 87, 89, 19, 29, 86, 90, 35, 45, 68, 76, 85, 91, 51, 61, 104, 2, 103, 105, 18, 30, 102, 106, 34, 46, 84, 92, 67, 77, 101, 107, 50, 62, 120, 1, 119, 121, 83, 93, 17, 31, 100, 108, 66, 78, 118, 122, 33, 47, 117, 123, 49, 63, 99, 109, 82, 94, 0, 116, 124, 65, 79, 16, 32, 98, 110, 48, 115, 125, 81, 95, 64, 114, 126, 97, 111, 80, 113, 127, 96, 112],
        Qr = [2954, 2956, 2958, 2962, 2970, 2986, 3018, 3082, 3212, 3468, 3980, 5004],
        ti = 8,
        ei = [4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 17, 18, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 25, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 93, 95, 96, 98, 100, 101, 102, 104, 106, 108, 110, 112, 114, 116, 118, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 143, 145, 148, 151, 154, 157],
        ni = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 119, 122, 125, 128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 167, 170, 173, 177, 181, 185, 189, 193, 197, 201, 205, 209, 213, 217, 221, 225, 229, 234, 239, 245, 249, 254, 259, 264, 269, 274, 279, 284],
        ri = null,
        ii = [[173, 148, 140, 0], [176, 155, 140, 135, 0], [180, 157, 141, 134, 130, 0], [254, 254, 243, 230, 196, 177, 153, 140, 133, 130, 129, 0]],
        ai = [0, 1, 4, 8, 5, 2, 3, 6, 9, 12, 13, 10, 7, 11, 14, 15],
        oi = [-0, 1, -1, 2, -2, 3, 4, 6, -3, 5, -4, -5, -6, 7, -7, 8, -8, -9],
        si = [[[[128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]], [[253, 136, 254, 255, 228, 219, 128, 128, 128, 128, 128], [189, 129, 242, 255, 227, 213, 255, 219, 128, 128, 128], [106, 126, 227, 252, 214, 209, 255, 255, 128, 128, 128]], [[1, 98, 248, 255, 236, 226, 255, 255, 128, 128, 128], [181, 133, 238, 254, 221, 234, 255, 154, 128, 128, 128], [78, 134, 202, 247, 198, 180, 255, 219, 128, 128, 128]], [[1, 185, 249, 255, 243, 255, 128, 128, 128, 128, 128], [184, 150, 247, 255, 236, 224, 128, 128, 128, 128, 128], [77, 110, 216, 255, 236, 230, 128, 128, 128, 128, 128]], [[1, 101, 251, 255, 241, 255, 128, 128, 128, 128, 128], [170, 139, 241, 252, 236, 209, 255, 255, 128, 128, 128], [37, 116, 196, 243, 228, 255, 255, 255, 128, 128, 128]], [[1, 204, 254, 255, 245, 255, 128, 128, 128, 128, 128], [207, 160, 250, 255, 238, 128, 128, 128, 128, 128, 128], [102, 103, 231, 255, 211, 171, 128, 128, 128, 128, 128]], [[1, 152, 252, 255, 240, 255, 128, 128, 128, 128, 128], [177, 135, 243, 255, 234, 225, 128, 128, 128, 128, 128], [80, 129, 211, 255, 194, 224, 128, 128, 128, 128, 128]], [[1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [246, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]]], [[[198, 35, 237, 223, 193, 187, 162, 160, 145, 155, 62], [131, 45, 198, 221, 172, 176, 220, 157, 252, 221, 1], [68, 47, 146, 208, 149, 167, 221, 162, 255, 223, 128]], [[1, 149, 241, 255, 221, 224, 255, 255, 128, 128, 128], [184, 141, 234, 253, 222, 220, 255, 199, 128, 128, 128], [81, 99, 181, 242, 176, 190, 249, 202, 255, 255, 128]], [[1, 129, 232, 253, 214, 197, 242, 196, 255, 255, 128], [99, 121, 210, 250, 201, 198, 255, 202, 128, 128, 128], [23, 91, 163, 242, 170, 187, 247, 210, 255, 255, 128]], [[1, 200, 246, 255, 234, 255, 128, 128, 128, 128, 128], [109, 178, 241, 255, 231, 245, 255, 255, 128, 128, 128], [44, 130, 201, 253, 205, 192, 255, 255, 128, 128, 128]], [[1, 132, 239, 251, 219, 209, 255, 165, 128, 128, 128], [94, 136, 225, 251, 218, 190, 255, 255, 128, 128, 128], [22, 100, 174, 245, 186, 161, 255, 199, 128, 128, 128]], [[1, 182, 249, 255, 232, 235, 128, 128, 128, 128, 128], [124, 143, 241, 255, 227, 234, 128, 128, 128, 128, 128], [35, 77, 181, 251, 193, 211, 255, 205, 128, 128, 128]], [[1, 157, 247, 255, 236, 231, 255, 255, 128, 128, 128], [121, 141, 235, 255, 225, 227, 255, 255, 128, 128, 128], [45, 99, 188, 251, 195, 217, 255, 224, 128, 128, 128]], [[1, 1, 251, 255, 213, 255, 128, 128, 128, 128, 128], [203, 1, 248, 255, 255, 128, 128, 128, 128, 128, 128], [137, 1, 177, 255, 224, 255, 128, 128, 128, 128, 128]]], [[[253, 9, 248, 251, 207, 208, 255, 192, 128, 128, 128], [175, 13, 224, 243, 193, 185, 249, 198, 255, 255, 128], [73, 17, 171, 221, 161, 179, 236, 167, 255, 234, 128]], [[1, 95, 247, 253, 212, 183, 255, 255, 128, 128, 128], [239, 90, 244, 250, 211, 209, 255, 255, 128, 128, 128], [155, 77, 195, 248, 188, 195, 255, 255, 128, 128, 128]], [[1, 24, 239, 251, 218, 219, 255, 205, 128, 128, 128], [201, 51, 219, 255, 196, 186, 128, 128, 128, 128, 128], [69, 46, 190, 239, 201, 218, 255, 228, 128, 128, 128]], [[1, 191, 251, 255, 255, 128, 128, 128, 128, 128, 128], [223, 165, 249, 255, 213, 255, 128, 128, 128, 128, 128], [141, 124, 248, 255, 255, 128, 128, 128, 128, 128, 128]], [[1, 16, 248, 255, 255, 128, 128, 128, 128, 128, 128], [190, 36, 230, 255, 236, 255, 128, 128, 128, 128, 128], [149, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[1, 226, 255, 128, 128, 128, 128, 128, 128, 128, 128], [247, 192, 255, 128, 128, 128, 128, 128, 128, 128, 128], [240, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[1, 134, 252, 255, 255, 128, 128, 128, 128, 128, 128], [213, 62, 250, 255, 255, 128, 128, 128, 128, 128, 128], [55, 93, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]]], [[[202, 24, 213, 235, 186, 191, 220, 160, 240, 175, 255], [126, 38, 182, 232, 169, 184, 228, 174, 255, 187, 128], [61, 46, 138, 219, 151, 178, 240, 170, 255, 216, 128]], [[1, 112, 230, 250, 199, 191, 247, 159, 255, 255, 128], [166, 109, 228, 252, 211, 215, 255, 174, 128, 128, 128], [39, 77, 162, 232, 172, 180, 245, 178, 255, 255, 128]], [[1, 52, 220, 246, 198, 199, 249, 220, 255, 255, 128], [124, 74, 191, 243, 183, 193, 250, 221, 255, 255, 128], [24, 71, 130, 219, 154, 170, 243, 182, 255, 255, 128]], [[1, 182, 225, 249, 219, 240, 255, 224, 128, 128, 128], [149, 150, 226, 252, 216, 205, 255, 171, 128, 128, 128], [28, 108, 170, 242, 183, 194, 254, 223, 255, 255, 128]], [[1, 81, 230, 252, 204, 203, 255, 192, 128, 128, 128], [123, 102, 209, 247, 188, 196, 255, 233, 128, 128, 128], [20, 95, 153, 243, 164, 173, 255, 203, 128, 128, 128]], [[1, 222, 248, 255, 216, 213, 128, 128, 128, 128, 128], [168, 175, 246, 252, 235, 205, 255, 255, 128, 128, 128], [47, 116, 215, 255, 211, 212, 255, 255, 128, 128, 128]], [[1, 121, 236, 253, 212, 214, 255, 255, 128, 128, 128], [141, 84, 213, 252, 201, 202, 255, 219, 128, 128, 128], [42, 80, 160, 240, 162, 185, 255, 205, 128, 128, 128]], [[1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [244, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [238, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]]]],
        ui = [[[231, 120, 48, 89, 115, 113, 120, 152, 112], [152, 179, 64, 126, 170, 118, 46, 70, 95], [175, 69, 143, 80, 85, 82, 72, 155, 103], [56, 58, 10, 171, 218, 189, 17, 13, 152], [114, 26, 17, 163, 44, 195, 21, 10, 173], [121, 24, 80, 195, 26, 62, 44, 64, 85], [144, 71, 10, 38, 171, 213, 144, 34, 26], [170, 46, 55, 19, 136, 160, 33, 206, 71], [63, 20, 8, 114, 114, 208, 12, 9, 226], [81, 40, 11, 96, 182, 84, 29, 16, 36]], [[134, 183, 89, 137, 98, 101, 106, 165, 148], [72, 187, 100, 130, 157, 111, 32, 75, 80], [66, 102, 167, 99, 74, 62, 40, 234, 128], [41, 53, 9, 178, 241, 141, 26, 8, 107], [74, 43, 26, 146, 73, 166, 49, 23, 157], [65, 38, 105, 160, 51, 52, 31, 115, 128], [104, 79, 12, 27, 217, 255, 87, 17, 7], [87, 68, 71, 44, 114, 51, 15, 186, 23], [47, 41, 14, 110, 182, 183, 21, 17, 194], [66, 45, 25, 102, 197, 189, 23, 18, 22]], [[88, 88, 147, 150, 42, 46, 45, 196, 205], [43, 97, 183, 117, 85, 38, 35, 179, 61], [39, 53, 200, 87, 26, 21, 43, 232, 171], [56, 34, 51, 104, 114, 102, 29, 93, 77], [39, 28, 85, 171, 58, 165, 90, 98, 64], [34, 22, 116, 206, 23, 34, 43, 166, 73], [107, 54, 32, 26, 51, 1, 81, 43, 31], [68, 25, 106, 22, 64, 171, 36, 225, 114], [34, 19, 21, 102, 132, 188, 16, 76, 124], [62, 18, 78, 95, 85, 57, 50, 48, 51]], [[193, 101, 35, 159, 215, 111, 89, 46, 111], [60, 148, 31, 172, 219, 228, 21, 18, 111], [112, 113, 77, 85, 179, 255, 38, 120, 114], [40, 42, 1, 196, 245, 209, 10, 25, 109], [88, 43, 29, 140, 166, 213, 37, 43, 154], [61, 63, 30, 155, 67, 45, 68, 1, 209], [100, 80, 8, 43, 154, 1, 51, 26, 71], [142, 78, 78, 16, 255, 128, 34, 197, 171], [41, 40, 5, 102, 211, 183, 4, 1, 221], [51, 50, 17, 168, 209, 192, 23, 25, 82]], [[138, 31, 36, 171, 27, 166, 38, 44, 229], [67, 87, 58, 169, 82, 115, 26, 59, 179], [63, 59, 90, 180, 59, 166, 93, 73, 154], [40, 40, 21, 116, 143, 209, 34, 39, 175], [47, 15, 16, 183, 34, 223, 49, 45, 183], [46, 17, 33, 183, 6, 98, 15, 32, 183], [57, 46, 22, 24, 128, 1, 54, 17, 37], [65, 32, 73, 115, 28, 128, 23, 128, 205], [40, 3, 9, 115, 51, 192, 18, 6, 223], [87, 37, 9, 115, 59, 77, 64, 21, 47]], [[104, 55, 44, 218, 9, 54, 53, 130, 226], [64, 90, 70, 205, 40, 41, 23, 26, 57], [54, 57, 112, 184, 5, 41, 38, 166, 213], [30, 34, 26, 133, 152, 116, 10, 32, 134], [39, 19, 53, 221, 26, 114, 32, 73, 255], [31, 9, 65, 234, 2, 15, 1, 118, 73], [75, 32, 12, 51, 192, 255, 160, 43, 51], [88, 31, 35, 67, 102, 85, 55, 186, 85], [56, 21, 23, 111, 59, 205, 45, 37, 192], [55, 38, 70, 124, 73, 102, 1, 34, 98]], [[125, 98, 42, 88, 104, 85, 117, 175, 82], [95, 84, 53, 89, 128, 100, 113, 101, 45], [75, 79, 123, 47, 51, 128, 81, 171, 1], [57, 17, 5, 71, 102, 57, 53, 41, 49], [38, 33, 13, 121, 57, 73, 26, 1, 85], [41, 10, 67, 138, 77, 110, 90, 47, 114], [115, 21, 2, 10, 102, 255, 166, 23, 6], [101, 29, 16, 10, 85, 128, 101, 196, 26], [57, 18, 10, 102, 102, 213, 34, 20, 43], [117, 20, 15, 36, 163, 128, 68, 1, 26]], [[102, 61, 71, 37, 34, 53, 31, 243, 192], [69, 60, 71, 38, 73, 119, 28, 222, 37], [68, 45, 128, 34, 1, 47, 11, 245, 171], [62, 17, 19, 70, 146, 85, 55, 62, 70], [37, 43, 37, 154, 100, 163, 85, 160, 1], [63, 9, 92, 136, 28, 64, 32, 201, 85], [75, 15, 9, 9, 64, 255, 184, 119, 16], [86, 6, 28, 5, 64, 255, 25, 248, 1], [56, 8, 17, 132, 137, 255, 55, 116, 128], [58, 15, 20, 82, 135, 57, 26, 121, 40]], [[164, 50, 31, 137, 154, 133, 25, 35, 218], [51, 103, 44, 131, 131, 123, 31, 6, 158], [86, 40, 64, 135, 148, 224, 45, 183, 128], [22, 26, 17, 131, 240, 154, 14, 1, 209], [45, 16, 21, 91, 64, 222, 7, 1, 197], [56, 21, 39, 155, 60, 138, 23, 102, 213], [83, 12, 13, 54, 192, 255, 68, 47, 28], [85, 26, 85, 85, 128, 128, 32, 146, 171], [18, 11, 7, 63, 144, 171, 4, 4, 246], [35, 27, 10, 146, 174, 171, 12, 26, 128]], [[190, 80, 35, 99, 180, 80, 126, 54, 45], [85, 126, 47, 87, 176, 51, 41, 20, 32], [101, 75, 128, 139, 118, 146, 116, 128, 85], [56, 41, 15, 176, 236, 85, 37, 9, 62], [71, 30, 17, 119, 118, 255, 17, 18, 138], [101, 38, 60, 138, 55, 70, 43, 26, 142], [146, 36, 19, 30, 171, 255, 97, 27, 20], [138, 45, 61, 62, 219, 1, 81, 188, 64], [32, 41, 20, 117, 151, 142, 20, 21, 163], [112, 19, 12, 61, 195, 128, 48, 4, 24]]],
        ci = [[[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[176, 246, 255, 255, 255, 255, 255, 255, 255, 255, 255], [223, 241, 252, 255, 255, 255, 255, 255, 255, 255, 255], [249, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 244, 252, 255, 255, 255, 255, 255, 255, 255, 255], [234, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 246, 254, 255, 255, 255, 255, 255, 255, 255, 255], [239, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 253, 255, 254, 255, 255, 255, 255, 255, 255], [250, 255, 254, 255, 254, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[217, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [225, 252, 241, 253, 255, 255, 254, 255, 255, 255, 255], [234, 250, 241, 250, 253, 255, 253, 254, 255, 255, 255]], [[255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [223, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [238, 253, 254, 254, 255, 255, 255, 255, 255, 255, 255]], [[255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255], [249, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255], [247, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255], [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[186, 251, 250, 255, 255, 255, 255, 255, 255, 255, 255], [234, 251, 244, 254, 255, 255, 255, 255, 255, 255, 255], [251, 251, 243, 253, 254, 255, 254, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [236, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 253, 253, 254, 254, 255, 255, 255, 255, 255, 255]], [[255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [250, 254, 252, 254, 255, 255, 255, 255, 255, 255, 255], [248, 254, 249, 253, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255], [246, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255], [252, 254, 251, 254, 254, 255, 255, 255, 255, 255, 255]], [[255, 254, 252, 255, 255, 255, 255, 255, 255, 255, 255], [248, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 254, 254, 255, 255, 255, 255, 255, 255, 255]], [[255, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255], [245, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 251, 253, 255, 255, 255, 255, 255, 255, 255, 255], [252, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255], [249, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 253, 255, 255, 255, 255, 255, 255, 255, 255], [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]]],
        hi = [0, 1, 2, 3, 6, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0],
        li = [],
        fi = [],
        di = [],
        pi = 1,
        gi = 2,
        mi = [],
        vi = [];

    bn("UpsampleRgbLinePair", An, 3), bn("UpsampleBgrLinePair", _n, 3), bn("UpsampleRgbaLinePair", In, 4), bn("UpsampleBgraLinePair", Fn, 4), bn("UpsampleArgbLinePair", kn, 4), bn("UpsampleRgba4444LinePair", Pn, 2), bn("UpsampleRgb565LinePair", Sn, 2);
    var bi = t.UpsampleRgbLinePair,
        yi = t.UpsampleBgrLinePair,
        wi = t.UpsampleRgbaLinePair,
        Ni = t.UpsampleBgraLinePair,
        Li = t.UpsampleArgbLinePair,
        xi = t.UpsampleRgba4444LinePair,
        Ai = t.UpsampleRgb565LinePair,
        _i = 16,
        Si = 1 << _i - 1,
        Pi = -227,
        ki = 482,
        Fi = 6,
        Ii = (256 << Fi) - 1,
        Ci = 0,
        ji = a(256),
        Bi = a(256),
        Oi = a(256),
        Mi = a(256),
        Ei = a(ki - Pi),
        qi = a(ki - Pi);
    Cn("YuvToRgbRow", An, 3), Cn("YuvToBgrRow", _n, 3), Cn("YuvToRgbaRow", In, 4), Cn("YuvToBgraRow", Fn, 4), Cn("YuvToArgbRow", kn, 4), Cn("YuvToRgba4444Row", Pn, 2), Cn("YuvToRgb565Row", Sn, 2);
    var Ri = [0, 4, 8, 12, 128, 132, 136, 140, 256, 260, 264, 268, 384, 388, 392, 396],
        Ti = [0, 2, 8],
        Di = [8, 7, 6, 4, 4, 2, 2, 2, 1, 1, 1, 1],
        Ui = 1;

    this.WebPDecodeRGBA = function (t, n, r, i, a) {
      var o = qr,
          s = new nn(),
          u = new ot();
      s.ba = u, u.S = o, u.width = [u.width], u.height = [u.height];
      var c = u.width,
          h = u.height,
          l = new st();
      if (null == l || null == t) var f = 2;else e(null != l), f = Mn(t, n, r, l.width, l.height, l.Pd, l.Qd, l.format, null);

      if (0 != f ? c = 0 : (null != c && (c[0] = l.width[0]), null != h && (h[0] = l.height[0]), c = 1), c) {
        u.width = u.width[0], u.height = u.height[0], null != i && (i[0] = u.width), null != a && (a[0] = u.height);

        t: {
          if (i = new Gt(), (a = new rn()).data = t, a.w = n, a.ha = r, a.kd = 1, n = [0], e(null != a), (0 == (t = Mn(a.data, a.w, a.ha, null, null, null, n, null, a)) || 7 == t) && n[0] && (t = 4), 0 == (n = t)) {
            if (e(null != s), i.data = a.data, i.w = a.w + a.offset, i.ha = a.ha - a.offset, i.put = dt, i.ac = ft, i.bc = pt, i.ma = s, a.xa) {
              if (null == (t = kt())) {
                s = 1;
                break t;
              }

              if (function (t, n) {
                var r = [0],
                    i = [0],
                    a = [0];

                e: for (;;) {
                  if (null == t) return 0;
                  if (null == n) return t.a = 2, 0;

                  if (t.l = n, t.a = 0, v(t.m, n.data, n.w, n.ha), !gt(t.m, r, i, a)) {
                    t.a = 3;
                    break e;
                  }

                  if (t.xb = gi, n.width = r[0], n.height = i[0], !Ft(r[0], i[0], 1, t, null)) break e;
                  return 1;
                }

                return e(0 != t.a), 0;
              }(t, i)) {
                if (i = 0 == (n = Rn(i.width, i.height, s.Oa, s.ba))) {
                  e: {
                    i = t;

                    n: for (;;) {
                      if (null == i) {
                        i = 0;
                        break e;
                      }

                      if (e(null != i.s.yc), e(null != i.s.Ya), e(0 < i.s.Wb), e(null != (r = i.l)), e(null != (a = r.ma)), 0 != i.xb) {
                        if (i.ca = a.ba, i.tb = a.tb, e(null != i.ca), !En(a.Oa, r, Tr)) {
                          i.a = 2;
                          break n;
                        }

                        if (!It(i, r.width)) break n;
                        if (r.da) break n;

                        if ((r.da || rt(i.ca.S)) && vn(), 11 > i.ca.S || (alert("todo:WebPInitConvertARGBToYUV"), null != i.ca.f.kb.F && vn()), i.Pb && 0 < i.s.ua && null == i.s.vb.X && !B(i.s.vb, i.s.Wa.Xa)) {
                          i.a = 1;
                          break n;
                        }

                        i.xb = 0;
                      }

                      if (!St(i, i.V, i.Ba, i.c, i.i, r.o, Lt)) break n;
                      a.Dc = i.Ma, i = 1;
                      break e;
                    }

                    e(0 != i.a), i = 0;
                  }

                  i = !i;
                }

                i && (n = t.a);
              } else n = t.a;
            } else {
              if (null == (t = new Yt())) {
                s = 1;
                break t;
              }

              if (t.Fa = a.na, t.P = a.P, t.qc = a.Sa, Kt(t, i)) {
                if (0 == (n = Rn(i.width, i.height, s.Oa, s.ba))) {
                  if (t.Aa = 0, r = s.Oa, e(null != (a = t)), null != r) {
                    if (0 < (c = 0 > (c = r.Md) ? 0 : 100 < c ? 255 : 255 * c / 100)) {
                      for (h = l = 0; 4 > h; ++h) 12 > (f = a.pb[h]).lc && (f.ia = c * Di[0 > f.lc ? 0 : f.lc] >> 3), l |= f.ia;

                      l && (alert("todo:VP8InitRandom"), a.ia = 1);
                    }

                    a.Ga = r.Id, 100 < a.Ga ? a.Ga = 100 : 0 > a.Ga && (a.Ga = 0);
                  }

                  Qt(t, i) || (n = t.a);
                }
              } else n = t.a;
            }

            0 == n && null != s.Oa && s.Oa.fd && (n = qn(s.ba));
          }

          s = n;
        }

        o = 0 != s ? null : 11 > o ? u.f.RGBA.eb : u.f.kb.y;
      } else o = null;

      return o;
    };

    var zi = [3, 4, 3, 4, 4, 2, 2, 4, 4, 4, 2, 1, 1];
  })();

  var l = [0],
      f = [0],
      d = [],
      p = new Et(),
      g = t,
      m = function (t, e) {
    var n = {},
        r = 0,
        i = !1,
        a = 0,
        o = 0;

    if (n.frames = [], !
    /** @license
       * Copyright (c) 2017 Dominik Homberger
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
    https://webpjs.appspot.com
    WebPRiffParser dominikhlbg@gmail.com
    */
    function (t, e, n, r) {
      for (var i = 0; i < r; i++) if (t[e + i] != n.charCodeAt(i)) return !0;

      return !1;
    }(t, e, "RIFF", 4)) {
      var s, l;
      h(t, e += 4);

      for (e += 8; e < t.length;) {
        var f = u(t, e),
            d = h(t, e += 4);
        e += 4;
        var p = d + (1 & d);

        switch (f) {
          case "VP8 ":
          case "VP8L":
            void 0 === n.frames[r] && (n.frames[r] = {});
            (v = n.frames[r]).src_off = i ? o : e - 8, v.src_size = a + d + 8, r++, i && (i = !1, a = 0, o = 0);
            break;

          case "VP8X":
            (v = n.header = {}).feature_flags = t[e];
            var g = e + 4;
            v.canvas_width = 1 + c(t, g);
            g += 3;
            v.canvas_height = 1 + c(t, g);
            g += 3;
            break;

          case "ALPH":
            i = !0, a = p + 8, o = e - 8;
            break;

          case "ANIM":
            (v = n.header).bgcolor = h(t, e);
            g = e + 4;
            v.loop_count = (s = t)[(l = g) + 0] << 0 | s[l + 1] << 8;
            g += 2;
            break;

          case "ANMF":
            var m, v;
            (v = n.frames[r] = {}).offset_x = 2 * c(t, e), e += 3, v.offset_y = 2 * c(t, e), e += 3, v.width = 1 + c(t, e), e += 3, v.height = 1 + c(t, e), e += 3, v.duration = c(t, e), e += 3, m = t[e++], v.dispose = 1 & m, v.blend = m >> 1 & 1;
        }

        "ANMF" != f && (e += p);
      }

      return n;
    }
  }(g, 0);

  m.response = g, m.rgbaoutput = !0, m.dataurl = !1;
  var v = m.header ? m.header : null,
      b = m.frames ? m.frames : null;

  if (v) {
    v.loop_counter = v.loop_count, l = [v.canvas_height], f = [v.canvas_width];

    for (var y = 0; y < b.length && 0 != b[y].blend; y++);
  }

  var w = b[0],
      N = p.WebPDecodeRGBA(g, w.src_off, w.src_size, f, l);
  w.rgba = N, w.imgwidth = f[0], w.imgheight = l[0];

  for (var L = 0; L < f[0] * l[0] * 4; L++) d[L] = N[L];

  return this.width = f, this.height = l, this.data = d, this;
}
/**
 * @license
 *
 * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */


!function (t) {
  var e = function () {
    return !0;
  },
      n = function (e, n, a, h) {
    var l = 5,
        f = s;

    switch (h) {
      case t.image_compression.FAST:
        l = 3, f = o;
        break;

      case t.image_compression.MEDIUM:
        l = 6, f = u;
        break;

      case t.image_compression.SLOW:
        l = 9, f = c;
    }

    e = i(e, n, a, f);
    var d = new Uint8Array(r(l)),
        p = g.API.adler32cs.fromBuffer(e.buffer),
        m = new xt(l),
        v = m.append(e),
        b = m.flush(),
        y = d.length + v.length + b.length,
        w = new Uint8Array(y + 4);
    return w.set(d), w.set(v, d.length), w.set(b, d.length + v.length), w[y++] = p >>> 24 & 255, w[y++] = p >>> 16 & 255, w[y++] = p >>> 8 & 255, w[y++] = 255 & p, t.__addimage__.arrayBufferToBinaryString(w);
  },
      r = function (t) {
    var e = 30720;
    return e |= Math.min(3, (t - 1 & 255) >> 1) << 6, e |= 0, [120, 255 & (e += 31 - e % 31)];
  },
      i = function (t, e, n, r) {
    for (var i, a, o, s = t.length / e, u = new Uint8Array(t.length + s), c = l(), h = 0; h < s; h += 1) {
      if (o = h * e, i = t.subarray(o, o + e), r) u.set(r(i, n, a), o + h);else {
        for (var d, p = c.length, g = []; d < p; d += 1) g[d] = c[d](i, n, a);

        var m = f(g.concat());
        u.set(g[m], o + h);
      }
      a = i;
    }

    return u;
  },
      a = function (t) {
    var e = Array.apply([], t);
    return e.unshift(0), e;
  },
      o = function (t, e) {
    var n,
        r = [],
        i = t.length;
    r[0] = 1;

    for (var a = 0; a < i; a += 1) n = t[a - e] || 0, r[a + 1] = t[a] - n + 256 & 255;

    return r;
  },
      s = function (t, e, n) {
    var r,
        i = [],
        a = t.length;
    i[0] = 2;

    for (var o = 0; o < a; o += 1) r = n && n[o] || 0, i[o + 1] = t[o] - r + 256 & 255;

    return i;
  },
      u = function (t, e, n) {
    var r,
        i,
        a = [],
        o = t.length;
    a[0] = 3;

    for (var s = 0; s < o; s += 1) r = t[s - e] || 0, i = n && n[s] || 0, a[s + 1] = t[s] + 256 - (r + i >>> 1) & 255;

    return a;
  },
      c = function (t, e, n) {
    var r,
        i,
        a,
        o,
        s = [],
        u = t.length;
    s[0] = 4;

    for (var c = 0; c < u; c += 1) r = t[c - e] || 0, i = n && n[c] || 0, a = n && n[c - e] || 0, o = h(r, i, a), s[c + 1] = t[c] - o + 256 & 255;

    return s;
  },
      h = function (t, e, n) {
    if (t === e && e === n) return t;
    var r = Math.abs(e - n),
        i = Math.abs(t - n),
        a = Math.abs(t + e - n - n);
    return r <= i && r <= a ? t : i <= a ? e : n;
  },
      l = function () {
    return [a, o, s, u, c];
  },
      f = function (t) {
    var e = t.map(function (t) {
      return t.reduce(function (t, e) {
        return t + Math.abs(e);
      }, 0);
    });
    return e.indexOf(Math.min.apply(null, e));
  };

  t.processPNG = function (r, i, a, o) {
    var s,
        u,
        c,
        h,
        l,
        f,
        d,
        p,
        g,
        m,
        v,
        b,
        y,
        w,
        N,
        L = this.decode.FLATE_DECODE,
        x = "";

    if (this.__addimage__.isArrayBuffer(r) && (r = new Uint8Array(r)), this.__addimage__.isArrayBufferView(r)) {
      if (r = (c = new Ct(r)).imgData, u = c.bits, s = c.colorSpace, l = c.colors, -1 !== [4, 6].indexOf(c.colorType)) {
        if (8 === c.bits) {
          g = (p = 32 == c.pixelBitlength ? new Uint32Array(c.decodePixels().buffer) : 16 == c.pixelBitlength ? new Uint16Array(c.decodePixels().buffer) : new Uint8Array(c.decodePixels().buffer)).length, v = new Uint8Array(g * c.colors), m = new Uint8Array(g);

          var A,
              _ = c.pixelBitlength - c.bits;

          for (w = 0, N = 0; w < g; w++) {
            for (y = p[w], A = 0; A < _;) v[N++] = y >>> A & 255, A += c.bits;

            m[w] = y >>> A & 255;
          }
        }

        if (16 === c.bits) {
          g = (p = new Uint32Array(c.decodePixels().buffer)).length, v = new Uint8Array(g * (32 / c.pixelBitlength) * c.colors), m = new Uint8Array(g * (32 / c.pixelBitlength)), b = c.colors > 1, w = 0, N = 0;

          for (var S = 0; w < g;) y = p[w++], v[N++] = y >>> 0 & 255, b && (v[N++] = y >>> 16 & 255, y = p[w++], v[N++] = y >>> 0 & 255), m[S++] = y >>> 16 & 255;

          u = 8;
        }

        o !== t.image_compression.NONE && e() ? (r = n(v, c.width * c.colors, c.colors, o), d = n(m, c.width, 1, o)) : (r = v, d = m, L = void 0);
      }

      if (3 === c.colorType && (s = this.color_spaces.INDEXED, f = c.palette, c.transparency.indexed)) {
        var P = c.transparency.indexed,
            k = 0;

        for (w = 0, g = P.length; w < g; ++w) k += P[w];

        if ((k /= 255) === g - 1 && -1 !== P.indexOf(0)) h = [P.indexOf(0)];else if (k !== g) {
          for (p = c.decodePixels(), m = new Uint8Array(p.length), w = 0, g = p.length; w < g; w++) m[w] = P[p[w]];

          d = n(m, c.width, 1);
        }
      }

      var F = function (e) {
        var n;

        switch (e) {
          case t.image_compression.FAST:
            n = 11;
            break;

          case t.image_compression.MEDIUM:
            n = 13;
            break;

          case t.image_compression.SLOW:
            n = 14;
            break;

          default:
            n = 12;
        }

        return n;
      }(o);

      return L === this.decode.FLATE_DECODE && (x = "/Predictor " + F + " "), x += "/Colors " + l + " /BitsPerComponent " + u + " /Columns " + c.width, (this.__addimage__.isArrayBuffer(r) || this.__addimage__.isArrayBufferView(r)) && (r = this.__addimage__.arrayBufferToBinaryString(r)), (d && this.__addimage__.isArrayBuffer(d) || this.__addimage__.isArrayBufferView(d)) && (d = this.__addimage__.arrayBufferToBinaryString(d)), {
        alias: a,
        data: r,
        index: i,
        filter: L,
        decodeParameters: x,
        transparency: h,
        palette: f,
        sMask: d,
        predictor: F,
        width: c.width,
        height: c.height,
        bitsPerComponent: u,
        colorSpace: s
      };
    }
  };
}(g.API), function (t) {
  t.processGIF89A = function (e, n, r, i) {
    var a = new jt(e),
        o = a.width,
        s = a.height,
        u = [];
    a.decodeAndBlitFrameRGBA(0, u);
    var c = {
      data: u,
      width: o,
      height: s
    },
        h = new Ot(100).encode(c, 100);
    return t.processJPEG.call(this, h, n, r, i);
  }, t.processGIF87A = t.processGIF89A;
}(g.API), Mt.prototype.parseHeader = function () {
  if (this.fileSize = this.datav.getUint32(this.pos, !0), this.pos += 4, this.reserved = this.datav.getUint32(this.pos, !0), this.pos += 4, this.offset = this.datav.getUint32(this.pos, !0), this.pos += 4, this.headerSize = this.datav.getUint32(this.pos, !0), this.pos += 4, this.width = this.datav.getUint32(this.pos, !0), this.pos += 4, this.height = this.datav.getInt32(this.pos, !0), this.pos += 4, this.planes = this.datav.getUint16(this.pos, !0), this.pos += 2, this.bitPP = this.datav.getUint16(this.pos, !0), this.pos += 2, this.compress = this.datav.getUint32(this.pos, !0), this.pos += 4, this.rawSize = this.datav.getUint32(this.pos, !0), this.pos += 4, this.hr = this.datav.getUint32(this.pos, !0), this.pos += 4, this.vr = this.datav.getUint32(this.pos, !0), this.pos += 4, this.colors = this.datav.getUint32(this.pos, !0), this.pos += 4, this.importantColors = this.datav.getUint32(this.pos, !0), this.pos += 4, 16 === this.bitPP && this.is_with_alpha && (this.bitPP = 15), this.bitPP < 15) {
    var t = 0 === this.colors ? 1 << this.bitPP : this.colors;
    this.palette = new Array(t);

    for (var e = 0; e < t; e++) {
      var n = this.datav.getUint8(this.pos++, !0),
          r = this.datav.getUint8(this.pos++, !0),
          i = this.datav.getUint8(this.pos++, !0),
          a = this.datav.getUint8(this.pos++, !0);
      this.palette[e] = {
        red: i,
        green: r,
        blue: n,
        quad: a
      };
    }
  }

  this.height < 0 && (this.height *= -1, this.bottom_up = !1);
}, Mt.prototype.parseBGR = function () {
  this.pos = this.offset;

  try {
    var t = "bit" + this.bitPP,
        e = this.width * this.height * 4;
    this.data = new Uint8Array(e), this[t]();
  } catch (t) {
    n.log("bit decode error:" + t);
  }
}, Mt.prototype.bit1 = function () {
  var t,
      e = Math.ceil(this.width / 8),
      n = e % 4;

  for (t = this.height - 1; t >= 0; t--) {
    for (var r = this.bottom_up ? t : this.height - 1 - t, i = 0; i < e; i++) for (var a = this.datav.getUint8(this.pos++, !0), o = r * this.width * 4 + 8 * i * 4, s = 0; s < 8 && 8 * i + s < this.width; s++) {
      var u = this.palette[a >> 7 - s & 1];
      this.data[o + 4 * s] = u.blue, this.data[o + 4 * s + 1] = u.green, this.data[o + 4 * s + 2] = u.red, this.data[o + 4 * s + 3] = 255;
    }

    0 !== n && (this.pos += 4 - n);
  }
}, Mt.prototype.bit4 = function () {
  for (var t = Math.ceil(this.width / 2), e = t % 4, n = this.height - 1; n >= 0; n--) {
    for (var r = this.bottom_up ? n : this.height - 1 - n, i = 0; i < t; i++) {
      var a = this.datav.getUint8(this.pos++, !0),
          o = r * this.width * 4 + 2 * i * 4,
          s = a >> 4,
          u = 15 & a,
          c = this.palette[s];
      if (this.data[o] = c.blue, this.data[o + 1] = c.green, this.data[o + 2] = c.red, this.data[o + 3] = 255, 2 * i + 1 >= this.width) break;
      c = this.palette[u], this.data[o + 4] = c.blue, this.data[o + 4 + 1] = c.green, this.data[o + 4 + 2] = c.red, this.data[o + 4 + 3] = 255;
    }

    0 !== e && (this.pos += 4 - e);
  }
}, Mt.prototype.bit8 = function () {
  for (var t = this.width % 4, e = this.height - 1; e >= 0; e--) {
    for (var n = this.bottom_up ? e : this.height - 1 - e, r = 0; r < this.width; r++) {
      var i = this.datav.getUint8(this.pos++, !0),
          a = n * this.width * 4 + 4 * r;

      if (i < this.palette.length) {
        var o = this.palette[i];
        this.data[a] = o.red, this.data[a + 1] = o.green, this.data[a + 2] = o.blue, this.data[a + 3] = 255;
      } else this.data[a] = 255, this.data[a + 1] = 255, this.data[a + 2] = 255, this.data[a + 3] = 255;
    }

    0 !== t && (this.pos += 4 - t);
  }
}, Mt.prototype.bit15 = function () {
  for (var t = this.width % 3, e = parseInt("11111", 2), n = this.height - 1; n >= 0; n--) {
    for (var r = this.bottom_up ? n : this.height - 1 - n, i = 0; i < this.width; i++) {
      var a = this.datav.getUint16(this.pos, !0);
      this.pos += 2;
      var o = (a & e) / e * 255 | 0,
          s = (a >> 5 & e) / e * 255 | 0,
          u = (a >> 10 & e) / e * 255 | 0,
          c = a >> 15 ? 255 : 0,
          h = r * this.width * 4 + 4 * i;
      this.data[h] = u, this.data[h + 1] = s, this.data[h + 2] = o, this.data[h + 3] = c;
    }

    this.pos += t;
  }
}, Mt.prototype.bit16 = function () {
  for (var t = this.width % 3, e = parseInt("11111", 2), n = parseInt("111111", 2), r = this.height - 1; r >= 0; r--) {
    for (var i = this.bottom_up ? r : this.height - 1 - r, a = 0; a < this.width; a++) {
      var o = this.datav.getUint16(this.pos, !0);
      this.pos += 2;
      var s = (o & e) / e * 255 | 0,
          u = (o >> 5 & n) / n * 255 | 0,
          c = (o >> 11) / e * 255 | 0,
          h = i * this.width * 4 + 4 * a;
      this.data[h] = c, this.data[h + 1] = u, this.data[h + 2] = s, this.data[h + 3] = 255;
    }

    this.pos += t;
  }
}, Mt.prototype.bit24 = function () {
  for (var t = this.height - 1; t >= 0; t--) {
    for (var e = this.bottom_up ? t : this.height - 1 - t, n = 0; n < this.width; n++) {
      var r = this.datav.getUint8(this.pos++, !0),
          i = this.datav.getUint8(this.pos++, !0),
          a = this.datav.getUint8(this.pos++, !0),
          o = e * this.width * 4 + 4 * n;
      this.data[o] = a, this.data[o + 1] = i, this.data[o + 2] = r, this.data[o + 3] = 255;
    }

    this.pos += this.width % 4;
  }
}, Mt.prototype.bit32 = function () {
  for (var t = this.height - 1; t >= 0; t--) for (var e = this.bottom_up ? t : this.height - 1 - t, n = 0; n < this.width; n++) {
    var r = this.datav.getUint8(this.pos++, !0),
        i = this.datav.getUint8(this.pos++, !0),
        a = this.datav.getUint8(this.pos++, !0),
        o = this.datav.getUint8(this.pos++, !0),
        s = e * this.width * 4 + 4 * n;
    this.data[s] = a, this.data[s + 1] = i, this.data[s + 2] = r, this.data[s + 3] = o;
  }
}, Mt.prototype.getData = function () {
  return this.data;
},
/**
 * @license
 * Copyright (c) 2018 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t) {
  t.processBMP = function (e, n, r, i) {
    var a = new Mt(e, !1),
        o = a.width,
        s = a.height,
        u = {
      data: a.getData(),
      width: o,
      height: s
    },
        c = new Ot(100).encode(u, 100);
    return t.processJPEG.call(this, c, n, r, i);
  };
}(g.API), Et.prototype.getData = function () {
  return this.data;
},
/**
 * @license
 * Copyright (c) 2019 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t) {
  t.processWEBP = function (e, n, r, i) {
    var a = new Et(e, !1),
        o = a.width,
        s = a.height,
        u = {
      data: a.getData(),
      width: o,
      height: s
    },
        c = new Ot(100).encode(u, 100);
    return t.processJPEG.call(this, c, n, r, i);
  };
}(g.API), g.API.setLanguage = function (t) {
  return void 0 === this.internal.languageSettings && (this.internal.languageSettings = {}, this.internal.languageSettings.isSubscribed = !1), void 0 !== {
    af: "Afrikaans",
    sq: "Albanian",
    ar: "Arabic (Standard)",
    "ar-DZ": "Arabic (Algeria)",
    "ar-BH": "Arabic (Bahrain)",
    "ar-EG": "Arabic (Egypt)",
    "ar-IQ": "Arabic (Iraq)",
    "ar-JO": "Arabic (Jordan)",
    "ar-KW": "Arabic (Kuwait)",
    "ar-LB": "Arabic (Lebanon)",
    "ar-LY": "Arabic (Libya)",
    "ar-MA": "Arabic (Morocco)",
    "ar-OM": "Arabic (Oman)",
    "ar-QA": "Arabic (Qatar)",
    "ar-SA": "Arabic (Saudi Arabia)",
    "ar-SY": "Arabic (Syria)",
    "ar-TN": "Arabic (Tunisia)",
    "ar-AE": "Arabic (U.A.E.)",
    "ar-YE": "Arabic (Yemen)",
    an: "Aragonese",
    hy: "Armenian",
    as: "Assamese",
    ast: "Asturian",
    az: "Azerbaijani",
    eu: "Basque",
    be: "Belarusian",
    bn: "Bengali",
    bs: "Bosnian",
    br: "Breton",
    bg: "Bulgarian",
    my: "Burmese",
    ca: "Catalan",
    ch: "Chamorro",
    ce: "Chechen",
    zh: "Chinese",
    "zh-HK": "Chinese (Hong Kong)",
    "zh-CN": "Chinese (PRC)",
    "zh-SG": "Chinese (Singapore)",
    "zh-TW": "Chinese (Taiwan)",
    cv: "Chuvash",
    co: "Corsican",
    cr: "Cree",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch (Standard)",
    "nl-BE": "Dutch (Belgian)",
    en: "English",
    "en-AU": "English (Australia)",
    "en-BZ": "English (Belize)",
    "en-CA": "English (Canada)",
    "en-IE": "English (Ireland)",
    "en-JM": "English (Jamaica)",
    "en-NZ": "English (New Zealand)",
    "en-PH": "English (Philippines)",
    "en-ZA": "English (South Africa)",
    "en-TT": "English (Trinidad & Tobago)",
    "en-GB": "English (United Kingdom)",
    "en-US": "English (United States)",
    "en-ZW": "English (Zimbabwe)",
    eo: "Esperanto",
    et: "Estonian",
    fo: "Faeroese",
    fj: "Fijian",
    fi: "Finnish",
    fr: "French (Standard)",
    "fr-BE": "French (Belgium)",
    "fr-CA": "French (Canada)",
    "fr-FR": "French (France)",
    "fr-LU": "French (Luxembourg)",
    "fr-MC": "French (Monaco)",
    "fr-CH": "French (Switzerland)",
    fy: "Frisian",
    fur: "Friulian",
    gd: "Gaelic (Scots)",
    "gd-IE": "Gaelic (Irish)",
    gl: "Galacian",
    ka: "Georgian",
    de: "German (Standard)",
    "de-AT": "German (Austria)",
    "de-DE": "German (Germany)",
    "de-LI": "German (Liechtenstein)",
    "de-LU": "German (Luxembourg)",
    "de-CH": "German (Switzerland)",
    el: "Greek",
    gu: "Gujurati",
    ht: "Haitian",
    he: "Hebrew",
    hi: "Hindi",
    hu: "Hungarian",
    is: "Icelandic",
    id: "Indonesian",
    iu: "Inuktitut",
    ga: "Irish",
    it: "Italian (Standard)",
    "it-CH": "Italian (Switzerland)",
    ja: "Japanese",
    kn: "Kannada",
    ks: "Kashmiri",
    kk: "Kazakh",
    km: "Khmer",
    ky: "Kirghiz",
    tlh: "Klingon",
    ko: "Korean",
    "ko-KP": "Korean (North Korea)",
    "ko-KR": "Korean (South Korea)",
    la: "Latin",
    lv: "Latvian",
    lt: "Lithuanian",
    lb: "Luxembourgish",
    mk: "FYRO Macedonian",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mi: "Maori",
    mr: "Marathi",
    mo: "Moldavian",
    nv: "Navajo",
    ng: "Ndonga",
    ne: "Nepali",
    no: "Norwegian",
    nb: "Norwegian (Bokmal)",
    nn: "Norwegian (Nynorsk)",
    oc: "Occitan",
    or: "Oriya",
    om: "Oromo",
    fa: "Persian",
    "fa-IR": "Persian/Iran",
    pl: "Polish",
    pt: "Portuguese",
    "pt-BR": "Portuguese (Brazil)",
    pa: "Punjabi",
    "pa-IN": "Punjabi (India)",
    "pa-PK": "Punjabi (Pakistan)",
    qu: "Quechua",
    rm: "Rhaeto-Romanic",
    ro: "Romanian",
    "ro-MO": "Romanian (Moldavia)",
    ru: "Russian",
    "ru-MO": "Russian (Moldavia)",
    sz: "Sami (Lappish)",
    sg: "Sango",
    sa: "Sanskrit",
    sc: "Sardinian",
    sd: "Sindhi",
    si: "Singhalese",
    sr: "Serbian",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somani",
    sb: "Sorbian",
    es: "Spanish",
    "es-AR": "Spanish (Argentina)",
    "es-BO": "Spanish (Bolivia)",
    "es-CL": "Spanish (Chile)",
    "es-CO": "Spanish (Colombia)",
    "es-CR": "Spanish (Costa Rica)",
    "es-DO": "Spanish (Dominican Republic)",
    "es-EC": "Spanish (Ecuador)",
    "es-SV": "Spanish (El Salvador)",
    "es-GT": "Spanish (Guatemala)",
    "es-HN": "Spanish (Honduras)",
    "es-MX": "Spanish (Mexico)",
    "es-NI": "Spanish (Nicaragua)",
    "es-PA": "Spanish (Panama)",
    "es-PY": "Spanish (Paraguay)",
    "es-PE": "Spanish (Peru)",
    "es-PR": "Spanish (Puerto Rico)",
    "es-ES": "Spanish (Spain)",
    "es-UY": "Spanish (Uruguay)",
    "es-VE": "Spanish (Venezuela)",
    sx: "Sutu",
    sw: "Swahili",
    sv: "Swedish",
    "sv-FI": "Swedish (Finland)",
    "sv-SV": "Swedish (Sweden)",
    ta: "Tamil",
    tt: "Tatar",
    te: "Teluga",
    th: "Thai",
    tig: "Tigre",
    ts: "Tsonga",
    tn: "Tswana",
    tr: "Turkish",
    tk: "Turkmen",
    uk: "Ukrainian",
    hsb: "Upper Sorbian",
    ur: "Urdu",
    ve: "Venda",
    vi: "Vietnamese",
    vo: "Volapuk",
    wa: "Walloon",
    cy: "Welsh",
    xh: "Xhosa",
    ji: "Yiddish",
    zu: "Zulu"
  }[t] && (this.internal.languageSettings.languageCode = t, !1 === this.internal.languageSettings.isSubscribed && (this.internal.events.subscribe("putCatalog", function () {
    this.internal.write("/Lang (" + this.internal.languageSettings.languageCode + ")");
  }), this.internal.languageSettings.isSubscribed = !0)), this;
},
/** @license
 * MIT license.
 * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 *               2014 Diego Casorran, https://github.com/diegocr
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
At = g.API, _t = At.getCharWidthsArray = function (t, e) {
  var n,
      r,
      i = (e = e || {}).font || this.internal.getFont(),
      a = e.fontSize || this.internal.getFontSize(),
      o = e.charSpace || this.internal.getCharSpace(),
      s = e.widths ? e.widths : i.metadata.Unicode.widths,
      u = s.fof ? s.fof : 1,
      c = e.kerning ? e.kerning : i.metadata.Unicode.kerning,
      h = c.fof ? c.fof : 1,
      l = !1 !== e.doKerning,
      f = 0,
      d = t.length,
      p = 0,
      g = s[0] || u,
      m = [];

  for (n = 0; n < d; n++) r = t.charCodeAt(n), "function" == typeof i.metadata.widthOfString ? m.push((i.metadata.widthOfGlyph(i.metadata.characterToGlyph(r)) + o * (1e3 / a) || 0) / 1e3) : (f = l && "object" == typeof c[r] && !isNaN(parseInt(c[r][p], 10)) ? c[r][p] / h : 0, m.push((s[r] || g) / u + f)), p = r;

  return m;
}, St = At.getStringUnitWidth = function (t, e) {
  var n = (e = e || {}).fontSize || this.internal.getFontSize(),
      r = e.font || this.internal.getFont(),
      i = e.charSpace || this.internal.getCharSpace();
  return At.processArabic && (t = At.processArabic(t)), "function" == typeof r.metadata.widthOfString ? r.metadata.widthOfString(t, n, i) / n : _t.apply(this, arguments).reduce(function (t, e) {
    return t + e;
  }, 0);
}, Pt = function (t, e, n, r) {
  for (var i = [], a = 0, o = t.length, s = 0; a !== o && s + e[a] < n;) s += e[a], a++;

  i.push(t.slice(0, a));
  var u = a;

  for (s = 0; a !== o;) s + e[a] > r && (i.push(t.slice(u, a)), s = 0, u = a), s += e[a], a++;

  return u !== a && i.push(t.slice(u, a)), i;
}, kt = function (t, e, n) {
  n || (n = {});

  var r,
      i,
      a,
      o,
      s,
      u,
      c,
      h = [],
      l = [h],
      f = n.textIndent || 0,
      d = 0,
      p = 0,
      g = t.split(" "),
      m = _t.apply(this, [" ", n])[0];

  if (u = -1 === n.lineIndent ? g[0].length + 2 : n.lineIndent || 0) {
    var v = Array(u).join(" "),
        b = [];
    g.map(function (t) {
      (t = t.split(/\s*\n/)).length > 1 ? b = b.concat(t.map(function (t, e) {
        return (e && t.length ? "\n" : "") + t;
      })) : b.push(t[0]);
    }), g = b, u = St.apply(this, [v, n]);
  }

  for (a = 0, o = g.length; a < o; a++) {
    var y = 0;

    if (r = g[a], u && "\n" == r[0] && (r = r.substr(1), y = 1), f + d + (p = (i = _t.apply(this, [r, n])).reduce(function (t, e) {
      return t + e;
    }, 0)) > e || y) {
      if (p > e) {
        for (s = Pt.apply(this, [r, i, e - (f + d), e]), h.push(s.shift()), h = [s.pop()]; s.length;) l.push([s.shift()]);

        p = i.slice(r.length - (h[0] ? h[0].length : 0)).reduce(function (t, e) {
          return t + e;
        }, 0);
      } else h = [r];

      l.push(h), f = p + u, d = m;
    } else h.push(r), f += d + p, d = m;
  }

  return c = u ? function (t, e) {
    return (e ? v : "") + t.join(" ");
  } : function (t) {
    return t.join(" ");
  }, l.map(c);
}, At.splitTextToSize = function (t, e, n) {
  var r,
      i = (n = n || {}).fontSize || this.internal.getFontSize(),
      a = function (t) {
    if (t.widths && t.kerning) return {
      widths: t.widths,
      kerning: t.kerning
    };
    var e = this.internal.getFont(t.fontName, t.fontStyle);
    return e.metadata.Unicode ? {
      widths: e.metadata.Unicode.widths || {
        0: 1
      },
      kerning: e.metadata.Unicode.kerning || {}
    } : {
      font: e.metadata,
      fontSize: this.internal.getFontSize(),
      charSpace: this.internal.getCharSpace()
    };
  }.call(this, n);

  r = Array.isArray(t) ? t : String(t).split(/\r?\n/);
  var o = 1 * this.internal.scaleFactor * e / i;
  a.textIndent = n.textIndent ? 1 * n.textIndent * this.internal.scaleFactor / i : 0, a.lineIndent = n.lineIndent;
  var s,
      u,
      c = [];

  for (s = 0, u = r.length; s < u; s++) c = c.concat(kt.apply(this, [r[s], o, a]));

  return c;
},
/** @license
 jsPDF standard_fonts_metrics plugin
 * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 * MIT license.
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function (t) {
  t.__fontmetrics__ = t.__fontmetrics__ || {};

  for (var e = "klmnopqrstuvwxyz", n = {}, r = {}, i = 0; i < e.length; i++) n[e[i]] = "0123456789abcdef"[i], r["0123456789abcdef"[i]] = e[i];

  var a = function (t) {
    return "0x" + parseInt(t, 10).toString(16);
  },
      o = t.__fontmetrics__.compress = function (t) {
    var e,
        n,
        i,
        s,
        u = ["{"];

    for (var c in t) {
      if (e = t[c], isNaN(parseInt(c, 10)) ? n = "'" + c + "'" : (c = parseInt(c, 10), n = (n = a(c).slice(2)).slice(0, -1) + r[n.slice(-1)]), "number" == typeof e) e < 0 ? (i = a(e).slice(3), s = "-") : (i = a(e).slice(2), s = ""), i = s + i.slice(0, -1) + r[i.slice(-1)];else {
        if ("object" != typeof e) throw new Error("Don't know what to do with value type " + typeof e + ".");
        i = o(e);
      }
      u.push(n + i);
    }

    return u.push("}"), u.join("");
  },
      s = t.__fontmetrics__.uncompress = function (t) {
    if ("string" != typeof t) throw new Error("Invalid argument passed to uncompress.");

    for (var e, r, i, a, o = {}, s = 1, u = o, c = [], h = "", l = "", f = t.length - 1, d = 1; d < f; d += 1) "'" == (a = t[d]) ? e ? (i = e.join(""), e = void 0) : e = [] : e ? e.push(a) : "{" == a ? (c.push([u, i]), u = {}, i = void 0) : "}" == a ? ((r = c.pop())[0][r[1]] = u, i = void 0, u = r[0]) : "-" == a ? s = -1 : void 0 === i ? n.hasOwnProperty(a) ? (h += n[a], i = parseInt(h, 16) * s, s = 1, h = "") : h += a : n.hasOwnProperty(a) ? (l += n[a], u[i] = parseInt(l, 16) * s, s = 1, i = void 0, l = "") : l += a;

    return o;
  },
      u = {
    codePages: ["WinAnsiEncoding"],
    WinAnsiEncoding: s("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")
  },
      c = {
    Unicode: {
      Courier: u,
      "Courier-Bold": u,
      "Courier-BoldOblique": u,
      "Courier-Oblique": u,
      Helvetica: u,
      "Helvetica-Bold": u,
      "Helvetica-BoldOblique": u,
      "Helvetica-Oblique": u,
      "Times-Roman": u,
      "Times-Bold": u,
      "Times-BoldItalic": u,
      "Times-Italic": u
    }
  },
      h = {
    Unicode: {
      "Courier-Oblique": s("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
      "Times-BoldItalic": s("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),
      "Helvetica-Bold": s("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
      Courier: s("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
      "Courier-BoldOblique": s("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
      "Times-Bold": s("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),
      Symbol: s("{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}"),
      Helvetica: s("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),
      "Helvetica-BoldOblique": s("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
      ZapfDingbats: s("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"),
      "Courier-Bold": s("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
      "Times-Italic": s("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),
      "Times-Roman": s("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),
      "Helvetica-Oblique": s("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")
    }
  };

  t.events.push(["addFont", function (t) {
    var e = t.font,
        n = h.Unicode[e.postScriptName];
    n && (e.metadata.Unicode = {}, e.metadata.Unicode.widths = n.widths, e.metadata.Unicode.kerning = n.kerning);
    var r = c.Unicode[e.postScriptName];
    r && (e.metadata.Unicode.encoding = r, e.encoding = r.codePages[0]);
  }]);
}(g.API),
/**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t) {
  var e = function (t) {
    for (var e = t.length, n = new Uint8Array(e), r = 0; r < e; r++) n[r] = t.charCodeAt(r);

    return n;
  };

  t.API.events.push(["addFont", function (n) {
    var r = void 0,
        i = n.font,
        a = n.instance;

    if (!i.isStandardFont) {
      if (void 0 === a) throw new Error("Font does not exist in vFS, import fonts or remove declaration doc.addFont('" + i.postScriptName + "').");
      if ("string" != typeof (r = !1 === a.existsFileInVFS(i.postScriptName) ? a.loadFile(i.postScriptName) : a.getFileFromVFS(i.postScriptName))) throw new Error("Font is not stored as string-data in vFS, import fonts or remove declaration doc.addFont('" + i.postScriptName + "').");
      !function (n, r) {
        r = /^\x00\x01\x00\x00/.test(r) ? e(r) : e(o(r)), n.metadata = t.API.TTFFont.open(r), n.metadata.Unicode = n.metadata.Unicode || {
          encoding: {},
          kerning: {},
          widths: []
        }, n.metadata.glyIdsUsed = [0];
      }(i, r);
    }
  }]);
}(g),
/** @license
 * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function (e) {
  function r() {
    return (t.canvg ? Promise.resolve(t.canvg) : require("_bundle_loader")(require.resolve("canvg"))).catch(function (t) {
      return Promise.reject(new Error("Could not load dompurify: " + t));
    }).then(function (t) {
      return t.default ? t.default : t;
    });
  }

  g.API.addSvgAsImage = function (t, e, i, a, o, s, u, c) {
    if (isNaN(e) || isNaN(i)) throw n.error("jsPDF.addSvgAsImage: Invalid coordinates", arguments), new Error("Invalid coordinates passed to jsPDF.addSvgAsImage");
    if (isNaN(a) || isNaN(o)) throw n.error("jsPDF.addSvgAsImage: Invalid measurements", arguments), new Error("Invalid measurements (width and/or height) passed to jsPDF.addSvgAsImage");
    var h = document.createElement("canvas");
    h.width = a, h.height = o;
    var l = h.getContext("2d");
    l.fillStyle = "#fff", l.fillRect(0, 0, h.width, h.height);
    var f = {
      ignoreMouse: !0,
      ignoreAnimation: !0,
      ignoreDimensions: !0
    },
        d = this;
    return r().then(function (e) {
      return e.Canvg.fromString(l, t, f);
    }, function () {
      return Promise.reject(new Error("Could not load canvg."));
    }).then(function (t) {
      return t.render(f);
    }).then(function () {
      d.addImage(h.toDataURL("image/jpeg", 1), e, i, a, o, u, c);
    });
  };
}(), g.API.putTotalPages = function (t) {
  var e,
      n = 0;
  parseInt(this.internal.getFont().id.substr(1), 10) < 15 ? (e = new RegExp(t, "g"), n = this.internal.getNumberOfPages()) : (e = new RegExp(this.pdfEscape16(t, this.internal.getFont()), "g"), n = this.pdfEscape16(this.internal.getNumberOfPages() + "", this.internal.getFont()));

  for (var r = 1; r <= this.internal.getNumberOfPages(); r++) for (var i = 0; i < this.internal.pages[r].length; i++) this.internal.pages[r][i] = this.internal.pages[r][i].replace(e, n);

  return this;
}, g.API.viewerPreferences = function (t, e) {
  var n;
  t = t || {}, e = e || !1;
  var r,
      i,
      a,
      o = {
    HideToolbar: {
      defaultValue: !1,
      value: !1,
      type: "boolean",
      explicitSet: !1,
      valueSet: [!0, !1],
      pdfVersion: 1.3
    },
    HideMenubar: {
      defaultValue: !1,
      value: !1,
      type: "boolean",
      explicitSet: !1,
      valueSet: [!0, !1],
      pdfVersion: 1.3
    },
    HideWindowUI: {
      defaultValue: !1,
      value: !1,
      type: "boolean",
      explicitSet: !1,
      valueSet: [!0, !1],
      pdfVersion: 1.3
    },
    FitWindow: {
      defaultValue: !1,
      value: !1,
      type: "boolean",
      explicitSet: !1,
      valueSet: [!0, !1],
      pdfVersion: 1.3
    },
    CenterWindow: {
      defaultValue: !1,
      value: !1,
      type: "boolean",
      explicitSet: !1,
      valueSet: [!0, !1],
      pdfVersion: 1.3
    },
    DisplayDocTitle: {
      defaultValue: !1,
      value: !1,
      type: "boolean",
      explicitSet: !1,
      valueSet: [!0, !1],
      pdfVersion: 1.4
    },
    NonFullScreenPageMode: {
      defaultValue: "UseNone",
      value: "UseNone",
      type: "name",
      explicitSet: !1,
      valueSet: ["UseNone", "UseOutlines", "UseThumbs", "UseOC"],
      pdfVersion: 1.3
    },
    Direction: {
      defaultValue: "L2R",
      value: "L2R",
      type: "name",
      explicitSet: !1,
      valueSet: ["L2R", "R2L"],
      pdfVersion: 1.3
    },
    ViewArea: {
      defaultValue: "CropBox",
      value: "CropBox",
      type: "name",
      explicitSet: !1,
      valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
      pdfVersion: 1.4
    },
    ViewClip: {
      defaultValue: "CropBox",
      value: "CropBox",
      type: "name",
      explicitSet: !1,
      valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
      pdfVersion: 1.4
    },
    PrintArea: {
      defaultValue: "CropBox",
      value: "CropBox",
      type: "name",
      explicitSet: !1,
      valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
      pdfVersion: 1.4
    },
    PrintClip: {
      defaultValue: "CropBox",
      value: "CropBox",
      type: "name",
      explicitSet: !1,
      valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
      pdfVersion: 1.4
    },
    PrintScaling: {
      defaultValue: "AppDefault",
      value: "AppDefault",
      type: "name",
      explicitSet: !1,
      valueSet: ["AppDefault", "None"],
      pdfVersion: 1.6
    },
    Duplex: {
      defaultValue: "",
      value: "none",
      type: "name",
      explicitSet: !1,
      valueSet: ["Simplex", "DuplexFlipShortEdge", "DuplexFlipLongEdge", "none"],
      pdfVersion: 1.7
    },
    PickTrayByPDFSize: {
      defaultValue: !1,
      value: !1,
      type: "boolean",
      explicitSet: !1,
      valueSet: [!0, !1],
      pdfVersion: 1.7
    },
    PrintPageRange: {
      defaultValue: "",
      value: "",
      type: "array",
      explicitSet: !1,
      valueSet: null,
      pdfVersion: 1.7
    },
    NumCopies: {
      defaultValue: 1,
      value: 1,
      type: "integer",
      explicitSet: !1,
      valueSet: null,
      pdfVersion: 1.7
    }
  },
      s = Object.keys(o),
      u = [],
      c = 0,
      h = 0,
      l = 0;

  function f(t, e) {
    var n,
        r = !1;

    for (n = 0; n < t.length; n += 1) t[n] === e && (r = !0);

    return r;
  }

  if (void 0 === this.internal.viewerpreferences && (this.internal.viewerpreferences = {}, this.internal.viewerpreferences.configuration = JSON.parse(JSON.stringify(o)), this.internal.viewerpreferences.isSubscribed = !1), n = this.internal.viewerpreferences.configuration, "reset" === t || !0 === e) {
    var d = s.length;

    for (l = 0; l < d; l += 1) n[s[l]].value = n[s[l]].defaultValue, n[s[l]].explicitSet = !1;
  }

  if ("object" == typeof t) for (i in t) if (a = t[i], f(s, i) && void 0 !== a) {
    if ("boolean" === n[i].type && "boolean" == typeof a) n[i].value = a;else if ("name" === n[i].type && f(n[i].valueSet, a)) n[i].value = a;else if ("integer" === n[i].type && Number.isInteger(a)) n[i].value = a;else if ("array" === n[i].type) {
      for (c = 0; c < a.length; c += 1) if (r = !0, 1 === a[c].length && "number" == typeof a[c][0]) u.push(String(a[c] - 1));else if (a[c].length > 1) {
        for (h = 0; h < a[c].length; h += 1) "number" != typeof a[c][h] && (r = !1);

        !0 === r && u.push([a[c][0] - 1, a[c][1] - 1].join(" "));
      }

      n[i].value = "[" + u.join(" ") + "]";
    } else n[i].value = n[i].defaultValue;
    n[i].explicitSet = !0;
  }
  return !1 === this.internal.viewerpreferences.isSubscribed && (this.internal.events.subscribe("putCatalog", function () {
    var t,
        e = [];

    for (t in n) !0 === n[t].explicitSet && ("name" === n[t].type ? e.push("/" + t + " /" + n[t].value) : e.push("/" + t + " " + n[t].value));

    0 !== e.length && this.internal.write("/ViewerPreferences\n<<\n" + e.join("\n") + "\n>>");
  }), this.internal.viewerpreferences.isSubscribed = !0), this.internal.viewerpreferences.configuration = n, this;
},
/** ====================================================================
 * @license
 * jsPDF XMP metadata plugin
 * Copyright (c) 2016 Jussi Utunen, u-jussi@suomi24.fi
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function (t) {
  var e = function () {
    var t = '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="' + this.internal.__metadata__.namespaceuri + '"><jspdf:metadata>',
        e = unescape(encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">')),
        n = unescape(encodeURIComponent(t)),
        r = unescape(encodeURIComponent(this.internal.__metadata__.metadata)),
        i = unescape(encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>")),
        a = unescape(encodeURIComponent("</x:xmpmeta>")),
        o = n.length + r.length + i.length + e.length + a.length;
    this.internal.__metadata__.metadata_object_number = this.internal.newObject(), this.internal.write("<< /Type /Metadata /Subtype /XML /Length " + o + " >>"), this.internal.write("stream"), this.internal.write(e + n + r + i + a), this.internal.write("endstream"), this.internal.write("endobj");
  },
      n = function () {
    this.internal.__metadata__.metadata_object_number && this.internal.write("/Metadata " + this.internal.__metadata__.metadata_object_number + " 0 R");
  };

  t.addMetadata = function (t, r) {
    return void 0 === this.internal.__metadata__ && (this.internal.__metadata__ = {
      metadata: t,
      namespaceuri: r || "http://jspdf.default.namespaceuri/"
    }, this.internal.events.subscribe("putCatalog", n), this.internal.events.subscribe("postPutResources", e)), this;
  };
}(g.API), function (t) {
  var e = t.API,
      n = e.pdfEscape16 = function (t, e) {
    for (var n, r = e.metadata.Unicode.widths, i = ["", "0", "00", "000", "0000"], a = [""], o = 0, s = t.length; o < s; ++o) {
      if (n = e.metadata.characterToGlyph(t.charCodeAt(o)), e.metadata.glyIdsUsed.push(n), e.metadata.toUnicode[n] = t.charCodeAt(o), -1 == r.indexOf(n) && (r.push(n), r.push([parseInt(e.metadata.widthOfGlyph(n), 10)])), "0" == n) return a.join("");
      n = n.toString(16), a.push(i[4 - n.length], n);
    }

    return a.join("");
  },
      r = function (t) {
    var e, n, r, i, a, o, s;

    for (a = "/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange", r = [], o = 0, s = (n = Object.keys(t).sort(function (t, e) {
      return t - e;
    })).length; o < s; o++) e = n[o], r.length >= 100 && (a += "\n" + r.length + " beginbfchar\n" + r.join("\n") + "\nendbfchar", r = []), void 0 !== t[e] && null !== t[e] && "function" == typeof t[e].toString && (i = ("0000" + t[e].toString(16)).slice(-4), e = ("0000" + (+e).toString(16)).slice(-4), r.push("<" + e + "><" + i + ">"));

    return r.length && (a += "\n" + r.length + " beginbfchar\n" + r.join("\n") + "\nendbfchar\n"), a += "endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend";
  };

  e.events.push(["putFont", function (e) {
    !function (e) {
      var n = e.font,
          i = e.out,
          a = e.newObject,
          o = e.putStream,
          s = e.pdfEscapeWithNeededParanthesis;

      if (n.metadata instanceof t.API.TTFFont && "Identity-H" === n.encoding) {
        for (var u = n.metadata.Unicode.widths, c = n.metadata.subset.encode(n.metadata.glyIdsUsed, 1), h = "", l = 0; l < c.length; l++) h += String.fromCharCode(c[l]);

        var f = a();
        o({
          data: h,
          addLength1: !0
        }), i("endobj");
        var d = a();
        o({
          data: r(n.metadata.toUnicode),
          addLength1: !0
        }), i("endobj");
        var p = a();
        i("<<"), i("/Type /FontDescriptor"), i("/FontName /" + s(n.fontName)), i("/FontFile2 " + f + " 0 R"), i("/FontBBox " + t.API.PDFObject.convert(n.metadata.bbox)), i("/Flags " + n.metadata.flags), i("/StemV " + n.metadata.stemV), i("/ItalicAngle " + n.metadata.italicAngle), i("/Ascent " + n.metadata.ascender), i("/Descent " + n.metadata.decender), i("/CapHeight " + n.metadata.capHeight), i(">>"), i("endobj");
        var g = a();
        i("<<"), i("/Type /Font"), i("/BaseFont /" + s(n.fontName)), i("/FontDescriptor " + p + " 0 R"), i("/W " + t.API.PDFObject.convert(u)), i("/CIDToGIDMap /Identity"), i("/DW 1000"), i("/Subtype /CIDFontType2"), i("/CIDSystemInfo"), i("<<"), i("/Supplement 0"), i("/Registry (Adobe)"), i("/Ordering (" + n.encoding + ")"), i(">>"), i(">>"), i("endobj"), n.objectNumber = a(), i("<<"), i("/Type /Font"), i("/Subtype /Type0"), i("/ToUnicode " + d + " 0 R"), i("/BaseFont /" + s(n.fontName)), i("/Encoding /" + n.encoding), i("/DescendantFonts [" + g + " 0 R]"), i(">>"), i("endobj"), n.isAlreadyPutted = !0;
      }
    }(e);
  }]);
  e.events.push(["putFont", function (e) {
    !function (e) {
      var n = e.font,
          i = e.out,
          a = e.newObject,
          o = e.putStream,
          s = e.pdfEscapeWithNeededParanthesis;

      if (n.metadata instanceof t.API.TTFFont && "WinAnsiEncoding" === n.encoding) {
        for (var u = n.metadata.rawData, c = "", h = 0; h < u.length; h++) c += String.fromCharCode(u[h]);

        var l = a();
        o({
          data: c,
          addLength1: !0
        }), i("endobj");
        var f = a();
        o({
          data: r(n.metadata.toUnicode),
          addLength1: !0
        }), i("endobj");
        var d = a();
        i("<<"), i("/Descent " + n.metadata.decender), i("/CapHeight " + n.metadata.capHeight), i("/StemV " + n.metadata.stemV), i("/Type /FontDescriptor"), i("/FontFile2 " + l + " 0 R"), i("/Flags 96"), i("/FontBBox " + t.API.PDFObject.convert(n.metadata.bbox)), i("/FontName /" + s(n.fontName)), i("/ItalicAngle " + n.metadata.italicAngle), i("/Ascent " + n.metadata.ascender), i(">>"), i("endobj"), n.objectNumber = a();

        for (var p = 0; p < n.metadata.hmtx.widths.length; p++) n.metadata.hmtx.widths[p] = parseInt(n.metadata.hmtx.widths[p] * (1e3 / n.metadata.head.unitsPerEm));

        i("<</Subtype/TrueType/Type/Font/ToUnicode " + f + " 0 R/BaseFont/" + n.fontName + "/FontDescriptor " + d + " 0 R/Encoding/" + n.encoding + " /FirstChar 29 /LastChar 255 /Widths " + t.API.PDFObject.convert(n.metadata.hmtx.widths) + ">>"), i("endobj"), n.isAlreadyPutted = !0;
      }
    }(e);
  }]);

  var i = function (t) {
    var e,
        r = t.text || "",
        i = t.x,
        a = t.y,
        o = t.options || {},
        s = t.mutex || {},
        u = s.pdfEscape,
        c = s.activeFontKey,
        h = s.fonts,
        l = c,
        f = "",
        d = 0,
        p = "",
        g = h[l].encoding;
    if ("Identity-H" !== h[l].encoding) return {
      text: r,
      x: i,
      y: a,
      options: o,
      mutex: s
    };

    for (p = r, l = c, Array.isArray(r) && (p = r[0]), d = 0; d < p.length; d += 1) h[l].metadata.hasOwnProperty("cmap") && (e = h[l].metadata.cmap.unicode.codeMap[p[d].charCodeAt(0)]), e || p[d].charCodeAt(0) < 256 && h[l].metadata.hasOwnProperty("Unicode") ? f += p[d] : f += "";

    var m = "";
    return parseInt(l.slice(1)) < 14 || "WinAnsiEncoding" === g ? m = u(f, l).split("").map(function (t) {
      return t.charCodeAt(0).toString(16);
    }).join("") : "Identity-H" === g && (m = n(f, h[l])), s.isHex = !0, {
      text: m,
      x: i,
      y: a,
      options: o,
      mutex: s
    };
  };

  e.events.push(["postProcessText", function (t) {
    var e = t.text || "",
        n = [],
        r = {
      text: e,
      x: t.x,
      y: t.y,
      options: t.options,
      mutex: t.mutex
    };

    if (Array.isArray(e)) {
      var a = 0;

      for (a = 0; a < e.length; a += 1) Array.isArray(e[a]) && 3 === e[a].length ? n.push([i(Object.assign({}, r, {
        text: e[a][0]
      })).text, e[a][1], e[a][2]]) : n.push(i(Object.assign({}, r, {
        text: e[a]
      })).text);

      t.text = n;
    } else t.text = i(Object.assign({}, r, {
      text: e
    })).text;
  }]);
}(g),
/**
 * @license
 * jsPDF virtual FileSystem functionality
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t) {
  var e = function () {
    return void 0 === this.internal.vFS && (this.internal.vFS = {}), !0;
  };

  t.existsFileInVFS = function (t) {
    return e.call(this), void 0 !== this.internal.vFS[t];
  }, t.addFileToVFS = function (t, n) {
    return e.call(this), this.internal.vFS[t] = n, this;
  }, t.getFileFromVFS = function (t) {
    return e.call(this), void 0 !== this.internal.vFS[t] ? this.internal.vFS[t] : null;
  };
}(g.API),
/**
 * @license
 * Unicode Bidi Engine based on the work of Alex Shensis (@asthensis)
 * MIT License
 */
function (t) {
  t.__bidiEngine__ = t.prototype.__bidiEngine__ = function (t) {
    var n,
        r,
        i,
        a,
        o,
        s,
        u,
        c = e,
        h = [[0, 3, 0, 1, 0, 0, 0], [0, 3, 0, 1, 2, 2, 0], [0, 3, 0, 17, 2, 0, 1], [0, 3, 5, 5, 4, 1, 0], [0, 3, 21, 21, 4, 0, 1], [0, 3, 5, 5, 4, 2, 0]],
        l = [[2, 0, 1, 1, 0, 1, 0], [2, 0, 1, 1, 0, 2, 0], [2, 0, 2, 1, 3, 2, 0], [2, 0, 2, 33, 3, 1, 1]],
        f = {
      L: 0,
      R: 1,
      EN: 2,
      AN: 3,
      N: 4,
      B: 5,
      S: 6
    },
        d = {
      0: 0,
      5: 1,
      6: 2,
      7: 3,
      32: 4,
      251: 5,
      254: 6,
      255: 7
    },
        p = ["(", ")", "(", "<", ">", "<", "[", "]", "[", "{", "}", "{", "«", "»", "«", "‹", "›", "‹", "⁅", "⁆", "⁅", "⁽", "⁾", "⁽", "₍", "₎", "₍", "≤", "≥", "≤", "〈", "〉", "〈", "﹙", "﹚", "﹙", "﹛", "﹜", "﹛", "﹝", "﹞", "﹝", "﹤", "﹥", "﹤"],
        g = new RegExp(/^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/),
        m = !1,
        v = 0;
    this.__bidiEngine__ = {};

    var b = function (t) {
      var e = t.charCodeAt(),
          n = e >> 8,
          r = d[n];
      return void 0 !== r ? c[256 * r + (255 & e)] : 252 === n || 253 === n ? "AL" : g.test(n) ? "L" : 8 === n ? "R" : "N";
    },
        y = function (t) {
      for (var e, n = 0; n < t.length; n++) {
        if ("L" === (e = b(t.charAt(n)))) return !1;
        if ("R" === e) return !0;
      }

      return !1;
    },
        w = function (t, e, o, s) {
      var u,
          c,
          h,
          l,
          f = e[s];

      switch (f) {
        case "L":
        case "R":
          m = !1;
          break;

        case "N":
        case "AN":
          break;

        case "EN":
          m && (f = "AN");
          break;

        case "AL":
          m = !0, f = "R";
          break;

        case "WS":
          f = "N";
          break;

        case "CS":
          s < 1 || s + 1 >= e.length || "EN" !== (u = o[s - 1]) && "AN" !== u || "EN" !== (c = e[s + 1]) && "AN" !== c ? f = "N" : m && (c = "AN"), f = c === u ? c : "N";
          break;

        case "ES":
          f = "EN" === (u = s > 0 ? o[s - 1] : "B") && s + 1 < e.length && "EN" === e[s + 1] ? "EN" : "N";
          break;

        case "ET":
          if (s > 0 && "EN" === o[s - 1]) {
            f = "EN";
            break;
          }

          if (m) {
            f = "N";
            break;
          }

          for (h = s + 1, l = e.length; h < l && "ET" === e[h];) h++;

          f = h < l && "EN" === e[h] ? "EN" : "N";
          break;

        case "NSM":
          if (i && !a) {
            for (l = e.length, h = s + 1; h < l && "NSM" === e[h];) h++;

            if (h < l) {
              var d = t[s],
                  p = d >= 1425 && d <= 2303 || 64286 === d;

              if (u = e[h], p && ("R" === u || "AL" === u)) {
                f = "R";
                break;
              }
            }
          }

          f = s < 1 || "B" === (u = e[s - 1]) ? "N" : o[s - 1];
          break;

        case "B":
          m = !1, n = !0, f = v;
          break;

        case "S":
          r = !0, f = "N";
          break;

        case "LRE":
        case "RLE":
        case "LRO":
        case "RLO":
        case "PDF":
          m = !1;
          break;

        case "BN":
          f = "N";
      }

      return f;
    },
        N = function (t, e, n) {
      var r = t.split("");
      return n && L(r, n, {
        hiLevel: v
      }), r.reverse(), e && e.reverse(), r.join("");
    },
        L = function (t, e, i) {
      var a,
          o,
          s,
          u,
          c,
          d = -1,
          p = t.length,
          g = 0,
          y = [],
          N = v ? l : h,
          L = [];

      for (m = !1, n = !1, r = !1, o = 0; o < p; o++) L[o] = b(t[o]);

      for (s = 0; s < p; s++) {
        if (c = g, y[s] = w(t, L, y, s), a = 240 & (g = N[c][f[y[s]]]), g &= 15, e[s] = u = N[g][5], a > 0) if (16 === a) {
          for (o = d; o < s; o++) e[o] = 1;

          d = -1;
        } else d = -1;
        if (N[g][6]) -1 === d && (d = s);else if (d > -1) {
          for (o = d; o < s; o++) e[o] = u;

          d = -1;
        }
        "B" === L[s] && (e[s] = 0), i.hiLevel |= u;
      }

      r && function (t, e, n) {
        for (var r = 0; r < n; r++) if ("S" === t[r]) {
          e[r] = v;

          for (var i = r - 1; i >= 0 && "WS" === t[i]; i--) e[i] = v;
        }
      }(L, e, p);
    },
        x = function (t, e, r, i, a) {
      if (!(a.hiLevel < t)) {
        if (1 === t && 1 === v && !n) return e.reverse(), void (r && r.reverse());

        for (var o, s, u, c, h = e.length, l = 0; l < h;) {
          if (i[l] >= t) {
            for (u = l + 1; u < h && i[u] >= t;) u++;

            for (c = l, s = u - 1; c < s; c++, s--) o = e[c], e[c] = e[s], e[s] = o, r && (o = r[c], r[c] = r[s], r[s] = o);

            l = u;
          }

          l++;
        }
      }
    },
        A = function (t, e, n) {
      var r = t.split(""),
          i = {
        hiLevel: v
      };
      return n || (n = []), L(r, n, i), function (t, e, n) {
        if (0 !== n.hiLevel && u) for (var r, i = 0; i < t.length; i++) 1 === e[i] && (r = p.indexOf(t[i])) >= 0 && (t[i] = p[r + 1]);
      }(r, n, i), x(2, r, e, n, i), x(1, r, e, n, i), r.join("");
    };

    return this.__bidiEngine__.doBidiReorder = function (t, e, n) {
      if (function (t, e) {
        if (e) for (var n = 0; n < t.length; n++) e[n] = n;
        void 0 === a && (a = y(t)), void 0 === s && (s = y(t));
      }(t, e), i || !o || s) {
        if (i && o && a ^ s) v = a ? 1 : 0, t = N(t, e, n);else if (!i && o && s) v = a ? 1 : 0, t = A(t, e, n), t = N(t, e);else if (!i || a || o || s) {
          if (i && !o && a ^ s) t = N(t, e), a ? (v = 0, t = A(t, e, n)) : (v = 1, t = A(t, e, n), t = N(t, e));else if (i && a && !o && s) v = 1, t = A(t, e, n), t = N(t, e);else if (!i && !o && a ^ s) {
            var r = u;
            a ? (v = 1, t = A(t, e, n), v = 0, u = !1, t = A(t, e, n), u = r) : (v = 0, t = A(t, e, n), t = N(t, e), v = 1, u = !1, t = A(t, e, n), u = r, t = N(t, e));
          }
        } else v = 0, t = A(t, e, n);
      } else v = a ? 1 : 0, t = A(t, e, n);
      return t;
    }, this.__bidiEngine__.setOptions = function (t) {
      t && (i = t.isInputVisual, o = t.isOutputVisual, a = t.isInputRtl, s = t.isOutputRtl, u = t.isSymmetricSwapping);
    }, this.__bidiEngine__.setOptions(t), this.__bidiEngine__;
  };

  var e = ["BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "S", "B", "S", "WS", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "B", "B", "B", "S", "WS", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "BN", "BN", "BN", "BN", "BN", "BN", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "CS", "N", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "L", "N", "N", "BN", "N", "N", "ET", "ET", "EN", "EN", "N", "L", "N", "N", "N", "EN", "L", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "N", "N", "N", "N", "N", "ET", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "NSM", "R", "NSM", "NSM", "R", "NSM", "NSM", "R", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AN", "AN", "AN", "AN", "AN", "AN", "N", "N", "AL", "ET", "ET", "AL", "CS", "AL", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "ET", "AN", "AN", "AL", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "NSM", "NSM", "N", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "R", "N", "N", "N", "N", "R", "N", "N", "N", "N", "N", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "BN", "BN", "BN", "L", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "B", "LRE", "RLE", "PDF", "LRO", "RLO", "CS", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "BN", "BN", "BN", "BN", "BN", "N", "LRI", "RLI", "FSI", "PDI", "BN", "BN", "BN", "BN", "BN", "BN", "EN", "L", "N", "N", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "L", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "R", "NSM", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "ES", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "R", "R", "R", "R", "R", "N", "R", "N", "R", "R", "N", "R", "R", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "CS", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "ET", "N", "N", "ES", "ES", "N", "N", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "BN", "N", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "N", "N", "N", "ET", "ET", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"],
      n = new t.__bidiEngine__({
    isInputVisual: !0
  });
  t.API.events.push(["postProcessText", function (t) {
    var e = t.text,
        r = (t.x, t.y, t.options || {}),
        i = (t.mutex, r.lang, []);

    if (r.isInputVisual = "boolean" != typeof r.isInputVisual || r.isInputVisual, n.setOptions(r), "[object Array]" === Object.prototype.toString.call(e)) {
      var a = 0;

      for (i = [], a = 0; a < e.length; a += 1) "[object Array]" === Object.prototype.toString.call(e[a]) ? i.push([n.doBidiReorder(e[a][0]), e[a][1], e[a][2]]) : i.push([n.doBidiReorder(e[a])]);

      t.text = i;
    } else t.text = n.doBidiReorder(e);

    n.setOptions({
      isInputVisual: !0
    });
  }]);
}(g), g.API.TTFFont = function () {
  function t(t) {
    var e;
    if (this.rawData = t, e = this.contents = new Rt(t), this.contents.pos = 4, "ttcf" === e.readString(4)) throw new Error("TTCF not supported.");
    e.pos = 0, this.parse(), this.subset = new re(this), this.registerTTF();
  }

  return t.open = function (e) {
    return new t(e);
  }, t.prototype.parse = function () {
    return this.directory = new Tt(this.contents), this.head = new zt(this), this.name = new Xt(this), this.cmap = new Wt(this), this.toUnicode = {}, this.hhea = new Vt(this), this.maxp = new Kt(this), this.hmtx = new Zt(this), this.post = new Yt(this), this.os2 = new Gt(this), this.loca = new ne(this), this.glyf = new Qt(this), this.ascender = this.os2.exists && this.os2.ascender || this.hhea.ascender, this.decender = this.os2.exists && this.os2.decender || this.hhea.decender, this.lineGap = this.os2.exists && this.os2.lineGap || this.hhea.lineGap, this.bbox = [this.head.xMin, this.head.yMin, this.head.xMax, this.head.yMax];
  }, t.prototype.registerTTF = function () {
    var t, e, n, r, i;
    if (this.scaleFactor = 1e3 / this.head.unitsPerEm, this.bbox = function () {
      var e, n, r, i;

      for (i = [], e = 0, n = (r = this.bbox).length; e < n; e++) t = r[e], i.push(Math.round(t * this.scaleFactor));

      return i;
    }.call(this), this.stemV = 0, this.post.exists ? (n = 255 & (r = this.post.italic_angle), 0 != (32768 & (e = r >> 16)) && (e = -(1 + (65535 ^ e))), this.italicAngle = +(e + "." + n)) : this.italicAngle = 0, this.ascender = Math.round(this.ascender * this.scaleFactor), this.decender = Math.round(this.decender * this.scaleFactor), this.lineGap = Math.round(this.lineGap * this.scaleFactor), this.capHeight = this.os2.exists && this.os2.capHeight || this.ascender, this.xHeight = this.os2.exists && this.os2.xHeight || 0, this.familyClass = (this.os2.exists && this.os2.familyClass || 0) >> 8, this.isSerif = 1 === (i = this.familyClass) || 2 === i || 3 === i || 4 === i || 5 === i || 7 === i, this.isScript = 10 === this.familyClass, this.flags = 0, this.post.isFixedPitch && (this.flags |= 1), this.isSerif && (this.flags |= 2), this.isScript && (this.flags |= 8), 0 !== this.italicAngle && (this.flags |= 64), this.flags |= 32, !this.cmap.unicode) throw new Error("No unicode cmap for font");
  }, t.prototype.characterToGlyph = function (t) {
    var e;
    return (null != (e = this.cmap.unicode) ? e.codeMap[t] : void 0) || 0;
  }, t.prototype.widthOfGlyph = function (t) {
    var e;
    return e = 1e3 / this.head.unitsPerEm, this.hmtx.forGlyph(t).advance * e;
  }, t.prototype.widthOfString = function (t, e, n) {
    var r, i, a, o;

    for (a = 0, i = 0, o = (t = "" + t).length; 0 <= o ? i < o : i > o; i = 0 <= o ? ++i : --i) r = t.charCodeAt(i), a += this.widthOfGlyph(this.characterToGlyph(r)) + n * (1e3 / e) || 0;

    return a * (e / 1e3);
  }, t.prototype.lineHeight = function (t, e) {
    var n;
    return null == e && (e = !1), n = e ? this.lineGap : 0, (this.ascender + n - this.decender) / 1e3 * t;
  }, t;
}();

var qt,
    Rt = function () {
  function t(t) {
    this.data = null != t ? t : [], this.pos = 0, this.length = this.data.length;
  }

  return t.prototype.readByte = function () {
    return this.data[this.pos++];
  }, t.prototype.writeByte = function (t) {
    return this.data[this.pos++] = t;
  }, t.prototype.readUInt32 = function () {
    return 16777216 * this.readByte() + (this.readByte() << 16) + (this.readByte() << 8) + this.readByte();
  }, t.prototype.writeUInt32 = function (t) {
    return this.writeByte(t >>> 24 & 255), this.writeByte(t >> 16 & 255), this.writeByte(t >> 8 & 255), this.writeByte(255 & t);
  }, t.prototype.readInt32 = function () {
    var t;
    return (t = this.readUInt32()) >= 2147483648 ? t - 4294967296 : t;
  }, t.prototype.writeInt32 = function (t) {
    return t < 0 && (t += 4294967296), this.writeUInt32(t);
  }, t.prototype.readUInt16 = function () {
    return this.readByte() << 8 | this.readByte();
  }, t.prototype.writeUInt16 = function (t) {
    return this.writeByte(t >> 8 & 255), this.writeByte(255 & t);
  }, t.prototype.readInt16 = function () {
    var t;
    return (t = this.readUInt16()) >= 32768 ? t - 65536 : t;
  }, t.prototype.writeInt16 = function (t) {
    return t < 0 && (t += 65536), this.writeUInt16(t);
  }, t.prototype.readString = function (t) {
    var e, n;

    for (n = [], e = 0; 0 <= t ? e < t : e > t; e = 0 <= t ? ++e : --e) n[e] = String.fromCharCode(this.readByte());

    return n.join("");
  }, t.prototype.writeString = function (t) {
    var e, n, r;

    for (r = [], e = 0, n = t.length; 0 <= n ? e < n : e > n; e = 0 <= n ? ++e : --e) r.push(this.writeByte(t.charCodeAt(e)));

    return r;
  }, t.prototype.readShort = function () {
    return this.readInt16();
  }, t.prototype.writeShort = function (t) {
    return this.writeInt16(t);
  }, t.prototype.readLongLong = function () {
    var t, e, n, r, i, a, o, s;
    return t = this.readByte(), e = this.readByte(), n = this.readByte(), r = this.readByte(), i = this.readByte(), a = this.readByte(), o = this.readByte(), s = this.readByte(), 128 & t ? -1 * (72057594037927940 * (255 ^ t) + 281474976710656 * (255 ^ e) + 1099511627776 * (255 ^ n) + 4294967296 * (255 ^ r) + 16777216 * (255 ^ i) + 65536 * (255 ^ a) + 256 * (255 ^ o) + (255 ^ s) + 1) : 72057594037927940 * t + 281474976710656 * e + 1099511627776 * n + 4294967296 * r + 16777216 * i + 65536 * a + 256 * o + s;
  }, t.prototype.writeLongLong = function (t) {
    var e, n;
    return e = Math.floor(t / 4294967296), n = 4294967295 & t, this.writeByte(e >> 24 & 255), this.writeByte(e >> 16 & 255), this.writeByte(e >> 8 & 255), this.writeByte(255 & e), this.writeByte(n >> 24 & 255), this.writeByte(n >> 16 & 255), this.writeByte(n >> 8 & 255), this.writeByte(255 & n);
  }, t.prototype.readInt = function () {
    return this.readInt32();
  }, t.prototype.writeInt = function (t) {
    return this.writeInt32(t);
  }, t.prototype.read = function (t) {
    var e, n;

    for (e = [], n = 0; 0 <= t ? n < t : n > t; n = 0 <= t ? ++n : --n) e.push(this.readByte());

    return e;
  }, t.prototype.write = function (t) {
    var e, n, r, i;

    for (i = [], n = 0, r = t.length; n < r; n++) e = t[n], i.push(this.writeByte(e));

    return i;
  }, t;
}(),
    Tt = function () {
  var t;

  function e(t) {
    var e, n, r;

    for (this.scalarType = t.readInt(), this.tableCount = t.readShort(), this.searchRange = t.readShort(), this.entrySelector = t.readShort(), this.rangeShift = t.readShort(), this.tables = {}, n = 0, r = this.tableCount; 0 <= r ? n < r : n > r; n = 0 <= r ? ++n : --n) e = {
      tag: t.readString(4),
      checksum: t.readInt(),
      offset: t.readInt(),
      length: t.readInt()
    }, this.tables[e.tag] = e;
  }

  return e.prototype.encode = function (e) {
    var n, r, i, a, o, s, u, c, h, l, f, d, p;

    for (p in f = Object.keys(e).length, s = Math.log(2), h = 16 * Math.floor(Math.log(f) / s), a = Math.floor(h / s), c = 16 * f - h, (r = new Rt()).writeInt(this.scalarType), r.writeShort(f), r.writeShort(h), r.writeShort(a), r.writeShort(c), i = 16 * f, u = r.pos + i, o = null, d = [], e) for (l = e[p], r.writeString(p), r.writeInt(t(l)), r.writeInt(u), r.writeInt(l.length), d = d.concat(l), "head" === p && (o = u), u += l.length; u % 4;) d.push(0), u++;

    return r.write(d), n = 2981146554 - t(r.data), r.pos = o + 8, r.writeUInt32(n), r.data;
  }, t = function (t) {
    var e, n, r, i;

    for (t = $t.call(t); t.length % 4;) t.push(0);

    for (r = new Rt(t), n = 0, e = 0, i = t.length; e < i; e = e += 4) n += r.readUInt32();

    return 4294967295 & n;
  }, e;
}(),
    Dt = {}.hasOwnProperty,
    Ut = function (t, e) {
  for (var n in e) Dt.call(e, n) && (t[n] = e[n]);

  function r() {
    this.constructor = t;
  }

  return r.prototype = e.prototype, t.prototype = new r(), t.__super__ = e.prototype, t;
};

qt = function () {
  function t(t) {
    var e;
    this.file = t, e = this.file.directory.tables[this.tag], this.exists = !!e, e && (this.offset = e.offset, this.length = e.length, this.parse(this.file.contents));
  }

  return t.prototype.parse = function () {}, t.prototype.encode = function () {}, t.prototype.raw = function () {
    return this.exists ? (this.file.contents.pos = this.offset, this.file.contents.read(this.length)) : null;
  }, t;
}();

var zt = function (t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }

  return Ut(e, qt), e.prototype.tag = "head", e.prototype.parse = function (t) {
    return t.pos = this.offset, this.version = t.readInt(), this.revision = t.readInt(), this.checkSumAdjustment = t.readInt(), this.magicNumber = t.readInt(), this.flags = t.readShort(), this.unitsPerEm = t.readShort(), this.created = t.readLongLong(), this.modified = t.readLongLong(), this.xMin = t.readShort(), this.yMin = t.readShort(), this.xMax = t.readShort(), this.yMax = t.readShort(), this.macStyle = t.readShort(), this.lowestRecPPEM = t.readShort(), this.fontDirectionHint = t.readShort(), this.indexToLocFormat = t.readShort(), this.glyphDataFormat = t.readShort();
  }, e.prototype.encode = function (t) {
    var e;
    return (e = new Rt()).writeInt(this.version), e.writeInt(this.revision), e.writeInt(this.checkSumAdjustment), e.writeInt(this.magicNumber), e.writeShort(this.flags), e.writeShort(this.unitsPerEm), e.writeLongLong(this.created), e.writeLongLong(this.modified), e.writeShort(this.xMin), e.writeShort(this.yMin), e.writeShort(this.xMax), e.writeShort(this.yMax), e.writeShort(this.macStyle), e.writeShort(this.lowestRecPPEM), e.writeShort(this.fontDirectionHint), e.writeShort(t), e.writeShort(this.glyphDataFormat), e.data;
  }, e;
}(),
    Ht = function () {
  function t(t, e) {
    var n, r, i, a, o, s, u, c, h, l, f, d, p, g, m, v, b;

    switch (this.platformID = t.readUInt16(), this.encodingID = t.readShort(), this.offset = e + t.readInt(), h = t.pos, t.pos = this.offset, this.format = t.readUInt16(), this.length = t.readUInt16(), this.language = t.readUInt16(), this.isUnicode = 3 === this.platformID && 1 === this.encodingID && 4 === this.format || 0 === this.platformID && 4 === this.format, this.codeMap = {}, this.format) {
      case 0:
        for (s = 0; s < 256; ++s) this.codeMap[s] = t.readByte();

        break;

      case 4:
        for (f = t.readUInt16(), l = f / 2, t.pos += 6, i = function () {
          var e, n;

          for (n = [], s = e = 0; 0 <= l ? e < l : e > l; s = 0 <= l ? ++e : --e) n.push(t.readUInt16());

          return n;
        }(), t.pos += 2, p = function () {
          var e, n;

          for (n = [], s = e = 0; 0 <= l ? e < l : e > l; s = 0 <= l ? ++e : --e) n.push(t.readUInt16());

          return n;
        }(), u = function () {
          var e, n;

          for (n = [], s = e = 0; 0 <= l ? e < l : e > l; s = 0 <= l ? ++e : --e) n.push(t.readUInt16());

          return n;
        }(), c = function () {
          var e, n;

          for (n = [], s = e = 0; 0 <= l ? e < l : e > l; s = 0 <= l ? ++e : --e) n.push(t.readUInt16());

          return n;
        }(), r = (this.length - t.pos + this.offset) / 2, o = function () {
          var e, n;

          for (n = [], s = e = 0; 0 <= r ? e < r : e > r; s = 0 <= r ? ++e : --e) n.push(t.readUInt16());

          return n;
        }(), s = m = 0, b = i.length; m < b; s = ++m) for (g = i[s], n = v = d = p[s]; d <= g ? v <= g : v >= g; n = d <= g ? ++v : --v) 0 === c[s] ? a = n + u[s] : 0 !== (a = o[c[s] / 2 + (n - d) - (l - s)] || 0) && (a += u[s]), this.codeMap[n] = 65535 & a;

    }

    t.pos = h;
  }

  return t.encode = function (t, e) {
    var n, r, i, a, o, s, u, c, h, l, f, d, p, g, m, v, b, y, w, N, L, x, A, _, S, P, k, F, I, C, j, B, O, M, E, q, R, T, D, U, z, H, W, V, G, Y;

    switch (F = new Rt(), a = Object.keys(t).sort(function (t, e) {
      return t - e;
    }), e) {
      case "macroman":
        for (p = 0, g = function () {
          var t = [];

          for (d = 0; d < 256; ++d) t.push(0);

          return t;
        }(), v = {
          0: 0
        }, i = {}, I = 0, O = a.length; I < O; I++) null == v[W = t[r = a[I]]] && (v[W] = ++p), i[r] = {
          old: t[r],
          new: v[t[r]]
        }, g[r] = v[t[r]];

        return F.writeUInt16(1), F.writeUInt16(0), F.writeUInt32(12), F.writeUInt16(0), F.writeUInt16(262), F.writeUInt16(0), F.write(g), {
          charMap: i,
          subtable: F.data,
          maxGlyphID: p + 1
        };

      case "unicode":
        for (P = [], h = [], b = 0, v = {}, n = {}, m = u = null, C = 0, M = a.length; C < M; C++) null == v[w = t[r = a[C]]] && (v[w] = ++b), n[r] = {
          old: w,
          new: v[w]
        }, o = v[w] - r, null != m && o === u || (m && h.push(m), P.push(r), u = o), m = r;

        for (m && h.push(m), h.push(65535), P.push(65535), _ = 2 * (A = P.length), x = 2 * Math.pow(Math.log(A) / Math.LN2, 2), l = Math.log(x / 2) / Math.LN2, L = 2 * A - x, s = [], N = [], f = [], d = j = 0, E = P.length; j < E; d = ++j) {
          if (S = P[d], c = h[d], 65535 === S) {
            s.push(0), N.push(0);
            break;
          }

          if (S - (k = n[S].new) >= 32768) for (s.push(0), N.push(2 * (f.length + A - d)), r = B = S; S <= c ? B <= c : B >= c; r = S <= c ? ++B : --B) f.push(n[r].new);else s.push(k - S), N.push(0);
        }

        for (F.writeUInt16(3), F.writeUInt16(1), F.writeUInt32(12), F.writeUInt16(4), F.writeUInt16(16 + 8 * A + 2 * f.length), F.writeUInt16(0), F.writeUInt16(_), F.writeUInt16(x), F.writeUInt16(l), F.writeUInt16(L), z = 0, q = h.length; z < q; z++) r = h[z], F.writeUInt16(r);

        for (F.writeUInt16(0), H = 0, R = P.length; H < R; H++) r = P[H], F.writeUInt16(r);

        for (V = 0, T = s.length; V < T; V++) o = s[V], F.writeUInt16(o);

        for (G = 0, D = N.length; G < D; G++) y = N[G], F.writeUInt16(y);

        for (Y = 0, U = f.length; Y < U; Y++) p = f[Y], F.writeUInt16(p);

        return {
          charMap: n,
          subtable: F.data,
          maxGlyphID: b + 1
        };
    }
  }, t;
}(),
    Wt = function (t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }

  return Ut(e, qt), e.prototype.tag = "cmap", e.prototype.parse = function (t) {
    var e, n, r;

    for (t.pos = this.offset, this.version = t.readUInt16(), r = t.readUInt16(), this.tables = [], this.unicode = null, n = 0; 0 <= r ? n < r : n > r; n = 0 <= r ? ++n : --n) e = new Ht(t, this.offset), this.tables.push(e), e.isUnicode && null == this.unicode && (this.unicode = e);

    return !0;
  }, e.encode = function (t, e) {
    var n, r;
    return null == e && (e = "macroman"), n = Ht.encode(t, e), (r = new Rt()).writeUInt16(0), r.writeUInt16(1), n.table = r.data.concat(n.subtable), n;
  }, e;
}(),
    Vt = function (t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }

  return Ut(e, qt), e.prototype.tag = "hhea", e.prototype.parse = function (t) {
    return t.pos = this.offset, this.version = t.readInt(), this.ascender = t.readShort(), this.decender = t.readShort(), this.lineGap = t.readShort(), this.advanceWidthMax = t.readShort(), this.minLeftSideBearing = t.readShort(), this.minRightSideBearing = t.readShort(), this.xMaxExtent = t.readShort(), this.caretSlopeRise = t.readShort(), this.caretSlopeRun = t.readShort(), this.caretOffset = t.readShort(), t.pos += 8, this.metricDataFormat = t.readShort(), this.numberOfMetrics = t.readUInt16();
  }, e;
}(),
    Gt = function (t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }

  return Ut(e, qt), e.prototype.tag = "OS/2", e.prototype.parse = function (t) {
    if (t.pos = this.offset, this.version = t.readUInt16(), this.averageCharWidth = t.readShort(), this.weightClass = t.readUInt16(), this.widthClass = t.readUInt16(), this.type = t.readShort(), this.ySubscriptXSize = t.readShort(), this.ySubscriptYSize = t.readShort(), this.ySubscriptXOffset = t.readShort(), this.ySubscriptYOffset = t.readShort(), this.ySuperscriptXSize = t.readShort(), this.ySuperscriptYSize = t.readShort(), this.ySuperscriptXOffset = t.readShort(), this.ySuperscriptYOffset = t.readShort(), this.yStrikeoutSize = t.readShort(), this.yStrikeoutPosition = t.readShort(), this.familyClass = t.readShort(), this.panose = function () {
      var e, n;

      for (n = [], e = 0; e < 10; ++e) n.push(t.readByte());

      return n;
    }(), this.charRange = function () {
      var e, n;

      for (n = [], e = 0; e < 4; ++e) n.push(t.readInt());

      return n;
    }(), this.vendorID = t.readString(4), this.selection = t.readShort(), this.firstCharIndex = t.readShort(), this.lastCharIndex = t.readShort(), this.version > 0 && (this.ascent = t.readShort(), this.descent = t.readShort(), this.lineGap = t.readShort(), this.winAscent = t.readShort(), this.winDescent = t.readShort(), this.codePageRange = function () {
      var e, n;

      for (n = [], e = 0; e < 2; e = ++e) n.push(t.readInt());

      return n;
    }(), this.version > 1)) return this.xHeight = t.readShort(), this.capHeight = t.readShort(), this.defaultChar = t.readShort(), this.breakChar = t.readShort(), this.maxContext = t.readShort();
  }, e;
}(),
    Yt = function (t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }

  return Ut(e, qt), e.prototype.tag = "post", e.prototype.parse = function (t) {
    var e, n, r;

    switch (t.pos = this.offset, this.format = t.readInt(), this.italicAngle = t.readInt(), this.underlinePosition = t.readShort(), this.underlineThickness = t.readShort(), this.isFixedPitch = t.readInt(), this.minMemType42 = t.readInt(), this.maxMemType42 = t.readInt(), this.minMemType1 = t.readInt(), this.maxMemType1 = t.readInt(), this.format) {
      case 65536:
        break;

      case 131072:
        var i;

        for (n = t.readUInt16(), this.glyphNameIndex = [], i = 0; 0 <= n ? i < n : i > n; i = 0 <= n ? ++i : --i) this.glyphNameIndex.push(t.readUInt16());

        for (this.names = [], r = []; t.pos < this.offset + this.length;) e = t.readByte(), r.push(this.names.push(t.readString(e)));

        return r;

      case 151552:
        return n = t.readUInt16(), this.offsets = t.read(n);

      case 196608:
        break;

      case 262144:
        return this.map = function () {
          var e, n, r;

          for (r = [], i = e = 0, n = this.file.maxp.numGlyphs; 0 <= n ? e < n : e > n; i = 0 <= n ? ++e : --e) r.push(t.readUInt32());

          return r;
        }.call(this);
    }
  }, e;
}(),
    Jt = function (t, e) {
  this.raw = t, this.length = t.length, this.platformID = e.platformID, this.encodingID = e.encodingID, this.languageID = e.languageID;
},
    Xt = function (t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }

  return Ut(e, qt), e.prototype.tag = "name", e.prototype.parse = function (t) {
    var e, n, r, i, a, o, s, u, c, h, l;

    for (t.pos = this.offset, t.readShort(), e = t.readShort(), o = t.readShort(), n = [], i = 0; 0 <= e ? i < e : i > e; i = 0 <= e ? ++i : --i) n.push({
      platformID: t.readShort(),
      encodingID: t.readShort(),
      languageID: t.readShort(),
      nameID: t.readShort(),
      length: t.readShort(),
      offset: this.offset + o + t.readShort()
    });

    for (s = {}, i = c = 0, h = n.length; c < h; i = ++c) r = n[i], t.pos = r.offset, u = t.readString(r.length), a = new Jt(u, r), null == s[l = r.nameID] && (s[l] = []), s[r.nameID].push(a);

    this.strings = s, this.copyright = s[0], this.fontFamily = s[1], this.fontSubfamily = s[2], this.uniqueSubfamily = s[3], this.fontName = s[4], this.version = s[5];

    try {
      this.postscriptName = s[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
    } catch (t) {
      this.postscriptName = s[4][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
    }

    return this.trademark = s[7], this.manufacturer = s[8], this.designer = s[9], this.description = s[10], this.vendorUrl = s[11], this.designerUrl = s[12], this.license = s[13], this.licenseUrl = s[14], this.preferredFamily = s[15], this.preferredSubfamily = s[17], this.compatibleFull = s[18], this.sampleText = s[19];
  }, e;
}(),
    Kt = function (t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }

  return Ut(e, qt), e.prototype.tag = "maxp", e.prototype.parse = function (t) {
    return t.pos = this.offset, this.version = t.readInt(), this.numGlyphs = t.readUInt16(), this.maxPoints = t.readUInt16(), this.maxContours = t.readUInt16(), this.maxCompositePoints = t.readUInt16(), this.maxComponentContours = t.readUInt16(), this.maxZones = t.readUInt16(), this.maxTwilightPoints = t.readUInt16(), this.maxStorage = t.readUInt16(), this.maxFunctionDefs = t.readUInt16(), this.maxInstructionDefs = t.readUInt16(), this.maxStackElements = t.readUInt16(), this.maxSizeOfInstructions = t.readUInt16(), this.maxComponentElements = t.readUInt16(), this.maxComponentDepth = t.readUInt16();
  }, e;
}(),
    Zt = function (t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }

  return Ut(e, qt), e.prototype.tag = "hmtx", e.prototype.parse = function (t) {
    var e, n, r, i, a, o, s;

    for (t.pos = this.offset, this.metrics = [], e = 0, o = this.file.hhea.numberOfMetrics; 0 <= o ? e < o : e > o; e = 0 <= o ? ++e : --e) this.metrics.push({
      advance: t.readUInt16(),
      lsb: t.readInt16()
    });

    for (r = this.file.maxp.numGlyphs - this.file.hhea.numberOfMetrics, this.leftSideBearings = function () {
      var n, i;

      for (i = [], e = n = 0; 0 <= r ? n < r : n > r; e = 0 <= r ? ++n : --n) i.push(t.readInt16());

      return i;
    }(), this.widths = function () {
      var t, e, n, r;

      for (r = [], t = 0, e = (n = this.metrics).length; t < e; t++) i = n[t], r.push(i.advance);

      return r;
    }.call(this), n = this.widths[this.widths.length - 1], s = [], e = a = 0; 0 <= r ? a < r : a > r; e = 0 <= r ? ++a : --a) s.push(this.widths.push(n));

    return s;
  }, e.prototype.forGlyph = function (t) {
    return t in this.metrics ? this.metrics[t] : {
      advance: this.metrics[this.metrics.length - 1].advance,
      lsb: this.leftSideBearings[t - this.metrics.length]
    };
  }, e;
}(),
    $t = [].slice,
    Qt = function (t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }

  return Ut(e, qt), e.prototype.tag = "glyf", e.prototype.parse = function () {
    return this.cache = {};
  }, e.prototype.glyphFor = function (t) {
    var e, n, r, i, a, o, s, u, c, h;
    return t in this.cache ? this.cache[t] : (i = this.file.loca, e = this.file.contents, n = i.indexOf(t), 0 === (r = i.lengthOf(t)) ? this.cache[t] = null : (e.pos = this.offset + n, a = (o = new Rt(e.read(r))).readShort(), u = o.readShort(), h = o.readShort(), s = o.readShort(), c = o.readShort(), this.cache[t] = -1 === a ? new ee(o, u, h, s, c) : new te(o, a, u, h, s, c), this.cache[t]));
  }, e.prototype.encode = function (t, e, n) {
    var r, i, a, o, s;

    for (a = [], i = [], o = 0, s = e.length; o < s; o++) r = t[e[o]], i.push(a.length), r && (a = a.concat(r.encode(n)));

    return i.push(a.length), {
      table: a,
      offsets: i
    };
  }, e;
}(),
    te = function () {
  function t(t, e, n, r, i, a) {
    this.raw = t, this.numberOfContours = e, this.xMin = n, this.yMin = r, this.xMax = i, this.yMax = a, this.compound = !1;
  }

  return t.prototype.encode = function () {
    return this.raw.data;
  }, t;
}(),
    ee = function () {
  function t(t, e, n, r, i) {
    var a, o;

    for (this.raw = t, this.xMin = e, this.yMin = n, this.xMax = r, this.yMax = i, this.compound = !0, this.glyphIDs = [], this.glyphOffsets = [], a = this.raw; o = a.readShort(), this.glyphOffsets.push(a.pos), this.glyphIDs.push(a.readUInt16()), 32 & o;) a.pos += 1 & o ? 4 : 2, 128 & o ? a.pos += 8 : 64 & o ? a.pos += 4 : 8 & o && (a.pos += 2);
  }

  return 1, 8, 32, 64, 128, t.prototype.encode = function () {
    var t, e, n;

    for (e = new Rt($t.call(this.raw.data)), t = 0, n = this.glyphIDs.length; t < n; ++t) e.pos = this.glyphOffsets[t];

    return e.data;
  }, t;
}(),
    ne = function (t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }

  return Ut(e, qt), e.prototype.tag = "loca", e.prototype.parse = function (t) {
    var e, n;
    return t.pos = this.offset, e = this.file.head.indexToLocFormat, this.offsets = 0 === e ? function () {
      var e, r;

      for (r = [], n = 0, e = this.length; n < e; n += 2) r.push(2 * t.readUInt16());

      return r;
    }.call(this) : function () {
      var e, r;

      for (r = [], n = 0, e = this.length; n < e; n += 4) r.push(t.readUInt32());

      return r;
    }.call(this);
  }, e.prototype.indexOf = function (t) {
    return this.offsets[t];
  }, e.prototype.lengthOf = function (t) {
    return this.offsets[t + 1] - this.offsets[t];
  }, e.prototype.encode = function (t, e) {
    for (var n = new Uint32Array(this.offsets.length), r = 0, i = 0, a = 0; a < n.length; ++a) if (n[a] = r, i < e.length && e[i] == a) {
      ++i, n[a] = r;
      var o = this.offsets[a],
          s = this.offsets[a + 1] - o;
      s > 0 && (r += s);
    }

    for (var u = new Array(4 * n.length), c = 0; c < n.length; ++c) u[4 * c + 3] = 255 & n[c], u[4 * c + 2] = (65280 & n[c]) >> 8, u[4 * c + 1] = (16711680 & n[c]) >> 16, u[4 * c] = (4278190080 & n[c]) >> 24;

    return u;
  }, e;
}(),
    re = function () {
  function t(t) {
    this.font = t, this.subset = {}, this.unicodes = {}, this.next = 33;
  }

  return t.prototype.generateCmap = function () {
    var t, e, n, r, i;

    for (e in r = this.font.cmap.tables[0].codeMap, t = {}, i = this.subset) n = i[e], t[e] = r[n];

    return t;
  }, t.prototype.glyphsFor = function (t) {
    var e, n, r, i, a, o, s;

    for (r = {}, a = 0, o = t.length; a < o; a++) r[i = t[a]] = this.font.glyf.glyphFor(i);

    for (i in e = [], r) (null != (n = r[i]) ? n.compound : void 0) && e.push.apply(e, n.glyphIDs);

    if (e.length > 0) for (i in s = this.glyphsFor(e)) n = s[i], r[i] = n;
    return r;
  }, t.prototype.encode = function (t, e) {
    var n, r, i, a, o, s, u, c, h, l, f, d, p, g, m;

    for (r in n = Wt.encode(this.generateCmap(), "unicode"), a = this.glyphsFor(t), f = {
      0: 0
    }, m = n.charMap) f[(s = m[r]).old] = s.new;

    for (d in l = n.maxGlyphID, a) d in f || (f[d] = l++);

    return c = function (t) {
      var e, n;

      for (e in n = {}, t) n[t[e]] = e;

      return n;
    }(f), h = Object.keys(c).sort(function (t, e) {
      return t - e;
    }), p = function () {
      var t, e, n;

      for (n = [], t = 0, e = h.length; t < e; t++) o = h[t], n.push(c[o]);

      return n;
    }(), i = this.font.glyf.encode(a, p, f), u = this.font.loca.encode(i.offsets, p), g = {
      cmap: this.font.cmap.raw(),
      glyf: i.table,
      loca: u,
      hmtx: this.font.hmtx.raw(),
      hhea: this.font.hhea.raw(),
      maxp: this.font.maxp.raw(),
      post: this.font.post.raw(),
      name: this.font.name.raw(),
      head: this.font.head.encode(e)
    }, this.font.os2.exists && (g["OS/2"] = this.font.os2.raw()), this.font.directory.encode(g);
  }, t;
}();

g.API.PDFObject = function () {
  var t;

  function e() {}

  return t = function (t, e) {
    return (Array(e + 1).join("0") + t).slice(-e);
  }, e.convert = function (n) {
    var r, i, a, o;
    if (Array.isArray(n)) return "[" + function () {
      var t, i, a;

      for (a = [], t = 0, i = n.length; t < i; t++) r = n[t], a.push(e.convert(r));

      return a;
    }().join(" ") + "]";
    if ("string" == typeof n) return "/" + n;
    if (null != n ? n.isString : void 0) return "(" + n + ")";
    if (n instanceof Date) return "(D:" + t(n.getUTCFullYear(), 4) + t(n.getUTCMonth(), 2) + t(n.getUTCDate(), 2) + t(n.getUTCHours(), 2) + t(n.getUTCMinutes(), 2) + t(n.getUTCSeconds(), 2) + "Z)";

    if ("[object Object]" === {}.toString.call(n)) {
      for (i in a = ["<<"], n) o = n[i], a.push("/" + i + " " + e.convert(o));

      return a.push(">>"), a.join("\n");
    }

    return "" + n;
  }, e;
}(),
/**
 * @license
 * Copyright (c) 2012 chick307 <chick307@gmail.com>
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function (t, e) {
  t.API.adler32cs = function () {
    var t = "function" == typeof ArrayBuffer && "function" == typeof Uint8Array,
        e = null,
        n = function () {
      if (!t) return function () {
        return !1;
      };

      try {
        var n = {};
        "function" == typeof n.Buffer && (e = n.Buffer);
      } catch (t) {}

      return function (t) {
        return t instanceof ArrayBuffer || null !== e && t instanceof e;
      };
    }(),
        r = null !== e ? function (t) {
      return new e(t, "utf8").toString("binary");
    } : function (t) {
      return unescape(encodeURIComponent(t));
    },
        i = function (t, e) {
      for (var n = 65535 & t, r = t >>> 16, i = 0, a = e.length; i < a; i++) r = (r + (n = (n + (255 & e.charCodeAt(i))) % 65521)) % 65521;

      return (r << 16 | n) >>> 0;
    },
        a = function (t, e) {
      for (var n = 65535 & t, r = t >>> 16, i = 0, a = e.length; i < a; i++) r = (r + (n = (n + e[i]) % 65521)) % 65521;

      return (r << 16 | n) >>> 0;
    },
        o = {},
        s = o.Adler32 = (l = function (t) {
      if (!(this instanceof l)) throw new TypeError("Constructor cannot called be as a function.");
      if (!isFinite(t = null === t ? 1 : +t)) throw new Error("First arguments needs to be a finite number.");
      this.checksum = t >>> 0;
    }, f = l.prototype = {}, f.constructor = l, l.from = ((u = function (t) {
      if (!(this instanceof l)) throw new TypeError("Constructor cannot called be as a function.");
      if (null === t) throw new Error("First argument needs to be a string.");
      this.checksum = i(1, t.toString());
    }).prototype = f, u), l.fromUtf8 = ((c = function (t) {
      if (!(this instanceof l)) throw new TypeError("Constructor cannot called be as a function.");
      if (null === t) throw new Error("First argument needs to be a string.");
      var e = r(t.toString());
      this.checksum = i(1, e);
    }).prototype = f, c), t && (l.fromBuffer = ((h = function (t) {
      if (!(this instanceof l)) throw new TypeError("Constructor cannot called be as a function.");
      if (!n(t)) throw new Error("First argument needs to be ArrayBuffer.");
      var e = new Uint8Array(t);
      return this.checksum = a(1, e);
    }).prototype = f, h)), f.update = function (t) {
      if (null === t) throw new Error("First argument needs to be a string.");
      return t = t.toString(), this.checksum = i(this.checksum, t);
    }, f.updateUtf8 = function (t) {
      if (null === t) throw new Error("First argument needs to be a string.");
      var e = r(t.toString());
      return this.checksum = i(this.checksum, e);
    }, t && (f.updateBuffer = function (t) {
      if (!n(t)) throw new Error("First argument needs to be ArrayBuffer.");
      var e = new Uint8Array(t);
      return this.checksum = a(this.checksum, e);
    }), f.clone = function () {
      return new s(this.checksum);
    }, l);

    var u, c, h, l, f;
    o.from = function (t) {
      if (null === t) throw new Error("First argument needs to be a string.");
      return i(1, t.toString());
    }, o.fromUtf8 = function (t) {
      if (null === t) throw new Error("First argument needs to be a string.");
      var e = r(t.toString());
      return i(1, e);
    }, t && (o.fromBuffer = function (t) {
      if (!n(t)) throw new Error("First argument need to be ArrayBuffer.");
      var e = new Uint8Array(t);
      return a(1, e);
    });
    return o;
  }();
}(g);
var _default = g;
exports.default = _default;
},{"_bundle_loader":"../node_modules/parcel/src/builtins/bundle-loader.js","html2canvas":[["html2canvas.f0b08142.js","../node_modules/html2canvas/dist/html2canvas.js"],"html2canvas.f0b08142.js.map","../node_modules/html2canvas/dist/html2canvas.js"],"dompurify":[["purify.76297b50.js","../node_modules/dompurify/dist/purify.js"],"purify.76297b50.js.map","../node_modules/dompurify/dist/purify.js"],"canvg":[["index.es.f2fba6b6.js","../node_modules/canvg/lib/index.es.js"],"index.es.f2fba6b6.js.map","../node_modules/canvg/lib/index.es.js"]}],"../src/Roboto-Regular-normal.js":[function(require,module,exports) {
"use strict";

var _jspdf = require("jspdf");

var font = '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MDH//wANAAAEHAYeAiYB0wAAAQYAnj0eABQAsABFWLAILxuxCBw+WbENBPQwMf//AA0AAAQcBeMCJgHTAAABBgBqbR4AFwCwAEVYsAgvG7EIHD5ZsRAC9LAZ0DAxAP//AEcAAAPgBh4CJgHSAAABBwB1ATMAHgAUALAARViwCC8bsQgcPlmxDAb0MDH//wBHAAAD4AXgAiYB0gAAAQcAogEaAB4AFACwAEVYsAcvG7EHHD5ZsREC9DAx//8ARwAAA+AGHgImAdIAAAEGAJ9SHwAUALAARViwBy8bsQccPlmxDwb0MDH//wAcAAAFHQY/AiYAJQAAAAYArgQA////KQAABEYGPwImACkAAAAHAK7+cgAA////NwAABQgGQQImACwAAAAHAK7+gAAC////PQAAAXcGQAImAC0AAAAHAK7+hgAB////5v/sBR0GPwAmADMUAAAHAK7/LwAA////FAAABR8GPwAmAD1kAAAHAK7+XQAA////6QAABN8GPwAmALoUAAAHAK7/MgAA////m//0Aq0GdAImAMMAAAEHAK//Kv/sAB0AsABFWLAMLxuxDBo+WbEYAfSwD9CwGBCwIdAwMQD//wAcAAAFHQWwAgYAJQAA//8AqQAABIgFsAIGACYAAP//AKkAAARGBbACBgApAAD//wBWAAAEegWwAgYAPgAA//8AqQAABQgFsAIGACwAAP//ALcAAAF3BbACBgAtAAD//wCpAAAFBQWwAgYALwAA//8AqQAABlIFsAIGADEAAP//AKkAAAUIBbACBgAyAAD//wB2/+wFCQXEAgYAMwAA//8AqQAABMAFsAIGADQAAP//ADEAAASXBbACBgA4AAD//wAPAAAEuwWwAgYAPQAA//8AOQAABM4FsAIGADwAAP///9UAAAJeBwcCJgAtAAABBwBq/3ABQgAXALAARViwAi8bsQIePlmxCwT0sBTQMDEA//8ADwAABLsG+wImAD0AAAEHAGoAwgE2ABcAsABFWLAILxuxCB4+WbEQBPSwGdAwMQD//wBk/+sEdwY6AiYAuwAAAQcArgF1//sAFACwAEVYsBMvG7ETGj5ZsSQB9DAx//8AY//sA+wGOQImAL8AAAEHAK4BK//6ABQAsABFWLAVLxuxFRo+WbEoAfQwMf//AJH+YQPwBjoCJgDBAAABBwCuAUb/+wAUALAARViw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BkkAWwOTAJMDwQBmBG4AfwZKAFoDqgCOAv0AggRGAGEC7wBCAu8APgKCAHsEiACaA+kAQwIWAJMB+wB0Au8AegOjAHoDwABmBdwAVQY1AFAGOQBvA8kARAd6//IERABZBYAAdgS6AKYEwgCLBsEATgSwAH4EkQBHBIgAWwScAJUExwBfBZoAHQH6AJsEcwCaBE8AIgIpACIFiwCiBIgAkQehAGgHRABhAfwAoAWHAF0Cuf/kBX4AZQSSAFsFkACMBPMAiAID/7QENwBiA8QAqQONAI0DqwCOA2oAgQHxAI0CrQB5AioAMgPGAHsC/ABeAloAfgAA/KcAAP1vAAD8iwAA/V4AAPwnAAD9OAINALcECwBxAhcAkwRzALEFpAAfBXEAZwU+ADIEkQB4BbUAsgSRAEUFuwBNBYkAWgVSAHEEhQBkBL0AoAQCAC4EiABgBFAAYwQlAG0EiACRBI4AegKXAMMEbgAlA+wAZQTEACkEiACRBE0AZQSIAGAELABRBF0AjwWjAFcFmgBfBpcAegShAHkEQv/aBkgASgX/ACoFZAB7CJEAMQikALEGggA+BbQAsAULAKIGBAAyB0MAGwS/AFAFtACxBakALwUHAE0GLABTBdkArwV6AJYHhwCwB8AAsAYSABAG6wCyBQUAowVkAJMHJwC3BRgAWQRsAGEEkgCdA1sAmgTUAC4GIAAVBBAAWASeAJwEUgCcBKAALAXvAJ0EnQCcBJ4AnAPYACgFzQBkBL0AnARZAGcGeACcBp4AkQT3AB4GNgCdBFgAnQRNAGQGhwCdBGQALwRo/+gETQBnBskAJwbkAJwEif/9BJ4AnAcIAJwGKwCBBFb/3AcrALcF+ACZBNIAKARGAA8HCwDJBgsAvAbRAJMF4QCWCQQAtgfRAJsEIwBQA9sATAVxAGcEiwBbBQoAFgQDAC4FcQBnBIgAWwcBAJwGJAB+BwgAnAYrAIEFMgB1BEcAZAT9AHQAAPxnAAD8cQAA/WYAAP2kAAD6GwAA+iwGCQCxBO0AnARW/9wFGwCoBIkAjARjAKIDkACRBNsAsQQFAJEHogAbBmEAFQWaALIEuACcBQkAowR+AJoGjABEBYMAPgX/AKkE2QCcB88AqAW0AJEIMQCwBvQAkQXuAHEE0wBtBRgAOQQqACkHLAA0BVwAHwW8AJYElgBnBW8AlgRqAIMFbwCJBi8APwS9/94FCQCjBFoAmgX+AC8E7wAsBbIAsQSIAJEGEgCpBOwAnAdPAKkGPgCdBYcAXQSoAGgEqABpBLcAOgOrADsFLgA5BEAAKQT2AFcGlABZBuQAZAZWADYFKwAxBEkAUgQHAHkHwQBEBnUAPwf7AKkGoQCQBPYAdgQdAGUFrQAjBSAARgVkAJYGAgAvBPIALAMgAG8EFAAACCkAAAQUAAAIKQAAArkAAAIKAAABXAAABH8AAAIwAAABogAAAQAAAADRAAAAAAAAAjQAJQI0ACUFQACiBj8AkAOlAA0BmQBgAZkAMAGXACQBmQBPAtQAaALbADwCwQAkBGkARgSPAFcCsgCKA8QAlAVaAJQBfgBSB6oARAJmAGwCZgBZA6MAOwLvADYDYAB6BKYAWwZVAB8GkACnCHYAqAXrAB8GKwCMBH4AXwXaAB8EIgAqBHQAIAVIAF0FTwAfBecAegPOAGgIOgCiBQEAZwUXAJgGJgBUBtcAZAbPAGMGagBZBI8AagWOAKkErwBFBJIAqATFAD8IOgBiAgz/sASCAGUEZACYBBEAPgQvAIUECAArAkwAtQKPAG4CAwBcBPMAPARuAB8EiwA8BtQAPAbUADwE7gA8BpsAXwAAAAAIMwBbCDUAXALvAEIC7wB6Au8AUAQPAFUEDwBgBA8AQgQOAHIEDwCABA8AMAQPAE4EDwBOBA8AmAQPAGMEIwBHBCsADQRUACYGFQAxBGcAFAR8AHQEJgAoBCAAQwRKAIoEuwBZBFwAigS7AGAE4wCKBgIAigO0AIoEVACKA88AKwHoAJcE4wCKBKwAYwPLAIoEIABDBDMAMAOhAA0DrwCKBGcAFAS7AGAEZwAUA4kAPgTOAIoD7wA/BWcAYAUXAGAE8gB1BXIAJgR8AGAHQQAnB08AigV0ACgEzQCKBFkAigUkAC4GCwAfBD8ARwTsAIoETgCLBMEAJwQfACIFKACKBGoAPQZRAIoGrACKBR0ACAXxAIoETgCKBHsASwZ2AIoEhwBQBBEACwZHAB8EeQCLBQkAiwU3ACMFwgBgBF8ADQSoACYGYQAmBGoAPQRqAIoFwwACBMoAXgQ/AEcEuwBgBDMAMAPjAEIIIgCKBKsAKALvAD4C7wA2Au8AWwLvAFYC7wA6Au8ATwLvAEkDlgCPArUAngPmAIoEOgAeBMMAZAVMALEFJACyBBMAkgU9ALIEDwCSBIAAigR8AGAEUACKBIUAEwH9AJ8DpACBAAD8pAPvAG4D8/9eBA4AaQP0AGkDrwCKA58AgQOeAIEC7wBQAu8ANgLvAFsC7wBWAu8AOgLvAE8C7wBJBYEAfgWuAH4FkwCyBeAAfgXjAH4D1QCgBIIAgwRYAA8EzwA+BGsAZQQuAEoDpACDAZEAZwakAGAEuQCCAfz/tgR/ADsEfwBzBH8AIwR/AHcEfwB2BH8ANwR/AH4EfwBfBH8AcAR/APQCBv+0AgT/tAH7AJsB+//6AfsAmwRQAIoFAAB4BCAAOwR9AIwEMgBcBJMAWwSMAFsEngBaBI0AjAScAFsEPQBdBH0AYAN5AFcE1gBnA7QAAAY5AAkD+ACKBLsAYATjADAE4wCKAfsAAAI1ACUFXQAHBV0ABwSG/+IExgAxAp3/9AU4ABwFOAAcBTgAHAU4ABwFOAAcBTgAHAU4ABwFNQB3BIwAqQSMAKkEjACpBIwAqQIt/+ACLQCwAi3/6QIt/9UFtACpBYAAdgWAAHYFgAB2BYAAdgWAAHYFMACMBTAAjAUwAIwFMACMBM4ADwRaAG0EWgBtBFoAbQRaAG0EWgBtBFoAbQRaAG0EMABcBD0AXQQ9AF0EPQBdBD0AXQH6/8YB+gCWAfr/zwH6/7sEagCMBJAAWwSQAFsEkABbBJAAWwSQAFsEaQCIBGkAiARpAIgEaQCIA8kAFgPJABYFOAAcBFoAbQU4ABwEWgBtBTgAHARaAG0FNQB3BDAAXAU1AHcEMABcBTUAdwQwAFwFNQB3BDAAXAU/AKkFGQBfBIwAqQQ9AF0EjACpBD0AXQSMAKkEPQBdBIwAqQQ9AF0EjACpBD0AXQVzAHoEfQBgBXMAegR9AGAFcwB6BH0AYAVzAHoEfQBgBbQAqQRoAIwCLf+3Afr/nQIt/8wB+v+yAi3/7AH6/9ICLQAYAfH/+wItAKkGlwC3A9oAjQRqADUCA/+0BQQAqQQOAI0ETgChAfEAkwROAKkB8QBXBE4AqQKHAJwETgCpAs0AnAW0AKkEagCMBbQAqQRqAIwFtACpBGoAjARq/7wFgAB2BJAAWwWAAHYEkABbBYAAdgSQAFsE7QCoArUAjATtAKgCtQBTBO0AqAK1AGMEvwBQBCAAXwS/AFAEIABfBL8AUAQgAF8EvwBQBCAAXwS/AFAEIABfBMYAMQKdAAkExgAxAp0ACQTGADECxQAJBTAAjARpAIgFMACMBGkAiAUwAIwEaQCIBTAAjARpAIgFMACMBGkAiAUwAIwEaQCIBxkAPQYDACsEzgAPA8kAFgTOAA8EygBWA/cAWATKAFYD9wBYBMoAVgP3AFgHev/yBsEATgWAAHYEiABbBID/vgSA/74EJgAoBIUAEwSFABMEhQATBIUAEwSFABMEhQATBIUAEwR8AGAD5gCKA+YAigPmAIoD5gCKAej/vgHoAI4B6P/HAej/swTjAIoEuwBgBLsAYAS7AGAEuwBgBLsAYAR8AHQEfAB0BHwAdAR8AHQEKwANBIUAEwSFABMEhQATBHwAYAR8AGAEfABgBHwAYASAAIoD5gCKA+YAigPmAIoD5gCKA+YAigSsAGMErABjBKwAYwSsAGME4wCKAej/lQHo/6oB6P/KAegABgHoAIgDzwArBFQAigO0AIIDtACKA7QAigO0AIoE4wCKBOMAigTjAIoEuwBgBLsAYAS7AGAESgCKBEoAigRKAIoEIABDBCAAQwQgAEMEIABDBCYAKAQmACgEJgAoBHwAdAR8AHQEfAB0BHwAdAR8AHQEfAB0BhUAMQQrAA0EKwANBCMARwQjAEcEIwBHBTgAHASM/ykFtP83Ai3/PQWU/+YFMv8UBWb/6QKX/5sFOAAcBPsAqQSMAKkEygBWBbQAqQItALcFBACpBvwAqQW0AKkFgAB2BQwAqQTGADEEzgAPBQQAOQIt/9UEzgAPBIUAZARQAGMEiACRApcAwwRdAI8EcwCaBJAAWwSIAJoD4AAhA/cAKQKX/+UEXQCPBJAAWwRdAI8GlwB6BIwAqQRzALEEvwBQAi0AtwIt/9UEagA1BSQAsgUEAKkFBwBNBTgAHAT7AKkEcwCxBIwAqQW0ALEG/ACpBbQAqQWAAHYFtQCyBQwAqQU1AHcExgAxBQQAOQRaAG0EPQBdBJ4AnASQAFsEfQCMBDAAXAPJABYD9wApBD0AXQNbAJoEIABfAfEAjQH6/7sB6f+/BFIAnAPJABYHGQA9BgMAKwcZAD0GAwArBxkAPQYDACsEzgAPA8kAFgFlAGcCjwCIBB4AoAID/7QBmQAwBvwAqQcDAIsFOAAcBFoAbQSMAKkFtACxBD0AXQSeAJwFiQBaBZoAXwUKABYEA//7CFkAWwlJAHYEvwBQBBAAWAU1AHcEMABcBM4ADwQCAC4CLQC3B0MAGwYgABUCLQC3BTgAHARaAG0FOAAcBFoAbQd6//IGwQBOBIwAqQQ9AF0FhwBdBDcAYgQ3AGIHQwAbBiAAFQS/AFAEEABYBbQAsQSeAJwFtACxBJ4AnAWAAHYEkABbBXEAZwSLAFsFcQBnBIsAWwVkAJMETQBkBQcATQPJABYFBwBNA8kAFgUHAE0DyQAWBXoAlgRZAGcG6wCyBjYAnQSDAF8FOAAcBFoAbQU4ABwEWgBtBTgAHARaAG0FOAAcBFr/ygU4ABwEWgBtBTgAHARaAG0FOAAcBFoAbQU4ABwEWgBtBTgAHARaAG0FOAAcBFoAbQU4ABwEWgBtBTgAHARaAG0EjACpBD0AXQSMAKkEPQBdBIwAqQQ9AF0EjACpBD0AXQSM//AEPf+6BIwAqQQ9AF0EjACpBD0AXQSMAKkEPQBdAi0AtwH6AJsCLQCjAfEAhQWAAHYEkABbBYAAdgSQAFsFgAB2BJAAWwWAAEcEkP/EBYAAdgSQAFsFgAB2BJAAWwWAAHYEkABbBX4AZQSSAFsFfgBlBJIAWwV+AGUEkgBbBX4AZQSSAFsFfgBlBJIAWwUwAIwEaQCIBTAAjARpAIgFkACMBPMAiAWQAIwE8wCIBZAAjATzAIgFkACMBPMAiAWQAIwE8wCIBM4ADwPJABYEzgAPA8kAFgTOAA8DyQAWBKEAXwTGADED2AAoBXoAlgRZAGcEcwCxA1sAmgYvAD8Evf/eBGgAjAUF/9QFBf/UBHMAAwNb//wFOP/3BCf/vwTOAA8EAgAuBQQAOQP3ACkEUABjBGwAEgY/AJAEfgBdBH4AXgR+ADUEfgCaBJIAmASmAIQEkgBkBKYAhwVzAHoEfQBgBbQAqQRqAIwFOAAcBFoAOQSMAF8EPQApAi3/CgH6/vAFgAB2BJAAMwTtAFUCtf+LBTAAjARpACsEpv7WBPsAqQR9AIwFPwCpBIMAXwU/AKkEgwBfBbQAqQRoAIwFBACpBA4AjQUEAKkEDgCNBE4AqQHxAIYG/ACpBwMAiwW0AKkEagCMBYAAdgUMAKkEfQCMBO0AqAK1AIIEvwBQBCAAXwTGADECnQAJBTAAjAUXABwD4AAhBRcAHAPgACEHGQA9BgMAKwTKAFYD9wBYBcb+MgSFABMEIv9jBR//gAIk/4QExf/VBGf/GwT8/+4EhQATBFAAigPmAIoEIwBHBOMAigHoAJcEVACKBgIAigTjAIoEuwBgBFwAigQmACgEKwANBFQAJgHo/7MEKwANA+YAigOvAIoEIABDAegAlwHo/7MDzwArBFQAigQfACIEhQATBFAAigOvAIoD5gCKBOwAigYCAIoE4wCKBLsAYATOAIoEXACKBHwAYAQmACgEVAAmBD8ARwTjAIoEfABgBCsADQXDAAIE7ACKBB8AIgVnAGAFtwCXBjkACQS7AGAEIABDBhUAMQYVADEGFQAxBCsADQU4ABwEWgBtBIwAqQQ9AF0EhQATA+YAigH6AIUAAQAAB2z+DAAACUn6G/5KCTAAAQAAAAAAAAAAAAAAAAAABQ4AAwSGAZAABQAABZoFMwAAAR8FmgUzAAAD0QBmAgAAAAIAAAAAAAAAAADgAAL/UAAgWwAAACAAAAAAR09PRwBAAAD//QYA/gAAZgeaAgAgAAGfAAAAAAQ6BbAAIAAgAAMAAAABAAAFEAkKBAAAAgICAwYFBwYCAwMEBQICAgQFBQUFBQUFBQUFAgIFBQUECAYGBgYFBQYGAgUGBQgGBgYGBgUFBgYIBgUFAgQCBAQDBQUFBQUDBQUCAgUCCAUFBQUDBQMFBAcEBAQDAgMGAgUFBgUCBgQHBAQFBwQDBQMDAwUEAgIDBAQHBwcECAUGBQUIBQUFBQUGAgUFAgYFCQgCBgMGBQYGAgUEBAQEAgMCBAMDAAAAAAAAAgUCBQYGBgUGBQYGBgUFBQUFBQUFAwUEBQUFBQUFBgYHBQUHBwYKCgcGBgcIBQYGBgcHBggJBwgGBggGBQUEBQcFBQUFBwUFBAcFBQcHBgcFBQcFBQUICAUFCAcFCAcFBQgHCAcKCQUEBgUGBQYFCAcIBwYFBgAAAAAAAAcGBQYFBQQFBQkHBgUGBQcGBwUJBgkIBwUGBQgGBgUGBQYHBQYFBwYGBQcGCAcGBQUFBAYFBgcIBwYFBQkHCQcGBQYGBgcGBAUJBQkDAgIFAgIBAQACAgYHBAICAgIDAwMFBQMEBgIJAwMEAwQFBwcKBwcFBwUFBgYHBAkGBgcICAcFBgUFBQkCBQUFBQUDAwIGBQUICAYHAAkJAwMDBQUFBQUFBQUFBQUFBQcFBQUFBQUFBQYHBAUEAgYFBAUFBAQFBQUEBQQGBgYGBQgIBgUFBgcFBgUFBQYFBwgGBwUFBwUFBwUGBgYFBQcFBQYFBQUFBAkFAwMDAwMDAwQDBAUFBgYFBgUFBQUFAgQABAQFBAQEBAMDAwMDAwMGBgYHBwQFBQUFBQQCBwUCBQUFBQUFBQUFBQICAgICBQYFBQUFBQUFBQUFBAUEBwQFBgYCAgYGBQUDBgYGBgYGBgYFBQUFAgICAgYGBgYGBgYGBgYFBQUFBQUFBQUFBQUFAgICAgUFBQUFBQUFBQUEBAYFBgUGBQYFBgUGBQYFBgYFBQUFBQUFBQUFBgUGBQYFBgUGBQICAgICAgICAgcEBQIGBQUCBQIFAwUDBgUGBQYFBQYFBgUGBQYDBgMGAwUFBQUFBQUFBQUFAwUDBQMGBQYFBgUGBQYFBgUIBwUEBQUEBQQFBAgIBgUFBQUFBQUFBQUFBQQEBAQCAgICBgUFBQUFBQUFBQUFBQUFBQUFBQQEBAQEBQUFBQYCAgICAgQFBAQEBAYGBgUFBQUFBQUFBQUFBQUFBQUFBQUHBQUFBQUGBQYCBgYGAwYGBQUGAgYIBgYGBQUGAgUFBQUDBQUFBQQEAwUFBQcFBQUCAgUGBgYGBgUFBggGBgYGBgUGBQUFBQUFBAQFBAUCAgIFBAgHCAcIBwUEAgMFAgIICAYFBQYFBQYGBgUJCgUFBgUFBQIIBwIGBQYFCAgFBQYFBQgHBQUGBQYFBgUGBQYFBgUGBAYEBgQGBQgHBQYFBgUGBQYFBgUGBQYFBgUGBQYFBgUGBQUFBQUFBQUFBQUFBQUFBQUCAgICBgUGBQYFBgUGBQYFBgUGBQYFBgUGBQYFBgUGBQYGBgYGBgYGBgYFBAUEBQQFBQQGBQUEBwUFBgYFBAYFBQUGBAUFBwUFBQUFBQUFBgUGBQYFBQUCAgYFBgMGBQUGBQYFBgUGBQYFBgUFAggIBgUGBgUGAwUFBQMGBgQGBAgHBQQHBQUGAgUFBgUFBAUGAgUHBgUFBQUFAgUEBAUCAgQFBQUFBAQGBwYFBQUFBQUFBgUFBgYFBgYHBQUHBwcFBgUFBQUEAgAAAAMAAAADAAAAHAADAAEAAAAcAAMACgAABooABAZuAAAA9ACAAAYAdAAAAAIADQB+AKAArACtAL8AxgDPAOYA7wD+AQ8BEQElAScBMAFTAV8BZwF+AX8BjwGSAaEBsAHwAf8CGwI3AlkCvALHAskC3QLz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AxgDGgMcAx4DIAMiAyQDJQMnAykDKwMtA4YDhwOIA4kDigOLA4wDjgOPA5ADkQOSA5MDlAOVA5YDlwOYA5kDmgObA5wDnQOtA64DrwOwA7EDsgOzA7QDtQO2A7cDuAO5A7oDuwO8A70DvgO/A8ADwQPCA9MD1QPXA9kD7gPwA/IEBwQNBBMEfQSCBIYFBwUJAAIAAAACAAo6GAABA/IABAAAAfQHzjTGNMYH/AheNv43rjTMOcw3eghkOBg4GDe4OAI4GDgYOcw4RAwCDNA4ijlYOZQ03jaEObINRjdcOGY1jA2MODoOwjg6ODo3iDhmOHwPxDl2ECY1PDl2EEA4ZjnMEIY1xjb+Ocw2/hEIEgYTCBPqFIw5dhSSFJw4OheGGXgaahtwG4YbjBuSHowekh7MHwIfjDWgNaAhvjgYImAjXjTeJcA4GDgYNUI4GDgYOBgmljWgOBg1oChAKQYpmCn6KuA1lituNTwzRiuYLXI4ZjEAMTozJDMkOGYycDL6MyQzJDMkNv43iDlYOXYzRjhmNcY1ljTeNTw3uDe4N7g4GDTeNTw4GDgYOcw1ljTeNTw0xjNwNMY0xjTGOgg0EjRgOgI0vDnqOfA6AjnwOeo56jnqOeo0rjnwNMw5zDnMOcw5zDiKNv42/jb+Nv42/jb+Nv40zDd6N3o3ejd6OBg4GDgYOBg4GDnMOcw5zDnMOcw2hDdcN1w3XDdcN1w3XDdcNYw1jDWMNYw4OjeIN4g3iDeIN4g5djl2Nv43XDb+N1w2/jdcNMw0zDTMNMw5zDd6NYw3ejWMN3o1jDd6NYw3ejWMOBg4OjgYOBg4GDgYOBg3uDgCOAI4AjgCOBg4OjgYODo4GDg6ODo5zDeIOcw3iDnMN4g4fDh8OHw4ijiKOIo5lDaEOXY2hDmyObI5sjoCOgI6CDnwOfA58DnwOfA58DnwOgI6AjoCOgI6AjnwOfA58DoCOeo0vDS8NLw0vDoCOgI6AjoINv43ejgYOBg5zDaENv43rjd6ObI4GDgYN7g4GDgYOcw4RDiKNoQ03jgYNoQ4OjeIOXY3iDd6NcY4GDgYN7g3uDVCNv43rjXGN3o4GDgYOcw4RDTMOIo03jdcNYw3iDhmOXY1PDWMNZY5djmUOZQ5lDaEOXY0xjTGNMY4GDg6Nv43XDd6NYw5WDl2NMw2hDl2OBg03jU8OBg2/jdcNv43XDd6NYw1jDWMNN41PDnMN4g3iDhmNUI5djVCOXY1Qjl2Nv43XDb+N1w2/jdcNv43XDb+N1w2/jdcNv43XDb+N1w2/jdcNv43XDb+N1w2/jdcN3o1jDd6NYw3ejWMN3o1jDd6NYw3ejWMN3o1jDd6NYw4GDgYOcw3iDnMN4g5zDeIOcw3iDnMN4g5zDeIOcw3iDeINoQ5djaEOXY2hDl2OIo1xjWWODo1oDXGN7g2hDgYODo2/jdcN3o4GDnMN4g4fDeuOGY5zDnMOBg4Oje4N7g4AjgYODo4GDg6Ocw4RDhmOHw4ijlYOXY5WDl2OZQ5sjnMOfA6AjnwOeo6CDnqOfA6AjoIAAIApAAEAAQAAAAGAAYAAQALAAwAAgATABMABAAlACoABQAsAC0ACwAvADYADQA4ADgAFQA6AD8AFgBFAEYAHABJAEoAHgBMAEwAIABPAE8AIQBRAFQAIgBWAFYAJgBYAFgAJwBaAF0AKABfAF8ALACKAIoALQCWAJYALgCdAJ0ALwCxALUAMAC3ALkANQC7ALsAOAC9AL4AOQDAAMEAOwDDAMUAPQDHAM4AQADSANIASADUAN4ASQDgAO8AVADxAPEAZAD2APgAZQD7APwAaAD+AQAAagEDAQUAbQEKAQoAcAENAQ0AcQEYARoAcgEiASIAdQEuATAAdgEzATUAeQE3ATcAfAE5ATkAfQE7ATsAfgFDAUQAfwFUAVQAgQFWAVYAggFYAVgAgwFcAV4AhAGEAYUAhwGHAYkAiQHYAdgAjAHaAdsAjQHdAd0AjwHgAeEAkAHrAe0AkgH/Af8AlQIOAhAAlgIwAjAAmQIzAjMAmgJFAkUAmwJHAkgAnAJ6AnsAngJ9An0AoAJ/ApQAoQKZAqAAtwKiAqUAvwKqAq8AwwK0ArwAyQK+Ar4A0gLAAsAA0wLCAsIA1ALEAsQA1QLGAs8A1gLYAtoA4ALcAtwA4wLeAt4A5ALgAuAA5QLiAuIA5gLnAucA5wLpAukA6ALrAusA6QLtAu0A6gLvAu8A6wLxAv0A7AL/Av8A+QMBAwEA+gMDAwMA+wMOAw4A/AMQAxAA/QMSAxIA/gMgAyAA/wMiAyUBAAMnAycBBAMpAykBBQMvAzgBBgNDA0cBEANNA08BFQNUA1QBGANlA2kBGQNtA28BHgN4A3gBIQOGA4sBIgOOA50BKAOgA6ABOAOkA6QBOQOmA6YBOgOqA6oBOwOtA64BPAOwA7EBPgOzA7kBQAO7A70BRwO/A8QBSgPGA8cBUAPJA8wBUgPSA9MBVgPVA9UBWAPXA9cBWQPZA9wBWgPfA+QBXgPmA+YBZAPqA+sBZQPwA/ABZwPyA/sBaAP+A/8BcgQBBAQBdAQLBAwBeAQQBBABegQSBBgBewQeBEYBggRIBEgBqwRKBFcBrARfBF8BugRwBHUBuwR3BHcBwQR7BHwBwgR/BH8BxASBBIIBxQSEBIQBxwSGBIYByASXBJsByQSdBJ0BzgSfBKABzwSiBKIB0QSmBKgB0gSqBKoB1QSsBK4B1gSwBLAB2QSyBLIB2gS0BLoB2wS8BLwB4gS/BL8B4wTCBMYB5ATIBMgB6QTKBMsB6gTPBM8B7ATSBNIB7QTYBNgB7gTdBN0B7wToBOgB8ATqBOoB8QTxBPEB8gT1BPUB8wALADj/2ADS/9gA1v/YATn/2AFF/9gDDv/YAxD/2AMS/9gDwf/YBHf/2AS//9gAGAA6ABQAOwASAD0AFgEZABQCmQAWAyAAEgMiABYDJAAWA4sAFgOaABYDnQAWA9MAEgPVABID1wASA9kAFgPqABQD8gAWBHAAFgRyABYEdAAWBIYAFgTCABQExAAUBMYAEgABABP/IADnABD/FgAS/xYAJf9WAC7++AA4ABQARf/eAEf/6wBI/+sASf/rAEv/6wBT/+sAVf/rAFb/5gBZ/+oAWv/oAF3/6ACU/+sAmf/rAJv/6gCy/1YAtP9WALv/6wC9/+gAyP/rAMn/6wDL/+oA0gAUANYAFAD3/+sBA//rAQ3/VgEY/+sBGv/oAR7/6wEi/+sBOQAUAUL/6wFFABQBYP/rAWH/6wFr/+sBhv8WAYr/FgGO/xYBj/8WAev/wAHt/8ACM//AAn//VgKA/1YCgf9WAoL/VgKD/1YChP9WAoX/VgKa/94Cm//eApz/3gKd/94Cnv/eAp//3gKg/94Cof/rAqL/6wKj/+sCpP/rAqX/6wKr/+sCrP/rAq3/6wKu/+sCr//rArD/6gKx/+oCsv/qArP/6gK0/+gCtf/oArb/VgK3/94CuP9WArn/3gK6/1YCu//eAr3/6wK//+sCwf/rAsP/6wLF/+sCx//rAsn/6wLL/+sCzf/rAs//6wLR/+sC0//rAtX/6wLX/+sC5f74Avn/6wL7/+sC/f/rAw4AFAMQABQDEgAUAxX/6gMX/+oDGf/qAxv/6gMd/+oDH//qAyP/6AMy/8ADM//AAzT/wAM1/8ADNv/AAzf/wAM4/8ADTf/AA07/wANP/8ADhv9WA47/VgOe/+sDov/qA6T/6wOm/+gDqf/qA6r/6wOr/+oDsv74A7b/VgPBABQDw//eA8T/6wPG/+sDyP/rA8n/6APL/+sD0v/oA9r/6APi/1YD4//eA+b/6wPr/+gD7P/rA/H/6wPz/+gD+P9WA/n/3gP6/1YD+//eA///6wQB/+sEAv/rBAz/6wQO/+sEEP/rBBT/6AQW/+gEGP/oBB3/6wQe/1YEH//eBCD/VgQh/94EIv9WBCP/3gQk/1YEJf/eBCb/VgQn/94EKP9WBCn/3gQq/1YEK//eBCz/VgQt/94ELv9WBC//3gQw/1YEMf/eBDL/VgQz/94ENP9WBDX/3gQ3/+sEOf/rBDv/6wQ9/+sEP//rBEH/6wRD/+sERf/rBEv/6wRN/+sET//rBFH/6wRT/+sEVf/rBFf/6wRZ/+sEW//rBF3/6wRf/+sEYf/rBGP/6gRl/+oEZ//qBGn/6gRr/+oEbf/qBG//6gRx/+gEc//oBHX/6AR3ABQEmf9WBJr/3gSc/+sEoP/rBKT/6gSp/+sEq//rBL8AFATD/+gExf/oBMv/wATS/8AE6v/AADMAOP/VADr/5AA7/+wAPf/dANL/1QDW/9UBGf/kATn/1QFF/9UB6wAOAe0ADgIzAA4Cmf/dAw7/1QMQ/9UDEv/VAyD/7AMi/90DJP/dAzIADgMzAA4DNAAOAzUADgM2AA4DNwAOAzgADgNNAA4DTgAOA08ADgOL/90Dmv/dA53/3QPB/9UD0//sA9X/7APX/+wD2f/dA+r/5APy/90EcP/dBHL/3QR0/90Ed//VBIb/3QS//9UEwv/kBMT/5ATG/+wEywAOBNIADgTqAA4AHQA4/7AAOv/tAD3/0ADS/7AA1v+wARn/7QE5/7ABRf+wApn/0AMO/7ADEP+wAxL/sAMi/9ADJP/QA4v/0AOa/9ADnf/QA8H/sAPZ/9AD6v/tA/L/0ARw/9AEcv/QBHT/0AR3/7AEhv/QBL//sATC/+0ExP/tABEALv/uADn/7gKV/+4Clv/uApf/7gKY/+4C5f/uAxT/7gMW/+4DGP/uAxr/7gMc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/+IAGAA4/+sAPf/zANL/6wDW/+sBOf/rAUX/6wKZ//MDDv/rAxD/6wMS/+sDIv/zAyT/8wOL//MDmv/zA53/8wPB/+sD2f/zA/L/8wRw//MEcv/zBHT/8wR3/+sEhv/zBL//6wA5AFH/7wBS/+8AVP/vAFz/8ADB/+8A7P/vAO3/7gDu//AA8P/vAPH/7wDz/+8A9P/vAPX/7wD2/+4A+P/vAPr/7wD7/+8A/v/vAQD/7wEF/+8BCf/0ASD/8QEr/+8BNP/wATb/7wE6/+8BPP/vAT7/7wFE//ABU//vAVX/7wFX/+8BXP/vAV7/8AFt/+8Cqv/vAvL/7wL0/+8C9v/vAvf/7wOg/+8Dxf/vA8f/7wPK//ADzP/vA9H/7wPh/+8D5//vA/b/8AQE//AECP/vBAr/7wQc/+8EfP/vBJj/7wS1/+8Et//vACMABv/yAAv/8gBa//UAXf/1AL3/9QD2//QBCf/1ARr/9QE6//UBbf/1AYT/8gGF//IBh//yAYj/8gGJ//ICtP/1ArX/9QMj//UDpv/1A8n/9QPS//UD2v/1A9v/8gPc//ID3//yA+v/9QPz//UEFP/1BBb/9QQY//UEcf/1BHP/9QR1//UEw//1BMX/9QAKAO0AFAD2/+0A+f/tAPz/4gE6/+0BSP/tAUr/7QFt/+0EGv/tBHr/7QB2AEf/8ABI//AASf/wAEv/8ABT/+sAVf/wAJT/8ACZ//AAu//wAMj/8ADJ//AA9//wAQP/8AEY/+sBHP/rAR7/8AEi//ABQv/wAWD/8AFh//ABa//wAdv/6wHd/+sB5f/pAez/6wH1/+sCEf/rAhr/6wIx/+sCof/wAqL/8AKj//ACpP/wAqX/8AKr/+sCrP/rAq3/6wKu/+sCr//rAr3/8AK///ACwf/wAsP/8ALF//ACx//wAsn/8ALL//ACzf/wAs//8ALR//AC0//wAtX/8ALX//AC+f/rAvv/6wL9/+sDOf/rA0P/6wNE/+sDRf/rA0b/6wNH/+sDUP/rA1H/6wNS/+sDU//rA1r/6wNb/+sDXP/rA13/6wNt/+sDbv/rA2//6wOe//ADpP/rA6r/6wPE//ADxv/rA8j/8APL//AD5v/wA+z/8APx//AD///wBAH/8AQC//AEDP/rBA7/8AQQ/+sEHf/wBDf/8AQ5//AEO//wBD3/8AQ///AEQf/wBEP/8ARF//AES//rBE3/6wRP/+sEUf/rBFP/6wRV/+sEV//rBFn/8ARb//AEXf/wBF//6wRh//AEnP/wBKD/6wSp//AEq//wBM//6wTx/+sE9P/rBPn/6wDjAAYADQALAA0ARf/wAEf/sABI/7AASf+wAEoADQBL/7AAU//WAFX/sABaAAsAXQALAJT/sACZ/7AAu/+wAL0ACwC+/7AAx/+rAMj/wADJ/7AAzP/VAO3/qgDy/68A9/+wAQP/sAEE/68BGP/WARoACwEc/+IBHv+wASAADAEi/7ABQv+wAVH/rwFg/7ABYf+wAWMACwFlAAsBa/+wAXD/rwGEAA0BhQANAYcADQGIAA0BiQANAdMADQHWAA0B2AAOAdn/9QHb/+wB3f/tAeX/7AHr/78B7P/tAe3/vwH0AA4B9f/tAfgADgIQAA4CEf/tAhIADQIUAA4CGv/tAjH/7gIz/78Cmv/wApv/8AKc//ACnf/wAp7/8AKf//ACoP/wAqH/sAKi/7ACo/+wAqT/sAKl/7ACq//WAqz/1gKt/9YCrv/WAq//1gK0AAsCtQALArf/8AK5//ACu//wAr3/sAK//7ACwf+wAsP/sALF/7ACx/+wAsn/sALL/7ACzf+wAs//sALR/7AC0/+wAtX/sALX/7AC+f/WAvv/1gL9/9YDIwALAzL/vwMz/78DNP+/AzX/vwM2/78DN/+/Azj/vwM5/+0DQ//tA0T/7QNF/+0DRv/tA0f/7QNMAA0DTf+/A07/vwNP/78DUP/tA1H/7QNS/+0DU//tA1r/7QNb/+0DXP/tA13/7QNt/+0Dbv/tA2//7QNz//UDdP/1A3X/9QN2//UDeAAOA4EADQOCAA0Dnv+wA6T/1gOmAAsDqv/WA8P/8APE/7ADxv/WA8j/sAPJAAsDy/+wA9IACwPaAAsD2wANA9wADQPfAA0D4//wA+b/sAPrAAsD7P+wA/H/sAPzAAsD+f/wA/v/8AP//7AEAf+wBAL/sAQM/9YEDv+wBBD/1gQUAAsEFgALBBgACwQd/7AEH//wBCH/8AQj//AEJf/wBCf/8AQp//AEK//wBC3/8AQv//AEMf/wBDP/8AQ1//AEN/+wBDn/sAQ7/7AEPf+wBD//sARB/7AEQ/+wBEX/sARL/9YETf/WBE//1gRR/9YEU//WBFX/1gRX/9YEWf+wBFv/sARd/7AEX//WBGH/sARxAAsEcwALBHUACwSa//AEnP+wBKD/1gSp/7AEq/+wBMMACwTFAAsEy/+/BM//7QTQAA0E0v+/BN4ADQThAA0E6v+/BPH/7QT0/+0E9QAOBPn/7QT6AA0ADgDtABQA8gAQAPb/8AD5//ABAQAMAQQAEAE6//ABSP/wAUr/5gFRABABbf/wAXAAEAQa//AEev/wAE0ARwAMAEgADABJAAwASwAMAFUADACUAAwAmQAMALsADADIAAwAyQAMAO0AOgDyABgA9v/jAPcADAD5//cBAwAMAQQAGAEeAAwBIgAMATr/4gFCAAwBSP/3AUr/4wFRABgBYAAMAWEADAFrAAwBbf/jAXAAGAKhAAwCogAMAqMADAKkAAwCpQAMAr0ADAK/AAwCwQAMAsMADALFAAwCxwAMAskADALLAAwCzQAMAs8ADALRAAwC0wAMAtUADALXAAwDngAMA8QADAPIAAwDywAMA+YADAPsAAwD8QAMA/8ADAQBAAwEAgAMBA4ADAQa//cEHQAMBDcADAQ5AAwEOwAMBD0ADAQ/AAwEQQAMBEMADARFAAwEWQAMBFsADARdAAwEYQAMBHr/9wScAAwEqQAMBKsADAAiAFr/9ABc//AAXf/0AL3/9ADt/+8A7v/wAPL/8wEE//MBGv/0ATT/8AFE//ABUf/zAV7/8AFw//MCtP/0ArX/9AMj//QDpv/0A8n/9APK//AD0v/0A9r/9APr//QD8//0A/b/8AQE//AEFP/0BBb/9AQY//QEcf/0BHP/9AR1//QEw//0BMX/9AAKAAb/1gAL/9YBhP/WAYX/1gGH/9YBiP/WAYn/1gPb/9YD3P/WA9//1gAIAPb/ugEJ/88BIP/bATr/UAFK/50BY//wAWX/8gFt/0wACgAG//UAC//1AYT/9QGF//UBh//1AYj/9QGJ//UD2//1A9z/9QPf//UAKABMACAATwAgAFAAIABT/4AAV/+QAFsACwEY/4ABwf+QAqv/gAKs/4ACrf+AAq7/gAKv/4AC+f+AAvv/gAL9/4ADBf+QAwf/kAMJ/5ADC/+QAw3/kAOk/4ADqv+AA8b/gAPN/5AEDP+ABBD/gARL/4AETf+ABE//gARR/4AEU/+ABFX/gARX/4AEX/+ABKD/gAStACAErwAgBLEAIAS+/5AAEwHT/+4B1f/1Adb/8QHY//IB9P/yAfj/8gIQ//ICEv/uAhT/8gNM/+4DeP/yA4D/9QOB/+4Dgv/uBND/7gTe/+4E4f/uBPX/8gT6/+4AEwHT/+UB1f/xAdb/6wHY/+kB9P/pAfj/6QIQ/+kCEv/lAhT/6QNM/+UDeP/pA4D/8QOB/+UDgv/lBND/5QTe/+UE4f/lBPX/6QT6/+UAAwHV//UB1v/uA4D/9QACAdb/twHb//AAAQBbAAsABAAN/+YAQf/0AGH/7wFN/+0AFwC4/9QAvv/wAML/7QDEABEAyv/gAMz/5wDN/+UAzv/uANkAEgDq/+kA9v/XATr/1wFK/9MBTP/WAU3/xQFY/+cBYgANAWQADAFt/9YBbv/yAdv/6QHl/+cCMf/pAAEBHP/xABIA2f+uAOYAEgDr/+AA7f+tAO//1gD9/98BAf/SAQf/4AEc/84BLv/dATD/4gE4/+ABQP/gAUr/6QFN/9oBX/+9AWn/3wFsABEAAgD2//UBhf+wAAIA7f/JARz/7gAJAOb/wwD2/88BOv/OAUn/5wFM/98BYv/RAWT/7AFs/6ABbf/RAC8AVv9tAFv/jABt/b8AfP59AIH+vACG/ysAif9LALj/YQC+/48Av/8PAMP+6ADG/x8Ax/7lAMr/RgDM/u0Azf79AM7+2QDZ/1IA5gAFAOr/vQDr/0kA7f7+AO//EwD2/2gA/f8OAP//EwEB/wcBB/8OAQn/EQEc/zwBIP+sAS7/FQEw/zwBOP8OATr/agFA/0kBSv8MAUz/PwFN/vEBWP/AAV/+7wFj/zEBZf9fAWn/CgFsAAUBbf8wAW7/1QAeAAr/4gANABQADv/PAEEAEgBK/+oAVv/YAFj/6gBhABMAbf+uAHz/zQCB/6AAhv/BAIn/wAC4/9AAvP/qAL7/7gC//8YAwAANAML/6QDD/9YAxv/oAMf/ugDK/+kAzP/LAM3/2gDO/8cBjf/TAdv/ywHl/8sCMf/NABcAI//DAFj/7wBb/98Amv/uALj/5QC5/9EAxAARAMr/yADZABMA5v/FAPb/ygE6/58BSf9RAUr/ewFM/8oBTf/dAVj/8gFi/3UBZP/KAWz/TwFt/4wB1v/NAeX/9QAHAPb/8AEJ//EBIP/zATr/8QFj//MBZf/pAW3/0wADAEr/7gBb/+oB1v/wAAkAyv/qAO3/uAD2/+oBCf/wASD/8QE6/+sBY//1AW3/7AGF/7AAAgERAAsBbP/mABIAW//BALj/xQDK/7QA6v/XAPb/uQEJ/7IBHP/SASD/yAE6/6ABSv/FAVj/5AFj/8wBZf/MAW3/ywFu/+8B2//nAeX/5gIx/+gABQBb/6QB1v9UAdv/8QHl//ECMf/zAAgA2QAVAO0AFQFJ/+QBSv/lAUz/5AFi/+MBZP/iAWz/5AACAPb/wAGF/7AACABYAA4Agf+fAL7/9QDE/94Ax//lANn/qADt/8oBX//jAAUAyv/qAO3/7gD2/7ABOv/sAW3/7AADAEoADwBYADIAWwARADMABP/YAFb/tQBb/8cAbf64AHz/KACB/00Ahv+OAIn/oQC4/64Avv/JAL//fgDD/2cAxv+HAMf/ZQDK/54AzP9qAM3/cwDO/14A2f+lAOYADwDq/+QA6/+gAO3/dADv/4AA9v+yAP3/fQD//4ABAf95AQf/fQEJ/38BHP+YASD/2gEu/4EBMP+YATj/fQE6/7MBQP+gAUr/fAFM/5oBTf9sAVj/5gFf/2sBY/+SAWX/rQFp/3sBbAAPAW3/kQFu//IB2/+5AeX/uQIx/7kABwANABQAQQARAFb/4gBhABMB2//ZAeX/2QIx/9kABwBKAA0Avv/1AMYACwDH/+oAygAMAO3/yAEc//EABwANAA8AQQAMAFb/6wBhAA4B2//nAeX/5wIx/+kABgBb/+UAuP/LAM3/5AHb/+wB5f/rAjH/7QAHAIH/3wC1//MAt//wAMT/6gDZ/98A5v/gAWz/4AABAdv/6wAEAdb/xwHb//IB5f/yAjH/8gABAdb/8QABAdYADQACCwwABAAADqwXaAAmACUAAAAAAAAAAAAAAAAAEgAAAAAAAAAA/+P/5AAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAARAAAAEQAAAAAAAAAA/+T/5QAAAAAAAAAAAAAAAAAAAAAAAP/rAAAAAAAAAAD/5f/V/+0AAAAAAAD/6gAA/+kAAAAAAAAAAAAA/+H/mgAA//X/6gAAAAAAAAAAAAAAAAAAAAAAAP/1AAD/9P/1AAAAAP/1/87/7/9//6IAAAAAAAwAAAAA//EAAP+IAAD/u//E/8cAEQAAABIAAP+pAAAAAP/J/48AAAAA/90AAAAAAAAAAAAAAAAAAAAAAAD/8QAAAAAAAAAAAAD/8AAAAAAAAAAA/3j/6wAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7QAAAAD/7f/vAAAAAAAA/+YAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+0AAAAAAAAAAAAAAAAAAAAAAAD/8QAAAAAAAAAAAAAAAAAAAAAAAAAA/70AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/1AAAAAAAAAAAAAP/xAAAAAAAAAAD/4//xAAAAAAAAAAAAAP/yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//MAAAAAAAAAAAAAAAAAAAAAAAAAAP/yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/zAAAAAP/xAAAAAP/xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAA/5X/1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/qAAAAAAAAAAAAAAAA/+sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/5v/h/+n/5f/pAAAAAP/n/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAA/6MAAAAAAAAAAP+//+P/2P+//9n/ov+3/8v/7P+gABEAEv+r/8b/4v/wAA0AAAAAAAD/6QARAAD/8wAA/y0AAP/vABIAAP/MAAAAAAAA/6D/8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/6v/uAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAD/nf/k/5P/nf+h/7H/j/+5/7gAAAAQABD/r/+M/8T/8AAAAAAAAAAA/7MADwAA//H/y/8m/37/7QAQ/7z/GAAA/3wAAP8Q//EAAAAAAAAAAAAAAAAAAAAA//IAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAA/7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2AAA//AAAAAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/6//mAAD/6//tAA0AAP/s/+UAAAAAAAAADQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/m/+cAAP/r/+sAAAAA/+f/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARAAAAEQAAAA4AAP/SAAD/0QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/tAAAAAP/sAAAAAP/YAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAA/4UAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//MAAAAA//MAAP92//UAAAAPAAAAAAAA/8YAAAAAAAD/4QAA/+YAAAAAAAAAAAAA/8n+vP/ZAAAAAAAAAAAAAAAAAAD/OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/78AAAAA/9QAEwAA//L/e//K/u3/EQATAAAAAAAAAAD/2gAA/rAAAP9x/z//OwAAAAAAAAAA/1EAAAAAAAAAAAAAAAD/kQAA/8UAAP/s/8MAAP+I/84AAAAAAAAAAAAAAAD/sAAAAAAAAAAAAAD/lQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9gAAAAAAAAAAAAAAAAAAAAAAAAAAP/hAAAAAP/h/+3/1f/f/+cAAAAAAA4AAP/LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4UAAAAAAAAAAP/EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/5f/JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/6AAAAAAAAAAA//MAAAAAAAD/1P/zAAD/0v/k/7X/0v/Z//UAAAAAAAD/tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8fAAAAAAAAAAD/2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/dAAAAAAAAAAAAAAAAAAAAAAAAAAD/ef/1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/ZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP71/60AAAAAAAAAAP/wAAAAAP/A/8kAAAAAAAD/9QAAAAAAAP/IAAAAAP/nAAD/6wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/1YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/0T/vf8z/0T/S/8+/ywAAP9yAAAABwAHAAD/J/+G/9EAAAAAAAAAAP9qAAUAAAAA/5L+ev8PAAAABwAA/mIAAP8MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+8AAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAA/7T/uwAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/1QAA/73/6f+a/70AAP+l/5EAAAAAAAAAEgASAAD/0gAAAAAAAAAAAAAAAAAAAAAAAAAA/8r+bf+7AAAAAAAA/4kAAP/pAAAAAAAAAAIAmgAGAAYAAAALAAsAAQAQABAAAgASABIAAwAlACkABAAsADQACQA4AD4AEgBFAEcAGQBJAEkAHABMAEwAHQBRAFQAHgBWAFYAIgBaAFoAIwBcAF4AJACKAIoAJwCWAJYAKACxALQAKQC9AL0ALQDBAMEALgDHAMcALwDUANUAMADXANcAMgDaANoAMwDcAN4ANADgAOYANwDsAOwAPgDuAO4APwD3APcAQAD8APwAQQD+AP8AQgEEAQUARAEKAQoARgENAQ0ARwEYARoASAEuATAASwEzATUATgE3ATcAUQE5ATkAUgE7ATsAUwFDAUQAVAFUAVQAVgFWAVYAVwFYAVgAWAFcAV4AWQGEAYoAXAGOAY8AYwHYAdgAZQHdAd0AZgHgAeEAZwHrAe0AaQH/Af8AbAIOAhAAbQIwAjAAcAIzAjMAcQJFAkUAcgJHAkgAcwJ6AnsAdQJ9An0AdwJ/AqUAeAKqAq8AnwK0AsQApQLGAs8AtgLYAtoAwALcAtwAwwLeAt4AxALgAuAAxQLiAuIAxgLlAuUAxwLnAucAyALpAukAyQLrAusAygLtAu0AywLvAu8AzALxAv0AzQL/Av8A2gMBAwEA2wMDAwMA3AMOAw4A3QMQAxAA3gMSAxIA3wMUAxQA4AMWAxYA4QMYAxgA4gMaAxoA4wMcAxwA5AMeAx4A5QMgAyAA5gMiAyoA5wMvAzgA8ANDA0cA+gNNA08A/wNUA1QBAgNlA2kBAwNtA28BCAN4A3gBCwOGA4sBDAOOA50BEgOgA6ABIgOkA6QBIwOmA6YBJAOqA6oBJQOtA64BJgOwA7kBKAO7A70BMgO/A8QBNQPGA8wBOwPSA9MBQgPVA9UBRAPXA9cBRQPZA9wBRgPfA+QBSgPmA+YBUAPqA+sBUQPwA/sBUwP+A/8BXwQBBAQBYQQLBAwBZQQQBBABZwQSBBgBaAQeBEYBbwRIBEgBmARKBFcBmQRfBF8BpwRiBGIBqARkBGQBqQRwBHUBqgR3BHcBsAR7BHwBsQR/BH8BswSBBIIBtASEBIQBtgSGBIYBtwSXBJsBuASdBJ0BvQSfBKABvgSiBKIBwASmBKgBwQSqBKoBxASsBK4BxQSwBLAByASyBLIByQS0BLoBygS8BLwB0QS/BL8B0gTBBMYB0wTIBMsB2QTPBM8B3QTSBNIB3gTYBNgB3wTdBN0B4AToBOgB4QTqBOoB4gTxBPEB4wT1BPUB5AACAXQABgAGABkACwALABkAEAAQACEAEgASACEAJQAlAAIAJgAmABwAJwAnABMAKAAoAAEAKQApAAUALgAuAAoALwAvAAsAMAAwABgAMwAzAAEANAA0ABYAOAA4AA4AOQA5AAoAOgA6AB0AOwA7ABsAPAA8ABIAPQA9AAwAPgA+ABEARQBFAAYARgBGAAcARwBHABcASQBJAAgATABMAAQAUQBSAAQAUwBTAAMAVABUAAcAVgBWABUAWgBaAAkAXABcABQAXQBdAAkAXgBeABAAigCKAAcAlgCWAAEAsQCxACIAsgCyAAIAswCzAAEAtAC0AAIAvQC9AAkAwQDBAAQAxwDHAAcA1ADVACAA2gDaABIA3gDeACUA5ADkACAA5gDmACAA7ADsABoA7gDuABQA9wD3AAcA/AD8AB8A/gD+AB8A/wD/AAcBBAEFAB8BCgEKAB8BDQENAAIBGAEYAAMBGQEZAB0BGgEaAAkBLgEuAAcBLwEvACIBMAEwABoBMwEzABIBNAE0ABQBNQE1AAsBNwE3AAsBOQE5AAsBQwFDABIBRAFEABQBWAFYAAEBXAFcABoBXQFdABIBXgFeABQBhAGFABkBhgGGACEBhwGJABkBigGKACEBjgGPACEB2AHYACMB3QHdAA0B4AHgACQB4QHhAB4B6wHrAA8B7AHsAA0B7QHtAA8B/wH/AB4CDgIQAB4CMAIwAA0CMwIzAA8CRQJFABMCRwJIAAECegJ7AAECfQJ9AA4CfwKFAAIChgKGABMChwKKAAUCkAKUAAEClQKYAAoCmQKZAAwCmgKgAAYCoQKhABcCogKlAAgCqgKqAAQCqwKvAAMCtAK1AAkCtgK2AAICtwK3AAYCuAK4AAICuQK5AAYCugK6AAICuwK7AAYCvAK8ABMCvQK9ABcCvgK+ABMCvwK/ABcCwALAABMCwQLBABcCwgLCABMCwwLDABcCxALEAAECxgLGAAUCxwLHAAgCyALIAAUCyQLJAAgCygLKAAUCywLLAAgCzALMAAUCzQLNAAgCzgLOAAUCzwLPAAgC2QLZAAQC5QLlAAoC5wLnAAsC6QLpABgC6wLrABgC7QLtABgC7wLvABgC8gLyAAQC9AL0AAQC9gL3AAQC+AL4AAEC+QL5AAMC+gL6AAEC+wL7AAMC/AL8AAEC/QL9AAMC/wL/ABUDAQMBABUDAwMDABUDDgMOAA4DEAMQAA4DEgMSAA4DFAMUAAoDFgMWAAoDGAMYAAoDGgMaAAoDHAMcAAoDHgMeAAoDIAMgABsDIgMiAAwDIwMjAAkDJAMkAAwDJQMlABEDJgMmABADJwMnABEDKAMoABADKQMpABEDKgMqABADLwMwAA0DMQMxACMDMgM4AA8DQwNHAA0DTQNPAA8DVANUAA0DZQNlAB4DZgNpACQDbQNvAA0DeAN4ACMDhgOGAAIDhwOHAAUDigOKAAEDiwOLAAwDjgOOAAIDjwOPABwDkAOQAAUDkQORABEDlAOUAAsDlwOXAAEDmAOYABYDmQOZAA4DmgOaAAwDmwObABIDnQOdAAwDoAOgAAQDpAOkAAMDpgOmAAkDqgOqAAMDrQOtAAUDrgOuACIDsgOyAAoDswO0AAsDtQO1ACUDtgO2AAIDtwO3ABwDuAO4ACIDuQO5AAUDvQO9AAEDvwO/ABYDwAPAABMDwQPBAA4DwgPCABIDwwPDAAYDxAPEAAgDxgPGAAMDxwPHAAcDyAPIABcDyQPJAAkDygPKABQDywPLAAgDzAPMABoD0gPSAAkD0wPTABsD1QPVABsD1wPXABsD2QPZAAwD2gPaAAkD2wPcABkD3wPfABkD4QPhAAQD4gPiAAID4wPjAAYD5APkAAUD5gPmAAgD6gPqAB0D6wPrAAkD8APwABMD8QPxABcD8gPyAAwD8wPzAAkD9QP1ABID9gP2ABQD+AP4AAID+QP5AAYD+gP6AAID+wP7AAYD/gP+AAUD/wP/AAgEAQQCAAgEAwQDABIEBAQEABQECwQLAAEEDAQMAAMEEAQQAAMEEgQSAAcEEwQTACUEFAQUAAkEFQQVACUEFgQWAAkEFwQXACUEGAQYAAkEHgQeAAIEHwQfAAYEIAQgAAIEIQQhAAYEIgQiAAIEIwQjAAYEJAQkAAIEJQQlAAYEJgQmAAIEJwQnAAYEKAQoAAIEKQQpAAYEKgQqAAIEKwQrAAYELAQsAAIELQQtAAYELgQuAAIELwQvAAYEMAQwAAIEMQQxAAYEMgQyAAIEMwQzAAYENAQ0AAIENQQ1AAYENgQ2AAUENwQ3AAgEOAQ4AAUEOQQ5AAgEOgQ6AAUEOwQ7AAgEPAQ8AAUEPQQ9AAgEPgQ+AAUEPwQ/AAgEQARAAAUEQQRBAAgEQgRCAAUEQwRDAAgERAREAAUERQRFAAgESgRKAAEESwRLAAMETARMAAEETQRNAAMETgROAAEETwRPAAMEUARQAAEEUQRRAAMEUgRSAAEEUwRTAAMEVARUAAEEVQRVAAMEVgRWAAEEVwRXAAMEXwRfAAMEYgRiAAoEZARkAAoEcARwAAwEcQRxAAkEcgRyAAwEcwRzAAkEdAR0AAwEdQR1AAkEdwR3AA4EewR7ACIEfAR8ABoEfwR/AAQEgQSBACAEggSCACIEhASEAAsEhgSGAAwEmASYAAQEmQSZAAIEmgSaAAYEmwSbAAUEnwSfAAEEoASgAAMEogSiABUEpgSmABwEpwSnAAcEqASoAAEEqgSqAAEErQStAAQErgSuAAsEsASwAAsEsgSyABgEtQS1AAQEtwS3AAQEuAS4AAEEuQS5ABYEugS6AAcEvAS8ABUEvwS/AA4EwQTBAAoEwgTCAB0EwwTDAAkExATEAB0ExQTFAAkExgTGABsEyATIABEEyQTJABAEygTKAAEEywTLAA8EzwTPAA0E0gTSAA8E2ATYAB4E3QTdACME6AToAB4E6gTqAA8E8QTxAA0E9QT1ACMAAQAGBPUAFAAAAAAAAAAAABQAAAAAAAAAAAAaAB8AGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAgAAAAAAAAACAAAAAAAjAAAAAAAAAAAAAgAAAAIAAAAQAAsACgAdABYAEQAMABMAAAAAAAAAAAAAAAAABwAAAAEAAQABAAAAAQAAAAAAAAAAAAAAAwADAAQAAwABAAAADgAAAAUACQAAABUACQAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgABAAAAAAAAAAIAAQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAIABgAAAAAAAAAAAAAAAAABAAAACQAAAAAAAAADAAAAAAAAAAAAAAAAAAEAAQAAAAUAAAAAAAAAAAAAAAAACwACABkAAAALAAAAAAAAABEAAAAAABkAIgAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAVAAAAAwADABsAAwADAAMAAAABAAMAIQADAAMAAAAAAAMAAAADAAAAAAABABsAAwAAAAAAAgAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAB0ACQACAAAAAgABAAIAAAACAAEAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAARABUAAAADAAAAAAALAAAAAAADAAAAAwAAAAAAAgABABEAFQALAAAAIAAhAAAAAAAAAAAAAAAAAAAAGQAbAAAAAwAAAAMAAAADAAAAAAAAAAAAAwARABUAAAABAAEAAAAAAAAAAAAZAAAAAAAAAAIAAQAAAAAAAAAZABsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAB8AAAAUABQAGgAUABQAFAAaAAAAAAAAABoAGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcAHAAkAAAAEgAYAB4AAAAIAAAACAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAA0ACAANAAAAAAAAAAAAAAAAABgACAAAAAAAGAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAGAAIABcAHAAYAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgAAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAABgAGAAYABgAGAAYABgACAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAgAKAAoACgAKAAwABwAHAAcABwAHAAcABwABAAEAAQABAAEAAAAAAAAAAAADAAQABAAEAAQABAAFAAUABQAFAAkACQAGAAcABgAHAAYABwACAAEAAgABAAIAAQACAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAgABAAIAAQACAAEAAgABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAwAAAAMAAwACAAQAAgAEAAIABAAAAAAAAAAAAAAAAAAQAA4AEAAOABAADgAQAA4AEAAOAAsAAAALAAAACwAAAAoABQAKAAUACgAFAAoABQAKAAUACgAFABYAAAAMAAkADAATAA8AEwAPABMADwAAAAAAAgAAAAAAAAAAAA0ADQANAA0ADQANAA0ACAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAgAEgASABIAEgAXAA0ADQANAAgACAAIAAgAAAAAAAAAAAAAAAAACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAAAAAAAAAeAB4AHgAeAAAAGAAAABIAEgASABIAEgASACQAFwAXAAAAAAAAAAYAAAAAAAAAAgAMAAAAAAAGAAAAAAATAAAAAAAAAAAAAAACAAAAAAAMABEAAAAMAAEAAAADAAAABQAAAAQAAAAJAAAAAAAFAAQABQAAAAAAAAAAAAAAAAAjAAAAAAAiAAYAAAAAAAAAAAAAAAAAAgAAAAAAAgALABEABwABAAMABAADAAEACQAVAAEAAwAOAAAAAAAAAAMACQAWAAAAFgAAABYAAAAMAAkAFAAUAAAAAAAUAAAAAwAGAAcAAAAAAAEAAwAAAAAAHQAJAAEAAgAAAAAAAgABAAwACQAAABEAFQAAAAYABwAGAAcAAAAAAAAAAQAAAAEAAQARABUAAAAAAAAAAwAAAAMAAgAEAAIAAQACAAQAAAAAACIACQAiAAkAIgAJACAAIQAAAAMAAQAGAAcABgAHAAYABwAGAAcABgAHAAYABwAGAAcABgAHAAYABwAGAAcABgAHAAYABwAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIAAQACAAEAAgABAAIABAACAAEACgAFAAoABQAAAAUAAAAFAAAABQAAAAUAAAAFAAwACQAMAAkADAAJAAAACwAAACAAIQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAGAAcAAAABAAAAAAACAAQAAAAAAAAABQAAAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAADAAIAAAAAAAAAAAAQAA4ACwAAAAoAHQAJAB0ACQAWAAAAEwAPAAAADQAAAAAAAAAIABcAAAANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXABwAAAAXAAAAAAAAAAAAAAAAAAAAAAANAAAAAAAAAAAAAAAAAAgAAAAAAAgAGAAcAAAAAAAIABcAAQAAAAoBYgKSAARERkxUABpjeXJsABpncmVrABpsYXRuAEgABAAAAAD//wASAAAAAQACAAMABAAIAAwADQAOAA8AEAARABIAEwAUABUAFgAXAC4AB0FaRSAA5ENSVCAA5EZSQSAAWk1PTCAAtk5BViAAiFJPTSAAtlRSSyAA5AAA//8AEwAAAAEAAgADAAQABwAIAAwADQAOAA8AEAARABIAEwAUABUAFgAXAAD//wAUAAAAAQACAAMABAAGAAgACQAMAA0ADgAPABAAEQASABMAFAAVABYAFwAA//8AFAAAAAEAAgADAAQABgAIAAsADAANAA4ADwAQABEAEgATABQAFQAWABcAAP//ABQAAAABAAIAAwAEAAYACAAKAAwADQAOAA8AEAARABIAEwAUABUAFgAXAAD//wATAAAAAQACAAMABAAFAAgADAANAA4ADwAQABEAEgATABQAFQAWABcAGGMyc2MAkmNjbXAAmGRsaWcAoGRub20ApmZyYWMArGxpZ2EAtmxpZ2EAvGxpZ2EAyGxudW0A0GxvY2wA1mxvY2wA3GxvY2wA4m51bXIA6G9udW0A7nBudW0A9HNtY3AA+nNzMDEBAHNzMDIBBnNzMDMBDHNzMDQBEnNzMDUBGHNzMDYBHnNzMDcBJHRudW0BKgAAAAEAAAAAAAIAAgAEAAAAAQAKAAAAAQAYAAAAAwAWABcAGQAAAAEACQAAAAQACAAJAAgACQAAAAIACAAJAAAAAQAVAAAAAQAHAAAAAQAFAAAAAQAGAAAAAQAZAAAAAQASAAAAAQATAAAAAQABAAAAAQALAAAAAQAMAAAAAQANAAAAAQAOAAAAAQAPAAAAAQAQAAAAAQARAAAAAQAUABoANgQwB+4IoAjKD24PhA+uD8IP5hAQEEwQYBB0EIgQmhC0EPYRFBFmEawSDhJsEoASsBLSAAEAAAABAAgAAgH6APoB5wJxAdEB0AHPAc4BzQHMAcsBygHJAcgCMwIyAjECMAIoAeYB5QHkAeMB4gHhAeAB3wHeAd0B3AHbAdoB2QHYAdcB1gHVAdQB0wHSAegB6QJzAnUCdAJ2AnICdwJSAeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+AgACAQT+AgICAwIEAgUCBgIHAggCCQIKAgsCOwINAg4CDwIQBPgCEQITAhQCFQIWAhcCGAIZAhsCHAIeAh0DLwMwAzEDMgMzAzQDNQM2AzcDOAM5AzoDOwM8Az0DPgM/A0ADQQNCA0MDRANFA0YDRwNIA0kDSgNLA0wDTQNOA08DUANRA1IDUwNUA1UDVgNXA1gDWQNaA1sDXANdA14DXwNgA2EDYgNjBP8DZANlA2YDZwNoA2kDagNrA2wDbQNuA28DcANxA3IDcwN0A3UFAgN2A3cDeQN4A3oDewN8A30DfgN/A4ADgQOCA4MDhAOFBQAFAQTLBMwEzQTOBM8E0ATRBNIE0wTUBNUE1gTXBNgE2QTaBNsE3ATdBN4E3wTgBOEE4gTjBOQE5QTmBOcB/wToBOkE6gTrBOwE7QTuBO8E8ATxBPIE8wT0BPUE9gUDBQQFBQUGBPcE+QT6BPwCGgT9BPsCDAISBQsFDAABAPoACAAKABQAFQAWABcAGAAZABoAGwAcAB0AJQAmACcAKAApACoAKwAsAC0ALgAvADAAMQAyADMANAA1ADYANwA4ADkAOgA7ADwAPQA+AGUAZwCBAIMAhACMAI8AkQCTALEAsgCzALQAtQC2ALcAuAC5ALoA0gDTANQA1QDWANcA2ADZANoA2wDcAN0A3gDfAOAA4QDiAOMA5ADlAOYA5wDoAOkBLwEzATUBNwE5ATsBQQFDAUUBSQFLAUwBWAFZAZcBnQGiAaUCegJ7An0CfwKAAoECggKDAoQChQKGAocCiAKJAooCiwKMAo0CjgKPApACkQKSApMClAKVApYClwKYApkCtgK4AroCvAK+AsACwgLEAsYCyALKAswCzgLQAtIC1ALWAtgC2gLcAt4C4ALiAuMC5QLnAukC6wLtAu8C8QLzAvUC+AL6AvwC/gMAAwIDBAMGAwgDCgMMAw4DEAMSAxQDFgMYAxoDHAMeAyADIgMkAyUDJwMpAysDLQOGA4cDiAOJA4oDiwOMA44DjwOQA5EDkgOTA5QDlQOWA5cDmAOZA5oDmwOcA50DrQOuA68DsAOxA7IDswO0A7UDtgO3A7gDuQO6A7sDvAO9A74DvwPAA8EDwgPTA9UD1wPZA+4D8APyBAcEDQQTBH0EggSGBQcFCQABAAAAAQAIAAIB3ADrAnECMwIyAjECMAIoAeYB5QHkAeMB4gHhAeAB3wHeAd0B3AHbAdoB2QHYAdcB1gHVAdQB0wHSAmQCcwMwAnUCdAMvAeMCcgJ3AlIE0gTTAeoB6wTUBNUE1gHsBNcB7QHuAe8E3AHwAfAE3QTeAfEB8gHzAfoE6wTsAfsB/AH9Af4B/wIABO8E8ATyBPUE/gICAgMCBAIFAgYCBwIIAgkCCgILAfQB9QH2AfcB+AH5AjsCDQIOAg8CEAT4AhECEwIUAhUCFwIZAnYDMQMyAzMDNAM1AzYDNwM4AzkDOgM7AzwDPQM+Az8DQANBA0IDQwNEA0UDRgNHA0gDSQNKA0sDTAOCA00DTgNPA1ADUQNSA1MDVANVA1YDVwNYA1kDWgNbA1wDXQNeA18DYANhA2IE/wNkA2UDZgNnA2gDaQNqA2sDbANtA24DbwNwA3EDcgNzA3QDdQUCA3YDdwN5A3gDegN7A3wDfQN+A38DgAOBA4MDhAOFBQAFAQTLBMwEzQTOBNgE2wTZBNoE3wTgBOEEzwTQBNEE6gTtBO4E8QTzBPQCAQT2BOIE4wTkBOUE5gTnBOgE6QUDBQQFBQUGBPcE+QT6AhgE/AIaBP0E+wIWAgwCEgULBQwAAQDrAAoARQBGAEcASABJAEoASwBMAE0ATgBPAFAAUQBSAFMAVABVAFYAVwBYAFkAWgBbAFwAXQBeAIUAhgCHAIkAigCLAI0AkACSAJQAuwC8AL0AvgC/AMAAwQDCAMMAxADFAMYAxwDIAMkAygDLAMwAzQDOAOoA6wDsAO0A7gDvAPAA8QDyAPMA9AD1APYA9wD4APkA+gD7APwA/QD+AP8BAAEBAQIBAwEEAQUBBgEHATABNAE2ATgBOgE8AUIBRAFGAUoBTQFaAnwCfgKaApsCnAKdAp4CnwKgAqECogKjAqQCpQKmAqcCqAKpAqoCqwKsAq0CrgKvArACsQKyArMCtAK1ArcCuQK7Ar0CvwLBAsMCxQLHAskCywLNAs8C0QLTAtUC1wLZAtsC3QLfAuEC5ALmAugC6gLsAu4C8ALyAvQC9gL5AvsC/QL/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';

var callAddFont = function callAddFont() {
  this.addFileToVFS('Roboto-Regular-normal.ttf', font);
  this.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal');
};

_jspdf.jsPDF.API.events.push(['addFonts', callAddFont]);
},{"jspdf":"../node_modules/jspdf/dist/jspdf.es.min.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57853" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
},{}],"../node_modules/parcel/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../node_modules/parcel/src/builtins/bundle-loader.js");b.register("js",require("../node_modules/parcel/src/builtins/loaders/browser/js-loader.js"));
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js",0,"../src/Roboto-Regular-normal.js"], null)
//# sourceMappingURL=/Roboto-Regular-normal.9e30f63e.js.map