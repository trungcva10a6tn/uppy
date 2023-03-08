"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../node_modules/namespace-emitter/index.js
  var require_namespace_emitter = __commonJS({
    "../node_modules/namespace-emitter/index.js"(exports, module) {
      module.exports = function createNamespaceEmitter() {
        var emitter = {};
        var _fns = emitter._fns = {};
        emitter.emit = function emit(event, arg1, arg2, arg3, arg4, arg5, arg6) {
          var toEmit = getListeners(event);
          if (toEmit.length) {
            emitAll(event, toEmit, [arg1, arg2, arg3, arg4, arg5, arg6]);
          }
        };
        emitter.on = function on(event, fn) {
          if (!_fns[event]) {
            _fns[event] = [];
          }
          _fns[event].push(fn);
        };
        emitter.once = function once(event, fn) {
          function one() {
            fn.apply(this, arguments);
            emitter.off(event, one);
          }
          this.on(event, one);
        };
        emitter.off = function off(event, fn) {
          var keep = [];
          if (event && fn) {
            var fns = this._fns[event];
            var i4 = 0;
            var l4 = fns ? fns.length : 0;
            for (i4; i4 < l4; i4++) {
              if (fns[i4] !== fn) {
                keep.push(fns[i4]);
              }
            }
          }
          keep.length ? this._fns[event] = keep : delete this._fns[event];
        };
        function getListeners(e4) {
          var out = _fns[e4] ? _fns[e4] : [];
          var idx = e4.indexOf(":");
          var args = idx === -1 ? [e4] : [e4.substring(0, idx), e4.substring(idx + 1)];
          var keys = Object.keys(_fns);
          var i4 = 0;
          var l4 = keys.length;
          for (i4; i4 < l4; i4++) {
            var key = keys[i4];
            if (key === "*") {
              out = out.concat(_fns[key]);
            }
            if (args.length === 2 && args[0] === key) {
              out = out.concat(_fns[key]);
              break;
            }
          }
          return out;
        }
        function emitAll(e4, fns, args) {
          var i4 = 0;
          var l4 = fns.length;
          for (i4; i4 < l4; i4++) {
            if (!fns[i4])
              break;
            fns[i4].event = e4;
            fns[i4].apply(fns[i4], args);
          }
        }
        return emitter;
      };
    }
  });

  // ../node_modules/lodash.throttle/index.js
  var require_lodash = __commonJS({
    "../node_modules/lodash.throttle/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var objectProto = Object.prototype;
      var objectToString = objectProto.toString;
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      var now = function() {
        return root.Date.now();
      };
      function debounce3(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result3 = wait - timeSinceLastCall;
          return maxing ? nativeMin(result3, maxWait - timeSinceLastInvoke) : result3;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result2;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function throttle5(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce3(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = throttle5;
    }
  });

  // ../node_modules/@transloadit/prettier-bytes/prettierBytes.js
  var require_prettierBytes = __commonJS({
    "../node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
      module.exports = function prettierBytes5(num) {
        if (typeof num !== "number" || isNaN(num)) {
          throw new TypeError(`Expected a number, got ${typeof num}`);
        }
        const neg = num < 0;
        const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if (neg) {
          num = -num;
        }
        if (num < 1) {
          return `${(neg ? "-" : "") + num} B`;
        }
        const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
        num = Number(num / Math.pow(1024, exponent));
        const unit = units[exponent];
        if (num >= 10 || num % 1 === 0) {
          return `${(neg ? "-" : "") + num.toFixed(0)} ${unit}`;
        }
        return `${(neg ? "-" : "") + num.toFixed(1)} ${unit}`;
      };
    }
  });

  // ../node_modules/wildcard/index.js
  var require_wildcard = __commonJS({
    "../node_modules/wildcard/index.js"(exports, module) {
      "use strict";
      function WildcardMatcher(text, separator2) {
        this.text = text = text || "";
        this.hasWild = ~text.indexOf("*");
        this.separator = separator2;
        this.parts = text.split(separator2);
      }
      WildcardMatcher.prototype.match = function(input) {
        var matches = true;
        var parts = this.parts;
        var ii;
        var partsCount = parts.length;
        var testParts;
        if (typeof input == "string" || input instanceof String) {
          if (!this.hasWild && this.text != input) {
            matches = false;
          } else {
            testParts = (input || "").split(this.separator);
            for (ii = 0; matches && ii < partsCount; ii++) {
              if (parts[ii] === "*") {
                continue;
              } else if (ii < testParts.length) {
                matches = parts[ii] === testParts[ii];
              } else {
                matches = false;
              }
            }
            matches = matches && testParts;
          }
        } else if (typeof input.splice == "function") {
          matches = [];
          for (ii = input.length; ii--; ) {
            if (this.match(input[ii])) {
              matches[matches.length] = input[ii];
            }
          }
        } else if (typeof input == "object") {
          matches = {};
          for (var key in input) {
            if (this.match(key)) {
              matches[key] = input[key];
            }
          }
        }
        return matches;
      };
      module.exports = function(text, test, separator2) {
        var matcher = new WildcardMatcher(text, separator2 || /[\/\.]/);
        if (typeof test != "undefined") {
          return matcher.match(test);
        }
        return matcher;
      };
    }
  });

  // ../node_modules/mime-match/index.js
  var require_mime_match = __commonJS({
    "../node_modules/mime-match/index.js"(exports, module) {
      var wildcard = require_wildcard();
      var reMimePartSplit = /[\/\+\.]/;
      module.exports = function(target, pattern) {
        function test(pattern2) {
          var result2 = wildcard(pattern2, target, reMimePartSplit);
          return result2 && result2.length >= 2;
        }
        return pattern ? test(pattern.split(";")[0]) : test;
      };
    }
  });

  // ../node_modules/classnames/index.js
  var require_classnames = __commonJS({
    "../node_modules/classnames/index.js"(exports, module) {
      (function() {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        function classNames12() {
          var classes = [];
          for (var i4 = 0; i4 < arguments.length; i4++) {
            var arg = arguments[i4];
            if (!arg)
              continue;
            var argType = typeof arg;
            if (argType === "string" || argType === "number") {
              classes.push(arg);
            } else if (Array.isArray(arg)) {
              if (arg.length) {
                var inner = classNames12.apply(null, arg);
                if (inner) {
                  classes.push(inner);
                }
              }
            } else if (argType === "object") {
              if (arg.toString === Object.prototype.toString) {
                for (var key in arg) {
                  if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                  }
                }
              } else {
                classes.push(arg.toString());
              }
            }
          }
          return classes.join(" ");
        }
        if (typeof module !== "undefined" && module.exports) {
          classNames12.default = classNames12;
          module.exports = classNames12;
        } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define("classnames", [], function() {
            return classNames12;
          });
        } else {
          window.classNames = classNames12;
        }
      })();
    }
  });

  // ../node_modules/lodash.debounce/index.js
  var require_lodash2 = __commonJS({
    "../node_modules/lodash.debounce/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var objectProto = Object.prototype;
      var objectToString = objectProto.toString;
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      var now = function() {
        return root.Date.now();
      };
      function debounce3(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result3 = wait - timeSinceLastCall;
          return maxing ? nativeMin(result3, maxWait - timeSinceLastInvoke) : result3;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result2;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = debounce3;
    }
  });

  // ../node_modules/is-shallow-equal/index.js
  var require_is_shallow_equal = __commonJS({
    "../node_modules/is-shallow-equal/index.js"(exports, module) {
      module.exports = function isShallowEqual(a4, b4) {
        if (a4 === b4)
          return true;
        for (var i4 in a4)
          if (!(i4 in b4))
            return false;
        for (var i4 in b4)
          if (a4[i4] !== b4[i4])
            return false;
        return true;
      };
    }
  });

  // ../packages/@uppy/dashboard/node_modules/@transloadit/prettier-bytes/prettierBytes.js
  var require_prettierBytes2 = __commonJS({
    "../packages/@uppy/dashboard/node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
      module.exports = function prettierBytes5(num) {
        if (typeof num !== "number" || isNaN(num)) {
          throw new TypeError("Expected a number, got " + typeof num);
        }
        var neg = num < 0;
        var units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if (neg) {
          num = -num;
        }
        if (num < 1) {
          return (neg ? "-" : "") + num + " B";
        }
        var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
        num = Number(num / Math.pow(1024, exponent));
        var unit = units[exponent];
        if (num >= 10 || num % 1 === 0) {
          return (neg ? "-" : "") + num.toFixed(0) + " " + unit;
        } else {
          return (neg ? "-" : "") + num.toFixed(1) + " " + unit;
        }
      };
    }
  });

  // ../node_modules/cropperjs/dist/cropper.js
  var require_cropper = __commonJS({
    "../node_modules/cropperjs/dist/cropper.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = global2 || self, global2.Cropper = factory());
      })(exports, function() {
        "use strict";
        function _typeof3(obj) {
          "@babel/helpers - typeof";
          if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof3 = function(obj2) {
              return typeof obj2;
            };
          } else {
            _typeof3 = function(obj2) {
              return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            };
          }
          return _typeof3(obj);
        }
        function _classCallCheck10(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function _defineProperties10(target, props) {
          for (var i4 = 0; i4 < props.length; i4++) {
            var descriptor = props[i4];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass10(Constructor, protoProps, staticProps) {
          if (protoProps)
            _defineProperties10(Constructor.prototype, protoProps);
          if (staticProps)
            _defineProperties10(Constructor, staticProps);
          return Constructor;
        }
        function _defineProperty3(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function ownKeys3(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread22(target) {
          for (var i4 = 1; i4 < arguments.length; i4++) {
            var source = arguments[i4] != null ? arguments[i4] : {};
            if (i4 % 2) {
              ownKeys3(Object(source), true).forEach(function(key) {
                _defineProperty3(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys3(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }
        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread();
        }
        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr))
            return _arrayLikeToArray2(arr);
        }
        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
            return Array.from(iter);
        }
        function _unsupportedIterableToArray2(o4, minLen) {
          if (!o4)
            return;
          if (typeof o4 === "string")
            return _arrayLikeToArray2(o4, minLen);
          var n3 = Object.prototype.toString.call(o4).slice(8, -1);
          if (n3 === "Object" && o4.constructor)
            n3 = o4.constructor.name;
          if (n3 === "Map" || n3 === "Set")
            return Array.from(o4);
          if (n3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3))
            return _arrayLikeToArray2(o4, minLen);
        }
        function _arrayLikeToArray2(arr, len2) {
          if (len2 == null || len2 > arr.length)
            len2 = arr.length;
          for (var i4 = 0, arr2 = new Array(len2); i4 < len2; i4++)
            arr2[i4] = arr[i4];
          return arr2;
        }
        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var IS_BROWSER = typeof window !== "undefined" && typeof window.document !== "undefined";
        var WINDOW = IS_BROWSER ? window : {};
        var IS_TOUCH_DEVICE = IS_BROWSER && WINDOW.document.documentElement ? "ontouchstart" in WINDOW.document.documentElement : false;
        var HAS_POINTER_EVENT = IS_BROWSER ? "PointerEvent" in WINDOW : false;
        var NAMESPACE = "cropper";
        var ACTION_ALL = "all";
        var ACTION_CROP = "crop";
        var ACTION_MOVE = "move";
        var ACTION_ZOOM = "zoom";
        var ACTION_EAST = "e";
        var ACTION_WEST = "w";
        var ACTION_SOUTH = "s";
        var ACTION_NORTH = "n";
        var ACTION_NORTH_EAST = "ne";
        var ACTION_NORTH_WEST = "nw";
        var ACTION_SOUTH_EAST = "se";
        var ACTION_SOUTH_WEST = "sw";
        var CLASS_CROP = "".concat(NAMESPACE, "-crop");
        var CLASS_DISABLED = "".concat(NAMESPACE, "-disabled");
        var CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden");
        var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
        var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
        var CLASS_MODAL = "".concat(NAMESPACE, "-modal");
        var CLASS_MOVE = "".concat(NAMESPACE, "-move");
        var DATA_ACTION = "".concat(NAMESPACE, "Action");
        var DATA_PREVIEW = "".concat(NAMESPACE, "Preview");
        var DRAG_MODE_CROP = "crop";
        var DRAG_MODE_MOVE = "move";
        var DRAG_MODE_NONE = "none";
        var EVENT_CROP = "crop";
        var EVENT_CROP_END = "cropend";
        var EVENT_CROP_MOVE = "cropmove";
        var EVENT_CROP_START = "cropstart";
        var EVENT_DBLCLICK = "dblclick";
        var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? "touchstart" : "mousedown";
        var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? "touchmove" : "mousemove";
        var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? "touchend touchcancel" : "mouseup";
        var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? "pointerdown" : EVENT_TOUCH_START;
        var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? "pointermove" : EVENT_TOUCH_MOVE;
        var EVENT_POINTER_UP = HAS_POINTER_EVENT ? "pointerup pointercancel" : EVENT_TOUCH_END;
        var EVENT_READY = "ready";
        var EVENT_RESIZE = "resize";
        var EVENT_WHEEL = "wheel";
        var EVENT_ZOOM = "zoom";
        var MIME_TYPE_JPEG = "image/jpeg";
        var REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
        var REGEXP_DATA_URL = /^data:/;
        var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
        var REGEXP_TAG_NAME = /^img|canvas$/i;
        var DEFAULTS = {
          viewMode: 0,
          dragMode: DRAG_MODE_CROP,
          initialAspectRatio: NaN,
          aspectRatio: NaN,
          data: null,
          preview: "",
          responsive: true,
          restore: true,
          checkCrossOrigin: true,
          checkOrientation: true,
          modal: true,
          guides: true,
          center: true,
          highlight: true,
          background: true,
          autoCrop: true,
          autoCropArea: 0.8,
          movable: true,
          rotatable: true,
          scalable: true,
          zoomable: true,
          zoomOnTouch: true,
          zoomOnWheel: true,
          wheelZoomRatio: 0.1,
          cropBoxMovable: true,
          cropBoxResizable: true,
          toggleDragModeOnDblclick: true,
          minCanvasWidth: 0,
          minCanvasHeight: 0,
          minCropBoxWidth: 0,
          minCropBoxHeight: 0,
          minContainerWidth: 200,
          minContainerHeight: 100,
          ready: null,
          cropstart: null,
          cropmove: null,
          cropend: null,
          crop: null,
          zoom: null
        };
        var TEMPLATE = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>';
        var isNaN2 = Number.isNaN || WINDOW.isNaN;
        function isNumber(value) {
          return typeof value === "number" && !isNaN2(value);
        }
        var isPositiveNumber = function isPositiveNumber2(value) {
          return value > 0 && value < Infinity;
        };
        function isUndefined(value) {
          return typeof value === "undefined";
        }
        function isObject(value) {
          return _typeof3(value) === "object" && value !== null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function isPlainObject(value) {
          if (!isObject(value)) {
            return false;
          }
          try {
            var _constructor = value.constructor;
            var prototype = _constructor.prototype;
            return _constructor && prototype && hasOwnProperty.call(prototype, "isPrototypeOf");
          } catch (error) {
            return false;
          }
        }
        function isFunction2(value) {
          return typeof value === "function";
        }
        var slice = Array.prototype.slice;
        function toArray(value) {
          return Array.from ? Array.from(value) : slice.call(value);
        }
        function forEach(data, callback) {
          if (data && isFunction2(callback)) {
            if (Array.isArray(data) || isNumber(data.length)) {
              toArray(data).forEach(function(value, key) {
                callback.call(data, value, key, data);
              });
            } else if (isObject(data)) {
              Object.keys(data).forEach(function(key) {
                callback.call(data, data[key], key, data);
              });
            }
          }
          return data;
        }
        var assign2 = Object.assign || function assign3(target) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          if (isObject(target) && args.length > 0) {
            args.forEach(function(arg) {
              if (isObject(arg)) {
                Object.keys(arg).forEach(function(key) {
                  target[key] = arg[key];
                });
              }
            });
          }
          return target;
        };
        var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
        function normalizeDecimalNumber(value) {
          var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
          return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
        }
        var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;
        function setStyle(element, styles) {
          var style = element.style;
          forEach(styles, function(value, property) {
            if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
              value = "".concat(value, "px");
            }
            style[property] = value;
          });
        }
        function hasClass(element, value) {
          return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
        }
        function addClass(element, value) {
          if (!value) {
            return;
          }
          if (isNumber(element.length)) {
            forEach(element, function(elem) {
              addClass(elem, value);
            });
            return;
          }
          if (element.classList) {
            element.classList.add(value);
            return;
          }
          var className = element.className.trim();
          if (!className) {
            element.className = value;
          } else if (className.indexOf(value) < 0) {
            element.className = "".concat(className, " ").concat(value);
          }
        }
        function removeClass(element, value) {
          if (!value) {
            return;
          }
          if (isNumber(element.length)) {
            forEach(element, function(elem) {
              removeClass(elem, value);
            });
            return;
          }
          if (element.classList) {
            element.classList.remove(value);
            return;
          }
          if (element.className.indexOf(value) >= 0) {
            element.className = element.className.replace(value, "");
          }
        }
        function toggleClass(element, value, added) {
          if (!value) {
            return;
          }
          if (isNumber(element.length)) {
            forEach(element, function(elem) {
              toggleClass(elem, value, added);
            });
            return;
          }
          if (added) {
            addClass(element, value);
          } else {
            removeClass(element, value);
          }
        }
        var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;
        function toParamCase(value) {
          return value.replace(REGEXP_CAMEL_CASE, "$1-$2").toLowerCase();
        }
        function getData(element, name) {
          if (isObject(element[name])) {
            return element[name];
          }
          if (element.dataset) {
            return element.dataset[name];
          }
          return element.getAttribute("data-".concat(toParamCase(name)));
        }
        function setData(element, name, data) {
          if (isObject(data)) {
            element[name] = data;
          } else if (element.dataset) {
            element.dataset[name] = data;
          } else {
            element.setAttribute("data-".concat(toParamCase(name)), data);
          }
        }
        function removeData(element, name) {
          if (isObject(element[name])) {
            try {
              delete element[name];
            } catch (error) {
              element[name] = void 0;
            }
          } else if (element.dataset) {
            try {
              delete element.dataset[name];
            } catch (error) {
              element.dataset[name] = void 0;
            }
          } else {
            element.removeAttribute("data-".concat(toParamCase(name)));
          }
        }
        var REGEXP_SPACES = /\s\s*/;
        var onceSupported = function() {
          var supported = false;
          if (IS_BROWSER) {
            var once = false;
            var listener = function listener2() {
            };
            var options = Object.defineProperty({}, "once", {
              get: function get() {
                supported = true;
                return once;
              },
              set: function set(value) {
                once = value;
              }
            });
            WINDOW.addEventListener("test", listener, options);
            WINDOW.removeEventListener("test", listener, options);
          }
          return supported;
        }();
        function removeListener(element, type, listener) {
          var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          var handler = listener;
          type.trim().split(REGEXP_SPACES).forEach(function(event) {
            if (!onceSupported) {
              var listeners = element.listeners;
              if (listeners && listeners[event] && listeners[event][listener]) {
                handler = listeners[event][listener];
                delete listeners[event][listener];
                if (Object.keys(listeners[event]).length === 0) {
                  delete listeners[event];
                }
                if (Object.keys(listeners).length === 0) {
                  delete element.listeners;
                }
              }
            }
            element.removeEventListener(event, handler, options);
          });
        }
        function addListener(element, type, listener) {
          var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          var _handler = listener;
          type.trim().split(REGEXP_SPACES).forEach(function(event) {
            if (options.once && !onceSupported) {
              var _element$listeners = element.listeners, listeners = _element$listeners === void 0 ? {} : _element$listeners;
              _handler = function handler() {
                delete listeners[event][listener];
                element.removeEventListener(event, _handler, options);
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = arguments[_key2];
                }
                listener.apply(element, args);
              };
              if (!listeners[event]) {
                listeners[event] = {};
              }
              if (listeners[event][listener]) {
                element.removeEventListener(event, listeners[event][listener], options);
              }
              listeners[event][listener] = _handler;
              element.listeners = listeners;
            }
            element.addEventListener(event, _handler, options);
          });
        }
        function dispatchEvent(element, type, data) {
          var event;
          if (isFunction2(Event) && isFunction2(CustomEvent)) {
            event = new CustomEvent(type, {
              detail: data,
              bubbles: true,
              cancelable: true
            });
          } else {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(type, true, true, data);
          }
          return element.dispatchEvent(event);
        }
        function getOffset(element) {
          var box = element.getBoundingClientRect();
          return {
            left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
            top: box.top + (window.pageYOffset - document.documentElement.clientTop)
          };
        }
        var location2 = WINDOW.location;
        var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
        function isCrossOriginURL(url) {
          var parts = url.match(REGEXP_ORIGINS);
          return parts !== null && (parts[1] !== location2.protocol || parts[2] !== location2.hostname || parts[3] !== location2.port);
        }
        function addTimestamp(url) {
          var timestamp = "timestamp=".concat(new Date().getTime());
          return url + (url.indexOf("?") === -1 ? "?" : "&") + timestamp;
        }
        function getTransforms(_ref) {
          var rotate = _ref.rotate, scaleX = _ref.scaleX, scaleY = _ref.scaleY, translateX = _ref.translateX, translateY = _ref.translateY;
          var values = [];
          if (isNumber(translateX) && translateX !== 0) {
            values.push("translateX(".concat(translateX, "px)"));
          }
          if (isNumber(translateY) && translateY !== 0) {
            values.push("translateY(".concat(translateY, "px)"));
          }
          if (isNumber(rotate) && rotate !== 0) {
            values.push("rotate(".concat(rotate, "deg)"));
          }
          if (isNumber(scaleX) && scaleX !== 1) {
            values.push("scaleX(".concat(scaleX, ")"));
          }
          if (isNumber(scaleY) && scaleY !== 1) {
            values.push("scaleY(".concat(scaleY, ")"));
          }
          var transform = values.length ? values.join(" ") : "none";
          return {
            WebkitTransform: transform,
            msTransform: transform,
            transform
          };
        }
        function getMaxZoomRatio(pointers) {
          var pointers2 = _objectSpread22({}, pointers);
          var ratios = [];
          forEach(pointers, function(pointer, pointerId) {
            delete pointers2[pointerId];
            forEach(pointers2, function(pointer2) {
              var x1 = Math.abs(pointer.startX - pointer2.startX);
              var y1 = Math.abs(pointer.startY - pointer2.startY);
              var x22 = Math.abs(pointer.endX - pointer2.endX);
              var y22 = Math.abs(pointer.endY - pointer2.endY);
              var z1 = Math.sqrt(x1 * x1 + y1 * y1);
              var z22 = Math.sqrt(x22 * x22 + y22 * y22);
              var ratio = (z22 - z1) / z1;
              ratios.push(ratio);
            });
          });
          ratios.sort(function(a4, b4) {
            return Math.abs(a4) < Math.abs(b4);
          });
          return ratios[0];
        }
        function getPointer(_ref2, endOnly) {
          var pageX = _ref2.pageX, pageY = _ref2.pageY;
          var end = {
            endX: pageX,
            endY: pageY
          };
          return endOnly ? end : _objectSpread22({
            startX: pageX,
            startY: pageY
          }, end);
        }
        function getPointersCenter(pointers) {
          var pageX = 0;
          var pageY = 0;
          var count = 0;
          forEach(pointers, function(_ref3) {
            var startX = _ref3.startX, startY = _ref3.startY;
            pageX += startX;
            pageY += startY;
            count += 1;
          });
          pageX /= count;
          pageY /= count;
          return {
            pageX,
            pageY
          };
        }
        function getAdjustedSizes(_ref4) {
          var aspectRatio = _ref4.aspectRatio, height = _ref4.height, width = _ref4.width;
          var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain";
          var isValidWidth = isPositiveNumber(width);
          var isValidHeight = isPositiveNumber(height);
          if (isValidWidth && isValidHeight) {
            var adjustedWidth = height * aspectRatio;
            if (type === "contain" && adjustedWidth > width || type === "cover" && adjustedWidth < width) {
              height = width / aspectRatio;
            } else {
              width = height * aspectRatio;
            }
          } else if (isValidWidth) {
            height = width / aspectRatio;
          } else if (isValidHeight) {
            width = height * aspectRatio;
          }
          return {
            width,
            height
          };
        }
        function getRotatedSizes(_ref5) {
          var width = _ref5.width, height = _ref5.height, degree = _ref5.degree;
          degree = Math.abs(degree) % 180;
          if (degree === 90) {
            return {
              width: height,
              height: width
            };
          }
          var arc = degree % 90 * Math.PI / 180;
          var sinArc = Math.sin(arc);
          var cosArc = Math.cos(arc);
          var newWidth = width * cosArc + height * sinArc;
          var newHeight = width * sinArc + height * cosArc;
          return degree > 90 ? {
            width: newHeight,
            height: newWidth
          } : {
            width: newWidth,
            height: newHeight
          };
        }
        function getSourceCanvas(image, _ref6, _ref7, _ref8) {
          var imageAspectRatio = _ref6.aspectRatio, imageNaturalWidth = _ref6.naturalWidth, imageNaturalHeight = _ref6.naturalHeight, _ref6$rotate = _ref6.rotate, rotate = _ref6$rotate === void 0 ? 0 : _ref6$rotate, _ref6$scaleX = _ref6.scaleX, scaleX = _ref6$scaleX === void 0 ? 1 : _ref6$scaleX, _ref6$scaleY = _ref6.scaleY, scaleY = _ref6$scaleY === void 0 ? 1 : _ref6$scaleY;
          var aspectRatio = _ref7.aspectRatio, naturalWidth = _ref7.naturalWidth, naturalHeight = _ref7.naturalHeight;
          var _ref8$fillColor = _ref8.fillColor, fillColor = _ref8$fillColor === void 0 ? "transparent" : _ref8$fillColor, _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled, imageSmoothingEnabled = _ref8$imageSmoothingE === void 0 ? true : _ref8$imageSmoothingE, _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality, imageSmoothingQuality = _ref8$imageSmoothingQ === void 0 ? "low" : _ref8$imageSmoothingQ, _ref8$maxWidth = _ref8.maxWidth, maxWidth = _ref8$maxWidth === void 0 ? Infinity : _ref8$maxWidth, _ref8$maxHeight = _ref8.maxHeight, maxHeight = _ref8$maxHeight === void 0 ? Infinity : _ref8$maxHeight, _ref8$minWidth = _ref8.minWidth, minWidth = _ref8$minWidth === void 0 ? 0 : _ref8$minWidth, _ref8$minHeight = _ref8.minHeight, minHeight = _ref8$minHeight === void 0 ? 0 : _ref8$minHeight;
          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");
          var maxSizes = getAdjustedSizes({
            aspectRatio,
            width: maxWidth,
            height: maxHeight
          });
          var minSizes = getAdjustedSizes({
            aspectRatio,
            width: minWidth,
            height: minHeight
          }, "cover");
          var width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
          var height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight));
          var destMaxSizes = getAdjustedSizes({
            aspectRatio: imageAspectRatio,
            width: maxWidth,
            height: maxHeight
          });
          var destMinSizes = getAdjustedSizes({
            aspectRatio: imageAspectRatio,
            width: minWidth,
            height: minHeight
          }, "cover");
          var destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth));
          var destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight));
          var params = [-destWidth / 2, -destHeight / 2, destWidth, destHeight];
          canvas.width = normalizeDecimalNumber(width);
          canvas.height = normalizeDecimalNumber(height);
          context.fillStyle = fillColor;
          context.fillRect(0, 0, width, height);
          context.save();
          context.translate(width / 2, height / 2);
          context.rotate(rotate * Math.PI / 180);
          context.scale(scaleX, scaleY);
          context.imageSmoothingEnabled = imageSmoothingEnabled;
          context.imageSmoothingQuality = imageSmoothingQuality;
          context.drawImage.apply(context, [image].concat(_toConsumableArray(params.map(function(param) {
            return Math.floor(normalizeDecimalNumber(param));
          }))));
          context.restore();
          return canvas;
        }
        var fromCharCode = String.fromCharCode;
        function getStringFromCharCode(dataView, start, length) {
          var str = "";
          length += start;
          for (var i4 = start; i4 < length; i4 += 1) {
            str += fromCharCode(dataView.getUint8(i4));
          }
          return str;
        }
        var REGEXP_DATA_URL_HEAD = /^data:.*,/;
        function dataURLToArrayBuffer(dataURL) {
          var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, "");
          var binary = atob(base64);
          var arrayBuffer = new ArrayBuffer(binary.length);
          var uint8 = new Uint8Array(arrayBuffer);
          forEach(uint8, function(value, i4) {
            uint8[i4] = binary.charCodeAt(i4);
          });
          return arrayBuffer;
        }
        function arrayBufferToDataURL(arrayBuffer, mimeType) {
          var chunks2 = [];
          var chunkSize = 8192;
          var uint8 = new Uint8Array(arrayBuffer);
          while (uint8.length > 0) {
            chunks2.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
            uint8 = uint8.subarray(chunkSize);
          }
          return "data:".concat(mimeType, ";base64,").concat(btoa(chunks2.join("")));
        }
        function resetAndGetOrientation(arrayBuffer) {
          var dataView = new DataView(arrayBuffer);
          var orientation;
          try {
            var littleEndian;
            var app1Start;
            var ifdStart;
            if (dataView.getUint8(0) === 255 && dataView.getUint8(1) === 216) {
              var length = dataView.byteLength;
              var offset = 2;
              while (offset + 1 < length) {
                if (dataView.getUint8(offset) === 255 && dataView.getUint8(offset + 1) === 225) {
                  app1Start = offset;
                  break;
                }
                offset += 1;
              }
            }
            if (app1Start) {
              var exifIDCode = app1Start + 4;
              var tiffOffset = app1Start + 10;
              if (getStringFromCharCode(dataView, exifIDCode, 4) === "Exif") {
                var endianness = dataView.getUint16(tiffOffset);
                littleEndian = endianness === 18761;
                if (littleEndian || endianness === 19789) {
                  if (dataView.getUint16(tiffOffset + 2, littleEndian) === 42) {
                    var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
                    if (firstIFDOffset >= 8) {
                      ifdStart = tiffOffset + firstIFDOffset;
                    }
                  }
                }
              }
            }
            if (ifdStart) {
              var _length = dataView.getUint16(ifdStart, littleEndian);
              var _offset;
              var i4;
              for (i4 = 0; i4 < _length; i4 += 1) {
                _offset = ifdStart + i4 * 12 + 2;
                if (dataView.getUint16(_offset, littleEndian) === 274) {
                  _offset += 8;
                  orientation = dataView.getUint16(_offset, littleEndian);
                  dataView.setUint16(_offset, 1, littleEndian);
                  break;
                }
              }
            }
          } catch (error) {
            orientation = 1;
          }
          return orientation;
        }
        function parseOrientation(orientation) {
          var rotate = 0;
          var scaleX = 1;
          var scaleY = 1;
          switch (orientation) {
            case 2:
              scaleX = -1;
              break;
            case 3:
              rotate = -180;
              break;
            case 4:
              scaleY = -1;
              break;
            case 5:
              rotate = 90;
              scaleY = -1;
              break;
            case 6:
              rotate = 90;
              break;
            case 7:
              rotate = 90;
              scaleX = -1;
              break;
            case 8:
              rotate = -90;
              break;
          }
          return {
            rotate,
            scaleX,
            scaleY
          };
        }
        var render = {
          render: function render2() {
            this.initContainer();
            this.initCanvas();
            this.initCropBox();
            this.renderCanvas();
            if (this.cropped) {
              this.renderCropBox();
            }
          },
          initContainer: function initContainer() {
            var element = this.element, options = this.options, container = this.container, cropper = this.cropper;
            addClass(cropper, CLASS_HIDDEN);
            removeClass(element, CLASS_HIDDEN);
            var containerData = {
              width: Math.max(container.offsetWidth, Number(options.minContainerWidth) || 200),
              height: Math.max(container.offsetHeight, Number(options.minContainerHeight) || 100)
            };
            this.containerData = containerData;
            setStyle(cropper, {
              width: containerData.width,
              height: containerData.height
            });
            addClass(element, CLASS_HIDDEN);
            removeClass(cropper, CLASS_HIDDEN);
          },
          initCanvas: function initCanvas() {
            var containerData = this.containerData, imageData = this.imageData;
            var viewMode = this.options.viewMode;
            var rotated = Math.abs(imageData.rotate) % 180 === 90;
            var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
            var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
            var aspectRatio = naturalWidth / naturalHeight;
            var canvasWidth = containerData.width;
            var canvasHeight = containerData.height;
            if (containerData.height * aspectRatio > containerData.width) {
              if (viewMode === 3) {
                canvasWidth = containerData.height * aspectRatio;
              } else {
                canvasHeight = containerData.width / aspectRatio;
              }
            } else if (viewMode === 3) {
              canvasHeight = containerData.width / aspectRatio;
            } else {
              canvasWidth = containerData.height * aspectRatio;
            }
            var canvasData = {
              aspectRatio,
              naturalWidth,
              naturalHeight,
              width: canvasWidth,
              height: canvasHeight
            };
            canvasData.left = (containerData.width - canvasWidth) / 2;
            canvasData.top = (containerData.height - canvasHeight) / 2;
            canvasData.oldLeft = canvasData.left;
            canvasData.oldTop = canvasData.top;
            this.canvasData = canvasData;
            this.limited = viewMode === 1 || viewMode === 2;
            this.limitCanvas(true, true);
            this.initialImageData = assign2({}, imageData);
            this.initialCanvasData = assign2({}, canvasData);
          },
          limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
            var options = this.options, containerData = this.containerData, canvasData = this.canvasData, cropBoxData = this.cropBoxData;
            var viewMode = options.viewMode;
            var aspectRatio = canvasData.aspectRatio;
            var cropped = this.cropped && cropBoxData;
            if (sizeLimited) {
              var minCanvasWidth = Number(options.minCanvasWidth) || 0;
              var minCanvasHeight = Number(options.minCanvasHeight) || 0;
              if (viewMode > 1) {
                minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
                minCanvasHeight = Math.max(minCanvasHeight, containerData.height);
                if (viewMode === 3) {
                  if (minCanvasHeight * aspectRatio > minCanvasWidth) {
                    minCanvasWidth = minCanvasHeight * aspectRatio;
                  } else {
                    minCanvasHeight = minCanvasWidth / aspectRatio;
                  }
                }
              } else if (viewMode > 0) {
                if (minCanvasWidth) {
                  minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
                } else if (minCanvasHeight) {
                  minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
                } else if (cropped) {
                  minCanvasWidth = cropBoxData.width;
                  minCanvasHeight = cropBoxData.height;
                  if (minCanvasHeight * aspectRatio > minCanvasWidth) {
                    minCanvasWidth = minCanvasHeight * aspectRatio;
                  } else {
                    minCanvasHeight = minCanvasWidth / aspectRatio;
                  }
                }
              }
              var _getAdjustedSizes = getAdjustedSizes({
                aspectRatio,
                width: minCanvasWidth,
                height: minCanvasHeight
              });
              minCanvasWidth = _getAdjustedSizes.width;
              minCanvasHeight = _getAdjustedSizes.height;
              canvasData.minWidth = minCanvasWidth;
              canvasData.minHeight = minCanvasHeight;
              canvasData.maxWidth = Infinity;
              canvasData.maxHeight = Infinity;
            }
            if (positionLimited) {
              if (viewMode > (cropped ? 0 : 1)) {
                var newCanvasLeft = containerData.width - canvasData.width;
                var newCanvasTop = containerData.height - canvasData.height;
                canvasData.minLeft = Math.min(0, newCanvasLeft);
                canvasData.minTop = Math.min(0, newCanvasTop);
                canvasData.maxLeft = Math.max(0, newCanvasLeft);
                canvasData.maxTop = Math.max(0, newCanvasTop);
                if (cropped && this.limited) {
                  canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
                  canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
                  canvasData.maxLeft = cropBoxData.left;
                  canvasData.maxTop = cropBoxData.top;
                  if (viewMode === 2) {
                    if (canvasData.width >= containerData.width) {
                      canvasData.minLeft = Math.min(0, newCanvasLeft);
                      canvasData.maxLeft = Math.max(0, newCanvasLeft);
                    }
                    if (canvasData.height >= containerData.height) {
                      canvasData.minTop = Math.min(0, newCanvasTop);
                      canvasData.maxTop = Math.max(0, newCanvasTop);
                    }
                  }
                }
              } else {
                canvasData.minLeft = -canvasData.width;
                canvasData.minTop = -canvasData.height;
                canvasData.maxLeft = containerData.width;
                canvasData.maxTop = containerData.height;
              }
            }
          },
          renderCanvas: function renderCanvas(changed, transformed) {
            var canvasData = this.canvasData, imageData = this.imageData;
            if (transformed) {
              var _getRotatedSizes = getRotatedSizes({
                width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
                height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
                degree: imageData.rotate || 0
              }), naturalWidth = _getRotatedSizes.width, naturalHeight = _getRotatedSizes.height;
              var width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
              var height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
              canvasData.left -= (width - canvasData.width) / 2;
              canvasData.top -= (height - canvasData.height) / 2;
              canvasData.width = width;
              canvasData.height = height;
              canvasData.aspectRatio = naturalWidth / naturalHeight;
              canvasData.naturalWidth = naturalWidth;
              canvasData.naturalHeight = naturalHeight;
              this.limitCanvas(true, false);
            }
            if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
              canvasData.left = canvasData.oldLeft;
            }
            if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
              canvasData.top = canvasData.oldTop;
            }
            canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
            canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
            this.limitCanvas(false, true);
            canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
            canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
            canvasData.oldLeft = canvasData.left;
            canvasData.oldTop = canvasData.top;
            setStyle(this.canvas, assign2({
              width: canvasData.width,
              height: canvasData.height
            }, getTransforms({
              translateX: canvasData.left,
              translateY: canvasData.top
            })));
            this.renderImage(changed);
            if (this.cropped && this.limited) {
              this.limitCropBox(true, true);
            }
          },
          renderImage: function renderImage(changed) {
            var canvasData = this.canvasData, imageData = this.imageData;
            var width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
            var height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
            assign2(imageData, {
              width,
              height,
              left: (canvasData.width - width) / 2,
              top: (canvasData.height - height) / 2
            });
            setStyle(this.image, assign2({
              width: imageData.width,
              height: imageData.height
            }, getTransforms(assign2({
              translateX: imageData.left,
              translateY: imageData.top
            }, imageData))));
            if (changed) {
              this.output();
            }
          },
          initCropBox: function initCropBox() {
            var options = this.options, canvasData = this.canvasData;
            var aspectRatio = options.aspectRatio || options.initialAspectRatio;
            var autoCropArea = Number(options.autoCropArea) || 0.8;
            var cropBoxData = {
              width: canvasData.width,
              height: canvasData.height
            };
            if (aspectRatio) {
              if (canvasData.height * aspectRatio > canvasData.width) {
                cropBoxData.height = cropBoxData.width / aspectRatio;
              } else {
                cropBoxData.width = cropBoxData.height * aspectRatio;
              }
            }
            this.cropBoxData = cropBoxData;
            this.limitCropBox(true, true);
            cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
            cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
            cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
            cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
            cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
            cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
            cropBoxData.oldLeft = cropBoxData.left;
            cropBoxData.oldTop = cropBoxData.top;
            this.initialCropBoxData = assign2({}, cropBoxData);
          },
          limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
            var options = this.options, containerData = this.containerData, canvasData = this.canvasData, cropBoxData = this.cropBoxData, limited = this.limited;
            var aspectRatio = options.aspectRatio;
            if (sizeLimited) {
              var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
              var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
              var maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width;
              var maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height;
              minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
              minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);
              if (aspectRatio) {
                if (minCropBoxWidth && minCropBoxHeight) {
                  if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
                    minCropBoxHeight = minCropBoxWidth / aspectRatio;
                  } else {
                    minCropBoxWidth = minCropBoxHeight * aspectRatio;
                  }
                } else if (minCropBoxWidth) {
                  minCropBoxHeight = minCropBoxWidth / aspectRatio;
                } else if (minCropBoxHeight) {
                  minCropBoxWidth = minCropBoxHeight * aspectRatio;
                }
                if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
                  maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
                } else {
                  maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
                }
              }
              cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
              cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
              cropBoxData.maxWidth = maxCropBoxWidth;
              cropBoxData.maxHeight = maxCropBoxHeight;
            }
            if (positionLimited) {
              if (limited) {
                cropBoxData.minLeft = Math.max(0, canvasData.left);
                cropBoxData.minTop = Math.max(0, canvasData.top);
                cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
                cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
              } else {
                cropBoxData.minLeft = 0;
                cropBoxData.minTop = 0;
                cropBoxData.maxLeft = containerData.width - cropBoxData.width;
                cropBoxData.maxTop = containerData.height - cropBoxData.height;
              }
            }
          },
          renderCropBox: function renderCropBox() {
            var options = this.options, containerData = this.containerData, cropBoxData = this.cropBoxData;
            if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
              cropBoxData.left = cropBoxData.oldLeft;
            }
            if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
              cropBoxData.top = cropBoxData.oldTop;
            }
            cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
            cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
            this.limitCropBox(false, true);
            cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
            cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
            cropBoxData.oldLeft = cropBoxData.left;
            cropBoxData.oldTop = cropBoxData.top;
            if (options.movable && options.cropBoxMovable) {
              setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
            }
            setStyle(this.cropBox, assign2({
              width: cropBoxData.width,
              height: cropBoxData.height
            }, getTransforms({
              translateX: cropBoxData.left,
              translateY: cropBoxData.top
            })));
            if (this.cropped && this.limited) {
              this.limitCanvas(true, true);
            }
            if (!this.disabled) {
              this.output();
            }
          },
          output: function output() {
            this.preview();
            dispatchEvent(this.element, EVENT_CROP, this.getData());
          }
        };
        var preview = {
          initPreview: function initPreview() {
            var element = this.element, crossOrigin = this.crossOrigin;
            var preview2 = this.options.preview;
            var url = crossOrigin ? this.crossOriginUrl : this.url;
            var alt = element.alt || "The image to preview";
            var image = document.createElement("img");
            if (crossOrigin) {
              image.crossOrigin = crossOrigin;
            }
            image.src = url;
            image.alt = alt;
            this.viewBox.appendChild(image);
            this.viewBoxImage = image;
            if (!preview2) {
              return;
            }
            var previews = preview2;
            if (typeof preview2 === "string") {
              previews = element.ownerDocument.querySelectorAll(preview2);
            } else if (preview2.querySelector) {
              previews = [preview2];
            }
            this.previews = previews;
            forEach(previews, function(el) {
              var img = document.createElement("img");
              setData(el, DATA_PREVIEW, {
                width: el.offsetWidth,
                height: el.offsetHeight,
                html: el.innerHTML
              });
              if (crossOrigin) {
                img.crossOrigin = crossOrigin;
              }
              img.src = url;
              img.alt = alt;
              img.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"';
              el.innerHTML = "";
              el.appendChild(img);
            });
          },
          resetPreview: function resetPreview() {
            forEach(this.previews, function(element) {
              var data = getData(element, DATA_PREVIEW);
              setStyle(element, {
                width: data.width,
                height: data.height
              });
              element.innerHTML = data.html;
              removeData(element, DATA_PREVIEW);
            });
          },
          preview: function preview2() {
            var imageData = this.imageData, canvasData = this.canvasData, cropBoxData = this.cropBoxData;
            var cropBoxWidth = cropBoxData.width, cropBoxHeight = cropBoxData.height;
            var width = imageData.width, height = imageData.height;
            var left = cropBoxData.left - canvasData.left - imageData.left;
            var top = cropBoxData.top - canvasData.top - imageData.top;
            if (!this.cropped || this.disabled) {
              return;
            }
            setStyle(this.viewBoxImage, assign2({
              width,
              height
            }, getTransforms(assign2({
              translateX: -left,
              translateY: -top
            }, imageData))));
            forEach(this.previews, function(element) {
              var data = getData(element, DATA_PREVIEW);
              var originalWidth = data.width;
              var originalHeight = data.height;
              var newWidth = originalWidth;
              var newHeight = originalHeight;
              var ratio = 1;
              if (cropBoxWidth) {
                ratio = originalWidth / cropBoxWidth;
                newHeight = cropBoxHeight * ratio;
              }
              if (cropBoxHeight && newHeight > originalHeight) {
                ratio = originalHeight / cropBoxHeight;
                newWidth = cropBoxWidth * ratio;
                newHeight = originalHeight;
              }
              setStyle(element, {
                width: newWidth,
                height: newHeight
              });
              setStyle(element.getElementsByTagName("img")[0], assign2({
                width: width * ratio,
                height: height * ratio
              }, getTransforms(assign2({
                translateX: -left * ratio,
                translateY: -top * ratio
              }, imageData))));
            });
          }
        };
        var events = {
          bind: function bind() {
            var element = this.element, options = this.options, cropper = this.cropper;
            if (isFunction2(options.cropstart)) {
              addListener(element, EVENT_CROP_START, options.cropstart);
            }
            if (isFunction2(options.cropmove)) {
              addListener(element, EVENT_CROP_MOVE, options.cropmove);
            }
            if (isFunction2(options.cropend)) {
              addListener(element, EVENT_CROP_END, options.cropend);
            }
            if (isFunction2(options.crop)) {
              addListener(element, EVENT_CROP, options.crop);
            }
            if (isFunction2(options.zoom)) {
              addListener(element, EVENT_ZOOM, options.zoom);
            }
            addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this));
            if (options.zoomable && options.zoomOnWheel) {
              addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
                passive: false,
                capture: true
              });
            }
            if (options.toggleDragModeOnDblclick) {
              addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
            }
            addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this));
            addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this));
            if (options.responsive) {
              addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
            }
          },
          unbind: function unbind() {
            var element = this.element, options = this.options, cropper = this.cropper;
            if (isFunction2(options.cropstart)) {
              removeListener(element, EVENT_CROP_START, options.cropstart);
            }
            if (isFunction2(options.cropmove)) {
              removeListener(element, EVENT_CROP_MOVE, options.cropmove);
            }
            if (isFunction2(options.cropend)) {
              removeListener(element, EVENT_CROP_END, options.cropend);
            }
            if (isFunction2(options.crop)) {
              removeListener(element, EVENT_CROP, options.crop);
            }
            if (isFunction2(options.zoom)) {
              removeListener(element, EVENT_ZOOM, options.zoom);
            }
            removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);
            if (options.zoomable && options.zoomOnWheel) {
              removeListener(cropper, EVENT_WHEEL, this.onWheel, {
                passive: false,
                capture: true
              });
            }
            if (options.toggleDragModeOnDblclick) {
              removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
            }
            removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove);
            removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd);
            if (options.responsive) {
              removeListener(window, EVENT_RESIZE, this.onResize);
            }
          }
        };
        var handlers = {
          resize: function resize() {
            if (this.disabled) {
              return;
            }
            var options = this.options, container = this.container, containerData = this.containerData;
            var ratio = container.offsetWidth / containerData.width;
            if (ratio !== 1 || container.offsetHeight !== containerData.height) {
              var canvasData;
              var cropBoxData;
              if (options.restore) {
                canvasData = this.getCanvasData();
                cropBoxData = this.getCropBoxData();
              }
              this.render();
              if (options.restore) {
                this.setCanvasData(forEach(canvasData, function(n3, i4) {
                  canvasData[i4] = n3 * ratio;
                }));
                this.setCropBoxData(forEach(cropBoxData, function(n3, i4) {
                  cropBoxData[i4] = n3 * ratio;
                }));
              }
            }
          },
          dblclick: function dblclick() {
            if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
              return;
            }
            this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
          },
          wheel: function wheel(event) {
            var _this = this;
            var ratio = Number(this.options.wheelZoomRatio) || 0.1;
            var delta = 1;
            if (this.disabled) {
              return;
            }
            event.preventDefault();
            if (this.wheeling) {
              return;
            }
            this.wheeling = true;
            setTimeout(function() {
              _this.wheeling = false;
            }, 50);
            if (event.deltaY) {
              delta = event.deltaY > 0 ? 1 : -1;
            } else if (event.wheelDelta) {
              delta = -event.wheelDelta / 120;
            } else if (event.detail) {
              delta = event.detail > 0 ? 1 : -1;
            }
            this.zoom(-delta * ratio, event);
          },
          cropStart: function cropStart(event) {
            var buttons = event.buttons, button = event.button;
            if (this.disabled || (event.type === "mousedown" || event.type === "pointerdown" && event.pointerType === "mouse") && (isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0 || event.ctrlKey)) {
              return;
            }
            var options = this.options, pointers = this.pointers;
            var action;
            if (event.changedTouches) {
              forEach(event.changedTouches, function(touch) {
                pointers[touch.identifier] = getPointer(touch);
              });
            } else {
              pointers[event.pointerId || 0] = getPointer(event);
            }
            if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
              action = ACTION_ZOOM;
            } else {
              action = getData(event.target, DATA_ACTION);
            }
            if (!REGEXP_ACTIONS.test(action)) {
              return;
            }
            if (dispatchEvent(this.element, EVENT_CROP_START, {
              originalEvent: event,
              action
            }) === false) {
              return;
            }
            event.preventDefault();
            this.action = action;
            this.cropping = false;
            if (action === ACTION_CROP) {
              this.cropping = true;
              addClass(this.dragBox, CLASS_MODAL);
            }
          },
          cropMove: function cropMove(event) {
            var action = this.action;
            if (this.disabled || !action) {
              return;
            }
            var pointers = this.pointers;
            event.preventDefault();
            if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
              originalEvent: event,
              action
            }) === false) {
              return;
            }
            if (event.changedTouches) {
              forEach(event.changedTouches, function(touch) {
                assign2(pointers[touch.identifier] || {}, getPointer(touch, true));
              });
            } else {
              assign2(pointers[event.pointerId || 0] || {}, getPointer(event, true));
            }
            this.change(event);
          },
          cropEnd: function cropEnd(event) {
            if (this.disabled) {
              return;
            }
            var action = this.action, pointers = this.pointers;
            if (event.changedTouches) {
              forEach(event.changedTouches, function(touch) {
                delete pointers[touch.identifier];
              });
            } else {
              delete pointers[event.pointerId || 0];
            }
            if (!action) {
              return;
            }
            event.preventDefault();
            if (!Object.keys(pointers).length) {
              this.action = "";
            }
            if (this.cropping) {
              this.cropping = false;
              toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
            }
            dispatchEvent(this.element, EVENT_CROP_END, {
              originalEvent: event,
              action
            });
          }
        };
        var change = {
          change: function change2(event) {
            var options = this.options, canvasData = this.canvasData, containerData = this.containerData, cropBoxData = this.cropBoxData, pointers = this.pointers;
            var action = this.action;
            var aspectRatio = options.aspectRatio;
            var left = cropBoxData.left, top = cropBoxData.top, width = cropBoxData.width, height = cropBoxData.height;
            var right = left + width;
            var bottom = top + height;
            var minLeft = 0;
            var minTop = 0;
            var maxWidth = containerData.width;
            var maxHeight = containerData.height;
            var renderable = true;
            var offset;
            if (!aspectRatio && event.shiftKey) {
              aspectRatio = width && height ? width / height : 1;
            }
            if (this.limited) {
              minLeft = cropBoxData.minLeft;
              minTop = cropBoxData.minTop;
              maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
              maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
            }
            var pointer = pointers[Object.keys(pointers)[0]];
            var range = {
              x: pointer.endX - pointer.startX,
              y: pointer.endY - pointer.startY
            };
            var check = function check2(side) {
              switch (side) {
                case ACTION_EAST:
                  if (right + range.x > maxWidth) {
                    range.x = maxWidth - right;
                  }
                  break;
                case ACTION_WEST:
                  if (left + range.x < minLeft) {
                    range.x = minLeft - left;
                  }
                  break;
                case ACTION_NORTH:
                  if (top + range.y < minTop) {
                    range.y = minTop - top;
                  }
                  break;
                case ACTION_SOUTH:
                  if (bottom + range.y > maxHeight) {
                    range.y = maxHeight - bottom;
                  }
                  break;
              }
            };
            switch (action) {
              case ACTION_ALL:
                left += range.x;
                top += range.y;
                break;
              case ACTION_EAST:
                if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
                  renderable = false;
                  break;
                }
                check(ACTION_EAST);
                width += range.x;
                if (width < 0) {
                  action = ACTION_WEST;
                  width = -width;
                  left -= width;
                }
                if (aspectRatio) {
                  height = width / aspectRatio;
                  top += (cropBoxData.height - height) / 2;
                }
                break;
              case ACTION_NORTH:
                if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
                  renderable = false;
                  break;
                }
                check(ACTION_NORTH);
                height -= range.y;
                top += range.y;
                if (height < 0) {
                  action = ACTION_SOUTH;
                  height = -height;
                  top -= height;
                }
                if (aspectRatio) {
                  width = height * aspectRatio;
                  left += (cropBoxData.width - width) / 2;
                }
                break;
              case ACTION_WEST:
                if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
                  renderable = false;
                  break;
                }
                check(ACTION_WEST);
                width -= range.x;
                left += range.x;
                if (width < 0) {
                  action = ACTION_EAST;
                  width = -width;
                  left -= width;
                }
                if (aspectRatio) {
                  height = width / aspectRatio;
                  top += (cropBoxData.height - height) / 2;
                }
                break;
              case ACTION_SOUTH:
                if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
                  renderable = false;
                  break;
                }
                check(ACTION_SOUTH);
                height += range.y;
                if (height < 0) {
                  action = ACTION_NORTH;
                  height = -height;
                  top -= height;
                }
                if (aspectRatio) {
                  width = height * aspectRatio;
                  left += (cropBoxData.width - width) / 2;
                }
                break;
              case ACTION_NORTH_EAST:
                if (aspectRatio) {
                  if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
                    renderable = false;
                    break;
                  }
                  check(ACTION_NORTH);
                  height -= range.y;
                  top += range.y;
                  width = height * aspectRatio;
                } else {
                  check(ACTION_NORTH);
                  check(ACTION_EAST);
                  if (range.x >= 0) {
                    if (right < maxWidth) {
                      width += range.x;
                    } else if (range.y <= 0 && top <= minTop) {
                      renderable = false;
                    }
                  } else {
                    width += range.x;
                  }
                  if (range.y <= 0) {
                    if (top > minTop) {
                      height -= range.y;
                      top += range.y;
                    }
                  } else {
                    height -= range.y;
                    top += range.y;
                  }
                }
                if (width < 0 && height < 0) {
                  action = ACTION_SOUTH_WEST;
                  height = -height;
                  width = -width;
                  top -= height;
                  left -= width;
                } else if (width < 0) {
                  action = ACTION_NORTH_WEST;
                  width = -width;
                  left -= width;
                } else if (height < 0) {
                  action = ACTION_SOUTH_EAST;
                  height = -height;
                  top -= height;
                }
                break;
              case ACTION_NORTH_WEST:
                if (aspectRatio) {
                  if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
                    renderable = false;
                    break;
                  }
                  check(ACTION_NORTH);
                  height -= range.y;
                  top += range.y;
                  width = height * aspectRatio;
                  left += cropBoxData.width - width;
                } else {
                  check(ACTION_NORTH);
                  check(ACTION_WEST);
                  if (range.x <= 0) {
                    if (left > minLeft) {
                      width -= range.x;
                      left += range.x;
                    } else if (range.y <= 0 && top <= minTop) {
                      renderable = false;
                    }
                  } else {
                    width -= range.x;
                    left += range.x;
                  }
                  if (range.y <= 0) {
                    if (top > minTop) {
                      height -= range.y;
                      top += range.y;
                    }
                  } else {
                    height -= range.y;
                    top += range.y;
                  }
                }
                if (width < 0 && height < 0) {
                  action = ACTION_SOUTH_EAST;
                  height = -height;
                  width = -width;
                  top -= height;
                  left -= width;
                } else if (width < 0) {
                  action = ACTION_NORTH_EAST;
                  width = -width;
                  left -= width;
                } else if (height < 0) {
                  action = ACTION_SOUTH_WEST;
                  height = -height;
                  top -= height;
                }
                break;
              case ACTION_SOUTH_WEST:
                if (aspectRatio) {
                  if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
                    renderable = false;
                    break;
                  }
                  check(ACTION_WEST);
                  width -= range.x;
                  left += range.x;
                  height = width / aspectRatio;
                } else {
                  check(ACTION_SOUTH);
                  check(ACTION_WEST);
                  if (range.x <= 0) {
                    if (left > minLeft) {
                      width -= range.x;
                      left += range.x;
                    } else if (range.y >= 0 && bottom >= maxHeight) {
                      renderable = false;
                    }
                  } else {
                    width -= range.x;
                    left += range.x;
                  }
                  if (range.y >= 0) {
                    if (bottom < maxHeight) {
                      height += range.y;
                    }
                  } else {
                    height += range.y;
                  }
                }
                if (width < 0 && height < 0) {
                  action = ACTION_NORTH_EAST;
                  height = -height;
                  width = -width;
                  top -= height;
                  left -= width;
                } else if (width < 0) {
                  action = ACTION_SOUTH_EAST;
                  width = -width;
                  left -= width;
                } else if (height < 0) {
                  action = ACTION_NORTH_WEST;
                  height = -height;
                  top -= height;
                }
                break;
              case ACTION_SOUTH_EAST:
                if (aspectRatio) {
                  if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
                    renderable = false;
                    break;
                  }
                  check(ACTION_EAST);
                  width += range.x;
                  height = width / aspectRatio;
                } else {
                  check(ACTION_SOUTH);
                  check(ACTION_EAST);
                  if (range.x >= 0) {
                    if (right < maxWidth) {
                      width += range.x;
                    } else if (range.y >= 0 && bottom >= maxHeight) {
                      renderable = false;
                    }
                  } else {
                    width += range.x;
                  }
                  if (range.y >= 0) {
                    if (bottom < maxHeight) {
                      height += range.y;
                    }
                  } else {
                    height += range.y;
                  }
                }
                if (width < 0 && height < 0) {
                  action = ACTION_NORTH_WEST;
                  height = -height;
                  width = -width;
                  top -= height;
                  left -= width;
                } else if (width < 0) {
                  action = ACTION_SOUTH_WEST;
                  width = -width;
                  left -= width;
                } else if (height < 0) {
                  action = ACTION_NORTH_EAST;
                  height = -height;
                  top -= height;
                }
                break;
              case ACTION_MOVE:
                this.move(range.x, range.y);
                renderable = false;
                break;
              case ACTION_ZOOM:
                this.zoom(getMaxZoomRatio(pointers), event);
                renderable = false;
                break;
              case ACTION_CROP:
                if (!range.x || !range.y) {
                  renderable = false;
                  break;
                }
                offset = getOffset(this.cropper);
                left = pointer.startX - offset.left;
                top = pointer.startY - offset.top;
                width = cropBoxData.minWidth;
                height = cropBoxData.minHeight;
                if (range.x > 0) {
                  action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
                } else if (range.x < 0) {
                  left -= width;
                  action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
                }
                if (range.y < 0) {
                  top -= height;
                }
                if (!this.cropped) {
                  removeClass(this.cropBox, CLASS_HIDDEN);
                  this.cropped = true;
                  if (this.limited) {
                    this.limitCropBox(true, true);
                  }
                }
                break;
            }
            if (renderable) {
              cropBoxData.width = width;
              cropBoxData.height = height;
              cropBoxData.left = left;
              cropBoxData.top = top;
              this.action = action;
              this.renderCropBox();
            }
            forEach(pointers, function(p4) {
              p4.startX = p4.endX;
              p4.startY = p4.endY;
            });
          }
        };
        var methods = {
          crop: function crop() {
            if (this.ready && !this.cropped && !this.disabled) {
              this.cropped = true;
              this.limitCropBox(true, true);
              if (this.options.modal) {
                addClass(this.dragBox, CLASS_MODAL);
              }
              removeClass(this.cropBox, CLASS_HIDDEN);
              this.setCropBoxData(this.initialCropBoxData);
            }
            return this;
          },
          reset: function reset() {
            if (this.ready && !this.disabled) {
              this.imageData = assign2({}, this.initialImageData);
              this.canvasData = assign2({}, this.initialCanvasData);
              this.cropBoxData = assign2({}, this.initialCropBoxData);
              this.renderCanvas();
              if (this.cropped) {
                this.renderCropBox();
              }
            }
            return this;
          },
          clear: function clear() {
            if (this.cropped && !this.disabled) {
              assign2(this.cropBoxData, {
                left: 0,
                top: 0,
                width: 0,
                height: 0
              });
              this.cropped = false;
              this.renderCropBox();
              this.limitCanvas(true, true);
              this.renderCanvas();
              removeClass(this.dragBox, CLASS_MODAL);
              addClass(this.cropBox, CLASS_HIDDEN);
            }
            return this;
          },
          replace: function replace(url) {
            var hasSameSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
            if (!this.disabled && url) {
              if (this.isImg) {
                this.element.src = url;
              }
              if (hasSameSize) {
                this.url = url;
                this.image.src = url;
                if (this.ready) {
                  this.viewBoxImage.src = url;
                  forEach(this.previews, function(element) {
                    element.getElementsByTagName("img")[0].src = url;
                  });
                }
              } else {
                if (this.isImg) {
                  this.replaced = true;
                }
                this.options.data = null;
                this.uncreate();
                this.load(url);
              }
            }
            return this;
          },
          enable: function enable() {
            if (this.ready && this.disabled) {
              this.disabled = false;
              removeClass(this.cropper, CLASS_DISABLED);
            }
            return this;
          },
          disable: function disable() {
            if (this.ready && !this.disabled) {
              this.disabled = true;
              addClass(this.cropper, CLASS_DISABLED);
            }
            return this;
          },
          destroy: function destroy() {
            var element = this.element;
            if (!element[NAMESPACE]) {
              return this;
            }
            element[NAMESPACE] = void 0;
            if (this.isImg && this.replaced) {
              element.src = this.originalUrl;
            }
            this.uncreate();
            return this;
          },
          move: function move(offsetX) {
            var offsetY = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : offsetX;
            var _this$canvasData = this.canvasData, left = _this$canvasData.left, top = _this$canvasData.top;
            return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
          },
          moveTo: function moveTo(x3) {
            var y3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : x3;
            var canvasData = this.canvasData;
            var changed = false;
            x3 = Number(x3);
            y3 = Number(y3);
            if (this.ready && !this.disabled && this.options.movable) {
              if (isNumber(x3)) {
                canvasData.left = x3;
                changed = true;
              }
              if (isNumber(y3)) {
                canvasData.top = y3;
                changed = true;
              }
              if (changed) {
                this.renderCanvas(true);
              }
            }
            return this;
          },
          zoom: function zoom(ratio, _originalEvent) {
            var canvasData = this.canvasData;
            ratio = Number(ratio);
            if (ratio < 0) {
              ratio = 1 / (1 - ratio);
            } else {
              ratio = 1 + ratio;
            }
            return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
          },
          zoomTo: function zoomTo(ratio, pivot, _originalEvent) {
            var options = this.options, canvasData = this.canvasData;
            var width = canvasData.width, height = canvasData.height, naturalWidth = canvasData.naturalWidth, naturalHeight = canvasData.naturalHeight;
            ratio = Number(ratio);
            if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
              var newWidth = naturalWidth * ratio;
              var newHeight = naturalHeight * ratio;
              if (dispatchEvent(this.element, EVENT_ZOOM, {
                ratio,
                oldRatio: width / naturalWidth,
                originalEvent: _originalEvent
              }) === false) {
                return this;
              }
              if (_originalEvent) {
                var pointers = this.pointers;
                var offset = getOffset(this.cropper);
                var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
                  pageX: _originalEvent.pageX,
                  pageY: _originalEvent.pageY
                };
                canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
                canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
              } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
                canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width);
                canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height);
              } else {
                canvasData.left -= (newWidth - width) / 2;
                canvasData.top -= (newHeight - height) / 2;
              }
              canvasData.width = newWidth;
              canvasData.height = newHeight;
              this.renderCanvas(true);
            }
            return this;
          },
          rotate: function rotate(degree) {
            return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
          },
          rotateTo: function rotateTo(degree) {
            degree = Number(degree);
            if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
              this.imageData.rotate = degree % 360;
              this.renderCanvas(true, true);
            }
            return this;
          },
          scaleX: function scaleX(_scaleX) {
            var scaleY = this.imageData.scaleY;
            return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
          },
          scaleY: function scaleY(_scaleY) {
            var scaleX = this.imageData.scaleX;
            return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
          },
          scale: function scale(scaleX) {
            var scaleY = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : scaleX;
            var imageData = this.imageData;
            var transformed = false;
            scaleX = Number(scaleX);
            scaleY = Number(scaleY);
            if (this.ready && !this.disabled && this.options.scalable) {
              if (isNumber(scaleX)) {
                imageData.scaleX = scaleX;
                transformed = true;
              }
              if (isNumber(scaleY)) {
                imageData.scaleY = scaleY;
                transformed = true;
              }
              if (transformed) {
                this.renderCanvas(true, true);
              }
            }
            return this;
          },
          getData: function getData2() {
            var rounded = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            var options = this.options, imageData = this.imageData, canvasData = this.canvasData, cropBoxData = this.cropBoxData;
            var data;
            if (this.ready && this.cropped) {
              data = {
                x: cropBoxData.left - canvasData.left,
                y: cropBoxData.top - canvasData.top,
                width: cropBoxData.width,
                height: cropBoxData.height
              };
              var ratio = imageData.width / imageData.naturalWidth;
              forEach(data, function(n3, i4) {
                data[i4] = n3 / ratio;
              });
              if (rounded) {
                var bottom = Math.round(data.y + data.height);
                var right = Math.round(data.x + data.width);
                data.x = Math.round(data.x);
                data.y = Math.round(data.y);
                data.width = right - data.x;
                data.height = bottom - data.y;
              }
            } else {
              data = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
              };
            }
            if (options.rotatable) {
              data.rotate = imageData.rotate || 0;
            }
            if (options.scalable) {
              data.scaleX = imageData.scaleX || 1;
              data.scaleY = imageData.scaleY || 1;
            }
            return data;
          },
          setData: function setData2(data) {
            var options = this.options, imageData = this.imageData, canvasData = this.canvasData;
            var cropBoxData = {};
            if (this.ready && !this.disabled && isPlainObject(data)) {
              var transformed = false;
              if (options.rotatable) {
                if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
                  imageData.rotate = data.rotate;
                  transformed = true;
                }
              }
              if (options.scalable) {
                if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
                  imageData.scaleX = data.scaleX;
                  transformed = true;
                }
                if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
                  imageData.scaleY = data.scaleY;
                  transformed = true;
                }
              }
              if (transformed) {
                this.renderCanvas(true, true);
              }
              var ratio = imageData.width / imageData.naturalWidth;
              if (isNumber(data.x)) {
                cropBoxData.left = data.x * ratio + canvasData.left;
              }
              if (isNumber(data.y)) {
                cropBoxData.top = data.y * ratio + canvasData.top;
              }
              if (isNumber(data.width)) {
                cropBoxData.width = data.width * ratio;
              }
              if (isNumber(data.height)) {
                cropBoxData.height = data.height * ratio;
              }
              this.setCropBoxData(cropBoxData);
            }
            return this;
          },
          getContainerData: function getContainerData() {
            return this.ready ? assign2({}, this.containerData) : {};
          },
          getImageData: function getImageData() {
            return this.sized ? assign2({}, this.imageData) : {};
          },
          getCanvasData: function getCanvasData() {
            var canvasData = this.canvasData;
            var data = {};
            if (this.ready) {
              forEach(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n3) {
                data[n3] = canvasData[n3];
              });
            }
            return data;
          },
          setCanvasData: function setCanvasData(data) {
            var canvasData = this.canvasData;
            var aspectRatio = canvasData.aspectRatio;
            if (this.ready && !this.disabled && isPlainObject(data)) {
              if (isNumber(data.left)) {
                canvasData.left = data.left;
              }
              if (isNumber(data.top)) {
                canvasData.top = data.top;
              }
              if (isNumber(data.width)) {
                canvasData.width = data.width;
                canvasData.height = data.width / aspectRatio;
              } else if (isNumber(data.height)) {
                canvasData.height = data.height;
                canvasData.width = data.height * aspectRatio;
              }
              this.renderCanvas(true);
            }
            return this;
          },
          getCropBoxData: function getCropBoxData() {
            var cropBoxData = this.cropBoxData;
            var data;
            if (this.ready && this.cropped) {
              data = {
                left: cropBoxData.left,
                top: cropBoxData.top,
                width: cropBoxData.width,
                height: cropBoxData.height
              };
            }
            return data || {};
          },
          setCropBoxData: function setCropBoxData(data) {
            var cropBoxData = this.cropBoxData;
            var aspectRatio = this.options.aspectRatio;
            var widthChanged;
            var heightChanged;
            if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
              if (isNumber(data.left)) {
                cropBoxData.left = data.left;
              }
              if (isNumber(data.top)) {
                cropBoxData.top = data.top;
              }
              if (isNumber(data.width) && data.width !== cropBoxData.width) {
                widthChanged = true;
                cropBoxData.width = data.width;
              }
              if (isNumber(data.height) && data.height !== cropBoxData.height) {
                heightChanged = true;
                cropBoxData.height = data.height;
              }
              if (aspectRatio) {
                if (widthChanged) {
                  cropBoxData.height = cropBoxData.width / aspectRatio;
                } else if (heightChanged) {
                  cropBoxData.width = cropBoxData.height * aspectRatio;
                }
              }
              this.renderCropBox();
            }
            return this;
          },
          getCroppedCanvas: function getCroppedCanvas() {
            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            if (!this.ready || !window.HTMLCanvasElement) {
              return null;
            }
            var canvasData = this.canvasData;
            var source = getSourceCanvas(this.image, this.imageData, canvasData, options);
            if (!this.cropped) {
              return source;
            }
            var _this$getData = this.getData(), initialX = _this$getData.x, initialY = _this$getData.y, initialWidth = _this$getData.width, initialHeight = _this$getData.height;
            var ratio = source.width / Math.floor(canvasData.naturalWidth);
            if (ratio !== 1) {
              initialX *= ratio;
              initialY *= ratio;
              initialWidth *= ratio;
              initialHeight *= ratio;
            }
            var aspectRatio = initialWidth / initialHeight;
            var maxSizes = getAdjustedSizes({
              aspectRatio,
              width: options.maxWidth || Infinity,
              height: options.maxHeight || Infinity
            });
            var minSizes = getAdjustedSizes({
              aspectRatio,
              width: options.minWidth || 0,
              height: options.minHeight || 0
            }, "cover");
            var _getAdjustedSizes = getAdjustedSizes({
              aspectRatio,
              width: options.width || (ratio !== 1 ? source.width : initialWidth),
              height: options.height || (ratio !== 1 ? source.height : initialHeight)
            }), width = _getAdjustedSizes.width, height = _getAdjustedSizes.height;
            width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
            height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = normalizeDecimalNumber(width);
            canvas.height = normalizeDecimalNumber(height);
            context.fillStyle = options.fillColor || "transparent";
            context.fillRect(0, 0, width, height);
            var _options$imageSmoothi = options.imageSmoothingEnabled, imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi, imageSmoothingQuality = options.imageSmoothingQuality;
            context.imageSmoothingEnabled = imageSmoothingEnabled;
            if (imageSmoothingQuality) {
              context.imageSmoothingQuality = imageSmoothingQuality;
            }
            var sourceWidth = source.width;
            var sourceHeight = source.height;
            var srcX = initialX;
            var srcY = initialY;
            var srcWidth;
            var srcHeight;
            var dstX;
            var dstY;
            var dstWidth;
            var dstHeight;
            if (srcX <= -initialWidth || srcX > sourceWidth) {
              srcX = 0;
              srcWidth = 0;
              dstX = 0;
              dstWidth = 0;
            } else if (srcX <= 0) {
              dstX = -srcX;
              srcX = 0;
              srcWidth = Math.min(sourceWidth, initialWidth + srcX);
              dstWidth = srcWidth;
            } else if (srcX <= sourceWidth) {
              dstX = 0;
              srcWidth = Math.min(initialWidth, sourceWidth - srcX);
              dstWidth = srcWidth;
            }
            if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
              srcY = 0;
              srcHeight = 0;
              dstY = 0;
              dstHeight = 0;
            } else if (srcY <= 0) {
              dstY = -srcY;
              srcY = 0;
              srcHeight = Math.min(sourceHeight, initialHeight + srcY);
              dstHeight = srcHeight;
            } else if (srcY <= sourceHeight) {
              dstY = 0;
              srcHeight = Math.min(initialHeight, sourceHeight - srcY);
              dstHeight = srcHeight;
            }
            var params = [srcX, srcY, srcWidth, srcHeight];
            if (dstWidth > 0 && dstHeight > 0) {
              var scale = width / initialWidth;
              params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
            }
            context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function(param) {
              return Math.floor(normalizeDecimalNumber(param));
            }))));
            return canvas;
          },
          setAspectRatio: function setAspectRatio(aspectRatio) {
            var options = this.options;
            if (!this.disabled && !isUndefined(aspectRatio)) {
              options.aspectRatio = Math.max(0, aspectRatio) || NaN;
              if (this.ready) {
                this.initCropBox();
                if (this.cropped) {
                  this.renderCropBox();
                }
              }
            }
            return this;
          },
          setDragMode: function setDragMode(mode) {
            var options = this.options, dragBox = this.dragBox, face = this.face;
            if (this.ready && !this.disabled) {
              var croppable = mode === DRAG_MODE_CROP;
              var movable = options.movable && mode === DRAG_MODE_MOVE;
              mode = croppable || movable ? mode : DRAG_MODE_NONE;
              options.dragMode = mode;
              setData(dragBox, DATA_ACTION, mode);
              toggleClass(dragBox, CLASS_CROP, croppable);
              toggleClass(dragBox, CLASS_MOVE, movable);
              if (!options.cropBoxMovable) {
                setData(face, DATA_ACTION, mode);
                toggleClass(face, CLASS_CROP, croppable);
                toggleClass(face, CLASS_MOVE, movable);
              }
            }
            return this;
          }
        };
        var AnotherCropper = WINDOW.Cropper;
        var Cropper2 = /* @__PURE__ */ function() {
          function Cropper3(element) {
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            _classCallCheck10(this, Cropper3);
            if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
              throw new Error("The first argument is required and must be an <img> or <canvas> element.");
            }
            this.element = element;
            this.options = assign2({}, DEFAULTS, isPlainObject(options) && options);
            this.cropped = false;
            this.disabled = false;
            this.pointers = {};
            this.ready = false;
            this.reloading = false;
            this.replaced = false;
            this.sized = false;
            this.sizing = false;
            this.init();
          }
          _createClass10(Cropper3, [{
            key: "init",
            value: function init() {
              var element = this.element;
              var tagName = element.tagName.toLowerCase();
              var url;
              if (element[NAMESPACE]) {
                return;
              }
              element[NAMESPACE] = this;
              if (tagName === "img") {
                this.isImg = true;
                url = element.getAttribute("src") || "";
                this.originalUrl = url;
                if (!url) {
                  return;
                }
                url = element.src;
              } else if (tagName === "canvas" && window.HTMLCanvasElement) {
                url = element.toDataURL();
              }
              this.load(url);
            }
          }, {
            key: "load",
            value: function load(url) {
              var _this = this;
              if (!url) {
                return;
              }
              this.url = url;
              this.imageData = {};
              var element = this.element, options = this.options;
              if (!options.rotatable && !options.scalable) {
                options.checkOrientation = false;
              }
              if (!options.checkOrientation || !window.ArrayBuffer) {
                this.clone();
                return;
              }
              if (REGEXP_DATA_URL.test(url)) {
                if (REGEXP_DATA_URL_JPEG.test(url)) {
                  this.read(dataURLToArrayBuffer(url));
                } else {
                  this.clone();
                }
                return;
              }
              var xhr = new XMLHttpRequest();
              var clone = this.clone.bind(this);
              this.reloading = true;
              this.xhr = xhr;
              xhr.onabort = clone;
              xhr.onerror = clone;
              xhr.ontimeout = clone;
              xhr.onprogress = function() {
                if (xhr.getResponseHeader("content-type") !== MIME_TYPE_JPEG) {
                  xhr.abort();
                }
              };
              xhr.onload = function() {
                _this.read(xhr.response);
              };
              xhr.onloadend = function() {
                _this.reloading = false;
                _this.xhr = null;
              };
              if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
                url = addTimestamp(url);
              }
              xhr.open("GET", url);
              xhr.responseType = "arraybuffer";
              xhr.withCredentials = element.crossOrigin === "use-credentials";
              xhr.send();
            }
          }, {
            key: "read",
            value: function read(arrayBuffer) {
              var options = this.options, imageData = this.imageData;
              var orientation = resetAndGetOrientation(arrayBuffer);
              var rotate = 0;
              var scaleX = 1;
              var scaleY = 1;
              if (orientation > 1) {
                this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);
                var _parseOrientation = parseOrientation(orientation);
                rotate = _parseOrientation.rotate;
                scaleX = _parseOrientation.scaleX;
                scaleY = _parseOrientation.scaleY;
              }
              if (options.rotatable) {
                imageData.rotate = rotate;
              }
              if (options.scalable) {
                imageData.scaleX = scaleX;
                imageData.scaleY = scaleY;
              }
              this.clone();
            }
          }, {
            key: "clone",
            value: function clone() {
              var element = this.element, url = this.url;
              var crossOrigin = element.crossOrigin;
              var crossOriginUrl = url;
              if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
                if (!crossOrigin) {
                  crossOrigin = "anonymous";
                }
                crossOriginUrl = addTimestamp(url);
              }
              this.crossOrigin = crossOrigin;
              this.crossOriginUrl = crossOriginUrl;
              var image = document.createElement("img");
              if (crossOrigin) {
                image.crossOrigin = crossOrigin;
              }
              image.src = crossOriginUrl || url;
              image.alt = element.alt || "The image to crop";
              this.image = image;
              image.onload = this.start.bind(this);
              image.onerror = this.stop.bind(this);
              addClass(image, CLASS_HIDE);
              element.parentNode.insertBefore(image, element.nextSibling);
            }
          }, {
            key: "start",
            value: function start() {
              var _this2 = this;
              var image = this.image;
              image.onload = null;
              image.onerror = null;
              this.sizing = true;
              var isIOSWebKit = WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent);
              var done = function done2(naturalWidth, naturalHeight) {
                assign2(_this2.imageData, {
                  naturalWidth,
                  naturalHeight,
                  aspectRatio: naturalWidth / naturalHeight
                });
                _this2.sizing = false;
                _this2.sized = true;
                _this2.build();
              };
              if (image.naturalWidth && !isIOSWebKit) {
                done(image.naturalWidth, image.naturalHeight);
                return;
              }
              var sizingImage = document.createElement("img");
              var body = document.body || document.documentElement;
              this.sizingImage = sizingImage;
              sizingImage.onload = function() {
                done(sizingImage.width, sizingImage.height);
                if (!isIOSWebKit) {
                  body.removeChild(sizingImage);
                }
              };
              sizingImage.src = image.src;
              if (!isIOSWebKit) {
                sizingImage.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;";
                body.appendChild(sizingImage);
              }
            }
          }, {
            key: "stop",
            value: function stop() {
              var image = this.image;
              image.onload = null;
              image.onerror = null;
              image.parentNode.removeChild(image);
              this.image = null;
            }
          }, {
            key: "build",
            value: function build() {
              if (!this.sized || this.ready) {
                return;
              }
              var element = this.element, options = this.options, image = this.image;
              var container = element.parentNode;
              var template = document.createElement("div");
              template.innerHTML = TEMPLATE;
              var cropper = template.querySelector(".".concat(NAMESPACE, "-container"));
              var canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas"));
              var dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box"));
              var cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box"));
              var face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
              this.container = container;
              this.cropper = cropper;
              this.canvas = canvas;
              this.dragBox = dragBox;
              this.cropBox = cropBox;
              this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box"));
              this.face = face;
              canvas.appendChild(image);
              addClass(element, CLASS_HIDDEN);
              container.insertBefore(cropper, element.nextSibling);
              if (!this.isImg) {
                removeClass(image, CLASS_HIDE);
              }
              this.initPreview();
              this.bind();
              options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
              options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
              options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
              addClass(cropBox, CLASS_HIDDEN);
              if (!options.guides) {
                addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN);
              }
              if (!options.center) {
                addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN);
              }
              if (options.background) {
                addClass(cropper, "".concat(NAMESPACE, "-bg"));
              }
              if (!options.highlight) {
                addClass(face, CLASS_INVISIBLE);
              }
              if (options.cropBoxMovable) {
                addClass(face, CLASS_MOVE);
                setData(face, DATA_ACTION, ACTION_ALL);
              }
              if (!options.cropBoxResizable) {
                addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN);
                addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN);
              }
              this.render();
              this.ready = true;
              this.setDragMode(options.dragMode);
              if (options.autoCrop) {
                this.crop();
              }
              this.setData(options.data);
              if (isFunction2(options.ready)) {
                addListener(element, EVENT_READY, options.ready, {
                  once: true
                });
              }
              dispatchEvent(element, EVENT_READY);
            }
          }, {
            key: "unbuild",
            value: function unbuild() {
              if (!this.ready) {
                return;
              }
              this.ready = false;
              this.unbind();
              this.resetPreview();
              this.cropper.parentNode.removeChild(this.cropper);
              removeClass(this.element, CLASS_HIDDEN);
            }
          }, {
            key: "uncreate",
            value: function uncreate() {
              if (this.ready) {
                this.unbuild();
                this.ready = false;
                this.cropped = false;
              } else if (this.sizing) {
                this.sizingImage.onload = null;
                this.sizing = false;
                this.sized = false;
              } else if (this.reloading) {
                this.xhr.onabort = null;
                this.xhr.abort();
              } else if (this.image) {
                this.stop();
              }
            }
          }], [{
            key: "noConflict",
            value: function noConflict() {
              window.Cropper = AnotherCropper;
              return Cropper3;
            }
          }, {
            key: "setDefaults",
            value: function setDefaults(options) {
              assign2(DEFAULTS, isPlainObject(options) && options);
            }
          }]);
          return Cropper3;
        }();
        assign2(Cropper2.prototype, render, preview, events, handlers, change, methods);
        return Cropper2;
      });
    }
  });

  // ../node_modules/is-mobile/index.js
  var require_is_mobile = __commonJS({
    "../node_modules/is-mobile/index.js"(exports, module) {
      "use strict";
      module.exports = isMobile2;
      module.exports.isMobile = isMobile2;
      module.exports.default = isMobile2;
      var mobileRE = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
      var notMobileRE = /CrOS/;
      var tabletRE = /android|ipad|playbook|silk/i;
      function isMobile2(opts) {
        if (!opts)
          opts = {};
        let ua = opts.ua;
        if (!ua && typeof navigator !== "undefined")
          ua = navigator.userAgent;
        if (ua && ua.headers && typeof ua.headers["user-agent"] === "string") {
          ua = ua.headers["user-agent"];
        }
        if (typeof ua !== "string")
          return false;
        let result2 = mobileRE.test(ua) && !notMobileRE.test(ua) || !!opts.tablet && tabletRE.test(ua);
        if (!result2 && opts.tablet && opts.featureDetect && navigator && navigator.maxTouchPoints > 1 && ua.indexOf("Macintosh") !== -1 && ua.indexOf("Safari") !== -1) {
          result2 = true;
        }
        return result2;
      }
    }
  });

  // ../node_modules/requires-port/index.js
  var require_requires_port = __commonJS({
    "../node_modules/requires-port/index.js"(exports, module) {
      "use strict";
      module.exports = function required(port, protocol) {
        protocol = protocol.split(":")[0];
        port = +port;
        if (!port)
          return false;
        switch (protocol) {
          case "http":
          case "ws":
            return port !== 80;
          case "https":
          case "wss":
            return port !== 443;
          case "ftp":
            return port !== 21;
          case "gopher":
            return port !== 70;
          case "file":
            return false;
        }
        return port !== 0;
      };
    }
  });

  // ../node_modules/querystringify/index.js
  var require_querystringify = __commonJS({
    "../node_modules/querystringify/index.js"(exports) {
      "use strict";
      var has2 = Object.prototype.hasOwnProperty;
      var undef;
      function decode2(input) {
        try {
          return decodeURIComponent(input.replace(/\+/g, " "));
        } catch (e4) {
          return null;
        }
      }
      function encode2(input) {
        try {
          return encodeURIComponent(input);
        } catch (e4) {
          return null;
        }
      }
      function querystring(query) {
        var parser = /([^=?#&]+)=?([^&]*)/g, result2 = {}, part;
        while (part = parser.exec(query)) {
          var key = decode2(part[1]), value = decode2(part[2]);
          if (key === null || value === null || key in result2)
            continue;
          result2[key] = value;
        }
        return result2;
      }
      function querystringify(obj, prefix) {
        prefix = prefix || "";
        var pairs = [], value, key;
        if ("string" !== typeof prefix)
          prefix = "?";
        for (key in obj) {
          if (has2.call(obj, key)) {
            value = obj[key];
            if (!value && (value === null || value === undef || isNaN(value))) {
              value = "";
            }
            key = encode2(key);
            value = encode2(value);
            if (key === null || value === null)
              continue;
            pairs.push(key + "=" + value);
          }
        }
        return pairs.length ? prefix + pairs.join("&") : "";
      }
      exports.stringify = querystringify;
      exports.parse = querystring;
    }
  });

  // ../node_modules/url-parse/index.js
  var require_url_parse = __commonJS({
    "../node_modules/url-parse/index.js"(exports, module) {
      "use strict";
      var required = require_requires_port();
      var qs = require_querystringify();
      var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
      var CRHTLF = /[\n\r\t]/g;
      var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
      var port = /:\d+$/;
      var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
      var windowsDriveLetter = /^[a-zA-Z]:/;
      function trimLeft(str) {
        return (str ? str : "").toString().replace(controlOrWhitespace, "");
      }
      var rules = [
        ["#", "hash"],
        ["?", "query"],
        function sanitize(address, url) {
          return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
        },
        ["/", "pathname"],
        ["@", "auth", 1],
        [NaN, "host", void 0, 1, 1],
        [/:(\d*)$/, "port", void 0, 1],
        [NaN, "hostname", void 0, 1, 1]
      ];
      var ignore = {
        hash: 1,
        query: 1
      };
      function lolcation(loc) {
        var globalVar;
        if (typeof window !== "undefined")
          globalVar = window;
        else if (typeof global !== "undefined")
          globalVar = global;
        else if (typeof self !== "undefined")
          globalVar = self;
        else
          globalVar = {};
        var location2 = globalVar.location || {};
        loc = loc || location2;
        var finaldestination = {}, type = typeof loc, key;
        if ("blob:" === loc.protocol) {
          finaldestination = new Url2(unescape(loc.pathname), {});
        } else if ("string" === type) {
          finaldestination = new Url2(loc, {});
          for (key in ignore)
            delete finaldestination[key];
        } else if ("object" === type) {
          for (key in loc) {
            if (key in ignore)
              continue;
            finaldestination[key] = loc[key];
          }
          if (finaldestination.slashes === void 0) {
            finaldestination.slashes = slashes.test(loc.href);
          }
        }
        return finaldestination;
      }
      function isSpecial(scheme) {
        return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
      }
      function extractProtocol(address, location2) {
        address = trimLeft(address);
        address = address.replace(CRHTLF, "");
        location2 = location2 || {};
        var match2 = protocolre.exec(address);
        var protocol = match2[1] ? match2[1].toLowerCase() : "";
        var forwardSlashes = !!match2[2];
        var otherSlashes = !!match2[3];
        var slashesCount = 0;
        var rest;
        if (forwardSlashes) {
          if (otherSlashes) {
            rest = match2[2] + match2[3] + match2[4];
            slashesCount = match2[2].length + match2[3].length;
          } else {
            rest = match2[2] + match2[4];
            slashesCount = match2[2].length;
          }
        } else {
          if (otherSlashes) {
            rest = match2[3] + match2[4];
            slashesCount = match2[3].length;
          } else {
            rest = match2[4];
          }
        }
        if (protocol === "file:") {
          if (slashesCount >= 2) {
            rest = rest.slice(2);
          }
        } else if (isSpecial(protocol)) {
          rest = match2[4];
        } else if (protocol) {
          if (forwardSlashes) {
            rest = rest.slice(2);
          }
        } else if (slashesCount >= 2 && isSpecial(location2.protocol)) {
          rest = match2[4];
        }
        return {
          protocol,
          slashes: forwardSlashes || isSpecial(protocol),
          slashesCount,
          rest
        };
      }
      function resolve(relative, base) {
        if (relative === "")
          return base;
        var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i4 = path.length, last = path[i4 - 1], unshift = false, up = 0;
        while (i4--) {
          if (path[i4] === ".") {
            path.splice(i4, 1);
          } else if (path[i4] === "..") {
            path.splice(i4, 1);
            up++;
          } else if (up) {
            if (i4 === 0)
              unshift = true;
            path.splice(i4, 1);
            up--;
          }
        }
        if (unshift)
          path.unshift("");
        if (last === "." || last === "..")
          path.push("");
        return path.join("/");
      }
      function Url2(address, location2, parser) {
        address = trimLeft(address);
        address = address.replace(CRHTLF, "");
        if (!(this instanceof Url2)) {
          return new Url2(address, location2, parser);
        }
        var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location2, url = this, i4 = 0;
        if ("object" !== type && "string" !== type) {
          parser = location2;
          location2 = null;
        }
        if (parser && "function" !== typeof parser)
          parser = qs.parse;
        location2 = lolcation(location2);
        extracted = extractProtocol(address || "", location2);
        relative = !extracted.protocol && !extracted.slashes;
        url.slashes = extracted.slashes || relative && location2.slashes;
        url.protocol = extracted.protocol || location2.protocol || "";
        address = extracted.rest;
        if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
          instructions[3] = [/(.*)/, "pathname"];
        }
        for (; i4 < instructions.length; i4++) {
          instruction = instructions[i4];
          if (typeof instruction === "function") {
            address = instruction(address, url);
            continue;
          }
          parse = instruction[0];
          key = instruction[1];
          if (parse !== parse) {
            url[key] = address;
          } else if ("string" === typeof parse) {
            index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
            if (~index) {
              if ("number" === typeof instruction[2]) {
                url[key] = address.slice(0, index);
                address = address.slice(index + instruction[2]);
              } else {
                url[key] = address.slice(index);
                address = address.slice(0, index);
              }
            }
          } else if (index = parse.exec(address)) {
            url[key] = index[1];
            address = address.slice(0, index.index);
          }
          url[key] = url[key] || (relative && instruction[3] ? location2[key] || "" : "");
          if (instruction[4])
            url[key] = url[key].toLowerCase();
        }
        if (parser)
          url.query = parser(url.query);
        if (relative && location2.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location2.pathname !== "")) {
          url.pathname = resolve(url.pathname, location2.pathname);
        }
        if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
          url.pathname = "/" + url.pathname;
        }
        if (!required(url.port, url.protocol)) {
          url.host = url.hostname;
          url.port = "";
        }
        url.username = url.password = "";
        if (url.auth) {
          index = url.auth.indexOf(":");
          if (~index) {
            url.username = url.auth.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = url.auth.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(url.auth));
          }
          url.auth = url.password ? url.username + ":" + url.password : url.username;
        }
        url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
        url.href = url.toString();
      }
      function set(part, value, fn) {
        var url = this;
        switch (part) {
          case "query":
            if ("string" === typeof value && value.length) {
              value = (fn || qs.parse)(value);
            }
            url[part] = value;
            break;
          case "port":
            url[part] = value;
            if (!required(value, url.protocol)) {
              url.host = url.hostname;
              url[part] = "";
            } else if (value) {
              url.host = url.hostname + ":" + value;
            }
            break;
          case "hostname":
            url[part] = value;
            if (url.port)
              value += ":" + url.port;
            url.host = value;
            break;
          case "host":
            url[part] = value;
            if (port.test(value)) {
              value = value.split(":");
              url.port = value.pop();
              url.hostname = value.join(":");
            } else {
              url.hostname = value;
              url.port = "";
            }
            break;
          case "protocol":
            url.protocol = value.toLowerCase();
            url.slashes = !fn;
            break;
          case "pathname":
          case "hash":
            if (value) {
              var char = part === "pathname" ? "/" : "#";
              url[part] = value.charAt(0) !== char ? char + value : value;
            } else {
              url[part] = value;
            }
            break;
          case "username":
          case "password":
            url[part] = encodeURIComponent(value);
            break;
          case "auth":
            var index = value.indexOf(":");
            if (~index) {
              url.username = value.slice(0, index);
              url.username = encodeURIComponent(decodeURIComponent(url.username));
              url.password = value.slice(index + 1);
              url.password = encodeURIComponent(decodeURIComponent(url.password));
            } else {
              url.username = encodeURIComponent(decodeURIComponent(value));
            }
        }
        for (var i4 = 0; i4 < rules.length; i4++) {
          var ins = rules[i4];
          if (ins[4])
            url[ins[1]] = url[ins[1]].toLowerCase();
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
        url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
        url.href = url.toString();
        return url;
      }
      function toString(stringify) {
        if (!stringify || "function" !== typeof stringify)
          stringify = qs.stringify;
        var query, url = this, host = url.host, protocol = url.protocol;
        if (protocol && protocol.charAt(protocol.length - 1) !== ":")
          protocol += ":";
        var result2 = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
        if (url.username) {
          result2 += url.username;
          if (url.password)
            result2 += ":" + url.password;
          result2 += "@";
        } else if (url.password) {
          result2 += ":" + url.password;
          result2 += "@";
        } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
          result2 += "@";
        }
        if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
          host += ":";
        }
        result2 += host + url.pathname;
        query = "object" === typeof url.query ? stringify(url.query) : url.query;
        if (query)
          result2 += "?" !== query.charAt(0) ? "?" + query : query;
        if (url.hash)
          result2 += url.hash;
        return result2;
      }
      Url2.prototype = {
        set,
        toString
      };
      Url2.extractProtocol = extractProtocol;
      Url2.location = lolcation;
      Url2.trimLeft = trimLeft;
      Url2.qs = qs;
      module.exports = Url2;
    }
  });

  // ../node_modules/compressorjs/dist/compressor.common.js
  var require_compressor_common = __commonJS({
    "../node_modules/compressorjs/dist/compressor.common.js"(exports, module) {
      "use strict";
      function ownKeys3(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          }
          keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread22(target) {
        for (var i4 = 1; i4 < arguments.length; i4++) {
          var source = arguments[i4] != null ? arguments[i4] : {};
          if (i4 % 2) {
            ownKeys3(Object(source), true).forEach(function(key) {
              _defineProperty3(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys3(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }
        return target;
      }
      function _classCallCheck10(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties10(target, props) {
        for (var i4 = 0; i4 < props.length; i4++) {
          var descriptor = props[i4];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass10(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties10(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties10(Constructor, staticProps);
        return Constructor;
      }
      function _defineProperty3(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _extends10() {
        _extends10 = Object.assign || function(target) {
          for (var i4 = 1; i4 < arguments.length; i4++) {
            var source = arguments[i4];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends10.apply(this, arguments);
      }
      var canvasToBlob3 = {
        exports: {}
      };
      (function(module2) {
        if (typeof window === "undefined") {
          return;
        }
        (function(window2) {
          var CanvasPrototype = window2.HTMLCanvasElement && window2.HTMLCanvasElement.prototype;
          var hasBlobConstructor = window2.Blob && function() {
            try {
              return Boolean(new Blob());
            } catch (e4) {
              return false;
            }
          }();
          var hasArrayBufferViewSupport = hasBlobConstructor && window2.Uint8Array && function() {
            try {
              return new Blob([new Uint8Array(100)]).size === 100;
            } catch (e4) {
              return false;
            }
          }();
          var BlobBuilder = window2.BlobBuilder || window2.WebKitBlobBuilder || window2.MozBlobBuilder || window2.MSBlobBuilder;
          var dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;
          var dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window2.atob && window2.ArrayBuffer && window2.Uint8Array && function(dataURI) {
            var matches, mediaType, isBase64, dataString, byteString, arrayBuffer, intArray, i4, bb;
            matches = dataURI.match(dataURIPattern);
            if (!matches) {
              throw new Error("invalid data URI");
            }
            mediaType = matches[2] ? matches[1] : "text/plain" + (matches[3] || ";charset=US-ASCII");
            isBase64 = !!matches[4];
            dataString = dataURI.slice(matches[0].length);
            if (isBase64) {
              byteString = atob(dataString);
            } else {
              byteString = decodeURIComponent(dataString);
            }
            arrayBuffer = new ArrayBuffer(byteString.length);
            intArray = new Uint8Array(arrayBuffer);
            for (i4 = 0; i4 < byteString.length; i4 += 1) {
              intArray[i4] = byteString.charCodeAt(i4);
            }
            if (hasBlobConstructor) {
              return new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], {
                type: mediaType
              });
            }
            bb = new BlobBuilder();
            bb.append(arrayBuffer);
            return bb.getBlob(mediaType);
          };
          if (window2.HTMLCanvasElement && !CanvasPrototype.toBlob) {
            if (CanvasPrototype.mozGetAsFile) {
              CanvasPrototype.toBlob = function(callback, type, quality) {
                var self2 = this;
                setTimeout(function() {
                  if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
                    callback(dataURLtoBlob(self2.toDataURL(type, quality)));
                  } else {
                    callback(self2.mozGetAsFile("blob", type));
                  }
                });
              };
            } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
              if (CanvasPrototype.msToBlob) {
                CanvasPrototype.toBlob = function(callback, type, quality) {
                  var self2 = this;
                  setTimeout(function() {
                    if ((type && type !== "image/png" || quality) && CanvasPrototype.toDataURL && dataURLtoBlob) {
                      callback(dataURLtoBlob(self2.toDataURL(type, quality)));
                    } else {
                      callback(self2.msToBlob(type));
                    }
                  });
                };
              } else {
                CanvasPrototype.toBlob = function(callback, type, quality) {
                  var self2 = this;
                  setTimeout(function() {
                    callback(dataURLtoBlob(self2.toDataURL(type, quality)));
                  });
                };
              }
            }
          }
          if (module2.exports) {
            module2.exports = dataURLtoBlob;
          } else {
            window2.dataURLtoBlob = dataURLtoBlob;
          }
        })(window);
      })(canvasToBlob3);
      var toBlob = canvasToBlob3.exports;
      var isBlob = function isBlob2(value) {
        if (typeof Blob === "undefined") {
          return false;
        }
        return value instanceof Blob || Object.prototype.toString.call(value) === "[object Blob]";
      };
      var DEFAULTS = {
        strict: true,
        checkOrientation: true,
        maxWidth: Infinity,
        maxHeight: Infinity,
        minWidth: 0,
        minHeight: 0,
        width: void 0,
        height: void 0,
        resize: "none",
        quality: 0.8,
        mimeType: "auto",
        convertTypes: ["image/png"],
        convertSize: 5e6,
        beforeDraw: null,
        drew: null,
        success: null,
        error: null
      };
      var IS_BROWSER = typeof window !== "undefined" && typeof window.document !== "undefined";
      var WINDOW = IS_BROWSER ? window : {};
      var isPositiveNumber = function isPositiveNumber2(value) {
        return value > 0 && value < Infinity;
      };
      var slice = Array.prototype.slice;
      function toArray(value) {
        return Array.from ? Array.from(value) : slice.call(value);
      }
      var REGEXP_IMAGE_TYPE = /^image\/.+$/;
      function isImageType(value) {
        return REGEXP_IMAGE_TYPE.test(value);
      }
      function imageTypeToExtension(value) {
        var extension = isImageType(value) ? value.substr(6) : "";
        if (extension === "jpeg") {
          extension = "jpg";
        }
        return ".".concat(extension);
      }
      var fromCharCode = String.fromCharCode;
      function getStringFromCharCode(dataView, start, length) {
        var str = "";
        var i4;
        length += start;
        for (i4 = start; i4 < length; i4 += 1) {
          str += fromCharCode(dataView.getUint8(i4));
        }
        return str;
      }
      var btoa2 = WINDOW.btoa;
      function arrayBufferToDataURL(arrayBuffer, mimeType) {
        var chunks2 = [];
        var chunkSize = 8192;
        var uint8 = new Uint8Array(arrayBuffer);
        while (uint8.length > 0) {
          chunks2.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
          uint8 = uint8.subarray(chunkSize);
        }
        return "data:".concat(mimeType, ";base64,").concat(btoa2(chunks2.join("")));
      }
      function resetAndGetOrientation(arrayBuffer) {
        var dataView = new DataView(arrayBuffer);
        var orientation;
        try {
          var littleEndian;
          var app1Start;
          var ifdStart;
          if (dataView.getUint8(0) === 255 && dataView.getUint8(1) === 216) {
            var length = dataView.byteLength;
            var offset = 2;
            while (offset + 1 < length) {
              if (dataView.getUint8(offset) === 255 && dataView.getUint8(offset + 1) === 225) {
                app1Start = offset;
                break;
              }
              offset += 1;
            }
          }
          if (app1Start) {
            var exifIDCode = app1Start + 4;
            var tiffOffset = app1Start + 10;
            if (getStringFromCharCode(dataView, exifIDCode, 4) === "Exif") {
              var endianness = dataView.getUint16(tiffOffset);
              littleEndian = endianness === 18761;
              if (littleEndian || endianness === 19789) {
                if (dataView.getUint16(tiffOffset + 2, littleEndian) === 42) {
                  var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
                  if (firstIFDOffset >= 8) {
                    ifdStart = tiffOffset + firstIFDOffset;
                  }
                }
              }
            }
          }
          if (ifdStart) {
            var _length = dataView.getUint16(ifdStart, littleEndian);
            var _offset;
            var i4;
            for (i4 = 0; i4 < _length; i4 += 1) {
              _offset = ifdStart + i4 * 12 + 2;
              if (dataView.getUint16(_offset, littleEndian) === 274) {
                _offset += 8;
                orientation = dataView.getUint16(_offset, littleEndian);
                dataView.setUint16(_offset, 1, littleEndian);
                break;
              }
            }
          }
        } catch (e4) {
          orientation = 1;
        }
        return orientation;
      }
      function parseOrientation(orientation) {
        var rotate = 0;
        var scaleX = 1;
        var scaleY = 1;
        switch (orientation) {
          case 2:
            scaleX = -1;
            break;
          case 3:
            rotate = -180;
            break;
          case 4:
            scaleY = -1;
            break;
          case 5:
            rotate = 90;
            scaleY = -1;
            break;
          case 6:
            rotate = 90;
            break;
          case 7:
            rotate = 90;
            scaleX = -1;
            break;
          case 8:
            rotate = -90;
            break;
        }
        return {
          rotate,
          scaleX,
          scaleY
        };
      }
      var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
      function normalizeDecimalNumber(value) {
        var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
        return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
      }
      function getAdjustedSizes(_ref) {
        var aspectRatio = _ref.aspectRatio, height = _ref.height, width = _ref.width;
        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "none";
        var isValidWidth = isPositiveNumber(width);
        var isValidHeight = isPositiveNumber(height);
        if (isValidWidth && isValidHeight) {
          var adjustedWidth = height * aspectRatio;
          if ((type === "contain" || type === "none") && adjustedWidth > width || type === "cover" && adjustedWidth < width) {
            height = width / aspectRatio;
          } else {
            width = height * aspectRatio;
          }
        } else if (isValidWidth) {
          height = width / aspectRatio;
        } else if (isValidHeight) {
          width = height * aspectRatio;
        }
        return {
          width,
          height
        };
      }
      var ArrayBuffer$1 = WINDOW.ArrayBuffer;
      var FileReader3 = WINDOW.FileReader;
      var URL3 = WINDOW.URL || WINDOW.webkitURL;
      var REGEXP_EXTENSION = /\.\w+$/;
      var AnotherCompressor = WINDOW.Compressor;
      var Compressor2 = /* @__PURE__ */ function() {
        function Compressor3(file, options) {
          _classCallCheck10(this, Compressor3);
          this.file = file;
          this.image = new Image();
          this.options = _objectSpread22(_objectSpread22({}, DEFAULTS), options);
          this.aborted = false;
          this.result = null;
          this.init();
        }
        _createClass10(Compressor3, [{
          key: "init",
          value: function init() {
            var _this = this;
            var file = this.file, options = this.options;
            if (!isBlob(file)) {
              this.fail(new Error("The first argument must be a File or Blob object."));
              return;
            }
            var mimeType = file.type;
            if (!isImageType(mimeType)) {
              this.fail(new Error("The first argument must be an image File or Blob object."));
              return;
            }
            if (!URL3 || !FileReader3) {
              this.fail(new Error("The current browser does not support image compression."));
              return;
            }
            if (!ArrayBuffer$1) {
              options.checkOrientation = false;
            }
            if (URL3 && !options.checkOrientation) {
              this.load({
                url: URL3.createObjectURL(file)
              });
            } else {
              var reader = new FileReader3();
              var checkOrientation = options.checkOrientation && mimeType === "image/jpeg";
              this.reader = reader;
              reader.onload = function(_ref) {
                var target = _ref.target;
                var result2 = target.result;
                var data = {};
                if (checkOrientation) {
                  var orientation = resetAndGetOrientation(result2);
                  if (orientation > 1 || !URL3) {
                    data.url = arrayBufferToDataURL(result2, mimeType);
                    if (orientation > 1) {
                      _extends10(data, parseOrientation(orientation));
                    }
                  } else {
                    data.url = URL3.createObjectURL(file);
                  }
                } else {
                  data.url = result2;
                }
                _this.load(data);
              };
              reader.onabort = function() {
                _this.fail(new Error("Aborted to read the image with FileReader."));
              };
              reader.onerror = function() {
                _this.fail(new Error("Failed to read the image with FileReader."));
              };
              reader.onloadend = function() {
                _this.reader = null;
              };
              if (checkOrientation) {
                reader.readAsArrayBuffer(file);
              } else {
                reader.readAsDataURL(file);
              }
            }
          }
        }, {
          key: "load",
          value: function load(data) {
            var _this2 = this;
            var file = this.file, image = this.image;
            image.onload = function() {
              _this2.draw(_objectSpread22(_objectSpread22({}, data), {}, {
                naturalWidth: image.naturalWidth,
                naturalHeight: image.naturalHeight
              }));
            };
            image.onabort = function() {
              _this2.fail(new Error("Aborted to load the image."));
            };
            image.onerror = function() {
              _this2.fail(new Error("Failed to load the image."));
            };
            if (WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent)) {
              image.crossOrigin = "anonymous";
            }
            image.alt = file.name;
            image.src = data.url;
          }
        }, {
          key: "draw",
          value: function draw(_ref2) {
            var _this3 = this;
            var naturalWidth = _ref2.naturalWidth, naturalHeight = _ref2.naturalHeight, _ref2$rotate = _ref2.rotate, rotate = _ref2$rotate === void 0 ? 0 : _ref2$rotate, _ref2$scaleX = _ref2.scaleX, scaleX = _ref2$scaleX === void 0 ? 1 : _ref2$scaleX, _ref2$scaleY = _ref2.scaleY, scaleY = _ref2$scaleY === void 0 ? 1 : _ref2$scaleY;
            var file = this.file, image = this.image, options = this.options;
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            var is90DegreesRotated = Math.abs(rotate) % 180 === 90;
            var resizable = (options.resize === "contain" || options.resize === "cover") && isPositiveNumber(options.width) && isPositiveNumber(options.height);
            var maxWidth = Math.max(options.maxWidth, 0) || Infinity;
            var maxHeight = Math.max(options.maxHeight, 0) || Infinity;
            var minWidth = Math.max(options.minWidth, 0) || 0;
            var minHeight = Math.max(options.minHeight, 0) || 0;
            var aspectRatio = naturalWidth / naturalHeight;
            var width = options.width, height = options.height;
            if (is90DegreesRotated) {
              var _ref3 = [maxHeight, maxWidth];
              maxWidth = _ref3[0];
              maxHeight = _ref3[1];
              var _ref4 = [minHeight, minWidth];
              minWidth = _ref4[0];
              minHeight = _ref4[1];
              var _ref5 = [height, width];
              width = _ref5[0];
              height = _ref5[1];
            }
            if (resizable) {
              aspectRatio = width / height;
            }
            var _getAdjustedSizes = getAdjustedSizes({
              aspectRatio,
              width: maxWidth,
              height: maxHeight
            }, "contain");
            maxWidth = _getAdjustedSizes.width;
            maxHeight = _getAdjustedSizes.height;
            var _getAdjustedSizes2 = getAdjustedSizes({
              aspectRatio,
              width: minWidth,
              height: minHeight
            }, "cover");
            minWidth = _getAdjustedSizes2.width;
            minHeight = _getAdjustedSizes2.height;
            if (resizable) {
              var _getAdjustedSizes3 = getAdjustedSizes({
                aspectRatio,
                width,
                height
              }, options.resize);
              width = _getAdjustedSizes3.width;
              height = _getAdjustedSizes3.height;
            } else {
              var _getAdjustedSizes4 = getAdjustedSizes({
                aspectRatio,
                width,
                height
              });
              var _getAdjustedSizes4$wi = _getAdjustedSizes4.width;
              width = _getAdjustedSizes4$wi === void 0 ? naturalWidth : _getAdjustedSizes4$wi;
              var _getAdjustedSizes4$he = _getAdjustedSizes4.height;
              height = _getAdjustedSizes4$he === void 0 ? naturalHeight : _getAdjustedSizes4$he;
            }
            width = Math.floor(normalizeDecimalNumber(Math.min(Math.max(width, minWidth), maxWidth)));
            height = Math.floor(normalizeDecimalNumber(Math.min(Math.max(height, minHeight), maxHeight)));
            var destX = -width / 2;
            var destY = -height / 2;
            var destWidth = width;
            var destHeight = height;
            var params = [];
            if (resizable) {
              var srcX = 0;
              var srcY = 0;
              var srcWidth = naturalWidth;
              var srcHeight = naturalHeight;
              var _getAdjustedSizes5 = getAdjustedSizes({
                aspectRatio,
                width: naturalWidth,
                height: naturalHeight
              }, {
                contain: "cover",
                cover: "contain"
              }[options.resize]);
              srcWidth = _getAdjustedSizes5.width;
              srcHeight = _getAdjustedSizes5.height;
              srcX = (naturalWidth - srcWidth) / 2;
              srcY = (naturalHeight - srcHeight) / 2;
              params.push(srcX, srcY, srcWidth, srcHeight);
            }
            params.push(destX, destY, destWidth, destHeight);
            if (is90DegreesRotated) {
              var _ref6 = [height, width];
              width = _ref6[0];
              height = _ref6[1];
            }
            canvas.width = width;
            canvas.height = height;
            if (!isImageType(options.mimeType)) {
              options.mimeType = file.type;
            }
            var fillStyle = "transparent";
            if (file.size > options.convertSize && options.convertTypes.indexOf(options.mimeType) >= 0) {
              options.mimeType = "image/jpeg";
            }
            if (options.mimeType === "image/jpeg") {
              fillStyle = "#fff";
            }
            context.fillStyle = fillStyle;
            context.fillRect(0, 0, width, height);
            if (options.beforeDraw) {
              options.beforeDraw.call(this, context, canvas);
            }
            if (this.aborted) {
              return;
            }
            context.save();
            context.translate(width / 2, height / 2);
            context.rotate(rotate * Math.PI / 180);
            context.scale(scaleX, scaleY);
            context.drawImage.apply(context, [image].concat(params));
            context.restore();
            if (options.drew) {
              options.drew.call(this, context, canvas);
            }
            if (this.aborted) {
              return;
            }
            var done = function done2(result2) {
              if (!_this3.aborted) {
                _this3.done({
                  naturalWidth,
                  naturalHeight,
                  result: result2
                });
              }
            };
            if (canvas.toBlob) {
              canvas.toBlob(done, options.mimeType, options.quality);
            } else {
              done(toBlob(canvas.toDataURL(options.mimeType, options.quality)));
            }
          }
        }, {
          key: "done",
          value: function done(_ref7) {
            var naturalWidth = _ref7.naturalWidth, naturalHeight = _ref7.naturalHeight, result2 = _ref7.result;
            var file = this.file, image = this.image, options = this.options;
            if (URL3 && !options.checkOrientation) {
              URL3.revokeObjectURL(image.src);
            }
            if (result2) {
              if (options.strict && result2.size > file.size && options.mimeType === file.type && !(options.width > naturalWidth || options.height > naturalHeight || options.minWidth > naturalWidth || options.minHeight > naturalHeight || options.maxWidth < naturalWidth || options.maxHeight < naturalHeight)) {
                result2 = file;
              } else {
                var date = new Date();
                result2.lastModified = date.getTime();
                result2.lastModifiedDate = date;
                result2.name = file.name;
                if (result2.name && result2.type !== file.type) {
                  result2.name = result2.name.replace(REGEXP_EXTENSION, imageTypeToExtension(result2.type));
                }
              }
            } else {
              result2 = file;
            }
            this.result = result2;
            if (options.success) {
              options.success.call(this, result2);
            }
          }
        }, {
          key: "fail",
          value: function fail(err) {
            var options = this.options;
            if (options.error) {
              options.error.call(this, err);
            } else {
              throw err;
            }
          }
        }, {
          key: "abort",
          value: function abort() {
            if (!this.aborted) {
              this.aborted = true;
              if (this.reader) {
                this.reader.abort();
              } else if (!this.image.complete) {
                this.image.onload = null;
                this.image.onabort();
              } else {
                this.fail(new Error("The compression process has been aborted."));
              }
            }
          }
        }], [{
          key: "noConflict",
          value: function noConflict() {
            window.Compressor = AnotherCompressor;
            return Compressor3;
          }
        }, {
          key: "setDefaults",
          value: function setDefaults(options) {
            _extends10(DEFAULTS, options);
          }
        }]);
        return Compressor3;
      }();
      module.exports = Compressor2;
    }
  });

  // src/examples/env.js
  var require_env = __commonJS({
    "src/examples/env.js"(exports, module) {
      var companionEndpoint = "http://localhost:3020";
      if (location.hostname === "uppy.io" || /--uppy\.netlify\.app$/.test(location.hostname)) {
        companionEndpoint = "//companion.uppy.io";
      }
      var COMPANION2 = companionEndpoint;
      module.exports = COMPANION2;
    }
  });

  // ../packages/@uppy/utils/lib/hasProperty.js
  function has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  // ../packages/@uppy/utils/lib/Translator.js
  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id = 0;
  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }
  function insertReplacement(source, rx, replacement) {
    const newParts = [];
    source.forEach((chunk) => {
      if (typeof chunk !== "string") {
        return newParts.push(chunk);
      }
      return rx[Symbol.split](chunk).forEach((raw, i4, list) => {
        if (raw !== "") {
          newParts.push(raw);
        }
        if (i4 < list.length - 1) {
          newParts.push(replacement);
        }
      });
    });
    return newParts;
  }
  function interpolate(phrase, options) {
    const dollarRegex = /\$/g;
    const dollarBillsYall = "$$$$";
    let interpolated = [phrase];
    if (options == null)
      return interpolated;
    for (const arg of Object.keys(options)) {
      if (arg !== "_") {
        let replacement = options[arg];
        if (typeof replacement === "string") {
          replacement = dollarRegex[Symbol.replace](replacement, dollarBillsYall);
        }
        interpolated = insertReplacement(interpolated, new RegExp(`%\\{${arg}\\}`, "g"), replacement);
      }
    }
    return interpolated;
  }
  var _apply = /* @__PURE__ */ _classPrivateFieldLooseKey("apply");
  var Translator = class {
    constructor(locales) {
      Object.defineProperty(this, _apply, {
        value: _apply2
      });
      this.locale = {
        strings: {},
        pluralize(n3) {
          if (n3 === 1) {
            return 0;
          }
          return 1;
        }
      };
      if (Array.isArray(locales)) {
        locales.forEach(_classPrivateFieldLooseBase(this, _apply)[_apply], this);
      } else {
        _classPrivateFieldLooseBase(this, _apply)[_apply](locales);
      }
    }
    translate(key, options) {
      return this.translateArray(key, options).join("");
    }
    translateArray(key, options) {
      if (!has(this.locale.strings, key)) {
        throw new Error(`missing string: ${key}`);
      }
      const string = this.locale.strings[key];
      const hasPluralForms = typeof string === "object";
      if (hasPluralForms) {
        if (options && typeof options.smart_count !== "undefined") {
          const plural = this.locale.pluralize(options.smart_count);
          return interpolate(string[plural], options);
        }
        throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
      }
      return interpolate(string, options);
    }
  };
  function _apply2(locale) {
    if (!(locale != null && locale.strings)) {
      return;
    }
    const prevLocale = this.locale;
    this.locale = {
      ...prevLocale,
      strings: {
        ...prevLocale.strings,
        ...locale.strings
      }
    };
    this.locale.pluralize = locale.pluralize || prevLocale.pluralize;
  }

  // ../packages/@uppy/core/lib/Uppy.js
  var import_namespace_emitter = __toESM(require_namespace_emitter(), 1);

  // ../node_modules/nanoid/non-secure/index.js
  var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  var nanoid = function(size) {
    if (size === void 0) {
      size = 21;
    }
    let id18 = "";
    let i4 = size;
    while (i4--) {
      id18 += urlAlphabet[Math.random() * 64 | 0];
    }
    return id18;
  };

  // ../packages/@uppy/core/lib/Uppy.js
  var import_lodash = __toESM(require_lodash(), 1);

  // ../packages/@uppy/store-default/lib/index.js
  function _classPrivateFieldLooseBase2(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id2 = 0;
  function _classPrivateFieldLooseKey2(name) {
    return "__private_" + id2++ + "_" + name;
  }
  var packageJson = {
    "version": "3.0.2"
  };
  var _callbacks = /* @__PURE__ */ _classPrivateFieldLooseKey2("callbacks");
  var _publish = /* @__PURE__ */ _classPrivateFieldLooseKey2("publish");
  var DefaultStore = class {
    constructor() {
      Object.defineProperty(this, _publish, {
        value: _publish2
      });
      Object.defineProperty(this, _callbacks, {
        writable: true,
        value: /* @__PURE__ */ new Set()
      });
      this.state = {};
    }
    getState() {
      return this.state;
    }
    setState(patch) {
      const prevState = {
        ...this.state
      };
      const nextState = {
        ...this.state,
        ...patch
      };
      this.state = nextState;
      _classPrivateFieldLooseBase2(this, _publish)[_publish](prevState, nextState, patch);
    }
    subscribe(listener) {
      _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].add(listener);
      return () => {
        _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].delete(listener);
      };
    }
  };
  function _publish2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].forEach((listener) => {
      listener(...args);
    });
  }
  DefaultStore.VERSION = packageJson.version;
  var lib_default = DefaultStore;

  // ../packages/@uppy/utils/lib/getFileNameAndExtension.js
  function getFileNameAndExtension(fullFileName) {
    const lastDot = fullFileName.lastIndexOf(".");
    if (lastDot === -1 || lastDot === fullFileName.length - 1) {
      return {
        name: fullFileName,
        extension: void 0
      };
    }
    return {
      name: fullFileName.slice(0, lastDot),
      extension: fullFileName.slice(lastDot + 1)
    };
  }

  // ../packages/@uppy/utils/lib/mimeTypes.js
  var mimeTypes_default = {
    md: "text/markdown",
    markdown: "text/markdown",
    mp4: "video/mp4",
    mp3: "audio/mp3",
    svg: "image/svg+xml",
    jpg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    heic: "image/heic",
    heif: "image/heif",
    yaml: "text/yaml",
    yml: "text/yaml",
    csv: "text/csv",
    tsv: "text/tab-separated-values",
    tab: "text/tab-separated-values",
    avi: "video/x-msvideo",
    mks: "video/x-matroska",
    mkv: "video/x-matroska",
    mov: "video/quicktime",
    dicom: "application/dicom",
    doc: "application/msword",
    docm: "application/vnd.ms-word.document.macroenabled.12",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    dot: "application/msword",
    dotm: "application/vnd.ms-word.template.macroenabled.12",
    dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    xla: "application/vnd.ms-excel",
    xlam: "application/vnd.ms-excel.addin.macroenabled.12",
    xlc: "application/vnd.ms-excel",
    xlf: "application/x-xliff+xml",
    xlm: "application/vnd.ms-excel",
    xls: "application/vnd.ms-excel",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
    xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xlt: "application/vnd.ms-excel",
    xltm: "application/vnd.ms-excel.template.macroenabled.12",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    xlw: "application/vnd.ms-excel",
    txt: "text/plain",
    text: "text/plain",
    conf: "text/plain",
    log: "text/plain",
    pdf: "application/pdf",
    zip: "application/zip",
    "7z": "application/x-7z-compressed",
    rar: "application/x-rar-compressed",
    tar: "application/x-tar",
    gz: "application/gzip",
    dmg: "application/x-apple-diskimage"
  };

  // ../packages/@uppy/utils/lib/getFileType.js
  function getFileType(file) {
    var _getFileNameAndExtens;
    if (file.type)
      return file.type;
    const fileExtension = file.name ? (_getFileNameAndExtens = getFileNameAndExtension(file.name).extension) == null ? void 0 : _getFileNameAndExtens.toLowerCase() : null;
    if (fileExtension && fileExtension in mimeTypes_default) {
      return mimeTypes_default[fileExtension];
    }
    return "application/octet-stream";
  }

  // ../packages/@uppy/utils/lib/generateFileID.js
  function encodeCharacter(character) {
    return character.charCodeAt(0).toString(32);
  }
  function encodeFilename(name) {
    let suffix = "";
    return name.replace(/[^A-Z0-9]/ig, (character) => {
      suffix += `-${encodeCharacter(character)}`;
      return "/";
    }) + suffix;
  }
  function generateFileID(file) {
    let id18 = "uppy";
    if (typeof file.name === "string") {
      id18 += `-${encodeFilename(file.name.toLowerCase())}`;
    }
    if (file.type !== void 0) {
      id18 += `-${file.type}`;
    }
    if (file.meta && typeof file.meta.relativePath === "string") {
      id18 += `-${encodeFilename(file.meta.relativePath.toLowerCase())}`;
    }
    if (file.data.size !== void 0) {
      id18 += `-${file.data.size}`;
    }
    if (file.data.lastModified !== void 0) {
      id18 += `-${file.data.lastModified}`;
    }
    return id18;
  }

  // ../packages/@uppy/core/lib/supportsUploadProgress.js
  function supportsUploadProgress(userAgent) {
    if (userAgent == null && typeof navigator !== "undefined") {
      userAgent = navigator.userAgent;
    }
    if (!userAgent)
      return true;
    const m4 = /Edge\/(\d+\.\d+)/.exec(userAgent);
    if (!m4)
      return true;
    const edgeVersion = m4[1];
    let [major, minor] = edgeVersion.split(".");
    major = parseInt(major, 10);
    minor = parseInt(minor, 10);
    if (major < 15 || major === 15 && minor < 15063) {
      return true;
    }
    if (major > 18 || major === 18 && minor >= 18218) {
      return true;
    }
    return false;
  }

  // ../packages/@uppy/core/lib/getFileName.js
  function getFileName(fileType, fileDescriptor) {
    if (fileDescriptor.name) {
      return fileDescriptor.name;
    }
    if (fileType.split("/")[0] === "image") {
      return `${fileType.split("/")[0]}.${fileType.split("/")[1]}`;
    }
    return "noname";
  }

  // ../packages/@uppy/utils/lib/getTimeStamp.js
  function pad(number) {
    return number < 10 ? `0${number}` : number.toString();
  }
  function getTimeStamp() {
    const date = new Date();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  // ../packages/@uppy/core/lib/loggers.js
  var justErrorsLogger = {
    debug: () => {
    },
    warn: () => {
    },
    error: function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
    }
  };
  var debugLogger = {
    debug: function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return console.debug(`[Uppy] [${getTimeStamp()}]`, ...args);
    },
    warn: function() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return console.warn(`[Uppy] [${getTimeStamp()}]`, ...args);
    },
    error: function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
    }
  };

  // ../packages/@uppy/core/lib/Restricter.js
  var import_prettier_bytes = __toESM(require_prettierBytes(), 1);
  var import_mime_match = __toESM(require_mime_match(), 1);
  var defaultOptions = {
    maxFileSize: null,
    minFileSize: null,
    maxTotalFileSize: null,
    maxNumberOfFiles: null,
    minNumberOfFiles: null,
    allowedFileTypes: null,
    requiredMetaFields: []
  };
  var RestrictionError = class extends Error {
    constructor() {
      super(...arguments);
      this.isRestriction = true;
    }
  };
  var Restricter = class {
    constructor(getOpts, i18n) {
      this.i18n = i18n;
      this.getOpts = () => {
        const opts = getOpts();
        if (opts.restrictions.allowedFileTypes != null && !Array.isArray(opts.restrictions.allowedFileTypes)) {
          throw new TypeError("`restrictions.allowedFileTypes` must be an array");
        }
        return opts;
      };
    }
    validate(file, files) {
      const {
        maxFileSize,
        minFileSize,
        maxTotalFileSize,
        maxNumberOfFiles,
        allowedFileTypes
      } = this.getOpts().restrictions;
      if (maxNumberOfFiles) {
        const nonGhostFiles = files.filter((f4) => !f4.isGhost);
        if (nonGhostFiles.length + 1 > maxNumberOfFiles) {
          throw new RestrictionError(`${this.i18n("youCanOnlyUploadX", {
            smart_count: maxNumberOfFiles
          })}`);
        }
      }
      if (allowedFileTypes) {
        const isCorrectFileType = allowedFileTypes.some((type) => {
          if (type.includes("/")) {
            if (!file.type)
              return false;
            return (0, import_mime_match.default)(file.type.replace(/;.*?$/, ""), type);
          }
          if (type[0] === "." && file.extension) {
            return file.extension.toLowerCase() === type.slice(1).toLowerCase();
          }
          return false;
        });
        if (!isCorrectFileType) {
          const allowedFileTypesString = allowedFileTypes.join(", ");
          throw new RestrictionError(this.i18n("youCanOnlyUploadFileTypes", {
            types: allowedFileTypesString
          }));
        }
      }
      if (maxTotalFileSize && file.size != null) {
        const totalFilesSize = files.reduce((total, f4) => total + f4.size, file.size);
        if (totalFilesSize > maxTotalFileSize) {
          throw new RestrictionError(this.i18n("exceedsSize", {
            size: (0, import_prettier_bytes.default)(maxTotalFileSize),
            file: file.name
          }));
        }
      }
      if (maxFileSize && file.size != null && file.size > maxFileSize) {
        throw new RestrictionError(this.i18n("exceedsSize", {
          size: (0, import_prettier_bytes.default)(maxFileSize),
          file: file.name
        }));
      }
      if (minFileSize && file.size != null && file.size < minFileSize) {
        throw new RestrictionError(this.i18n("inferiorSize", {
          size: (0, import_prettier_bytes.default)(minFileSize)
        }));
      }
    }
    validateMinNumberOfFiles(files) {
      const {
        minNumberOfFiles
      } = this.getOpts().restrictions;
      if (Object.keys(files).length < minNumberOfFiles) {
        throw new RestrictionError(this.i18n("youHaveToAtLeastSelectX", {
          smart_count: minNumberOfFiles
        }));
      }
    }
    getMissingRequiredMetaFields(file) {
      const error = new RestrictionError(this.i18n("missingRequiredMetaFieldOnFile", {
        fileName: file.name
      }));
      const {
        requiredMetaFields
      } = this.getOpts().restrictions;
      const missingFields = [];
      for (const field of requiredMetaFields) {
        if (!Object.hasOwn(file.meta, field) || file.meta[field] === "") {
          missingFields.push(field);
        }
      }
      return {
        missingFields,
        error
      };
    }
  };

  // ../packages/@uppy/core/lib/locale.js
  var locale_default = {
    strings: {
      addBulkFilesFailed: {
        0: "Failed to add %{smart_count} file due to an internal error",
        1: "Failed to add %{smart_count} files due to internal errors"
      },
      youCanOnlyUploadX: {
        0: "You can only upload %{smart_count} file",
        1: "You can only upload %{smart_count} files"
      },
      youHaveToAtLeastSelectX: {
        0: "You have to select at least %{smart_count} file",
        1: "You have to select at least %{smart_count} files"
      },
      exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
      missingRequiredMetaField: "Missing required meta fields",
      missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
      inferiorSize: "This file is smaller than the allowed size of %{size}",
      youCanOnlyUploadFileTypes: "You can only upload: %{types}",
      noMoreFilesAllowed: "Cannot add more files",
      noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
      companionError: "Connection with Companion failed",
      authAborted: "Authentication aborted",
      companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
      failedToUpload: "Failed to upload %{file}",
      noInternetConnection: "No Internet connection",
      connectedToInternet: "Connected to the Internet",
      noFilesFound: "You have no files or folders here",
      selectX: {
        0: "Select %{smart_count}",
        1: "Select %{smart_count}"
      },
      allFilesFromFolderNamed: "All files from folder %{name}",
      openFolderNamed: "Open folder %{name}",
      cancel: "Cancel",
      logOut: "Log out",
      filter: "Filter",
      resetFilter: "Reset filter",
      loading: "Loading...",
      authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
      authenticateWith: "Connect to %{pluginName}",
      signInWithGoogle: "Sign in with Google",
      searchImages: "Search for images",
      enterTextToSearch: "Enter text to search for images",
      search: "Search",
      emptyFolderAdded: "No files were added from empty folder",
      folderAlreadyAdded: 'The folder "%{folder}" was already added',
      folderAdded: {
        0: "Added %{smart_count} file from %{folder}",
        1: "Added %{smart_count} files from %{folder}"
      }
    }
  };

  // ../packages/@uppy/core/lib/Uppy.js
  var _Symbol$for;
  var _Symbol$for2;
  function _classPrivateFieldLooseBase3(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id3 = 0;
  function _classPrivateFieldLooseKey3(name) {
    return "__private_" + id3++ + "_" + name;
  }
  var packageJson2 = {
    "version": "3.1.1"
  };
  var _plugins = /* @__PURE__ */ _classPrivateFieldLooseKey3("plugins");
  var _restricter = /* @__PURE__ */ _classPrivateFieldLooseKey3("restricter");
  var _storeUnsubscribe = /* @__PURE__ */ _classPrivateFieldLooseKey3("storeUnsubscribe");
  var _emitter = /* @__PURE__ */ _classPrivateFieldLooseKey3("emitter");
  var _preProcessors = /* @__PURE__ */ _classPrivateFieldLooseKey3("preProcessors");
  var _uploaders = /* @__PURE__ */ _classPrivateFieldLooseKey3("uploaders");
  var _postProcessors = /* @__PURE__ */ _classPrivateFieldLooseKey3("postProcessors");
  var _informAndEmit = /* @__PURE__ */ _classPrivateFieldLooseKey3("informAndEmit");
  var _checkRequiredMetaFieldsOnFile = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkRequiredMetaFieldsOnFile");
  var _checkRequiredMetaFields = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkRequiredMetaFields");
  var _assertNewUploadAllowed = /* @__PURE__ */ _classPrivateFieldLooseKey3("assertNewUploadAllowed");
  var _checkAndCreateFileStateObject = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkAndCreateFileStateObject");
  var _startIfAutoProceed = /* @__PURE__ */ _classPrivateFieldLooseKey3("startIfAutoProceed");
  var _addListeners = /* @__PURE__ */ _classPrivateFieldLooseKey3("addListeners");
  var _updateOnlineStatus = /* @__PURE__ */ _classPrivateFieldLooseKey3("updateOnlineStatus");
  var _createUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("createUpload");
  var _getUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("getUpload");
  var _removeUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("removeUpload");
  var _runUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("runUpload");
  _Symbol$for = Symbol.for("uppy test: getPlugins");
  _Symbol$for2 = Symbol.for("uppy test: createUpload");
  var Uppy = class {
    constructor(_opts) {
      Object.defineProperty(this, _runUpload, {
        value: _runUpload2
      });
      Object.defineProperty(this, _removeUpload, {
        value: _removeUpload2
      });
      Object.defineProperty(this, _getUpload, {
        value: _getUpload2
      });
      Object.defineProperty(this, _createUpload, {
        value: _createUpload2
      });
      Object.defineProperty(this, _addListeners, {
        value: _addListeners2
      });
      Object.defineProperty(this, _startIfAutoProceed, {
        value: _startIfAutoProceed2
      });
      Object.defineProperty(this, _checkAndCreateFileStateObject, {
        value: _checkAndCreateFileStateObject2
      });
      Object.defineProperty(this, _assertNewUploadAllowed, {
        value: _assertNewUploadAllowed2
      });
      Object.defineProperty(this, _checkRequiredMetaFields, {
        value: _checkRequiredMetaFields2
      });
      Object.defineProperty(this, _checkRequiredMetaFieldsOnFile, {
        value: _checkRequiredMetaFieldsOnFile2
      });
      Object.defineProperty(this, _informAndEmit, {
        value: _informAndEmit2
      });
      Object.defineProperty(this, _plugins, {
        writable: true,
        value: /* @__PURE__ */ Object.create(null)
      });
      Object.defineProperty(this, _restricter, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _storeUnsubscribe, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _emitter, {
        writable: true,
        value: (0, import_namespace_emitter.default)()
      });
      Object.defineProperty(this, _preProcessors, {
        writable: true,
        value: /* @__PURE__ */ new Set()
      });
      Object.defineProperty(this, _uploaders, {
        writable: true,
        value: /* @__PURE__ */ new Set()
      });
      Object.defineProperty(this, _postProcessors, {
        writable: true,
        value: /* @__PURE__ */ new Set()
      });
      Object.defineProperty(this, _updateOnlineStatus, {
        writable: true,
        value: this.updateOnlineStatus.bind(this)
      });
      this.defaultLocale = locale_default;
      const defaultOptions4 = {
        id: "uppy",
        autoProceed: false,
        allowMultipleUploadBatches: true,
        debug: false,
        restrictions: defaultOptions,
        meta: {},
        onBeforeFileAdded: (currentFile) => currentFile,
        onBeforeUpload: (files) => files,
        store: new lib_default(),
        logger: justErrorsLogger,
        infoTimeout: 5e3
      };
      this.opts = {
        ...defaultOptions4,
        ..._opts,
        restrictions: {
          ...defaultOptions4.restrictions,
          ..._opts && _opts.restrictions
        }
      };
      if (_opts && _opts.logger && _opts.debug) {
        this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning");
      } else if (_opts && _opts.debug) {
        this.opts.logger = debugLogger;
      }
      this.log(`Using Core v${this.constructor.VERSION}`);
      this.i18nInit();
      this.calculateProgress = (0, import_lodash.default)(this.calculateProgress.bind(this), 500, {
        leading: true,
        trailing: true
      });
      this.store = this.opts.store;
      this.setState({
        plugins: {},
        files: {},
        currentUploads: {},
        allowNewUpload: true,
        capabilities: {
          uploadProgress: supportsUploadProgress(),
          individualCancellation: true,
          resumableUploads: false
        },
        totalProgress: 0,
        meta: {
          ...this.opts.meta
        },
        info: [],
        recoveredState: null
      });
      _classPrivateFieldLooseBase3(this, _restricter)[_restricter] = new Restricter(() => this.opts, this.i18n);
      _classPrivateFieldLooseBase3(this, _storeUnsubscribe)[_storeUnsubscribe] = this.store.subscribe((prevState, nextState, patch) => {
        this.emit("state-update", prevState, nextState, patch);
        this.updateAll(nextState);
      });
      if (this.opts.debug && typeof window !== "undefined") {
        window[this.opts.id] = this;
      }
      _classPrivateFieldLooseBase3(this, _addListeners)[_addListeners]();
    }
    emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      _classPrivateFieldLooseBase3(this, _emitter)[_emitter].emit(event, ...args);
    }
    on(event, callback) {
      _classPrivateFieldLooseBase3(this, _emitter)[_emitter].on(event, callback);
      return this;
    }
    once(event, callback) {
      _classPrivateFieldLooseBase3(this, _emitter)[_emitter].once(event, callback);
      return this;
    }
    off(event, callback) {
      _classPrivateFieldLooseBase3(this, _emitter)[_emitter].off(event, callback);
      return this;
    }
    updateAll(state) {
      this.iteratePlugins((plugin) => {
        plugin.update(state);
      });
    }
    setState(patch) {
      this.store.setState(patch);
    }
    getState() {
      return this.store.getState();
    }
    setFileState(fileID, state) {
      if (!this.getState().files[fileID]) {
        throw new Error(`Can\u2019t set state for ${fileID} (the file could have been removed)`);
      }
      this.setState({
        files: {
          ...this.getState().files,
          [fileID]: {
            ...this.getState().files[fileID],
            ...state
          }
        }
      });
    }
    i18nInit() {
      const translator = new Translator([this.defaultLocale, this.opts.locale]);
      this.i18n = translator.translate.bind(translator);
      this.i18nArray = translator.translateArray.bind(translator);
      this.locale = translator.locale;
    }
    setOptions(newOpts) {
      this.opts = {
        ...this.opts,
        ...newOpts,
        restrictions: {
          ...this.opts.restrictions,
          ...newOpts && newOpts.restrictions
        }
      };
      if (newOpts.meta) {
        this.setMeta(newOpts.meta);
      }
      this.i18nInit();
      if (newOpts.locale) {
        this.iteratePlugins((plugin) => {
          plugin.setOptions();
        });
      }
      this.setState();
    }
    resetProgress() {
      const defaultProgress = {
        percentage: 0,
        bytesUploaded: 0,
        uploadComplete: false,
        uploadStarted: null
      };
      const files = {
        ...this.getState().files
      };
      const updatedFiles = {};
      Object.keys(files).forEach((fileID) => {
        updatedFiles[fileID] = {
          ...files[fileID],
          progress: {
            ...files[fileID].progress,
            ...defaultProgress
          }
        };
      });
      this.setState({
        files: updatedFiles,
        totalProgress: 0,
        allowNewUpload: true,
        error: null,
        recoveredState: null
      });
      this.emit("reset-progress");
    }
    addPreProcessor(fn) {
      _classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors].add(fn);
    }
    removePreProcessor(fn) {
      return _classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors].delete(fn);
    }
    addPostProcessor(fn) {
      _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].add(fn);
    }
    removePostProcessor(fn) {
      return _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].delete(fn);
    }
    addUploader(fn) {
      _classPrivateFieldLooseBase3(this, _uploaders)[_uploaders].add(fn);
    }
    removeUploader(fn) {
      return _classPrivateFieldLooseBase3(this, _uploaders)[_uploaders].delete(fn);
    }
    setMeta(data) {
      const updatedMeta = {
        ...this.getState().meta,
        ...data
      };
      const updatedFiles = {
        ...this.getState().files
      };
      Object.keys(updatedFiles).forEach((fileID) => {
        updatedFiles[fileID] = {
          ...updatedFiles[fileID],
          meta: {
            ...updatedFiles[fileID].meta,
            ...data
          }
        };
      });
      this.log("Adding metadata:");
      this.log(data);
      this.setState({
        meta: updatedMeta,
        files: updatedFiles
      });
    }
    setFileMeta(fileID, data) {
      const updatedFiles = {
        ...this.getState().files
      };
      if (!updatedFiles[fileID]) {
        this.log("Was trying to set metadata for a file that has been removed: ", fileID);
        return;
      }
      const newMeta = {
        ...updatedFiles[fileID].meta,
        ...data
      };
      updatedFiles[fileID] = {
        ...updatedFiles[fileID],
        meta: newMeta
      };
      this.setState({
        files: updatedFiles
      });
    }
    getFile(fileID) {
      return this.getState().files[fileID];
    }
    getFiles() {
      const {
        files
      } = this.getState();
      return Object.values(files);
    }
    getObjectOfFilesPerState() {
      const {
        files: filesObject,
        totalProgress,
        error
      } = this.getState();
      const files = Object.values(filesObject);
      const inProgressFiles = files.filter((_ref) => {
        let {
          progress
        } = _ref;
        return !progress.uploadComplete && progress.uploadStarted;
      });
      const newFiles = files.filter((file) => !file.progress.uploadStarted);
      const startedFiles = files.filter((file) => file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess);
      const uploadStartedFiles = files.filter((file) => file.progress.uploadStarted);
      const pausedFiles = files.filter((file) => file.isPaused);
      const completeFiles = files.filter((file) => file.progress.uploadComplete);
      const erroredFiles = files.filter((file) => file.error);
      const inProgressNotPausedFiles = inProgressFiles.filter((file) => !file.isPaused);
      const processingFiles = files.filter((file) => file.progress.preprocess || file.progress.postprocess);
      return {
        newFiles,
        startedFiles,
        uploadStartedFiles,
        pausedFiles,
        completeFiles,
        erroredFiles,
        inProgressFiles,
        inProgressNotPausedFiles,
        processingFiles,
        isUploadStarted: uploadStartedFiles.length > 0,
        isAllComplete: totalProgress === 100 && completeFiles.length === files.length && processingFiles.length === 0,
        isAllErrored: !!error && erroredFiles.length === files.length,
        isAllPaused: inProgressFiles.length !== 0 && pausedFiles.length === inProgressFiles.length,
        isUploadInProgress: inProgressFiles.length > 0,
        isSomeGhost: files.some((file) => file.isGhost)
      };
    }
    validateRestrictions(file, files) {
      if (files === void 0) {
        files = this.getFiles();
      }
      try {
        _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validate(file, files);
      } catch (err) {
        return err;
      }
      return null;
    }
    checkIfFileAlreadyExists(fileID) {
      const {
        files
      } = this.getState();
      if (files[fileID] && !files[fileID].isGhost) {
        return true;
      }
      return false;
    }
    addFile(file) {
      _classPrivateFieldLooseBase3(this, _assertNewUploadAllowed)[_assertNewUploadAllowed](file);
      const {
        files
      } = this.getState();
      let newFile = _classPrivateFieldLooseBase3(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, file);
      if (files[newFile.id] && files[newFile.id].isGhost) {
        newFile = {
          ...files[newFile.id],
          data: file.data,
          isGhost: false
        };
        this.log(`Replaced the blob in the restored ghost file: ${newFile.name}, ${newFile.id}`);
      }
      this.setState({
        files: {
          ...files,
          [newFile.id]: newFile
        }
      });
      this.emit("file-added", newFile);
      this.emit("files-added", [newFile]);
      this.log(`Added file: ${newFile.name}, ${newFile.id}, mime type: ${newFile.type}`);
      _classPrivateFieldLooseBase3(this, _startIfAutoProceed)[_startIfAutoProceed]();
      return newFile.id;
    }
    addFiles(fileDescriptors) {
      _classPrivateFieldLooseBase3(this, _assertNewUploadAllowed)[_assertNewUploadAllowed]();
      const files = {
        ...this.getState().files
      };
      const newFiles = [];
      const errors = [];
      for (let i4 = 0; i4 < fileDescriptors.length; i4++) {
        try {
          let newFile = _classPrivateFieldLooseBase3(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, fileDescriptors[i4]);
          if (files[newFile.id] && files[newFile.id].isGhost) {
            newFile = {
              ...files[newFile.id],
              data: fileDescriptors[i4].data,
              isGhost: false
            };
            this.log(`Replaced blob in a ghost file: ${newFile.name}, ${newFile.id}`);
          }
          files[newFile.id] = newFile;
          newFiles.push(newFile);
        } catch (err) {
          if (!err.isRestriction) {
            errors.push(err);
          }
        }
      }
      this.setState({
        files
      });
      newFiles.forEach((newFile) => {
        this.emit("file-added", newFile);
      });
      this.emit("files-added", newFiles);
      if (newFiles.length > 5) {
        this.log(`Added batch of ${newFiles.length} files`);
      } else {
        Object.keys(newFiles).forEach((fileID) => {
          this.log(`Added file: ${newFiles[fileID].name}
 id: ${newFiles[fileID].id}
 type: ${newFiles[fileID].type}`);
        });
      }
      if (newFiles.length > 0) {
        _classPrivateFieldLooseBase3(this, _startIfAutoProceed)[_startIfAutoProceed]();
      }
      if (errors.length > 0) {
        let message = "Multiple errors occurred while adding files:\n";
        errors.forEach((subError) => {
          message += `
 * ${subError.message}`;
        });
        this.info({
          message: this.i18n("addBulkFilesFailed", {
            smart_count: errors.length
          }),
          details: message
        }, "error", this.opts.infoTimeout);
        if (typeof AggregateError === "function") {
          throw new AggregateError(errors, message);
        } else {
          const err = new Error(message);
          err.errors = errors;
          throw err;
        }
      }
    }
    removeFiles(fileIDs, reason) {
      const {
        files,
        currentUploads
      } = this.getState();
      const updatedFiles = {
        ...files
      };
      const updatedUploads = {
        ...currentUploads
      };
      const removedFiles = /* @__PURE__ */ Object.create(null);
      fileIDs.forEach((fileID) => {
        if (files[fileID]) {
          removedFiles[fileID] = files[fileID];
          delete updatedFiles[fileID];
        }
      });
      function fileIsNotRemoved(uploadFileID) {
        return removedFiles[uploadFileID] === void 0;
      }
      Object.keys(updatedUploads).forEach((uploadID) => {
        const newFileIDs = currentUploads[uploadID].fileIDs.filter(fileIsNotRemoved);
        if (newFileIDs.length === 0) {
          delete updatedUploads[uploadID];
          return;
        }
        const {
          capabilities
        } = this.getState();
        if (newFileIDs.length !== currentUploads[uploadID].fileIDs.length && !capabilities.individualCancellation) {
          throw new Error("individualCancellation is disabled");
        }
        updatedUploads[uploadID] = {
          ...currentUploads[uploadID],
          fileIDs: newFileIDs
        };
      });
      const stateUpdate = {
        currentUploads: updatedUploads,
        files: updatedFiles
      };
      if (Object.keys(updatedFiles).length === 0) {
        stateUpdate.allowNewUpload = true;
        stateUpdate.error = null;
        stateUpdate.recoveredState = null;
      }
      this.setState(stateUpdate);
      this.calculateTotalProgress();
      const removedFileIDs = Object.keys(removedFiles);
      removedFileIDs.forEach((fileID) => {
        this.emit("file-removed", removedFiles[fileID], reason);
      });
      if (removedFileIDs.length > 5) {
        this.log(`Removed ${removedFileIDs.length} files`);
      } else {
        this.log(`Removed files: ${removedFileIDs.join(", ")}`);
      }
    }
    removeFile(fileID, reason) {
      if (reason === void 0) {
        reason = null;
      }
      this.removeFiles([fileID], reason);
    }
    pauseResume(fileID) {
      if (!this.getState().capabilities.resumableUploads || this.getFile(fileID).uploadComplete) {
        return void 0;
      }
      const wasPaused = this.getFile(fileID).isPaused || false;
      const isPaused = !wasPaused;
      this.setFileState(fileID, {
        isPaused
      });
      this.emit("upload-pause", fileID, isPaused);
      return isPaused;
    }
    pauseAll() {
      const updatedFiles = {
        ...this.getState().files
      };
      const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
        return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
      });
      inProgressUpdatedFiles.forEach((file) => {
        const updatedFile = {
          ...updatedFiles[file],
          isPaused: true
        };
        updatedFiles[file] = updatedFile;
      });
      this.setState({
        files: updatedFiles
      });
      this.emit("pause-all");
    }
    resumeAll() {
      const updatedFiles = {
        ...this.getState().files
      };
      const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
        return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
      });
      inProgressUpdatedFiles.forEach((file) => {
        const updatedFile = {
          ...updatedFiles[file],
          isPaused: false,
          error: null
        };
        updatedFiles[file] = updatedFile;
      });
      this.setState({
        files: updatedFiles
      });
      this.emit("resume-all");
    }
    retryAll() {
      const updatedFiles = {
        ...this.getState().files
      };
      const filesToRetry = Object.keys(updatedFiles).filter((file) => {
        return updatedFiles[file].error;
      });
      filesToRetry.forEach((file) => {
        const updatedFile = {
          ...updatedFiles[file],
          isPaused: false,
          error: null
        };
        updatedFiles[file] = updatedFile;
      });
      this.setState({
        files: updatedFiles,
        error: null
      });
      this.emit("retry-all", filesToRetry);
      if (filesToRetry.length === 0) {
        return Promise.resolve({
          successful: [],
          failed: []
        });
      }
      const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](filesToRetry, {
        forceAllowNewUpload: true
      });
      return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
    }
    cancelAll(_temp) {
      let {
        reason = "user"
      } = _temp === void 0 ? {} : _temp;
      this.emit("cancel-all", {
        reason
      });
      if (reason === "user") {
        const {
          files
        } = this.getState();
        const fileIDs = Object.keys(files);
        if (fileIDs.length) {
          this.removeFiles(fileIDs, "cancel-all");
        }
        this.setState({
          totalProgress: 0,
          error: null,
          recoveredState: null
        });
      }
    }
    retryUpload(fileID) {
      this.setFileState(fileID, {
        error: null,
        isPaused: false
      });
      this.emit("upload-retry", fileID);
      const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload]([fileID], {
        forceAllowNewUpload: true
      });
      return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
    }
    logout() {
      this.iteratePlugins((plugin) => {
        if (plugin.provider && plugin.provider.logout) {
          plugin.provider.logout();
        }
      });
    }
    calculateProgress(file, data) {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const canHavePercentage = Number.isFinite(data.bytesTotal) && data.bytesTotal > 0;
      this.setFileState(file.id, {
        progress: {
          ...this.getFile(file.id).progress,
          bytesUploaded: data.bytesUploaded,
          bytesTotal: data.bytesTotal,
          percentage: canHavePercentage ? Math.round(data.bytesUploaded / data.bytesTotal * 100) : 0
        }
      });
      this.calculateTotalProgress();
    }
    calculateTotalProgress() {
      const files = this.getFiles();
      const inProgress = files.filter((file) => {
        return file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess;
      });
      if (inProgress.length === 0) {
        this.emit("progress", 0);
        this.setState({
          totalProgress: 0
        });
        return;
      }
      const sizedFiles = inProgress.filter((file) => file.progress.bytesTotal != null);
      const unsizedFiles = inProgress.filter((file) => file.progress.bytesTotal == null);
      if (sizedFiles.length === 0) {
        const progressMax = inProgress.length * 100;
        const currentProgress = unsizedFiles.reduce((acc, file) => {
          return acc + file.progress.percentage;
        }, 0);
        const totalProgress2 = Math.round(currentProgress / progressMax * 100);
        this.setState({
          totalProgress: totalProgress2
        });
        return;
      }
      let totalSize = sizedFiles.reduce((acc, file) => {
        return acc + file.progress.bytesTotal;
      }, 0);
      const averageSize = totalSize / sizedFiles.length;
      totalSize += averageSize * unsizedFiles.length;
      let uploadedSize = 0;
      sizedFiles.forEach((file) => {
        uploadedSize += file.progress.bytesUploaded;
      });
      unsizedFiles.forEach((file) => {
        uploadedSize += averageSize * (file.progress.percentage || 0) / 100;
      });
      let totalProgress = totalSize === 0 ? 0 : Math.round(uploadedSize / totalSize * 100);
      if (totalProgress > 100) {
        totalProgress = 100;
      }
      this.setState({
        totalProgress
      });
      this.emit("progress", totalProgress);
    }
    updateOnlineStatus() {
      const online = typeof window.navigator.onLine !== "undefined" ? window.navigator.onLine : true;
      if (!online) {
        this.emit("is-offline");
        this.info(this.i18n("noInternetConnection"), "error", 0);
        this.wasOffline = true;
      } else {
        this.emit("is-online");
        if (this.wasOffline) {
          this.emit("back-online");
          this.info(this.i18n("connectedToInternet"), "success", 3e3);
          this.wasOffline = false;
        }
      }
    }
    getID() {
      return this.opts.id;
    }
    use(Plugin, opts) {
      if (typeof Plugin !== "function") {
        const msg = `Expected a plugin class, but got ${Plugin === null ? "null" : typeof Plugin}. Please verify that the plugin was imported and spelled correctly.`;
        throw new TypeError(msg);
      }
      const plugin = new Plugin(this, opts);
      const pluginId = plugin.id;
      if (!pluginId) {
        throw new Error("Your plugin must have an id");
      }
      if (!plugin.type) {
        throw new Error("Your plugin must have a type");
      }
      const existsPluginAlready = this.getPlugin(pluginId);
      if (existsPluginAlready) {
        const msg = `Already found a plugin named '${existsPluginAlready.id}'. Tried to use: '${pluginId}'.
Uppy plugins must have unique \`id\` options. See https://uppy.io/docs/plugins/#id.`;
        throw new Error(msg);
      }
      if (Plugin.VERSION) {
        this.log(`Using ${pluginId} v${Plugin.VERSION}`);
      }
      if (plugin.type in _classPrivateFieldLooseBase3(this, _plugins)[_plugins]) {
        _classPrivateFieldLooseBase3(this, _plugins)[_plugins][plugin.type].push(plugin);
      } else {
        _classPrivateFieldLooseBase3(this, _plugins)[_plugins][plugin.type] = [plugin];
      }
      plugin.install();
      return this;
    }
    getPlugin(id18) {
      for (const plugins of Object.values(_classPrivateFieldLooseBase3(this, _plugins)[_plugins])) {
        const foundPlugin = plugins.find((plugin) => plugin.id === id18);
        if (foundPlugin != null)
          return foundPlugin;
      }
      return void 0;
    }
    [_Symbol$for](type) {
      return _classPrivateFieldLooseBase3(this, _plugins)[_plugins][type];
    }
    iteratePlugins(method) {
      Object.values(_classPrivateFieldLooseBase3(this, _plugins)[_plugins]).flat(1).forEach(method);
    }
    removePlugin(instance) {
      this.log(`Removing plugin ${instance.id}`);
      this.emit("plugin-remove", instance);
      if (instance.uninstall) {
        instance.uninstall();
      }
      const list = _classPrivateFieldLooseBase3(this, _plugins)[_plugins][instance.type];
      const index = list.findIndex((item) => item.id === instance.id);
      if (index !== -1) {
        list.splice(index, 1);
      }
      const state = this.getState();
      const updatedState = {
        plugins: {
          ...state.plugins,
          [instance.id]: void 0
        }
      };
      this.setState(updatedState);
    }
    close(_temp2) {
      let {
        reason
      } = _temp2 === void 0 ? {} : _temp2;
      this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`);
      this.cancelAll({
        reason
      });
      _classPrivateFieldLooseBase3(this, _storeUnsubscribe)[_storeUnsubscribe]();
      this.iteratePlugins((plugin) => {
        this.removePlugin(plugin);
      });
      if (typeof window !== "undefined" && window.removeEventListener) {
        window.removeEventListener("online", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
        window.removeEventListener("offline", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
      }
    }
    hideInfo() {
      const {
        info
      } = this.getState();
      this.setState({
        info: info.slice(1)
      });
      this.emit("info-hidden");
    }
    info(message, type, duration2) {
      if (type === void 0) {
        type = "info";
      }
      if (duration2 === void 0) {
        duration2 = 3e3;
      }
      const isComplexMessage = typeof message === "object";
      this.setState({
        info: [...this.getState().info, {
          type,
          message: isComplexMessage ? message.message : message,
          details: isComplexMessage ? message.details : null
        }]
      });
      setTimeout(() => this.hideInfo(), duration2);
      this.emit("info-visible");
    }
    log(message, type) {
      const {
        logger
      } = this.opts;
      switch (type) {
        case "error":
          logger.error(message);
          break;
        case "warning":
          logger.warn(message);
          break;
        default:
          logger.debug(message);
          break;
      }
    }
    restore(uploadID) {
      this.log(`Core: attempting to restore upload "${uploadID}"`);
      if (!this.getState().currentUploads[uploadID]) {
        _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
        return Promise.reject(new Error("Nonexistent upload"));
      }
      return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
    }
    [_Symbol$for2]() {
      return _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](...arguments);
    }
    addResultData(uploadID, data) {
      if (!_classPrivateFieldLooseBase3(this, _getUpload)[_getUpload](uploadID)) {
        this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
        return;
      }
      const {
        currentUploads
      } = this.getState();
      const currentUpload = {
        ...currentUploads[uploadID],
        result: {
          ...currentUploads[uploadID].result,
          ...data
        }
      };
      this.setState({
        currentUploads: {
          ...currentUploads,
          [uploadID]: currentUpload
        }
      });
    }
    upload() {
      var _classPrivateFieldLoo;
      if (!((_classPrivateFieldLoo = _classPrivateFieldLooseBase3(this, _plugins)[_plugins].uploader) != null && _classPrivateFieldLoo.length)) {
        this.log("No uploader type plugins are used", "warning");
      }
      let {
        files
      } = this.getState();
      const onBeforeUploadResult = this.opts.onBeforeUpload(files);
      if (onBeforeUploadResult === false) {
        return Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false"));
      }
      if (onBeforeUploadResult && typeof onBeforeUploadResult === "object") {
        files = onBeforeUploadResult;
        this.setState({
          files
        });
      }
      return Promise.resolve().then(() => _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validateMinNumberOfFiles(files)).catch((err) => {
        _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](err);
        throw err;
      }).then(() => {
        if (!_classPrivateFieldLooseBase3(this, _checkRequiredMetaFields)[_checkRequiredMetaFields](files)) {
          throw new RestrictionError(this.i18n("missingRequiredMetaField"));
        }
      }).catch((err) => {
        throw err;
      }).then(() => {
        const {
          currentUploads
        } = this.getState();
        const currentlyUploadingFiles = Object.values(currentUploads).flatMap((curr) => curr.fileIDs);
        const waitingFileIDs = [];
        Object.keys(files).forEach((fileID) => {
          const file = this.getFile(fileID);
          if (!file.progress.uploadStarted && currentlyUploadingFiles.indexOf(fileID) === -1) {
            waitingFileIDs.push(file.id);
          }
        });
        const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](waitingFileIDs);
        return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
      }).catch((err) => {
        this.emit("error", err);
        this.log(err, "error");
        throw err;
      });
    }
  };
  function _informAndEmit2(error, file) {
    const {
      message,
      details = ""
    } = error;
    if (error.isRestriction) {
      this.emit("restriction-failed", file, error);
    } else {
      this.emit("error", error);
    }
    this.info({
      message,
      details
    }, "error", this.opts.infoTimeout);
    this.log(error, "warning");
  }
  function _checkRequiredMetaFieldsOnFile2(file) {
    const {
      missingFields,
      error
    } = _classPrivateFieldLooseBase3(this, _restricter)[_restricter].getMissingRequiredMetaFields(file);
    if (missingFields.length > 0) {
      this.setFileState(file.id, {
        missingRequiredMetaFields: missingFields
      });
      this.log(error.message);
      this.emit("restriction-failed", file, error);
      return false;
    }
    return true;
  }
  function _checkRequiredMetaFields2(files) {
    let success = true;
    for (const file of Object.values(files)) {
      if (!_classPrivateFieldLooseBase3(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file)) {
        success = false;
      }
    }
    return success;
  }
  function _assertNewUploadAllowed2(file) {
    const {
      allowNewUpload
    } = this.getState();
    if (allowNewUpload === false) {
      const error = new RestrictionError(this.i18n("noMoreFilesAllowed"));
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error, file);
      throw error;
    }
  }
  function _checkAndCreateFileStateObject2(files, fileDescriptor) {
    if (fileDescriptor instanceof File) {
      fileDescriptor = {
        name: fileDescriptor.name,
        type: fileDescriptor.type,
        size: fileDescriptor.size,
        data: fileDescriptor
      };
    }
    const fileType = getFileType(fileDescriptor);
    const fileName = getFileName(fileType, fileDescriptor);
    const fileExtension = getFileNameAndExtension(fileName).extension;
    const isRemote = Boolean(fileDescriptor.isRemote);
    const fileID = generateFileID({
      ...fileDescriptor,
      type: fileType
    });
    if (this.checkIfFileAlreadyExists(fileID)) {
      const error = new RestrictionError(this.i18n("noDuplicates", {
        fileName
      }));
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error, fileDescriptor);
      throw error;
    }
    const meta = fileDescriptor.meta || {};
    meta.name = fileName;
    meta.type = fileType;
    const size = Number.isFinite(fileDescriptor.data.size) ? fileDescriptor.data.size : null;
    let newFile = {
      source: fileDescriptor.source || "",
      id: fileID,
      name: fileName,
      extension: fileExtension || "",
      meta: {
        ...this.getState().meta,
        ...meta
      },
      type: fileType,
      data: fileDescriptor.data,
      progress: {
        percentage: 0,
        bytesUploaded: 0,
        bytesTotal: size,
        uploadComplete: false,
        uploadStarted: null
      },
      size,
      isRemote,
      remote: fileDescriptor.remote || "",
      preview: fileDescriptor.preview
    };
    const onBeforeFileAddedResult = this.opts.onBeforeFileAdded(newFile, files);
    if (onBeforeFileAddedResult === false) {
      const error = new RestrictionError("Cannot add the file because onBeforeFileAdded returned false.");
      this.emit("restriction-failed", fileDescriptor, error);
      throw error;
    } else if (typeof onBeforeFileAddedResult === "object" && onBeforeFileAddedResult !== null) {
      newFile = onBeforeFileAddedResult;
    }
    try {
      const filesArray = Object.keys(files).map((i4) => files[i4]);
      _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validate(newFile, filesArray);
    } catch (err) {
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](err, newFile);
      throw err;
    }
    return newFile;
  }
  function _startIfAutoProceed2() {
    if (this.opts.autoProceed && !this.scheduledAutoProceed) {
      this.scheduledAutoProceed = setTimeout(() => {
        this.scheduledAutoProceed = null;
        this.upload().catch((err) => {
          if (!err.isRestriction) {
            this.log(err.stack || err.message || err);
          }
        });
      }, 4);
    }
  }
  function _addListeners2() {
    const errorHandler = (error, file, response) => {
      let errorMsg = error.message || "Unknown error";
      if (error.details) {
        errorMsg += ` ${error.details}`;
      }
      this.setState({
        error: errorMsg
      });
      if (file != null && file.id in this.getState().files) {
        this.setFileState(file.id, {
          error: errorMsg,
          response
        });
      }
    };
    this.on("error", errorHandler);
    this.on("upload-error", (file, error, response) => {
      errorHandler(error, file, response);
      if (typeof error === "object" && error.message) {
        const newError = new Error(error.message);
        newError.details = error.message;
        if (error.details) {
          newError.details += ` ${error.details}`;
        }
        newError.message = this.i18n("failedToUpload", {
          file: file == null ? void 0 : file.name
        });
        _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](newError);
      } else {
        _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error);
      }
    });
    let uploadStalledWarningRecentlyEmitted;
    this.on("upload-stalled", (error, files) => {
      const {
        message
      } = error;
      const details = files.map((file) => file.meta.name).join(", ");
      if (!uploadStalledWarningRecentlyEmitted) {
        this.info({
          message,
          details
        }, "warning", this.opts.infoTimeout);
        uploadStalledWarningRecentlyEmitted = setTimeout(() => {
          uploadStalledWarningRecentlyEmitted = null;
        }, this.opts.infoTimeout);
      }
      this.log(`${message} ${details}`.trim(), "warning");
    });
    this.on("upload", () => {
      this.setState({
        error: null
      });
    });
    this.on("upload-started", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: {
          uploadStarted: Date.now(),
          uploadComplete: false,
          percentage: 0,
          bytesUploaded: 0,
          bytesTotal: file.size
        }
      });
    });
    this.on("upload-progress", this.calculateProgress);
    this.on("upload-success", (file, uploadResp) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const currentProgress = this.getFile(file.id).progress;
      this.setFileState(file.id, {
        progress: {
          ...currentProgress,
          postprocess: _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].size > 0 ? {
            mode: "indeterminate"
          } : null,
          uploadComplete: true,
          percentage: 100,
          bytesUploaded: currentProgress.bytesTotal
        },
        response: uploadResp,
        uploadURL: uploadResp.uploadURL,
        isPaused: false
      });
      if (file.size == null) {
        this.setFileState(file.id, {
          size: uploadResp.bytesUploaded || currentProgress.bytesTotal
        });
      }
      this.calculateTotalProgress();
    });
    this.on("preprocess-progress", (file, progress) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: {
          ...this.getFile(file.id).progress,
          preprocess: progress
        }
      });
    });
    this.on("preprocess-complete", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const files = {
        ...this.getState().files
      };
      files[file.id] = {
        ...files[file.id],
        progress: {
          ...files[file.id].progress
        }
      };
      delete files[file.id].progress.preprocess;
      this.setState({
        files
      });
    });
    this.on("postprocess-progress", (file, progress) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: {
          ...this.getState().files[file.id].progress,
          postprocess: progress
        }
      });
    });
    this.on("postprocess-complete", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const files = {
        ...this.getState().files
      };
      files[file.id] = {
        ...files[file.id],
        progress: {
          ...files[file.id].progress
        }
      };
      delete files[file.id].progress.postprocess;
      this.setState({
        files
      });
    });
    this.on("restored", () => {
      this.calculateTotalProgress();
    });
    this.on("dashboard:file-edit-complete", (file) => {
      if (file) {
        _classPrivateFieldLooseBase3(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file);
      }
    });
    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("online", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
      window.addEventListener("offline", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
      setTimeout(_classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus], 3e3);
    }
  }
  function _createUpload2(fileIDs, opts) {
    if (opts === void 0) {
      opts = {};
    }
    const {
      forceAllowNewUpload = false
    } = opts;
    const {
      allowNewUpload,
      currentUploads
    } = this.getState();
    if (!allowNewUpload && !forceAllowNewUpload) {
      throw new Error("Cannot create a new upload: already uploading.");
    }
    const uploadID = nanoid();
    this.emit("upload", {
      id: uploadID,
      fileIDs
    });
    this.setState({
      allowNewUpload: this.opts.allowMultipleUploadBatches !== false && this.opts.allowMultipleUploads !== false,
      currentUploads: {
        ...currentUploads,
        [uploadID]: {
          fileIDs,
          step: 0,
          result: {}
        }
      }
    });
    return uploadID;
  }
  function _getUpload2(uploadID) {
    const {
      currentUploads
    } = this.getState();
    return currentUploads[uploadID];
  }
  function _removeUpload2(uploadID) {
    const currentUploads = {
      ...this.getState().currentUploads
    };
    delete currentUploads[uploadID];
    this.setState({
      currentUploads
    });
  }
  async function _runUpload2(uploadID) {
    let {
      currentUploads
    } = this.getState();
    let currentUpload = currentUploads[uploadID];
    const restoreStep = currentUpload.step || 0;
    const steps = [..._classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors], ..._classPrivateFieldLooseBase3(this, _uploaders)[_uploaders], ..._classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors]];
    try {
      for (let step = restoreStep; step < steps.length; step++) {
        if (!currentUpload) {
          break;
        }
        const fn = steps[step];
        const updatedUpload = {
          ...currentUpload,
          step
        };
        this.setState({
          currentUploads: {
            ...currentUploads,
            [uploadID]: updatedUpload
          }
        });
        await fn(updatedUpload.fileIDs, uploadID);
        currentUploads = this.getState().currentUploads;
        currentUpload = currentUploads[uploadID];
      }
    } catch (err) {
      _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
      throw err;
    }
    if (currentUpload) {
      currentUpload.fileIDs.forEach((fileID) => {
        const file = this.getFile(fileID);
        if (file && file.progress.postprocess) {
          this.emit("postprocess-complete", file);
        }
      });
      const files = currentUpload.fileIDs.map((fileID) => this.getFile(fileID));
      const successful = files.filter((file) => !file.error);
      const failed = files.filter((file) => file.error);
      await this.addResultData(uploadID, {
        successful,
        failed,
        uploadID
      });
      currentUploads = this.getState().currentUploads;
      currentUpload = currentUploads[uploadID];
    }
    let result2;
    if (currentUpload) {
      result2 = currentUpload.result;
      this.emit("complete", result2);
      _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
    }
    if (result2 == null) {
      this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
    }
    return result2;
  }
  Uppy.VERSION = packageJson2.version;
  var Uppy_default = Uppy;

  // ../node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var o;
  var r;
  var f = {};
  var e = [];
  var c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function s(n3, l4) {
    for (var u4 in l4)
      n3[u4] = l4[u4];
    return n3;
  }
  function a(n3) {
    var l4 = n3.parentNode;
    l4 && l4.removeChild(n3);
  }
  function h(l4, u4, i4) {
    var t4, o4, r4, f4 = {};
    for (r4 in u4)
      "key" == r4 ? t4 = u4[r4] : "ref" == r4 ? o4 = u4[r4] : f4[r4] = u4[r4];
    if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l4 && null != l4.defaultProps)
      for (r4 in l4.defaultProps)
        void 0 === f4[r4] && (f4[r4] = l4.defaultProps[r4]);
    return v(l4, f4, t4, o4, null);
  }
  function v(n3, i4, t4, o4, r4) {
    var f4 = {
      type: n3,
      props: i4,
      key: t4,
      ref: o4,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      __h: null,
      constructor: void 0,
      __v: null == r4 ? ++u : r4
    };
    return null == r4 && null != l.vnode && l.vnode(f4), f4;
  }
  function y() {
    return {
      current: null
    };
  }
  function p(n3) {
    return n3.children;
  }
  function d(n3, l4) {
    this.props = n3, this.context = l4;
  }
  function _(n3, l4) {
    if (null == l4)
      return n3.__ ? _(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
    for (var u4; l4 < n3.__k.length; l4++)
      if (null != (u4 = n3.__k[l4]) && null != u4.__e)
        return u4.__e;
    return "function" == typeof n3.type ? _(n3) : null;
  }
  function k(n3) {
    var l4, u4;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
        if (null != (u4 = n3.__k[l4]) && null != u4.__e) {
          n3.__e = n3.__c.base = u4.__e;
          break;
        }
      return k(n3);
    }
  }
  function b(n3) {
    (!n3.__d && (n3.__d = true) && t.push(n3) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
  }
  function g() {
    for (var n3; g.__r = t.length; )
      n3 = t.sort(function(n4, l4) {
        return n4.__v.__b - l4.__v.__b;
      }), t = [], n3.some(function(n4) {
        var l4, u4, i4, t4, o4, r4;
        n4.__d && (o4 = (t4 = (l4 = n4).__v).__e, (r4 = l4.__P) && (u4 = [], (i4 = s({}, t4)).__v = t4.__v + 1, j(r4, t4, i4, l4.__n, void 0 !== r4.ownerSVGElement, null != t4.__h ? [o4] : null, u4, null == o4 ? _(t4) : o4, t4.__h), z(u4, t4), t4.__e != o4 && k(t4)));
      });
  }
  function w(n3, l4, u4, i4, t4, o4, r4, c4, s4, a4) {
    var h3, y3, d3, k4, b4, g4, w4, x3 = i4 && i4.__k || e, C3 = x3.length;
    for (u4.__k = [], h3 = 0; h3 < l4.length; h3++)
      if (null != (k4 = u4.__k[h3] = null == (k4 = l4[h3]) || "boolean" == typeof k4 ? null : "string" == typeof k4 || "number" == typeof k4 || "bigint" == typeof k4 ? v(null, k4, null, null, k4) : Array.isArray(k4) ? v(p, {
        children: k4
      }, null, null, null) : k4.__b > 0 ? v(k4.type, k4.props, k4.key, null, k4.__v) : k4)) {
        if (k4.__ = u4, k4.__b = u4.__b + 1, null === (d3 = x3[h3]) || d3 && k4.key == d3.key && k4.type === d3.type)
          x3[h3] = void 0;
        else
          for (y3 = 0; y3 < C3; y3++) {
            if ((d3 = x3[y3]) && k4.key == d3.key && k4.type === d3.type) {
              x3[y3] = void 0;
              break;
            }
            d3 = null;
          }
        j(n3, k4, d3 = d3 || f, t4, o4, r4, c4, s4, a4), b4 = k4.__e, (y3 = k4.ref) && d3.ref != y3 && (w4 || (w4 = []), d3.ref && w4.push(d3.ref, null, k4), w4.push(y3, k4.__c || b4, k4)), null != b4 ? (null == g4 && (g4 = b4), "function" == typeof k4.type && k4.__k === d3.__k ? k4.__d = s4 = m(k4, s4, n3) : s4 = A(n3, k4, d3, x3, b4, s4), "function" == typeof u4.type && (u4.__d = s4)) : s4 && d3.__e == s4 && s4.parentNode != n3 && (s4 = _(d3));
      }
    for (u4.__e = g4, h3 = C3; h3--; )
      null != x3[h3] && ("function" == typeof u4.type && null != x3[h3].__e && x3[h3].__e == u4.__d && (u4.__d = _(i4, h3 + 1)), N(x3[h3], x3[h3]));
    if (w4)
      for (h3 = 0; h3 < w4.length; h3++)
        M(w4[h3], w4[++h3], w4[++h3]);
  }
  function m(n3, l4, u4) {
    for (var i4, t4 = n3.__k, o4 = 0; t4 && o4 < t4.length; o4++)
      (i4 = t4[o4]) && (i4.__ = n3, l4 = "function" == typeof i4.type ? m(i4, l4, u4) : A(u4, i4, i4, t4, i4.__e, l4));
    return l4;
  }
  function x(n3, l4) {
    return l4 = l4 || [], null == n3 || "boolean" == typeof n3 || (Array.isArray(n3) ? n3.some(function(n4) {
      x(n4, l4);
    }) : l4.push(n3)), l4;
  }
  function A(n3, l4, u4, i4, t4, o4) {
    var r4, f4, e4;
    if (void 0 !== l4.__d)
      r4 = l4.__d, l4.__d = void 0;
    else if (null == u4 || t4 != o4 || null == t4.parentNode)
      n:
        if (null == o4 || o4.parentNode !== n3)
          n3.appendChild(t4), r4 = null;
        else {
          for (f4 = o4, e4 = 0; (f4 = f4.nextSibling) && e4 < i4.length; e4 += 2)
            if (f4 == t4)
              break n;
          n3.insertBefore(t4, o4), r4 = o4;
        }
    return void 0 !== r4 ? r4 : t4.nextSibling;
  }
  function C(n3, l4, u4, i4, t4) {
    var o4;
    for (o4 in u4)
      "children" === o4 || "key" === o4 || o4 in l4 || H(n3, o4, null, u4[o4], i4);
    for (o4 in l4)
      t4 && "function" != typeof l4[o4] || "children" === o4 || "key" === o4 || "value" === o4 || "checked" === o4 || u4[o4] === l4[o4] || H(n3, o4, l4[o4], u4[o4], i4);
  }
  function $(n3, l4, u4) {
    "-" === l4[0] ? n3.setProperty(l4, u4) : n3[l4] = null == u4 ? "" : "number" != typeof u4 || c.test(l4) ? u4 : u4 + "px";
  }
  function H(n3, l4, u4, i4, t4) {
    var o4;
    n:
      if ("style" === l4) {
        if ("string" == typeof u4)
          n3.style.cssText = u4;
        else {
          if ("string" == typeof i4 && (n3.style.cssText = i4 = ""), i4)
            for (l4 in i4)
              u4 && l4 in u4 || $(n3.style, l4, "");
          if (u4)
            for (l4 in u4)
              i4 && u4[l4] === i4[l4] || $(n3.style, l4, u4[l4]);
        }
      } else if ("o" === l4[0] && "n" === l4[1])
        o4 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n3 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + o4] = u4, u4 ? i4 || n3.addEventListener(l4, o4 ? T : I, o4) : n3.removeEventListener(l4, o4 ? T : I, o4);
      else if ("dangerouslySetInnerHTML" !== l4) {
        if (t4)
          l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && l4 in n3)
          try {
            n3[l4] = null == u4 ? "" : u4;
            break n;
          } catch (n4) {
          }
        "function" == typeof u4 || (null != u4 && (false !== u4 || "a" === l4[0] && "r" === l4[1]) ? n3.setAttribute(l4, u4) : n3.removeAttribute(l4));
      }
  }
  function I(n3) {
    this.l[n3.type + false](l.event ? l.event(n3) : n3);
  }
  function T(n3) {
    this.l[n3.type + true](l.event ? l.event(n3) : n3);
  }
  function j(n3, u4, i4, t4, o4, r4, f4, e4, c4) {
    var a4, h3, v4, y3, _4, k4, b4, g4, m4, x3, A3, C3, $3, H3 = u4.type;
    if (void 0 !== u4.constructor)
      return null;
    null != i4.__h && (c4 = i4.__h, e4 = u4.__e = i4.__e, u4.__h = null, r4 = [e4]), (a4 = l.__b) && a4(u4);
    try {
      n:
        if ("function" == typeof H3) {
          if (g4 = u4.props, m4 = (a4 = H3.contextType) && t4[a4.__c], x3 = a4 ? m4 ? m4.props.value : a4.__ : t4, i4.__c ? b4 = (h3 = u4.__c = i4.__c).__ = h3.__E : ("prototype" in H3 && H3.prototype.render ? u4.__c = h3 = new H3(g4, x3) : (u4.__c = h3 = new d(g4, x3), h3.constructor = H3, h3.render = O), m4 && m4.sub(h3), h3.props = g4, h3.state || (h3.state = {}), h3.context = x3, h3.__n = t4, v4 = h3.__d = true, h3.__h = []), null == h3.__s && (h3.__s = h3.state), null != H3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = s({}, h3.__s)), s(h3.__s, H3.getDerivedStateFromProps(g4, h3.__s))), y3 = h3.props, _4 = h3.state, v4)
            null == H3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
          else {
            if (null == H3.getDerivedStateFromProps && g4 !== y3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(g4, x3), !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(g4, h3.__s, x3) || u4.__v === i4.__v) {
              h3.props = g4, h3.state = h3.__s, u4.__v !== i4.__v && (h3.__d = false), h3.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
                n4 && (n4.__ = u4);
              }), h3.__h.length && f4.push(h3);
              break n;
            }
            null != h3.componentWillUpdate && h3.componentWillUpdate(g4, h3.__s, x3), null != h3.componentDidUpdate && h3.__h.push(function() {
              h3.componentDidUpdate(y3, _4, k4);
            });
          }
          if (h3.context = x3, h3.props = g4, h3.__v = u4, h3.__P = n3, A3 = l.__r, C3 = 0, "prototype" in H3 && H3.prototype.render)
            h3.state = h3.__s, h3.__d = false, A3 && A3(u4), a4 = h3.render(h3.props, h3.state, h3.context);
          else
            do {
              h3.__d = false, A3 && A3(u4), a4 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
            } while (h3.__d && ++C3 < 25);
          h3.state = h3.__s, null != h3.getChildContext && (t4 = s(s({}, t4), h3.getChildContext())), v4 || null == h3.getSnapshotBeforeUpdate || (k4 = h3.getSnapshotBeforeUpdate(y3, _4)), $3 = null != a4 && a4.type === p && null == a4.key ? a4.props.children : a4, w(n3, Array.isArray($3) ? $3 : [$3], u4, i4, t4, o4, r4, f4, e4, c4), h3.base = u4.__e, u4.__h = null, h3.__h.length && f4.push(h3), b4 && (h3.__E = h3.__ = null), h3.__e = false;
        } else
          null == r4 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = L(i4.__e, u4, i4, t4, o4, r4, f4, c4);
      (a4 = l.diffed) && a4(u4);
    } catch (n4) {
      u4.__v = null, (c4 || null != r4) && (u4.__e = e4, u4.__h = !!c4, r4[r4.indexOf(e4)] = null), l.__e(n4, u4, i4);
    }
  }
  function z(n3, u4) {
    l.__c && l.__c(u4, n3), n3.some(function(u5) {
      try {
        n3 = u5.__h, u5.__h = [], n3.some(function(n4) {
          n4.call(u5);
        });
      } catch (n4) {
        l.__e(n4, u5.__v);
      }
    });
  }
  function L(l4, u4, i4, t4, o4, r4, e4, c4) {
    var s4, h3, v4, y3 = i4.props, p4 = u4.props, d3 = u4.type, k4 = 0;
    if ("svg" === d3 && (o4 = true), null != r4) {
      for (; k4 < r4.length; k4++)
        if ((s4 = r4[k4]) && "setAttribute" in s4 == !!d3 && (d3 ? s4.localName === d3 : 3 === s4.nodeType)) {
          l4 = s4, r4[k4] = null;
          break;
        }
    }
    if (null == l4) {
      if (null === d3)
        return document.createTextNode(p4);
      l4 = o4 ? document.createElementNS("http://www.w3.org/2000/svg", d3) : document.createElement(d3, p4.is && p4), r4 = null, c4 = false;
    }
    if (null === d3)
      y3 === p4 || c4 && l4.data === p4 || (l4.data = p4);
    else {
      if (r4 = r4 && n.call(l4.childNodes), h3 = (y3 = i4.props || f).dangerouslySetInnerHTML, v4 = p4.dangerouslySetInnerHTML, !c4) {
        if (null != r4)
          for (y3 = {}, k4 = 0; k4 < l4.attributes.length; k4++)
            y3[l4.attributes[k4].name] = l4.attributes[k4].value;
        (v4 || h3) && (v4 && (h3 && v4.__html == h3.__html || v4.__html === l4.innerHTML) || (l4.innerHTML = v4 && v4.__html || ""));
      }
      if (C(l4, p4, y3, o4, c4), v4)
        u4.__k = [];
      else if (k4 = u4.props.children, w(l4, Array.isArray(k4) ? k4 : [k4], u4, i4, t4, o4 && "foreignObject" !== d3, r4, e4, r4 ? r4[0] : i4.__k && _(i4, 0), c4), null != r4)
        for (k4 = r4.length; k4--; )
          null != r4[k4] && a(r4[k4]);
      c4 || ("value" in p4 && void 0 !== (k4 = p4.value) && (k4 !== l4.value || "progress" === d3 && !k4 || "option" === d3 && k4 !== y3.value) && H(l4, "value", k4, y3.value, false), "checked" in p4 && void 0 !== (k4 = p4.checked) && k4 !== l4.checked && H(l4, "checked", k4, y3.checked, false));
    }
    return l4;
  }
  function M(n3, u4, i4) {
    try {
      "function" == typeof n3 ? n3(u4) : n3.current = u4;
    } catch (n4) {
      l.__e(n4, i4);
    }
  }
  function N(n3, u4, i4) {
    var t4, o4;
    if (l.unmount && l.unmount(n3), (t4 = n3.ref) && (t4.current && t4.current !== n3.__e || M(t4, null, u4)), null != (t4 = n3.__c)) {
      if (t4.componentWillUnmount)
        try {
          t4.componentWillUnmount();
        } catch (n4) {
          l.__e(n4, u4);
        }
      t4.base = t4.__P = null;
    }
    if (t4 = n3.__k)
      for (o4 = 0; o4 < t4.length; o4++)
        t4[o4] && N(t4[o4], u4, "function" != typeof n3.type);
    i4 || null == n3.__e || a(n3.__e), n3.__e = n3.__d = void 0;
  }
  function O(n3, l4, u4) {
    return this.constructor(n3, u4);
  }
  function P(u4, i4, t4) {
    var o4, r4, e4;
    l.__ && l.__(u4, i4), r4 = (o4 = "function" == typeof t4) ? null : t4 && t4.__k || i4.__k, e4 = [], j(i4, u4 = (!o4 && t4 || i4).__k = h(p, null, [u4]), r4 || f, f, void 0 !== i4.ownerSVGElement, !o4 && t4 ? [t4] : r4 ? null : i4.firstChild ? n.call(i4.childNodes) : null, e4, !o4 && t4 ? t4 : r4 ? r4.__e : i4.firstChild, o4), z(e4, u4);
  }
  function q(l4, u4, i4) {
    var t4, o4, r4, f4 = s({}, l4.props);
    for (r4 in u4)
      "key" == r4 ? t4 = u4[r4] : "ref" == r4 ? o4 = u4[r4] : f4[r4] = u4[r4];
    return arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), v(l4.type, f4, t4 || l4.key, o4 || l4.ref, null);
  }
  n = e.slice, l = {
    __e: function(n3, l4, u4, i4) {
      for (var t4, o4, r4; l4 = l4.__; )
        if ((t4 = l4.__c) && !t4.__)
          try {
            if ((o4 = t4.constructor) && null != o4.getDerivedStateFromError && (t4.setState(o4.getDerivedStateFromError(n3)), r4 = t4.__d), null != t4.componentDidCatch && (t4.componentDidCatch(n3, i4 || {}), r4 = t4.__d), r4)
              return t4.__E = t4;
          } catch (l5) {
            n3 = l5;
          }
      throw n3;
    }
  }, u = 0, i = function(n3) {
    return null != n3 && void 0 === n3.constructor;
  }, d.prototype.setState = function(n3, l4) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n3 && (n3 = n3(s({}, u4), this.props)), n3 && s(u4, n3), null != n3 && this.__v && (l4 && this.__h.push(l4), b(this));
  }, d.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), b(this));
  }, d.prototype.render = p, t = [], g.__r = 0, r = 0;

  // ../packages/@uppy/utils/lib/isDOMElement.js
  function isDOMElement(obj) {
    return (obj == null ? void 0 : obj.nodeType) === Node.ELEMENT_NODE;
  }

  // ../packages/@uppy/utils/lib/findDOMElement.js
  function findDOMElement(element, context) {
    if (context === void 0) {
      context = document;
    }
    if (typeof element === "string") {
      return context.querySelector(element);
    }
    if (isDOMElement(element)) {
      return element;
    }
    return null;
  }

  // ../packages/@uppy/utils/lib/getTextDirection.js
  function getTextDirection(element) {
    var _element;
    while (element && !element.dir) {
      element = element.parentNode;
    }
    return (_element = element) == null ? void 0 : _element.dir;
  }
  var getTextDirection_default = getTextDirection;

  // ../packages/@uppy/core/lib/BasePlugin.js
  var BasePlugin = class {
    constructor(uppy, opts) {
      if (opts === void 0) {
        opts = {};
      }
      this.uppy = uppy;
      this.opts = opts;
    }
    getPluginState() {
      const {
        plugins
      } = this.uppy.getState();
      return plugins[this.id] || {};
    }
    setPluginState(update) {
      const {
        plugins
      } = this.uppy.getState();
      this.uppy.setState({
        plugins: {
          ...plugins,
          [this.id]: {
            ...plugins[this.id],
            ...update
          }
        }
      });
    }
    setOptions(newOpts) {
      this.opts = {
        ...this.opts,
        ...newOpts
      };
      this.setPluginState();
      this.i18nInit();
    }
    i18nInit() {
      const translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale]);
      this.i18n = translator.translate.bind(translator);
      this.i18nArray = translator.translateArray.bind(translator);
      this.setPluginState();
    }
    addTarget() {
      throw new Error("Extend the addTarget method to add your plugin to another plugin's target");
    }
    install() {
    }
    uninstall() {
    }
    render() {
      throw new Error("Extend the render method to add your plugin to a DOM element");
    }
    update() {
    }
    afterUpdate() {
    }
  };

  // ../packages/@uppy/core/lib/UIPlugin.js
  function _classPrivateFieldLooseBase4(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id4 = 0;
  function _classPrivateFieldLooseKey4(name) {
    return "__private_" + id4++ + "_" + name;
  }
  function debounce(fn) {
    let calling = null;
    let latestArgs = null;
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      latestArgs = args;
      if (!calling) {
        calling = Promise.resolve().then(() => {
          calling = null;
          return fn(...latestArgs);
        });
      }
      return calling;
    };
  }
  var _updateUI = /* @__PURE__ */ _classPrivateFieldLooseKey4("updateUI");
  var UIPlugin = class extends BasePlugin {
    constructor() {
      super(...arguments);
      Object.defineProperty(this, _updateUI, {
        writable: true,
        value: void 0
      });
    }
    getTargetPlugin(target) {
      let targetPlugin;
      if (typeof target === "object" && target instanceof UIPlugin) {
        targetPlugin = target;
      } else if (typeof target === "function") {
        const Target = target;
        this.uppy.iteratePlugins((p4) => {
          if (p4 instanceof Target) {
            targetPlugin = p4;
          }
        });
      }
      return targetPlugin;
    }
    mount(target, plugin) {
      const callerPluginName = plugin.id;
      const targetElement = findDOMElement(target);
      if (targetElement) {
        this.isTargetDOMEl = true;
        const uppyRootElement = document.createElement("div");
        uppyRootElement.classList.add("uppy-Root");
        _classPrivateFieldLooseBase4(this, _updateUI)[_updateUI] = debounce((state) => {
          if (!this.uppy.getPlugin(this.id))
            return;
          P(this.render(state), uppyRootElement);
          this.afterUpdate();
        });
        this.uppy.log(`Installing ${callerPluginName} to a DOM element '${target}'`);
        if (this.opts.replaceTargetContent) {
          targetElement.innerHTML = "";
        }
        P(this.render(this.uppy.getState()), uppyRootElement);
        this.el = uppyRootElement;
        targetElement.appendChild(uppyRootElement);
        uppyRootElement.dir = this.opts.direction || getTextDirection_default(uppyRootElement) || "ltr";
        this.onMount();
        return this.el;
      }
      const targetPlugin = this.getTargetPlugin(target);
      if (targetPlugin) {
        this.uppy.log(`Installing ${callerPluginName} to ${targetPlugin.id}`);
        this.parent = targetPlugin;
        this.el = targetPlugin.addTarget(plugin);
        this.onMount();
        return this.el;
      }
      this.uppy.log(`Not installing ${callerPluginName}`);
      let message = `Invalid target option given to ${callerPluginName}.`;
      if (typeof target === "function") {
        message += " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly.";
      } else {
        message += "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.";
      }
      throw new Error(message);
    }
    update(state) {
      if (this.el != null) {
        var _classPrivateFieldLoo, _classPrivateFieldLoo2;
        (_classPrivateFieldLoo = (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase4(this, _updateUI))[_updateUI]) == null ? void 0 : _classPrivateFieldLoo.call(_classPrivateFieldLoo2, state);
      }
    }
    unmount() {
      if (this.isTargetDOMEl) {
        var _this$el;
        (_this$el = this.el) == null ? void 0 : _this$el.remove();
      }
      this.onUnmount();
    }
    onMount() {
    }
    onUnmount() {
    }
  };
  var UIPlugin_default = UIPlugin;

  // ../packages/@uppy/utils/lib/getSpeed.js
  function getSpeed(fileProgress) {
    if (!fileProgress.bytesUploaded)
      return 0;
    const timeElapsed = Date.now() - fileProgress.uploadStarted;
    const uploadSpeed = fileProgress.bytesUploaded / (timeElapsed / 1e3);
    return uploadSpeed;
  }

  // ../packages/@uppy/utils/lib/getBytesRemaining.js
  function getBytesRemaining(fileProgress) {
    return fileProgress.bytesTotal - fileProgress.bytesUploaded;
  }

  // ../packages/@uppy/status-bar/lib/StatusBarStates.js
  var StatusBarStates_default = {
    STATE_ERROR: "error",
    STATE_WAITING: "waiting",
    STATE_PREPROCESSING: "preprocessing",
    STATE_UPLOADING: "uploading",
    STATE_POSTPROCESSING: "postprocessing",
    STATE_COMPLETE: "complete"
  };

  // ../packages/@uppy/status-bar/lib/StatusBarUI.js
  var import_classnames2 = __toESM(require_classnames(), 1);

  // ../packages/@uppy/status-bar/lib/calculateProcessingProgress.js
  function calculateProcessingProgress(files) {
    const values = [];
    let mode;
    let message;
    for (const {
      progress
    } of Object.values(files)) {
      const {
        preprocess,
        postprocess
      } = progress;
      if (message == null && (preprocess || postprocess)) {
        ({
          mode,
          message
        } = preprocess || postprocess);
      }
      if ((preprocess == null ? void 0 : preprocess.mode) === "determinate")
        values.push(preprocess.value);
      if ((postprocess == null ? void 0 : postprocess.mode) === "determinate")
        values.push(postprocess.value);
    }
    const value = values.reduce((total, progressValue) => {
      return total + progressValue / values.length;
    }, 0);
    return {
      mode,
      message,
      value
    };
  }

  // ../packages/@uppy/status-bar/lib/Components.js
  var import_classnames = __toESM(require_classnames(), 1);
  var import_lodash2 = __toESM(require_lodash(), 1);
  var import_prettier_bytes2 = __toESM(require_prettierBytes(), 1);

  // ../packages/@uppy/utils/lib/secondsToTime.js
  function secondsToTime(rawSeconds) {
    const hours = Math.floor(rawSeconds / 3600) % 24;
    const minutes = Math.floor(rawSeconds / 60) % 60;
    const seconds = Math.floor(rawSeconds % 60);
    return {
      hours,
      minutes,
      seconds
    };
  }

  // ../packages/@uppy/utils/lib/prettyETA.js
  function prettyETA(seconds) {
    const time = secondsToTime(seconds);
    const hoursStr = time.hours === 0 ? "" : `${time.hours}h`;
    const minutesStr = time.minutes === 0 ? "" : `${time.hours === 0 ? time.minutes : ` ${time.minutes.toString(10).padStart(2, "0")}`}m`;
    const secondsStr = time.hours !== 0 ? "" : `${time.minutes === 0 ? time.seconds : ` ${time.seconds.toString(10).padStart(2, "0")}`}s`;
    return `${hoursStr}${minutesStr}${secondsStr}`;
  }

  // ../packages/@uppy/status-bar/lib/Components.js
  var DOT = `\xB7`;
  var renderDot = () => ` ${DOT} `;
  function UploadBtn(props) {
    const {
      newFiles,
      isUploadStarted,
      recoveredState,
      i18n,
      uploadState,
      isSomeGhost,
      startUpload
    } = props;
    const uploadBtnClassNames = (0, import_classnames.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
      "uppy-c-btn-primary": uploadState === StatusBarStates_default.STATE_WAITING
    }, {
      "uppy-StatusBar-actionBtn--disabled": isSomeGhost
    });
    const uploadBtnText = newFiles && isUploadStarted && !recoveredState ? i18n("uploadXNewFiles", {
      smart_count: newFiles
    }) : i18n("uploadXFiles", {
      smart_count: newFiles
    });
    return h("button", {
      type: "button",
      className: uploadBtnClassNames,
      "aria-label": i18n("uploadXFiles", {
        smart_count: newFiles
      }),
      onClick: startUpload,
      disabled: isSomeGhost,
      "data-uppy-super-focusable": true
    }, uploadBtnText);
  }
  function RetryBtn(props) {
    const {
      i18n,
      uppy
    } = props;
    return h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
      "aria-label": i18n("retryUpload"),
      onClick: () => uppy.retryAll(),
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "8",
      height: "10",
      viewBox: "0 0 8 10"
    }, h("path", {
      d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
    })), i18n("retry"));
  }
  function CancelBtn(props) {
    const {
      i18n,
      uppy
    } = props;
    return h("button", {
      type: "button",
      className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
      title: i18n("cancel"),
      "aria-label": i18n("cancel"),
      onClick: () => uppy.cancelAll(),
      "data-cy": "cancel",
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, h("g", {
      fill: "none",
      fillRule: "evenodd"
    }, h("circle", {
      fill: "#888",
      cx: "8",
      cy: "8",
      r: "8"
    }), h("path", {
      fill: "#FFF",
      d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
    }))));
  }
  function PauseResumeButton(props) {
    const {
      isAllPaused,
      i18n,
      isAllComplete,
      resumableUploads,
      uppy
    } = props;
    const title = isAllPaused ? i18n("resume") : i18n("pause");
    function togglePauseResume() {
      if (isAllComplete)
        return null;
      if (!resumableUploads) {
        return uppy.cancelAll();
      }
      if (isAllPaused) {
        return uppy.resumeAll();
      }
      return uppy.pauseAll();
    }
    return h("button", {
      title,
      "aria-label": title,
      className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
      type: "button",
      onClick: togglePauseResume,
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, h("g", {
      fill: "none",
      fillRule: "evenodd"
    }, h("circle", {
      fill: "#888",
      cx: "8",
      cy: "8",
      r: "8"
    }), h("path", {
      fill: "#FFF",
      d: isAllPaused ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
    }))));
  }
  function DoneBtn(props) {
    const {
      i18n,
      doneButtonHandler
    } = props;
    return h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
      onClick: doneButtonHandler,
      "data-uppy-super-focusable": true
    }, i18n("done"));
  }
  function LoadingSpinner() {
    return h("svg", {
      className: "uppy-StatusBar-spinner",
      "aria-hidden": "true",
      focusable: "false",
      width: "14",
      height: "14"
    }, h("path", {
      d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
      fillRule: "evenodd"
    }));
  }
  function ProgressBarProcessing(props) {
    const {
      progress
    } = props;
    const {
      value,
      mode,
      message
    } = progress;
    const roundedValue = Math.round(value * 100);
    const dot = `\xB7`;
    return h("div", {
      className: "uppy-StatusBar-content"
    }, h(LoadingSpinner, null), mode === "determinate" ? `${roundedValue}% ${dot} ` : "", message);
  }
  function ProgressDetails(props) {
    const {
      numUploads,
      complete,
      totalUploadedSize,
      totalSize,
      totalETA,
      i18n
    } = props;
    const ifShowFilesUploadedOfTotal = numUploads > 1;
    return h("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, ifShowFilesUploadedOfTotal && i18n("filesUploadedOfTotal", {
      complete,
      smart_count: numUploads
    }), h("span", {
      className: "uppy-StatusBar-additionalInfo"
    }, ifShowFilesUploadedOfTotal && renderDot(), i18n("dataUploadedOfTotal", {
      complete: (0, import_prettier_bytes2.default)(totalUploadedSize),
      total: (0, import_prettier_bytes2.default)(totalSize)
    }), renderDot(), i18n("xTimeLeft", {
      time: prettyETA(totalETA)
    })));
  }
  function FileUploadCount(props) {
    const {
      i18n,
      complete,
      numUploads
    } = props;
    return h("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, i18n("filesUploadedOfTotal", {
      complete,
      smart_count: numUploads
    }));
  }
  function UploadNewlyAddedFiles(props) {
    const {
      i18n,
      newFiles,
      startUpload
    } = props;
    const uploadBtnClassNames = (0, import_classnames.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
    return h("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, h("div", {
      className: "uppy-StatusBar-statusSecondaryHint"
    }, i18n("xMoreFilesAdded", {
      smart_count: newFiles
    })), h("button", {
      type: "button",
      className: uploadBtnClassNames,
      "aria-label": i18n("uploadXFiles", {
        smart_count: newFiles
      }),
      onClick: startUpload
    }, i18n("upload")));
  }
  var ThrottledProgressDetails = (0, import_lodash2.default)(ProgressDetails, 500, {
    leading: true,
    trailing: true
  });
  function ProgressBarUploading(props) {
    const {
      i18n,
      supportsUploadProgress: supportsUploadProgress2,
      totalProgress,
      showProgressDetails,
      isUploadStarted,
      isAllComplete,
      isAllPaused,
      newFiles,
      numUploads,
      complete,
      totalUploadedSize,
      totalSize,
      totalETA,
      startUpload
    } = props;
    const showUploadNewlyAddedFiles = newFiles && isUploadStarted;
    if (!isUploadStarted || isAllComplete) {
      return null;
    }
    const title = isAllPaused ? i18n("paused") : i18n("uploading");
    function renderProgressDetails() {
      if (!isAllPaused && !showUploadNewlyAddedFiles && showProgressDetails) {
        if (supportsUploadProgress2) {
          return h(ThrottledProgressDetails, {
            numUploads,
            complete,
            totalUploadedSize,
            totalSize,
            totalETA,
            i18n
          });
        }
        return h(FileUploadCount, {
          i18n,
          complete,
          numUploads
        });
      }
      return null;
    }
    return h("div", {
      className: "uppy-StatusBar-content",
      "aria-label": title,
      title
    }, !isAllPaused ? h(LoadingSpinner, null) : null, h("div", {
      className: "uppy-StatusBar-status"
    }, h("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, supportsUploadProgress2 ? `${title}: ${totalProgress}%` : title), renderProgressDetails(), showUploadNewlyAddedFiles ? h(UploadNewlyAddedFiles, {
      i18n,
      newFiles,
      startUpload
    }) : null));
  }
  function ProgressBarComplete(props) {
    const {
      i18n
    } = props;
    return h("div", {
      className: "uppy-StatusBar-content",
      role: "status",
      title: i18n("complete")
    }, h("div", {
      className: "uppy-StatusBar-status"
    }, h("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-StatusBar-statusIndicator uppy-c-icon",
      width: "15",
      height: "11",
      viewBox: "0 0 15 11"
    }, h("path", {
      d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
    })), i18n("complete"))));
  }
  function ProgressBarError(props) {
    const {
      error,
      i18n,
      complete,
      numUploads
    } = props;
    function displayErrorAlert() {
      const errorMessage = `${i18n("uploadFailed")} 

 ${error}`;
      alert(errorMessage);
    }
    return h("div", {
      className: "uppy-StatusBar-content",
      title: i18n("uploadFailed")
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-StatusBar-statusIndicator uppy-c-icon",
      width: "11",
      height: "11",
      viewBox: "0 0 11 11"
    }, h("path", {
      d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
    })), h("div", {
      className: "uppy-StatusBar-status"
    }, h("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, i18n("uploadFailed"), h("button", {
      className: "uppy-u-reset uppy-StatusBar-details",
      "aria-label": i18n("showErrorDetails"),
      "data-microtip-position": "top-right",
      "data-microtip-size": "medium",
      onClick: displayErrorAlert,
      type: "button"
    }, "?")), h(FileUploadCount, {
      i18n,
      complete,
      numUploads
    })));
  }

  // ../packages/@uppy/status-bar/lib/StatusBarUI.js
  var {
    STATE_ERROR,
    STATE_WAITING,
    STATE_PREPROCESSING,
    STATE_UPLOADING,
    STATE_POSTPROCESSING,
    STATE_COMPLETE
  } = StatusBarStates_default;
  function StatusBar(props) {
    const {
      newFiles,
      allowNewUpload,
      isUploadInProgress,
      isAllPaused,
      resumableUploads,
      error,
      hideUploadButton,
      hidePauseResumeButton,
      hideCancelButton,
      hideRetryButton,
      recoveredState,
      uploadState,
      totalProgress,
      files,
      supportsUploadProgress: supportsUploadProgress2,
      hideAfterFinish,
      isSomeGhost,
      doneButtonHandler,
      isUploadStarted,
      i18n,
      startUpload,
      uppy,
      isAllComplete,
      showProgressDetails,
      numUploads,
      complete,
      totalSize,
      totalETA,
      totalUploadedSize
    } = props;
    function getProgressValue() {
      switch (uploadState) {
        case STATE_POSTPROCESSING:
        case STATE_PREPROCESSING: {
          const progress = calculateProcessingProgress(files);
          if (progress.mode === "determinate") {
            return progress.value * 100;
          }
          return totalProgress;
        }
        case STATE_ERROR: {
          return null;
        }
        case STATE_UPLOADING: {
          if (!supportsUploadProgress2) {
            return null;
          }
          return totalProgress;
        }
        default:
          return totalProgress;
      }
    }
    function getIsIndeterminate() {
      switch (uploadState) {
        case STATE_POSTPROCESSING:
        case STATE_PREPROCESSING: {
          const {
            mode
          } = calculateProcessingProgress(files);
          return mode === "indeterminate";
        }
        case STATE_UPLOADING: {
          if (!supportsUploadProgress2) {
            return true;
          }
          return false;
        }
        default:
          return false;
      }
    }
    function getIsHidden() {
      if (recoveredState) {
        return false;
      }
      switch (uploadState) {
        case STATE_WAITING:
          return hideUploadButton || newFiles === 0;
        case STATE_COMPLETE:
          return hideAfterFinish;
        default:
          return false;
      }
    }
    const progressValue = getProgressValue();
    const isHidden = getIsHidden();
    const width = progressValue != null ? progressValue : 100;
    const showUploadBtn = !error && newFiles && !isUploadInProgress && !isAllPaused && allowNewUpload && !hideUploadButton;
    const showCancelBtn = !hideCancelButton && uploadState !== STATE_WAITING && uploadState !== STATE_COMPLETE;
    const showPauseResumeBtn = resumableUploads && !hidePauseResumeButton && uploadState === STATE_UPLOADING;
    const showRetryBtn = error && !isAllComplete && !hideRetryButton;
    const showDoneBtn = doneButtonHandler && uploadState === STATE_COMPLETE;
    const progressClassNames = (0, import_classnames2.default)("uppy-StatusBar-progress", {
      "is-indeterminate": getIsIndeterminate()
    });
    const statusBarClassNames = (0, import_classnames2.default)("uppy-StatusBar", `is-${uploadState}`, {
      "has-ghosts": isSomeGhost
    });
    return h("div", {
      className: statusBarClassNames,
      "aria-hidden": isHidden
    }, h("div", {
      className: progressClassNames,
      style: {
        width: `${width}%`
      },
      role: "progressbar",
      "aria-label": `${width}%`,
      "aria-valuetext": `${width}%`,
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": progressValue
    }), (() => {
      switch (uploadState) {
        case STATE_PREPROCESSING:
        case STATE_POSTPROCESSING:
          return h(ProgressBarProcessing, {
            progress: calculateProcessingProgress(files)
          });
        case STATE_COMPLETE:
          return h(ProgressBarComplete, {
            i18n
          });
        case STATE_ERROR:
          return h(ProgressBarError, {
            error,
            i18n,
            numUploads,
            complete
          });
        case STATE_UPLOADING:
          return h(ProgressBarUploading, {
            i18n,
            supportsUploadProgress: supportsUploadProgress2,
            totalProgress,
            showProgressDetails,
            isUploadStarted,
            isAllComplete,
            isAllPaused,
            newFiles,
            numUploads,
            complete,
            totalUploadedSize,
            totalSize,
            totalETA,
            startUpload
          });
        default:
          return null;
      }
    })(), h("div", {
      className: "uppy-StatusBar-actions"
    }, recoveredState || showUploadBtn ? h(UploadBtn, {
      newFiles,
      isUploadStarted,
      recoveredState,
      i18n,
      isSomeGhost,
      startUpload,
      uploadState
    }) : null, showRetryBtn ? h(RetryBtn, {
      i18n,
      uppy
    }) : null, showPauseResumeBtn ? h(PauseResumeButton, {
      isAllPaused,
      i18n,
      isAllComplete,
      resumableUploads,
      uppy
    }) : null, showCancelBtn ? h(CancelBtn, {
      i18n,
      uppy
    }) : null, showDoneBtn ? h(DoneBtn, {
      i18n,
      doneButtonHandler
    }) : null));
  }

  // ../packages/@uppy/status-bar/lib/locale.js
  var locale_default2 = {
    strings: {
      uploading: "Uploading",
      complete: "Complete",
      uploadFailed: "Upload failed",
      paused: "Paused",
      retry: "Retry",
      cancel: "Cancel",
      pause: "Pause",
      resume: "Resume",
      done: "Done",
      filesUploadedOfTotal: {
        0: "%{complete} of %{smart_count} file uploaded",
        1: "%{complete} of %{smart_count} files uploaded"
      },
      dataUploadedOfTotal: "%{complete} of %{total}",
      xTimeLeft: "%{time} left",
      uploadXFiles: {
        0: "Upload %{smart_count} file",
        1: "Upload %{smart_count} files"
      },
      uploadXNewFiles: {
        0: "Upload +%{smart_count} file",
        1: "Upload +%{smart_count} files"
      },
      upload: "Upload",
      retryUpload: "Retry upload",
      xMoreFilesAdded: {
        0: "%{smart_count} more file added",
        1: "%{smart_count} more files added"
      },
      showErrorDetails: "Show error details"
    }
  };

  // ../packages/@uppy/status-bar/lib/StatusBar.js
  var packageJson3 = {
    "version": "3.0.1"
  };
  function getTotalSpeed(files) {
    let totalSpeed = 0;
    files.forEach((file) => {
      totalSpeed += getSpeed(file.progress);
    });
    return totalSpeed;
  }
  function getTotalETA(files) {
    const totalSpeed = getTotalSpeed(files);
    if (totalSpeed === 0) {
      return 0;
    }
    const totalBytesRemaining = files.reduce((total, file) => {
      return total + getBytesRemaining(file.progress);
    }, 0);
    return Math.round(totalBytesRemaining / totalSpeed * 10) / 10;
  }
  function getUploadingState(error, isAllComplete, recoveredState, files) {
    if (error && !isAllComplete) {
      return StatusBarStates_default.STATE_ERROR;
    }
    if (isAllComplete) {
      return StatusBarStates_default.STATE_COMPLETE;
    }
    if (recoveredState) {
      return StatusBarStates_default.STATE_WAITING;
    }
    let state = StatusBarStates_default.STATE_WAITING;
    const fileIDs = Object.keys(files);
    for (let i4 = 0; i4 < fileIDs.length; i4++) {
      const {
        progress
      } = files[fileIDs[i4]];
      if (progress.uploadStarted && !progress.uploadComplete) {
        return StatusBarStates_default.STATE_UPLOADING;
      }
      if (progress.preprocess && state !== StatusBarStates_default.STATE_UPLOADING) {
        state = StatusBarStates_default.STATE_PREPROCESSING;
      }
      if (progress.postprocess && state !== StatusBarStates_default.STATE_UPLOADING && state !== StatusBarStates_default.STATE_PREPROCESSING) {
        state = StatusBarStates_default.STATE_POSTPROCESSING;
      }
    }
    return state;
  }
  var StatusBar2 = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.startUpload = () => {
        const {
          recoveredState
        } = this.uppy.getState();
        if (recoveredState) {
          this.uppy.emit("restore-confirmed");
          return void 0;
        }
        return this.uppy.upload().catch(() => {
        });
      };
      this.id = this.opts.id || "StatusBar";
      this.title = "StatusBar";
      this.type = "progressindicator";
      this.defaultLocale = locale_default2;
      const defaultOptions4 = {
        target: "body",
        hideUploadButton: false,
        hideRetryButton: false,
        hidePauseResumeButton: false,
        hideCancelButton: false,
        showProgressDetails: false,
        hideAfterFinish: true,
        doneButtonHandler: null
      };
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      this.i18nInit();
      this.render = this.render.bind(this);
      this.install = this.install.bind(this);
    }
    render(state) {
      const {
        capabilities,
        files,
        allowNewUpload,
        totalProgress,
        error,
        recoveredState
      } = state;
      const {
        newFiles,
        startedFiles,
        completeFiles,
        inProgressNotPausedFiles,
        isUploadStarted,
        isAllComplete,
        isAllErrored,
        isAllPaused,
        isUploadInProgress,
        isSomeGhost
      } = this.uppy.getObjectOfFilesPerState();
      const newFilesOrRecovered = recoveredState ? Object.values(files) : newFiles;
      const totalETA = getTotalETA(inProgressNotPausedFiles);
      const resumableUploads = !!capabilities.resumableUploads;
      const supportsUploadProgress2 = capabilities.uploadProgress !== false;
      let totalSize = 0;
      let totalUploadedSize = 0;
      startedFiles.forEach((file) => {
        totalSize += file.progress.bytesTotal || 0;
        totalUploadedSize += file.progress.bytesUploaded || 0;
      });
      return StatusBar({
        error,
        uploadState: getUploadingState(error, isAllComplete, recoveredState, state.files || {}),
        allowNewUpload,
        totalProgress,
        totalSize,
        totalUploadedSize,
        isAllComplete: false,
        isAllPaused,
        isAllErrored,
        isUploadStarted,
        isUploadInProgress,
        isSomeGhost,
        recoveredState,
        complete: completeFiles.length,
        newFiles: newFilesOrRecovered.length,
        numUploads: startedFiles.length,
        totalETA,
        files,
        i18n: this.i18n,
        uppy: this.uppy,
        startUpload: this.startUpload,
        doneButtonHandler: this.opts.doneButtonHandler,
        resumableUploads,
        supportsUploadProgress: supportsUploadProgress2,
        showProgressDetails: this.opts.showProgressDetails,
        hideUploadButton: this.opts.hideUploadButton,
        hideRetryButton: this.opts.hideRetryButton,
        hidePauseResumeButton: this.opts.hidePauseResumeButton,
        hideCancelButton: this.opts.hideCancelButton,
        hideAfterFinish: this.opts.hideAfterFinish,
        isTargetDOMEl: this.isTargetDOMEl
      });
    }
    onMount() {
      const element = this.el;
      const direction = getTextDirection_default(element);
      if (!direction) {
        element.dir = "ltr";
      }
    }
    install() {
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.unmount();
    }
  };
  StatusBar2.VERSION = packageJson3.version;

  // ../packages/@uppy/informer/lib/FadeIn.js
  var TRANSITION_MS = 300;
  var FadeIn = class extends d {
    constructor() {
      super(...arguments);
      this.ref = y();
    }
    componentWillEnter(callback) {
      this.ref.current.style.opacity = "1";
      this.ref.current.style.transform = "none";
      setTimeout(callback, TRANSITION_MS);
    }
    componentWillLeave(callback) {
      this.ref.current.style.opacity = "0";
      this.ref.current.style.transform = "translateY(350%)";
      setTimeout(callback, TRANSITION_MS);
    }
    render() {
      const {
        children
      } = this.props;
      return h("div", {
        className: "uppy-Informer-animated",
        ref: this.ref
      }, children);
    }
  };

  // ../packages/@uppy/informer/lib/TransitionGroup.js
  function assign(obj, props) {
    return Object.assign(obj, props);
  }
  function getKey(vnode, fallback) {
    var _vnode$key;
    return (_vnode$key = vnode == null ? void 0 : vnode.key) != null ? _vnode$key : fallback;
  }
  function linkRef(component, name) {
    const cache = component._ptgLinkedRefs || (component._ptgLinkedRefs = {});
    return cache[name] || (cache[name] = (c4) => {
      component.refs[name] = c4;
    });
  }
  function getChildMapping(children) {
    const out = {};
    for (let i4 = 0; i4 < children.length; i4++) {
      if (children[i4] != null) {
        const key = getKey(children[i4], i4.toString(36));
        out[key] = children[i4];
      }
    }
    return out;
  }
  function mergeChildMappings(prev, next) {
    prev = prev || {};
    next = next || {};
    const getValueForKey = (key) => next.hasOwnProperty(key) ? next[key] : prev[key];
    const nextKeysPending = {};
    let pendingKeys = [];
    for (const prevKey in prev) {
      if (next.hasOwnProperty(prevKey)) {
        if (pendingKeys.length) {
          nextKeysPending[prevKey] = pendingKeys;
          pendingKeys = [];
        }
      } else {
        pendingKeys.push(prevKey);
      }
    }
    const childMapping = {};
    for (const nextKey in next) {
      if (nextKeysPending.hasOwnProperty(nextKey)) {
        for (let i4 = 0; i4 < nextKeysPending[nextKey].length; i4++) {
          const pendingNextKey = nextKeysPending[nextKey][i4];
          childMapping[nextKeysPending[nextKey][i4]] = getValueForKey(pendingNextKey);
        }
      }
      childMapping[nextKey] = getValueForKey(nextKey);
    }
    for (let i4 = 0; i4 < pendingKeys.length; i4++) {
      childMapping[pendingKeys[i4]] = getValueForKey(pendingKeys[i4]);
    }
    return childMapping;
  }
  var identity = (i4) => i4;
  var TransitionGroup = class extends d {
    constructor(props, context) {
      super(props, context);
      this.refs = {};
      this.state = {
        children: getChildMapping(x(x(this.props.children)) || [])
      };
      this.performAppear = this.performAppear.bind(this);
      this.performEnter = this.performEnter.bind(this);
      this.performLeave = this.performLeave.bind(this);
    }
    componentWillMount() {
      this.currentlyTransitioningKeys = {};
      this.keysToAbortLeave = [];
      this.keysToEnter = [];
      this.keysToLeave = [];
    }
    componentDidMount() {
      const initialChildMapping = this.state.children;
      for (const key in initialChildMapping) {
        if (initialChildMapping[key]) {
          this.performAppear(key);
        }
      }
    }
    componentWillReceiveProps(nextProps) {
      const nextChildMapping = getChildMapping(x(nextProps.children) || []);
      const prevChildMapping = this.state.children;
      this.setState((prevState) => ({
        children: mergeChildMappings(prevState.children, nextChildMapping)
      }));
      let key;
      for (key in nextChildMapping) {
        if (nextChildMapping.hasOwnProperty(key)) {
          const hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
          if (nextChildMapping[key] && hasPrev && this.currentlyTransitioningKeys[key]) {
            this.keysToEnter.push(key);
            this.keysToAbortLeave.push(key);
          } else if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
            this.keysToEnter.push(key);
          }
        }
      }
      for (key in prevChildMapping) {
        if (prevChildMapping.hasOwnProperty(key)) {
          const hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
          if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
            this.keysToLeave.push(key);
          }
        }
      }
    }
    componentDidUpdate() {
      const {
        keysToEnter
      } = this;
      this.keysToEnter = [];
      keysToEnter.forEach(this.performEnter);
      const {
        keysToLeave
      } = this;
      this.keysToLeave = [];
      keysToLeave.forEach(this.performLeave);
    }
    _finishAbort(key) {
      const idx = this.keysToAbortLeave.indexOf(key);
      if (idx !== -1) {
        this.keysToAbortLeave.splice(idx, 1);
      }
    }
    performAppear(key) {
      this.currentlyTransitioningKeys[key] = true;
      const component = this.refs[key];
      if (component.componentWillAppear) {
        component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
      } else {
        this._handleDoneAppearing(key);
      }
    }
    _handleDoneAppearing(key) {
      const component = this.refs[key];
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }
      delete this.currentlyTransitioningKeys[key];
      this._finishAbort(key);
      const currentChildMapping = getChildMapping(x(this.props.children) || []);
      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        this.performLeave(key);
      }
    }
    performEnter(key) {
      this.currentlyTransitioningKeys[key] = true;
      const component = this.refs[key];
      if (component.componentWillEnter) {
        component.componentWillEnter(this._handleDoneEntering.bind(this, key));
      } else {
        this._handleDoneEntering(key);
      }
    }
    _handleDoneEntering(key) {
      const component = this.refs[key];
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }
      delete this.currentlyTransitioningKeys[key];
      this._finishAbort(key);
      const currentChildMapping = getChildMapping(x(this.props.children) || []);
      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        this.performLeave(key);
      }
    }
    performLeave(key) {
      const idx = this.keysToAbortLeave.indexOf(key);
      if (idx !== -1) {
        return;
      }
      this.currentlyTransitioningKeys[key] = true;
      const component = this.refs[key];
      if (component.componentWillLeave) {
        component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
      } else {
        this._handleDoneLeaving(key);
      }
    }
    _handleDoneLeaving(key) {
      const idx = this.keysToAbortLeave.indexOf(key);
      if (idx !== -1) {
        return;
      }
      const component = this.refs[key];
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }
      delete this.currentlyTransitioningKeys[key];
      const currentChildMapping = getChildMapping(x(this.props.children) || []);
      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        this.performEnter(key);
      } else {
        const children = assign({}, this.state.children);
        delete children[key];
        this.setState({
          children
        });
      }
    }
    render(_ref, _ref2) {
      let {
        childFactory,
        transitionLeave,
        transitionName: transitionName2,
        transitionAppear,
        transitionEnter,
        transitionLeaveTimeout,
        transitionEnterTimeout,
        transitionAppearTimeout,
        component,
        ...props
      } = _ref;
      let {
        children
      } = _ref2;
      const childrenToRender = Object.entries(children).map((_ref3) => {
        let [key, child] = _ref3;
        if (!child)
          return void 0;
        const ref = linkRef(this, key);
        return q(childFactory(child), {
          ref,
          key
        });
      }).filter(Boolean);
      return h(component, props, childrenToRender);
    }
  };
  TransitionGroup.defaultProps = {
    component: "span",
    childFactory: identity
  };
  var TransitionGroup_default = TransitionGroup;

  // ../packages/@uppy/informer/lib/Informer.js
  var packageJson4 = {
    "version": "3.0.1"
  };
  var Informer = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.render = (state) => {
        return h("div", {
          className: "uppy uppy-Informer"
        }, h(TransitionGroup_default, null, state.info.map((info) => h(FadeIn, {
          key: info.message
        }, h("p", {
          role: "alert"
        }, info.message, " ", info.details && h("span", {
          "aria-label": info.details,
          "data-microtip-position": "top-left",
          "data-microtip-size": "medium",
          role: "tooltip",
          onClick: () => alert(`${info.message} 

 ${info.details}`)
        }, "?"))))));
      };
      this.type = "progressindicator";
      this.id = this.opts.id || "Informer";
      this.title = "Informer";
      const defaultOptions4 = {};
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
    }
    install() {
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
  };
  Informer.VERSION = packageJson4.version;

  // ../packages/@uppy/utils/lib/dataURItoBlob.js
  var DATA_URL_PATTERN = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
  function dataURItoBlob(dataURI, opts, toFile) {
    var _ref, _opts$mimeType;
    const dataURIData = DATA_URL_PATTERN.exec(dataURI);
    const mimeType = (_ref = (_opts$mimeType = opts.mimeType) != null ? _opts$mimeType : dataURIData == null ? void 0 : dataURIData[1]) != null ? _ref : "plain/text";
    let data;
    if (dataURIData[2] != null) {
      const binary = atob(decodeURIComponent(dataURIData[3]));
      const bytes = new Uint8Array(binary.length);
      for (let i4 = 0; i4 < binary.length; i4++) {
        bytes[i4] = binary.charCodeAt(i4);
      }
      data = [bytes];
    } else {
      data = [decodeURIComponent(dataURIData[3])];
    }
    if (toFile) {
      return new File(data, opts.name || "", {
        type: mimeType
      });
    }
    return new Blob(data, {
      type: mimeType
    });
  }

  // ../packages/@uppy/utils/lib/isObjectURL.js
  function isObjectURL(url) {
    return url.startsWith("blob:");
  }

  // ../packages/@uppy/utils/lib/isPreviewSupported.js
  function isPreviewSupported(fileType) {
    if (!fileType)
      return false;
    return /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(fileType);
  }

  // ../node_modules/exifr/dist/mini.esm.mjs
  function e2(e4, t4, s4) {
    return t4 in e4 ? Object.defineProperty(e4, t4, { value: s4, enumerable: true, configurable: true, writable: true }) : e4[t4] = s4, e4;
  }
  var t2 = "undefined" != typeof self ? self : global;
  var s2 = "undefined" != typeof navigator;
  var i2 = s2 && "undefined" == typeof HTMLImageElement;
  var n2 = !("undefined" == typeof global || "undefined" == typeof process || !process.versions || !process.versions.node);
  var r2 = t2.Buffer;
  var a2 = !!r2;
  var h2 = (e4) => void 0 !== e4;
  function f2(e4) {
    return void 0 === e4 || (e4 instanceof Map ? 0 === e4.size : 0 === Object.values(e4).filter(h2).length);
  }
  function l2(e4) {
    let t4 = new Error(e4);
    throw delete t4.stack, t4;
  }
  function o2(e4) {
    let t4 = function(e5) {
      let t5 = 0;
      return e5.ifd0.enabled && (t5 += 1024), e5.exif.enabled && (t5 += 2048), e5.makerNote && (t5 += 2048), e5.userComment && (t5 += 1024), e5.gps.enabled && (t5 += 512), e5.interop.enabled && (t5 += 100), e5.ifd1.enabled && (t5 += 1024), t5 + 2048;
    }(e4);
    return e4.jfif.enabled && (t4 += 50), e4.xmp.enabled && (t4 += 2e4), e4.iptc.enabled && (t4 += 14e3), e4.icc.enabled && (t4 += 6e3), t4;
  }
  var u2 = (e4) => String.fromCharCode.apply(null, e4);
  var d2 = "undefined" != typeof TextDecoder ? new TextDecoder("utf-8") : void 0;
  var c2 = class {
    static from(e4, t4) {
      return e4 instanceof this && e4.le === t4 ? e4 : new c2(e4, void 0, void 0, t4);
    }
    constructor(e4, t4 = 0, s4, i4) {
      if ("boolean" == typeof i4 && (this.le = i4), Array.isArray(e4) && (e4 = new Uint8Array(e4)), 0 === e4)
        this.byteOffset = 0, this.byteLength = 0;
      else if (e4 instanceof ArrayBuffer) {
        void 0 === s4 && (s4 = e4.byteLength - t4);
        let i5 = new DataView(e4, t4, s4);
        this._swapDataView(i5);
      } else if (e4 instanceof Uint8Array || e4 instanceof DataView || e4 instanceof c2) {
        void 0 === s4 && (s4 = e4.byteLength - t4), (t4 += e4.byteOffset) + s4 > e4.byteOffset + e4.byteLength && l2("Creating view outside of available memory in ArrayBuffer");
        let i5 = new DataView(e4.buffer, t4, s4);
        this._swapDataView(i5);
      } else if ("number" == typeof e4) {
        let t5 = new DataView(new ArrayBuffer(e4));
        this._swapDataView(t5);
      } else
        l2("Invalid input argument for BufferView: " + e4);
    }
    _swapArrayBuffer(e4) {
      this._swapDataView(new DataView(e4));
    }
    _swapBuffer(e4) {
      this._swapDataView(new DataView(e4.buffer, e4.byteOffset, e4.byteLength));
    }
    _swapDataView(e4) {
      this.dataView = e4, this.buffer = e4.buffer, this.byteOffset = e4.byteOffset, this.byteLength = e4.byteLength;
    }
    _lengthToEnd(e4) {
      return this.byteLength - e4;
    }
    set(e4, t4, s4 = c2) {
      return e4 instanceof DataView || e4 instanceof c2 ? e4 = new Uint8Array(e4.buffer, e4.byteOffset, e4.byteLength) : e4 instanceof ArrayBuffer && (e4 = new Uint8Array(e4)), e4 instanceof Uint8Array || l2("BufferView.set(): Invalid data argument."), this.toUint8().set(e4, t4), new s4(this, t4, e4.byteLength);
    }
    subarray(e4, t4) {
      return t4 = t4 || this._lengthToEnd(e4), new c2(this, e4, t4);
    }
    toUint8() {
      return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
    }
    getUint8Array(e4, t4) {
      return new Uint8Array(this.buffer, this.byteOffset + e4, t4);
    }
    getString(e4 = 0, t4 = this.byteLength) {
      let s4 = this.getUint8Array(e4, t4);
      return i4 = s4, d2 ? d2.decode(i4) : a2 ? Buffer.from(i4).toString("utf8") : decodeURIComponent(escape(u2(i4)));
      var i4;
    }
    getLatin1String(e4 = 0, t4 = this.byteLength) {
      let s4 = this.getUint8Array(e4, t4);
      return u2(s4);
    }
    getUnicodeString(e4 = 0, t4 = this.byteLength) {
      const s4 = [];
      for (let i4 = 0; i4 < t4 && e4 + i4 < this.byteLength; i4 += 2)
        s4.push(this.getUint16(e4 + i4));
      return u2(s4);
    }
    getInt8(e4) {
      return this.dataView.getInt8(e4);
    }
    getUint8(e4) {
      return this.dataView.getUint8(e4);
    }
    getInt16(e4, t4 = this.le) {
      return this.dataView.getInt16(e4, t4);
    }
    getInt32(e4, t4 = this.le) {
      return this.dataView.getInt32(e4, t4);
    }
    getUint16(e4, t4 = this.le) {
      return this.dataView.getUint16(e4, t4);
    }
    getUint32(e4, t4 = this.le) {
      return this.dataView.getUint32(e4, t4);
    }
    getFloat32(e4, t4 = this.le) {
      return this.dataView.getFloat32(e4, t4);
    }
    getFloat64(e4, t4 = this.le) {
      return this.dataView.getFloat64(e4, t4);
    }
    getFloat(e4, t4 = this.le) {
      return this.dataView.getFloat32(e4, t4);
    }
    getDouble(e4, t4 = this.le) {
      return this.dataView.getFloat64(e4, t4);
    }
    getUintBytes(e4, t4, s4) {
      switch (t4) {
        case 1:
          return this.getUint8(e4, s4);
        case 2:
          return this.getUint16(e4, s4);
        case 4:
          return this.getUint32(e4, s4);
        case 8:
          return this.getUint64 && this.getUint64(e4, s4);
      }
    }
    getUint(e4, t4, s4) {
      switch (t4) {
        case 8:
          return this.getUint8(e4, s4);
        case 16:
          return this.getUint16(e4, s4);
        case 32:
          return this.getUint32(e4, s4);
        case 64:
          return this.getUint64 && this.getUint64(e4, s4);
      }
    }
    toString(e4) {
      return this.dataView.toString(e4, this.constructor.name);
    }
    ensureChunk() {
    }
  };
  function p2(e4, t4) {
    l2(`${e4} '${t4}' was not loaded, try using full build of exifr.`);
  }
  var g2 = class extends Map {
    constructor(e4) {
      super(), this.kind = e4;
    }
    get(e4, t4) {
      return this.has(e4) || p2(this.kind, e4), t4 && (e4 in t4 || function(e5, t5) {
        l2(`Unknown ${e5} '${t5}'.`);
      }(this.kind, e4), t4[e4].enabled || p2(this.kind, e4)), super.get(e4);
    }
    keyList() {
      return Array.from(this.keys());
    }
  };
  var m2 = new g2("file parser");
  var y2 = new g2("segment parser");
  var b2 = new g2("file reader");
  var w2 = t2.fetch;
  function k2(e4, t4) {
    return (i4 = e4).startsWith("data:") || i4.length > 1e4 ? v2(e4, t4, "base64") : n2 && e4.includes("://") ? O2(e4, t4, "url", S) : n2 ? v2(e4, t4, "fs") : s2 ? O2(e4, t4, "url", S) : void l2("Invalid input argument");
    var i4;
  }
  async function O2(e4, t4, s4, i4) {
    return b2.has(s4) ? v2(e4, t4, s4) : i4 ? async function(e5, t5) {
      let s5 = await t5(e5);
      return new c2(s5);
    }(e4, i4) : void l2(`Parser ${s4} is not loaded`);
  }
  async function v2(e4, t4, s4) {
    let i4 = new (b2.get(s4))(e4, t4);
    return await i4.read(), i4;
  }
  var S = (e4) => w2(e4).then((e5) => e5.arrayBuffer());
  var A2 = (e4) => new Promise((t4, s4) => {
    let i4 = new FileReader();
    i4.onloadend = () => t4(i4.result || new ArrayBuffer()), i4.onerror = s4, i4.readAsArrayBuffer(e4);
  });
  var U = class extends Map {
    get tagKeys() {
      return this.allKeys || (this.allKeys = Array.from(this.keys())), this.allKeys;
    }
    get tagValues() {
      return this.allValues || (this.allValues = Array.from(this.values())), this.allValues;
    }
  };
  function x2(e4, t4, s4) {
    let i4 = new U();
    for (let [e5, t5] of s4)
      i4.set(e5, t5);
    if (Array.isArray(t4))
      for (let s5 of t4)
        e4.set(s5, i4);
    else
      e4.set(t4, i4);
    return i4;
  }
  function C2(e4, t4, s4) {
    let i4, n3 = e4.get(t4);
    for (i4 of s4)
      n3.set(i4[0], i4[1]);
  }
  var B = /* @__PURE__ */ new Map();
  var V = /* @__PURE__ */ new Map();
  var I2 = /* @__PURE__ */ new Map();
  var L2 = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"];
  var T2 = ["jfif", "xmp", "icc", "iptc", "ihdr"];
  var z2 = ["tiff", ...T2];
  var P2 = ["ifd0", "ifd1", "exif", "gps", "interop"];
  var F = [...z2, ...P2];
  var j2 = ["makerNote", "userComment"];
  var E = ["translateKeys", "translateValues", "reviveValues", "multiSegment"];
  var M2 = [...E, "sanitize", "mergeOutput", "silentErrors"];
  var _2 = class {
    get translate() {
      return this.translateKeys || this.translateValues || this.reviveValues;
    }
  };
  var D = class extends _2 {
    get needed() {
      return this.enabled || this.deps.size > 0;
    }
    constructor(t4, s4, i4, n3) {
      if (super(), e2(this, "enabled", false), e2(this, "skip", /* @__PURE__ */ new Set()), e2(this, "pick", /* @__PURE__ */ new Set()), e2(this, "deps", /* @__PURE__ */ new Set()), e2(this, "translateKeys", false), e2(this, "translateValues", false), e2(this, "reviveValues", false), this.key = t4, this.enabled = s4, this.parse = this.enabled, this.applyInheritables(n3), this.canBeFiltered = P2.includes(t4), this.canBeFiltered && (this.dict = B.get(t4)), void 0 !== i4)
        if (Array.isArray(i4))
          this.parse = this.enabled = true, this.canBeFiltered && i4.length > 0 && this.translateTagSet(i4, this.pick);
        else if ("object" == typeof i4) {
          if (this.enabled = true, this.parse = false !== i4.parse, this.canBeFiltered) {
            let { pick: e4, skip: t5 } = i4;
            e4 && e4.length > 0 && this.translateTagSet(e4, this.pick), t5 && t5.length > 0 && this.translateTagSet(t5, this.skip);
          }
          this.applyInheritables(i4);
        } else
          true === i4 || false === i4 ? this.parse = this.enabled = i4 : l2(`Invalid options argument: ${i4}`);
    }
    applyInheritables(e4) {
      let t4, s4;
      for (t4 of E)
        s4 = e4[t4], void 0 !== s4 && (this[t4] = s4);
    }
    translateTagSet(e4, t4) {
      if (this.dict) {
        let s4, i4, { tagKeys: n3, tagValues: r4 } = this.dict;
        for (s4 of e4)
          "string" == typeof s4 ? (i4 = r4.indexOf(s4), -1 === i4 && (i4 = n3.indexOf(Number(s4))), -1 !== i4 && t4.add(Number(n3[i4]))) : t4.add(s4);
      } else
        for (let s4 of e4)
          t4.add(s4);
    }
    finalizeFilters() {
      !this.enabled && this.deps.size > 0 ? (this.enabled = true, X(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && X(this.pick, this.deps);
    }
  };
  var N2 = { jfif: false, tiff: true, xmp: false, icc: false, iptc: false, ifd0: true, ifd1: false, exif: true, gps: true, interop: false, ihdr: void 0, makerNote: false, userComment: false, multiSegment: false, skip: [], pick: [], translateKeys: true, translateValues: true, reviveValues: true, sanitize: true, mergeOutput: true, silentErrors: true, chunked: true, firstChunkSize: void 0, firstChunkSizeNode: 512, firstChunkSizeBrowser: 65536, chunkSize: 65536, chunkLimit: 5 };
  var $2 = /* @__PURE__ */ new Map();
  var R = class extends _2 {
    static useCached(e4) {
      let t4 = $2.get(e4);
      return void 0 !== t4 || (t4 = new this(e4), $2.set(e4, t4)), t4;
    }
    constructor(e4) {
      super(), true === e4 ? this.setupFromTrue() : void 0 === e4 ? this.setupFromUndefined() : Array.isArray(e4) ? this.setupFromArray(e4) : "object" == typeof e4 ? this.setupFromObject(e4) : l2(`Invalid options argument ${e4}`), void 0 === this.firstChunkSize && (this.firstChunkSize = s2 ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = false), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
    }
    setupFromUndefined() {
      let e4;
      for (e4 of L2)
        this[e4] = N2[e4];
      for (e4 of M2)
        this[e4] = N2[e4];
      for (e4 of j2)
        this[e4] = N2[e4];
      for (e4 of F)
        this[e4] = new D(e4, N2[e4], void 0, this);
    }
    setupFromTrue() {
      let e4;
      for (e4 of L2)
        this[e4] = N2[e4];
      for (e4 of M2)
        this[e4] = N2[e4];
      for (e4 of j2)
        this[e4] = true;
      for (e4 of F)
        this[e4] = new D(e4, true, void 0, this);
    }
    setupFromArray(e4) {
      let t4;
      for (t4 of L2)
        this[t4] = N2[t4];
      for (t4 of M2)
        this[t4] = N2[t4];
      for (t4 of j2)
        this[t4] = N2[t4];
      for (t4 of F)
        this[t4] = new D(t4, false, void 0, this);
      this.setupGlobalFilters(e4, void 0, P2);
    }
    setupFromObject(e4) {
      let t4;
      for (t4 of (P2.ifd0 = P2.ifd0 || P2.image, P2.ifd1 = P2.ifd1 || P2.thumbnail, Object.assign(this, e4), L2))
        this[t4] = W(e4[t4], N2[t4]);
      for (t4 of M2)
        this[t4] = W(e4[t4], N2[t4]);
      for (t4 of j2)
        this[t4] = W(e4[t4], N2[t4]);
      for (t4 of z2)
        this[t4] = new D(t4, N2[t4], e4[t4], this);
      for (t4 of P2)
        this[t4] = new D(t4, N2[t4], e4[t4], this.tiff);
      this.setupGlobalFilters(e4.pick, e4.skip, P2, F), true === e4.tiff ? this.batchEnableWithBool(P2, true) : false === e4.tiff ? this.batchEnableWithUserValue(P2, e4) : Array.isArray(e4.tiff) ? this.setupGlobalFilters(e4.tiff, void 0, P2) : "object" == typeof e4.tiff && this.setupGlobalFilters(e4.tiff.pick, e4.tiff.skip, P2);
    }
    batchEnableWithBool(e4, t4) {
      for (let s4 of e4)
        this[s4].enabled = t4;
    }
    batchEnableWithUserValue(e4, t4) {
      for (let s4 of e4) {
        let e5 = t4[s4];
        this[s4].enabled = false !== e5 && void 0 !== e5;
      }
    }
    setupGlobalFilters(e4, t4, s4, i4 = s4) {
      if (e4 && e4.length) {
        for (let e5 of i4)
          this[e5].enabled = false;
        let t5 = K(e4, s4);
        for (let [e5, s5] of t5)
          X(this[e5].pick, s5), this[e5].enabled = true;
      } else if (t4 && t4.length) {
        let e5 = K(t4, s4);
        for (let [t5, s5] of e5)
          X(this[t5].skip, s5);
      }
    }
    filterNestedSegmentTags() {
      let { ifd0: e4, exif: t4, xmp: s4, iptc: i4, icc: n3 } = this;
      this.makerNote ? t4.deps.add(37500) : t4.skip.add(37500), this.userComment ? t4.deps.add(37510) : t4.skip.add(37510), s4.enabled || e4.skip.add(700), i4.enabled || e4.skip.add(33723), n3.enabled || e4.skip.add(34675);
    }
    traverseTiffDependencyTree() {
      let { ifd0: e4, exif: t4, gps: s4, interop: i4 } = this;
      i4.needed && (t4.deps.add(40965), e4.deps.add(40965)), t4.needed && e4.deps.add(34665), s4.needed && e4.deps.add(34853), this.tiff.enabled = P2.some((e5) => true === this[e5].enabled) || this.makerNote || this.userComment;
      for (let e5 of P2)
        this[e5].finalizeFilters();
    }
    get onlyTiff() {
      return !T2.map((e4) => this[e4].enabled).some((e4) => true === e4) && this.tiff.enabled;
    }
    checkLoadedPlugins() {
      for (let e4 of z2)
        this[e4].enabled && !y2.has(e4) && p2("segment parser", e4);
    }
  };
  function K(e4, t4) {
    let s4, i4, n3, r4, a4 = [];
    for (n3 of t4) {
      for (r4 of (s4 = B.get(n3), i4 = [], s4))
        (e4.includes(r4[0]) || e4.includes(r4[1])) && i4.push(r4[0]);
      i4.length && a4.push([n3, i4]);
    }
    return a4;
  }
  function W(e4, t4) {
    return void 0 !== e4 ? e4 : void 0 !== t4 ? t4 : void 0;
  }
  function X(e4, t4) {
    for (let s4 of t4)
      e4.add(s4);
  }
  e2(R, "default", N2);
  var H2 = class {
    constructor(t4) {
      e2(this, "parsers", {}), e2(this, "output", {}), e2(this, "errors", []), e2(this, "pushToErrors", (e4) => this.errors.push(e4)), this.options = R.useCached(t4);
    }
    async read(e4) {
      this.file = await function(e5, t4) {
        return "string" == typeof e5 ? k2(e5, t4) : s2 && !i2 && e5 instanceof HTMLImageElement ? k2(e5.src, t4) : e5 instanceof Uint8Array || e5 instanceof ArrayBuffer || e5 instanceof DataView ? new c2(e5) : s2 && e5 instanceof Blob ? O2(e5, t4, "blob", A2) : void l2("Invalid input argument");
      }(e4, this.options);
    }
    setup() {
      if (this.fileParser)
        return;
      let { file: e4 } = this, t4 = e4.getUint16(0);
      for (let [s4, i4] of m2)
        if (i4.canHandle(e4, t4))
          return this.fileParser = new i4(this.options, this.file, this.parsers), e4[s4] = true;
      this.file.close && this.file.close(), l2("Unknown file format");
    }
    async parse() {
      let { output: e4, errors: t4 } = this;
      return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t4.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t4.length > 0 && (e4.errors = t4), f2(s4 = e4) ? void 0 : s4;
      var s4;
    }
    async executeParsers() {
      let { output: e4 } = this;
      await this.fileParser.parse();
      let t4 = Object.values(this.parsers).map(async (t5) => {
        let s4 = await t5.parse();
        t5.assignToOutput(e4, s4);
      });
      this.options.silentErrors && (t4 = t4.map((e5) => e5.catch(this.pushToErrors))), await Promise.all(t4);
    }
    async extractThumbnail() {
      this.setup();
      let { options: e4, file: t4 } = this, s4 = y2.get("tiff", e4);
      var i4;
      if (t4.tiff ? i4 = { start: 0, type: "tiff" } : t4.jpeg && (i4 = await this.fileParser.getOrFindSegment("tiff")), void 0 === i4)
        return;
      let n3 = await this.fileParser.ensureSegmentChunk(i4), r4 = this.parsers.tiff = new s4(n3, e4, t4), a4 = await r4.extractThumbnail();
      return t4.close && t4.close(), a4;
    }
  };
  async function Y(e4, t4) {
    let s4 = new H2(t4);
    return await s4.read(e4), s4.parse();
  }
  var G = Object.freeze({ __proto__: null, parse: Y, Exifr: H2, fileParsers: m2, segmentParsers: y2, fileReaders: b2, tagKeys: B, tagValues: V, tagRevivers: I2, createDictionary: x2, extendDictionary: C2, fetchUrlAsArrayBuffer: S, readBlobAsArrayBuffer: A2, chunkedProps: L2, otherSegments: T2, segments: z2, tiffBlocks: P2, segmentsAndBlocks: F, tiffExtractables: j2, inheritables: E, allFormatters: M2, Options: R });
  var J = class {
    static findPosition(e4, t4) {
      let s4 = e4.getUint16(t4 + 2) + 2, i4 = "function" == typeof this.headerLength ? this.headerLength(e4, t4, s4) : this.headerLength, n3 = t4 + i4, r4 = s4 - i4;
      return { offset: t4, length: s4, headerLength: i4, start: n3, size: r4, end: n3 + r4 };
    }
    static parse(e4, t4 = {}) {
      return new this(e4, new R({ [this.type]: t4 }), e4).parse();
    }
    normalizeInput(e4) {
      return e4 instanceof c2 ? e4 : new c2(e4);
    }
    constructor(t4, s4 = {}, i4) {
      e2(this, "errors", []), e2(this, "raw", /* @__PURE__ */ new Map()), e2(this, "handleError", (e4) => {
        if (!this.options.silentErrors)
          throw e4;
        this.errors.push(e4.message);
      }), this.chunk = this.normalizeInput(t4), this.file = i4, this.type = this.constructor.type, this.globalOptions = this.options = s4, this.localOptions = s4[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
    }
    translate() {
      this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
    }
    get output() {
      return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
    }
    translateBlock(e4, t4) {
      let s4 = I2.get(t4), i4 = V.get(t4), n3 = B.get(t4), r4 = this.options[t4], a4 = r4.reviveValues && !!s4, h3 = r4.translateValues && !!i4, f4 = r4.translateKeys && !!n3, l4 = {};
      for (let [t5, r5] of e4)
        a4 && s4.has(t5) ? r5 = s4.get(t5)(r5) : h3 && i4.has(t5) && (r5 = this.translateValue(r5, i4.get(t5))), f4 && n3.has(t5) && (t5 = n3.get(t5) || t5), l4[t5] = r5;
      return l4;
    }
    translateValue(e4, t4) {
      return t4[e4] || t4.DEFAULT || e4;
    }
    assignToOutput(e4, t4) {
      this.assignObjectToOutput(e4, this.constructor.type, t4);
    }
    assignObjectToOutput(e4, t4, s4) {
      if (this.globalOptions.mergeOutput)
        return Object.assign(e4, s4);
      e4[t4] ? Object.assign(e4[t4], s4) : e4[t4] = s4;
    }
  };
  e2(J, "headerLength", 4), e2(J, "type", void 0), e2(J, "multiSegment", false), e2(J, "canHandle", () => false);
  function q2(e4) {
    return 192 === e4 || 194 === e4 || 196 === e4 || 219 === e4 || 221 === e4 || 218 === e4 || 254 === e4;
  }
  function Q(e4) {
    return e4 >= 224 && e4 <= 239;
  }
  function Z(e4, t4, s4) {
    for (let [i4, n3] of y2)
      if (n3.canHandle(e4, t4, s4))
        return i4;
  }
  var ee2 = class extends class {
    constructor(t4, s4, i4) {
      e2(this, "errors", []), e2(this, "ensureSegmentChunk", async (e4) => {
        let t5 = e4.start, s5 = e4.size || 65536;
        if (this.file.chunked)
          if (this.file.available(t5, s5))
            e4.chunk = this.file.subarray(t5, s5);
          else
            try {
              e4.chunk = await this.file.readChunk(t5, s5);
            } catch (t6) {
              l2(`Couldn't read segment: ${JSON.stringify(e4)}. ${t6.message}`);
            }
        else
          this.file.byteLength > t5 + s5 ? e4.chunk = this.file.subarray(t5, s5) : void 0 === e4.size ? e4.chunk = this.file.subarray(t5) : l2("Segment unreachable: " + JSON.stringify(e4));
        return e4.chunk;
      }), this.extendOptions && this.extendOptions(t4), this.options = t4, this.file = s4, this.parsers = i4;
    }
    injectSegment(e4, t4) {
      this.options[e4].enabled && this.createParser(e4, t4);
    }
    createParser(e4, t4) {
      let s4 = new (y2.get(e4))(t4, this.options, this.file);
      return this.parsers[e4] = s4;
    }
    createParsers(e4) {
      for (let t4 of e4) {
        let { type: e5, chunk: s4 } = t4, i4 = this.options[e5];
        if (i4 && i4.enabled) {
          let t5 = this.parsers[e5];
          t5 && t5.append || t5 || this.createParser(e5, s4);
        }
      }
    }
    async readSegments(e4) {
      let t4 = e4.map(this.ensureSegmentChunk);
      await Promise.all(t4);
    }
  } {
    constructor(...t4) {
      super(...t4), e2(this, "appSegments", []), e2(this, "jpegSegments", []), e2(this, "unknownSegments", []);
    }
    static canHandle(e4, t4) {
      return 65496 === t4;
    }
    async parse() {
      await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
    }
    setupSegmentFinderArgs(e4) {
      true === e4 ? (this.findAll = true, this.wanted = new Set(y2.keyList())) : (e4 = void 0 === e4 ? y2.keyList().filter((e5) => this.options[e5].enabled) : e4.filter((e5) => this.options[e5].enabled && y2.has(e5)), this.findAll = false, this.remaining = new Set(e4), this.wanted = new Set(e4)), this.unfinishedMultiSegment = false;
    }
    async findAppSegments(e4 = 0, t4) {
      this.setupSegmentFinderArgs(t4);
      let { file: s4, findAll: i4, wanted: n3, remaining: r4 } = this;
      if (!i4 && this.file.chunked && (i4 = Array.from(n3).some((e5) => {
        let t5 = y2.get(e5), s5 = this.options[e5];
        return t5.multiSegment && s5.multiSegment;
      }), i4 && await this.file.readWhole()), e4 = this.findAppSegmentsInRange(e4, s4.byteLength), !this.options.onlyTiff && s4.chunked) {
        let t5 = false;
        for (; r4.size > 0 && !t5 && (s4.canReadNextChunk || this.unfinishedMultiSegment); ) {
          let { nextChunkOffset: i5 } = s4, n4 = this.appSegments.some((e5) => !this.file.available(e5.offset || e5.start, e5.length || e5.size));
          if (t5 = e4 > i5 && !n4 ? !await s4.readNextChunk(e4) : !await s4.readNextChunk(i5), void 0 === (e4 = this.findAppSegmentsInRange(e4, s4.byteLength)))
            return;
        }
      }
    }
    findAppSegmentsInRange(e4, t4) {
      t4 -= 2;
      let s4, i4, n3, r4, a4, h3, { file: f4, findAll: l4, wanted: o4, remaining: u4, options: d3 } = this;
      for (; e4 < t4; e4++)
        if (255 === f4.getUint8(e4)) {
          if (s4 = f4.getUint8(e4 + 1), Q(s4)) {
            if (i4 = f4.getUint16(e4 + 2), n3 = Z(f4, e4, i4), n3 && o4.has(n3) && (r4 = y2.get(n3), a4 = r4.findPosition(f4, e4), h3 = d3[n3], a4.type = n3, this.appSegments.push(a4), !l4 && (r4.multiSegment && h3.multiSegment ? (this.unfinishedMultiSegment = a4.chunkNumber < a4.chunkCount, this.unfinishedMultiSegment || u4.delete(n3)) : u4.delete(n3), 0 === u4.size)))
              break;
            d3.recordUnknownSegments && (a4 = J.findPosition(f4, e4), a4.marker = s4, this.unknownSegments.push(a4)), e4 += i4 + 1;
          } else if (q2(s4)) {
            if (i4 = f4.getUint16(e4 + 2), 218 === s4 && false !== d3.stopAfterSos)
              return;
            d3.recordJpegSegments && this.jpegSegments.push({ offset: e4, length: i4, marker: s4 }), e4 += i4 + 1;
          }
        }
      return e4;
    }
    mergeMultiSegments() {
      if (!this.appSegments.some((e5) => e5.multiSegment))
        return;
      let e4 = function(e5, t4) {
        let s4, i4, n3, r4 = /* @__PURE__ */ new Map();
        for (let a4 = 0; a4 < e5.length; a4++)
          s4 = e5[a4], i4 = s4[t4], r4.has(i4) ? n3 = r4.get(i4) : r4.set(i4, n3 = []), n3.push(s4);
        return Array.from(r4);
      }(this.appSegments, "type");
      this.mergedAppSegments = e4.map(([e5, t4]) => {
        let s4 = y2.get(e5, this.options);
        if (s4.handleMultiSegments) {
          return { type: e5, chunk: s4.handleMultiSegments(t4) };
        }
        return t4[0];
      });
    }
    getSegment(e4) {
      return this.appSegments.find((t4) => t4.type === e4);
    }
    async getOrFindSegment(e4) {
      let t4 = this.getSegment(e4);
      return void 0 === t4 && (await this.findAppSegments(0, [e4]), t4 = this.getSegment(e4)), t4;
    }
  };
  e2(ee2, "type", "jpeg"), m2.set("jpeg", ee2);
  var te = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4];
  var se = class extends J {
    parseHeader() {
      var e4 = this.chunk.getUint16();
      18761 === e4 ? this.le = true : 19789 === e4 && (this.le = false), this.chunk.le = this.le, this.headerParsed = true;
    }
    parseTags(e4, t4, s4 = /* @__PURE__ */ new Map()) {
      let { pick: i4, skip: n3 } = this.options[t4];
      i4 = new Set(i4);
      let r4 = i4.size > 0, a4 = 0 === n3.size, h3 = this.chunk.getUint16(e4);
      e4 += 2;
      for (let f4 = 0; f4 < h3; f4++) {
        let h4 = this.chunk.getUint16(e4);
        if (r4) {
          if (i4.has(h4) && (s4.set(h4, this.parseTag(e4, h4, t4)), i4.delete(h4), 0 === i4.size))
            break;
        } else
          !a4 && n3.has(h4) || s4.set(h4, this.parseTag(e4, h4, t4));
        e4 += 12;
      }
      return s4;
    }
    parseTag(e4, t4, s4) {
      let { chunk: i4 } = this, n3 = i4.getUint16(e4 + 2), r4 = i4.getUint32(e4 + 4), a4 = te[n3];
      if (a4 * r4 <= 4 ? e4 += 8 : e4 = i4.getUint32(e4 + 8), (n3 < 1 || n3 > 13) && l2(`Invalid TIFF value type. block: ${s4.toUpperCase()}, tag: ${t4.toString(16)}, type: ${n3}, offset ${e4}`), e4 > i4.byteLength && l2(`Invalid TIFF value offset. block: ${s4.toUpperCase()}, tag: ${t4.toString(16)}, type: ${n3}, offset ${e4} is outside of chunk size ${i4.byteLength}`), 1 === n3)
        return i4.getUint8Array(e4, r4);
      if (2 === n3)
        return "" === (h3 = function(e5) {
          for (; e5.endsWith("\0"); )
            e5 = e5.slice(0, -1);
          return e5;
        }(h3 = i4.getString(e4, r4)).trim()) ? void 0 : h3;
      var h3;
      if (7 === n3)
        return i4.getUint8Array(e4, r4);
      if (1 === r4)
        return this.parseTagValue(n3, e4);
      {
        let t5 = new (function(e5) {
          switch (e5) {
            case 1:
              return Uint8Array;
            case 3:
              return Uint16Array;
            case 4:
              return Uint32Array;
            case 5:
              return Array;
            case 6:
              return Int8Array;
            case 8:
              return Int16Array;
            case 9:
              return Int32Array;
            case 10:
              return Array;
            case 11:
              return Float32Array;
            case 12:
              return Float64Array;
            default:
              return Array;
          }
        }(n3))(r4), s5 = a4;
        for (let i5 = 0; i5 < r4; i5++)
          t5[i5] = this.parseTagValue(n3, e4), e4 += s5;
        return t5;
      }
    }
    parseTagValue(e4, t4) {
      let { chunk: s4 } = this;
      switch (e4) {
        case 1:
          return s4.getUint8(t4);
        case 3:
          return s4.getUint16(t4);
        case 4:
          return s4.getUint32(t4);
        case 5:
          return s4.getUint32(t4) / s4.getUint32(t4 + 4);
        case 6:
          return s4.getInt8(t4);
        case 8:
          return s4.getInt16(t4);
        case 9:
          return s4.getInt32(t4);
        case 10:
          return s4.getInt32(t4) / s4.getInt32(t4 + 4);
        case 11:
          return s4.getFloat(t4);
        case 12:
          return s4.getDouble(t4);
        case 13:
          return s4.getUint32(t4);
        default:
          l2(`Invalid tiff type ${e4}`);
      }
    }
  };
  var ie = class extends se {
    static canHandle(e4, t4) {
      return 225 === e4.getUint8(t4 + 1) && 1165519206 === e4.getUint32(t4 + 4) && 0 === e4.getUint16(t4 + 8);
    }
    async parse() {
      this.parseHeader();
      let { options: e4 } = this;
      return e4.ifd0.enabled && await this.parseIfd0Block(), e4.exif.enabled && await this.safeParse("parseExifBlock"), e4.gps.enabled && await this.safeParse("parseGpsBlock"), e4.interop.enabled && await this.safeParse("parseInteropBlock"), e4.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
    }
    safeParse(e4) {
      let t4 = this[e4]();
      return void 0 !== t4.catch && (t4 = t4.catch(this.handleError)), t4;
    }
    findIfd0Offset() {
      void 0 === this.ifd0Offset && (this.ifd0Offset = this.chunk.getUint32(4));
    }
    findIfd1Offset() {
      if (void 0 === this.ifd1Offset) {
        this.findIfd0Offset();
        let e4 = this.chunk.getUint16(this.ifd0Offset), t4 = this.ifd0Offset + 2 + 12 * e4;
        this.ifd1Offset = this.chunk.getUint32(t4);
      }
    }
    parseBlock(e4, t4) {
      let s4 = /* @__PURE__ */ new Map();
      return this[t4] = s4, this.parseTags(e4, t4, s4), s4;
    }
    async parseIfd0Block() {
      if (this.ifd0)
        return;
      let { file: e4 } = this;
      this.findIfd0Offset(), this.ifd0Offset < 8 && l2("Malformed EXIF data"), !e4.chunked && this.ifd0Offset > e4.byteLength && l2(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e4.byteLength}`), e4.tiff && await e4.ensureChunk(this.ifd0Offset, o2(this.options));
      let t4 = this.parseBlock(this.ifd0Offset, "ifd0");
      return 0 !== t4.size ? (this.exifOffset = t4.get(34665), this.interopOffset = t4.get(40965), this.gpsOffset = t4.get(34853), this.xmp = t4.get(700), this.iptc = t4.get(33723), this.icc = t4.get(34675), this.options.sanitize && (t4.delete(34665), t4.delete(40965), t4.delete(34853), t4.delete(700), t4.delete(33723), t4.delete(34675)), t4) : void 0;
    }
    async parseExifBlock() {
      if (this.exif)
        return;
      if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.exifOffset)
        return;
      this.file.tiff && await this.file.ensureChunk(this.exifOffset, o2(this.options));
      let e4 = this.parseBlock(this.exifOffset, "exif");
      return this.interopOffset || (this.interopOffset = e4.get(40965)), this.makerNote = e4.get(37500), this.userComment = e4.get(37510), this.options.sanitize && (e4.delete(40965), e4.delete(37500), e4.delete(37510)), this.unpack(e4, 41728), this.unpack(e4, 41729), e4;
    }
    unpack(e4, t4) {
      let s4 = e4.get(t4);
      s4 && 1 === s4.length && e4.set(t4, s4[0]);
    }
    async parseGpsBlock() {
      if (this.gps)
        return;
      if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.gpsOffset)
        return;
      let e4 = this.parseBlock(this.gpsOffset, "gps");
      return e4 && e4.has(2) && e4.has(4) && (e4.set("latitude", ne(...e4.get(2), e4.get(1))), e4.set("longitude", ne(...e4.get(4), e4.get(3)))), e4;
    }
    async parseInteropBlock() {
      if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), void 0 !== this.interopOffset || this.exif || await this.parseExifBlock(), void 0 !== this.interopOffset))
        return this.parseBlock(this.interopOffset, "interop");
    }
    async parseThumbnailBlock(e4 = false) {
      if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e4))
        return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = true), this.ifd1;
    }
    async extractThumbnail() {
      if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(true), void 0 === this.ifd1)
        return;
      let e4 = this.ifd1.get(513), t4 = this.ifd1.get(514);
      return this.chunk.getUint8Array(e4, t4);
    }
    get image() {
      return this.ifd0;
    }
    get thumbnail() {
      return this.ifd1;
    }
    createOutput() {
      let e4, t4, s4, i4 = {};
      for (t4 of P2)
        if (e4 = this[t4], !f2(e4))
          if (s4 = this.canTranslate ? this.translateBlock(e4, t4) : Object.fromEntries(e4), this.options.mergeOutput) {
            if ("ifd1" === t4)
              continue;
            Object.assign(i4, s4);
          } else
            i4[t4] = s4;
      return this.makerNote && (i4.makerNote = this.makerNote), this.userComment && (i4.userComment = this.userComment), i4;
    }
    assignToOutput(e4, t4) {
      if (this.globalOptions.mergeOutput)
        Object.assign(e4, t4);
      else
        for (let [s4, i4] of Object.entries(t4))
          this.assignObjectToOutput(e4, s4, i4);
    }
  };
  function ne(e4, t4, s4, i4) {
    var n3 = e4 + t4 / 60 + s4 / 3600;
    return "S" !== i4 && "W" !== i4 || (n3 *= -1), n3;
  }
  e2(ie, "type", "tiff"), e2(ie, "headerLength", 10), y2.set("tiff", ie);
  var re = Object.freeze({ __proto__: null, default: G, Exifr: H2, fileParsers: m2, segmentParsers: y2, fileReaders: b2, tagKeys: B, tagValues: V, tagRevivers: I2, createDictionary: x2, extendDictionary: C2, fetchUrlAsArrayBuffer: S, readBlobAsArrayBuffer: A2, chunkedProps: L2, otherSegments: T2, segments: z2, tiffBlocks: P2, segmentsAndBlocks: F, tiffExtractables: j2, inheritables: E, allFormatters: M2, Options: R, parse: Y });
  var ae = { ifd0: false, ifd1: false, exif: false, gps: false, interop: false, sanitize: false, reviveValues: true, translateKeys: false, translateValues: false, mergeOutput: false };
  var he = Object.assign({}, ae, { firstChunkSize: 4e4, gps: [1, 2, 3, 4] });
  var le = Object.assign({}, ae, { tiff: false, ifd1: true, mergeOutput: false });
  var de = Object.assign({}, ae, { firstChunkSize: 4e4, ifd0: [274] });
  async function ce(e4) {
    let t4 = new H2(de);
    await t4.read(e4);
    let s4 = await t4.parse();
    if (s4 && s4.ifd0)
      return s4.ifd0[274];
  }
  var pe = Object.freeze({ 1: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 0, rad: 0 }, 2: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 0, rad: 0 }, 3: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 4: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 5: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 90, rad: 90 * Math.PI / 180 }, 6: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 90, rad: 90 * Math.PI / 180 }, 7: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 270, rad: 270 * Math.PI / 180 }, 8: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 270, rad: 270 * Math.PI / 180 } });
  var ge = true;
  var me = true;
  if ("object" == typeof navigator) {
    let e4 = navigator.userAgent;
    if (e4.includes("iPad") || e4.includes("iPhone")) {
      let t4 = e4.match(/OS (\d+)_(\d+)/);
      if (t4) {
        let [, e5, s4] = t4, i4 = Number(e5) + 0.1 * Number(s4);
        ge = i4 < 13.4, me = false;
      }
    } else if (e4.includes("OS X 10")) {
      let [, t4] = e4.match(/OS X 10[_.](\d+)/);
      ge = me = Number(t4) < 15;
    }
    if (e4.includes("Chrome/")) {
      let [, t4] = e4.match(/Chrome\/(\d+)/);
      ge = me = Number(t4) < 81;
    } else if (e4.includes("Firefox/")) {
      let [, t4] = e4.match(/Firefox\/(\d+)/);
      ge = me = Number(t4) < 77;
    }
  }
  async function ye(e4) {
    let t4 = await ce(e4);
    return Object.assign({ canvas: ge, css: me }, pe[t4]);
  }
  var be = class extends c2 {
    constructor(...t4) {
      super(...t4), e2(this, "ranges", new we()), 0 !== this.byteLength && this.ranges.add(0, this.byteLength);
    }
    _tryExtend(e4, t4, s4) {
      if (0 === e4 && 0 === this.byteLength && s4) {
        let e5 = new DataView(s4.buffer || s4, s4.byteOffset, s4.byteLength);
        this._swapDataView(e5);
      } else {
        let s5 = e4 + t4;
        if (s5 > this.byteLength) {
          let { dataView: e5 } = this._extend(s5);
          this._swapDataView(e5);
        }
      }
    }
    _extend(e4) {
      let t4;
      t4 = a2 ? r2.allocUnsafe(e4) : new Uint8Array(e4);
      let s4 = new DataView(t4.buffer, t4.byteOffset, t4.byteLength);
      return t4.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), { uintView: t4, dataView: s4 };
    }
    subarray(e4, t4, s4 = false) {
      return t4 = t4 || this._lengthToEnd(e4), s4 && this._tryExtend(e4, t4), this.ranges.add(e4, t4), super.subarray(e4, t4);
    }
    set(e4, t4, s4 = false) {
      s4 && this._tryExtend(t4, e4.byteLength, e4);
      let i4 = super.set(e4, t4);
      return this.ranges.add(t4, i4.byteLength), i4;
    }
    async ensureChunk(e4, t4) {
      this.chunked && (this.ranges.available(e4, t4) || await this.readChunk(e4, t4));
    }
    available(e4, t4) {
      return this.ranges.available(e4, t4);
    }
  };
  var we = class {
    constructor() {
      e2(this, "list", []);
    }
    get length() {
      return this.list.length;
    }
    add(e4, t4, s4 = 0) {
      let i4 = e4 + t4, n3 = this.list.filter((t5) => ke(e4, t5.offset, i4) || ke(e4, t5.end, i4));
      if (n3.length > 0) {
        e4 = Math.min(e4, ...n3.map((e5) => e5.offset)), i4 = Math.max(i4, ...n3.map((e5) => e5.end)), t4 = i4 - e4;
        let s5 = n3.shift();
        s5.offset = e4, s5.length = t4, s5.end = i4, this.list = this.list.filter((e5) => !n3.includes(e5));
      } else
        this.list.push({ offset: e4, length: t4, end: i4 });
    }
    available(e4, t4) {
      let s4 = e4 + t4;
      return this.list.some((t5) => t5.offset <= e4 && s4 <= t5.end);
    }
  };
  function ke(e4, t4, s4) {
    return e4 <= t4 && t4 <= s4;
  }
  var Oe = class extends be {
    constructor(t4, s4) {
      super(0), e2(this, "chunksRead", 0), this.input = t4, this.options = s4;
    }
    async readWhole() {
      this.chunked = false, await this.readChunk(this.nextChunkOffset);
    }
    async readChunked() {
      this.chunked = true, await this.readChunk(0, this.options.firstChunkSize);
    }
    async readNextChunk(e4 = this.nextChunkOffset) {
      if (this.fullyRead)
        return this.chunksRead++, false;
      let t4 = this.options.chunkSize, s4 = await this.readChunk(e4, t4);
      return !!s4 && s4.byteLength === t4;
    }
    async readChunk(e4, t4) {
      if (this.chunksRead++, 0 !== (t4 = this.safeWrapAddress(e4, t4)))
        return this._readChunk(e4, t4);
    }
    safeWrapAddress(e4, t4) {
      return void 0 !== this.size && e4 + t4 > this.size ? Math.max(0, this.size - e4) : t4;
    }
    get nextChunkOffset() {
      if (0 !== this.ranges.list.length)
        return this.ranges.list[0].length;
    }
    get canReadNextChunk() {
      return this.chunksRead < this.options.chunkLimit;
    }
    get fullyRead() {
      return void 0 !== this.size && this.nextChunkOffset === this.size;
    }
    read() {
      return this.options.chunked ? this.readChunked() : this.readWhole();
    }
    close() {
    }
  };
  b2.set("blob", class extends Oe {
    async readWhole() {
      this.chunked = false;
      let e4 = await A2(this.input);
      this._swapArrayBuffer(e4);
    }
    readChunked() {
      return this.chunked = true, this.size = this.input.size, super.readChunked();
    }
    async _readChunk(e4, t4) {
      let s4 = t4 ? e4 + t4 : void 0, i4 = this.input.slice(e4, s4), n3 = await A2(i4);
      return this.set(n3, e4, true);
    }
  });

  // ../packages/@uppy/thumbnail-generator/lib/locale.js
  var locale_default3 = {
    strings: {
      generatingThumbnails: "Generating thumbnails..."
    }
  };

  // ../packages/@uppy/thumbnail-generator/lib/index.js
  var packageJson5 = {
    "version": "3.0.2"
  };
  function canvasToBlob(canvas, type, quality) {
    try {
      canvas.getContext("2d").getImageData(0, 0, 1, 1);
    } catch (err) {
      if (err.code === 18) {
        return Promise.reject(new Error("cannot read image, probably an svg with external resources"));
      }
    }
    if (canvas.toBlob) {
      return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality);
      }).then((blob) => {
        if (blob === null) {
          throw new Error("cannot read image, probably an svg with external resources");
        }
        return blob;
      });
    }
    return Promise.resolve().then(() => {
      return dataURItoBlob(canvas.toDataURL(type, quality), {});
    }).then((blob) => {
      if (blob === null) {
        throw new Error("could not extract blob, probably an old browser");
      }
      return blob;
    });
  }
  function rotateImage(image, translate) {
    let w4 = image.width;
    let h3 = image.height;
    if (translate.deg === 90 || translate.deg === 270) {
      w4 = image.height;
      h3 = image.width;
    }
    const canvas = document.createElement("canvas");
    canvas.width = w4;
    canvas.height = h3;
    const context = canvas.getContext("2d");
    context.translate(w4 / 2, h3 / 2);
    if (translate.canvas) {
      context.rotate(translate.rad);
      context.scale(translate.scaleX, translate.scaleY);
    }
    context.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
    return canvas;
  }
  function protect(image) {
    const ratio = image.width / image.height;
    const maxSquare = 5e6;
    const maxSize = 4096;
    let maxW = Math.floor(Math.sqrt(maxSquare * ratio));
    let maxH = Math.floor(maxSquare / Math.sqrt(maxSquare * ratio));
    if (maxW > maxSize) {
      maxW = maxSize;
      maxH = Math.round(maxW / ratio);
    }
    if (maxH > maxSize) {
      maxH = maxSize;
      maxW = Math.round(ratio * maxH);
    }
    if (image.width > maxW) {
      const canvas = document.createElement("canvas");
      canvas.width = maxW;
      canvas.height = maxH;
      canvas.getContext("2d").drawImage(image, 0, 0, maxW, maxH);
      return canvas;
    }
    return image;
  }
  var ThumbnailGenerator = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.onFileAdded = (file) => {
        if (!file.preview && file.data && isPreviewSupported(file.type) && !file.isRemote) {
          this.addToQueue(file.id);
        }
      };
      this.onCancelRequest = (file) => {
        const index = this.queue.indexOf(file.id);
        if (index !== -1) {
          this.queue.splice(index, 1);
        }
      };
      this.onFileRemoved = (file) => {
        const index = this.queue.indexOf(file.id);
        if (index !== -1) {
          this.queue.splice(index, 1);
        }
        if (file.preview && isObjectURL(file.preview)) {
          URL.revokeObjectURL(file.preview);
        }
      };
      this.onRestored = () => {
        const restoredFiles = this.uppy.getFiles().filter((file) => file.isRestored);
        restoredFiles.forEach((file) => {
          if (!file.preview || isObjectURL(file.preview)) {
            this.addToQueue(file.id);
          }
        });
      };
      this.onAllFilesRemoved = () => {
        this.queue = [];
      };
      this.waitUntilAllProcessed = (fileIDs) => {
        fileIDs.forEach((fileID) => {
          const file = this.uppy.getFile(fileID);
          this.uppy.emit("preprocess-progress", file, {
            mode: "indeterminate",
            message: this.i18n("generatingThumbnails")
          });
        });
        const emitPreprocessCompleteForAll = () => {
          fileIDs.forEach((fileID) => {
            const file = this.uppy.getFile(fileID);
            this.uppy.emit("preprocess-complete", file);
          });
        };
        return new Promise((resolve) => {
          if (this.queueProcessing) {
            this.uppy.once("thumbnail:all-generated", () => {
              emitPreprocessCompleteForAll();
              resolve();
            });
          } else {
            emitPreprocessCompleteForAll();
            resolve();
          }
        });
      };
      this.type = "modifier";
      this.id = this.opts.id || "ThumbnailGenerator";
      this.title = "Thumbnail Generator";
      this.queue = [];
      this.queueProcessing = false;
      this.defaultThumbnailDimension = 200;
      this.thumbnailType = this.opts.thumbnailType || "image/jpeg";
      this.defaultLocale = locale_default3;
      const defaultOptions4 = {
        thumbnailWidth: null,
        thumbnailHeight: null,
        waitForThumbnailsBeforeUpload: false,
        lazy: false
      };
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      this.i18nInit();
      if (this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload) {
        throw new Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
      }
    }
    createThumbnail(file, targetWidth, targetHeight) {
      const originalUrl = URL.createObjectURL(file.data);
      const onload = new Promise((resolve, reject) => {
        const image = new Image();
        image.src = originalUrl;
        image.addEventListener("load", () => {
          URL.revokeObjectURL(originalUrl);
          resolve(image);
        });
        image.addEventListener("error", (event) => {
          URL.revokeObjectURL(originalUrl);
          reject(event.error || new Error("Could not create thumbnail"));
        });
      });
      const orientationPromise = ye(file.data).catch(() => 1);
      return Promise.all([onload, orientationPromise]).then((_ref) => {
        let [image, orientation] = _ref;
        const dimensions = this.getProportionalDimensions(image, targetWidth, targetHeight, orientation.deg);
        const rotatedImage = rotateImage(image, orientation);
        const resizedImage = this.resizeImage(rotatedImage, dimensions.width, dimensions.height);
        return canvasToBlob(resizedImage, this.thumbnailType, 80);
      }).then((blob) => {
        return URL.createObjectURL(blob);
      });
    }
    getProportionalDimensions(img, width, height, rotation) {
      let aspect = img.width / img.height;
      if (rotation === 90 || rotation === 270) {
        aspect = img.height / img.width;
      }
      if (width != null) {
        return {
          width,
          height: Math.round(width / aspect)
        };
      }
      if (height != null) {
        return {
          width: Math.round(height * aspect),
          height
        };
      }
      return {
        width: this.defaultThumbnailDimension,
        height: Math.round(this.defaultThumbnailDimension / aspect)
      };
    }
    resizeImage(image, targetWidth, targetHeight) {
      let img = protect(image);
      let steps = Math.ceil(Math.log2(img.width / targetWidth));
      if (steps < 1) {
        steps = 1;
      }
      let sW = targetWidth * 2 ** (steps - 1);
      let sH = targetHeight * 2 ** (steps - 1);
      const x3 = 2;
      while (steps--) {
        const canvas = document.createElement("canvas");
        canvas.width = sW;
        canvas.height = sH;
        canvas.getContext("2d").drawImage(img, 0, 0, sW, sH);
        img = canvas;
        sW = Math.round(sW / x3);
        sH = Math.round(sH / x3);
      }
      return img;
    }
    setPreviewURL(fileID, preview) {
      this.uppy.setFileState(fileID, {
        preview
      });
    }
    addToQueue(item) {
      this.queue.push(item);
      if (this.queueProcessing === false) {
        this.processQueue();
      }
    }
    processQueue() {
      this.queueProcessing = true;
      if (this.queue.length > 0) {
        const current = this.uppy.getFile(this.queue.shift());
        if (!current) {
          this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error");
          return Promise.resolve();
        }
        return this.requestThumbnail(current).catch(() => {
        }).then(() => this.processQueue());
      }
      this.queueProcessing = false;
      this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue");
      this.uppy.emit("thumbnail:all-generated");
      return Promise.resolve();
    }
    requestThumbnail(file) {
      if (isPreviewSupported(file.type) && !file.isRemote) {
        return this.createThumbnail(file, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((preview) => {
          this.setPreviewURL(file.id, preview);
          this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${file.id}`);
          this.uppy.emit("thumbnail:generated", this.uppy.getFile(file.id), preview);
        }).catch((err) => {
          this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${file.id}:`, "warning");
          this.uppy.log(err, "warning");
          this.uppy.emit("thumbnail:error", this.uppy.getFile(file.id), err);
        });
      }
      return Promise.resolve();
    }
    install() {
      this.uppy.on("file-removed", this.onFileRemoved);
      this.uppy.on("cancel-all", this.onAllFilesRemoved);
      if (this.opts.lazy) {
        this.uppy.on("thumbnail:request", this.onFileAdded);
        this.uppy.on("thumbnail:cancel", this.onCancelRequest);
      } else {
        this.uppy.on("file-added", this.onFileAdded);
        this.uppy.on("restored", this.onRestored);
      }
      if (this.opts.waitForThumbnailsBeforeUpload) {
        this.uppy.addPreProcessor(this.waitUntilAllProcessed);
      }
    }
    uninstall() {
      this.uppy.off("file-removed", this.onFileRemoved);
      this.uppy.off("cancel-all", this.onAllFilesRemoved);
      if (this.opts.lazy) {
        this.uppy.off("thumbnail:request", this.onFileAdded);
        this.uppy.off("thumbnail:cancel", this.onCancelRequest);
      } else {
        this.uppy.off("file-added", this.onFileAdded);
        this.uppy.off("restored", this.onRestored);
      }
      if (this.opts.waitForThumbnailsBeforeUpload) {
        this.uppy.removePreProcessor(this.waitUntilAllProcessed);
      }
    }
  };
  ThumbnailGenerator.VERSION = packageJson5.version;

  // ../packages/@uppy/utils/lib/findAllDOMElements.js
  function findAllDOMElements(element) {
    if (typeof element === "string") {
      const elements = document.querySelectorAll(element);
      return elements.length === 0 ? null : Array.from(elements);
    }
    if (typeof element === "object" && isDOMElement(element)) {
      return [element];
    }
    return null;
  }

  // ../packages/@uppy/utils/lib/toArray.js
  var toArray_default = Array.from;

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js
  function getFilesAndDirectoriesFromDirectory(directoryReader, oldEntries, logDropError, _ref) {
    let {
      onSuccess
    } = _ref;
    directoryReader.readEntries(
      (entries) => {
        const newEntries = [...oldEntries, ...entries];
        if (entries.length) {
          queueMicrotask(() => {
            getFilesAndDirectoriesFromDirectory(directoryReader, newEntries, logDropError, {
              onSuccess
            });
          });
        } else {
          onSuccess(newEntries);
        }
      },
      (error) => {
        logDropError(error);
        onSuccess(oldEntries);
      }
    );
  }

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/index.js
  function getAsFileSystemHandleFromEntry(entry, logDropError) {
    if (entry == null)
      return entry;
    return {
      kind: entry.isFile ? "file" : entry.isDirectory ? "directory" : void 0,
      name: entry.name,
      getFile() {
        return new Promise((resolve, reject) => entry.file(resolve, reject));
      },
      async *values() {
        const directoryReader = entry.createReader();
        const entries = await new Promise((resolve) => {
          getFilesAndDirectoriesFromDirectory(directoryReader, [], logDropError, {
            onSuccess: (dirEntries) => resolve(dirEntries.map((file) => getAsFileSystemHandleFromEntry(file, logDropError)))
          });
        });
        yield* entries;
      }
    };
  }
  async function* createPromiseToAddFileOrParseDirectory(entry, relativePath, lastResortFile) {
    if (lastResortFile === void 0) {
      lastResortFile = void 0;
    }
    if (entry.kind === "file") {
      const file = await entry.getFile();
      if (file !== null) {
        file.relativePath = relativePath ? `${relativePath}/${entry.name}` : null;
        yield file;
      } else if (lastResortFile != null)
        yield lastResortFile;
    } else if (entry.kind === "directory") {
      for await (const handle of entry.values()) {
        yield* createPromiseToAddFileOrParseDirectory(handle, `${relativePath}/${entry.name}`);
      }
    } else if (lastResortFile != null)
      yield lastResortFile;
  }
  async function* getFilesFromDataTransfer(dataTransfer, logDropError) {
    const entries = await Promise.all(Array.from(dataTransfer.items, async (item) => {
      var _entry;
      const lastResortFile = item.getAsFile();
      let entry;
      if (window.isSecureContext && item.getAsFileSystemHandle != null)
        entry = await item.getAsFileSystemHandle();
      (_entry = entry) != null ? _entry : entry = getAsFileSystemHandleFromEntry(item.webkitGetAsEntry(), logDropError);
      return {
        lastResortFile,
        entry
      };
    }));
    for (const {
      lastResortFile,
      entry
    } of entries) {
      if (entry != null) {
        try {
          yield* createPromiseToAddFileOrParseDirectory(entry, "", lastResortFile);
        } catch (err) {
          if (lastResortFile != null) {
            yield lastResortFile;
          } else {
            logDropError(err);
          }
        }
      } else if (lastResortFile != null)
        yield lastResortFile;
    }
  }

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/fallbackApi.js
  function fallbackApi(dataTransfer) {
    const files = toArray_default(dataTransfer.files);
    return Promise.resolve(files);
  }

  // ../packages/@uppy/utils/lib/getDroppedFiles/index.js
  async function getDroppedFiles(dataTransfer, _temp) {
    let {
      logDropError = () => {
      }
    } = _temp === void 0 ? {} : _temp;
    try {
      const accumulator = [];
      for await (const file of getFilesFromDataTransfer(dataTransfer, logDropError)) {
        accumulator.push(file);
      }
      return accumulator;
    } catch {
      return fallbackApi(dataTransfer);
    }
  }

  // ../node_modules/memoize-one/dist/memoize-one.esm.js
  var safeIsNaN = Number.isNaN || function ponyfill(value) {
    return typeof value === "number" && value !== value;
  };
  function isEqual(first, second) {
    if (first === second) {
      return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
      return true;
    }
    return false;
  }
  function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
      return false;
    }
    for (var i4 = 0; i4 < newInputs.length; i4++) {
      if (!isEqual(newInputs[i4], lastInputs[i4])) {
        return false;
      }
    }
    return true;
  }
  function memoizeOne(resultFn, isEqual2) {
    if (isEqual2 === void 0) {
      isEqual2 = areInputsEqual;
    }
    var cache = null;
    function memoized() {
      var newArgs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        newArgs[_i] = arguments[_i];
      }
      if (cache && cache.lastThis === this && isEqual2(newArgs, cache.lastArgs)) {
        return cache.lastResult;
      }
      var lastResult = resultFn.apply(this, newArgs);
      cache = {
        lastResult,
        lastArgs: newArgs,
        lastThis: this
      };
      return lastResult;
    }
    memoized.clear = function clear() {
      cache = null;
    };
    return memoized;
  }

  // ../packages/@uppy/utils/lib/FOCUSABLE_ELEMENTS.js
  var FOCUSABLE_ELEMENTS_default = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', "input:not([disabled]):not([inert]):not([aria-hidden])", "select:not([disabled]):not([inert]):not([aria-hidden])", "textarea:not([disabled]):not([inert]):not([aria-hidden])", "button:not([disabled]):not([inert]):not([aria-hidden])", 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];

  // ../packages/@uppy/dashboard/lib/utils/getActiveOverlayEl.js
  function getActiveOverlayEl(dashboardEl, activeOverlayType) {
    if (activeOverlayType) {
      const overlayEl = dashboardEl.querySelector(`[data-uppy-paneltype="${activeOverlayType}"]`);
      if (overlayEl)
        return overlayEl;
    }
    return dashboardEl;
  }

  // ../packages/@uppy/dashboard/lib/utils/trapFocus.js
  function focusOnFirstNode(event, nodes) {
    const node = nodes[0];
    if (node) {
      node.focus();
      event.preventDefault();
    }
  }
  function focusOnLastNode(event, nodes) {
    const node = nodes[nodes.length - 1];
    if (node) {
      node.focus();
      event.preventDefault();
    }
  }
  function isFocusInOverlay(activeOverlayEl) {
    return activeOverlayEl.contains(document.activeElement);
  }
  function trapFocus(event, activeOverlayType, dashboardEl) {
    const activeOverlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
    const focusableNodes = toArray_default(activeOverlayEl.querySelectorAll(FOCUSABLE_ELEMENTS_default));
    const focusedItemIndex = focusableNodes.indexOf(document.activeElement);
    if (!isFocusInOverlay(activeOverlayEl)) {
      focusOnFirstNode(event, focusableNodes);
    } else if (event.shiftKey && focusedItemIndex === 0) {
      focusOnLastNode(event, focusableNodes);
    } else if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
      focusOnFirstNode(event, focusableNodes);
    }
  }
  function forInline(event, activeOverlayType, dashboardEl) {
    if (activeOverlayType === null) {
    } else {
      trapFocus(event, activeOverlayType, dashboardEl);
    }
  }

  // ../packages/@uppy/dashboard/lib/utils/createSuperFocus.js
  var import_lodash3 = __toESM(require_lodash2(), 1);
  function createSuperFocus() {
    let lastFocusWasOnSuperFocusableEl = false;
    const superFocus = (dashboardEl, activeOverlayType) => {
      const overlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
      const isFocusInOverlay2 = overlayEl.contains(document.activeElement);
      if (isFocusInOverlay2 && lastFocusWasOnSuperFocusableEl)
        return;
      const superFocusableEl = overlayEl.querySelector("[data-uppy-super-focusable]");
      if (isFocusInOverlay2 && !superFocusableEl)
        return;
      if (superFocusableEl) {
        superFocusableEl.focus({
          preventScroll: true
        });
        lastFocusWasOnSuperFocusableEl = true;
      } else {
        const firstEl = overlayEl.querySelector(FOCUSABLE_ELEMENTS_default);
        firstEl == null ? void 0 : firstEl.focus({
          preventScroll: true
        });
        lastFocusWasOnSuperFocusableEl = false;
      }
    };
    return (0, import_lodash3.default)(superFocus, 260);
  }

  // ../packages/@uppy/dashboard/lib/components/Dashboard.js
  var import_classnames9 = __toESM(require_classnames(), 1);

  // ../packages/@uppy/utils/lib/isDragDropSupported.js
  function isDragDropSupported() {
    const div = document.body;
    if (!("draggable" in div) || !("ondragstart" in div && "ondrop" in div)) {
      return false;
    }
    if (!("FormData" in window)) {
      return false;
    }
    if (!("FileReader" in window)) {
      return false;
    }
    return true;
  }

  // ../packages/@uppy/dashboard/lib/components/FileItem/index.js
  var import_classnames3 = __toESM(require_classnames(), 1);
  var import_is_shallow_equal = __toESM(require_is_shallow_equal(), 1);

  // ../packages/@uppy/dashboard/lib/utils/getFileTypeIcon.js
  function iconImage() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("g", {
      fill: "#686DE0",
      fillRule: "evenodd"
    }, h("path", {
      d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
      fillRule: "nonzero"
    }), h("path", {
      d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
      fillRule: "nonzero"
    }), h("circle", {
      cx: "7.5",
      cy: "9.5",
      r: "1.5"
    })));
  }
  function iconAudio() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("path", {
      d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
      fill: "#049BCF",
      fillRule: "nonzero"
    }));
  }
  function iconVideo() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("path", {
      d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
      fill: "#19AF67",
      fillRule: "nonzero"
    }));
  }
  function iconPDF() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("path", {
      d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
      fill: "#E2514A",
      fillRule: "nonzero"
    }));
  }
  function iconArchive() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("path", {
      d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
      fill: "#00C469",
      fillRule: "nonzero"
    }));
  }
  function iconFile() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("g", {
      fill: "#A7AFB7",
      fillRule: "nonzero"
    }, h("path", {
      d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
    }), h("path", {
      d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
    })));
  }
  function iconText() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "25",
      height: "25",
      viewBox: "0 0 25 25"
    }, h("path", {
      d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
      fill: "#5A5E69",
      fillRule: "nonzero"
    }));
  }
  function getIconByMime(fileType) {
    const defaultChoice = {
      color: "#838999",
      icon: iconFile()
    };
    if (!fileType)
      return defaultChoice;
    const fileTypeGeneral = fileType.split("/")[0];
    const fileTypeSpecific = fileType.split("/")[1];
    if (fileTypeGeneral === "text") {
      return {
        color: "#5a5e69",
        icon: iconText()
      };
    }
    if (fileTypeGeneral === "image") {
      return {
        color: "#686de0",
        icon: iconImage()
      };
    }
    if (fileTypeGeneral === "audio") {
      return {
        color: "#068dbb",
        icon: iconAudio()
      };
    }
    if (fileTypeGeneral === "video") {
      return {
        color: "#19af67",
        icon: iconVideo()
      };
    }
    if (fileTypeGeneral === "application" && fileTypeSpecific === "pdf") {
      return {
        color: "#e25149",
        icon: iconPDF()
      };
    }
    const archiveTypes = ["zip", "x-7z-compressed", "x-rar-compressed", "x-tar", "x-gzip", "x-apple-diskimage"];
    if (fileTypeGeneral === "application" && archiveTypes.indexOf(fileTypeSpecific) !== -1) {
      return {
        color: "#00C469",
        icon: iconArchive()
      };
    }
    return defaultChoice;
  }

  // ../packages/@uppy/dashboard/lib/components/FilePreview.js
  function FilePreview(props) {
    const {
      file
    } = props;
    if (file.preview) {
      return h("img", {
        className: "uppy-Dashboard-Item-previewImg",
        alt: file.name,
        src: file.preview
      });
    }
    const {
      color,
      icon
    } = getIconByMime(file.type);
    return h("div", {
      className: "uppy-Dashboard-Item-previewIconWrap"
    }, h("span", {
      className: "uppy-Dashboard-Item-previewIcon",
      style: {
        color
      }
    }, icon), h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-Dashboard-Item-previewIconBg",
      width: "58",
      height: "76",
      viewBox: "0 0 58 76"
    }, h("rect", {
      fill: "#FFF",
      width: "58",
      height: "76",
      rx: "3",
      fillRule: "evenodd"
    })));
  }

  // ../packages/@uppy/dashboard/lib/components/FileItem/MetaErrorMessage.js
  var metaFieldIdToName = (metaFieldId, metaFields) => {
    const fields = typeof metaFields === "function" ? metaFields() : metaFields;
    const field = fields.filter((f4) => f4.id === metaFieldId);
    return field[0].name;
  };
  function renderMissingMetaFieldsError(props) {
    const {
      file,
      toggleFileCard,
      i18n,
      metaFields
    } = props;
    const {
      missingRequiredMetaFields
    } = file;
    if (!(missingRequiredMetaFields != null && missingRequiredMetaFields.length)) {
      return null;
    }
    const metaFieldsString = missingRequiredMetaFields.map((missingMetaField) => metaFieldIdToName(missingMetaField, metaFields)).join(", ");
    return h("div", {
      className: "uppy-Dashboard-Item-errorMessage"
    }, i18n("missingRequiredMetaFields", {
      smart_count: missingRequiredMetaFields.length,
      fields: metaFieldsString
    }), " ", h("button", {
      type: "button",
      class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
      onClick: () => toggleFileCard(true, file.id)
    }, i18n("editFile")));
  }

  // ../packages/@uppy/dashboard/lib/components/FileItem/FilePreviewAndLink/index.js
  function FilePreviewAndLink(props) {
    return h("div", {
      className: "uppy-Dashboard-Item-previewInnerWrap",
      style: {
        backgroundColor: getIconByMime(props.file.type).color
      }
    }, props.showLinkToFileUploadResult && props.file.uploadURL && h("a", {
      className: "uppy-Dashboard-Item-previewLink",
      href: props.file.uploadURL,
      rel: "noreferrer noopener",
      target: "_blank",
      "aria-label": props.file.meta.name
    }, h("span", {
      hidden: true
    }, props.file.meta.name)), h(FilePreview, {
      file: props.file
    }), h(renderMissingMetaFieldsError, {
      file: props.file,
      i18n: props.i18n,
      toggleFileCard: props.toggleFileCard,
      metaFields: props.metaFields
    }));
  }

  // ../packages/@uppy/dashboard/lib/components/FileItem/FileProgress/index.js
  function onPauseResumeCancelRetry(props) {
    if (props.isUploaded)
      return;
    if (props.error && !props.hideRetryButton) {
      props.uppy.retryUpload(props.file.id);
      return;
    }
    if (props.resumableUploads && !props.hidePauseResumeButton) {
      props.uppy.pauseResume(props.file.id);
    } else if (props.individualCancellation && !props.hideCancelButton) {
      props.uppy.removeFile(props.file.id);
    }
  }
  function progressIndicatorTitle(props) {
    if (props.isUploaded) {
      return props.i18n("uploadComplete");
    }
    if (props.error) {
      return props.i18n("retryUpload");
    }
    if (props.resumableUploads) {
      if (props.file.isPaused) {
        return props.i18n("resumeUpload");
      }
      return props.i18n("pauseUpload");
    }
    if (props.individualCancellation) {
      return props.i18n("cancelUpload");
    }
    return "";
  }
  function ProgressIndicatorButton(props) {
    return h("div", {
      className: "uppy-Dashboard-Item-progress"
    }, h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-progressIndicator",
      type: "button",
      "aria-label": progressIndicatorTitle(props),
      title: progressIndicatorTitle(props),
      onClick: () => onPauseResumeCancelRetry(props)
    }, props.children));
  }
  function ProgressCircleContainer(_ref) {
    let {
      children
    } = _ref;
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "70",
      height: "70",
      viewBox: "0 0 36 36",
      className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle"
    }, children);
  }
  function ProgressCircle(_ref2) {
    let {
      progress
    } = _ref2;
    const circleLength = 2 * Math.PI * 15;
    return h("g", null, h("circle", {
      className: "uppy-Dashboard-Item-progressIcon--bg",
      r: "15",
      cx: "18",
      cy: "18",
      "stroke-width": "2",
      fill: "none"
    }), h("circle", {
      className: "uppy-Dashboard-Item-progressIcon--progress",
      r: "15",
      cx: "18",
      cy: "18",
      transform: "rotate(-90, 18, 18)",
      fill: "none",
      "stroke-width": "2",
      "stroke-dasharray": circleLength,
      "stroke-dashoffset": circleLength - circleLength / 100 * progress
    }));
  }
  function FileProgress(props) {
    if (!props.file.progress.uploadStarted) {
      return null;
    }
    if (props.isUploaded) {
      return h("div", {
        className: "uppy-Dashboard-Item-progress"
      }, h("div", {
        className: "uppy-Dashboard-Item-progressIndicator"
      }, h(ProgressCircleContainer, null, h("circle", {
        r: "15",
        cx: "18",
        cy: "18",
        fill: "#1bb240"
      }), h("polygon", {
        className: "uppy-Dashboard-Item-progressIcon--check",
        transform: "translate(2, 3)",
        points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
      }))));
    }
    if (props.recoveredState) {
      return void 0;
    }
    if (props.error && !props.hideRetryButton) {
      return h(ProgressIndicatorButton, props, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
        width: "28",
        height: "31",
        viewBox: "0 0 16 19"
      }, h("path", {
        d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
      }), h("path", {
        d: "M7.9 3H10v2H7.9z"
      }), h("path", {
        d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
      }), h("path", {
        d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
      })));
    }
    if (props.resumableUploads && !props.hidePauseResumeButton) {
      return h(ProgressIndicatorButton, props, h(ProgressCircleContainer, null, h(ProgressCircle, {
        progress: props.file.progress.percentage
      }), props.file.isPaused ? h("polygon", {
        className: "uppy-Dashboard-Item-progressIcon--play",
        transform: "translate(3, 3)",
        points: "12 20 12 10 20 15"
      }) : h("g", {
        className: "uppy-Dashboard-Item-progressIcon--pause",
        transform: "translate(14.5, 13)"
      }, h("rect", {
        x: "0",
        y: "0",
        width: "2",
        height: "10",
        rx: "0"
      }), h("rect", {
        x: "5",
        y: "0",
        width: "2",
        height: "10",
        rx: "0"
      }))));
    }
    if (!props.resumableUploads && props.individualCancellation && !props.hideCancelButton) {
      return h(ProgressIndicatorButton, props, h(ProgressCircleContainer, null, h(ProgressCircle, {
        progress: props.file.progress.percentage
      }), h("polygon", {
        className: "cancel",
        transform: "translate(2, 2)",
        points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
      })));
    }
    return h("div", {
      className: "uppy-Dashboard-Item-progress"
    }, h("div", {
      className: "uppy-Dashboard-Item-progressIndicator"
    }, h(ProgressCircleContainer, null, h(ProgressCircle, {
      progress: props.file.progress.percentage
    }))));
  }

  // ../packages/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js
  var import_prettier_bytes3 = __toESM(require_prettierBytes2(), 1);

  // ../packages/@uppy/utils/lib/truncateString.js
  var separator = "...";
  function truncateString(string, maxLength) {
    if (maxLength === 0)
      return "";
    if (string.length <= maxLength)
      return string;
    if (maxLength <= separator.length + 1)
      return `${string.slice(0, maxLength - 1)}\u2026`;
    const charsToShow = maxLength - separator.length;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return string.slice(0, frontChars) + separator + string.slice(-backChars);
  }

  // ../packages/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js
  var renderFileName = (props) => {
    const {
      author,
      name
    } = props.file.meta;
    function getMaxNameLength() {
      if (props.singleFile) {
        return 200;
      }
      if (props.containerWidth <= 352) {
        return 35;
      }
      if (props.containerWidth <= 576) {
        return 60;
      }
      return author ? 20 : 30;
    }
    return h("div", {
      className: "uppy-Dashboard-Item-name",
      title: name
    }, truncateString(name, getMaxNameLength()));
  };
  var renderAuthor = (props) => {
    const {
      author
    } = props.file.meta;
    const {
      providerName
    } = props.file.remote;
    const dot = `\xB7`;
    if (!author) {
      return null;
    }
    return h("div", {
      className: "uppy-Dashboard-Item-author"
    }, h("a", {
      href: `${author.url}?utm_source=Companion&utm_medium=referral`,
      target: "_blank",
      rel: "noopener noreferrer"
    }, truncateString(author.name, 13)), providerName ? h(p, null, ` ${dot} `, providerName, ` ${dot} `) : null);
  };
  var renderFileSize = (props) => props.file.size && h("div", {
    className: "uppy-Dashboard-Item-statusSize"
  }, (0, import_prettier_bytes3.default)(props.file.size));
  var ReSelectButton = (props) => props.file.isGhost && h("span", null, " \u2022 ", h("button", {
    className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
    type: "button",
    onClick: props.toggleAddFilesPanel
  }, props.i18n("reSelect")));
  var ErrorButton = (_ref) => {
    let {
      file,
      onClick
    } = _ref;
    if (file.error) {
      return h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-errorDetails",
        "aria-label": file.error,
        "data-microtip-position": "bottom",
        "data-microtip-size": "medium",
        onClick,
        type: "button"
      }, "?");
    }
    return null;
  };
  function FileInfo(props) {
    const {
      file
    } = props;
    return h("div", {
      className: "uppy-Dashboard-Item-fileInfo",
      "data-uppy-file-source": file.source
    }, h("div", {
      className: "uppy-Dashboard-Item-fileName"
    }, renderFileName(props), h(ErrorButton, {
      file: props.file,
      onClick: () => alert(props.file.error)
    })), h("div", {
      className: "uppy-Dashboard-Item-status"
    }, renderAuthor(props), renderFileSize(props), ReSelectButton(props)), h(renderMissingMetaFieldsError, {
      file: props.file,
      i18n: props.i18n,
      toggleFileCard: props.toggleFileCard,
      metaFields: props.metaFields
    }));
  }

  // ../packages/@uppy/dashboard/lib/utils/copyToClipboard.js
  function copyToClipboard(textToCopy, fallbackString) {
    if (fallbackString === void 0) {
      fallbackString = "Copy the URL below";
    }
    return new Promise((resolve) => {
      const textArea = document.createElement("textarea");
      textArea.setAttribute("style", {
        position: "fixed",
        top: 0,
        left: 0,
        width: "2em",
        height: "2em",
        padding: 0,
        border: "none",
        outline: "none",
        boxShadow: "none",
        background: "transparent"
      });
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      const magicCopyFailed = () => {
        document.body.removeChild(textArea);
        window.prompt(fallbackString, textToCopy);
        resolve();
      };
      try {
        const successful = document.execCommand("copy");
        if (!successful) {
          return magicCopyFailed("copy command unavailable");
        }
        document.body.removeChild(textArea);
        return resolve();
      } catch (err) {
        document.body.removeChild(textArea);
        return magicCopyFailed(err);
      }
    });
  }

  // ../packages/@uppy/dashboard/lib/components/FileItem/Buttons/index.js
  function EditButton(_ref) {
    let {
      file,
      uploadInProgressOrComplete,
      metaFields,
      canEditFile,
      i18n,
      onClick
    } = _ref;
    if (!uploadInProgressOrComplete && metaFields && metaFields.length > 0 || !uploadInProgressOrComplete && canEditFile(file)) {
      return h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
        type: "button",
        "aria-label": i18n("editFileWithFilename", {
          file: file.meta.name
        }),
        title: i18n("editFileWithFilename", {
          file: file.meta.name
        }),
        onClick: () => onClick()
      }, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        width: "14",
        height: "14",
        viewBox: "0 0 14 14"
      }, h("g", {
        fillRule: "evenodd"
      }, h("path", {
        d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
        fillRule: "nonzero"
      }), h("rect", {
        x: "1",
        y: "12.293",
        width: "11",
        height: "1",
        rx: ".5"
      }), h("path", {
        fillRule: "nonzero",
        d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
      }))));
    }
    return null;
  }
  function RemoveButton(_ref2) {
    let {
      i18n,
      onClick,
      file
    } = _ref2;
    return h("button", {
      className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
      type: "button",
      "aria-label": i18n("removeFile", {
        file: file.meta.name
      }),
      title: i18n("removeFile", {
        file: file.meta.name
      }),
      onClick: () => onClick()
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "18",
      height: "18",
      viewBox: "0 0 18 18"
    }, h("path", {
      d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
    }), h("path", {
      fill: "#FFF",
      d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
    })));
  }
  var copyLinkToClipboard = (event, props) => {
    copyToClipboard(props.file.uploadURL, props.i18n("copyLinkToClipboardFallback")).then(() => {
      props.uppy.log("Link copied to clipboard.");
      props.uppy.info(props.i18n("copyLinkToClipboardSuccess"), "info", 3e3);
    }).catch(props.uppy.log).then(() => event.target.focus({
      preventScroll: true
    }));
  };
  function CopyLinkButton(props) {
    const {
      i18n
    } = props;
    return h("button", {
      className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
      type: "button",
      "aria-label": i18n("copyLink"),
      title: i18n("copyLink"),
      onClick: (event) => copyLinkToClipboard(event, props)
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "14",
      height: "14",
      viewBox: "0 0 14 12"
    }, h("path", {
      d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z"
    })));
  }
  function Buttons(props) {
    const {
      uppy,
      file,
      uploadInProgressOrComplete,
      canEditFile,
      metaFields,
      showLinkToFileUploadResult,
      showRemoveButton,
      i18n,
      toggleFileCard,
      openFileEditor
    } = props;
    const editAction = () => {
      if (metaFields && metaFields.length > 0) {
        toggleFileCard(true, file.id);
      } else {
        openFileEditor(file);
      }
    };
    return h("div", {
      className: "uppy-Dashboard-Item-actionWrapper"
    }, h(EditButton, {
      i18n,
      file,
      uploadInProgressOrComplete,
      canEditFile,
      metaFields,
      onClick: editAction
    }), showLinkToFileUploadResult && file.uploadURL ? h(CopyLinkButton, {
      file,
      uppy,
      i18n
    }) : null, showRemoveButton ? h(RemoveButton, {
      i18n,
      file,
      uppy,
      onClick: () => props.uppy.removeFile(file.id, "removed-by-user")
    }) : null);
  }

  // ../packages/@uppy/dashboard/lib/components/FileItem/index.js
  var FileItem = class extends d {
    componentDidMount() {
      const {
        file
      } = this.props;
      if (!file.preview) {
        this.props.handleRequestThumbnail(file);
      }
    }
    shouldComponentUpdate(nextProps) {
      return !(0, import_is_shallow_equal.default)(this.props, nextProps);
    }
    componentDidUpdate() {
      const {
        file
      } = this.props;
      if (!file.preview) {
        this.props.handleRequestThumbnail(file);
      }
    }
    componentWillUnmount() {
      const {
        file
      } = this.props;
      if (!file.preview) {
        this.props.handleCancelThumbnail(file);
      }
    }
    render() {
      const {
        file
      } = this.props;
      const isProcessing = file.progress.preprocess || file.progress.postprocess;
      const isUploaded = file.progress.uploadComplete && !isProcessing && !file.error;
      const uploadInProgressOrComplete = file.progress.uploadStarted || isProcessing;
      const uploadInProgress = file.progress.uploadStarted && !file.progress.uploadComplete || isProcessing;
      const error = file.error || false;
      const {
        isGhost
      } = file;
      let showRemoveButton = this.props.individualCancellation ? !isUploaded : !uploadInProgress && !isUploaded;
      if (isUploaded && this.props.showRemoveButtonAfterComplete) {
        showRemoveButton = true;
      }
      const dashboardItemClass = (0, import_classnames3.default)({
        "uppy-Dashboard-Item": true,
        "is-inprogress": uploadInProgress && !this.props.recoveredState,
        "is-processing": isProcessing,
        "is-complete": isUploaded,
        "is-error": !!error,
        "is-resumable": this.props.resumableUploads,
        "is-noIndividualCancellation": !this.props.individualCancellation,
        "is-ghost": isGhost
      });
      return h("div", {
        className: dashboardItemClass,
        id: `uppy_${file.id}`,
        role: this.props.role
      }, h("div", {
        className: "uppy-Dashboard-Item-preview"
      }, h(FilePreviewAndLink, {
        file,
        showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
        i18n: this.props.i18n,
        toggleFileCard: this.props.toggleFileCard,
        metaFields: this.props.metaFields
      }), h(FileProgress, {
        uppy: this.props.uppy,
        file,
        error,
        isUploaded,
        hideRetryButton: this.props.hideRetryButton,
        hideCancelButton: this.props.hideCancelButton,
        hidePauseResumeButton: this.props.hidePauseResumeButton,
        recoveredState: this.props.recoveredState,
        showRemoveButtonAfterComplete: this.props.showRemoveButtonAfterComplete,
        resumableUploads: this.props.resumableUploads,
        individualCancellation: this.props.individualCancellation,
        i18n: this.props.i18n
      })), h("div", {
        className: "uppy-Dashboard-Item-fileInfoAndButtons"
      }, h(FileInfo, {
        file,
        id: this.props.id,
        acquirers: this.props.acquirers,
        containerWidth: this.props.containerWidth,
        i18n: this.props.i18n,
        toggleAddFilesPanel: this.props.toggleAddFilesPanel,
        toggleFileCard: this.props.toggleFileCard,
        metaFields: this.props.metaFields,
        singleFile: this.props.singleFile
      }), h(Buttons, {
        file,
        metaFields: this.props.metaFields,
        showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
        showRemoveButton,
        canEditFile: this.props.canEditFile,
        uploadInProgressOrComplete,
        toggleFileCard: this.props.toggleFileCard,
        openFileEditor: this.props.openFileEditor,
        uppy: this.props.uppy,
        i18n: this.props.i18n
      })));
    }
  };

  // ../packages/@uppy/dashboard/lib/components/VirtualList.js
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var STYLE_INNER = {
    position: "relative",
    width: "100%",
    minHeight: "100%"
  };
  var STYLE_CONTENT = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    overflow: "visible"
  };
  var VirtualList = class extends d {
    constructor(props) {
      super(props);
      this.handleScroll = () => {
        this.setState({
          offset: this.base.scrollTop
        });
      };
      this.handleResize = () => {
        this.resize();
      };
      this.focusElement = null;
      this.state = {
        offset: 0,
        height: 0
      };
    }
    componentDidMount() {
      this.resize();
      window.addEventListener("resize", this.handleResize);
    }
    componentWillUpdate() {
      if (this.base.contains(document.activeElement)) {
        this.focusElement = document.activeElement;
      }
    }
    componentDidUpdate() {
      if (this.focusElement && this.focusElement.parentNode && document.activeElement !== this.focusElement) {
        this.focusElement.focus();
      }
      this.focusElement = null;
      this.resize();
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }
    resize() {
      const {
        height
      } = this.state;
      if (height !== this.base.offsetHeight) {
        this.setState({
          height: this.base.offsetHeight
        });
      }
    }
    render(_ref) {
      let {
        data,
        rowHeight,
        renderRow,
        overscanCount = 10,
        ...props
      } = _ref;
      const {
        offset,
        height
      } = this.state;
      let start = Math.floor(offset / rowHeight);
      let visibleRowCount = Math.floor(height / rowHeight);
      if (overscanCount) {
        start = Math.max(0, start - start % overscanCount);
        visibleRowCount += overscanCount;
      }
      const end = start + visibleRowCount + 4;
      const selection = data.slice(start, end);
      const styleInner = {
        ...STYLE_INNER,
        height: data.length * rowHeight
      };
      const styleContent = {
        ...STYLE_CONTENT,
        top: start * rowHeight
      };
      return h("div", _extends({
        onScroll: this.handleScroll
      }, props), h("div", {
        role: "presentation",
        style: styleInner
      }, h("div", {
        role: "presentation",
        style: styleContent
      }, selection.map(renderRow))));
    }
  };
  var VirtualList_default = VirtualList;

  // ../packages/@uppy/dashboard/lib/components/FileList.js
  function _extends2() {
    _extends2 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends2.apply(this, arguments);
  }
  function chunks(list, size) {
    const chunked = [];
    let currentChunk = [];
    list.forEach((item) => {
      if (currentChunk.length < size) {
        currentChunk.push(item);
      } else {
        chunked.push(currentChunk);
        currentChunk = [item];
      }
    });
    if (currentChunk.length)
      chunked.push(currentChunk);
    return chunked;
  }
  var FileList_default = (props) => {
    const rowHeight = props.itemsPerRow === 1 ? 71 : 200;
    const fileProps = {
      id: props.id,
      error: props.error,
      i18n: props.i18n,
      uppy: props.uppy,
      acquirers: props.acquirers,
      resumableUploads: props.resumableUploads,
      individualCancellation: props.individualCancellation,
      hideRetryButton: props.hideRetryButton,
      hidePauseResumeButton: props.hidePauseResumeButton,
      hideCancelButton: props.hideCancelButton,
      showLinkToFileUploadResult: props.showLinkToFileUploadResult,
      showRemoveButtonAfterComplete: props.showRemoveButtonAfterComplete,
      isWide: props.isWide,
      metaFields: props.metaFields,
      recoveredState: props.recoveredState,
      singleFile: props.singleFile,
      toggleFileCard: props.toggleFileCard,
      handleRequestThumbnail: props.handleRequestThumbnail,
      handleCancelThumbnail: props.handleCancelThumbnail
    };
    const sortByGhostComesFirst = (file1, file2) => {
      return props.files[file2].isGhost - props.files[file1].isGhost;
    };
    const files = Object.keys(props.files);
    if (props.recoveredState)
      files.sort(sortByGhostComesFirst);
    const rows = chunks(files, props.itemsPerRow);
    const renderRow = (row) => h("div", {
      class: "uppy-Dashboard-filesInner",
      role: "presentation",
      key: row[0]
    }, row.map((fileID) => h(FileItem, _extends2({
      key: fileID,
      uppy: props.uppy
    }, fileProps, {
      role: "listitem",
      openFileEditor: props.openFileEditor,
      canEditFile: props.canEditFile,
      toggleAddFilesPanel: props.toggleAddFilesPanel,
      file: props.files[fileID]
    }))));
    if (props.singleFile) {
      return h("div", {
        class: "uppy-Dashboard-files"
      }, renderRow(rows[0]));
    }
    return h(VirtualList_default, {
      class: "uppy-Dashboard-files",
      role: "list",
      data: rows,
      renderRow,
      rowHeight
    });
  };

  // ../packages/@uppy/dashboard/lib/components/AddFiles.js
  var _Symbol$for3;
  _Symbol$for3 = Symbol.for("uppy test: disable unused locale key warning");
  var AddFiles = class extends d {
    constructor() {
      super(...arguments);
      this.triggerFileInputClick = () => {
        this.fileInput.click();
      };
      this.triggerFolderInputClick = () => {
        this.folderInput.click();
      };
      this.triggerVideoCameraInputClick = () => {
        this.mobileVideoFileInput.click();
      };
      this.triggerPhotoCameraInputClick = () => {
        this.mobilePhotoFileInput.click();
      };
      this.onFileInputChange = (event) => {
        this.props.handleInputChange(event);
        event.target.value = null;
      };
      this.renderHiddenInput = (isFolder, refCallback) => {
        return h("input", {
          className: "uppy-Dashboard-input",
          hidden: true,
          "aria-hidden": "true",
          tabIndex: -1,
          webkitdirectory: isFolder,
          type: "file",
          name: "files[]",
          multiple: this.props.maxNumberOfFiles !== 1,
          onChange: this.onFileInputChange,
          accept: this.props.allowedFileTypes,
          ref: refCallback
        });
      };
      this.renderHiddenCameraInput = (type, nativeCameraFacingMode, refCallback) => {
        const typeToAccept = {
          photo: "image/*",
          video: "video/*"
        };
        const accept = typeToAccept[type];
        return h("input", {
          className: "uppy-Dashboard-input",
          hidden: true,
          "aria-hidden": "true",
          tabIndex: -1,
          type: "file",
          name: `camera-${type}`,
          onChange: this.onFileInputChange,
          capture: nativeCameraFacingMode,
          accept,
          ref: refCallback
        });
      };
      this.renderMyDeviceAcquirer = () => {
        return h("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": "MyDevice"
        }, h("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-uppy-super-focusable": true,
          onClick: this.triggerFileInputClick
        }, h("div", {
          className: "uppy-DashboardTab-inner"
        }, h("svg", {
          className: "uppy-DashboardTab-iconMyDevice",
          "aria-hidden": "true",
          focusable: "false",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, h("path", {
          d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z",
          fill: "currentcolor",
          "fill-rule": "evenodd"
        }))), h("div", {
          className: "uppy-DashboardTab-name"
        }, this.props.i18n("myDevice"))));
      };
      this.renderPhotoCamera = () => {
        return h("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": "MobilePhotoCamera"
        }, h("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-uppy-super-focusable": true,
          onClick: this.triggerPhotoCameraInputClick
        }, h("div", {
          className: "uppy-DashboardTab-inner"
        }, h("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, h("path", {
          d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
          fill: "#02B383",
          "fill-rule": "nonzero"
        }))), h("div", {
          className: "uppy-DashboardTab-name"
        }, this.props.i18n("takePictureBtn"))));
      };
      this.renderVideoCamera = () => {
        return h("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": "MobileVideoCamera"
        }, h("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-uppy-super-focusable": true,
          onClick: this.triggerVideoCameraInputClick
        }, h("div", {
          className: "uppy-DashboardTab-inner"
        }, h("svg", {
          "aria-hidden": "true",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, h("path", {
          fill: "#FF675E",
          fillRule: "nonzero",
          d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z "
        }))), h("div", {
          className: "uppy-DashboardTab-name"
        }, this.props.i18n("recordVideoBtn"))));
      };
      this.renderBrowseButton = (text, onClickFn) => {
        const numberOfAcquirers = this.props.acquirers.length;
        return h("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse",
          onClick: onClickFn,
          "data-uppy-super-focusable": numberOfAcquirers === 0
        }, text);
      };
      this.renderDropPasteBrowseTagline = (numberOfAcquirers) => {
        const browseFiles = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick);
        const browseFolders = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick);
        const lowerFMSelectionType = this.props.fileManagerSelectionType;
        const camelFMSelectionType = lowerFMSelectionType.charAt(0).toUpperCase() + lowerFMSelectionType.slice(1);
        return h(
          "div",
          {
            class: "uppy-Dashboard-AddFiles-title"
          },
          this.props.disableLocalFiles ? this.props.i18n("importFiles") : numberOfAcquirers > 0 ? this.props.i18nArray(`dropPasteImport${camelFMSelectionType}`, {
            browseFiles,
            browseFolders,
            browse: browseFiles
          }) : this.props.i18nArray(`dropPaste${camelFMSelectionType}`, {
            browseFiles,
            browseFolders,
            browse: browseFiles
          })
        );
      };
      this.renderAcquirer = (acquirer) => {
        return h("div", {
          className: "uppy-DashboardTab",
          role: "presentation",
          "data-uppy-acquirer-id": acquirer.id
        }, h("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
          role: "tab",
          tabIndex: 0,
          "data-cy": acquirer.id,
          "aria-controls": `uppy-DashboardContent-panel--${acquirer.id}`,
          "aria-selected": this.props.activePickerPanel.id === acquirer.id,
          "data-uppy-super-focusable": true,
          onClick: () => this.props.showPanel(acquirer.id)
        }, h("div", {
          className: "uppy-DashboardTab-inner"
        }, acquirer.icon()), h("div", {
          className: "uppy-DashboardTab-name"
        }, acquirer.name)));
      };
      this.renderAcquirers = (acquirers) => {
        const acquirersWithoutLastTwo = [...acquirers];
        const lastTwoAcquirers = acquirersWithoutLastTwo.splice(acquirers.length - 2, acquirers.length);
        return h(p, null, acquirersWithoutLastTwo.map((acquirer) => this.renderAcquirer(acquirer)), h("span", {
          role: "presentation",
          style: {
            "white-space": "nowrap"
          }
        }, lastTwoAcquirers.map((acquirer) => this.renderAcquirer(acquirer))));
      };
      this.renderSourcesList = (acquirers, disableLocalFiles) => {
        const {
          showNativePhotoCameraButton,
          showNativeVideoCameraButton
        } = this.props;
        let list = [];
        const myDeviceKey = "myDevice";
        if (!disableLocalFiles) {
          list.push({
            key: myDeviceKey,
            elements: this.renderMyDeviceAcquirer()
          });
          if (showNativePhotoCameraButton)
            list.push({
              key: "nativePhotoCameraButton",
              elements: this.renderPhotoCamera()
            });
          if (showNativeVideoCameraButton)
            list.push({
              key: "nativePhotoCameraButton",
              elements: this.renderVideoCamera()
            });
        }
        list.push(...acquirers.map((acquirer) => ({
          key: acquirer.id,
          elements: this.renderAcquirer(acquirer)
        })));
        const hasOnlyMyDevice = list.length === 1 && list[0].key === myDeviceKey;
        if (hasOnlyMyDevice)
          list = [];
        const listWithoutLastTwo = [...list];
        const lastTwo = listWithoutLastTwo.splice(list.length - 2, list.length);
        const renderList = (l4) => l4.map((_ref) => {
          let {
            key,
            elements
          } = _ref;
          return h(p, {
            key
          }, elements);
        });
        return h(p, null, this.renderDropPasteBrowseTagline(list.length), h("div", {
          className: "uppy-Dashboard-AddFiles-list",
          role: "tablist"
        }, renderList(listWithoutLastTwo), h("span", {
          role: "presentation",
          style: {
            "white-space": "nowrap"
          }
        }, renderList(lastTwo))));
      };
    }
    [_Symbol$for3]() {
      this.props.i18nArray("dropPasteBoth");
      this.props.i18nArray("dropPasteFiles");
      this.props.i18nArray("dropPasteFolders");
      this.props.i18nArray("dropPasteImportBoth");
      this.props.i18nArray("dropPasteImportFiles");
      this.props.i18nArray("dropPasteImportFolders");
    }
    renderPoweredByUppy() {
      const {
        i18nArray
      } = this.props;
      const uppyBranding = h("span", null, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
        width: "11",
        height: "11",
        viewBox: "0 0 11 11"
      }, h("path", {
        d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
        fillRule: "evenodd"
      })), h("span", {
        className: "uppy-Dashboard-poweredByUppy"
      }, "Uppy"));
      const linkText = i18nArray("poweredBy", {
        uppy: uppyBranding
      });
      return h("a", {
        tabIndex: "-1",
        href: "https://uppy.io",
        rel: "noreferrer noopener",
        target: "_blank",
        className: "uppy-Dashboard-poweredBy"
      }, linkText);
    }
    render() {
      const {
        showNativePhotoCameraButton,
        showNativeVideoCameraButton,
        nativeCameraFacingMode
      } = this.props;
      return h("div", {
        className: "uppy-Dashboard-AddFiles"
      }, this.renderHiddenInput(false, (ref) => {
        this.fileInput = ref;
      }), this.renderHiddenInput(true, (ref) => {
        this.folderInput = ref;
      }), showNativePhotoCameraButton && this.renderHiddenCameraInput("photo", nativeCameraFacingMode, (ref) => {
        this.mobilePhotoFileInput = ref;
      }), showNativeVideoCameraButton && this.renderHiddenCameraInput("video", nativeCameraFacingMode, (ref) => {
        this.mobileVideoFileInput = ref;
      }), this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles), h("div", {
        className: "uppy-Dashboard-AddFiles-info"
      }, this.props.note && h("div", {
        className: "uppy-Dashboard-note"
      }, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy(this.props)));
    }
  };
  var AddFiles_default = AddFiles;

  // ../packages/@uppy/dashboard/lib/components/AddFilesPanel.js
  var import_classnames4 = __toESM(require_classnames(), 1);
  var AddFilesPanel = (props) => {
    return h("div", {
      className: (0, import_classnames4.default)("uppy-Dashboard-AddFilesPanel", props.className),
      "data-uppy-panelType": "AddFiles",
      "aria-hidden": props.showAddFilesPanel
    }, h("div", {
      className: "uppy-DashboardContent-bar"
    }, h("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, props.i18n("addingMoreFiles")), h("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: () => props.toggleAddFilesPanel(false)
    }, props.i18n("back"))), h(AddFiles_default, props));
  };
  var AddFilesPanel_default = AddFilesPanel;

  // ../packages/@uppy/dashboard/lib/components/PickerPanelContent.js
  var import_classnames5 = __toESM(require_classnames(), 1);

  // ../packages/@uppy/dashboard/lib/utils/ignoreEvent.js
  function ignoreEvent(ev) {
    const {
      tagName
    } = ev.target;
    if (tagName === "INPUT" || tagName === "TEXTAREA") {
      ev.stopPropagation();
      return;
    }
    ev.preventDefault();
    ev.stopPropagation();
  }
  var ignoreEvent_default = ignoreEvent;

  // ../packages/@uppy/dashboard/lib/components/PickerPanelContent.js
  function PickerPanelContent(_ref) {
    let {
      activePickerPanel,
      className,
      hideAllPanels,
      i18n,
      state,
      uppy
    } = _ref;
    return h("div", {
      className: (0, import_classnames5.default)("uppy-DashboardContent-panel", className),
      role: "tabpanel",
      "data-uppy-panelType": "PickerPanel",
      id: `uppy-DashboardContent-panel--${activePickerPanel.id}`,
      onDragOver: ignoreEvent_default,
      onDragLeave: ignoreEvent_default,
      onDrop: ignoreEvent_default,
      onPaste: ignoreEvent_default
    }, h("div", {
      className: "uppy-DashboardContent-bar"
    }, h("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, i18n("importFrom", {
      name: activePickerPanel.name
    })), h("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: hideAllPanels
    }, i18n("cancel"))), h("div", {
      className: "uppy-DashboardContent-panelBody"
    }, uppy.getPlugin(activePickerPanel.id).render(state)));
  }
  var PickerPanelContent_default = PickerPanelContent;

  // ../packages/@uppy/dashboard/lib/components/EditorPanel.js
  var import_classnames6 = __toESM(require_classnames(), 1);
  function EditorPanel(props) {
    const file = props.files[props.fileCardFor];
    return h("div", {
      className: (0, import_classnames6.default)("uppy-DashboardContent-panel", props.className),
      role: "tabpanel",
      "data-uppy-panelType": "FileEditor",
      id: "uppy-DashboardContent-panel--editor"
    }, h("div", {
      className: "uppy-DashboardContent-bar"
    }, h("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, props.i18nArray("editing", {
      file: h("span", {
        className: "uppy-DashboardContent-titleFile"
      }, file.meta ? file.meta.name : file.name)
    })), h("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: props.hideAllPanels
    }, props.i18n("cancel")), h("button", {
      className: "uppy-DashboardContent-save",
      type: "button",
      onClick: props.saveFileEditor
    }, props.i18n("save"))), h("div", {
      className: "uppy-DashboardContent-panelBody"
    }, props.editors.map((target) => {
      return props.uppy.getPlugin(target.id).render(props.state);
    })));
  }
  var EditorPanel_default = EditorPanel;

  // ../packages/@uppy/dashboard/lib/components/PickerPanelTopBar.js
  var uploadStates = {
    STATE_ERROR: "error",
    STATE_WAITING: "waiting",
    STATE_PREPROCESSING: "preprocessing",
    STATE_UPLOADING: "uploading",
    STATE_POSTPROCESSING: "postprocessing",
    STATE_COMPLETE: "complete",
    STATE_PAUSED: "paused"
  };
  function getUploadingState2(isAllErrored, isAllComplete, isAllPaused, files) {
    if (files === void 0) {
      files = {};
    }
    if (isAllErrored) {
      return uploadStates.STATE_ERROR;
    }
    if (isAllComplete) {
      return uploadStates.STATE_COMPLETE;
    }
    if (isAllPaused) {
      return uploadStates.STATE_PAUSED;
    }
    let state = uploadStates.STATE_WAITING;
    const fileIDs = Object.keys(files);
    for (let i4 = 0; i4 < fileIDs.length; i4++) {
      const {
        progress
      } = files[fileIDs[i4]];
      if (progress.uploadStarted && !progress.uploadComplete) {
        return uploadStates.STATE_UPLOADING;
      }
      if (progress.preprocess && state !== uploadStates.STATE_UPLOADING) {
        state = uploadStates.STATE_PREPROCESSING;
      }
      if (progress.postprocess && state !== uploadStates.STATE_UPLOADING && state !== uploadStates.STATE_PREPROCESSING) {
        state = uploadStates.STATE_POSTPROCESSING;
      }
    }
    return state;
  }
  function UploadStatus(_ref) {
    let {
      files,
      i18n,
      isAllComplete,
      isAllErrored,
      isAllPaused,
      inProgressNotPausedFiles,
      newFiles,
      processingFiles
    } = _ref;
    const uploadingState = getUploadingState2(isAllErrored, isAllComplete, isAllPaused, files);
    switch (uploadingState) {
      case "uploading":
        return i18n("uploadingXFiles", {
          smart_count: inProgressNotPausedFiles.length
        });
      case "preprocessing":
      case "postprocessing":
        return i18n("processingXFiles", {
          smart_count: processingFiles.length
        });
      case "paused":
        return i18n("uploadPaused");
      case "waiting":
        return i18n("xFilesSelected", {
          smart_count: newFiles.length
        });
      case "complete":
        return i18n("uploadComplete");
      default:
    }
  }
  function PanelTopBar(props) {
    const {
      i18n,
      isAllComplete,
      hideCancelButton,
      maxNumberOfFiles,
      toggleAddFilesPanel,
      uppy
    } = props;
    let {
      allowNewUpload
    } = props;
    if (allowNewUpload && maxNumberOfFiles) {
      allowNewUpload = props.totalFileCount < props.maxNumberOfFiles;
    }
    return h("div", {
      className: "uppy-DashboardContent-bar"
    }, !isAllComplete && !hideCancelButton ? h("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      onClick: () => uppy.cancelAll()
    }, i18n("cancel")) : h("div", null), h("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, h(UploadStatus, props)), allowNewUpload ? h("button", {
      className: "uppy-DashboardContent-addMore",
      type: "button",
      "aria-label": i18n("addMoreFiles"),
      title: i18n("addMoreFiles"),
      onClick: () => toggleAddFilesPanel(true)
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "15",
      height: "15",
      viewBox: "0 0 15 15"
    }, h("path", {
      d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
    })), h("span", {
      className: "uppy-DashboardContent-addMoreCaption"
    }, i18n("addMore"))) : h("div", null));
  }
  var PickerPanelTopBar_default = PanelTopBar;

  // ../packages/@uppy/dashboard/lib/components/FileCard/index.js
  var import_classnames7 = __toESM(require_classnames(), 1);
  var FileCard = class extends d {
    constructor(props) {
      super(props);
      this.form = document.createElement("form");
      this.updateMeta = (newVal, name) => {
        this.setState((_ref) => {
          let {
            formState
          } = _ref;
          return {
            formState: {
              ...formState,
              [name]: newVal
            }
          };
        });
      };
      this.handleSave = (e4) => {
        e4.preventDefault();
        const fileID = this.props.fileCardFor;
        this.props.saveFileCard(this.state.formState, fileID);
      };
      this.handleCancel = () => {
        const file = this.props.files[this.props.fileCardFor];
        this.props.uppy.emit("file-editor:cancel", file);
        this.props.toggleFileCard(false);
      };
      this.saveOnEnter = (ev) => {
        if (ev.keyCode === 13) {
          ev.stopPropagation();
          ev.preventDefault();
          const file = this.props.files[this.props.fileCardFor];
          this.props.saveFileCard(this.state.formState, file.id);
        }
      };
      this.renderMetaFields = () => {
        const metaFields = this.getMetaFields() || [];
        const fieldCSSClasses = {
          text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input"
        };
        return metaFields.map((field) => {
          const id18 = `uppy-Dashboard-FileCard-input-${field.id}`;
          const required = this.props.requiredMetaFields.includes(field.id);
          return h("fieldset", {
            key: field.id,
            className: "uppy-Dashboard-FileCard-fieldset"
          }, h("label", {
            className: "uppy-Dashboard-FileCard-label",
            htmlFor: id18
          }, field.name), field.render !== void 0 ? field.render({
            value: this.state.formState[field.id],
            onChange: (newVal) => this.updateMeta(newVal, field.id),
            fieldCSSClasses,
            required,
            form: this.form.id
          }, h) : h("input", {
            className: fieldCSSClasses.text,
            id: id18,
            form: this.form.id,
            type: field.type || "text",
            required,
            value: this.state.formState[field.id],
            placeholder: field.placeholder,
            onKeyUp: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
            onKeyDown: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
            onKeyPress: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
            onInput: (ev) => this.updateMeta(ev.target.value, field.id),
            "data-uppy-super-focusable": true
          }));
        });
      };
      const _file = this.props.files[this.props.fileCardFor];
      const _metaFields = this.getMetaFields() || [];
      const storedMetaData = {};
      _metaFields.forEach((field) => {
        storedMetaData[field.id] = _file.meta[field.id] || "";
      });
      this.state = {
        formState: storedMetaData
      };
      this.form.id = nanoid();
    }
    componentWillMount() {
      this.form.addEventListener("submit", this.handleSave);
      document.body.appendChild(this.form);
    }
    componentWillUnmount() {
      this.form.removeEventListener("submit", this.handleSave);
      document.body.removeChild(this.form);
    }
    getMetaFields() {
      return typeof this.props.metaFields === "function" ? this.props.metaFields(this.props.files[this.props.fileCardFor]) : this.props.metaFields;
    }
    render() {
      const file = this.props.files[this.props.fileCardFor];
      const showEditButton = this.props.canEditFile(file);
      return h("div", {
        className: (0, import_classnames7.default)("uppy-Dashboard-FileCard", this.props.className),
        "data-uppy-panelType": "FileCard",
        onDragOver: ignoreEvent_default,
        onDragLeave: ignoreEvent_default,
        onDrop: ignoreEvent_default,
        onPaste: ignoreEvent_default
      }, h("div", {
        className: "uppy-DashboardContent-bar"
      }, h("div", {
        className: "uppy-DashboardContent-title",
        role: "heading",
        "aria-level": "1"
      }, this.props.i18nArray("editing", {
        file: h("span", {
          className: "uppy-DashboardContent-titleFile"
        }, file.meta ? file.meta.name : file.name)
      })), h("button", {
        className: "uppy-DashboardContent-back",
        type: "button",
        form: this.form.id,
        title: this.props.i18n("finishEditingFile"),
        onClick: this.handleCancel
      }, this.props.i18n("cancel"))), h("div", {
        className: "uppy-Dashboard-FileCard-inner"
      }, h("div", {
        className: "uppy-Dashboard-FileCard-preview",
        style: {
          backgroundColor: getIconByMime(file.type).color
        }
      }, h(FilePreview, {
        file
      }), showEditButton && h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
        onClick: (event) => {
          this.handleSave(event);
          this.props.openFileEditor(file);
        },
        form: this.form.id
      }, this.props.i18n("editFile"))), h("div", {
        className: "uppy-Dashboard-FileCard-info"
      }, this.renderMetaFields()), h("div", {
        className: "uppy-Dashboard-FileCard-actions"
      }, h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
        type: "form" in HTMLButtonElement.prototype ? "submit" : "button",
        onClick: "form" in HTMLButtonElement.prototype ? void 0 : this.handleSave,
        form: this.form.id
      }, this.props.i18n("saveChanges")), h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
        type: "button",
        onClick: this.handleCancel,
        form: this.form.id
      }, this.props.i18n("cancel")))));
    }
  };
  var FileCard_default = FileCard;

  // ../packages/@uppy/dashboard/lib/components/Slide.js
  var import_classnames8 = __toESM(require_classnames(), 1);
  var transitionName = "uppy-transition-slideDownUp";
  var duration = 250;
  var Slide = class extends d {
    constructor(props) {
      super(props);
      this.state = {
        cachedChildren: null,
        className: ""
      };
    }
    componentWillUpdate(nextProps) {
      const {
        cachedChildren
      } = this.state;
      const child = x(nextProps.children)[0];
      if (cachedChildren === child)
        return null;
      const patch = {
        cachedChildren: child
      };
      if (child && !cachedChildren) {
        patch.className = `${transitionName}-enter`;
        cancelAnimationFrame(this.animationFrame);
        clearTimeout(this.leaveTimeout);
        this.leaveTimeout = void 0;
        this.animationFrame = requestAnimationFrame(() => {
          this.setState({
            className: `${transitionName}-enter ${transitionName}-enter-active`
          });
          this.enterTimeout = setTimeout(() => {
            this.setState({
              className: ""
            });
          }, duration);
        });
      }
      if (cachedChildren && !child && this.leaveTimeout === void 0) {
        patch.cachedChildren = cachedChildren;
        patch.className = `${transitionName}-leave`;
        cancelAnimationFrame(this.animationFrame);
        clearTimeout(this.enterTimeout);
        this.enterTimeout = void 0;
        this.animationFrame = requestAnimationFrame(() => {
          this.setState({
            className: `${transitionName}-leave ${transitionName}-leave-active`
          });
          this.leaveTimeout = setTimeout(() => {
            this.setState({
              cachedChildren: null,
              className: ""
            });
          }, duration);
        });
      }
      this.setState(patch);
    }
    render() {
      const {
        cachedChildren,
        className
      } = this.state;
      if (!cachedChildren) {
        return null;
      }
      return q(cachedChildren, {
        className: (0, import_classnames8.default)(className, cachedChildren.props.className)
      });
    }
  };
  var Slide_default = Slide;

  // ../packages/@uppy/dashboard/lib/components/Dashboard.js
  function _extends3() {
    _extends3 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends3.apply(this, arguments);
  }
  var WIDTH_XL = 900;
  var WIDTH_LG = 700;
  var WIDTH_MD = 576;
  var HEIGHT_MD = 400;
  function Dashboard(props) {
    const noFiles = props.totalFileCount === 0;
    const singleFile = props.totalFileCount === 1;
    const isSizeMD = props.containerWidth > WIDTH_MD;
    const dashboardClassName = (0, import_classnames9.default)({
      "uppy-Dashboard": true,
      "uppy-Dashboard--isDisabled": props.disabled,
      "uppy-Dashboard--animateOpenClose": props.animateOpenClose,
      "uppy-Dashboard--isClosing": props.isClosing,
      "uppy-Dashboard--isDraggingOver": props.isDraggingOver,
      "uppy-Dashboard--modal": !props.inline,
      "uppy-size--md": props.containerWidth > WIDTH_MD,
      "uppy-size--lg": props.containerWidth > WIDTH_LG,
      "uppy-size--xl": props.containerWidth > WIDTH_XL,
      "uppy-size--height-md": props.containerHeight > HEIGHT_MD,
      "uppy-Dashboard--isAddFilesPanelVisible": props.showAddFilesPanel,
      "uppy-Dashboard--isInnerWrapVisible": props.areInsidesReadyToBeVisible,
      "uppy-Dashboard--singleFile": singleFile
    });
    let itemsPerRow = 1;
    if (props.containerWidth > WIDTH_XL) {
      itemsPerRow = 5;
    } else if (props.containerWidth > WIDTH_LG) {
      itemsPerRow = 4;
    } else if (props.containerWidth > WIDTH_MD) {
      itemsPerRow = 3;
    }
    const showFileList = props.showSelectedFiles && !noFiles;
    const numberOfFilesForRecovery = props.recoveredState ? Object.keys(props.recoveredState.files).length : null;
    const numberOfGhosts = props.files ? Object.keys(props.files).filter((fileID) => props.files[fileID].isGhost).length : null;
    const renderRestoredText = () => {
      if (numberOfGhosts > 0) {
        return props.i18n("recoveredXFiles", {
          smart_count: numberOfGhosts
        });
      }
      return props.i18n("recoveredAllFiles");
    };
    const dashboard = h("div", {
      className: dashboardClassName,
      "data-uppy-theme": props.theme,
      "data-uppy-num-acquirers": props.acquirers.length,
      "data-uppy-drag-drop-supported": !props.disableLocalFiles && isDragDropSupported(),
      "aria-hidden": props.inline ? "false" : props.isHidden,
      "aria-disabled": props.disabled,
      "aria-label": !props.inline ? props.i18n("dashboardWindowTitle") : props.i18n("dashboardTitle"),
      onPaste: props.handlePaste,
      onDragOver: props.handleDragOver,
      onDragLeave: props.handleDragLeave,
      onDrop: props.handleDrop
    }, h("div", {
      "aria-hidden": "true",
      className: "uppy-Dashboard-overlay",
      tabIndex: -1,
      onClick: props.handleClickOutside
    }), h("div", {
      className: "uppy-Dashboard-inner",
      "aria-modal": !props.inline && "true",
      role: !props.inline && "dialog",
      style: {
        width: props.inline && props.width ? props.width : "",
        height: props.inline && props.height ? props.height : ""
      }
    }, !props.inline ? h("button", {
      className: "uppy-u-reset uppy-Dashboard-close",
      type: "button",
      "aria-label": props.i18n("closeModal"),
      title: props.i18n("closeModal"),
      onClick: props.closeModal
    }, h("span", {
      "aria-hidden": "true"
    }, "\xD7")) : null, h("div", {
      className: "uppy-Dashboard-innerWrap"
    }, h("div", {
      className: "uppy-Dashboard-dropFilesHereHint"
    }, props.i18n("dropHint")), showFileList && h(PickerPanelTopBar_default, props), numberOfFilesForRecovery && h("div", {
      className: "uppy-Dashboard-serviceMsg"
    }, h("svg", {
      className: "uppy-Dashboard-serviceMsg-icon",
      "aria-hidden": "true",
      focusable: "false",
      width: "21",
      height: "16",
      viewBox: "0 0 24 19"
    }, h("g", {
      transform: "translate(0 -1)",
      fill: "none",
      fillRule: "evenodd"
    }, h("path", {
      d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
      fill: "#FFD300"
    }), h("path", {
      fill: "#000",
      d: "M11 6h2l-.3 8h-1.4z"
    }), h("circle", {
      fill: "#000",
      cx: "12",
      cy: "17",
      r: "1"
    }))), h("strong", {
      className: "uppy-Dashboard-serviceMsg-title"
    }, props.i18n("sessionRestored")), h("div", {
      className: "uppy-Dashboard-serviceMsg-text"
    }, renderRestoredText())), showFileList ? h(
      FileList_default,
      _extends3({}, props, {
        singleFile,
        itemsPerRow
      })
    ) : h(AddFiles_default, _extends3({}, props, {
      isSizeMD
    })), h(Slide_default, null, props.showAddFilesPanel ? h(AddFilesPanel_default, _extends3({
      key: "AddFiles"
    }, props, {
      isSizeMD
    })) : null), h(Slide_default, null, props.fileCardFor ? h(FileCard_default, _extends3({
      key: "FileCard"
    }, props)) : null), h(Slide_default, null, props.activePickerPanel ? h(PickerPanelContent_default, _extends3({
      key: "Picker"
    }, props)) : null), h(Slide_default, null, props.showFileEditor ? h(EditorPanel_default, _extends3({
      key: "Editor"
    }, props)) : null), h("div", {
      className: "uppy-Dashboard-progressindicators"
    }, props.progressindicators.map((target) => {
      return props.uppy.getPlugin(target.id).render(props.state);
    })))));
    return dashboard;
  }

  // ../packages/@uppy/dashboard/lib/locale.js
  var locale_default4 = {
    strings: {
      closeModal: "Close Modal",
      addMoreFiles: "Add more files",
      addingMoreFiles: "Adding more files",
      importFrom: "Import from %{name}",
      dashboardWindowTitle: "Uppy Dashboard Window (Press escape to close)",
      dashboardTitle: "Uppy Dashboard",
      copyLinkToClipboardSuccess: "Link copied to clipboard.",
      copyLinkToClipboardFallback: "Copy the URL below",
      copyLink: "Copy link",
      back: "Back",
      removeFile: "Remove file",
      editFile: "Edit file",
      editing: "Editing %{file}",
      finishEditingFile: "Finish editing file",
      saveChanges: "Save changes",
      myDevice: "My Device",
      dropHint: "Drop your files here",
      uploadComplete: "Upload complete",
      uploadPaused: "Upload paused",
      resumeUpload: "Resume upload",
      pauseUpload: "Pause upload",
      retryUpload: "Retry upload",
      cancelUpload: "Cancel upload",
      xFilesSelected: {
        0: "%{smart_count} file selected",
        1: "%{smart_count} files selected"
      },
      uploadingXFiles: {
        0: "Uploading %{smart_count} file",
        1: "Uploading %{smart_count} files"
      },
      processingXFiles: {
        0: "Processing %{smart_count} file",
        1: "Processing %{smart_count} files"
      },
      poweredBy: "Powered by %{uppy}",
      addMore: "Add more",
      editFileWithFilename: "Edit file %{file}",
      save: "Save",
      cancel: "Cancel",
      dropPasteFiles: "Drop files here or %{browseFiles}",
      dropPasteFolders: "Drop files here or %{browseFolders}",
      dropPasteBoth: "Drop files here, %{browseFiles} or %{browseFolders}",
      dropPasteImportFiles: "Drop files here, %{browseFiles} or import from:",
      dropPasteImportFolders: "Drop files here, %{browseFolders} or import from:",
      dropPasteImportBoth: "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
      importFiles: "Import files from:",
      browseFiles: "browse files",
      browseFolders: "browse folders",
      recoveredXFiles: {
        0: "We could not fully recover 1 file. Please re-select it and resume the upload.",
        1: "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
      },
      recoveredAllFiles: "We restored all files. You can now resume the upload.",
      sessionRestored: "Session restored",
      reSelect: "Re-select",
      missingRequiredMetaFields: {
        0: "Missing required meta field: %{fields}.",
        1: "Missing required meta fields: %{fields}."
      },
      takePictureBtn: "Take Picture",
      recordVideoBtn: "Record Video"
    }
  };

  // ../packages/@uppy/dashboard/lib/Dashboard.js
  function _classPrivateFieldLooseBase5(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id5 = 0;
  function _classPrivateFieldLooseKey5(name) {
    return "__private_" + id5++ + "_" + name;
  }
  var packageJson6 = {
    "version": "3.3.1"
  };
  var memoize = memoizeOne.default || memoizeOne;
  var TAB_KEY = 9;
  var ESC_KEY = 27;
  function createPromise() {
    const o4 = {};
    o4.promise = new Promise((resolve, reject) => {
      o4.resolve = resolve;
      o4.reject = reject;
    });
    return o4;
  }
  function defaultPickerIcon() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "30",
      height: "30",
      viewBox: "0 0 30 30"
    }, h("path", {
      d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
    }));
  }
  var _disabledNodes = /* @__PURE__ */ _classPrivateFieldLooseKey5("disabledNodes");
  var _generateLargeThumbnailIfSingleFile = /* @__PURE__ */ _classPrivateFieldLooseKey5("generateLargeThumbnailIfSingleFile");
  var _openFileEditorWhenFilesAdded = /* @__PURE__ */ _classPrivateFieldLooseKey5("openFileEditorWhenFilesAdded");
  var _attachRenderFunctionToTarget = /* @__PURE__ */ _classPrivateFieldLooseKey5("attachRenderFunctionToTarget");
  var _isTargetSupported = /* @__PURE__ */ _classPrivateFieldLooseKey5("isTargetSupported");
  var _getAcquirers = /* @__PURE__ */ _classPrivateFieldLooseKey5("getAcquirers");
  var _getProgressIndicators = /* @__PURE__ */ _classPrivateFieldLooseKey5("getProgressIndicators");
  var _getEditors = /* @__PURE__ */ _classPrivateFieldLooseKey5("getEditors");
  var Dashboard2 = class extends UIPlugin_default {
    constructor(uppy, _opts) {
      var _this;
      super(uppy, _opts);
      _this = this;
      Object.defineProperty(this, _disabledNodes, {
        writable: true,
        value: null
      });
      this.removeTarget = (plugin) => {
        const pluginState = this.getPluginState();
        const newTargets = pluginState.targets.filter((target) => target.id !== plugin.id);
        this.setPluginState({
          targets: newTargets
        });
      };
      this.addTarget = (plugin) => {
        const callerPluginId = plugin.id || plugin.constructor.name;
        const callerPluginName = plugin.title || callerPluginId;
        const callerPluginType = plugin.type;
        if (callerPluginType !== "acquirer" && callerPluginType !== "progressindicator" && callerPluginType !== "editor") {
          const msg = "Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor";
          this.uppy.log(msg, "error");
          return void 0;
        }
        const target = {
          id: callerPluginId,
          name: callerPluginName,
          type: callerPluginType
        };
        const state = this.getPluginState();
        const newTargets = state.targets.slice();
        newTargets.push(target);
        this.setPluginState({
          targets: newTargets
        });
        return this.el;
      };
      this.hideAllPanels = () => {
        const state = this.getPluginState();
        const update = {
          activePickerPanel: false,
          showAddFilesPanel: false,
          activeOverlayType: null,
          fileCardFor: null,
          showFileEditor: false
        };
        if (state.activePickerPanel === update.activePickerPanel && state.showAddFilesPanel === update.showAddFilesPanel && state.showFileEditor === update.showFileEditor && state.activeOverlayType === update.activeOverlayType) {
          return;
        }
        this.setPluginState(update);
      };
      this.showPanel = (id18) => {
        const {
          targets
        } = this.getPluginState();
        const activePickerPanel = targets.filter((target) => {
          return target.type === "acquirer" && target.id === id18;
        })[0];
        this.setPluginState({
          activePickerPanel,
          activeOverlayType: "PickerPanel"
        });
        this.uppy.emit("dashboard:show-panel", id18);
      };
      this.canEditFile = (file) => {
        const {
          targets
        } = this.getPluginState();
        const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](targets);
        return editors.some((target) => this.uppy.getPlugin(target.id).canEditFile(file));
      };
      this.openFileEditor = (file) => {
        const {
          targets
        } = this.getPluginState();
        const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](targets);
        this.setPluginState({
          showFileEditor: true,
          fileCardFor: file.id || null,
          activeOverlayType: "FileEditor"
        });
        editors.forEach((editor) => {
          this.uppy.getPlugin(editor.id).selectFile(file);
        });
      };
      this.saveFileEditor = () => {
        const {
          targets
        } = this.getPluginState();
        const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](targets);
        editors.forEach((editor) => {
          this.uppy.getPlugin(editor.id).save();
        });
        this.hideAllPanels();
      };
      this.openModal = () => {
        const {
          promise,
          resolve
        } = createPromise();
        this.savedScrollPosition = window.pageYOffset;
        this.savedActiveElement = document.activeElement;
        if (this.opts.disablePageScrollWhenModalOpen) {
          document.body.classList.add("uppy-Dashboard-isFixed");
        }
        if (this.opts.animateOpenClose && this.getPluginState().isClosing) {
          const handler = () => {
            this.setPluginState({
              isHidden: false
            });
            this.el.removeEventListener("animationend", handler, false);
            resolve();
          };
          this.el.addEventListener("animationend", handler, false);
        } else {
          this.setPluginState({
            isHidden: false
          });
          resolve();
        }
        if (this.opts.browserBackButtonClose) {
          this.updateBrowserHistory();
        }
        document.addEventListener("keydown", this.handleKeyDownInModal);
        this.uppy.emit("dashboard:modal-open");
        return promise;
      };
      this.closeModal = function(opts) {
        if (opts === void 0) {
          opts = {};
        }
        const {
          manualClose = true
        } = opts;
        const {
          isHidden,
          isClosing
        } = _this.getPluginState();
        if (isHidden || isClosing) {
          return void 0;
        }
        const {
          promise,
          resolve
        } = createPromise();
        if (_this.opts.disablePageScrollWhenModalOpen) {
          document.body.classList.remove("uppy-Dashboard-isFixed");
        }
        if (_this.opts.animateOpenClose) {
          _this.setPluginState({
            isClosing: true
          });
          const handler = () => {
            _this.setPluginState({
              isHidden: true,
              isClosing: false
            });
            _this.superFocus.cancel();
            _this.savedActiveElement.focus();
            _this.el.removeEventListener("animationend", handler, false);
            resolve();
          };
          _this.el.addEventListener("animationend", handler, false);
        } else {
          _this.setPluginState({
            isHidden: true
          });
          _this.superFocus.cancel();
          _this.savedActiveElement.focus();
          resolve();
        }
        document.removeEventListener("keydown", _this.handleKeyDownInModal);
        if (manualClose) {
          if (_this.opts.browserBackButtonClose) {
            var _history$state;
            if ((_history$state = history.state) != null && _history$state[_this.modalName]) {
              history.back();
            }
          }
        }
        _this.uppy.emit("dashboard:modal-closed");
        return promise;
      };
      this.isModalOpen = () => {
        return !this.getPluginState().isHidden || false;
      };
      this.requestCloseModal = () => {
        if (this.opts.onRequestCloseModal) {
          return this.opts.onRequestCloseModal();
        }
        return this.closeModal();
      };
      this.setDarkModeCapability = (isDarkModeOn) => {
        const {
          capabilities
        } = this.uppy.getState();
        this.uppy.setState({
          capabilities: {
            ...capabilities,
            darkMode: isDarkModeOn
          }
        });
      };
      this.handleSystemDarkModeChange = (event) => {
        const isDarkModeOnNow = event.matches;
        this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnNow ? "on" : "off"}`);
        this.setDarkModeCapability(isDarkModeOnNow);
      };
      this.toggleFileCard = (show, fileID) => {
        const file = this.uppy.getFile(fileID);
        if (show) {
          this.uppy.emit("dashboard:file-edit-start", file);
        } else {
          this.uppy.emit("dashboard:file-edit-complete", file);
        }
        this.setPluginState({
          fileCardFor: show ? fileID : null,
          activeOverlayType: show ? "FileCard" : null
        });
      };
      this.toggleAddFilesPanel = (show) => {
        this.setPluginState({
          showAddFilesPanel: show,
          activeOverlayType: show ? "AddFiles" : null
        });
      };
      this.addFiles = (files) => {
        const descriptors = files.map((file) => ({
          source: this.id,
          name: file.name,
          type: file.type,
          data: file,
          meta: {
            relativePath: file.relativePath || file.webkitRelativePath || null
          }
        }));
        try {
          this.uppy.addFiles(descriptors);
        } catch (err) {
          this.uppy.log(err);
        }
      };
      this.startListeningToResize = () => {
        this.resizeObserver = new ResizeObserver((entries) => {
          const uppyDashboardInnerEl = entries[0];
          const {
            width,
            height
          } = uppyDashboardInnerEl.contentRect;
          this.setPluginState({
            containerWidth: width,
            containerHeight: height,
            areInsidesReadyToBeVisible: true
          });
        });
        this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner"));
        this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
          const pluginState = this.getPluginState();
          const isModalAndClosed = !this.opts.inline && pluginState.isHidden;
          if (!pluginState.areInsidesReadyToBeVisible && !isModalAndClosed) {
            this.uppy.log("[Dashboard] resize event didn\u2019t fire on time: defaulted to mobile layout", "warning");
            this.setPluginState({
              areInsidesReadyToBeVisible: true
            });
          }
        }, 1e3);
      };
      this.stopListeningToResize = () => {
        this.resizeObserver.disconnect();
        clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
      };
      this.recordIfFocusedOnUppyRecently = (event) => {
        if (this.el.contains(event.target)) {
          this.ifFocusedOnUppyRecently = true;
        } else {
          this.ifFocusedOnUppyRecently = false;
          this.superFocus.cancel();
        }
      };
      this.disableInteractiveElements = (disable) => {
        var _classPrivateFieldLoo;
        const NODES_TO_DISABLE = ["a[href]", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", '[role="button"]:not([disabled])'];
        const nodesToDisable = (_classPrivateFieldLoo = _classPrivateFieldLooseBase5(this, _disabledNodes)[_disabledNodes]) != null ? _classPrivateFieldLoo : toArray_default(this.el.querySelectorAll(NODES_TO_DISABLE)).filter((node) => !node.classList.contains("uppy-Dashboard-close"));
        for (const node of nodesToDisable) {
          if (node.tagName === "A") {
            node.setAttribute("aria-disabled", disable);
          } else {
            node.disabled = disable;
          }
        }
        if (disable) {
          _classPrivateFieldLooseBase5(this, _disabledNodes)[_disabledNodes] = nodesToDisable;
        } else {
          _classPrivateFieldLooseBase5(this, _disabledNodes)[_disabledNodes] = null;
        }
        this.dashboardIsDisabled = disable;
      };
      this.updateBrowserHistory = () => {
        var _history$state2;
        if (!((_history$state2 = history.state) != null && _history$state2[this.modalName])) {
          history.pushState({
            ...history.state,
            [this.modalName]: true
          }, "");
        }
        window.addEventListener("popstate", this.handlePopState, false);
      };
      this.handlePopState = (event) => {
        var _event$state;
        if (this.isModalOpen() && (!event.state || !event.state[this.modalName])) {
          this.closeModal({
            manualClose: false
          });
        }
        if (!this.isModalOpen() && (_event$state = event.state) != null && _event$state[this.modalName]) {
          history.back();
        }
      };
      this.handleKeyDownInModal = (event) => {
        if (event.keyCode === ESC_KEY)
          this.requestCloseModal(event);
        if (event.keyCode === TAB_KEY)
          trapFocus(event, this.getPluginState().activeOverlayType, this.el);
      };
      this.handleClickOutside = () => {
        if (this.opts.closeModalOnClickOutside)
          this.requestCloseModal();
      };
      this.handlePaste = (event) => {
        this.uppy.iteratePlugins((plugin) => {
          if (plugin.type === "acquirer") {
            plugin.handleRootPaste == null ? void 0 : plugin.handleRootPaste(event);
          }
        });
        const files = toArray_default(event.clipboardData.files);
        if (files.length > 0) {
          this.uppy.log("[Dashboard] Files pasted");
          this.addFiles(files);
        }
      };
      this.handleInputChange = (event) => {
        event.preventDefault();
        const files = toArray_default(event.target.files);
        if (files.length > 0) {
          this.uppy.log("[Dashboard] Files selected through input");
          this.addFiles(files);
        }
      };
      this.handleDragOver = (event) => {
        var _this$opts$onDragOver, _this$opts;
        event.preventDefault();
        event.stopPropagation();
        const canSomePluginHandleRootDrop = () => {
          let somePluginCanHandleRootDrop2 = true;
          this.uppy.iteratePlugins((plugin) => {
            if (plugin.canHandleRootDrop != null && plugin.canHandleRootDrop(event)) {
              somePluginCanHandleRootDrop2 = true;
            }
          });
          return somePluginCanHandleRootDrop2;
        };
        const doesEventHaveFiles = () => {
          const {
            types
          } = event.dataTransfer;
          return types.some((type) => type === "Files");
        };
        const somePluginCanHandleRootDrop = canSomePluginHandleRootDrop(event);
        const hasFiles = doesEventHaveFiles(event);
        if (!somePluginCanHandleRootDrop && !hasFiles || this.opts.disabled || this.opts.disableLocalFiles && (hasFiles || !somePluginCanHandleRootDrop) || !this.uppy.getState().allowNewUpload) {
          event.dataTransfer.dropEffect = "none";
          clearTimeout(this.removeDragOverClassTimeout);
          return;
        }
        event.dataTransfer.dropEffect = "copy";
        clearTimeout(this.removeDragOverClassTimeout);
        this.setPluginState({
          isDraggingOver: true
        });
        (_this$opts$onDragOver = (_this$opts = this.opts).onDragOver) == null ? void 0 : _this$opts$onDragOver.call(_this$opts, event);
      };
      this.handleDragLeave = (event) => {
        var _this$opts$onDragLeav, _this$opts2;
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this.removeDragOverClassTimeout);
        this.removeDragOverClassTimeout = setTimeout(() => {
          this.setPluginState({
            isDraggingOver: false
          });
        }, 50);
        (_this$opts$onDragLeav = (_this$opts2 = this.opts).onDragLeave) == null ? void 0 : _this$opts$onDragLeav.call(_this$opts2, event);
      };
      this.handleDrop = async (event) => {
        var _this$opts$onDrop, _this$opts3;
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this.removeDragOverClassTimeout);
        this.setPluginState({
          isDraggingOver: false
        });
        this.uppy.iteratePlugins((plugin) => {
          if (plugin.type === "acquirer") {
            plugin.handleRootDrop == null ? void 0 : plugin.handleRootDrop(event);
          }
        });
        let executedDropErrorOnce = false;
        const logDropError = (error) => {
          this.uppy.log(error, "error");
          if (!executedDropErrorOnce) {
            this.uppy.info(error.message, "error");
            executedDropErrorOnce = true;
          }
        };
        const files = await getDroppedFiles(event.dataTransfer, {
          logDropError
        });
        if (files.length > 0) {
          this.uppy.log("[Dashboard] Files dropped");
          this.addFiles(files);
        }
        (_this$opts$onDrop = (_this$opts3 = this.opts).onDrop) == null ? void 0 : _this$opts$onDrop.call(_this$opts3, event);
      };
      this.handleRequestThumbnail = (file) => {
        if (!this.opts.waitForThumbnailsBeforeUpload) {
          this.uppy.emit("thumbnail:request", file);
        }
      };
      this.handleCancelThumbnail = (file) => {
        if (!this.opts.waitForThumbnailsBeforeUpload) {
          this.uppy.emit("thumbnail:cancel", file);
        }
      };
      this.handleKeyDownInInline = (event) => {
        if (event.keyCode === TAB_KEY)
          forInline(event, this.getPluginState().activeOverlayType, this.el);
      };
      this.handlePasteOnBody = (event) => {
        const isFocusInOverlay2 = this.el.contains(document.activeElement);
        if (isFocusInOverlay2) {
          this.handlePaste(event);
        }
      };
      this.handleComplete = (_ref) => {
        let {
          failed
        } = _ref;
        if (this.opts.closeAfterFinish && failed.length === 0) {
          this.requestCloseModal();
        }
      };
      this.handleCancelRestore = () => {
        this.uppy.emit("restore-canceled");
      };
      Object.defineProperty(this, _generateLargeThumbnailIfSingleFile, {
        writable: true,
        value: () => {
          if (this.opts.disableThumbnailGenerator) {
            return;
          }
          const LARGE_THUMBNAIL = 600;
          const files = this.uppy.getFiles();
          if (files.length === 1) {
            const thumbnailGenerator = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
            thumbnailGenerator == null ? void 0 : thumbnailGenerator.setOptions({
              thumbnailWidth: LARGE_THUMBNAIL
            });
            const fileForThumbnail = {
              ...files[0],
              preview: void 0
            };
            thumbnailGenerator.requestThumbnail(fileForThumbnail).then(() => {
              thumbnailGenerator == null ? void 0 : thumbnailGenerator.setOptions({
                thumbnailWidth: this.opts.thumbnailWidth
              });
            });
          }
        }
      });
      Object.defineProperty(this, _openFileEditorWhenFilesAdded, {
        writable: true,
        value: (files) => {
          const firstFile = files[0];
          if (this.canEditFile(firstFile)) {
            this.openFileEditor(firstFile);
          }
        }
      });
      this.initEvents = () => {
        if (this.opts.trigger && !this.opts.inline) {
          const showModalTrigger = findAllDOMElements(this.opts.trigger);
          if (showModalTrigger) {
            showModalTrigger.forEach((trigger) => trigger.addEventListener("click", this.openModal));
          } else {
            this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
          }
        }
        this.startListeningToResize();
        document.addEventListener("paste", this.handlePasteOnBody);
        this.uppy.on("plugin-remove", this.removeTarget);
        this.uppy.on("file-added", this.hideAllPanels);
        this.uppy.on("dashboard:modal-closed", this.hideAllPanels);
        this.uppy.on("file-editor:complete", this.hideAllPanels);
        this.uppy.on("complete", this.handleComplete);
        this.uppy.on("files-added", _classPrivateFieldLooseBase5(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
        this.uppy.on("file-removed", _classPrivateFieldLooseBase5(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
        document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, true);
        document.addEventListener("click", this.recordIfFocusedOnUppyRecently, true);
        if (this.opts.inline) {
          this.el.addEventListener("keydown", this.handleKeyDownInInline);
        }
        if (this.opts.autoOpenFileEditor) {
          this.uppy.on("files-added", _classPrivateFieldLooseBase5(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
        }
      };
      this.removeEvents = () => {
        const showModalTrigger = findAllDOMElements(this.opts.trigger);
        if (!this.opts.inline && showModalTrigger) {
          showModalTrigger.forEach((trigger) => trigger.removeEventListener("click", this.openModal));
        }
        this.stopListeningToResize();
        document.removeEventListener("paste", this.handlePasteOnBody);
        window.removeEventListener("popstate", this.handlePopState, false);
        this.uppy.off("plugin-remove", this.removeTarget);
        this.uppy.off("file-added", this.hideAllPanels);
        this.uppy.off("dashboard:modal-closed", this.hideAllPanels);
        this.uppy.off("file-editor:complete", this.hideAllPanels);
        this.uppy.off("complete", this.handleComplete);
        this.uppy.off("files-added", _classPrivateFieldLooseBase5(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
        this.uppy.off("file-removed", _classPrivateFieldLooseBase5(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
        document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently);
        document.removeEventListener("click", this.recordIfFocusedOnUppyRecently);
        if (this.opts.inline) {
          this.el.removeEventListener("keydown", this.handleKeyDownInInline);
        }
        if (this.opts.autoOpenFileEditor) {
          this.uppy.off("files-added", _classPrivateFieldLooseBase5(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
        }
      };
      this.superFocusOnEachUpdate = () => {
        const isFocusInUppy = this.el.contains(document.activeElement);
        const isFocusNowhere = document.activeElement === document.body || document.activeElement === null;
        const isInformerHidden = this.uppy.getState().info.length === 0;
        const isModal = !this.opts.inline;
        if (isInformerHidden && (isModal || isFocusInUppy || isFocusNowhere && this.ifFocusedOnUppyRecently)) {
          this.superFocus(this.el, this.getPluginState().activeOverlayType);
        } else {
          this.superFocus.cancel();
        }
      };
      this.afterUpdate = () => {
        if (this.opts.disabled && !this.dashboardIsDisabled) {
          this.disableInteractiveElements(true);
          return;
        }
        if (!this.opts.disabled && this.dashboardIsDisabled) {
          this.disableInteractiveElements(false);
        }
        this.superFocusOnEachUpdate();
      };
      this.saveFileCard = (meta, fileID) => {
        this.uppy.setFileMeta(fileID, meta);
        this.toggleFileCard(false, fileID);
      };
      Object.defineProperty(this, _attachRenderFunctionToTarget, {
        writable: true,
        value: (target) => {
          const plugin = this.uppy.getPlugin(target.id);
          return {
            ...target,
            icon: plugin.icon || this.opts.defaultPickerIcon,
            render: plugin.render
          };
        }
      });
      Object.defineProperty(this, _isTargetSupported, {
        writable: true,
        value: (target) => {
          const plugin = this.uppy.getPlugin(target.id);
          if (typeof plugin.isSupported !== "function") {
            return true;
          }
          return plugin.isSupported();
        }
      });
      Object.defineProperty(this, _getAcquirers, {
        writable: true,
        value: memoize((targets) => {
          return targets.filter((target) => target.type === "acquirer" && _classPrivateFieldLooseBase5(this, _isTargetSupported)[_isTargetSupported](target)).map(_classPrivateFieldLooseBase5(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
        })
      });
      Object.defineProperty(this, _getProgressIndicators, {
        writable: true,
        value: memoize((targets) => {
          return targets.filter((target) => target.type === "progressindicator").map(_classPrivateFieldLooseBase5(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
        })
      });
      Object.defineProperty(this, _getEditors, {
        writable: true,
        value: memoize((targets) => {
          return targets.filter((target) => target.type === "editor").map(_classPrivateFieldLooseBase5(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
        })
      });
      this.render = (state) => {
        const pluginState = this.getPluginState();
        const {
          files,
          capabilities,
          allowNewUpload
        } = state;
        const {
          newFiles,
          uploadStartedFiles,
          completeFiles,
          erroredFiles,
          inProgressFiles,
          inProgressNotPausedFiles,
          processingFiles,
          isUploadStarted,
          isAllComplete,
          isAllErrored,
          isAllPaused
        } = this.uppy.getObjectOfFilesPerState();
        const acquirers = _classPrivateFieldLooseBase5(this, _getAcquirers)[_getAcquirers](pluginState.targets);
        const progressindicators = _classPrivateFieldLooseBase5(this, _getProgressIndicators)[_getProgressIndicators](pluginState.targets);
        const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](pluginState.targets);
        let theme;
        if (this.opts.theme === "auto") {
          theme = capabilities.darkMode ? "dark" : "light";
        } else {
          theme = this.opts.theme;
        }
        if (["files", "folders", "both"].indexOf(this.opts.fileManagerSelectionType) < 0) {
          this.opts.fileManagerSelectionType = "files";
          console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`);
        }
        return Dashboard({
          state,
          isHidden: pluginState.isHidden,
          files,
          newFiles,
          uploadStartedFiles,
          completeFiles,
          erroredFiles,
          inProgressFiles,
          inProgressNotPausedFiles,
          processingFiles,
          isUploadStarted,
          isAllComplete,
          isAllErrored,
          isAllPaused,
          totalFileCount: Object.keys(files).length,
          totalProgress: state.totalProgress,
          allowNewUpload,
          acquirers,
          theme,
          disabled: this.opts.disabled,
          disableLocalFiles: this.opts.disableLocalFiles,
          direction: this.opts.direction,
          activePickerPanel: pluginState.activePickerPanel,
          showFileEditor: pluginState.showFileEditor,
          saveFileEditor: this.saveFileEditor,
          disableInteractiveElements: this.disableInteractiveElements,
          animateOpenClose: this.opts.animateOpenClose,
          isClosing: pluginState.isClosing,
          progressindicators,
          editors,
          autoProceed: this.uppy.opts.autoProceed,
          id: this.id,
          closeModal: this.requestCloseModal,
          handleClickOutside: this.handleClickOutside,
          handleInputChange: this.handleInputChange,
          handlePaste: this.handlePaste,
          inline: this.opts.inline,
          showPanel: this.showPanel,
          hideAllPanels: this.hideAllPanels,
          i18n: this.i18n,
          i18nArray: this.i18nArray,
          uppy: this.uppy,
          note: this.opts.note,
          recoveredState: state.recoveredState,
          metaFields: pluginState.metaFields,
          resumableUploads: capabilities.resumableUploads || false,
          individualCancellation: capabilities.individualCancellation,
          isMobileDevice: capabilities.isMobileDevice,
          fileCardFor: pluginState.fileCardFor,
          toggleFileCard: this.toggleFileCard,
          toggleAddFilesPanel: this.toggleAddFilesPanel,
          showAddFilesPanel: pluginState.showAddFilesPanel,
          saveFileCard: this.saveFileCard,
          openFileEditor: this.openFileEditor,
          canEditFile: this.canEditFile,
          width: this.opts.width,
          height: this.opts.height,
          showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
          fileManagerSelectionType: this.opts.fileManagerSelectionType,
          proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
          hideCancelButton: this.opts.hideCancelButton,
          hideRetryButton: this.opts.hideRetryButton,
          hidePauseResumeButton: this.opts.hidePauseResumeButton,
          showRemoveButtonAfterComplete: this.opts.showRemoveButtonAfterComplete,
          containerWidth: pluginState.containerWidth,
          containerHeight: pluginState.containerHeight,
          areInsidesReadyToBeVisible: pluginState.areInsidesReadyToBeVisible,
          isTargetDOMEl: this.isTargetDOMEl,
          parentElement: this.el,
          allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
          maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
          requiredMetaFields: this.uppy.opts.restrictions.requiredMetaFields,
          showSelectedFiles: this.opts.showSelectedFiles,
          showNativePhotoCameraButton: this.opts.showNativePhotoCameraButton,
          showNativeVideoCameraButton: this.opts.showNativeVideoCameraButton,
          nativeCameraFacingMode: this.opts.nativeCameraFacingMode,
          handleCancelRestore: this.handleCancelRestore,
          handleRequestThumbnail: this.handleRequestThumbnail,
          handleCancelThumbnail: this.handleCancelThumbnail,
          isDraggingOver: pluginState.isDraggingOver,
          handleDragOver: this.handleDragOver,
          handleDragLeave: this.handleDragLeave,
          handleDrop: this.handleDrop
        });
      };
      this.discoverProviderPlugins = () => {
        this.uppy.iteratePlugins((plugin) => {
          if (plugin && !plugin.target && plugin.opts && plugin.opts.target === this.constructor) {
            this.addTarget(plugin);
          }
        });
      };
      this.install = () => {
        this.setPluginState({
          isHidden: true,
          fileCardFor: null,
          activeOverlayType: null,
          showAddFilesPanel: false,
          activePickerPanel: false,
          showFileEditor: false,
          metaFields: this.opts.metaFields,
          targets: [],
          areInsidesReadyToBeVisible: false,
          isDraggingOver: false
        });
        const {
          inline,
          closeAfterFinish
        } = this.opts;
        if (inline && closeAfterFinish) {
          throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
        }
        const {
          allowMultipleUploads,
          allowMultipleUploadBatches
        } = this.uppy.opts;
        if ((allowMultipleUploads || allowMultipleUploadBatches) && closeAfterFinish) {
          this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
        }
        const {
          target
        } = this.opts;
        if (target) {
          this.mount(target, this);
        }
        const plugins = this.opts.plugins || [];
        plugins.forEach((pluginID) => {
          const plugin = this.uppy.getPlugin(pluginID);
          if (plugin) {
            plugin.mount(this, plugin);
          }
        });
        if (!this.opts.disableStatusBar) {
          this.uppy.use(StatusBar2, {
            id: `${this.id}:StatusBar`,
            target: this,
            hideUploadButton: this.opts.hideUploadButton,
            hideRetryButton: this.opts.hideRetryButton,
            hidePauseResumeButton: this.opts.hidePauseResumeButton,
            hideCancelButton: this.opts.hideCancelButton,
            showProgressDetails: this.opts.showProgressDetails,
            hideAfterFinish: this.opts.hideProgressAfterFinish,
            locale: this.opts.locale,
            doneButtonHandler: this.opts.doneButtonHandler
          });
        }
        if (!this.opts.disableInformer) {
          this.uppy.use(Informer, {
            id: `${this.id}:Informer`,
            target: this
          });
        }
        if (!this.opts.disableThumbnailGenerator) {
          this.uppy.use(ThumbnailGenerator, {
            id: `${this.id}:ThumbnailGenerator`,
            thumbnailWidth: this.opts.thumbnailWidth,
            thumbnailHeight: this.opts.thumbnailHeight,
            thumbnailType: this.opts.thumbnailType,
            waitForThumbnailsBeforeUpload: this.opts.waitForThumbnailsBeforeUpload,
            lazy: !this.opts.waitForThumbnailsBeforeUpload
          });
        }
        this.darkModeMediaQuery = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
        const isDarkModeOnFromTheStart = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : false;
        this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnFromTheStart ? "on" : "off"}`);
        this.setDarkModeCapability(isDarkModeOnFromTheStart);
        if (this.opts.theme === "auto") {
          this.darkModeMediaQuery.addListener(this.handleSystemDarkModeChange);
        }
        this.discoverProviderPlugins();
        this.initEvents();
      };
      this.uninstall = () => {
        if (!this.opts.disableInformer) {
          const informer = this.uppy.getPlugin(`${this.id}:Informer`);
          if (informer)
            this.uppy.removePlugin(informer);
        }
        if (!this.opts.disableStatusBar) {
          const statusBar = this.uppy.getPlugin(`${this.id}:StatusBar`);
          if (statusBar)
            this.uppy.removePlugin(statusBar);
        }
        if (!this.opts.disableThumbnailGenerator) {
          const thumbnail = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
          if (thumbnail)
            this.uppy.removePlugin(thumbnail);
        }
        const plugins = this.opts.plugins || [];
        plugins.forEach((pluginID) => {
          const plugin = this.uppy.getPlugin(pluginID);
          if (plugin)
            plugin.unmount();
        });
        if (this.opts.theme === "auto") {
          this.darkModeMediaQuery.removeListener(this.handleSystemDarkModeChange);
        }
        this.unmount();
        this.removeEvents();
      };
      this.id = this.opts.id || "Dashboard";
      this.title = "Dashboard";
      this.type = "orchestrator";
      this.modalName = `uppy-Dashboard-${nanoid()}`;
      this.defaultLocale = locale_default4;
      const defaultOptions4 = {
        target: "body",
        metaFields: [],
        trigger: null,
        inline: false,
        width: 750,
        height: 550,
        thumbnailWidth: 280,
        thumbnailType: "image/jpeg",
        waitForThumbnailsBeforeUpload: false,
        defaultPickerIcon,
        showLinkToFileUploadResult: false,
        showProgressDetails: false,
        hideUploadButton: false,
        hideCancelButton: false,
        hideRetryButton: false,
        hidePauseResumeButton: false,
        hideProgressAfterFinish: false,
        doneButtonHandler: () => {
          this.uppy.cancelAll();
          this.requestCloseModal();
        },
        note: null,
        closeModalOnClickOutside: false,
        closeAfterFinish: false,
        disableStatusBar: false,
        disableInformer: false,
        disableThumbnailGenerator: false,
        disablePageScrollWhenModalOpen: true,
        animateOpenClose: true,
        fileManagerSelectionType: "files",
        proudlyDisplayPoweredByUppy: true,
        onRequestCloseModal: () => this.closeModal(),
        showSelectedFiles: true,
        showRemoveButtonAfterComplete: false,
        browserBackButtonClose: false,
        showNativePhotoCameraButton: false,
        showNativeVideoCameraButton: false,
        theme: "light",
        autoOpenFileEditor: false,
        disabled: false,
        disableLocalFiles: false
      };
      this.opts = {
        ...defaultOptions4,
        ..._opts
      };
      this.i18nInit();
      this.superFocus = createSuperFocus();
      this.ifFocusedOnUppyRecently = false;
      this.makeDashboardInsidesVisibleAnywayTimeout = null;
      this.removeDragOverClassTimeout = null;
    }
  };
  Dashboard2.VERSION = packageJson6.version;

  // ../packages/@uppy/utils/lib/NetworkError.js
  var NetworkError = class extends Error {
    constructor(error, xhr) {
      if (xhr === void 0) {
        xhr = null;
      }
      super(`This looks like a network error, the endpoint might be blocked by an internet provider or a firewall.`);
      this.cause = error;
      this.isNetworkError = true;
      this.request = xhr;
    }
  };
  var NetworkError_default = NetworkError;

  // ../packages/@uppy/utils/lib/fetchWithNetworkError.js
  function fetchWithNetworkError() {
    return fetch(...arguments).catch((err) => {
      if (err.name === "AbortError") {
        throw err;
      } else {
        throw new NetworkError_default(err);
      }
    });
  }

  // ../packages/@uppy/utils/lib/ErrorWithCause.js
  var ErrorWithCause = class extends Error {
    constructor(message, options) {
      if (options === void 0) {
        options = {};
      }
      super(message);
      this.cause = options.cause;
      if (this.cause && has(this.cause, "isNetworkError")) {
        this.isNetworkError = this.cause.isNetworkError;
      }
    }
  };
  var ErrorWithCause_default = ErrorWithCause;

  // ../packages/@uppy/companion-client/lib/AuthError.js
  var AuthError = class extends Error {
    constructor() {
      super("Authorization required");
      this.name = "AuthError";
      this.isAuthError = true;
    }
  };
  var AuthError_default = AuthError;

  // ../packages/@uppy/companion-client/lib/RequestClient.js
  var _Symbol$for4;
  function _classPrivateFieldLooseBase6(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id6 = 0;
  function _classPrivateFieldLooseKey6(name) {
    return "__private_" + id6++ + "_" + name;
  }
  var packageJson7 = {
    "version": "3.1.1"
  };
  function stripSlash(url) {
    return url.replace(/\/$/, "");
  }
  async function handleJSONResponse(res) {
    if (res.status === 401) {
      throw new AuthError_default();
    }
    const jsonPromise = res.json();
    if (res.ok) {
      return jsonPromise;
    }
    let errMsg = `Failed request with status: ${res.status}. ${res.statusText}`;
    try {
      const errData = await jsonPromise;
      errMsg = errData.message ? `${errMsg} message: ${errData.message}` : errMsg;
      errMsg = errData.requestId ? `${errMsg} request-Id: ${errData.requestId}` : errMsg;
    } catch {
    }
    throw new Error(errMsg);
  }
  var allowedHeadersCache = /* @__PURE__ */ new Map();
  var _companionHeaders = /* @__PURE__ */ _classPrivateFieldLooseKey6("companionHeaders");
  var _getUrl = /* @__PURE__ */ _classPrivateFieldLooseKey6("getUrl");
  var _request = /* @__PURE__ */ _classPrivateFieldLooseKey6("request");
  _Symbol$for4 = Symbol.for("uppy test: getCompanionHeaders");
  var RequestClient = class {
    constructor(uppy, opts) {
      Object.defineProperty(this, _request, {
        value: _request2
      });
      Object.defineProperty(this, _getUrl, {
        value: _getUrl2
      });
      Object.defineProperty(this, _companionHeaders, {
        writable: true,
        value: void 0
      });
      this.uppy = uppy;
      this.opts = opts;
      this.onReceiveResponse = this.onReceiveResponse.bind(this);
      _classPrivateFieldLooseBase6(this, _companionHeaders)[_companionHeaders] = opts == null ? void 0 : opts.companionHeaders;
    }
    setCompanionHeaders(headers) {
      _classPrivateFieldLooseBase6(this, _companionHeaders)[_companionHeaders] = headers;
    }
    [_Symbol$for4]() {
      return _classPrivateFieldLooseBase6(this, _companionHeaders)[_companionHeaders];
    }
    get hostname() {
      const {
        companion
      } = this.uppy.getState();
      const host = this.opts.companionUrl;
      return stripSlash(companion && companion[host] ? companion[host] : host);
    }
    async headers() {
      const defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Uppy-Versions": `@uppy/companion-client=${RequestClient.VERSION}`
      };
      return {
        ...defaultHeaders,
        ..._classPrivateFieldLooseBase6(this, _companionHeaders)[_companionHeaders]
      };
    }
    onReceiveResponse(_ref) {
      let {
        headers
      } = _ref;
      const state = this.uppy.getState();
      const companion = state.companion || {};
      const host = this.opts.companionUrl;
      if (headers.has("i-am") && headers.get("i-am") !== companion[host]) {
        this.uppy.setState({
          companion: {
            ...companion,
            [host]: headers.get("i-am")
          }
        });
      }
    }
    async preflight(path) {
      const allowedHeadersCached = allowedHeadersCache.get(this.hostname);
      if (allowedHeadersCached != null)
        return allowedHeadersCached;
      const fallbackAllowedHeaders = ["accept", "content-type", "uppy-auth-token"];
      const promise = (async () => {
        try {
          const response = await fetch(_classPrivateFieldLooseBase6(this, _getUrl)[_getUrl](path), {
            method: "OPTIONS"
          });
          const header = response.headers.get("access-control-allow-headers");
          if (header == null || header === "*") {
            allowedHeadersCache.set(this.hostname, fallbackAllowedHeaders);
            return fallbackAllowedHeaders;
          }
          this.uppy.log(`[CompanionClient] adding allowed preflight headers to companion cache: ${this.hostname} ${header}`);
          const allowedHeaders = header.split(",").map((headerName) => headerName.trim().toLowerCase());
          allowedHeadersCache.set(this.hostname, allowedHeaders);
          return allowedHeaders;
        } catch (err) {
          this.uppy.log(`[CompanionClient] unable to make preflight request ${err}`, "warning");
          allowedHeadersCache.delete(this.hostname);
          return fallbackAllowedHeaders;
        }
      })();
      allowedHeadersCache.set(this.hostname, promise);
      return promise;
    }
    async preflightAndHeaders(path) {
      const [allowedHeaders, headers] = await Promise.all([this.preflight(path), this.headers()]);
      return Object.fromEntries(Object.entries(headers).filter((_ref2) => {
        let [header] = _ref2;
        if (!allowedHeaders.includes(header.toLowerCase())) {
          this.uppy.log(`[CompanionClient] excluding disallowed header ${header}`);
          return false;
        }
        return true;
      }));
    }
    async get(path, options) {
      if (options === void 0) {
        options = void 0;
      }
      if (typeof options === "boolean")
        options = {
          skipPostResponse: options
        };
      return _classPrivateFieldLooseBase6(this, _request)[_request]({
        ...options,
        path
      });
    }
    async post(path, data, options) {
      if (options === void 0) {
        options = void 0;
      }
      if (typeof options === "boolean")
        options = {
          skipPostResponse: options
        };
      return _classPrivateFieldLooseBase6(this, _request)[_request]({
        ...options,
        path,
        method: "POST",
        data
      });
    }
    async delete(path, data, options) {
      if (data === void 0) {
        data = void 0;
      }
      if (typeof options === "boolean")
        options = {
          skipPostResponse: options
        };
      return _classPrivateFieldLooseBase6(this, _request)[_request]({
        ...options,
        path,
        method: "DELETE",
        data
      });
    }
  };
  function _getUrl2(url) {
    if (/^(https?:|)\/\//.test(url)) {
      return url;
    }
    return `${this.hostname}/${url}`;
  }
  async function _request2(_ref3) {
    let {
      path,
      method = "GET",
      data,
      skipPostResponse,
      signal
    } = _ref3;
    try {
      const headers = await this.preflightAndHeaders(path);
      const response = await fetchWithNetworkError(_classPrivateFieldLooseBase6(this, _getUrl)[_getUrl](path), {
        method,
        signal,
        headers,
        credentials: this.opts.companionCookiesRule || "same-origin",
        body: data ? JSON.stringify(data) : null
      });
      if (!skipPostResponse)
        this.onReceiveResponse(response);
      return handleJSONResponse(response);
    } catch (err) {
      if (err != null && err.isAuthError)
        throw err;
      throw new ErrorWithCause_default(`Could not ${method} ${_classPrivateFieldLooseBase6(this, _getUrl)[_getUrl](path)}`, {
        cause: err
      });
    }
  }
  RequestClient.VERSION = packageJson7.version;

  // ../packages/@uppy/companion-client/lib/tokenStorage.js
  var tokenStorage_exports = {};
  __export(tokenStorage_exports, {
    getItem: () => getItem,
    removeItem: () => removeItem,
    setItem: () => setItem
  });
  function setItem(key, value) {
    return new Promise((resolve) => {
      localStorage.setItem(key, value);
      resolve();
    });
  }
  function getItem(key) {
    return Promise.resolve(localStorage.getItem(key));
  }
  function removeItem(key) {
    return new Promise((resolve) => {
      localStorage.removeItem(key);
      resolve();
    });
  }

  // ../packages/@uppy/companion-client/lib/Provider.js
  var getName = (id18) => {
    return id18.split("-").map((s4) => s4.charAt(0).toUpperCase() + s4.slice(1)).join(" ");
  };
  var Provider = class extends RequestClient {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.provider = opts.provider;
      this.id = this.provider;
      this.name = this.opts.name || getName(this.id);
      this.pluginId = this.opts.pluginId;
      this.tokenKey = `companion-${this.pluginId}-auth-token`;
      this.companionKeysParams = this.opts.companionKeysParams;
      this.preAuthToken = null;
    }
    async headers() {
      const [headers, token] = await Promise.all([super.headers(), this.getAuthToken()]);
      const authHeaders = {};
      if (token) {
        authHeaders["uppy-auth-token"] = token;
      }
      if (this.companionKeysParams) {
        authHeaders["uppy-credentials-params"] = btoa(JSON.stringify({
          params: this.companionKeysParams
        }));
      }
      return {
        ...headers,
        ...authHeaders
      };
    }
    onReceiveResponse(response) {
      super.onReceiveResponse(response);
      const plugin = this.uppy.getPlugin(this.pluginId);
      const oldAuthenticated = plugin.getPluginState().authenticated;
      const authenticated = oldAuthenticated ? response.status !== 401 : response.status < 400;
      plugin.setPluginState({
        authenticated
      });
      return response;
    }
    setAuthToken(token) {
      return this.uppy.getPlugin(this.pluginId).storage.setItem(this.tokenKey, token);
    }
    getAuthToken() {
      return this.uppy.getPlugin(this.pluginId).storage.getItem(this.tokenKey);
    }
    async ensurePreAuth() {
      if (this.companionKeysParams && !this.preAuthToken) {
        await this.fetchPreAuthToken();
        if (!this.preAuthToken) {
          throw new Error("Could not load authentication data required for third-party login. Please try again later.");
        }
      }
    }
    authUrl(queries) {
      if (queries === void 0) {
        queries = {};
      }
      const params = new URLSearchParams(queries);
      if (this.preAuthToken) {
        params.set("uppyPreAuthToken", this.preAuthToken);
      }
      return `${this.hostname}/${this.id}/connect?${params}`;
    }
    fileUrl(id18) {
      return `${this.hostname}/${this.id}/get/${id18}`;
    }
    async fetchPreAuthToken() {
      if (!this.companionKeysParams) {
        return;
      }
      try {
        const res = await this.post(`${this.id}/preauth/`, {
          params: this.companionKeysParams
        });
        this.preAuthToken = res.token;
      } catch (err) {
        this.uppy.log(`[CompanionClient] unable to fetch preAuthToken ${err}`, "warning");
      }
    }
    list(directory) {
      return this.get(`${this.id}/list/${directory || ""}`);
    }
    logout() {
      return this.get(`${this.id}/logout`).then((response) => Promise.all([response, this.uppy.getPlugin(this.pluginId).storage.removeItem(this.tokenKey)])).then((_ref) => {
        let [response] = _ref;
        return response;
      });
    }
    static initPlugin(plugin, opts, defaultOpts) {
      plugin.type = "acquirer";
      plugin.files = [];
      if (defaultOpts) {
        plugin.opts = {
          ...defaultOpts,
          ...opts
        };
      }
      if (opts.serverUrl || opts.serverPattern) {
        throw new Error("`serverUrl` and `serverPattern` have been renamed to `companionUrl` and `companionAllowedHosts` respectively in the 0.30.5 release. Please consult the docs (for example, https://uppy.io/docs/instagram/ for the Instagram plugin) and use the updated options.`");
      }
      if (opts.companionAllowedHosts) {
        const pattern = opts.companionAllowedHosts;
        if (typeof pattern !== "string" && !Array.isArray(pattern) && !(pattern instanceof RegExp)) {
          throw new TypeError(`${plugin.id}: the option "companionAllowedHosts" must be one of string, Array, RegExp`);
        }
        plugin.opts.companionAllowedHosts = pattern;
      } else if (/^(?!https?:\/\/).*$/i.test(opts.companionUrl)) {
        plugin.opts.companionAllowedHosts = `https://${opts.companionUrl.replace(/^\/\//, "")}`;
      } else {
        plugin.opts.companionAllowedHosts = new URL(opts.companionUrl).origin;
      }
      plugin.storage = plugin.opts.storage || tokenStorage_exports;
    }
  };

  // ../packages/@uppy/companion-client/lib/SearchProvider.js
  var getName2 = (id18) => {
    return id18.split("-").map((s4) => s4.charAt(0).toUpperCase() + s4.slice(1)).join(" ");
  };
  var SearchProvider = class extends RequestClient {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.provider = opts.provider;
      this.id = this.provider;
      this.name = this.opts.name || getName2(this.id);
      this.pluginId = this.opts.pluginId;
    }
    fileUrl(id18) {
      return `${this.hostname}/search/${this.id}/get/${id18}`;
    }
    search(text, queries) {
      return this.get(`search/${this.id}/list?q=${encodeURIComponent(text)}${queries ? `&${queries}` : ""}`);
    }
  };

  // ../packages/@uppy/companion-client/lib/Socket.js
  var import_namespace_emitter2 = __toESM(require_namespace_emitter(), 1);
  var _Symbol$for5;
  var _Symbol$for22;
  function _classPrivateFieldLooseBase7(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id7 = 0;
  function _classPrivateFieldLooseKey7(name) {
    return "__private_" + id7++ + "_" + name;
  }
  var _queued = /* @__PURE__ */ _classPrivateFieldLooseKey7("queued");
  var _emitter2 = /* @__PURE__ */ _classPrivateFieldLooseKey7("emitter");
  var _isOpen = /* @__PURE__ */ _classPrivateFieldLooseKey7("isOpen");
  var _socket = /* @__PURE__ */ _classPrivateFieldLooseKey7("socket");
  var _handleMessage = /* @__PURE__ */ _classPrivateFieldLooseKey7("handleMessage");
  _Symbol$for5 = Symbol.for("uppy test: getSocket");
  _Symbol$for22 = Symbol.for("uppy test: getQueued");
  var UppySocket = class {
    constructor(opts) {
      Object.defineProperty(this, _queued, {
        writable: true,
        value: []
      });
      Object.defineProperty(this, _emitter2, {
        writable: true,
        value: (0, import_namespace_emitter2.default)()
      });
      Object.defineProperty(this, _isOpen, {
        writable: true,
        value: false
      });
      Object.defineProperty(this, _socket, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _handleMessage, {
        writable: true,
        value: (e4) => {
          try {
            const message = JSON.parse(e4.data);
            this.emit(message.action, message.payload);
          } catch (err) {
            console.log(err);
          }
        }
      });
      this.opts = opts;
      if (!opts || opts.autoOpen !== false) {
        this.open();
      }
    }
    get isOpen() {
      return _classPrivateFieldLooseBase7(this, _isOpen)[_isOpen];
    }
    [_Symbol$for5]() {
      return _classPrivateFieldLooseBase7(this, _socket)[_socket];
    }
    [_Symbol$for22]() {
      return _classPrivateFieldLooseBase7(this, _queued)[_queued];
    }
    open() {
      _classPrivateFieldLooseBase7(this, _socket)[_socket] = new WebSocket(this.opts.target);
      _classPrivateFieldLooseBase7(this, _socket)[_socket].onopen = () => {
        _classPrivateFieldLooseBase7(this, _isOpen)[_isOpen] = true;
        while (_classPrivateFieldLooseBase7(this, _queued)[_queued].length > 0 && _classPrivateFieldLooseBase7(this, _isOpen)[_isOpen]) {
          const first = _classPrivateFieldLooseBase7(this, _queued)[_queued].shift();
          this.send(first.action, first.payload);
        }
      };
      _classPrivateFieldLooseBase7(this, _socket)[_socket].onclose = () => {
        _classPrivateFieldLooseBase7(this, _isOpen)[_isOpen] = false;
      };
      _classPrivateFieldLooseBase7(this, _socket)[_socket].onmessage = _classPrivateFieldLooseBase7(this, _handleMessage)[_handleMessage];
    }
    close() {
      var _classPrivateFieldLoo;
      (_classPrivateFieldLoo = _classPrivateFieldLooseBase7(this, _socket)[_socket]) == null ? void 0 : _classPrivateFieldLoo.close();
    }
    send(action, payload) {
      if (!_classPrivateFieldLooseBase7(this, _isOpen)[_isOpen]) {
        _classPrivateFieldLooseBase7(this, _queued)[_queued].push({
          action,
          payload
        });
        return;
      }
      _classPrivateFieldLooseBase7(this, _socket)[_socket].send(JSON.stringify({
        action,
        payload
      }));
    }
    on(action, handler) {
      _classPrivateFieldLooseBase7(this, _emitter2)[_emitter2].on(action, handler);
    }
    emit(action, payload) {
      _classPrivateFieldLooseBase7(this, _emitter2)[_emitter2].emit(action, payload);
    }
    once(action, handler) {
      _classPrivateFieldLooseBase7(this, _emitter2)[_emitter2].once(action, handler);
    }
  };

  // ../packages/@uppy/provider-views/lib/ProviderView/AuthView.js
  function GoogleIcon() {
    return h("svg", {
      width: "26",
      height: "26",
      viewBox: "0 0 26 26",
      xmlns: "http://www.w3.org/2000/svg"
    }, h("g", {
      fill: "none",
      "fill-rule": "evenodd"
    }, h("circle", {
      fill: "#FFF",
      cx: "13",
      cy: "13",
      r: "13"
    }), h("path", {
      d: "M21.64 13.205c0-.639-.057-1.252-.164-1.841H13v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",
      fill: "#4285F4",
      "fill-rule": "nonzero"
    }), h("path", {
      d: "M13 22c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H4.957v2.332A8.997 8.997 0 0013 22z",
      fill: "#34A853",
      "fill-rule": "nonzero"
    }), h("path", {
      d: "M7.964 14.71A5.41 5.41 0 017.682 13c0-.593.102-1.17.282-1.71V8.958H4.957A8.996 8.996 0 004 13c0 1.452.348 2.827.957 4.042l3.007-2.332z",
      fill: "#FBBC05",
      "fill-rule": "nonzero"
    }), h("path", {
      d: "M13 7.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C17.463 4.891 15.426 4 13 4a8.997 8.997 0 00-8.043 4.958l3.007 2.332C8.672 9.163 10.656 7.58 13 7.58z",
      fill: "#EA4335",
      "fill-rule": "nonzero"
    }), h("path", {
      d: "M4 4h18v18H4z"
    })));
  }
  function AuthView(props) {
    const {
      pluginName,
      pluginIcon,
      i18nArray,
      handleAuth
    } = props;
    const isGoogleDrive = pluginName === "Google Drive";
    const pluginNameComponent = h("span", {
      className: "uppy-Provider-authTitleName"
    }, pluginName, h("br", null));
    return h("div", {
      className: "uppy-Provider-auth"
    }, h("div", {
      className: "uppy-Provider-authIcon"
    }, pluginIcon()), h("div", {
      className: "uppy-Provider-authTitle"
    }, i18nArray("authenticateWithTitle", {
      pluginName: pluginNameComponent
    })), isGoogleDrive ? h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn uppy-Provider-btn-google",
      onClick: handleAuth,
      "data-uppy-super-focusable": true
    }, h(GoogleIcon, null), i18nArray("signInWithGoogle")) : h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
      onClick: handleAuth,
      "data-uppy-super-focusable": true
    }, i18nArray("authenticateWith", {
      pluginName
    })));
  }
  var AuthView_default = AuthView;

  // ../packages/@uppy/provider-views/lib/ProviderView/User.js
  var User_default = (_ref) => {
    let {
      i18n,
      logout,
      username
    } = _ref;
    return [h("span", {
      className: "uppy-ProviderBrowser-user",
      key: "username"
    }, username), h("button", {
      type: "button",
      onClick: logout,
      className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-userLogout",
      key: "logout"
    }, i18n("logOut"))];
  };

  // ../packages/@uppy/provider-views/lib/Breadcrumbs.js
  var Breadcrumb = (props) => {
    const {
      getFolder,
      title,
      isLast
    } = props;
    return h(p, null, h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn",
      onClick: getFolder
    }, title), !isLast ? " / " : "");
  };
  var Breadcrumbs_default = (props) => {
    const {
      getFolder,
      title,
      breadcrumbsIcon,
      directories
    } = props;
    return h("div", {
      className: "uppy-Provider-breadcrumbs"
    }, h("div", {
      className: "uppy-Provider-breadcrumbsIcon"
    }, breadcrumbsIcon), directories.map((directory, i4) => h(Breadcrumb, {
      key: directory.id,
      getFolder: () => getFolder(directory.id),
      title: i4 === 0 ? title : directory.title,
      isLast: i4 + 1 === directories.length
    })));
  };

  // ../packages/@uppy/provider-views/lib/ProviderView/Header.js
  var Header_default = (props) => {
    const components = [];
    if (props.showBreadcrumbs) {
      components.push(Breadcrumbs_default({
        getFolder: props.getFolder,
        directories: props.directories,
        breadcrumbsIcon: props.pluginIcon && props.pluginIcon(),
        title: props.title
      }));
    }
    components.push(User_default({
      logout: props.logout,
      username: props.username,
      i18n: props.i18n
    }));
    return components;
  };

  // ../packages/@uppy/provider-views/lib/Browser.js
  var import_classnames11 = __toESM(require_classnames(), 1);

  // ../packages/@uppy/utils/lib/remoteFileObjToLocal.js
  function remoteFileObjToLocal(file) {
    return {
      ...file,
      type: file.mimeType,
      extension: file.name ? getFileNameAndExtension(file.name).extension : null
    };
  }

  // ../packages/@uppy/provider-views/lib/Filter.js
  var Filter = class extends d {
    constructor(props) {
      super(props);
      this.preventEnterPress = this.preventEnterPress.bind(this);
    }
    preventEnterPress(ev) {
      if (ev.keyCode === 13) {
        ev.stopPropagation();
        ev.preventDefault();
      }
    }
    render() {
      const {
        i18n,
        filterInput,
        filterQuery
      } = this.props;
      return h("div", {
        className: "uppy-ProviderBrowser-filter"
      }, h("input", {
        className: "uppy-u-reset uppy-ProviderBrowser-filterInput",
        type: "text",
        placeholder: i18n("filter"),
        "aria-label": i18n("filter"),
        onKeyUp: this.preventEnterPress,
        onKeyDown: this.preventEnterPress,
        onKeyPress: this.preventEnterPress,
        onInput: (e4) => filterQuery(e4),
        value: filterInput
      }), h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon uppy-ProviderBrowser-filterIcon",
        width: "12",
        height: "12",
        viewBox: "0 0 12 12"
      }, h("path", {
        d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
      })), filterInput && h("button", {
        className: "uppy-u-reset uppy-ProviderBrowser-filterClose",
        type: "button",
        "aria-label": i18n("resetFilter"),
        title: i18n("resetFilter"),
        onClick: filterQuery
      }, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        viewBox: "0 0 19 19"
      }, h("path", {
        d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z"
      }))));
    }
  };

  // ../packages/@uppy/provider-views/lib/FooterActions.js
  var FooterActions_default = (_ref) => {
    let {
      cancel,
      done,
      i18n,
      selected
    } = _ref;
    return h("div", {
      className: "uppy-ProviderBrowser-footer"
    }, h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
      onClick: done,
      type: "button"
    }, i18n("selectX", {
      smart_count: selected
    })), h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
      onClick: cancel,
      type: "button"
    }, i18n("cancel")));
  };

  // ../packages/@uppy/provider-views/lib/Item/index.js
  var import_classnames10 = __toESM(require_classnames(), 1);

  // ../packages/@uppy/provider-views/lib/Item/components/ItemIcon.js
  function FileIcon() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: 11,
      height: 14.5,
      viewBox: "0 0 44 58"
    }, h("path", {
      d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z"
    }));
  }
  function FolderIcon() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      style: {
        minWidth: 16,
        marginRight: 3
      },
      viewBox: "0 0 276.157 276.157"
    }, h("path", {
      d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z"
    }));
  }
  function VideoIcon() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      style: {
        width: 16,
        marginRight: 4
      },
      viewBox: "0 0 58 58"
    }, h("path", {
      d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z"
    }), h("path", {
      d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"
    }));
  }
  var ItemIcon_default = (props) => {
    const {
      itemIconString
    } = props;
    if (itemIconString === null)
      return void 0;
    switch (itemIconString) {
      case "file":
        return h(FileIcon, null);
      case "folder":
        return h(FolderIcon, null);
      case "video":
        return h(VideoIcon, null);
      default: {
        const {
          alt
        } = props;
        return h("img", {
          src: itemIconString,
          alt
        });
      }
    }
  };

  // ../packages/@uppy/provider-views/lib/Item/components/GridLi.js
  function GridListItem(props) {
    const {
      className,
      isDisabled,
      restrictionError,
      isChecked,
      title,
      itemIconEl,
      showTitles,
      toggleCheckbox,
      recordShiftKeyPress,
      id: id18,
      children
    } = props;
    return h("li", {
      className,
      title: isDisabled ? restrictionError == null ? void 0 : restrictionError.message : null
    }, h("input", {
      type: "checkbox",
      className: `uppy-u-reset uppy-ProviderBrowserItem-checkbox ${isChecked ? "uppy-ProviderBrowserItem-checkbox--is-checked" : ""} uppy-ProviderBrowserItem-checkbox--grid`,
      onChange: toggleCheckbox,
      onKeyDown: recordShiftKeyPress,
      name: "listitem",
      id: id18,
      checked: isChecked,
      disabled: isDisabled,
      "data-uppy-super-focusable": true
    }), h("label", {
      htmlFor: id18,
      "aria-label": title,
      className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
    }, h("span", {
      className: "uppy-ProviderBrowserItem-inner-relative"
    }, itemIconEl, showTitles && title, children)));
  }
  var GridLi_default = GridListItem;

  // ../packages/@uppy/provider-views/lib/Item/components/ListLi.js
  function ListItem(props) {
    const {
      className,
      isDisabled,
      restrictionError,
      isCheckboxDisabled,
      isChecked,
      toggleCheckbox,
      recordShiftKeyPress,
      type,
      id: id18,
      itemIconEl,
      title,
      handleFolderClick,
      showTitles,
      i18n
    } = props;
    return h("li", {
      className,
      title: isDisabled ? restrictionError == null ? void 0 : restrictionError.message : null
    }, !isCheckboxDisabled ? h("input", {
      type: "checkbox",
      className: `uppy-u-reset uppy-ProviderBrowserItem-checkbox ${isChecked ? "uppy-ProviderBrowserItem-checkbox--is-checked" : ""}`,
      onChange: toggleCheckbox,
      onKeyDown: recordShiftKeyPress,
      name: "listitem",
      id: id18,
      checked: isChecked,
      "aria-label": type === "file" ? null : i18n("allFilesFromFolderNamed", {
        name: title
      }),
      disabled: isDisabled,
      "data-uppy-super-focusable": true
    }) : null, type === "file" ? h("label", {
      htmlFor: id18,
      className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
    }, h("div", {
      className: "uppy-ProviderBrowserItem-iconWrap"
    }, itemIconEl), showTitles && title) : h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
      onClick: handleFolderClick,
      "aria-label": i18n("openFolderNamed", {
        name: title
      })
    }, h("div", {
      className: "uppy-ProviderBrowserItem-iconWrap"
    }, itemIconEl), showTitles && h("span", null, title)));
  }
  var ListLi_default = ListItem;

  // ../packages/@uppy/provider-views/lib/Item/index.js
  function _extends4() {
    _extends4 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends4.apply(this, arguments);
  }
  var Item_default = (props) => {
    const {
      author,
      getItemIcon,
      isChecked,
      isDisabled,
      viewType
    } = props;
    const itemIconString = getItemIcon();
    const className = (0, import_classnames10.default)("uppy-ProviderBrowserItem", {
      "uppy-ProviderBrowserItem--selected": isChecked
    }, {
      "uppy-ProviderBrowserItem--disabled": isDisabled
    }, {
      "uppy-ProviderBrowserItem--noPreview": itemIconString === "video"
    });
    const itemIconEl = h(ItemIcon_default, {
      itemIconString
    });
    switch (viewType) {
      case "grid":
        return h(
          GridLi_default,
          _extends4({}, props, {
            className,
            itemIconEl
          })
        );
      case "list":
        return h(ListLi_default, _extends4({}, props, {
          className,
          itemIconEl
        }));
      case "unsplash":
        return h(GridLi_default, _extends4({}, props, {
          className,
          itemIconEl
        }), h("a", {
          href: `${author.url}?utm_source=Companion&utm_medium=referral`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "uppy-ProviderBrowserItem-author"
        }, author.name));
      default:
        throw new Error(`There is no such type ${viewType}`);
    }
  };

  // ../packages/@uppy/provider-views/lib/Browser.js
  var VIRTUAL_SHARED_DIR = "shared-with-me";
  function Browser(props) {
    const {
      currentSelection,
      folders,
      files,
      uppyFiles,
      viewType,
      headerComponent,
      showBreadcrumbs,
      isChecked,
      toggleCheckbox,
      recordShiftKeyPress,
      handleScroll,
      showTitles,
      i18n,
      validateRestrictions,
      showFilter,
      filterQuery,
      filterInput,
      getNextFolder,
      cancel,
      done,
      columns
    } = props;
    const selected = currentSelection.length;
    return h("div", {
      className: (0, import_classnames11.default)("uppy-ProviderBrowser", `uppy-ProviderBrowser-viewType--${viewType}`)
    }, h("div", {
      className: "uppy-ProviderBrowser-header"
    }, h("div", {
      className: (0, import_classnames11.default)("uppy-ProviderBrowser-headerBar", !showBreadcrumbs && "uppy-ProviderBrowser-headerBar--simple")
    }, headerComponent)), showFilter && h(Filter, {
      i18n,
      filterQuery,
      filterInput
    }), (() => {
      if (!folders.length && !files.length) {
        return h("div", {
          className: "uppy-Provider-empty"
        }, i18n("noFilesFound"));
      }
      return h("div", {
        className: "uppy-ProviderBrowser-body"
      }, h("ul", {
        className: "uppy-ProviderBrowser-list",
        onScroll: handleScroll,
        role: "listbox",
        tabIndex: "-1"
      }, folders.map((folder) => {
        var _isChecked;
        return Item_default({
          columns,
          showTitles,
          viewType,
          i18n,
          id: folder.id,
          title: folder.name,
          getItemIcon: () => folder.icon,
          isChecked: isChecked(folder),
          toggleCheckbox: (event) => toggleCheckbox(event, folder),
          recordShiftKeyPress,
          type: "folder",
          isDisabled: (_isChecked = isChecked(folder)) == null ? void 0 : _isChecked.loading,
          isCheckboxDisabled: folder.id === VIRTUAL_SHARED_DIR,
          handleFolderClick: () => getNextFolder(folder)
        });
      }), files.map((file) => {
        const restrictionError = validateRestrictions(remoteFileObjToLocal(file), [...uppyFiles, ...currentSelection]);
        return Item_default({
          id: file.id,
          title: file.name,
          author: file.author,
          getItemIcon: () => file.icon,
          isChecked: isChecked(file),
          toggleCheckbox: (event) => toggleCheckbox(event, file),
          recordShiftKeyPress,
          columns,
          showTitles,
          viewType,
          i18n,
          type: "file",
          isDisabled: restrictionError && !isChecked(file),
          restrictionError
        });
      })));
    })(), selected > 0 && h(FooterActions_default, {
      selected,
      done,
      cancel,
      i18n
    }));
  }
  var Browser_default = Browser;

  // ../packages/@uppy/provider-views/lib/Loader.js
  var Loader_default = (_ref) => {
    let {
      i18n
    } = _ref;
    return h("div", {
      className: "uppy-Provider-loading"
    }, h("span", null, i18n("loading")));
  };

  // ../packages/@uppy/provider-views/lib/CloseWrapper.js
  var CloseWrapper = class extends d {
    componentWillUnmount() {
      const {
        onUnmount
      } = this.props;
      onUnmount();
    }
    render() {
      const {
        children
      } = this.props;
      return x(children)[0];
    }
  };

  // ../packages/@uppy/provider-views/lib/SharedHandler.js
  var SharedHandler = class {
    constructor(plugin) {
      this.plugin = plugin;
      this.filterItems = this.filterItems.bind(this);
      this.toggleCheckbox = this.toggleCheckbox.bind(this);
      this.recordShiftKeyPress = this.recordShiftKeyPress.bind(this);
      this.isChecked = this.isChecked.bind(this);
      this.loaderWrapper = this.loaderWrapper.bind(this);
    }
    filterItems(items) {
      const state = this.plugin.getPluginState();
      if (!state.filterInput || state.filterInput === "") {
        return items;
      }
      return items.filter((folder) => {
        return folder.name.toLowerCase().indexOf(state.filterInput.toLowerCase()) !== -1;
      });
    }
    recordShiftKeyPress(e4) {
      this.isShiftKeyPressed = e4.shiftKey;
    }
    toggleCheckbox(e4, file) {
      e4.stopPropagation();
      e4.preventDefault();
      e4.currentTarget.focus();
      const {
        folders,
        files
      } = this.plugin.getPluginState();
      const items = this.filterItems(folders.concat(files));
      if (this.lastCheckbox && this.isShiftKeyPressed) {
        const prevIndex = items.indexOf(this.lastCheckbox);
        const currentIndex = items.indexOf(file);
        const currentSelection2 = prevIndex < currentIndex ? items.slice(prevIndex, currentIndex + 1) : items.slice(currentIndex, prevIndex + 1);
        const reducedCurrentSelection = [];
        for (const item of currentSelection2) {
          const {
            uppy
          } = this.plugin;
          const restrictionError = uppy.validateRestrictions(remoteFileObjToLocal(item), [...uppy.getFiles(), ...reducedCurrentSelection]);
          if (!restrictionError) {
            reducedCurrentSelection.push(item);
          } else {
            uppy.info({
              message: restrictionError.message
            }, "error", uppy.opts.infoTimeout);
          }
        }
        this.plugin.setPluginState({
          currentSelection: reducedCurrentSelection
        });
        return;
      }
      this.lastCheckbox = file;
      const {
        currentSelection
      } = this.plugin.getPluginState();
      if (this.isChecked(file)) {
        this.plugin.setPluginState({
          currentSelection: currentSelection.filter((item) => item.id !== file.id)
        });
      } else {
        this.plugin.setPluginState({
          currentSelection: currentSelection.concat([file])
        });
      }
    }
    isChecked(file) {
      const {
        currentSelection
      } = this.plugin.getPluginState();
      return currentSelection.some((item) => item.id === file.id);
    }
    loaderWrapper(promise, then, catch_) {
      promise.then((result2) => {
        this.plugin.setPluginState({
          loading: false
        });
        then(result2);
      }).catch((err) => {
        this.plugin.setPluginState({
          loading: false
        });
        catch_(err);
      });
      this.plugin.setPluginState({
        loading: true
      });
    }
  };

  // ../packages/@uppy/provider-views/lib/View.js
  var View = class {
    constructor(plugin, opts) {
      this.plugin = plugin;
      this.provider = opts.provider;
      this.sharedHandler = new SharedHandler(plugin);
      this.isHandlingScroll = false;
      this.preFirstRender = this.preFirstRender.bind(this);
      this.handleError = this.handleError.bind(this);
      this.addFile = this.addFile.bind(this);
      this.clearSelection = this.clearSelection.bind(this);
      this.cancelPicking = this.cancelPicking.bind(this);
    }
    providerFileToId(file) {
      return generateFileID({
        data: file,
        name: file.name || file.id,
        type: file.mimetype
      });
    }
    preFirstRender() {
      this.plugin.setPluginState({
        didFirstRender: true
      });
      this.plugin.onFirstRender();
    }
    shouldHandleScroll(event) {
      const {
        scrollHeight,
        scrollTop,
        offsetHeight
      } = event.target;
      const scrollPosition = scrollHeight - (scrollTop + offsetHeight);
      return scrollPosition < 50 && !this.isHandlingScroll;
    }
    clearSelection() {
      this.plugin.setPluginState({
        currentSelection: [],
        filterInput: ""
      });
    }
    cancelPicking() {
      this.clearSelection();
      const dashboard = this.plugin.uppy.getPlugin("Dashboard");
      if (dashboard) {
        dashboard.hideAllPanels();
      }
    }
    handleError(error) {
      const {
        uppy
      } = this.plugin;
      const message = uppy.i18n("companionError");
      uppy.log(error.toString());
      if (error.isAuthError) {
        return;
      }
      uppy.info({
        message,
        details: error.toString()
      }, "error", 5e3);
    }
    addFile(file) {
      const tagFile = {
        id: this.providerFileToId(file),
        source: this.plugin.id,
        data: file,
        name: file.name || file.id,
        type: file.mimeType,
        isRemote: true,
        meta: {},
        body: {
          fileId: file.id
        },
        remote: {
          companionUrl: this.plugin.opts.companionUrl,
          url: `${this.provider.fileUrl(file.requestPath)}`,
          body: {
            fileId: file.id
          },
          providerOptions: this.provider.opts,
          providerName: this.provider.name
        }
      };
      const fileType = getFileType(tagFile);
      if (fileType && isPreviewSupported(fileType)) {
        tagFile.preview = file.thumbnail;
      }
      if (file.author) {
        if (file.author.name != null)
          tagFile.meta.authorName = String(file.author.name);
        if (file.author.url)
          tagFile.meta.authorUrl = file.author.url;
      }
      this.plugin.uppy.log("Adding remote file");
      try {
        this.plugin.uppy.addFile(tagFile);
        return true;
      } catch (err) {
        if (!err.isRestriction) {
          this.plugin.uppy.log(err);
        }
        return false;
      }
    }
  };

  // ../packages/@uppy/provider-views/lib/ProviderView/ProviderView.js
  function _classPrivateFieldLooseBase8(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id8 = 0;
  function _classPrivateFieldLooseKey8(name) {
    return "__private_" + id8++ + "_" + name;
  }
  var packageJson8 = {
    "version": "3.1.0"
  };
  function getOrigin() {
    return location.origin;
  }
  function getRegex(value) {
    if (typeof value === "string") {
      return new RegExp(`^${value}$`);
    }
    if (value instanceof RegExp) {
      return value;
    }
    return void 0;
  }
  function isOriginAllowed(origin, allowedOrigin) {
    const patterns = Array.isArray(allowedOrigin) ? allowedOrigin.map(getRegex) : [getRegex(allowedOrigin)];
    return patterns.some((pattern) => (pattern == null ? void 0 : pattern.test(origin)) || (pattern == null ? void 0 : pattern.test(`${origin}/`)));
  }
  var _updateFilesAndFolders = /* @__PURE__ */ _classPrivateFieldLooseKey8("updateFilesAndFolders");
  var ProviderView = class extends View {
    constructor(plugin, opts) {
      super(plugin, opts);
      Object.defineProperty(this, _updateFilesAndFolders, {
        value: _updateFilesAndFolders2
      });
      const defaultOptions4 = {
        viewType: "list",
        showTitles: true,
        showFilter: true,
        showBreadcrumbs: true
      };
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      this.filterQuery = this.filterQuery.bind(this);
      this.getFolder = this.getFolder.bind(this);
      this.getNextFolder = this.getNextFolder.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuth = this.handleAuth.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.listAllFiles = this.listAllFiles.bind(this);
      this.donePicking = this.donePicking.bind(this);
      this.render = this.render.bind(this);
      this.plugin.setPluginState({
        authenticated: false,
        files: [],
        folders: [],
        directories: [],
        filterInput: "",
        isSearchVisible: false,
        currentSelection: []
      });
    }
    tearDown() {
    }
    getFolder(id18, name) {
      return this.sharedHandler.loaderWrapper(this.provider.list(id18), (res) => {
        const folders = [];
        const files = [];
        let updatedDirectories;
        const state = this.plugin.getPluginState();
        const index = state.directories.findIndex((dir) => id18 === dir.id);
        if (index !== -1) {
          updatedDirectories = state.directories.slice(0, index + 1);
        } else {
          updatedDirectories = state.directories.concat([{
            id: id18,
            title: name
          }]);
        }
        this.username = res.username || this.username;
        _classPrivateFieldLooseBase8(this, _updateFilesAndFolders)[_updateFilesAndFolders](res, files, folders);
        this.plugin.setPluginState({
          directories: updatedDirectories,
          filterInput: ""
        });
      }, this.handleError);
    }
    getNextFolder(folder) {
      this.getFolder(folder.requestPath, folder.name);
      this.lastCheckbox = void 0;
    }
    logout() {
      this.provider.logout().then((res) => {
        if (res.ok) {
          if (!res.revoked) {
            const message = this.plugin.uppy.i18n("companionUnauthorizeHint", {
              provider: this.plugin.title,
              url: res.manual_revoke_url
            });
            this.plugin.uppy.info(message, "info", 7e3);
          }
          const newState = {
            authenticated: false,
            files: [],
            folders: [],
            directories: [],
            filterInput: ""
          };
          this.plugin.setPluginState(newState);
        }
      }).catch(this.handleError);
    }
    filterQuery(e4) {
      const state = this.plugin.getPluginState();
      this.plugin.setPluginState({
        ...state,
        filterInput: e4 ? e4.target.value : ""
      });
    }
    addFolder(folder) {
      const folderId = this.providerFileToId(folder);
      const folders = {
        ...this.plugin.getPluginState().selectedFolders
      };
      if (folderId in folders && folders[folderId].loading) {
        return;
      }
      folders[folderId] = {
        loading: true,
        files: []
      };
      this.plugin.setPluginState({
        selectedFolders: {
          ...folders
        }
      });
      return this.listAllFiles(folder.requestPath).then((files) => {
        let count = 0;
        files.forEach((file) => {
          const id18 = this.providerFileToId(file);
          if (!this.plugin.uppy.checkIfFileAlreadyExists(id18)) {
            count++;
          }
        });
        if (count > 0) {
          files.forEach((file) => this.addFile(file));
        }
        const ids = files.map(this.providerFileToId);
        folders[folderId] = {
          loading: false,
          files: ids
        };
        this.plugin.setPluginState({
          selectedFolders: folders,
          filterInput: ""
        });
        let message;
        if (count === 0) {
          message = this.plugin.uppy.i18n("folderAlreadyAdded", {
            folder: folder.name
          });
        } else if (files.length) {
          message = this.plugin.uppy.i18n("folderAdded", {
            smart_count: count,
            folder: folder.name
          });
        } else {
          message = this.plugin.uppy.i18n("emptyFolderAdded");
        }
        this.plugin.uppy.info(message);
      }).catch((e4) => {
        const selectedFolders = {
          ...this.plugin.getPluginState().selectedFolders
        };
        delete selectedFolders[folderId];
        this.plugin.setPluginState({
          selectedFolders
        });
        this.handleError(e4);
      });
    }
    async handleAuth() {
      await this.provider.ensurePreAuth();
      const authState = btoa(JSON.stringify({
        origin: getOrigin()
      }));
      const clientVersion = `@uppy/provider-views=${ProviderView.VERSION}`;
      const link = this.provider.authUrl({
        state: authState,
        uppyVersions: clientVersion
      });
      const authWindow = window.open(link, "_blank");
      const handleToken = (e4) => {
        if (e4.source !== authWindow) {
          this.plugin.uppy.log("rejecting event from unknown source");
          return;
        }
        if (!isOriginAllowed(e4.origin, this.plugin.opts.companionAllowedHosts) || e4.source !== authWindow) {
          this.plugin.uppy.log(`rejecting event from ${e4.origin} vs allowed pattern ${this.plugin.opts.companionAllowedHosts}`);
        }
        const data = typeof e4.data === "string" ? JSON.parse(e4.data) : e4.data;
        if (data.error) {
          this.plugin.uppy.log("auth aborted", "warning");
          const {
            uppy
          } = this.plugin;
          const message = uppy.i18n("authAborted");
          uppy.info({
            message
          }, "warning", 5e3);
          return;
        }
        if (!data.token) {
          this.plugin.uppy.log("did not receive token from auth window", "error");
          return;
        }
        authWindow.close();
        window.removeEventListener("message", handleToken);
        this.provider.setAuthToken(data.token);
        this.preFirstRender();
      };
      window.addEventListener("message", handleToken);
    }
    async handleScroll(event) {
      const path = this.nextPagePath || null;
      if (this.shouldHandleScroll(event) && path) {
        this.isHandlingScroll = true;
        try {
          const response = await this.provider.list(path);
          const {
            files,
            folders
          } = this.plugin.getPluginState();
          _classPrivateFieldLooseBase8(this, _updateFilesAndFolders)[_updateFilesAndFolders](response, files, folders);
        } catch (error) {
          this.handleError(error);
        } finally {
          this.isHandlingScroll = false;
        }
      }
    }
    async listAllFiles(path, files) {
      if (files === void 0) {
        files = null;
      }
      files = files || [];
      const res = await this.provider.list(path);
      res.items.forEach((item) => {
        if (!item.isFolder) {
          files.push(item);
        } else {
          this.addFolder(item);
        }
      });
      const moreFiles = res.nextPagePath;
      if (moreFiles) {
        return this.listAllFiles(moreFiles, files);
      }
      return files;
    }
    donePicking() {
      const {
        currentSelection
      } = this.plugin.getPluginState();
      const promises = currentSelection.map((file) => {
        if (file.isFolder) {
          return this.addFolder(file);
        }
        return this.addFile(file);
      });
      this.sharedHandler.loaderWrapper(Promise.all(promises), () => {
        this.clearSelection();
      }, () => {
      });
    }
    render(state, viewOptions) {
      var _this = this;
      if (viewOptions === void 0) {
        viewOptions = {};
      }
      const {
        authenticated,
        didFirstRender
      } = this.plugin.getPluginState();
      if (!didFirstRender) {
        this.preFirstRender();
      }
      const targetViewOptions = {
        ...this.opts,
        ...viewOptions
      };
      const {
        files,
        folders,
        filterInput,
        loading,
        currentSelection
      } = this.plugin.getPluginState();
      const {
        isChecked,
        toggleCheckbox,
        recordShiftKeyPress,
        filterItems
      } = this.sharedHandler;
      const hasInput = filterInput !== "";
      const headerProps = {
        showBreadcrumbs: targetViewOptions.showBreadcrumbs,
        getFolder: this.getFolder,
        directories: this.plugin.getPluginState().directories,
        pluginIcon: this.plugin.icon,
        title: this.plugin.title,
        logout: this.logout,
        username: this.username,
        i18n: this.plugin.uppy.i18n
      };
      const browserProps = {
        isChecked,
        toggleCheckbox,
        recordShiftKeyPress,
        currentSelection,
        files: hasInput ? filterItems(files) : files,
        folders: hasInput ? filterItems(folders) : folders,
        username: this.username,
        getNextFolder: this.getNextFolder,
        getFolder: this.getFolder,
        filterItems: this.sharedHandler.filterItems,
        filterQuery: this.filterQuery,
        logout: this.logout,
        handleScroll: this.handleScroll,
        listAllFiles: this.listAllFiles,
        done: this.donePicking,
        cancel: this.cancelPicking,
        headerComponent: Header_default(headerProps),
        title: this.plugin.title,
        viewType: targetViewOptions.viewType,
        showTitles: targetViewOptions.showTitles,
        showFilter: targetViewOptions.showFilter,
        showBreadcrumbs: targetViewOptions.showBreadcrumbs,
        pluginIcon: this.plugin.icon,
        i18n: this.plugin.uppy.i18n,
        uppyFiles: this.plugin.uppy.getFiles(),
        validateRestrictions: function() {
          return _this.plugin.uppy.validateRestrictions(...arguments);
        }
      };
      if (loading) {
        return h(CloseWrapper, {
          onUnmount: this.clearSelection
        }, h(Loader_default, {
          i18n: this.plugin.uppy.i18n
        }));
      }
      if (!authenticated) {
        return h(CloseWrapper, {
          onUnmount: this.clearSelection
        }, h(AuthView_default, {
          pluginName: this.plugin.title,
          pluginIcon: this.plugin.icon,
          handleAuth: this.handleAuth,
          i18n: this.plugin.uppy.i18n,
          i18nArray: this.plugin.uppy.i18nArray
        }));
      }
      return h(CloseWrapper, {
        onUnmount: this.clearSelection
      }, h(Browser_default, browserProps));
    }
  };
  function _updateFilesAndFolders2(res, files, folders) {
    this.nextPagePath = res.nextPagePath;
    res.items.forEach((item) => {
      if (item.isFolder) {
        folders.push(item);
      } else {
        files.push(item);
      }
    });
    this.plugin.setPluginState({
      folders,
      files
    });
  }
  ProviderView.VERSION = packageJson8.version;

  // ../packages/@uppy/provider-views/lib/SearchProviderView/InputView.js
  var InputView_default = (_ref) => {
    let {
      i18n,
      search
    } = _ref;
    let input;
    const validateAndSearch = () => {
      if (input.value) {
        search(input.value);
      }
    };
    const handleKeyPress = (ev) => {
      if (ev.keyCode === 13) {
        validateAndSearch();
      }
    };
    return h("div", {
      className: "uppy-SearchProvider"
    }, h("input", {
      className: "uppy-u-reset uppy-c-textInput uppy-SearchProvider-input",
      type: "search",
      "aria-label": i18n("enterTextToSearch"),
      placeholder: i18n("enterTextToSearch"),
      onKeyUp: handleKeyPress,
      ref: (input_) => {
        input = input_;
      },
      "data-uppy-super-focusable": true
    }), h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-SearchProvider-searchButton",
      type: "button",
      onClick: validateAndSearch
    }, i18n("searchImages")));
  };

  // ../packages/@uppy/provider-views/lib/SearchProviderView/Header.js
  var SUBMIT_KEY = 13;
  var Header_default2 = (props) => {
    const {
      searchTerm,
      i18n,
      search
    } = props;
    const handleKeyPress = (ev) => {
      if (ev.keyCode === SUBMIT_KEY) {
        ev.stopPropagation();
        ev.preventDefault();
        search(ev.target.value);
      }
    };
    return h("div", {
      class: "uppy-ProviderBrowser-search"
    }, h("input", {
      class: "uppy-u-reset uppy-ProviderBrowser-searchInput",
      type: "text",
      placeholder: i18n("search"),
      "aria-label": i18n("search"),
      value: searchTerm,
      onKeyUp: handleKeyPress,
      "data-uppy-super-focusable": true
    }), h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      class: "uppy-c-icon uppy-ProviderBrowser-searchIcon",
      width: "12",
      height: "12",
      viewBox: "0 0 12 12"
    }, h("path", {
      d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
    })));
  };

  // ../packages/@uppy/provider-views/lib/SearchProviderView/SearchProviderView.js
  function _classPrivateFieldLooseBase9(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id9 = 0;
  function _classPrivateFieldLooseKey9(name) {
    return "__private_" + id9++ + "_" + name;
  }
  var packageJson9 = {
    "version": "3.1.0"
  };
  var _updateFilesAndInputMode = /* @__PURE__ */ _classPrivateFieldLooseKey9("updateFilesAndInputMode");
  var SearchProviderView = class extends View {
    constructor(plugin, opts) {
      super(plugin, opts);
      Object.defineProperty(this, _updateFilesAndInputMode, {
        value: _updateFilesAndInputMode2
      });
      const defaultOptions4 = {
        viewType: "grid",
        showTitles: false,
        showFilter: false,
        showBreadcrumbs: false
      };
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      this.search = this.search.bind(this);
      this.triggerSearchInput = this.triggerSearchInput.bind(this);
      this.addFile = this.addFile.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.donePicking = this.donePicking.bind(this);
      this.render = this.render.bind(this);
      this.plugin.setPluginState({
        isInputMode: true,
        files: [],
        folders: [],
        directories: [],
        filterInput: "",
        currentSelection: [],
        searchTerm: null
      });
    }
    tearDown() {
    }
    clearSelection() {
      this.plugin.setPluginState({
        currentSelection: [],
        isInputMode: true,
        files: [],
        searchTerm: null
      });
    }
    search(query) {
      const {
        searchTerm
      } = this.plugin.getPluginState();
      if (query && query === searchTerm) {
        return void 0;
      }
      return this.sharedHandler.loaderWrapper(this.provider.search(query), (res) => {
        _classPrivateFieldLooseBase9(this, _updateFilesAndInputMode)[_updateFilesAndInputMode](res, []);
      }, this.handleError);
    }
    triggerSearchInput() {
      this.plugin.setPluginState({
        isInputMode: true
      });
    }
    async handleScroll(event) {
      const query = this.nextPageQuery || null;
      if (this.shouldHandleScroll(event) && query) {
        this.isHandlingScroll = true;
        try {
          const {
            files,
            searchTerm
          } = this.plugin.getPluginState();
          const response = await this.provider.search(searchTerm, query);
          _classPrivateFieldLooseBase9(this, _updateFilesAndInputMode)[_updateFilesAndInputMode](response, files);
        } catch (error) {
          this.handleError(error);
        } finally {
          this.isHandlingScroll = false;
        }
      }
    }
    donePicking() {
      const {
        currentSelection
      } = this.plugin.getPluginState();
      const promises = currentSelection.map((file) => this.addFile(file));
      this.sharedHandler.loaderWrapper(Promise.all(promises), () => {
        this.clearSelection();
      }, () => {
      });
    }
    render(state, viewOptions) {
      var _this = this;
      if (viewOptions === void 0) {
        viewOptions = {};
      }
      const {
        didFirstRender,
        isInputMode,
        searchTerm
      } = this.plugin.getPluginState();
      if (!didFirstRender) {
        this.preFirstRender();
      }
      const targetViewOptions = {
        ...this.opts,
        ...viewOptions
      };
      const {
        files,
        folders,
        filterInput,
        loading,
        currentSelection
      } = this.plugin.getPluginState();
      const {
        isChecked,
        toggleCheckbox,
        filterItems
      } = this.sharedHandler;
      const hasInput = filterInput !== "";
      const browserProps = {
        isChecked,
        toggleCheckbox,
        currentSelection,
        files: hasInput ? filterItems(files) : files,
        folders: hasInput ? filterItems(folders) : folders,
        handleScroll: this.handleScroll,
        done: this.donePicking,
        cancel: this.cancelPicking,
        headerComponent: Header_default2({
          search: this.search,
          i18n: this.plugin.uppy.i18n,
          searchTerm
        }),
        title: this.plugin.title,
        viewType: targetViewOptions.viewType,
        showTitles: targetViewOptions.showTitles,
        showFilter: targetViewOptions.showFilter,
        showBreadcrumbs: targetViewOptions.showBreadcrumbs,
        pluginIcon: this.plugin.icon,
        i18n: this.plugin.uppy.i18n,
        uppyFiles: this.plugin.uppy.getFiles(),
        validateRestrictions: function() {
          return _this.plugin.uppy.validateRestrictions(...arguments);
        }
      };
      if (loading) {
        return h(CloseWrapper, {
          onUnmount: this.clearSelection
        }, h(Loader_default, {
          i18n: this.plugin.uppy.i18n
        }));
      }
      if (isInputMode) {
        return h(CloseWrapper, {
          onUnmount: this.clearSelection
        }, h(InputView_default, {
          search: this.search,
          i18n: this.plugin.uppy.i18n
        }));
      }
      return h(CloseWrapper, {
        onUnmount: this.clearSelection
      }, h(Browser_default, browserProps));
    }
  };
  function _updateFilesAndInputMode2(res, files) {
    this.nextPageQuery = res.nextPageQuery;
    res.items.forEach((item) => {
      files.push(item);
    });
    this.plugin.setPluginState({
      isInputMode: false,
      files,
      searchTerm: res.searchedFor
    });
  }
  SearchProviderView.VERSION = packageJson9.version;

  // ../packages/@uppy/google-drive/lib/DriveProviderViews.js
  var DriveProviderViews = class extends ProviderView {
    toggleCheckbox(e4, file) {
      e4.stopPropagation();
      e4.preventDefault();
      if (!file.custom.isSharedDrive) {
        super.toggleCheckbox(e4, file);
      }
    }
  };

  // ../packages/@uppy/google-drive/lib/locale.js
  var locale_default5 = {
    strings: {
      pluginNameGoogleDrive: "Google Drive"
    }
  };

  // ../packages/@uppy/google-drive/lib/GoogleDrive.js
  var packageJson10 = {
    "version": "3.1.0"
  };
  var GoogleDrive = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.opts.id || "GoogleDrive";
      this.title = this.opts.title || "Google Drive";
      Provider.initPlugin(this, opts);
      this.title = this.opts.title || "Google Drive";
      this.icon = () => h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, h("g", {
        fillRule: "nonzero",
        fill: "none"
      }, h("path", {
        d: "M6.663 22.284l.97 1.62c.202.34.492.609.832.804l3.465-5.798H5c0 .378.1.755.302 1.096l1.361 2.278z",
        fill: "#0066DA"
      }), h("path", {
        d: "M16 12.09l-3.465-5.798c-.34.195-.63.463-.832.804l-6.4 10.718A2.15 2.15 0 005 18.91h6.93L16 12.09z",
        fill: "#00AC47"
      }), h("path", {
        d: "M23.535 24.708c.34-.195.63-.463.832-.804l.403-.67 1.928-3.228c.201-.34.302-.718.302-1.096h-6.93l1.474 2.802 1.991 2.996z",
        fill: "#EA4335"
      }), h("path", {
        d: "M16 12.09l3.465-5.798A2.274 2.274 0 0018.331 6h-4.662c-.403 0-.794.11-1.134.292L16 12.09z",
        fill: "#00832D"
      }), h("path", {
        d: "M20.07 18.91h-8.14l-3.465 5.798c.34.195.73.292 1.134.292h12.802c.403 0 .794-.11 1.134-.292L20.07 18.91z",
        fill: "#2684FC"
      }), h("path", {
        d: "M23.497 12.455l-3.2-5.359a2.252 2.252 0 00-.832-.804L16 12.09l4.07 6.82h6.917c0-.377-.1-.755-.302-1.096l-3.188-5.359z",
        fill: "#FFBA00"
      })));
      this.provider = new Provider(uppy, {
        companionUrl: this.opts.companionUrl,
        companionHeaders: this.opts.companionHeaders,
        companionKeysParams: this.opts.companionKeysParams,
        companionCookiesRule: this.opts.companionCookiesRule,
        provider: "drive",
        pluginId: this.id
      });
      this.defaultLocale = locale_default5;
      this.i18nInit();
      this.title = this.i18n("pluginNameGoogleDrive");
      this.onFirstRender = this.onFirstRender.bind(this);
      this.render = this.render.bind(this);
    }
    install() {
      this.view = new DriveProviderViews(this, {
        provider: this.provider
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.view.tearDown();
      this.unmount();
    }
    onFirstRender() {
      return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder("root", "/")]);
    }
    render(state) {
      return this.view.render(state);
    }
  };
  GoogleDrive.VERSION = packageJson10.version;

  // ../packages/@uppy/dropbox/lib/locale.js
  var locale_default6 = {
    strings: {
      pluginNameDropbox: "Dropbox"
    }
  };

  // ../packages/@uppy/dropbox/lib/Dropbox.js
  var packageJson11 = {
    "version": "3.1.0"
  };
  var Dropbox = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.opts.id || "Dropbox";
      Provider.initPlugin(this, opts);
      this.title = this.opts.title || "Dropbox";
      this.icon = () => h("svg", {
        className: "uppy-DashboardTab-iconDropbox",
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, h("path", {
        d: "M10.5 7.5L5 10.955l5.5 3.454 5.5-3.454 5.5 3.454 5.5-3.454L21.5 7.5 16 10.955zM10.5 21.319L5 17.864l5.5-3.455 5.5 3.455zM16 17.864l5.5-3.455 5.5 3.455-5.5 3.455zM16 25.925l-5.5-3.455 5.5-3.454 5.5 3.454z",
        fill: "currentcolor",
        fillRule: "nonzero"
      }));
      this.provider = new Provider(uppy, {
        companionUrl: this.opts.companionUrl,
        companionHeaders: this.opts.companionHeaders,
        companionKeysParams: this.opts.companionKeysParams,
        companionCookiesRule: this.opts.companionCookiesRule,
        provider: "dropbox",
        pluginId: this.id
      });
      this.defaultLocale = locale_default6;
      this.i18nInit();
      this.title = this.i18n("pluginNameDropbox");
      this.onFirstRender = this.onFirstRender.bind(this);
      this.render = this.render.bind(this);
    }
    install() {
      this.view = new ProviderView(this, {
        provider: this.provider
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.view.tearDown();
      this.unmount();
    }
    onFirstRender() {
      return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
    }
    render(state) {
      return this.view.render(state);
    }
  };
  Dropbox.VERSION = packageJson11.version;

  // ../packages/@uppy/instagram/lib/locale.js
  var locale_default7 = {
    strings: {
      pluginNameInstagram: "Instagram"
    }
  };

  // ../packages/@uppy/instagram/lib/Instagram.js
  var packageJson12 = {
    "version": "3.1.0"
  };
  var Instagram = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.opts.id || "Instagram";
      Provider.initPlugin(this, opts);
      this.icon = () => h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, h("defs", null, h("path", {
        d: "M16.825 5l.483-.001.799.002c1.168.005 1.598.021 2.407.057 1.17.05 1.97.235 2.67.506.725.28 1.34.655 1.951 1.265.613.61.99 1.223 1.273 1.946.273.7.46 1.498.516 2.67l.025.552.008.205c.029.748.037 1.51.042 3.777l.001.846v.703l-.001.398a50.82 50.82 0 01-.058 2.588c-.05 1.17-.235 1.97-.506 2.67a5.394 5.394 0 01-1.265 1.951c-.61.613-1.222.99-1.946 1.273-.699.273-1.498.46-2.668.516-.243.012-.451.022-.656.03l-.204.007c-.719.026-1.512.034-3.676.038l-.847.001h-1.1a50.279 50.279 0 01-2.587-.059c-1.171-.05-1.971-.235-2.671-.506a5.394 5.394 0 01-1.951-1.265 5.385 5.385 0 01-1.272-1.946c-.274-.699-.46-1.498-.517-2.668a88.15 88.15 0 01-.03-.656l-.007-.205c-.026-.718-.034-1.512-.038-3.674v-2.129c.006-1.168.022-1.597.058-2.406.051-1.171.235-1.971.506-2.672a5.39 5.39 0 011.265-1.95 5.381 5.381 0 011.946-1.272c.699-.274 1.498-.462 2.669-.517l.656-.03.204-.007c.718-.026 1.511-.034 3.674-.038zm.678 1.981h-1.226l-.295.001c-2.307.005-3.016.013-3.777.043l-.21.009-.457.02c-1.072.052-1.654.232-2.042.383-.513.2-.879.44-1.263.825a3.413 3.413 0 00-.82 1.267c-.15.388-.33.97-.375 2.043a48.89 48.89 0 00-.056 2.482v.398 1.565c.006 2.937.018 3.285.073 4.444.05 1.073.231 1.654.382 2.043.2.512.44.878.825 1.263.386.383.753.621 1.267.82.388.15.97.328 2.043.374.207.01.388.017.563.024l.208.007a63.28 63.28 0 002.109.026h1.564c2.938-.006 3.286-.019 4.446-.073 1.071-.051 1.654-.232 2.04-.383.514-.2.88-.44 1.264-.825.384-.386.622-.753.82-1.266.15-.389.328-.971.375-2.044.039-.88.054-1.292.057-2.723v-1.15-.572c-.006-2.936-.019-3.284-.074-4.445-.05-1.071-.23-1.654-.382-2.04-.2-.515-.44-.88-.825-1.264a3.405 3.405 0 00-1.267-.82c-.388-.15-.97-.328-2.042-.375a48.987 48.987 0 00-2.535-.056zm-1.515 3.37a5.65 5.65 0 11.021 11.299 5.65 5.65 0 01-.02-11.3zm.004 1.982a3.667 3.667 0 10.015 7.334 3.667 3.667 0 00-.015-7.334zm5.865-3.536a1.32 1.32 0 11.005 2.64 1.32 1.32 0 01-.005-2.64z",
        id: "a"
      })), h("g", {
        fill: "none",
        "fill-rule": "evenodd"
      }, h("mask", {
        id: "b",
        fill: "#fff"
      }, h("use", {
        xlinkHref: "#a"
      })), h("image", {
        mask: "url(#b)",
        x: "4",
        y: "4",
        width: "24",
        height: "24",
        xlinkHref: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAALKADAAQAAAABAAAALAAAAAD8buejAAALZklEQVRYCVWZC2LbNhAFCRKykvP0bD1506SxRKIzbwHJoU3jv5h9WICU3P7+6zlG2zZvr8s/rW1tN7U0rMll8aDYufdzbLfc1JHmpv3jpPy8tsO+3O2s/O6YMSjTl/qdCds4mIIG60m8vdq2Z+phm2V4vAb9+o7BbZeuoM0NyYazvTvbvlN1MGjHUAesZ/IWWOsCeF0BOwAK4ITR0WYd/QKHEPv2DEymmorZtiubjOHEMYEzXmC9GMxu+95Kz+kuwxjDBKb8iUoCAdqZoAeyALreW6ZNx9Y4Jz8cLwjTZOEoR+HU05k2RzgP2iafGgfZiEdZbEr94zpX/xkPtDtGAxF+LRcgTsp9CAZg0rnEnXmPqFshY5vLnVWxLXO/bah2sZQgBZppGSe8NbjNPN5kc/WbIYEn8U+jXCOezT4zfgS1eoVEhceVeK74Fe4N6CoYEoLWykzHsd+GMAUqdTTVvvqT1uWqB3lVCLb12/ORAe8/5Zu9mp7lqoEFUCAFDIxqz7i1bq2AY1U9jqq2QK/7DYl+1AeZlAFcEc+U/jkRUqsvCHQ/nyGvjrOl6EuZWRWVGCKUMCkntQ5o+u2AZ3OxakbTcoBZnY0xhgGCUM4Kp1xtBTnBnXM5ASRms/Fs7d9OpX8bXN45pibQY/ML1MmA5G9CINBuCpdftexr6i2c5qd9J441LNJm3zk1GVusJ7v6mPJ7HPxJR0Li/vg9O1XHTEgvsQoSgExU0NnlLF0paK+6d06aOMKE2nCKV0ofNw4WsWmLsWrv6lPLnhGpr9E137QkHOMB/jh/T8MOqOadXarR44zPBW5NvDccnBxVmdK81+7RQ5p6qnQoRDZPh9+xWj0N2XpqxX1HzMty9UlFnKya/h3gulziAsyxwkSmpTIPB8vagKLyktRdDuBEHNGZMm4oCFWgjq31WPHpaC93gGNqpOpP4Ez4spa+nMNvhTWcuPKAJ79fqIxVoUvdjEG9qSy2WhpQlz61yG/gnKEA25IrIOYK6DIsQs2EE9LR/sTKq38Nd1y/X//FXG0QDHkEqSz3EYVV2dhb00rgLPSDcqmrScs55NNOD2zVqKmYnYTFnkACp520dkW5vBxK99BVzr792/iZ+VVo92UkKU2oG5WFTb6mNiA1H2C8KC0E44qaQleR3EQvQNwLrECOVAiSwM5gpF7nvDND0lZvYuQ9JbZfqdTrqCgwMcVrRS0z9QkLu9NWmkgEHb8p2zDRylj9VWA3lXD2vObEdWpT3w5MiFqQ1W/lteG4eipastxv2w+TeTBP0ypK84HiOW9fUzLcjRDwCW2b2VxmnGSKTX6uRSwMnC9YX4l05Mh2uwI+QVWdWUOSTWd5Xjjf7/tPYk2stSh053XTGN5RJMCMSajMcS8Trn3j/E1ajthlxCkmJXVi47PSUsyyq+jyexsayQNuv5GVYJaszprNsQD3RkgYiy49kFl2JlJJxlf8Uu/lpkq7+aWqzEzjr5cTVpFaJvSVr8AKRtiTlVPFk5t1nO30W+o6jrbAk76kxFa/tX+dom4C1wDPk03gqCw8HTBSxx4FHxIA+mh2pM3rKu5SNqBAuOSZnHzsB9JwW7DV/ge8dlVsOh375PvH8YO8EALU1HuecIC6qQgXifNuSx9XAoLaoGIYDjkWFrawX1U1XrknuMFw7QBSPtg79XovmBvwqnDICrhClEO6wgKFj9vPqJWlthUvdgH1DOA8+wFMexzQc5BUS1d1IsdBSjEv4Fe1LgBO1CpFPTpV1JuPSFNt4y/trzbtaUfwBWwM3/6JsrL6MSQYwLKXAm9YJBxsM8992MblZ63Gami0+rnwOMyPykVpQsyl9eYNOfVC6kRBkwaop//LgcAKWivkHF791g0JK5kMmCgKPas2QRkUFQsuTvm6R1946Wg95k764ZRLW59yO5UVGsawwELupCfAbdCuAwvcz5Xk18rIVEdgSRBRgO77R206QdXHuA2goaGiCQ0GmUfN1JlmFayjv0IcKGkfYt4HAj0yuQBRGDjzuS/rTmAf29Gov1S+FF7QBayNcpoBOEsMt3vFcIUC7VxOnE+pxmkgqEzduzwsPykrjBszCusgdarsRIAL6CM/KqsqcAf1vj8P1TXFyN6e5G8ao48fjKfDQJYizIdIfb+Xwp6Z2fE2C7mUfUEzMKqSBp4VUV1A49Sz1M2LzVzahEfyHUAcQNltR0nADYkBvHXDZQo8H9dQvHF7qhjPtSolBJ0A/vaLwdRz5YFFGoWBy8E/4aKcjqimaUBXXnjBpzOZnMlIVXsTVEBBUa+dD0BR0xVopgAD70psY0KjMHpmHB2kApea9o23NS83mpsref5OZet4U/0CMhSEDpwnxB9lVKSfk5djllXRFPizQmKcqMpnyZ3ycPntf96Ym9ChzU8vCQnhgWZ2UuySArw+cVBG4gqNCS6YoSEEziRWVStKUpe4FfCd91V0XA/qgOJuF7FpGjjyQgsFoNDtibp8cm+cyXxbB6zh4pMUO4H06yzsv4E/A6rg/uRJRnMRmrhMDIhyOjABX9CMDFhBFxx19KujjqWeim5PwVFU6IBiewfyk7IPETcg52kjXN7nsbaoEykKf/cjUgVxpTZZVtnqFMgv4FHa8oSOisawinMLHfUBzJcK1j8BeqquedKDtgcgnA4bym4P6gBWYVM3W/pn41ku5L4RElFWtlk5SXHEThhOWDiIyVROlQNM+wyHimlgATI/PPIm4BB8qfqwHnhgL89gzs+Ww1xQb4821SZ/4IwOJiRqH/X9u7Hj08JLSZfawOQcpRzwgk1oBNzzcgLn1FBNHspMENik9OG4awIDaUjw9rKNT1KXPl9neua6sSbkgqfs/CNfBdNfDDhQuL4AKXEXeOgZID91eOiRUnEFOIA5rnTkBU0/IT05gByoq5KBJF4Hym4Pxh3UcxZ7HjdhEhKWURbhavNR9rjLBwk3ryDcrGzfvk9I69b1yhMGWQ4bqMwv/RMSplQkjjVKXzZX8wESVcuB7QG0YUCMjk/aOmWgc/vC4oMCVYfghIGP6MT1zpeUhM1rQzOnGxmFKwTCir1Xaj5vN7T7nDZvnbDGHbCKnwji2zofNsOvbold3zlUtKGosBun3PbJSrrReHEaCQVCIDEMaCCBs+P+AbybkbIhmbNecGwF+E5/L2ECuPKCWsUESQkKnyyJ93TGACk7OrAY9P8XG//fGCoM7DAEUGnj5Mw7aQfelySWOm9iPuFyvrL8rKQR6mM6qdCUDQsfNPVu4yv/HaPOT1e/yDaviMKmTkg/I/F7MUG9OlrmDrBLRVd3c8KBJlPEKoVRcIJuhoQAmZDUkPC00W5OI1dOpQ1F61kFNqr9SmFcaHdBheOaDHF6QZMOP6QyiZ804oj98wLiAMIgcWw4UDYkDAWfR+4d5s0zP2GgUZX04i+NeSgYGokvbDhIZYUWHgd9K8zZzir264NxZUFbsfM1jdqpV2naA48tx6hsvBSabE4IMtlcOGgq8PqCjoly2rw2soqy4RJWQtPZl6PUCU14ZUWENuZV2Honn3f+k6R6wrkqgTStyQ0bFY+XAaafMRFgUlVeXxXFUcpLEYfZz3FrVUzZrOOJK+4B/wnIZ8TGRvb9OB8EUM0w8uNYj/oa9iK9AMoy6gA72o02srMxpAPUD+EDnVEF7P5xw896VyAbFk8MgnpVpR3gfLnt/wECq3rYFvYLcKCpqvcI+/hVl8AumXDeApklDRRKJSS+KOaq1Rgg4igOYtiQK1hJy46TBtDjznDp3iqJff5j0/LfSZbYVdauqXccJ9W+czupp0sU9gMlqkQ52lU1E6tUwoDUukAD6YRpAwqDrAErzA8QCRvXm98KEep0xIdY1CN1ye27IP0IHvvYIW18qGz8S7VWUZuMkUOb3P8DHTl67ur/i1UAAAAASUVORK5CYII="
      })));
      this.defaultLocale = locale_default7;
      this.i18nInit();
      this.title = this.i18n("pluginNameInstagram");
      this.provider = new Provider(uppy, {
        companionUrl: this.opts.companionUrl,
        companionHeaders: this.opts.companionHeaders,
        companionKeysParams: this.opts.companionKeysParams,
        companionCookiesRule: this.opts.companionCookiesRule,
        provider: "instagram",
        pluginId: this.id
      });
      this.onFirstRender = this.onFirstRender.bind(this);
      this.render = this.render.bind(this);
    }
    install() {
      this.view = new ProviderView(this, {
        provider: this.provider,
        viewType: "grid",
        showTitles: false,
        showFilter: false,
        showBreadcrumbs: false
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.view.tearDown();
      this.unmount();
    }
    onFirstRender() {
      return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder("recent")]);
    }
    render(state) {
      return this.view.render(state);
    }
  };
  Instagram.VERSION = packageJson12.version;

  // ../packages/@uppy/facebook/lib/locale.js
  var locale_default8 = {
    strings: {
      pluginNameFacebook: "Facebook"
    }
  };

  // ../packages/@uppy/facebook/lib/Facebook.js
  var packageJson13 = {
    "version": "3.1.0"
  };
  var Facebook = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.opts.id || "Facebook";
      Provider.initPlugin(this, opts);
      this.title = this.opts.title || "Facebook";
      this.icon = () => h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, h("g", {
        fill: "none",
        fillRule: "evenodd"
      }, h("path", {
        d: "M27 16c0-6.075-4.925-11-11-11S5 9.925 5 16c0 5.49 4.023 10.041 9.281 10.866V19.18h-2.793V16h2.793v-2.423c0-2.757 1.642-4.28 4.155-4.28 1.204 0 2.462.215 2.462.215v2.707h-1.387c-1.366 0-1.792.848-1.792 1.718V16h3.05l-.487 3.18h-2.563v7.686C22.977 26.041 27 21.49 27 16",
        fill: "#1777F2"
      }), h("path", {
        d: "M20.282 19.18L20.77 16h-3.051v-2.063c0-.87.426-1.718 1.792-1.718h1.387V9.512s-1.258-.215-2.462-.215c-2.513 0-4.155 1.523-4.155 4.28V16h-2.793v3.18h2.793v7.686a11.082 11.082 0 003.438 0V19.18h2.563",
        fill: "#FFFFFE"
      })));
      this.provider = new Provider(uppy, {
        companionUrl: this.opts.companionUrl,
        companionHeaders: this.opts.companionHeaders,
        companionKeysParams: this.opts.companionKeysParams,
        companionCookiesRule: this.opts.companionCookiesRule,
        provider: "facebook",
        pluginId: this.id
      });
      this.defaultLocale = locale_default8;
      this.i18nInit();
      this.title = this.i18n("pluginNameFacebook");
      this.onFirstRender = this.onFirstRender.bind(this);
      this.render = this.render.bind(this);
    }
    install() {
      this.view = new ProviderView(this, {
        provider: this.provider
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.view.tearDown();
      this.unmount();
    }
    onFirstRender() {
      return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
    }
    render(state) {
      const viewOptions = {};
      if (this.getPluginState().files.length && !this.getPluginState().folders.length) {
        viewOptions.viewType = "grid";
        viewOptions.showFilter = false;
        viewOptions.showTitles = false;
      }
      return this.view.render(state, viewOptions);
    }
  };
  Facebook.VERSION = packageJson13.version;

  // ../packages/@uppy/onedrive/lib/locale.js
  var locale_default9 = {
    strings: {
      pluginNameOneDrive: "OneDrive"
    }
  };

  // ../packages/@uppy/onedrive/lib/OneDrive.js
  var packageJson14 = {
    "version": "3.1.0"
  };
  var OneDrive = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.opts.id || "OneDrive";
      Provider.initPlugin(this, opts);
      this.title = this.opts.title || "OneDrive";
      this.icon = () => h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, h("g", {
        fill: "none",
        fillRule: "nonzero"
      }, h("path", {
        d: "M13.39 12.888l4.618 2.747 2.752-1.15a4.478 4.478 0 012.073-.352 6.858 6.858 0 00-5.527-5.04 6.895 6.895 0 00-6.876 2.982l.07-.002a5.5 5.5 0 012.89.815z",
        fill: "#0364B8"
      }), h("path", {
        d: "M13.39 12.887v.001a5.5 5.5 0 00-2.89-.815l-.07.002a5.502 5.502 0 00-4.822 2.964 5.43 5.43 0 00.38 5.62l4.073-1.702 1.81-.757 4.032-1.685 2.105-.88-4.619-2.748z",
        fill: "#0078D4"
      }), h("path", {
        d: "M22.833 14.133a4.479 4.479 0 00-2.073.352l-2.752 1.15.798.475 2.616 1.556 1.141.68 3.902 2.321a4.413 4.413 0 00-.022-4.25 4.471 4.471 0 00-3.61-2.284z",
        fill: "#1490DF"
      }), h("path", {
        d: "M22.563 18.346l-1.141-.68-2.616-1.556-.798-.475-2.105.88L11.87 18.2l-1.81.757-4.073 1.702A5.503 5.503 0 0010.5 23h12.031a4.472 4.472 0 003.934-2.333l-3.902-2.321z",
        fill: "#28A8EA"
      })));
      this.provider = new Provider(uppy, {
        companionUrl: this.opts.companionUrl,
        companionHeaders: this.opts.companionHeaders,
        companionCookiesRule: this.opts.companionCookiesRule,
        provider: "onedrive",
        pluginId: this.id
      });
      this.defaultLocale = locale_default9;
      this.i18nInit();
      this.title = this.i18n("pluginNameOneDrive");
      this.onFirstRender = this.onFirstRender.bind(this);
      this.render = this.render.bind(this);
    }
    install() {
      this.view = new ProviderView(this, {
        provider: this.provider
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.view.tearDown();
      this.unmount();
    }
    onFirstRender() {
      return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
    }
    render(state) {
      return this.view.render(state);
    }
  };
  OneDrive.VERSION = packageJson14.version;

  // ../packages/@uppy/zoom/lib/locale.js
  var locale_default10 = {
    strings: {
      pluginNameZoom: "Zoom"
    }
  };

  // ../packages/@uppy/zoom/lib/Zoom.js
  var packageJson15 = {
    "version": "2.1.0"
  };
  var Zoom = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.opts.id || "Zoom";
      Provider.initPlugin(this, opts);
      this.title = this.opts.title || "Zoom";
      this.icon = () => h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, h("path", {
        d: "M24.5 11.125l-2.75 2.063c-.473.353-.75.91-.75 1.5v3.124c0 .59.277 1.147.75 1.5l2.75 2.063a.938.938 0 001.5-.75v-8.75a.938.938 0 00-1.5-.75zm-4.75 9.5c0 1.035-.84 1.875-1.875 1.875H9.75A3.75 3.75 0 016 18.75v-6.875C6 10.84 6.84 10 7.875 10H16a3.75 3.75 0 013.75 3.75v6.875z",
        fill: "#2E8CFF",
        "fill-rule": "evenodd"
      }));
      this.provider = new Provider(uppy, {
        companionUrl: this.opts.companionUrl,
        companionHeaders: this.opts.companionHeaders,
        companionKeysParams: this.opts.companionKeysParams,
        companionCookiesRule: this.opts.companionCookiesRule,
        provider: "zoom",
        pluginId: this.id
      });
      this.defaultLocale = locale_default10;
      this.i18nInit();
      this.title = this.i18n("pluginNameZoom");
      this.onFirstRender = this.onFirstRender.bind(this);
      this.render = this.render.bind(this);
    }
    install() {
      this.view = new ProviderView(this, {
        provider: this.provider
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.view.tearDown();
      this.unmount();
    }
    onFirstRender() {
      return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
    }
    render(state) {
      return this.view.render(state);
    }
  };
  Zoom.VERSION = packageJson15.version;

  // ../packages/@uppy/unsplash/lib/Unsplash.js
  var packageJson16 = {
    "version": "3.1.0"
  };
  var Unsplash = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.opts.id || "Unsplash";
      this.title = this.opts.title || "Unsplash";
      Provider.initPlugin(this, opts, {});
      this.icon = () => h("svg", {
        className: "uppy-DashboardTab-iconUnsplash",
        viewBox: "0 0 32 32",
        height: "32",
        width: "32",
        "aria-hidden": "true"
      }, h("g", {
        fill: "currentcolor"
      }, h("path", {
        d: "M46.575 10.883v-9h12v9zm12 5h10v18h-32v-18h10v9h12z"
      }), h("path", {
        d: "M13 12.5V8h6v4.5zm6 2.5h5v9H8v-9h5v4.5h6z"
      })));
      if (!this.opts.companionUrl) {
        throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
      }
      this.hostname = this.opts.companionUrl;
      this.provider = new SearchProvider(uppy, {
        companionUrl: this.opts.companionUrl,
        companionHeaders: this.opts.companionHeaders,
        companionCookiesRule: this.opts.companionCookiesRule,
        provider: "unsplash",
        pluginId: this.id
      });
    }
    install() {
      this.view = new SearchProviderView(this, {
        provider: this.provider,
        viewType: "unsplash"
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    onFirstRender() {
    }
    render(state) {
      return this.view.render(state);
    }
    uninstall() {
      this.unmount();
    }
  };
  Unsplash.VERSION = packageJson16.version;

  // ../packages/@uppy/box/lib/locale.js
  var locale_default11 = {
    strings: {
      pluginNameBox: "Box"
    }
  };

  // ../packages/@uppy/box/lib/Box.js
  var packageJson17 = {
    "version": "2.1.0"
  };
  var Box = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.opts.id || "Box";
      Provider.initPlugin(this, opts);
      this.title = this.opts.title || "Box";
      this.icon = () => h("svg", {
        className: "uppy-DashboardTab-iconBox",
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, h("g", {
        fill: "currentcolor",
        fillRule: "nonzero"
      }, h("path", {
        d: "m16.4 13.5c-1.6 0-3 0.9-3.7 2.2-0.7-1.3-2.1-2.2-3.7-2.2-1 0-1.8 0.3-2.5 0.8v-3.6c-0.1-0.3-0.5-0.7-1-0.7s-0.8 0.4-0.8 0.8v7c0 2.3 1.9 4.2 4.2 4.2 1.6 0 3-0.9 3.7-2.2 0.7 1.3 2.1 2.2 3.7 2.2 2.3 0 4.2-1.9 4.2-4.2 0.1-2.4-1.8-4.3-4.1-4.3m-7.5 6.8c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5m7.5 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5"
      }), h("path", {
        d: "m27.2 20.6l-2.3-2.8 2.3-2.8c0.3-0.4 0.2-0.9-0.2-1.2s-1-0.2-1.3 0.2l-2 2.4-2-2.4c-0.3-0.4-0.9-0.4-1.3-0.2-0.4 0.3-0.5 0.8-0.2 1.2l2.3 2.8-2.3 2.8c-0.3 0.4-0.2 0.9 0.2 1.2s1 0.2 1.3-0.2l2-2.4 2 2.4c0.3 0.4 0.9 0.4 1.3 0.2 0.4-0.3 0.4-0.8 0.2-1.2"
      })));
      this.provider = new Provider(uppy, {
        companionUrl: this.opts.companionUrl,
        companionHeaders: this.opts.companionHeaders,
        companionKeysParams: this.opts.companionKeysParams,
        companionCookiesRule: this.opts.companionCookiesRule,
        provider: "box",
        pluginId: this.id
      });
      this.defaultLocale = locale_default11;
      this.i18nInit();
      this.title = this.i18n("pluginNameBox");
      this.onFirstRender = this.onFirstRender.bind(this);
      this.render = this.render.bind(this);
    }
    install() {
      this.view = new ProviderView(this, {
        provider: this.provider
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.view.tearDown();
      this.unmount();
    }
    onFirstRender() {
      return this.view.getFolder();
    }
    render(state) {
      return this.view.render(state);
    }
  };
  Box.VERSION = packageJson17.version;

  // ../packages/@uppy/image-editor/lib/Editor.js
  var import_cropperjs = __toESM(require_cropper(), 1);
  var Editor = class extends d {
    constructor(props) {
      super(props);
      this.granularRotateOnChange = (ev) => {
        const {
          rotationAngle,
          rotationDelta
        } = this.state;
        const pendingRotationDelta = Number(ev.target.value) - rotationDelta;
        cancelAnimationFrame(this.granularRotateOnInputNextFrame);
        if (pendingRotationDelta !== 0) {
          const pendingRotationAngle = rotationAngle + pendingRotationDelta;
          this.granularRotateOnInputNextFrame = requestAnimationFrame(() => {
            this.cropper.rotateTo(pendingRotationAngle);
          });
        }
      };
      this.state = {
        rotationAngle: 0,
        rotationDelta: 0
      };
    }
    componentDidMount() {
      const {
        opts,
        storeCropperInstance
      } = this.props;
      this.cropper = new import_cropperjs.default(this.imgElement, opts.cropperOptions);
      storeCropperInstance(this.cropper);
      if (opts.actions.granularRotate) {
        this.imgElement.addEventListener("crop", (ev) => {
          const rotationAngle = ev.detail.rotate;
          this.setState({
            rotationAngle,
            rotationDelta: (rotationAngle + 405) % 90 - 45
          });
        });
      }
    }
    componentWillUnmount() {
      this.cropper.destroy();
    }
    renderGranularRotate() {
      const {
        i18n
      } = this.props;
      const {
        rotationDelta,
        rotationAngle
      } = this.state;
      return h("label", {
        "data-microtip-position": "top",
        role: "tooltip",
        "aria-label": `${rotationAngle}\xBA`,
        className: "uppy-ImageCropper-rangeWrapper uppy-u-reset"
      }, h("input", {
        className: "uppy-ImageCropper-range uppy-u-reset",
        type: "range",
        onInput: this.granularRotateOnChange,
        onChange: this.granularRotateOnChange,
        value: rotationDelta,
        min: "-45",
        max: "44",
        "aria-label": i18n("rotate")
      }));
    }
    renderRevert() {
      const {
        i18n
      } = this.props;
      return h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn",
        "aria-label": i18n("revert"),
        "data-microtip-position": "top",
        onClick: () => {
          this.cropper.reset();
          this.cropper.setAspectRatio(0);
        }
      }, h("svg", {
        "aria-hidden": "true",
        className: "uppy-c-icon",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, h("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }), h("path", {
        d: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
      })));
    }
    renderRotate() {
      const {
        i18n
      } = this.props;
      return h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn",
        onClick: () => this.cropper.rotate(-90),
        "aria-label": i18n("rotate"),
        "data-microtip-position": "top"
      }, h("svg", {
        "aria-hidden": "true",
        className: "uppy-c-icon",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, h("path", {
        d: "M0 0h24v24H0V0zm0 0h24v24H0V0z",
        fill: "none"
      }), h("path", {
        d: "M14 10a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h8zm0 1.75H6a.25.25 0 00-.243.193L5.75 12v7a.25.25 0 00.193.243L6 19.25h8a.25.25 0 00.243-.193L14.25 19v-7a.25.25 0 00-.193-.243L14 11.75zM12 .76V4c2.3 0 4.61.88 6.36 2.64a8.95 8.95 0 012.634 6.025L21 13a1 1 0 01-1.993.117L19 13h-.003a6.979 6.979 0 00-2.047-4.95 6.97 6.97 0 00-4.652-2.044L12 6v3.24L7.76 5 12 .76z"
      })));
    }
    renderFlip() {
      const {
        i18n
      } = this.props;
      return h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn",
        "aria-label": i18n("flipHorizontal"),
        "data-microtip-position": "top",
        onClick: () => this.cropper.scaleX(-this.cropper.getData().scaleX || -1)
      }, h("svg", {
        "aria-hidden": "true",
        className: "uppy-c-icon",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, h("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }), h("path", {
        d: "M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"
      })));
    }
    renderZoomIn() {
      const {
        i18n
      } = this.props;
      return h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn",
        "aria-label": i18n("zoomIn"),
        "data-microtip-position": "top",
        onClick: () => this.cropper.zoom(0.1)
      }, h("svg", {
        "aria-hidden": "true",
        className: "uppy-c-icon",
        height: "24",
        viewBox: "0 0 24 24",
        width: "24"
      }, h("path", {
        d: "M0 0h24v24H0V0z",
        fill: "none"
      }), h("path", {
        d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      }), h("path", {
        d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"
      })));
    }
    renderZoomOut() {
      const {
        i18n
      } = this.props;
      return h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn",
        "aria-label": i18n("zoomOut"),
        "data-microtip-position": "top",
        onClick: () => this.cropper.zoom(-0.1)
      }, h("svg", {
        "aria-hidden": "true",
        className: "uppy-c-icon",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, h("path", {
        d: "M0 0h24v24H0V0z",
        fill: "none"
      }), h("path", {
        d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"
      })));
    }
    renderCropSquare() {
      const {
        i18n
      } = this.props;
      return h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn",
        "aria-label": i18n("aspectRatioSquare"),
        "data-microtip-position": "top",
        onClick: () => this.cropper.setAspectRatio(1)
      }, h("svg", {
        "aria-hidden": "true",
        className: "uppy-c-icon",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, h("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }), h("path", {
        d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
      })));
    }
    renderCropWidescreen() {
      const {
        i18n
      } = this.props;
      return h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn",
        "aria-label": i18n("aspectRatioLandscape"),
        "data-microtip-position": "top",
        onClick: () => this.cropper.setAspectRatio(16 / 9)
      }, h("svg", {
        "aria-hidden": "true",
        className: "uppy-c-icon",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, h("path", {
        d: "M 19,4.9999992 V 17.000001 H 4.9999998 V 6.9999992 H 19 m 0,-2 H 4.9999998 c -1.0999999,0 -1.9999999,0.9000001 -1.9999999,2 V 17.000001 c 0,1.1 0.9,2 1.9999999,2 H 19 c 1.1,0 2,-0.9 2,-2 V 6.9999992 c 0,-1.0999999 -0.9,-2 -2,-2 z"
      }), h("path", {
        fill: "none",
        d: "M0 0h24v24H0z"
      })));
    }
    renderCropWidescreenVertical() {
      const {
        i18n
      } = this.props;
      return h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn",
        "aria-label": i18n("aspectRatioPortrait"),
        "data-microtip-position": "top",
        onClick: () => this.cropper.setAspectRatio(9 / 16)
      }, h("svg", {
        "aria-hidden": "true",
        className: "uppy-c-icon",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, h("path", {
        d: "M 19.000001,19 H 6.999999 V 5 h 10.000002 v 14 m 2,0 V 5 c 0,-1.0999999 -0.9,-1.9999999 -2,-1.9999999 H 6.999999 c -1.1,0 -2,0.9 -2,1.9999999 v 14 c 0,1.1 0.9,2 2,2 h 10.000002 c 1.1,0 2,-0.9 2,-2 z"
      }), h("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      })));
    }
    render() {
      const {
        currentImage,
        opts
      } = this.props;
      const {
        actions
      } = opts;
      const imageURL = URL.createObjectURL(currentImage.data);
      return h("div", {
        className: "uppy-ImageCropper"
      }, h("div", {
        className: "uppy-ImageCropper-container"
      }, h("img", {
        className: "uppy-ImageCropper-image",
        alt: currentImage.name,
        src: imageURL,
        ref: (ref) => {
          this.imgElement = ref;
        }
      })), h("div", {
        className: "uppy-ImageCropper-controls"
      }, actions.revert && this.renderRevert(), actions.rotate && this.renderRotate(), actions.granularRotate && this.renderGranularRotate(), actions.flip && this.renderFlip(), actions.zoomIn && this.renderZoomIn(), actions.zoomOut && this.renderZoomOut(), actions.cropSquare && this.renderCropSquare(), actions.cropWidescreen && this.renderCropWidescreen(), actions.cropWidescreenVertical && this.renderCropWidescreenVertical()));
    }
  };

  // ../packages/@uppy/image-editor/lib/locale.js
  var locale_default12 = {
    strings: {
      revert: "Revert",
      rotate: "Rotate",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      flipHorizontal: "Flip horizontal",
      aspectRatioSquare: "Crop square",
      aspectRatioLandscape: "Crop landscape (16:9)",
      aspectRatioPortrait: "Crop portrait (9:16)"
    }
  };

  // ../packages/@uppy/image-editor/lib/ImageEditor.js
  var packageJson18 = {
    "version": "2.1.1"
  };
  var ImageEditor = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.save = () => {
        const saveBlobCallback = (blob) => {
          const {
            currentImage: currentImage2
          } = this.getPluginState();
          this.uppy.setFileState(currentImage2.id, {
            data: blob,
            size: blob.size,
            preview: null
          });
          const updatedFile = this.uppy.getFile(currentImage2.id);
          this.uppy.emit("thumbnail:request", updatedFile);
          this.setPluginState({
            currentImage: updatedFile
          });
          this.uppy.emit("file-editor:complete", updatedFile);
        };
        const {
          currentImage
        } = this.getPluginState();
        this.cropper.getCroppedCanvas(this.opts.cropperOptions.croppedCanvasOptions).toBlob(saveBlobCallback, currentImage.type, this.opts.quality);
      };
      this.storeCropperInstance = (cropper) => {
        this.cropper = cropper;
      };
      this.selectFile = (file) => {
        this.uppy.emit("file-editor:start", file);
        this.setPluginState({
          currentImage: file
        });
      };
      this.id = this.opts.id || "ImageEditor";
      this.title = "Image Editor";
      this.type = "editor";
      this.defaultLocale = locale_default12;
      const defaultCropperOptions = {
        viewMode: 1,
        background: false,
        autoCropArea: 1,
        responsive: true,
        croppedCanvasOptions: {}
      };
      const defaultActions = {
        revert: true,
        rotate: true,
        granularRotate: true,
        flip: true,
        zoomIn: true,
        zoomOut: true,
        cropSquare: true,
        cropWidescreen: true,
        cropWidescreenVertical: true
      };
      const defaultOptions4 = {
        quality: 0.8
      };
      this.opts = {
        ...defaultOptions4,
        ...opts,
        actions: {
          ...defaultActions,
          ...opts.actions
        },
        cropperOptions: {
          ...defaultCropperOptions,
          ...opts.cropperOptions
        }
      };
      this.i18nInit();
    }
    canEditFile(file) {
      if (!file.type || file.isRemote) {
        return false;
      }
      const fileTypeSpecific = file.type.split("/")[1];
      if (/^(jpe?g|gif|png|bmp|webp)$/.test(fileTypeSpecific)) {
        return true;
      }
      return false;
    }
    install() {
      this.setPluginState({
        currentImage: null
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      const {
        currentImage
      } = this.getPluginState();
      if (currentImage) {
        const file = this.uppy.getFile(currentImage.id);
        this.uppy.emit("file-editor:cancel", file);
      }
      this.unmount();
    }
    render() {
      const {
        currentImage
      } = this.getPluginState();
      if (currentImage === null || currentImage.isRemote) {
        return null;
      }
      return h(Editor, {
        currentImage,
        storeCropperInstance: this.storeCropperInstance,
        save: this.save,
        opts: this.opts,
        i18n: this.i18n
      });
    }
  };
  ImageEditor.VERSION = packageJson18.version;

  // ../packages/@uppy/url/lib/UrlUI.js
  function _classPrivateFieldLooseBase10(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id10 = 0;
  function _classPrivateFieldLooseKey10(name) {
    return "__private_" + id10++ + "_" + name;
  }
  var _handleKeyPress = /* @__PURE__ */ _classPrivateFieldLooseKey10("handleKeyPress");
  var _handleSubmit = /* @__PURE__ */ _classPrivateFieldLooseKey10("handleSubmit");
  var UrlUI = class extends d {
    constructor() {
      super(...arguments);
      Object.defineProperty(this, _handleKeyPress, {
        writable: true,
        value: (ev) => {
          if (ev.keyCode === 13) {
            _classPrivateFieldLooseBase10(this, _handleSubmit)[_handleSubmit]();
          }
        }
      });
      Object.defineProperty(this, _handleSubmit, {
        writable: true,
        value: () => {
          const {
            addFile
          } = this.props;
          const preparedValue = this.input.value.trim();
          addFile(preparedValue);
        }
      });
    }
    componentDidMount() {
      this.input.value = "";
    }
    render() {
      const {
        i18n
      } = this.props;
      return h("div", {
        className: "uppy-Url"
      }, h("input", {
        className: "uppy-u-reset uppy-c-textInput uppy-Url-input",
        type: "text",
        "aria-label": i18n("enterUrlToImport"),
        placeholder: i18n("enterUrlToImport"),
        onKeyUp: _classPrivateFieldLooseBase10(this, _handleKeyPress)[_handleKeyPress],
        ref: (input) => {
          this.input = input;
        },
        "data-uppy-super-focusable": true
      }), h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Url-importButton",
        type: "button",
        onClick: _classPrivateFieldLooseBase10(this, _handleSubmit)[_handleSubmit]
      }, i18n("import")));
    }
  };
  var UrlUI_default = UrlUI;

  // ../packages/@uppy/url/lib/utils/forEachDroppedOrPastedUrl.js
  function forEachDroppedOrPastedUrl(dataTransfer, isDropOrPaste, callback) {
    const items = toArray_default(dataTransfer.items);
    let urlItems;
    switch (isDropOrPaste) {
      case "paste": {
        const atLeastOneFileIsDragged = items.some((item) => item.kind === "file");
        if (atLeastOneFileIsDragged) {
          return;
        }
        urlItems = items.filter((item) => item.kind === "string" && item.type === "text/plain");
        break;
      }
      case "drop": {
        urlItems = items.filter((item) => item.kind === "string" && item.type === "text/uri-list");
        break;
      }
      default: {
        throw new Error(`isDropOrPaste must be either 'drop' or 'paste', but it's ${isDropOrPaste}`);
      }
    }
    urlItems.forEach((item) => {
      item.getAsString((urlString) => callback(urlString));
    });
  }

  // ../packages/@uppy/url/lib/locale.js
  var locale_default13 = {
    strings: {
      import: "Import",
      enterUrlToImport: "Enter URL to import a file",
      failedToFetch: "Companion failed to fetch this URL, please make sure it\u2019s correct",
      enterCorrectUrl: "Incorrect URL: Please make sure you are entering a direct link to a file"
    }
  };

  // ../packages/@uppy/url/lib/Url.js
  var packageJson19 = {
    "version": "3.2.0"
  };
  function UrlIcon() {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "32",
      height: "32",
      viewBox: "0 0 32 32"
    }, h("path", {
      d: "M23.637 15.312l-2.474 2.464a3.582 3.582 0 01-.577.491c-.907.657-1.897.986-2.968.986a4.925 4.925 0 01-3.959-1.971c-.248-.329-.164-.902.165-1.149.33-.247.907-.164 1.155.164 1.072 1.478 3.133 1.724 4.618.656a.642.642 0 00.33-.328l2.473-2.463c1.238-1.313 1.238-3.366-.082-4.597a3.348 3.348 0 00-4.618 0l-1.402 1.395a.799.799 0 01-1.154 0 .79.79 0 010-1.15l1.402-1.394a4.843 4.843 0 016.843 0c2.062 1.805 2.144 5.007.248 6.896zm-8.081 5.664l-1.402 1.395a3.348 3.348 0 01-4.618 0c-1.319-1.23-1.319-3.365-.082-4.596l2.475-2.464.328-.328c.743-.492 1.567-.739 2.475-.657.906.165 1.648.574 2.143 1.314.248.329.825.411 1.155.165.33-.248.412-.822.165-1.15-.825-1.068-1.98-1.724-3.216-1.888-1.238-.247-2.556.082-3.628.902l-.495.493-2.474 2.464c-1.897 1.969-1.814 5.09.083 6.977.99.904 2.226 1.396 3.463 1.396s2.473-.492 3.463-1.395l1.402-1.396a.79.79 0 000-1.15c-.33-.328-.908-.41-1.237-.082z",
      fill: "#FF753E",
      "fill-rule": "nonzero"
    }));
  }
  function addProtocolToURL(url) {
    const protocolRegex = /^[a-z0-9]+:\/\//;
    const defaultProtocol = "http://";
    if (protocolRegex.test(url)) {
      return url;
    }
    return defaultProtocol + url;
  }
  function canHandleRootDrop(e4) {
    const items = toArray_default(e4.dataTransfer.items);
    const urls = items.filter((item) => item.kind === "string" && item.type === "text/uri-list");
    return urls.length > 0;
  }
  function checkIfCorrectURL(url) {
    if (!url)
      return false;
    const protocol = url.match(/^([a-z0-9]+):\/\//)[1];
    if (protocol !== "http" && protocol !== "https") {
      return false;
    }
    return true;
  }
  function getFileNameFromUrl(url) {
    const {
      pathname
    } = new URL(url);
    return pathname.substring(pathname.lastIndexOf("/") + 1);
  }
  var Url = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.opts.id || "Url";
      this.title = this.opts.title || "Link";
      this.type = "acquirer";
      this.icon = () => h(UrlIcon, null);
      this.defaultLocale = locale_default13;
      const defaultOptions4 = {};
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      this.i18nInit();
      this.hostname = this.opts.companionUrl;
      if (!this.hostname) {
        throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
      }
      this.getMeta = this.getMeta.bind(this);
      this.addFile = this.addFile.bind(this);
      this.handleRootDrop = this.handleRootDrop.bind(this);
      this.handleRootPaste = this.handleRootPaste.bind(this);
      this.client = new RequestClient(uppy, {
        companionUrl: this.opts.companionUrl,
        companionHeaders: this.opts.companionHeaders,
        companionCookiesRule: this.opts.companionCookiesRule
      });
    }
    getMeta(url) {
      return this.client.post("url/meta", {
        url
      }).then((res) => {
        if (res.error) {
          this.uppy.log("[URL] Error:");
          this.uppy.log(res.error);
          throw new Error("Failed to fetch the file");
        }
        return res;
      });
    }
    async addFile(protocollessUrl, optionalMeta) {
      if (optionalMeta === void 0) {
        optionalMeta = void 0;
      }
      const url = addProtocolToURL(protocollessUrl);
      if (!checkIfCorrectURL(url)) {
        this.uppy.log(`[URL] Incorrect URL entered: ${url}`);
        this.uppy.info(this.i18n("enterCorrectUrl"), "error", 4e3);
        return void 0;
      }
      try {
        const meta = await this.getMeta(url);
        const tagFile = {
          meta: optionalMeta,
          source: this.id,
          name: getFileNameFromUrl(url),
          type: meta.type,
          data: {
            size: meta.size
          },
          isRemote: true,
          body: {
            url
          },
          remote: {
            companionUrl: this.opts.companionUrl,
            url: `${this.hostname}/url/get`,
            body: {
              fileId: url,
              url
            },
            providerOptions: this.client.opts
          }
        };
        this.uppy.log("[Url] Adding remote file");
        try {
          return this.uppy.addFile(tagFile);
        } catch (err) {
          if (!err.isRestriction) {
            this.uppy.log(err);
          }
          return err;
        }
      } catch (err) {
        this.uppy.log(err);
        this.uppy.info({
          message: this.i18n("failedToFetch"),
          details: err
        }, "error", 4e3);
        return err;
      }
    }
    handleRootDrop(e4) {
      forEachDroppedOrPastedUrl(e4.dataTransfer, "drop", (url) => {
        this.uppy.log(`[URL] Adding file from dropped url: ${url}`);
        this.addFile(url);
      });
    }
    handleRootPaste(e4) {
      forEachDroppedOrPastedUrl(e4.clipboardData, "paste", (url) => {
        this.uppy.log(`[URL] Adding file from pasted url: ${url}`);
        this.addFile(url);
      });
    }
    render() {
      return h(UrlUI_default, {
        i18n: this.i18n,
        addFile: this.addFile
      });
    }
    install() {
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.unmount();
    }
  };
  Url.VERSION = packageJson19.version;
  Url.prototype.canHandleRootDrop = canHandleRootDrop;

  // ../packages/@uppy/utils/lib/getFileTypeExtension.js
  var mimeToExtensions = {
    "audio/mp3": "mp3",
    "audio/mp4": "mp4",
    "audio/ogg": "ogg",
    "audio/webm": "webm",
    "image/gif": "gif",
    "image/heic": "heic",
    "image/heif": "heif",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/svg+xml": "svg",
    "video/mp4": "mp4",
    "video/ogg": "ogv",
    "video/quicktime": "mov",
    "video/webm": "webm",
    "video/x-matroska": "mkv",
    "video/x-msvideo": "avi"
  };
  function getFileTypeExtension(mimeType) {
    [mimeType] = mimeType.split(";", 1);
    return mimeToExtensions[mimeType] || null;
  }

  // ../packages/@uppy/webcam/lib/Webcam.js
  var import_is_mobile = __toESM(require_is_mobile(), 1);

  // ../packages/@uppy/utils/lib/canvasToBlob.js
  function canvasToBlob2(canvas, type, quality) {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, type, quality);
    });
  }

  // ../packages/@uppy/webcam/lib/supportsMediaRecorder.js
  function supportsMediaRecorder() {
    return typeof MediaRecorder === "function" && !!MediaRecorder.prototype && typeof MediaRecorder.prototype.start === "function";
  }

  // ../packages/@uppy/webcam/lib/CameraIcon.js
  var CameraIcon_default = () => {
    return h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      fill: "#0097DC",
      width: "66",
      height: "55",
      viewBox: "0 0 66 55"
    }, h("path", {
      d: "M57.3 8.433c4.59 0 8.1 3.51 8.1 8.1v29.7c0 4.59-3.51 8.1-8.1 8.1H8.7c-4.59 0-8.1-3.51-8.1-8.1v-29.7c0-4.59 3.51-8.1 8.1-8.1h9.45l4.59-7.02c.54-.54 1.35-1.08 2.16-1.08h16.2c.81 0 1.62.54 2.16 1.08l4.59 7.02h9.45zM33 14.64c-8.62 0-15.393 6.773-15.393 15.393 0 8.62 6.773 15.393 15.393 15.393 8.62 0 15.393-6.773 15.393-15.393 0-8.62-6.773-15.393-15.393-15.393zM33 40c-5.648 0-9.966-4.319-9.966-9.967 0-5.647 4.318-9.966 9.966-9.966s9.966 4.319 9.966 9.966C42.966 35.681 38.648 40 33 40z",
      fillRule: "evenodd"
    }));
  };

  // ../packages/@uppy/webcam/lib/SnapshotButton.js
  var SnapshotButton_default = (_ref) => {
    let {
      onSnapshot,
      i18n
    } = _ref;
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--picture",
      type: "button",
      title: i18n("takePicture"),
      "aria-label": i18n("takePicture"),
      onClick: onSnapshot,
      "data-uppy-super-focusable": true
    }, CameraIcon_default());
  };

  // ../packages/@uppy/webcam/lib/RecordButton.js
  function RecordButton(_ref) {
    let {
      recording,
      onStartRecording,
      onStopRecording,
      i18n
    } = _ref;
    if (recording) {
      return h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
        type: "button",
        title: i18n("stopRecording"),
        "aria-label": i18n("stopRecording"),
        onClick: onStopRecording,
        "data-uppy-super-focusable": true
      }, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        width: "100",
        height: "100",
        viewBox: "0 0 100 100"
      }, h("rect", {
        x: "15",
        y: "15",
        width: "70",
        height: "70"
      })));
    }
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
      type: "button",
      title: i18n("startRecording"),
      "aria-label": i18n("startRecording"),
      onClick: onStartRecording,
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "100",
      height: "100",
      viewBox: "0 0 100 100"
    }, h("circle", {
      cx: "50",
      cy: "50",
      r: "40"
    })));
  }

  // ../packages/@uppy/webcam/lib/formatSeconds.js
  function formatSeconds(seconds) {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, 0)}`;
  }

  // ../packages/@uppy/webcam/lib/RecordingLength.js
  function RecordingLength(_ref) {
    let {
      recordingLengthSeconds,
      i18n
    } = _ref;
    const formattedRecordingLengthSeconds = formatSeconds(recordingLengthSeconds);
    return h("span", {
      "aria-label": i18n("recordingLength", {
        recording_length: formattedRecordingLengthSeconds
      })
    }, formattedRecordingLengthSeconds);
  }

  // ../packages/@uppy/webcam/lib/VideoSourceSelect.js
  var VideoSourceSelect_default = (_ref) => {
    let {
      currentDeviceId,
      videoSources,
      onChangeVideoSource
    } = _ref;
    return h("div", {
      className: "uppy-Webcam-videoSource"
    }, h("select", {
      className: "uppy-u-reset uppy-Webcam-videoSource-select",
      onChange: (event) => {
        onChangeVideoSource(event.target.value);
      }
    }, videoSources.map((videoSource) => h("option", {
      key: videoSource.deviceId,
      value: videoSource.deviceId,
      selected: videoSource.deviceId === currentDeviceId
    }, videoSource.label))));
  };

  // ../packages/@uppy/webcam/lib/SubmitButton.js
  function SubmitButton(_ref) {
    let {
      onSubmit,
      i18n
    } = _ref;
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--submit",
      type: "button",
      title: i18n("submitRecordedFile"),
      "aria-label": i18n("submitRecordedFile"),
      onClick: onSubmit,
      "data-uppy-super-focusable": true
    }, h("svg", {
      width: "12",
      height: "9",
      viewBox: "0 0 12 9",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon"
    }, h("path", {
      fill: "#fff",
      fillRule: "nonzero",
      d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
    })));
  }
  var SubmitButton_default = SubmitButton;

  // ../packages/@uppy/webcam/lib/DiscardButton.js
  function DiscardButton(_ref) {
    let {
      onDiscard,
      i18n
    } = _ref;
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--discard",
      type: "button",
      title: i18n("discardRecordedFile"),
      "aria-label": i18n("discardRecordedFile"),
      onClick: onDiscard,
      "data-uppy-super-focusable": true
    }, h("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 13 13",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon"
    }, h("g", {
      fill: "#FFF",
      fillRule: "evenodd"
    }, h("path", {
      d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z"
    }), h("path", {
      d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z"
    }))));
  }
  var DiscardButton_default = DiscardButton;

  // ../packages/@uppy/webcam/lib/CameraScreen.js
  function _extends5() {
    _extends5 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends5.apply(this, arguments);
  }
  function isModeAvailable(modes, mode) {
    return modes.includes(mode);
  }
  var CameraScreen = class extends d {
    componentDidMount() {
      const {
        onFocus
      } = this.props;
      onFocus();
    }
    componentWillUnmount() {
      const {
        onStop
      } = this.props;
      onStop();
    }
    render() {
      const {
        src,
        recordedVideo,
        recording,
        modes,
        supportsRecording,
        videoSources,
        showVideoSourceDropdown,
        showRecordingLength,
        onSubmit,
        i18n,
        mirror,
        onSnapshot,
        onStartRecording,
        onStopRecording,
        onDiscardRecordedVideo,
        recordingLengthSeconds
      } = this.props;
      const hasRecordedVideo = !!recordedVideo;
      const shouldShowRecordButton = !hasRecordedVideo && supportsRecording && (isModeAvailable(modes, "video-only") || isModeAvailable(modes, "audio-only") || isModeAvailable(modes, "video-audio"));
      const shouldShowSnapshotButton = !hasRecordedVideo && isModeAvailable(modes, "picture");
      const shouldShowRecordingLength = supportsRecording && showRecordingLength && !hasRecordedVideo;
      const shouldShowVideoSourceDropdown = showVideoSourceDropdown && videoSources && videoSources.length > 1;
      const videoProps = {
        playsinline: true
      };
      if (recordedVideo) {
        videoProps.muted = false;
        videoProps.controls = true;
        videoProps.src = recordedVideo;
        if (this.videoElement) {
          this.videoElement.srcObject = void 0;
        }
      } else {
        videoProps.muted = true;
        videoProps.autoplay = true;
        videoProps.srcObject = src;
      }
      return h("div", {
        className: "uppy uppy-Webcam-container"
      }, h("div", {
        className: "uppy-Webcam-videoContainer"
      }, h("video", _extends5({
        ref: (videoElement) => this.videoElement = videoElement,
        className: `uppy-Webcam-video  ${mirror ? "uppy-Webcam-video--mirrored" : ""}`
      }, videoProps))), h("div", {
        className: "uppy-Webcam-footer"
      }, h("div", {
        className: "uppy-Webcam-videoSourceContainer"
      }, shouldShowVideoSourceDropdown ? VideoSourceSelect_default(this.props) : null), h("div", {
        className: "uppy-Webcam-buttonContainer"
      }, shouldShowSnapshotButton && h(SnapshotButton_default, {
        onSnapshot,
        i18n
      }), shouldShowRecordButton && h(RecordButton, {
        recording,
        onStartRecording,
        onStopRecording,
        i18n
      }), hasRecordedVideo && h(SubmitButton_default, {
        onSubmit,
        i18n
      }), hasRecordedVideo && h(DiscardButton_default, {
        onDiscard: onDiscardRecordedVideo,
        i18n
      })), h("div", {
        className: "uppy-Webcam-recordingLength"
      }, shouldShowRecordingLength && h(RecordingLength, {
        recordingLengthSeconds,
        i18n
      }))));
    }
  };
  var CameraScreen_default = CameraScreen;

  // ../packages/@uppy/webcam/lib/PermissionsScreen.js
  var PermissionsScreen_default = (_ref) => {
    let {
      icon,
      i18n,
      hasCamera
    } = _ref;
    return h("div", {
      className: "uppy-Webcam-permissons"
    }, h("div", {
      className: "uppy-Webcam-permissonsIcon"
    }, icon()), h("h1", {
      className: "uppy-Webcam-title"
    }, hasCamera ? i18n("allowAccessTitle") : i18n("noCameraTitle")), h("p", null, hasCamera ? i18n("allowAccessDescription") : i18n("noCameraDescription")));
  };

  // ../packages/@uppy/webcam/lib/locale.js
  var locale_default14 = {
    strings: {
      pluginNameCamera: "Camera",
      noCameraTitle: "Camera Not Available",
      noCameraDescription: "In order to take pictures or record video, please connect a camera device",
      recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
      submitRecordedFile: "Submit recorded file",
      discardRecordedFile: "Discard recorded file",
      smile: "Smile!",
      takePicture: "Take a picture",
      startRecording: "Begin video recording",
      stopRecording: "Stop video recording",
      recordingLength: "Recording length %{recording_length}",
      allowAccessTitle: "Please allow access to your camera",
      allowAccessDescription: "In order to take pictures or record video with your camera, please allow camera access for this site."
    }
  };

  // ../packages/@uppy/webcam/lib/Webcam.js
  function _extends6() {
    _extends6 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends6.apply(this, arguments);
  }
  function _classPrivateFieldLooseBase11(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id11 = 0;
  function _classPrivateFieldLooseKey11(name) {
    return "__private_" + id11++ + "_" + name;
  }
  var packageJson20 = {
    "version": "3.3.0"
  };
  function toMimeType(fileType) {
    if (fileType[0] === ".") {
      return mimeTypes_default[fileType.slice(1)];
    }
    return fileType;
  }
  function isVideoMimeType(mimeType) {
    return /^video\/[^*]+$/.test(mimeType);
  }
  function isImageMimeType(mimeType) {
    return /^image\/[^*]+$/.test(mimeType);
  }
  function getMediaDevices() {
    return navigator.mediaDevices;
  }
  function isModeAvailable2(modes, mode) {
    return modes.includes(mode);
  }
  var _enableMirror = /* @__PURE__ */ _classPrivateFieldLooseKey11("enableMirror");
  var Webcam = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      Object.defineProperty(this, _enableMirror, {
        writable: true,
        value: void 0
      });
      this.mediaDevices = getMediaDevices();
      this.supportsUserMedia = !!this.mediaDevices;
      this.protocol = location.protocol.match(/https/i) ? "https" : "http";
      this.id = this.opts.id || "Webcam";
      this.type = "acquirer";
      this.capturedMediaFile = null;
      this.icon = () => h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, h("path", {
        d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
        fill: "#02B383",
        fillRule: "nonzero"
      }));
      this.defaultLocale = locale_default14;
      const defaultOptions4 = {
        onBeforeSnapshot: () => Promise.resolve(),
        countdown: false,
        modes: ["video-audio", "video-only", "audio-only", "picture"],
        mirror: true,
        showVideoSourceDropdown: false,
        facingMode: "user",
        videoConstraints: void 0,
        preferredImageMimeType: null,
        preferredVideoMimeType: null,
        showRecordingLength: false,
        mobileNativeCamera: (0, import_is_mobile.default)({
          tablet: true
        })
      };
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      this.i18nInit();
      this.title = this.i18n("pluginNameCamera");
      _classPrivateFieldLooseBase11(this, _enableMirror)[_enableMirror] = this.opts.mirror;
      this.install = this.install.bind(this);
      this.setPluginState = this.setPluginState.bind(this);
      this.render = this.render.bind(this);
      this.start = this.start.bind(this);
      this.stop = this.stop.bind(this);
      this.takeSnapshot = this.takeSnapshot.bind(this);
      this.startRecording = this.startRecording.bind(this);
      this.stopRecording = this.stopRecording.bind(this);
      this.discardRecordedVideo = this.discardRecordedVideo.bind(this);
      this.submit = this.submit.bind(this);
      this.oneTwoThreeSmile = this.oneTwoThreeSmile.bind(this);
      this.focus = this.focus.bind(this);
      this.changeVideoSource = this.changeVideoSource.bind(this);
      this.webcamActive = false;
      if (this.opts.countdown) {
        this.opts.onBeforeSnapshot = this.oneTwoThreeSmile;
      }
      this.setPluginState({
        hasCamera: false,
        cameraReady: false,
        cameraError: null,
        recordingLengthSeconds: 0,
        videoSources: [],
        currentDeviceId: null
      });
    }
    setOptions(newOpts) {
      super.setOptions({
        ...newOpts,
        videoConstraints: {
          ...this.opts.videoConstraints,
          ...newOpts == null ? void 0 : newOpts.videoConstraints
        }
      });
    }
    hasCameraCheck() {
      if (!this.mediaDevices) {
        return Promise.resolve(false);
      }
      return this.mediaDevices.enumerateDevices().then((devices) => {
        return devices.some((device) => device.kind === "videoinput");
      });
    }
    isAudioOnly() {
      return this.opts.modes.length === 1 && this.opts.modes[0] === "audio-only";
    }
    getConstraints(deviceId) {
      if (deviceId === void 0) {
        deviceId = null;
      }
      const acceptsAudio = this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("audio-only") !== -1;
      const acceptsVideo = !this.isAudioOnly() && (this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("video-only") !== -1 || this.opts.modes.indexOf("picture") !== -1);
      const videoConstraints = {
        ...this.opts.videoConstraints || {
          facingMode: this.opts.facingMode
        },
        ...deviceId ? {
          deviceId,
          facingMode: null
        } : {}
      };
      return {
        audio: acceptsAudio,
        video: acceptsVideo ? videoConstraints : false
      };
    }
    start(options) {
      if (options === void 0) {
        options = null;
      }
      if (!this.supportsUserMedia) {
        return Promise.reject(new Error("Webcam access not supported"));
      }
      this.webcamActive = true;
      if (this.opts.mirror) {
        _classPrivateFieldLooseBase11(this, _enableMirror)[_enableMirror] = true;
      }
      const constraints = this.getConstraints(options && options.deviceId ? options.deviceId : null);
      this.hasCameraCheck().then((hasCamera) => {
        this.setPluginState({
          hasCamera
        });
        return this.mediaDevices.getUserMedia(constraints).then((stream) => {
          this.stream = stream;
          let currentDeviceId = null;
          const tracks = this.isAudioOnly() ? stream.getAudioTracks() : stream.getVideoTracks();
          if (!options || !options.deviceId) {
            currentDeviceId = tracks[0].getSettings().deviceId;
          } else {
            tracks.forEach((track) => {
              if (track.getSettings().deviceId === options.deviceId) {
                currentDeviceId = track.getSettings().deviceId;
              }
            });
          }
          this.updateVideoSources();
          this.setPluginState({
            currentDeviceId,
            cameraReady: true
          });
        }).catch((err) => {
          this.setPluginState({
            cameraReady: false,
            cameraError: err
          });
          this.uppy.info(err.message, "error");
        });
      });
    }
    getMediaRecorderOptions() {
      const options = {};
      if (MediaRecorder.isTypeSupported) {
        const {
          restrictions
        } = this.uppy.opts;
        let preferredVideoMimeTypes = [];
        if (this.opts.preferredVideoMimeType) {
          preferredVideoMimeTypes = [this.opts.preferredVideoMimeType];
        } else if (restrictions.allowedFileTypes) {
          preferredVideoMimeTypes = restrictions.allowedFileTypes.map(toMimeType).filter(isVideoMimeType);
        }
        const filterSupportedTypes = (candidateType) => MediaRecorder.isTypeSupported(candidateType) && getFileTypeExtension(candidateType);
        const acceptableMimeTypes = preferredVideoMimeTypes.filter(filterSupportedTypes);
        if (acceptableMimeTypes.length > 0) {
          options.mimeType = acceptableMimeTypes[0];
        }
      }
      return options;
    }
    startRecording() {
      this.recorder = new MediaRecorder(this.stream, this.getMediaRecorderOptions());
      this.recordingChunks = [];
      let stoppingBecauseOfMaxSize = false;
      this.recorder.addEventListener("dataavailable", (event) => {
        this.recordingChunks.push(event.data);
        const {
          restrictions
        } = this.uppy.opts;
        if (this.recordingChunks.length > 1 && restrictions.maxFileSize != null && !stoppingBecauseOfMaxSize) {
          const totalSize = this.recordingChunks.reduce((acc, chunk) => acc + chunk.size, 0);
          const averageChunkSize = (totalSize - this.recordingChunks[0].size) / (this.recordingChunks.length - 1);
          const expectedEndChunkSize = averageChunkSize * 3;
          const maxSize = Math.max(0, restrictions.maxFileSize - expectedEndChunkSize);
          if (totalSize > maxSize) {
            stoppingBecauseOfMaxSize = true;
            this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3);
            this.stopRecording();
          }
        }
      });
      this.recorder.start(500);
      if (this.opts.showRecordingLength) {
        this.recordingLengthTimer = setInterval(() => {
          const currentRecordingLength = this.getPluginState().recordingLengthSeconds;
          this.setPluginState({
            recordingLengthSeconds: currentRecordingLength + 1
          });
        }, 1e3);
      }
      this.setPluginState({
        isRecording: true
      });
    }
    stopRecording() {
      const stopped = new Promise((resolve) => {
        this.recorder.addEventListener("stop", () => {
          resolve();
        });
        this.recorder.stop();
        if (this.opts.showRecordingLength) {
          clearInterval(this.recordingLengthTimer);
          this.setPluginState({
            recordingLengthSeconds: 0
          });
        }
      });
      return stopped.then(() => {
        this.setPluginState({
          isRecording: false
        });
        return this.getVideo();
      }).then((file) => {
        try {
          this.capturedMediaFile = file;
          this.setPluginState({
            recordedVideo: URL.createObjectURL(file.data)
          });
          _classPrivateFieldLooseBase11(this, _enableMirror)[_enableMirror] = false;
        } catch (err) {
          if (!err.isRestriction) {
            this.uppy.log(err);
          }
        }
      }).then(() => {
        this.recordingChunks = null;
        this.recorder = null;
      }, (error) => {
        this.recordingChunks = null;
        this.recorder = null;
        throw error;
      });
    }
    discardRecordedVideo() {
      this.setPluginState({
        recordedVideo: null
      });
      if (this.opts.mirror) {
        _classPrivateFieldLooseBase11(this, _enableMirror)[_enableMirror] = true;
      }
      this.capturedMediaFile = null;
    }
    submit() {
      try {
        if (this.capturedMediaFile) {
          this.uppy.addFile(this.capturedMediaFile);
        }
      } catch (err) {
        if (!err.isRestriction) {
          this.uppy.log(err, "error");
        }
      }
    }
    async stop() {
      if (this.stream) {
        const audioTracks = this.stream.getAudioTracks();
        const videoTracks = this.stream.getVideoTracks();
        audioTracks.concat(videoTracks).forEach((track) => track.stop());
      }
      if (this.recorder) {
        await new Promise((resolve) => {
          this.recorder.addEventListener("stop", resolve, {
            once: true
          });
          this.recorder.stop();
          if (this.opts.showRecordingLength) {
            clearInterval(this.recordingLengthTimer);
          }
        });
      }
      this.recordingChunks = null;
      this.recorder = null;
      this.webcamActive = false;
      this.stream = null;
      this.setPluginState({
        recordedVideo: null,
        isRecording: false,
        recordingLengthSeconds: 0
      });
    }
    getVideoElement() {
      return this.el.querySelector(".uppy-Webcam-video");
    }
    oneTwoThreeSmile() {
      return new Promise((resolve, reject) => {
        let count = this.opts.countdown;
        const countDown = setInterval(() => {
          if (!this.webcamActive) {
            clearInterval(countDown);
            this.captureInProgress = false;
            return reject(new Error("Webcam is not active"));
          }
          if (count > 0) {
            this.uppy.info(`${count}...`, "warning", 800);
            count--;
          } else {
            clearInterval(countDown);
            this.uppy.info(this.i18n("smile"), "success", 1500);
            setTimeout(() => resolve(), 1500);
          }
        }, 1e3);
      });
    }
    takeSnapshot() {
      if (this.captureInProgress)
        return;
      this.captureInProgress = true;
      this.opts.onBeforeSnapshot().catch((err) => {
        const message = typeof err === "object" ? err.message : err;
        this.uppy.info(message, "error", 5e3);
        return Promise.reject(new Error(`onBeforeSnapshot: ${message}`));
      }).then(() => {
        return this.getImage();
      }).then((tagFile) => {
        this.captureInProgress = false;
        try {
          this.uppy.addFile(tagFile);
        } catch (err) {
          if (!err.isRestriction) {
            this.uppy.log(err);
          }
        }
      }, (error) => {
        this.captureInProgress = false;
        throw error;
      });
    }
    getImage() {
      const video = this.getVideoElement();
      if (!video) {
        return Promise.reject(new Error("No video element found, likely due to the Webcam tab being closed."));
      }
      const width = video.videoWidth;
      const height = video.videoHeight;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      const {
        restrictions
      } = this.uppy.opts;
      let preferredImageMimeTypes = [];
      if (this.opts.preferredImageMimeType) {
        preferredImageMimeTypes = [this.opts.preferredImageMimeType];
      } else if (restrictions.allowedFileTypes) {
        preferredImageMimeTypes = restrictions.allowedFileTypes.map(toMimeType).filter(isImageMimeType);
      }
      const mimeType = preferredImageMimeTypes[0] || "image/jpeg";
      const ext = getFileTypeExtension(mimeType) || "jpg";
      const name = `cam-${Date.now()}.${ext}`;
      return canvasToBlob2(canvas, mimeType).then((blob) => {
        return {
          source: this.id,
          name,
          data: new Blob([blob], {
            type: mimeType
          }),
          type: mimeType
        };
      });
    }
    getVideo() {
      const mimeType = this.recordingChunks.find((blob2) => {
        var _blob$type;
        return ((_blob$type = blob2.type) == null ? void 0 : _blob$type.length) > 0;
      }).type;
      const fileExtension = getFileTypeExtension(mimeType);
      if (!fileExtension) {
        return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
      }
      const name = `webcam-${Date.now()}.${fileExtension}`;
      const blob = new Blob(this.recordingChunks, {
        type: mimeType
      });
      const file = {
        source: this.id,
        name,
        data: new Blob([blob], {
          type: mimeType
        }),
        type: mimeType
      };
      return Promise.resolve(file);
    }
    focus() {
      if (!this.opts.countdown)
        return;
      setTimeout(() => {
        this.uppy.info(this.i18n("smile"), "success", 1500);
      }, 1e3);
    }
    changeVideoSource(deviceId) {
      this.stop();
      this.start({
        deviceId
      });
    }
    updateVideoSources() {
      this.mediaDevices.enumerateDevices().then((devices) => {
        this.setPluginState({
          videoSources: devices.filter((device) => device.kind === "videoinput")
        });
      });
    }
    render() {
      if (!this.webcamActive) {
        this.start();
      }
      const webcamState = this.getPluginState();
      if (!webcamState.cameraReady || !webcamState.hasCamera) {
        return h(PermissionsScreen_default, {
          icon: CameraIcon_default,
          i18n: this.i18n,
          hasCamera: webcamState.hasCamera
        });
      }
      return h(
        CameraScreen_default,
        _extends6({}, webcamState, {
          onChangeVideoSource: this.changeVideoSource,
          onSnapshot: this.takeSnapshot,
          onStartRecording: this.startRecording,
          onStopRecording: this.stopRecording,
          onDiscardRecordedVideo: this.discardRecordedVideo,
          onSubmit: this.submit,
          onFocus: this.focus,
          onStop: this.stop,
          i18n: this.i18n,
          modes: this.opts.modes,
          showRecordingLength: this.opts.showRecordingLength,
          showVideoSourceDropdown: this.opts.showVideoSourceDropdown,
          supportsRecording: supportsMediaRecorder(),
          recording: webcamState.isRecording,
          mirror: _classPrivateFieldLooseBase11(this, _enableMirror)[_enableMirror],
          src: this.stream
        })
      );
    }
    install() {
      const {
        mobileNativeCamera,
        modes,
        facingMode,
        videoConstraints
      } = this.opts;
      const {
        target
      } = this.opts;
      if (mobileNativeCamera && target) {
        var _this$getTargetPlugin;
        (_this$getTargetPlugin = this.getTargetPlugin(target)) == null ? void 0 : _this$getTargetPlugin.setOptions({
          showNativeVideoCameraButton: isModeAvailable2(modes, "video-only") || isModeAvailable2(modes, "video-audio"),
          showNativePhotoCameraButton: isModeAvailable2(modes, "picture"),
          nativeCameraFacingMode: (videoConstraints == null ? void 0 : videoConstraints.facingMode) || facingMode
        });
        return;
      }
      this.setPluginState({
        cameraReady: false,
        recordingLengthSeconds: 0
      });
      if (target) {
        this.mount(target, this);
      }
      if (this.mediaDevices) {
        this.updateVideoSources();
        this.mediaDevices.ondevicechange = () => {
          this.updateVideoSources();
          if (this.stream) {
            let restartStream = true;
            const {
              videoSources,
              currentDeviceId
            } = this.getPluginState();
            videoSources.forEach((videoSource) => {
              if (currentDeviceId === videoSource.deviceId) {
                restartStream = false;
              }
            });
            if (restartStream) {
              this.stop();
              this.start();
            }
          }
        };
      }
    }
    uninstall() {
      this.stop();
      this.unmount();
    }
    onUnmount() {
      this.stop();
    }
  };
  Webcam.VERSION = packageJson20.version;

  // ../packages/@uppy/audio/lib/supportsMediaRecorder.js
  function supportsMediaRecorder2() {
    var _MediaRecorder$protot;
    return typeof MediaRecorder === "function" && typeof ((_MediaRecorder$protot = MediaRecorder.prototype) == null ? void 0 : _MediaRecorder$protot.start) === "function";
  }

  // ../node_modules/preact/hooks/dist/hooks.module.js
  var t3;
  var u3;
  var r3;
  var o3;
  var i3 = 0;
  var c3 = [];
  var f3 = [];
  var e3 = l.__b;
  var a3 = l.__r;
  var v3 = l.diffed;
  var l3 = l.__c;
  var m3 = l.unmount;
  function p3(t4, r4) {
    l.__h && l.__h(u3, t4, i3 || r4), i3 = 0;
    var o4 = u3.__H || (u3.__H = {
      __: [],
      __h: []
    });
    return t4 >= o4.__.length && o4.__.push({
      __V: f3
    }), o4.__[t4];
  }
  function _3(r4, o4) {
    var i4 = p3(t3++, 3);
    !l.__s && w3(i4.__H, o4) && (i4.__ = r4, i4.u = o4, u3.__H.__h.push(i4));
  }
  function s3(n3) {
    return i3 = 5, F2(function() {
      return {
        current: n3
      };
    }, []);
  }
  function F2(n3, u4) {
    var r4 = p3(t3++, 7);
    return w3(r4.__H, u4) ? (r4.__V = n3(), r4.u = u4, r4.__h = n3, r4.__V) : r4.__;
  }
  function b3() {
    for (var t4; t4 = c3.shift(); )
      if (t4.__P)
        try {
          t4.__H.__h.forEach(j3), t4.__H.__h.forEach(k3), t4.__H.__h = [];
        } catch (u4) {
          t4.__H.__h = [], l.__e(u4, t4.__v);
        }
  }
  l.__b = function(n3) {
    u3 = null, e3 && e3(n3);
  }, l.__r = function(n3) {
    a3 && a3(n3), t3 = 0;
    var o4 = (u3 = n3.__c).__H;
    o4 && (r3 === u3 ? (o4.__h = [], u3.__h = [], o4.__.forEach(function(n4) {
      n4.__V = f3, n4.u = void 0;
    })) : (o4.__h.forEach(j3), o4.__h.forEach(k3), o4.__h = [])), r3 = u3;
  }, l.diffed = function(t4) {
    v3 && v3(t4);
    var i4 = t4.__c;
    i4 && i4.__H && (i4.__H.__h.length && (1 !== c3.push(i4) && o3 === l.requestAnimationFrame || ((o3 = l.requestAnimationFrame) || function(n3) {
      var t5, u4 = function() {
        clearTimeout(r4), g3 && cancelAnimationFrame(t5), setTimeout(n3);
      }, r4 = setTimeout(u4, 100);
      g3 && (t5 = requestAnimationFrame(u4));
    })(b3)), i4.__H.__.forEach(function(n3) {
      n3.u && (n3.__H = n3.u), n3.__V !== f3 && (n3.__ = n3.__V), n3.u = void 0, n3.__V = f3;
    })), r3 = u3 = null;
  }, l.__c = function(t4, u4) {
    u4.some(function(t5) {
      try {
        t5.__h.forEach(j3), t5.__h = t5.__h.filter(function(n3) {
          return !n3.__ || k3(n3);
        });
      } catch (r4) {
        u4.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), u4 = [], l.__e(r4, t5.__v);
      }
    }), l3 && l3(t4, u4);
  }, l.unmount = function(t4) {
    m3 && m3(t4);
    var u4, r4 = t4.__c;
    r4 && r4.__H && (r4.__H.__.forEach(function(n3) {
      try {
        j3(n3);
      } catch (n4) {
        u4 = n4;
      }
    }), u4 && l.__e(u4, r4.__v));
  };
  var g3 = "function" == typeof requestAnimationFrame;
  function j3(n3) {
    var t4 = u3, r4 = n3.__c;
    "function" == typeof r4 && (n3.__c = void 0, r4()), u3 = t4;
  }
  function k3(n3) {
    var t4 = u3;
    n3.__c = n3.__(), u3 = t4;
  }
  function w3(n3, t4) {
    return !n3 || n3.length !== t4.length || t4.some(function(t5, u4) {
      return t5 !== n3[u4];
    });
  }

  // ../packages/@uppy/audio/lib/RecordButton.js
  function RecordButton2(_ref) {
    let {
      recording,
      onStartRecording,
      onStopRecording,
      i18n
    } = _ref;
    if (recording) {
      return h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
        type: "button",
        title: i18n("stopAudioRecording"),
        "aria-label": i18n("stopAudioRecording"),
        onClick: onStopRecording,
        "data-uppy-super-focusable": true
      }, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        width: "100",
        height: "100",
        viewBox: "0 0 100 100"
      }, h("rect", {
        x: "15",
        y: "15",
        width: "70",
        height: "70"
      })));
    }
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
      type: "button",
      title: i18n("startAudioRecording"),
      "aria-label": i18n("startAudioRecording"),
      onClick: onStartRecording,
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "14px",
      height: "20px",
      viewBox: "0 0 14 20"
    }, h("path", {
      d: "M7 14c2.21 0 4-1.71 4-3.818V3.818C11 1.71 9.21 0 7 0S3 1.71 3 3.818v6.364C3 12.29 4.79 14 7 14zm6.364-7h-.637a.643.643 0 0 0-.636.65V9.6c0 3.039-2.565 5.477-5.6 5.175-2.645-.264-4.582-2.692-4.582-5.407V7.65c0-.36-.285-.65-.636-.65H.636A.643.643 0 0 0 0 7.65v1.631c0 3.642 2.544 6.888 6.045 7.382v1.387H3.818a.643.643 0 0 0-.636.65v.65c0 .36.285.65.636.65h6.364c.351 0 .636-.29.636-.65v-.65c0-.36-.285-.65-.636-.65H7.955v-1.372C11.363 16.2 14 13.212 14 9.6V7.65c0-.36-.285-.65-.636-.65z",
      fill: "#FFF",
      "fill-rule": "nonzero"
    })));
  }

  // ../packages/@uppy/audio/lib/formatSeconds.js
  function formatSeconds2(seconds) {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, 0)}`;
  }

  // ../packages/@uppy/audio/lib/RecordingLength.js
  function RecordingLength2(_ref) {
    let {
      recordingLengthSeconds,
      i18n
    } = _ref;
    const formattedRecordingLengthSeconds = formatSeconds2(recordingLengthSeconds);
    return h("span", {
      "aria-label": i18n("recordingLength", {
        recording_length: formattedRecordingLengthSeconds
      })
    }, formattedRecordingLengthSeconds);
  }

  // ../packages/@uppy/audio/lib/AudioSourceSelect.js
  var AudioSourceSelect_default = (_ref) => {
    let {
      currentDeviceId,
      audioSources,
      onChangeSource
    } = _ref;
    return h("div", {
      className: "uppy-Audio-videoSource"
    }, h("select", {
      className: "uppy-u-reset uppy-Audio-audioSource-select",
      onChange: (event) => {
        onChangeSource(event.target.value);
      }
    }, audioSources.map((audioSource) => h("option", {
      key: audioSource.deviceId,
      value: audioSource.deviceId,
      selected: audioSource.deviceId === currentDeviceId
    }, audioSource.label))));
  };

  // ../packages/@uppy/audio/lib/audio-oscilloscope/index.js
  function _classPrivateFieldLooseBase12(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id12 = 0;
  function _classPrivateFieldLooseKey12(name) {
    return "__private_" + id12++ + "_" + name;
  }
  function isFunction(v4) {
    return typeof v4 === "function";
  }
  function result(v4) {
    return isFunction(v4) ? v4() : v4;
  }
  var _draw = /* @__PURE__ */ _classPrivateFieldLooseKey12("draw");
  var AudioOscilloscope = class {
    constructor(canvas, options) {
      if (options === void 0) {
        options = {};
      }
      Object.defineProperty(this, _draw, {
        writable: true,
        value: () => this.draw()
      });
      const canvasOptions = options.canvas || {};
      const canvasContextOptions = options.canvasContext || {};
      this.analyser = null;
      this.bufferLength = 0;
      this.dataArray = [];
      this.canvas = canvas;
      this.width = result(canvasOptions.width) || this.canvas.width;
      this.height = result(canvasOptions.height) || this.canvas.height;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvasContext = this.canvas.getContext("2d");
      this.canvasContext.fillStyle = result(canvasContextOptions.fillStyle) || "rgb(255, 255, 255)";
      this.canvasContext.strokeStyle = result(canvasContextOptions.strokeStyle) || "rgb(0, 0, 0)";
      this.canvasContext.lineWidth = result(canvasContextOptions.lineWidth) || 1;
      this.onDrawFrame = isFunction(options.onDrawFrame) ? options.onDrawFrame : () => {
      };
    }
    addSource(streamSource) {
      this.streamSource = streamSource;
      this.audioContext = this.streamSource.context;
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.source = this.audioContext.createBufferSource();
      this.dataArray = new Uint8Array(this.bufferLength);
      this.analyser.getByteTimeDomainData(this.dataArray);
      this.streamSource.connect(this.analyser);
    }
    draw() {
      const {
        analyser,
        dataArray,
        bufferLength
      } = this;
      const ctx = this.canvasContext;
      const w4 = this.width;
      const h3 = this.height;
      if (analyser) {
        analyser.getByteTimeDomainData(dataArray);
      }
      ctx.fillRect(0, 0, w4, h3);
      ctx.beginPath();
      const sliceWidth = w4 * 1 / bufferLength;
      let x3 = 0;
      if (!bufferLength) {
        ctx.moveTo(0, this.height / 2);
      }
      for (let i4 = 0; i4 < bufferLength; i4++) {
        const v4 = dataArray[i4] / 128;
        const y3 = v4 * (h3 / 2);
        if (i4 === 0) {
          ctx.moveTo(x3, y3);
        } else {
          ctx.lineTo(x3, y3);
        }
        x3 += sliceWidth;
      }
      ctx.lineTo(w4, h3 / 2);
      ctx.stroke();
      this.onDrawFrame(this);
      requestAnimationFrame(_classPrivateFieldLooseBase12(this, _draw)[_draw]);
    }
  };

  // ../packages/@uppy/audio/lib/SubmitButton.js
  function SubmitButton2(_ref) {
    let {
      onSubmit,
      i18n
    } = _ref;
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Audio-button uppy-Audio-button--submit",
      type: "button",
      title: i18n("submitRecordedFile"),
      "aria-label": i18n("submitRecordedFile"),
      onClick: onSubmit,
      "data-uppy-super-focusable": true
    }, h("svg", {
      width: "12",
      height: "9",
      viewBox: "0 0 12 9",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon"
    }, h("path", {
      fill: "#fff",
      fillRule: "nonzero",
      d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
    })));
  }
  var SubmitButton_default2 = SubmitButton2;

  // ../packages/@uppy/audio/lib/DiscardButton.js
  function DiscardButton2(_ref) {
    let {
      onDiscard,
      i18n
    } = _ref;
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
      type: "button",
      title: i18n("discardRecordedFile"),
      "aria-label": i18n("discardRecordedFile"),
      onClick: onDiscard,
      "data-uppy-super-focusable": true
    }, h("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 13 13",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      className: "uppy-c-icon"
    }, h("g", {
      fill: "#FFF",
      fillRule: "evenodd"
    }, h("path", {
      d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z"
    }), h("path", {
      d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z"
    }))));
  }
  var DiscardButton_default2 = DiscardButton2;

  // ../packages/@uppy/audio/lib/RecordingScreen.js
  function RecordingScreen(props) {
    const {
      stream,
      recordedAudio,
      onStop,
      recording,
      supportsRecording,
      audioSources,
      showAudioSourceDropdown,
      onSubmit,
      i18n,
      onStartRecording,
      onStopRecording,
      onDiscardRecordedAudio,
      recordingLengthSeconds
    } = props;
    const canvasEl = s3(null);
    const oscilloscope = s3(null);
    _3(() => {
      return () => {
        oscilloscope.current = null;
        onStop();
      };
    }, [onStop]);
    _3(() => {
      if (!recordedAudio) {
        oscilloscope.current = new AudioOscilloscope(canvasEl.current, {
          canvas: {
            width: 600,
            height: 600
          },
          canvasContext: {
            lineWidth: 2,
            fillStyle: "rgb(0,0,0)",
            strokeStyle: "green"
          }
        });
        oscilloscope.current.draw();
        if (stream) {
          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          oscilloscope.current.addSource(source);
        }
      }
    }, [recordedAudio, stream]);
    const hasRecordedAudio = recordedAudio != null;
    const shouldShowRecordButton = !hasRecordedAudio && supportsRecording;
    const shouldShowAudioSourceDropdown = showAudioSourceDropdown && !hasRecordedAudio && audioSources && audioSources.length > 1;
    return h("div", {
      className: "uppy-Audio-container"
    }, h("div", {
      className: "uppy-Audio-audioContainer"
    }, hasRecordedAudio ? h("audio", {
      className: "uppy-Audio-player",
      controls: true,
      src: recordedAudio
    }) : h("canvas", {
      ref: canvasEl,
      className: "uppy-Audio-canvas"
    })), h("div", {
      className: "uppy-Audio-footer"
    }, h("div", {
      className: "uppy-Audio-audioSourceContainer"
    }, shouldShowAudioSourceDropdown ? AudioSourceSelect_default(props) : null), h("div", {
      className: "uppy-Audio-buttonContainer"
    }, shouldShowRecordButton && h(RecordButton2, {
      recording,
      onStartRecording,
      onStopRecording,
      i18n
    }), hasRecordedAudio && h(SubmitButton_default2, {
      onSubmit,
      i18n
    }), hasRecordedAudio && h(DiscardButton_default2, {
      onDiscard: onDiscardRecordedAudio,
      i18n
    })), h("div", {
      className: "uppy-Audio-recordingLength"
    }, !hasRecordedAudio && h(RecordingLength2, {
      recordingLengthSeconds,
      i18n
    }))));
  }

  // ../packages/@uppy/audio/lib/PermissionsScreen.js
  var PermissionsScreen_default2 = (props) => {
    const {
      icon,
      hasAudio,
      i18n
    } = props;
    return h("div", {
      className: "uppy-Audio-permissons"
    }, h("div", {
      className: "uppy-Audio-permissonsIcon"
    }, icon()), h("h1", {
      className: "uppy-Audio-title"
    }, hasAudio ? i18n("allowAudioAccessTitle") : i18n("noAudioTitle")), h("p", null, hasAudio ? i18n("allowAudioAccessDescription") : i18n("noAudioDescription")));
  };

  // ../packages/@uppy/audio/lib/locale.js
  var locale_default15 = {
    strings: {
      pluginNameAudio: "Audio",
      startAudioRecording: "Begin audio recording",
      stopAudioRecording: "Stop audio recording",
      allowAudioAccessTitle: "Please allow access to your microphone",
      allowAudioAccessDescription: "In order to record audio, please allow microphone access for this site.",
      noAudioTitle: "Microphone Not Available",
      noAudioDescription: "In order to record audio, please connect a microphone or another audio input device",
      recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
      recordingLength: "Recording length %{recording_length}",
      submitRecordedFile: "Submit recorded file",
      discardRecordedFile: "Discard recorded file"
    }
  };

  // ../packages/@uppy/audio/lib/Audio.js
  function _extends7() {
    _extends7 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends7.apply(this, arguments);
  }
  function _classPrivateFieldLooseBase13(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id13 = 0;
  function _classPrivateFieldLooseKey13(name) {
    return "__private_" + id13++ + "_" + name;
  }
  var packageJson21 = {
    "version": "1.1.0"
  };
  var _stream = /* @__PURE__ */ _classPrivateFieldLooseKey13("stream");
  var _audioActive = /* @__PURE__ */ _classPrivateFieldLooseKey13("audioActive");
  var _recordingChunks = /* @__PURE__ */ _classPrivateFieldLooseKey13("recordingChunks");
  var _recorder = /* @__PURE__ */ _classPrivateFieldLooseKey13("recorder");
  var _capturedMediaFile = /* @__PURE__ */ _classPrivateFieldLooseKey13("capturedMediaFile");
  var _mediaDevices = /* @__PURE__ */ _classPrivateFieldLooseKey13("mediaDevices");
  var _supportsUserMedia = /* @__PURE__ */ _classPrivateFieldLooseKey13("supportsUserMedia");
  var _hasAudioCheck = /* @__PURE__ */ _classPrivateFieldLooseKey13("hasAudioCheck");
  var _start = /* @__PURE__ */ _classPrivateFieldLooseKey13("start");
  var _startRecording = /* @__PURE__ */ _classPrivateFieldLooseKey13("startRecording");
  var _stopRecording = /* @__PURE__ */ _classPrivateFieldLooseKey13("stopRecording");
  var _discardRecordedAudio = /* @__PURE__ */ _classPrivateFieldLooseKey13("discardRecordedAudio");
  var _submit = /* @__PURE__ */ _classPrivateFieldLooseKey13("submit");
  var _stop = /* @__PURE__ */ _classPrivateFieldLooseKey13("stop");
  var _getAudio = /* @__PURE__ */ _classPrivateFieldLooseKey13("getAudio");
  var _changeSource = /* @__PURE__ */ _classPrivateFieldLooseKey13("changeSource");
  var _updateSources = /* @__PURE__ */ _classPrivateFieldLooseKey13("updateSources");
  var Audio = class extends UIPlugin_default {
    constructor(uppy, opts) {
      var _this;
      super(uppy, opts);
      _this = this;
      Object.defineProperty(this, _getAudio, {
        value: _getAudio2
      });
      Object.defineProperty(this, _hasAudioCheck, {
        value: _hasAudioCheck2
      });
      Object.defineProperty(this, _stream, {
        writable: true,
        value: null
      });
      Object.defineProperty(this, _audioActive, {
        writable: true,
        value: false
      });
      Object.defineProperty(this, _recordingChunks, {
        writable: true,
        value: null
      });
      Object.defineProperty(this, _recorder, {
        writable: true,
        value: null
      });
      Object.defineProperty(this, _capturedMediaFile, {
        writable: true,
        value: null
      });
      Object.defineProperty(this, _mediaDevices, {
        writable: true,
        value: null
      });
      Object.defineProperty(this, _supportsUserMedia, {
        writable: true,
        value: null
      });
      Object.defineProperty(this, _start, {
        writable: true,
        value: function(options) {
          if (options === void 0) {
            options = null;
          }
          if (!_classPrivateFieldLooseBase13(_this, _supportsUserMedia)[_supportsUserMedia]) {
            return Promise.reject(new Error("Microphone access not supported"));
          }
          _classPrivateFieldLooseBase13(_this, _audioActive)[_audioActive] = true;
          _classPrivateFieldLooseBase13(_this, _hasAudioCheck)[_hasAudioCheck]().then((hasAudio) => {
            _this.setPluginState({
              hasAudio
            });
            return _classPrivateFieldLooseBase13(_this, _mediaDevices)[_mediaDevices].getUserMedia({
              audio: true
            }).then((stream) => {
              _classPrivateFieldLooseBase13(_this, _stream)[_stream] = stream;
              let currentDeviceId = null;
              const tracks = stream.getAudioTracks();
              if (!options || !options.deviceId) {
                currentDeviceId = tracks[0].getSettings().deviceId;
              } else {
                tracks.forEach((track) => {
                  if (track.getSettings().deviceId === options.deviceId) {
                    currentDeviceId = track.getSettings().deviceId;
                  }
                });
              }
              _classPrivateFieldLooseBase13(_this, _updateSources)[_updateSources]();
              _this.setPluginState({
                currentDeviceId,
                audioReady: true
              });
            }).catch((err) => {
              _this.setPluginState({
                audioReady: false,
                cameraError: err
              });
              _this.uppy.info(err.message, "error");
            });
          });
        }
      });
      Object.defineProperty(this, _startRecording, {
        writable: true,
        value: () => {
          _classPrivateFieldLooseBase13(this, _recorder)[_recorder] = new MediaRecorder(_classPrivateFieldLooseBase13(this, _stream)[_stream]);
          _classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks] = [];
          let stoppingBecauseOfMaxSize = false;
          _classPrivateFieldLooseBase13(this, _recorder)[_recorder].addEventListener("dataavailable", (event) => {
            _classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks].push(event.data);
            const {
              restrictions
            } = this.uppy.opts;
            if (_classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks].length > 1 && restrictions.maxFileSize != null && !stoppingBecauseOfMaxSize) {
              const totalSize = _classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks].reduce((acc, chunk) => acc + chunk.size, 0);
              const averageChunkSize = (totalSize - _classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks][0].size) / (_classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks].length - 1);
              const expectedEndChunkSize = averageChunkSize * 3;
              const maxSize = Math.max(0, restrictions.maxFileSize - expectedEndChunkSize);
              if (totalSize > maxSize) {
                stoppingBecauseOfMaxSize = true;
                this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3);
                _classPrivateFieldLooseBase13(this, _stopRecording)[_stopRecording]();
              }
            }
          });
          _classPrivateFieldLooseBase13(this, _recorder)[_recorder].start(500);
          this.recordingLengthTimer = setInterval(() => {
            const currentRecordingLength = this.getPluginState().recordingLengthSeconds;
            this.setPluginState({
              recordingLengthSeconds: currentRecordingLength + 1
            });
          }, 1e3);
          this.setPluginState({
            isRecording: true
          });
        }
      });
      Object.defineProperty(this, _stopRecording, {
        writable: true,
        value: () => {
          const stopped = new Promise((resolve) => {
            _classPrivateFieldLooseBase13(this, _recorder)[_recorder].addEventListener("stop", () => {
              resolve();
            });
            _classPrivateFieldLooseBase13(this, _recorder)[_recorder].stop();
            clearInterval(this.recordingLengthTimer);
            this.setPluginState({
              recordingLengthSeconds: 0
            });
          });
          return stopped.then(() => {
            this.setPluginState({
              isRecording: false
            });
            return _classPrivateFieldLooseBase13(this, _getAudio)[_getAudio]();
          }).then((file) => {
            try {
              _classPrivateFieldLooseBase13(this, _capturedMediaFile)[_capturedMediaFile] = file;
              this.setPluginState({
                recordedAudio: URL.createObjectURL(file.data)
              });
            } catch (err) {
              if (!err.isRestriction) {
                this.uppy.log(err);
              }
            }
          }).then(() => {
            _classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks] = null;
            _classPrivateFieldLooseBase13(this, _recorder)[_recorder] = null;
          }, (error) => {
            _classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks] = null;
            _classPrivateFieldLooseBase13(this, _recorder)[_recorder] = null;
            throw error;
          });
        }
      });
      Object.defineProperty(this, _discardRecordedAudio, {
        writable: true,
        value: () => {
          this.setPluginState({
            recordedAudio: null
          });
          _classPrivateFieldLooseBase13(this, _capturedMediaFile)[_capturedMediaFile] = null;
        }
      });
      Object.defineProperty(this, _submit, {
        writable: true,
        value: () => {
          try {
            if (_classPrivateFieldLooseBase13(this, _capturedMediaFile)[_capturedMediaFile]) {
              this.uppy.addFile(_classPrivateFieldLooseBase13(this, _capturedMediaFile)[_capturedMediaFile]);
            }
          } catch (err) {
            if (!err.isRestriction) {
              this.uppy.log(err, "warning");
            }
          }
        }
      });
      Object.defineProperty(this, _stop, {
        writable: true,
        value: async () => {
          if (_classPrivateFieldLooseBase13(this, _stream)[_stream]) {
            const audioTracks = _classPrivateFieldLooseBase13(this, _stream)[_stream].getAudioTracks();
            audioTracks.forEach((track) => track.stop());
          }
          if (_classPrivateFieldLooseBase13(this, _recorder)[_recorder]) {
            await new Promise((resolve) => {
              _classPrivateFieldLooseBase13(this, _recorder)[_recorder].addEventListener("stop", resolve, {
                once: true
              });
              _classPrivateFieldLooseBase13(this, _recorder)[_recorder].stop();
              clearInterval(this.recordingLengthTimer);
            });
          }
          _classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks] = null;
          _classPrivateFieldLooseBase13(this, _recorder)[_recorder] = null;
          _classPrivateFieldLooseBase13(this, _audioActive)[_audioActive] = false;
          _classPrivateFieldLooseBase13(this, _stream)[_stream] = null;
          this.setPluginState({
            recordedAudio: null,
            isRecording: false,
            recordingLengthSeconds: 0
          });
        }
      });
      Object.defineProperty(this, _changeSource, {
        writable: true,
        value: (deviceId) => {
          _classPrivateFieldLooseBase13(this, _stop)[_stop]();
          _classPrivateFieldLooseBase13(this, _start)[_start]({
            deviceId
          });
        }
      });
      Object.defineProperty(this, _updateSources, {
        writable: true,
        value: () => {
          _classPrivateFieldLooseBase13(this, _mediaDevices)[_mediaDevices].enumerateDevices().then((devices) => {
            this.setPluginState({
              audioSources: devices.filter((device) => device.kind === "audioinput")
            });
          });
        }
      });
      _classPrivateFieldLooseBase13(this, _mediaDevices)[_mediaDevices] = navigator.mediaDevices;
      _classPrivateFieldLooseBase13(this, _supportsUserMedia)[_supportsUserMedia] = _classPrivateFieldLooseBase13(this, _mediaDevices)[_mediaDevices] != null;
      this.id = this.opts.id || "Audio";
      this.type = "acquirer";
      this.icon = () => h("svg", {
        className: "uppy-DashboardTab-iconAudio",
        "aria-hidden": "true",
        focusable: "false",
        width: "32px",
        height: "32px",
        viewBox: "0 0 32 32"
      }, h("path", {
        d: "M21.143 12.297c.473 0 .857.383.857.857v2.572c0 3.016-2.24 5.513-5.143 5.931v2.64h2.572a.857.857 0 110 1.714H12.57a.857.857 0 110-1.714h2.572v-2.64C12.24 21.24 10 18.742 10 15.726v-2.572a.857.857 0 111.714 0v2.572A4.29 4.29 0 0016 20.01a4.29 4.29 0 004.286-4.285v-2.572c0-.474.384-.857.857-.857zM16 6.5a3 3 0 013 3v6a3 3 0 01-6 0v-6a3 3 0 013-3z",
        fill: "currentcolor",
        "fill-rule": "nonzero"
      }));
      this.defaultLocale = locale_default15;
      this.opts = {
        ...opts
      };
      this.i18nInit();
      this.title = this.i18n("pluginNameAudio");
      this.setPluginState({
        hasAudio: false,
        audioReady: false,
        cameraError: null,
        recordingLengthSeconds: 0,
        audioSources: [],
        currentDeviceId: null
      });
    }
    render() {
      if (!_classPrivateFieldLooseBase13(this, _audioActive)[_audioActive]) {
        _classPrivateFieldLooseBase13(this, _start)[_start]();
      }
      const audioState = this.getPluginState();
      if (!audioState.audioReady || !audioState.hasAudio) {
        return h(PermissionsScreen_default2, {
          icon: this.icon,
          i18n: this.i18n,
          hasAudio: audioState.hasAudio
        });
      }
      return h(
        RecordingScreen,
        _extends7({}, audioState, {
          audioActive: _classPrivateFieldLooseBase13(this, _audioActive)[_audioActive],
          onChangeSource: _classPrivateFieldLooseBase13(this, _changeSource)[_changeSource],
          onStartRecording: _classPrivateFieldLooseBase13(this, _startRecording)[_startRecording],
          onStopRecording: _classPrivateFieldLooseBase13(this, _stopRecording)[_stopRecording],
          onDiscardRecordedAudio: _classPrivateFieldLooseBase13(this, _discardRecordedAudio)[_discardRecordedAudio],
          onSubmit: _classPrivateFieldLooseBase13(this, _submit)[_submit],
          onStop: _classPrivateFieldLooseBase13(this, _stop)[_stop],
          i18n: this.i18n,
          showAudioSourceDropdown: this.opts.showAudioSourceDropdown,
          supportsRecording: supportsMediaRecorder2(),
          recording: audioState.isRecording,
          stream: _classPrivateFieldLooseBase13(this, _stream)[_stream]
        })
      );
    }
    install() {
      this.setPluginState({
        audioReady: false,
        recordingLengthSeconds: 0
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
      if (_classPrivateFieldLooseBase13(this, _mediaDevices)[_mediaDevices]) {
        _classPrivateFieldLooseBase13(this, _updateSources)[_updateSources]();
        _classPrivateFieldLooseBase13(this, _mediaDevices)[_mediaDevices].ondevicechange = () => {
          _classPrivateFieldLooseBase13(this, _updateSources)[_updateSources]();
          if (_classPrivateFieldLooseBase13(this, _stream)[_stream]) {
            let restartStream = true;
            const {
              audioSources,
              currentDeviceId
            } = this.getPluginState();
            audioSources.forEach((audioSource) => {
              if (currentDeviceId === audioSource.deviceId) {
                restartStream = false;
              }
            });
            if (restartStream) {
              _classPrivateFieldLooseBase13(this, _stop)[_stop]();
              _classPrivateFieldLooseBase13(this, _start)[_start]();
            }
          }
        };
      }
    }
    uninstall() {
      if (_classPrivateFieldLooseBase13(this, _stream)[_stream]) {
        _classPrivateFieldLooseBase13(this, _stop)[_stop]();
      }
      this.unmount();
    }
  };
  function _hasAudioCheck2() {
    if (!_classPrivateFieldLooseBase13(this, _mediaDevices)[_mediaDevices]) {
      return Promise.resolve(false);
    }
    return _classPrivateFieldLooseBase13(this, _mediaDevices)[_mediaDevices].enumerateDevices().then((devices) => {
      return devices.some((device) => device.kind === "audioinput");
    });
  }
  function _getAudio2() {
    const mimeType = _classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks].find((blob2) => {
      var _blob$type;
      return ((_blob$type = blob2.type) == null ? void 0 : _blob$type.length) > 0;
    }).type;
    const fileExtension = getFileTypeExtension(mimeType);
    if (!fileExtension) {
      return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
    }
    const name = `audio-${Date.now()}.${fileExtension}`;
    const blob = new Blob(_classPrivateFieldLooseBase13(this, _recordingChunks)[_recordingChunks], {
      type: mimeType
    });
    const file = {
      source: this.id,
      name,
      data: new Blob([blob], {
        type: mimeType
      }),
      type: mimeType
    };
    return Promise.resolve(file);
  }
  Audio.VERSION = packageJson21.version;

  // ../packages/@uppy/screen-capture/lib/ScreenRecIcon.js
  var ScreenRecIcon_default = () => {
    return h("svg", {
      className: "uppy-DashboardTab-iconScreenRec",
      "aria-hidden": "true",
      focusable: "false",
      width: "32",
      height: "32",
      viewBox: "0 0 32 32"
    }, h("g", {
      fill: "currentcolor",
      fillRule: "evenodd"
    }, h("path", {
      d: "M24.182 9H7.818C6.81 9 6 9.742 6 10.667v10c0 .916.81 1.666 1.818 1.666h4.546V24h7.272v-1.667h4.546c1 0 1.809-.75 1.809-1.666l.009-10C26 9.742 25.182 9 24.182 9zM24 21H8V11h16v10z"
    }), h("circle", {
      cx: "16",
      cy: "16",
      r: "2"
    })));
  };

  // ../packages/@uppy/screen-capture/lib/RecordButton.js
  function RecordButton3(_ref) {
    let {
      recording,
      onStartRecording,
      onStopRecording,
      i18n
    } = _ref;
    if (recording) {
      return h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video uppy-ScreenCapture-button--stop-rec",
        type: "button",
        title: i18n("stopCapturing"),
        "aria-label": i18n("stopCapturing"),
        onClick: onStopRecording,
        "data-uppy-super-focusable": true
      }, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon",
        width: "100",
        height: "100",
        viewBox: "0 0 100 100"
      }, h("rect", {
        x: "15",
        y: "15",
        width: "70",
        height: "70"
      })));
    }
    return h("button", {
      className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video",
      type: "button",
      title: i18n("startCapturing"),
      "aria-label": i18n("startCapturing"),
      onClick: onStartRecording,
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "100",
      height: "100",
      viewBox: "0 0 100 100"
    }, h("circle", {
      cx: "50",
      cy: "50",
      r: "40"
    })));
  }

  // ../packages/@uppy/screen-capture/lib/SubmitButton.js
  function SubmitButton3(_ref) {
    let {
      recording,
      recordedVideo,
      onSubmit,
      i18n
    } = _ref;
    if (recordedVideo && !recording) {
      return h("button", {
        className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--submit",
        type: "button",
        title: i18n("submitRecordedFile"),
        "aria-label": i18n("submitRecordedFile"),
        onClick: onSubmit,
        "data-uppy-super-focusable": true
      }, h("svg", {
        width: "12",
        height: "9",
        viewBox: "0 0 12 9",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon"
      }, h("path", {
        fill: "#fff",
        fillRule: "nonzero",
        d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
      })));
    }
    return null;
  }

  // ../packages/@uppy/screen-capture/lib/StopWatch.js
  var StopWatch = class extends d {
    constructor(props) {
      super(props);
      this.state = {
        elapsedTime: 0
      };
      this.wrapperStyle = {
        width: "100%",
        height: "100%",
        display: "flex"
      };
      this.overlayStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "black",
        opacity: 0.7
      };
      this.infoContainerStyle = {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        zIndex: 1,
        color: "white"
      };
      this.infotextStyle = {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "1rem",
        fontSize: "1.5rem"
      };
      this.timeStyle = {
        display: "block",
        fontWeight: "bold",
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: "3rem",
        fontFamily: "Courier New"
      };
    }
    startTimer() {
      this.timerTick();
      this.timerRunning = true;
    }
    resetTimer() {
      clearTimeout(this.timer);
      this.setState({
        elapsedTime: 0
      });
      this.timerRunning = false;
    }
    timerTick() {
      this.timer = setTimeout(() => {
        this.setState((state) => ({
          elapsedTime: state.elapsedTime + 1
        }));
        this.timerTick();
      }, 1e3);
    }
    fmtMSS(s4) {
      return (s4 - (s4 %= 60)) / 60 + (s4 > 9 ? ":" : ":0") + s4;
    }
    render() {
      const {
        recording,
        i18n
      } = {
        ...this.props
      };
      const {
        elapsedTime
      } = this.state;
      const minAndSec = this.fmtMSS(elapsedTime);
      if (recording && !this.timerRunning) {
        this.startTimer();
      }
      if (!recording && this.timerRunning) {
        this.resetTimer();
      }
      if (recording) {
        return h("div", {
          style: this.wrapperStyle
        }, h("div", {
          style: this.overlayStyle
        }), h("div", {
          style: this.infoContainerStyle
        }, h("div", {
          style: this.infotextStyle
        }, i18n("recording")), h("div", {
          style: this.timeStyle
        }, minAndSec)));
      }
      return null;
    }
  };
  var StopWatch_default = StopWatch;

  // ../packages/@uppy/screen-capture/lib/StreamStatus.js
  var StreamStatus_default = (_ref) => {
    let {
      streamActive,
      i18n
    } = _ref;
    if (streamActive) {
      return h("div", {
        title: i18n("streamActive"),
        "aria-label": i18n("streamActive"),
        className: "uppy-ScreenCapture-icon--stream uppy-ScreenCapture-icon--streamActive"
      }, h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, h("path", {
        d: "M0 0h24v24H0z",
        opacity: ".1",
        fill: "none"
      }), h("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }), h("path", {
        d: "M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
      })));
    }
    return h("div", {
      title: i18n("streamPassive"),
      "aria-label": i18n("streamPassive"),
      className: "uppy-ScreenCapture-icon--stream"
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, h("path", {
      d: "M0 0h24v24H0z",
      opacity: ".1",
      fill: "none"
    }), h("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    }), h("path", {
      d: "M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11z"
    })));
  };

  // ../packages/@uppy/screen-capture/lib/RecorderScreen.js
  function _extends8() {
    _extends8 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends8.apply(this, arguments);
  }
  var RecorderScreen = class extends d {
    componentWillUnmount() {
      const {
        onStop
      } = this.props;
      onStop();
    }
    render() {
      const {
        recording,
        stream: videoStream,
        recordedVideo
      } = this.props;
      const videoProps = {
        playsinline: true
      };
      if (recording || !recordedVideo && !recording) {
        videoProps.muted = true;
        videoProps.autoplay = true;
        videoProps.srcObject = videoStream;
      }
      if (recordedVideo && !recording) {
        videoProps.muted = false;
        videoProps.controls = true;
        videoProps.src = recordedVideo;
        if (this.videoElement) {
          this.videoElement.srcObject = void 0;
        }
      }
      return h("div", {
        className: "uppy uppy-ScreenCapture-container"
      }, h("div", {
        className: "uppy-ScreenCapture-videoContainer"
      }, h(StreamStatus_default, this.props), h("video", _extends8({
        ref: (videoElement) => {
          this.videoElement = videoElement;
        },
        className: "uppy-ScreenCapture-video"
      }, videoProps)), h(StopWatch_default, this.props)), h("div", {
        className: "uppy-ScreenCapture-buttonContainer"
      }, h(RecordButton3, this.props), h(SubmitButton3, this.props)));
    }
  };
  var RecorderScreen_default = RecorderScreen;

  // ../packages/@uppy/screen-capture/lib/locale.js
  var locale_default16 = {
    strings: {
      startCapturing: "Begin screen capturing",
      stopCapturing: "Stop screen capturing",
      submitRecordedFile: "Submit recorded file",
      streamActive: "Stream active",
      streamPassive: "Stream passive",
      micDisabled: "Microphone access denied by user",
      recording: "Recording"
    }
  };

  // ../packages/@uppy/screen-capture/lib/ScreenCapture.js
  function _extends9() {
    _extends9 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends9.apply(this, arguments);
  }
  var packageJson22 = {
    "version": "3.1.0"
  };
  function isScreenRecordingSupported() {
    var _navigator$mediaDevic;
    return window.MediaRecorder && ((_navigator$mediaDevic = navigator.mediaDevices) == null ? void 0 : _navigator$mediaDevic.getDisplayMedia);
  }
  function getMediaDevices2() {
    return window.MediaRecorder && navigator.mediaDevices;
  }
  var ScreenCapture = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.mediaDevices = getMediaDevices2();
      this.protocol = location.protocol === "https:" ? "https" : "http";
      this.id = this.opts.id || "ScreenCapture";
      this.title = this.opts.title || "Screencast";
      this.type = "acquirer";
      this.icon = ScreenRecIcon_default;
      this.defaultLocale = locale_default16;
      const defaultOptions4 = {
        displayMediaConstraints: {
          video: {
            width: 1280,
            height: 720,
            frameRate: {
              ideal: 3,
              max: 5
            },
            cursor: "motion",
            displaySurface: "monitor"
          }
        },
        userMediaConstraints: {
          audio: true
        },
        preferredVideoMimeType: "video/webm"
      };
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      this.i18nInit();
      this.install = this.install.bind(this);
      this.setPluginState = this.setPluginState.bind(this);
      this.render = this.render.bind(this);
      this.start = this.start.bind(this);
      this.stop = this.stop.bind(this);
      this.startRecording = this.startRecording.bind(this);
      this.stopRecording = this.stopRecording.bind(this);
      this.submit = this.submit.bind(this);
      this.streamInterrupted = this.streamInactivated.bind(this);
      this.captureActive = false;
      this.capturedMediaFile = null;
    }
    install() {
      if (!isScreenRecordingSupported()) {
        this.uppy.log("Screen recorder access is not supported", "warning");
        return null;
      }
      this.setPluginState({
        streamActive: false,
        audioStreamActive: false
      });
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
      return void 0;
    }
    uninstall() {
      if (this.videoStream) {
        this.stop();
      }
      this.unmount();
    }
    start() {
      if (!this.mediaDevices) {
        return Promise.reject(new Error("Screen recorder access not supported"));
      }
      this.captureActive = true;
      this.selectAudioStreamSource();
      return this.selectVideoStreamSource().then((res) => {
        if (res === false) {
          if (this.parent && this.parent.hideAllPanels) {
            this.parent.hideAllPanels();
            this.captureActive = false;
          }
        }
      });
    }
    selectVideoStreamSource() {
      if (this.videoStream) {
        return new Promise((resolve) => resolve(this.videoStream));
      }
      return this.mediaDevices.getDisplayMedia(this.opts.displayMediaConstraints).then((videoStream) => {
        this.videoStream = videoStream;
        this.videoStream.addEventListener("inactive", () => {
          this.streamInactivated();
        });
        this.setPluginState({
          streamActive: true
        });
        return videoStream;
      }).catch((err) => {
        this.setPluginState({
          screenRecError: err
        });
        this.userDenied = true;
        setTimeout(() => {
          this.userDenied = false;
        }, 1e3);
        return false;
      });
    }
    selectAudioStreamSource() {
      if (this.audioStream) {
        return new Promise((resolve) => resolve(this.audioStream));
      }
      return this.mediaDevices.getUserMedia(this.opts.userMediaConstraints).then((audioStream) => {
        this.audioStream = audioStream;
        this.setPluginState({
          audioStreamActive: true
        });
        return audioStream;
      }).catch((err) => {
        if (err.name === "NotAllowedError") {
          this.uppy.info(this.i18n("micDisabled"), "error", 5e3);
          this.uppy.log(this.i18n("micDisabled"), "warning");
        }
        return false;
      });
    }
    startRecording() {
      const options = {};
      this.capturedMediaFile = null;
      this.recordingChunks = [];
      const {
        preferredVideoMimeType
      } = this.opts;
      this.selectVideoStreamSource().then((videoStream) => {
        if (preferredVideoMimeType && MediaRecorder.isTypeSupported(preferredVideoMimeType) && getFileTypeExtension(preferredVideoMimeType)) {
          options.mimeType = preferredVideoMimeType;
        }
        const tracks = [videoStream.getVideoTracks()[0]];
        if (this.audioStream) {
          tracks.push(this.audioStream.getAudioTracks()[0]);
        }
        this.outputStream = new MediaStream(tracks);
        this.recorder = new MediaRecorder(this.outputStream, options);
        this.recorder.addEventListener("dataavailable", (event) => {
          this.recordingChunks.push(event.data);
        });
        this.recorder.start();
        this.setPluginState({
          recording: true
        });
      }).catch((err) => {
        this.uppy.log(err, "error");
      });
    }
    streamInactivated() {
      const {
        recordedVideo,
        recording
      } = {
        ...this.getPluginState()
      };
      if (!recordedVideo && !recording) {
        if (this.parent && this.parent.hideAllPanels) {
          this.parent.hideAllPanels();
        }
      } else if (recording) {
        this.uppy.log("Capture stream inactive \u2014 stop recording");
        this.stopRecording();
      }
      this.videoStream = null;
      this.audioStream = null;
      this.setPluginState({
        streamActive: false,
        audioStreamActive: false
      });
    }
    stopRecording() {
      const stopped = new Promise((resolve) => {
        this.recorder.addEventListener("stop", () => {
          resolve();
        });
        this.recorder.stop();
      });
      return stopped.then(() => {
        this.setPluginState({
          recording: false
        });
        return this.getVideo();
      }).then((file) => {
        this.capturedMediaFile = file;
        this.setPluginState({
          recordedVideo: URL.createObjectURL(file.data)
        });
      }).then(() => {
        this.recordingChunks = null;
        this.recorder = null;
      }, (error) => {
        this.recordingChunks = null;
        this.recorder = null;
        throw error;
      });
    }
    submit() {
      try {
        if (this.capturedMediaFile) {
          this.uppy.addFile(this.capturedMediaFile);
        }
      } catch (err) {
        if (!err.isRestriction) {
          this.uppy.log(err, "warning");
        }
      }
    }
    stop() {
      if (this.videoStream) {
        this.videoStream.getVideoTracks().forEach((track) => {
          track.stop();
        });
        this.videoStream.getAudioTracks().forEach((track) => {
          track.stop();
        });
        this.videoStream = null;
      }
      if (this.audioStream) {
        this.audioStream.getAudioTracks().forEach((track) => {
          track.stop();
        });
        this.audioStream.getVideoTracks().forEach((track) => {
          track.stop();
        });
        this.audioStream = null;
      }
      if (this.outputStream) {
        this.outputStream.getAudioTracks().forEach((track) => {
          track.stop();
        });
        this.outputStream.getVideoTracks().forEach((track) => {
          track.stop();
        });
        this.outputStream = null;
      }
      this.setPluginState({
        recordedVideo: null
      });
      this.captureActive = false;
    }
    getVideo() {
      const mimeType = this.recordingChunks[0].type;
      const fileExtension = getFileTypeExtension(mimeType);
      if (!fileExtension) {
        return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
      }
      const name = `screencap-${Date.now()}.${fileExtension}`;
      const blob = new Blob(this.recordingChunks, {
        type: mimeType
      });
      const file = {
        source: this.id,
        name,
        data: new Blob([blob], {
          type: mimeType
        }),
        type: mimeType
      };
      return Promise.resolve(file);
    }
    render() {
      const recorderState = this.getPluginState();
      if (!recorderState.streamActive && !this.captureActive && !this.userDenied) {
        this.start();
      }
      return h(RecorderScreen_default, _extends9({}, recorderState, {
        onStartRecording: this.startRecording,
        onStopRecording: this.stopRecording,
        onStop: this.stop,
        onSubmit: this.submit,
        i18n: this.i18n,
        stream: this.videoStream
      }));
    }
  };
  ScreenCapture.VERSION = packageJson22.version;

  // ../node_modules/js-base64/base64.mjs
  var version = "3.7.2";
  var VERSION = version;
  var _hasatob = typeof atob === "function";
  var _hasbtoa = typeof btoa === "function";
  var _hasBuffer = typeof Buffer === "function";
  var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
  var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
  var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var b64chs = Array.prototype.slice.call(b64ch);
  var b64tab = ((a4) => {
    let tab = {};
    a4.forEach((c4, i4) => tab[c4] = i4);
    return tab;
  })(b64chs);
  var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
  var _fromCC = String.fromCharCode.bind(String);
  var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it, fn = (x3) => x3) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
  var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
  var _tidyB64 = (s4) => s4.replace(/[^A-Za-z0-9\+\/]/g, "");
  var btoaPolyfill = (bin) => {
    let u32, c0, c1, c22, asc = "";
    const pad2 = bin.length % 3;
    for (let i4 = 0; i4 < bin.length; ) {
      if ((c0 = bin.charCodeAt(i4++)) > 255 || (c1 = bin.charCodeAt(i4++)) > 255 || (c22 = bin.charCodeAt(i4++)) > 255)
        throw new TypeError("invalid character found");
      u32 = c0 << 16 | c1 << 8 | c22;
      asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
    }
    return pad2 ? asc.slice(0, pad2 - 3) + "===".substring(pad2) : asc;
  };
  var _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
  var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
    const maxargs = 4096;
    let strs = [];
    for (let i4 = 0, l4 = u8a.length; i4 < l4; i4 += maxargs) {
      strs.push(_fromCC.apply(null, u8a.subarray(i4, i4 + maxargs)));
    }
    return _btoa(strs.join(""));
  };
  var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
  var cb_utob = (c4) => {
    if (c4.length < 2) {
      var cc = c4.charCodeAt(0);
      return cc < 128 ? c4 : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    } else {
      var cc = 65536 + (c4.charCodeAt(0) - 55296) * 1024 + (c4.charCodeAt(1) - 56320);
      return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    }
  };
  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  var utob = (u4) => u4.replace(re_utob, cb_utob);
  var _encode = _hasBuffer ? (s4) => Buffer.from(s4, "utf8").toString("base64") : _TE ? (s4) => _fromUint8Array(_TE.encode(s4)) : (s4) => _btoa(utob(s4));
  var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
  var encodeURI = (src) => encode(src, true);
  var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
  var cb_btou = (cccc) => {
    switch (cccc.length) {
      case 4:
        var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
        return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
      case 3:
        return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
      default:
        return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
    }
  };
  var btou = (b4) => b4.replace(re_btou, cb_btou);
  var atobPolyfill = (asc) => {
    asc = asc.replace(/\s+/g, "");
    if (!b64re.test(asc))
      throw new TypeError("malformed base64.");
    asc += "==".slice(2 - (asc.length & 3));
    let u24, bin = "", r1, r22;
    for (let i4 = 0; i4 < asc.length; ) {
      u24 = b64tab[asc.charAt(i4++)] << 18 | b64tab[asc.charAt(i4++)] << 12 | (r1 = b64tab[asc.charAt(i4++)]) << 6 | (r22 = b64tab[asc.charAt(i4++)]);
      bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r22 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
  };
  var _atob = _hasatob ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
  var _toUint8Array = _hasBuffer ? (a4) => _U8Afrom(Buffer.from(a4, "base64")) : (a4) => _U8Afrom(_atob(a4), (c4) => c4.charCodeAt(0));
  var toUint8Array = (a4) => _toUint8Array(_unURI(a4));
  var _decode = _hasBuffer ? (a4) => Buffer.from(a4, "base64").toString("utf8") : _TD ? (a4) => _TD.decode(_toUint8Array(a4)) : (a4) => btou(_atob(a4));
  var _unURI = (a4) => _tidyB64(a4.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
  var decode = (src) => _decode(_unURI(src));
  var isValid = (src) => {
    if (typeof src !== "string")
      return false;
    const s4 = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
    return !/[^\s0-9a-zA-Z\+/]/.test(s4) || !/[^\s0-9a-zA-Z\-_]/.test(s4);
  };
  var _noEnum = (v4) => {
    return {
      value: v4,
      enumerable: false,
      writable: true,
      configurable: true
    };
  };
  var extendString = function() {
    const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
    _add("fromBase64", function() {
      return decode(this);
    });
    _add("toBase64", function(urlsafe) {
      return encode(this, urlsafe);
    });
    _add("toBase64URI", function() {
      return encode(this, true);
    });
    _add("toBase64URL", function() {
      return encode(this, true);
    });
    _add("toUint8Array", function() {
      return toUint8Array(this);
    });
  };
  var extendUint8Array = function() {
    const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    _add("toBase64", function(urlsafe) {
      return fromUint8Array(this, urlsafe);
    });
    _add("toBase64URI", function() {
      return fromUint8Array(this, true);
    });
    _add("toBase64URL", function() {
      return fromUint8Array(this, true);
    });
  };
  var extendBuiltins = () => {
    extendString();
    extendUint8Array();
  };
  var gBase64 = {
    version,
    VERSION,
    atob: _atob,
    atobPolyfill,
    btoa: _btoa,
    btoaPolyfill,
    fromBase64: decode,
    toBase64: encode,
    encode,
    encodeURI,
    encodeURL: encodeURI,
    utob,
    btou,
    decode,
    isValid,
    fromUint8Array,
    toUint8Array,
    extendString,
    extendUint8Array,
    extendBuiltins
  };

  // ../node_modules/tus-js-client/lib.esm/upload.js
  var import_url_parse = __toESM(require_url_parse());

  // ../node_modules/tus-js-client/lib.esm/error.js
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _defineProperties(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass)
      _setPrototypeOf(subClass, superClass);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived), result2;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result2 = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result2 = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result2);
    };
  }
  function _possibleConstructorReturn(self2, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self2);
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
    _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
      if (Class2 === null || !_isNativeFunction(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class2);
    };
    return _wrapNativeSuper(Class);
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct2(Parent2, args2, Class2) {
        var a4 = [null];
        a4.push.apply(a4, args2);
        var Constructor = Function.bind.apply(Parent2, a4);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e4) {
      return false;
    }
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _setPrototypeOf(o4, p4) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o5, p5) {
      o5.__proto__ = p5;
      return o5;
    };
    return _setPrototypeOf(o4, p4);
  }
  function _getPrototypeOf(o4) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o5) {
      return o5.__proto__ || Object.getPrototypeOf(o5);
    };
    return _getPrototypeOf(o4);
  }
  var DetailedError = /* @__PURE__ */ function(_Error) {
    _inherits(DetailedError2, _Error);
    var _super = _createSuper(DetailedError2);
    function DetailedError2(message) {
      var _this;
      var causingErr = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var req = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      var res = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      _classCallCheck(this, DetailedError2);
      _this = _super.call(this, message);
      _this.originalRequest = req;
      _this.originalResponse = res;
      _this.causingError = causingErr;
      if (causingErr != null) {
        message += ", caused by ".concat(causingErr.toString());
      }
      if (req != null) {
        var requestId = req.getHeader("X-Request-ID") || "n/a";
        var method = req.getMethod();
        var url = req.getURL();
        var status = res ? res.getStatus() : "n/a";
        var body = res ? res.getBody() || "" : "n/a";
        message += ", originated from request (method: ".concat(method, ", url: ").concat(url, ", response code: ").concat(status, ", response text: ").concat(body, ", request id: ").concat(requestId, ")");
      }
      _this.message = message;
      return _this;
    }
    return _createClass(DetailedError2);
  }(/* @__PURE__ */ _wrapNativeSuper(Error));
  var error_default = DetailedError;

  // ../node_modules/tus-js-client/lib.esm/logger.js
  var isEnabled = false;
  function log(msg) {
    if (!isEnabled)
      return;
    console.log(msg);
  }

  // ../node_modules/tus-js-client/lib.esm/uuid.js
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c4) {
      var r4 = Math.random() * 16 | 0;
      var v4 = c4 === "x" ? r4 : r4 & 3 | 8;
      return v4.toString(16);
    });
  }

  // ../node_modules/tus-js-client/lib.esm/upload.js
  function _slicedToArray(arr, i4) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i4) || _unsupportedIterableToArray(arr, i4) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o4, minLen) {
    if (!o4)
      return;
    if (typeof o4 === "string")
      return _arrayLikeToArray(o4, minLen);
    var n3 = Object.prototype.toString.call(o4).slice(8, -1);
    if (n3 === "Object" && o4.constructor)
      n3 = o4.constructor.name;
    if (n3 === "Map" || n3 === "Set")
      return Array.from(o4);
    if (n3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3))
      return _arrayLikeToArray(o4, minLen);
  }
  function _arrayLikeToArray(arr, len2) {
    if (len2 == null || len2 > arr.length)
      len2 = arr.length;
    for (var i4 = 0, arr2 = new Array(len2); i4 < len2; i4++) {
      arr2[i4] = arr[i4];
    }
    return arr2;
  }
  function _iterableToArrayLimit(arr, i4) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i4 && _arr.length === i4)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i4 = 1; i4 < arguments.length; i4++) {
      var source = null != arguments[i4] ? arguments[i4] : {};
      i4 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties2(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties2(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var defaultOptions2 = {
    endpoint: null,
    uploadUrl: null,
    metadata: {},
    fingerprint: null,
    uploadSize: null,
    onProgress: null,
    onChunkComplete: null,
    onSuccess: null,
    onError: null,
    _onUploadUrlAvailable: null,
    overridePatchMethod: false,
    headers: {},
    addRequestId: false,
    onBeforeRequest: null,
    onAfterResponse: null,
    onShouldRetry: null,
    chunkSize: Infinity,
    retryDelays: [0, 1e3, 3e3, 5e3],
    parallelUploads: 1,
    parallelUploadBoundaries: null,
    storeFingerprintForResuming: true,
    removeFingerprintOnSuccess: false,
    uploadLengthDeferred: false,
    uploadDataDuringCreation: false,
    urlStorage: null,
    fileReader: null,
    httpStack: null
  };
  var BaseUpload = /* @__PURE__ */ function() {
    function BaseUpload2(file, options) {
      _classCallCheck2(this, BaseUpload2);
      if ("resume" in options) {
        console.log("tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead.");
      }
      this.options = options;
      this.options.chunkSize = Number(this.options.chunkSize);
      this._urlStorage = this.options.urlStorage;
      this.file = file;
      this.url = null;
      this._req = null;
      this._fingerprint = null;
      this._urlStorageKey = null;
      this._offset = null;
      this._aborted = false;
      this._size = null;
      this._source = null;
      this._retryAttempt = 0;
      this._retryTimeout = null;
      this._offsetBeforeRetry = 0;
      this._parallelUploads = null;
      this._parallelUploadUrls = null;
    }
    _createClass2(BaseUpload2, [{
      key: "findPreviousUploads",
      value: function findPreviousUploads() {
        var _this = this;
        return this.options.fingerprint(this.file, this.options).then(function(fingerprint2) {
          return _this._urlStorage.findUploadsByFingerprint(fingerprint2);
        });
      }
    }, {
      key: "resumeFromPreviousUpload",
      value: function resumeFromPreviousUpload(previousUpload) {
        this.url = previousUpload.uploadUrl || null;
        this._parallelUploadUrls = previousUpload.parallelUploadUrls || null;
        this._urlStorageKey = previousUpload.urlStorageKey;
      }
    }, {
      key: "start",
      value: function start() {
        var _this2 = this;
        var file = this.file;
        if (!file) {
          this._emitError(new Error("tus: no file or stream to upload provided"));
          return;
        }
        if (!this.options.endpoint && !this.options.uploadUrl && !this.url) {
          this._emitError(new Error("tus: neither an endpoint or an upload URL is provided"));
          return;
        }
        var retryDelays = this.options.retryDelays;
        if (retryDelays != null && Object.prototype.toString.call(retryDelays) !== "[object Array]") {
          this._emitError(new Error("tus: the `retryDelays` option must either be an array or null"));
          return;
        }
        if (this.options.parallelUploads > 1) {
          for (var _i = 0, _arr = ["uploadUrl", "uploadSize", "uploadLengthDeferred"]; _i < _arr.length; _i++) {
            var optionName = _arr[_i];
            if (this.options[optionName]) {
              this._emitError(new Error("tus: cannot use the ".concat(optionName, " option when parallelUploads is enabled")));
              return;
            }
          }
        }
        if (this.options.parallelUploadBoundaries) {
          if (this.options.parallelUploads <= 1) {
            this._emitError(new Error("tus: cannot use the `parallelUploadBoundaries` option when `parallelUploads` is disabled"));
            return;
          }
          if (this.options.parallelUploads !== this.options.parallelUploadBoundaries.length) {
            this._emitError(new Error("tus: the `parallelUploadBoundaries` must have the same length as the value of `parallelUploads`"));
            return;
          }
        }
        this.options.fingerprint(file, this.options).then(function(fingerprint2) {
          if (fingerprint2 == null) {
            log("No fingerprint was calculated meaning that the upload cannot be stored in the URL storage.");
          } else {
            log("Calculated fingerprint: ".concat(fingerprint2));
          }
          _this2._fingerprint = fingerprint2;
          if (_this2._source) {
            return _this2._source;
          }
          return _this2.options.fileReader.openFile(file, _this2.options.chunkSize);
        }).then(function(source) {
          _this2._source = source;
          if (_this2.options.uploadLengthDeferred) {
            _this2._size = null;
          } else if (_this2.options.uploadSize != null) {
            _this2._size = Number(_this2.options.uploadSize);
            if (Number.isNaN(_this2._size)) {
              _this2._emitError(new Error("tus: cannot convert `uploadSize` option into a number"));
              return;
            }
          } else {
            _this2._size = _this2._source.size;
            if (_this2._size == null) {
              _this2._emitError(new Error("tus: cannot automatically derive upload's size from input. Specify it manually using the `uploadSize` option or use the `uploadLengthDeferred` option"));
              return;
            }
          }
          if (_this2.options.parallelUploads > 1 || _this2._parallelUploadUrls != null) {
            _this2._startParallelUpload();
          } else {
            _this2._startSingleUpload();
          }
        })["catch"](function(err) {
          _this2._emitError(err);
        });
      }
    }, {
      key: "_startParallelUpload",
      value: function _startParallelUpload() {
        var _this$options$paralle, _this3 = this;
        var totalSize = this._size;
        var totalProgress = 0;
        this._parallelUploads = [];
        var partCount = this._parallelUploadUrls != null ? this._parallelUploadUrls.length : this.options.parallelUploads;
        var parts = (_this$options$paralle = this.options.parallelUploadBoundaries) !== null && _this$options$paralle !== void 0 ? _this$options$paralle : splitSizeIntoParts(this._source.size, partCount);
        if (this._parallelUploadUrls) {
          parts.forEach(function(part, index) {
            part.uploadUrl = _this3._parallelUploadUrls[index] || null;
          });
        }
        this._parallelUploadUrls = new Array(parts.length);
        var uploads = parts.map(function(part, index) {
          var lastPartProgress = 0;
          return _this3._source.slice(part.start, part.end).then(function(_ref) {
            var value = _ref.value;
            return new Promise(function(resolve, reject) {
              var options = _objectSpread(_objectSpread({}, _this3.options), {}, {
                uploadUrl: part.uploadUrl || null,
                storeFingerprintForResuming: false,
                removeFingerprintOnSuccess: false,
                parallelUploads: 1,
                parallelUploadBoundaries: null,
                metadata: {},
                headers: _objectSpread(_objectSpread({}, _this3.options.headers), {}, {
                  "Upload-Concat": "partial"
                }),
                onSuccess: resolve,
                onError: reject,
                onProgress: function onProgress(newPartProgress) {
                  totalProgress = totalProgress - lastPartProgress + newPartProgress;
                  lastPartProgress = newPartProgress;
                  _this3._emitProgress(totalProgress, totalSize);
                },
                _onUploadUrlAvailable: function _onUploadUrlAvailable() {
                  _this3._parallelUploadUrls[index] = upload.url;
                  if (_this3._parallelUploadUrls.filter(function(u4) {
                    return Boolean(u4);
                  }).length === parts.length) {
                    _this3._saveUploadInUrlStorage();
                  }
                }
              });
              var upload = new BaseUpload2(value, options);
              upload.start();
              _this3._parallelUploads.push(upload);
            });
          });
        });
        var req;
        Promise.all(uploads).then(function() {
          req = _this3._openRequest("POST", _this3.options.endpoint);
          req.setHeader("Upload-Concat", "final;".concat(_this3._parallelUploadUrls.join(" ")));
          var metadata = encodeMetadata(_this3.options.metadata);
          if (metadata !== "") {
            req.setHeader("Upload-Metadata", metadata);
          }
          return _this3._sendRequest(req, null);
        }).then(function(res) {
          if (!inStatusCategory(res.getStatus(), 200)) {
            _this3._emitHttpError(req, res, "tus: unexpected response while creating upload");
            return;
          }
          var location2 = res.getHeader("Location");
          if (location2 == null) {
            _this3._emitHttpError(req, res, "tus: invalid or missing Location header");
            return;
          }
          _this3.url = resolveUrl(_this3.options.endpoint, location2);
          log("Created upload at ".concat(_this3.url));
          _this3._emitSuccess();
        })["catch"](function(err) {
          _this3._emitError(err);
        });
      }
    }, {
      key: "_startSingleUpload",
      value: function _startSingleUpload() {
        this._aborted = false;
        if (this.url != null) {
          log("Resuming upload from previous URL: ".concat(this.url));
          this._resumeUpload();
          return;
        }
        if (this.options.uploadUrl != null) {
          log("Resuming upload from provided URL: ".concat(this.options.uploadUrl));
          this.url = this.options.uploadUrl;
          this._resumeUpload();
          return;
        }
        log("Creating a new upload");
        this._createUpload();
      }
    }, {
      key: "abort",
      value: function abort(shouldTerminate) {
        var _this4 = this;
        if (this._parallelUploads != null) {
          this._parallelUploads.forEach(function(upload) {
            upload.abort(shouldTerminate);
          });
        }
        if (this._req !== null) {
          this._req.abort();
        }
        this._aborted = true;
        if (this._retryTimeout != null) {
          clearTimeout(this._retryTimeout);
          this._retryTimeout = null;
        }
        if (!shouldTerminate || this.url == null) {
          return Promise.resolve();
        }
        return BaseUpload2.terminate(this.url, this.options).then(function() {
          return _this4._removeFromUrlStorage();
        });
      }
    }, {
      key: "_emitHttpError",
      value: function _emitHttpError(req, res, message, causingErr) {
        this._emitError(new error_default(message, causingErr, req, res));
      }
    }, {
      key: "_emitError",
      value: function _emitError(err) {
        var _this5 = this;
        if (this._aborted)
          return;
        if (this.options.retryDelays != null) {
          var shouldResetDelays = this._offset != null && this._offset > this._offsetBeforeRetry;
          if (shouldResetDelays) {
            this._retryAttempt = 0;
          }
          if (shouldRetry(err, this._retryAttempt, this.options)) {
            var delay = this.options.retryDelays[this._retryAttempt++];
            this._offsetBeforeRetry = this._offset;
            this._retryTimeout = setTimeout(function() {
              _this5.start();
            }, delay);
            return;
          }
        }
        if (typeof this.options.onError === "function") {
          this.options.onError(err);
        } else {
          throw err;
        }
      }
    }, {
      key: "_emitSuccess",
      value: function _emitSuccess() {
        if (this.options.removeFingerprintOnSuccess) {
          this._removeFromUrlStorage();
        }
        if (typeof this.options.onSuccess === "function") {
          this.options.onSuccess();
        }
      }
    }, {
      key: "_emitProgress",
      value: function _emitProgress(bytesSent, bytesTotal) {
        if (typeof this.options.onProgress === "function") {
          this.options.onProgress(bytesSent, bytesTotal);
        }
      }
    }, {
      key: "_emitChunkComplete",
      value: function _emitChunkComplete(chunkSize, bytesAccepted, bytesTotal) {
        if (typeof this.options.onChunkComplete === "function") {
          this.options.onChunkComplete(chunkSize, bytesAccepted, bytesTotal);
        }
      }
    }, {
      key: "_createUpload",
      value: function _createUpload3() {
        var _this6 = this;
        if (!this.options.endpoint) {
          this._emitError(new Error("tus: unable to create upload because no endpoint is provided"));
          return;
        }
        var req = this._openRequest("POST", this.options.endpoint);
        if (this.options.uploadLengthDeferred) {
          req.setHeader("Upload-Defer-Length", 1);
        } else {
          req.setHeader("Upload-Length", this._size);
        }
        var metadata = encodeMetadata(this.options.metadata);
        if (metadata !== "") {
          req.setHeader("Upload-Metadata", metadata);
        }
        var promise;
        if (this.options.uploadDataDuringCreation && !this.options.uploadLengthDeferred) {
          this._offset = 0;
          promise = this._addChunkToRequest(req);
        } else {
          promise = this._sendRequest(req, null);
        }
        promise.then(function(res) {
          if (!inStatusCategory(res.getStatus(), 200)) {
            _this6._emitHttpError(req, res, "tus: unexpected response while creating upload");
            return;
          }
          var location2 = res.getHeader("Location");
          if (location2 == null) {
            _this6._emitHttpError(req, res, "tus: invalid or missing Location header");
            return;
          }
          _this6.url = resolveUrl(_this6.options.endpoint, location2);
          log("Created upload at ".concat(_this6.url));
          if (typeof _this6.options._onUploadUrlAvailable === "function") {
            _this6.options._onUploadUrlAvailable();
          }
          if (_this6._size === 0) {
            _this6._emitSuccess();
            _this6._source.close();
            return;
          }
          _this6._saveUploadInUrlStorage().then(function() {
            if (_this6.options.uploadDataDuringCreation) {
              _this6._handleUploadResponse(req, res);
            } else {
              _this6._offset = 0;
              _this6._performUpload();
            }
          });
        })["catch"](function(err) {
          _this6._emitHttpError(req, null, "tus: failed to create upload", err);
        });
      }
    }, {
      key: "_resumeUpload",
      value: function _resumeUpload() {
        var _this7 = this;
        var req = this._openRequest("HEAD", this.url);
        var promise = this._sendRequest(req, null);
        promise.then(function(res) {
          var status = res.getStatus();
          if (!inStatusCategory(status, 200)) {
            if (status === 423) {
              _this7._emitHttpError(req, res, "tus: upload is currently locked; retry later");
              return;
            }
            if (inStatusCategory(status, 400)) {
              _this7._removeFromUrlStorage();
            }
            if (!_this7.options.endpoint) {
              _this7._emitHttpError(req, res, "tus: unable to resume upload (new upload cannot be created without an endpoint)");
              return;
            }
            _this7.url = null;
            _this7._createUpload();
            return;
          }
          var offset = parseInt(res.getHeader("Upload-Offset"), 10);
          if (Number.isNaN(offset)) {
            _this7._emitHttpError(req, res, "tus: invalid or missing offset value");
            return;
          }
          var length = parseInt(res.getHeader("Upload-Length"), 10);
          if (Number.isNaN(length) && !_this7.options.uploadLengthDeferred) {
            _this7._emitHttpError(req, res, "tus: invalid or missing length value");
            return;
          }
          if (typeof _this7.options._onUploadUrlAvailable === "function") {
            _this7.options._onUploadUrlAvailable();
          }
          _this7._saveUploadInUrlStorage().then(function() {
            if (offset === length) {
              _this7._emitProgress(length, length);
              _this7._emitSuccess();
              return;
            }
            _this7._offset = offset;
            _this7._performUpload();
          });
        })["catch"](function(err) {
          _this7._emitHttpError(req, null, "tus: failed to resume upload", err);
        });
      }
    }, {
      key: "_performUpload",
      value: function _performUpload() {
        var _this8 = this;
        if (this._aborted) {
          return;
        }
        var req;
        if (this.options.overridePatchMethod) {
          req = this._openRequest("POST", this.url);
          req.setHeader("X-HTTP-Method-Override", "PATCH");
        } else {
          req = this._openRequest("PATCH", this.url);
        }
        req.setHeader("Upload-Offset", this._offset);
        var promise = this._addChunkToRequest(req);
        promise.then(function(res) {
          if (!inStatusCategory(res.getStatus(), 200)) {
            _this8._emitHttpError(req, res, "tus: unexpected response while uploading chunk");
            return;
          }
          _this8._handleUploadResponse(req, res);
        })["catch"](function(err) {
          if (_this8._aborted) {
            return;
          }
          _this8._emitHttpError(req, null, "tus: failed to upload chunk at offset ".concat(_this8._offset), err);
        });
      }
    }, {
      key: "_addChunkToRequest",
      value: function _addChunkToRequest(req) {
        var _this9 = this;
        var start = this._offset;
        var end = this._offset + this.options.chunkSize;
        req.setProgressHandler(function(bytesSent) {
          _this9._emitProgress(start + bytesSent, _this9._size);
        });
        req.setHeader("Content-Type", "application/offset+octet-stream");
        if ((end === Infinity || end > this._size) && !this.options.uploadLengthDeferred) {
          end = this._size;
        }
        return this._source.slice(start, end).then(function(_ref2) {
          var value = _ref2.value, done = _ref2.done;
          if (_this9.options.uploadLengthDeferred && done) {
            _this9._size = _this9._offset + (value && value.size ? value.size : 0);
            req.setHeader("Upload-Length", _this9._size);
          }
          if (value === null) {
            return _this9._sendRequest(req);
          }
          _this9._emitProgress(_this9._offset, _this9._size);
          return _this9._sendRequest(req, value);
        });
      }
    }, {
      key: "_handleUploadResponse",
      value: function _handleUploadResponse(req, res) {
        var offset = parseInt(res.getHeader("Upload-Offset"), 10);
        if (Number.isNaN(offset)) {
          this._emitHttpError(req, res, "tus: invalid or missing offset value");
          return;
        }
        this._emitProgress(offset, this._size);
        this._emitChunkComplete(offset - this._offset, offset, this._size);
        this._offset = offset;
        if (offset === this._size) {
          this._emitSuccess();
          this._source.close();
          return;
        }
        this._performUpload();
      }
    }, {
      key: "_openRequest",
      value: function _openRequest(method, url) {
        var req = openRequest(method, url, this.options);
        this._req = req;
        return req;
      }
    }, {
      key: "_removeFromUrlStorage",
      value: function _removeFromUrlStorage() {
        var _this10 = this;
        if (!this._urlStorageKey)
          return;
        this._urlStorage.removeUpload(this._urlStorageKey)["catch"](function(err) {
          _this10._emitError(err);
        });
        this._urlStorageKey = null;
      }
    }, {
      key: "_saveUploadInUrlStorage",
      value: function _saveUploadInUrlStorage() {
        var _this11 = this;
        if (!this.options.storeFingerprintForResuming || !this._fingerprint || this._urlStorageKey !== null) {
          return Promise.resolve();
        }
        var storedUpload = {
          size: this._size,
          metadata: this.options.metadata,
          creationTime: new Date().toString()
        };
        if (this._parallelUploads) {
          storedUpload.parallelUploadUrls = this._parallelUploadUrls;
        } else {
          storedUpload.uploadUrl = this.url;
        }
        return this._urlStorage.addUpload(this._fingerprint, storedUpload).then(function(urlStorageKey) {
          _this11._urlStorageKey = urlStorageKey;
        });
      }
    }, {
      key: "_sendRequest",
      value: function _sendRequest(req) {
        var body = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return sendRequest(req, body, this.options);
      }
    }], [{
      key: "terminate",
      value: function terminate(url) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var req = openRequest("DELETE", url, options);
        return sendRequest(req, null, options).then(function(res) {
          if (res.getStatus() === 204) {
            return;
          }
          throw new error_default("tus: unexpected response while terminating upload", null, req, res);
        })["catch"](function(err) {
          if (!(err instanceof error_default)) {
            err = new error_default("tus: failed to terminate upload", err, req, null);
          }
          if (!shouldRetry(err, 0, options)) {
            throw err;
          }
          var delay = options.retryDelays[0];
          var remainingDelays = options.retryDelays.slice(1);
          var newOptions = _objectSpread(_objectSpread({}, options), {}, {
            retryDelays: remainingDelays
          });
          return new Promise(function(resolve) {
            return setTimeout(resolve, delay);
          }).then(function() {
            return BaseUpload2.terminate(url, newOptions);
          });
        });
      }
    }]);
    return BaseUpload2;
  }();
  function encodeMetadata(metadata) {
    return Object.entries(metadata).map(function(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0], value = _ref4[1];
      return "".concat(key, " ").concat(gBase64.encode(String(value)));
    }).join(",");
  }
  function inStatusCategory(status, category) {
    return status >= category && status < category + 100;
  }
  function openRequest(method, url, options) {
    var req = options.httpStack.createRequest(method, url);
    req.setHeader("Tus-Resumable", "1.0.0");
    var headers = options.headers || {};
    Object.entries(headers).forEach(function(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2), name = _ref6[0], value = _ref6[1];
      req.setHeader(name, value);
    });
    if (options.addRequestId) {
      var requestId = uuid();
      req.setHeader("X-Request-ID", requestId);
    }
    return req;
  }
  function sendRequest(req, body, options) {
    var onBeforeRequestPromise = typeof options.onBeforeRequest === "function" ? Promise.resolve(options.onBeforeRequest(req)) : Promise.resolve();
    return onBeforeRequestPromise.then(function() {
      return req.send(body).then(function(res) {
        var onAfterResponsePromise = typeof options.onAfterResponse === "function" ? Promise.resolve(options.onAfterResponse(req, res)) : Promise.resolve();
        return onAfterResponsePromise.then(function() {
          return res;
        });
      });
    });
  }
  function isOnline() {
    var online = true;
    if (typeof window !== "undefined" && "navigator" in window && window.navigator.onLine === false) {
      online = false;
    }
    return online;
  }
  function shouldRetry(err, retryAttempt, options) {
    if (options.retryDelays == null || retryAttempt >= options.retryDelays.length || err.originalRequest == null) {
      return false;
    }
    if (options && typeof options.onShouldRetry === "function") {
      return options.onShouldRetry(err, retryAttempt, options);
    }
    var status = err.originalResponse ? err.originalResponse.getStatus() : 0;
    return (!inStatusCategory(status, 400) || status === 409 || status === 423) && isOnline();
  }
  function resolveUrl(origin, link) {
    return new import_url_parse.default(link, origin).toString();
  }
  function splitSizeIntoParts(totalSize, partCount) {
    var partSize = Math.floor(totalSize / partCount);
    var parts = [];
    for (var i4 = 0; i4 < partCount; i4++) {
      parts.push({
        start: partSize * i4,
        end: partSize * (i4 + 1)
      });
    }
    parts[partCount - 1].end = totalSize;
    return parts;
  }
  BaseUpload.defaultOptions = defaultOptions2;
  var upload_default = BaseUpload;

  // ../node_modules/tus-js-client/lib.esm/noopUrlStorage.js
  function _classCallCheck3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties3(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass3(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties3(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties3(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var NoopUrlStorage = /* @__PURE__ */ function() {
    function NoopUrlStorage2() {
      _classCallCheck3(this, NoopUrlStorage2);
    }
    _createClass3(NoopUrlStorage2, [{
      key: "listAllUploads",
      value: function listAllUploads() {
        return Promise.resolve([]);
      }
    }, {
      key: "findUploadsByFingerprint",
      value: function findUploadsByFingerprint(fingerprint2) {
        return Promise.resolve([]);
      }
    }, {
      key: "removeUpload",
      value: function removeUpload(urlStorageKey) {
        return Promise.resolve();
      }
    }, {
      key: "addUpload",
      value: function addUpload(fingerprint2, upload) {
        return Promise.resolve(null);
      }
    }]);
    return NoopUrlStorage2;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/urlStorage.js
  function _classCallCheck4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties4(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass4(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties4(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties4(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var hasStorage = false;
  try {
    hasStorage = "localStorage" in window;
    key = "tusSupport";
    localStorage.setItem(key, localStorage.getItem(key));
  } catch (e4) {
    if (e4.code === e4.SECURITY_ERR || e4.code === e4.QUOTA_EXCEEDED_ERR) {
      hasStorage = false;
    } else {
      throw e4;
    }
  }
  var key;
  var canStoreURLs = hasStorage;
  var WebStorageUrlStorage = /* @__PURE__ */ function() {
    function WebStorageUrlStorage2() {
      _classCallCheck4(this, WebStorageUrlStorage2);
    }
    _createClass4(WebStorageUrlStorage2, [{
      key: "findAllUploads",
      value: function findAllUploads() {
        var results = this._findEntries("tus::");
        return Promise.resolve(results);
      }
    }, {
      key: "findUploadsByFingerprint",
      value: function findUploadsByFingerprint(fingerprint2) {
        var results = this._findEntries("tus::".concat(fingerprint2, "::"));
        return Promise.resolve(results);
      }
    }, {
      key: "removeUpload",
      value: function removeUpload(urlStorageKey) {
        localStorage.removeItem(urlStorageKey);
        return Promise.resolve();
      }
    }, {
      key: "addUpload",
      value: function addUpload(fingerprint2, upload) {
        var id18 = Math.round(Math.random() * 1e12);
        var key = "tus::".concat(fingerprint2, "::").concat(id18);
        localStorage.setItem(key, JSON.stringify(upload));
        return Promise.resolve(key);
      }
    }, {
      key: "_findEntries",
      value: function _findEntries(prefix) {
        var results = [];
        for (var i4 = 0; i4 < localStorage.length; i4++) {
          var _key = localStorage.key(i4);
          if (_key.indexOf(prefix) !== 0)
            continue;
          try {
            var upload = JSON.parse(localStorage.getItem(_key));
            upload.urlStorageKey = _key;
            results.push(upload);
          } catch (e4) {
          }
        }
        return results;
      }
    }]);
    return WebStorageUrlStorage2;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/httpStack.js
  function _classCallCheck5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties5(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass5(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties5(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties5(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var XHRHttpStack = /* @__PURE__ */ function() {
    function XHRHttpStack2() {
      _classCallCheck5(this, XHRHttpStack2);
    }
    _createClass5(XHRHttpStack2, [{
      key: "createRequest",
      value: function createRequest(method, url) {
        return new Request(method, url);
      }
    }, {
      key: "getName",
      value: function getName3() {
        return "XHRHttpStack";
      }
    }]);
    return XHRHttpStack2;
  }();
  var Request = /* @__PURE__ */ function() {
    function Request2(method, url) {
      _classCallCheck5(this, Request2);
      this._xhr = new XMLHttpRequest();
      this._xhr.open(method, url, true);
      this._method = method;
      this._url = url;
      this._headers = {};
    }
    _createClass5(Request2, [{
      key: "getMethod",
      value: function getMethod() {
        return this._method;
      }
    }, {
      key: "getURL",
      value: function getURL() {
        return this._url;
      }
    }, {
      key: "setHeader",
      value: function setHeader(header, value) {
        this._xhr.setRequestHeader(header, value);
        this._headers[header] = value;
      }
    }, {
      key: "getHeader",
      value: function getHeader(header) {
        return this._headers[header];
      }
    }, {
      key: "setProgressHandler",
      value: function setProgressHandler(progressHandler) {
        if (!("upload" in this._xhr)) {
          return;
        }
        this._xhr.upload.onprogress = function(e4) {
          if (!e4.lengthComputable) {
            return;
          }
          progressHandler(e4.loaded);
        };
      }
    }, {
      key: "send",
      value: function send() {
        var _this = this;
        var body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        return new Promise(function(resolve, reject) {
          _this._xhr.onload = function() {
            resolve(new Response(_this._xhr));
          };
          _this._xhr.onerror = function(err) {
            reject(err);
          };
          _this._xhr.send(body);
        });
      }
    }, {
      key: "abort",
      value: function abort() {
        this._xhr.abort();
        return Promise.resolve();
      }
    }, {
      key: "getUnderlyingObject",
      value: function getUnderlyingObject() {
        return this._xhr;
      }
    }]);
    return Request2;
  }();
  var Response = /* @__PURE__ */ function() {
    function Response2(xhr) {
      _classCallCheck5(this, Response2);
      this._xhr = xhr;
    }
    _createClass5(Response2, [{
      key: "getStatus",
      value: function getStatus() {
        return this._xhr.status;
      }
    }, {
      key: "getHeader",
      value: function getHeader(header) {
        return this._xhr.getResponseHeader(header);
      }
    }, {
      key: "getBody",
      value: function getBody() {
        return this._xhr.responseText;
      }
    }, {
      key: "getUnderlyingObject",
      value: function getUnderlyingObject() {
        return this._xhr;
      }
    }]);
    return Response2;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/isReactNative.js
  var isReactNative = function isReactNative2() {
    return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  };
  var isReactNative_default = isReactNative;

  // ../node_modules/tus-js-client/lib.esm/browser/uriToBlob.js
  function uriToBlob(uri) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function() {
        var blob = xhr.response;
        resolve(blob);
      };
      xhr.onerror = function(err) {
        reject(err);
      };
      xhr.open("GET", uri);
      xhr.send();
    });
  }

  // ../node_modules/tus-js-client/lib.esm/browser/sources/isCordova.js
  var isCordova = function isCordova2() {
    return typeof window !== "undefined" && (typeof window.PhoneGap !== "undefined" || typeof window.Cordova !== "undefined" || typeof window.cordova !== "undefined");
  };
  var isCordova_default = isCordova;

  // ../node_modules/tus-js-client/lib.esm/browser/sources/readAsByteArray.js
  function readAsByteArray(chunk) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() {
        var value = new Uint8Array(reader.result);
        resolve({
          value
        });
      };
      reader.onerror = function(err) {
        reject(err);
      };
      reader.readAsArrayBuffer(chunk);
    });
  }

  // ../node_modules/tus-js-client/lib.esm/browser/sources/FileSource.js
  function _classCallCheck6(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties6(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass6(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties6(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties6(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var FileSource = /* @__PURE__ */ function() {
    function FileSource2(file) {
      _classCallCheck6(this, FileSource2);
      this._file = file;
      this.size = file.size;
    }
    _createClass6(FileSource2, [{
      key: "slice",
      value: function slice(start, end) {
        if (isCordova_default()) {
          return readAsByteArray(this._file.slice(start, end));
        }
        var value = this._file.slice(start, end);
        return Promise.resolve({
          value
        });
      }
    }, {
      key: "close",
      value: function close() {
      }
    }]);
    return FileSource2;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/sources/StreamSource.js
  function _classCallCheck7(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties7(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass7(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties7(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties7(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function len(blobOrArray) {
    if (blobOrArray === void 0)
      return 0;
    if (blobOrArray.size !== void 0)
      return blobOrArray.size;
    return blobOrArray.length;
  }
  function concat(a4, b4) {
    if (a4.concat) {
      return a4.concat(b4);
    }
    if (a4 instanceof Blob) {
      return new Blob([a4, b4], {
        type: a4.type
      });
    }
    if (a4.set) {
      var c4 = new a4.constructor(a4.length + b4.length);
      c4.set(a4);
      c4.set(b4, a4.length);
      return c4;
    }
    throw new Error("Unknown data type");
  }
  var StreamSource = /* @__PURE__ */ function() {
    function StreamSource2(reader) {
      _classCallCheck7(this, StreamSource2);
      this._buffer = void 0;
      this._bufferOffset = 0;
      this._reader = reader;
      this._done = false;
    }
    _createClass7(StreamSource2, [{
      key: "slice",
      value: function slice(start, end) {
        if (start < this._bufferOffset) {
          return Promise.reject(new Error("Requested data is before the reader's current offset"));
        }
        return this._readUntilEnoughDataOrDone(start, end);
      }
    }, {
      key: "_readUntilEnoughDataOrDone",
      value: function _readUntilEnoughDataOrDone(start, end) {
        var _this = this;
        var hasEnoughData = end <= this._bufferOffset + len(this._buffer);
        if (this._done || hasEnoughData) {
          var value = this._getDataFromBuffer(start, end);
          var done = value == null ? this._done : false;
          return Promise.resolve({
            value,
            done
          });
        }
        return this._reader.read().then(function(_ref) {
          var value2 = _ref.value, done2 = _ref.done;
          if (done2) {
            _this._done = true;
          } else if (_this._buffer === void 0) {
            _this._buffer = value2;
          } else {
            _this._buffer = concat(_this._buffer, value2);
          }
          return _this._readUntilEnoughDataOrDone(start, end);
        });
      }
    }, {
      key: "_getDataFromBuffer",
      value: function _getDataFromBuffer(start, end) {
        if (start > this._bufferOffset) {
          this._buffer = this._buffer.slice(start - this._bufferOffset);
          this._bufferOffset = start;
        }
        var hasAllDataBeenRead = len(this._buffer) === 0;
        if (this._done && hasAllDataBeenRead) {
          return null;
        }
        return this._buffer.slice(0, end - start);
      }
    }, {
      key: "close",
      value: function close() {
        if (this._reader.cancel) {
          this._reader.cancel();
        }
      }
    }]);
    return StreamSource2;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/fileReader.js
  function _classCallCheck8(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties8(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass8(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties8(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties8(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var FileReader2 = /* @__PURE__ */ function() {
    function FileReader3() {
      _classCallCheck8(this, FileReader3);
    }
    _createClass8(FileReader3, [{
      key: "openFile",
      value: function openFile(input, chunkSize) {
        if (isReactNative_default() && input && typeof input.uri !== "undefined") {
          return uriToBlob(input.uri).then(function(blob) {
            return new FileSource(blob);
          })["catch"](function(err) {
            throw new Error("tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. ".concat(err));
          });
        }
        if (typeof input.slice === "function" && typeof input.size !== "undefined") {
          return Promise.resolve(new FileSource(input));
        }
        if (typeof input.read === "function") {
          chunkSize = Number(chunkSize);
          if (!Number.isFinite(chunkSize)) {
            return Promise.reject(new Error("cannot create source for stream without a finite value for the `chunkSize` option"));
          }
          return Promise.resolve(new StreamSource(input, chunkSize));
        }
        return Promise.reject(new Error("source object may only be an instance of File, Blob, or Reader in this environment"));
      }
    }]);
    return FileReader3;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/fileSignature.js
  function fingerprint(file, options) {
    if (isReactNative_default()) {
      return Promise.resolve(reactNativeFingerprint(file, options));
    }
    return Promise.resolve(["tus-br", file.name, file.type, file.size, file.lastModified, options.endpoint].join("-"));
  }
  function reactNativeFingerprint(file, options) {
    var exifHash = file.exif ? hashCode(JSON.stringify(file.exif)) : "noexif";
    return ["tus-rn", file.name || "noname", file.size || "nosize", exifHash, options.endpoint].join("/");
  }
  function hashCode(str) {
    var hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (var i4 = 0; i4 < str.length; i4++) {
      var _char = str.charCodeAt(i4);
      hash = (hash << 5) - hash + _char;
      hash &= hash;
    }
    return hash;
  }

  // ../node_modules/tus-js-client/lib.esm/browser/index.js
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof2(obj);
  }
  function _classCallCheck9(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties9(target, props) {
    for (var i4 = 0; i4 < props.length; i4++) {
      var descriptor = props[i4];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass9(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties9(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties9(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass)
      _setPrototypeOf2(subClass, superClass);
  }
  function _setPrototypeOf2(o4, p4) {
    _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o5, p5) {
      o5.__proto__ = p5;
      return o5;
    };
    return _setPrototypeOf2(o4, p4);
  }
  function _createSuper2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct2();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf2(Derived), result2;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf2(this).constructor;
        result2 = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result2 = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn2(this, result2);
    };
  }
  function _possibleConstructorReturn2(self2, call) {
    if (call && (_typeof2(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized2(self2);
  }
  function _assertThisInitialized2(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _isNativeReflectConstruct2() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e4) {
      return false;
    }
  }
  function _getPrototypeOf2(o4) {
    _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o5) {
      return o5.__proto__ || Object.getPrototypeOf(o5);
    };
    return _getPrototypeOf2(o4);
  }
  function ownKeys2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i4 = 1; i4 < arguments.length; i4++) {
      var source = null != arguments[i4] ? arguments[i4] : {};
      i4 % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var defaultOptions3 = _objectSpread2(_objectSpread2({}, upload_default.defaultOptions), {}, {
    httpStack: new XHRHttpStack(),
    fileReader: new FileReader2(),
    urlStorage: canStoreURLs ? new WebStorageUrlStorage() : new NoopUrlStorage(),
    fingerprint
  });
  var Upload = /* @__PURE__ */ function(_BaseUpload) {
    _inherits2(Upload2, _BaseUpload);
    var _super = _createSuper2(Upload2);
    function Upload2() {
      var file = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      _classCallCheck9(this, Upload2);
      options = _objectSpread2(_objectSpread2({}, defaultOptions3), options);
      return _super.call(this, file, options);
    }
    _createClass9(Upload2, null, [{
      key: "terminate",
      value: function terminate(url, options, cb) {
        options = _objectSpread2(_objectSpread2({}, defaultOptions3), options);
        return upload_default.terminate(url, options, cb);
      }
    }]);
    return Upload2;
  }(upload_default);
  var _window = window;
  var XMLHttpRequest2 = _window.XMLHttpRequest;
  var Blob2 = _window.Blob;
  var isSupported = XMLHttpRequest2 && Blob2 && typeof Blob2.prototype.slice === "function";

  // ../packages/@uppy/utils/lib/emitSocketProgress.js
  var import_lodash4 = __toESM(require_lodash(), 1);
  function emitSocketProgress(uploader, progressData, file) {
    const {
      progress,
      bytesUploaded,
      bytesTotal
    } = progressData;
    if (progress) {
      uploader.uppy.log(`Upload progress: ${progress}`);
      uploader.uppy.emit("upload-progress", file, {
        uploader,
        bytesUploaded,
        bytesTotal
      });
    }
  }
  var emitSocketProgress_default = (0, import_lodash4.default)(emitSocketProgress, 300, {
    leading: true,
    trailing: true
  });

  // ../packages/@uppy/utils/lib/getSocketHost.js
  function getSocketHost(url) {
    const regex = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?(?:www\.)?([^\n]+)/i;
    const host = regex.exec(url)[1];
    const socketProtocol = /^http:\/\//i.test(url) ? "ws" : "wss";
    return `${socketProtocol}://${host}`;
  }

  // ../packages/@uppy/utils/lib/settle.js
  function settle(promises) {
    const resolutions = [];
    const rejections = [];
    function resolved(value) {
      resolutions.push(value);
    }
    function rejected(error) {
      rejections.push(error);
    }
    const wait = Promise.all(promises.map((promise) => promise.then(resolved, rejected)));
    return wait.then(() => {
      return {
        successful: resolutions,
        failed: rejections
      };
    });
  }

  // ../packages/@uppy/utils/lib/EventTracker.js
  function _classPrivateFieldLooseBase14(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id14 = 0;
  function _classPrivateFieldLooseKey14(name) {
    return "__private_" + id14++ + "_" + name;
  }
  var _emitter3 = /* @__PURE__ */ _classPrivateFieldLooseKey14("emitter");
  var _events = /* @__PURE__ */ _classPrivateFieldLooseKey14("events");
  var EventTracker = class {
    constructor(emitter) {
      Object.defineProperty(this, _emitter3, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _events, {
        writable: true,
        value: []
      });
      _classPrivateFieldLooseBase14(this, _emitter3)[_emitter3] = emitter;
    }
    on(event, fn) {
      _classPrivateFieldLooseBase14(this, _events)[_events].push([event, fn]);
      return _classPrivateFieldLooseBase14(this, _emitter3)[_emitter3].on(event, fn);
    }
    remove() {
      for (const [event, fn] of _classPrivateFieldLooseBase14(this, _events)[_events].splice(0)) {
        _classPrivateFieldLooseBase14(this, _emitter3)[_emitter3].off(event, fn);
      }
    }
  };

  // ../packages/@uppy/utils/lib/isNetworkError.js
  function isNetworkError(xhr) {
    if (!xhr) {
      return false;
    }
    return xhr.readyState !== 0 && xhr.readyState !== 4 || xhr.status === 0;
  }
  var isNetworkError_default = isNetworkError;

  // ../packages/@uppy/utils/lib/RateLimitedQueue.js
  function _classPrivateFieldLooseBase15(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id15 = 0;
  function _classPrivateFieldLooseKey15(name) {
    return "__private_" + id15++ + "_" + name;
  }
  function createCancelError(cause) {
    return new Error("Cancelled", {
      cause
    });
  }
  function abortOn(signal) {
    if (signal != null) {
      const abortPromise = () => this.abort(signal.reason);
      signal.addEventListener("abort", abortPromise, {
        once: true
      });
      const removeAbortListener = () => {
        signal.removeEventListener("abort", abortPromise);
      };
      this.then(removeAbortListener, removeAbortListener);
    }
    return this;
  }
  var _activeRequests = /* @__PURE__ */ _classPrivateFieldLooseKey15("activeRequests");
  var _queuedHandlers = /* @__PURE__ */ _classPrivateFieldLooseKey15("queuedHandlers");
  var _paused = /* @__PURE__ */ _classPrivateFieldLooseKey15("paused");
  var _pauseTimer = /* @__PURE__ */ _classPrivateFieldLooseKey15("pauseTimer");
  var _downLimit = /* @__PURE__ */ _classPrivateFieldLooseKey15("downLimit");
  var _upperLimit = /* @__PURE__ */ _classPrivateFieldLooseKey15("upperLimit");
  var _rateLimitingTimer = /* @__PURE__ */ _classPrivateFieldLooseKey15("rateLimitingTimer");
  var _call = /* @__PURE__ */ _classPrivateFieldLooseKey15("call");
  var _queueNext = /* @__PURE__ */ _classPrivateFieldLooseKey15("queueNext");
  var _next = /* @__PURE__ */ _classPrivateFieldLooseKey15("next");
  var _queue = /* @__PURE__ */ _classPrivateFieldLooseKey15("queue");
  var _dequeue = /* @__PURE__ */ _classPrivateFieldLooseKey15("dequeue");
  var _resume = /* @__PURE__ */ _classPrivateFieldLooseKey15("resume");
  var _increaseLimit = /* @__PURE__ */ _classPrivateFieldLooseKey15("increaseLimit");
  var RateLimitedQueue = class {
    constructor(limit) {
      Object.defineProperty(this, _dequeue, {
        value: _dequeue2
      });
      Object.defineProperty(this, _queue, {
        value: _queue2
      });
      Object.defineProperty(this, _next, {
        value: _next2
      });
      Object.defineProperty(this, _queueNext, {
        value: _queueNext2
      });
      Object.defineProperty(this, _call, {
        value: _call2
      });
      Object.defineProperty(this, _activeRequests, {
        writable: true,
        value: 0
      });
      Object.defineProperty(this, _queuedHandlers, {
        writable: true,
        value: []
      });
      Object.defineProperty(this, _paused, {
        writable: true,
        value: false
      });
      Object.defineProperty(this, _pauseTimer, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _downLimit, {
        writable: true,
        value: 1
      });
      Object.defineProperty(this, _upperLimit, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _rateLimitingTimer, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _resume, {
        writable: true,
        value: () => this.resume()
      });
      Object.defineProperty(this, _increaseLimit, {
        writable: true,
        value: () => {
          if (_classPrivateFieldLooseBase15(this, _paused)[_paused]) {
            _classPrivateFieldLooseBase15(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase15(this, _increaseLimit)[_increaseLimit], 0);
            return;
          }
          _classPrivateFieldLooseBase15(this, _downLimit)[_downLimit] = this.limit;
          this.limit = Math.ceil((_classPrivateFieldLooseBase15(this, _upperLimit)[_upperLimit] + _classPrivateFieldLooseBase15(this, _downLimit)[_downLimit]) / 2);
          for (let i4 = _classPrivateFieldLooseBase15(this, _downLimit)[_downLimit]; i4 <= this.limit; i4++) {
            _classPrivateFieldLooseBase15(this, _queueNext)[_queueNext]();
          }
          if (_classPrivateFieldLooseBase15(this, _upperLimit)[_upperLimit] - _classPrivateFieldLooseBase15(this, _downLimit)[_downLimit] > 3) {
            _classPrivateFieldLooseBase15(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase15(this, _increaseLimit)[_increaseLimit], 2e3);
          } else {
            _classPrivateFieldLooseBase15(this, _downLimit)[_downLimit] = Math.floor(_classPrivateFieldLooseBase15(this, _downLimit)[_downLimit] / 2);
          }
        }
      });
      if (typeof limit !== "number" || limit === 0) {
        this.limit = Infinity;
      } else {
        this.limit = limit;
      }
    }
    run(fn, queueOptions) {
      if (!_classPrivateFieldLooseBase15(this, _paused)[_paused] && _classPrivateFieldLooseBase15(this, _activeRequests)[_activeRequests] < this.limit) {
        return _classPrivateFieldLooseBase15(this, _call)[_call](fn);
      }
      return _classPrivateFieldLooseBase15(this, _queue)[_queue](fn, queueOptions);
    }
    wrapPromiseFunction(fn, queueOptions) {
      var _this = this;
      return function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        let queuedRequest;
        const outerPromise = new Promise((resolve, reject) => {
          queuedRequest = _this.run(() => {
            let cancelError;
            let innerPromise;
            try {
              innerPromise = Promise.resolve(fn(...args));
            } catch (err) {
              innerPromise = Promise.reject(err);
            }
            innerPromise.then((result2) => {
              if (cancelError) {
                reject(cancelError);
              } else {
                queuedRequest.done();
                resolve(result2);
              }
            }, (err) => {
              if (cancelError) {
                reject(cancelError);
              } else {
                queuedRequest.done();
                reject(err);
              }
            });
            return (cause) => {
              cancelError = createCancelError(cause);
            };
          }, queueOptions);
        });
        outerPromise.abort = (cause) => {
          queuedRequest.abort(cause);
        };
        outerPromise.abortOn = abortOn;
        return outerPromise;
      };
    }
    resume() {
      _classPrivateFieldLooseBase15(this, _paused)[_paused] = false;
      clearTimeout(_classPrivateFieldLooseBase15(this, _pauseTimer)[_pauseTimer]);
      for (let i4 = 0; i4 < this.limit; i4++) {
        _classPrivateFieldLooseBase15(this, _queueNext)[_queueNext]();
      }
    }
    pause(duration2) {
      if (duration2 === void 0) {
        duration2 = null;
      }
      _classPrivateFieldLooseBase15(this, _paused)[_paused] = true;
      clearTimeout(_classPrivateFieldLooseBase15(this, _pauseTimer)[_pauseTimer]);
      if (duration2 != null) {
        _classPrivateFieldLooseBase15(this, _pauseTimer)[_pauseTimer] = setTimeout(_classPrivateFieldLooseBase15(this, _resume)[_resume], duration2);
      }
    }
    rateLimit(duration2) {
      clearTimeout(_classPrivateFieldLooseBase15(this, _rateLimitingTimer)[_rateLimitingTimer]);
      this.pause(duration2);
      if (this.limit > 1 && Number.isFinite(this.limit)) {
        _classPrivateFieldLooseBase15(this, _upperLimit)[_upperLimit] = this.limit - 1;
        this.limit = _classPrivateFieldLooseBase15(this, _downLimit)[_downLimit];
        _classPrivateFieldLooseBase15(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase15(this, _increaseLimit)[_increaseLimit], duration2);
      }
    }
    get isPaused() {
      return _classPrivateFieldLooseBase15(this, _paused)[_paused];
    }
  };
  function _call2(fn) {
    _classPrivateFieldLooseBase15(this, _activeRequests)[_activeRequests] += 1;
    let done = false;
    let cancelActive;
    try {
      cancelActive = fn();
    } catch (err) {
      _classPrivateFieldLooseBase15(this, _activeRequests)[_activeRequests] -= 1;
      throw err;
    }
    return {
      abort: (cause) => {
        if (done)
          return;
        done = true;
        _classPrivateFieldLooseBase15(this, _activeRequests)[_activeRequests] -= 1;
        cancelActive(cause);
        _classPrivateFieldLooseBase15(this, _queueNext)[_queueNext]();
      },
      done: () => {
        if (done)
          return;
        done = true;
        _classPrivateFieldLooseBase15(this, _activeRequests)[_activeRequests] -= 1;
        _classPrivateFieldLooseBase15(this, _queueNext)[_queueNext]();
      }
    };
  }
  function _queueNext2() {
    queueMicrotask(() => _classPrivateFieldLooseBase15(this, _next)[_next]());
  }
  function _next2() {
    if (_classPrivateFieldLooseBase15(this, _paused)[_paused] || _classPrivateFieldLooseBase15(this, _activeRequests)[_activeRequests] >= this.limit) {
      return;
    }
    if (_classPrivateFieldLooseBase15(this, _queuedHandlers)[_queuedHandlers].length === 0) {
      return;
    }
    const next = _classPrivateFieldLooseBase15(this, _queuedHandlers)[_queuedHandlers].shift();
    const handler = _classPrivateFieldLooseBase15(this, _call)[_call](next.fn);
    next.abort = handler.abort;
    next.done = handler.done;
  }
  function _queue2(fn, options) {
    if (options === void 0) {
      options = {};
    }
    const handler = {
      fn,
      priority: options.priority || 0,
      abort: () => {
        _classPrivateFieldLooseBase15(this, _dequeue)[_dequeue](handler);
      },
      done: () => {
        throw new Error("Cannot mark a queued request as done: this indicates a bug");
      }
    };
    const index = _classPrivateFieldLooseBase15(this, _queuedHandlers)[_queuedHandlers].findIndex((other) => {
      return handler.priority > other.priority;
    });
    if (index === -1) {
      _classPrivateFieldLooseBase15(this, _queuedHandlers)[_queuedHandlers].push(handler);
    } else {
      _classPrivateFieldLooseBase15(this, _queuedHandlers)[_queuedHandlers].splice(index, 0, handler);
    }
    return handler;
  }
  function _dequeue2(handler) {
    const index = _classPrivateFieldLooseBase15(this, _queuedHandlers)[_queuedHandlers].indexOf(handler);
    if (index !== -1) {
      _classPrivateFieldLooseBase15(this, _queuedHandlers)[_queuedHandlers].splice(index, 1);
    }
  }
  var internalRateLimitedQueue = Symbol("__queue");

  // ../packages/@uppy/tus/lib/getFingerprint.js
  function isCordova3() {
    return typeof window !== "undefined" && (typeof window.PhoneGap !== "undefined" || typeof window.Cordova !== "undefined" || typeof window.cordova !== "undefined");
  }
  function isReactNative3() {
    return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  }
  function getFingerprint(uppyFileObj) {
    return (file, options) => {
      if (isCordova3() || isReactNative3()) {
        return defaultOptions3.fingerprint(file, options);
      }
      const uppyFingerprint = ["tus", uppyFileObj.id, options.endpoint].join("-");
      return Promise.resolve(uppyFingerprint);
    };
  }

  // ../packages/@uppy/tus/lib/index.js
  function _classPrivateFieldLooseBase16(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id16 = 0;
  function _classPrivateFieldLooseKey16(name) {
    return "__private_" + id16++ + "_" + name;
  }
  var packageJson23 = {
    "version": "3.0.5"
  };
  var tusDefaultOptions = {
    endpoint: "",
    uploadUrl: null,
    metadata: {},
    uploadSize: null,
    onProgress: null,
    onChunkComplete: null,
    onSuccess: null,
    onError: null,
    overridePatchMethod: false,
    headers: {},
    addRequestId: false,
    chunkSize: Infinity,
    retryDelays: [100, 1e3, 3e3, 5e3],
    parallelUploads: 1,
    removeFingerprintOnSuccess: false,
    uploadLengthDeferred: false,
    uploadDataDuringCreation: false
  };
  var _retryDelayIterator = /* @__PURE__ */ _classPrivateFieldLooseKey16("retryDelayIterator");
  var _queueRequestSocketToken = /* @__PURE__ */ _classPrivateFieldLooseKey16("queueRequestSocketToken");
  var _requestSocketToken = /* @__PURE__ */ _classPrivateFieldLooseKey16("requestSocketToken");
  var Tus = class extends BasePlugin {
    constructor(uppy, _opts) {
      var _this$opts$rateLimite, _this$opts$retryDelay;
      super(uppy, _opts);
      Object.defineProperty(this, _retryDelayIterator, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _queueRequestSocketToken, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _requestSocketToken, {
        writable: true,
        value: async (file) => {
          const Client = file.remote.providerOptions.provider ? Provider : RequestClient;
          const client = new Client(this.uppy, file.remote.providerOptions);
          const opts = {
            ...this.opts
          };
          if (file.tus) {
            Object.assign(opts, file.tus);
          }
          const res = await client.post(file.remote.url, {
            ...file.remote.body,
            endpoint: opts.endpoint,
            uploadUrl: opts.uploadUrl,
            protocol: "tus",
            size: file.data.size,
            headers: opts.headers,
            metadata: file.meta
          });
          return res.token;
        }
      });
      this.type = "uploader";
      this.id = this.opts.id || "Tus";
      this.title = "Tus";
      const defaultOptions4 = {
        useFastRemoteRetry: true,
        limit: 20,
        retryDelays: tusDefaultOptions.retryDelays,
        withCredentials: false
      };
      this.opts = {
        ...defaultOptions4,
        ..._opts
      };
      if ((_opts == null ? void 0 : _opts.allowedMetaFields) === void 0 && "metaFields" in this.opts) {
        throw new Error("The `metaFields` option has been renamed to `allowedMetaFields`.");
      }
      if ("autoRetry" in _opts) {
        throw new Error("The `autoRetry` option was deprecated and has been removed.");
      }
      this.requests = (_this$opts$rateLimite = this.opts.rateLimitedQueue) != null ? _this$opts$rateLimite : new RateLimitedQueue(this.opts.limit);
      _classPrivateFieldLooseBase16(this, _retryDelayIterator)[_retryDelayIterator] = (_this$opts$retryDelay = this.opts.retryDelays) == null ? void 0 : _this$opts$retryDelay.values();
      this.uploaders = /* @__PURE__ */ Object.create(null);
      this.uploaderEvents = /* @__PURE__ */ Object.create(null);
      this.uploaderSockets = /* @__PURE__ */ Object.create(null);
      this.handleResetProgress = this.handleResetProgress.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
      _classPrivateFieldLooseBase16(this, _queueRequestSocketToken)[_queueRequestSocketToken] = this.requests.wrapPromiseFunction(_classPrivateFieldLooseBase16(this, _requestSocketToken)[_requestSocketToken], {
        priority: -1
      });
    }
    handleResetProgress() {
      const files = {
        ...this.uppy.getState().files
      };
      Object.keys(files).forEach((fileID) => {
        if (files[fileID].tus && files[fileID].tus.uploadUrl) {
          const tusState = {
            ...files[fileID].tus
          };
          delete tusState.uploadUrl;
          files[fileID] = {
            ...files[fileID],
            tus: tusState
          };
        }
      });
      this.uppy.setState({
        files
      });
    }
    resetUploaderReferences(fileID, opts) {
      if (opts === void 0) {
        opts = {};
      }
      if (this.uploaders[fileID]) {
        const uploader = this.uploaders[fileID];
        uploader.abort();
        if (opts.abort) {
          uploader.abort(true);
        }
        this.uploaders[fileID] = null;
      }
      if (this.uploaderEvents[fileID]) {
        this.uploaderEvents[fileID].remove();
        this.uploaderEvents[fileID] = null;
      }
      if (this.uploaderSockets[fileID]) {
        this.uploaderSockets[fileID].close();
        this.uploaderSockets[fileID] = null;
      }
    }
    upload(file) {
      var _this = this;
      this.resetUploaderReferences(file.id);
      return new Promise((resolve, reject) => {
        let queuedRequest;
        let qRequest;
        let upload;
        this.uppy.emit("upload-started", file);
        const opts = {
          ...this.opts,
          ...file.tus || {}
        };
        if (typeof opts.headers === "function") {
          opts.headers = opts.headers(file);
        }
        const uploadOptions = {
          ...tusDefaultOptions,
          ...opts
        };
        uploadOptions.fingerprint = getFingerprint(file);
        uploadOptions.onBeforeRequest = (req) => {
          const xhr = req.getUnderlyingObject();
          xhr.withCredentials = !!opts.withCredentials;
          let userProvidedPromise;
          if (typeof opts.onBeforeRequest === "function") {
            userProvidedPromise = opts.onBeforeRequest(req, file);
          }
          if (has(queuedRequest, "shouldBeRequeued")) {
            if (!queuedRequest.shouldBeRequeued)
              return Promise.reject();
            let done;
            const p4 = new Promise((res) => {
              done = res;
            });
            queuedRequest = this.requests.run(() => {
              if (file.isPaused) {
                queuedRequest.abort();
              }
              done();
              return () => {
              };
            });
            return Promise.all([p4, userProvidedPromise]);
          }
          return userProvidedPromise;
        };
        uploadOptions.onError = (err) => {
          var _queuedRequest;
          this.uppy.log(err);
          const xhr = err.originalRequest ? err.originalRequest.getUnderlyingObject() : null;
          if (isNetworkError_default(xhr)) {
            err = new NetworkError_default(err, xhr);
          }
          this.resetUploaderReferences(file.id);
          (_queuedRequest = queuedRequest) == null ? void 0 : _queuedRequest.abort();
          this.uppy.emit("upload-error", file, err);
          reject(err);
        };
        uploadOptions.onProgress = (bytesUploaded, bytesTotal) => {
          this.onReceiveUploadUrl(file, upload.url);
          this.uppy.emit("upload-progress", file, {
            uploader: this,
            bytesUploaded,
            bytesTotal
          });
        };
        uploadOptions.onSuccess = () => {
          const uploadResp = {
            uploadURL: upload.url
          };
          this.resetUploaderReferences(file.id);
          queuedRequest.done();
          this.uppy.emit("upload-success", file, uploadResp);
          if (upload.url) {
            this.uppy.log(`Download ${upload.file.name} from ${upload.url}`);
          }
          resolve(upload);
        };
        const defaultOnShouldRetry = (err) => {
          var _err$originalResponse;
          const status = err == null ? void 0 : (_err$originalResponse = err.originalResponse) == null ? void 0 : _err$originalResponse.getStatus();
          if (status === 429) {
            if (!this.requests.isPaused) {
              var _classPrivateFieldLoo;
              const next = (_classPrivateFieldLoo = _classPrivateFieldLooseBase16(this, _retryDelayIterator)[_retryDelayIterator]) == null ? void 0 : _classPrivateFieldLoo.next();
              if (next == null || next.done) {
                return false;
              }
              this.requests.rateLimit(next.value);
            }
          } else if (status > 400 && status < 500 && status !== 409) {
            return false;
          } else if (typeof navigator !== "undefined" && navigator.onLine === false) {
            if (!this.requests.isPaused) {
              this.requests.pause();
              window.addEventListener("online", () => {
                this.requests.resume();
              }, {
                once: true
              });
            }
          }
          queuedRequest.abort();
          queuedRequest = {
            shouldBeRequeued: true,
            abort() {
              this.shouldBeRequeued = false;
            },
            done() {
              throw new Error("Cannot mark a queued request as done: this indicates a bug");
            },
            fn() {
              throw new Error("Cannot run a queued request: this indicates a bug");
            }
          };
          return true;
        };
        if (opts.onShouldRetry != null) {
          uploadOptions.onShouldRetry = function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return opts.onShouldRetry(...args, defaultOnShouldRetry);
          };
        } else {
          uploadOptions.onShouldRetry = defaultOnShouldRetry;
        }
        const copyProp = (obj, srcProp, destProp) => {
          if (has(obj, srcProp) && !has(obj, destProp)) {
            obj[destProp] = obj[srcProp];
          }
        };
        const meta = {};
        const allowedMetaFields = Array.isArray(opts.allowedMetaFields) ? opts.allowedMetaFields : Object.keys(file.meta);
        allowedMetaFields.forEach((item) => {
          meta[item] = file.meta[item];
        });
        copyProp(meta, "type", "filetype");
        copyProp(meta, "name", "filename");
        uploadOptions.metadata = meta;
        upload = new Upload(file.data, uploadOptions);
        this.uploaders[file.id] = upload;
        this.uploaderEvents[file.id] = new EventTracker(this.uppy);
        qRequest = () => {
          if (!file.isPaused) {
            upload.start();
          }
          return () => {
          };
        };
        upload.findPreviousUploads().then((previousUploads) => {
          const previousUpload = previousUploads[0];
          if (previousUpload) {
            this.uppy.log(`[Tus] Resuming upload of ${file.id} started at ${previousUpload.creationTime}`);
            upload.resumeFromPreviousUpload(previousUpload);
          }
        });
        queuedRequest = this.requests.run(qRequest);
        this.onFileRemove(file.id, (targetFileID) => {
          queuedRequest.abort();
          this.resetUploaderReferences(file.id, {
            abort: !!upload.url
          });
          resolve(`upload ${targetFileID} was removed`);
        });
        this.onPause(file.id, (isPaused) => {
          queuedRequest.abort();
          if (isPaused) {
            upload.abort();
          } else {
            queuedRequest = this.requests.run(qRequest);
          }
        });
        this.onPauseAll(file.id, () => {
          queuedRequest.abort();
          upload.abort();
        });
        this.onCancelAll(file.id, function(_temp) {
          let {
            reason
          } = _temp === void 0 ? {} : _temp;
          if (reason === "user") {
            queuedRequest.abort();
            _this.resetUploaderReferences(file.id, {
              abort: !!upload.url
            });
          }
          resolve(`upload ${file.id} was canceled`);
        });
        this.onResumeAll(file.id, () => {
          queuedRequest.abort();
          if (file.error) {
            upload.abort();
          }
          queuedRequest = this.requests.run(qRequest);
        });
      }).catch((err) => {
        this.uppy.emit("upload-error", file, err);
        throw err;
      });
    }
    async uploadRemote(file) {
      this.resetUploaderReferences(file.id);
      if (!file.progress.uploadStarted || !file.isRestored) {
        this.uppy.emit("upload-started", file);
      }
      try {
        if (file.serverToken) {
          return this.connectToServerSocket(file);
        }
        const serverToken = await _classPrivateFieldLooseBase16(this, _queueRequestSocketToken)[_queueRequestSocketToken](file);
        if (!this.uppy.getState().files[file.id])
          return void 0;
        this.uppy.setFileState(file.id, {
          serverToken
        });
        return this.connectToServerSocket(this.uppy.getFile(file.id));
      } catch (err) {
        this.uppy.emit("upload-error", file, err);
        throw err;
      }
    }
    connectToServerSocket(file) {
      var _this2 = this;
      return new Promise((resolve, reject) => {
        const token = file.serverToken;
        const host = getSocketHost(file.remote.companionUrl);
        const socket = new UppySocket({
          target: `${host}/api/${token}`
        });
        this.uploaderSockets[file.id] = socket;
        this.uploaderEvents[file.id] = new EventTracker(this.uppy);
        let queuedRequest;
        this.onFileRemove(file.id, () => {
          queuedRequest.abort();
          socket.send("cancel", {});
          this.resetUploaderReferences(file.id);
          resolve(`upload ${file.id} was removed`);
        });
        this.onPause(file.id, (isPaused) => {
          if (isPaused) {
            queuedRequest.abort();
            socket.send("pause", {});
          } else {
            queuedRequest.abort();
            queuedRequest = this.requests.run(() => {
              socket.send("resume", {});
              return () => {
              };
            });
          }
        });
        this.onPauseAll(file.id, () => {
          queuedRequest.abort();
          socket.send("pause", {});
        });
        this.onCancelAll(file.id, function(_temp2) {
          let {
            reason
          } = _temp2 === void 0 ? {} : _temp2;
          if (reason === "user") {
            queuedRequest.abort();
            socket.send("cancel", {});
            _this2.resetUploaderReferences(file.id);
          }
          resolve(`upload ${file.id} was canceled`);
        });
        this.onResumeAll(file.id, () => {
          queuedRequest.abort();
          if (file.error) {
            socket.send("pause", {});
          }
          queuedRequest = this.requests.run(() => {
            socket.send("resume", {});
            return () => {
            };
          });
        });
        this.onRetry(file.id, () => {
          if (socket.isOpen) {
            socket.send("pause", {});
            socket.send("resume", {});
          }
        });
        this.onRetryAll(file.id, () => {
          if (socket.isOpen) {
            socket.send("pause", {});
            socket.send("resume", {});
          }
        });
        socket.on("progress", (progressData) => emitSocketProgress_default(this, progressData, file));
        socket.on("error", (errData) => {
          const {
            message
          } = errData.error;
          const error = Object.assign(new Error(message), {
            cause: errData.error
          });
          if (!this.opts.useFastRemoteRetry) {
            this.resetUploaderReferences(file.id);
            this.uppy.setFileState(file.id, {
              serverToken: null
            });
          } else {
            socket.close();
          }
          this.uppy.emit("upload-error", file, error);
          queuedRequest.done();
          reject(error);
        });
        socket.on("success", (data) => {
          const uploadResp = {
            uploadURL: data.url
          };
          this.uppy.emit("upload-success", file, uploadResp);
          this.resetUploaderReferences(file.id);
          queuedRequest.done();
          resolve();
        });
        queuedRequest = this.requests.run(() => {
          if (file.isPaused) {
            socket.send("pause", {});
          }
          return () => {
          };
        });
      });
    }
    onReceiveUploadUrl(file, uploadURL) {
      const currentFile = this.uppy.getFile(file.id);
      if (!currentFile)
        return;
      if (!currentFile.tus || currentFile.tus.uploadUrl !== uploadURL) {
        this.uppy.log("[Tus] Storing upload url");
        this.uppy.setFileState(currentFile.id, {
          tus: {
            ...currentFile.tus,
            uploadUrl: uploadURL
          }
        });
      }
    }
    onFileRemove(fileID, cb) {
      this.uploaderEvents[fileID].on("file-removed", (file) => {
        if (fileID === file.id)
          cb(file.id);
      });
    }
    onPause(fileID, cb) {
      this.uploaderEvents[fileID].on("upload-pause", (targetFileID, isPaused) => {
        if (fileID === targetFileID) {
          cb(isPaused);
        }
      });
    }
    onRetry(fileID, cb) {
      this.uploaderEvents[fileID].on("upload-retry", (targetFileID) => {
        if (fileID === targetFileID) {
          cb();
        }
      });
    }
    onRetryAll(fileID, cb) {
      this.uploaderEvents[fileID].on("retry-all", () => {
        if (!this.uppy.getFile(fileID))
          return;
        cb();
      });
    }
    onPauseAll(fileID, cb) {
      this.uploaderEvents[fileID].on("pause-all", () => {
        if (!this.uppy.getFile(fileID))
          return;
        cb();
      });
    }
    onCancelAll(fileID, eventHandler) {
      var _this3 = this;
      this.uploaderEvents[fileID].on("cancel-all", function() {
        if (!_this3.uppy.getFile(fileID))
          return;
        eventHandler(...arguments);
      });
    }
    onResumeAll(fileID, cb) {
      this.uploaderEvents[fileID].on("resume-all", () => {
        if (!this.uppy.getFile(fileID))
          return;
        cb();
      });
    }
    uploadFiles(files) {
      const promises = files.map((file, i4) => {
        const current = i4 + 1;
        const total = files.length;
        if ("error" in file && file.error) {
          return Promise.reject(new Error(file.error));
        }
        if (file.isRemote) {
          if (!file.progress.uploadStarted || !file.isRestored) {
            this.uppy.emit("upload-started", file);
          }
          return this.uploadRemote(file, current, total);
        }
        if (!file.progress.uploadStarted || !file.isRestored) {
          this.uppy.emit("upload-started", file);
        }
        return this.upload(file, current, total);
      });
      return settle(promises);
    }
    handleUpload(fileIDs) {
      if (fileIDs.length === 0) {
        this.uppy.log("[Tus] No files to upload");
        return Promise.resolve();
      }
      if (this.opts.limit === 0) {
        this.uppy.log("[Tus] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/tus/#limit-0", "warning");
      }
      this.uppy.log("[Tus] Uploading...");
      const filesToUpload = fileIDs.map((fileID) => this.uppy.getFile(fileID));
      return this.uploadFiles(filesToUpload).then(() => null);
    }
    install() {
      this.uppy.setState({
        capabilities: {
          ...this.uppy.getState().capabilities,
          resumableUploads: true
        }
      });
      this.uppy.addUploader(this.handleUpload);
      this.uppy.on("reset-progress", this.handleResetProgress);
    }
    uninstall() {
      this.uppy.setState({
        capabilities: {
          ...this.uppy.getState().capabilities,
          resumableUploads: false
        }
      });
      this.uppy.removeUploader(this.handleUpload);
    }
  };
  Tus.VERSION = packageJson23.version;

  // ../packages/@uppy/drop-target/lib/index.js
  var packageJson24 = {
    "version": "2.0.1"
  };
  function isFileTransfer(event) {
    var _event$dataTransfer$t, _event$dataTransfer$t2;
    return (_event$dataTransfer$t = (_event$dataTransfer$t2 = event.dataTransfer.types) == null ? void 0 : _event$dataTransfer$t2.some((type) => type === "Files")) != null ? _event$dataTransfer$t : false;
  }
  var DropTarget = class extends BasePlugin {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.addFiles = (files) => {
        const descriptors = files.map((file) => ({
          source: this.id,
          name: file.name,
          type: file.type,
          data: file,
          meta: {
            relativePath: file.relativePath || null
          }
        }));
        try {
          this.uppy.addFiles(descriptors);
        } catch (err) {
          this.uppy.log(err);
        }
      };
      this.handleDrop = async (event) => {
        var _this$opts$onDrop, _this$opts;
        if (!isFileTransfer(event)) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this.removeDragOverClassTimeout);
        event.currentTarget.classList.remove("uppy-is-drag-over");
        this.setPluginState({
          isDraggingOver: false
        });
        this.uppy.iteratePlugins((plugin) => {
          if (plugin.type === "acquirer") {
            plugin.handleRootDrop == null ? void 0 : plugin.handleRootDrop(event);
          }
        });
        let executedDropErrorOnce = false;
        const logDropError = (error) => {
          this.uppy.log(error, "error");
          if (!executedDropErrorOnce) {
            this.uppy.info(error.message, "error");
            executedDropErrorOnce = true;
          }
        };
        const files = await getDroppedFiles(event.dataTransfer, {
          logDropError
        });
        if (files.length > 0) {
          this.uppy.log("[DropTarget] Files were dropped");
          this.addFiles(files);
        }
        (_this$opts$onDrop = (_this$opts = this.opts).onDrop) == null ? void 0 : _this$opts$onDrop.call(_this$opts, event);
      };
      this.handleDragOver = (event) => {
        var _this$opts$onDragOver, _this$opts2;
        if (!isFileTransfer(event)) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "copy";
        clearTimeout(this.removeDragOverClassTimeout);
        event.currentTarget.classList.add("uppy-is-drag-over");
        this.setPluginState({
          isDraggingOver: true
        });
        (_this$opts$onDragOver = (_this$opts2 = this.opts).onDragOver) == null ? void 0 : _this$opts$onDragOver.call(_this$opts2, event);
      };
      this.handleDragLeave = (event) => {
        var _this$opts$onDragLeav, _this$opts3;
        if (!isFileTransfer(event)) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        const {
          currentTarget
        } = event;
        clearTimeout(this.removeDragOverClassTimeout);
        this.removeDragOverClassTimeout = setTimeout(() => {
          currentTarget.classList.remove("uppy-is-drag-over");
          this.setPluginState({
            isDraggingOver: false
          });
        }, 50);
        (_this$opts$onDragLeav = (_this$opts3 = this.opts).onDragLeave) == null ? void 0 : _this$opts$onDragLeav.call(_this$opts3, event);
      };
      this.addListeners = () => {
        const {
          target
        } = this.opts;
        if (target instanceof Element) {
          this.nodes = [target];
        } else if (typeof target === "string") {
          this.nodes = toArray_default(document.querySelectorAll(target));
        }
        if (!this.nodes && !this.nodes.length > 0) {
          throw new Error(`"${target}" does not match any HTML elements`);
        }
        this.nodes.forEach((node) => {
          node.addEventListener("dragover", this.handleDragOver, false);
          node.addEventListener("dragleave", this.handleDragLeave, false);
          node.addEventListener("drop", this.handleDrop, false);
        });
      };
      this.removeListeners = () => {
        if (this.nodes) {
          this.nodes.forEach((node) => {
            node.removeEventListener("dragover", this.handleDragOver, false);
            node.removeEventListener("dragleave", this.handleDragLeave, false);
            node.removeEventListener("drop", this.handleDrop, false);
          });
        }
      };
      this.type = "acquirer";
      this.id = this.opts.id || "DropTarget";
      this.title = "Drop Target";
      const defaultOpts = {
        target: null
      };
      this.opts = {
        ...defaultOpts,
        ...opts
      };
      this.removeDragOverClassTimeout = null;
    }
    install() {
      this.setPluginState({
        isDraggingOver: false
      });
      this.addListeners();
    }
    uninstall() {
      this.removeListeners();
    }
  };
  DropTarget.VERSION = packageJson24.version;

  // ../packages/@uppy/golden-retriever/lib/index.js
  var import_lodash5 = __toESM(require_lodash(), 1);

  // ../packages/@uppy/golden-retriever/lib/ServiceWorkerStore.js
  var isSupported2 = typeof navigator !== "undefined" && "serviceWorker" in navigator;
  function waitForServiceWorker() {
    return new Promise((resolve, reject) => {
      if (!isSupported2) {
        reject(new Error("Unsupported"));
      } else if (navigator.serviceWorker.controller) {
        resolve();
      } else {
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          resolve();
        });
      }
    });
  }
  var ServiceWorkerStore = class {
    constructor(opts) {
      this.ready = waitForServiceWorker();
      this.name = opts.storeName;
    }
    list() {
      const defer = {};
      const promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
      });
      const onMessage = (event) => {
        if (event.data.store !== this.name) {
          return;
        }
        switch (event.data.type) {
          case "uppy/ALL_FILES":
            defer.resolve(event.data.files);
            navigator.serviceWorker.removeEventListener("message", onMessage);
            break;
          default:
            defer.reject();
        }
      };
      this.ready.then(() => {
        navigator.serviceWorker.addEventListener("message", onMessage);
        navigator.serviceWorker.controller.postMessage({
          type: "uppy/GET_FILES",
          store: this.name
        });
      });
      return promise;
    }
    put(file) {
      return this.ready.then(() => {
        navigator.serviceWorker.controller.postMessage({
          type: "uppy/ADD_FILE",
          store: this.name,
          file
        });
      });
    }
    delete(fileID) {
      return this.ready.then(() => {
        navigator.serviceWorker.controller.postMessage({
          type: "uppy/REMOVE_FILE",
          store: this.name,
          fileID
        });
      });
    }
  };
  ServiceWorkerStore.isSupported = isSupported2;
  var ServiceWorkerStore_default = ServiceWorkerStore;

  // ../packages/@uppy/golden-retriever/lib/IndexedDBStore.js
  var indexedDB = typeof window !== "undefined" && (window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB);
  var isSupported3 = !!indexedDB;
  var DB_NAME = "uppy-blobs";
  var STORE_NAME = "files";
  var DEFAULT_EXPIRY = 24 * 60 * 60 * 1e3;
  var DB_VERSION = 3;
  function migrateExpiration(store) {
    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (!cursor) {
        return;
      }
      const entry = cursor.value;
      entry.expires = Date.now() + DEFAULT_EXPIRY;
      cursor.update(entry);
    };
  }
  function connect(dbName) {
    const request = indexedDB.open(dbName, DB_VERSION);
    return new Promise((resolve, reject) => {
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const {
          transaction
        } = event.currentTarget;
        if (event.oldVersion < 2) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: "id"
          });
          store.createIndex("store", "store", {
            unique: false
          });
        }
        if (event.oldVersion < 3) {
          const store = transaction.objectStore(STORE_NAME);
          store.createIndex("expires", "expires", {
            unique: false
          });
          migrateExpiration(store);
        }
        transaction.oncomplete = () => {
          resolve(db);
        };
      };
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = reject;
    });
  }
  function waitForRequest(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = reject;
    });
  }
  var cleanedUp = false;
  var IndexedDBStore = class {
    constructor(opts) {
      this.opts = {
        dbName: DB_NAME,
        storeName: "default",
        expires: DEFAULT_EXPIRY,
        maxFileSize: 10 * 1024 * 1024,
        maxTotalSize: 300 * 1024 * 1024,
        ...opts
      };
      this.name = this.opts.storeName;
      const createConnection = () => {
        return connect(this.opts.dbName);
      };
      if (!cleanedUp) {
        cleanedUp = true;
        this.ready = IndexedDBStore.cleanup().then(createConnection, createConnection);
      } else {
        this.ready = createConnection();
      }
    }
    key(fileID) {
      return `${this.name}!${fileID}`;
    }
    list() {
      return this.ready.then((db) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.index("store").getAll(IDBKeyRange.only(this.name));
        return waitForRequest(request);
      }).then((files) => {
        const result2 = {};
        files.forEach((file) => {
          result2[file.fileID] = file.data;
        });
        return result2;
      });
    }
    get(fileID) {
      return this.ready.then((db) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const request = transaction.objectStore(STORE_NAME).get(this.key(fileID));
        return waitForRequest(request);
      }).then((result2) => ({
        id: result2.data.fileID,
        data: result2.data.data
      }));
    }
    getSize() {
      return this.ready.then((db) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.index("store").openCursor(IDBKeyRange.only(this.name));
        return new Promise((resolve, reject) => {
          let size = 0;
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              size += cursor.value.data.size;
              cursor.continue();
            } else {
              resolve(size);
            }
          };
          request.onerror = () => {
            reject(new Error("Could not retrieve stored blobs size"));
          };
        });
      });
    }
    put(file) {
      if (file.data.size > this.opts.maxFileSize) {
        return Promise.reject(new Error("File is too big to store."));
      }
      return this.getSize().then((size) => {
        if (size > this.opts.maxTotalSize) {
          return Promise.reject(new Error("No space left"));
        }
        return this.ready;
      }).then((db) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const request = transaction.objectStore(STORE_NAME).add({
          id: this.key(file.id),
          fileID: file.id,
          store: this.name,
          expires: Date.now() + this.opts.expires,
          data: file.data
        });
        return waitForRequest(request);
      });
    }
    delete(fileID) {
      return this.ready.then((db) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const request = transaction.objectStore(STORE_NAME).delete(this.key(fileID));
        return waitForRequest(request);
      });
    }
    static cleanup() {
      return connect(DB_NAME).then((db) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.index("expires").openCursor(IDBKeyRange.upperBound(Date.now()));
        return new Promise((resolve, reject) => {
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              cursor.delete();
              cursor.continue();
            } else {
              resolve(db);
            }
          };
          request.onerror = reject;
        });
      }).then((db) => {
        db.close();
      });
    }
  };
  IndexedDBStore.isSupported = isSupported3;
  var IndexedDBStore_default = IndexedDBStore;

  // ../packages/@uppy/golden-retriever/lib/MetaDataStore.js
  function findUppyInstances() {
    const instances = [];
    for (let i4 = 0; i4 < localStorage.length; i4++) {
      const key = localStorage.key(i4);
      if (/^uppyState:/.test(key)) {
        instances.push(key.slice("uppyState:".length));
      }
    }
    return instances;
  }
  function maybeParse(str) {
    try {
      return JSON.parse(str);
    } catch (err) {
      return null;
    }
  }
  var cleanedUp2 = false;
  var MetaDataStore = class {
    constructor(opts) {
      this.opts = {
        expires: 24 * 60 * 60 * 1e3,
        ...opts
      };
      this.name = `uppyState:${opts.storeName}`;
      if (!cleanedUp2) {
        cleanedUp2 = true;
        MetaDataStore.cleanup();
      }
    }
    load() {
      const savedState = localStorage.getItem(this.name);
      if (!savedState)
        return null;
      const data = maybeParse(savedState);
      if (!data)
        return null;
      if (!data.metadata) {
        this.save(data);
        return data;
      }
      return data.metadata;
    }
    save(metadata) {
      const expires = Date.now() + this.opts.expires;
      const state = JSON.stringify({
        metadata,
        expires
      });
      localStorage.setItem(this.name, state);
    }
    static cleanup(instanceID) {
      if (instanceID) {
        localStorage.removeItem(`uppyState:${instanceID}`);
        return;
      }
      const instanceIDs = findUppyInstances();
      const now = Date.now();
      instanceIDs.forEach((id18) => {
        const data = localStorage.getItem(`uppyState:${id18}`);
        if (!data)
          return;
        const obj = maybeParse(data);
        if (!obj)
          return;
        if (obj.expires && obj.expires < now) {
          localStorage.removeItem(`uppyState:${id18}`);
        }
      });
    }
  };

  // ../packages/@uppy/golden-retriever/lib/index.js
  var packageJson25 = {
    "version": "3.0.2"
  };
  var GoldenRetriever = class extends BasePlugin {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.addBlobToStores = (file) => {
        if (file.isRemote)
          return;
        if (this.ServiceWorkerStore) {
          this.ServiceWorkerStore.put(file).catch((err) => {
            this.uppy.log("[GoldenRetriever] Could not store file", "warning");
            this.uppy.log(err);
          });
        }
        this.IndexedDBStore.put(file).catch((err) => {
          this.uppy.log("[GoldenRetriever] Could not store file", "warning");
          this.uppy.log(err);
        });
      };
      this.removeBlobFromStores = (file) => {
        if (this.ServiceWorkerStore) {
          this.ServiceWorkerStore.delete(file.id).catch((err) => {
            this.uppy.log("[GoldenRetriever] Failed to remove file", "warning");
            this.uppy.log(err);
          });
        }
        this.IndexedDBStore.delete(file.id).catch((err) => {
          this.uppy.log("[GoldenRetriever] Failed to remove file", "warning");
          this.uppy.log(err);
        });
      };
      this.replaceBlobInStores = (file) => {
        this.removeBlobFromStores(file);
        this.addBlobToStores(file);
      };
      this.handleRestoreConfirmed = () => {
        this.uppy.log("[GoldenRetriever] Restore confirmed, proceeding...");
        const {
          currentUploads
        } = this.uppy.getState();
        if (currentUploads) {
          this.uppy.resumeAll();
          Object.keys(currentUploads).forEach((uploadId) => {
            this.uppy.restore(uploadId, currentUploads[uploadId]);
          });
        }
        this.uppy.setState({
          recoveredState: null
        });
      };
      this.abortRestore = () => {
        this.uppy.log("[GoldenRetriever] Aborting restore...");
        const fileIDs = Object.keys(this.uppy.getState().files);
        this.deleteBlobs(fileIDs).then(() => {
          this.uppy.log(`[GoldenRetriever] Removed ${fileIDs.length} files`);
        }).catch((err) => {
          this.uppy.log(`[GoldenRetriever] Could not remove ${fileIDs.length} files`, "warning");
          this.uppy.log(err);
        });
        this.uppy.cancelAll();
        this.uppy.setState({
          recoveredState: null
        });
        MetaDataStore.cleanup(this.uppy.opts.id);
      };
      this.handleComplete = (_ref) => {
        let {
          successful
        } = _ref;
        const fileIDs = successful.map((file) => file.id);
        this.deleteBlobs(fileIDs).then(() => {
          this.uppy.log(`[GoldenRetriever] Removed ${successful.length} files that finished uploading`);
        }).catch((err) => {
          this.uppy.log(`[GoldenRetriever] Could not remove ${successful.length} files that finished uploading`, "warning");
          this.uppy.log(err);
        });
        this.uppy.setState({
          recoveredState: null
        });
        MetaDataStore.cleanup(this.uppy.opts.id);
      };
      this.restoreBlobs = () => {
        if (this.uppy.getFiles().length > 0) {
          Promise.all([this.loadFileBlobsFromServiceWorker(), this.loadFileBlobsFromIndexedDB()]).then((resultingArrayOfObjects) => {
            const blobs = {
              ...resultingArrayOfObjects[0],
              ...resultingArrayOfObjects[1]
            };
            this.onBlobsLoaded(blobs);
          });
        } else {
          this.uppy.log("[GoldenRetriever] No files need to be loaded, only restoring processing state...");
        }
      };
      this.type = "debugger";
      this.id = this.opts.id || "GoldenRetriever";
      this.title = "Golden Retriever";
      const defaultOptions4 = {
        expires: 24 * 60 * 60 * 1e3,
        serviceWorker: false
      };
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      this.MetaDataStore = new MetaDataStore({
        expires: this.opts.expires,
        storeName: uppy.getID()
      });
      this.ServiceWorkerStore = null;
      if (this.opts.serviceWorker) {
        this.ServiceWorkerStore = new ServiceWorkerStore_default({
          storeName: uppy.getID()
        });
      }
      this.IndexedDBStore = new IndexedDBStore_default({
        expires: this.opts.expires,
        ...this.opts.indexedDB || {},
        storeName: uppy.getID()
      });
      this.saveFilesStateToLocalStorage = (0, import_lodash5.default)(this.saveFilesStateToLocalStorage.bind(this), 500, {
        leading: true,
        trailing: true
      });
      this.restoreState = this.restoreState.bind(this);
      this.loadFileBlobsFromServiceWorker = this.loadFileBlobsFromServiceWorker.bind(this);
      this.loadFileBlobsFromIndexedDB = this.loadFileBlobsFromIndexedDB.bind(this);
      this.onBlobsLoaded = this.onBlobsLoaded.bind(this);
    }
    restoreState() {
      const savedState = this.MetaDataStore.load();
      if (savedState) {
        this.uppy.log("[GoldenRetriever] Recovered some state from Local Storage");
        this.uppy.setState({
          currentUploads: savedState.currentUploads || {},
          files: savedState.files || {},
          recoveredState: savedState
        });
        this.savedPluginData = savedState.pluginData;
      }
    }
    getWaitingFiles() {
      const waitingFiles = {};
      this.uppy.getFiles().forEach((file) => {
        if (!file.progress || !file.progress.uploadStarted) {
          waitingFiles[file.id] = file;
        }
      });
      return waitingFiles;
    }
    getUploadingFiles() {
      const uploadingFiles = {};
      const {
        currentUploads
      } = this.uppy.getState();
      if (currentUploads) {
        const uploadIDs = Object.keys(currentUploads);
        uploadIDs.forEach((uploadID) => {
          const filesInUpload = currentUploads[uploadID].fileIDs;
          filesInUpload.forEach((fileID) => {
            uploadingFiles[fileID] = this.uppy.getFile(fileID);
          });
        });
      }
      return uploadingFiles;
    }
    saveFilesStateToLocalStorage() {
      const filesToSave = {
        ...this.getWaitingFiles(),
        ...this.getUploadingFiles()
      };
      if (Object.keys(filesToSave).length === 0) {
        if (this.uppy.getState().recoveredState !== null) {
          this.uppy.setState({
            recoveredState: null
          });
        }
        MetaDataStore.cleanup(this.uppy.opts.id);
        return;
      }
      const filesToSaveWithoutData = {};
      Object.keys(filesToSave).forEach((file) => {
        if (filesToSave[file].isRemote) {
          filesToSaveWithoutData[file] = {
            ...filesToSave[file],
            isRestored: true
          };
        } else {
          filesToSaveWithoutData[file] = {
            ...filesToSave[file],
            isRestored: true,
            data: null,
            preview: null
          };
        }
      });
      const pluginData = {};
      this.uppy.emit("restore:get-data", (data) => {
        Object.assign(pluginData, data);
      });
      const {
        currentUploads
      } = this.uppy.getState();
      this.MetaDataStore.save({
        currentUploads,
        files: filesToSaveWithoutData,
        pluginData
      });
    }
    loadFileBlobsFromServiceWorker() {
      if (!this.ServiceWorkerStore) {
        return Promise.resolve({});
      }
      return this.ServiceWorkerStore.list().then((blobs) => {
        const numberOfFilesRecovered = Object.keys(blobs).length;
        if (numberOfFilesRecovered > 0) {
          this.uppy.log(`[GoldenRetriever] Successfully recovered ${numberOfFilesRecovered} blobs from Service Worker!`);
          return blobs;
        }
        this.uppy.log("[GoldenRetriever] No blobs found in Service Worker, trying IndexedDB now...");
        return {};
      }).catch((err) => {
        this.uppy.log("[GoldenRetriever] Failed to recover blobs from Service Worker", "warning");
        this.uppy.log(err);
        return {};
      });
    }
    loadFileBlobsFromIndexedDB() {
      return this.IndexedDBStore.list().then((blobs) => {
        const numberOfFilesRecovered = Object.keys(blobs).length;
        if (numberOfFilesRecovered > 0) {
          this.uppy.log(`[GoldenRetriever] Successfully recovered ${numberOfFilesRecovered} blobs from IndexedDB!`);
          return blobs;
        }
        this.uppy.log("[GoldenRetriever] No blobs found in IndexedDB");
        return {};
      }).catch((err) => {
        this.uppy.log("[GoldenRetriever] Failed to recover blobs from IndexedDB", "warning");
        this.uppy.log(err);
        return {};
      });
    }
    onBlobsLoaded(blobs) {
      const obsoleteBlobs = [];
      const updatedFiles = {
        ...this.uppy.getState().files
      };
      Object.keys(blobs).forEach((fileID) => {
        const originalFile = this.uppy.getFile(fileID);
        if (!originalFile) {
          obsoleteBlobs.push(fileID);
          return;
        }
        const cachedData = blobs[fileID];
        const updatedFileData = {
          data: cachedData,
          isRestored: true,
          isGhost: false
        };
        updatedFiles[fileID] = {
          ...originalFile,
          ...updatedFileData
        };
      });
      Object.keys(updatedFiles).forEach((fileID) => {
        if (updatedFiles[fileID].data === null) {
          updatedFiles[fileID] = {
            ...updatedFiles[fileID],
            isGhost: true
          };
        }
      });
      this.uppy.setState({
        files: updatedFiles
      });
      this.uppy.emit("restored", this.savedPluginData);
      if (obsoleteBlobs.length) {
        this.deleteBlobs(obsoleteBlobs).then(() => {
          this.uppy.log(`[GoldenRetriever] Cleaned up ${obsoleteBlobs.length} old files`);
        }).catch((err) => {
          this.uppy.log(`[GoldenRetriever] Could not clean up ${obsoleteBlobs.length} old files`, "warning");
          this.uppy.log(err);
        });
      }
    }
    deleteBlobs(fileIDs) {
      const promises = [];
      fileIDs.forEach((id18) => {
        if (this.ServiceWorkerStore) {
          promises.push(this.ServiceWorkerStore.delete(id18));
        }
        if (this.IndexedDBStore) {
          promises.push(this.IndexedDBStore.delete(id18));
        }
      });
      return Promise.all(promises);
    }
    install() {
      this.restoreState();
      this.restoreBlobs();
      this.uppy.on("file-added", this.addBlobToStores);
      this.uppy.on("file-editor:complete", this.replaceBlobInStores);
      this.uppy.on("file-removed", this.removeBlobFromStores);
      this.uppy.on("state-update", this.saveFilesStateToLocalStorage);
      this.uppy.on("restore-confirmed", this.handleRestoreConfirmed);
      this.uppy.on("restore-canceled", this.abortRestore);
      this.uppy.on("complete", this.handleComplete);
    }
    uninstall() {
      this.uppy.off("file-added", this.addBlobToStores);
      this.uppy.off("file-editor:complete", this.replaceBlobInStores);
      this.uppy.off("file-removed", this.removeBlobFromStores);
      this.uppy.off("state-update", this.saveFilesStateToLocalStorage);
      this.uppy.off("restore-confirmed", this.handleRestoreConfirmed);
      this.uppy.off("restore-canceled", this.abortRestore);
      this.uppy.off("complete", this.handleComplete);
    }
  };
  GoldenRetriever.VERSION = packageJson25.version;

  // ../packages/@uppy/compressor/lib/index.js
  var import_prettier_bytes4 = __toESM(require_prettierBytes(), 1);
  var import_compressor_common = __toESM(require_compressor_common(), 1);

  // ../packages/@uppy/compressor/lib/locale.js
  var locale_default17 = {
    strings: {
      compressingImages: "Compressing images...",
      compressedX: "Saved %{size} by compressing images"
    }
  };

  // ../packages/@uppy/compressor/lib/index.js
  function _classPrivateFieldLooseBase17(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id17 = 0;
  function _classPrivateFieldLooseKey17(name) {
    return "__private_" + id17++ + "_" + name;
  }
  var _RateLimitedQueue = /* @__PURE__ */ _classPrivateFieldLooseKey17("RateLimitedQueue");
  var Compressor = class extends BasePlugin {
    constructor(uppy, opts) {
      super(uppy, opts);
      Object.defineProperty(this, _RateLimitedQueue, {
        writable: true,
        value: void 0
      });
      this.id = this.opts.id || "Compressor";
      this.type = "modifier";
      this.defaultLocale = locale_default17;
      const defaultOptions4 = {
        quality: 0.6,
        limit: 10
      };
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      _classPrivateFieldLooseBase17(this, _RateLimitedQueue)[_RateLimitedQueue] = new RateLimitedQueue(this.opts.limit);
      this.i18nInit();
      this.prepareUpload = this.prepareUpload.bind(this);
      this.compress = this.compress.bind(this);
    }
    compress(blob) {
      return new Promise((resolve, reject) => {
        new import_compressor_common.default(blob, {
          ...this.opts,
          success: resolve,
          error: reject
        });
      });
    }
    async prepareUpload(fileIDs) {
      let totalCompressedSize = 0;
      const compressedFiles = [];
      const compressAndApplyResult = _classPrivateFieldLooseBase17(this, _RateLimitedQueue)[_RateLimitedQueue].wrapPromiseFunction(async (file) => {
        try {
          const compressedBlob = await this.compress(file.data);
          const compressedSavingsSize = file.data.size - compressedBlob.size;
          this.uppy.log(`[Image Compressor] Image ${file.id} compressed by ${(0, import_prettier_bytes4.default)(compressedSavingsSize)}`);
          totalCompressedSize += compressedSavingsSize;
          const {
            name,
            type,
            size
          } = compressedBlob;
          const extension = name && getFileNameAndExtension(name).extension;
          this.uppy.setFileState(file.id, {
            ...name && {
              name
            },
            ...extension && {
              extension
            },
            ...type && {
              type
            },
            ...size && {
              size
            },
            data: compressedBlob
          });
          this.uppy.setFileMeta(file.id, {
            type
          });
          compressedFiles.push(file);
        } catch (err) {
          this.uppy.log(`[Image Compressor] Failed to compress ${file.id}:`, "warning");
          this.uppy.log(err, "warning");
        }
      });
      const promises = fileIDs.map((fileID) => {
        const file = this.uppy.getFile(fileID);
        this.uppy.emit("preprocess-progress", file, {
          mode: "indeterminate",
          message: this.i18n("compressingImages")
        });
        if (file.isRemote) {
          return Promise.resolve();
        }
        if (!file.data.type) {
          file.data = file.data.slice(0, file.data.size, file.type);
        }
        if (!file.type.startsWith("image/")) {
          return Promise.resolve();
        }
        return compressAndApplyResult(file);
      });
      await Promise.all(promises);
      this.uppy.emit("compressor:complete", compressedFiles);
      if (totalCompressedSize > 1024) {
        this.uppy.info(this.i18n("compressedX", {
          size: (0, import_prettier_bytes4.default)(totalCompressedSize)
        }), "info");
      }
      for (const fileID of fileIDs) {
        const file = this.uppy.getFile(fileID);
        this.uppy.emit("preprocess-complete", file);
      }
    }
    install() {
      this.uppy.addPreProcessor(this.prepareUpload);
    }
    uninstall() {
      this.uppy.removePreProcessor(this.prepareUpload);
    }
  };

  // src/examples/locale_list.json
  var locale_list_default = { ar_SA: "Arabic (Saudi Arabia)", bg_BG: "Bulgarian (Bulgaria)", cs_CZ: "Czech (Czechia)", da_DK: "Danish (Denmark)", de_DE: "German (Germany)", el_GR: "Greek (Greece)", en_US: "English (United States)", es_ES: "Spanish (Spain)", fa_IR: "Persian (Iran)", fi_FI: "Finnish (Finland)", fr_FR: "French (France)", gl_ES: "Galician (Spain)", he_IL: "Hebrew (Israel)", hr_HR: "Croatian (Croatia)", hu_HU: "Hungarian (Hungary)", id_ID: "Indonesian (Indonesia)", is_IS: "Icelandic (Iceland)", it_IT: "Italian (Italy)", ja_JP: "Japanese (Japan)", ko_KR: "Korean (South Korea)", nb_NO: "Norwegian Bokm\xE5l (Norway)", nl_NL: "Dutch (Netherlands)", pl_PL: "Polish (Poland)", pt_BR: "Portuguese (Brazil)", pt_PT: "Portuguese (Portugal)", ro_RO: "Romanian (Romania)", ru_RU: "Russian (Russia)", sk_SK: "Slovak (Slovakia)", sr_RS_Cyrillic: "Serbian (Serbia, Cyrillic)", sr_RS_Latin: "Serbian (Serbia, Latin)", sv_SE: "Swedish (Sweden)", th_TH: "Thai (Thailand)", tr_TR: "Turkish (Turkey)", uk_UA: "Ukrainian (Ukraine)", uz_UZ: "Uzbek (Uzbekistan)", vi_VN: "Vietnamese (Vietnam)", zh_CN: "Chinese (China)", zh_TW: "Chinese (Taiwan)" };

  // src/examples/dashboard/app.es6
  var import_env = __toESM(require_env());
  var RTL_LOCALES = ["ar_SA", "fa_IR", "he_IL"];
  if (typeof window !== "undefined" && typeof window.Uppy === "undefined") {
    window.Uppy = {
      locales: {}
    };
  }
  function uppyInit() {
    if (window.uppy) {
      window.uppy.close();
    }
    const opts = window.uppyOptions;
    const uppy = new Uppy_default({
      logger: debugLogger
    });
    uppy.use(Tus, {
      endpoint: "https://tusd.tusdemo.net/files/"
    });
    uppy.on("complete", (result2) => {
      console.log("successful files:");
      console.log(result2.successful);
      console.log("failed files:");
      console.log(result2.failed);
    });
    uppy.use(Dashboard2, {
      trigger: ".UppyModalOpenerBtn",
      target: opts.DashboardInline ? ".DashboardContainer" : "body",
      inline: opts.DashboardInline,
      height: 470,
      showProgressDetails: true,
      metaFields: [{
        id: "name",
        name: "Name",
        placeholder: "file name"
      }, {
        id: "caption",
        name: "Caption",
        placeholder: "add description"
      }]
    });
    window.uppy = uppy;
  }
  function uppySetOptions() {
    const opts = window.uppyOptions;
    const defaultNullRestrictions = {
      maxFileSize: null,
      minFileSize: null,
      maxNumberOfFiles: null,
      minNumberOfFiles: null,
      allowedFileTypes: null
    };
    const restrictions = {
      maxFileSize: 1e6,
      maxNumberOfFiles: 3,
      minNumberOfFiles: 2,
      allowedFileTypes: ["image/*", "video/*"],
      requiredMetaFields: ["caption"]
    };
    window.uppy.setOptions({
      autoProceed: opts.autoProceed,
      restrictions: opts.restrictions ? restrictions : defaultNullRestrictions
    });
    window.uppy.getPlugin("Dashboard").setOptions({
      note: opts.restrictions ? "Images and video only, 2\u20133 files, up to 1 MB" : "",
      theme: opts.darkMode ? "dark" : "light",
      disabled: opts.disabled
    });
    const googleDriveInstance = window.uppy.getPlugin("GoogleDrive");
    if (opts.GoogleDrive && !googleDriveInstance) {
      window.uppy.use(GoogleDrive, {
        target: Dashboard2,
        companionUrl: import_env.default
      });
    }
    if (!opts.GoogleDrive && googleDriveInstance) {
      window.uppy.removePlugin(googleDriveInstance);
    }
    const dropboxInstance = window.uppy.getPlugin("Dropbox");
    if (opts.Dropbox && !dropboxInstance) {
      window.uppy.use(Dropbox, {
        target: Dashboard2,
        companionUrl: import_env.default
      });
    }
    if (!opts.Dropbox && dropboxInstance) {
      window.uppy.removePlugin(dropboxInstance);
    }
    const instagramInstance = window.uppy.getPlugin("Instagram");
    if (opts.Instagram && !instagramInstance) {
      window.uppy.use(Instagram, {
        target: Dashboard2,
        companionUrl: import_env.default
      });
    }
    if (!opts.Instagram && instagramInstance) {
      window.uppy.removePlugin(instagramInstance);
    }
    const urlInstance = window.uppy.getPlugin("Url");
    if (opts.Url && !urlInstance) {
      window.uppy.use(Url, {
        target: Dashboard2,
        companionUrl: import_env.default
      });
    }
    if (!opts.Url && urlInstance) {
      window.uppy.removePlugin(urlInstance);
    }
    const facebookInstance = window.uppy.getPlugin("Facebook");
    if (opts.Facebook && !facebookInstance) {
      window.uppy.use(Facebook, {
        target: Dashboard2,
        companionUrl: import_env.default
      });
    }
    if (!opts.Facebook && facebookInstance) {
      window.uppy.removePlugin(facebookInstance);
    }
    const oneDriveInstance = window.uppy.getPlugin("OneDrive");
    if (opts.OneDrive && !oneDriveInstance) {
      window.uppy.use(OneDrive, {
        target: Dashboard2,
        companionUrl: import_env.default
      });
    }
    if (!opts.OneDrive && oneDriveInstance) {
      window.uppy.removePlugin(oneDriveInstance);
    }
    const unsplashInstance = window.uppy.getPlugin("Unsplash");
    if (opts.Unsplash && !unsplashInstance) {
      window.uppy.use(Unsplash, {
        target: Dashboard2,
        companionUrl: import_env.default
      });
    }
    if (!opts.Unsplash && unsplashInstance) {
      window.uppy.removePlugin(unsplashInstance);
    }
    const zoomInstance = window.uppy.getPlugin("Zoom");
    if (opts.Zoom && !zoomInstance) {
      window.uppy.use(Zoom, {
        target: Dashboard2,
        companionUrl: "https://intense-meadow-61813.herokuapp.com/"
      });
    }
    if (!opts.Zoom && zoomInstance) {
      window.uppy.removePlugin(zoomInstance);
    }
    const boxInstance = window.uppy.getPlugin("Box");
    if (opts.Box && !boxInstance) {
      window.uppy.use(Box, {
        target: Dashboard2,
        companionUrl: import_env.default
      });
    }
    if (!opts.Box && boxInstance) {
      window.uppy.removePlugin(boxInstance);
    }
    const webcamInstance = window.uppy.getPlugin("Webcam");
    if (opts.Webcam && !webcamInstance) {
      window.uppy.use(Webcam, {
        target: Dashboard2,
        showVideoSourceDropdown: true
      });
    }
    if (!opts.Webcam && webcamInstance) {
      window.uppy.removePlugin(webcamInstance);
    }
    const audioInstance = window.uppy.getPlugin("Audio");
    if (opts.Audio && !audioInstance) {
      window.uppy.use(Audio, {
        target: Dashboard2,
        showAudioSourceDropdown: true
      });
    }
    if (!opts.Audio && audioInstance) {
      window.uppy.removePlugin(audioInstance);
    }
    const screenCaptureInstance = window.uppy.getPlugin("ScreenCapture");
    if (opts.ScreenCapture && !screenCaptureInstance) {
      window.uppy.use(ScreenCapture, {
        target: Dashboard2
      });
    }
    if (!opts.ScreenCapture && screenCaptureInstance) {
      window.uppy.removePlugin(screenCaptureInstance);
    }
    const imageEditorInstance = window.uppy.getPlugin("ImageEditor");
    if (opts.imageEditor && !imageEditorInstance) {
      window.uppy.use(ImageEditor, {
        target: Dashboard2
      });
    }
    if (!opts.imageEditor && imageEditorInstance) {
      window.uppy.removePlugin(imageEditorInstance);
    }
    const dropTargetInstance = window.uppy.getPlugin("DropTarget");
    if (opts.DropTarget && !dropTargetInstance) {
      window.uppy.use(DropTarget, {
        target: document.body
      });
    }
    if (!opts.DropTarget && dropTargetInstance) {
      window.uppy.removePlugin(dropTargetInstance);
    }
    const goldenRetrieverInstance = window.uppy.getPlugin("GoldenRetriever");
    if (opts.GoldenRetriever && !goldenRetrieverInstance) {
      window.uppy.use(GoldenRetriever);
    }
    if (!opts.GoldenRetriever && goldenRetrieverInstance) {
      window.uppy.removePlugin(goldenRetrieverInstance);
    }
    const compressorInstance = window.uppy.getPlugin("Compressor");
    if (opts.Compressor && !compressorInstance) {
      window.uppy.use(Compressor);
    }
    if (!opts.Compressor && compressorInstance) {
      window.uppy.removePlugin(compressorInstance);
    }
  }
  function whenLocaleAvailable(localeName, callback) {
    const interval = 100;
    const loop = setInterval(() => {
      if (window.Uppy && window.Uppy.locales && window.Uppy.locales[localeName]) {
        clearInterval(loop);
        callback(window.Uppy.locales[localeName]);
      }
    }, interval);
  }
  function loadLocaleFromCDN(localeName) {
    const head = document.getElementsByTagName("head")[0];
    const js = document.createElement("script");
    js.type = "text/javascript";
    js.src = `https://releases.transloadit.com/uppy/locales/v3.0.7/${localeName}.min.js`;
    head.appendChild(js);
  }
  function setLocale(localeName) {
    if (typeof window.Uppy.locales[localeName] === "undefined") {
      loadLocaleFromCDN(localeName);
    }
    whenLocaleAvailable(localeName, (localeObj) => {
      const direction = RTL_LOCALES.indexOf(localeName) !== -1 ? "rtl" : "ltr";
      window.uppy.setOptions({
        locale: localeObj
      });
      window.uppy.getPlugin("Dashboard").setOptions({
        direction
      });
    });
  }
  function populateLocaleSelect() {
    const localeSelect = document.getElementById("localeList");
    Object.keys(locale_list_default).forEach((localeName) => {
      if (localeName === "en_US")
        return;
      localeSelect.innerHTML += `<option value="${localeName}">${locale_list_default[localeName]} \u2014 (${localeName})</option>`;
    });
    localeSelect.addEventListener("change", (event) => {
      const localeName = event.target.value;
      setLocale(localeName);
    });
  }
  window.uppySetOptions = uppySetOptions;
  window.uppyInit = uppyInit;
  window.uppySetLocale = setLocale;
  populateLocaleSelect();
  uppyInit();
  uppySetOptions();
})();
//# sourceMappingURL=app.js.map
