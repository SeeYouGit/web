/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@tweenjs/tween.js/src/Tween.js":
/*!*****************************************************!*\
  !*** ./node_modules/@tweenjs/tween.js/src/Tween.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */


var _Group = function () {
	this._tweens = {};
	this._tweensAddedDuringUpdate = {};
};

_Group.prototype = {
	getAll: function () {

		return Object.keys(this._tweens).map(function (tweenId) {
			return this._tweens[tweenId];
		}.bind(this));

	},

	removeAll: function () {

		this._tweens = {};

	},

	add: function (tween) {

		this._tweens[tween.getId()] = tween;
		this._tweensAddedDuringUpdate[tween.getId()] = tween;

	},

	remove: function (tween) {

		delete this._tweens[tween.getId()];
		delete this._tweensAddedDuringUpdate[tween.getId()];

	},

	update: function (time, preserve) {

		var tweenIds = Object.keys(this._tweens);

		if (tweenIds.length === 0) {
			return false;
		}

		time = time !== undefined ? time : TWEEN.now();

		// Tweens are updated in "batches". If you add a new tween during an update, then the
		// new tween will be updated in the next batch.
		// If you remove a tween during an update, it may or may not be updated. However,
		// if the removed tween was added during the current batch, then it will not be updated.
		while (tweenIds.length > 0) {
			this._tweensAddedDuringUpdate = {};

			for (var i = 0; i < tweenIds.length; i++) {

				var tween = this._tweens[tweenIds[i]];

				if (tween && tween.update(time) === false) {
					tween._isPlaying = false;

					if (!preserve) {
						delete this._tweens[tweenIds[i]];
					}
				}
			}

			tweenIds = Object.keys(this._tweensAddedDuringUpdate);
		}

		return true;

	}
};

var TWEEN = new _Group();

TWEEN.Group = _Group;
TWEEN._nextId = 0;
TWEEN.nextId = function () {
	return TWEEN._nextId++;
};


// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof (self) === 'undefined' && typeof (process) !== 'undefined' && process.hrtime) {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use self.performance.now if it is available.
else if (typeof (self) !== 'undefined' &&
         self.performance !== undefined &&
		 self.performance.now !== undefined) {
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	TWEEN.now = self.performance.now.bind(self.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
	TWEEN.now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
	TWEEN.now = function () {
		return new Date().getTime();
	};
}


TWEEN.Tween = function (object, group) {
	this._object = object;
	this._valuesStart = {};
	this._valuesEnd = {};
	this._valuesStartRepeat = {};
	this._duration = 1000;
	this._repeat = 0;
	this._repeatDelayTime = undefined;
	this._yoyo = false;
	this._isPlaying = false;
	this._reversed = false;
	this._delayTime = 0;
	this._startTime = null;
	this._easingFunction = TWEEN.Easing.Linear.None;
	this._interpolationFunction = TWEEN.Interpolation.Linear;
	this._chainedTweens = [];
	this._onStartCallback = null;
	this._onStartCallbackFired = false;
	this._onUpdateCallback = null;
	this._onRepeatCallback = null;
	this._onCompleteCallback = null;
	this._onStopCallback = null;
	this._group = group || TWEEN;
	this._id = TWEEN.nextId();

};

TWEEN.Tween.prototype = {
	getId: function () {
		return this._id;
	},

	isPlaying: function () {
		return this._isPlaying;
	},

	to: function (properties, duration) {

		this._valuesEnd = Object.create(properties);

		if (duration !== undefined) {
			this._duration = duration;
		}

		return this;

	},

	duration: function duration(d) {
		this._duration = d;
		return this;
	},

	start: function (time) {

		this._group.add(this);

		this._isPlaying = true;

		this._onStartCallbackFired = false;

		this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
		this._startTime += this._delayTime;

		for (var property in this._valuesEnd) {

			// Check if an Array was provided as property value
			if (this._valuesEnd[property] instanceof Array) {

				if (this._valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);

			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (this._object[property] === undefined) {
				continue;
			}

			// Save the starting value.
			this._valuesStart[property] = this._object[property];

			if ((this._valuesStart[property] instanceof Array) === false) {
				this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			this._valuesStartRepeat[property] = this._valuesStart[property] || 0;

		}

		return this;

	},

	stop: function () {

		if (!this._isPlaying) {
			return this;
		}

		this._group.remove(this);
		this._isPlaying = false;

		if (this._onStopCallback !== null) {
			this._onStopCallback(this._object);
		}

		this.stopChainedTweens();
		return this;

	},

	end: function () {

		this.update(Infinity);
		return this;

	},

	stopChainedTweens: function () {

		for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
			this._chainedTweens[i].stop();
		}

	},

	group: function (group) {
		this._group = group;
		return this;
	},

	delay: function (amount) {

		this._delayTime = amount;
		return this;

	},

	repeat: function (times) {

		this._repeat = times;
		return this;

	},

	repeatDelay: function (amount) {

		this._repeatDelayTime = amount;
		return this;

	},

	yoyo: function (yoyo) {

		this._yoyo = yoyo;
		return this;

	},

	easing: function (easingFunction) {

		this._easingFunction = easingFunction;
		return this;

	},

	interpolation: function (interpolationFunction) {

		this._interpolationFunction = interpolationFunction;
		return this;

	},

	chain: function () {

		this._chainedTweens = arguments;
		return this;

	},

	onStart: function (callback) {

		this._onStartCallback = callback;
		return this;

	},

	onUpdate: function (callback) {

		this._onUpdateCallback = callback;
		return this;

	},

	onRepeat: function onRepeat(callback) {

		this._onRepeatCallback = callback;
		return this;

	},

	onComplete: function (callback) {

		this._onCompleteCallback = callback;
		return this;

	},

	onStop: function (callback) {

		this._onStopCallback = callback;
		return this;

	},

	update: function (time) {

		var property;
		var elapsed;
		var value;

		if (time < this._startTime) {
			return true;
		}

		if (this._onStartCallbackFired === false) {

			if (this._onStartCallback !== null) {
				this._onStartCallback(this._object);
			}

			this._onStartCallbackFired = true;
		}

		elapsed = (time - this._startTime) / this._duration;
		elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

		value = this._easingFunction(elapsed);

		for (property in this._valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (this._valuesStart[property] === undefined) {
				continue;
			}

			var start = this._valuesStart[property] || 0;
			var end = this._valuesEnd[property];

			if (end instanceof Array) {

				this._object[property] = this._interpolationFunction(end, value);

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof (end) === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
					this._object[property] = start + (end - start) * value;
				}

			}

		}

		if (this._onUpdateCallback !== null) {
			this._onUpdateCallback(this._object, elapsed);
		}

		if (elapsed === 1) {

			if (this._repeat > 0) {

				if (isFinite(this._repeat)) {
					this._repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in this._valuesStartRepeat) {

					if (typeof (this._valuesEnd[property]) === 'string') {
						this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
					}

					if (this._yoyo) {
						var tmp = this._valuesStartRepeat[property];

						this._valuesStartRepeat[property] = this._valuesEnd[property];
						this._valuesEnd[property] = tmp;
					}

					this._valuesStart[property] = this._valuesStartRepeat[property];

				}

				if (this._yoyo) {
					this._reversed = !this._reversed;
				}

				if (this._repeatDelayTime !== undefined) {
					this._startTime = time + this._repeatDelayTime;
				} else {
					this._startTime = time + this._delayTime;
				}

				if (this._onRepeatCallback !== null) {
					this._onRepeatCallback(this._object);
				}

				return true;

			} else {

				if (this._onCompleteCallback !== null) {

					this._onCompleteCallback(this._object);
				}

				for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					this._chainedTweens[i].start(this._startTime + this._duration);
				}

				return false;

			}

		}

		return true;

	}
};


TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function (k) {

			return k * k * k;

		},

		Out: function (k) {

			return --k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function (k) {

			return k * k * k * k;

		},

		Out: function (k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function (k) {

			return k * k * k * k * k;

		},

		Out: function (k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function (k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function (k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function (k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function (k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

		},

		Out: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

		}

	},

	Back: {

		In: function (k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function (k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function (k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function (k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

		},

		Out: function (k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function (k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

// UMD (Universal Module Definition)
(function (root) {

	if (true) {

		// AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return TWEEN;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	} else {}

})(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
const decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");
const splitOnFirst = __webpack_require__(/*! split-on-first */ "./node_modules/split-on-first/index.js");

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'comma':
			return key => (result, value) => {
				if (value === null || value === undefined || value.length === 0) {
					return result;
				}

				if (result.length === 0) {
					return [[encode(key, options), '=', encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(',')];
			};

		default:
			return key => (result, value) => {
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.split('').indexOf(',') > -1;
				const newValue = isArray ? value.split(',') : value;
				accumulator[key] = newValue;
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(input, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof input !== 'string') {
		return ret;
	}

	input = input.trim().replace(/^[?#&]/, '');

	if (!input) {
		return ret;
	}

	for (const param of input.split('&')) {
		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none'
	}, options);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = Object.assign({}, object);
	if (options.skipNull) {
		for (const key of Object.keys(objectCopy)) {
			if (objectCopy[key] === undefined || objectCopy[key] === null) {
				delete objectCopy[key];
			}
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (input, options) => {
	return {
		url: removeHash(input).split('?')[0] || '',
		query: parse(extract(input), options)
	};
};


/***/ }),

/***/ "./node_modules/split-on-first/index.js":
/*!**********************************************!*\
  !*** ./node_modules/split-on-first/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: BackendEngine, PlatformValue, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackendEngine", function() { return BackendEngine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformValue", function() { return PlatformValue; });
/** 启动参数，在`game.js`中定义 */
var config = function () { return window['wx'] ? window['wx']['config'] : window['config']; }();
/** 游戏引擎 */
var BackendEngine;
(function (BackendEngine) {
    BackendEngine["LAYA"] = "laya";
    BackendEngine["EGRET"] = "egret";
})(BackendEngine || (BackendEngine = {}));
var PlatformValue;
(function (PlatformValue) {
    PlatformValue["WEB"] = "web";
    PlatformValue["WECHAT"] = "wechat";
    PlatformValue["QQ"] = "qq";
    PlatformValue["BAIDU"] = "baidu";
    PlatformValue["OPPO"] = "oppo";
    PlatformValue["BYTEDANCE"] = "bytedance";
})(PlatformValue || (PlatformValue = {}));
/*
 * 游戏初始化配置;
 */
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        // 读取 game.js 中的配置
        for (var key in config)
            this[key] = config[key];
        if (typeof (Laya) !== 'undefined') {
            this.backend_engine = BackendEngine.LAYA;
        }
        else if (typeof (egret) !== 'undefined') {
            this.backend_engine = BackendEngine.EGRET;
        }
        switch (this.backend_engine) {
            case BackendEngine.LAYA:
                this.start_laya();
                break;
            case BackendEngine.EGRET:
                this.start_egret();
                break;
            default:
                throw new Error("未找到受支持的游戏引擎" + this.backend_engine + "， 请检查 game.js 中是否引入引擎库");
                break;
        }
    };
    GameConfig.start_laya = function () {
        // 根据配置启动 Laya 引擎
        Config.useWebGL2 = false;
        typeof (Laya3D) === 'undefined' ? Laya.init(this.width, this.height) : Laya3D.init(this.width, this.height);
        if (typeof (Laya.Physics) !== 'undefined')
            Laya.Physics.enable();
        if (this.inspector || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (this.physics_debug && Laya.PhysicsDebugDraw)
            Laya.PhysicsDebugDraw.enable();
        if (this.stat)
            Laya.Stat.show(0, 200);
        // 根据配置设置舞台数据
        Laya.stage.bgColor = this.canvas_color;
        Laya.stage.scaleMode = this.scale_mode;
        Laya.stage.screenMode = this.screen_mode;
        Laya.stage.useRetinalCanvas = this.retinal_mode;
        if (this.base_resource_url) {
            Laya.URL.basePath = this.base_resource_url;
        }
        console.log("使用资源路径", Laya.URL.basePath);
        this.backend_stage = Laya.stage;
        console.log("Laya引擎启动成功");
    };
    GameConfig.start_egret = function () {
        global['Main'] = egret.DisplayObjectContainer;
        egret.runEgret({
            renderMode: 'webgl',
            scaleMode: egret.StageScaleMode.FIXED_WIDTH,
            frameRate: 60,
            contentWidth: this.width,
            contentHeight: this.height,
            orientation: "portrait",
            maxTouches: 10,
        });
        if (egret_stages && egret_stages.length) {
            this.backend_stage = egret_stages[0];
            console.log("Egret 引擎启动成功");
        }
        else {
            console.error("Egret 引擎启动失败");
        }
    };
    GameConfig.project = "laya-start-kit";
    GameConfig.appid = '9d92fffa-1176-4d37-8c73-5f6280f233a6';
    GameConfig.appkey = 'b9b84e6a-3104-469c-971d-641a5dcdf973';
    GameConfig.version = "1.0.6";
    GameConfig.server = 'https://api.geequlim.com/api/';
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scale_mode = "fixedwidth";
    GameConfig.screen_mode = "vertical";
    GameConfig.canvas_color = "#232323";
    GameConfig.retinal_mode = true;
    GameConfig.platform = 'web';
    GameConfig.debug = true;
    GameConfig.stat = true;
    GameConfig.inspector = false;
    GameConfig.physics_debug = false;
    GameConfig.backend_stage = null;
    GameConfig.base_resource_url = "";
    GameConfig.res_version = "";
    GameConfig.adVersion = "1.0.16";
    return GameConfig;
}());
/* harmony default export */ __webpack_exports__["default"] = (GameConfig);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var view_splash_SplashScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! view/splash/SplashScene */ "./src/view/splash/SplashScene.ts");
/* harmony import */ var view_main_MainScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! view/main/MainScene */ "./src/view/main/MainScene.ts");
/* harmony import */ var xengine_XEngine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xengine/XEngine */ "./src/xengine/XEngine.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var xengine_storage_XStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! xengine/storage/XStorage */ "./src/xengine/storage/XStorage.ts");
/* harmony import */ var modules_common_DailyTask__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! modules/common/DailyTask */ "./src/modules/common/DailyTask.ts");
/* harmony import */ var xengine_events_Handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! xengine/events/Handler */ "./src/xengine/events/Handler.ts");
/* harmony import */ var modules_audio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! modules/audio */ "./src/modules/audio.ts");
/* harmony import */ var modules_platform_wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! modules/platform/wechat/WechatPlatform */ "./src/modules/platform/wechat/WechatPlatform.ts");
/* harmony import */ var modules_platform_platform__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! modules/platform/platform */ "./src/modules/platform/platform.ts");
/* harmony import */ var modules_platform_qq_QQPlatform__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! modules/platform/qq/QQPlatform */ "./src/modules/platform/qq/QQPlatform.ts");
/* harmony import */ var modules_platform_baidu_BaiduPlatform__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! modules/platform/baidu/BaiduPlatform */ "./src/modules/platform/baidu/BaiduPlatform.ts");
/* harmony import */ var modules_platform_oppo_OppoPlatform__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! modules/platform/oppo/OppoPlatform */ "./src/modules/platform/oppo/OppoPlatform.ts");
/* harmony import */ var modules_commerce_CommerceModule__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! modules/commerce/CommerceModule */ "./src/modules/commerce/CommerceModule.ts");
/* harmony import */ var modules_platform_bytedance_BytedancePlatform__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! modules/platform/bytedance/BytedancePlatform */ "./src/modules/platform/bytedance/BytedancePlatform.ts");
/* harmony import */ var modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! modules/dataModule/BallModule */ "./src/modules/dataModule/BallModule.ts");
/* harmony import */ var modules_dataModule_GameStaticData__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! modules/dataModule/GameStaticData */ "./src/modules/dataModule/GameStaticData.ts");
/* harmony import */ var view_main_LevelPar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! view/main/LevelPar */ "./src/view/main/LevelPar.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



















var SCENES = {
    Splash: {
        name: 'Splash',
        package: {
            name: 'Splash',
            data_file: 'assets/ui/Splash.bin',
            atlas: 'assets/ui/Splash_atlas0.png',
            comToClass: {},
        },
        scene_class: view_splash_SplashScene__WEBPACK_IMPORTED_MODULE_1__["default"],
    },
    Main: {
        name: 'Main',
        package: {
            name: 'Main',
            data_file: 'assets/ui/Main.bin',
            atlas: 'assets/ui/Main_atlas0.png',
            comToClass: { "levelPar": view_main_LevelPar__WEBPACK_IMPORTED_MODULE_18__["default"] },
        },
        scene_class: view_main_MainScene__WEBPACK_IMPORTED_MODULE_2__["default"],
        load_dependences: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!xengine_XEngine__WEBPACK_IMPORTED_MODULE_3__["default"].inst.fairygui_helper.is_package_loaded('Common')) return [3 /*break*/, 2];
                            return [4 /*yield*/, xengine_XEngine__WEBPACK_IMPORTED_MODULE_3__["default"].inst.fairygui_helper.load_package('Common', 'assets/ui/Common.bin', 'assets/ui/Common_atlas0.png')];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
    }
};
window['SCENES'] = SCENES;
var Engine = /** @class */ (function (_super) {
    __extends(Engine, _super);
    function Engine(stage) {
        var _this = _super.call(this, stage) || this;
        _this.game = null;
        // 注册场景
        _this.scene_manager.register_scene(SCENES.Splash, true, true);
        _this.scene_manager.register_scene(SCENES.Main, true);
        var PlatfomCls = null;
        switch (_config__WEBPACK_IMPORTED_MODULE_0__["default"].platform) {
            case _config__WEBPACK_IMPORTED_MODULE_0__["PlatformValue"].WECHAT:
                PlatfomCls = modules_platform_wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_9__["default"];
                break;
            case _config__WEBPACK_IMPORTED_MODULE_0__["PlatformValue"].QQ:
                Laya.MiniAdpter = Laya.QQMiniAdapter;
                PlatfomCls = modules_platform_qq_QQPlatform__WEBPACK_IMPORTED_MODULE_11__["default"];
                break;
            case _config__WEBPACK_IMPORTED_MODULE_0__["PlatformValue"].BAIDU:
                Laya.MiniAdpter = Laya.BMiniAdapter;
                PlatfomCls = modules_platform_baidu_BaiduPlatform__WEBPACK_IMPORTED_MODULE_12__["default"];
                break;
            case _config__WEBPACK_IMPORTED_MODULE_0__["PlatformValue"].OPPO:
                Laya.MiniAdpter = Laya.QGMiniAdapter;
                PlatfomCls = modules_platform_oppo_OppoPlatform__WEBPACK_IMPORTED_MODULE_13__["default"];
                break;
            case _config__WEBPACK_IMPORTED_MODULE_0__["PlatformValue"].BYTEDANCE:
                PlatfomCls = modules_platform_bytedance_BytedancePlatform__WEBPACK_IMPORTED_MODULE_15__["default"];
                break;
            case _config__WEBPACK_IMPORTED_MODULE_0__["PlatformValue"].WEB:
            default:
                PlatfomCls = modules_platform_platform__WEBPACK_IMPORTED_MODULE_10__["default"];
                break;
        }
        // 启动游戏逻辑
        _this.game = new xengine_game_Game__WEBPACK_IMPORTED_MODULE_4__["default"]({
            modules: [
                PlatfomCls,
                modules_common_DailyTask__WEBPACK_IMPORTED_MODULE_6__["default"],
                modules_audio__WEBPACK_IMPORTED_MODULE_8__["AudioModule"],
                modules_commerce_CommerceModule__WEBPACK_IMPORTED_MODULE_14__["default"],
                modules_dataModule_GameStaticData__WEBPACK_IMPORTED_MODULE_17__["default"],
                modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_16__["default"]
            ],
            storage: new xengine_storage_XStorage__WEBPACK_IMPORTED_MODULE_5__["default"](),
            options: {},
        });
        return _this;
    }
    Engine.prototype.start = function () {
        var _this = this;
        _super.prototype.start.call(this);
        this.game.once(xengine_game_Game__WEBPACK_IMPORTED_MODULE_4__["Events"].LOGIC_STARTED, null, function () {
            // 自动存档
            _this.game.timer.loop(60, _this.game.query_save.bind(_this.game));
        });
    };
    Engine.prototype.main_loop = function () {
        var dt = _super.prototype.main_loop.call(this);
        this.game.update(dt);
        return dt;
    };
    return Engine;
}(xengine_XEngine__WEBPACK_IMPORTED_MODULE_3__["default"]));
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var engine;
        return __generator(this, function (_a) {
            _config__WEBPACK_IMPORTED_MODULE_0__["default"].init();
            engine = new Engine(_config__WEBPACK_IMPORTED_MODULE_0__["default"].backend_stage);
            engine.start();
            engine.game.get_module(modules_common_DailyTask__WEBPACK_IMPORTED_MODULE_6__["default"]).add_daily_task(xengine_events_Handler__WEBPACK_IMPORTED_MODULE_7__["Handler"].create(null, function () {
                console.log("Daily task");
                Laya.Loader.MESH;
            }));
            return [2 /*return*/];
        });
    });
}
;
main();


/***/ }),

/***/ "./src/modules/audio.ts":
/*!******************************!*\
  !*** ./src/modules/audio.ts ***!
  \******************************/
/*! exports provided: AudioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioModule", function() { return AudioModule; });
/* harmony import */ var xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/game/Module */ "./src/xengine/game/Module.ts");
/* harmony import */ var xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/XEngine */ "./src/xengine/XEngine.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var DEFAULT_BGM_NAME = "背景音乐";
var AudioModule = /** @class */ (function (_super) {
    __extends(AudioModule, _super);
    function AudioModule() {
        var _this = _super.call(this) || this;
        _this._sound_enabled = true;
        _this.vibrate_enabled = true;
        _this.frame_audio_count = 0;
        _this.frame_vibrate_count = 0;
        _this.loaded = false;
        _this.audio_cache = new Map();
        _this.audio_urls = new Map();
        _this.sound_index = {};
        window['audio'] = _this;
        _this.preload();
        return _this;
    }
    Object.defineProperty(AudioModule.prototype, "sound_enabled", {
        get: function () { return this._sound_enabled; },
        set: function (v) {
            this._sound_enabled = v;
            if (v) {
                this.play_background_music(DEFAULT_BGM_NAME);
            }
            else {
                this.stop_background_music();
            }
        },
        enumerable: true,
        configurable: true
    });
    AudioModule.prototype.preload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, _b, _i, key, file, sound;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__["default"].inst.res.load('assets/sounds/index.json')];
                    case 1:
                        res = _c.sent();
                        if (!res.native_data) return [3 /*break*/, 5];
                        this.loaded = true;
                        this.sound_index = res.native_data;
                        _a = [];
                        for (_b in res.native_data)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        file = res.native_data[key];
                        if (!file) return [3 /*break*/, 4];
                        this.audio_urls.set(key, "assets/sounds/" + file);
                        return [4 /*yield*/, xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__["default"].inst.res.load("assets/sounds/" + file)];
                    case 3:
                        sound = _c.sent();
                        this.audio_cache.set(key, sound.native_data);
                        if (key === DEFAULT_BGM_NAME) {
                            this.play_background_music(key);
                        }
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AudioModule.prototype.is_ready = function () {
        return this.loaded;
    };
    AudioModule.prototype.play_effect = function (id) {
        var ret = undefined;
        var sound = this.audio_cache.get(id);
        if (sound) {
            if (this.frame_audio_count)
                return;
            if (this.sound_enabled) {
                if (typeof sound === 'string') {
                    ret = Laya.SoundManager.playSound(sound, 1);
                }
                else if (sound && sound.url) {
                    ret = Laya.SoundManager.playSound(sound.url, 1);
                }
            }
        }
        else if (this.audio_urls.get(id)) {
            ret = Laya.SoundManager.playSound(this.audio_urls.get(id), 1);
            console.error("不存在音效", id);
        }
        this.frame_audio_count += 1;
        return ret;
    };
    AudioModule.prototype.vibrate = function () {
        if (this.vibrate_enabled) {
            if (this.frame_vibrate_count)
                return;
            if (typeof wx !== 'undefined') {
                wx.vibrateShort({});
            }
            else if (typeof qg !== 'undefined') {
                qg.vibrateShort({});
            }
        }
        this.frame_vibrate_count += 1;
    };
    AudioModule.prototype.save = function () {
        return {
            sound_enabled: this.sound_enabled,
            vibrate_enabled: this.vibrate_enabled,
        };
    };
    AudioModule.prototype.load = function (data) {
        this.sound_enabled = data.sound_enabled;
        this.vibrate_enabled = data.vibrate_enabled;
    };
    AudioModule.prototype.always_update = function (dt) {
        this.frame_audio_count = 0;
        this.frame_vibrate_count = 0;
    };
    AudioModule.prototype.play_background_music = function (name) {
        if (this.sound_enabled) {
            Laya.SoundManager.stopMusic();
            var sound = this.audio_cache.get(name);
            if (sound && sound.url) {
                Laya.SoundManager.playMusic(sound.url, 0);
            }
            else {
                Laya.SoundManager.playMusic(this.audio_urls.get(name), 0);
            }
        }
    };
    AudioModule.prototype.stop_background_music = function () {
        Laya.SoundManager.stopMusic();
    };
    AudioModule = __decorate([
        Object(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["game_module"])('audio')
    ], AudioModule);
    return AudioModule;
}(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./src/modules/commerce/ADManager.ts":
/*!*******************************************!*\
  !*** ./src/modules/commerce/ADManager.ts ***!
  \*******************************************/
/*! exports provided: ADUnit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADUnit", function() { return ADUnit; });
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/** 抽象广告单元 */
var ADUnit = /** @class */ (function (_super) {
    __extends(ADUnit, _super);
    function ADUnit(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    /** 创建广告 */
    ADUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /** 销毁广告 */
    ADUnit.prototype.destrory = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    ;
    /** 展示广告 */
    ADUnit.prototype.show = function (pos) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    ;
    /** 隐藏广告 */
    ADUnit.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    ;
    return ADUnit;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));

var ADManager = /** @class */ (function (_super) {
    __extends(ADManager, _super);
    function ADManager() {
        return _super.call(this) || this;
    }
    ADManager.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /** 展示 Banner 广告  */
    ADManager.prototype.show_banner = function (pos) {
        return new Promise(function (resolve, reject) { resolve(); });
    };
    /** 隐藏 Banner 广告 */
    ADManager.prototype.hide_banner = function () {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    /** 展示插页广告 */
    ADManager.prototype.show_intersitial = function () {
        return new Promise(function (resolve, reject) { resolve(); });
    };
    /** 展示激励视频广告 */
    ADManager.prototype.show_reward_video = function () {
        return new Promise(function (resolve, reject) { resolve(); });
    };
    return ADManager;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (ADManager);


/***/ }),

/***/ "./src/modules/commerce/APIProvider.ts":
/*!*********************************************!*\
  !*** ./src/modules/commerce/APIProvider.ts ***!
  \*********************************************/
/*! exports provided: default, provider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "provider", function() { return provider; });
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var xengine_utils_xhttp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/utils/xhttp */ "./src/xengine/utils/xhttp.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};



var APIProvider = /** @class */ (function (_super) {
    __extends(APIProvider, _super);
    function APIProvider(gameid) {
        var _this = _super.call(this) || this;
        _this.user_info = null;
        _this.float_ads = [];
        _this.share_info = null;
        _this.gameid = gameid;
        return _this;
    }
    APIProvider.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    APIProvider.prototype.login = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    APIProvider.prototype.get_user_info = function () {
        return this.user_info;
    };
    /** 执行网络请求 */
    APIProvider.prototype.request = function (method, api, body) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, _a, query;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = api.startsWith("http://") || api.startsWith("https://") ? api : this.base_url + api;
                        response = undefined;
                        _a = method;
                        switch (_a) {
                            case 'post': return [3 /*break*/, 1];
                            case 'get': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, xengine_utils_xhttp__WEBPACK_IMPORTED_MODULE_2__["default"].post(url, body)];
                    case 2:
                        response = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        query = query_string__WEBPACK_IMPORTED_MODULE_1__["stringify"](body);
                        url += query ? "?" + query : '';
                        return [4 /*yield*/, xengine_utils_xhttp__WEBPACK_IMPORTED_MODULE_2__["default"].get(url)];
                    case 4:
                        response = _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, this.parse_request_response(method, api, url, response)];
                }
            });
        });
    };
    /** 解析请求的相应结果 */
    APIProvider.prototype.parse_request_response = function (method, api, url, response) {
        return response;
    };
    /** 广告配置列表 */
    APIProvider.prototype.get_float_ads = function (flg, id) {
        var e_1, _a;
        var arr = [];
        try {
            for (var _b = __values(this.float_ads), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (item.location_flg == flg && item.location_id == id) {
                    arr.push(item);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return arr;
    };
    /** 点击广告回调 */
    APIProvider.prototype.click_float_ad_item = function (item) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /** 分享回调 */
    APIProvider.prototype.share_callback = function (data) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return APIProvider;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (APIProvider);
/** 定义对话框 */
function provider(uid) {
    return function (target) {
        target.prototype.uid = uid;
    };
}


/***/ }),

/***/ "./src/modules/commerce/CommerceModule.ts":
/*!************************************************!*\
  !*** ./src/modules/commerce/CommerceModule.ts ***!
  \************************************************/
/*! exports provided: Events, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony import */ var xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/game/Module */ "./src/xengine/game/Module.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! config */ "./src/config.ts");
/* harmony import */ var _payment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./payment */ "./src/modules/commerce/payment.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var modules_platform_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! modules/platform/platform */ "./src/modules/platform/platform.ts");
/* harmony import */ var _chongqing_ChongQingProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chongqing/ChongQingProvider */ "./src/modules/commerce/chongqing/ChongQingProvider.ts");
/* harmony import */ var _yunqu_Yunqu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./yunqu/Yunqu */ "./src/modules/commerce/yunqu/Yunqu.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var Events;
(function (Events) {
    Events["PAY_DONE"] = "PAY_DONE";
})(Events || (Events = {}));
var CommerceModule = /** @class */ (function (_super) {
    __extends(CommerceModule, _super);
    function CommerceModule() {
        var _this = _super.call(this) || this;
        _this.providers = {};
        _this.gameid = "";
        _this.gameid = config__WEBPACK_IMPORTED_MODULE_1__["default"].appid;
        var pay_types = {};
        switch (config__WEBPACK_IMPORTED_MODULE_1__["default"].platform) {
            case config__WEBPACK_IMPORTED_MODULE_1__["PlatformValue"].QQ:
                pay_types[_payment__WEBPACK_IMPORTED_MODULE_2__["PayPoint"].DOUBLE_REWARD] = _payment__WEBPACK_IMPORTED_MODULE_2__["PayType"].REWARD_VIDEO;
                pay_types[_payment__WEBPACK_IMPORTED_MODULE_2__["PayPoint"].RELIVE] = _payment__WEBPACK_IMPORTED_MODULE_2__["PayType"].REWARD_VIDEO;
                pay_types[_payment__WEBPACK_IMPORTED_MODULE_2__["PayPoint"].TRY_BOOST_MODE] = _payment__WEBPACK_IMPORTED_MODULE_2__["PayType"].REWARD_VIDEO;
                break;
            case config__WEBPACK_IMPORTED_MODULE_1__["PlatformValue"].WECHAT:
            default:
                _this.register_provider(_yunqu_Yunqu__WEBPACK_IMPORTED_MODULE_6__["default"]);
                pay_types[_payment__WEBPACK_IMPORTED_MODULE_2__["PayPoint"].DOUBLE_REWARD] = _payment__WEBPACK_IMPORTED_MODULE_2__["PayType"].REWARD_VIDEO;
                pay_types[_payment__WEBPACK_IMPORTED_MODULE_2__["PayPoint"].RELIVE] = _payment__WEBPACK_IMPORTED_MODULE_2__["PayType"].REWARD_VIDEO;
                pay_types[_payment__WEBPACK_IMPORTED_MODULE_2__["PayPoint"].TRY_BOOST_MODE] = _payment__WEBPACK_IMPORTED_MODULE_2__["PayType"].REWARD_VIDEO;
                break;
        }
        Object(_payment__WEBPACK_IMPORTED_MODULE_2__["load_pay_types"])(pay_types);
        _this.register_provider(_chongqing_ChongQingProvider__WEBPACK_IMPORTED_MODULE_5__["default"]);
        return _this;
    }
    CommerceModule.prototype.initialize = function () {
        for (var key in this.providers) {
            this.providers[key].initialize();
        }
    };
    Object.defineProperty(CommerceModule.prototype, "provider", {
        /** 默认 APIProvider */
        get: function () {
            switch (config__WEBPACK_IMPORTED_MODULE_1__["default"].platform) {
                case config__WEBPACK_IMPORTED_MODULE_1__["PlatformValue"].QQ:
                    break;
                case config__WEBPACK_IMPORTED_MODULE_1__["PlatformValue"].WECHAT:
                default:
                    return this.get_provider(_yunqu_Yunqu__WEBPACK_IMPORTED_MODULE_6__["default"]);
                    break;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    CommerceModule.prototype.get_provider = function (provider) {
        return this.providers[provider.prototype.uid];
    };
    CommerceModule.prototype.register_provider = function (cls) {
        this.providers[cls.prototype.uid] = new cls(this.gameid);
    };
    /** 计费 */
    CommerceModule.prototype.pay = function (point) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.send_event("pay", { point: point });
                        return [4 /*yield*/, this.pay_with_type(Object(_payment__WEBPACK_IMPORTED_MODULE_2__["get_pay_type"])(point))];
                    case 1:
                        _a.sent();
                        this.send_event("pay_done", { point: point });
                        this.event(Events.PAY_DONE, [point, Object(_payment__WEBPACK_IMPORTED_MODULE_2__["get_pay_type"])(point)]);
                        return [2 /*return*/];
                }
            });
        });
    };
    CommerceModule.prototype.pay_with_type = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = type;
                        switch (_a) {
                            case _payment__WEBPACK_IMPORTED_MODULE_2__["PayType"].REWARD_VIDEO: return [3 /*break*/, 1];
                            case _payment__WEBPACK_IMPORTED_MODULE_2__["PayType"].SHARE: return [3 /*break*/, 3];
                            case _payment__WEBPACK_IMPORTED_MODULE_2__["PayType"].FREE: return [3 /*break*/, 5];
                            case _payment__WEBPACK_IMPORTED_MODULE_2__["PayType"].PURCHURS: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, (xengine_game_Game__WEBPACK_IMPORTED_MODULE_3__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_4__["default"]).play_reward_video())];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, (xengine_game_Game__WEBPACK_IMPORTED_MODULE_3__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_4__["default"]).share())];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5: return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CommerceModule.prototype.send_event = function (event, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof wx != 'undefined' && typeof wx['aldSendEvent']) {
                    if (typeof params === 'object') {
                        wx['aldSendEvent'](event, __assign({}, params));
                    }
                    else {
                        wx['aldSendEvent'](event, params + '');
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    CommerceModule = __decorate([
        Object(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["game_module"])('commerce')
    ], CommerceModule);
    return CommerceModule;
}(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (CommerceModule);


/***/ }),

/***/ "./src/modules/commerce/chongqing/ChongQingProvider.ts":
/*!*************************************************************!*\
  !*** ./src/modules/commerce/chongqing/ChongQingProvider.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APIProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../APIProvider */ "./src/modules/commerce/APIProvider.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var modules_platform_wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! modules/platform/wechat/WechatPlatform */ "./src/modules/platform/wechat/WechatPlatform.ts");
/* harmony import */ var modules_platform_platform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! modules/platform/platform */ "./src/modules/platform/platform.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! config */ "./src/config.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ChongQingProvider = /** @class */ (function (_super) {
    __extends(ChongQingProvider, _super);
    function ChongQingProvider(gameid) {
        var _this = _super.call(this, gameid) || this;
        _this.base_url = "https://games.api.gugudang.com/";
        _this.appid = "";
        _this.openid = '';
        _this.appkey = '';
        _this.channel = "own";
        _this.appid = gameid;
        _this.appkey = config__WEBPACK_IMPORTED_MODULE_4__["default"].appkey;
        return _this;
    }
    ChongQingProvider.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, p, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("get", "api/shares")];
                    case 1:
                        data = _a.sent();
                        this.share_info = {
                            title: data.title,
                            message: data.title,
                            image_url: data.picurl,
                            url: data.picurl,
                            data: data
                        };
                        p = xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_3__["default"]);
                        if (p instanceof modules_platform_wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                            p.set_share_config(this.share_info);
                            console.log("重庆API:", "拉取到分享配置", this.share_info);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_3__["default"]).login()];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, this.login(user.uuid)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.error("重庆API:", '登陆失败', error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ChongQingProvider.prototype.login = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("get", "api/login", { code: token, channel: 'own' })];
                    case 1:
                        ret = _a.sent();
                        if (ret.code == 1) {
                            console.log("重庆API:", "登陆成功", ret);
                            this.openid = ret.openid;
                            p = xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_3__["default"]);
                            if (p instanceof modules_platform_wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                                p.set_user_openid(this.openid);
                            }
                        }
                        else {
                            console.error("重庆API:", "登陆失败", ret);
                        }
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    ChongQingProvider.prototype.request = function (method, api, body) {
        return __awaiter(this, void 0, void 0, function () {
            var new_body;
            return __generator(this, function (_a) {
                new_body = { appid: this.appkey };
                if (typeof (body) === 'object') {
                    new_body = __assign(__assign({}, new_body), body);
                }
                if (this.openid) {
                    new_body = __assign(__assign({}, new_body), { openid: this.openid });
                }
                return [2 /*return*/, _super.prototype.request.call(this, method, api, new_body)];
            });
        });
    };
    /** 解析请求的相应结果 */
    ChongQingProvider.prototype.parse_request_response = function (method, api, url, response) {
        if (response.data) {
            return response.data;
        }
        return response;
    };
    ChongQingProvider = __decorate([
        Object(_APIProvider__WEBPACK_IMPORTED_MODULE_0__["provider"])("chongqing")
    ], ChongQingProvider);
    return ChongQingProvider;
}(_APIProvider__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ChongQingProvider);


/***/ }),

/***/ "./src/modules/commerce/payment.ts":
/*!*****************************************!*\
  !*** ./src/modules/commerce/payment.ts ***!
  \*****************************************/
/*! exports provided: PayType, PayPoint, get_pay_type, load_pay_types */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayType", function() { return PayType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayPoint", function() { return PayPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_pay_type", function() { return get_pay_type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load_pay_types", function() { return load_pay_types; });
/** 支付方式 */
var PayType;
(function (PayType) {
    /** 游戏币 */
    PayType[PayType["FREE"] = 0] = "FREE";
    /** 分享 */
    PayType[PayType["SHARE"] = 1] = "SHARE";
    /** 激励视频 */
    PayType[PayType["REWARD_VIDEO"] = 2] = "REWARD_VIDEO";
    /** 充值计费 */
    PayType[PayType["PURCHURS"] = 3] = "PURCHURS";
})(PayType || (PayType = {}));
;
var PayPoint;
(function (PayPoint) {
    PayPoint["RELIVE"] = "RELIVE";
    PayPoint["DOUBLE_REWARD"] = "DOUBLE_REWARD";
    PayPoint["TRY_BOOST_MODE"] = "TRY_BOOST_MODE";
    PayPoint["ADD_CUSTOMER"] = "ADD_CUSTOMER";
})(PayPoint || (PayPoint = {}));
var pay_types = {};
/** 获取计费方式 */
function get_pay_type(point) {
    return pay_types[point] || PayType.FREE;
}
/** 设置计费方式 */
function load_pay_types(configs) {
    for (var key in configs) {
        pay_types[key] = configs[key];
    }
}


/***/ }),

/***/ "./src/modules/commerce/yunqu/Yunqu.ts":
/*!*********************************************!*\
  !*** ./src/modules/commerce/yunqu/Yunqu.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APIProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../APIProvider */ "./src/modules/commerce/APIProvider.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var modules_platform_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! modules/platform/platform */ "./src/modules/platform/platform.ts");
/* harmony import */ var modules_platform_wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! modules/platform/wechat/WechatPlatform */ "./src/modules/platform/wechat/WechatPlatform.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! config */ "./src/config.ts");
/* harmony import */ var _payment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../payment */ "./src/modules/commerce/payment.ts");
/* harmony import */ var _hmac_sha256__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hmac-sha256 */ "./src/modules/commerce/yunqu/hmac-sha256.js");
/* harmony import */ var _md5__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./md5 */ "./src/modules/commerce/yunqu/md5.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};








var YunquProvider = /** @class */ (function (_super) {
    __extends(YunquProvider, _super);
    function YunquProvider(id) {
        var _this = _super.call(this, 'qgdzz') || this;
        _this.base_url = "https://api.yz061.com/";
        _this.channel = "own";
        _this.from_appid = "";
        _this.openid = '';
        _this.floadAds = [];
        _this.yunquConfigs = [];
        _this.shareSeed = null;
        _this.floatAdsSeed = [];
        _this.exposure = new Map();
        return _this;
    }
    YunquProvider.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, _a, _b, _c, cfg, user, uid, _d, _e, item, ads, ads_1, ads_1_1, itm, e_1_1, share_arr, cfg, p;
            var e_2, _f, e_1, _g, e_3, _h;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (config__WEBPACK_IMPORTED_MODULE_4__["PlatformValue"].WECHAT == config__WEBPACK_IMPORTED_MODULE_4__["default"].platform) {
                            this.channel = 'own';
                            options = xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_2__["default"]).get_launch_option();
                            if (options.query && options.query.channel) {
                                this.channel = options.query.channel;
                            }
                            if (options.referrerInfo && options.referrerInfo.appId) {
                                this.from_appid = options.referrerInfo.appId;
                            }
                        }
                        console.log("云趣API", "开始初始化");
                        _a = this;
                        return [4 /*yield*/, this.get_app_config()];
                    case 1:
                        _a.yunquConfigs = _j.sent();
                        if (this.yunquConfigs && this.yunquConfigs.length) {
                            try {
                                for (_b = __values(this.yunquConfigs), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    cfg = _c.value;
                                    if (cfg.matter_type == 1) {
                                        this.floatAdsSeed.push(cfg);
                                    }
                                    else if (cfg.matter_type == 2) {
                                        this.shareSeed = cfg;
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_f = _b.return)) _f.call(_b);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        console.log("云趣API", "拉取云趣配置成功", this.yunquConfigs);
                        return [4 /*yield*/, xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_2__["default"]).login()];
                    case 2:
                        user = _j.sent();
                        console.log("云趣API", "平台登录成功", user);
                        return [4 /*yield*/, this.login(user.uuid)];
                    case 3:
                        _j.sent();
                        return [4 /*yield*/, xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_2__["default"]).get_user_info()];
                    case 4:
                        user = _j.sent();
                        console.log("云趣API", "用户登录成功", user);
                        uid = this.openid ? this.openid : 'undefined';
                        if (!this.floatAdsSeed.length) return [3 /*break*/, 13];
                        _j.label = 5;
                    case 5:
                        _j.trys.push([5, 10, 11, 12]);
                        _d = __values(this.floatAdsSeed), _e = _d.next();
                        _j.label = 6;
                    case 6:
                        if (!!_e.done) return [3 /*break*/, 9];
                        item = _e.value;
                        return [4 /*yield*/, _super.prototype.request.call(this, 'get', item.url + ("&uid=" + uid))];
                    case 7:
                        ads = _j.sent();
                        try {
                            for (ads_1 = (e_3 = void 0, __values(ads)), ads_1_1 = ads_1.next(); !ads_1_1.done; ads_1_1 = ads_1.next()) {
                                itm = ads_1_1.value;
                                this.float_ads.push({
                                    id: itm.ad_appid,
                                    title: itm.ad_name,
                                    icon: itm.ad_img,
                                    url: itm.ad_path,
                                    data: itm,
                                    location_id: item.location_id,
                                    location_flg: item.location_flg,
                                });
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (ads_1_1 && !ads_1_1.done && (_h = ads_1.return)) _h.call(ads_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        _j.label = 8;
                    case 8:
                        _e = _d.next();
                        return [3 /*break*/, 6];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (_e && !_e.done && (_g = _d.return)) _g.call(_d);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 12:
                        console.log("云趣API", "拉取广告配置完成", this.float_ads);
                        if (typeof wx != 'undefined') {
                            wx['onHide'](this.report_ad_exposure.bind(this));
                        }
                        _j.label = 13;
                    case 13:
                        if (!this.shareSeed) return [3 /*break*/, 15];
                        return [4 /*yield*/, _super.prototype.request.call(this, 'get', this.shareSeed.url + ("&uid=" + uid))];
                    case 14:
                        share_arr = _j.sent();
                        if (share_arr && share_arr.length) {
                            cfg = share_arr[0];
                            this.share_info = {
                                title: cfg.share_title,
                                message: cfg.share_title,
                                url: cfg.share_path,
                                image_url: cfg.share_img,
                                data: cfg
                            };
                            p = xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_2__["default"]);
                            if (p instanceof modules_platform_wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                                p.set_share_config(this.share_info);
                            }
                        }
                        console.log("云趣API", "拉取分享配置完成", this.share_info);
                        _j.label = 15;
                    case 15:
                        xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.modules['commerce'].on("PAY_DONE", null, function (point, type) {
                            console.log("云趣API", "上报计费事件");
                            _this.report_pay_action(type);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    YunquProvider.prototype.login = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_2__["default"]).get_user_info()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.request('get', 'auth', { code: token })];
                    case 2:
                        data = _a.sent();
                        this.openid = data.openid || "undefined";
                        if (this.openid) {
                            user.uuid = this.openid;
                        }
                        return [4 /*yield*/, this.request('get', 'daily', { uid: data.openid })];
                    case 3:
                        _a.sent();
                        this.user_info = user;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    YunquProvider.prototype.request = function (method, api, body, add_sign) {
        if (add_sign === void 0) { add_sign = false; }
        return __awaiter(this, void 0, void 0, function () {
            var new_body, sign, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        new_body = { flg: this.gameid, channel: this.channel, appid: this.from_appid };
                        if (typeof (body) === 'object') {
                            new_body = __assign(__assign({}, new_body), body);
                            new_body['uid'] = this.openid;
                        }
                        if (add_sign) {
                            sign = this.generate_sign(new_body);
                            api += '?sign=' + sign;
                        }
                        return [4 /*yield*/, _super.prototype.request.call(this, method, api, new_body)];
                    case 1:
                        ret = _a.sent();
                        console.log("云趣API", "请求日志", api, new_body, ret);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    YunquProvider.prototype.get_app_config = function () {
        return this.request('get', "game/" + this.gameid);
    };
    /** 解析请求的相应结果 */
    YunquProvider.prototype.parse_request_response = function (method, api, url, response) {
        if (response.result) {
            return response.result;
        }
        return response;
    };
    YunquProvider.prototype.click_float_ad_item = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var status, platform, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        platform = xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(modules_platform_platform__WEBPACK_IMPORTED_MODULE_2__["default"]);
                        return [4 /*yield*/, platform.navigate_to_app(item.id, item.url)];
                    case 2:
                        _a.sent();
                        status = 'cb';
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.warn("跳转到APP失败", error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.request("post", "reportad", { status: status, gflg: this.gameid, ad_id: item.data.ad_id, location_id: item.location_id, channel: this.channel });
                        console.log("云趣API", "上报广告点击事件完成");
                        if (!status) {
                            throw "跳转失败";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    YunquProvider.prototype.report_ad_exposure = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, _b, d, _c, _d, dd;
            var e_4, _e, e_5, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!this.exposure.size)
                            return [2 /*return*/];
                        data = [];
                        try {
                            for (_a = __values(this.exposure.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                d = _b.value;
                                try {
                                    for (_c = (e_5 = void 0, __values(d.values())), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        dd = _d.value;
                                        data.push(dd);
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        return [4 /*yield*/, this.request("post", "exposure", {
                                data: data,
                                gflg: this.gameid,
                                channel: this.channel,
                            })];
                    case 1:
                        _g.sent();
                        this.exposure.clear();
                        console.log("云趣API", "上报广告曝光完成");
                        return [2 /*return*/];
                }
            });
        });
    };
    YunquProvider.prototype.count_exposure = function (ads) {
        var e_6, _a;
        try {
            for (var ads_2 = __values(ads), ads_2_1 = ads_2.next(); !ads_2_1.done; ads_2_1 = ads_2.next()) {
                var ad = ads_2_1.value;
                var location_1 = this.exposure.get(ad.location_id) || new Map();
                var cfg = location_1.get(ad.ad_id) || { ad_id: ad.ad_id, location_id: ad.location_id, num: 0 };
                cfg.num += 1;
                location_1.set(ad.ad_id, cfg);
                this.exposure.set(ad.location_id, location_1);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (ads_2_1 && !ads_2_1.done && (_a = ads_2.return)) _a.call(ads_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    /** 上报计费点 */
    YunquProvider.prototype.report_pay_action = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var loc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loc = '';
                        if (type == _payment__WEBPACK_IMPORTED_MODULE_5__["PayType"].SHARE) {
                            loc = 'share';
                        }
                        else if (type == _payment__WEBPACK_IMPORTED_MODULE_5__["PayType"].REWARD_VIDEO) {
                            loc = 'video';
                        }
                        if (!loc) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.request('post', 'stat', { loc: loc }, true)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    YunquProvider.prototype.generate_sign = function (body) {
        var e_7, _a;
        var keyList = Object.keys(body).sort();
        var paramList = [];
        try {
            for (var keyList_1 = __values(keyList), keyList_1_1 = keyList_1.next(); !keyList_1_1.done; keyList_1_1 = keyList_1.next()) {
                var key = keyList_1_1.value;
                paramList.push(key + "=" + body[key]);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (keyList_1_1 && !keyList_1_1.done && (_a = keyList_1.return)) _a.call(keyList_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        var signStr = paramList.join("&");
        return _hmac_sha256__WEBPACK_IMPORTED_MODULE_6__["default"].HmacSHA256(signStr, _md5__WEBPACK_IMPORTED_MODULE_7__["default"].hex_md5(this.openid + this.gameid)).toString();
    };
    YunquProvider = __decorate([
        Object(_APIProvider__WEBPACK_IMPORTED_MODULE_0__["provider"])("yunqu")
    ], YunquProvider);
    return YunquProvider;
}(_APIProvider__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (YunquProvider);


/***/ }),

/***/ "./src/modules/commerce/yunqu/hmac-sha256.js":
/*!***************************************************!*\
  !*** ./src/modules/commerce/yunqu/hmac-sha256.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function (h, s) {
    var f = {},
        g = f.lib = {},
        q = function () {},
        m = g.Base = {
            extend: function (a) {
                q.prototype = this;
                var c = new q;
                a && c.mixIn(a);
                c.hasOwnProperty("init") || (c.init = function () {
                    c.$super.init.apply(this, arguments)
                });
                c.init.prototype = c;
                c.$super = this;
                return c
            },
            create: function () {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            },
            init: function () {},
            mixIn: function (a) {
                for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function () {
                return this.init.prototype.extend(this)
            }
        },
        r = g.WordArray = m.extend({
            init: function (a, c) {
                a = this.words = a || [];
                this.sigBytes = c != s ? c : 4 * a.length
            },
            toString: function (a) {
                return (a || k).stringify(this)
            },
            concat: function (a) {
                var c = this.words,
                    d = a.words,
                    b = this.sigBytes;
                a = a.sigBytes;
                this.clamp();
                if (b % 4)
                    for (var e = 0; e < a; e++) c[b + e >>> 2] |= (d[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((b + e) % 4);
                else if (65535 < d.length)
                    for (e = 0; e < a; e += 4) c[b + e >>> 2] = d[e >>> 2];
                else c.push.apply(c, d);
                this.sigBytes += a;
                return this
            },
            clamp: function () {
                var a = this.words,
                    c = this.sigBytes;
                a[c >>> 2] &= 4294967295 <<
                    32 - 8 * (c % 4);
                a.length = h.ceil(c / 4)
            },
            clone: function () {
                var a = m.clone.call(this);
                a.words = this.words.slice(0);
                return a
            },
            random: function (a) {
                for (var c = [], d = 0; d < a; d += 4) c.push(4294967296 * h.random() | 0);
                return new r.init(c, a)
            }
        }),
        l = f.enc = {},
        k = l.Hex = {
            stringify: function (a) {
                var c = a.words;
                a = a.sigBytes;
                for (var d = [], b = 0; b < a; b++) {
                    var e = c[b >>> 2] >>> 24 - 8 * (b % 4) & 255;
                    d.push((e >>> 4).toString(16));
                    d.push((e & 15).toString(16))
                }
                return d.join("")
            },
            parse: function (a) {
                for (var c = a.length, d = [], b = 0; b < c; b += 2) d[b >>> 3] |= parseInt(a.substr(b,
                    2), 16) << 24 - 4 * (b % 8);
                return new r.init(d, c / 2)
            }
        },
        n = l.Latin1 = {
            stringify: function (a) {
                var c = a.words;
                a = a.sigBytes;
                for (var d = [], b = 0; b < a; b++) d.push(String.fromCharCode(c[b >>> 2] >>> 24 - 8 * (b % 4) & 255));
                return d.join("")
            },
            parse: function (a) {
                for (var c = a.length, d = [], b = 0; b < c; b++) d[b >>> 2] |= (a.charCodeAt(b) & 255) << 24 - 8 * (b % 4);
                return new r.init(d, c)
            }
        },
        j = l.Utf8 = {
            stringify: function (a) {
                try {
                    return decodeURIComponent(escape(n.stringify(a)))
                } catch (c) {
                    throw Error("Malformed UTF-8 data");
                }
            },
            parse: function (a) {
                return n.parse(unescape(encodeURIComponent(a)))
            }
        },
        u = g.BufferedBlockAlgorithm = m.extend({
            reset: function () {
                this._data = new r.init;
                this._nDataBytes = 0
            },
            _append: function (a) {
                "string" == typeof a && (a = j.parse(a));
                this._data.concat(a);
                this._nDataBytes += a.sigBytes
            },
            _process: function (a) {
                var c = this._data,
                    d = c.words,
                    b = c.sigBytes,
                    e = this.blockSize,
                    f = b / (4 * e),
                    f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0);
                a = f * e;
                b = h.min(4 * a, b);
                if (a) {
                    for (var g = 0; g < a; g += e) this._doProcessBlock(d, g);
                    g = d.splice(0, a);
                    c.sigBytes -= b
                }
                return new r.init(g, b)
            },
            clone: function () {
                var a = m.clone.call(this);
                a._data = this._data.clone();
                return a
            },
            _minBufferSize: 0
        });
    g.Hasher = u.extend({
        cfg: m.extend(),
        init: function (a) {
            this.cfg = this.cfg.extend(a);
            this.reset()
        },
        reset: function () {
            u.reset.call(this);
            this._doReset()
        },
        update: function (a) {
            this._append(a);
            this._process();
            return this
        },
        finalize: function (a) {
            a && this._append(a);
            return this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function (a) {
            return function (c, d) {
                return (new a.init(d)).finalize(c)
            }
        },
        _createHmacHelper: function (a) {
            return function (c, d) {
                return (new t.HMAC.init(a,
                    d)).finalize(c)
            }
        }
    });
    var t = f.algo = {};
    return f
}(Math);
(function (h) {
    for (var s = CryptoJS, f = s.lib, g = f.WordArray, q = f.Hasher, f = s.algo, m = [], r = [], l = function (a) {
            return 4294967296 * (a - (a | 0)) | 0
        }, k = 2, n = 0; 64 > n;) {
        var j;
        a: {
            j = k;
            for (var u = h.sqrt(j), t = 2; t <= u; t++)
                if (!(j % t)) {
                    j = !1;
                    break a
                } j = !0
        }
        j && (8 > n && (m[n] = l(h.pow(k, 0.5))), r[n] = l(h.pow(k, 1 / 3)), n++);
        k++
    }
    var a = [],
        f = f.SHA256 = q.extend({
            _doReset: function () {
                this._hash = new g.init(m.slice(0))
            },
            _doProcessBlock: function (c, d) {
                for (var b = this._hash.words, e = b[0], f = b[1], g = b[2], j = b[3], h = b[4], m = b[5], n = b[6], q = b[7], p = 0; 64 > p; p++) {
                    if (16 > p) a[p] =
                        c[d + p] | 0;
                    else {
                        var k = a[p - 15],
                            l = a[p - 2];
                        a[p] = ((k << 25 | k >>> 7) ^ (k << 14 | k >>> 18) ^ k >>> 3) + a[p - 7] + ((l << 15 | l >>> 17) ^ (l << 13 | l >>> 19) ^ l >>> 10) + a[p - 16]
                    }
                    k = q + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & m ^ ~h & n) + r[p] + a[p];
                    l = ((e << 30 | e >>> 2) ^ (e << 19 | e >>> 13) ^ (e << 10 | e >>> 22)) + (e & f ^ e & g ^ f & g);
                    q = n;
                    n = m;
                    m = h;
                    h = j + k | 0;
                    j = g;
                    g = f;
                    f = e;
                    e = k + l | 0
                }
                b[0] = b[0] + e | 0;
                b[1] = b[1] + f | 0;
                b[2] = b[2] + g | 0;
                b[3] = b[3] + j | 0;
                b[4] = b[4] + h | 0;
                b[5] = b[5] + m | 0;
                b[6] = b[6] + n | 0;
                b[7] = b[7] + q | 0
            },
            _doFinalize: function () {
                var a = this._data,
                    d = a.words,
                    b = 8 * this._nDataBytes,
                    e = 8 * a.sigBytes;
                d[e >>> 5] |= 128 << 24 - e % 32;
                d[(e + 64 >>> 9 << 4) + 14] = h.floor(b / 4294967296);
                d[(e + 64 >>> 9 << 4) + 15] = b;
                a.sigBytes = 4 * d.length;
                this._process();
                return this._hash
            },
            clone: function () {
                var a = q.clone.call(this);
                a._hash = this._hash.clone();
                return a
            }
        });
    s.SHA256 = q._createHelper(f);
    s.HmacSHA256 = q._createHmacHelper(f)
})(Math);
(function () {
    var h = CryptoJS,
        s = h.enc.Utf8;
    h.algo.HMAC = h.lib.Base.extend({
        init: function (f, g) {
            f = this._hasher = new f.init;
            "string" == typeof g && (g = s.parse(g));
            var h = f.blockSize,
                m = 4 * h;
            g.sigBytes > m && (g = f.finalize(g));
            g.clamp();
            for (var r = this._oKey = g.clone(), l = this._iKey = g.clone(), k = r.words, n = l.words, j = 0; j < h; j++) k[j] ^= 1549556828, n[j] ^= 909522486;
            r.sigBytes = l.sigBytes = m;
            this.reset()
        },
        reset: function () {
            var f = this._hasher;
            f.reset();
            f.update(this._iKey)
        },
        update: function (f) {
            this._hasher.update(f);
            return this
        },
        finalize: function (f) {
            var g =
                this._hasher;
            f = g.finalize(f);
            g.reset();
            return g.finalize(this._oKey.clone().concat(f))
        }
    })
})();
/* harmony default export */ __webpack_exports__["default"] = (CryptoJS);


/***/ }),

/***/ "./src/modules/commerce/yunqu/md5.js":
/*!*******************************************!*\
  !*** ./src/modules/commerce/yunqu/md5.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}



/* harmony default export */ __webpack_exports__["default"] = ({hex_md5});


/***/ }),

/***/ "./src/modules/common/DailyTask.ts":
/*!*****************************************!*\
  !*** ./src/modules/common/DailyTask.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/game/Module */ "./src/xengine/game/Module.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var DailyTask = /** @class */ (function (_super) {
    __extends(DailyTask, _super);
    function DailyTask(options) {
        var _this = _super.call(this, options) || this;
        _this.last_run_task_time = 0;
        _this.tasks = [];
        _this.records = [];
        return _this;
    }
    DailyTask.prototype.daily_check = function () {
        var date = new Date(this.last_run_task_time);
        var today = new Date(this.now);
        return date.getFullYear() != today.getFullYear() || date.getMonth() != today.getMonth() || date.getDay() != today.getDay();
    };
    DailyTask.prototype.start = function () {
        var e_1, _a;
        if (this.daily_check()) {
            try {
                for (var _b = __values(this.tasks), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var h = _c.value;
                    h.run();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.last_run_task_time = this.now;
            this.records.push(this.last_run_task_time);
        }
    };
    DailyTask.prototype.add_daily_task = function (handler) {
        this.tasks.push(handler);
    };
    /** 一共运行过多少天（累计启动游戏的天数） */
    DailyTask.prototype.get_total_run_count = function () {
        return this.records.length;
    };
    /** 最近连续运行多少天(连续进入游戏的天数) */
    DailyTask.prototype.get_continuous_run_count = function () {
        var ret = 1;
        if (this.records.length > 1) {
            var next_day = this.records[this.records.length - 1];
            for (var i = this.records.length - 2; i >= 0; i--) {
                var cur_day = this.records[i];
                var duration = next_day - cur_day;
                if (duration > 1000 * 60 * 60 * 24) {
                    break;
                }
                else {
                    ret += 1;
                    next_day = cur_day;
                }
            }
        }
        return ret;
    };
    Object.defineProperty(DailyTask.prototype, "now", {
        /** 现在时刻（s） */
        get: function () {
            return new Date().getTime();
        },
        enumerable: true,
        configurable: true
    });
    DailyTask.prototype.save = function () {
        return {
            records: this.records
        };
    };
    DailyTask.prototype.load = function (data) {
        this.records = data.records;
        if (this.records && this.records.length) {
            this.last_run_task_time = this.records[this.records.length - 1];
        }
    };
    DailyTask = __decorate([
        Object(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["game_module"])('daily')
    ], DailyTask);
    return DailyTask;
}(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (DailyTask);


/***/ }),

/***/ "./src/modules/common/StaticData.ts":
/*!******************************************!*\
  !*** ./src/modules/common/StaticData.ts ***!
  \******************************************/
/*! exports provided: StaticData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticData", function() { return StaticData; });
/* harmony import */ var xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/game/Module */ "./src/xengine/game/Module.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

/**
 * 配置表数据模块
 *
 * 可以快速加载 https://github.com/Geequlim/excel-tools 转出的配表数据
 */
var StaticData = /** @class */ (function (_super) {
    __extends(StaticData, _super);
    function StaticData() {
        var _this = _super.call(this) || this;
        _this._data_depot = {};
        _this._config_loaded = false;
        var resList = Object.keys(_this.get_res_member_map());
        if (resList.length) {
            _this._config_loaded = false;
            Laya.loader.load(resList, Laya.Handler.create(_this, _this.on_config_loaded));
        }
        else {
            _this._config_loaded = true;
        }
        return _this;
    }
    // 暂时不优化这个结构   （最好new出新类作为自己的结构体）
    StaticData.prototype.on_config_loaded = function () {
        var e_1, _a;
        var resMemberMap = this.get_res_member_map();
        for (var path in resMemberMap) {
            var membeName = resMemberMap[path];
            var dataList = Laya.loader.getRes(path);
            this[membeName] = dataList;
            if (dataList && dataList.length) {
                try {
                    for (var dataList_1 = (e_1 = void 0, __values(dataList)), dataList_1_1 = dataList_1.next(); !dataList_1_1.done; dataList_1_1 = dataList_1.next()) {
                        var row = dataList_1_1.value;
                        if (row && row.id)
                            this._data_depot[row.id] = row;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (dataList_1_1 && !dataList_1_1.done && (_a = dataList_1.return)) _a.call(dataList_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        this._config_loaded = true;
    };
    //* 获取配表文件与成员名对照表 */
    StaticData.prototype.get_res_member_map = function () {
        return {};
    };
    /** 通过ID查找配表数据  */
    StaticData.prototype.get_config_by_id = function (id) {
        return this._data_depot[id];
    };
    StaticData.prototype.is_ready = function () {
        return this._config_loaded;
    };
    StaticData = __decorate([
        Object(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["game_module"])('data')
    ], StaticData);
    return StaticData;
}(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./src/modules/dataModule/BallModule.ts":
/*!**********************************************!*\
  !*** ./src/modules/dataModule/BallModule.ts ***!
  \**********************************************/
/*! exports provided: default, LevelVo, hasTrailVo, baffleVo, heroVo, boardVo, ETrailType, EHreoIndex, trailVo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelVo", function() { return LevelVo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasTrailVo", function() { return hasTrailVo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baffleVo", function() { return baffleVo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "heroVo", function() { return heroVo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boardVo", function() { return boardVo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ETrailType", function() { return ETrailType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EHreoIndex", function() { return EHreoIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trailVo", function() { return trailVo; });
/* harmony import */ var xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/game/Module */ "./src/xengine/game/Module.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var _GameStaticData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameStaticData */ "./src/modules/dataModule/GameStaticData.ts");
/* harmony import */ var xengine_utils_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xengine/utils/math */ "./src/xengine/utils/math.ts");
/* harmony import */ var xengine_XEngine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xengine/XEngine */ "./src/xengine/XEngine.ts");
/* harmony import */ var xengine_utils_path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! xengine/utils/path */ "./src/xengine/utils/path.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var BallModule = /** @class */ (function (_super) {
    __extends(BallModule, _super);
    function BallModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelVos = [];
        _this.level = 1;
        _this.futureResUrl = "futureRes";
        _this.panelName = "panel";
        _this.goalName = "goalCube";
        _this.boardName = "boardModel";
        _this.baffleName = "baffle";
        _this.lanqiuName = "lanqiu";
        // 玩家的英雄ID
        _this.heroId = 3000;
        // 玩家的篮球ID
        _this.ballId = 4000;
        _this.touchDisShoot = 50;
        _this.onceForce = 2000;
        _this.panelForce = 0.5;
        _this.baffleForce = 0.5;
        _this.boardForce = 0.5;
        _this.ballForce = 1;
        _this.angleOffset = 30;
        _this.playShootTimeMin = 1;
        _this.playShootTimeMax = 7;
        _this.playHitAdd = 0.05;
        _this.allShootNum = 4;
        _this.playInitHit = 1;
        _this.enemyInitHit = 0.5;
        _this.boardRadius = 0.55; // 篮板半径
        return _this;
    }
    /** 初始化 */
    BallModule.prototype.initialize = function () {
        this.staticData = xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(_GameStaticData__WEBPACK_IMPORTED_MODULE_2__["default"]);
    };
    /** 逻辑更新 */
    BallModule.prototype.update = function (dt) { };
    /** 模块开始 */
    BallModule.prototype.start = function () {
        // 初始化本关卡信息
        this.touchDisShoot = this.staticData.get_config_by_id(5000).value;
        this.onceForce = this.staticData.get_config_by_id(5001).value;
        this.panelForce = this.staticData.get_config_by_id(5002).value;
        this.baffleForce = this.staticData.get_config_by_id(5003).value;
        this.boardForce = this.staticData.get_config_by_id(5004).value;
        this.ballForce = this.staticData.get_config_by_id(5005).value;
        this.angleOffset = this.staticData.get_config_by_id(5006).value;
        this.playShootTimeMin = this.staticData.get_config_by_id(5007).value;
        this.playShootTimeMax = this.staticData.get_config_by_id(5008).value;
        this.playHitAdd = this.staticData.get_config_by_id(5009).value;
        this.allShootNum = this.staticData.get_config_by_id(5013).value;
        this.enemyInitHit = this.staticData.get_config_by_id(5014).value;
        this.playInitHit = this.staticData.get_config_by_id(5015).value;
    };
    // 预加载下一关
    BallModule.prototype.preloadNextLv = function () {
        var nextLevelVo = this.nextLevelVo();
        var nowLevelVo = this.nextLevelVo();
        var skinName = nextLevelVo.levelData.skin;
        if (nowLevelVo.levelData.skin == skinName) {
            return;
        }
        xengine_XEngine__WEBPACK_IMPORTED_MODULE_4__["default"].inst.res.load(xengine_utils_path__WEBPACK_IMPORTED_MODULE_5__["path"].res3DUrlByName(skinName, skinName));
    };
    // 设置下一关
    BallModule.prototype.lvGoOn = function () {
        this.level++;
    };
    BallModule.prototype.updateLevelData = function () {
        var levelVo = this.levelVoByLv(this.level);
    };
    BallModule.prototype.levelVoByLv = function (level) {
        return this.levelVos[level] || (this.levelVos[level] = new LevelVo(level, this.heroId, this.ballId));
    };
    BallModule.prototype.nowLevelVo = function () {
        return this.levelVoByLv(this.level);
    };
    BallModule.prototype.nextLevelVo = function () {
        return this.levelVoByLv(this.level + 1);
    };
    /** 读档 */
    BallModule.prototype.load = function (data) {
        this.level = data.level || this.level;
        this.heroId = data.heroId || this.heroId;
        this.ballId = data.ballId || this.ballId;
    };
    /** 存档 */
    BallModule.prototype.save = function () {
        return { level: this.level, heroId: this.heroId, ballId: this.ballId };
    };
    BallModule = __decorate([
        Object(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["game_module"])('BallModule')
    ], BallModule);
    return BallModule;
}(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (BallModule);
// 关卡vo
var LevelVo = /** @class */ (function () {
    /**
     * @param lv 等级
     * @param heroId 英雄id
     * @param ballId 篮球id
     */
    function LevelVo(lv, heroId, ballId) {
        var _this = this;
        var gamedata = xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(_GameStaticData__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.levelData = gamedata.get_level_data(lv);
        var baffles = this.levelData.baffles ? this.levelData.baffles.split(",") : [];
        var heros = this.levelData.otherHeros ? this.levelData.otherHeros.split(",") : [];
        var balls = this.levelData.otherBalls ? this.levelData.otherBalls.split(",") : [];
        this.bafflesVo = [];
        this.herosVo = [];
        this.ballsData = [];
        baffles.forEach(function (id, index) {
            if (id)
                _this.bafflesVo[index] = new baffleVo(gamedata.get_config_by_id(id));
        });
        this.herosVo[0] = new heroVo(gamedata.get_config_by_id(heroId), EHreoIndex.CENTER, true);
        heros.forEach(function (id, index) {
            if (id)
                _this.herosVo[index + 1] = new heroVo(gamedata.get_config_by_id(id), index + 1);
        });
        this.ballsData[0] = gamedata.get_config_by_id(ballId);
        balls.forEach(function (id, index) {
            if (id)
                _this.ballsData[index + 1] = gamedata.get_config_by_id(id);
        });
        // 现在支持  一个篮板
        var boards = this.levelData.boards.split(",")[0];
        this.boardVo = new boardVo(gamedata.get_config_by_id(boards));
    }
    return LevelVo;
}());

var hasTrailVo = /** @class */ (function () {
    function hasTrailVo(data) {
        var _this = this;
        if (data && data.trails) {
            var trails = data.trails.split(",");
            this.trailVos = [];
            var gamedata_1 = xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(_GameStaticData__WEBPACK_IMPORTED_MODULE_2__["default"]);
            trails.forEach(function (id, index) {
                if (id)
                    _this.trailVos[index] = new trailVo(gamedata_1.get_config_by_id(id));
            });
        }
    }
    return hasTrailVo;
}());

// 阻挡面板(阻挡物)vo
var baffleVo = /** @class */ (function (_super) {
    __extends(baffleVo, _super);
    function baffleVo(baffleData) {
        var _this = _super.call(this, baffleData) || this;
        _this.baffleData = baffleData;
        return _this;
    }
    return baffleVo;
}(hasTrailVo));

// 人物vo
var heroVo = /** @class */ (function (_super) {
    __extends(heroVo, _super);
    // hero 的运动也需配置
    function heroVo(heroData, index, isPlayer) {
        if (isPlayer === void 0) { isPlayer = false; }
        var _this = _super.call(this, heroData) || this;
        _this.index = index;
        _this.heroData = heroData;
        _this.isPlayer = isPlayer;
        _this.trailVos = [];
        var gamedata = xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.get_module(_GameStaticData__WEBPACK_IMPORTED_MODULE_2__["default"]);
        var data = gamedata.get_config_by_id(5010 + index);
        var trails = data.value.split(",");
        trails.forEach(function (id, index) {
            if (id)
                _this.trailVos[index] = new trailVo(gamedata.get_config_by_id(id));
        });
        return _this;
    }
    return heroVo;
}(hasTrailVo));

// 篮板vo
var boardVo = /** @class */ (function (_super) {
    __extends(boardVo, _super);
    function boardVo(boardData) {
        var _this = _super.call(this, boardData) || this;
        _this.boardData = boardData;
        return _this;
    }
    return boardVo;
}(hasTrailVo));

var ETrailType;
(function (ETrailType) {
    ETrailType[ETrailType["LINE"] = 0] = "LINE";
    ETrailType[ETrailType["ROTATE"] = 1] = "ROTATE";
    ETrailType[ETrailType["STOP"] = 2] = "STOP";
    ETrailType[ETrailType["CIRCLE"] = 3] = "CIRCLE";
})(ETrailType || (ETrailType = {}));
var EHreoIndex;
(function (EHreoIndex) {
    EHreoIndex[EHreoIndex["LIFT"] = 1] = "LIFT";
    EHreoIndex[EHreoIndex["CENTER"] = 0] = "CENTER";
    EHreoIndex[EHreoIndex["RIGHT"] = 2] = "RIGHT";
})(EHreoIndex || (EHreoIndex = {}));
var trailVo = /** @class */ (function () {
    function trailVo(data) {
        this.trailData = data;
        if (data.ease) {
            switch (data.ease) {
                case 1:
                    this.ease = Laya.Ease.backIn; // 暂时  需要细调
                    break;
            }
        }
        else
            this.ease = null;
    }
    Object.defineProperty(trailVo.prototype, "rotate", {
        // 需要旋转的角度
        get: function () {
            var temp = this.trailData;
            return this._rotate || (this._rotate = new Laya.Vector3(temp.rotateX, temp.rotateY, temp.rotatez));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(trailVo.prototype, "startPos", {
        get: function () {
            return this._startPos || (this._startPos = Object(xengine_utils_math__WEBPACK_IMPORTED_MODULE_3__["getVector3ByStr"])(this.trailData.startPos));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(trailVo.prototype, "endPos", {
        get: function () {
            return this._endPos || (this._endPos = Object(xengine_utils_math__WEBPACK_IMPORTED_MODULE_3__["getVector3ByStr"])(this.trailData.endPos));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(trailVo.prototype, "anchor", {
        get: function () {
            return this._anchor || (this._anchor = Object(xengine_utils_math__WEBPACK_IMPORTED_MODULE_3__["getVector3ByStr"])(this.trailData.anchor));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(trailVo.prototype, "speed", {
        get: function () {
            return this.trailData.speed;
        },
        set: function (value) {
            this.trailData.speed = value;
        },
        enumerable: true,
        configurable: true
    });
    return trailVo;
}());



/***/ }),

/***/ "./src/modules/dataModule/GameStaticData.ts":
/*!**************************************************!*\
  !*** ./src/modules/dataModule/GameStaticData.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/game/Module */ "./src/xengine/game/Module.ts");
/* harmony import */ var modules_common_StaticData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules/common/StaticData */ "./src/modules/common/StaticData.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};


var GameStaticData = /** @class */ (function (_super) {
    __extends(GameStaticData, _super);
    function GameStaticData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baffle_data = [];
        _this.level_data = [];
        _this.config_data = [];
        _this.trail_data = [];
        _this.config = null;
        _this.levels_data = {};
        _this.smallLevel_data = {}; // 关中关  每一关 有几个关卡
        return _this;
    }
    GameStaticData.prototype.get_res_member_map = function () {
        return {
            "assets/data/json/Level.json": "level_data",
            "assets/data/json/baffle.json": "baffle_data",
            "assets/data/json/config.json": "config_data",
            "assets/data/json/trail.json": "trail_data",
            "assets/data/json/board.json": "board_data",
            "assets/data/json/hero.json": "hero_data",
            "assets/data/json/ball.json": "ball_data",
        };
    };
    GameStaticData.prototype.on_config_loaded = function () {
        var e_1, _a;
        _super.prototype.on_config_loaded.call(this);
        try {
            for (var _b = __values(this.level_data), _c = _b.next(); !_c.done; _c = _b.next()) {
                var lv = _c.value;
                this.levels_data[lv.level] = lv;
                if (!this.smallLevel_data[lv.smallLv]) {
                    this.smallLevel_data[lv.smallLv] = [];
                }
                this.smallLevel_data[lv.smallLv].push(lv);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /** 获取关卡配置 */
    GameStaticData.prototype.get_level_data = function (level) {
        level = level || 0;
        return this.levels_data[level] || this.level_data[0];
    };
    GameStaticData = __decorate([
        Object(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["game_module"])('data')
    ], GameStaticData);
    return GameStaticData;
}(modules_common_StaticData__WEBPACK_IMPORTED_MODULE_1__["StaticData"]));
/* harmony default export */ __webpack_exports__["default"] = (GameStaticData);


/***/ }),

/***/ "./src/modules/func/ParabolaFunc.ts":
/*!******************************************!*\
  !*** ./src/modules/func/ParabolaFunc.ts ***!
  \******************************************/
/*! exports provided: Parabola, ParabolaFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parabola", function() { return Parabola; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParabolaFunc", function() { return ParabolaFunc; });
var Parabola = /** @class */ (function () {
    function Parabola() {
        this._progress = 0;
        this.forceDire = new Laya.Vector3();
        this._speed = 0.02;
        this._targetRotationChange = true;
        this._startTime = 0;
        this._time = 0;
        this._xOffset = 0;
        this.isLine = false; // 是否是直线
    }
    Object.defineProperty(Parabola.prototype, "speed", {
        // 帧率 来算
        set: function (value) {
            this._speed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parabola.prototype, "time", {
        // 时间 来算
        set: function (value) {
            this._time = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param dis 每帧跑的距离 (曲线只算一个近似的值) 会成为匀速
     */
    Parabola.prototype.speedByDis = function (dis) {
        if (!this._startTarget || !this._endTarget || !this._center) {
            return;
        }
        var len1 = Laya.Vector3.distance(this._startTarget, this._endTarget);
        var len2 = Laya.Vector3.distance(this._startTarget, this._center) + Laya.Vector3.distance(this._endTarget, this._center);
        var len = (len1 + len2) / 2;
        this.speed = dis / len / 50;
    };
    Parabola.prototype.setCommon = function (target, endCallBack) {
        this._endCallBack = endCallBack;
        this._target = target;
        this._progress = 0;
        Laya.timer.frameLoop(1, this, this.startTween);
    };
    Parabola.prototype.tweenParabolaComToCom = function (target, startTarget, endTarget, endCallBack, center, xOffset) {
        if (xOffset === void 0) { xOffset = 0; }
        this._startTime = Laya.Browser.now();
        this._startTarget = startTarget;
        this._endTarget = endTarget;
        this._center = center;
        this._xOffset = xOffset;
        this.setCommon(target, endCallBack);
    };
    Parabola.prototype.targetRotationChange = function (bool) {
        this._targetRotationChange = bool;
    };
    //t->(0,1)  stx:起始位置     kongzhiX：拉力点   endX ：终点
    Parabola.prototype.bezier = function (t, stx, stY, kongzhiX, kongzhiY, endX, endY) {
        if (stx === void 0) { stx = 0; }
        if (stY === void 0) { stY = 0; }
        if (this.isLine)
            return { x: (endX - stx) * t + stx, y: (endY - stY) * t + stY };
        var tem = 1 - t;
        // let tx = tem * tem * stx + 2 * t * tem * kongzhiX + t * t * endX;
        var ty = tem * tem * stY + 2 * t * tem * kongzhiY + t * t * endY;
        var tz = tem * tem * stx + 2 * t * tem * kongzhiX + t * t * endX;
        return { y: ty, z: tz }; //返回坐标位置
    };
    Parabola.prototype.bezierByVector3 = function (t, startPos, center, endPos) {
        var targetX = startPos.x + this._xOffset;
        var tx = startPos.x + (endPos.x - targetX) * t;
        var temp = this.bezier(t, startPos.z, startPos.y, center.z, center.y, endPos.z, endPos.y);
        temp.x = tx;
        return temp;
    };
    Parabola.prototype.dispose = function () {
        Laya.timer.clearAll(this);
        this._endCallBack = null;
        this._target = null;
        this._startTarget = null;
        this._endTarget = null;
        this._speed = 0.02;
        this._progress = 0;
    };
    Parabola.prototype.checkData = function () {
        if (!this._target || this._target.destroyed) {
            return true;
        }
        if (this._progress < 1 && this._target && this._startTarget && this._endTarget) {
            return true;
        }
        return false;
    };
    Parabola.prototype.startTween = function () {
        if (this._time) {
            this._progress = (Laya.Browser.now() - this._startTime) / this._time;
        }
        else {
            this._progress += this._speed;
        }
        if (!this.checkData()) {
            if (this._endCallBack) {
                this._endCallBack.run();
            }
        }
        else {
            this.updateTargetXY();
        }
    };
    Parabola.prototype.updateTargetXY = function () {
        var value = this._target;
        if (!value)
            return;
        var pList = this.bezierByVector3(this._progress, this._startTarget, this._center, this._endTarget);
        var xOff = value.transform.position.x - pList.x;
        var yOff = value.transform.position.y - pList.y;
        var zOff = value.transform.position.z - pList.z;
        // 按时间 算
        this.forceDire.x = -xOff;
        this.forceDire.y = -yOff;
        this.forceDire.z = -zOff;
        if (this._targetRotationChange) {
            var rotateZ = parseFloat((Math.atan2(yOff, -zOff) * 180 / Math.PI).toFixed(2));
            // console.log("y的旋转值是 ----------- " + rotateZ);
            // value.transform.rotate(new Laya.Vector3(0, 0, rotateZ), false, false);
            value.transform.rotationEuler.x = -rotateZ;
            value.transform.rotationEuler = value.transform.rotationEuler;
            // value.transform.localRotationEulerZ = -rotateZ;
        }
        value.transform.position.x = pList.x;
        value.transform.position.y = pList.y;
        value.transform.position.z = pList.z;
        value.transform.position = value.transform.position;
    };
    return Parabola;
}());

var ParabolaFunc = /** @class */ (function () {
    function ParabolaFunc() {
        this._parabolas = [];
    }
    Object.defineProperty(ParabolaFunc, "instance", {
        get: function () {
            ParabolaFunc._instance = ParabolaFunc._instance || new ParabolaFunc();
            return ParabolaFunc._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 曲线运动
     * @param target 目标
     * @param startTarget
     * @param endTarget
     * @param endCallBack
     * @param center 中心点位置
     * @param ramdonRange 随机物体间隔范围
     */
    ParabolaFunc.prototype.startPairingParabola = function (target, startTarget, endTarget, endCallBack, center, xOffset) {
        var _this = this;
        if (xOffset === void 0) { xOffset = 0; }
        var parabola = this.getParabola();
        parabola.tweenParabolaComToCom(target, startTarget, endTarget, Laya.Handler.create(this, function () {
            _this.removeParabola(parabola);
            if (endCallBack && endCallBack.caller) {
                endCallBack.run();
                endCallBack = null;
            }
        }), center, xOffset);
        return parabola;
    };
    // 多一些的传法通过这个函数
    ParabolaFunc.prototype.getParabola = function () {
        var parabola = Laya.Pool.getItemByClass('parabola', Parabola);
        this._parabolas.push(parabola);
        return parabola;
    };
    //  请动作完成后置空缓动  此处移除 需要注意 已回收的物品不会重复回收
    ParabolaFunc.prototype.removeParabolaBySprite = function (item) {
        var _this = this;
        this._parabolas.forEach(function (parabola) {
            if (parabola._target == item) {
                _this.removeParabola(parabola);
            }
        });
    };
    //  请动作完成后置空缓动  此处移除 需要注意 已回收的物品不会重复回收
    ParabolaFunc.prototype.removeParabola = function (item) {
        if (item && !item["__InPool"]) {
            item.dispose();
            var index = this._parabolas.indexOf(item);
            if (index >= 0)
                this._parabolas.splice(index, 1);
            Laya.Pool.recover('parabola', item);
            item = null;
        }
    };
    return ParabolaFunc;
}());



/***/ }),

/***/ "./src/modules/platform/VirtualAdManager.ts":
/*!**************************************************!*\
  !*** ./src/modules/platform/VirtualAdManager.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules/commerce/ADManager */ "./src/modules/commerce/ADManager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var VirtualAdManager = /** @class */ (function (_super) {
    __extends(VirtualAdManager, _super);
    function VirtualAdManager() {
        var _this = _super.call(this) || this;
        _this.banner = null;
        _this.banner = new VirtualBannerAdUnit();
        return _this;
    }
    VirtualAdManager.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.banner.instance()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VirtualAdManager.prototype.show_banner = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.banner.show();
                return [2 /*return*/];
            });
        });
    };
    VirtualAdManager.prototype.hide_banner = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.banner.hide();
                return [2 /*return*/];
            });
        });
    };
    return VirtualAdManager;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (VirtualAdManager);
var STYLE = "\nmin-height: 120px;\nposition: absolute;\nbottom: 0;\nwidth: 100%;\nbackground-color: greenyellow;\ntext-align: center;\nmargin: 0px auto;\n";
var VirtualBannerAdUnit = /** @class */ (function (_super) {
    __extends(VirtualBannerAdUnit, _super);
    function VirtualBannerAdUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.native_ad = null;
        return _this;
    }
    VirtualBannerAdUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var title, container;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.native_ad = document.createElement('div');
                        title = document.createElement('h1');
                        title.innerText = '原生广告';
                        this.native_ad.appendChild(title);
                        this.native_ad.setAttribute('style', STYLE);
                        container = document.getElementById('layaContainer');
                        container.appendChild(this.native_ad);
                        return [4 /*yield*/, this.hide()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VirtualBannerAdUnit.prototype.show = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.native_ad.style.visibility = 'visible';
                }
                return [2 /*return*/];
            });
        });
    };
    VirtualBannerAdUnit.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.native_ad.style.visibility = 'hidden';
                }
                return [2 /*return*/];
            });
        });
    };
    return VirtualBannerAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["ADUnit"]));


/***/ }),

/***/ "./src/modules/platform/baidu/BaiduAdManager.ts":
/*!******************************************************!*\
  !*** ./src/modules/platform/baidu/BaiduAdManager.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wechat/WechatADManager */ "./src/modules/platform/wechat/WechatADManager.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var start_time = (new Date()).getTime() / 1000;
var BaiduAdManager = /** @class */ (function (_super) {
    __extends(BaiduAdManager, _super);
    function BaiduAdManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaiduAdManager.prototype.create_ads = function () {
        if (_wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__["WechatADUnitID"].BANNER_AD_UNIT_ID)
            this.banner = new BaiduBannerAdUnit(_wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__["WechatADUnitID"].BANNER_AD_UNIT_ID);
        if (_wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__["WechatADUnitID"].REWARD_AD_UNIT_ID)
            this.video = new _wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__["WechatRewardVideoAdUnit"](_wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__["WechatADUnitID"].REWARD_AD_UNIT_ID);
        if (_wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__["WechatADUnitID"].INTERSTITIAL_AD_UNIT_ID)
            this.interstitial = new _wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__["WechatInterstitialAdUnit"](_wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__["WechatADUnitID"].INTERSTITIAL_AD_UNIT_ID);
    };
    return BaiduAdManager;
}(_wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (BaiduAdManager);
;
var BaiduBannerAdUnit = /** @class */ (function (_super) {
    __extends(BaiduBannerAdUnit, _super);
    function BaiduBannerAdUnit(id) {
        return _super.call(this, id) || this;
    }
    BaiduBannerAdUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wait_duration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wait_duration = Math.max(0, 5 - ((new Date()).getTime() / 1000) - start_time);
                        return [4 /*yield*/, xengine_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"].inst.timer.wait(wait_duration)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** 展示广告 */
    BaiduBannerAdUnit.prototype.show = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.native_ad) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.instance()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, _super.prototype.show.call(this, pos)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    return BaiduBannerAdUnit;
}(_wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_0__["WechatBannerAdUnit"]));


/***/ }),

/***/ "./src/modules/platform/baidu/BaiduPlatform.ts":
/*!*****************************************************!*\
  !*** ./src/modules/platform/baidu/BaiduPlatform.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wechat/WechatPlatform */ "./src/modules/platform/wechat/WechatPlatform.ts");
/* harmony import */ var _wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wechat/WechatADManager */ "./src/modules/platform/wechat/WechatADManager.ts");
/* harmony import */ var _BaiduAdManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaiduAdManager */ "./src/modules/platform/baidu/BaiduAdManager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var appSid = "bce75ddc";
/** 将百度的 `swan` 绑定给 `wx` 对象，这样便可以继续使用 `wx` 的 API */
(function add_swan_wx_adaptor() {
    if (typeof window['wx'] === 'undefined' && typeof window['swan'] != 'undefined') {
        window['wx'] = window['swan'];
        global['wx'] = window['swan'];
        if (true) { // 注入百度API差异化适配
            var raw_createBannerAd_func_1 = wx['createBannerAd'];
            wx['createBannerAd'] = (function (params) {
                var args = __assign(__assign({}, params), { appSid: appSid });
                return raw_createBannerAd_func_1(args);
            }).bind(window['swan']);
            var raw_createRewardedVideoAd_func_1 = wx['createRewardedVideoAd'];
            wx['createRewardedVideoAd'] = (function (params) {
                var args = __assign(__assign({}, params), { appSid: appSid });
                return raw_createRewardedVideoAd_func_1(args);
            }).bind(window['swan']);
        }
    }
})();
var BaiduPlatform = /** @class */ (function (_super) {
    __extends(BaiduPlatform, _super);
    function BaiduPlatform() {
        return _super.call(this) || this;
    }
    BaiduPlatform.prototype.create_ad_manager = function () {
        _wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_1__["WechatADUnitID"].BANNER_AD_UNIT_ID = "6580748";
        _wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_1__["WechatADUnitID"].REWARD_AD_UNIT_ID = "6580749";
        return new _BaiduAdManager__WEBPACK_IMPORTED_MODULE_2__["default"]();
    };
    return BaiduPlatform;
}(_wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (BaiduPlatform);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/modules/platform/bytedance/BytedancePlatform.ts":
/*!*************************************************************!*\
  !*** ./src/modules/platform/bytedance/BytedancePlatform.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/game/Module */ "./src/xengine/game/Module.ts");
/* harmony import */ var _wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wechat/WechatPlatform */ "./src/modules/platform/wechat/WechatPlatform.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var BytedancePlatform = /** @class */ (function (_super) {
    __extends(BytedancePlatform, _super);
    function BytedancePlatform() {
        return _super.call(this) || this;
    }
    BytedancePlatform = __decorate([
        Object(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["game_module"])("platform")
    ], BytedancePlatform);
    return BytedancePlatform;
}(_wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (BytedancePlatform);


/***/ }),

/***/ "./src/modules/platform/oppo/OppoADManager.ts":
/*!****************************************************!*\
  !*** ./src/modules/platform/oppo/OppoADManager.ts ***!
  \****************************************************/
/*! exports provided: OppoADUnitID, default, OppoBannerAdUnit, OppoRewardVideoAdUnit, OppoInterstitialAdUnit, OppoNativeAdUnit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OppoADUnitID", function() { return OppoADUnitID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OppoBannerAdUnit", function() { return OppoBannerAdUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OppoRewardVideoAdUnit", function() { return OppoRewardVideoAdUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OppoInterstitialAdUnit", function() { return OppoInterstitialAdUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OppoNativeAdUnit", function() { return OppoNativeAdUnit; });
/* harmony import */ var modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules/commerce/ADManager */ "./src/modules/commerce/ADManager.ts");
/* harmony import */ var xengine_utils_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/utils/math */ "./src/xengine/utils/math.ts");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../platform */ "./src/modules/platform/platform.ts");
/* harmony import */ var xengine_XEngine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xengine/XEngine */ "./src/xengine/XEngine.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! config */ "./src/config.ts");
/* harmony import */ var _youzi_YouziAdProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./youzi/YouziAdProvider */ "./src/modules/platform/oppo/youzi/YouziAdProvider.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var OppoADUnitID = {
    APPID: "",
    BANNER_AD_UNIT_ID: "",
    REWARD_AD_UNIT_ID: "",
    INTERSTITIAL_AD_UNIT_ID: "",
    NATIVE_AD_UNIT_ID: "",
};
var OppoADManager = /** @class */ (function (_super) {
    __extends(OppoADManager, _super);
    function OppoADManager() {
        var _this = _super.call(this) || this;
        _this.youzi = null;
        _this.banner = null;
        _this.video = null;
        _this.interstitial = null;
        _this.native_banner = null;
        qg.initAdService({
            appId: OppoADUnitID.APPID,
            isDebug:  true || false,
            success: function () {
                console.log("oppo广告", "初始化广告服务成功", OppoADUnitID.APPID);
                _this.create_ads();
            },
            fail: function () {
                console.error("oppo广告", "初始化广告服务失败");
            }
        });
        _this.youzi = new _youzi_YouziAdProvider__WEBPACK_IMPORTED_MODULE_5__["default"]('30208842');
        return _this;
    }
    OppoADManager.prototype.create_ads = function () {
        if (OppoADUnitID.BANNER_AD_UNIT_ID)
            this.banner = new OppoBannerAdUnit(OppoADUnitID.BANNER_AD_UNIT_ID);
        if (OppoADUnitID.REWARD_AD_UNIT_ID)
            this.video = new OppoRewardVideoAdUnit(OppoADUnitID.REWARD_AD_UNIT_ID);
        if (OppoADUnitID.INTERSTITIAL_AD_UNIT_ID)
            this.interstitial = new OppoInterstitialAdUnit(OppoADUnitID.INTERSTITIAL_AD_UNIT_ID);
        if (OppoADUnitID.NATIVE_AD_UNIT_ID)
            this.native_banner = new OppoNativeAdUnit(OppoADUnitID.NATIVE_AD_UNIT_ID);
    };
    OppoADManager.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, error_2, error_3, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("OPPO广告", "初始化广告管理器", OppoADUnitID);
                        if (!this.banner) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.banner.instance()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("OPPO广告:", "创建Banner广告失败", error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.video) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.video.instance()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        console.error("OPPO广告:", "创建视频广告失败", error_2);
                        return [3 /*break*/, 8];
                    case 8:
                        if (!this.interstitial) return [3 /*break*/, 12];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.interstitial.instance()];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_3 = _a.sent();
                        console.error("OPPO广告:", "创建插页广告失败", error_3);
                        return [3 /*break*/, 12];
                    case 12:
                        if (!this.native_banner) return [3 /*break*/, 16];
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, this.native_banner.instance()];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        error_4 = _a.sent();
                        console.error("OPPO广告:", "创建原生广告失败", error_4);
                        return [3 /*break*/, 16];
                    case 16: return [4 /*yield*/, this.youzi.initialize()];
                    case 17:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OppoADManager.prototype.show_banner = function (pos) {
        var _this = this;
        console.log("OPPO广告: 尝试展示Banner");
        return new Promise(function (resolve, reject) {
            if (_this.banner) {
                _this.banner.show(pos).then(function () { return resolve(); }).catch(function () { return reject(); });
            }
            else {
                reject();
            }
        });
    };
    /** 隐藏 Banner 广告 */
    OppoADManager.prototype.hide_banner = function () {
        var _this = this;
        console.log("OPPO广告: 尝试隐藏Banner");
        return new Promise(function (resolve, reject) {
            if (_this.banner) {
                _this.banner.hide();
                resolve();
            }
            else {
                reject();
            }
        });
    };
    OppoADManager.prototype.show_reward_video = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.video) {
                _this.video.show().then(function () { return resolve(); }).catch(function (e) { return reject(e); });
            }
            else {
                reject(_platform__WEBPACK_IMPORTED_MODULE_2__["WatchRewardVideoFailed"].CONFIGURATION_ERROR);
            }
        });
    };
    OppoADManager.prototype.show_intersitial = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.interstitial) {
                _this.banner.show().then(function () { return resolve(); }).catch(function () { return reject(); });
            }
            else {
                reject();
            }
        });
    };
    OppoADManager.prototype.show_native_ad = function (pos, scale) {
        if (scale === void 0) { scale = 1; }
        if (this.native_banner) {
            this.native_banner.show(pos, scale);
        }
    };
    OppoADManager.prototype.hide_native_ad = function () {
        if (this.native_banner) {
            this.native_banner.hide();
        }
    };
    return OppoADManager;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (OppoADManager);
var OppoBannerAdUnit = /** @class */ (function (_super) {
    __extends(OppoBannerAdUnit, _super);
    function OppoBannerAdUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refresh_interval = 30;
        _this.native_ad = null;
        _this.screen_size = null;
        _this.is_visiable = false;
        return _this;
    }
    /** 创建广告 */
    OppoBannerAdUnit.prototype.instance = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.native_ad) {
                var info_1 = qg.getSystemInfoSync();
                _this.screen_size = new xengine_utils_math__WEBPACK_IMPORTED_MODULE_1__["Vector2"](info_1.screenWidth, info_1.screenHeight);
                var width = info_1.screenWidth;
                var height = 100;
                var native_ad_1 = qg['createBannerAd']({
                    posId: _this.id,
                    adIntervals: _this.refresh_interval,
                    style: { left: (info_1.windowWidth - width) / 2, top: info_1.windowHeight - 100, width: width, height: height }
                });
                var initialize_size_1 = function () {
                    Laya.timer.once(1000, null, function () {
                        native_ad_1.style.top = info_1.windowHeight - 100;
                        native_ad_1.style.left = (info_1.windowWidth - native_ad_1.style.width) / 2;
                    });
                    native_ad_1.offResize(initialize_size_1);
                };
                native_ad_1.onResize(initialize_size_1);
                native_ad_1.onLoad(function () {
                    console.log('OPPO广告:', 'Banner加载成功', _this.id);
                    _this.native_ad = native_ad_1;
                    if (!_this.is_visiable) {
                        _this.native_ad.hide();
                    }
                    resolve();
                });
                native_ad_1.onError(function (err) {
                    console.error('OPPO广告:', 'Banner加载失败', _this.id, err);
                    native_ad_1.offResize(initialize_size_1);
                    reject();
                });
                _this.native_ad = native_ad_1;
                resolve();
            }
            else {
                resolve();
            }
        });
    };
    /** 销毁广告 */
    OppoBannerAdUnit.prototype.destrory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.native_ad.destroy();
                    this.native_ad = null;
                }
                this.is_visiable = false;
                return [2 /*return*/];
            });
        });
    };
    ;
    /** 展示广告 */
    OppoBannerAdUnit.prototype.show = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.set_position(pos);
                    this.native_ad.show();
                }
                this.is_visiable = true;
                return [2 /*return*/];
            });
        });
    };
    ;
    /** 隐藏广告 */
    OppoBannerAdUnit.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.native_ad.hide();
                }
                this.is_visiable = false;
                return [2 /*return*/];
            });
        });
    };
    ;
    /** 设置位置（设计分辨率坐标系） */
    OppoBannerAdUnit.prototype.set_position = function (pos) {
        if (this.native_ad) {
            if (pos && false) {
                var viewsize = xengine_XEngine__WEBPACK_IMPORTED_MODULE_3__["default"].inst.stage.size;
                var scalar = this.screen_size.divide(viewsize);
                this.native_ad.style.left = scalar.x * pos.x;
                this.native_ad.style.top = scalar.y * pos.y;
            }
            else {
                var info = qg.getSystemInfoSync();
                this.native_ad.style.top = info.windowHeight - 100;
            }
        }
    };
    return OppoBannerAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["ADUnit"]));

var Events;
(function (Events) {
    Events["VIDEO_PLAY_DONE"] = "VIDEO_PLAY_DONE";
    Events["VIDEO_PLAY_CANCLED"] = "VIDEO_PLAY_CANCLED";
})(Events || (Events = {}));
var OppoRewardVideoAdUnit = /** @class */ (function (_super) {
    __extends(OppoRewardVideoAdUnit, _super);
    function OppoRewardVideoAdUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.native_ad = null;
        return _this;
    }
    /** 创建广告 */
    OppoRewardVideoAdUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.native_ad) {
                    this.native_ad = this.create_reward_video();
                }
                return [2 /*return*/];
            });
        });
    };
    /** 销毁广告 */
    OppoRewardVideoAdUnit.prototype.destrory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.native_ad.destroy();
                    this.native_ad = null;
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    /** 展示广告 */
    OppoRewardVideoAdUnit.prototype.show = function (pos) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.native_ad) {
                // qg.showLoading({ title: "加载中", mask: true} as any);
                // Laya.timer.once(2000, null, ()=>{ qg.hideLoading();});
                _this.offAll(Events.VIDEO_PLAY_DONE);
                _this.offAll(Events.VIDEO_PLAY_CANCLED);
                _this.on(Events.VIDEO_PLAY_DONE, null, function () { return resolve(); });
                _this.on(Events.VIDEO_PLAY_CANCLED, null, function () { return reject(_platform__WEBPACK_IMPORTED_MODULE_2__["WatchRewardVideoFailed"].WATCH_CANCELED); });
                _this.native_ad.show();
            }
            else {
                reject(_platform__WEBPACK_IMPORTED_MODULE_2__["WatchRewardVideoFailed"].CONFIGURATION_ERROR);
            }
        });
    };
    ;
    /** 隐藏广告 */
    OppoRewardVideoAdUnit.prototype.hide = function () {
        return new Promise(function (resolve, reject) {
            reject();
        });
    };
    ;
    // 激励视频
    OppoRewardVideoAdUnit.prototype.create_reward_video = function () {
        var _this = this;
        var adUnitId = this.id;
        if (adUnitId) {
            var rewardedVideoAd_1 = qg['createRewardedVideoAd']({ posId: adUnitId });
            rewardedVideoAd_1.onLoad(function () { console.log('OPPO广告:', '激励视频加载成功', adUnitId); });
            rewardedVideoAd_1.onError(function (err) { console.error('OPPO广告:', '激励视频加载失败', adUnitId, err); });
            rewardedVideoAd_1.onClose(function (res) {
                // 用户点击了【关闭广告】按钮
                console.log('OPPO广告:', '激励视频关闭', res);
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    _this.event(Events.VIDEO_PLAY_DONE);
                }
                else {
                    _this.event(Events.VIDEO_PLAY_CANCLED);
                }
                rewardedVideoAd_1.load();
            });
            rewardedVideoAd_1.load();
            return rewardedVideoAd_1;
        }
        return null;
    };
    ;
    return OppoRewardVideoAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["ADUnit"]));

var OppoInterstitialAdUnit = /** @class */ (function (_super) {
    __extends(OppoInterstitialAdUnit, _super);
    function OppoInterstitialAdUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.native_ad = null;
        return _this;
    }
    OppoInterstitialAdUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.native_ad) {
                    this.native_ad = qg['createInsertAd']({
                        posId: this.id
                    });
                    this.native_ad.load();
                    this.native_ad.onLoad(function () {
                        console.log("OPPO广告", "加载插页广告完成");
                    });
                    this.native_ad.onError(function (err) {
                        console.error("OPPO广告", "加载插页广告失败", err);
                    });
                    this.native_ad.onClose(function () { _this.native_ad.load(); });
                }
                return [2 /*return*/];
            });
        });
    };
    OppoInterstitialAdUnit.prototype.show = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.native_ad) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.native_ad.show()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return OppoInterstitialAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["ADUnit"]));

;
var OppoNativeAdUnit = /** @class */ (function (_super) {
    __extends(OppoNativeAdUnit, _super);
    function OppoNativeAdUnit(id) {
        var _this = _super.call(this, id) || this;
        _this.native_ad = null;
        _this.ad_list = [];
        _this.current_ad = null;
        _this.view = new fairygui.GComponent();
        _this.image = new fairygui.GLoader();
        _this.tag = new fairygui.GLoader;
        _this.on_load = function (res) {
            console.log("OPPO广告:", "加载原生广告完成", res);
            _this.ad_list = res.adList;
            _this.switch_ad();
        };
        _this.on_error = function (err) {
            _this.ad_list = [];
            console.error("OPPO广告:", "加载原生广告出错", err);
            Laya.timer.once(5000, _this.native_ad, _this.native_ad.load);
        };
        _this.view.addChild(_this.image);
        _this.view.onClick(null, function () { if (_this.current_ad)
            _this.report_click(_this.current_ad); });
        _this.image.autoSize = true;
        _this.tag.autoSize = true;
        _this.view.addChild(_this.tag);
        _this.view.setPivot(0.5, 0.5, true);
        return _this;
    }
    OppoNativeAdUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.native_ad = qg.createNativeAd({ posId: this.id });
                this.native_ad.onLoad(this.on_load);
                this.native_ad.onError(this.on_error);
                this.native_ad.load();
                return [2 /*return*/];
            });
        });
    };
    OppoNativeAdUnit.prototype.destrory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.view.removeFromParent();
                if (this.native_ad) {
                    this.native_ad.offLoad(this.on_load);
                    this.native_ad.offError(this.on_error);
                    this.native_ad.destroy();
                    this.native_ad = null;
                    this.current_ad = null;
                }
                return [2 /*return*/];
            });
        });
    };
    OppoNativeAdUnit.prototype.show = function (pos, scale) {
        if (scale === void 0) { scale = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.view.removeFromParent();
                    if (this.current_ad) {
                        if (!this.current_ad.show_reported) {
                            this.report_show(this.current_ad);
                        }
                        this.view.setSize(this.image.width, this.image.height);
                        fairygui.GRoot.inst.addChild(this.view);
                        if (pos) {
                            this.view.setXY(pos.x, pos.y);
                        }
                        this.tag.setXY(this.image.width - this.tag.width, this.image.height - this.tag.height);
                        this.view.setScale(scale, scale);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    OppoNativeAdUnit.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.view.removeFromParent();
                return [2 /*return*/];
            });
        });
    };
    ;
    OppoNativeAdUnit.prototype.switch_ad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idx = this.ad_list.indexOf(this.current_ad);
                        if (!(idx < this.ad_list.length - 1 && this.ad_list.length)) return [3 /*break*/, 1];
                        this.current_ad = this.ad_list[idx + 1];
                        if (this.current_ad.imgUrlList && this.current_ad.imgUrlList.length) {
                            this.image.url = this.current_ad.imgUrlList[0];
                        }
                        this.tag.url = this.current_ad.logoUrl;
                        console.log("OPPO广告:", "切换展示的广告", this.current_ad);
                        return [3 /*break*/, 4];
                    case 1:
                        console.log("OPPO广告:", "重新拉取原生广告");
                        return [4 /*yield*/, this.destrory()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.instance()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OppoNativeAdUnit.prototype.report_show = function (ad) {
        if (this.native_ad) {
            this.native_ad.reportAdShow({ adId: ad.adId });
            ad.show_reported = true;
            console.log("OPPO广告:", "上报广告展示", ad);
        }
    };
    OppoNativeAdUnit.prototype.report_click = function (ad) {
        if (this.native_ad) {
            this.native_ad.reportAdClick({ adId: ad.adId });
            console.log("OPPO广告:", "上报广告点击", ad);
            this.switch_ad();
        }
    };
    return OppoNativeAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["ADUnit"]));



/***/ }),

/***/ "./src/modules/platform/oppo/OppoPlatform.ts":
/*!***************************************************!*\
  !*** ./src/modules/platform/oppo/OppoPlatform.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform */ "./src/modules/platform/platform.ts");
/* harmony import */ var _OppoADManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OppoADManager */ "./src/modules/platform/oppo/OppoADManager.ts");
/* harmony import */ var _wechat_nativefiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../wechat/nativefiles */ "./src/modules/platform/wechat/nativefiles.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! config */ "./src/config.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var OppoPlatform = /** @class */ (function (_super) {
    __extends(OppoPlatform, _super);
    function OppoPlatform() {
        var _this = _super.call(this) || this;
        _this.oppo_user_info = null;
        _this.ad_manager = _this.create_ad_manager();
        console.log("Oppo平台", "创建");
        // 隐藏时提示创建图标
        qg.onHide(_this.create_shortcut.bind(_this));
        // 包体内资源
        Laya.MiniAdpter.nativefiles = _wechat_nativefiles__WEBPACK_IMPORTED_MODULE_2__["default"].concat([]);
        return _this;
    }
    OppoPlatform.prototype.create_ad_manager = function () {
        _OppoADManager__WEBPACK_IMPORTED_MODULE_1__["OppoADUnitID"].APPID = config__WEBPACK_IMPORTED_MODULE_3__["default"].appid;
        _OppoADManager__WEBPACK_IMPORTED_MODULE_1__["OppoADUnitID"].BANNER_AD_UNIT_ID = "139793";
        _OppoADManager__WEBPACK_IMPORTED_MODULE_1__["OppoADUnitID"].REWARD_AD_UNIT_ID = "139795";
        _OppoADManager__WEBPACK_IMPORTED_MODULE_1__["OppoADUnitID"].NATIVE_AD_UNIT_ID = "139809";
        _OppoADManager__WEBPACK_IMPORTED_MODULE_1__["OppoADUnitID"].INTERSTITIAL_AD_UNIT_ID = "139803";
        return new _OppoADManager__WEBPACK_IMPORTED_MODULE_1__["default"]();
    };
    OppoPlatform.prototype.initialize = function () {
        var _this = this;
        Laya.timer.once(1000, null, function () {
            _this.admanager.initialize();
        });
    };
    /** 登陆、授权 */
    OppoPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        qg.login({
                            success: function (res) {
                                console.error("OPPO平台", "登陆成功", res);
                                _this.oppo_user_info = res;
                                resolve({
                                    uuid: res.data.token,
                                    name: "Hero",
                                    avatar: res.data.avatar,
                                    location: "China"
                                });
                            },
                            fail: function (res) {
                                reject(res);
                                console.error("OPPO平台", "登陆失败", res);
                            }
                        });
                    })];
            });
        });
    };
    OppoPlatform.prototype.get_user_info = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.oppo_user_info) {
                    return [2 /*return*/, {
                            uuid: '',
                            avatar: this.oppo_user_info.data.avatar,
                            name: this.oppo_user_info.nickName,
                        }];
                }
                else {
                    return [2 /*return*/, {
                            uuid: "82d7268b-2707-412b-b4c4-65baf63e9b43",
                            name: "Hero",
                            avatar: "",
                            location: "China",
                        }];
                }
                return [2 /*return*/];
            });
        });
    };
    /** 发起创建桌面图标请求 */
    OppoPlatform.prototype.create_shortcut = function () {
        return new Promise(function (resolve, reject) {
            qg['hasShortcutInstalled']({
                success: function (res) {
                    // 判断图标未存在时，创建图标
                    if (res == false) {
                        qg['installShortcut']({
                            success: function () {
                                resolve();
                            },
                            fail: function (err) {
                                reject();
                            },
                            complete: function () { }
                        });
                    }
                    else {
                        resolve();
                    }
                },
                fail: function (err) {
                    reject();
                },
                complete: function () { }
            });
        });
    };
    OppoPlatform.prototype.alert = function (message) {
        qg.showModal({ content: message, showCancel: false });
    };
    return OppoPlatform;
}(_platform__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (OppoPlatform);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/YouziAdProvider.ts":
/*!************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/YouziAdProvider.ts ***!
  \************************************************************/
/*! exports provided: default, YouziBottomBannerAdUnit, YouziFullScreenAdUnit, FloatMainPushAdUnit, YouziFloatMoreGameAdUnit, YouziSlideAdPanelADUnit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YouziBottomBannerAdUnit", function() { return YouziBottomBannerAdUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YouziFullScreenAdUnit", function() { return YouziFullScreenAdUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FloatMainPushAdUnit", function() { return FloatMainPushAdUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YouziFloatMoreGameAdUnit", function() { return YouziFloatMoreGameAdUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YouziSlideAdPanelADUnit", function() { return YouziSlideAdPanelADUnit; });
/* harmony import */ var _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./youziscript/YouziCenter */ "./src/modules/platform/oppo/youzi/youziscript/YouziCenter.ts");
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
/* harmony import */ var modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! modules/commerce/ADManager */ "./src/modules/commerce/ADManager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var YouziProvider = /** @class */ (function (_super) {
    __extends(YouziProvider, _super);
    function YouziProvider(appid) {
        var _this = _super.call(this) || this;
        _this.youzi = null;
        _this.appid = '';
        _this.bottom_banner_ad = null;
        _this.fullscreen_ad = null;
        _this.more_game_ad = null;
        _this.slide_panel_ad = null;
        _this.main_push_ad = null;
        _this.appid = appid;
        return _this;
    }
    YouziProvider.prototype.initialize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Laya.AtlasInfoManager.enable("assets/youzi/fileconfig.json", Laya.Handler.create(null, function () {
                Laya.loader.load([
                    'assets/youzi/youziTexture.png',
                    'assets/youzi/youziTexture.atlas',
                    "assets/youzi/Youzi_GuessLike.scene",
                    "assets/youzi/Youzi_OffLine.scene",
                    "assets/youzi/Youzi_SmallWall.scene",
                    "assets/youzi/Youzi_BottomBanner.scene",
                    "assets/youzi/Youzi_GuessLikeH.scene",
                    "assets/youzi/Youzi_OffLineH.scene",
                    "assets/youzi/Youzi_SmallWallH.scene",
                    "assets/youzi/Youzi_FullScreen.scene",
                    "assets/youzi/Youzi_MainPush.scene",
                    "assets/youzi/Youzi_ScreenPage.scene",
                    "assets/youzi/Youzi_FullScreenH.scene",
                    "assets/youzi/Youzi_MoreGame.scene",
                    "assets/youzi/Youzi_SlideWindow.scene",
                    "assets/youzi/Youzi_GameBannerView.scene",
                    "assets/youzi/Youzi_MoreGameH.scene",
                    "assets/youzi/Youzi_SlideWindowH.scene",
                ], Laya.Handler.create(null, function () {
                    _this.youzi = _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
                    // YouziCenter.getInstance().youziDebug(true);
                    _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().initYouzi(_this.appid, '1.00.00', _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__["MiniGame_Plat_Type"].OppoMiniGame);
                    console.log("柚子SDK", "初始化完毕");
                    _this.bottom_banner_ad = new YouziBottomBannerAdUnit();
                    _this.fullscreen_ad = new YouziFullScreenAdUnit();
                    _this.more_game_ad = new YouziFloatMoreGameAdUnit();
                    _this.slide_panel_ad = new YouziSlideAdPanelADUnit();
                    _this.main_push_ad = new FloatMainPushAdUnit();
                    resolve();
                }));
            }));
        });
    };
    return YouziProvider;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziProvider);
var YouziBottomBannerAdUnit = /** @class */ (function (_super) {
    __extends(YouziBottomBannerAdUnit, _super);
    function YouziBottomBannerAdUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.native_ad = null;
        return _this;
    }
    /** 创建广告 */
    YouziBottomBannerAdUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.native_ad = _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().createBottomBanner(Laya.stage, { x: Laya.stage.width / 2 - 320, y: Laya.stage.height - 170 }, false);
                return [2 /*return*/];
            });
        });
    };
    /** 销毁广告 */
    YouziBottomBannerAdUnit.prototype.destrory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.native_ad.destroy();
                return [2 /*return*/];
            });
        });
    };
    ;
    /** 展示广告 */
    YouziBottomBannerAdUnit.prototype.show = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.native_ad) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.instance()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.native_ad) {
                            if (pos) {
                                this.native_ad.pos(pos.x, pos.y);
                            }
                            this.native_ad.visible = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    /** 隐藏广告 */
    YouziBottomBannerAdUnit.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.native_ad.visible = false;
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    return YouziBottomBannerAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_2__["ADUnit"]));

var YouziFullScreenAdUnit = /** @class */ (function (_super) {
    __extends(YouziFullScreenAdUnit, _super);
    function YouziFullScreenAdUnit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** 展示广告 */
    YouziFullScreenAdUnit.prototype.show = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().showFullScreenMatrix();
                return [2 /*return*/];
            });
        });
    };
    ;
    return YouziFullScreenAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_2__["ADUnit"]));

var FloatMainPushAdUnit = /** @class */ (function (_super) {
    __extends(FloatMainPushAdUnit, _super);
    function FloatMainPushAdUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.native_ad = null;
        return _this;
    }
    FloatMainPushAdUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.native_ad = _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().createMainPush(Laya.stage, null);
                return [2 /*return*/];
            });
        });
    };
    /** 展示广告 */
    FloatMainPushAdUnit.prototype.show = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.native_ad) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.instance()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.native_ad) {
                            this.native_ad.removeSelf();
                            if (pos) {
                                this.native_ad.pos(pos.x, pos.y);
                            }
                            Laya.stage.addChild(this.native_ad);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    FloatMainPushAdUnit.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.native_ad.removeSelf();
                }
                return [2 /*return*/];
            });
        });
    };
    return FloatMainPushAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_2__["ADUnit"]));

var YouziFloatMoreGameAdUnit = /** @class */ (function (_super) {
    __extends(YouziFloatMoreGameAdUnit, _super);
    function YouziFloatMoreGameAdUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.button = null;
        _this.moreGameUI = null;
        return _this;
    }
    YouziFloatMoreGameAdUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.button = _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().createMoreGameButton(Laya.stage, null, true);
                this.moreGameUI = _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().createMoreGameUI(Laya.stage, null);
                this.button.removeSelf();
                return [2 /*return*/];
            });
        });
    };
    YouziFloatMoreGameAdUnit.prototype.show = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.button) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.instance()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.button) {
                            this.button.removeSelf();
                            if (pos) {
                                this.button.pos(pos.x, pos.y);
                            }
                            Laya.stage.addChild(this.button);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    YouziFloatMoreGameAdUnit.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.button) {
                    this.button.removeSelf();
                }
                return [2 /*return*/];
            });
        });
    };
    return YouziFloatMoreGameAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_2__["ADUnit"]));

var YouziSlideAdPanelADUnit = /** @class */ (function (_super) {
    __extends(YouziSlideAdPanelADUnit, _super);
    function YouziSlideAdPanelADUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.button = null;
        _this.panel = null;
        return _this;
    }
    YouziSlideAdPanelADUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.button = _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().createSlideButton(Laya.stage, { x: 60, y: Laya.stage.height / 2 - 40, width: 60, height: 80 }, true, true);
                this.panel = _youziscript_YouziCenter__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().createSlideWindowUI(Laya.stage, null, true);
                this.button.removeSelf();
                return [2 /*return*/];
            });
        });
    };
    YouziSlideAdPanelADUnit.prototype.show = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.button) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.instance()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.button) {
                            this.button.removeSelf();
                            if (pos) {
                                this.button.pos(pos.x + this.button.width, pos.y);
                            }
                            Laya.stage.addChild(this.button);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    YouziSlideAdPanelADUnit.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.button) {
                    this.button.removeSelf();
                }
                return [2 /*return*/];
            });
        });
    };
    return YouziSlideAdPanelADUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_2__["ADUnit"]));



/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/UI.ts":
/*!***********************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/UI.ts ***!
  \***********************************************************/
/*! exports provided: Youzi_BottomBannerUI, Youzi_FullScreenUI, Youzi_FullScreenHUI, Youzi_GameBannerViewUI, Youzi_GuessLikeUI, Youzi_GuessLikeHUI, Youzi_MainPushUI, Youzi_MoreGameUI, Youzi_MoreGameHUI, Youzi_OffLineUI, Youzi_OffLineHUI, Youzi_ScreenPageUI, Youzi_SlideWindowUI, Youzi_SlideWindowHUI, Youzi_SmallWallUI, Youzi_SmallWallHUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_BottomBannerUI", function() { return Youzi_BottomBannerUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_FullScreenUI", function() { return Youzi_FullScreenUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_FullScreenHUI", function() { return Youzi_FullScreenHUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_GameBannerViewUI", function() { return Youzi_GameBannerViewUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_GuessLikeUI", function() { return Youzi_GuessLikeUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_GuessLikeHUI", function() { return Youzi_GuessLikeHUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_MainPushUI", function() { return Youzi_MainPushUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_MoreGameUI", function() { return Youzi_MoreGameUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_MoreGameHUI", function() { return Youzi_MoreGameHUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_OffLineUI", function() { return Youzi_OffLineUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_OffLineHUI", function() { return Youzi_OffLineHUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_ScreenPageUI", function() { return Youzi_ScreenPageUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_SlideWindowUI", function() { return Youzi_SlideWindowUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_SlideWindowHUI", function() { return Youzi_SlideWindowHUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_SmallWallUI", function() { return Youzi_SmallWallUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youzi_SmallWallHUI", function() { return Youzi_SmallWallHUI; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var View = Laya.View;
var Dialog = Laya.Dialog;
var Scene = Laya.Scene;
var REG = Laya.ClassUtils.regClass;
var Youzi_BottomBannerUI = /** @class */ (function (_super) {
    __extends(Youzi_BottomBannerUI, _super);
    function Youzi_BottomBannerUI() {
        return _super.call(this) || this;
    }
    Youzi_BottomBannerUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_BottomBanner");
    };
    return Youzi_BottomBannerUI;
}(Laya.View));

REG("ui.youzi.Youzi_BottomBannerUI", Youzi_BottomBannerUI);
var Youzi_FullScreenUI = /** @class */ (function (_super) {
    __extends(Youzi_FullScreenUI, _super);
    function Youzi_FullScreenUI() {
        return _super.call(this) || this;
    }
    Youzi_FullScreenUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_FullScreen");
    };
    return Youzi_FullScreenUI;
}(Laya.View));

REG("ui.youzi.Youzi_FullScreenUI", Youzi_FullScreenUI);
var Youzi_FullScreenHUI = /** @class */ (function (_super) {
    __extends(Youzi_FullScreenHUI, _super);
    function Youzi_FullScreenHUI() {
        return _super.call(this) || this;
    }
    Youzi_FullScreenHUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_FullScreenH");
    };
    return Youzi_FullScreenHUI;
}(Laya.View));

REG("ui.youzi.Youzi_FullScreenHUI", Youzi_FullScreenHUI);
var Youzi_GameBannerViewUI = /** @class */ (function (_super) {
    __extends(Youzi_GameBannerViewUI, _super);
    function Youzi_GameBannerViewUI() {
        return _super.call(this) || this;
    }
    Youzi_GameBannerViewUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_GameBannerView");
    };
    return Youzi_GameBannerViewUI;
}(Laya.View));

REG("ui.youzi.Youzi_GameBannerViewUI", Youzi_GameBannerViewUI);
var Youzi_GuessLikeUI = /** @class */ (function (_super) {
    __extends(Youzi_GuessLikeUI, _super);
    function Youzi_GuessLikeUI() {
        return _super.call(this) || this;
    }
    Youzi_GuessLikeUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_GuessLike");
    };
    return Youzi_GuessLikeUI;
}(Laya.View));

REG("ui.youzi.Youzi_GuessLikeUI", Youzi_GuessLikeUI);
var Youzi_GuessLikeHUI = /** @class */ (function (_super) {
    __extends(Youzi_GuessLikeHUI, _super);
    function Youzi_GuessLikeHUI() {
        return _super.call(this) || this;
    }
    Youzi_GuessLikeHUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_GuessLikeH");
    };
    return Youzi_GuessLikeHUI;
}(Laya.View));

REG("ui.youzi.Youzi_GuessLikeHUI", Youzi_GuessLikeHUI);
var Youzi_MainPushUI = /** @class */ (function (_super) {
    __extends(Youzi_MainPushUI, _super);
    function Youzi_MainPushUI() {
        return _super.call(this) || this;
    }
    Youzi_MainPushUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_MainPush");
    };
    return Youzi_MainPushUI;
}(Laya.View));

REG("ui.youzi.Youzi_MainPushUI", Youzi_MainPushUI);
var Youzi_MoreGameUI = /** @class */ (function (_super) {
    __extends(Youzi_MoreGameUI, _super);
    function Youzi_MoreGameUI() {
        return _super.call(this) || this;
    }
    Youzi_MoreGameUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_MoreGame");
    };
    return Youzi_MoreGameUI;
}(Laya.View));

REG("ui.youzi.Youzi_MoreGameUI", Youzi_MoreGameUI);
var Youzi_MoreGameHUI = /** @class */ (function (_super) {
    __extends(Youzi_MoreGameHUI, _super);
    function Youzi_MoreGameHUI() {
        return _super.call(this) || this;
    }
    Youzi_MoreGameHUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_MoreGameH");
    };
    return Youzi_MoreGameHUI;
}(Laya.View));

REG("ui.youzi.Youzi_MoreGameHUI", Youzi_MoreGameHUI);
var Youzi_OffLineUI = /** @class */ (function (_super) {
    __extends(Youzi_OffLineUI, _super);
    function Youzi_OffLineUI() {
        return _super.call(this) || this;
    }
    Youzi_OffLineUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_OffLine");
    };
    return Youzi_OffLineUI;
}(Laya.View));

REG("ui.youzi.Youzi_OffLineUI", Youzi_OffLineUI);
var Youzi_OffLineHUI = /** @class */ (function (_super) {
    __extends(Youzi_OffLineHUI, _super);
    function Youzi_OffLineHUI() {
        return _super.call(this) || this;
    }
    Youzi_OffLineHUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_OffLineH");
    };
    return Youzi_OffLineHUI;
}(Laya.View));

REG("ui.youzi.Youzi_OffLineHUI", Youzi_OffLineHUI);
var Youzi_ScreenPageUI = /** @class */ (function (_super) {
    __extends(Youzi_ScreenPageUI, _super);
    function Youzi_ScreenPageUI() {
        return _super.call(this) || this;
    }
    Youzi_ScreenPageUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_ScreenPage");
    };
    return Youzi_ScreenPageUI;
}(Laya.View));

REG("ui.youzi.Youzi_ScreenPageUI", Youzi_ScreenPageUI);
var Youzi_SlideWindowUI = /** @class */ (function (_super) {
    __extends(Youzi_SlideWindowUI, _super);
    function Youzi_SlideWindowUI() {
        return _super.call(this) || this;
    }
    Youzi_SlideWindowUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_SlideWindow");
    };
    return Youzi_SlideWindowUI;
}(Laya.View));

REG("ui.youzi.Youzi_SlideWindowUI", Youzi_SlideWindowUI);
var Youzi_SlideWindowHUI = /** @class */ (function (_super) {
    __extends(Youzi_SlideWindowHUI, _super);
    function Youzi_SlideWindowHUI() {
        return _super.call(this) || this;
    }
    Youzi_SlideWindowHUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_SlideWindowH");
    };
    return Youzi_SlideWindowHUI;
}(Laya.View));

REG("ui.youzi.Youzi_SlideWindowHUI", Youzi_SlideWindowHUI);
var Youzi_SmallWallUI = /** @class */ (function (_super) {
    __extends(Youzi_SmallWallUI, _super);
    function Youzi_SmallWallUI() {
        return _super.call(this) || this;
    }
    Youzi_SmallWallUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_SmallWall");
    };
    return Youzi_SmallWallUI;
}(Laya.View));

REG("ui.youzi.Youzi_SmallWallUI", Youzi_SmallWallUI);
var Youzi_SmallWallHUI = /** @class */ (function (_super) {
    __extends(Youzi_SmallWallHUI, _super);
    function Youzi_SmallWallHUI() {
        return _super.call(this) || this;
    }
    Youzi_SmallWallHUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.loadScene("assets/youzi/Youzi_SmallWallH");
    };
    return Youzi_SmallWallHUI;
}(Laya.View));

REG("ui.youzi.Youzi_SmallWallHUI", Youzi_SmallWallHUI);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts":
/*!***************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");

var YouziAtlasPngAnima = /** @class */ (function () {
    function YouziAtlasPngAnima(width, height) {
        //所有数据类型中动画，用json保存，key为动画图集png网址，value是创建后的动画，同个key的网址一样就可以不创建，直接给value
        this.atlasPngUrl = null;
        this.animaPlaySpeed = 100;
        if (width || width > 120)
            YouziAtlasPngAnima.unitAtlasPngWidth = width;
        if (height || height > 120)
            YouziAtlasPngAnima.unitAtlasPngHeight = height;
    }
    /**
     *
     * @param url 图集png地址
     * @param animation Laya动画对象
     * @param createCompleteCall 动画图片绑定完成回调，返回绑定了动画图片的动画对象
     */
    YouziAtlasPngAnima.prototype.createAnimation = function (url, createCompleteCall) {
        this.atlasPngUrl = url;
        if (_YouziData__WEBPACK_IMPORTED_MODULE_0__["AllDataAnimaTypeJson"].hasOwnProperty(this.atlasPngUrl)) {
            createCompleteCall(_YouziData__WEBPACK_IMPORTED_MODULE_0__["AllDataAnimaTypeJson"][this.atlasPngUrl]);
        }
        else {
            this.loadAnimaRes(createCompleteCall);
        }
    };
    //如果allDataAnimaTypeJson中已经保存过创建的则直接返回动画对象，否则创建
    YouziAtlasPngAnima.prototype.loadAnimaRes = function (createCompleteCall) {
        Laya.loader.load(this.atlasPngUrl, new Laya.Handler(this, this.atlasPngRect, [createCompleteCall]), null, Laya.Loader.IMAGE);
    };
    //对图集png按规定好的宽高和数量分割成单张图片,
    YouziAtlasPngAnima.prototype.atlasPngRect = function (createCompleteCall, texture) {
        var animaUnitTextureArr = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var unitTexture = Laya.Texture.createFromTexture(texture, j * YouziAtlasPngAnima.unitAtlasPngWidth, i * YouziAtlasPngAnima.unitAtlasPngHeight, YouziAtlasPngAnima.unitAtlasPngWidth, YouziAtlasPngAnima.unitAtlasPngHeight);
                var unitGraphics = new Laya.Graphics();
                unitGraphics.drawTexture(unitTexture);
                animaUnitTextureArr.push(unitGraphics);
            }
        }
        var animation = new Laya.Animation;
        animation.frames = animaUnitTextureArr;
        animation.interval = this.animaPlaySpeed;
        _YouziData__WEBPACK_IMPORTED_MODULE_0__["AllDataAnimaTypeJson"][this.atlasPngUrl] = animation;
        createCompleteCall(animation);
    };
    // private static instance:YouziAtlasPngAnima = null;
    YouziAtlasPngAnima.unitAtlasPngWidth = 120;
    YouziAtlasPngAnima.unitAtlasPngHeight = 120;
    return YouziAtlasPngAnima;
}());
/* harmony default export */ __webpack_exports__["default"] = (YouziAtlasPngAnima);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziBottomBanner.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziBottomBanner.ts ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * 底部猜你喜欢
 */
var YouziBottomBanner = /** @class */ (function (_super) {
    __extends(YouziBottomBanner, _super);
    function YouziBottomBanner(isOffSwitch) {
        var _this = _super.call(this) || this;
        _this.matrixBannerDatas = [];
        _this.bannerType = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BANNER_TYPE"].MATRIX;
        _this.bannerBottomItemExposure = {};
        //false:中心化sdk控制底部猜你喜欢、底部微信banner广告和底部游戏banner推荐的显示切换；true：由游戏端子机进行控制显示和隐藏
        _this.isOffSwitch = false;
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        _this.stopAction = false;
        _this.curFront = true;
        _this.curBack = false;
        _this.isClick = false;
        _this.dur = 10;
        _this.pos(Laya.stage.width / 2 - _this.BannerBottomUI.width / 2, Laya.stage.height - _this.BannerBottomUI.height);
        _this.visible = false;
        _this.BannerBottomUI.visible = false;
        _this.bottomList.scrollBar.hide = true;
        _this.isOffSwitch = isOffSwitch;
        return _this;
    }
    YouziBottomBanner.prototype.setYouziPosition = function (x, y) {
        this.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziBottomBanner.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziBottomBanner.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziBottomBanner.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziBottomBanner.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziBottomBanner.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziBottomBanner.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziBottomBanner.prototype.onEnable = function () {
        var isBottomDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (isBottomDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziBottomBanner.prototype.initShow = function () {
        this.matrixBannerDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].matrixBannerDatas;
        if (this.matrixBannerDatas.length <= 0) {
            return;
        }
        this.loadBottomList();
        if (!this.isOffSwitch) {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].addBanner(this);
        }
    };
    YouziBottomBanner.prototype.loadBottomList = function () {
        var arr = [];
        var pRecord = null;
        for (var i = 0; i < this.matrixBannerDatas.length; i++) {
            pRecord = this.matrixBannerDatas[i];
            if (pRecord.dynamicType == 1 && pRecord.dynamicIcon) {
                arr.push({ icon: "", namelab: pRecord.title });
            }
            else {
                arr.push({ icon: pRecord.iconImg, namelab: pRecord.title });
            }
        }
        this.bottomList.array = arr;
        this.bottomList.renderHandler = new Laya.Handler(this, this.onListRender);
        this.bottomList.mouseHandler = new Laya.Handler(this, this.onBannerItemMouseEvent);
        this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_BottomBanner, { complete: true });
        this.dur = this.matrixBannerDatas.length ? (this.matrixBannerDatas.length - 5) * 5000 : 5000;
        this.bottomlistAutoScroll();
    };
    YouziBottomBanner.prototype.onListRender = function (item, index) {
        // console.log('------->render bottombanner : ',index);
        // var icon : Laya.Image = item.getChildByName('icon') as Laya.Image;
        // icon.loadImage(this.matrixBannerDatas[index].iconImg);
        if (this.matrixBannerDatas[index].dynamicType == 1 && this.matrixBannerDatas[index].dynamicIcon) {
            var imgAnima = item.getChildByName('iconAnima');
            imgAnima.scale(0.91, 0.91);
            imgAnima.visible = true;
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.matrixBannerDatas[index].dynamicIcon, 
            // imgAnima,
            function (anima) {
                imgAnima.frames = anima.frames;
                imgAnima.interval = anima.interval;
                imgAnima.play();
            });
        }
        this.checkSendExpsureLog(index);
    };
    YouziBottomBanner.prototype.checkSendExpsureLog = function (index) {
        if (this.visible && this.BannerBottomUI.visible) {
            if (!this.bannerBottomItemExposure[this.matrixBannerDatas[index].appid]) {
                // console.log('---send log index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.matrixBannerDatas[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MATRIX);
                this.bannerBottomItemExposure[this.matrixBannerDatas[index].appid] = 1;
            }
        }
    };
    YouziBottomBanner.prototype.onBannerItemMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            if (!this.isClick) {
                this.isClick = true;
                console.log("当前选择的bottombanner索引：" + index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].clickGameYouziUIId = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_BottomBanner;
                var tmpData = this.matrixBannerDatas[index];
                tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MATRIX;
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, this.startOtherCall.bind(this));
                // var curTime = YouziData.YouziDateFtt("yyyyMMdd",new Date());
                // localStorage.setItem(tmpData.appid, curTime)
            }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziBottomBanner.prototype.startOtherCall = function (state) {
        this.isClick = false;
        this.starBottomBannerAction();
    };
    YouziBottomBanner.prototype.stopBottomBannerAcion = function () {
        this.stopAction = true;
    };
    YouziBottomBanner.prototype.starBottomBannerAction = function () {
        this.bottomlistAutoScroll();
    };
    YouziBottomBanner.prototype.bottomlistAutoScroll = function () {
        if (this.matrixBannerDatas.length <= 5) {
            return;
        }
        this.stopAction = false;
        if (this.curFront && !this.curBack) {
            this.listTweenToEnd();
        }
        else if (!this.curFront && this.curBack) {
            this.listTweenToStart();
        }
    };
    YouziBottomBanner.prototype.listTweenToEnd = function () {
        if (!this.stopAction) {
            var endCompletHandler = new Laya.Handler(this, this.listTweenToStart, null, true);
            this.bottomList.tweenTo(this.matrixBannerDatas.length - 1, this.dur, endCompletHandler);
        }
        this.curFront = true;
        this.curBack = false;
    };
    YouziBottomBanner.prototype.listTweenToStart = function () {
        if (!this.stopAction) {
            var startCompleteHandler = new Laya.Handler(this, this.listTweenToEnd, null, true);
            this.bottomList.tweenTo(0, this.dur, startCompleteHandler);
        }
        this.curFront = false;
        this.curBack = true;
    };
    YouziBottomBanner.prototype.showBanner = function () {
        if (this) {
            this.visible = true;
            this.BannerBottomUI.visible = true;
            this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_BottomBanner, { uiVisible: true });
            if (this.stopAction) {
                this.starBottomBannerAction();
            }
        }
    };
    YouziBottomBanner.prototype.hideBanner = function () {
        if (this) {
            this.stopBottomBannerAcion();
            this.visible = false;
            this.BannerBottomUI.visible = false;
            this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_BottomBanner, { uiVisible: false });
        }
    };
    YouziBottomBanner.prototype.destroySelf = function () {
        if (this) {
            this.removeSelf();
        }
    };
    return YouziBottomBanner;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_BottomBannerUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziBottomBanner);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziCenter.ts":
/*!********************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziCenter.ts ***!
  \********************************************************************/
/*! exports provided: MiniGame_Plat_Type, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiniGame_Plat_Type", function() { return MiniGame_Plat_Type; });
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziMainPush__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziMainPush */ "./src/modules/platform/oppo/youzi/youziscript/YouziMainPush.ts");
/* harmony import */ var _YouziBottomBanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./YouziBottomBanner */ "./src/modules/platform/oppo/youzi/youziscript/YouziBottomBanner.ts");
/* harmony import */ var _YouziWeChatBanner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./YouziWeChatBanner */ "./src/modules/platform/oppo/youzi/youziscript/YouziWeChatBanner.ts");
/* harmony import */ var _YouziGameBanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./YouziGameBanner */ "./src/modules/platform/oppo/youzi/youziscript/YouziGameBanner.ts");
/* harmony import */ var _YouziMoreGame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./YouziMoreGame */ "./src/modules/platform/oppo/youzi/youziscript/YouziMoreGame.ts");
/* harmony import */ var _YouziSlideWindow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./YouziSlideWindow */ "./src/modules/platform/oppo/youzi/youziscript/YouziSlideWindow.ts");
/* harmony import */ var _YouziGuessLike__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./YouziGuessLike */ "./src/modules/platform/oppo/youzi/youziscript/YouziGuessLike.ts");
/* harmony import */ var _YouziSmallWall__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./YouziSmallWall */ "./src/modules/platform/oppo/youzi/youziscript/YouziSmallWall.ts");
/* harmony import */ var _YouziOffLine__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./YouziOffLine */ "./src/modules/platform/oppo/youzi/youziscript/YouziOffLine.ts");
/* harmony import */ var _YouziGuessLikeH__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./YouziGuessLikeH */ "./src/modules/platform/oppo/youzi/youziscript/YouziGuessLikeH.ts");
/* harmony import */ var _YouziMoreGameH__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./YouziMoreGameH */ "./src/modules/platform/oppo/youzi/youziscript/YouziMoreGameH.ts");
/* harmony import */ var _YouziOffLineH__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./YouziOffLineH */ "./src/modules/platform/oppo/youzi/youziscript/YouziOffLineH.ts");
/* harmony import */ var _YouziSlideWindowH__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./YouziSlideWindowH */ "./src/modules/platform/oppo/youzi/youziscript/YouziSlideWindowH.ts");
/* harmony import */ var _YouziSmallWallH__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./YouziSmallWallH */ "./src/modules/platform/oppo/youzi/youziscript/YouziSmallWallH.ts");
/* harmony import */ var _YouziMultipleMainPushManager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./YouziMultipleMainPushManager */ "./src/modules/platform/oppo/youzi/youziscript/YouziMultipleMainPushManager.ts");
/* harmony import */ var _YouziFullMatrixScreen__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./YouziFullMatrixScreen */ "./src/modules/platform/oppo/youzi/youziscript/YouziFullMatrixScreen.ts");
/* harmony import */ var _YouziFullMatrixScreenH__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./YouziFullMatrixScreenH */ "./src/modules/platform/oppo/youzi/youziscript/YouziFullMatrixScreenH.ts");
//必要





//横屏





//竖屏








var MiniGame_Plat_Type = {
    Test: 0,
    WeChat: 1,
    OppoMiniGame: 2
};
var YouziCenter = /** @class */ (function () {
    function YouziCenter() {
        this.navigateToMiniCallTemp = [];
        this.slideBtn = null;
        this.multiMainPushAmount = 1;
        this.fullScreenMatrixNode = null;
        this.fullScreenMatrix = null;
        this.fullScreenMatrixH = null;
        this.vertical = true; //false 竖屏
        //主推
        // private mainPush:YouziMainPush = null;
        //底部推荐
        // private bottomBanner:YouziBottomBanner = null;
        //底部游戏banner
        // private youziGameBanner:YouziGameBanner = null;
        //猜你喜欢-竖屏
        // private guessLike:YouziGuessLike = null;  
        // 更多游戏UI-竖屏
        this.moreGameUI = null;
        //抽屉游戏UI-竖屏
        this.slideWindowUI = null;
        this.slideWindowMask = null;
        //离线-竖屏
        // private offlineUI:YouziOffLine = null;
        //大家都在玩儿-竖屏
        // private youziSmallWall:YouziSmallWall = null;
        //猜你喜欢-横屏
        // private guessLikeH:YouziGuessLikeH = null;
        //更多游戏UI-横屏
        this.moreGameUIH = null;
        //抽屉游戏UI-横屏
        this.slideWindowUIH = null;
        this.slideWindowMaskH = null;
    }
    //离线-横屏
    // private offlineUIH:YouziOffLineH = null;
    //大家都在玩儿-横屏
    // private youziSmallWallH:YouziSmallWallH = null;
    YouziCenter.getInstance = function () {
        if (this.instance == null) {
            this.instance = new YouziCenter();
        }
        return this.instance;
    };
    YouziCenter.prototype.youziDebug = function (debug) {
        _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].debug = debug;
    };
    /**
     *
     * @param appId 小游戏平台提供的appid
     * @param resVersion 中心化请求数据资源的版本号，请找我方运营
     * @param miniGamePlatType 小游戏平台类型, 请使用sdk定义好的类型 MiniGame_Plat_Type
     */
    YouziCenter.prototype.initYouzi = function (appId, resVersion, miniGamePlatType) {
        _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].init(appId, resVersion, miniGamePlatType);
        if (Laya.stage.width > Laya.stage.height)
            this.vertical = false;
    };
    /**
     * 设置小游戏跳转回调
     */
    YouziCenter.prototype.registerNavigateToMiniCall = function (call) {
        this.navigateToMiniCallTemp.push(call);
    };
    /**
     *重要：此接口只能SDK可调用
     */
    YouziCenter.prototype.notifyNavigateToMini = function (uiId) {
        if (this.navigateToMiniCallTemp.length > 0) {
            this.navigateToMiniCallTemp.forEach(function (call) {
                call(uiId);
            });
        }
    };
    /**
     * 销毁跳转通知
     */
    YouziCenter.prototype.offNavigateToMimiCall = function () {
        this.navigateToMiniCallTemp = null;
    };
    /**
     * 创建更多游戏按钮
     * @param parentNode 更多游戏按钮父节点
     * @param params json{x:0,y:0,width:0,height:0,btnUrl:'youziTexture/btn-entrance-nogift.png'} btnUrl设置按钮图片
     * @param btnUrl 自定义
     * @param isAutoClick 是否有sdk自动完成点击注册,true交给sdk注册，false则开发者自行注册
     */
    YouziCenter.prototype.createMoreGameButton = function (parentNode, params, isAutoClick) {
        var moreGameBtn = null;
        if (!params)
            params = {};
        if (params.hasOwnProperty('btnUrl')) {
            moreGameBtn = new Laya.Button(params.btnUrl);
        }
        else {
            moreGameBtn = new Laya.Button('youziTexture/btn-entrance-nogift.png');
        }
        moreGameBtn.mouseEnabled = true;
        moreGameBtn.stateNum = 1;
        moreGameBtn.width = params.hasOwnProperty('width') ? params.width : 119;
        moreGameBtn.height = params.hasOwnProperty('height') ? params.height : 119;
        var moreGameBtnX = params.hasOwnProperty('x') ? params.x : 0;
        var moreGameBtnY = params.hasOwnProperty('y') ? params.y : 0;
        moreGameBtn.pos(moreGameBtnX, moreGameBtnY);
        parentNode.addChild(moreGameBtn);
        if (isAutoClick) {
            moreGameBtn.on(Laya.Event.CLICK, this, this.showMoreGameUI);
        }
        return moreGameBtn;
    };
    YouziCenter.prototype.showMoreGameUI = function () {
        if (Laya.stage.width > Laya.stage.height) {
            if (this.moreGameUIH)
                this.moreGameUIH.showMoreGameUI();
        }
        else {
            if (this.moreGameUI)
                this.moreGameUI.showMoreGameUI();
        }
    };
    /**
     * 竖屏更多游戏UI
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     * @param uiStateCall ui显示和隐藏回调
     */
    YouziCenter.prototype.createMoreGameUI = function (parentNode, params, uiStateCall) {
        this.moreGameUI = new _YouziMoreGame__WEBPACK_IMPORTED_MODULE_5__["default"]();
        // this.moreGameUI.setUICompleteCall(uiCompleteCall);
        this.moreGameUI.setUIStateCall(uiStateCall);
        if (params) {
            this.moreGameUI.setYouziPosition(params.x, params.y);
        }
        // this.moreGameUI.onMyStart();
        parentNode.addChild(this.moreGameUI);
        return this.moreGameUI;
    };
    /**
     * 横屏更多游戏UI
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     * @param uiStateCall ui显示和隐藏回调
     */
    YouziCenter.prototype.createMoreGameUIH = function (parentNode, params, uiStateCall) {
        this.moreGameUIH = new _YouziMoreGameH__WEBPACK_IMPORTED_MODULE_11__["default"]();
        // this.moreGameUIH.setUICompleteCall(uiCompleteCall);
        this.moreGameUIH.setUIStateCall(uiStateCall);
        if (params) {
            this.moreGameUIH.setYouziPosition(params.x, params.y);
        }
        // this.moreGameUIH.onMyStart();
        parentNode.addChild(this.moreGameUIH);
        return this.moreGameUIH;
    };
    /**
     * 创建抽屉按钮
     * @param parentNode 抽屉按钮父节点
     * @param params json{x:0,y:0,width:0,height:0}
     * @param leftOrRight true按钮在左边，false在右边
     * @param isAutoClick 是否有sdk自动完成点击注册,true交给sdk注册，false则开发者自行注册
     */
    YouziCenter.prototype.createSlideButton = function (parentNode, params, leftOrRight, isAutoClick) {
        this.slideBtn = new Laya.Button('youziTexture/btn_slide.png');
        this.slideBtn.mouseEnabled = true;
        this.slideBtn.stateNum = 1;
        if (!params) {
            params = {};
        }
        this.slideBtn.width = params.width;
        this.slideBtn.height = params.height;
        var slideBtnX = 0;
        var slideBtnY = params.hasOwnProperty('y') ? params.y : Laya.stage.height / 2;
        if (leftOrRight) {
            this.slideBtn.scaleX = -1;
            slideBtnX = params.hasOwnProperty('x') ? params.x : this.slideBtn.width;
        }
        else {
            slideBtnX = params.hasOwnProperty('x') ? params.x : Laya.stage.width - this.slideBtn.width;
        }
        this.slideBtn.pos(slideBtnX, slideBtnY);
        parentNode.addChild(this.slideBtn);
        if (isAutoClick)
            this.slideBtn.on(Laya.Event.CLICK, this, this.showSlideWindowUI);
        return this.slideBtn;
    };
    YouziCenter.prototype.showSlideWindowUI = function () {
        if (Laya.stage.width > Laya.stage.height) {
            if (this.slideWindowUIH) {
                this.slideWindowUIH.showSlideWindow();
            }
        }
        else {
            if (this.slideWindowUI) {
                this.slideWindowUI.showSlideWindow();
            }
        }
    };
    /**
     * 竖屏抽屉UI
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     * @param leftOrRight true 左边，false 右边
     * @param uiStateCall ui显示和隐藏回调
     */
    YouziCenter.prototype.createSlideWindowUI = function (parentNode, params, leftOrRight, uiStateCall) {
        this.slideWindowUI = new _YouziSlideWindow__WEBPACK_IMPORTED_MODULE_6__["default"](leftOrRight);
        this.slideWindowUI.setSlideButton(this.slideBtn);
        this.slideWindowUI.setSlideMask(this.createSlideWindowMask());
        // this.slideWindowUI.setUICompleteCall(uiCompleteCall);
        this.slideWindowUI.setUIStateCall(uiStateCall);
        if (params) {
            this.slideWindowUI.setYouziPosition(params.y);
        }
        // this.slideWindowUI.onMyStart();
        parentNode.addChild(this.createSlideWindowMask());
        parentNode.addChild(this.slideWindowUI);
        return this.slideWindowUI;
    };
    /**
     * 创建抽屉遮罩并不允许点击透过,节点应位于抽屉上面既绘制时在抽屉下面
     */
    YouziCenter.prototype.createSlideWindowMask = function () {
        if (this.slideWindowMask) {
            return this.slideWindowMask;
        }
        else {
            this.slideWindowMask = new Laya.Button('youziTexture/blank.png');
            this.slideWindowMask.width = 1000;
            this.slideWindowMask.height = 1900;
            this.slideWindowMask.stateNum = 1;
            this.slideWindowMask.centerX = 0;
            this.slideWindowMask.centerY = 0;
            this.slideWindowMask.visible = false;
            return this.slideWindowMask;
        }
    };
    /**
     * 横屏屏抽屉UI
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     * @param leftOrRight true 左边，false 右边
     * @param uiStateCall ui显示和隐藏回调
     */
    YouziCenter.prototype.createSlideWindowUIH = function (parentNode, params, leftOrRight, uiStateCall) {
        this.slideWindowUIH = new _YouziSlideWindowH__WEBPACK_IMPORTED_MODULE_13__["default"](leftOrRight);
        this.slideWindowUIH.setSlideButton(this.slideBtn);
        this.slideWindowUIH.setSlideMask(this.createSlideWindowMaskH());
        // this.slideWindowUIH.setUICompleteCall(uiCompleteCall);
        this.slideWindowUIH.setUIStateCall(uiStateCall);
        if (params) {
            this.slideWindowUIH.setYouziPosition(params.y);
        }
        // this.slideWindowUIH.onMyStart();
        parentNode.addChild(this.createSlideWindowMaskH());
        parentNode.addChild(this.slideWindowUIH);
        return this.slideWindowUIH;
    };
    /**
     * 创建抽屉遮罩并不允许点击透过,节点应位于抽屉上面既绘制时在抽屉下面
     */
    YouziCenter.prototype.createSlideWindowMaskH = function () {
        if (this.slideWindowMaskH) {
            return this.slideWindowMaskH;
        }
        else {
            this.slideWindowMaskH = new Laya.Button('youziTexture/blank.png');
            this.slideWindowMaskH.width = 1900;
            this.slideWindowMaskH.height = 1000;
            this.slideWindowMaskH.centerX = 0;
            this.slideWindowMaskH.centerY = 0;
            this.slideWindowMaskH.stateNum = 1;
            this.slideWindowMaskH.visible = false;
            return this.slideWindowMaskH;
        }
    };
    /**
     * 底部推荐UI
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     * @param isOffSwich false:中心化sdk控制底部猜你喜欢、底部微信banner广告和底部游戏banner推荐的显示切换；true：由游戏端子机进行控制显示和隐藏
     */
    YouziCenter.prototype.createBottomBanner = function (parentNode, params, isOffSwich) {
        var bottomBanner = new _YouziBottomBanner__WEBPACK_IMPORTED_MODULE_2__["default"](isOffSwich);
        // bottomBanner.setUICompleteCall(uiCompleteCall);
        if (params) {
            bottomBanner.setYouziPosition(params.x, params.y);
        }
        // this.bottomBanner.onMyStart();
        parentNode.addChild(bottomBanner);
        return bottomBanner;
    };
    /**
     * 停止或者启动猜你喜欢List的tweento滚动列表
     * 1、如果猜你喜欢界面是重新创建的停止后可以不调用，创建时默认是启动滚动列表的
     * 2、当隐藏猜你喜欢并停止滚动列表并非是真的停止，列表回最后一次滚动到第一个或者最后一个才真正停止
     * @param startOrStop boolen值，false为启动，true为停止
     * @param bottomBannerTemp 游戏创建竖屏猜你喜欢对象，由于可能会创建多个，但是sdk不保存，所以需要传入游戏创建
     *
     */
    YouziCenter.prototype.bottomBannerActionStopOrStart = function (startOrStop, bottomBannerTemp) {
        if (bottomBannerTemp) {
            if (startOrStop) {
                bottomBannerTemp.stopBottomBannerAcion();
            }
            else {
                bottomBannerTemp.starBottomBannerAction();
            }
        }
    };
    /**
     * 横向猜你喜欢UI
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     */
    YouziCenter.prototype.createGuessLike = function (parentNode, params) {
        var guessLike = new _YouziGuessLike__WEBPACK_IMPORTED_MODULE_7__["default"]();
        // guessLike.setUICompleteCall(uiCompleteCall);
        if (params) {
            guessLike.setYouziPosition(params.x, params.y);
        }
        // this.guessLike.onMyStart();
        parentNode.addChild(guessLike);
        return guessLike;
    };
    /**
     * 竖向猜你喜欢UI
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     */
    YouziCenter.prototype.createGuessLikeH = function (parentNode, params) {
        var guessLikeH = new _YouziGuessLikeH__WEBPACK_IMPORTED_MODULE_10__["default"]();
        // guessLikeH.setUICompleteCall(uiCompleteCall);
        if (params) {
            guessLikeH.setYouziPosition(params.x, params.y);
        }
        // this.guessLikeH.onMyStart();
        parentNode.addChild(guessLikeH);
        return guessLikeH;
    };
    /**
     * 停止或者启动猜你喜欢List的tweento滚动列表
     * 1、如果猜你喜欢界面是重新创建的停止后可以不调用，创建时默认是启动滚动列表的
     * 2、当隐藏猜你喜欢并停止滚动列表并非是真的停止，列表回最后一次滚动到第一个或者最后一个才真正停止
     * @param startOrStop boolen值，false为启动，true为停止
     * @param guessLikeTemp 游戏创建竖屏猜你喜欢对象，没有传null，由于可能会创建多个，但是sdk不保存，所以需要传入游戏创建
     * @param guessLikeHTemp 游戏创建竖屏猜你喜欢对象，没有传null，由于可能会创建多个，但是sdk不保存，所以需要传入游戏创建
     */
    YouziCenter.prototype.guessLikeListTweenStopOrStart = function (stopOrStart, guessLikeTemp, guessLikeHTemp) {
        if (guessLikeTemp) {
            if (stopOrStart) {
                guessLikeTemp.stopGuessLikeAcion();
            }
            else {
                guessLikeTemp.starGuessLikeAction();
            }
        }
        if (guessLikeHTemp) {
            if (stopOrStart) {
                guessLikeHTemp.stopGuessLikeHAcion();
            }
            else {
                guessLikeHTemp.starGuessLikeHAction();
            }
        }
    };
    /**
     * 主推
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     */
    YouziCenter.prototype.createMainPush = function (parentNode, params) {
        var mainPush = new _YouziMainPush__WEBPACK_IMPORTED_MODULE_1__["default"]();
        // mainPush.setUICompleteCall(uiCompleteCall);
        if (params) {
            mainPush.setYouziPosition(params.x, params.y);
        }
        // this.mainPush.onMyStart();
        parentNode.addChild(mainPush);
        return mainPush;
    };
    /**
     * 停止或者启动主推动画和循环切换主推内容
     * 1、主推创建时默认启动动画
     * @param stopOrStart boolen值，false为启动，true为停止
     * @param mainPushTemp 创建的主推对象，由于可能会创建多个，但是sdk不保存，所以需要传入游戏创建
     */
    YouziCenter.prototype.mainPushActionStopOrStart = function (stopOrStart, mainPushTemp) {
        if (stopOrStart) {
            mainPushTemp.clearTimerLoop();
        }
        else {
            mainPushTemp.startTimerLoop();
        }
    };
    /**
     *
     * @param paramsJsonArray json数组,当前界面最多可以摆放的主推数组
     *  格式：[{parentNode:node,x:0,y:0}],parentNode:主推父节点，x，y为主推节点坐标
     */
    YouziCenter.prototype.createMultiMainPush = function (paramsJsonArray) {
        var youziMultiMainPushManager = new _YouziMultipleMainPushManager__WEBPACK_IMPORTED_MODULE_15__["default"](paramsJsonArray);
        return youziMultiMainPushManager;
    };
    /**
     * 停止或者启动多主推动画和循环切换主推内容
     * 1、主推创建时默认启动动画
     * @param stopOrStart boolen值，false为启动，true为停止
     * @param multiMainPushManager 多主推管理对象
     */
    YouziCenter.prototype.stopOrStartMultiMainPush = function (stopOrStart, multiMainPushManager) {
        if (!multiMainPushManager)
            return;
        if (stopOrStart) {
            multiMainPushManager.stopChangeTimeLoop();
        }
        else {
            multiMainPushManager.startChangeTimeLoop();
        }
    };
    /**
     * 竖屏离线推荐
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     * @param uiStateCall ui显示和隐藏回调
     */
    YouziCenter.prototype.createOffline = function (parentNode, params, uiStateCall) {
        var offlineUI = new _YouziOffLine__WEBPACK_IMPORTED_MODULE_9__["default"]();
        // offlineUI.setUICompleteCall(uiCompleteCall);
        offlineUI.setUIStateCall(uiStateCall);
        if (params) {
            offlineUI.setYouziPosition(params.x, params.y);
        }
        // this.offlineUI.onMyStart();
        parentNode.addChild(offlineUI);
        return offlineUI;
    };
    /**
     * 横屏离线推荐
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     * @param uiStateCall ui显示和隐藏回调
     */
    YouziCenter.prototype.createOfflineH = function (parentNode, params, uiStateCall) {
        var offlineUIH = new _YouziOffLineH__WEBPACK_IMPORTED_MODULE_12__["default"]();
        // offlineUIH.setUICompleteCall(uiCompleteCall);
        offlineUIH.setUIStateCall(uiStateCall);
        if (params) {
            offlineUIH.setYouziPosition(params.x, params.y);
        }
        // this.offlineUIH.onMyStart();
        parentNode.addChild(offlineUIH);
        return offlineUIH;
    };
    /**
     * 微信banner广告
     * @param {string} wechatBannerID 微信banner广告id
     * @param {} posType
     * @param {} offset
     * @param {} isOffSwich false:中心化sdk控制底部猜你喜欢、底部微信banner广告和底部游戏banner推荐的显示切换；true：由游戏端子机进行控制显示和隐藏
     * @param {} isOffSwitchSelf
     */
    YouziCenter.prototype.createYouzi_WechatBanner = function (wechatBannerID, posType, offset, isOffSwich, isOffSwitchSelf) {
        if (posType === void 0) { posType = null; }
        if (offset === void 0) { offset = null; }
        if (isOffSwich === void 0) { isOffSwich = false; }
        if (isOffSwitchSelf === void 0) { isOffSwitchSelf = false; }
        var youziWechatBanner = new _YouziWeChatBanner__WEBPACK_IMPORTED_MODULE_3__["default"](wechatBannerID, posType, offset, isOffSwich, isOffSwitchSelf);
        return youziWechatBanner;
    };
    /**
     *
     * @param {boolean} isOffSwitch false:中心化sdk控制底部猜你喜欢、底部微信banner广告和底部游戏banner推荐的显示切换；true：由游戏端子机进行控制显示和隐藏
     * @param {number} switchTime 微信banner广告是否自动更换。true交由中心化sdk调用switchBannerNow进行更换自身显示的内容
     * @param params 传入json，{x:0,y:0},默认请传null
     */
    YouziCenter.prototype.createYouzi_GameBanner = function (isOffSwitch, switchTime, params) {
        var youziGameBanner = new _YouziGameBanner__WEBPACK_IMPORTED_MODULE_4__["default"](isOffSwitch, switchTime);
        if (params) {
            youziGameBanner.setYouziPosition(params.x, params.y);
        }
        // this.youziGameBanner.onMyStart();
        return youziGameBanner;
    };
    /**
     * 小矩阵墙竖屏,注意不显示时请隐藏父节点
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     */
    YouziCenter.prototype.createYouziSmallWall = function (parentNode, params) {
        var youziSmallWall = new _YouziSmallWall__WEBPACK_IMPORTED_MODULE_8__["default"]();
        // youziSmallWall.setUICompleteCall(uiCompleteCall);
        if (params) {
            youziSmallWall.setYouziPosition(params.x, params.y);
        }
        // this.youziSmallWall.onMyStart();
        parentNode.addChild(youziSmallWall);
        return youziSmallWall;
    };
    /**
    * 停止或者启动小矩阵墙竖屏List的tweento滚动列表
    * 1、如果小矩阵墙界面是重新创建的停止后可以不调用，创建时默认是启动滚动列表的
    * 2、当隐藏小矩阵墙竖屏并停止滚动列表并非是真的停止，列表回最后一次滚动到第一个或者最后一个才真正停止
    * @param startOrStop boolen值，false为启动，true为停止
    * @param smallWallTemp 游戏创建的小矩阵墙竖屏，由于可能会创建多个，但是sdk不保存，所以需要传入游戏创建的
    *
    */
    YouziCenter.prototype.smallWallActionStopOrStart = function (startOrStop, smallWallTemp) {
        if (smallWallTemp) {
            if (startOrStop) {
                smallWallTemp.stopSmallWallAcion();
            }
            else {
                smallWallTemp.starSmallWallAction();
            }
        }
    };
    /**
     * 大家都在玩儿横屏,注意不显示时请隐藏父节点
     * @param parentNode UI的父节点
     * @param params 传入json，{x:0,y:0},默认请传null
     */
    YouziCenter.prototype.createYouziSmallWallH = function (parentNode, params) {
        var youziSmallWallH = new _YouziSmallWallH__WEBPACK_IMPORTED_MODULE_14__["default"]();
        // youziSmallWallH.setUICompleteCall(uiCompleteCall);
        if (params) {
            youziSmallWallH.setYouziPosition(params.x, params.y);
        }
        // this.youziSmallWallH.onMyStart();
        parentNode.addChild(youziSmallWallH);
        return youziSmallWallH;
    };
    /**
     * 停止或者启动小矩阵墙竖屏List的tweento滚动列表
     * 1、如果小矩阵墙界面是重新创建的停止后可以不调用，创建时默认是启动滚动列表的
     * 2、当隐藏小矩阵墙竖屏并停止滚动列表并非是真的停止，列表回最后一次滚动到第一个或者最后一个才真正停止
     * @param startOrStop boolen值，false为启动，true为停止
     * @param smallWallHTemp 游戏创建的小矩阵墙竖屏，由于可能会创建多个，但是sdk不保存，所以需要传入游戏创建的
     *
     */
    YouziCenter.prototype.smallWallHActionStopOrStart = function (startOrStop, smallWallHTemp) {
        if (smallWallHTemp) {
            if (startOrStop) {
                smallWallHTemp.stopSmallWallAcion();
            }
            else {
                smallWallHTemp.starSmallWallAction();
            }
        }
    };
    /**
     * 展示全屏落地页矩阵
     */
    YouziCenter.prototype.showFullScreenMatrix = function () {
        if (this.fullScreenMatrixNode) {
            if (this.vertical) {
                this.fullScreenMatrix.showFullScreen();
            }
            else {
                this.fullScreenMatrixH.showFullScreen();
            }
        }
        else {
            if (this.vertical) {
                this.fullScreenMatrix = new _YouziFullMatrixScreen__WEBPACK_IMPORTED_MODULE_16__["default"]();
                this.fullScreenMatrixNode = Laya.stage.addChild(this.fullScreenMatrix);
                this.fullScreenMatrix.showFullScreen();
            }
            else {
                this.fullScreenMatrixH = new _YouziFullMatrixScreenH__WEBPACK_IMPORTED_MODULE_17__["default"]();
                this.fullScreenMatrixNode = Laya.stage.addChild(this.fullScreenMatrixH);
                this.fullScreenMatrixH.showFullScreen();
            }
        }
    };
    YouziCenter.instance = null;
    return YouziCenter;
}());
/* harmony default export */ __webpack_exports__["default"] = (YouziCenter);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts":
/*!******************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziData.ts ***!
  \******************************************************************/
/*! exports provided: BANNER_TYPE, BI_PAGE_TYPE, AllDataAnimaTypeJson, YOUZI_UI_ID, YouziData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BANNER_TYPE", function() { return BANNER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BI_PAGE_TYPE", function() { return BI_PAGE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllDataAnimaTypeJson", function() { return AllDataAnimaTypeJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YOUZI_UI_ID", function() { return YOUZI_UI_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YouziData", function() { return YouziData; });
/* harmony import */ var _YouziCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziCenter */ "./src/modules/platform/oppo/youzi/youziscript/YouziCenter.ts");

//{"togame" : "wx5cc078f08942ebfe","boxAppid" : "leuokNull","orgAppid" : "wx1577b6b084c38df7"}wxc62f7ed8b36ea9e8
/**
 * 底部banner类型
 */
var BANNER_TYPE = {
    MATRIX: 1,
    WX: 2,
    GAME: 3,
    SWITCH: 4 //矩阵banner 与 微信banner 进行来回切换展示(根据服务器配置时间间隔进行自动切换展示)
};
/**
 * 手机类型
 */
var PHONE_TYPE = {
    ANDROID: 2,
    IOS: 3 //苹果
};
/**
 * 交叉营销开关枚举
 * 该开关控制抽屉类型(目前只控制抽屉)的显示和隐藏
 */
var PAGE_STATUS = {
    CLOSE: 0,
    OPEN: 1,
    AUDIT: 2,
    BUY: 3 //买量
};
/**
 * 打点位置枚举
 */
var BI_PAGE_TYPE = {
    MAIN: 1,
    FLOAT: 2,
    MATRIX: 3,
    GUESS: 4,
    MORE: 5,
    GAME: 6,
    OFFLINE: 7,
    BUY_Screen: 8,
    BUY_BOX: 9,
    SMALL_MATRIX_WALL: 10,
    FULL_MATRIX_SCRENN: 11,
    CUSTOM_COMPONENT: 9999 //自定义或者没有传入页面类型时
};
/**
 * 交叉营销下行数据类型
 */
var PAGE_TYPE = {
    BANNER: 1,
    ITEMLIST: 2,
    HOT: 3,
    MAIN: 4,
    PAGE: 5,
    OFFLINE: 6,
    BUY: 7,
    MORE: 8,
    MATRIX_BANNER: 9,
    FULL_MATRIX_SCREEN: 10 //全屏落地页矩阵
};
/**
 * 平台
 */
var PLAT_TYPE = {
    Test: 0,
    WeChat: 1,
    OppoMiniGame: 2
};
var PLAT_TYPE_CHANNELID = [
    1002,
    1002,
    8001 //oppo小游戏
];
var AllDataAnimaTypeJson = {};
/**
 * 柚子UI界面ID编号
 */
var YOUZI_UI_ID = {
    Youzi_BottomBanner: 1,
    Youzi_GameBanner: 2,
    Youzi_GuessLike: 3,
    Youzi_GuessLikeH: 4,
    Youzi_MainPush: 5,
    Youzi_MoreGame: 6,
    Youzi_MoreGameH: 7,
    Youzi_OffLine: 8,
    Youzi_OffLineH: 9,
    Youzi_SlideWindow: 10,
    Youzi_SlideWindowH: 11,
    Youzi_SmallWall: 12,
    Youzi_SmallWallH: 13 //大家都在玩儿横屏
};
var YouziData = {
    SdkVersion: 'laya2.0-v6.2.1',
    resVersion: '1.00.00',
    debug: false,
    appid: '',
    channelId: 1002,
    miniGamePlatType: 0,
    bannnerDatas: [],
    itemListDatas: [],
    hotListDatas: [],
    moreDatas: [],
    matrixBannerDatas: [],
    fullMatrixScreenDatas: [],
    mainRecDatas: [],
    buyListDatas: [],
    gameBannerDatas: [],
    offlineBannerDatas: [],
    allBeRecommendGames: {},
    clickGameYouziUIId: 0,
    _userinfo: {
        uid: '',
        gender: 0,
        type: 1 //用户类型 1普通类型,2买量类型,3分享类型
    },
    _platform: 1,
    _isDataLoaded: false,
    _loadedCallBacks: [],
    _bannerType: BANNER_TYPE.MATRIX,
    _banerShowSwitchInterval: 10,
    _bannerCreateInterval: 20,
    _pageOpen: PAGE_STATUS.OPEN,
    _bannerSwitchs: [],
    _provinceAllow: 1,
    _mainRecAmount: 1,
    _gameIndexArrLength: 1,
    _gameIndexArr: [],
    /**
     * 中心化初始化函数 调用一次即可
     * @param {string} appid 渠道提供的appid
     * @param {string} resVersion 中心化资源版本 默认'1.00.00'
     * @param {number} miniGamePlatType 管理后台提供的平台渠道类型
     */
    init: function (appid, resVersion, miniGamePlatType) {
        if (this.isInit)
            return;
        if (Laya.Browser.onIOS) {
            this._platform = PHONE_TYPE.IOS;
        }
        else if (Laya.Browser.onAndroid) {
            this._platform = PHONE_TYPE.ANDROID;
        }
        console.log('中心化初始化 SdkVersion', this.SdkVersion, appid, resVersion, miniGamePlatType);
        console.log('中心化平台：', PLAT_TYPE_CHANNELID[miniGamePlatType]);
        this.isInit = true;
        this.appid = appid || '';
        this.resVersion = resVersion || '1.00.00';
        this.miniGamePlatType = miniGamePlatType || 0;
        this.channelId = PLAT_TYPE_CHANNELID[miniGamePlatType] || 1002;
        this._loadUid();
        this._loadData(this._initBannerShow.bind(this));
        if (this.miniGamePlatType == PLAT_TYPE.WeChat) {
            this._wxLaunch();
        }
    },
    _wxLaunch: function () {
        if (!Laya.Browser.window.wx) {
            return;
        }
        else if (!Laya.Browser.window.wx.getLaunchOptionsSync) {
            return;
        }
        var self = this;
        var wxLaunchOptions = Laya.Browser.window.wx.getLaunchOptionsSync();
        this._loadUid();
        this.checkUserIsImported(wxLaunchOptions);
        if (wxLaunchOptions.referrerInfo
            && wxLaunchOptions.referrerInfo.appId
            && wxLaunchOptions.referrerInfo.extraData
            && wxLaunchOptions.referrerInfo.extraData.boxAppid
            && wxLaunchOptions.referrerInfo.extraData.orgAppid) {
            this.sendJumpToOpen(wxLaunchOptions.referrerInfo.extraData.orgAppid, wxLaunchOptions.referrerInfo.extraData.boxAppid, wxLaunchOptions.referrerInfo.extraData.locationIndex ? wxLaunchOptions.referrerInfo.extraData.locationIndex : BI_PAGE_TYPE.CUSTOM_COMPONENT);
        }
        else {
            this.openGameInitLog();
        }
        Laya.Browser.window.wx.onShow(function (res) {
            self._wxOnShow(res);
        });
    },
    _wxOnShow: function (wxOnShowRes) {
        console.log('wx onShow--------------');
        this.checkUserIsImported(wxOnShowRes);
        if (wxOnShowRes.referrerInfo
            && wxOnShowRes.referrerInfo.extraData
            && wxOnShowRes.referrerInfo.extraData.boxAppid
            && wxOnShowRes.referrerInfo.extraData.orgAppid) {
            this.sendJumpToOpen(wxOnShowRes.referrerInfo.extraData.orgAppid, wxOnShowRes.referrerInfo.extraData.boxAppid, wxOnShowRes.referrerInfo.extraData.locationIndex ? wxOnShowRes.referrerInfo.extraData.locationIndex : BI_PAGE_TYPE.CUSTOM_COMPONENT);
        }
    },
    checkUserIsImported: function (res) {
        if ((res.referrerInfo && res.referrerInfo.adChannelId && res.referrerInfo.adSubChannelId) ||
            (res.query && res.query.adChannelId && res.query.adSubChannelId)) {
            this._userinfo.type = 2;
        }
        if ((res.referrerInfo && res.referrerInfo.leuokShareIn) ||
            (res.query && res.query.leuokShareIn)) {
            this._userinfo.type = 3;
        }
        var isNeedSaveUID = false;
        var hasExtraData = res.referrerInfo && res.referrerInfo.extraData;
        if (hasExtraData) {
            if (res.referrerInfo.extraData.YouziFixUID && res.referrerInfo.extraData.YouziFixUID.trim().length > 0) {
                // 通过新版本跳转到新版本
                isNeedSaveUID = true;
                this._userinfo.uid = res.referrerInfo.extraData.YouziFixUID;
            } // 通过其它引擎或者cocoxcreator老版本跳转到新版本
            else if (res.referrerInfo.extraData.YouziUID && res.referrerInfo.extraData.YouziUID.trim().length > 0) {
                isNeedSaveUID = true;
                this._userinfo.uid = res.referrerInfo.extraData.YouziUID;
            }
            // 如果两者都没有，直接在_loadUid()方法里去取uid或者生成一个uid
        }
        if (res.query && res.query.extraData && res.query.extraData.YouziUID) {
            isNeedSaveUID = true;
            this._userinfo.uid = res.query.YouziUID;
        }
        if (isNeedSaveUID) {
            localStorage.setItem('YOUZI_UID', this._userinfo.uid);
        }
    },
    _loadData: function (cb) {
        var self = this;
        var reqData = {
            "appid": self.appid,
            "channelId": self.channelId,
            "languageType": 1,
            "uid": self._userinfo.uid,
            "version": self.resVersion
        };
        var cb2 = function (res) {
            var clone = JSON.parse(JSON.stringify(res));
            console.log('中心化数据OK', clone);
            // console.log('中心化数据加载完成',res);
            if (res && res.info && res.info.swith && res.info.swith == 1) {
                self._mainRecAmount = res.info.hasOwnProperty('mainRecAmount') ? res.info.mainRecAmount : 3;
                self._pageOpen = res.info.status;
                self._bannerType = res.info.bannerSwith;
                self._banerShowSwitchInterval = res.info.bannerAutoInterval;
                self._bannerCreateInterval = res.info.wxBannerRefresh;
                self._provinceAllow = res.info.provinceAllow;
                var weight_1 = function (a, b) { return b.weight - a.weight; };
                var clear = function (list) {
                    list = list.sort(weight_1);
                    list = self._clearArrIndex(list);
                    list = self._removeItemByTestPeriod(list);
                    return list;
                };
                for (var i = 0; i < res.info.recommendListBos.length; i++) {
                    var data = res.info.recommendListBos[i];
                    data.contentBos.forEach(function (item) {
                        if (!self.allBeRecommendGames.hasOwnProperty.call({}, item.appid)) {
                            self.allBeRecommendGames[item.appid] = Object.assign({}, item);
                        }
                    });
                    console.log('allBeRecommendGames:' + self.allBeRecommendGames);
                    switch (data.type) {
                        case PAGE_TYPE.BANNER:
                            self.bannnerDatas = clear(data.contentBos);
                            break;
                        case PAGE_TYPE.ITEMLIST:
                            self.itemListDatas = clear(data.contentBos);
                            break;
                        case PAGE_TYPE.HOT:
                            self.hotListDatas = clear(data.contentBos);
                            break;
                        case PAGE_TYPE.MORE:
                            self.moreDatas = clear(data.contentBos);
                            break;
                        case PAGE_TYPE.MATRIX_BANNER:
                            self.matrixBannerDatas = clear(data.contentBos);
                            break;
                        case PAGE_TYPE.MAIN:
                            self.mainRecDatas = clear(data.contentBos);
                            break;
                        case PAGE_TYPE.PAGE:
                            self.gameBannerDatas = clear(data.contentBos);
                            break;
                        case PAGE_TYPE.OFFLINE:
                            self.offlineBannerDatas = clear(data.contentBos);
                            break;
                        case PAGE_TYPE.BUY:
                            self.buyListDatas = clear(data.contentBos);
                            break;
                        case PAGE_TYPE.FULL_MATRIX_SCREEN:
                            self.fullMatrixScreenDatas = clear(data.contentBos);
                            break;
                        default:
                            console.error('中心化数据类型错误', data.type);
                            break;
                    }
                }
            }
            self._isDataLoaded = true;
            if (cb)
                cb(res);
            for (var i = 0; i < self._loadedCallBacks.length; i++) {
                var callback = self._loadedCallBacks[i];
                if (callback)
                    callback();
            }
            if (self._bannerType == BANNER_TYPE.SWITCH) {
                self.refreshBannerSwitch();
                setInterval(self.refreshBannerSwitch.bind(self), self._banerShowSwitchInterval * 1000);
            }
        };
        if (self.miniGamePlatType == PLAT_TYPE.WeChat) {
            console.log('userInfo 调用开始');
            self._getWxUserInfo(function () {
                console.log('请求开始');
                self._request('POST', reqData, self._url(), cb2);
            });
        }
        else {
            self._request('POST', reqData, self._url(), cb2);
        }
    },
    _clearArrIndex: function (dataArray) {
        var arr1 = [];
        for (var i = 0; i < dataArray.length; i++) {
            var data = dataArray[i];
            if (this._pushData(data.hide)) {
                arr1.push(data);
            }
        }
        var arr2 = [];
        for (var i = 0; i < arr1.length; i++) {
            var data = arr1[i];
            if (this._pushDataBySexual(data.gender)) {
                arr2.push(data);
            }
        }
        return arr2;
    },
    _request: function (methon, data, url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                if (xhr.responseText != '') {
                    var res = JSON.parse(xhr.responseText);
                    if (cb) {
                        cb(res);
                    }
                }
                else {
                    if (cb) {
                        cb({});
                    }
                }
            }
        };
        xhr.open(methon, url, true);
        //设置发送数据的请求格式
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(data));
    },
    _loadUid: function () {
        try {
            var gen = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };
            var uid = localStorage.getItem('YOUZI_UID');
            if (uid && uid.trim().length > 0) {
                this._userinfo.uid = uid;
            }
            else {
                this._userinfo.uid = gen();
                localStorage.setItem('YOUZI_UID', this._userinfo.uid);
            }
        }
        catch (error) {
            this._userinfo.uid = '10001';
        }
    },
    _removeItemByTestPeriod: function (list) {
        //testPeriod 0通用,1测试期,2卖量CPA,3卖量CPS
        for (var i = 0; i < list.length; i++) {
            var tmp = list[i];
            //测试期与下架同时判定
            if ((tmp.testPeriod == 1 || tmp.testPeriod == 3) && tmp.showLimit == 0) {
                var navigatedMark = localStorage.getItem(tmp.appid);
                if (navigatedMark && navigatedMark == 'navigated') {
                    continue;
                }
                else {
                    list.splice(i, 1);
                    i--;
                }
            }
            //卖量判定
            else if (tmp.testPeriod == 2) {
                var cpacpsMark = localStorage.getItem(tmp.appid);
                if (cpacpsMark && cpacpsMark == 'CPACPS') {
                    list.splice(i, 1);
                    i--;
                }
            }
        }
        return list;
    },
    _url: function () {
        return this.debug ? 'https://test.gw.leuok.com/gl-ms-mini-recommend/recommend/show' : 'https://gw.lightlygame.com/gl-ms-mini-recommend/recommend/show';
    },
    _pushData: function (hideType) {
        var push = false;
        switch (hideType) {
            case 1:
                push = true;
                break;
            case 2:
                if (this._platform == PHONE_TYPE.ANDROID) {
                    push = true;
                }
                break;
            case 3:
                if (this._platform == PHONE_TYPE.IOS) {
                    push = true;
                }
                break;
            default:
                push = false;
                break;
        }
        return push;
    },
    _pushDataBySexual: function (sexual) {
        var pushSexual = false;
        switch (sexual) {
            case 0:
                pushSexual = true;
                break;
            case 1: //男
                if (this._userinfo.gender == 1) {
                    pushSexual = true;
                }
                break;
            case 2: //女
                if (this._userinfo.gender == 2) {
                    pushSexual = true;
                }
                break;
            default:
                pushSexual = false;
                break;
        }
        return pushSexual;
    },
    _getWxUserInfo: function (call) {
        var self = this;
        if (!Laya.Browser.window.wx) {
            call();
            return;
        }
        else if (!Laya.Browser.window.wx.getUserInfo) {
            call();
            return;
        }
        console.log('userInfo 调用 start');
        Laya.Browser.window.wx.getUserInfo({
            success: function (res) {
                self._userinfo.gender = res.userInfo.gender;
                console.log('userInfo 成功回调请求');
                call();
                return;
            },
            fail: function (res) {
                console.log('userInfo 失败回调请求');
                call();
            }
        });
        console.log('userInfo 调用 end');
    },
    _loadTexture: function (sp, url) {
    },
    //跳转
    startOtherGame: function (data, call) {
        switch (this.miniGamePlatType) {
            case PLAT_TYPE.WeChat:
                if (data.codeJump == 1) {
                    this.wxPreviewImage(data.chopencode || data.vopencode || data.hopencode, data, call);
                }
                else {
                    this.navigateToOtherGame(data, call);
                }
                break;
            case PLAT_TYPE.OppoMiniGame:
                this.navigateToOppoMiniGame(data, call);
                break;
            default:
                if (call)
                    call(false);
                // this.notifyNavigateFailUIId();
                break;
        }
    },
    //发送sdk初始化日志
    openGameInitLog: function () {
        var curInitLogTime = this.YouziDateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        var curInitLogParam = {
            "logType": "login",
            "channelId": this.channelId,
            "orgAppid": this.appid,
            "uid": this._userinfo.uid,
            "dt": curInitLogTime,
            "sdkVersion": this.SdkVersion
        };
        var initLogCall = function () {
            console.log("log event send YouziSdk init success");
        };
        this.logNavigate(curInitLogParam, initLogCall);
    },
    //曝光日志
    sendExposureLog: function (data, locationIndex) {
        if (!data) {
            console.warn('发送曝光日志时,data不存在', data, locationIndex);
            return;
        }
        var curTime = this.YouziDateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        var param = {
            "logType": "exposure",
            "channelId": this.channelId,
            "orgAppid": this.appid,
            "uid": this._userinfo.uid,
            "languageType": 1,
            "jumpAppid": data.appid,
            "locationIndex": locationIndex ? locationIndex : BI_PAGE_TYPE.CUSTOM_COMPONENT,
            "recommendType": data.type ? data.type : 1,
            "screenId": locationIndex ? locationIndex : 1,
            "dt": curTime,
            "sdkVersion": this.SdkVersion
        };
        var cb = function (res) {
            // console.log('log event exposure success---',param)
        };
        this.logNavigate(param, cb);
    },
    navigateToOppoMiniGame: function (data, call) {
        if (this.debug) {
            console.log('oppo小游戏跳转成功');
        }
        else {
            var self = this;
            console.log('--------->1', data.pkgName);
            var packageName = data.pkgName.replace(/\s*/g, "");
            console.log('--------->2', packageName);
            Laya.Browser.window.qg.navigateToMiniGame({
                pkgName: packageName,
                success: function () {
                    self.sendGameToGame(data);
                    if (call)
                        call(true);
                    console.log('oppo小游戏跳转成功');
                },
                fail: function (res) {
                    if (call)
                        call(false);
                    console.log('oppo小游戏跳转失败：', JSON.stringify(res));
                }
            });
        }
    },
    navigateToOtherGame: function (data, call) {
        if (!Laya.Browser.window.wx) {
            return;
        }
        else if (!Laya.Browser.window.wx.navigateToMiniProgram) {
            return;
        }
        var self = this;
        var desAppid = data.appid;
        var haveBoxAppId = false;
        var _boxId = 'leuokNull';
        if (data.boxAppId && data.boxAppId != '') {
            haveBoxAppId = true;
            desAppid = data.boxAppId;
            _boxId = desAppid;
        }
        var extraJson = {
            'togame': data.appid,
            'boxAppid': _boxId,
            'orgAppid': self.appid,
            'YouziUID': self.uid,
            'YouziFixUID': self._userinfo.uid,
            'userType': self._userinfo.type,
            'locationIndex': data.locationIndex ? data.locationIndex : BI_PAGE_TYPE.CUSTOM_COMPONENT
        };
        //获取小程序路径
        var littleProgramPath = null;
        if (data.miniProgramArgs && data.miniProgramArgs != '') {
            littleProgramPath = data.miniProgramArgs;
        }
        if (data.anChannelId || data.ioChannelId) {
            if (littleProgramPath != null) {
                littleProgramPath = littleProgramPath + "&anChannelId=" + data.anChannelId + "&ioChannelId=" + data.ioChannelId;
            }
            else {
                littleProgramPath = "?anChannelId=" + data.anChannelId + "&ioChannelId=" + data.ioChannelId;
            }
        }
        console.log('mimiProgramPath:' + littleProgramPath);
        //获取联运小游戏附加key名和对应value值
        if (data.miniGameArgs && data.miniGameArgs != '') {
            var addJson = JSON.parse(data.miniGameArgs);
            //获取json中所有key名
            var addJsonKeyArr = Object.keys(addJson);
            //去第一个key名
            var key0 = addJsonKeyArr[0];
            if (key0 == 'togame' || key0 == 'boxAppid' || key0 == 'orgAppid') {
                console.log('联运附加key值冲突');
                return;
            }
            //往extraJson添加新属性
            extraJson[key0] = addJson[key0];
        }
        console.log('extraData' + JSON.stringify(extraJson));
        Laya.Browser.window.wx.navigateToMiniProgram({
            appId: desAppid,
            path: littleProgramPath,
            extraData: extraJson,
            success: function (result) {
                if (haveBoxAppId) {
                    self.sendGameToBox(data);
                }
                else {
                    self.sendGameToGame(data);
                }
                haveBoxAppId = false;
                if (call)
                    call(true);
                console.log('navigateToMiniProgram success');
                //测试期产品用户跳转标记
                if (data.testPeriod && data.testPeriod == '1') {
                    localStorage.setItem(data.appid, 'navigated');
                }
                else if (data.testPeriod == '2') {
                    localStorage.setItem(data.appid, 'CPACPS');
                }
            },
            fail: function (res) {
                if (call)
                    call(false);
                self.notifyNavigateFailUIId();
                console.log('navigateToMiniProgram fail');
            }
        });
    },
    notifyNavigateFailUIId: function () {
        switch (this.clickGameYouziUIId) {
            case YOUZI_UI_ID.Youzi_MainPush:
            case YOUZI_UI_ID.Youzi_BottomBanner:
            case YOUZI_UI_ID.Youzi_GuessLike:
            case YOUZI_UI_ID.Youzi_GuessLikeH:
                _YouziCenter__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().notifyNavigateToMini(this.clickGameYouziUIId);
                break;
            default:
                console.log('不需要取消');
                break;
        }
    },
    sendJumpToOpen: function (orgAppId, boxAppId, locationIndex) {
        if (locationIndex === void 0) { locationIndex = 1; }
        var type = 'jump2open'; //小游戏跳转到盒子
        if (boxAppId == 'leuokNull') {
            type = 'app2open'; //小游戏直接跳小游戏
            boxAppId = '';
        }
        var cb = function (res) {
            console.log('log event sendJumpToOpen success---');
        };
        var curTime = this.YouziDateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        var param = {
            "logType": type,
            "userType": this._userinfo.type,
            "channelId": this.channelId,
            "orgAppid": orgAppId,
            "boxAppid": boxAppId,
            "uid": this._userinfo.uid,
            "languageType": 1,
            "jumpAppid": this.appid,
            "locationIndex": locationIndex ? locationIndex : BI_PAGE_TYPE.CUSTOM_COMPONENT,
            "recommendType": 1,
            "screenId": 1,
            "dt": curTime,
            "sdkVersion": this.SdkVersion
        };
        console.log(param);
        this.logNavigate(param, cb);
    },
    sendGameToGame: function (_data) {
        var curTime = this.YouziDateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        var cb = function (res) {
            console.log('log event success---');
        };
        var param = {
            "logType": "app2app",
            "userType": this._userinfo.type,
            "channelId": this.channelId,
            "orgAppid": this.appid,
            "uid": this._userinfo.uid,
            "languageType": 1,
            "jumpAppid": _data.appid,
            "locationIndex": _data.locationIndex ? _data.locationIndex : BI_PAGE_TYPE.CUSTOM_COMPONENT,
            "recommendType": _data.type,
            "screenId": 1,
            "dt": curTime,
            "sdkVersion": this.SdkVersion
        };
        console.log(param);
        this.logNavigate(param, cb);
    },
    sendGameToBox: function (_data) {
        var curTime = this.YouziDateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        var cb = function (res) {
            console.log('log event success---');
        };
        var param = {
            "logType": "jump2box",
            "userType": this._userinfo.type,
            "channelId": this.channelId,
            "orgAppid": this.appid,
            "uid": this._userinfo.uid,
            "languageType": 1,
            "boxAppid": _data.boxAppId,
            "jumpAppid": _data.appid,
            "locationIndex": _data.locationIndex ? _data.locationIndex : BI_PAGE_TYPE.CUSTOM_COMPONENT,
            "recommendType": _data.type,
            "screenId": 1,
            "dt": curTime,
            "sdkVersion": this.SdkVersion
        };
        console.log(param);
        this.logNavigate(param, cb);
    },
    wxPreviewImage: function (qrCodeimageUrl, data, call) {
        var self = this;
        Laya.Browser.window.wx.previewImage({
            current: qrCodeimageUrl,
            urls: [qrCodeimageUrl],
            success: function () {
                if (call)
                    call(true);
                self.sendGameByQrcode(data);
            },
            fail: function () {
                if (call)
                    call(false);
            }
        });
    },
    sendGameByQrcode: function (_data) {
        var curTime = this.YouziDateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        var cb = function (res) {
            console.log('log event success---');
        };
        var param = {
            "logType": "showcode",
            "userType": this._userinfo.type,
            "channelId": this.channelId,
            "orgAppid": this.appid,
            "uid": this._userinfo.uid,
            "languageType": 1,
            "jumpAppid": _data.appid,
            "locationIndex": _data.locationIndex ? _data.locationIndex : BI_PAGE_TYPE.CUSTOM_COMPONENT,
            "recommendType": _data.type,
            "screenId": 1,
            "dt": curTime,
            "sdkVersion": this.SdkVersion
        };
        console.log(param);
        this.logNavigate(param, cb);
    },
    logNavigate: function (reqData, cb) {
        console.log('send log--->' + reqData);
        if (!this.debug) {
            this._request('POST', reqData, 'https://bi.log.lightlygame.com/recommend/', cb);
        }
    },
    YouziDateFtt: function (fmt, date) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    getDatasByBIType: function (locationIndex) {
        if (locationIndex == 1) {
            return this.mainRecDatas;
        }
        else if (locationIndex == 2) {
            return this.hotListDatas;
        }
        else if (locationIndex === 3 || locationIndex == 4) {
            return this.matrixBannerDatas;
        }
        else if (locationIndex === 5 || locationIndex === 10) {
            return this.moreDatas;
        }
        else if (locationIndex == 6) {
            return this.gameBannerDatas;
        }
        else if (locationIndex == 7) {
            return this.offlineBannerDatas;
        }
        else if (locationIndex == 8 || locationIndex == 9) {
            return this.buyListDatas;
        }
        console.error('未找到中心化数据 locationIndex', locationIndex);
        return [];
    },
    _initBannerShow: function () {
        if (this._bannerType == BANNER_TYPE.MATRIX || this._bannerType == BANNER_TYPE.GAME || this._bannerType == BANNER_TYPE.WX) {
            for (var i = 0; i < this._bannerSwitchs.length; i++) {
                var banner = this._bannerSwitchs[i];
                if (banner && banner.bannerType == this._bannerType) {
                    banner.showBanner();
                }
                else if (banner) {
                    banner.hideBanner();
                }
            }
        }
        else if (this._bannerType == BANNER_TYPE.SWITCH) {
            for (var i = 0; i < this._bannerSwitchs.length; i++) {
                var banner = this._bannerSwitchs[i];
                if (banner && banner.bannerType == BANNER_TYPE.MATRIX) {
                    banner.showBanner();
                }
                else if (banner) {
                    banner.hideBanner();
                }
            }
        }
    },
    /**
     *
     * @param nodesAmout 多主推节点数量
     *一、多主推节点数量大于等于服务器配置的多主推数量
     * 1、数量先以服务器配置的多主推数量为准进行 2、3判断
     * 2、如果多主推数量大于等于主推数组长度，则实际多主推数量为主推数组长度，且不进行切换
     * 3、如果多主推数量小于主推数组长度，则实际多主推数量为服务器配置的多主推数量，且进行切换
     * 二、多主推节点数量小于服务器配置的多主推数量
     * 1、数量先以多主推节点数量为准进行2、3判断
     * 2、如果多主推节点数量大于等于主推数组长度，则实际多主推数量为主推数组长度，且不进行切换
     * 3、如果多主推节点数量小于主推数组长度，则实际多主推数量为多主推节点数量，且进行切换
     * 返回数组[a,b];a实际多主推数量:number，b是否进行切换：boolean
     *
     */
    getMultiMainAmount: function (nodesAmout) {
        if (nodesAmout >= this._mainRecAmount) {
            return this._mainRecAmount >= this.mainRecDatas.length ? [this.mainRecDatas.length, false] : [this._mainRecAmount, true];
        }
        else {
            return nodesAmout >= this.mainRecDatas.length ? [this.mainRecDatas.length, false] : [nodesAmout, true];
        }
    },
    getGamesIndex: function (num, showNum) {
        if (this._gameIndexArr.length == 0) {
            this._gameIndexArrLength = num;
            for (var i = 0; i < num; i++) {
                this._gameIndexArr.push(i);
            }
        }
        else {
            if (num != this._gameIndexArrLength) {
                this._gameIndexArrLength = num;
                for (var i = 0; i < num; i++) {
                    this._gameIndexArr.push(i);
                }
            }
        }
        if (num <= showNum) {
            return this._gameIndexArr;
        }
        else {
            var t = void 0, k = void 0;
            while (num) {
                k = Math.floor(Math.random() * num--);
                t = this._gameIndexArr[num];
                this._gameIndexArr[num] = this._gameIndexArr[k];
                this._gameIndexArr[k] = t;
            }
            return this._gameIndexArr.slice(0, showNum);
        }
    },
    getRandomArrayElements: function (arr, count) {
        var m = arr.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = arr[m];
            arr[m] = arr[i];
            arr[i] = t;
        }
        return arr.slice(0, count);
    },
    addBanner: function (banner) {
        this._destroyUnuseWxBanner(banner);
        this._bannerSwitchs.push(banner);
        //如果banner是后续加入的 立刻刷新显示
        if (this._isDataLoaded) {
            this._initBannerShow();
        }
    },
    refreshBannerSwitch: function () {
        if (!this.curBannerType) {
            this.curBannerType = BANNER_TYPE.WX;
        }
        this.curBannerType = this.curBannerType == BANNER_TYPE.WX ? BANNER_TYPE.MATRIX : BANNER_TYPE.WX;
        for (var i = 0; i < this._bannerSwitchs.length; i++) {
            var banner = this._bannerSwitchs[i];
            if (banner && banner.bannerType == this.curBannerType) {
                banner.showBanner();
            }
            else if (banner) {
                banner.hideBanner();
            }
        }
    },
    /**
     * 微信banner 有且只有一个
     */
    _destroyUnuseWxBanner: function (b) {
        if (b.bannerType == BANNER_TYPE.WX) {
            for (var i = 0; i < this._bannerSwitchs.length; i++) {
                var banner = this._bannerSwitchs[i];
                if (banner && banner.bannerType == BANNER_TYPE.WX) {
                    banner.destroySelf();
                    this._bannerSwitchs.splice(i, 1);
                    return;
                }
            }
        }
    },
    _checkExposureInview: function (cellNodes, limitx, limity, datas, locationIndex) {
    },
    getDataByAppId: function (appid) {
        var data = this._getDataByAppid(this.mainRecDatas, appid);
        if (!data) {
            data = this._getDataByAppid(this.hotListDatas, appid);
        }
        if (!data) {
            data = this._getDataByAppid(this.buyListDatas, appid);
        }
        return data;
    },
    /**
     * 根据appid获取被推广游戏的信息
     * @param appid
     * @returns {*}
     */
    getDataFromAllGameObj: function (appid) {
        return this.allBeRecommendGames[appid];
    },
    _getDataByAppid: function (datas, appid) {
        for (var i = 0; i < datas.length; i++) {
            if (datas[i].appid == appid) {
                return datas[i];
            }
        }
        return null;
    },
    /**
     * 滚动列表滚动动画
     * @param {cc.ScrollView} scrollView
     * @param {number} speed 滚动速度 越小速度越快
     * @param {number} limit 少于该数量不滚动
     */
    scrollviewAction: function (scrollView, speed, limit) {
    },
    /**
     * 限定浮点数的最大最小值
     * @param valueNumber
     * @param minNumber
     * @param maxNumber
     */
    miscClampf: function (valueNumber, minNumber, maxNumber) {
        if (minNumber > maxNumber) {
            var temp = minNumber;
            minNumber = maxNumber;
            maxNumber = temp;
        }
        return valueNumber < minNumber ? minNumber : valueNumber < maxNumber ? valueNumber : maxNumber;
    },
    BI_AppOnce: function (params) {
        var BI = this.getBI();
        if (BI && BI.leuok) {
            BI.leuok.appOnce(params);
        }
    },
    BI_Action: function (params) {
        var BI = this.getBI();
        if (BI && BI.leuok) {
            BI.leuok.action(params);
        }
    },
    BI_WXBannerError: function (params) {
        var BI = this.getBI();
        if (BI && BI.leuok) {
            BI.leuok.error(params);
        }
    },
    getBI: function () {
        if (typeof Laya.Browser.window.wx !== 'undefined') {
            return Laya.Browser.window.wx;
        }
        else if (typeof Laya.Browser.window.BK !== 'undefined') {
            return Laya.Browser.window.BK;
        }
        else if (typeof Laya.Browser.window.qg !== 'undefined') {
            return Laya.Browser.window.qg;
        }
        else if (typeof window !== 'undefined') {
            return window;
        }
    }
};


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziFullMatrixScreen.ts":
/*!******************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziFullMatrixScreen.ts ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziFullMatrixScreen = /** @class */ (function (_super) {
    __extends(YouziFullMatrixScreen, _super);
    function YouziFullMatrixScreen() {
        var _this = _super.call(this) || this;
        _this.fullScreenData = [];
        _this.fullScreenExposure = {};
        _this.hw = 0;
        _this.breaki = 15;
        _this.curFront = true;
        _this.curBack = false;
        _this.stopAction = false;
        _this.isClick = false;
        _this.dur = 5000;
        _this.visible = false;
        _this.FullScreenUI.visible = false;
        // this.FullScreenList.scrollBar.hide = true;
        _this.scaleX = 0;
        _this.scaleY = 0;
        _this.pivotX = _this.width / 2;
        _this.pivotY = _this.height / 2;
        _this.FullScreenList.vScrollBarSkin = "";
        if (Laya.stage.width < Laya.stage.height) {
            _this.hw = Laya.Browser.height / Laya.Browser.width;
        }
        else {
            _this.hw = Laya.Browser.width / Laya.Browser.height;
        }
        if (_this.hw > 1.9) {
            //全面屏
            _this.height = 1500;
            _this.FullScreenUI.height = 1500;
            _this.FullScreenList.repeatX = 3;
            _this.FullScreenList.repeatY = 5;
            _this.FullScreenList.height = 1280;
            _this.pos(Laya.stage.width / 2, Laya.stage.height / 2 - 120);
            _this.breaki = 15;
        }
        else {
            _this.pos(Laya.stage.width / 2, Laya.stage.height / 2);
        }
        return _this;
    }
    YouziFullMatrixScreen.prototype.onEnable = function () {
        var screenDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (screenDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziFullMatrixScreen.prototype.initShow = function () {
        this.fullScreenData = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].fullMatrixScreenDatas;
        if (this.fullScreenData.length > 0) {
            this.dur = this.fullScreenData.length > 12 ? (this.fullScreenData.length - 12) * 5000 : 5000;
            this.closeFullScreen.on(Laya.Event.CLICK, this, this.onCloseFullScreen);
            var fullScreenListArr = [];
            for (var i = 0; i < this.fullScreenData.length; i++) {
                if (this.fullScreenData[i].dynamicType == 1 && this.fullScreenData[i].dynamicIcon) {
                    fullScreenListArr.push({ icon: "", namelab: this.fullScreenData[i].title });
                }
                else {
                    fullScreenListArr.push({ icon: this.fullScreenData[i].iconImg, namelab: this.fullScreenData[i].title });
                }
            }
            this.FullScreenList.array = fullScreenListArr;
            this.FullScreenList.mouseHandler = new Laya.Handler(this, this.onItemClick);
            this.FullScreenList.renderHandler = new Laya.Handler(this, this.onListRender);
        }
        else {
            console.log('全屏落地页无数据');
        }
    };
    YouziFullMatrixScreen.prototype.onListRender = function (box, index) {
        if (this.fullScreenData[index].hotred == 0) {
            var redhit = box.getChildByName("redhit");
            redhit.visible = false;
        }
        // console.log('======>index:'+index);
        var iconAnima = box.getChildByName("iconAnima");
        iconAnima.frames = [];
        if (this.fullScreenData[index].dynamicType == 1 && this.fullScreenData[index].dynamicIcon) {
            // console.log('======>index:'+index+",dynamicType:"+this.fullScreenData[index].dynamicType+",dynamicIcon:"+this.fullScreenData[index].dynamicIcon);
            iconAnima.scale(1.66, 1.66);
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.fullScreenData[index].dynamicIcon, 
            // iconAnima,
            function (anima) {
                // console.log('anima play index:'+index);
                iconAnima.frames = anima.frames;
                iconAnima.interval = anima.interval;
                iconAnima.play();
            });
        }
        this.checkSendExpsureLog(index);
    };
    YouziFullMatrixScreen.prototype.checkSendExpsureLog = function (index) {
        if (this.FullScreenUI.visible) {
            if (!this.fullScreenExposure[this.fullScreenData[index].appid]) {
                // console.log('---send log moregame index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.fullScreenData[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FULL_MATRIX_SCRENN);
                this.fullScreenExposure[this.fullScreenData[index].appid] = 1;
            }
        }
    };
    YouziFullMatrixScreen.prototype.showFullScreen = function () {
        if (this.fullScreenData.length <= 0) {
            console.log('全屏落地页无数据不展示');
            return;
        }
        if (this && this.parent) {
            this.zOrder = 999;
            this.visible = true;
            this.FullScreenUI.visible = true;
            Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.quadIn, Laya.Handler.create(this, this.showActionFinsh));
        }
    };
    YouziFullMatrixScreen.prototype.showActionFinsh = function () {
        this.checkExposure();
        this.starFullListAction();
    };
    YouziFullMatrixScreen.prototype.onCloseFullScreen = function () {
        this.stopFullListAcion();
        Laya.Tween.to(this, { scaleX: 0, scaleY: 0 }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, this.closeActionFinsh));
    };
    YouziFullMatrixScreen.prototype.closeActionFinsh = function () {
        this.zOrder = 0;
        this.visible = false;
        this.FullScreenUI.visible = false;
        this.fullScreenExposure = {};
    };
    YouziFullMatrixScreen.prototype.stopFullListAcion = function () {
        this.stopAction = true;
    };
    YouziFullMatrixScreen.prototype.starFullListAction = function () {
        this.fullScreenListAutoScroll();
    };
    YouziFullMatrixScreen.prototype.fullScreenListAutoScroll = function () {
        if (!this.FullScreenUI.visible)
            return;
        if (this.fullScreenData.length <= 15) {
            return;
        }
        this.stopAction = false;
        //当前是从前面开始向后，但是未到后面
        if (this.curFront && !this.curBack) {
            this.listTweenToEnd();
        }
        else if (!this.curFront && this.curBack) {
            this.listTweenToStart();
        }
    };
    YouziFullMatrixScreen.prototype.listTweenToEnd = function () {
        if (!this.stopAction) {
            var endCompletHandler = new Laya.Handler(this, this.listTweenToStart, null, true);
            this.FullScreenList.tweenTo(this.fullScreenData.length - 1, this.dur, endCompletHandler);
        }
        this.curFront = true;
        this.curBack = false;
    };
    YouziFullMatrixScreen.prototype.listTweenToStart = function () {
        if (!this.stopAction) {
            var startCompleteHandler = new Laya.Handler(this, this.listTweenToEnd, null, true);
            this.FullScreenList.tweenTo(0, this.dur, startCompleteHandler);
        }
        this.curFront = false;
        this.curBack = true;
    };
    YouziFullMatrixScreen.prototype.onItemClick = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            console.log("当前选择的全屏落地页索引：" + index);
            var tmpData = this.fullScreenData[index];
            tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FULL_MATRIX_SCRENN;
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, null);
            // if(tmpData.hotred == 1){
            //     var tmpSlideHit:Laya.Image = this.FullScreenList.getCell(index).getChildByName('redhit') as Laya.Image;
            //     tmpSlideHit.visible = false;
            //     this.fullScreenData[index].hotred = 0;
            // }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziFullMatrixScreen.prototype.checkExposure = function () {
        if (this.FullScreenUI.visible) {
            for (var i = 0; i < this.fullScreenData.length; i++) {
                var infoData = this.fullScreenData[i];
                if (!this.fullScreenExposure[infoData.appid]) {
                    this.fullScreenExposure[infoData.appid] = 1;
                    _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(infoData, _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FULL_MATRIX_SCRENN);
                }
                if (i >= this.breaki) {
                    break;
                }
            }
        }
    };
    return YouziFullMatrixScreen;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_FullScreenUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziFullMatrixScreen);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziFullMatrixScreenH.ts":
/*!*******************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziFullMatrixScreenH.ts ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziFullMatrixScreenH = /** @class */ (function (_super) {
    __extends(YouziFullMatrixScreenH, _super);
    function YouziFullMatrixScreenH() {
        var _this = _super.call(this) || this;
        _this.fullScreenData = [];
        _this.fullScreenExposure = {};
        _this.hw = 0;
        _this.breaki = 15;
        _this.curFront = true;
        _this.curBack = false;
        _this.stopAction = false;
        _this.isClick = false;
        _this.dur = 5000;
        _this.visible = false;
        _this.FullScreenUI.visible = false;
        // this.FullScreenList.scrollBar.hide = true;
        _this.scaleX = 0;
        _this.scaleY = 0;
        _this.pivotX = _this.width / 2;
        _this.pivotY = _this.height / 2;
        _this.FullScreenList.hScrollBarSkin = "";
        if (Laya.stage.width < Laya.stage.height) {
            _this.hw = Laya.Browser.height / Laya.Browser.width;
        }
        else {
            _this.hw = Laya.Browser.width / Laya.Browser.height;
        }
        if (_this.hw > 1.9) {
            //全面屏
            _this.width = 1500;
            _this.FullScreenUI.width = 1500;
            _this.FullScreenList.width = 1300;
            _this.FullScreenList.repeatX = 5;
            _this.pos(Laya.stage.width / 2 - 120, Laya.stage.height / 2);
            _this.breaki = 15;
        }
        else {
            _this.pos(Laya.stage.width / 2, Laya.stage.height / 2);
        }
        return _this;
    }
    YouziFullMatrixScreenH.prototype.onEnable = function () {
        var screenDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (screenDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziFullMatrixScreenH.prototype.initShow = function () {
        this.fullScreenData = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].fullMatrixScreenDatas;
        if (this.fullScreenData.length > 0) {
            this.dur = this.fullScreenData.length > 12 ? (this.fullScreenData.length - 12) * 5000 : 5000;
            this.closeFullScreen.on(Laya.Event.CLICK, this, this.onCloseFullScreen);
            var fullScreenListArr = [];
            for (var i = 0; i < this.fullScreenData.length; i++) {
                if (this.fullScreenData[i].dynamicType == 1 && this.fullScreenData[i].dynamicIcon) {
                    fullScreenListArr.push({ icon: "", namelab: this.fullScreenData[i].title });
                }
                else {
                    fullScreenListArr.push({ icon: this.fullScreenData[i].iconImg, namelab: this.fullScreenData[i].title });
                }
            }
            this.FullScreenList.array = fullScreenListArr;
            this.FullScreenList.mouseHandler = new Laya.Handler(this, this.onItemClick);
            this.FullScreenList.renderHandler = new Laya.Handler(this, this.onListRender);
        }
        else {
            console.log('全屏落地页无数据');
        }
    };
    YouziFullMatrixScreenH.prototype.onListRender = function (box, index) {
        if (this.fullScreenData[index].hotred == 0) {
            console.log('======>', index);
            var redhit = box.getChildByName("redhit");
            redhit.visible = false;
        }
        var iconAnima = box.getChildByName("iconAnima");
        //此处是为了解决动态调整list高度后，有些box的iconAnima会自动被之前的anima赋值导致显示出动画和图片的叠加
        iconAnima.frames = [];
        if (this.fullScreenData[index].dynamicType == 1 && this.fullScreenData[index].dynamicIcon) {
            iconAnima.scale(1.66, 1.66);
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.fullScreenData[index].dynamicIcon, 
            // iconAnima,
            function (anima) {
                iconAnima.frames = anima.frames;
                iconAnima.interval = anima.interval;
                iconAnima.play();
            });
        }
        this.checkSendExpsureLog(index);
    };
    YouziFullMatrixScreenH.prototype.checkSendExpsureLog = function (index) {
        if (this.FullScreenUI.visible) {
            if (!this.fullScreenExposure[this.fullScreenData[index].appid]) {
                // console.log('---send log moregame index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.fullScreenData[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FULL_MATRIX_SCRENN);
                this.fullScreenExposure[this.fullScreenData[index].appid] = 1;
            }
        }
    };
    YouziFullMatrixScreenH.prototype.showFullScreen = function () {
        if (this.fullScreenData.length <= 0) {
            console.log('全屏落地页无数据不展示');
            return;
        }
        if (this && this.parent) {
            this.zOrder = 999;
            this.visible = true;
            this.FullScreenUI.visible = true;
            Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.quadIn, Laya.Handler.create(this, this.showActionFinsh));
        }
    };
    YouziFullMatrixScreenH.prototype.showActionFinsh = function () {
        this.checkExposure();
        this.starFullListAction();
    };
    YouziFullMatrixScreenH.prototype.onCloseFullScreen = function () {
        this.stopFullListAcion();
        Laya.Tween.to(this, { scaleX: 0, scaleY: 0 }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, this.closeActionFinsh));
    };
    YouziFullMatrixScreenH.prototype.closeActionFinsh = function () {
        this.zOrder = 0;
        this.visible = false;
        this.FullScreenUI.visible = false;
        this.fullScreenExposure = {};
    };
    YouziFullMatrixScreenH.prototype.stopFullListAcion = function () {
        this.stopAction = true;
    };
    YouziFullMatrixScreenH.prototype.starFullListAction = function () {
        this.fullScreenListAutoScroll();
    };
    YouziFullMatrixScreenH.prototype.fullScreenListAutoScroll = function () {
        if (!this.FullScreenUI.visible)
            return;
        if (this.fullScreenData.length <= 15) {
            return;
        }
        this.stopAction = false;
        //当前是从前面开始向后，但是未到后面
        if (this.curFront && !this.curBack) {
            this.listTweenToEnd();
        }
        else if (!this.curFront && this.curBack) {
            this.listTweenToStart();
        }
    };
    YouziFullMatrixScreenH.prototype.listTweenToEnd = function () {
        if (!this.stopAction) {
            var endCompletHandler = new Laya.Handler(this, this.listTweenToStart, null, true);
            this.FullScreenList.tweenTo(this.fullScreenData.length - 1, this.dur, endCompletHandler);
        }
        this.curFront = true;
        this.curBack = false;
    };
    YouziFullMatrixScreenH.prototype.listTweenToStart = function () {
        if (!this.stopAction) {
            var startCompleteHandler = new Laya.Handler(this, this.listTweenToEnd, null, true);
            this.FullScreenList.tweenTo(0, this.dur, startCompleteHandler);
        }
        this.curFront = false;
        this.curBack = true;
    };
    YouziFullMatrixScreenH.prototype.onItemClick = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            console.log("当前选择的全屏落地页索引：" + index);
            var tmpData = this.fullScreenData[index];
            tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FULL_MATRIX_SCRENN;
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, null);
            // if(tmpData.hotred == 1){
            //     var tmpSlideHit:Laya.Image = this.FullScreenList.getCell(index).getChildByName('redhit') as Laya.Image;
            //     tmpSlideHit.visible = false;
            //     this.fullScreenData[index].hotred = 0;
            // }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziFullMatrixScreenH.prototype.checkExposure = function () {
        if (this.FullScreenUI.visible) {
            for (var i = 0; i < this.fullScreenData.length; i++) {
                var infoData = this.fullScreenData[i];
                if (!this.fullScreenExposure[infoData.appid]) {
                    this.fullScreenExposure[infoData.appid] = 1;
                    _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(infoData, _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FULL_MATRIX_SCRENN);
                }
                if (i >= this.breaki) {
                    break;
                }
            }
        }
    };
    return YouziFullMatrixScreenH;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_FullScreenHUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziFullMatrixScreenH);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziGameBanner.ts":
/*!************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziGameBanner.ts ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * 底部游戏banner推荐，类似于微信banner广告
 */
var YouziGameBanner = /** @class */ (function (_super) {
    __extends(YouziGameBanner, _super);
    function YouziGameBanner(isOffSwitch, switchTime) {
        var _this = _super.call(this) || this;
        _this.isOffSwitch = false;
        _this.bannerType = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BANNER_TYPE"].GAME;
        _this.switchTime = 5;
        _this.gameBannerItemExposure = {};
        _this.startSwitchIndex = 0;
        _this.isHide = false;
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        _this.pos(Laya.stage.width / 2 - _this.GameBannerList.width / 2, Laya.stage.height - _this.GameBannerList.height);
        _this.visible = false;
        _this.GameBannerList.scrollBar.hide = true;
        _this.isOffSwitch = isOffSwitch;
        _this.switchTime = switchTime < 5 ? 5 : switchTime;
        _this.switchTime *= 1000;
        return _this;
    }
    YouziGameBanner.prototype.setYouziPosition = function (x, y) {
        this.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziGameBanner.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziGameBanner.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziGameBanner.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziGameBanner.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziGameBanner.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziGameBanner.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziGameBanner.prototype.onEnable = function () {
        var gameBannerDatasOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (gameBannerDatasOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziGameBanner.prototype.initShow = function () {
        if (_YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].gameBannerDatas.length <= 0)
            return;
        this.loadGameBannerList();
        this.creatGameBannerTimerLoop();
        if (!this.isOffSwitch) {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].addBanner(this);
        }
    };
    YouziGameBanner.prototype.loadGameBannerList = function () {
        this.GameBannerList.repeatX = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].gameBannerDatas.length;
        var gameBannerArr = [];
        for (var gameBannerArrI = 0; gameBannerArrI < _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].gameBannerDatas.length; gameBannerArrI++) {
            gameBannerArr.push({ infoData: _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].gameBannerDatas[gameBannerArrI] });
        }
        this.GameBannerList.mouseHandler = new Laya.Handler(this, this.onGameBannerItemMouseEvent);
        this.GameBannerList.dataSource = gameBannerArr;
        for (var gameBannerDataI = 0; gameBannerArrI < _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].gameBannerDatas.length; gameBannerDataI++) {
            var gameBannerImage = this.GameBannerList.getCell(gameBannerDataI).getChildByName('icon');
            gameBannerImage.loadImage(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].gameBannerDatas[gameBannerDataI].bannerImg);
        }
        this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_GameBanner, { complete: true });
    };
    YouziGameBanner.prototype.creatGameBannerTimerLoop = function () {
        Laya.timer.loop(this.switchTime, this, this.updateGameBaner);
    };
    YouziGameBanner.prototype.clearGameBannerTimerLoop = function () {
        Laya.timer.clear(this, this.updateGameBaner);
    };
    YouziGameBanner.prototype.updateGameBaner = function (e) {
        if (_YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].gameBannerDatas.length <= 1) {
            this.checkExposure();
            return;
        }
        else {
            this.startSwitchIndex = this.GameBannerList.startIndex + 1;
            this.GameBannerList.scrollTo(this.startSwitchIndex >= this.GameBannerList.length ? 0 : this.startSwitchIndex);
            this.checkExposure();
        }
    };
    YouziGameBanner.prototype.checkExposure = function () {
        if (this.visible) {
            var data = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].gameBannerDatas[this.startSwitchIndex];
            if (!this.gameBannerItemExposure[data.appid]) {
                this.gameBannerItemExposure[data.appid] = 1;
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(data, _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].GAME);
            }
        }
    };
    YouziGameBanner.prototype.onGameBannerItemMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            console.log("当前选择的gamebannerlist索引：" + index);
            var tmpData = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].gameBannerDatas[index];
            tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].GAME;
            tmpData.type = 5;
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, null);
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziGameBanner.prototype.showBanner = function () {
        if (this) {
            this.visible = true;
            if (this.isHide) {
                this.isHide = false;
                this.creatGameBannerTimerLoop();
            }
            this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_GameBanner, { uiVisible: true });
        }
    };
    YouziGameBanner.prototype.hideBanner = function () {
        if (this) {
            this.isHide = true;
            this.visible = false;
            this.clearGameBannerTimerLoop();
            this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_GameBanner, { uiVisible: false });
        }
    };
    YouziGameBanner.prototype.destroySelf = function () {
        if (this) {
            this.removeSelf();
        }
    };
    return YouziGameBanner;
}(_UI__WEBPACK_IMPORTED_MODULE_1__["Youzi_GameBannerViewUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziGameBanner);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziGuessLike.ts":
/*!***********************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziGuessLike.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziGuessLike = /** @class */ (function (_super) {
    __extends(YouziGuessLike, _super);
    function YouziGuessLike() {
        var _this = _super.call(this) || this;
        _this.matrixBannerDatas = [];
        _this.guessAnyItemExposure = {};
        _this.firstShow = false;
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        _this.curFront = true;
        _this.curBack = false;
        _this.stopAction = false;
        _this.isClick = false;
        _this.dur = 5000;
        _this.visible = false;
        _this.guessUI.visible = false;
        _this.guesslist.scrollBar.hide = true;
        return _this;
    }
    YouziGuessLike.prototype.setYouziPosition = function (x, y) {
        this.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziGuessLike.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziGuessLike.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziGuessLike.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziGuessLike.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziGuessLike.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziGuessLike.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziGuessLike.prototype.onEnable = function () {
        var guessLikeDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (guessLikeDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    // showGuessLikeView(){
    //     if(!this.firstShow){
    //         this.firstShow = true;
    //         this.checkExposure();
    //     }
    //     this.visible = true;
    //     this.guessUI.visible = true;
    //     this.guessAnylistAutoScroll();
    // }
    // hideGuessLikeView(){
    //     this.visible = false;
    //     this.guessUI.visible = false;
    // }
    YouziGuessLike.prototype.initShow = function () {
        this.matrixBannerDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].matrixBannerDatas;
        if (this.matrixBannerDatas.length <= 0) {
            return;
        }
        var arr = [];
        var pRecord = null;
        for (var i = 0; i < this.matrixBannerDatas.length; i++) {
            pRecord = this.matrixBannerDatas[i];
            if (pRecord.dynamicType == 1 && pRecord.dynamicIcon) {
                arr.push({ icon: "", namelab: pRecord.title });
            }
            else {
                arr.push({ icon: pRecord.iconImg, namelab: pRecord.title });
            }
        }
        this.guesslist.dataSource = arr;
        this.guesslist.mouseHandler = new Laya.Handler(this, this.onGuessLikeItemMouseEvent);
        this.guesslist.renderHandler = new Laya.Handler(this, this.onListRender);
        this.visible = true;
        this.guessUI.visible = true;
        this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_GuessLike, { complete: true });
        this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_GuessLike, { uiVisible: true });
        this.dur = this.matrixBannerDatas.length > 5 ? (this.matrixBannerDatas.length - 5) * 5000 : 5000;
        this.starGuessLikeAction();
    };
    YouziGuessLike.prototype.onListRender = function (item, index) {
        // console.log('------->render guesslike : ',index);
        // var icon : Laya.Image = item.getChildByName('icon') as Laya.Image;
        // icon.loadImage(this.matrixBannerDatas[index].iconImg);
        if (this.matrixBannerDatas[index].dynamicType == 1 && this.matrixBannerDatas[index].dynamicIcon) {
            var imgAnima = item.getChildByName('iconAnima');
            imgAnima.scale(0.75, 0.75);
            imgAnima.visible = true;
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.matrixBannerDatas[index].dynamicIcon, 
            // imgAnima,
            function (anima) {
                imgAnima.frames = anima.frames;
                imgAnima.interval = anima.interval;
                imgAnima.play();
            });
        }
        this.checkSendExpsureLog(index);
    };
    YouziGuessLike.prototype.checkSendExpsureLog = function (index) {
        if (this.visible && this.guessUI.visible) {
            if (!this.guessAnyItemExposure[this.matrixBannerDatas[index].appid]) {
                // console.log('---send log index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.matrixBannerDatas[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].GUESS);
                this.guessAnyItemExposure[this.matrixBannerDatas[index].appid] = 1;
            }
        }
    };
    YouziGuessLike.prototype.stopGuessLikeAcion = function () {
        this.stopAction = true;
    };
    YouziGuessLike.prototype.starGuessLikeAction = function () {
        this.guessAnylistAutoScroll();
    };
    YouziGuessLike.prototype.guessAnylistAutoScroll = function () {
        if (!this.guessUI.visible)
            return;
        if (this.matrixBannerDatas.length <= 5) {
            return;
        }
        this.stopAction = false;
        //当前是从前面开始向后，但是未到后面
        if (this.curFront && !this.curBack) {
            this.listTweenToEnd();
        }
        else if (!this.curFront && this.curBack) {
            this.listTweenToStart();
        }
    };
    YouziGuessLike.prototype.listTweenToEnd = function () {
        if (!this.stopAction) {
            var endCompletHandler = new Laya.Handler(this, this.listTweenToStart, null, true);
            this.guesslist.tweenTo(this.matrixBannerDatas.length - 1, this.dur, endCompletHandler);
        }
        this.curFront = true;
        this.curBack = false;
    };
    YouziGuessLike.prototype.listTweenToStart = function () {
        if (!this.stopAction) {
            var startCompleteHandler = new Laya.Handler(this, this.listTweenToEnd, null, true);
            this.guesslist.tweenTo(0, this.dur, startCompleteHandler);
        }
        this.curFront = false;
        this.curBack = true;
    };
    YouziGuessLike.prototype.onGuessLikeItemMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            if (!this.isClick) {
                this.isClick = true;
                console.log("当前选择的guesslike索引：" + index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].clickGameYouziUIId = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_GuessLike;
                var tmpData = this.matrixBannerDatas[index];
                tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].GUESS;
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, this.startOtherCall.bind(this));
            }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziGuessLike.prototype.startOtherCall = function (state) {
        this.isClick = false;
        this.starGuessLikeAction();
    };
    return YouziGuessLike;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_GuessLikeUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziGuessLike);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziGuessLikeH.ts":
/*!************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziGuessLikeH.ts ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziGuessLikeH = /** @class */ (function (_super) {
    __extends(YouziGuessLikeH, _super);
    function YouziGuessLikeH() {
        var _this = _super.call(this) || this;
        _this.matrixBannerDatas = [];
        _this.guessAnyItemExposure = {};
        _this.firstShow = false;
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        _this.curFront = true;
        _this.curBack = false;
        _this.stopAction = false;
        _this.isClick = false;
        _this.dur = 5000;
        _this.visible = false;
        _this.guessUI.visible = false;
        _this.guesslist.scrollBar.hide = true;
        return _this;
    }
    YouziGuessLikeH.prototype.setYouziPosition = function (x, y) {
        this.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziGuessLikeH.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziGuessLikeH.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziGuessLikeH.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziGuessLikeH.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziGuessLikeH.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziGuessLikeH.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziGuessLikeH.prototype.onEnable = function () {
        var guessLikeDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (guessLikeDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    // showGuessLikeView(){
    //     if(!this.firstShow){
    //         this.firstShow = true;
    //         this.checkExposure();
    //     }
    //     this.visible = true;
    //     this.guessUI.visible = true;
    //     this.guessAnylistAutoScroll();
    // }
    // hideGuessLikeView(){
    //     this.visible = false;
    //     this.guessUI.visible = false;
    // }
    YouziGuessLikeH.prototype.initShow = function () {
        this.matrixBannerDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].matrixBannerDatas;
        var arr = [];
        var pRecord = null;
        for (var i = 0; i < this.matrixBannerDatas.length; i++) {
            pRecord = this.matrixBannerDatas[i];
            if (pRecord.dynamicType == 1 && pRecord.dynamicIcon) {
                arr.push({ icon: "", namelab: pRecord.title });
            }
            else {
                arr.push({ icon: pRecord.iconImg, namelab: pRecord.title });
            }
        }
        this.guesslist.array = arr;
        this.guesslist.renderHandler = new Laya.Handler(this, this.onListRender);
        this.guesslist.mouseHandler = new Laya.Handler(this, this.onGuessLikeItemMouseEvent);
        this.visible = true;
        this.guessUI.visible = true;
        this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_GuessLikeH, { complete: true });
        this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_GuessLikeH, { uiVisible: true });
        this.dur = this.matrixBannerDatas.length > 5 ? (this.matrixBannerDatas.length - 5) * 5000 : 5000;
        this.guessAnylistHAutoScroll();
    };
    YouziGuessLikeH.prototype.onListRender = function (item, index) {
        // console.log('------->render guesslikeh : ',index);
        // var icon : Laya.Image = item.getChildByName('icon') as Laya.Image;
        // icon.loadImage(this.matrixBannerDatas[index].iconImg);
        if (this.matrixBannerDatas[index].dynamicType == 1 && this.matrixBannerDatas[index].dynamicIcon) {
            var imgAnima = item.getChildByName('iconAnima');
            imgAnima.scale(0.75, 0.75);
            imgAnima.visible = true;
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.matrixBannerDatas[index].dynamicIcon, 
            // imgAnima,
            function (anima) {
                imgAnima.frames = anima.frames;
                imgAnima.interval = anima.interval;
                imgAnima.play();
            });
        }
        this.checkSendExpsureLog(index);
    };
    YouziGuessLikeH.prototype.checkSendExpsureLog = function (index) {
        if (this.visible && this.guessUI.visible) {
            if (!this.guessAnyItemExposure[this.matrixBannerDatas[index].appid]) {
                // console.log('---send log index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.matrixBannerDatas[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].GUESS);
                this.guessAnyItemExposure[this.matrixBannerDatas[index].appid] = 1;
            }
        }
    };
    YouziGuessLikeH.prototype.stopGuessLikeHAcion = function () {
        this.stopAction = true;
    };
    YouziGuessLikeH.prototype.starGuessLikeHAction = function () {
        this.guessAnylistHAutoScroll();
    };
    YouziGuessLikeH.prototype.guessAnylistHAutoScroll = function () {
        if (!this.guessUI.visible)
            return;
        if (this.matrixBannerDatas.length <= 5) {
            return;
        }
        this.stopAction = false;
        //当前是从前面开始向后，但是未到后面
        if (this.curFront && !this.curBack) {
            this.listTweenToEnd();
        }
        else if (!this.curFront && this.curBack) {
            this.listTweenToStart();
        }
    };
    YouziGuessLikeH.prototype.listTweenToEnd = function () {
        if (!this.stopAction) {
            this.curFront = true;
            this.curBack = false;
            var endCompletHandler = new Laya.Handler(this, this.listTweenToStart, null, true);
            this.guesslist.tweenTo(this.matrixBannerDatas.length - 1, this.dur, endCompletHandler);
        }
    };
    YouziGuessLikeH.prototype.listTweenToStart = function () {
        if (!this.stopAction) {
            this.curFront = false;
            this.curBack = true;
            var startCompleteHandler = new Laya.Handler(this, this.listTweenToEnd, null, true);
            this.guesslist.tweenTo(0, this.dur, startCompleteHandler);
        }
    };
    YouziGuessLikeH.prototype.onGuessLikeItemMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            if (!this.isClick) {
                this.isClick = true;
                console.log("当前选择的guesslikeh索引：" + index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].clickGameYouziUIId = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_GuessLikeH;
                var tmpData = this.matrixBannerDatas[index];
                tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].GUESS;
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, this.startOtherCall.bind(this));
            }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziGuessLikeH.prototype.startOtherCall = function (state) {
        this.isClick = false;
        this.starGuessLikeHAction();
    };
    return YouziGuessLikeH;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_GuessLikeHUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziGuessLikeH);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziMainPush.ts":
/*!**********************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziMainPush.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziMainPush = /** @class */ (function (_super) {
    __extends(YouziMainPush, _super);
    function YouziMainPush() {
        var _this = _super.call(this) || this;
        _this.mainRecDatas = [];
        _this.mainRecItemExposure = {};
        _this.angel = 0;
        _this.curMainRecIdx = 0;
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        _this.leftTween = null;
        _this.rightTween = null;
        _this.startTimer = true;
        _this.visible = false;
        _this.btnMainRecBg.visible = false;
        return _this;
    }
    YouziMainPush.prototype.setYouziPosition = function (x, y) {
        this.centerX = NaN;
        this.centerY = NaN;
        this.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziMainPush.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziMainPush.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziMainPush.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziMainPush.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziMainPush.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziMainPush.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziMainPush.prototype.onEnable = function () {
        var isMainDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (isMainDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziMainPush.prototype.initShow = function () {
        this.mainRecDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].mainRecDatas;
        if (this.mainRecDatas.length > 0) {
            this.btnMainRec.on(Laya.Event.CLICK, this, this.onBtnMainRecClicked);
            this.visible = true;
            this.btnMainRecBg.visible = true;
            this.btnMainRecBg.rotation = 10;
            this.addMainAnimaOrImage();
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.mainRecDatas[0], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MAIN);
            this.mainRecItemExposure[this.mainRecDatas[0].appid] = 1;
            this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_MainPush, { complete: true });
            this.startTimerLoop();
        }
    };
    YouziMainPush.prototype.startTimerLoop = function () {
        if (this.startTimer) {
            this.startTimer = false;
            if (this.mainRecDatas.length > 1) {
                Laya.timer.loop(5000, this, this.updateMainRec);
            }
            this.mainPushRotationAction();
        }
    };
    YouziMainPush.prototype.clearTimerLoop = function () {
        //清除计时器后，旋转角度变回10
        this.btnMainRecBg.rotation = 10;
        this.startTimer = true;
        if (this.mainRecDatas.length > 1) {
            Laya.timer.clear(this, this.updateMainRec);
        }
        if (this.leftTween) {
            Laya.Tween.clear(this.leftTween);
        }
        if (this.rightTween) {
            Laya.Tween.clear(this.rightTween);
        }
    };
    /**
     * 主推动画
     * 1、默认角度是10
     * 2、向右转到-10
     * 3、完成之后向左转到10
     * 4、重复2、3
     */
    YouziMainPush.prototype.mainPushRotationAction = function () {
        this.rotatotionRight();
    };
    //向右边旋转
    YouziMainPush.prototype.rotatotionRight = function () {
        this.rightTween = Laya.Tween.to(this.btnMainRecBg, { rotation: -10 }, 2000, null, new Laya.Handler(this, this.rotationLeft));
    };
    //像左边旋转
    YouziMainPush.prototype.rotationLeft = function (actionCompleteCall) {
        this.leftTween = Laya.Tween.to(this.btnMainRecBg, { rotation: 10 }, 2000, null, new Laya.Handler(this, this.rotatotionRight));
    };
    YouziMainPush.prototype.updateMainRec = function () {
        this.curMainRecIdx = this.curMainRecIdx + 1 >= this.mainRecDatas.length ? 0 : this.curMainRecIdx + 1;
        this.btnMainRec.graphics.clear(true);
        // this.btnMainRec.loadImage(this.mainRecDatas[this.curMainRecIdx].iconImg);
        this.addMainAnimaOrImage();
        this.slogan.text = this.mainRecDatas[this.curMainRecIdx].slogan;
        if (!this.mainRecItemExposure[this.mainRecDatas[this.curMainRecIdx].appid]) {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.mainRecDatas[this.curMainRecIdx], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MAIN);
            this.mainRecItemExposure[this.mainRecDatas[this.curMainRecIdx].appid] = 1;
        }
    };
    YouziMainPush.prototype.addMainAnimaOrImage = function () {
        if (this.mainRecDatas[this.curMainRecIdx].dynamicType == 1 && this.mainRecDatas[this.curMainRecIdx].dynamicIcon) {
            var mainSelf = this;
            this.mainAnima.scale(0.75, 0.75);
            var mainYouziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            mainYouziAnima.createAnimation(this.mainRecDatas[this.curMainRecIdx].dynamicIcon, 
            // this.mainAnima,
            function (anima) {
                mainSelf.mainAnima.frames = anima.frames;
                mainSelf.mainAnima.interval = anima.interval;
                mainSelf.mainAnima.visible = true;
                mainSelf.mainAnima.play();
            });
        }
        else {
            this.btnMainRec.loadImage(this.mainRecDatas[this.curMainRecIdx].iconImg);
        }
        this.slogan.text = this.mainRecDatas[this.curMainRecIdx].slogan;
    };
    YouziMainPush.prototype.onBtnMainRecClicked = function () {
        _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].clickGameYouziUIId = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_MainPush;
        var tmpData = this.mainRecDatas[this.curMainRecIdx];
        tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MAIN;
        _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, null);
        this.updateMainRec();
    };
    return YouziMainPush;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_MainPushUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziMainPush);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziMoreGame.ts":
/*!**********************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziMoreGame.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziMoreGame = /** @class */ (function (_super) {
    __extends(YouziMoreGame, _super);
    function YouziMoreGame() {
        var _this = _super.call(this) || this;
        _this.morelistDatas = [];
        _this.mainItemExposure = {};
        _this.fisrtShow = false;
        _this.isCreate = false;
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        _this.curFront = true;
        _this.curBack = false;
        _this.stopAction = false;
        _this.isClick = false;
        _this.dur = 5000;
        _this.centerX = 0;
        _this.centerY = 0;
        _this.visible = false;
        _this.MoreGameUI.visible = false;
        _this.moreGameList.scrollBar.hide = true;
        return _this;
    }
    YouziMoreGame.prototype.setYouziPosition = function (x, y) {
        this.centerX = NaN;
        this.centerY = NaN;
        this.MoreGameUI.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziMoreGame.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziMoreGame.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziMoreGame.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziMoreGame.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziMoreGame.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziMoreGame.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziMoreGame.prototype.onEnable = function () {
        var isMoreGameOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (isMoreGameOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziMoreGame.prototype.showMoreGameUI = function () {
        if (this.isCreate && !this.visible) {
            this.visible = true;
            this.moreGameList.mouseThrough = false;
            this.MoreGameUI.visible = true;
            this.starMoreGameAction();
            this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_MoreGame, { uiVisible: true });
            // if(!this.fisrtShow){
            //     this.fisrtShow = true;
            this.checkExposure();
            // }
        }
    };
    YouziMoreGame.prototype.onBtnCloseClicked = function () {
        this.stopMoreGameAcion();
        this.visible = false;
        this.moreGameList.mouseThrough = true;
        this.MoreGameUI.visible = false;
        this.mainItemExposure = {};
        this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_MoreGame, { uiVisible: false });
    };
    YouziMoreGame.prototype.initShow = function () {
        this.moreGameCloseBtn.on(Laya.Event.CLICK, this, this.onBtnCloseClicked);
        if (_YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].moreDatas.length > 0) {
            this.morelistDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].moreDatas;
            var arr = [];
            var pRecord = null;
            for (var i = 0; i < this.morelistDatas.length; i++) {
                pRecord = this.morelistDatas[i];
                if (pRecord.dynamicType == 1 && pRecord.dynamicIcon) {
                    arr.push({ icon: "", namelab: pRecord.title });
                }
                else {
                    arr.push({ icon: pRecord.iconImg, namelab: pRecord.title });
                }
            }
            this.moreGameList.array = arr;
            this.moreGameList.renderHandler = new Laya.Handler(this, this.onListRender);
            this.moreGameList.mouseHandler = new Laya.Handler(this, this.moreGameListMouseEvent);
            this.isCreate = true;
            this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_MoreGame, { complete: true });
            this.dur = this.morelistDatas.length > 12 ? (this.morelistDatas.length - 12) * 5000 : 5000;
        }
    };
    YouziMoreGame.prototype.onListRender = function (item, index) {
        // if(index < this.morelistDatas.length)
        // {
        // console.log('render moregame index:',index);
        if (this.morelistDatas[index].dynamicType == 1 && this.morelistDatas[index].dynamicIcon) {
            var imgAnima = item.getChildByName('iconAnima');
            imgAnima.scale(1.16, 1.16);
            imgAnima.visible = true;
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.morelistDatas[index].dynamicIcon, 
            // imgAnima,
            function (anima) {
                imgAnima.frames = anima.frames;
                imgAnima.interval = anima.interval;
                imgAnima.play();
            });
        }
        // var imgIcon = item.getChildByName('icon') as Laya.Image;
        // imgIcon.loadImage(this.morelistDatas[index].iconImg);
        // var label = item.getChildByName('namelab') as Laya.Label;
        // label.text = this.morelistDatas[index].title;
        this.checkSendExpsureLog(index);
        // }
    };
    YouziMoreGame.prototype.checkSendExpsureLog = function (index) {
        if (this.visible && this.MoreGameUI.visible) {
            if (!this.mainItemExposure[this.morelistDatas[index].appid]) {
                // console.log('---send log moregame index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.morelistDatas[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MORE);
                this.mainItemExposure[this.morelistDatas[index].appid] = 1;
            }
        }
    };
    YouziMoreGame.prototype.stopMoreGameAcion = function () {
        this.stopAction = true;
    };
    YouziMoreGame.prototype.starMoreGameAction = function () {
        this.moreGameListAutoScroll();
    };
    YouziMoreGame.prototype.moreGameListAutoScroll = function () {
        if (!this.MoreGameUI.visible)
            return;
        if (this.morelistDatas.length <= 12) {
            return;
        }
        this.stopAction = false;
        //当前是从前面开始向后，但是未到后面
        if (this.curFront && !this.curBack) {
            this.listTweenToEnd();
        }
        else if (!this.curFront && this.curBack) {
            this.listTweenToStart();
        }
    };
    YouziMoreGame.prototype.listTweenToEnd = function () {
        if (!this.stopAction) {
            var endCompletHandler = new Laya.Handler(this, this.listTweenToStart, null, true);
            this.moreGameList.tweenTo(this.morelistDatas.length - 1, this.dur, endCompletHandler);
        }
        this.curFront = true;
        this.curBack = false;
    };
    YouziMoreGame.prototype.listTweenToStart = function () {
        if (!this.stopAction) {
            var startCompleteHandler = new Laya.Handler(this, this.listTweenToEnd, null, true);
            this.moreGameList.tweenTo(0, this.dur, startCompleteHandler);
        }
        this.curFront = false;
        this.curBack = true;
    };
    YouziMoreGame.prototype.moreGameListMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
            // if(type == 1 || type ==2){
            //     this.mouseClickChange = true;
            // }
        }
        else if (e.type == 'mouseup') {
            if (!this.isClick) {
                this.isClick = true;
                console.log("当前选择的更多游戏索引：" + index);
                var tmpData = this.morelistDatas[index];
                tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MORE;
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, this.startOtherCall.bind(this));
                // var curTime = YouziData.YouziDateFtt("yyyyMMdd",new Date());
                // localStorage.setItem(tmpData.appid, curTime);
            }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziMoreGame.prototype.startOtherCall = function () {
        this.isClick = false;
        this.starMoreGameAction();
    };
    YouziMoreGame.prototype.checkExposure = function () {
        if (this.MoreGameUI.visible) {
            for (var i = 0; i < this.morelistDatas.length; i++) {
                var infoData = this.morelistDatas[i];
                if (!this.mainItemExposure[infoData.appid]) {
                    this.mainItemExposure[infoData.appid] = 1;
                    _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(infoData, _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MORE);
                }
                if (i >= 11) {
                    break;
                }
            }
        }
    };
    return YouziMoreGame;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_MoreGameUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziMoreGame);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziMoreGameH.ts":
/*!***********************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziMoreGameH.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziMoreGameH = /** @class */ (function (_super) {
    __extends(YouziMoreGameH, _super);
    function YouziMoreGameH() {
        var _this = _super.call(this) || this;
        _this.morelistHDatas = [];
        _this.mainItemHExposure = {};
        _this.fisrtShow = false;
        _this.isCreate = false;
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        _this.curFront = true;
        _this.curBack = false;
        _this.stopAction = false;
        _this.isClick = false;
        _this.dur = 5000;
        if (Laya.stage.width / Laya.stage.height >= 1.9) {
            _this.MoreGameUI.scale(0.9, 0.9);
            var scaleW = _this.MoreGameUI.width * 0.9;
            var scaleH = _this.MoreGameUI.height * 0.9;
            _this.MoreGameUI.pos(Laya.stage.width / 2 - scaleW / 2, Laya.stage.height / 2 - scaleH / 2);
        }
        else {
            _this.centerX = 0;
            _this.centerY = 0;
        }
        _this.visible = false;
        _this.MoreGameUI.visible = false;
        _this.moreGameList.scrollBar.hide = true;
        return _this;
    }
    YouziMoreGameH.prototype.setYouziPosition = function (x, y) {
        this.centerX = NaN;
        this.centerY = NaN;
        this.MoreGameUI.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziMoreGameH.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziMoreGameH.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziMoreGameH.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziMoreGameH.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziMoreGameH.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziMoreGameH.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziMoreGameH.prototype.onEnable = function () {
        var isMoreGameOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (isMoreGameOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziMoreGameH.prototype.showMoreGameUI = function () {
        if (this.isCreate && !this.visible) {
            this.visible = true;
            this.moreGameList.mouseThrough = false;
            this.MoreGameUI.visible = true;
            this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_MoreGameH, { uiVisible: true });
            this.starMoreGameAction();
            if (!this.fisrtShow) {
                this.fisrtShow = true;
                this.checkExposure();
            }
        }
    };
    YouziMoreGameH.prototype.onBtnCloseClicked = function () {
        this.stopMoreGameAcion();
        this.visible = false;
        this.moreGameList.mouseThrough = true;
        this.MoreGameUI.visible = false;
        this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_MoreGameH, { uiVisible: false });
    };
    YouziMoreGameH.prototype.initShow = function () {
        this.moreGameCloseBtn.on(Laya.Event.CLICK, this, this.onBtnCloseClicked);
        if (_YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].moreDatas.length > 0) {
            this.morelistHDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].moreDatas;
            var arr = [];
            var pRecord = null;
            for (var i = 0; i < this.morelistHDatas.length; i++) {
                pRecord = this.morelistHDatas[i];
                if (pRecord.dynamicType == 1 && pRecord.dynamicIcon) {
                    arr.push({ icon: "", namelab: pRecord.title });
                }
                else {
                    arr.push({ icon: pRecord.iconImg, namelab: pRecord.title });
                }
            }
            this.moreGameList.array = arr;
            this.moreGameList.renderHandler = new Laya.Handler(this, this.onListRender);
            this.moreGameList.mouseHandler = new Laya.Handler(this, this.moreGameListMouseEvent);
            this.isCreate = true;
            this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_MoreGameH, { complete: true });
            this.dur = this.morelistHDatas.length > 12 ? (this.morelistHDatas.length - 12) * 5000 : 5000;
        }
    };
    YouziMoreGameH.prototype.onListRender = function (item, index) {
        // var icon : Laya.Image = item.getChildByName('icon') as Laya.Image;
        // icon.loadImage(this.morelistDatas[index].iconImg);
        if (this.morelistHDatas[index].dynamicType == 1 && this.morelistHDatas[index].dynamicIcon) {
            var imgAnima = item.getChildByName('iconAnima');
            imgAnima.scale(1.16, 1.16);
            imgAnima.visible = true;
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.morelistHDatas[index].dynamicIcon, 
            // imgAnima,
            function (anima) {
                imgAnima.frames = anima.frames;
                imgAnima.interval = anima.interval;
                imgAnima.play();
            });
        }
        this.checkSendExpsureLog(index);
    };
    YouziMoreGameH.prototype.checkSendExpsureLog = function (index) {
        if (this.visible && this.MoreGameUI.visible) {
            if (!this.mainItemHExposure[this.morelistHDatas[index].appid]) {
                // console.log('---send log moregame index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.morelistHDatas[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MORE);
                this.mainItemHExposure[this.morelistHDatas[index].appid] = 1;
            }
        }
    };
    YouziMoreGameH.prototype.stopMoreGameAcion = function () {
        this.stopAction = true;
    };
    YouziMoreGameH.prototype.starMoreGameAction = function () {
        this.moreGameListAutoScroll();
    };
    YouziMoreGameH.prototype.moreGameListAutoScroll = function () {
        if (!this.MoreGameUI.visible)
            return;
        if (this.morelistHDatas.length <= 12) {
            return;
        }
        this.stopAction = false;
        this.dur = (this.morelistHDatas.length - 12) * 5000;
        //当前是从前面开始向后，但是未到后面
        if (this.curFront && !this.curBack) {
            this.listTweenToEnd();
        }
        else if (!this.curFront && this.curBack) {
            this.listTweenToStart();
        }
    };
    YouziMoreGameH.prototype.listTweenToEnd = function () {
        if (!this.stopAction) {
            var endCompletHandler = new Laya.Handler(this, this.listTweenToStart, null, true);
            this.moreGameList.tweenTo(this.morelistHDatas.length - 1, this.dur, endCompletHandler);
        }
        this.curFront = true;
        this.curBack = false;
    };
    YouziMoreGameH.prototype.listTweenToStart = function () {
        if (!this.stopAction) {
            var startCompleteHandler = new Laya.Handler(this, this.listTweenToEnd, null, true);
            this.moreGameList.tweenTo(0, this.dur, startCompleteHandler);
        }
        this.curFront = false;
        this.curBack = true;
    };
    YouziMoreGameH.prototype.moreGameListMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            if (!this.isClick) {
                this.isClick = true;
                console.log("当前选择的moreGameH索引：" + index);
                var tmpData = this.morelistHDatas[index];
                tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MORE;
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, this.startOtherCall.bind(this));
                // var curTime = YouziData.YouziDateFtt("yyyyMMdd",new Date());
                // localStorage.setItem(tmpData.appid, curTime);
            }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziMoreGameH.prototype.startOtherCall = function () {
        this.isClick = false;
        this.starMoreGameAction();
    };
    YouziMoreGameH.prototype.checkExposure = function () {
        if (this.MoreGameUI.visible) {
            for (var i = 0; i < this.morelistHDatas.length; i++) {
                var infoData = this.morelistHDatas[i];
                if (!this.mainItemHExposure[infoData.appid]) {
                    this.mainItemHExposure[infoData.appid] = 1;
                    _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(infoData, _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MORE);
                }
                if (i >= 11) {
                    break;
                }
            }
        }
    };
    return YouziMoreGameH;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_MoreGameHUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziMoreGameH);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziMultipleMainPush.ts":
/*!******************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziMultipleMainPush.ts ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziMultipleMainPush = /** @class */ (function (_super) {
    __extends(YouziMultipleMainPush, _super);
    function YouziMultipleMainPush(mainData) {
        var _this = _super.call(this) || this;
        _this.mainRecData = null;
        _this.mainRecItemExposure = {};
        _this.angel = 0;
        _this.curMainRecIdx = 0;
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        _this.leftTween = null;
        _this.rightTween = null;
        _this.startTimer = true;
        _this.mainRecData = mainData;
        _this.visible = false;
        _this.btnMainRecBg.visible = false;
        return _this;
    }
    YouziMultipleMainPush.prototype.setYouziPosition = function (x, y) {
        this.centerX = NaN;
        this.centerY = NaN;
        this.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziMultipleMainPush.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziMultipleMainPush.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziMultipleMainPush.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziMultipleMainPush.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziMultipleMainPush.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziMultipleMainPush.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziMultipleMainPush.prototype.onEnable = function () {
        var isMainDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (isMainDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziMultipleMainPush.prototype.initShow = function () {
        if (this.mainRecData) {
            this.btnMainRec.on(Laya.Event.CLICK, this, this.onBtnMainRecClicked);
            this.visible = true;
            this.btnMainRecBg.visible = true;
            this.btnMainRecBg.rotation = 10;
            this.addMainAnimaOrImage();
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.mainRecData, _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MAIN);
            this.mainRecItemExposure[this.mainRecData.appid] = 1;
            this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_MainPush, { complete: true });
            this.startTimerLoop();
        }
    };
    YouziMultipleMainPush.prototype.startTimerLoop = function () {
        // if(this.mainRecDatas.length > 1){
        //     Laya.timer.loop(5000,this,this.updateMainRec);
        // }
        if (this.startTimer) {
            this.startTimer = false;
            this.mainPushRotationAction();
        }
    };
    YouziMultipleMainPush.prototype.clearTimerLoop = function () {
        //清除计时器后，旋转角度变回10
        this.btnMainRecBg.rotation = 10;
        this.startTimer = true;
        // if(this.mainRecDatas.length > 1){
        //     Laya.timer.clear(this,this.updateMainRec);
        // }
        if (this.leftTween) {
            Laya.Tween.clear(this.leftTween);
        }
        if (this.rightTween) {
            Laya.Tween.clear(this.rightTween);
        }
    };
    /**
     * 主推动画
     * 1、默认角度是10
     * 2、向右转到-10
     * 3、完成之后向左转到10
     * 4、重复2、3
     */
    YouziMultipleMainPush.prototype.mainPushRotationAction = function () {
        this.rotatotionRight();
    };
    //向右边旋转
    YouziMultipleMainPush.prototype.rotatotionRight = function () {
        this.rightTween = Laya.Tween.to(this.btnMainRecBg, { rotation: -10 }, 2000, null, new Laya.Handler(this, this.rotationLeft));
    };
    //像左边旋转
    YouziMultipleMainPush.prototype.rotationLeft = function (actionCompleteCall) {
        this.leftTween = Laya.Tween.to(this.btnMainRecBg, { rotation: 10 }, 2000, null, new Laya.Handler(this, this.rotatotionRight));
    };
    YouziMultipleMainPush.prototype.updateMainRecMultiple = function (mainPushData) {
        this.mainRecData = mainPushData;
        this.btnMainRec.graphics.clear(true);
        this.addMainAnimaOrImage();
        if (!this.mainRecItemExposure[mainPushData.appid]) {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(mainPushData, _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MAIN);
            this.mainRecItemExposure[mainPushData.appid] = 1;
        }
    };
    YouziMultipleMainPush.prototype.addMainAnimaOrImage = function () {
        if (this.mainRecData.dynamicType == 1 && this.mainRecData.dynamicIcon) {
            var mainSelf = this;
            mainSelf.mainAnima.scale(0.75, 0.75);
            var mainYouziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            mainYouziAnima.createAnimation(this.mainRecData.dynamicIcon, 
            // this.mainAnima,
            function (anima) {
                mainSelf.mainAnima = anima;
                mainSelf.mainAnima.visible = true;
                mainSelf.mainAnima.play();
            });
        }
        else {
            this.btnMainRec.loadImage(this.mainRecData.iconImg);
        }
        this.slogan.text = this.mainRecData.slogan;
    };
    YouziMultipleMainPush.prototype.onBtnMainRecClicked = function () {
        _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].clickGameYouziUIId = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_MainPush;
        this.mainRecData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].MAIN;
        _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(this.mainRecData, null);
        // this.updateMainRec();
    };
    return YouziMultipleMainPush;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_MainPushUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziMultipleMainPush);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziMultipleMainPushManager.ts":
/*!*************************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziMultipleMainPushManager.ts ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziMultipleMainPush__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziMultipleMainPush */ "./src/modules/platform/oppo/youzi/youziscript/YouziMultipleMainPush.ts");


var YouziMultipleMainPushManager = /** @class */ (function () {
    /**
     *
     * @param jsonArray jso你数组，格式：[{parentNode:node,x:0,y:0}],parentNode:主推父节点，x，y为主推节点坐标
     * @param amount 主推数量
     */
    function YouziMultipleMainPushManager(jsonArray) {
        //多主推个数
        this.multipleAmount = 1;
        this.isUpdateMainPush = false;
        //创建的多主推
        this.multipleMainPushObj = [];
        //多主推父节点参数json数组
        this.paramsJsonArray = [];
        //从主推数组中随机取出几个元素的数组
        this.randomData = [];
        this.startTimerMulti = true;
        this.paramsJsonArray = jsonArray;
        this.initShow();
    }
    YouziMultipleMainPushManager.prototype.initShow = function () {
        if (_YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded) {
            this.creatYouziMultipleMainPush();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.creatYouziMultipleMainPush.bind(this));
        }
    };
    YouziMultipleMainPushManager.prototype.creatYouziMultipleMainPush = function () {
        var amountArr = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].getMultiMainAmount(this.paramsJsonArray.length);
        this.multipleAmount = amountArr[0];
        this.isUpdateMainPush = amountArr[1];
        this.randomData = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].getGamesIndex(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].mainRecDatas.length, this.multipleAmount);
        for (var i = 0; i < this.randomData.length; i++) {
            var multipleMainPush = new _YouziMultipleMainPush__WEBPACK_IMPORTED_MODULE_1__["default"](_YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].mainRecDatas[this.randomData[i]]);
            var paramsJson = this.paramsJsonArray[i];
            if (this.paramsJsonArray[i]) {
                multipleMainPush.setYouziPosition(paramsJson.x, paramsJson.y);
                paramsJson.parentNode.addChild(multipleMainPush);
                this.multipleMainPushObj.push(multipleMainPush);
            }
        }
        this.startChangeTimeLoop();
    };
    //开启计时器，进行更换
    YouziMultipleMainPushManager.prototype.startChangeTimeLoop = function () {
        if (this.startTimerMulti) {
            this.startTimerMulti = false;
            if (this.isUpdateMainPush) {
                Laya.timer.loop(5000, this, this.updateMultipleMainPush);
            }
            for (var k = 0; k < this.multipleMainPushObj.length; k++) {
                this.multipleMainPushObj[k].startTimerLoop();
            }
        }
    };
    //停止计时器，停止更换
    YouziMultipleMainPushManager.prototype.stopChangeTimeLoop = function () {
        if (this.isUpdateMainPush) {
            Laya.timer.clear(this, this.updateMultipleMainPush);
        }
        for (var l = 0; l < this.multipleMainPushObj.length; l++) {
            this.multipleMainPushObj[l].clearTimerLoop();
        }
        this.startTimerMulti = true;
    };
    YouziMultipleMainPushManager.prototype.updateMultipleMainPush = function () {
        this.randomData = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].getGamesIndex(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].mainRecDatas.length, this.multipleAmount);
        for (var j = 0; j < this.multipleMainPushObj.length; j++) {
            this.multipleMainPushObj[j].updateMainRecMultiple(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].mainRecDatas[this.randomData[j]]);
        }
    };
    return YouziMultipleMainPushManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (YouziMultipleMainPushManager);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziOffLine.ts":
/*!*********************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziOffLine.ts ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziOffLine = /** @class */ (function (_super) {
    __extends(YouziOffLine, _super);
    function YouziOffLine() {
        var _this = _super.call(this) || this;
        _this.offLineGameShow = [];
        _this.offLineGameDatas = [];
        _this.offLineCreateComplete = false;
        _this.isSendLog = true;
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        //获取毫秒
        _this.hideOffLineGameTimes = 0;
        if (Laya.stage.height / Laya.stage.width >= 1.9) {
            _this.OffLineUI.pos(Laya.stage.width / 2 - _this.OffLineUI.width / 2, Laya.stage.height / 2 - _this.OffLineUI.height / 2);
        }
        else {
            _this.centerX = 0;
            _this.centerY = 0;
        }
        _this.visible = false;
        _this.OffLineUI.visible = false;
        return _this;
    }
    YouziOffLine.prototype.setYouziPosition = function (x, y) {
        this.centerX = NaN;
        this.centerY = NaN;
        this.OffLineUI.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziOffLine.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziOffLine.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziOffLine.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziOffLine.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziOffLine.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziOffLine.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziOffLine.prototype.onEnable = function () {
        var offLineDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (offLineDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziOffLine.prototype.initShow = function () {
        this.offLineGameDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].offlineBannerDatas;
        this.wxOnShow();
        this.wxOnHide();
        //以下demo演示用
        // this.createOffLineDialog();
        // this.visible = true;
        // this.OffLineUI.visible = true;
    };
    YouziOffLine.prototype.wxOnShow = function () {
        var self = this;
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.onShow(function (res) {
                var showOffLineTimes = Math.floor(new Date().getTime() - self.hideOffLineGameTimes);
                var showOffLineTimeSecond = Math.floor(showOffLineTimes / 1000);
                if (showOffLineTimeSecond >= 8) {
                    if (self.offLineCreateComplete) {
                        self.visible = true;
                        self.OffLineUI.visible = true;
                        self.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_OffLine, { uiVisible: true });
                        if (self.isSendLog) {
                            for (var i = 0; i < self.offLineGameShow.length; i++) {
                                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(self.offLineGameShow[i], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].OFFLINE);
                                if (i == self.offLineGameShow.length) {
                                    self.isSendLog = false;
                                }
                            }
                        }
                    }
                }
            });
        }
    };
    YouziOffLine.prototype.wxOnHide = function () {
        var self = this;
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.onHide(function () {
                self.hideOffLineGameTimes = new Date().getTime();
                if (self.offLineGameDatas.length > 0 && !self.offLineCreateComplete) {
                    self.createOffLineDialog();
                }
            });
        }
    };
    YouziOffLine.prototype.createOffLineDialog = function () {
        if (this.offLineGameDatas.length <= 0) {
            console.log('离线推荐没有数据');
            return;
        }
        this.OffLineCloseButton.on(Laya.Event.CLICK, this, this.onBtnOffLineClose);
        var offLineArr = [];
        for (var i = 0; i < this.offLineGameDatas.length; i++) {
            if (i >= 3) {
                break;
            }
            else {
                var tempOffLine = this.offLineGameDatas[i];
                offLineArr.push({ namelab: tempOffLine.title });
            }
        }
        //设定list 位置，以这种方式解决list中item的居中问题
        switch (offLineArr.length) {
            case 1:
                this.OffLineList.width = 140;
                this.OffLineList.x = 194;
                break;
            case 2:
                this.OffLineList.width = 305;
                this.OffLineList.x = 111.5;
                break;
            default:
                break;
        }
        this.OffLineList.mouseHandler = new Laya.Handler(this, this.onOffLinelistItemMouseEvent);
        this.OffLineList.dataSource = offLineArr;
        for (var j = 0; j < this.offLineGameDatas.length; j++) {
            if (this.offLineGameDatas[j].dynamicType == 1 && this.offLineGameDatas[j].dynamicIcon) {
                var imgAnima = this.OffLineList.getCell(j).getChildByName('iconAnima');
                imgAnima.scale(1.16, 1.16);
                var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
                youziAnima.createAnimation(this.offLineGameDatas[j].dynamicIcon, 
                // imgAnima,
                function (anima) {
                    imgAnima.frames = anima.frames;
                    imgAnima.interval = anima.interval;
                    imgAnima.visible = true;
                    imgAnima.play();
                });
            }
            else {
                var offLineIcon = this.OffLineList.getCell(j).getChildByName('icon');
                offLineIcon.loadImage(this.offLineGameDatas[j].iconImg);
            }
            if (this.offLineGameDatas[j].hotred == 1) {
                var offLineIconRedHit = this.OffLineList.getCell(j).getChildByName('redhit');
                offLineIconRedHit.visible = true;
            }
            this.offLineGameShow.push(this.offLineGameDatas[j]);
            if (++j >= offLineArr.length) {
                // console.log('offlinecreat finish');
                this.offLineCreateComplete = true;
                break;
            }
        }
        this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_OffLine, { complete: true });
    };
    YouziOffLine.prototype.onBtnOffLineClose = function () {
        this.visible = false;
        this.OffLineUI.visible = false;
        this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_OffLine, { uiVisible: false });
    };
    YouziOffLine.prototype.onOffLinelistItemMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            console.log("当前选择的hotlist索引：" + index);
            var tmpData = this.offLineGameDatas[index];
            tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].OFFLINE;
            tmpData.type = 3;
            if (tmpData.hotred == 1) {
                var hideOffLineHit = this.OffLineList.getCell(index).getChildByName('icon').getChildByName('redhit');
                hideOffLineHit.visible = false;
            }
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, null);
        }
        else if (e.type == 'mouseover') {
        }
        else if (e.type == 'mouseout') {
        }
    };
    return YouziOffLine;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_OffLineUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziOffLine);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziOffLineH.ts":
/*!**********************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziOffLineH.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziOffLineH = /** @class */ (function (_super) {
    __extends(YouziOffLineH, _super);
    function YouziOffLineH() {
        var _this = _super.call(this) || this;
        _this.offLineGameShow = [];
        _this.offLineGameDatas = [];
        _this.offLineCreateComplete = false;
        _this.isSendLog = true;
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        //获取毫秒
        _this.hideOffLineGameTimes = 0;
        if (Laya.stage.width / Laya.stage.height >= 1.9) {
            _this.OffLineUI.pos(Laya.stage.width / 2 - _this.OffLineUI.width / 2, Laya.stage.height / 2 - _this.OffLineUI.height / 2);
        }
        else {
            _this.centerX = 0;
            _this.centerY = 0;
        }
        _this.visible = false;
        _this.OffLineUI.visible = false;
        return _this;
    }
    YouziOffLineH.prototype.setYouziPosition = function (x, y) {
        this.centerX = NaN;
        this.centerY = NaN;
        this.OffLineUI.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziOffLineH.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziOffLineH.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziOffLineH.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziOffLineH.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziOffLineH.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziOffLineH.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziOffLineH.prototype.onEnable = function () {
        var offLineDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (offLineDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziOffLineH.prototype.initShow = function () {
        this.offLineGameDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].offlineBannerDatas;
        this.wxOnShow();
        this.wxOnHide();
        //以下demo演示用
        // this.createOffLineDialog();
        // this.visible = true;
        // this.OffLineUI.visible = true;
    };
    YouziOffLineH.prototype.wxOnShow = function () {
        var self = this;
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.onShow(function (res) {
                var showOffLineTimes = Math.floor(new Date().getTime() - self.hideOffLineGameTimes);
                var showOffLineTimeSecond = Math.floor(showOffLineTimes / 1000);
                // console.log('showOffLineTimes :'+showOffLineTimeSecond);
                if (showOffLineTimeSecond >= 8) {
                    // console.log("offLineCreateComplete :"+self.offLineCreateComplete);
                    if (self.offLineCreateComplete) {
                        self.visible = true;
                        self.OffLineUI.visible = true;
                        self.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_OffLineH, { uiVisible: true });
                        // console.log('offlineshow');
                        if (self.isSendLog) {
                            for (var i = 0; i < self.offLineGameShow.length; i++) {
                                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(self.offLineGameShow[i], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].OFFLINE);
                                if (i == self.offLineGameShow.length) {
                                    self.isSendLog = false;
                                }
                            }
                        }
                    }
                }
            });
        }
    };
    YouziOffLineH.prototype.wxOnHide = function () {
        var self = this;
        if (Laya.Browser.window.wx) {
            Laya.Browser.window.wx.onHide(function () {
                self.hideOffLineGameTimes = new Date().getTime();
                if (self.offLineGameDatas.length > 0 && !self.offLineCreateComplete) {
                    self.createOffLineDialog();
                }
            });
        }
    };
    YouziOffLineH.prototype.createOffLineDialog = function () {
        if (this.offLineGameDatas.length <= 0) {
            console.log('离线推荐没有数据');
            return;
        }
        this.OffLineCloseButton.on(Laya.Event.CLICK, this, this.onBtnOffLineClose);
        var offLineArr = [];
        for (var i = 0; i < this.offLineGameDatas.length; i++) {
            if (i >= 3) {
                break;
            }
            else {
                var tempOffLine = this.offLineGameDatas[i];
                offLineArr.push({ infoData: tempOffLine, namelab: tempOffLine.title });
            }
        }
        //设定list 位置，以这种方式解决list中item的居中问题
        var offLineListPostionX = 0;
        switch (offLineArr.length) {
            case 1:
                offLineListPostionX = 205;
                break;
            case 2:
                offLineListPostionX = 85;
                this.OffLineList.spaceX = 50;
                break;
            default:
                offLineListPostionX = 8;
                this.OffLineList.spaceX = 15;
                break;
        }
        this.OffLineList.x = offLineListPostionX;
        this.OffLineList.mouseHandler = new Laya.Handler(this, this.onOffLinelistItemMouseEvent);
        this.OffLineList.dataSource = offLineArr;
        for (var j = 0; j < this.offLineGameDatas.length; j++) {
            if (this.offLineGameDatas[j].dynamicType == 1 && this.offLineGameDatas[j].dynamicIcon) {
                var imgAnima = this.OffLineList.getCell(j).getChildByName('iconAnima');
                imgAnima.scale(1.16, 1.16);
                var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
                youziAnima.createAnimation(this.offLineGameDatas[j].dynamicIcon, 
                // imgAnima,
                function (anima) {
                    imgAnima.frames = anima.frames;
                    imgAnima.interval = anima.interval;
                    imgAnima.visible = true;
                    imgAnima.play();
                });
            }
            else {
                var offLineIcon = this.OffLineList.getCell(j).getChildByName('icon');
                offLineIcon.loadImage(this.offLineGameDatas[j].iconImg);
            }
            if (this.offLineGameDatas[j].hotred == 1) {
                var offLineIconRedHit = this.OffLineList.getCell(j).getChildByName('redhit');
                offLineIconRedHit.visible = true;
            }
            this.offLineGameShow.push(this.offLineGameDatas[j]);
            // console.log('offlinecreat '+j);
            if (++j >= offLineArr.length) {
                // console.log('offlinecreat finish');
                this.offLineCreateComplete = true;
                break;
            }
        }
        this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_OffLineH, { complete: true });
    };
    YouziOffLineH.prototype.onBtnOffLineClose = function () {
        this.visible = false;
        this.OffLineUI.visible = false;
        this.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_OffLineH, { uiVisible: false });
    };
    YouziOffLineH.prototype.onOffLinelistItemMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            console.log("当前选择的hotlist索引：" + index);
            var tmpData = this.offLineGameDatas[index];
            tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].OFFLINE;
            tmpData.type = 3;
            if (tmpData.hotred == 1) {
                var hideOffLineHit = this.OffLineList.getCell(index).getChildByName('icon').getChildByName('redhit');
                hideOffLineHit.visible = false;
            }
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, null);
        }
        else if (e.type == 'mouseover') {
        }
        else if (e.type == 'mouseout') {
        }
    };
    return YouziOffLineH;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_OffLineHUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziOffLineH);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziSlideWindow.ts":
/*!*************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziSlideWindow.ts ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziSlideWindow = /** @class */ (function (_super) {
    __extends(YouziSlideWindow, _super);
    function YouziSlideWindow(leftOrRight) {
        var _this = _super.call(this) || this;
        _this.hotlistDatas = [];
        _this.slideItemExposure = {};
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        _this.slideButton = null;
        _this.slideMask = null;
        _this.showFirst = false;
        _this.isLeft = false;
        _this.isLeft = leftOrRight;
        _this.centerY = 0;
        _this.visible = false;
        _this.SlideWindowUI.visible = false;
        _this.slideList.scrollBar.hide = true;
        if (!leftOrRight) {
            _this.right = -_this.width;
            _this.slideBg.scaleX = -1;
            _this.slideBg.pos(_this.slideBg.width, _this.slideBg.y);
            _this.slideList.pos(2 * _this.slideList.x, _this.slideList.y);
        }
        else {
            _this.left = -_this.width;
            // this.left = 0;
        }
        return _this;
    }
    YouziSlideWindow.prototype.setYouziPosition = function (y) {
        this.centerX = NaN;
        this.centerY = NaN;
        this.SlideWindowUI.pos(this.SlideWindowUI.x, y);
    };
    YouziSlideWindow.prototype.setSlideButton = function (slideBtn) {
        this.slideButton = slideBtn;
    };
    YouziSlideWindow.prototype.setSlideMask = function (slideViewMask) {
        this.slideMask = slideViewMask;
    };
    //传入UI是否创建完成通知对象
    YouziSlideWindow.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziSlideWindow.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziSlideWindow.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziSlideWindow.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziSlideWindow.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziSlideWindow.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziSlideWindow.prototype.onEnable = function () {
        var isSlideDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (isSlideDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    //显示抽屉按钮，隐藏抽屉遮罩
    YouziSlideWindow.prototype.showSlideBtnAndHideSlideMask = function () {
        if (this.slideButton)
            this.slideButton.visible = true;
        if (this.slideMask)
            this.slideMask.visible = false;
    };
    //隐藏抽屉按钮，显示抽屉遮罩
    YouziSlideWindow.prototype.hideSlideBtnAndShowSlideMask = function () {
        if (this.slideButton)
            this.slideButton.visible = false;
        if (this.slideMask)
            this.slideMask.visible = true;
    };
    YouziSlideWindow.prototype.showSlideWindow = function () {
        if (this.hotlistDatas.length <= 0) {
            console.log('抽屉没有数据');
            return;
        }
        if (!this.SlideWindowUI.visible) {
            this.visible = true;
            this.SlideWindowUI.visible = true;
            this.hideSlideBtnAndShowSlideMask();
            var self = this;
            this.slideWindowActionShow(function () {
                self.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_SlideWindow, { uiVisible: true });
                if (!self.showFirst) {
                    self.showFirst = true;
                    self.checkExposure();
                }
            });
        }
    };
    YouziSlideWindow.prototype.slideWindowActionShow = function (actionFinishCall) {
        if (!this.isLeft) {
            Laya.Tween.to(this, {
                right: 0
            }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, actionFinishCall));
        }
        else {
            Laya.Tween.to(this, {
                left: 0
            }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, actionFinishCall));
        }
    };
    YouziSlideWindow.prototype.closeSlideWindow = function () {
        if (this.hotlistDatas.length <= 0) {
            console.log('抽屉没有数据');
            return;
        }
        var self = this;
        this.slideWindowActionClose(function () {
            self.visible = false;
            self.SlideWindowUI.visible = false;
            self.btnSLideClose.visible = true;
            self.showSlideBtnAndHideSlideMask();
            self.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_SlideWindow, { uiVisible: false });
        });
        //点击隐藏按钮，防止动画过程中继续点击造成过多偏移
        self.btnSLideClose.visible = false;
    };
    YouziSlideWindow.prototype.slideWindowActionClose = function (actionFinishCall) {
        if (!this.isLeft) {
            Laya.Tween.to(this, {
                right: -this.width
            }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, actionFinishCall));
        }
        else {
            Laya.Tween.to(this, {
                left: -this.width
            }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, actionFinishCall));
        }
    };
    YouziSlideWindow.prototype.initShow = function () {
        this.hotlistDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].hotListDatas;
        this.btnSLideClose.on(Laya.Event.CLICK, this, this.closeSlideWindow);
        if (this.hotlistDatas.length > 0) {
            var arr = [];
            var pRecord = null;
            for (var i = 0; i < this.hotlistDatas.length; i++) {
                pRecord = this.hotlistDatas[i];
                if (pRecord.dynamicType == 1 && pRecord.dynamicIcon) {
                    arr.push({ icon: "", namelab: pRecord.title });
                }
                else {
                    arr.push({ icon: pRecord.iconImg, namelab: pRecord.title });
                }
            }
            this.slideList.array = arr;
            this.slideList.renderHandler = new Laya.Handler(this, this.onListRender);
            this.slideList.mouseHandler = new Laya.Handler(this, this.onslideListItemMouseEvent);
            this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_SlideWindow, { complete: true });
        }
    };
    YouziSlideWindow.prototype.onListRender = function (item, index) {
        // console.log('------->render slide : ',index);
        // var icon : Laya.Image = item.getChildByName('icon') as Laya.Image;
        // icon.loadImage(this.hotlistDatas[index].iconImg);
        if (this.hotlistDatas[index].hotred == 0) {
            var redHitWall = item.getChildByName('markImg');
            redHitWall.visible = false;
        }
        if (this.hotlistDatas[index].dynamicType == 1 && this.hotlistDatas[index].dynamicIcon) {
            var imgAnima = item.getChildByName('iconAnima');
            imgAnima.scale(1.08, 1.08);
            imgAnima.visible = true;
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.hotlistDatas[index].dynamicIcon, 
            // imgAnima,
            function (anima) {
                imgAnima.frames = anima.frames;
                imgAnima.interval = anima.interval;
                imgAnima.play();
            });
        }
        this.checkSendExpsureLog(index);
    };
    YouziSlideWindow.prototype.checkSendExpsureLog = function (index) {
        if (this.visible && this.SlideWindowUI.visible) {
            if (!this.slideItemExposure[this.hotlistDatas[index].appid]) {
                // console.log('---send log moregame index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.hotlistDatas[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FLOAT);
                this.slideItemExposure[this.hotlistDatas[index].appid] = 1;
            }
        }
    };
    YouziSlideWindow.prototype.onslideListItemMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            console.log("当前选择的抽屉索引：" + index);
            var tmpData = this.hotlistDatas[index];
            tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FLOAT;
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, null);
            if (tmpData.hotred == 1) {
                var tmpSlideHit = this.slideList.getCell(index).getChildByName('markImg');
                tmpSlideHit.visible = false;
            }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziSlideWindow.prototype.checkExposure = function () {
        if (this.SlideWindowUI.visible) {
            for (var i = 0; i < this.hotlistDatas.length; i++) {
                var infoData = this.hotlistDatas[i];
                // console.log(infoData)
                if (!this.slideItemExposure[infoData.appid]) {
                    this.slideItemExposure[infoData.appid] = 1;
                    _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(infoData, _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FLOAT);
                }
                if (i >= 11)
                    break;
            }
        }
    };
    return YouziSlideWindow;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_SlideWindowUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziSlideWindow);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziSlideWindowH.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziSlideWindowH.ts ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziSlideWindowH = /** @class */ (function (_super) {
    __extends(YouziSlideWindowH, _super);
    function YouziSlideWindowH(leftOrRight) {
        var _this = _super.call(this) || this;
        _this.hotlistHDatas = [];
        _this.slideItemExposure = {};
        _this.uiCompleteCallCopy = null;
        _this.uiStateCallCopy = null;
        _this.slideButton = null;
        _this.slideMask = null;
        _this.showFirst = false;
        _this.isFullDevice = false;
        _this.acitonPianYi = 0;
        _this.isLeft = false;
        _this.isLeft = leftOrRight;
        if (Laya.stage.width / Laya.stage.height >= 1.9) {
            _this.isFullDevice = true;
            _this.acitonPianYi = 20;
            _this.scale(0.9, 0.9);
            var scaleH = _this.height * 0.9;
            _this.pos(_this.x, Laya.stage.height / 2 - scaleH / 2);
        }
        else {
            _this.centerY = 0;
        }
        if (!leftOrRight) {
            _this.right = -_this.width;
            _this.slideBg.scaleX = -1;
            _this.slideBg.pos(_this.slideBg.width, _this.slideBg.y);
            _this.slideList.pos(_this.slideList.x, _this.slideList.y);
        }
        else {
            _this.left = -_this.width;
        }
        _this.visible = false;
        _this.SlideWindowUI.visible = false;
        _this.slideList.scrollBar.hide = true;
        return _this;
    }
    YouziSlideWindowH.prototype.setYouziPosition = function (y) {
        this.centerX = NaN;
        this.centerY = NaN;
        this.pos(this.x, y);
    };
    YouziSlideWindowH.prototype.setSlideButton = function (slideBtn) {
        this.slideButton = slideBtn;
    };
    YouziSlideWindowH.prototype.setSlideMask = function (slideViewMask) {
        this.slideMask = slideViewMask;
    };
    //传入UI是否创建完成通知对象
    YouziSlideWindowH.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziSlideWindowH.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziSlideWindowH.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziSlideWindowH.prototype.setUIStateCall = function (uiStateCall) {
        this.uiStateCallCopy = uiStateCall;
    };
    /**通知UI界面状态
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziSlideWindowH.prototype.notifyUIState = function (uiID, msg) {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy(uiID, msg);
        }
    };
    YouziSlideWindowH.prototype.offUIStateCall = function () {
        if (this.uiStateCallCopy) {
            this.uiStateCallCopy = null;
        }
    };
    YouziSlideWindowH.prototype.onEnable = function () {
        var isSlideDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (isSlideDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    //显示抽屉按钮，隐藏抽屉遮罩
    YouziSlideWindowH.prototype.showSlideBtnAndHideSlideMask = function () {
        if (this.slideButton)
            this.slideButton.visible = true;
        if (this.slideMask)
            this.slideMask.visible = false;
    };
    //隐藏抽屉按钮，显示抽屉遮罩
    YouziSlideWindowH.prototype.hideSlideBtnAndShowSlideMask = function () {
        if (this.slideButton)
            this.slideButton.visible = false;
        if (this.slideMask)
            this.slideMask.visible = true;
    };
    YouziSlideWindowH.prototype.showSlideWindow = function () {
        if (this.hotlistHDatas.length <= 0) {
            console.log('抽屉没有数据');
            return;
        }
        if (!this.SlideWindowUI.visible) {
            this.visible = true;
            this.SlideWindowUI.visible = true;
            this.hideSlideBtnAndShowSlideMask();
            var self = this;
            this.slideWindowActionShow(function () {
                self.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_SlideWindowH, { uiVisible: true });
                if (!self.showFirst) {
                    self.showFirst = true;
                    self.checkExposure();
                }
            });
        }
    };
    YouziSlideWindowH.prototype.slideWindowActionShow = function (actionFinishCall) {
        var self = this;
        if (!this.isLeft) {
            Laya.Tween.to(this, {
                right: self.acitonPianYi
            }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, actionFinishCall));
        }
        else {
            Laya.Tween.to(this, {
                left: self.acitonPianYi
            }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, actionFinishCall));
        }
    };
    YouziSlideWindowH.prototype.closeSlideWindow = function () {
        if (this.hotlistHDatas.length <= 0) {
            console.log('抽屉没有数据');
            return;
        }
        var self = this;
        this.slideWindowActionClose(function () {
            self.notifyUIState(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_SlideWindowH, { uiVisible: false });
            self.visible = false;
            self.SlideWindowUI.visible = false;
            self.btnSLideClose.visible = true;
            self.showSlideBtnAndHideSlideMask();
        });
        //点击隐藏按钮，防止动画过程中继续点击造成过多偏移
        self.btnSLideClose.visible = false;
    };
    YouziSlideWindowH.prototype.slideWindowActionClose = function (actionFinishCall) {
        if (!this.isLeft) {
            Laya.Tween.to(this, {
                right: -this.width
            }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, actionFinishCall));
        }
        else {
            Laya.Tween.to(this, {
                left: -this.width
            }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, actionFinishCall));
        }
    };
    YouziSlideWindowH.prototype.initShow = function () {
        this.hotlistHDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].hotListDatas;
        this.btnSLideClose.on(Laya.Event.CLICK, this, this.closeSlideWindow);
        var arr = [];
        var pRecord = null;
        for (var i = 0; i < this.hotlistHDatas.length; i++) {
            pRecord = this.hotlistHDatas[i];
            if (pRecord.dynamicType == 1 && pRecord.dynamicIcon) {
                arr.push({ icon: "", namelab: pRecord.title });
            }
            else {
                arr.push({ icon: pRecord.iconImg, namelab: pRecord.title });
            }
        }
        this.slideList.array = arr;
        this.slideList.renderHandler = new Laya.Handler(this, this.onListRender);
        this.slideList.mouseHandler = new Laya.Handler(this, this.onslideListItemMouseEvent);
        this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_SlideWindowH, { complete: true });
    };
    YouziSlideWindowH.prototype.onListRender = function (item, index) {
        // console.log('------->render slide : ',index);
        // var icon : Laya.Image = item.getChildByName('icon') as Laya.Image;
        // icon.loadImage(this.hotlistDatas[index].iconImg);
        if (this.hotlistHDatas[index].hotred == 0) {
            var redHitWall = item.getChildByName('markImg');
            redHitWall.visible = false;
        }
        if (this.hotlistHDatas[index].dynamicType == 1 && this.hotlistHDatas[index].dynamicIcon) {
            var imgAnima = item.getChildByName('iconAnima');
            imgAnima.scale(1.08, 1.08);
            imgAnima.visible = true;
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.hotlistHDatas[index].dynamicIcon, 
            // imgAnima,
            function (anima) {
                imgAnima.frames = anima.frames;
                imgAnima.interval = anima.interval;
                imgAnima.play();
            });
        }
        this.checkSendExpsureLog(index);
    };
    YouziSlideWindowH.prototype.checkSendExpsureLog = function (index) {
        if (this.visible && this.SlideWindowUI.visible) {
            if (!this.slideItemExposure[this.hotlistHDatas[index].appid]) {
                // console.log('---send log moregame index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.hotlistHDatas[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FLOAT);
                this.slideItemExposure[this.hotlistHDatas[index].appid] = 1;
            }
        }
    };
    YouziSlideWindowH.prototype.onslideListItemMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            console.log("当前选择的slideh索引：" + index);
            ;
            var tmpData = this.hotlistHDatas[index];
            tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FLOAT;
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, null);
            if (tmpData.hotred == 1) {
                var tmpSlideHit = this.slideList.getCell(index).getChildByName('markImg');
                tmpSlideHit.visible = false;
            }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziSlideWindowH.prototype.checkExposure = function () {
        if (this.SlideWindowUI.visible) {
            for (var i = 0; i < this.hotlistHDatas.length; i++) {
                var infoData = this.hotlistHDatas[i];
                // console.log(infoData)
                if (!this.slideItemExposure[infoData.appid]) {
                    this.slideItemExposure[infoData.appid] = 1;
                    _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(infoData, _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].FLOAT);
                }
                if (i >= 11)
                    break;
            }
        }
    };
    return YouziSlideWindowH;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_SlideWindowHUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziSlideWindowH);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziSmallWall.ts":
/*!***********************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziSmallWall.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziSmallWall = /** @class */ (function (_super) {
    __extends(YouziSmallWall, _super);
    function YouziSmallWall() {
        var _this = _super.call(this) || this;
        _this.smallWallDatas = [];
        _this.redHitHide = [];
        _this.smallWallItemExposure = {};
        _this.smallWallItemExposureCount = 0;
        _this.uiCompleteCallCopy = null;
        // private uiStateCallCopy:Function = null;
        _this.curFront = true;
        _this.curBack = false;
        _this.stopAction = false;
        _this.isClick = false;
        _this.dur = 5000;
        _this.visible = false;
        _this.SmallWallUI.visible = false;
        _this.smallWallList.scrollBar.hide = true;
        return _this;
    }
    YouziSmallWall.prototype.setYouziPosition = function (x, y) {
        this.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziSmallWall.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziSmallWall.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziSmallWall.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziSmallWall.prototype.onEnable = function () {
        var isSmallWallDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (isSmallWallDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziSmallWall.prototype.initShow = function () {
        this.smallWallDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].moreDatas;
        if (this.smallWallDatas.length > 0) {
            var arr = [];
            var pRecord = null;
            for (var i = 0; i < this.smallWallDatas.length; i++) {
                pRecord = this.smallWallDatas[i];
                if (pRecord.dynamicType == 1 && pRecord.dynamicIcon) {
                    arr.push({ icon: "", namelab: pRecord.title });
                }
                else {
                    arr.push({ icon: pRecord.iconImg, namelab: pRecord.title });
                }
            }
            this.smallWallList.array = arr;
            this.smallWallList.renderHandler = new Laya.Handler(this, this.onListRender);
            this.smallWallList.mouseHandler = new Laya.Handler(this, this.onSmallWallListItemMouseEvent);
            // this.smallWallList.on(Laya.Event.MOUSE_UP,this,this.scrollBarListen.bind(this));
            this.visible = true;
            this.SmallWallUI.visible = true;
            this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_SmallWall, { complete: true });
            this.dur = this.smallWallDatas.length > 8 ? (this.smallWallDatas.length - 8) * 5000 : 5000;
            this.starSmallWallAction();
        }
    };
    YouziSmallWall.prototype.scrollBarListen = function () {
        this.starSmallWallAction();
    };
    YouziSmallWall.prototype.onListRender = function (cell, index) {
        // console.log('small index : ',index);
        if (this.smallWallDatas[index].hotred == 1) {
            var redHitWall = cell.getChildByName('redhit');
            redHitWall.visible = true;
        }
        if (this.smallWallDatas[index].dynamicType == 1 && this.smallWallDatas[index].dynamicIcon) {
            var imgAnima = cell.getChildByName('iconAnima');
            imgAnima.visible = true;
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.smallWallDatas[index].dynamicIcon, 
            // imgAnima,
            function (anima) {
                imgAnima.frames = anima.frames;
                imgAnima.interval = anima.interval;
                imgAnima.play();
            });
        }
        this.checkSendExpsureLog(index);
    };
    YouziSmallWall.prototype.checkSendExpsureLog = function (index) {
        if (this.visible && this.SmallWallUI.visible) {
            if (!this.smallWallItemExposure[this.smallWallDatas[index].appid]) {
                // console.log('---send log moregame index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.smallWallDatas[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].SMALL_MATRIX_WALL);
                this.smallWallItemExposure[this.smallWallDatas[index].appid] = 1;
            }
        }
    };
    YouziSmallWall.prototype.stopSmallWallAcion = function () {
        this.stopAction = true;
    };
    YouziSmallWall.prototype.starSmallWallAction = function () {
        this.smallWallListAutoScroll();
    };
    YouziSmallWall.prototype.smallWallListAutoScroll = function () {
        if (!this.SmallWallUI.visible)
            return;
        if (this.smallWallDatas.length <= 8) {
            return;
        }
        this.stopAction = false;
        //当前是从前面开始向后，但是未到后面
        if (this.curFront && !this.curBack) {
            this.listTweenToEnd();
        }
        else if (!this.curFront && this.curBack) {
            this.listTweenToStart();
        }
    };
    YouziSmallWall.prototype.listTweenToEnd = function () {
        if (!this.stopAction) {
            var endCompletHandler = new Laya.Handler(this, this.listTweenToStart, null, true);
            this.smallWallList.tweenTo(this.smallWallDatas.length - 1, this.dur, endCompletHandler);
        }
        this.curFront = true;
        this.curBack = false;
    };
    YouziSmallWall.prototype.listTweenToStart = function () {
        if (!this.stopAction) {
            var startCompleteHandler = new Laya.Handler(this, this.listTweenToEnd, null, true);
            this.smallWallList.tweenTo(0, this.dur, startCompleteHandler);
        }
        this.curFront = false;
        this.curBack = true;
    };
    YouziSmallWall.prototype.onSmallWallListItemMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            if (!this.isClick) {
                this.isClick = true;
                console.log("当前选择的大家都在玩儿索引：" + index);
                var tmpData = this.smallWallDatas[index];
                tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].SMALL_MATRIX_WALL;
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, this.startOtherCall.bind(this));
                if (tmpData.hotred == 1) {
                    var tmpSlideHit = this.smallWallList.getCell(index).getChildByName('redhit');
                    tmpSlideHit.visible = false;
                }
            }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziSmallWall.prototype.startOtherCall = function (state) {
        this.isClick = false;
        this.starSmallWallAction();
    };
    return YouziSmallWall;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_SmallWallUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziSmallWall);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziSmallWallH.ts":
/*!************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziSmallWallH.ts ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");
/* harmony import */ var _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouziAtlasPngAnima */ "./src/modules/platform/oppo/youzi/youziscript/YouziAtlasPngAnima.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/platform/oppo/youzi/youziscript/UI.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var YouziSmallWallH = /** @class */ (function (_super) {
    __extends(YouziSmallWallH, _super);
    function YouziSmallWallH() {
        var _this = _super.call(this) || this;
        _this.smallWallHDatas = [];
        _this.smallWallHItemExposure = {};
        _this.smallWallHItemExposureCount = 0;
        _this.uiCompleteCallCopy = null;
        // private uiStateCallCopy:Function = null;
        _this.curFront = true;
        _this.curBack = false;
        _this.stopAction = false;
        _this.isClick = false;
        _this.dur = 5000;
        _this.visible = false;
        _this.SmallWallUIH.visible = false;
        _this.smallWallListH.scrollBar.hide = true;
        return _this;
    }
    YouziSmallWallH.prototype.setYouziPosition = function (x, y) {
        this.pos(x, y);
    };
    //传入UI是否创建完成通知对象
    YouziSmallWallH.prototype.setUICompleteCall = function (uiCompleteCall) {
        this.uiCompleteCallCopy = uiCompleteCall;
    };
    /**通知UI已创建完毕
     * @param uiID {界面编号}
     * @param msg {通知：是个json，方便后期能够随时增加新的信息}
     */
    YouziSmallWallH.prototype.notifyUIComplete = function (uiID, msg) {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy(uiID, msg);
        }
    };
    YouziSmallWallH.prototype.offUICompleteCall = function () {
        if (this.uiCompleteCallCopy) {
            this.uiCompleteCallCopy = null;
        }
    };
    YouziSmallWallH.prototype.onEnable = function () {
        var isSmallWallDataOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (isSmallWallDataOk) {
            this.initShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.initShow.bind(this));
        }
    };
    YouziSmallWallH.prototype.initShow = function () {
        this.smallWallHDatas = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].moreDatas;
        if (this.smallWallHDatas.length > 0) {
            var arr = [];
            var pRecord = null;
            for (var i = 0; i < this.smallWallHDatas.length; i++) {
                pRecord = this.smallWallHDatas[i];
                if (pRecord.dynamicType == 1 && pRecord.dynamicIcon) {
                    arr.push({ icon: "", namelab: pRecord.title });
                }
                else {
                    arr.push({ icon: pRecord.iconImg, namelab: pRecord.title });
                }
            }
            this.smallWallListH.renderHandler = new Laya.Handler(this, this.onListRender);
            this.smallWallListH.array = arr;
            this.smallWallListH.mouseHandler = new Laya.Handler(this, this.onSmallWallListItemMouseEvent);
            this.visible = true;
            this.SmallWallUIH.visible = true;
            this.notifyUIComplete(_YouziData__WEBPACK_IMPORTED_MODULE_0__["YOUZI_UI_ID"].Youzi_SmallWall, { complete: true });
            this.dur = this.smallWallHDatas.length > 8 ? (this.smallWallHDatas.length - 8) * 5000 : 5000;
            this.starSmallWallAction();
        }
    };
    YouziSmallWallH.prototype.onListRender = function (cell, index) {
        // console.log('small index : ',index);
        if (this.smallWallHDatas[index].hotred == 1) {
            var redHitWallH = cell.getChildByName('redhit');
            redHitWallH.visible = true;
        }
        if (this.smallWallHDatas[index].dynamicType == 1 && this.smallWallHDatas[index].dynamicIcon) {
            var imgAnima = cell.getChildByName('iconAnima');
            imgAnima.visible = true;
            var youziAnima = new _YouziAtlasPngAnima__WEBPACK_IMPORTED_MODULE_1__["default"]();
            youziAnima.createAnimation(this.smallWallHDatas[index].dynamicIcon, 
            // imgAnima,
            function (anima) {
                imgAnima.frames = anima.frames;
                imgAnima.interval = anima.interval;
                imgAnima.play();
            });
        }
        this.checkSendExpsureLog(index);
    };
    YouziSmallWallH.prototype.checkSendExpsureLog = function (index) {
        if (this.visible && this.SmallWallUIH.visible) {
            if (!this.smallWallHItemExposure[this.smallWallHDatas[index].appid]) {
                // console.log('---send log moregame index:',index);
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].sendExposureLog(this.smallWallHDatas[index], _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].SMALL_MATRIX_WALL);
                this.smallWallHItemExposure[this.smallWallHDatas[index].appid] = 1;
            }
        }
    };
    YouziSmallWallH.prototype.stopSmallWallAcion = function () {
        this.stopAction = true;
    };
    YouziSmallWallH.prototype.starSmallWallAction = function () {
        this.smallWallListAutoScroll();
    };
    YouziSmallWallH.prototype.smallWallListAutoScroll = function () {
        if (!this.SmallWallUIH.visible)
            return;
        if (this.smallWallHDatas.length <= 8) {
            return;
        }
        this.stopAction = false;
        //当前是从前面开始向后，但是未到后面
        if (this.curFront && !this.curBack) {
            this.listTweenToEnd();
        }
        else if (!this.curFront && this.curBack) {
            this.listTweenToStart();
        }
    };
    YouziSmallWallH.prototype.listTweenToEnd = function () {
        if (!this.stopAction) {
            var endCompletHandler = new Laya.Handler(this, this.listTweenToStart, null, true);
            this.smallWallListH.tweenTo(this.smallWallHDatas.length - 1, this.dur, endCompletHandler);
        }
        this.curFront = true;
        this.curBack = false;
    };
    YouziSmallWallH.prototype.listTweenToStart = function () {
        if (!this.stopAction) {
            var startCompleteHandler = new Laya.Handler(this, this.listTweenToEnd, null, true);
            this.smallWallListH.tweenTo(0, this.dur, startCompleteHandler);
        }
        this.curFront = false;
        this.curBack = true;
    };
    YouziSmallWallH.prototype.onSmallWallListItemMouseEvent = function (e, index) {
        if (e.type == 'mousedown') {
        }
        else if (e.type == 'mouseup') {
            if (!this.isClick) {
                this.isClick = true;
                console.log("当前选择的大家都在玩儿索引：" + index);
                var tmpData = this.smallWallHDatas[index];
                tmpData.locationIndex = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BI_PAGE_TYPE"].SMALL_MATRIX_WALL;
                _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].startOtherGame(tmpData, this.startOtherCall.bind(this));
                if (tmpData.hotred == 1) {
                    var tmpSlideHit = this.smallWallListH.getCell(index).getChildByName('redhit');
                    tmpSlideHit.visible = false;
                }
            }
        }
        else if (e.type == 'mouseover') {
        }
    };
    YouziSmallWallH.prototype.startOtherCall = function (state) {
        this.isClick = false;
        this.starSmallWallAction();
    };
    return YouziSmallWallH;
}(_UI__WEBPACK_IMPORTED_MODULE_2__["Youzi_SmallWallHUI"]));
/* harmony default export */ __webpack_exports__["default"] = (YouziSmallWallH);


/***/ }),

/***/ "./src/modules/platform/oppo/youzi/youziscript/YouziWeChatBanner.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/platform/oppo/youzi/youziscript/YouziWeChatBanner.ts ***!
  \**************************************************************************/
/*! exports provided: WECHAT_BANNER_POSTYPE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WECHAT_BANNER_POSTYPE", function() { return WECHAT_BANNER_POSTYPE; });
/* harmony import */ var _YouziData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouziData */ "./src/modules/platform/oppo/youzi/youziscript/YouziData.ts");

var WECHAT_BANNER_POSTYPE = {
    BOTTOM: 1,
    TOP: 2 //微信banner广告放在顶部
};
var YouziWeChatBanner = /** @class */ (function () {
    /**
     *
     * @param {string} wechatBannerID 微信banner广告id
     * @param {number} posType 微信banner广告位置类型,1为底部，2为顶部，默认为1
     * @param {json} offset json，格式{x:10,y:10}，key值为number，控制微信banner广告位置的偏移量，默认{x:0,y:0}
     * @param {bool} isOffSwich true:微信banner广告显示鱼隐藏有中心化sdk控制；false:微信banner广告的显示与隐藏，有游戏自己控制，中心化sdk不在进行显示隐藏、切换等任何控制
     * @param isOffSwitchSelf 微信banner广告是否自动更换。true交由中心化sdk调用switchBannerNow进行更换自身显示的内容
     */
    function YouziWeChatBanner(wechatBannerID, posType, offset, isOffSwich, isOffSwitchSelf) {
        if (posType === void 0) { posType = null; }
        if (offset === void 0) { offset = null; }
        if (isOffSwich === void 0) { isOffSwich = false; }
        if (isOffSwitchSelf === void 0) { isOffSwitchSelf = false; }
        this.isLoadOk = false;
        this.adUnitId = null;
        this.posType = 1;
        this.offset = {
            x: 0,
            y: 0
        };
        this.bannerType = _YouziData__WEBPACK_IMPORTED_MODULE_0__["BANNER_TYPE"].WX;
        this.isShowBanner = false;
        this.isOffSwitch = false;
        this.isOffSwitchSelf = false;
        this.bannerAd = null;
        this.refreshTimer = null;
        this.adUnitId = wechatBannerID;
        this.posType = posType || 1;
        this.offset = offset || { x: 0, y: 0 };
        this.isOffSwitch = isOffSwich;
        this.isOffSwitchSelf = isOffSwitchSelf;
        this.initShow();
    }
    YouziWeChatBanner.prototype.initShow = function () {
        this.isLoadOk = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._isDataLoaded;
        if (this.isLoadOk) {
            this.freshShow();
        }
        else {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._loadedCallBacks.push(this.freshShow.bind(this));
        }
    };
    YouziWeChatBanner.prototype.freshShow = function () {
        this.createWXBanner();
        if (!this.isOffSwitch) {
            _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].addBanner(this);
            this._autoSwitchSelf();
        }
    };
    YouziWeChatBanner.prototype.createWXBanner = function () {
        if (!Laya.Browser.window.wx) {
            return;
        }
        else if (!Laya.Browser.window.wx.createBannerAd) {
            return;
        }
        var self = this;
        var screenWidth = Laya.Browser.window.wx.getSystemInfoSync().screenWidth;
        var screenHeight = Laya.Browser.window.wx.getSystemInfoSync().screenHeight;
        var designWidth = Laya.stage.designWidth;
        var designHeight = Laya.stage.designHeight;
        var rateHeight = (screenWidth / designWidth) * designHeight;
        var minHeight = 100 * (screenWidth / designWidth) + (screenHeight - rateHeight) / 2;
        self.bannerAd = Laya.Browser.window.wx.createBannerAd({
            adUnitId: this.adUnitId,
            style: {
                left: this.offset.x,
                top: this.offset.y,
                width: screenWidth,
            }
        });
        var oldBannerAd = self.bannerAd;
        var isSetWidth = false;
        self.bannerAd.onResize(function (res) {
            if (isSetWidth) {
                return;
            }
            if (self.bannerAd.style.realHeight > minHeight) {
                isSetWidth = true;
                var width = screenWidth * minHeight / self.bannerAd.style.realHeight;
                width = _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"].miscClampf(width, 300, 9999);
                self.bannerAd.style.width = width;
                self.bannerAd.style.top = screenHeight - self.bannerAd.style.realHeight * (width / self.bannerAd.style.realWidth) + self.offset.y;
                self.bannerAd.style.left = (screenWidth - self.bannerAd.style.width) / 2 + self.offset.x;
            }
            else {
                self.bannerAd.style.top = screenHeight - self.bannerAd.style.realHeight + self.offset.y;
                if (screenHeight / screenWidth > 2) {
                    self.bannerAd.style.top = self.bannerAd.style.top - 34 + self.offset.y;
                }
            }
            if (self.posType == WECHAT_BANNER_POSTYPE.TOP) {
                self.bannerAd.style.left = (screenWidth - self.bannerAd.style.width) / 2 + self.offset.x;
                self.bannerAd.style.top = self.offset.y;
                if (screenHeight / screenWidth > 2) {
                    self.bannerAd.style.top += 76;
                }
                else if (screenWidth / screenHeight > 2) {
                    self.bannerAd.style.top += 76;
                }
            }
        });
        self.bannerAd.onLoad(function (res) {
            if (oldBannerAd) {
                oldBannerAd.hide();
                oldBannerAd.destroy();
            }
            if (self.isShowBanner) {
                self.bannerAd.show();
            }
            else {
                self.bannerAd.hide();
            }
        });
        self.bannerAd.onError(function (err) {
            console.warn('微信banner广告出错', err);
        });
    };
    YouziWeChatBanner.prototype.showBanner = function () {
        this.isShowBanner = true;
        if (this.bannerAd) {
            this.bannerAd.show();
        }
    };
    YouziWeChatBanner.prototype.hideBanner = function () {
        this.isShowBanner = false;
        if (this.bannerAd) {
            this.bannerAd.hide();
        }
    };
    YouziWeChatBanner.prototype.destroySelf = function () {
        if (this.bannerAd) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
        this.isShowBanner = false;
    };
    YouziWeChatBanner.prototype.switchBannerNow = function () {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
        this.createWXBanner();
        this._autoSwitchSelf();
    };
    YouziWeChatBanner.prototype._autoSwitchSelf = function () {
        if (!this.isOffSwitchSelf) {
            var self2 = this;
            this.refreshTimer = setInterval(function () {
                self2.createWXBanner();
            }, _YouziData__WEBPACK_IMPORTED_MODULE_0__["YouziData"]._bannerCreateInterval * 1000);
        }
    };
    return YouziWeChatBanner;
}());
/* harmony default export */ __webpack_exports__["default"] = (YouziWeChatBanner);


/***/ }),

/***/ "./src/modules/platform/platform.ts":
/*!******************************************!*\
  !*** ./src/modules/platform/platform.ts ***!
  \******************************************/
/*! exports provided: ShareError, WatchRewardVideoFailed, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareError", function() { return ShareError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WatchRewardVideoFailed", function() { return WatchRewardVideoFailed; });
/* harmony import */ var xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/game/Module */ "./src/xengine/game/Module.ts");
/* harmony import */ var _VirtualAdManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VirtualAdManager */ "./src/modules/platform/VirtualAdManager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


/** 分享失败错误代码 */
var ShareError;
(function (ShareError) {
    /** 配置错误 */
    ShareError[ShareError["CONFIGURATION_ERROR"] = 0] = "CONFIGURATION_ERROR";
    /** 分享被取消 */
    ShareError[ShareError["SHARE_CANCELD"] = -1] = "SHARE_CANCELD";
    /** 没有分享到群 */
    ShareError[ShareError["NOT_SHARED_TO_GROUP"] = -2] = "NOT_SHARED_TO_GROUP";
    /** 重复分享到相同的群 */
    ShareError[ShareError["NOT_SHARED_TO_DIFFRENT_GROUP"] = -3] = "NOT_SHARED_TO_DIFFRENT_GROUP";
})(ShareError || (ShareError = {}));
/** 观看激励视频 */
var WatchRewardVideoFailed;
(function (WatchRewardVideoFailed) {
    /** 配置错误 */
    WatchRewardVideoFailed[WatchRewardVideoFailed["CONFIGURATION_ERROR"] = 0] = "CONFIGURATION_ERROR";
    /** 激励视频没有填充 */
    WatchRewardVideoFailed[WatchRewardVideoFailed["NO_VIDEO_FILLED"] = -1] = "NO_VIDEO_FILLED";
    /** 被用户中断 */
    WatchRewardVideoFailed[WatchRewardVideoFailed["WATCH_CANCELED"] = -2] = "WATCH_CANCELED";
})(WatchRewardVideoFailed || (WatchRewardVideoFailed = {}));
var Platform = /** @class */ (function (_super) {
    __extends(Platform, _super);
    function Platform() {
        var _this = _super.call(this) || this;
        /** 广告管理器 */
        _this.ad_manager = null;
        Platform_1.inst = _this;
        _this.ad_manager = new _VirtualAdManager__WEBPACK_IMPORTED_MODULE_1__["default"]();
        return _this;
    }
    Platform_1 = Platform;
    Object.defineProperty(Platform.prototype, "admanager", {
        get: function () { return this.ad_manager; },
        enumerable: true,
        configurable: true
    });
    Platform.prototype.initialize = function () {
        this.ad_manager.initialize();
        console.log("初始化平台", this.ad_manager);
    };
    /** 登陆、授权 */
    Platform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        uuid: "82d7268b-2707-412b-b4c4-65baf63e9b43",
                        name: "Hero",
                        avatar: "",
                        location: "China",
                    }];
            });
        });
    };
    Platform.prototype.get_info = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        uuid: "82d7268b-2707-412b-b4c4-65baf63e9b43",
                        platform: "web",
                        device: "chrome",
                    }];
            });
        });
    };
    Platform.prototype.get_user_info = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        uuid: "82d7268b-2707-412b-b4c4-65baf63e9b43",
                        name: "Hero",
                        avatar: "",
                        location: "China",
                    }];
            });
        });
    };
    /** 跳转到其他程序 */
    Platform.prototype.navigate_to_app = function (appid, path, extra) {
        return new Promise(function (resolve, reject) {
            if (resolve)
                resolve();
            else if (reject)
                reject();
        });
    };
    /**
     * 调起分享
     *
     * 分享失败会抛出 `ShareError` 错误
     */
    Platform.prototype.share = function () {
        return new Promise(function (resolve, reject) { resolve(); });
    };
    /**
     * 播放激励视频广告
     *
     * 失败会抛出 `WatchRewardVideoFailed` 错误
    */
    Platform.prototype.play_reward_video = function () {
        return this.admanager.show_reward_video();
    };
    /** 输出加载过的资源列表 */
    Platform.prototype.dump_loaded_resources = function () {
        if (Laya['loaded_res_pathes']) {
            return JSON.stringify(Object.keys(Laya['loaded_res_pathes']), undefined, "\t");
        }
    };
    /** 弹出系统提示 */
    Platform.prototype.alert = function (message) {
        window.alert(message);
    };
    var Platform_1;
    Platform.inst = null;
    Platform = Platform_1 = __decorate([
        Object(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["game_module"])("platform")
    ], Platform);
    return Platform;
}(xengine_game_Module__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Platform);


/***/ }),

/***/ "./src/modules/platform/qq/QQPlatform.ts":
/*!***********************************************!*\
  !*** ./src/modules/platform/qq/QQPlatform.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wechat/WechatPlatform */ "./src/modules/platform/wechat/WechatPlatform.ts");
/* harmony import */ var _wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wechat/WechatADManager */ "./src/modules/platform/wechat/WechatADManager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var QQPlatform = /** @class */ (function (_super) {
    __extends(QQPlatform, _super);
    function QQPlatform() {
        return _super.call(this) || this;
    }
    QQPlatform.prototype.create_ad_manager = function () {
        _wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_1__["WechatADUnitID"].BANNER_AD_UNIT_ID = "186edb4228038cc8b1e15d092c38d5d6";
        _wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_1__["WechatADUnitID"].REWARD_AD_UNIT_ID = "ef45628090404778bf0ee0f715ef24e0";
        return new _wechat_WechatADManager__WEBPACK_IMPORTED_MODULE_1__["default"]();
    };
    return QQPlatform;
}(_wechat_WechatPlatform__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (QQPlatform);


/***/ }),

/***/ "./src/modules/platform/wechat/WechatADManager.ts":
/*!********************************************************!*\
  !*** ./src/modules/platform/wechat/WechatADManager.ts ***!
  \********************************************************/
/*! exports provided: WechatADUnitID, default, WechatBannerAdUnit, WechatRewardVideoAdUnit, WechatInterstitialAdUnit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WechatADUnitID", function() { return WechatADUnitID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WechatBannerAdUnit", function() { return WechatBannerAdUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WechatRewardVideoAdUnit", function() { return WechatRewardVideoAdUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WechatInterstitialAdUnit", function() { return WechatInterstitialAdUnit; });
/* harmony import */ var modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules/commerce/ADManager */ "./src/modules/commerce/ADManager.ts");
/* harmony import */ var xengine_utils_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/utils/math */ "./src/xengine/utils/math.ts");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../platform */ "./src/modules/platform/platform.ts");
/* harmony import */ var xengine_XEngine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xengine/XEngine */ "./src/xengine/XEngine.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var WechatADUnitID = {
    BANNER_AD_UNIT_ID: "",
    REWARD_AD_UNIT_ID: "",
    INTERSTITIAL_AD_UNIT_ID: "",
};
var WechatADManager = /** @class */ (function (_super) {
    __extends(WechatADManager, _super);
    function WechatADManager() {
        var _this = _super.call(this) || this;
        _this.banner = null;
        _this.video = null;
        _this.interstitial = null;
        _this.create_ads();
        return _this;
    }
    WechatADManager.prototype.create_ads = function () {
        if (WechatADUnitID.BANNER_AD_UNIT_ID)
            this.banner = new WechatBannerAdUnit(WechatADUnitID.BANNER_AD_UNIT_ID);
        if (WechatADUnitID.REWARD_AD_UNIT_ID)
            this.video = new WechatRewardVideoAdUnit(WechatADUnitID.REWARD_AD_UNIT_ID);
        if (WechatADUnitID.INTERSTITIAL_AD_UNIT_ID)
            this.interstitial = new WechatInterstitialAdUnit(WechatADUnitID.INTERSTITIAL_AD_UNIT_ID);
    };
    WechatADManager.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, error_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.banner) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.banner.instance()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("微信广告:", "创建Banner广告失败", error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.video) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.video.instance()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        console.error("微信广告:", "创建视频广告失败", error_2);
                        return [3 /*break*/, 8];
                    case 8:
                        if (!this.interstitial) return [3 /*break*/, 12];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.interstitial.instance()];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_3 = _a.sent();
                        console.error("微信广告:", "创建插页广告失败", error_3);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    WechatADManager.prototype.show_banner = function (pos) {
        var _this = this;
        console.log("微信广告: 尝试展示Banner");
        return new Promise(function (resolve, reject) {
            if (_this.banner) {
                _this.banner.show(pos).then(function () { return resolve(); }).catch(function () { return reject(); });
            }
            else {
                reject();
            }
        });
    };
    /** 隐藏 Banner 广告 */
    WechatADManager.prototype.hide_banner = function () {
        var _this = this;
        console.log("微信广告: 尝试隐藏Banner");
        return new Promise(function (resolve, reject) {
            if (_this.banner) {
                _this.banner.hide();
                resolve();
            }
            else {
                reject();
            }
        });
    };
    WechatADManager.prototype.show_reward_video = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.video) {
                _this.video.show().then(function () { return resolve(); }).catch(function (e) { return reject(e); });
            }
            else {
                reject(_platform__WEBPACK_IMPORTED_MODULE_2__["WatchRewardVideoFailed"].CONFIGURATION_ERROR);
            }
        });
    };
    WechatADManager.prototype.show_intersitial = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.interstitial) {
                _this.banner.show().then(function () { return resolve(); }).catch(function () { return reject(); });
            }
            else {
                reject();
            }
        });
    };
    return WechatADManager;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (WechatADManager);
var WechatBannerAdUnit = /** @class */ (function (_super) {
    __extends(WechatBannerAdUnit, _super);
    function WechatBannerAdUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refresh_interval = 30;
        _this.native_ad = null;
        _this.screen_size = null;
        return _this;
    }
    /** 创建广告 */
    WechatBannerAdUnit.prototype.instance = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.native_ad) {
                var info_1 = wx.getSystemInfoSync();
                _this.screen_size = new xengine_utils_math__WEBPACK_IMPORTED_MODULE_1__["Vector2"](info_1.screenWidth, info_1.screenHeight);
                var width = 300;
                var native_ad_1 = wx['createBannerAd']({
                    adUnitId: _this.id,
                    adIntervals: _this.refresh_interval,
                    style: { left: (info_1.windowWidth - width) / 2, top: 0, width: width }
                });
                var initialize_size_1 = function () {
                    Laya.timer.once(1000, null, function () {
                        native_ad_1.style.top = info_1.windowHeight - (native_ad_1.style.realHeight || native_ad_1.style.height);
                        native_ad_1.style.left = (info_1.windowWidth - (native_ad_1.style.realWidth || native_ad_1.style.width)) / 2;
                    });
                    native_ad_1.offResize(initialize_size_1);
                };
                native_ad_1.onResize(initialize_size_1);
                native_ad_1.onLoad(function () {
                    console.log('微信广告:', 'Banner加载成功', _this.id);
                    _this.native_ad = native_ad_1;
                    resolve();
                });
                native_ad_1.onError(function (err) {
                    console.log('微信广告:', 'Banner加载失败', _this.id, err);
                    native_ad_1.offResize(initialize_size_1);
                    reject();
                });
            }
            else {
                resolve();
            }
        });
    };
    /** 销毁广告 */
    WechatBannerAdUnit.prototype.destrory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.native_ad.destroy();
                    this.native_ad = null;
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    /** 展示广告 */
    WechatBannerAdUnit.prototype.show = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.set_position(pos);
                    this.native_ad.show();
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    /** 隐藏广告 */
    WechatBannerAdUnit.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.native_ad.hide();
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    /** 设置位置（设计分辨率坐标系） */
    WechatBannerAdUnit.prototype.set_position = function (pos) {
        if (this.native_ad) {
            if (pos) {
                var viewsize = xengine_XEngine__WEBPACK_IMPORTED_MODULE_3__["default"].inst.stage.size;
                var scalar = this.screen_size.divide(viewsize);
                this.native_ad.style.left = scalar.x * pos.x;
                this.native_ad.style.top = scalar.y * pos.y;
            }
            else {
                var info = wx.getSystemInfoSync();
                var height = this.native_ad.style.realHeight || this.native_ad.style.height || 72;
                this.native_ad.style.top = info.screenHeight - height;
            }
        }
    };
    return WechatBannerAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["ADUnit"]));

var Events;
(function (Events) {
    Events["VIDEO_PLAY_DONE"] = "VIDEO_PLAY_DONE";
    Events["VIDEO_PLAY_CANCLED"] = "VIDEO_PLAY_CANCLED";
})(Events || (Events = {}));
var WechatRewardVideoAdUnit = /** @class */ (function (_super) {
    __extends(WechatRewardVideoAdUnit, _super);
    function WechatRewardVideoAdUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.native_ad = null;
        return _this;
    }
    /** 创建广告 */
    WechatRewardVideoAdUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.native_ad) {
                    this.native_ad = this.create_reward_video();
                }
                return [2 /*return*/];
            });
        });
    };
    /** 销毁广告 */
    WechatRewardVideoAdUnit.prototype.destrory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.native_ad) {
                    this.native_ad.destroy();
                    this.native_ad = null;
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    /** 展示广告 */
    WechatRewardVideoAdUnit.prototype.show = function (pos) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.native_ad) {
                wx.showLoading({ title: "加载中", mask: true });
                Laya.timer.once(2000, null, function () { wx.hideLoading(); });
                _this.offAll(Events.VIDEO_PLAY_DONE);
                _this.offAll(Events.VIDEO_PLAY_CANCLED);
                _this.on(Events.VIDEO_PLAY_DONE, null, function () { return resolve(); });
                _this.on(Events.VIDEO_PLAY_CANCLED, null, function () { return reject(_platform__WEBPACK_IMPORTED_MODULE_2__["WatchRewardVideoFailed"].WATCH_CANCELED); });
                _this.native_ad.show().catch(function () {
                    reject(_platform__WEBPACK_IMPORTED_MODULE_2__["WatchRewardVideoFailed"].NO_VIDEO_FILLED);
                });
            }
            else {
                reject(_platform__WEBPACK_IMPORTED_MODULE_2__["WatchRewardVideoFailed"].CONFIGURATION_ERROR);
            }
        });
    };
    ;
    /** 隐藏广告 */
    WechatRewardVideoAdUnit.prototype.hide = function () {
        return new Promise(function (resolve, reject) {
            reject();
        });
    };
    ;
    // 激励视频
    WechatRewardVideoAdUnit.prototype.create_reward_video = function () {
        var _this = this;
        var adUnitId = this.id;
        if (adUnitId) {
            var rewardedVideoAd_1 = wx['createRewardedVideoAd']({ adUnitId: adUnitId });
            rewardedVideoAd_1.onLoad(function () { console.log('微信广告:', '激励视频加载成功', adUnitId); });
            rewardedVideoAd_1.onError(function (err) { console.log('微信广告:', '激励视频加载失败', adUnitId, err); });
            rewardedVideoAd_1.onClose(function (res) {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    _this.event(Events.VIDEO_PLAY_DONE);
                }
                else {
                    _this.event(Events.VIDEO_PLAY_CANCLED);
                }
                rewardedVideoAd_1.load();
            });
            rewardedVideoAd_1.load();
            return rewardedVideoAd_1;
        }
        return null;
    };
    ;
    return WechatRewardVideoAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["ADUnit"]));

var WechatInterstitialAdUnit = /** @class */ (function (_super) {
    __extends(WechatInterstitialAdUnit, _super);
    function WechatInterstitialAdUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.native_ad = null;
        return _this;
    }
    WechatInterstitialAdUnit.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.native_ad) {
                    this.native_ad = wx['createInterstitialAd']({
                        adUnitId: this.id
                    });
                    this.native_ad.load();
                    this.native_ad.onClose(function () { _this.native_ad.load(); });
                }
                return [2 /*return*/];
            });
        });
    };
    WechatInterstitialAdUnit.prototype.show = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.native_ad) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.native_ad.show()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return WechatInterstitialAdUnit;
}(modules_commerce_ADManager__WEBPACK_IMPORTED_MODULE_0__["ADUnit"]));



/***/ }),

/***/ "./src/modules/platform/wechat/WechatPlatform.ts":
/*!*******************************************************!*\
  !*** ./src/modules/platform/wechat/WechatPlatform.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform */ "./src/modules/platform/platform.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! config */ "./src/config.ts");
/* harmony import */ var xengine_game_Module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/game/Module */ "./src/xengine/game/Module.ts");
/* harmony import */ var _nativefiles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nativefiles */ "./src/modules/platform/wechat/nativefiles.ts");
/* harmony import */ var _WechatADManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WechatADManager */ "./src/modules/platform/wechat/WechatADManager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var WechatPlatform = /** @class */ (function (_super) {
    __extends(WechatPlatform, _super);
    function WechatPlatform() {
        var _this = _super.call(this) || this;
        /** 设备信息 */
        _this.system_info = null;
        _this.user_info = null;
        _this.share_config = null;
        _this.launch_options = null;
        // 广告
        _this.ad_manager = _this.create_ad_manager();
        // 系统信息
        _this.system_info = wx.getSystemInfoSync();
        console.log("设备信息", _this.system_info);
        // 版本资源控制
        if (Laya.LocalStorage.getItem('res_version') != config__WEBPACK_IMPORTED_MODULE_1__["default"].res_version) {
            console.log("本地资源缓存与当前版本不一致，清理本地资源缓存");
            Laya.MiniAdpter.removeAll();
            Laya.LocalStorage.setItem('res_version', config__WEBPACK_IMPORTED_MODULE_1__["default"].res_version);
        }
        // 包体内资源
        Laya.MiniAdpter.nativefiles = _nativefiles__WEBPACK_IMPORTED_MODULE_3__["default"];
        return _this;
    }
    WechatPlatform.prototype.start = function () {
    };
    WechatPlatform.prototype.get_info = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        uuid: "82d7268b-2707-412b-b4c4-65baf63e9b43",
                        platform: config__WEBPACK_IMPORTED_MODULE_1__["default"].platform,
                        device: this.system_info.brand + " " + this.system_info.brand.model,
                        native_platform: this.system_info.platform,
                        data: this.system_info
                    }];
            });
        });
    };
    WechatPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var authorized, err_1, wxcode, error_1, user_info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorized = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.authorize()];
                    case 2:
                        _a.sent();
                        authorized = true;
                        console.log("微信授权成功");
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.warn("微信授权失败", err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        wxcode = "";
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.wx_login()];
                    case 6:
                        wxcode = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.error("微信登陆失败");
                        throw error_1;
                    case 8: return [4 /*yield*/, this.get_user_info()];
                    case 9:
                        user_info = _a.sent();
                        user_info.uuid = wxcode;
                        return [2 /*return*/, user_info];
                }
            });
        });
    };
    WechatPlatform.prototype.get_user_info = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.user_info) {
                _this.user_info = {
                    uuid: "",
                    name: "Hero",
                    avatar: "",
                    location: "China",
                };
                _this.authorize().then(function () {
                    wx.getUserInfo({
                        success: function (res) {
                            var userInfo = res.userInfo;
                            _this.user_info.name = userInfo.nickName;
                            _this.user_info.avatar = userInfo.avatarUrl;
                            _this.user_info.location = userInfo.province;
                            resolve(_this.user_info);
                        },
                        fail: function (err) {
                            reject(err);
                        }
                    });
                }).catch(function (err) {
                    _super.prototype.get_user_info.call(_this).then(function (ret) { return resolve(ret); });
                });
            }
            else {
                resolve(_this.user_info);
            }
        });
    };
    WechatPlatform.prototype.wx_login = function () {
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (ret) {
                    resolve(ret.code);
                },
                fail: function (err) {
                    reject(err);
                },
                complete: undefined
            });
        });
    };
    WechatPlatform.prototype.authorize = function (scope) {
        if (scope === void 0) { scope = 'scope.userInfo'; }
        return new Promise(function (resolve, reject) {
            var authorize_fail_count = 0;
            var retry_time = 3;
            var authorize = function () {
                wx.authorize({
                    scope: scope,
                    success: function (ret) {
                        resolve();
                    },
                    fail: function () {
                        authorize_fail_count += 1;
                        if (authorize_fail_count < retry_time) {
                            authorize();
                        }
                        else {
                            reject();
                        }
                    },
                    complete: undefined,
                });
            };
            wx.getSetting({
                success: function (res) {
                    if (!res.authSetting[scope]) {
                        authorize();
                    }
                    else {
                        resolve();
                    }
                },
                fail: function () {
                    authorize();
                },
                complete: undefined,
            });
        });
    };
    /** 跳转到其他小程序 */
    WechatPlatform.prototype.navigate_to_app = function (appid, path, extra) {
        return new Promise(function (resolve, reject) {
            wx.navigateToMiniProgram({
                appId: appid,
                path: path,
                extraData: extra,
                envVersion: 'release',
                success: function (ret) {
                    resolve(ret);
                },
                fail: function () {
                    reject();
                },
                complete: undefined,
            });
        });
    };
    WechatPlatform.prototype.set_share_config = function (cfg) {
        this.share_config = cfg;
        wx.showShareMenu({ withShareTicket: true });
        wx['onShareAppMessage'](function () {
            return {
                title: cfg.title,
                imageUrl: cfg.image_url,
            };
        });
    };
    WechatPlatform.prototype.set_user_openid = function (id) {
        if (this.user_info) {
            this.user_info.uuid = id;
        }
    };
    WechatPlatform.prototype.share = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.share_config) {
                console.error("微信平台:", "调起分享失败, 未设置分享配置");
                reject(_platform__WEBPACK_IMPORTED_MODULE_0__["ShareError"].CONFIGURATION_ERROR);
            }
            var started = false;
            var start_time = 0;
            var check_share_success = function () {
                var duration = ((new Date()).getTime() - start_time) / 1000;
                return duration >= 3;
            };
            var callback = function () {
                if (check_share_success()) {
                    console.log("微信平台:", "分享成功");
                    resolve();
                }
                else {
                    console.log("微信平台:", "分享失败");
                    var error = Math.random() > 0.5 ? _platform__WEBPACK_IMPORTED_MODULE_0__["ShareError"].NOT_SHARED_TO_DIFFRENT_GROUP : _platform__WEBPACK_IMPORTED_MODULE_0__["ShareError"].NOT_SHARED_TO_GROUP;
                    reject(error);
                }
            };
            var onStart = function () {
                started = true;
                start_time = (new Date()).getTime();
            };
            // wx['onHide'](onStart);
            var onShow = function () {
                if (started) {
                    // wx['offHide'](onStart);
                    wx['offShow'](onShow);
                    Laya.timer.once(100, null, callback);
                }
                started = false;
            };
            wx['onShow'](onShow);
            wx['shareAppMessage']({
                title: _this.share_config.title,
                imageUrl: _this.share_config.image_url,
                query: _this.share_config.token,
                imageUrlId: _this.share_config.data.share_id,
            });
            onStart();
        });
    };
    WechatPlatform.prototype.create_ad_manager = function () {
        _WechatADManager__WEBPACK_IMPORTED_MODULE_4__["WechatADUnitID"].BANNER_AD_UNIT_ID = "adunit-a58d5b5c763bdf57";
        _WechatADManager__WEBPACK_IMPORTED_MODULE_4__["WechatADUnitID"].REWARD_AD_UNIT_ID = "adunit-eab20b4b60d9d71a";
        return new _WechatADManager__WEBPACK_IMPORTED_MODULE_4__["default"]();
    };
    WechatPlatform.prototype.alert = function (message) {
        wx.showModal({ content: message, showCancel: false });
    };
    /** 获取启动参数 */
    WechatPlatform.prototype.get_launch_option = function () {
        if (!this.launch_options) {
            this.launch_options = wx['getLaunchOptionsSync']();
        }
        return this.launch_options;
    };
    WechatPlatform = __decorate([
        Object(xengine_game_Module__WEBPACK_IMPORTED_MODULE_2__["game_module"])("platform")
    ], WechatPlatform);
    return WechatPlatform;
}(_platform__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (WechatPlatform);


/***/ }),

/***/ "./src/modules/platform/wechat/nativefiles.ts":
/*!****************************************************!*\
  !*** ./src/modules/platform/wechat/nativefiles.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// 将 game.modules.platform.dump_loaded_resources() 的输出内容填到下面的列表中
/* harmony default export */ __webpack_exports__["default"] = ([]);


/***/ }),

/***/ "./src/view/3d/Baffle.ts":
/*!*******************************!*\
  !*** ./src/view/3d/Baffle.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules/dataModule/BallModule */ "./src/modules/dataModule/BallModule.ts");
/* harmony import */ var xengine_utils_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/utils/path */ "./src/xengine/utils/path.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var _base_TrailsSprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/TrailsSprite */ "./src/view/3d/base/TrailsSprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




// 面板  也可作为 障碍物
var Baffle = /** @class */ (function (_super) {
    __extends(Baffle, _super);
    function Baffle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 一个空对象
        _this._ballModule = null;
        return _this;
        // 需要写 面板的属性 和 子的碰撞
        // 生成方块 不能直接生成  配表
        // public async createBaffles() {
        //     let baffleData = this.baffleVo.baffleData;
        //     // 
        //     // for (let i = 0; i < baffleData.wNum; i++) {
        //     //     for (let j = 0; j < baffleData.hNum; j++) {
        //     //         let baffle = new 
        //     //     }
        //     // }
        // }
    }
    Baffle.prototype.initData = function (baffleVo) {
        this._ballModule = xengine_game_Game__WEBPACK_IMPORTED_MODULE_2__["default"].inst.get_module(modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_0__["default"]);
        this._baffleVo = baffleVo;
        this.url = xengine_utils_path__WEBPACK_IMPORTED_MODULE_1__["path"].res3DUrlByName(this._ballModule.futureResUrl, this._baffleVo.baffleData.skin, false);
    };
    // async instance(duplicate = true) {
    //     await super.instance(duplicate);
    //     // 默认第一个子节点 为 锚点
    //     return this.displayObject;
    // }
    // 游戏开始
    Baffle.prototype.startGame = function () {
        this.trails.initData(this._baffleVo.trailVos, this);
        // 设置是否易碎
        // 打开碰撞
        var physicsCollider = this.trailNode.getComponent(Laya.PhysicsCollider);
        physicsCollider.restitution = 0.5;
        // this._physicsCollider.isTrigger = true;
        // 设置位置
        this.trails.startRun();
    };
    return Baffle;
}(_base_TrailsSprite__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Baffle);


/***/ }),

/***/ "./src/view/3d/Ball.ts":
/*!*****************************!*\
  !*** ./src/view/3d/Ball.ts ***!
  \*****************************/
/*! exports provided: Ball */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ball", function() { return Ball; });
/* harmony import */ var _base_TrailsSprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/TrailsSprite */ "./src/view/3d/base/TrailsSprite.ts");
/* harmony import */ var modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules/dataModule/BallModule */ "./src/modules/dataModule/BallModule.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var xengine_utils_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xengine/utils/path */ "./src/xengine/utils/path.ts");
/* harmony import */ var modules_func_ParabolaFunc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! modules/func/ParabolaFunc */ "./src/modules/func/ParabolaFunc.ts");
/* harmony import */ var _BallScene__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BallScene */ "./src/view/3d/BallScene.ts");
/* harmony import */ var xengine_utils_math__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! xengine/utils/math */ "./src/xengine/utils/math.ts");
/* harmony import */ var xengine_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! xengine/utils */ "./src/xengine/utils/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var Ball = /** @class */ (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._collisionPanelNum = 0; // 撞击地面的次数
        // 是否进球
        _this.goalBool = false;
        _this.isHollow = true; // 是否是空心
        // 是否使用过
        _this.used = false;
        return _this;
    }
    // 可能以后会伴随 技能  暂时只认皮肤
    Ball.prototype.initData = function (ballData) {
        this._ballModule = xengine_game_Game__WEBPACK_IMPORTED_MODULE_2__["default"].inst.get_module(modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
        this.ballData = ballData;
        this.used = false;
        this.url = xengine_utils_path__WEBPACK_IMPORTED_MODULE_3__["path"].res3DUrlByName(this._ballModule.futureResUrl, ballData.skin, false);
        console.log(this.url);
    };
    // 游戏开始
    Ball.prototype.startGame = function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 打开碰撞检测
                this.offEvent();
                if (parent) {
                    parent.addChild(this.displayObject);
                }
                this._rigidBody = this.trailNode.getComponent(Laya.Rigidbody3D);
                this._rigidBody.restitution = this._ballModule.ballForce;
                this._rigidBody.mass = 1;
                this.setRigidBody(false);
                return [2 /*return*/];
            });
        });
    };
    // 第一种 实时改变位置 返回是否成功
    Ball.prototype.fly = function (angle, comCallBack) {
        var _this = this;
        // 没有角度 代表 虚拟玩家投的
        this.onEvent();
        this.used = true;
        this._flyComCallBack = comCallBack;
        var currectAngle = this.getCorrectAngle();
        console.log("操控方向" + angle + "   正确方向" + currectAngle);
        var isSuc = angle == null || Math.abs(currectAngle - angle) <= this._ballModule.angleOffset;
        var endPos = this.getEndPos(isSuc, angle);
        var startPos = this.trailNode.transform.position.clone();
        var playInitHit = angle == null ? this._ballModule.enemyInitHit : this._ballModule.playInitHit;
        var boardRadius = this._ballModule.boardRadius;
        var temp = Object(xengine_utils__WEBPACK_IMPORTED_MODULE_7__["random_range"])(0, 1 - playInitHit);
        this._tween = modules_func_ParabolaFunc__WEBPACK_IMPORTED_MODULE_4__["ParabolaFunc"].instance.startPairingParabola(this.trailNode, startPos, endPos, Laya.Handler.create(this, function () {
            _this.tweenEndThen();
        }), this.getCenterPos(startPos, endPos), boardRadius * 2 * temp);
        this._tween.time = 1000;
        return isSuc;
    };
    // 飞向一个预测的点
    Ball.prototype.flyFuture = function (angle) {
        // 提前一个点 在篮板之前 跟篮板一起 运动
    };
    // 触发器 不会产生 实际接触点
    Ball.prototype.onTriggerEnter = function (event) {
        // console.log("触发器");
        if (event.owner) {
            this.tweenEndThen();
            var collName = event.owner.name;
            this.collisionAndThen(collName);
        }
    };
    // 碰撞体 会产生 实际接触点 但是会慢几帧
    Ball.prototype.onCollisionEnter = function (collision) {
        // console.log("碰撞体");
        var collName = collision.other.owner.name;
        this.collisionAndThen(collName);
    };
    Ball.prototype.getEndPos = function (isEndPos, angle) {
        if (isEndPos) {
            return _BallScene__WEBPACK_IMPORTED_MODULE_5__["BallScene"].inst.board.trailNode.transform.position;
        }
        else {
            var temp = this.trailNode.transform.position;
            var pos = _BallScene__WEBPACK_IMPORTED_MODULE_5__["BallScene"].inst.board.trailNode.transform.position;
            var direPos = Object(xengine_utils_math__WEBPACK_IMPORTED_MODULE_6__["direByAngle"])({ x: temp.x, y: temp.z }, angle);
            var disTimes = Math.abs(temp.z) * 0.7;
            // laya x坐标系是反的
            return new Laya.Vector3(temp.x + -direPos.x * disTimes, pos.y, temp.z + direPos.y * disTimes);
        }
    };
    Ball.prototype.dispose = function () {
        console.log("消失");
        _BallScene__WEBPACK_IMPORTED_MODULE_5__["BallScene"].inst.playBallDis(this.trailNode.transform.position.clone());
        modules_func_ParabolaFunc__WEBPACK_IMPORTED_MODULE_4__["ParabolaFunc"].instance.removeParabola(this._tween);
        Laya.timer.clearAll(this);
        this.setRigidBody(false);
        if (this.displayObject && this.displayObject.parent) {
            this.displayObject.parent.removeChild(this.displayObject);
        }
        _super.prototype.dispose.call(this);
        this.goalBool = false;
        this._flyComCallBack = null;
        this._tween = null;
        this.isHollow = true;
        this.used = false;
        this._rigidBody = null;
        this._collisionPanelNum = 0;
        this._colliderShape = null;
        Laya.Pool.recover("ball", this);
    };
    Ball.prototype.checkCanDis = function (bool) {
        var _this = this;
        if (bool === void 0) { bool = false; }
        // 撞到两次地板球消失
        if (this._collisionPanelNum == 1) {
            Laya.timer.once(2000, this, function () {
                _this.shootResult(false);
                _this.dispose();
            });
        }
        // 待改 LIUTODO
        if (this._collisionPanelNum >= 2 || bool) {
            this.shootResult(false);
            this.dispose();
        }
    };
    Ball.prototype.collisionAndThen = function (collName) {
        var bModule = this._ballModule;
        if (collName == bModule.panelName) {
            this._collisionPanelNum++;
            this.checkCanDis();
        }
        else if (collName == bModule.goalName) {
            this.shootResult(true);
        }
        else if (collName == bModule.boardName) {
            this.hollow = false;
        }
        else if (collName == bModule.baffleName) {
        }
        else if (collName == bModule.lanqiuName) {
        }
        else {
            this._collisionPanelNum++;
            this.checkCanDis();
        }
    };
    // 暂时 定的规则 球到地 或者 球进了
    Ball.prototype.shootResult = function (bool) {
        // // 取消监听
        // this.offEvent();
        this.goalBool = this.goalBool || bool;
        if (this._flyComCallBack && this._flyComCallBack.caller) {
            this._flyComCallBack.runWith(bool);
            this._flyComCallBack = null;
        }
    };
    Object.defineProperty(Ball.prototype, "hollow", {
        // 设置是否是空心  (撞到篮板 为非空心)
        set: function (value) {
            this.isHollow = !this.isHollow ? this.isHollow : value;
        },
        enumerable: true,
        configurable: true
    });
    Ball.prototype.tweenEndThen = function () {
        if (this._tween) {
            var force = this._tween.forceDire;
            var forceNum = this._ballModule.onceForce;
            modules_func_ParabolaFunc__WEBPACK_IMPORTED_MODULE_4__["ParabolaFunc"].instance.removeParabola(this._tween);
            Laya.Vector3.scale(force, forceNum, force);
            this._rigidBody.applyForce(force);
            this.setRigidBody(true);
            this._tween = null;
        }
    };
    Ball.prototype.getCorrectAngle = function (future) {
        if (future === void 0) { future = false; }
        if (!future) {
            var startPos = this.trailNode.transform.position.clone();
            var endPos = _BallScene__WEBPACK_IMPORTED_MODULE_5__["BallScene"].inst.board.trailNode.transform.position;
            // laya坐标系是反的
            return Object(xengine_utils_math__WEBPACK_IMPORTED_MODULE_6__["angleByPoint"])(startPos, endPos);
        }
    };
    // 返回抛物线中心点
    Ball.prototype.getCenterPos = function (startPos, endPos) {
        // 暂时写一个 点 LIUTODO
        var temp = new Laya.Vector3();
        var zOffset = endPos.z - startPos.z;
        temp.x = 0;
        temp.y = endPos.y * 2 + zOffset / 3;
        temp.z = startPos.z + 0.5 * zOffset;
        console.log(temp);
        return temp;
    };
    Ball.prototype.setRigidBody = function (bool) {
        if (!this._rigidBody) {
            console.log("bug");
        }
        this._rigidBody.isKinematic = !bool;
        this._rigidBody.isTrigger = !bool;
    };
    return Ball;
}(_base_TrailsSprite__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./src/view/3d/BallScene.ts":
/*!**********************************!*\
  !*** ./src/view/3d/BallScene.ts ***!
  \**********************************/
/*! exports provided: EEventType, BallScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EEventType", function() { return EEventType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BallScene", function() { return BallScene; });
/* harmony import */ var xengine_view_3d_XScene3D_laya__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/view/3d/XScene3D.laya */ "./src/xengine/view/3d/XScene3D.laya.ts");
/* harmony import */ var modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules/dataModule/BallModule */ "./src/modules/dataModule/BallModule.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var _Baffle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Baffle */ "./src/view/3d/Baffle.ts");
/* harmony import */ var xengine_utils_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xengine/utils/path */ "./src/xengine/utils/path.ts");
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Board */ "./src/view/3d/Board.ts");
/* harmony import */ var _Hero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Hero */ "./src/view/3d/Hero.ts");
/* harmony import */ var xengine_utils_math__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! xengine/utils/math */ "./src/xengine/utils/math.ts");
/* harmony import */ var view_main_MainScene__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! view/main/MainScene */ "./src/view/main/MainScene.ts");
/* harmony import */ var view_raw_3d_Sprite3D_TouQiuLiHua__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! view/raw/3d/Sprite3D_TouQiuLiHua */ "./src/view/raw/3d/Sprite3D_TouQiuLiHua.ts");
/* harmony import */ var view_raw_3d_Sprite3D_Wo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! view/raw/3d/Sprite3D_Wo */ "./src/view/raw/3d/Sprite3D_Wo.ts");
/* harmony import */ var view_raw_3d_Sprite3D_WanMei__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! view/raw/3d/Sprite3D_WanMei */ "./src/view/raw/3d/Sprite3D_WanMei.ts");
/* harmony import */ var view_raw_3d_Sprite3D_HengBang__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! view/raw/3d/Sprite3D_HengBang */ "./src/view/raw/3d/Sprite3D_HengBang.ts");
/* harmony import */ var view_raw_3d_Sprite3D_ChaoJiWanMei__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! view/raw/3d/Sprite3D_ChaoJiWanMei */ "./src/view/raw/3d/Sprite3D_ChaoJiWanMei.ts");
/* harmony import */ var xengine_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! xengine/utils */ "./src/xengine/utils/index.ts");
/* harmony import */ var view_raw_3d_Sprite3D_LuoDiYan__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! view/raw/3d/Sprite3D_LuoDiYan */ "./src/view/raw/3d/Sprite3D_LuoDiYan.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
















var EEventType;
(function (EEventType) {
    EEventType["PROCHANGE"] = "proChange";
    EEventType["GAMEFAIL"] = "gameFail";
    EEventType["GAMEWIN"] = "gameWin";
})(EEventType || (EEventType = {}));
var BallScene = /** @class */ (function (_super) {
    __extends(BallScene, _super);
    function BallScene(url) {
        var _this = _super.call(this, url) || this;
        _this._ballModule = null;
        _this._shootOverNum = 0;
        // 后退动作
        _this._endOverNum = 0;
        _this._gameOver = false;
        // 投篮算游戏开始
        _this._touchStart = false;
        _this._pingjias = [];
        _this._toHeroOffSet = new Laya.Vector3(0, 1.7, -3.4);
        _this._touchStartPos = new Laya.Point;
        _this._touchMovePos = new Laya.Point;
        _this._ballModule = xengine_game_Game__WEBPACK_IMPORTED_MODULE_2__["default"].inst.get_module(modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_1__["default"]);
        return _this;
    }
    Object.defineProperty(BallScene, "inst", {
        get: function () {
            this._instance = this._instance || new BallScene("");
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    BallScene.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var skinName, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.levelVo = this._ballModule.nowLevelVo();
                        this._shootOverNum = 0;
                        this._endOverNum = 0;
                        this._gameOver = false;
                        this._touchStart = false;
                        skinName = this.levelVo.levelData.skin;
                        this.url = xengine_utils_path__WEBPACK_IMPORTED_MODULE_4__["path"].res3DUrlByName(skinName, skinName);
                        if (!(!this.displayObject || this.displayObject.url != this.url)) return [3 /*break*/, 2];
                        this.displayObject && this.displayObject.destroy();
                        _a = this;
                        return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        _a.displayObject = _b.sent();
                        _b.label = 2;
                    case 2:
                        console.log("1");
                        this.camera = this.displayObject.getChildByName("Camera");
                        this._light = this.displayObject.getChildByName("Light");
                        this.addAllRestitution();
                        this.initCamera();
                        console.log("2");
                        // let cls = Laya.ClassUtils.getClass(`ui.Scene_${skinName}`);
                        // this.scene = new cls();
                        // await this.scene.instance();
                        // 生成篮板
                        return [4 /*yield*/, this.createBoard()];
                    case 3:
                        // let cls = Laya.ClassUtils.getClass(`ui.Scene_${skinName}`);
                        // this.scene = new cls();
                        // await this.scene.instance();
                        // 生成篮板
                        _b.sent();
                        console.log("3");
                        return [4 /*yield*/, this.createBaffles()];
                    case 4:
                        _b.sent();
                        console.log("4");
                        return [4 /*yield*/, this.createHeros()];
                    case 5:
                        _b.sent();
                        console.log("5");
                        this.add_child(this.board);
                        this.board.startGame();
                        // 生成挡板
                        this.heros.forEach(function (hero, index) {
                            _this.add_child(hero);
                            hero.startGame();
                        });
                        this._baffles.forEach(function (baffle, index) {
                            _this.board.trailNode.addChild(baffle.displayObject);
                            baffle.startGame();
                        });
                        this.startOnTouch();
                        this.openCameraToHero(this._myHero.trailNode, true);
                        this.initEffect();
                        console.log("6");
                        return [2 /*return*/];
                }
            });
        });
    };
    // 下一轮投射开始
    BallScene.prototype.nextShootStart = function () {
        // 可能延迟 半秒 效果会好点
        this._shootOverNum = 0;
        this._endOverNum = 0;
        this.heros.forEach(function (hero, index) {
            hero.startGame();
            hero.autoShoot();
        });
        this.startOnTouch();
    };
    BallScene.prototype.initEffect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.getPrefabBayClass(this._lihua, view_raw_3d_Sprite3D_TouQiuLiHua__WEBPACK_IMPORTED_MODULE_9__["default"])];
                    case 1:
                        _a._lihua = _f.sent();
                        _b = this;
                        return [4 /*yield*/, this.getPrefabBayClass(this._wo, view_raw_3d_Sprite3D_Wo__WEBPACK_IMPORTED_MODULE_10__["default"])];
                    case 2:
                        _b._wo = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this.getPrefabBayClass(this._wanmei, view_raw_3d_Sprite3D_WanMei__WEBPACK_IMPORTED_MODULE_11__["default"])];
                    case 3:
                        _c._wanmei = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this.getPrefabBayClass(this._hengbang, view_raw_3d_Sprite3D_HengBang__WEBPACK_IMPORTED_MODULE_12__["default"])];
                    case 4:
                        _d._hengbang = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this.getPrefabBayClass(this._cwanmei, view_raw_3d_Sprite3D_ChaoJiWanMei__WEBPACK_IMPORTED_MODULE_13__["default"])];
                    case 5:
                        _e._cwanmei = _f.sent();
                        this._pingjias = [this._wo, this._wanmei, this._hengbang, this._cwanmei];
                        return [2 /*return*/];
                }
            });
        });
    };
    BallScene.prototype.getPrefabBayClass = function (obj, cls) {
        return __awaiter(this, void 0, void 0, function () {
            var temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        temp = obj;
                        if (!(!obj || obj.displayObject.destroyed)) return [3 /*break*/, 2];
                        temp = new cls();
                        return [4 /*yield*/, temp.instance()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, temp];
                }
            });
        });
    };
    BallScene.prototype.playBallDis = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, particleSystem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.getPrefabBayClass(null, view_raw_3d_Sprite3D_LuoDiYan__WEBPACK_IMPORTED_MODULE_15__["default"])];
                    case 1:
                        _a._ballDisAni = _b.sent();
                        this._ballDisAni.displayObject.transform.position = pos;
                        particleSystem = this._ballDisAni.displayObject.particleSystem;
                        this._ballDisAni.displayObject.active = true;
                        this.displayObject.addChild(this._ballDisAni.displayObject);
                        particleSystem.play();
                        return [2 /*return*/];
                }
            });
        });
    };
    BallScene.prototype.playLihuaAndGood = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pos, particleSystem, index, effect;
            return __generator(this, function (_a) {
                pos = this.board.trailNode.transform.position;
                this._lihua.displayObject.transform.position = pos;
                particleSystem = this._lihua.displayObject.particleSystem;
                this._lihua.displayObject.active = true;
                this.displayObject.addChild(this._lihua.displayObject);
                particleSystem.play();
                index = Math.floor(Object(xengine_utils__WEBPACK_IMPORTED_MODULE_14__["random_range"])(0, this._pingjias.length));
                effect = this._pingjias[index];
                this.displayObject.addChild(effect.displayObject);
                effect.displayObject.transform.position = pos;
                effect.displayObject.active = true;
                effect.displayObject.particleSystem.play();
                return [2 /*return*/];
            });
        });
    };
    BallScene.prototype.shootProAdd = function () {
        this._shootOverNum++;
        if (this._shootOverNum >= this.heros.length) {
            // 投篮结束
            this.heros.forEach(function (hero, index) {
                hero.shootEnd();
            });
        }
        this.event(EEventType.PROCHANGE);
    };
    BallScene.prototype.endProAdd = function () {
        this._endOverNum++;
        if (this._endOverNum >= this.heros.length) {
            // 下一轮开始
            this.nextShootStart();
        }
    };
    BallScene.prototype.gameOver = function (winHero) {
        // 播放一系列动画
        if (this._gameOver) {
            return;
        }
        this._winHero = winHero;
        this._gameOver = true;
        winHero.setHeroState(_Hero__WEBPACK_IMPORTED_MODULE_6__["EHeroState"].WIN);
        this.heros.forEach(function (hero) {
            if (hero != winHero) {
                hero.setHeroState(_Hero__WEBPACK_IMPORTED_MODULE_6__["EHeroState"].FAIL);
            }
        });
    };
    BallScene.prototype.cameraToHeroAndResult = function () {
        var temp = new Laya.Vector3();
        Laya.Vector3.add(this._myHero.trailNode.transform.position, this._toHeroOffSet, temp);
        this.tweenCamera(temp, 1000, Laya.Handler.create(this, this.resultView));
    };
    // 打开结算界面
    BallScene.prototype.resultView = function () {
        if (this._winHero.heroVo.isPlayer) {
            // 玩家胜利
            view_main_MainScene__WEBPACK_IMPORTED_MODULE_8__["default"].inst.showGameWinView();
            this.event(EEventType.GAMEWIN);
        }
        else {
            // 敌人胜利
            view_main_MainScene__WEBPACK_IMPORTED_MODULE_8__["default"].inst.showGameFailView();
            this.event(EEventType.GAMEFAIL);
        }
    };
    BallScene.prototype.tweenCamera = function (point, time, comCallBack) {
        var _this = this;
        Laya.Tween.to(this.camera.transform.position, {
            x: point.x,
            y: point.y,
            z: point.z,
            update: new Laya.Handler(this, function () {
                _this.camera.transform.position = _this.camera.transform.position;
            })
        }, time, null, comCallBack);
    };
    // 简单镜头跟随
    BallScene.prototype.openCameraToHero = function (com, setHero) {
        if (setHero === void 0) { setHero = false; }
        com.addChild(this.camera);
        setHero && (this.camera.transform.localPosition = this._toHeroOffSet);
    };
    BallScene.prototype.addAllRestitution = function () {
        var _this = this;
        if (this.displayObject) {
            var childs = this.displayObject['_children'];
            if (childs) {
                childs.forEach(function (node) {
                    var physicsCollider = node.getComponent(Laya.PhysicsCollider);
                    physicsCollider && (physicsCollider.restitution = _this._ballModule.panelForce);
                });
            }
        }
    };
    BallScene.prototype.closeCameraToHero = function () {
        this.camera.parent.removeChild(this.camera);
    };
    BallScene.prototype.dispose = function () {
        this.heros && this.heros.forEach(function (hero, index) {
            hero.dispose();
        });
        this.heros = [];
        this._balls && this._balls.forEach(function (ball) {
            ball.dispose();
        });
        this._balls = [];
        this._baffles && this._baffles.forEach(function (baffle) {
            baffle.dispose();
        });
        this.board && this.board.dispose();
        this.board = null;
    };
    BallScene.prototype.startOnTouch = function () {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
    };
    BallScene.prototype.onMouseDown = function (event) {
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        this._touchStartPos.x = event.stageX;
        this._touchStartPos.y = event.stageY;
    };
    BallScene.prototype.onMouseMove = function (event) {
        this._touchMovePos.x = event.stageX;
        this._touchMovePos.y = event.stageY;
        var dis = this._touchMovePos.distance(this._touchStartPos.x, this._touchStartPos.y);
        // 判断是否可以弹射
        if (dis >= this._ballModule.touchDisShoot) {
            // 第一次开始
            if (!this._touchStart) {
                this._touchStart = true;
                view_main_MainScene__WEBPACK_IMPORTED_MODULE_8__["default"].inst.showProView();
                // 视角切换
                var position = this.camera.transform.position;
                this.tweenCamera(new Laya.Vector3(position.x, 2.15, position.z), 1000);
                this.heros.forEach(function (hero) {
                    hero.autoShoot();
                });
            }
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            // 开始弹射
            var angle = Object(xengine_utils_math__WEBPACK_IMPORTED_MODULE_7__["angleByPoint"])(this._touchMovePos, this._touchStartPos);
            this._myHero.shoot(angle);
        }
    };
    BallScene.prototype.initCamera = function () {
        this.camera.enableRender = true;
        // this._camera.transform.position = new Laya.Vector3(0, 1, 10)
        var light = this._light;
        //灯光开启阴影
        light.active = true;
        light.shadow = true;
        //可见阴影距离
        light.shadowDistance = 20;
        //生成阴影贴图尺寸
        light.shadowResolution = 2048;
        // light.intensity = 5;
        //生成阴影贴图数量
        light.shadowPSSMCount = 1;
        //模糊等级,越大越高,更耗性能
        light.shadowPCFType = 3;
    };
    BallScene.prototype.createBoard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var boardVo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        boardVo = this.levelVo.boardVo;
                        this.board = new _Board__WEBPACK_IMPORTED_MODULE_5__["default"]("");
                        this.board.initData(boardVo);
                        return [4 /*yield*/, this.board.instance()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BallScene.prototype.createHeros = function () {
        return __awaiter(this, void 0, void 0, function () {
            var herosVo, ballsData, heroNum, i, temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        herosVo = this.levelVo.herosVo;
                        ballsData = this.levelVo.ballsData;
                        heroNum = herosVo.length;
                        this.heros = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < heroNum)) return [3 /*break*/, 4];
                        temp = new _Hero__WEBPACK_IMPORTED_MODULE_6__["default"]();
                        this.heros[i] = temp;
                        temp.initData(herosVo[i], ballsData[i], this);
                        return [4 /*yield*/, temp.instance()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this._myHero = this.heros[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    BallScene.prototype.createBaffles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bafflesVo, len, i, temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._baffles = [];
                        bafflesVo = this.levelVo.bafflesVo;
                        len = bafflesVo.length;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < len)) return [3 /*break*/, 4];
                        temp = new _Baffle__WEBPACK_IMPORTED_MODULE_3__["default"]("") //Laya.Pool.getItemByClass("baffles", Baffle) as Baffle;
                        ;
                        this._baffles[i] = temp;
                        temp.initData(bafflesVo[i]);
                        return [4 /*yield*/, temp.instance()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BallScene;
}(xengine_view_3d_XScene3D_laya__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./src/view/3d/Board.ts":
/*!******************************!*\
  !*** ./src/view/3d/Board.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules/dataModule/BallModule */ "./src/modules/dataModule/BallModule.ts");
/* harmony import */ var xengine_utils_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/utils/path */ "./src/xengine/utils/path.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var _base_TrailsSprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/TrailsSprite */ "./src/view/3d/base/TrailsSprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




// 篮板
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Board.prototype.initData = function (boardVo) {
        this._ballModule = xengine_game_Game__WEBPACK_IMPORTED_MODULE_2__["default"].inst.get_module(modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_0__["default"]);
        this._boardVo = boardVo;
        this.skinName = boardVo.boardData.skin;
        this.url = xengine_utils_path__WEBPACK_IMPORTED_MODULE_1__["path"].res3DUrlByName(this._ballModule.futureResUrl, boardVo.boardData.skin, false);
    };
    Board.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        node = _a.sent();
                        this.goalCube = this.anchorNode.getChildByName("goalCube");
                        return [2 /*return*/, node];
                }
            });
        });
    };
    // 游戏开始
    Board.prototype.startGame = function () {
        this.trails.initData(this._boardVo.trailVos, this);
        var physicsCollider = this.trailNode.getComponent(Laya.PhysicsCollider);
        physicsCollider && (physicsCollider.restitution = this._ballModule.boardForce);
        // 设置是否易碎
        // 打开碰撞
        // 设置位置
        this.trails.startRun();
    };
    return Board;
}(_base_TrailsSprite__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Board);


/***/ }),

/***/ "./src/view/3d/Hero.ts":
/*!*****************************!*\
  !*** ./src/view/3d/Hero.ts ***!
  \*****************************/
/*! exports provided: EHeroState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EHeroState", function() { return EHeroState; });
/* harmony import */ var modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules/dataModule/BallModule */ "./src/modules/dataModule/BallModule.ts");
/* harmony import */ var xengine_utils_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/utils/path */ "./src/xengine/utils/path.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ball */ "./src/view/3d/Ball.ts");
/* harmony import */ var xengine_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xengine/utils */ "./src/xengine/utils/index.ts");
/* harmony import */ var view_raw_3d_Sprite3D_hero1__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! view/raw/3d/Sprite3D_hero1 */ "./src/view/raw/3d/Sprite3D_hero1.ts");
/* harmony import */ var modules_func_ParabolaFunc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! modules/func/ParabolaFunc */ "./src/modules/func/ParabolaFunc.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var EHeroState;
(function (EHeroState) {
    EHeroState["FAIL"] = "fail";
    EHeroState["WIN"] = "win";
    EHeroState["WALK"] = "walk";
    EHeroState["SHOOT"] = "shoot";
    EHeroState["IDLE"] = "idle_2";
    EHeroState["IDLE_WAIT"] = "idle_1";
})(EHeroState || (EHeroState = {}));
// 面板  也可作为 障碍物
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 当前第几关  （大致关）
        _this.levelNum = -1;
        _this.goalBool = false;
        return _this;
    }
    // 可能以后会伴随 技能  暂时只认皮肤
    Hero.prototype.initData = function (heroVo, ballData, scene) {
        this._ballModule = xengine_game_Game__WEBPACK_IMPORTED_MODULE_2__["default"].inst.get_module(modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_0__["default"]);
        this.scene = scene;
        this.heroVo = heroVo;
        this._ballData = ballData;
        this.url = xengine_utils_path__WEBPACK_IMPORTED_MODULE_1__["path"].res3DUrlByName(this._ballModule.futureResUrl, heroVo.heroData.skin, false);
    };
    Hero.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        node = _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.getBall()];
                    case 2:
                        _a._ball = _b.sent();
                        this.cAnimator_juese = this.trailNode.getComponent(Laya.Animator);
                        this.trails.initData(this.heroVo.trailVos, this);
                        return [2 /*return*/, node];
                }
            });
        });
    };
    // 游戏开始
    Hero.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this._ball && !this._ball.used && this._ball.displayObject)) return [3 /*break*/, 1];
                        return [3 /*break*/, 3];
                    case 1:
                        _a = this;
                        return [4 /*yield*/, this.getBall()];
                    case 2:
                        _a._ball = _b.sent();
                        _b.label = 3;
                    case 3:
                        this._ball.onEvent();
                        this._ball.startGame(this.scene.displayObject);
                        // 非玩家自动投  玩家自投
                        this.setHeroState(EHeroState.IDLE_WAIT);
                        Laya.timer.frameOnce(1, this, this.initBallPos);
                        return [2 /*return*/];
                }
            });
        });
    };
    Hero.prototype.setHeroState = function (state) {
        if (this.heroState == state)
            return;
        this.heroState = state;
        this.cAnimator_juese.play(state);
        if (state == EHeroState.WIN || state == EHeroState.FAIL) {
            Laya.timer.clear(this, this.shoot);
        }
    };
    Hero.prototype.autoShoot = function () {
        if (!this.heroVo.isPlayer) {
            var min = this._ballModule.playShootTimeMin;
            var max = this._ballModule.playShootTimeMax;
            var shootTime = Object(xengine_utils__WEBPACK_IMPORTED_MODULE_4__["random_range"])(min, max);
            Laya.timer.once(shootTime * 1000, this, this.shoot);
        }
    };
    Hero.prototype.dispose = function () {
        modules_func_ParabolaFunc__WEBPACK_IMPORTED_MODULE_6__["ParabolaFunc"].instance.removeParabola(this._tween);
        this._tween = null;
        Laya.timer.clearAll(this);
        _super.prototype.dispose.call(this);
    };
    // 投篮
    Hero.prototype.shoot = function (angle) {
        var _this = this;
        // 当前球已被使用
        if (this._ball.used)
            return;
        this.scene.displayObject.addChild(this._ball.displayObject);
        this.setHeroState(EHeroState.SHOOT);
        // 就是最后一波            Laya.timer.clear(this, this.initBallPos);
        var bool = this._ball.fly(angle, Laya.Handler.create(this, function (bool) {
            _this.goalBool = bool;
            if (bool) {
                _this.levelNum++;
                _this.heroVo.isPlayer && _this.scene.playLihuaAndGood();
            }
            if (_this.levelNum >= (_this._ballModule.allShootNum - 1) && bool) {
                _this.scene.gameOver(_this);
                !_this.heroVo.isPlayer && _this.scene.cameraToHeroAndResult();
            }
            else
                _this.scene.shootProAdd();
        }));
        // 摄像机镜头跟随 篮球
        if ((this.levelNum == this._ballModule.allShootNum - 2) && bool && this.heroVo.isPlayer) {
            var endPos = this._ball.getEndPos(true, null).clone();
            Laya.Vector3.add(endPos, new Laya.Vector3(0, 2, -5), endPos);
            var startPos = this.scene.camera.transform.position.clone();
            this._tween = modules_func_ParabolaFunc__WEBPACK_IMPORTED_MODULE_6__["ParabolaFunc"].instance.startPairingParabola(this.scene.camera, startPos, endPos, Laya.Handler.create(this, function () {
                _this.scene.cameraToHeroAndResult();
            }), this.getBallCenterPos(startPos, endPos));
            this._tween.targetRotationChange(false);
        }
        // 投球时间 150 
    };
    // 本轮投射结束开始 结算
    Hero.prototype.shootEnd = function () {
        if (this.goalBool) {
            this.backOne();
        }
        else {
            this.scene.endProAdd();
        }
    };
    // 播放人物后退动作
    Hero.prototype.backOne = function () {
        var _this = this;
        this.setHeroState(EHeroState.WALK);
        this.trails.startRun(false, Laya.Handler.create(this, function () {
            _this.scene.endProAdd();
        }), this.levelNum);
    };
    Hero.prototype.getBall = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ball;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ball = Laya.Pool.getItemByClass("ball", _Ball__WEBPACK_IMPORTED_MODULE_3__["Ball"]);
                        ball.initData(this._ballData);
                        return [4 /*yield*/, ball.instance()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ball];
                }
            });
        });
    };
    // 返回篮球抛物线中心点
    Hero.prototype.getBallCenterPos = function (startPos, endPos) {
        // 暂时写一个 点 LIUTODO
        var temp = new Laya.Vector3();
        temp.x = 0;
        temp.y = endPos.y * 2;
        temp.z = (startPos.z + endPos.z) / 2;
        console.log(temp);
        return temp;
    };
    Hero.prototype.initBallPos = function () {
        // this._ball.trailNode.transform.position = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_Head_Point002.transform.position;
        // this.cAnimator_juese.linkSprite3DToAvatarNode("Point001",this._ball.trailNode);
        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Point001.addChild(this._ball.displayObject);
        this._ball.displayObject.transform.position = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Point001.transform.position;
    };
    return Hero;
}(view_raw_3d_Sprite3D_hero1__WEBPACK_IMPORTED_MODULE_5__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Hero);


/***/ }),

/***/ "./src/view/3d/Trail.ts":
/*!******************************!*\
  !*** ./src/view/3d/Trail.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modules/dataModule/BallModule */ "./src/modules/dataModule/BallModule.ts");

// 运动轨迹类
var Trails = /** @class */ (function () {
    function Trails() {
        this._timeMark = 10000;
        this._nowPos = new Laya.Vector3();
        this._nowRotate = new Laya.Vector3();
        this._tween = new Laya.Tween();
    }
    // 模型加载完后
    Trails.prototype.initData = function (trailsVo, sprite3d) {
        this.trailsVo = trailsVo;
        this.sprite3d = sprite3d;
        this.anchorNode = sprite3d.anchorNode;
        this.trailNode = sprite3d.trailNode;
        this._playing = false;
        this._pro = 0;
        this.updatePos();
    };
    /**
     * @param loop 是否循环
     * @param onceCallBack 结束回调
     * @param pro 播放制定进度
     */
    Trails.prototype.startRun = function (loop, onceCallBack, pro) {
        if (loop === void 0) { loop = true; }
        this._loop = loop;
        this._pro = pro == null ? 0 : pro;
        this._onlyNowPro = pro == null ? false : true;
        this._onceCallBack = onceCallBack;
        this.playTrail();
    };
    Trails.prototype.updatePos = function () {
        var trailVo = this.trailsVo[this._pro];
        if (trailVo) {
            this.anchorNode.transform.localPosition = trailVo.anchor.clone();
            this.trailNode.transform.localPosition = trailVo.startPos.clone();
        }
    };
    Trails.prototype.playTrail = function () {
        var _this = this;
        if (!this.sprite3d.displayObject || this.sprite3d.displayObject.destroyed)
            return;
        this._playing = true;
        this.updatePos();
        var trailVo = this.trailsVo[this._pro];
        if (trailVo.trailData.type == modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_0__["ETrailType"].LINE) {
            // 暂时认为 按表中的点 没有突发情况
            console.log("直线运动");
            var endPos = trailVo.endPos;
            this.trailNode.transform.localPosition.cloneTo(this._nowPos);
            this._tween.to(this._nowPos, {
                x: endPos.x, y: endPos.y,
                z: endPos.z, update: new Laya.Handler(this, function () {
                    _this._nowPos.cloneTo(_this.trailNode.transform.localPosition);
                    _this.trailNode.transform.localPosition = _this.trailNode.transform.localPosition;
                    // 暂时 实时更新 时间位置   LIUTODO
                    _this.trailNode.transform.position = _this.trailNode.transform.position;
                })
                // 暂时使用 这个完成回调 如果有误差 改成定时器
            }, this._timeMark / trailVo.trailData.speed, trailVo.ease, Laya.Handler.create(this, this.playTrailThen), null, true);
        }
        else if (trailVo.trailData.type == modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_0__["ETrailType"].ROTATE) {
            console.log("曲线运动");
            var rotate = trailVo.rotate;
            this._tween.to(this._nowRotate, {
                x: rotate.x || 0, y: rotate.y || 0, z: rotate.z || 0, update: new Laya.Handler(this, function () {
                    _this._nowRotate.cloneTo(_this.anchorNode.transform.localRotationEuler);
                    _this.anchorNode.transform.localRotationEuler = _this.anchorNode.transform.localRotationEuler;
                })
            }, this._timeMark / trailVo.trailData.speed, trailVo.ease, Laya.Handler.create(this, this.playTrailThen), null, true);
        }
        else if (trailVo.trailData.type == modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_0__["ETrailType"].CIRCLE) {
            this._circleAcher = this._circleAcher || new Laya.Sprite3D();
            var parent_1 = this.sprite3d.displayObject.parent;
            parent_1.addChild(this._circleAcher);
            this._circleAcher.transform.localPosition = new Laya.Vector3(0, 0, 0);
            var index = this._circleIndex || new Laya.Sprite3D();
            this._circleAcher.addChild(index);
            index.transform.localPosition = this.trailNode.transform.localPosition;
            var rotate = trailVo.rotate;
            this._tween.to(this._nowRotate, {
                x: rotate.x || 0, y: rotate.y || 0, z: rotate.z || 0, update: new Laya.Handler(this, function () {
                    _this._nowRotate.cloneTo(_this.anchorNode.transform.localRotationEuler);
                    _this.anchorNode.transform.localRotationEuler = _this.anchorNode.transform.localRotationEuler;
                    _this.trailNode.transform.position = _this._circleIndex.transform.position;
                })
            }, this._timeMark / trailVo.trailData.speed, trailVo.ease, Laya.Handler.create(this, this.playTrailThen), null, true);
        }
        else {
            console.log("障碍物");
        }
    };
    Trails.prototype.playTrailThen = function () {
        var _this = this;
        this._pro++;
        var callBack = function () {
            if (_this._onceCallBack && _this._onceCallBack.caller) {
                _this._onceCallBack.run();
                _this._onceCallBack = null;
            }
        };
        if (this._onlyNowPro) {
            callBack();
            return;
        }
        if (this._pro >= this.trailsVo.length) {
            if (!this._loop) {
                callBack();
                return;
            }
            this._pro = 0;
        }
        var delay = this.trailsVo[this._pro].trailData.pause || 0;
        if (!delay)
            this.playTrail();
        else
            Laya.timer.once(delay, this, this.playTrail);
    };
    Object.defineProperty(Trails.prototype, "Play", {
        get: function () {
            return this._playing;
        },
        set: function (bool) {
            this._playing = bool;
            if (bool)
                this.playTrail();
            else
                this.pause();
        },
        enumerable: true,
        configurable: true
    });
    Trails.prototype.dispose = function () {
        this._tween && this._tween.clear();
        this._tween = null;
    };
    Trails.prototype.pause = function () {
    };
    return Trails;
}());
/* harmony default export */ __webpack_exports__["default"] = (Trails);


/***/ }),

/***/ "./src/view/3d/base/ColliderTrigger.ts":
/*!*********************************************!*\
  !*** ./src/view/3d/base/ColliderTrigger.ts ***!
  \*********************************************/
/*! exports provided: ColliderEvents, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColliderEvents", function() { return ColliderEvents; });
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ColliderEvents;
(function (ColliderEvents) {
    ColliderEvents["TRIGGER_START"] = "TRIGGER_START";
    ColliderEvents["COLLIDE_START"] = "COLLIDE_START";
})(ColliderEvents || (ColliderEvents = {}));
var ColliderTrigger = /** @class */ (function (_super) {
    __extends(ColliderTrigger, _super);
    function ColliderTrigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventer = new xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]();
        return _this;
    }
    ColliderTrigger.prototype.onTriggerEnter = function (other) {
        this.eventer.event(ColliderEvents.TRIGGER_START, other);
    };
    ColliderTrigger.prototype.onCollisionEnter = function (collision) {
        this.eventer.event(ColliderEvents.COLLIDE_START, collision);
    };
    return ColliderTrigger;
}(Laya.Script3D));
/* harmony default export */ __webpack_exports__["default"] = (ColliderTrigger);


/***/ }),

/***/ "./src/view/3d/base/TrailsSprite.ts":
/*!******************************************!*\
  !*** ./src/view/3d/base/TrailsSprite.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/view/3d/X3D */ "./src/xengine/view/3d/X3D.ts");
/* harmony import */ var _Trail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Trail */ "./src/view/3d/Trail.ts");
/* harmony import */ var _ColliderTrigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ColliderTrigger */ "./src/view/3d/base/ColliderTrigger.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



// 具有运动轨迹 的对象
var TrailsSprite = /** @class */ (function (_super) {
    __extends(TrailsSprite, _super);
    function TrailsSprite(url) {
        var _this = _super.call(this, url) || this;
        _this.trails = new _Trail__WEBPACK_IMPORTED_MODULE_1__["default"]();
        return _this;
    }
    TrailsSprite.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        node = _a.sent();
                        this.anchorNode = this.displayObject;
                        this.trailNode = this.anchorNode.getChildAt(0);
                        this.trigger = this.trailNode.addComponent(_ColliderTrigger__WEBPACK_IMPORTED_MODULE_2__["default"]);
                        this.onEvent();
                        return [2 /*return*/, node];
                }
            });
        });
    };
    TrailsSprite.prototype.onEvent = function () {
        this.trigger.eventer.on(_ColliderTrigger__WEBPACK_IMPORTED_MODULE_2__["ColliderEvents"].TRIGGER_START, this, this.onTriggerEnter);
        this.trigger.eventer.on(_ColliderTrigger__WEBPACK_IMPORTED_MODULE_2__["ColliderEvents"].COLLIDE_START, this, this.onCollisionEnter);
    };
    TrailsSprite.prototype.offEvent = function () {
        if (this.trigger) {
            this.trigger.eventer.off(_ColliderTrigger__WEBPACK_IMPORTED_MODULE_2__["ColliderEvents"].TRIGGER_START, this, this.onTriggerEnter);
            this.trigger.eventer.off(_ColliderTrigger__WEBPACK_IMPORTED_MODULE_2__["ColliderEvents"].COLLIDE_START, this, this.onCollisionEnter);
        }
    };
    TrailsSprite.prototype.dispose = function () {
        this.offEvent();
        this.trails && this.trails.dispose();
        this.trails = null;
        this.displayObject && this.displayObject.destroy();
        this.displayObject = null;
    };
    TrailsSprite.prototype.onTriggerEnter = function (event) {
    };
    TrailsSprite.prototype.onCollisionEnter = function (collision) {
        console.log("碰撞体");
    };
    return TrailsSprite;
}(xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__["default"].Sprite3D));
/* harmony default export */ __webpack_exports__["default"] = (TrailsSprite);


/***/ }),

/***/ "./src/view/ToastView.ts":
/*!*******************************!*\
  !*** ./src/view/ToastView.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _raw_Common_UI_ToastView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw/Common/UI_ToastView */ "./src/view/raw/Common/UI_ToastView.ts");
/* harmony import */ var xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/XEngine */ "./src/xengine/XEngine.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ToastView = /** @class */ (function (_super) {
    __extends(ToastView, _super);
    function ToastView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ToastView.prototype, "popup_duration", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ToastView.prototype.constructFromResource = function () {
        _super.prototype.constructFromResource.call(this);
    };
    ToastView.prototype.on_popup = function () {
        this.setXY((xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__["default"].inst.stage.width - this.width) / 2, 30);
        this.m_anim.play();
    };
    ToastView.prototype.set_message = function (message) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.m_text.text = message;
    };
    return ToastView;
}(_raw_Common_UI_ToastView__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ToastView);


/***/ }),

/***/ "./src/view/dialogs/TestDialog.ts":
/*!****************************************!*\
  !*** ./src/view/dialogs/TestDialog.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_view_DialogWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/view/DialogWindow */ "./src/xengine/view/DialogWindow.ts");
/* harmony import */ var view_raw_Main_UI_TestDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! view/raw/Main/UI_TestDialog */ "./src/view/raw/Main/UI_TestDialog.ts");
/* harmony import */ var view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! view */ "./src/view/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TestDialog = /** @class */ (function (_super) {
    __extends(TestDialog, _super);
    function TestDialog() {
        var _this = _super.call(this) || this;
        view__WEBPACK_IMPORTED_MODULE_2__["FairyGUIBinder"].onClick(_this.dialog_view.m_bt_close, _this, _this.hide);
        return _this;
    }
    TestDialog.prototype.makeDialog = function () {
        return {
            inst: view_raw_Main_UI_TestDialog__WEBPACK_IMPORTED_MODULE_1__["default"].createInstance(),
            modal: true,
            title: '测试对话框'
        };
    };
    TestDialog.prototype.onReadyToShow = function () {
        if (this.params.length) {
            this.dialog_view.m_lb_message.text = this.params[0];
        }
    };
    TestDialog = __decorate([
        Object(xengine_view_DialogWindow__WEBPACK_IMPORTED_MODULE_0__["dialog"])("test")
    ], TestDialog);
    return TestDialog;
}(xengine_view_DialogWindow__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (TestDialog);


/***/ }),

/***/ "./src/view/index.ts":
/*!***************************!*\
  !*** ./src/view/index.ts ***!
  \***************************/
/*! exports provided: FairyGUIBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FairyGUIBinder", function() { return FairyGUIBinder; });
/* harmony import */ var _raw_Splash_UI_Splash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw/Splash/UI_Splash */ "./src/view/raw/Splash/UI_Splash.ts");
/* harmony import */ var _raw_Splash_SplashBinder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw/Splash/SplashBinder */ "./src/view/raw/Splash/SplashBinder.ts");
/* harmony import */ var _raw_Common_CommonBinder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./raw/Common/CommonBinder */ "./src/view/raw/Common/CommonBinder.ts");
/* harmony import */ var _raw_Main_MainBinder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./raw/Main/MainBinder */ "./src/view/raw/Main/MainBinder.ts");
/* harmony import */ var xengine_view_FairyGUIHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xengine/view/FairyGUIHelper */ "./src/xengine/view/FairyGUIHelper.ts");
/* harmony import */ var _splash_SplashScene__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./splash/SplashScene */ "./src/view/splash/SplashScene.ts");
/* harmony import */ var _dialogs_TestDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dialogs/TestDialog */ "./src/view/dialogs/TestDialog.ts");
/* harmony import */ var _main_MainScene__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./main/MainScene */ "./src/view/main/MainScene.ts");
/* harmony import */ var _raw_Main_UI_Main__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./raw/Main/UI_Main */ "./src/view/raw/Main/UI_Main.ts");
/* harmony import */ var _ToastView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ToastView */ "./src/view/ToastView.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();










var FairyGUIBinder = /** @class */ (function (_super) {
    __extends(FairyGUIBinder, _super);
    function FairyGUIBinder(stage, res, res_dir, binary_extension) {
        if (res_dir === void 0) { res_dir = 'assets/ui'; }
        if (binary_extension === void 0) { binary_extension = 'bin'; }
        return _super.call(this, stage, res, res_dir, binary_extension) || this;
    }
    FairyGUIBinder.prototype.bind_views = function () {
        _raw_Splash_SplashBinder__WEBPACK_IMPORTED_MODULE_1__["default"].bindAll();
        _raw_Common_CommonBinder__WEBPACK_IMPORTED_MODULE_2__["default"].bindAll();
        _raw_Main_MainBinder__WEBPACK_IMPORTED_MODULE_3__["default"].bindAll();
        // 绑定视图类
        this.bind_view(_raw_Splash_UI_Splash__WEBPACK_IMPORTED_MODULE_0__["default"].URL, _splash_SplashScene__WEBPACK_IMPORTED_MODULE_5__["default"], true);
        this.bind_view(_raw_Main_UI_Main__WEBPACK_IMPORTED_MODULE_8__["default"].URL, _main_MainScene__WEBPACK_IMPORTED_MODULE_7__["default"], true);
        // 注册 Toast 视图
        this.register_toast_view(_ToastView__WEBPACK_IMPORTED_MODULE_9__["default"]);
        // 注册对话框
        this.register_dialog(_dialogs_TestDialog__WEBPACK_IMPORTED_MODULE_6__["default"]);
    };
    return FairyGUIBinder;
}(xengine_view_FairyGUIHelper__WEBPACK_IMPORTED_MODULE_4__["default"]));



/***/ }),

/***/ "./src/view/main/GameOverView.ts":
/*!***************************************!*\
  !*** ./src/view/main/GameOverView.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var view_raw_Main_UI_GameOverView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! view/raw/Main/UI_GameOverView */ "./src/view/raw/Main/UI_GameOverView.ts");
/* harmony import */ var _MainScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainScene */ "./src/view/main/MainScene.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var GameOverView = /** @class */ (function (_super) {
    __extends(GameOverView, _super);
    function GameOverView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameOverView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "GameOverView"));
    };
    GameOverView.prototype.constructFromResource = function () {
        _super.prototype.constructFromResource.call(this);
        this.m_movieBtn.onClick(this, this.onMovie);
        this.m_continueBtn.onClick(this, this.onNext);
    };
    GameOverView.prototype.onMovie = function () {
        // 看广告
    };
    GameOverView.prototype.onNext = function () {
        _MainScene__WEBPACK_IMPORTED_MODULE_1__["default"].inst.startGame();
    };
    return GameOverView;
}(view_raw_Main_UI_GameOverView__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (GameOverView);


/***/ }),

/***/ "./src/view/main/GameWinView.ts":
/*!**************************************!*\
  !*** ./src/view/main/GameWinView.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MainScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainScene */ "./src/view/main/MainScene.ts");
/* harmony import */ var view_raw_Main_UI_GameWinView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! view/raw/Main/UI_GameWinView */ "./src/view/raw/Main/UI_GameWinView.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var GameWinView = /** @class */ (function (_super) {
    __extends(GameWinView, _super);
    function GameWinView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameWinView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "GameWinView"));
    };
    GameWinView.prototype.constructFromResource = function () {
        _super.prototype.constructFromResource.call(this);
        this.m_movieBtn.onClick(this, this.onMovie);
        this.m_nextBtn.onClick(this, this.onNext);
    };
    GameWinView.prototype.onMovie = function () {
        // 看广告
    };
    GameWinView.prototype.onNext = function () {
        _MainScene__WEBPACK_IMPORTED_MODULE_0__["default"].inst.startNextGame();
    };
    return GameWinView;
}(view_raw_Main_UI_GameWinView__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (GameWinView);


/***/ }),

/***/ "./src/view/main/LevelPar.ts":
/*!***********************************!*\
  !*** ./src/view/main/LevelPar.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var modules_dataModule_GameStaticData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! modules/dataModule/GameStaticData */ "./src/modules/dataModule/GameStaticData.ts");
/* harmony import */ var view_raw_Main_UI_levelPar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! view/raw/Main/UI_levelPar */ "./src/view/raw/Main/UI_levelPar.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var LevelPar = /** @class */ (function (_super) {
    __extends(LevelPar, _super);
    function LevelPar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelPar.prototype.constructFromResource = function () {
        _super.prototype.constructFromResource.call(this);
        this.bar = (this.getChild("bar"));
        this.barKey = (this.getChild("barKey"));
        this.levelNum = (this.getChild("levelNum"));
    };
    LevelPar.prototype.setData = function (lvData) {
        var gamedata = xengine_game_Game__WEBPACK_IMPORTED_MODULE_0__["default"].inst.get_module(modules_dataModule_GameStaticData__WEBPACK_IMPORTED_MODULE_1__["default"]);
        this.smallLvData = gamedata.smallLevel_data[lvData.smallLv];
        var tempImage = this.barKey;
        this.barKey.visible = false;
        var len = this.smallLvData.length;
        var interval = 310 / len;
        this.levelNum.text = lvData.level.toString();
        this.value = 100 / len * this.smallLvData.indexOf(lvData);
        for (var i = 0; i < len - 1; i++) {
            var barKey = this.getChild("barkey" + i) || fairygui.UIPackage.createObjectFromURL(tempImage.resourceURL);
            barKey.x = 9 + interval * (i + 1);
            barKey.name = "barKey" + i;
            barKey.y = this.barKey.y;
            this.addChild(barKey);
            // 还有奖杯 和 钥匙
        }
    };
    return LevelPar;
}(view_raw_Main_UI_levelPar__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (LevelPar);


/***/ }),

/***/ "./src/view/main/MainScene.ts":
/*!************************************!*\
  !*** ./src/view/main/MainScene.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var view_raw_Main_UI_Main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! view/raw/Main/UI_Main */ "./src/view/raw/Main/UI_Main.ts");
/* harmony import */ var view_3d_BallScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! view/3d/BallScene */ "./src/view/3d/BallScene.ts");
/* harmony import */ var modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! modules/dataModule/BallModule */ "./src/modules/dataModule/BallModule.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var view_raw_Main_UI_GameWinView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! view/raw/Main/UI_GameWinView */ "./src/view/raw/Main/UI_GameWinView.ts");
/* harmony import */ var _GameWinView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GameWinView */ "./src/view/main/GameWinView.ts");
/* harmony import */ var _GameOverView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GameOverView */ "./src/view/main/GameOverView.ts");
/* harmony import */ var view_raw_Main_UI_GameOverView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! view/raw/Main/UI_GameOverView */ "./src/view/raw/Main/UI_GameOverView.ts");
/* harmony import */ var _MianView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MianView */ "./src/view/main/MianView.ts");
/* harmony import */ var _ProView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ProView */ "./src/view/main/ProView.ts");
/* harmony import */ var view_raw_Main_UI_MainView__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! view/raw/Main/UI_MainView */ "./src/view/raw/Main/UI_MainView.ts");
/* harmony import */ var view_raw_Main_UI_ProView__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! view/raw/Main/UI_ProView */ "./src/view/raw/Main/UI_ProView.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};












var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameWinView = null;
        _this.gameFailView = null;
        _this.proView = null;
        _this.mianView = null;
        _this.allPanels = [];
        return _this;
    }
    MainScene.prototype.constructFromResource = function () {
        _super.prototype.constructFromResource.call(this);
        MainScene.inst = this;
        this._module = xengine_game_Game__WEBPACK_IMPORTED_MODULE_3__["default"].inst.get_module(modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_2__["default"]);
        // FairyGUIBinder.onClick(this.m_bt_dialog, XEngine.inst.fairygui_helper, XEngine.inst.fairygui_helper.show_dialog, TestDialog, 'Dialog from MainScene');
        // FairyGUIBinder.onClick(this.m_bt_toast, XEngine.inst.fairygui_helper.toast, XEngine.inst.fairygui_helper.toast.popup, 'Toast from MainScene');
        this._ballScene = view_3d_BallScene__WEBPACK_IMPORTED_MODULE_1__["BallScene"].inst;
        this.startGame();
    };
    MainScene.prototype.startNextGame = function () {
        this._module.lvGoOn();
        this.startGame();
    };
    MainScene.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showMainView();
                        this._ballScene.dispose();
                        return [4 /*yield*/, this._ballScene.startGame()];
                    case 1:
                        _a.sent();
                        this.mianView.setData();
                        this._ballScene.displayObject.active = true;
                        this.m_slot_3d_stage.displayObject.addChild(this._ballScene.displayObject);
                        this._module.preloadNextLv();
                        return [2 /*return*/];
                }
            });
        });
    };
    MainScene.prototype.showGameWinView = function () {
        this.gameWinView = this.gameWinView || this.createObj(view_raw_Main_UI_GameWinView__WEBPACK_IMPORTED_MODULE_4__["default"].URL, _GameWinView__WEBPACK_IMPORTED_MODULE_5__["default"]);
        this.addChild(this.gameWinView);
        this.removeOtherPanel(this.gameWinView);
        return this.gameWinView;
    };
    MainScene.prototype.showGameFailView = function () {
        this.gameFailView = this.gameFailView || this.createObj(view_raw_Main_UI_GameOverView__WEBPACK_IMPORTED_MODULE_7__["default"].URL, _GameOverView__WEBPACK_IMPORTED_MODULE_6__["default"]);
        this.addChild(this.gameFailView);
        this.removeOtherPanel(this.gameFailView);
        return this.gameFailView;
    };
    MainScene.prototype.showProView = function () {
        this.proView = this.proView || this.createObj(view_raw_Main_UI_ProView__WEBPACK_IMPORTED_MODULE_11__["default"].URL, _ProView__WEBPACK_IMPORTED_MODULE_9__["default"]);
        this.proView.initPro();
        this.addChild(this.proView);
        this.removeOtherPanel(this.proView);
        return this.proView;
    };
    MainScene.prototype.showMainView = function () {
        this.mianView = this.mianView || this.createObj(view_raw_Main_UI_MainView__WEBPACK_IMPORTED_MODULE_10__["default"].URL, _MianView__WEBPACK_IMPORTED_MODULE_8__["default"]);
        this.addChild(this.mianView);
        this.removeOtherPanel(this.mianView);
        return this.mianView;
    };
    MainScene.prototype.parentRemove = function (com) {
        if (com && com.parent) {
            com.parent.removeChild(com);
        }
    };
    MainScene.prototype.removeOtherPanel = function (com) {
        var _this = this;
        this.allPanels.forEach(function (view) {
            if (view != com) {
                _this.parentRemove(view);
            }
        });
    };
    MainScene.prototype.createObj = function (url, cls) {
        var panel = fairygui.UIPackage.createObjectFromURL(url, cls);
        this.allPanels.push(panel);
        return panel;
    };
    MainScene.inst = null;
    return MainScene;
}(view_raw_Main_UI_Main__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (MainScene);


/***/ }),

/***/ "./src/view/main/MianView.ts":
/*!***********************************!*\
  !*** ./src/view/main/MianView.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
/* harmony import */ var view_raw_Main_UI_MainView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! view/raw/Main/UI_MainView */ "./src/view/raw/Main/UI_MainView.ts");
/* harmony import */ var modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! modules/dataModule/BallModule */ "./src/modules/dataModule/BallModule.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var MianView = /** @class */ (function (_super) {
    __extends(MianView, _super);
    function MianView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MianView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "MianView"));
    };
    MianView.prototype.constructFromResource = function () {
        _super.prototype.constructFromResource.call(this);
        this._levelPar = this.m_levelPar;
    };
    MianView.prototype.setData = function () {
        var module = xengine_game_Game__WEBPACK_IMPORTED_MODULE_0__["default"].inst.get_module(modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this._levelPar.setData(module.nowLevelVo().levelData);
        // 还有设置按钮
    };
    return MianView;
}(view_raw_Main_UI_MainView__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (MianView);


/***/ }),

/***/ "./src/view/main/ProView.ts":
/*!**********************************!*\
  !*** ./src/view/main/ProView.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MainScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainScene */ "./src/view/main/MainScene.ts");
/* harmony import */ var view_raw_Main_UI_ProView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! view/raw/Main/UI_ProView */ "./src/view/raw/Main/UI_ProView.ts");
/* harmony import */ var view_3d_BallScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! view/3d/BallScene */ "./src/view/3d/BallScene.ts");
/* harmony import */ var modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! modules/dataModule/BallModule */ "./src/modules/dataModule/BallModule.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ProView = /** @class */ (function (_super) {
    __extends(ProView, _super);
    function ProView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "ProView"));
    };
    ProView.prototype.constructFromResource = function () {
        _super.prototype.constructFromResource.call(this);
        view_3d_BallScene__WEBPACK_IMPORTED_MODULE_2__["BallScene"].inst.on(view_3d_BallScene__WEBPACK_IMPORTED_MODULE_2__["EEventType"].PROCHANGE, this, this.updatePro);
    };
    ProView.prototype.initPro = function () {
        this.initSmallProCom(this.m_leftGp);
        this.initSmallProCom(this.m_centerGp);
        this.initSmallProCom(this.m_rightGp);
    };
    ProView.prototype.initSmallProCom = function (com) {
        if (com && com._children) {
            com._children.forEach(function (child) {
                child.color = "#FFFFFF";
            });
        }
    };
    ProView.prototype.updatePro = function () {
        var _this = this;
        var heros = view_3d_BallScene__WEBPACK_IMPORTED_MODULE_2__["BallScene"].inst.heros;
        heros.forEach(function (hero) {
            if (hero) {
                var temp = void 0;
                var color = void 0;
                switch (hero.heroVo.index) {
                    case modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_3__["EHreoIndex"].LIFT:
                        temp = _this.m_leftGp;
                        color = "#38e934";
                        break;
                    case modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_3__["EHreoIndex"].CENTER:
                        temp = _this.m_centerGp;
                        color = "#FFb22c";
                        break;
                    case modules_dataModule_BallModule__WEBPACK_IMPORTED_MODULE_3__["EHreoIndex"].RIGHT:
                        temp = _this.m_rightGp;
                        color = "#00bbFF";
                        break;
                }
                var pro = hero.levelNum;
                for (var i = 0; i <= pro; i++) {
                    temp._children[i].color = color;
                }
            }
        });
    };
    ProView.prototype.onNext = function () {
        _MainScene__WEBPACK_IMPORTED_MODULE_0__["default"].inst.startGame();
    };
    return ProView;
}(view_raw_Main_UI_ProView__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ProView);


/***/ }),

/***/ "./src/view/raw/3d/Sprite3D_ChaoJiWanMei.ts":
/*!**************************************************!*\
  !*** ./src/view/raw/3d/Sprite3D_ChaoJiWanMei.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/view/3d/X3D */ "./src/xengine/view/3d/X3D.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var REG = Laya.ClassUtils.regClass;
var Prefab_ChaoJiWanMei = /** @class */ (function (_super) {
    __extends(Prefab_ChaoJiWanMei, _super);
    function Prefab_ChaoJiWanMei() {
        return _super.call(this, "assets/unity_exported/LayaScene_futureRes/Conventional/ChaoJiWanMei.lh") || this;
    }
    Prefab_ChaoJiWanMei.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        node = _a.sent();
                        return [2 /*return*/, node];
                }
            });
        });
    };
    return Prefab_ChaoJiWanMei;
}(xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__["default"].Sprite3D));
/* harmony default export */ __webpack_exports__["default"] = (Prefab_ChaoJiWanMei);
REG("ui.Prefab_ChaoJiWanMei", Prefab_ChaoJiWanMei);


/***/ }),

/***/ "./src/view/raw/3d/Sprite3D_HengBang.ts":
/*!**********************************************!*\
  !*** ./src/view/raw/3d/Sprite3D_HengBang.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/view/3d/X3D */ "./src/xengine/view/3d/X3D.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var REG = Laya.ClassUtils.regClass;
var Prefab_HengBang = /** @class */ (function (_super) {
    __extends(Prefab_HengBang, _super);
    function Prefab_HengBang() {
        return _super.call(this, "assets/unity_exported/LayaScene_futureRes/Conventional/HengBang.lh") || this;
    }
    Prefab_HengBang.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        node = _a.sent();
                        return [2 /*return*/, node];
                }
            });
        });
    };
    return Prefab_HengBang;
}(xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__["default"].Sprite3D));
/* harmony default export */ __webpack_exports__["default"] = (Prefab_HengBang);
REG("ui.Prefab_HengBang", Prefab_HengBang);


/***/ }),

/***/ "./src/view/raw/3d/Sprite3D_LuoDiYan.ts":
/*!**********************************************!*\
  !*** ./src/view/raw/3d/Sprite3D_LuoDiYan.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/view/3d/X3D */ "./src/xengine/view/3d/X3D.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var REG = Laya.ClassUtils.regClass;
var Prefab_LuoDiYan = /** @class */ (function (_super) {
    __extends(Prefab_LuoDiYan, _super);
    function Prefab_LuoDiYan() {
        return _super.call(this, "assets/unity_exported/LayaScene_futureRes/Conventional/LuoDiYan.lh") || this;
    }
    Prefab_LuoDiYan.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        node = _a.sent();
                        return [2 /*return*/, node];
                }
            });
        });
    };
    return Prefab_LuoDiYan;
}(xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__["default"].Sprite3D));
/* harmony default export */ __webpack_exports__["default"] = (Prefab_LuoDiYan);
REG("ui.Prefab_LuoDiYan", Prefab_LuoDiYan);


/***/ }),

/***/ "./src/view/raw/3d/Sprite3D_TouQiuLiHua.ts":
/*!*************************************************!*\
  !*** ./src/view/raw/3d/Sprite3D_TouQiuLiHua.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/view/3d/X3D */ "./src/xengine/view/3d/X3D.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var REG = Laya.ClassUtils.regClass;
var Prefab_TouQiuLiHua = /** @class */ (function (_super) {
    __extends(Prefab_TouQiuLiHua, _super);
    function Prefab_TouQiuLiHua() {
        return _super.call(this, "assets/unity_exported/LayaScene_futureRes/Conventional/TouQiuLiHua.lh") || this;
    }
    Prefab_TouQiuLiHua.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        node = _a.sent();
                        return [2 /*return*/, node];
                }
            });
        });
    };
    return Prefab_TouQiuLiHua;
}(xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__["default"].Sprite3D));
/* harmony default export */ __webpack_exports__["default"] = (Prefab_TouQiuLiHua);
REG("ui.Prefab_TouQiuLiHua", Prefab_TouQiuLiHua);


/***/ }),

/***/ "./src/view/raw/3d/Sprite3D_WanMei.ts":
/*!********************************************!*\
  !*** ./src/view/raw/3d/Sprite3D_WanMei.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/view/3d/X3D */ "./src/xengine/view/3d/X3D.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var REG = Laya.ClassUtils.regClass;
var Prefab_WanMei = /** @class */ (function (_super) {
    __extends(Prefab_WanMei, _super);
    function Prefab_WanMei() {
        return _super.call(this, "assets/unity_exported/LayaScene_futureRes/Conventional/WanMei.lh") || this;
    }
    Prefab_WanMei.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        node = _a.sent();
                        return [2 /*return*/, node];
                }
            });
        });
    };
    return Prefab_WanMei;
}(xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__["default"].Sprite3D));
/* harmony default export */ __webpack_exports__["default"] = (Prefab_WanMei);
REG("ui.Prefab_WanMei", Prefab_WanMei);


/***/ }),

/***/ "./src/view/raw/3d/Sprite3D_Wo.ts":
/*!****************************************!*\
  !*** ./src/view/raw/3d/Sprite3D_Wo.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/view/3d/X3D */ "./src/xengine/view/3d/X3D.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var REG = Laya.ClassUtils.regClass;
var Prefab_Wo = /** @class */ (function (_super) {
    __extends(Prefab_Wo, _super);
    function Prefab_Wo() {
        return _super.call(this, "assets/unity_exported/LayaScene_futureRes/Conventional/Wo.lh") || this;
    }
    Prefab_Wo.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        node = _a.sent();
                        return [2 /*return*/, node];
                }
            });
        });
    };
    return Prefab_Wo;
}(xengine_view_3d_X3D__WEBPACK_IMPORTED_MODULE_0__["default"].Sprite3D));
/* harmony default export */ __webpack_exports__["default"] = (Prefab_Wo);
REG("ui.Prefab_Wo", Prefab_Wo);


/***/ }),

/***/ "./src/view/raw/3d/Sprite3D_hero1.ts":
/*!*******************************************!*\
  !*** ./src/view/raw/3d/Sprite3D_hero1.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var view_3d_base_TrailsSprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! view/3d/base/TrailsSprite */ "./src/view/3d/base/TrailsSprite.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var REG = Laya.ClassUtils.regClass;

var Prefab_hero1 = /** @class */ (function (_super) {
    __extends(Prefab_hero1, _super);
    function Prefab_hero1() {
        return _super.call(this, "assets/unity_exported/LayaScene_skin1/Conventional/hero1.lh") || this;
    }
    Prefab_hero1.prototype.instance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.instance.call(this)];
                    case 1:
                        node = _a.sent();
                        this.juese = node.getChildByName('juese');
                        this.cAnimator_juese = this.juese.getComponent(Laya.Animator);
                        this.juese_Bip001 = this.juese.getChildByName('Bip001');
                        this.juese_Bip001_Bip001_Pelvis = this.juese_Bip001.getChildByName('Bip001 Pelvis');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine = this.juese_Bip001_Bip001_Pelvis.getChildByName('Bip001 Spine');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_L_Thigh = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine.getChildByName('Bip001 L Thigh');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_L_Thigh_Bip001_L_Calf = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_L_Thigh.getChildByName('Bip001 L Calf');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_L_Thigh_Bip001_L_Calf_Bip001_L_Foot = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_L_Thigh_Bip001_L_Calf.getChildByName('Bip001 L Foot');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_L_Thigh_Bip001_L_Calf_Bip001_L_Foot_Bip001_L_Toe0 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_L_Thigh_Bip001_L_Calf_Bip001_L_Foot.getChildByName('Bip001 L Toe0');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_R_Thigh = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine.getChildByName('Bip001 R Thigh');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_R_Thigh_Bip001_R_Calf = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_R_Thigh.getChildByName('Bip001 R Calf');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_R_Thigh_Bip001_R_Calf_Bip001_R_Foot = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_R_Thigh_Bip001_R_Calf.getChildByName('Bip001 R Foot');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_R_Thigh_Bip001_R_Calf_Bip001_R_Foot_Bip001_R_Toe0 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_R_Thigh_Bip001_R_Calf_Bip001_R_Foot.getChildByName('Bip001 R Toe0');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine.getChildByName('Bip001 Spine1');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1.getChildByName('Bip001 Neck');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_Head = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck.getChildByName('Bip001 Head');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_Head_Point002 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_Head.getChildByName('Point002');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck.getChildByName('Bip001 L Clavicle');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle.getChildByName('Bip001 L UpperArm');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm.getChildByName('Bip001 L Forearm');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm.getChildByName('Bip001 L Hand');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger0 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand.getChildByName('Bip001 L Finger0');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger0_Bip001_L_Finger01 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger0.getChildByName('Bip001 L Finger01');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger1 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand.getChildByName('Bip001 L Finger1');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger1_Bip001_L_Finger11 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger1.getChildByName('Bip001 L Finger11');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger2 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand.getChildByName('Bip001 L Finger2');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger2_Bip001_L_Finger21 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger2.getChildByName('Bip001 L Finger21');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger3 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand.getChildByName('Bip001 L Finger3');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger3_Bip001_L_Finger31 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger3.getChildByName('Bip001 L Finger31');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger4 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand.getChildByName('Bip001 L Finger4');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger4_Bip001_L_Finger41 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_Forearm_Bip001_L_Hand_Bip001_L_Finger4.getChildByName('Bip001 L Finger41');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_ForeTwist = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm.getChildByName('Bip001 L ForeTwist');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_ForeTwist_Bip001_L_ForeTwist1 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_L_UpperArm_Bip001_L_ForeTwist.getChildByName('Bip001 L ForeTwist1');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_LUpArmTwist = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle.getChildByName('Bip001 LUpArmTwist');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_LUpArmTwist_Bip001_LUpArmTwist1 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_L_Clavicle_Bip001_LUpArmTwist.getChildByName('Bip001 LUpArmTwist1');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck.getChildByName('Bip001 R Clavicle');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle.getChildByName('Bip001 R UpperArm');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm.getChildByName('Bip001 R Forearm');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm.getChildByName('Bip001 R Hand');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger0 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand.getChildByName('Bip001 R Finger0');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger0_Bip001_R_Finger01 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger0.getChildByName('Bip001 R Finger01');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger1 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand.getChildByName('Bip001 R Finger1');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger1_Bip001_R_Finger11 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger1.getChildByName('Bip001 R Finger11');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger2 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand.getChildByName('Bip001 R Finger2');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger2_Bip001_R_Finger21 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger2.getChildByName('Bip001 R Finger21');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger3 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand.getChildByName('Bip001 R Finger3');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger3_Bip001_R_Finger31 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger3.getChildByName('Bip001 R Finger31');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger4 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand.getChildByName('Bip001 R Finger4');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger4_Bip001_R_Finger41 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Bip001_R_Finger4.getChildByName('Bip001 R Finger41');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand_Point001 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_Forearm_Bip001_R_Hand.getChildByName('Point001');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_ForeTwist = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm.getChildByName('Bip001 R ForeTwist');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_ForeTwist_Bip001_R_ForeTwist1 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_R_UpperArm_Bip001_R_ForeTwist.getChildByName('Bip001 R ForeTwist1');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_RUpArmTwist = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle.getChildByName('Bip001 RUpArmTwist');
                        this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_RUpArmTwist_Bip001_RUpArmTwist1 = this.juese_Bip001_Bip001_Pelvis_Bip001_Spine_Bip001_Spine1_Bip001_Neck_Bip001_R_Clavicle_Bip001_RUpArmTwist.getChildByName('Bip001 RUpArmTwist1');
                        this.juese_renwu_01 = this.juese.getChildByName('renwu_01');
                        return [2 /*return*/, node];
                }
            });
        });
    };
    return Prefab_hero1;
}(view_3d_base_TrailsSprite__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Prefab_hero1);
REG("ui.Prefab_hero1", Prefab_hero1);


/***/ }),

/***/ "./src/view/raw/Common/CommonBinder.ts":
/*!*********************************************!*\
  !*** ./src/view/raw/Common/CommonBinder.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI_ToastView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI_ToastView */ "./src/view/raw/Common/UI_ToastView.ts");
/* harmony import */ var _UI_WindowFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI_WindowFrame */ "./src/view/raw/Common/UI_WindowFrame.ts");
/* harmony import */ var _UI_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI_Button */ "./src/view/raw/Common/UI_Button.ts");
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



var CommonBinder = /** @class */ (function () {
    function CommonBinder() {
    }
    CommonBinder.bindAll = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_ToastView__WEBPACK_IMPORTED_MODULE_0__["default"].URL, _UI_ToastView__WEBPACK_IMPORTED_MODULE_0__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_WindowFrame__WEBPACK_IMPORTED_MODULE_1__["default"].URL, _UI_WindowFrame__WEBPACK_IMPORTED_MODULE_1__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_Button__WEBPACK_IMPORTED_MODULE_2__["default"].URL, _UI_Button__WEBPACK_IMPORTED_MODULE_2__["default"]);
    };
    return CommonBinder;
}());
/* harmony default export */ __webpack_exports__["default"] = (CommonBinder);


/***/ }),

/***/ "./src/view/raw/Common/UI_Button.ts":
/*!******************************************!*\
  !*** ./src/view/raw/Common/UI_Button.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_Button = /** @class */ (function (_super) {
    __extends(UI_Button, _super);
    function UI_Button() {
        return _super.call(this) || this;
    }
    UI_Button.createInstance = function () {
        return (fairygui.UIPackage.createObject("Common", "Button"));
    };
    UI_Button.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_grayed = this.getController("grayed");
    };
    UI_Button.URL = "ui://dzj5bdmrptiv4";
    return UI_Button;
}(fairygui.GButton));
/* harmony default export */ __webpack_exports__["default"] = (UI_Button);


/***/ }),

/***/ "./src/view/raw/Common/UI_ToastView.ts":
/*!*********************************************!*\
  !*** ./src/view/raw/Common/UI_ToastView.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_ToastView = /** @class */ (function (_super) {
    __extends(UI_ToastView, _super);
    function UI_ToastView() {
        return _super.call(this) || this;
    }
    UI_ToastView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Common", "ToastView"));
    };
    UI_ToastView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_text = (this.getChild("text"));
        this.m_anim = this.getTransition("anim");
    };
    UI_ToastView.URL = "ui://dzj5bdmrcjnq5";
    return UI_ToastView;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_ToastView);


/***/ }),

/***/ "./src/view/raw/Common/UI_WindowFrame.ts":
/*!***********************************************!*\
  !*** ./src/view/raw/Common/UI_WindowFrame.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_WindowFrame = /** @class */ (function (_super) {
    __extends(UI_WindowFrame, _super);
    function UI_WindowFrame() {
        return _super.call(this) || this;
    }
    UI_WindowFrame.createInstance = function () {
        return (fairygui.UIPackage.createObject("Common", "WindowFrame"));
    };
    UI_WindowFrame.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_dragArea = (this.getChild("dragArea"));
        this.m_contentArea = (this.getChild("contentArea"));
    };
    UI_WindowFrame.URL = "ui://dzj5bdmrea2a3f";
    return UI_WindowFrame;
}(fairygui.GLabel));
/* harmony default export */ __webpack_exports__["default"] = (UI_WindowFrame);


/***/ }),

/***/ "./src/view/raw/Main/MainBinder.ts":
/*!*****************************************!*\
  !*** ./src/view/raw/Main/MainBinder.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI_GameOverView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI_GameOverView */ "./src/view/raw/Main/UI_GameOverView.ts");
/* harmony import */ var _UI_skinBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI_skinBtn */ "./src/view/raw/Main/UI_skinBtn.ts");
/* harmony import */ var _UI_levelPar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI_levelPar */ "./src/view/raw/Main/UI_levelPar.ts");
/* harmony import */ var _UI_RankView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI_RankView */ "./src/view/raw/Main/UI_RankView.ts");
/* harmony import */ var _UI_GameWinView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UI_GameWinView */ "./src/view/raw/Main/UI_GameWinView.ts");
/* harmony import */ var _UI_ProView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UI_ProView */ "./src/view/raw/Main/UI_ProView.ts");
/* harmony import */ var _UI_listCom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UI_listCom */ "./src/view/raw/Main/UI_listCom.ts");
/* harmony import */ var _UI_TestDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UI_TestDialog */ "./src/view/raw/Main/UI_TestDialog.ts");
/* harmony import */ var _UI_MainView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./UI_MainView */ "./src/view/raw/Main/UI_MainView.ts");
/* harmony import */ var _UI_smallProCom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./UI_smallProCom */ "./src/view/raw/Main/UI_smallProCom.ts");
/* harmony import */ var _UI_Main__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./UI_Main */ "./src/view/raw/Main/UI_Main.ts");
/* harmony import */ var _UI_skinBtn1__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./UI_skinBtn1 */ "./src/view/raw/Main/UI_skinBtn1.ts");
/* harmony import */ var _UI_freeBtn__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./UI_freeBtn */ "./src/view/raw/Main/UI_freeBtn.ts");
/* harmony import */ var _UI_unlockBtn__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./UI_unlockBtn */ "./src/view/raw/Main/UI_unlockBtn.ts");
/* harmony import */ var _UI_skipBtn__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./UI_skipBtn */ "./src/view/raw/Main/UI_skipBtn.ts");
/* harmony import */ var _UI_receiveBtn__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./UI_receiveBtn */ "./src/view/raw/Main/UI_receiveBtn.ts");
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
















var MainBinder = /** @class */ (function () {
    function MainBinder() {
    }
    MainBinder.bindAll = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_GameOverView__WEBPACK_IMPORTED_MODULE_0__["default"].URL, _UI_GameOverView__WEBPACK_IMPORTED_MODULE_0__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_skinBtn__WEBPACK_IMPORTED_MODULE_1__["default"].URL, _UI_skinBtn__WEBPACK_IMPORTED_MODULE_1__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_levelPar__WEBPACK_IMPORTED_MODULE_2__["default"].URL, _UI_levelPar__WEBPACK_IMPORTED_MODULE_2__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_RankView__WEBPACK_IMPORTED_MODULE_3__["default"].URL, _UI_RankView__WEBPACK_IMPORTED_MODULE_3__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_GameWinView__WEBPACK_IMPORTED_MODULE_4__["default"].URL, _UI_GameWinView__WEBPACK_IMPORTED_MODULE_4__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_ProView__WEBPACK_IMPORTED_MODULE_5__["default"].URL, _UI_ProView__WEBPACK_IMPORTED_MODULE_5__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_listCom__WEBPACK_IMPORTED_MODULE_6__["default"].URL, _UI_listCom__WEBPACK_IMPORTED_MODULE_6__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_TestDialog__WEBPACK_IMPORTED_MODULE_7__["default"].URL, _UI_TestDialog__WEBPACK_IMPORTED_MODULE_7__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_MainView__WEBPACK_IMPORTED_MODULE_8__["default"].URL, _UI_MainView__WEBPACK_IMPORTED_MODULE_8__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_smallProCom__WEBPACK_IMPORTED_MODULE_9__["default"].URL, _UI_smallProCom__WEBPACK_IMPORTED_MODULE_9__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_Main__WEBPACK_IMPORTED_MODULE_10__["default"].URL, _UI_Main__WEBPACK_IMPORTED_MODULE_10__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_skinBtn1__WEBPACK_IMPORTED_MODULE_11__["default"].URL, _UI_skinBtn1__WEBPACK_IMPORTED_MODULE_11__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_freeBtn__WEBPACK_IMPORTED_MODULE_12__["default"].URL, _UI_freeBtn__WEBPACK_IMPORTED_MODULE_12__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_unlockBtn__WEBPACK_IMPORTED_MODULE_13__["default"].URL, _UI_unlockBtn__WEBPACK_IMPORTED_MODULE_13__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_skipBtn__WEBPACK_IMPORTED_MODULE_14__["default"].URL, _UI_skipBtn__WEBPACK_IMPORTED_MODULE_14__["default"]);
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_receiveBtn__WEBPACK_IMPORTED_MODULE_15__["default"].URL, _UI_receiveBtn__WEBPACK_IMPORTED_MODULE_15__["default"]);
    };
    return MainBinder;
}());
/* harmony default export */ __webpack_exports__["default"] = (MainBinder);


/***/ }),

/***/ "./src/view/raw/Main/UI_GameOverView.ts":
/*!**********************************************!*\
  !*** ./src/view/raw/Main/UI_GameOverView.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_GameOverView = /** @class */ (function (_super) {
    __extends(UI_GameOverView, _super);
    function UI_GameOverView() {
        return _super.call(this) || this;
    }
    UI_GameOverView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "GameOverView"));
    };
    UI_GameOverView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_movieBtn = (this.getChild("movieBtn"));
        this.m_continueBtn = (this.getChild("continueBtn"));
    };
    UI_GameOverView.URL = "ui://dyaqtnkv11hfz48";
    return UI_GameOverView;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_GameOverView);


/***/ }),

/***/ "./src/view/raw/Main/UI_GameWinView.ts":
/*!*********************************************!*\
  !*** ./src/view/raw/Main/UI_GameWinView.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_GameWinView = /** @class */ (function (_super) {
    __extends(UI_GameWinView, _super);
    function UI_GameWinView() {
        return _super.call(this) || this;
    }
    UI_GameWinView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "GameWinView"));
    };
    UI_GameWinView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_movieBtn = (this.getChild("movieBtn"));
        this.m_nextBtn = (this.getChild("nextBtn"));
    };
    UI_GameWinView.URL = "ui://dyaqtnkve8wr7";
    return UI_GameWinView;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_GameWinView);


/***/ }),

/***/ "./src/view/raw/Main/UI_Main.ts":
/*!**************************************!*\
  !*** ./src/view/raw/Main/UI_Main.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_Main = /** @class */ (function (_super) {
    __extends(UI_Main, _super);
    function UI_Main() {
        return _super.call(this) || this;
    }
    UI_Main.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "Main"));
    };
    UI_Main.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_slot_3d_stage = (this.getChild("slot_3d_stage"));
        this.m_t0 = this.getTransition("t0");
    };
    UI_Main.URL = "ui://dyaqtnkvptiv0";
    return UI_Main;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_Main);


/***/ }),

/***/ "./src/view/raw/Main/UI_MainView.ts":
/*!******************************************!*\
  !*** ./src/view/raw/Main/UI_MainView.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_MainView = /** @class */ (function (_super) {
    __extends(UI_MainView, _super);
    function UI_MainView() {
        return _super.call(this) || this;
    }
    UI_MainView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "MainView"));
    };
    UI_MainView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_levelPar = (this.getChild("levelPar"));
        this.m_setBtn = (this.getChild("setBtn"));
        this.m_starNum = (this.getChild("starNum"));
    };
    UI_MainView.URL = "ui://dyaqtnkvpgazz4c";
    return UI_MainView;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_MainView);


/***/ }),

/***/ "./src/view/raw/Main/UI_ProView.ts":
/*!*****************************************!*\
  !*** ./src/view/raw/Main/UI_ProView.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_ProView = /** @class */ (function (_super) {
    __extends(UI_ProView, _super);
    function UI_ProView() {
        return _super.call(this) || this;
    }
    UI_ProView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "ProView"));
    };
    UI_ProView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_rightGp = (this.getChild("rightGp"));
        this.m_centerGp = (this.getChild("centerGp"));
        this.m_leftGp = (this.getChild("leftGp"));
    };
    UI_ProView.URL = "ui://dyaqtnkve8wr9";
    return UI_ProView;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_ProView);


/***/ }),

/***/ "./src/view/raw/Main/UI_RankView.ts":
/*!******************************************!*\
  !*** ./src/view/raw/Main/UI_RankView.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_RankView = /** @class */ (function (_super) {
    __extends(UI_RankView, _super);
    function UI_RankView() {
        return _super.call(this) || this;
    }
    UI_RankView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "RankView"));
    };
    UI_RankView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_closeBtn = (this.getChild("closeBtn"));
        this.m_list1 = (this.getChild("list1"));
        this.m_list2 = (this.getChild("list2"));
        this.m_starNum = (this.getChild("starNum"));
    };
    UI_RankView.URL = "ui://dyaqtnkve8wr5";
    return UI_RankView;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_RankView);


/***/ }),

/***/ "./src/view/raw/Main/UI_TestDialog.ts":
/*!********************************************!*\
  !*** ./src/view/raw/Main/UI_TestDialog.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_TestDialog = /** @class */ (function (_super) {
    __extends(UI_TestDialog, _super);
    function UI_TestDialog() {
        return _super.call(this) || this;
    }
    UI_TestDialog.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "TestDialog"));
    };
    UI_TestDialog.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_frame = (this.getChild("frame"));
        this.m_lb_message = (this.getChild("lb_message"));
        this.m_bt_close = (this.getChild("bt_close"));
    };
    UI_TestDialog.URL = "ui://dyaqtnkvea2a4";
    return UI_TestDialog;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_TestDialog);


/***/ }),

/***/ "./src/view/raw/Main/UI_freeBtn.ts":
/*!*****************************************!*\
  !*** ./src/view/raw/Main/UI_freeBtn.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_freeBtn = /** @class */ (function (_super) {
    __extends(UI_freeBtn, _super);
    function UI_freeBtn() {
        return _super.call(this) || this;
    }
    UI_freeBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "freeBtn"));
    };
    UI_freeBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_t0 = this.getTransition("t0");
    };
    UI_freeBtn.URL = "ui://dyaqtnkvt8452k";
    return UI_freeBtn;
}(fairygui.GButton));
/* harmony default export */ __webpack_exports__["default"] = (UI_freeBtn);


/***/ }),

/***/ "./src/view/raw/Main/UI_levelPar.ts":
/*!******************************************!*\
  !*** ./src/view/raw/Main/UI_levelPar.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_levelPar = /** @class */ (function (_super) {
    __extends(UI_levelPar, _super);
    function UI_levelPar() {
        return _super.call(this) || this;
    }
    UI_levelPar.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "levelPar"));
    };
    UI_levelPar.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_barKey = (this.getChild("barKey"));
        this.m_levelNum = (this.getChild("levelNum"));
    };
    UI_levelPar.URL = "ui://dyaqtnkve8wr24";
    return UI_levelPar;
}(fairygui.GProgressBar));
/* harmony default export */ __webpack_exports__["default"] = (UI_levelPar);


/***/ }),

/***/ "./src/view/raw/Main/UI_listCom.ts":
/*!*****************************************!*\
  !*** ./src/view/raw/Main/UI_listCom.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_listCom = /** @class */ (function (_super) {
    __extends(UI_listCom, _super);
    function UI_listCom() {
        return _super.call(this) || this;
    }
    UI_listCom.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "listCom"));
    };
    UI_listCom.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_c1 = this.getController("c1");
        this.m_rankTxt = (this.getChild("rankTxt"));
        this.m_name = (this.getChild("name"));
        this.m_rankTxt_2 = (this.getChild("rankTxt"));
    };
    UI_listCom.URL = "ui://dyaqtnkve8wro";
    return UI_listCom;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_listCom);


/***/ }),

/***/ "./src/view/raw/Main/UI_receiveBtn.ts":
/*!********************************************!*\
  !*** ./src/view/raw/Main/UI_receiveBtn.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_receiveBtn = /** @class */ (function (_super) {
    __extends(UI_receiveBtn, _super);
    function UI_receiveBtn() {
        return _super.call(this) || this;
    }
    UI_receiveBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "receiveBtn"));
    };
    UI_receiveBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_t0 = this.getTransition("t0");
    };
    UI_receiveBtn.URL = "ui://dyaqtnkvt84545";
    return UI_receiveBtn;
}(fairygui.GButton));
/* harmony default export */ __webpack_exports__["default"] = (UI_receiveBtn);


/***/ }),

/***/ "./src/view/raw/Main/UI_skinBtn.ts":
/*!*****************************************!*\
  !*** ./src/view/raw/Main/UI_skinBtn.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_skinBtn = /** @class */ (function (_super) {
    __extends(UI_skinBtn, _super);
    function UI_skinBtn() {
        return _super.call(this) || this;
    }
    UI_skinBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "skinBtn"));
    };
    UI_skinBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_c1 = this.getController("c1");
    };
    UI_skinBtn.URL = "ui://dyaqtnkve8wr1p";
    return UI_skinBtn;
}(fairygui.GButton));
/* harmony default export */ __webpack_exports__["default"] = (UI_skinBtn);


/***/ }),

/***/ "./src/view/raw/Main/UI_skinBtn1.ts":
/*!******************************************!*\
  !*** ./src/view/raw/Main/UI_skinBtn1.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_skinBtn1 = /** @class */ (function (_super) {
    __extends(UI_skinBtn1, _super);
    function UI_skinBtn1() {
        return _super.call(this) || this;
    }
    UI_skinBtn1.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "skinBtn1"));
    };
    UI_skinBtn1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_red = this.getController("red");
    };
    UI_skinBtn1.URL = "ui://dyaqtnkvt8452b";
    return UI_skinBtn1;
}(fairygui.GButton));
/* harmony default export */ __webpack_exports__["default"] = (UI_skinBtn1);


/***/ }),

/***/ "./src/view/raw/Main/UI_skipBtn.ts":
/*!*****************************************!*\
  !*** ./src/view/raw/Main/UI_skipBtn.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_skipBtn = /** @class */ (function (_super) {
    __extends(UI_skipBtn, _super);
    function UI_skipBtn() {
        return _super.call(this) || this;
    }
    UI_skipBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "skipBtn"));
    };
    UI_skipBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_t0 = this.getTransition("t0");
    };
    UI_skipBtn.URL = "ui://dyaqtnkvt8453n";
    return UI_skipBtn;
}(fairygui.GButton));
/* harmony default export */ __webpack_exports__["default"] = (UI_skipBtn);


/***/ }),

/***/ "./src/view/raw/Main/UI_smallProCom.ts":
/*!*********************************************!*\
  !*** ./src/view/raw/Main/UI_smallProCom.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_smallProCom = /** @class */ (function (_super) {
    __extends(UI_smallProCom, _super);
    function UI_smallProCom() {
        return _super.call(this) || this;
    }
    UI_smallProCom.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "smallProCom"));
    };
    UI_smallProCom.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_1 = (this.getChild("1"));
        this.m_2 = (this.getChild("2"));
        this.m_3 = (this.getChild("3"));
        this.m_4 = (this.getChild("4"));
        this.m_5 = (this.getChild("5"));
    };
    UI_smallProCom.URL = "ui://dyaqtnkvpgazz4d";
    return UI_smallProCom;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_smallProCom);


/***/ }),

/***/ "./src/view/raw/Main/UI_unlockBtn.ts":
/*!*******************************************!*\
  !*** ./src/view/raw/Main/UI_unlockBtn.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_unlockBtn = /** @class */ (function (_super) {
    __extends(UI_unlockBtn, _super);
    function UI_unlockBtn() {
        return _super.call(this) || this;
    }
    UI_unlockBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("Main", "unlockBtn"));
    };
    UI_unlockBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_c1 = this.getController("c1");
        this.m_t0 = this.getTransition("t0");
    };
    UI_unlockBtn.URL = "ui://dyaqtnkvt8452m";
    return UI_unlockBtn;
}(fairygui.GButton));
/* harmony default export */ __webpack_exports__["default"] = (UI_unlockBtn);


/***/ }),

/***/ "./src/view/raw/Splash/SplashBinder.ts":
/*!*********************************************!*\
  !*** ./src/view/raw/Splash/SplashBinder.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI_Splash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI_Splash */ "./src/view/raw/Splash/UI_Splash.ts");
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

var SplashBinder = /** @class */ (function () {
    function SplashBinder() {
    }
    SplashBinder.bindAll = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(_UI_Splash__WEBPACK_IMPORTED_MODULE_0__["default"].URL, _UI_Splash__WEBPACK_IMPORTED_MODULE_0__["default"]);
    };
    return SplashBinder;
}());
/* harmony default export */ __webpack_exports__["default"] = (SplashBinder);


/***/ }),

/***/ "./src/view/raw/Splash/UI_Splash.ts":
/*!******************************************!*\
  !*** ./src/view/raw/Splash/UI_Splash.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI_Splash = /** @class */ (function (_super) {
    __extends(UI_Splash, _super);
    function UI_Splash() {
        return _super.call(this) || this;
    }
    UI_Splash.createInstance = function () {
        return (fairygui.UIPackage.createObject("Splash", "Splash"));
    };
    UI_Splash.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.m_title = (this.getChild("title"));
        this.m_progress = (this.getChild("progress"));
    };
    UI_Splash.URL = "ui://d5tzyd09m2yw0";
    return UI_Splash;
}(fairygui.GComponent));
/* harmony default export */ __webpack_exports__["default"] = (UI_Splash);


/***/ }),

/***/ "./src/view/splash/SplashScene.ts":
/*!****************************************!*\
  !*** ./src/view/splash/SplashScene.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var view_raw_Splash_UI_Splash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! view/raw/Splash/UI_Splash */ "./src/view/raw/Splash/UI_Splash.ts");
/* harmony import */ var xengine_events_Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/events/Event */ "./src/xengine/events/Event.ts");
/* harmony import */ var xengine_XEngine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/XEngine */ "./src/xengine/XEngine.ts");
/* harmony import */ var xengine_game_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xengine/game/Game */ "./src/xengine/game/Game.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var SplashScene = /** @class */ (function (_super) {
    __extends(SplashScene, _super);
    function SplashScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplashScene.prototype.constructFromResource = function () {
        _super.prototype.constructFromResource.call(this);
        this.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height, true);
        Object(xengine_events_Event__WEBPACK_IMPORTED_MODULE_1__["once"])(this.displayObject, xengine_events_Event__WEBPACK_IMPORTED_MODULE_1__["default"].ADDED, this, this.onReady);
    };
    SplashScene.prototype.onReady = function () {
        this.m_progress.value = 0;
        this.m_progress.tweenValue(60, 1);
        // 加载第一关卡
        if (xengine_game_Game__WEBPACK_IMPORTED_MODULE_3__["default"].inst.stated) {
            xengine_XEngine__WEBPACK_IMPORTED_MODULE_2__["default"].inst.scene_manager.replace('Main');
        }
        else {
            xengine_game_Game__WEBPACK_IMPORTED_MODULE_3__["default"].inst.on(xengine_game_Game__WEBPACK_IMPORTED_MODULE_3__["Events"].LOGIC_STARTED, this, function () {
                xengine_XEngine__WEBPACK_IMPORTED_MODULE_2__["default"].inst.scene_manager.replace('Main');
            });
        }
    };
    return SplashScene;
}(view_raw_Splash_UI_Splash__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (SplashScene);


/***/ }),

/***/ "./src/xengine/XEngine.ts":
/*!********************************!*\
  !*** ./src/xengine/XEngine.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var xengine_res_ResourceManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/res/ResourceManager */ "./src/xengine/res/ResourceManager.ts");
/* harmony import */ var view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! view */ "./src/view/index.ts");
/* harmony import */ var xengine_res_XResourceLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/res/XResourceLoader */ "./src/xengine/res/XResourceLoader.ts");
/* harmony import */ var xengine_view_XStage_laya__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xengine/view/XStage.laya */ "./src/xengine/view/XStage.laya.ts");
/* harmony import */ var xengine_view_SceneManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xengine/view/SceneManager */ "./src/xengine/view/SceneManager.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! config */ "./src/config.ts");
/* harmony import */ var xengine_view_XStage_egret__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! xengine/view/XStage.egret */ "./src/xengine/view/XStage.egret.ts");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/src/Tween.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var xengine_utils_Timer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! xengine/utils/Timer */ "./src/xengine/utils/Timer.ts");
/* harmony import */ var _res_ResourceLoader_laya__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./res/ResourceLoader.laya */ "./src/xengine/res/ResourceLoader.laya.ts");










var XEngine = /** @class */ (function () {
    function XEngine(stage) {
        this.fairygui_helper = null;
        this.stage = null;
        this.res = null;
        this.scene_manager = null;
        this.timer = null;
        this.last_frame_time = 0;
        if (global['engine']) {
            debugger; // 不允许多次创建单例
        }
        this.timer = new xengine_utils_Timer__WEBPACK_IMPORTED_MODULE_8__["Timer"]();
        this.last_frame_time = this.now;
        XEngine.inst = this;
        global['engine'] = this;
        this.res = new xengine_res_ResourceManager__WEBPACK_IMPORTED_MODULE_0__["ResourceManager"]();
        global['RES'] = this.res;
        this.res.register_loader(new Set(['png', 'jpg', 'gif', 'jpeg', 'bmp']), xengine_res_XResourceLoader__WEBPACK_IMPORTED_MODULE_2__["default"].TextureLoader);
        this.res.register_loader(new Set(['json']), xengine_res_XResourceLoader__WEBPACK_IMPORTED_MODULE_2__["default"].JSONLoader);
        this.res.register_loader(new Set(['mp3', 'wav']), xengine_res_XResourceLoader__WEBPACK_IMPORTED_MODULE_2__["default"].SoundLoader);
        this.res.register_loader(new Set(['bin', 'fui']), xengine_res_XResourceLoader__WEBPACK_IMPORTED_MODULE_2__["default"].BinaryLoader);
        // 创建抽象舞台
        switch (config__WEBPACK_IMPORTED_MODULE_5__["default"].backend_engine) {
            case config__WEBPACK_IMPORTED_MODULE_5__["BackendEngine"].LAYA:
                {
                    this.stage = new xengine_view_XStage_laya__WEBPACK_IMPORTED_MODULE_3__["default"](stage);
                    if (typeof (Laya3D) !== 'undefined') {
                        this.res.register_loader(new Set(['ls']), _res_ResourceLoader_laya__WEBPACK_IMPORTED_MODULE_9__["LayaScene3DLoader"]);
                        this.res.register_loader(new Set(['lh']), _res_ResourceLoader_laya__WEBPACK_IMPORTED_MODULE_9__["LayaSprite3DLoader"]);
                    }
                }
                break;
            case config__WEBPACK_IMPORTED_MODULE_5__["BackendEngine"].EGRET:
                this.stage = new xengine_view_XStage_egret__WEBPACK_IMPORTED_MODULE_6__["default"](stage);
                break;
            default:
                break;
        }
        this.fairygui_helper = new view__WEBPACK_IMPORTED_MODULE_1__["FairyGUIBinder"](this.stage, this.res);
        this.scene_manager = new xengine_view_SceneManager__WEBPACK_IMPORTED_MODULE_4__["SceneManager"](this.stage, this.fairygui_helper);
    }
    XEngine.prototype.start = function () {
        var _this = this;
        // 绑定帧回调
        switch (config__WEBPACK_IMPORTED_MODULE_5__["default"].backend_engine) {
            case config__WEBPACK_IMPORTED_MODULE_5__["BackendEngine"].LAYA:
                Laya.timer.frameLoop(1, this, this.main_loop);
                break;
            case config__WEBPACK_IMPORTED_MODULE_5__["BackendEngine"].EGRET:
                egret.startTick(function (timeStamp) {
                    _this.main_loop();
                    return false;
                }, null);
                break;
            default:
                break;
        }
    };
    XEngine.prototype.main_loop = function () {
        var now = this.now;
        var delta = Math.min(now - this.last_frame_time, 0.1);
        this.last_frame_time = now;
        this.timer.update(delta);
        _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_7__["update"](this.timer.tick * 1000);
        return delta;
    };
    Object.defineProperty(XEngine.prototype, "now", {
        get: function () {
            return (new Date()).getTime() / 1000.0;
        },
        enumerable: true,
        configurable: true
    });
    XEngine.inst = null;
    return XEngine;
}());
/* harmony default export */ __webpack_exports__["default"] = (XEngine);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/xengine/events/Event.ts":
/*!*************************************!*\
  !*** ./src/xengine/events/Event.ts ***!
  \*************************************/
/*! exports provided: default, once, on, off */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony import */ var _EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* harmony default export */ __webpack_exports__["default"] = (function () {
    var events = {
        ADDED: 'ADDED',
        REMOVED: 'REMOVED',
        RESIZE: 'RESIZE',
    };
    if (typeof (Laya) !== 'undefined') {
        events = __assign(__assign({}, events), (Laya.Event));
    }
    else if (typeof (egret) !== 'undefined') {
        events = __assign(__assign({}, events), (egret.Event));
    }
    return events;
}());
function once(target, event, caller, listener) {
    if (target instanceof _EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"] || typeof (Laya) !== 'undefined') {
        target.once(event, caller, listener);
    }
    else if (typeof (egret) !== 'undefined') {
        target.once(event, listener, caller);
    }
}
function on(target, event, caller, listener) {
    if (target instanceof _EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"] || typeof (Laya) !== 'undefined') {
        target.on(event, caller, listener);
    }
    else if (typeof (egret) !== 'undefined') {
        target.addEventListener(event, listener, caller);
    }
}
function off(target, event, caller, listener) {
    if (target instanceof _EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"] || typeof (Laya) !== 'undefined') {
        target.off(event, caller, listener);
    }
    else if (typeof (egret) !== 'undefined') {
        target.removeEventListener(event, listener, caller);
    }
}


/***/ }),

/***/ "./src/xengine/events/EventDispatcher.ts":
/*!***********************************************!*\
  !*** ./src/xengine/events/EventDispatcher.ts ***!
  \***********************************************/
/*! exports provided: EventDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDispatcher", function() { return EventDispatcher; });
/* harmony import */ var _Handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Handler */ "./src/xengine/events/Handler.ts");
/* harmony import */ var _HashObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HashObject */ "./src/xengine/events/HashObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * 事件派发器
 */
var EventDispatcher = /** @class */ (function (_super) {
    __extends(EventDispatcher, _super);
    function EventDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器。
     * @param	type 事件的类型。
     * @return 如果指定类型的侦听器已注册，则值为 `true` 则，值为 `false`。
     */
    EventDispatcher.prototype.hasListener = function (type) {
        var listener = this._events && this._events[type];
        return !!listener;
    };
    /**
     * 派发事件。
     * @param type 事件类型。
     * @param data （可选）回调数据。
     * 		**注意**：
     * 		如果是需要传递多个参数 `p1,p2,p3,...` 可以使用数组结构如：`[p1,p2,p3,...]` ；
     * 		如果需要回调单个参数 `p` ，且 `p` 是一个数组，则需要使用结构如：`[p]`，其他的单个参数 `p` ，可以直接传入参数 `p`。
     * @return 此事件类型是否有侦听者，如果有侦听者则值为 `true`，否则值为 `false`。
     */
    EventDispatcher.prototype.event = function (type, data) {
        if (data === void 0) { data = null; }
        if (!this._events || !this._events[type])
            return false;
        var listeners = this._events[type];
        if (listeners.run) {
            if (listeners.once)
                delete this._events[type];
            data != null ? listeners.runWith(data) : listeners.run();
        }
        else {
            for (var i = 0, n = listeners.length; i < n; i++) {
                var listener = listeners[i];
                if (listener) {
                    (data != null) ? listener.runWith(data) : listener.run();
                }
                if (!listener || listener.once) {
                    listeners.splice(i, 1);
                    i--;
                    n--;
                }
            }
            if (listeners.length === 0 && this._events)
                delete this._events[type];
        }
        return true;
    };
    /**
     * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param args		（可选）事件侦听函数的回调参数。
     * @return 此 EventDispatcher 对象。
     */
    EventDispatcher.prototype.on = function (type, caller, listener, args) {
        if (args === void 0) { args = null; }
        return this._createListener(type, caller, listener, args, false);
    };
    /**
     * 使用 `EventDispatcher` 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param args		（可选）事件侦听函数的回调参数。
     * @return 此 `EventDispatcher` 对象。
     */
    EventDispatcher.prototype.once = function (type, caller, listener, args) {
        if (args === void 0) { args = null; }
        return this._createListener(type, caller, listener, args, true);
    };
    EventDispatcher.prototype._createListener = function (type, caller, listener, args, once, offBefore) {
        if (offBefore === void 0) { offBefore = true; }
        //移除之前相同的监听
        offBefore && this.off(type, caller, listener, once);
        //使用对象池进行创建回收
        var handler = EventHandler.create(caller || this, listener, args, once);
        this._events || (this._events = {});
        var events = this._events;
        //默认单个，每个对象只有多个监听才用数组，节省一个数组的消耗
        if (!events[type])
            events[type] = handler;
        else {
            if (!events[type].run)
                events[type].push(handler);
            else
                events[type] = [events[type], handler];
        }
        return this;
    };
    /**
     * 从 `EventDispatcher` 对象中删除侦听器。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param onceOnly	（可选）如果值为 `true` ,则只移除通过 `once` 方法添加的侦听器。
     * @return 此 `EventDispatcher` 对象。
     */
    EventDispatcher.prototype.off = function (type, caller, listener, onceOnly) {
        if (onceOnly === void 0) { onceOnly = false; }
        if (!this._events || !this._events[type])
            return this;
        var listeners = this._events[type];
        if (listeners != null) {
            if (listeners.run) {
                if ((!caller || listeners.caller === caller) && (listener == null || listeners.method === listener) && (!onceOnly || listeners.once)) {
                    delete this._events[type];
                    listeners.recover();
                }
            }
            else {
                var count = 0;
                for (var i = 0, n = listeners.length; i < n; i++) {
                    var item = listeners[i];
                    if (!item) {
                        count++;
                        continue;
                    }
                    if (item && (!caller || item.caller === caller) && (listener == null || item.method === listener) && (!onceOnly || item.once)) {
                        count++;
                        listeners[i] = null;
                        item.recover();
                    }
                }
                //如果全部移除，则删除索引
                if (count === n)
                    delete this._events[type];
            }
        }
        return this;
    };
    /**
     * 从 `EventDispatcher` 对象中删除指定事件类型的所有侦听器。
     * @param type	（可选）事件类型，如果值为 `null`，则移除本对象所有类型的侦听器。
     * @return 此 `EventDispatcher` 对象。
     */
    EventDispatcher.prototype.offAll = function (type) {
        if (type === void 0) { type = null; }
        var events = this._events;
        if (!events)
            return this;
        if (type) {
            this._recoverHandlers(events[type]);
            delete events[type];
        }
        else {
            for (var name in events) {
                this._recoverHandlers(events[name]);
            }
            this._events = null;
        }
        return this;
    };
    /**
     * 移除`caller`为`target`的所有事件监听
     * @param	caller `caller`对象
     */
    EventDispatcher.prototype.offAllCaller = function (caller) {
        if (caller && this._events) {
            for (var name in this._events) {
                this.off(name, caller, null);
            }
        }
        return this;
    };
    EventDispatcher.prototype._recoverHandlers = function (arr) {
        if (!arr)
            return;
        if (arr.run) {
            arr.recover();
        }
        else {
            for (var i = arr.length - 1; i > -1; i--) {
                if (arr[i]) {
                    arr[i].recover();
                    arr[i] = null;
                }
            }
        }
    };
    return EventDispatcher;
}(_HashObject__WEBPACK_IMPORTED_MODULE_1__["HashObject"]));

/**@private */
var EventHandler = /** @class */ (function (_super) {
    __extends(EventHandler, _super);
    function EventHandler(caller, method, args, once) {
        return _super.call(this, caller, method, args, once) || this;
    }
    /**
     * @override
     */
    EventHandler.prototype.recover = function () {
        if (this._id > 0) {
            this._id = 0;
            EventHandler._pool.push(this.clear());
        }
    };
    /**
     * 从对象池内创建一个`Handler`，默认会执行一次回收，如果不需要自动回收，设置`once`参数为`false`。
     * @param caller	执行域(`this`)。
     * @param method	回调方法。
     * @param args		（可选）携带的参数。
     * @param once		（可选）是否只执行一次，如果为`true`，回调后执行`recover()`进行回收，默认为`true`。
     * @return 返回创建的`handler`实例。
     */
    EventHandler.create = function (caller, method, args, once) {
        if (args === void 0) { args = null; }
        if (once === void 0) { once = true; }
        if (EventHandler._pool.length)
            return EventHandler._pool.pop().setTo(caller, method, args, once);
        return new EventHandler(caller, method, args, once);
    };
    /**@private handler对象池*/
    EventHandler._pool = [];
    return EventHandler;
}(_Handler__WEBPACK_IMPORTED_MODULE_0__["Handler"]));


/***/ }),

/***/ "./src/xengine/events/Handler.ts":
/*!***************************************!*\
  !*** ./src/xengine/events/Handler.ts ***!
  \***************************************/
/*! exports provided: Handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Handler", function() { return Handler; });
/* harmony import */ var _HashObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HashObject */ "./src/xengine/events/HashObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * 事件处理器类
 *
 * 推荐使用 `Handler.create()` 方法从对象池创建，减少对象创建消耗。创建的 Handler 对象不再使用后，可以使用 Handler.recover() 将其回收到对象池，回收后不要再使用此对象，否则会导致不可预料的错误
 */
var Handler = /** @class */ (function (_super) {
    __extends(Handler, _super);
    /**
     * 根据指定的属性值，创建一个 <code>Handler</code> 类的实例。
     * @param	caller 执行域。
     * @param	method 处理函数。
     * @param	args 函数参数。
     * @param	once 是否只执行一次。
     */
    function Handler(caller, method, args, once) {
        if (caller === void 0) { caller = null; }
        if (method === void 0) { method = null; }
        if (args === void 0) { args = null; }
        if (once === void 0) { once = false; }
        var _this = _super.call(this) || this;
        /** 表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。*/
        _this.once = false;
        /**@private */
        _this._id = 0;
        _this.setTo(caller, method, args, once);
        return _this;
    }
    /**
     * 设置此对象的指定属性值。
     * @param	caller 执行域(this)。
     * @param	method 回调方法。
     * @param	args 携带的参数。
     * @param	once 是否只执行一次，如果为true，执行后执行recover()进行回收。
     * @return  返回 handler 本身。
     */
    Handler.prototype.setTo = function (caller, method, args, once) {
        this._id = Handler._gid++;
        this.caller = caller;
        this.method = method;
        this.args = args;
        this.once = once;
        return this;
    };
    /**
     * 执行处理器。
     */
    Handler.prototype.run = function () {
        if (this.method == null)
            return null;
        var id = this._id;
        var result = this.method.apply(this.caller, this.args);
        this._id === id && this.once && this.recover();
        return result;
    };
    /**
     * 执行处理器，并携带额外数据。
     * @param	data 附加的回调数据，可以是单数据或者Array(作为多参)。
     */
    Handler.prototype.runWith = function (data) {
        if (this.method == null)
            return null;
        var id = this._id;
        if (data == null)
            var result = this.method.apply(this.caller, this.args);
        else if (!this.args && !data.unshift)
            result = this.method.call(this.caller, data);
        else if (this.args)
            result = this.method.apply(this.caller, this.args.concat(data));
        else
            result = this.method.apply(this.caller, data);
        this._id === id && this.once && this.recover();
        return result;
    };
    /**
     * 清理对象引用。
     */
    Handler.prototype.clear = function () {
        this.caller = null;
        this.method = null;
        this.args = null;
        return this;
    };
    /**
     * 清理并回收到 Handler 对象池内。
     */
    Handler.prototype.recover = function () {
        if (this._id > 0) {
            this._id = 0;
            Handler._pool.push(this.clear());
        }
    };
    /**
     * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
     * @param	caller 执行域(this)。
     * @param	method 回调方法。
     * @param	args 携带的参数。
     * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
     * @return  返回创建的handler实例。
     */
    Handler.create = function (caller, method, args, once) {
        if (args === void 0) { args = null; }
        if (once === void 0) { once = true; }
        if (Handler._pool.length)
            return Handler._pool.pop().setTo(caller, method, args, once);
        return new Handler(caller, method, args, once);
    };
    /** handler对象池 */
    Handler._pool = [];
    /** handler对象ID */
    Handler._gid = 1;
    return Handler;
}(_HashObject__WEBPACK_IMPORTED_MODULE_0__["HashObject"]));



/***/ }),

/***/ "./src/xengine/events/HashObject.ts":
/*!******************************************!*\
  !*** ./src/xengine/events/HashObject.ts ***!
  \******************************************/
/*! exports provided: HashObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HashObject", function() { return HashObject; });
/**
 * 哈希计数
 */
var $hashCount = 1;
/**
 * 引擎顶级对象。
 * 框架内所有对象的基类，为对象实例提供唯一的`hashCode`值。
 */
var HashObject = /** @class */ (function () {
    /**
     * 创建一个 HashObject 对象
     */
    function HashObject() {
        this.$hashCode = $hashCount++;
    }
    Object.defineProperty(HashObject.prototype, "hashCode", {
        /**
         * 返回此对象唯一的哈希值,用于唯一确定一个对象。`hashCode` 为大于等于`1`的整数。
         */
        get: function () {
            return this.$hashCode;
        },
        enumerable: true,
        configurable: true
    });
    return HashObject;
}());



/***/ }),

/***/ "./src/xengine/events/Messenger.ts":
/*!*****************************************!*\
  !*** ./src/xengine/events/Messenger.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var Messenger = /** @class */ (function (_super) {
    __extends(Messenger, _super);
    function Messenger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.liseners = [];
        return _this;
    }
    /**
     * 派发事件。
     * @param type	事件类型。
     * @param data	（可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
     * @return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
     */
    Messenger.prototype.event = function (type, data) {
        var e_1, _a;
        try {
            for (var _b = __values(this.liseners), _c = _b.next(); !_c.done; _c = _b.next()) {
                var l = _c.value;
                if (l(type, data)) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return _super.prototype.event.call(this, type, data);
    };
    Messenger.prototype.add_lisener = function (lisener) {
        if (lisener) {
            this.liseners.push(lisener);
        }
    };
    Messenger.prototype.remove_lisener = function (lisener) {
        var idx = this.liseners.indexOf(lisener);
        if (idx != -1) {
            this.liseners.splice(idx, 1);
        }
    };
    return Messenger;
}(_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (Messenger);


/***/ }),

/***/ "./src/xengine/game/Game.ts":
/*!**********************************!*\
  !*** ./src/xengine/game/Game.ts ***!
  \**********************************/
/*! exports provided: Events, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
/* harmony import */ var xengine_utils_Timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/utils/Timer */ "./src/xengine/utils/Timer.ts");
/* harmony import */ var xengine_events_Messenger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/events/Messenger */ "./src/xengine/events/Messenger.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};



var Events;
(function (Events) {
    Events["LOGIC_INITIALIZED"] = "LOGIC_INITIALIZED";
    Events["LOGIC_STARTED"] = "LOGIC_STARTED";
})(Events || (Events = {}));
var LoadingState;
(function (LoadingState) {
    LoadingState[LoadingState["None"] = 0] = "None";
    LoadingState[LoadingState["LOADING"] = 1] = "LOADING";
    LoadingState[LoadingState["LOADED"] = 2] = "LOADED";
})(LoadingState || (LoadingState = {}));
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(options) {
        var e_1, _a;
        var _this = _super.call(this) || this;
        _this.storage = null;
        _this.messenger = null;
        /** 游戏暂停标记 */
        _this.paused = false;
        /** 游戏逻运行时长 */
        _this.logic_run_time = 0;
        /** 初始化标记 */
        _this.initialized = false;
        /** 逻辑定时器，随逻辑框架暂停 */
        _this.timer = new xengine_utils_Timer__WEBPACK_IMPORTED_MODULE_1__["Timer"]();
        /** 所有模块容器 */
        _this.modules = {};
        /** 逻辑模块 */
        _this.modules_list = [];
        /** 逻辑模块类 */
        _this.modules_type_list = [];
        /** 存档脏标记 */
        _this.query_saving = false;
        /** 存档是否加载完毕 */
        _this.load_state = LoadingState.None;
        /** 是否已经启动成功 */
        _this.stated = false;
        if (window['game']) {
            debugger; // 不允许创建多个实例
        }
        window['game'] = _this;
        Game.inst = _this;
        _this.modules_type_list = options.modules;
        try {
            for (var _b = __values(options.modules), _c = _b.next(); !_c.done; _c = _b.next()) {
                var M = _c.value;
                var name_1 = M.prototype.name;
                if (!name_1 || !name_1.length) {
                    debugger; // 未定义模块名称
                }
                var opt = options.options ? options.options[name_1] : undefined;
                var m = new M(opt);
                m.name = name_1;
                _this.modules_list.push(m);
                _this.modules[name_1] = m;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        _this.messenger = new xengine_events_Messenger__WEBPACK_IMPORTED_MODULE_2__["default"]();
        _this.storage = options.storage;
        return _this;
    }
    /** 获取模块 */
    Game.prototype.get_module = function (type) {
        return this.modules[type.prototype.name];
    };
    /** 框架启动（在game对象创建后，所有模块注册完毕后） */
    Game.prototype.setupt = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this.modules_list), _c = _b.next(); !_c.done; _c = _b.next()) {
                var m = _c.value;
                m.setup();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    /** 初始化 */
    Game.prototype.initialize = function () {
        var e_3, _a;
        console.log("开始初始化逻辑框架");
        this.paused = false;
        this.logic_run_time = 0;
        try {
            for (var _b = __values(this.modules_list), _c = _b.next(); !_c.done; _c = _b.next()) {
                var m = _c.value;
                m.initialize();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.initialized = true;
        this.event(Events.LOGIC_INITIALIZED);
        console.log("逻辑框架初始化完毕");
    };
    /** 启动 */
    Game.prototype.start = function () {
        var e_4, _a;
        console.log("启动各个逻辑模块");
        try {
            for (var _b = __values(this.modules_list), _c = _b.next(); !_c.done; _c = _b.next()) {
                var m = _c.value;
                m.start();
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.stated = true;
        this.event(Events.LOGIC_STARTED);
        console.log("逻辑框架启动完毕");
    };
    Game.prototype.is_ready = function () {
        var e_5, _a;
        try {
            for (var _b = __values(this.modules_list), _c = _b.next(); !_c.done; _c = _b.next()) {
                var m = _c.value;
                if (!m.is_ready())
                    return false;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return true;
    };
    Game.prototype.update = function (dt) {
        var e_6, _a, e_7, _b;
        var _this = this;
        // 存档
        if (this.query_saving) {
            this.save();
        }
        try {
            for (var _c = __values(this.modules_list), _d = _c.next(); !_d.done; _d = _c.next()) {
                var m = _d.value;
                m.always_update(dt);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_6) throw e_6.error; }
        }
        if (!this.paused && (this.initialized || this.is_ready())) {
            if (!this.initialized) {
                this.initialize();
                this.load_state = LoadingState.LOADING;
                this.load().then(function () {
                    _this.load_state = LoadingState.LOADED;
                }).catch(function (err) {
                    console.error(err);
                    _this.load_state = LoadingState.LOADED;
                });
            }
            if (this.load_state == LoadingState.LOADED) {
                this.logic_run_time += dt;
                if (!this.stated) { // 启动各个模块
                    this.start();
                }
                // 更新各个模块
                this.timer.update(dt);
                try {
                    for (var _e = __values(this.modules_list), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var m = _f.value;
                        m.update(dt);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        }
    };
    Game.prototype.query_save = function () {
        this.query_saving = true;
    };
    Game.prototype.save = function () {
        var data = { version: new Date().getTime() };
        for (var key in this.modules) {
            if (this.modules.hasOwnProperty(key)) {
                var m = this.modules[key];
                data[key] = m.save();
            }
        }
        this.query_saving = false;
        if (this.storage)
            this.storage.set_item('game', data);
        console.log("存档数据", data);
        return data;
    };
    Game.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, key, m;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.storage)
                            return [2 /*return*/, undefined];
                        return [4 /*yield*/, this.storage.get_item('game')];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            console.log("读取数据", data);
                            for (key in this.modules) {
                                if (this.modules.hasOwnProperty(key)) {
                                    m = this.modules[key];
                                    if (data[key] != undefined) {
                                        m.load(data[key]);
                                    }
                                }
                            }
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Game.inst = null;
    return Game;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./src/xengine/game/Module.ts":
/*!************************************!*\
  !*** ./src/xengine/game/Module.ts ***!
  \************************************/
/*! exports provided: default, game_module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "game_module", function() { return game_module; });
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * 逻辑模块
 * 代表一个逻辑功能，例如成就、商店、战斗等
 */
var Module = /** @class */ (function (_super) {
    __extends(Module, _super);
    function Module(options) {
        var _this = _super.call(this) || this;
        /** @readonly 模块名称 */
        _this.name = '';
        return _this;
    }
    ;
    /** game 对象和所有模块创建完毕后执行 */
    Module.prototype.setup = function () { };
    /** 初始化 */
    Module.prototype.initialize = function () { };
    /** 逻辑更新 */
    Module.prototype.update = function (dt) { };
    /** 模块开始 */
    Module.prototype.start = function () { };
    /** 恒更新，不考虑逻辑是否初始化完毕或暂停等逻辑，固定每帧调用 */
    Module.prototype.always_update = function (dt) { };
    /** 读档 */
    Module.prototype.load = function (data) { };
    /** 存档 */
    Module.prototype.save = function () { return undefined; };
    /** 模块是否准备就绪 */
    Module.prototype.is_ready = function () { return true; };
    return Module;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (Module);
/** 定义模块 */
function game_module(name) {
    return function (target) {
        target.prototype.name = name;
    };
}


/***/ }),

/***/ "./src/xengine/res/Resource.ts":
/*!*************************************!*\
  !*** ./src/xengine/res/Resource.ts ***!
  \*************************************/
/*! exports provided: Resource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resource", function() { return Resource; });
/* harmony import */ var _events_HashObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/HashObject */ "./src/xengine/events/HashObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource(url, data, loader) {
        var _this = _super.call(this) || this;
        _this.url = url;
        _this.native_data = data;
        _this.loader = loader;
        return _this;
    }
    return Resource;
}(_events_HashObject__WEBPACK_IMPORTED_MODULE_0__["HashObject"]));



/***/ }),

/***/ "./src/xengine/res/ResourceLoader.laya.ts":
/*!************************************************!*\
  !*** ./src/xengine/res/ResourceLoader.laya.ts ***!
  \************************************************/
/*! exports provided: DefaultResourceLoader, BinaryLoader, TextureLoader, SoundLoader, JSONLoader, LayaSpatialLoader, LayaScene3DLoader, LayaSprite3DLoader, LayaTexture2DLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultResourceLoader", function() { return DefaultResourceLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BinaryLoader", function() { return BinaryLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureLoader", function() { return TextureLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoundLoader", function() { return SoundLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONLoader", function() { return JSONLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayaSpatialLoader", function() { return LayaSpatialLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayaScene3DLoader", function() { return LayaScene3DLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayaSprite3DLoader", function() { return LayaSprite3DLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayaTexture2DLoader", function() { return LayaTexture2DLoader; });
/* harmony import */ var _ResourceLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResourceLoader */ "./src/xengine/res/ResourceLoader.ts");
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resource */ "./src/xengine/res/Resource.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var LayaResourceLoader = /** @class */ (function (_super) {
    __extends(LayaResourceLoader, _super);
    function LayaResourceLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayaResourceLoader.prototype.load_res = function (url, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Laya.loader.load(url, Laya.Handler.create(null, function () {
                resolve(new _Resource__WEBPACK_IMPORTED_MODULE_1__["Resource"](url, Laya.loader.getRes(url), _this));
            }), undefined, type);
        });
    };
    /** 销毁资源 */
    LayaResourceLoader.prototype.dispose = function (res) {
        Laya.loader.clearRes(res.url);
    };
    return LayaResourceLoader;
}(_ResourceLoader__WEBPACK_IMPORTED_MODULE_0__["ResourceLoader"]));
var DefaultResourceLoader = /** @class */ (function (_super) {
    __extends(DefaultResourceLoader, _super);
    function DefaultResourceLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultResourceLoader.prototype.load = function (url) {
        return this.load_res(url, undefined);
    };
    return DefaultResourceLoader;
}(LayaResourceLoader));

var BinaryLoader = /** @class */ (function (_super) {
    __extends(BinaryLoader, _super);
    function BinaryLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BinaryLoader.prototype.load = function (url) {
        return this.load_res(url, Laya.Loader.BUFFER);
    };
    return BinaryLoader;
}(LayaResourceLoader));

var TextureLoader = /** @class */ (function (_super) {
    __extends(TextureLoader, _super);
    function TextureLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextureLoader.prototype.load = function (url) {
        return this.load_res(url, undefined);
    };
    return TextureLoader;
}(LayaResourceLoader));

var SoundLoader = /** @class */ (function (_super) {
    __extends(SoundLoader, _super);
    function SoundLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SoundLoader.prototype.load = function (url) {
        return this.load_res(url, Laya.Loader.SOUND);
    };
    return SoundLoader;
}(LayaResourceLoader));

var JSONLoader = /** @class */ (function (_super) {
    __extends(JSONLoader, _super);
    function JSONLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONLoader.prototype.load = function (url) {
        return this.load_res(url, Laya.Loader.JSON);
    };
    return JSONLoader;
}(LayaResourceLoader));

var LayaSpatialLoader = /** @class */ (function (_super) {
    __extends(LayaSpatialLoader, _super);
    function LayaSpatialLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayaSpatialLoader.prototype.load_res = function (url, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            type.load(url, Laya.Handler.create(null, function (ret) {
                resolve(new _Resource__WEBPACK_IMPORTED_MODULE_1__["Resource"](url, ret, _this));
            }));
        });
    };
    /** 销毁资源 */
    LayaSpatialLoader.prototype.dispose = function (res) {
        Laya.loader.clearRes(res.url);
    };
    return LayaSpatialLoader;
}(_ResourceLoader__WEBPACK_IMPORTED_MODULE_0__["ResourceLoader"]));

var LayaScene3DLoader = /** @class */ (function (_super) {
    __extends(LayaScene3DLoader, _super);
    function LayaScene3DLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayaScene3DLoader.prototype.load = function (url) {
        return this.load_res(url, Laya.Scene3D);
    };
    return LayaScene3DLoader;
}(LayaSpatialLoader));

var LayaSprite3DLoader = /** @class */ (function (_super) {
    __extends(LayaSprite3DLoader, _super);
    function LayaSprite3DLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayaSprite3DLoader.prototype.load = function (url) {
        return this.load_res(url, Laya.Sprite3D);
    };
    return LayaSprite3DLoader;
}(LayaSpatialLoader));

var LayaTexture2DLoader = /** @class */ (function (_super) {
    __extends(LayaTexture2DLoader, _super);
    function LayaTexture2DLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayaTexture2DLoader.prototype.load = function (url) {
        return this.load_res(url, Laya.Texture2D);
    };
    return LayaTexture2DLoader;
}(LayaSpatialLoader));



/***/ }),

/***/ "./src/xengine/res/ResourceLoader.ts":
/*!*******************************************!*\
  !*** ./src/xengine/res/ResourceLoader.ts ***!
  \*******************************************/
/*! exports provided: ResourceLoaderError, ResourceLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceLoaderError", function() { return ResourceLoaderError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceLoader", function() { return ResourceLoader; });
/* harmony import */ var _events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/** 资源管理器错误类型 */
var ResourceLoaderError = /** @class */ (function (_super) {
    __extends(ResourceLoaderError, _super);
    function ResourceLoaderError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResourceLoaderError;
}(Error));

;
/** 资源加载器 */
var ResourceLoader = /** @class */ (function (_super) {
    __extends(ResourceLoader, _super);
    function ResourceLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** 执行加载 */
    ResourceLoader.prototype.load = function (url) {
        return new Promise(function (resolve, reject) {
            reject(new ResourceLoaderError("Undefined loader for " + url));
        });
    };
    /** 销毁资源 */
    ResourceLoader.prototype.dispose = function (res) {
        console.warn("Undefined dispose method for resource type", this);
    };
    return ResourceLoader;
}(_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));



/***/ }),

/***/ "./src/xengine/res/ResourceManager.egret.ts":
/*!**************************************************!*\
  !*** ./src/xengine/res/ResourceManager.egret.ts ***!
  \**************************************************/
/*! exports provided: TextureLoader, BinaryLoader, DefaultResourceLoader, SoundLoader, JSONLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureLoader", function() { return TextureLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BinaryLoader", function() { return BinaryLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultResourceLoader", function() { return DefaultResourceLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoundLoader", function() { return SoundLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONLoader", function() { return JSONLoader; });
/* harmony import */ var _ResourceLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResourceLoader */ "./src/xengine/res/ResourceLoader.ts");
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resource */ "./src/xengine/res/Resource.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var TextureLoader = /** @class */ (function (_super) {
    __extends(TextureLoader, _super);
    function TextureLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextureLoader.prototype.load = function (url) {
        var _this = this;
        var loader = new egret.ImageLoader();
        var promise = new Promise(function (resolve, reject) {
            loader.once(egret.Event.COMPLETE, function () {
                var texture = new egret.Texture();
                texture.bitmapData = loader.data;
                resolve(new _Resource__WEBPACK_IMPORTED_MODULE_1__["Resource"](url, texture, _this));
            }, null);
            loader.once(egret.IOErrorEvent.IO_ERROR, function () { return reject(); }, null);
        });
        loader.load(url);
        return promise;
    };
    return TextureLoader;
}(_ResourceLoader__WEBPACK_IMPORTED_MODULE_0__["ResourceLoader"]));

var BinaryLoader = /** @class */ (function (_super) {
    __extends(BinaryLoader, _super);
    function BinaryLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BinaryLoader.prototype.load = function (url) {
        var _this = this;
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
        var promise = new Promise(function (resolve, reject) {
            loader.once(egret.Event.COMPLETE, function () { return resolve(new _Resource__WEBPACK_IMPORTED_MODULE_1__["Resource"](url, loader.data, _this)); }, null);
            loader.once(egret.IOErrorEvent.IO_ERROR, function () { return reject(); }, null);
        });
        loader.load(new egret.URLRequest(url));
        return promise;
    };
    return BinaryLoader;
}(_ResourceLoader__WEBPACK_IMPORTED_MODULE_0__["ResourceLoader"]));

var DefaultResourceLoader = /** @class */ (function (_super) {
    __extends(DefaultResourceLoader, _super);
    function DefaultResourceLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DefaultResourceLoader;
}(_ResourceLoader__WEBPACK_IMPORTED_MODULE_0__["ResourceLoader"]));

var SoundLoader = /** @class */ (function (_super) {
    __extends(SoundLoader, _super);
    function SoundLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SoundLoader;
}(_ResourceLoader__WEBPACK_IMPORTED_MODULE_0__["ResourceLoader"]));

var JSONLoader = /** @class */ (function (_super) {
    __extends(JSONLoader, _super);
    function JSONLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JSONLoader;
}(_ResourceLoader__WEBPACK_IMPORTED_MODULE_0__["ResourceLoader"]));



/***/ }),

/***/ "./src/xengine/res/ResourceManager.ts":
/*!********************************************!*\
  !*** ./src/xengine/res/ResourceManager.ts ***!
  \********************************************/
/*! exports provided: ResourceManagerError, ResourceManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceManagerError", function() { return ResourceManagerError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceManager", function() { return ResourceManager; });
/* harmony import */ var _utils_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/path */ "./src/xengine/utils/path.ts");
/* harmony import */ var _events_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Resource */ "./src/xengine/res/Resource.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};



/** 资源管理器错误类型 */
var ResourceManagerError = /** @class */ (function (_super) {
    __extends(ResourceManagerError, _super);
    function ResourceManagerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResourceManagerError;
}(Error));

;
/** 资源管理器 */
var ResourceManager = /** @class */ (function (_super) {
    __extends(ResourceManager, _super);
    function ResourceManager() {
        var _this = _super.call(this) || this;
        /** 资源缓存池 */
        _this.cache = new Map();
        /** 资源加载器（通过文件拓展名查找） */
        _this.loaders = new Map();
        /** 基础资源路径 */
        _this._base_url = "";
        return _this;
    }
    Object.defineProperty(ResourceManager.prototype, "base_url", {
        get: function () {
            return this._base_url;
        },
        set: function (v) {
            if (v && !v.endsWith('/')) {
                this._base_url = v + '/';
            }
            else {
                this._base_url = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** 获取完整 URL*/
    ResourceManager.prototype.get_url = function (path) {
        var prefix = this.base_url;
        return "" + prefix + path;
    };
    /**
     * 注册资源加载器
     * @param extensions 拓展名
     * @param loader 资源加载器
     */
    ResourceManager.prototype.register_loader = function (extensions, loader) {
        var e_1, _a;
        try {
            for (var extensions_1 = __values(extensions), extensions_1_1 = extensions_1.next(); !extensions_1_1.done; extensions_1_1 = extensions_1.next()) {
                var ext = extensions_1_1.value;
                this.loaders.set(ext, loader.prototype);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (extensions_1_1 && !extensions_1_1.done && (_a = extensions_1.return)) _a.call(extensions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * 从缓存中获取资源，未加载到缓存中的资源返回 null
     * @param file 资源路径
     */
    ResourceManager.prototype.get_resource = function (file) {
        return this.cache.get(this.get_url(file));
    };
    /**
     * 异步加载资源
     * @param file 资源文件路径
     * @param cache 是否缓存资源
     * @param ignore_cache 是否忽略资源缓存执行强制加载
     */
    ResourceManager.prototype.load = function (file, cache, ignore_cache) {
        if (cache === void 0) { cache = true; }
        if (ignore_cache === void 0) { ignore_cache = false; }
        return __awaiter(this, void 0, void 0, function () {
            var url, data, ext, loader, data_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.get_url(file);
                        data = this.cache.get(url);
                        if (!ignore_cache && data) {
                            return [2 /*return*/, data];
                        }
                        ext = _utils_path__WEBPACK_IMPORTED_MODULE_0__["path"].extension(url).toLowerCase();
                        loader = this.loaders.get(ext);
                        if (!loader) return [3 /*break*/, 2];
                        return [4 /*yield*/, loader.load(url)];
                    case 1:
                        data_1 = _a.sent();
                        if (data_1) {
                            if (cache)
                                this.cache.set(url, data_1);
                            return [2 /*return*/, data_1];
                        }
                        else {
                            throw new ResourceManagerError("Invalid resouce data for file " + url);
                        }
                        return [3 /*break*/, 3];
                    case 2: throw new ResourceManagerError("No loader found for file extension " + ext);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 释放资源缓存池中的资源
     * @param path 资源路径
     */
    ResourceManager.prototype.release = function (path_or_res) {
        var url = '';
        if (typeof (path_or_res) === 'string') {
            url = this.get_url(path_or_res);
        }
        else if (path_or_res instanceof _Resource__WEBPACK_IMPORTED_MODULE_2__["Resource"]) {
            url = path_or_res.url;
        }
        if (this.cache.has(url)) {
            this.dispose(this.cache.get(url));
            this.cache.delete(url);
            return true;
        }
        return false;
    };
    /**
     * 销毁资源
     * @param res 要销毁的资源对象
     */
    ResourceManager.prototype.dispose = function (res) {
        if (res && res.loader) {
            res.loader.dispose(res);
        }
    };
    /** 通过资源名获取资源，实现 `EgreResManagerAdapter`
     * 在资源缓存池中查找资源缓存不会进行任何加载操作，如果缓存池中不存在对应的资源则返回 `null`
     */
    ResourceManager.prototype.getRes = function (filename) {
        var e_2, _a;
        try {
            for (var _b = __values(this.cache.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var file = _c.value;
                var ext = "." + _utils_path__WEBPACK_IMPORTED_MODULE_0__["path"].extension(file);
                var cur_file = _utils_path__WEBPACK_IMPORTED_MODULE_0__["path"].basename(file).replace(ext, '');
                if (cur_file == filename) {
                    return this.cache.get(file).native_data;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return null;
    };
    return ResourceManager;
}(_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__["EventDispatcher"]));



/***/ }),

/***/ "./src/xengine/res/XResourceLoader.ts":
/*!********************************************!*\
  !*** ./src/xengine/res/XResourceLoader.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ResourceLoader_laya__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResourceLoader.laya */ "./src/xengine/res/ResourceLoader.laya.ts");
/* harmony import */ var _ResourceManager_egret__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResourceManager.egret */ "./src/xengine/res/ResourceManager.egret.ts");


/* harmony default export */ __webpack_exports__["default"] = ((function () {
    if (typeof (Laya) !== 'undefined')
        return _ResourceLoader_laya__WEBPACK_IMPORTED_MODULE_0__;
    if (typeof (egret) !== 'undefined')
        return _ResourceManager_egret__WEBPACK_IMPORTED_MODULE_1__;
})());


/***/ }),

/***/ "./src/xengine/storage/Storage.ts":
/*!****************************************!*\
  !*** ./src/xengine/storage/Storage.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Storage = /** @class */ (function () {
    function Storage() {
    }
    Storage.prototype.set_item = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    Storage.prototype.get_item = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    return Storage;
}());
/* harmony default export */ __webpack_exports__["default"] = (Storage);


/***/ }),

/***/ "./src/xengine/storage/XStorage.egret.ts":
/*!***********************************************!*\
  !*** ./src/xengine/storage/XStorage.egret.ts ***!
  \***********************************************/
/*! exports provided: XStorageEgret */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XStorageEgret", function() { return XStorageEgret; });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/xengine/storage/Storage.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var XStorageEgret = /** @class */ (function (_super) {
    __extends(XStorageEgret, _super);
    function XStorageEgret() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XStorageEgret.prototype.set_item = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var data, type;
            return __generator(this, function (_a) {
                data = value;
                type = typeof (value);
                if ('object' === type) {
                    data = JSON.stringify(value);
                }
                egret.localStorage.setItem(key, JSON.stringify({ type: typeof (value), data: data }));
                return [2 /*return*/, true];
            });
        });
    };
    XStorageEgret.prototype.get_item = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var text, item, ret;
            return __generator(this, function (_a) {
                text = egret.localStorage.getItem(key);
                item = JSON.parse(text);
                ret = undefined;
                if (item) {
                    ret = item.data;
                    if (item.type === 'object') {
                        ret = JSON.parse(item.data);
                    }
                }
                return [2 /*return*/, ret];
            });
        });
    };
    return XStorageEgret;
}(_Storage__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./src/xengine/storage/XStorage.laya.ts":
/*!**********************************************!*\
  !*** ./src/xengine/storage/XStorage.laya.ts ***!
  \**********************************************/
/*! exports provided: XStorageLaya */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XStorageLaya", function() { return XStorageLaya; });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/xengine/storage/Storage.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var XStorageLaya = /** @class */ (function (_super) {
    __extends(XStorageLaya, _super);
    function XStorageLaya() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XStorageLaya.prototype.set_item = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var data, type;
            return __generator(this, function (_a) {
                data = value;
                type = typeof (value);
                if ('object' === type) {
                    data = JSON.stringify(value);
                }
                Laya.LocalStorage.setItem(key, JSON.stringify({ type: typeof (value), data: data }));
                return [2 /*return*/, true];
            });
        });
    };
    XStorageLaya.prototype.get_item = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var text, item, ret;
            return __generator(this, function (_a) {
                text = Laya.LocalStorage.getItem(key);
                if (!text)
                    return [2 /*return*/, undefined];
                item = JSON.parse(text);
                ret = undefined;
                if (item) {
                    ret = item.data;
                    if (item.type === 'object') {
                        ret = JSON.parse(item.data);
                    }
                }
                return [2 /*return*/, ret];
            });
        });
    };
    return XStorageLaya;
}(_Storage__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./src/xengine/storage/XStorage.ts":
/*!*****************************************!*\
  !*** ./src/xengine/storage/XStorage.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XStorage_laya__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XStorage.laya */ "./src/xengine/storage/XStorage.laya.ts");
/* harmony import */ var _XStorage_egret__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./XStorage.egret */ "./src/xengine/storage/XStorage.egret.ts");


/* harmony default export */ __webpack_exports__["default"] = (function () {
    if (typeof (Laya) !== 'undefined')
        return _XStorage_laya__WEBPACK_IMPORTED_MODULE_0__["XStorageLaya"];
    if (typeof (egret) !== 'undefined')
        return _XStorage_egret__WEBPACK_IMPORTED_MODULE_1__["XStorageEgret"];
}());


/***/ }),

/***/ "./src/xengine/utils/NodePool.ts":
/*!***************************************!*\
  !*** ./src/xengine/utils/NodePool.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 节点池
 */
var NodePool = /** @class */ (function (_super) {
    __extends(NodePool, _super);
    function NodePool(nodeFactory, size, releaseFunc) {
        var _this = _super.call(this) || this;
        _this.node_cache = {};
        _this.node_usage_cache = {};
        _this._pool_size = 0;
        _this.node_factory_func = null;
        _this._release_func = null;
        _this.node_factory_func = nodeFactory;
        for (var i = 0; i < size; i++) {
            _this.allocate_node();
        }
        _this._release_func = releaseFunc;
        return _this;
    }
    NodePool.prototype.allocate_node = function () {
        var node = this.node_factory_func();
        this.node_cache[this._pool_size] = node;
        this.node_usage_cache[this._pool_size] = true;
        this._pool_size += 1;
        return node;
    };
    NodePool.prototype.removeNodeFromParent = function (node) {
        if (node) {
            if (this._release_func) {
                this._release_func(node);
            }
            if (node.removeFromParent && node.parent) {
                node.removeFromParent();
            }
            else if (node.removeSelf && node.parent) {
                node.removeSelf();
            }
        }
    };
    NodePool.prototype.get_avaliable_index = function () {
        for (var i = 0; i < this._pool_size; i++) {
            if (this.node_usage_cache[i] === true)
                return i;
        }
        return -1;
    };
    NodePool.prototype.get = function () {
        var index = this.get_avaliable_index();
        if (index == -1) {
            var node = this.allocate_node();
            this.node_usage_cache[this._pool_size - 1] = false;
            return node;
        }
        else {
            this.node_usage_cache[index] = false;
            return this.node_cache[index];
        }
    };
    NodePool.prototype.release = function (node) {
        for (var i = 0; i < this._pool_size; i++) {
            if (node == this.node_cache[i]) {
                this.node_usage_cache[i] = true;
                this.removeNodeFromParent(node);
                break;
            }
        }
    };
    NodePool.prototype.release_all = function () {
        for (var i = 0; i < this._pool_size; i++) {
            this.node_usage_cache[i] = true;
            this.removeNodeFromParent(this.node_cache[i]);
        }
    };
    return NodePool;
}(Laya.EventDispatcher));
/* harmony default export */ __webpack_exports__["default"] = (NodePool);


/***/ }),

/***/ "./src/xengine/utils/Timer.ts":
/*!************************************!*\
  !*** ./src/xengine/utils/Timer.ts ***!
  \************************************/
/*! exports provided: Timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* harmony import */ var xengine_events_HashObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/HashObject */ "./src/xengine/events/HashObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

/**
 * 定时器调度类
 */
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._time = 0;
        _this.timers = [];
        return _this;
    }
    /** 执行帧更新 */
    Timer.prototype.update = function (dt) {
        var e_1, _a;
        this._time += dt;
        var removal_items = [];
        try {
            for (var _b = __values(this.timers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var timer = _c.value;
                if (this._time > timer.run_time) {
                    timer.callback();
                    timer.run_count = timer.run_count ? timer.run_count + 1 : 1;
                    if (timer.repeat >= 0 && timer.run_count >= timer.repeat) {
                        removal_items.push(timer);
                    }
                    else {
                        timer.run_time = this.tick + timer.interval;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (removal_items.length) {
            this.timers = this.timers.filter(function (t) { return removal_items.indexOf(t) == -1; });
        }
    };
    /**
     * 定时重复执行
     *
     * @param {number} interval 时间间隔
     * @param {number} count 执行次数，小于`0`的值表示无限重复执行
     * @param {Function} callback 执行的回调
     * @returns {Nullable<TimerItem>} 返回启动成功的定时器，可用于取消任务
     * @memberof Timer
     */
    Timer.prototype.repeat = function (interval, count, callback) {
        if (callback) {
            var item = {
                interval: interval,
                callback: callback,
                repeat: count,
                run_time: this.tick + interval,
            };
            this.timers.push(item);
            return item;
        }
        return null;
    };
    /**
     * 执行定时循环任务
     *
     * @param {number} interval 时间间隔
     * @param {Function} callback 执行的回调
     * @param {*} [time=-1] 执行次数，小于`0`的值表示无限重复执行
     * @returns {Nullable<TimerItem>} 返回启动成功的定时器，可用于取消任务
     * @memberof Timer
     */
    Timer.prototype.loop = function (interval, callback, time) {
        if (time === void 0) { time = -1; }
        return this.repeat(interval, time, callback);
    };
    /**
     * 定时执行一次
     *
     * @param {number} delay 延时
     * @param {Function} callback 执行的回调
     * @returns {Nullable<TimerItem>} 返回启动成功的定时器，可用于取消任务
     * @memberof Timer
     */
    Timer.prototype.once = function (delay, callback) {
        return this.repeat(delay, 0, callback);
    };
    /** 下一次定时器迭代时执行 */
    Timer.prototype.call_later = function (callback) {
        this.once(0, callback);
    };
    /**
     * 每帧执行一次
     * @param callback 执行的回调
     * @returns {Nullable<TimerItem>} 返回启动成功的定时器，可用于取消任务
     */
    Timer.prototype.frame_loop = function (callback) {
        return this.repeat(0, -1, callback);
    };
    /** 移除定时器, 返回是否存在并成功移除该定时器 */
    Timer.prototype.cancel = function (timer) {
        var idx = this.timers.indexOf(timer);
        if (idx != -1) {
            this.timers.splice(idx, 1);
            return true;
        }
        return false;
    };
    Object.defineProperty(Timer.prototype, "tick", {
        /** 获取该定时器启动时长 */
        get: function () {
            return this._time;
        },
        enumerable: true,
        configurable: true
    });
    /** 等待 */
    Timer.prototype.wait = function (delay) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.once(delay, function () { return resolve(); });
        });
    };
    /** 清空所有定时器 */
    Timer.prototype.clear = function () {
        this.timers = [];
    };
    return Timer;
}(xengine_events_HashObject__WEBPACK_IMPORTED_MODULE_0__["HashObject"]));



/***/ }),

/***/ "./src/xengine/utils/index.ts":
/*!************************************!*\
  !*** ./src/xengine/utils/index.ts ***!
  \************************************/
/*! exports provided: array_erase, shuffle_array, clamp, random_range, format_time_duration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array_erase", function() { return array_erase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffle_array", function() { return shuffle_array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random_range", function() { return random_range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format_time_duration", function() { return format_time_duration; });
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
// 移除数组元素
function array_erase(arr, ele) {
    return arr.filter(function (item) { return item != ele; });
}
/** 随机打乱数组 */
function shuffle_array(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        _a = __read([array[rand], array[i]], 2), array[i] = _a[0], array[rand] = _a[1];
    }
}
/**
 * 范围内取值
 *
 * @export
 * @param {number} value 输入值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 返回值
 */
function clamp(value, min, max) {
    if (value <= max && value >= min)
        return value;
    if (value > max)
        return max;
    if (value < min)
        return min;
}
/** 范围内随机 */
function random_range(min, max) {
    return Math.random() * (max - min) + min;
}
/**
* 格式化秒数为分钟字符串
*
* @export
* @param {number} second
* @returns {string}
*/
function format_time_duration(second) {
    var m = Math.floor(second / 60);
    var s = Math.floor(second - m * 60);
    if (m < 10)
        m = "0" + m;
    if (s < 10)
        s = "0" + s;
    return m + ":" + s;
}


/***/ }),

/***/ "./src/xengine/utils/math.ts":
/*!***********************************!*\
  !*** ./src/xengine/utils/math.ts ***!
  \***********************************/
/*! exports provided: deg2rad, rad2deg, getVector3ByStr, angleByPoint, pointByAngle, direByAngle, Vector2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deg2rad", function() { return deg2rad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rad2deg", function() { return rad2deg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVector3ByStr", function() { return getVector3ByStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angleByPoint", function() { return angleByPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointByAngle", function() { return pointByAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "direByAngle", function() { return direByAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2", function() { return Vector2; });
function deg2rad(p_y) {
    return p_y * Math.PI / 180.0;
}
function rad2deg(p_y) {
    return p_y * 180.0 / Math.PI;
}
// str 结构为 1,1,1
function getVector3ByStr(str) {
    if (!str)
        return null;
    var temp = str.split(",");
    return new Laya.Vector3(parseFloat(temp[0]), parseFloat(temp[1]), parseFloat(temp[2]));
}
function angleByPoint(point1, point2) {
    // let angle = Math.atan((tary - y) / - (tarx - x));
    return parseFloat((Math.atan2(point1.x - point2.x, -(point1.y - point2.y)) * 180 / Math.PI).toFixed(2));
}
function pointByAngle(startPoint, angle) {
    angle = angle % 360;
    var yOffset = angle <= 90 && angle >= -90 ? 1 : -1;
    // let xOffset = angle >= 0 && angle <= 180 ? 1 : -1;
    angle = angle / 180 * Math.PI;
    var y = startPoint.y + yOffset;
    var x = startPoint.x + Math.sin(angle);
    return new Laya.Point(x, y);
}
// 向量
function direByAngle(startPoint, angle) {
    var temp = pointByAngle(startPoint, angle);
    temp.x = temp.x - startPoint.x;
    temp.y = temp.y - startPoint.y;
    return temp;
}
/**
 * 二维向量类
 */
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () { return this._x; },
        set: function (v) { this._x = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () { return this._y; },
        set: function (v) { this._y = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "width", {
        get: function () { return this._x; },
        set: function (v) { this._x = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "height", {
        get: function () { return this._y; },
        set: function (v) { this._y = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "area", {
        /** 面积 */
        get: function () { return this._x * this._y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "length", {
        /** 长度 */
        get: function () { return Math.sqrt(this._x * this._x + this._y * this._y); },
        enumerable: true,
        configurable: true
    });
    Vector2.prototype.add_assign = function (v) {
        this._x += v._x;
        this._y += v._y;
        return this;
    };
    Vector2.prototype.minus = function (v) {
        return new Vector2(this._x - v._x, this._y - v._y);
    };
    Vector2.prototype.nevigate = function () {
        return new Vector2(-this._x, -this._y);
    };
    Vector2.prototype.multiply = function (num) {
        return new Vector2(this._x * num, this._y * num);
    };
    Vector2.prototype.divide = function (v) {
        return new Vector2(this._x / v._x, this._y / v._y);
    };
    Vector2.prototype.normalize = function () {
        var l = this._x * this._x + this._y * this._y;
        if (l != 0) {
            l = Math.sqrt(l);
            this._x /= l;
            this._y /= l;
        }
        return this;
    };
    Vector2.prototype.distance_to = function (p_vector2) {
        return Math.sqrt((this._x - p_vector2._x) * (this._x - p_vector2._x) + (this._y - p_vector2._y) * (this._y - p_vector2._y));
    };
    Vector2.prototype.distance_squared_to = function (p_vector2) {
        return (this._x - p_vector2._x) * (this._x - p_vector2._x) + (this._y - p_vector2._y) * (this._y - p_vector2._y);
    };
    Vector2.prototype.cross = function (p_other) {
        return this._x * p_other._y - this._y * p_other._x;
    };
    Vector2.prototype.dot = function (p_other) {
        return this._x * p_other._x + this._y * p_other._y;
    };
    Vector2.prototype.angle_to = function (p_vector2) {
        return Math.atan2(this.cross(p_vector2), this.dot(p_vector2));
    };
    Vector2.prototype.angle_to_point = function (p_vector2) {
        return Math.atan2(this._y - p_vector2._y, this._x - p_vector2._x);
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this._x, this._y);
    };
    Vector2.prototype.toString = function () {
        return this._x + "," + this._y;
    };
    return Vector2;
}());

window['Vector2'] = Vector2;


/***/ }),

/***/ "./src/xengine/utils/path.ts":
/*!***********************************!*\
  !*** ./src/xengine/utils/path.ts ***!
  \***********************************/
/*! exports provided: path */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "path", function() { return path; });
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * 对文件路径的一些操作，针对的是 C:/A/B/C/D/example.ts这种格式
 */
var path = {
    /**
     * 格式化文件路径，"C:/A/B//C//D//example.ts"=>"C:/A/B/C/D/example.ts"
     * @param filename 传入的文件路径
     */
    normalize: function (filename) {
        var arr = filename.split("/");
        return arr.filter(function (value, index) { return !!value || index == arr.length - 1; }).join("/");
    },
    /**
     * 只是 lh 和 ls
     */
    res3DUrlByName: function (sceneName, skinName, isScene) {
        if (isScene === void 0) { isScene = true; }
        return "assets/unity_exported/LayaScene_" + sceneName + "/Conventional/" + skinName + (isScene ? ".ls" : ".lh");
    },
    /**
     * 根据文件路径得到文件名字，"C:/A/B/example.ts"=>"example.ts"
     * @param filename 传入的文件路径
     * @return 文件的名字
     */
    basename: function (filename) {
        return filename.substr(filename.lastIndexOf("/") + 1);
    },
    /**
     * 文件所在文件夹路径，"C:/A/B/example.ts"=>"C:/A/B"
     * @param path 传入的文件路径
     * @return 文件所在文件夹的地址
     */
    dirname: function (path) {
        return path.substr(0, path.lastIndexOf("/"));
    },
    /**
     * 获得文件拓展名 " text.txt" => "txt"
     * @param path 传入的文件路径
     */
    extension: function (filename) {
        var pos = filename.lastIndexOf('.');
        if (pos >= 0 && pos < filename.length - 1) {
            return filename.substring(pos + 1, filename.length);
        }
        return "";
    },
    join: function (dir) {
        var e_1, _a;
        var pathes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            pathes[_i - 1] = arguments[_i];
        }
        var ret = dir;
        try {
            for (var pathes_1 = __values(pathes), pathes_1_1 = pathes_1.next(); !pathes_1_1.done; pathes_1_1 = pathes_1.next()) {
                var p = pathes_1_1.value;
                if (p) {
                    ret += '/' + p;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (pathes_1_1 && !pathes_1_1.done && (_a = pathes_1.return)) _a.call(pathes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return ret;
    }
};


/***/ }),

/***/ "./src/xengine/utils/xhttp.laya.ts":
/*!*****************************************!*\
  !*** ./src/xengine/utils/xhttp.laya.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var LayaHttp = /** @class */ (function (_super) {
    __extends(LayaHttp, _super);
    function LayaHttp() {
        var _this = _super.call(this) || this;
        /** 超时时间（秒） */
        _this.timeout = 10;
        return _this;
    }
    LayaHttp.prototype.get = function (url, headers) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = _this.timeout * 1000;
            var callbacks = {
                completeHandler: function (res) {
                    if (typeof (res) === 'string' && (res.startsWith('{') || res.startsWith("["))) {
                        resolve(JSON.parse(res));
                    }
                    else {
                        resolve(res);
                    }
                },
                errorHandler: function (err) {
                    reject(err);
                }
            };
            xhr.once(Laya.Event.COMPLETE, callbacks, callbacks.completeHandler);
            xhr.once(Laya.Event.ERROR, callbacks, callbacks.errorHandler);
            xhr.send(url);
        });
    };
    LayaHttp.prototype.post = function (url, body, headers) {
        if (headers === void 0) { headers = ["Content-Type", "application/json"]; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var xhr = new Laya.HttpRequest();
                        xhr.http.timeout = _this.timeout * 1000;
                        var callbacks = {
                            completeHandler: function (res) {
                                resolve(res);
                            },
                            errorHandler: function (err) {
                                reject(err);
                            }
                        };
                        xhr.once(Laya.Event.COMPLETE, callbacks, callbacks.completeHandler);
                        xhr.once(Laya.Event.ERROR, callbacks, callbacks.errorHandler);
                        var raw_body = typeof (body) === 'object' ? JSON.stringify(body) : body;
                        xhr.send(url, raw_body, 'post', 'json', headers);
                    })];
            });
        });
    };
    return LayaHttp;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (LayaHttp);
;


/***/ }),

/***/ "./src/xengine/utils/xhttp.ts":
/*!************************************!*\
  !*** ./src/xengine/utils/xhttp.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _xhttp_laya__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xhttp.laya */ "./src/xengine/utils/xhttp.laya.ts");

/* harmony default export */ __webpack_exports__["default"] = ((function () {
    var xhttp = null;
    if (typeof (Laya) !== 'undefined')
        xhttp = new _xhttp_laya__WEBPACK_IMPORTED_MODULE_0__["default"]();
    return xhttp;
})());


/***/ }),

/***/ "./src/xengine/view/3d/X3D.ts":
/*!************************************!*\
  !*** ./src/xengine/view/3d/X3D.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XSprite3D_laya__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XSprite3D.laya */ "./src/xengine/view/3d/XSprite3D.laya.ts");
/* harmony import */ var _XScene3D_laya__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./XScene3D.laya */ "./src/xengine/view/3d/XScene3D.laya.ts");


var X3DLaya = {
    "Sprite3D": _XSprite3D_laya__WEBPACK_IMPORTED_MODULE_0__["default"],
    "Scene3D": _XScene3D_laya__WEBPACK_IMPORTED_MODULE_1__["default"],
};
/* harmony default export */ __webpack_exports__["default"] = (function () {
    if (typeof (Laya) !== 'undefined')
        return X3DLaya;
}());


/***/ }),

/***/ "./src/xengine/view/3d/XScene3D.laya.ts":
/*!**********************************************!*\
  !*** ./src/xengine/view/3d/XScene3D.laya.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
/* harmony import */ var xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/XEngine */ "./src/xengine/XEngine.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var XScene3DLaya = /** @class */ (function (_super) {
    __extends(XScene3DLaya, _super);
    function XScene3DLaya(url) {
        var _this = _super.call(this) || this;
        _this.displayObject = null;
        _this.url = "";
        _this.url = url;
        return _this;
    }
    XScene3DLaya.prototype.instance = function (duplicate) {
        if (duplicate === void 0) { duplicate = true; }
        return __awaiter(this, void 0, void 0, function () {
            var ret, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__["default"].inst.res.load(this.url, !duplicate, duplicate)];
                    case 1:
                        ret = _a.sent();
                        node = ret.native_data;
                        this.displayObject = node;
                        return [2 /*return*/, this.displayObject];
                }
            });
        });
    };
    XScene3DLaya.prototype.add_child = function (node) {
        this.displayObject.addChild(node.displayObject);
    };
    return XScene3DLaya;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (XScene3DLaya);


/***/ }),

/***/ "./src/xengine/view/3d/XSprite3D.laya.ts":
/*!***********************************************!*\
  !*** ./src/xengine/view/3d/XSprite3D.laya.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
/* harmony import */ var xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/XEngine */ "./src/xengine/XEngine.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var XSprite3D = /** @class */ (function (_super) {
    __extends(XSprite3D, _super);
    function XSprite3D(url) {
        var _this = _super.call(this) || this;
        _this.displayObject = null;
        _this.url = "";
        _this.url = url;
        return _this;
    }
    XSprite3D.prototype.instance = function (duplicate) {
        if (duplicate === void 0) { duplicate = true; }
        return __awaiter(this, void 0, void 0, function () {
            var ret, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__["default"].inst.res.load(this.url)];
                    case 1:
                        ret = _a.sent();
                        node = ret.native_data;
                        this.displayObject = duplicate ? node.clone() : node;
                        return [2 /*return*/, this.displayObject];
                }
            });
        });
    };
    XSprite3D.prototype.add_child = function (node) {
        this.displayObject.addChild(node.displayObject);
    };
    return XSprite3D;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (XSprite3D);


/***/ }),

/***/ "./src/xengine/view/DialogWindow.ts":
/*!******************************************!*\
  !*** ./src/xengine/view/DialogWindow.ts ***!
  \******************************************/
/*! exports provided: default, dialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dialog", function() { return dialog; });
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! config */ "./src/config.ts");
/* harmony import */ var xengine_utils_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/utils/math */ "./src/xengine/utils/math.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var DESIGN_SCREEN_SIZE = new xengine_utils_math__WEBPACK_IMPORTED_MODULE_1__["Vector2"](config__WEBPACK_IMPORTED_MODULE_0__["default"].width, config__WEBPACK_IMPORTED_MODULE_0__["default"].height);
var DialogWindow = /** @class */ (function (_super) {
    __extends(DialogWindow, _super);
    function DialogWindow() {
        var _this = _super.call(this) || this;
        /** @readonly 对话框ID */
        _this.uid = '';
        /** 参数 */
        _this.params = [];
        /** 对话框视图 */
        _this.dialog_view = null;
        _this._tween = new Laya.Tween();
        var dialog = _this.makeDialog();
        _this.dialog_view = dialog.inst;
        if (!dialog || !dialog.inst && window['DEBUG_ENABLED']) {
            // 请实现 makeDialog 方法来创建对话框实例
            debugger;
        }
        _this.contentPane = dialog.inst;
        var scale = Math.min(Laya.stage.width / DESIGN_SCREEN_SIZE.width, Laya.stage.height / DESIGN_SCREEN_SIZE.height);
        // this.contentPane.setSize(this.contentPane.width * scale, this.contentPane.height * scale);
        _this.setSize(_this.contentPane.width, _this.contentPane.height, true);
        _this.setXY(Laya.stage.width / 2, Laya.stage.height / 2);
        _this.contentPane.setPivot(0.5, 0.5, true);
        _this.contentPane.setXY(0, 0);
        _this.modal = dialog.modal;
        fairygui.GRoot.inst['_modalLayer'].displayObject.alpha = 0.4;
        return _this;
    }
    DialogWindow.prototype.makeDialog = function () {
        return {
            inst: null,
            title: '',
            modal: true,
        };
    };
    /** 初始化回调 */
    DialogWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
    };
    /** 即将展现时的回调，一般在此处更新窗口界面 */
    DialogWindow.prototype.onReadyToShow = function () { };
    /** 即弹窗动画播放完，完全展现在用户面前时的回调 */
    DialogWindow.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
    };
    /** 隐藏后回调 */
    DialogWindow.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
    };
    DialogWindow.prototype.doShowAnimation = function () {
        this.onReadyToShow();
        this.displayObject.scale(0, 0);
        this._tween.clear();
        this._tween.to(this.displayObject, { scaleX: 1, scaleY: 1, }, 260, null, Laya.Handler.create(this, this.onShown));
    };
    DialogWindow.prototype.doHideAnimation = function () {
        this.displayObject.scale(1, 1);
        this._tween.clear();
        this._tween.to(this.displayObject, { scaleX: 0, scaleY: 0, }, 260, null, Laya.Handler.create(this, this.hideImmediately));
    };
    return DialogWindow;
}(fairygui.Window));
/* harmony default export */ __webpack_exports__["default"] = (DialogWindow);
/** 定义对话框 */
function dialog(uid) {
    return function (target) {
        target.prototype.uid = uid;
    };
}


/***/ }),

/***/ "./src/xengine/view/FairyGUIHelper.ts":
/*!********************************************!*\
  !*** ./src/xengine/view/FairyGUIHelper.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _res_XResourceLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../res/XResourceLoader */ "./src/xengine/res/XResourceLoader.ts");
/* harmony import */ var _utils_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/path */ "./src/xengine/utils/path.ts");
/* harmony import */ var xengine_events_Event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/events/Event */ "./src/xengine/events/Event.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! config */ "./src/config.ts");
/* harmony import */ var _ToastManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ToastManager */ "./src/xengine/view/ToastManager.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};





var FairyGUIHelper = /** @class */ (function () {
    function FairyGUIHelper(stage, res, ui_res_dir, binary_extension) {
        if (binary_extension === void 0) { binary_extension = 'fui'; }
        this.stage = null;
        this.res = null;
        this.last_stage_size = { width: 0, height: 0 };
        this.full_screen_cls = [];
        this.res_dir = '';
        this.loaded_packages = new Set();
        this.dialog_instances = new Map();
        this.dialog_classes = new Map();
        this.toast = null;
        // 资源管理
        this.res = res;
        this.res_dir = ui_res_dir;
        this.res.register_loader(new Set([binary_extension]), _res_XResourceLoader__WEBPACK_IMPORTED_MODULE_0__["default"].BinaryLoader);
        if (fairygui.AssetProxy) {
            fairygui.AssetProxy.inst.getRes = this.getRes.bind(this);
        }
        this.toast = new _ToastManager__WEBPACK_IMPORTED_MODULE_4__["default"]();
        // 添加到舞台
        this.stage = stage;
        this.last_stage_size.width = stage.width;
        this.last_stage_size.height = stage.height;
        stage.add_child(fairygui.GRoot.inst.displayObject);
        this.on_stage_resized();
        stage.on(xengine_events_Event__WEBPACK_IMPORTED_MODULE_2__["default"].RESIZE, this, this.on_stage_resized);
        // 绑定视图
        this.bind_views();
    }
    FairyGUIHelper.prototype.load_package = function (name, binary_file, atlas) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, atlas_1, atlas_1_1, img, e_1_1, buff, ret;
            var e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = typeof (atlas);
                        switch (_a) {
                            case 'string': return [3 /*break*/, 1];
                            case 'object': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 12];
                    case 1: return [4 /*yield*/, this.res.load(atlas)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 13];
                    case 3:
                        if (!atlas.length) return [3 /*break*/, 11];
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 9, 10, 11]);
                        atlas_1 = __values(atlas), atlas_1_1 = atlas_1.next();
                        _c.label = 5;
                    case 5:
                        if (!!atlas_1_1.done) return [3 /*break*/, 8];
                        img = atlas_1_1.value;
                        return [4 /*yield*/, this.res.load(img)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7:
                        atlas_1_1 = atlas_1.next();
                        return [3 /*break*/, 5];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (atlas_1_1 && !atlas_1_1.done && (_b = atlas_1.return)) _b.call(atlas_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 11: return [3 /*break*/, 13];
                    case 12: return [3 /*break*/, 13];
                    case 13: return [4 /*yield*/, this.res.load(binary_file)];
                    case 14:
                        buff = _c.sent();
                        ret = fairygui.UIPackage.addPackage(name, buff.native_data);
                        this.loaded_packages.add(name);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    FairyGUIHelper.prototype.getRes = function (filename) {
        return this.res.get_resource(_utils_path__WEBPACK_IMPORTED_MODULE_1__["path"].join(this.res_dir, filename)).native_data;
    };
    FairyGUIHelper.prototype.is_package_loaded = function (name) {
        return this.loaded_packages.has(name);
    };
    FairyGUIHelper.prototype.on_stage_resized = function () {
        var e_2, _a, e_3, _b;
        if (this.stage.width != this.last_stage_size.width || this.stage.height != this.last_stage_size.height) {
            fairygui.GRoot.inst.setSize(this.stage.width, this.stage.height);
            try {
                for (var _c = __values(fairygui.GRoot.inst._children), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var c = _d.value;
                    try {
                        for (var _e = (e_3 = void 0, __values(this.full_screen_cls)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var cls = _f.value;
                            if (c instanceof cls) {
                                c.setSize(this.stage.width, this.stage.height);
                                break;
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    c.ensureSizeCorrect();
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.last_stage_size.width = this.stage.width;
            this.last_stage_size.height = this.stage.height;
        }
    };
    FairyGUIHelper.prototype.bind_view = function (url, cls, full_screen) {
        if (full_screen === void 0) { full_screen = false; }
        fairygui.UIObjectFactory.setPackageItemExtension(url, cls);
        if (full_screen) {
            this.full_screen_cls.push(cls);
        }
    };
    FairyGUIHelper.prototype.register_dialog = function (dialogClass) {
        this.dialog_classes.set(dialogClass.prototype.uid, dialogClass);
    };
    FairyGUIHelper.prototype.register_toast_view = function (toastViewClass) {
        this.bind_view(toastViewClass.URL, toastViewClass);
        this.toast.set_toast_view(toastViewClass);
    };
    FairyGUIHelper.prototype.hide_all_dialogs = function () {
        for (var name_1 in this.dialog_instances) {
            var dialog = this.dialog_instances[name_1];
            if (dialog) {
                dialog.hide();
            }
        }
    };
    /**
     * 展示对话框
     * @param type 对话框类型，可以是对话框类或对话框的UID
     * @param params 传给对话框的参数
     */
    FairyGUIHelper.prototype.show_dialog = function (type) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var uid = typeof (type) === 'function' ? type.prototype.uid : type;
        var dialog = this.dialog_instances.get(uid);
        if (!dialog) {
            if (this.dialog_classes.get(uid)) {
                var DialogClass = this.dialog_classes.get(uid);
                dialog = new DialogClass();
                this.dialog_instances.set(uid, dialog);
            }
        }
        if (dialog) {
            dialog.params = params;
            dialog.show();
        }
        else {
            console.error("不存在对话框", uid);
        }
        return dialog;
    };
    /**
     * 监听FairyGUI视图对象的点击事件
     * @param target 点击目标
     * @param caller 回调的 `this` 绑定
     * @param listener 回调函数
     * @param params 回调函数的参数
     */
    FairyGUIHelper.onClick = function (target, caller, listener) {
        var params = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            params[_i - 3] = arguments[_i];
        }
        switch (config__WEBPACK_IMPORTED_MODULE_3__["default"].backend_engine) {
            case config__WEBPACK_IMPORTED_MODULE_3__["BackendEngine"].EGRET:
                target['addClickListener'](null, function () {
                    listener.apply(caller, params);
                });
                break;
            case config__WEBPACK_IMPORTED_MODULE_3__["BackendEngine"].LAYA:
                target['onClick'](null, function () {
                    listener.apply(caller, params);
                });
                break;
            default:
                break;
        }
    };
    FairyGUIHelper.prototype.bind_views = function () { };
    return FairyGUIHelper;
}());
/* harmony default export */ __webpack_exports__["default"] = (FairyGUIHelper);


/***/ }),

/***/ "./src/xengine/view/SceneManager.ts":
/*!******************************************!*\
  !*** ./src/xengine/view/SceneManager.ts ***!
  \******************************************/
/*! exports provided: SceneManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneManager", function() { return SceneManager; });
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var SceneManagerError = /** @class */ (function (_super) {
    __extends(SceneManagerError, _super);
    function SceneManagerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SceneManagerError;
}(Error));
;
/** 场景管理器 */
var SceneManager = /** @class */ (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager(stage, fairy) {
        var _this = _super.call(this) || this;
        _this.fairy = null;
        _this.stage = null;
        /** 已注册的场景 */
        _this.scenes = new Map();
        /** 场景栈 */
        _this.scene_stack = [];
        _this.stage = stage;
        _this.fairy = fairy;
        return _this;
    }
    /**
     * 注册场景
     * @param scene 场景描述
     * @param preload 是否执行预加载
     * @param initial_scene 是否是初始场景
     */
    SceneManager.prototype.register_scene = function (scene, preload, initial_scene) {
        var _this = this;
        if (preload === void 0) { preload = false; }
        if (initial_scene === void 0) { initial_scene = false; }
        this.scenes.set(scene.name, scene);
        if (preload) {
            this.load_scene(scene).then(function (ret) {
                if (initial_scene) {
                    _this.push(scene.name);
                }
            }).catch(function (err) {
                throw err;
            });
        }
    };
    SceneManager.prototype.setPackageItemExtension = function (packName, resName, cls) {
        fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL(packName, resName), cls);
    };
    /** 加载场景 */
    SceneManager.prototype.load_scene = function (scene) {
        return __awaiter(this, void 0, void 0, function () {
            var comToClass, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.fairy.is_package_loaded(scene.package.name)) return [3 /*break*/, 4];
                        if (!scene.load_dependences) return [3 /*break*/, 2];
                        return [4 /*yield*/, scene.load_dependences()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.fairy.load_package(scene.package.name, scene.package.data_file, scene.package.atlas)];
                    case 3:
                        _a.sent();
                        comToClass = scene.package.comToClass;
                        for (key in comToClass) {
                            this.setPackageItemExtension(scene.package.name, key, comToClass[key]);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** 栈顶的场景 */
    SceneManager.prototype.top = function () {
        return this.scene_stack.length ? this.scene_stack[this.scene_stack.length - 1] : null;
    };
    /**
     * 压入场景，当前场景作为历史场景，可通过 `pop` 返回
     * @param scene_name 压入的场景名
     */
    SceneManager.prototype.push = function (scene_name) {
        return __awaiter(this, void 0, void 0, function () {
            var scene, current;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scene = this.scenes.get(scene_name);
                        if (!scene) {
                            throw new SceneManagerError("尝试跳转到不存在未注册的场景: " + scene_name);
                        }
                        // 不能重复叠加相同场景
                        if (this.scene_stack.length && this.scene_stack[this.scene_stack.length - 1] == scene) {
                            return [2 /*return*/, scene];
                        }
                        if (!!scene.view) return [3 /*break*/, 3];
                        if (!!this.fairy.is_package_loaded(scene.package.name)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.load_scene(scene)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        scene.view = fairygui.UIPackage.createObject(scene.package.name, scene.res_name || scene.name, scene.scene_class).asCom;
                        _a.label = 3;
                    case 3:
                        current = this.top();
                        this.scene_stack.push(scene);
                        return [4 /*yield*/, this.switch_scene(current, scene)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** 回到上一个场景 */
    SceneManager.prototype.pop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var current_scene, previous_scene;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        current_scene = this.top();
                        previous_scene = this.scene_stack.length > 1 ? this.scene_stack[this.scene_stack.length - 2] : null;
                        this.scene_stack.pop();
                        return [4 /*yield*/, this.switch_scene(current_scene, previous_scene)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 替换当前场景
     * @param scene 要展现的水果
     */
    SceneManager.prototype.replace = function (scene_name) {
        return __awaiter(this, void 0, void 0, function () {
            var scene, top;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.scene_stack.length) {
                            return [2 /*return*/, this.push(scene_name)];
                        }
                        scene = this.scenes.get(scene_name);
                        if (!scene) {
                            throw new SceneManagerError("尝试跳转到不存在未注册的场景: " + scene_name);
                        }
                        if (!!scene.view) return [3 /*break*/, 3];
                        if (!!this.fairy.is_package_loaded(scene.package.name)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.load_scene(scene)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        scene.view = fairygui.UIPackage.createObject(scene.package.name, scene.res_name || scene.name, scene.scene_class).asCom;
                        _a.label = 3;
                    case 3:
                        top = this.top();
                        this.scene_stack[this.scene_stack.length - 1] = scene;
                        return [4 /*yield*/, this.switch_scene(top, scene)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** 执行切换场景 */
    SceneManager.prototype.switch_scene = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (from) {
                    from.view.removeFromParent();
                }
                if (to) {
                    fairygui.GRoot.inst.addChild(to.view);
                    to.view.setSize(this.stage.width, this.stage.height);
                    to.view.ensureSizeCorrect();
                }
                return [2 /*return*/, to];
            });
        });
    };
    return SceneManager;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));



/***/ }),

/***/ "./src/xengine/view/ToastManager.ts":
/*!******************************************!*\
  !*** ./src/xengine/view/ToastManager.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xengine/events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
/* harmony import */ var xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/XEngine */ "./src/xengine/XEngine.ts");
/* harmony import */ var xengine_utils_NodePool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xengine/utils/NodePool */ "./src/xengine/utils/NodePool.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ToastManager = /** @class */ (function (_super) {
    __extends(ToastManager, _super);
    function ToastManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TV = null;
        _this.pool = null;
        return _this;
    }
    ToastManager.prototype.set_toast_view = function (cls) {
        this.TV = cls;
    };
    ToastManager.prototype.popup = function (message) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!this.TV) {
            throw "无法创建对话Toast";
        }
        if (!this.pool && this.TV) {
            this.pool = new xengine_utils_NodePool__WEBPACK_IMPORTED_MODULE_2__["default"](this.TV.createInstance, 5);
        }
        if (this.pool) {
            var tv_1 = this.pool.get();
            tv_1.set_message(message, params);
            fairygui.GRoot.inst.addChild(tv_1);
            tv_1.on_popup();
            xengine_XEngine__WEBPACK_IMPORTED_MODULE_1__["default"].inst.timer.once(tv_1.popup_duration, function () {
                _this.pool.release(tv_1);
            });
        }
    };
    return ToastManager;
}(xengine_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (ToastManager);


/***/ }),

/***/ "./src/xengine/view/XStage.egret.ts":
/*!******************************************!*\
  !*** ./src/xengine/view/XStage.egret.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XStage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XStage */ "./src/xengine/view/XStage.ts");
/* harmony import */ var xengine_events_Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/events/Event */ "./src/xengine/events/Event.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/** Egret引擎`XStage`实现 */
var XEgretStage = /** @class */ (function (_super) {
    __extends(XEgretStage, _super);
    function XEgretStage(native_stage) {
        var _this = _super.call(this, native_stage) || this;
        native_stage.addEventListener(xengine_events_Event__WEBPACK_IMPORTED_MODULE_1__["default"].RESIZE, function () { _this.event(xengine_events_Event__WEBPACK_IMPORTED_MODULE_1__["default"].RESIZE); }, _this);
        return _this;
    }
    Object.defineProperty(XEgretStage.prototype, "stage", {
        get: function () { return this.native_stage; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XEgretStage.prototype, "width", {
        /** @virtual 舞台宽度 */
        get: function () { return this.stage.stageWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XEgretStage.prototype, "height", {
        /** @virtual 舞台高度 */
        get: function () { return this.stage.stageHeight; },
        enumerable: true,
        configurable: true
    });
    /** @virtual 添加节点到舞台 */
    XEgretStage.prototype.add_child = function (node) {
        return this.stage.addChild(node);
    };
    return XEgretStage;
}(_XStage__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (XEgretStage);


/***/ }),

/***/ "./src/xengine/view/XStage.laya.ts":
/*!*****************************************!*\
  !*** ./src/xengine/view/XStage.laya.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XStage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XStage */ "./src/xengine/view/XStage.ts");
/* harmony import */ var xengine_events_Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xengine/events/Event */ "./src/xengine/events/Event.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/** Laya引擎`XStage`实现 */
var XLayaStage = /** @class */ (function (_super) {
    __extends(XLayaStage, _super);
    function XLayaStage(native_stage) {
        var _this = _super.call(this, native_stage) || this;
        native_stage.on(xengine_events_Event__WEBPACK_IMPORTED_MODULE_1__["default"].RESIZE, _this, _this.event, [xengine_events_Event__WEBPACK_IMPORTED_MODULE_1__["default"].RESIZE]);
        return _this;
    }
    Object.defineProperty(XLayaStage.prototype, "stage", {
        get: function () { return this.native_stage; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XLayaStage.prototype, "width", {
        /** @virtual 舞台宽度 */
        get: function () { return this.stage.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XLayaStage.prototype, "height", {
        /** @virtual 舞台高度 */
        get: function () { return this.stage.height; },
        enumerable: true,
        configurable: true
    });
    /** @virtual 添加节点到舞台 */
    XLayaStage.prototype.add_child = function (node) {
        return this.stage.addChild(node);
    };
    return XLayaStage;
}(_XStage__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (XLayaStage);


/***/ }),

/***/ "./src/xengine/view/XStage.ts":
/*!************************************!*\
  !*** ./src/xengine/view/XStage.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/EventDispatcher */ "./src/xengine/events/EventDispatcher.ts");
/* harmony import */ var _utils_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math */ "./src/xengine/utils/math.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * @abstract
 * 引擎无关的舞台类
 */
var XStage = /** @class */ (function (_super) {
    __extends(XStage, _super);
    function XStage(native_stage) {
        var _this = _super.call(this) || this;
        /** 引擎相关的舞台对象 */
        _this.native_stage = null;
        _this._size = new _utils_math__WEBPACK_IMPORTED_MODULE_1__["Vector2"]();
        _this.native_stage = native_stage;
        return _this;
    }
    Object.defineProperty(XStage.prototype, "size", {
        /** 获取舞台尺寸 */
        get: function () {
            this._size.width = this.width;
            this._size.height = this.height;
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XStage.prototype, "width", {
        /** @virtual 舞台宽度 */
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XStage.prototype, "height", {
        /** @virtual 舞台高度 */
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    /** @virtual 添加节点到舞台 */
    XStage.prototype.add_child = function (node) {
        return node;
    };
    return XStage;
}(_events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (XStage);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map