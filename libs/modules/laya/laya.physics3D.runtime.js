'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// This is ammo.js, a port of Bullet Physics to JavaScript. zlib licensed.

var Physics3D = function () {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  return function (Physics3D) {
    Physics3D = {};

    var e;e || (e = typeof Physics3D !== 'undefined' ? Physics3D : {});var aa = {},
        ba;for (ba in e) {
      e.hasOwnProperty(ba) && (aa[ba] = e[ba]);
    }e.arguments = [];e.thisProgram = "./this.program";e.quit = function (a, b) {
      throw b;
    };e.preRun = [];e.postRun = [];var ca = !1,
        da = !1,
        ea = !1,
        fa = !1;ca = "object" === (typeof window === 'undefined' ? 'undefined' : _typeof(window));da = "function" === typeof importScripts;ea = "object" === (typeof process === 'undefined' ? 'undefined' : _typeof(process)) && "function" === typeof require && !ca && !da;fa = !ca && !ea && !da;var ha = "";
    if (ea) {
      ha = __dirname + "/";var ia, ja;e.read = function (a, b) {
        var c = ka(a);c || (ia || (ia = require("fs")), ja || (ja = require("path")), a = ja.normalize(a), c = ia.readFileSync(a));return b ? c : c.toString();
      };e.readBinary = function (a) {
        a = e.read(a, !0);a.buffer || (a = new Uint8Array(a));assert(a.buffer);return a;
      };1 < process.argv.length && (e.thisProgram = process.argv[1].replace(/\\/g, "/"));e.arguments = process.argv.slice(2);process.on("uncaughtException", function (a) {
        throw a;
      });process.on("unhandledRejection", function () {
        process.exit(1);
      });
      e.quit = function (a) {
        process.exit(a);
      };e.inspect = function () {
        return "[Emscripten Module object]";
      };
    } else if (fa) "undefined" != typeof read && (e.read = function (a) {
      var b = ka(a);return b ? la(b) : read(a);
    }), e.readBinary = function (a) {
      var b;if (b = ka(a)) return b;if ("function" === typeof readbuffer) return new Uint8Array(readbuffer(a));b = read(a, "binary");assert("object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)));return b;
    }, "undefined" != typeof scriptArgs ? e.arguments = scriptArgs : "undefined" != typeof arguments && (e.arguments = arguments), "function" === typeof quit && (e.quit = function (a) {
      quit(a);
    });else if (ca || da) ca ? document.currentScript && (ha = document.currentScript.src) : ha = self.location.href, _scriptDir && (ha = _scriptDir), ha = 0 !== ha.indexOf("blob:") ? ha.substr(0, ha.lastIndexOf("/") + 1) : "", e.read = function (a) {
      try {
        var b = new XMLHttpRequest();b.open("GET", a, !1);b.send(null);return b.responseText;
      } catch (c) {
        if (a = ka(a)) return la(a);throw c;
      }
    }, da && (e.readBinary = function (a) {
      try {
        var b = new XMLHttpRequest();b.open("GET", a, !1);b.responseType = "arraybuffer";b.send(null);return new Uint8Array(b.response);
      } catch (c) {
        if (a = ka(a)) return a;throw c;
      }
    }), e.readAsync = function (a, b, c) {
      var d = new XMLHttpRequest();d.open("GET", a, !0);d.responseType = "arraybuffer";d.onload = function () {
        if (200 == d.status || 0 == d.status && d.response) b(d.response);else {
          var g = ka(a);g ? b(g.buffer) : c();
        }
      };d.onerror = c;d.send(null);
    }, e.setWindowTitle = function (a) {
      document.title = a;
    };
    var ma = e.print || ("undefined" !== typeof console ? console.log.bind(console) : "undefined" !== typeof print ? print : null),
        na = e.printErr || ("undefined" !== typeof printErr ? printErr : "undefined" !== typeof console && console.warn.bind(console) || ma);for (ba in aa) {
      aa.hasOwnProperty(ba) && (e[ba] = aa[ba]);
    }aa = void 0;function oa(a) {
      var b;b || (b = 16);return Math.ceil(a / b) * b;
    }var pa = !1;function assert(a, b) {
      a || qa("Assertion failed: " + b);
    }"undefined" !== typeof TextDecoder && new TextDecoder("utf8");"undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
    var buffer, ra, sa, ta, ua, va, wa, xa, za, Aa, Ba;ua = va = wa = xa = za = Aa = Ba = 0;function Ca() {
      qa("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + Da + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
    }
    var Ea = e.TOTAL_STACK || 5242880,
        Da = e.TOTAL_MEMORY || 16777216;Da < Ea && na("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + Da + "! (TOTAL_STACK=" + Ea + ")");e.buffer ? buffer = e.buffer : (buffer = new ArrayBuffer(Da), e.buffer = buffer);e.HEAP8 = new Int8Array(buffer);e.HEAP16 = new Int16Array(buffer);e.HEAP32 = sa = new Int32Array(buffer);e.HEAPU8 = ra = new Uint8Array(buffer);e.HEAPU16 = new Uint16Array(buffer);e.HEAPU32 = new Uint32Array(buffer);e.HEAPF32 = ta = new Float32Array(buffer);e.HEAPF64 = new Float64Array(buffer);
    function Fa(a) {
      for (; 0 < a.length;) {
        var b = a.shift();if ("function" == typeof b) b();else {
          var c = b.i;"number" === typeof c ? void 0 === b.f ? e.dynCall_v(c) : e.dynCall_vi(c, b.f) : c(void 0 === b.f ? null : b.f);
        }
      }
    }var Ga = [],
        Ha = [],
        Ia = [],
        Ja = [],
        Ka = !1;function La() {
      var a = e.preRun.shift();Ga.unshift(a);
    }Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function (a, b) {
      var c = a & 65535,
          d = b & 65535;return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16) | 0;
    });Math.imul = Math.imul;
    Math.clz32 || (Math.clz32 = function (a) {
      var b = 32,
          c = a >> 16;c && (b -= 16, a = c);if (c = a >> 8) b -= 8, a = c;if (c = a >> 4) b -= 4, a = c;if (c = a >> 2) b -= 2, a = c;return a >> 1 ? b - 2 : b - a;
    });Math.clz32 = Math.clz32;Math.trunc || (Math.trunc = function (a) {
      return 0 > a ? Math.ceil(a) : Math.floor(a);
    });Math.trunc = Math.trunc;var Ma = 0,
        Na = null,
        Oa = null;e.preloadedImages = {};e.preloadedAudios = {};var Pa = null,
        Qa = "data:application/octet-stream;base64,";ua = 8;va = ua + 512;Ha.push();var Ra = va,
        Sa = va += 16;va = va + 4 + 15 & -16;Ba = Sa;wa = xa = oa(va);za = wa + Ea;Aa = oa(za);sa[Ba >> 2] = Aa;
    var Ta = !1;function la(a) {
      for (var b = [], c = 0; c < a.length; c++) {
        var d = a[c];255 < d && (Ta && assert(!1, "Character code " + d + " (" + String.fromCharCode(d) + ")  at offset " + c + " not in 0x00-0xFF."), d &= 255);b.push(String.fromCharCode(d));
      }return b.join("");
    }
    var Ua = "function" === typeof atob ? atob : function (a) {
      var b = "",
          c = 0;a = a.replace(/[^A-Za-z0-9\+\/=]/g, "");do {
        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));var q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));d = d << 2 | g >> 4;
        g = (g & 15) << 4 | q >> 2;var ya = (q & 3) << 6 | t;b += String.fromCharCode(d);64 !== q && (b += String.fromCharCode(g));64 !== t && (b += String.fromCharCode(ya));
      } while (c < a.length);return b;
    };
    function ka(a) {
      if (String.prototype.startsWith ? a.startsWith(Qa) : 0 === a.indexOf(Qa)) {
        a = a.slice(Qa.length);if ("boolean" === typeof ea && ea) {
          try {
            var b = Buffer.from(a, "base64");
          } catch (q) {
            b = new Buffer(a, "base64");
          }var c = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
        } else try {
          var d = Ua(a),
              g = new Uint8Array(d.length);for (b = 0; b < d.length; ++b) {
            g[b] = d.charCodeAt(b);
          }c = g;
        } catch (q) {
          throw Error("Converting base64 string to bytes failed.");
        }return c;
      }
    }
    e.g = { Math: Math, Int8Array: Int8Array, Int16Array: Int16Array, Int32Array: Int32Array, Uint8Array: Uint8Array, Uint16Array: Uint16Array, Uint32Array: Uint32Array, Float32Array: Float32Array, Float64Array: Float64Array, NaN: NaN, Infinity: Infinity };
    e.h = { abort: qa, assert: assert, enlargeMemory: function enlargeMemory() {
        Ca();
      }, getTotalMemory: function getTotalMemory() {
        return Da;
      }, abortOnCannotGrowMemory: Ca, ___errno_location: function ___errno_location() {
        na("missing function: __errno_location");qa(-1);
      }, ___setErrNo: function ___setErrNo(a) {
        e.___errno_location && (sa[e.___errno_location() >> 2] = a);return a;
      }, _emscripten_memcpy_big: function _emscripten_memcpy_big(a, b, c) {
        ra.set(ra.subarray(b, b + c), a);return a;
      }, DYNAMICTOP_PTR: Ba, tempDoublePtr: Ra, STACKTOP: xa, STACK_MAX: za }; // EMSCRIPTEN_START_ASM
    var Va = /** @suppress {uselessCode} */function (global, env, buffer) {
      "use asm";
      var a = new global.Int8Array(buffer);var b = new global.Int16Array(buffer);var c = new global.Int32Array(buffer);var d = new global.Uint8Array(buffer);var e = new global.Uint16Array(buffer);var f = new global.Uint32Array(buffer);var g = new global.Float32Array(buffer);var h = new global.Float64Array(buffer);var i = env.DYNAMICTOP_PTR | 0;var j = env.tempDoublePtr | 0;var k = env.STACKTOP | 0;var l = env.STACK_MAX | 0;var m = 0;var n = 0;var o = 0;var p = 0;var q = global.NaN,
          r = global.Infinity;var s = 0,
          t = 0,
          u = 0,
          v = 0,
          w = 0.0;var x = 0;var y = global.Math.floor;var z = global.Math.abs;var A = global.Math.sqrt;var B = global.Math.pow;var C = global.Math.cos;var D = global.Math.sin;var E = global.Math.tan;var F = global.Math.acos;var G = global.Math.asin;var H = global.Math.atan;var I = global.Math.atan2;var J = global.Math.exp;var K = global.Math.log;var L = global.Math.ceil;var M = global.Math.imul;var N = global.Math.min;var O = global.Math.max;var P = global.Math.clz32;var Q = env.abort;var R = env.assert;var S = env.enlargeMemory;var T = env.getTotalMemory;var U = env.abortOnCannotGrowMemory;var V = env.___errno_location;var W = env.___setErrNo;var X = env._emscripten_memcpy_big;var Y = 0.0;
      // EMSCRIPTEN_START_FUNCS
      function Z(a) {
        a = a | 0;var b = 0,
            d = 0,
            e = 0,
            f = 0,
            g = 0,
            h = 0,
            i = 0,
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0,
            q = 0,
            r = 0,
            s = 0,
            t = 0,
            u = 0,
            v = 0,
            w = 0;w = k;k = k + 16 | 0;do {
          if (a >>> 0 < 245) {
            o = a >>> 0 < 11 ? 16 : a + 11 & -8;m = c[2] | 0;if (m >>> (o >>> 3) & 3 | 0) {
              a = 48 + ((m >>> (o >>> 3) & 1 ^ 1) + (o >>> 3) << 1 << 2) | 0;b = c[a + 8 >> 2] | 0;d = c[b + 8 >> 2] | 0;if ((d | 0) == (a | 0)) c[2] = m & ~(1 << (m >>> (o >>> 3) & 1 ^ 1) + (o >>> 3));else {
                c[d + 12 >> 2] = a;c[a + 8 >> 2] = d;
              }v = (m >>> (o >>> 3) & 1 ^ 1) + (o >>> 3) << 3;c[b + 4 >> 2] = v | 3;c[b + v + 4 >> 2] = c[b + v + 4 >> 2] | 1;v = b + 8 | 0;k = w;return v | 0;
            }n = c[4] | 0;if (o >>> 0 > n >>> 0) {
              if (m >>> (o >>> 3) | 0) {
                a = m >>> (o >>> 3) << (o >>> 3) & (2 << (o >>> 3) | 0 - (2 << (o >>> 3)));f = ((a & 0 - a) + -1 | 0) >>> (((a & 0 - a) + -1 | 0) >>> 12 & 16);e = f >>> (f >>> 5 & 8) >>> (f >>> (f >>> 5 & 8) >>> 2 & 4);e = (f >>> 5 & 8 | ((a & 0 - a) + -1 | 0) >>> 12 & 16 | f >>> (f >>> 5 & 8) >>> 2 & 4 | e >>> 1 & 2 | e >>> (e >>> 1 & 2) >>> 1 & 1) + (e >>> (e >>> 1 & 2) >>> (e >>> (e >>> 1 & 2) >>> 1 & 1)) | 0;f = c[48 + (e << 1 << 2) + 8 >> 2] | 0;a = c[f + 8 >> 2] | 0;if ((a | 0) == (48 + (e << 1 << 2) | 0)) {
                  c[2] = m & ~(1 << e);a = m & ~(1 << e);
                } else {
                  c[a + 12 >> 2] = 48 + (e << 1 << 2);c[48 + (e << 1 << 2) + 8 >> 2] = a;a = m;
                }c[f + 4 >> 2] = o | 3;c[f + o + 4 >> 2] = (e << 3) - o | 1;c[f + (e << 3) >> 2] = (e << 3) - o;if (n | 0) {
                  d = c[7] | 0;if (!(a & 1 << (n >>> 3))) {
                    c[2] = a | 1 << (n >>> 3);a = 48 + (n >>> 3 << 1 << 2) | 0;b = 48 + (n >>> 3 << 1 << 2) + 8 | 0;
                  } else {
                    a = c[48 + (n >>> 3 << 1 << 2) + 8 >> 2] | 0;b = 48 + (n >>> 3 << 1 << 2) + 8 | 0;
                  }c[b >> 2] = d;c[a + 12 >> 2] = d;c[d + 8 >> 2] = a;c[d + 12 >> 2] = 48 + (n >>> 3 << 1 << 2);
                }c[4] = (e << 3) - o;c[7] = f + o;v = f + 8 | 0;k = w;return v | 0;
              }h = c[3] | 0;if (h) {
                b = ((h & 0 - h) + -1 | 0) >>> (((h & 0 - h) + -1 | 0) >>> 12 & 16);l = b >>> (b >>> 5 & 8) >>> (b >>> (b >>> 5 & 8) >>> 2 & 4);l = c[312 + ((b >>> 5 & 8 | ((h & 0 - h) + -1 | 0) >>> 12 & 16 | b >>> (b >>> 5 & 8) >>> 2 & 4 | l >>> 1 & 2 | l >>> (l >>> 1 & 2) >>> 1 & 1) + (l >>> (l >>> 1 & 2) >>> (l >>> (l >>> 1 & 2) >>> 1 & 1)) << 2) >> 2] | 0;b = l;j = l;l = (c[l + 4 >> 2] & -8) - o | 0;while (1) {
                  a = c[b + 16 >> 2] | 0;if (!a) {
                    a = c[b + 20 >> 2] | 0;if (!a) break;
                  }i = (c[a + 4 >> 2] & -8) - o | 0;f = i >>> 0 < l >>> 0;b = a;j = f ? a : j;l = f ? i : l;
                }i = j + o | 0;if (i >>> 0 > j >>> 0) {
                  f = c[j + 24 >> 2] | 0;a = c[j + 12 >> 2] | 0;do {
                    if ((a | 0) == (j | 0)) {
                      b = j + 20 | 0;a = c[b >> 2] | 0;if (!a) {
                        b = j + 16 | 0;a = c[b >> 2] | 0;if (!a) {
                          b = 0;break;
                        }
                      }while (1) {
                        e = a + 20 | 0;d = c[e >> 2] | 0;if (!d) {
                          e = a + 16 | 0;d = c[e >> 2] | 0;if (!d) break;else {
                            a = d;b = e;
                          }
                        } else {
                          a = d;b = e;
                        }
                      }c[b >> 2] = 0;b = a;
                    } else {
                      b = c[j + 8 >> 2] | 0;c[b + 12 >> 2] = a;c[a + 8 >> 2] = b;b = a;
                    }
                  } while (0);do {
                    if (f | 0) {
                      a = c[j + 28 >> 2] | 0;if ((j | 0) == (c[312 + (a << 2) >> 2] | 0)) {
                        c[312 + (a << 2) >> 2] = b;if (!b) {
                          c[3] = h & ~(1 << a);break;
                        }
                      } else {
                        c[((c[f + 16 >> 2] | 0) == (j | 0) ? f + 16 | 0 : f + 20 | 0) >> 2] = b;if (!b) break;
                      }c[b + 24 >> 2] = f;a = c[j + 16 >> 2] | 0;if (a | 0) {
                        c[b + 16 >> 2] = a;c[a + 24 >> 2] = b;
                      }a = c[j + 20 >> 2] | 0;if (a | 0) {
                        c[b + 20 >> 2] = a;c[a + 24 >> 2] = b;
                      }
                    }
                  } while (0);if (l >>> 0 < 16) {
                    v = l + o | 0;c[j + 4 >> 2] = v | 3;v = j + v + 4 | 0;c[v >> 2] = c[v >> 2] | 1;
                  } else {
                    c[j + 4 >> 2] = o | 3;c[i + 4 >> 2] = l | 1;c[i + l >> 2] = l;if (n | 0) {
                      d = c[7] | 0;if (!(1 << (n >>> 3) & m)) {
                        c[2] = 1 << (n >>> 3) | m;a = 48 + (n >>> 3 << 1 << 2) | 0;b = 48 + (n >>> 3 << 1 << 2) + 8 | 0;
                      } else {
                        a = c[48 + (n >>> 3 << 1 << 2) + 8 >> 2] | 0;b = 48 + (n >>> 3 << 1 << 2) + 8 | 0;
                      }c[b >> 2] = d;c[a + 12 >> 2] = d;c[d + 8 >> 2] = a;c[d + 12 >> 2] = 48 + (n >>> 3 << 1 << 2);
                    }c[4] = l;c[7] = i;
                  }v = j + 8 | 0;k = w;return v | 0;
                }
              }
            }
          } else if (a >>> 0 <= 4294967231) {
            o = a + 11 & -8;e = c[3] | 0;if (e) {
              if ((a + 11 | 0) >>> 8) {
                if (o >>> 0 > 16777215) j = 31;else {
                  j = (a + 11 | 0) >>> 8 << ((((a + 11 | 0) >>> 8) + 1048320 | 0) >>> 16 & 8);j = 14 - ((j + 520192 | 0) >>> 16 & 4 | (((a + 11 | 0) >>> 8) + 1048320 | 0) >>> 16 & 8 | ((j << ((j + 520192 | 0) >>> 16 & 4)) + 245760 | 0) >>> 16 & 2) + (j << ((j + 520192 | 0) >>> 16 & 4) << (((j << ((j + 520192 | 0) >>> 16 & 4)) + 245760 | 0) >>> 16 & 2) >>> 15) | 0;j = o >>> (j + 7 | 0) & 1 | j << 1;
                }
              } else j = 0;a = c[312 + (j << 2) >> 2] | 0;a: do {
                if (!a) {
                  d = 0;a = 0;b = 0 - o | 0;s = 61;
                } else {
                  h = 0;b = 0 - o | 0;i = o << ((j | 0) == 31 ? 0 : 25 - (j >>> 1) | 0);d = 0;while (1) {
                    f = (c[a + 4 >> 2] & -8) - o | 0;if (f >>> 0 < b >>> 0) if (!f) {
                      f = a;b = 0;d = a;s = 65;break a;
                    } else {
                      h = a;b = f;
                    }s = c[a + 20 >> 2] | 0;a = c[a + 16 + (i >>> 31 << 2) >> 2] | 0;d = (s | 0) == 0 | (s | 0) == (a | 0) ? d : s;if (!a) {
                      a = h;s = 61;break;
                    } else i = i << 1;
                  }
                }
              } while (0);if ((s | 0) == 61) {
                if ((d | 0) == 0 & (a | 0) == 0) {
                  a = 2 << j;if (!((a | 0 - a) & e)) break;m = ((a | 0 - a) & e & 0 - ((a | 0 - a) & e)) + -1 | 0;n = m >>> (m >>> 12 & 16) >>> (m >>> (m >>> 12 & 16) >>> 5 & 8);d = n >>> (n >>> 2 & 4) >>> (n >>> (n >>> 2 & 4) >>> 1 & 2);a = 0;d = c[312 + ((m >>> (m >>> 12 & 16) >>> 5 & 8 | m >>> 12 & 16 | n >>> 2 & 4 | n >>> (n >>> 2 & 4) >>> 1 & 2 | d >>> 1 & 1) + (d >>> (d >>> 1 & 1)) << 2) >> 2] | 0;
                }if (!d) {
                  i = a;h = b;
                } else {
                  f = a;s = 65;
                }
              }if ((s | 0) == 65) while (1) {
                n = (c[d + 4 >> 2] & -8) - o | 0;a = n >>> 0 < b >>> 0;b = a ? n : b;f = a ? d : f;a = c[d + 16 >> 2] | 0;if (!a) a = c[d + 20 >> 2] | 0;if (!a) {
                  i = f;h = b;break;
                } else d = a;
              }if (((i | 0) != 0 ? h >>> 0 < ((c[4] | 0) - o | 0) >>> 0 : 0) ? (l = i + o | 0, l >>> 0 > i >>> 0) : 0) {
                g = c[i + 24 >> 2] | 0;a = c[i + 12 >> 2] | 0;do {
                  if ((a | 0) == (i | 0)) {
                    b = i + 20 | 0;a = c[b >> 2] | 0;if (!a) {
                      b = i + 16 | 0;a = c[b >> 2] | 0;if (!a) {
                        a = 0;break;
                      }
                    }while (1) {
                      f = a + 20 | 0;d = c[f >> 2] | 0;if (!d) {
                        f = a + 16 | 0;d = c[f >> 2] | 0;if (!d) break;else {
                          a = d;b = f;
                        }
                      } else {
                        a = d;b = f;
                      }
                    }c[b >> 2] = 0;
                  } else {
                    v = c[i + 8 >> 2] | 0;c[v + 12 >> 2] = a;c[a + 8 >> 2] = v;
                  }
                } while (0);do {
                  if (g) {
                    b = c[i + 28 >> 2] | 0;if ((i | 0) == (c[312 + (b << 2) >> 2] | 0)) {
                      c[312 + (b << 2) >> 2] = a;if (!a) {
                        c[3] = e & ~(1 << b);e = e & ~(1 << b);break;
                      }
                    } else {
                      c[((c[g + 16 >> 2] | 0) == (i | 0) ? g + 16 | 0 : g + 20 | 0) >> 2] = a;if (!a) break;
                    }c[a + 24 >> 2] = g;b = c[i + 16 >> 2] | 0;if (b | 0) {
                      c[a + 16 >> 2] = b;c[b + 24 >> 2] = a;
                    }b = c[i + 20 >> 2] | 0;if (b) {
                      c[a + 20 >> 2] = b;c[b + 24 >> 2] = a;
                    }
                  }
                } while (0);b: do {
                  if (h >>> 0 < 16) {
                    v = h + o | 0;c[i + 4 >> 2] = v | 3;v = i + v + 4 | 0;c[v >> 2] = c[v >> 2] | 1;
                  } else {
                    c[i + 4 >> 2] = o | 3;c[l + 4 >> 2] = h | 1;c[l + h >> 2] = h;d = h >>> 3;if (h >>> 0 < 256) {
                      a = c[2] | 0;if (!(a & 1 << d)) {
                        c[2] = a | 1 << d;a = 48 + (d << 1 << 2) | 0;b = 48 + (d << 1 << 2) + 8 | 0;
                      } else {
                        a = c[48 + (d << 1 << 2) + 8 >> 2] | 0;b = 48 + (d << 1 << 2) + 8 | 0;
                      }c[b >> 2] = l;c[a + 12 >> 2] = l;c[l + 8 >> 2] = a;c[l + 12 >> 2] = 48 + (d << 1 << 2);break;
                    }a = h >>> 8;if (a) {
                      if (h >>> 0 > 16777215) d = 31;else {
                        d = a << ((a + 1048320 | 0) >>> 16 & 8) << (((a << ((a + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4);d = 14 - (((a << ((a + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4 | (a + 1048320 | 0) >>> 16 & 8 | (d + 245760 | 0) >>> 16 & 2) + (d << ((d + 245760 | 0) >>> 16 & 2) >>> 15) | 0;d = h >>> (d + 7 | 0) & 1 | d << 1;
                      }
                    } else d = 0;a = 312 + (d << 2) | 0;c[l + 28 >> 2] = d;c[l + 16 + 4 >> 2] = 0;c[l + 16 >> 2] = 0;b = 1 << d;if (!(e & b)) {
                      c[3] = e | b;c[a >> 2] = l;c[l + 24 >> 2] = a;c[l + 12 >> 2] = l;c[l + 8 >> 2] = l;break;
                    }a = c[a >> 2] | 0;c: do {
                      if ((c[a + 4 >> 2] & -8 | 0) != (h | 0)) {
                        e = h << ((d | 0) == 31 ? 0 : 25 - (d >>> 1) | 0);while (1) {
                          d = a + 16 + (e >>> 31 << 2) | 0;b = c[d >> 2] | 0;if (!b) break;if ((c[b + 4 >> 2] & -8 | 0) == (h | 0)) {
                            a = b;break c;
                          } else {
                            e = e << 1;a = b;
                          }
                        }c[d >> 2] = l;c[l + 24 >> 2] = a;c[l + 12 >> 2] = l;c[l + 8 >> 2] = l;break b;
                      }
                    } while (0);u = a + 8 | 0;v = c[u >> 2] | 0;c[v + 12 >> 2] = l;c[u >> 2] = l;c[l + 8 >> 2] = v;c[l + 12 >> 2] = a;c[l + 24 >> 2] = 0;
                  }
                } while (0);v = i + 8 | 0;k = w;return v | 0;
              }
            }
          } else o = -1;
        } while (0);d = c[4] | 0;if (d >>> 0 >= o >>> 0) {
          a = d - o | 0;b = c[7] | 0;if (a >>> 0 > 15) {
            v = b + o | 0;c[7] = v;c[4] = a;c[v + 4 >> 2] = a | 1;c[b + d >> 2] = a;c[b + 4 >> 2] = o | 3;
          } else {
            c[4] = 0;c[7] = 0;c[b + 4 >> 2] = d | 3;c[b + d + 4 >> 2] = c[b + d + 4 >> 2] | 1;
          }v = b + 8 | 0;k = w;return v | 0;
        }f = c[5] | 0;if (f >>> 0 > o >>> 0) {
          t = f - o | 0;c[5] = t;v = c[8] | 0;u = v + o | 0;c[8] = u;c[u + 4 >> 2] = t | 1;c[v + 4 >> 2] = o | 3;v = v + 8 | 0;k = w;return v | 0;
        }if (!(c[120] | 0)) {
          c[122] = 4096;c[121] = 4096;c[123] = -1;c[124] = -1;c[125] = 0;c[113] = 0;c[120] = w & -16 ^ 1431655768;a = 4096;
        } else a = c[122] | 0;h = o + 48 | 0;i = o + 47 | 0;l = a + i | 0;j = 0 - a | 0;if ((l & j) >>> 0 <= o >>> 0) {
          v = 0;k = w;return v | 0;
        }a = c[112] | 0;if (a | 0 ? (n = c[110] | 0, (n + (l & j) | 0) >>> 0 <= n >>> 0 ? 1 : (n + (l & j) | 0) >>> 0 > a >>> 0) : 0) {
          v = 0;k = w;return v | 0;
        }d: do {
          if (!(c[113] & 4)) {
            d = c[8] | 0;e: do {
              if (d) {
                b = 456;while (1) {
                  a = c[b >> 2] | 0;if (a >>> 0 <= d >>> 0 ? (p = b + 4 | 0, (a + (c[p >> 2] | 0) | 0) >>> 0 > d >>> 0) : 0) break;a = c[b + 8 >> 2] | 0;if (!a) {
                    s = 128;break e;
                  } else b = a;
                }if ((l - f & j) >>> 0 < 2147483647) {
                  a = ca(l - f & j | 0) | 0;if ((a | 0) == ((c[b >> 2] | 0) + (c[p >> 2] | 0) | 0)) {
                    if ((a | 0) == (-1 | 0)) a = l - f & j;else {
                      h = l - f & j;g = a;s = 145;break d;
                    }
                  } else {
                    e = a;d = l - f & j;s = 136;
                  }
                } else a = 0;
              } else s = 128;
            } while (0);do {
              if ((s | 0) == 128) {
                b = ca(0) | 0;if ((b | 0) != (-1 | 0) ? (r = c[121] | 0, r = ((r + -1 & b | 0) == 0 ? 0 : (r + -1 + b & 0 - r) - b | 0) + (l & j) | 0, q = c[110] | 0, r >>> 0 > o >>> 0 & r >>> 0 < 2147483647) : 0) {
                  p = c[112] | 0;if (p | 0 ? (r + q | 0) >>> 0 <= q >>> 0 | (r + q | 0) >>> 0 > p >>> 0 : 0) {
                    a = 0;break;
                  }a = ca(r | 0) | 0;if ((a | 0) == (b | 0)) {
                    h = r;g = b;s = 145;break d;
                  } else {
                    e = a;d = r;s = 136;
                  }
                } else a = 0;
              }
            } while (0);do {
              if ((s | 0) == 136) {
                b = 0 - d | 0;if (!(h >>> 0 > d >>> 0 & (d >>> 0 < 2147483647 & (e | 0) != (-1 | 0)))) if ((e | 0) == (-1 | 0)) {
                  a = 0;break;
                } else {
                  h = d;g = e;s = 145;break d;
                }a = c[122] | 0;a = i - d + a & 0 - a;if (a >>> 0 >= 2147483647) {
                  h = d;g = e;s = 145;break d;
                }if ((ca(a | 0) | 0) == (-1 | 0)) {
                  ca(b | 0) | 0;a = 0;break;
                } else {
                  h = a + d | 0;g = e;s = 145;break d;
                }
              }
            } while (0);c[113] = c[113] | 4;s = 143;
          } else {
            a = 0;s = 143;
          }
        } while (0);if (((s | 0) == 143 ? (l & j) >>> 0 < 2147483647 : 0) ? (g = ca(l & j | 0) | 0, t = ca(0) | 0, u = (t - g | 0) >>> 0 > (o + 40 | 0) >>> 0, !((g | 0) == (-1 | 0) | u ^ 1 | g >>> 0 < t >>> 0 & ((g | 0) != (-1 | 0) & (t | 0) != (-1 | 0)) ^ 1)) : 0) {
          h = u ? t - g | 0 : a;s = 145;
        }if ((s | 0) == 145) {
          a = (c[110] | 0) + h | 0;c[110] = a;if (a >>> 0 > (c[111] | 0) >>> 0) c[111] = a;j = c[8] | 0;f: do {
            if (j) {
              a = 456;while (1) {
                b = c[a >> 2] | 0;d = a + 4 | 0;e = c[d >> 2] | 0;if ((g | 0) == (b + e | 0)) {
                  s = 154;break;
                }f = c[a + 8 >> 2] | 0;if (!f) break;else a = f;
              }if (((s | 0) == 154 ? (c[a + 12 >> 2] & 8 | 0) == 0 : 0) ? g >>> 0 > j >>> 0 & b >>> 0 <= j >>> 0 : 0) {
                c[d >> 2] = e + h;v = (c[5] | 0) + h | 0;u = (j + 8 & 7 | 0) == 0 ? 0 : 0 - (j + 8) & 7;c[8] = j + u;c[5] = v - u;c[j + u + 4 >> 2] = v - u | 1;c[j + v + 4 >> 2] = 40;c[9] = c[124];break;
              }if (g >>> 0 < (c[6] | 0) >>> 0) c[6] = g;d = g + h | 0;a = 456;while (1) {
                if ((c[a >> 2] | 0) == (d | 0)) {
                  s = 162;break;
                }b = c[a + 8 >> 2] | 0;if (!b) break;else a = b;
              }if ((s | 0) == 162 ? (c[a + 12 >> 2] & 8 | 0) == 0 : 0) {
                c[a >> 2] = g;m = a + 4 | 0;c[m >> 2] = (c[m >> 2] | 0) + h;m = g + 8 | 0;m = g + ((m & 7 | 0) == 0 ? 0 : 0 - m & 7) | 0;a = d + ((d + 8 & 7 | 0) == 0 ? 0 : 0 - (d + 8) & 7) | 0;l = m + o | 0;i = a - m - o | 0;c[m + 4 >> 2] = o | 3;g: do {
                  if ((j | 0) == (a | 0)) {
                    v = (c[5] | 0) + i | 0;c[5] = v;c[8] = l;c[l + 4 >> 2] = v | 1;
                  } else {
                    if ((c[7] | 0) == (a | 0)) {
                      v = (c[4] | 0) + i | 0;c[4] = v;c[7] = l;c[l + 4 >> 2] = v | 1;c[l + v >> 2] = v;break;
                    }h = c[a + 4 >> 2] | 0;if ((h & 3 | 0) == 1) {
                      h: do {
                        if (h >>> 0 < 256) {
                          b = c[a + 8 >> 2] | 0;d = c[a + 12 >> 2] | 0;if ((d | 0) == (b | 0)) {
                            c[2] = c[2] & ~(1 << (h >>> 3));break;
                          } else {
                            c[b + 12 >> 2] = d;c[d + 8 >> 2] = b;break;
                          }
                        } else {
                          g = c[a + 24 >> 2] | 0;b = c[a + 12 >> 2] | 0;do {
                            if ((b | 0) == (a | 0)) {
                              b = c[a + 16 + 4 >> 2] | 0;if (!b) {
                                b = c[a + 16 >> 2] | 0;if (!b) {
                                  b = 0;break;
                                } else d = a + 16 | 0;
                              } else d = a + 16 + 4 | 0;while (1) {
                                f = b + 20 | 0;e = c[f >> 2] | 0;if (!e) {
                                  f = b + 16 | 0;e = c[f >> 2] | 0;if (!e) break;else {
                                    b = e;d = f;
                                  }
                                } else {
                                  b = e;d = f;
                                }
                              }c[d >> 2] = 0;
                            } else {
                              v = c[a + 8 >> 2] | 0;c[v + 12 >> 2] = b;c[b + 8 >> 2] = v;
                            }
                          } while (0);if (!g) break;d = c[a + 28 >> 2] | 0;do {
                            if ((c[312 + (d << 2) >> 2] | 0) != (a | 0)) {
                              c[((c[g + 16 >> 2] | 0) == (a | 0) ? g + 16 | 0 : g + 20 | 0) >> 2] = b;if (!b) break h;
                            } else {
                              c[312 + (d << 2) >> 2] = b;if (b | 0) break;c[3] = c[3] & ~(1 << d);break h;
                            }
                          } while (0);c[b + 24 >> 2] = g;d = c[a + 16 >> 2] | 0;if (d | 0) {
                            c[b + 16 >> 2] = d;c[d + 24 >> 2] = b;
                          }d = c[a + 16 + 4 >> 2] | 0;if (!d) break;c[b + 20 >> 2] = d;c[d + 24 >> 2] = b;
                        }
                      } while (0);a = a + (h & -8) | 0;f = (h & -8) + i | 0;
                    } else f = i;d = a + 4 | 0;c[d >> 2] = c[d >> 2] & -2;c[l + 4 >> 2] = f | 1;c[l + f >> 2] = f;d = f >>> 3;if (f >>> 0 < 256) {
                      a = c[2] | 0;if (!(a & 1 << d)) {
                        c[2] = a | 1 << d;a = 48 + (d << 1 << 2) | 0;b = 48 + (d << 1 << 2) + 8 | 0;
                      } else {
                        a = c[48 + (d << 1 << 2) + 8 >> 2] | 0;b = 48 + (d << 1 << 2) + 8 | 0;
                      }c[b >> 2] = l;c[a + 12 >> 2] = l;c[l + 8 >> 2] = a;c[l + 12 >> 2] = 48 + (d << 1 << 2);break;
                    }a = f >>> 8;do {
                      if (!a) e = 0;else {
                        if (f >>> 0 > 16777215) {
                          e = 31;break;
                        }e = a << ((a + 1048320 | 0) >>> 16 & 8) << (((a << ((a + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4);e = 14 - (((a << ((a + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4 | (a + 1048320 | 0) >>> 16 & 8 | (e + 245760 | 0) >>> 16 & 2) + (e << ((e + 245760 | 0) >>> 16 & 2) >>> 15) | 0;e = f >>> (e + 7 | 0) & 1 | e << 1;
                      }
                    } while (0);a = 312 + (e << 2) | 0;c[l + 28 >> 2] = e;c[l + 16 + 4 >> 2] = 0;c[l + 16 >> 2] = 0;b = c[3] | 0;d = 1 << e;if (!(b & d)) {
                      c[3] = b | d;c[a >> 2] = l;c[l + 24 >> 2] = a;c[l + 12 >> 2] = l;c[l + 8 >> 2] = l;break;
                    }a = c[a >> 2] | 0;i: do {
                      if ((c[a + 4 >> 2] & -8 | 0) != (f | 0)) {
                        e = f << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);while (1) {
                          d = a + 16 + (e >>> 31 << 2) | 0;b = c[d >> 2] | 0;if (!b) break;if ((c[b + 4 >> 2] & -8 | 0) == (f | 0)) {
                            a = b;break i;
                          } else {
                            e = e << 1;a = b;
                          }
                        }c[d >> 2] = l;c[l + 24 >> 2] = a;c[l + 12 >> 2] = l;c[l + 8 >> 2] = l;break g;
                      }
                    } while (0);u = a + 8 | 0;v = c[u >> 2] | 0;c[v + 12 >> 2] = l;c[u >> 2] = l;c[l + 8 >> 2] = v;c[l + 12 >> 2] = a;c[l + 24 >> 2] = 0;
                  }
                } while (0);v = m + 8 | 0;k = w;return v | 0;
              }a = 456;while (1) {
                b = c[a >> 2] | 0;if (b >>> 0 <= j >>> 0 ? (v = b + (c[a + 4 >> 2] | 0) | 0, v >>> 0 > j >>> 0) : 0) break;a = c[a + 8 >> 2] | 0;
              }f = v + -47 + ((v + -47 + 8 & 7 | 0) == 0 ? 0 : 0 - (v + -47 + 8) & 7) | 0;f = f >>> 0 < (j + 16 | 0) >>> 0 ? j : f;a = h + -40 | 0;t = g + 8 | 0;t = (t & 7 | 0) == 0 ? 0 : 0 - t & 7;u = g + t | 0;c[8] = u;c[5] = a - t;c[u + 4 >> 2] = a - t | 1;c[g + a + 4 >> 2] = 40;c[9] = c[124];c[f + 4 >> 2] = 27;c[f + 8 >> 2] = c[114];c[f + 8 + 4 >> 2] = c[115];c[f + 8 + 8 >> 2] = c[116];c[f + 8 + 12 >> 2] = c[117];c[114] = g;c[115] = h;c[117] = 0;c[116] = f + 8;a = f + 24 | 0;do {
                u = a;a = a + 4 | 0;c[a >> 2] = 7;
              } while ((u + 8 | 0) >>> 0 < v >>> 0);if ((f | 0) != (j | 0)) {
                c[f + 4 >> 2] = c[f + 4 >> 2] & -2;c[j + 4 >> 2] = f - j | 1;c[f >> 2] = f - j;if ((f - j | 0) >>> 0 < 256) {
                  d = 48 + ((f - j | 0) >>> 3 << 1 << 2) | 0;a = c[2] | 0;if (!(a & 1 << ((f - j | 0) >>> 3))) {
                    c[2] = a | 1 << ((f - j | 0) >>> 3);a = d;b = d + 8 | 0;
                  } else {
                    a = c[d + 8 >> 2] | 0;b = d + 8 | 0;
                  }c[b >> 2] = j;c[a + 12 >> 2] = j;c[j + 8 >> 2] = a;c[j + 12 >> 2] = d;break;
                }if ((f - j | 0) >>> 8) {
                  if ((f - j | 0) >>> 0 > 16777215) e = 31;else {
                    e = (f - j | 0) >>> 8 << ((((f - j | 0) >>> 8) + 1048320 | 0) >>> 16 & 8);e = 14 - ((e + 520192 | 0) >>> 16 & 4 | (((f - j | 0) >>> 8) + 1048320 | 0) >>> 16 & 8 | ((e << ((e + 520192 | 0) >>> 16 & 4)) + 245760 | 0) >>> 16 & 2) + (e << ((e + 520192 | 0) >>> 16 & 4) << (((e << ((e + 520192 | 0) >>> 16 & 4)) + 245760 | 0) >>> 16 & 2) >>> 15) | 0;e = (f - j | 0) >>> (e + 7 | 0) & 1 | e << 1;
                  }
                } else e = 0;a = 312 + (e << 2) | 0;c[j + 28 >> 2] = e;c[j + 20 >> 2] = 0;c[j + 16 >> 2] = 0;b = c[3] | 0;d = 1 << e;if (!(b & d)) {
                  c[3] = b | d;c[a >> 2] = j;c[j + 24 >> 2] = a;c[j + 12 >> 2] = j;c[j + 8 >> 2] = j;break;
                }a = c[a >> 2] | 0;j: do {
                  if ((c[a + 4 >> 2] & -8 | 0) != (f - j | 0)) {
                    e = f - j << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);while (1) {
                      d = a + 16 + (e >>> 31 << 2) | 0;b = c[d >> 2] | 0;if (!b) break;if ((c[b + 4 >> 2] & -8 | 0) == (f - j | 0)) {
                        a = b;break j;
                      } else {
                        e = e << 1;a = b;
                      }
                    }c[d >> 2] = j;c[j + 24 >> 2] = a;c[j + 12 >> 2] = j;c[j + 8 >> 2] = j;break f;
                  }
                } while (0);u = a + 8 | 0;v = c[u >> 2] | 0;c[v + 12 >> 2] = j;c[u >> 2] = j;c[j + 8 >> 2] = v;c[j + 12 >> 2] = a;c[j + 24 >> 2] = 0;
              }
            } else {
              v = c[6] | 0;if ((v | 0) == 0 | g >>> 0 < v >>> 0) c[6] = g;c[114] = g;c[115] = h;c[117] = 0;c[11] = c[120];c[10] = -1;c[15] = 48;c[14] = 48;c[17] = 56;c[16] = 56;c[19] = 64;c[18] = 64;c[21] = 72;c[20] = 72;c[23] = 80;c[22] = 80;c[25] = 88;c[24] = 88;c[27] = 96;c[26] = 96;c[29] = 104;c[28] = 104;c[31] = 112;c[30] = 112;c[33] = 120;c[32] = 120;c[35] = 128;c[34] = 128;c[37] = 136;c[36] = 136;c[39] = 144;c[38] = 144;c[41] = 152;c[40] = 152;c[43] = 160;c[42] = 160;c[45] = 168;c[44] = 168;c[47] = 176;c[46] = 176;c[49] = 184;c[48] = 184;c[51] = 192;c[50] = 192;c[53] = 200;c[52] = 200;c[55] = 208;c[54] = 208;c[57] = 216;c[56] = 216;c[59] = 224;c[58] = 224;c[61] = 232;c[60] = 232;c[63] = 240;c[62] = 240;c[65] = 248;c[64] = 248;c[67] = 256;c[66] = 256;c[69] = 264;c[68] = 264;c[71] = 272;c[70] = 272;c[73] = 280;c[72] = 280;c[75] = 288;c[74] = 288;c[77] = 296;c[76] = 296;v = h + -40 | 0;t = g + 8 | 0;t = (t & 7 | 0) == 0 ? 0 : 0 - t & 7;u = g + t | 0;c[8] = u;c[5] = v - t;c[u + 4 >> 2] = v - t | 1;c[g + v + 4 >> 2] = 40;c[9] = c[124];
            }
          } while (0);a = c[5] | 0;if (a >>> 0 > o >>> 0) {
            t = a - o | 0;c[5] = t;v = c[8] | 0;u = v + o | 0;c[8] = u;c[u + 4 >> 2] = t | 1;c[v + 4 >> 2] = o | 3;v = v + 8 | 0;k = w;return v | 0;
          }
        }c[(V() | 0) >> 2] = 12;v = 0;k = w;return v | 0;
      }function _(a) {
        a = a | 0;var b = 0,
            d = 0,
            e = 0,
            f = 0,
            g = 0,
            h = 0,
            i = 0,
            j = 0;if (!a) return;b = c[6] | 0;d = c[a + -4 >> 2] | 0;j = a + -8 + (d & -8) | 0;do {
          if (!(d & 1)) {
            e = c[a + -8 >> 2] | 0;if (!(d & 3)) return;h = a + -8 + (0 - e) | 0;g = e + (d & -8) | 0;if (h >>> 0 < b >>> 0) return;if ((c[7] | 0) == (h | 0)) {
              b = c[j + 4 >> 2] | 0;if ((b & 3 | 0) != 3) {
                i = h;b = g;break;
              }c[4] = g;c[j + 4 >> 2] = b & -2;c[h + 4 >> 2] = g | 1;c[h + g >> 2] = g;return;
            }if (e >>> 0 < 256) {
              b = c[h + 8 >> 2] | 0;a = c[h + 12 >> 2] | 0;if ((a | 0) == (b | 0)) {
                c[2] = c[2] & ~(1 << (e >>> 3));i = h;b = g;break;
              } else {
                c[b + 12 >> 2] = a;c[a + 8 >> 2] = b;i = h;b = g;break;
              }
            }f = c[h + 24 >> 2] | 0;b = c[h + 12 >> 2] | 0;do {
              if ((b | 0) == (h | 0)) {
                b = c[h + 16 + 4 >> 2] | 0;if (!b) {
                  b = c[h + 16 >> 2] | 0;if (!b) {
                    b = 0;break;
                  } else a = h + 16 | 0;
                } else a = h + 16 + 4 | 0;while (1) {
                  e = b + 20 | 0;d = c[e >> 2] | 0;if (!d) {
                    e = b + 16 | 0;d = c[e >> 2] | 0;if (!d) break;else {
                      b = d;a = e;
                    }
                  } else {
                    b = d;a = e;
                  }
                }c[a >> 2] = 0;
              } else {
                i = c[h + 8 >> 2] | 0;c[i + 12 >> 2] = b;c[b + 8 >> 2] = i;
              }
            } while (0);if (f) {
              a = c[h + 28 >> 2] | 0;if ((c[312 + (a << 2) >> 2] | 0) == (h | 0)) {
                c[312 + (a << 2) >> 2] = b;if (!b) {
                  c[3] = c[3] & ~(1 << a);i = h;b = g;break;
                }
              } else {
                c[((c[f + 16 >> 2] | 0) == (h | 0) ? f + 16 | 0 : f + 20 | 0) >> 2] = b;if (!b) {
                  i = h;b = g;break;
                }
              }c[b + 24 >> 2] = f;a = c[h + 16 >> 2] | 0;if (a | 0) {
                c[b + 16 >> 2] = a;c[a + 24 >> 2] = b;
              }a = c[h + 16 + 4 >> 2] | 0;if (a) {
                c[b + 20 >> 2] = a;c[a + 24 >> 2] = b;i = h;b = g;
              } else {
                i = h;b = g;
              }
            } else {
              i = h;b = g;
            }
          } else {
            i = a + -8 | 0;b = d & -8;h = a + -8 | 0;
          }
        } while (0);if (h >>> 0 >= j >>> 0) return;d = c[j + 4 >> 2] | 0;if (!(d & 1)) return;if (!(d & 2)) {
          if ((c[8] | 0) == (j | 0)) {
            j = (c[5] | 0) + b | 0;c[5] = j;c[8] = i;c[i + 4 >> 2] = j | 1;if ((i | 0) != (c[7] | 0)) return;c[7] = 0;c[4] = 0;return;
          }if ((c[7] | 0) == (j | 0)) {
            j = (c[4] | 0) + b | 0;c[4] = j;c[7] = h;c[i + 4 >> 2] = j | 1;c[h + j >> 2] = j;return;
          }f = (d & -8) + b | 0;do {
            if (d >>> 0 < 256) {
              a = c[j + 8 >> 2] | 0;b = c[j + 12 >> 2] | 0;if ((b | 0) == (a | 0)) {
                c[2] = c[2] & ~(1 << (d >>> 3));break;
              } else {
                c[a + 12 >> 2] = b;c[b + 8 >> 2] = a;break;
              }
            } else {
              g = c[j + 24 >> 2] | 0;b = c[j + 12 >> 2] | 0;do {
                if ((b | 0) == (j | 0)) {
                  b = c[j + 16 + 4 >> 2] | 0;if (!b) {
                    b = c[j + 16 >> 2] | 0;if (!b) {
                      a = 0;break;
                    } else a = j + 16 | 0;
                  } else a = j + 16 + 4 | 0;while (1) {
                    e = b + 20 | 0;d = c[e >> 2] | 0;if (!d) {
                      e = b + 16 | 0;d = c[e >> 2] | 0;if (!d) break;else {
                        b = d;a = e;
                      }
                    } else {
                      b = d;a = e;
                    }
                  }c[a >> 2] = 0;a = b;
                } else {
                  a = c[j + 8 >> 2] | 0;c[a + 12 >> 2] = b;c[b + 8 >> 2] = a;a = b;
                }
              } while (0);if (g | 0) {
                b = c[j + 28 >> 2] | 0;if ((c[312 + (b << 2) >> 2] | 0) == (j | 0)) {
                  c[312 + (b << 2) >> 2] = a;if (!a) {
                    c[3] = c[3] & ~(1 << b);break;
                  }
                } else {
                  c[((c[g + 16 >> 2] | 0) == (j | 0) ? g + 16 | 0 : g + 20 | 0) >> 2] = a;if (!a) break;
                }c[a + 24 >> 2] = g;b = c[j + 16 >> 2] | 0;if (b | 0) {
                  c[a + 16 >> 2] = b;c[b + 24 >> 2] = a;
                }b = c[j + 16 + 4 >> 2] | 0;if (b | 0) {
                  c[a + 20 >> 2] = b;c[b + 24 >> 2] = a;
                }
              }
            }
          } while (0);c[i + 4 >> 2] = f | 1;c[h + f >> 2] = f;if ((i | 0) == (c[7] | 0)) {
            c[4] = f;return;
          }
        } else {
          c[j + 4 >> 2] = d & -2;c[i + 4 >> 2] = b | 1;c[h + b >> 2] = b;f = b;
        }d = f >>> 3;if (f >>> 0 < 256) {
          b = c[2] | 0;if (!(b & 1 << d)) {
            c[2] = b | 1 << d;b = 48 + (d << 1 << 2) | 0;a = 48 + (d << 1 << 2) + 8 | 0;
          } else {
            b = c[48 + (d << 1 << 2) + 8 >> 2] | 0;a = 48 + (d << 1 << 2) + 8 | 0;
          }c[a >> 2] = i;c[b + 12 >> 2] = i;c[i + 8 >> 2] = b;c[i + 12 >> 2] = 48 + (d << 1 << 2);return;
        }b = f >>> 8;if (b) {
          if (f >>> 0 > 16777215) e = 31;else {
            e = b << ((b + 1048320 | 0) >>> 16 & 8) << (((b << ((b + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4);e = 14 - (((b << ((b + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4 | (b + 1048320 | 0) >>> 16 & 8 | (e + 245760 | 0) >>> 16 & 2) + (e << ((e + 245760 | 0) >>> 16 & 2) >>> 15) | 0;e = f >>> (e + 7 | 0) & 1 | e << 1;
          }
        } else e = 0;b = 312 + (e << 2) | 0;c[i + 28 >> 2] = e;c[i + 20 >> 2] = 0;c[i + 16 >> 2] = 0;a = c[3] | 0;d = 1 << e;a: do {
          if (!(a & d)) {
            c[3] = a | d;c[b >> 2] = i;c[i + 24 >> 2] = b;c[i + 12 >> 2] = i;c[i + 8 >> 2] = i;
          } else {
            b = c[b >> 2] | 0;b: do {
              if ((c[b + 4 >> 2] & -8 | 0) != (f | 0)) {
                e = f << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);while (1) {
                  d = b + 16 + (e >>> 31 << 2) | 0;a = c[d >> 2] | 0;if (!a) break;if ((c[a + 4 >> 2] & -8 | 0) == (f | 0)) {
                    b = a;break b;
                  } else {
                    e = e << 1;b = a;
                  }
                }c[d >> 2] = i;c[i + 24 >> 2] = b;c[i + 12 >> 2] = i;c[i + 8 >> 2] = i;break a;
              }
            } while (0);h = b + 8 | 0;j = c[h >> 2] | 0;c[j + 12 >> 2] = i;c[h >> 2] = i;c[i + 8 >> 2] = j;c[i + 12 >> 2] = b;c[i + 24 >> 2] = 0;
          }
        } while (0);j = (c[10] | 0) + -1 | 0;c[10] = j;if (j | 0) return;b = 464;while (1) {
          b = c[b >> 2] | 0;if (!b) break;else b = b + 8 | 0;
        }c[10] = -1;return;
      }function $() {}function aa(b, d, e) {
        b = b | 0;d = d | 0;e = e | 0;var f = 0,
            g = 0,
            h = 0;if ((e | 0) >= 8192) return X(b | 0, d | 0, e | 0) | 0;h = b | 0;g = b + e | 0;if ((b & 3) == (d & 3)) {
          while (b & 3) {
            if (!e) return h | 0;a[b >> 0] = a[d >> 0] | 0;b = b + 1 | 0;d = d + 1 | 0;e = e - 1 | 0;
          }e = g & -4 | 0;f = e - 64 | 0;while ((b | 0) <= (f | 0)) {
            c[b >> 2] = c[d >> 2];c[b + 4 >> 2] = c[d + 4 >> 2];c[b + 8 >> 2] = c[d + 8 >> 2];c[b + 12 >> 2] = c[d + 12 >> 2];c[b + 16 >> 2] = c[d + 16 >> 2];c[b + 20 >> 2] = c[d + 20 >> 2];c[b + 24 >> 2] = c[d + 24 >> 2];c[b + 28 >> 2] = c[d + 28 >> 2];c[b + 32 >> 2] = c[d + 32 >> 2];c[b + 36 >> 2] = c[d + 36 >> 2];c[b + 40 >> 2] = c[d + 40 >> 2];c[b + 44 >> 2] = c[d + 44 >> 2];c[b + 48 >> 2] = c[d + 48 >> 2];c[b + 52 >> 2] = c[d + 52 >> 2];c[b + 56 >> 2] = c[d + 56 >> 2];c[b + 60 >> 2] = c[d + 60 >> 2];b = b + 64 | 0;d = d + 64 | 0;
          }while ((b | 0) < (e | 0)) {
            c[b >> 2] = c[d >> 2];b = b + 4 | 0;d = d + 4 | 0;
          }
        } else {
          e = g - 4 | 0;while ((b | 0) < (e | 0)) {
            a[b >> 0] = a[d >> 0] | 0;a[b + 1 >> 0] = a[d + 1 >> 0] | 0;a[b + 2 >> 0] = a[d + 2 >> 0] | 0;a[b + 3 >> 0] = a[d + 3 >> 0] | 0;b = b + 4 | 0;d = d + 4 | 0;
          }
        }while ((b | 0) < (g | 0)) {
          a[b >> 0] = a[d >> 0] | 0;b = b + 1 | 0;d = d + 1 | 0;
        }return h | 0;
      }function ba(b, d, e) {
        b = b | 0;d = d | 0;e = e | 0;var f = 0,
            g = 0;f = b + e | 0;d = d & 255;if ((e | 0) >= 67) {
          while (b & 3) {
            a[b >> 0] = d;b = b + 1 | 0;
          }g = d | d << 8 | d << 16 | d << 24;while ((b | 0) <= ((f & -4) - 64 | 0)) {
            c[b >> 2] = g;c[b + 4 >> 2] = g;c[b + 8 >> 2] = g;c[b + 12 >> 2] = g;c[b + 16 >> 2] = g;c[b + 20 >> 2] = g;c[b + 24 >> 2] = g;c[b + 28 >> 2] = g;c[b + 32 >> 2] = g;c[b + 36 >> 2] = g;c[b + 40 >> 2] = g;c[b + 44 >> 2] = g;c[b + 48 >> 2] = g;c[b + 52 >> 2] = g;c[b + 56 >> 2] = g;c[b + 60 >> 2] = g;b = b + 64 | 0;
          }while ((b | 0) < (f & -4 | 0)) {
            c[b >> 2] = g;b = b + 4 | 0;
          }
        }while ((b | 0) < (f | 0)) {
          a[b >> 0] = d;b = b + 1 | 0;
        }return f - e | 0;
      }function ca(a) {
        a = a | 0;var b = 0;b = c[i >> 2] | 0;if ((a | 0) > 0 & (b + a | 0) < (b | 0) | (b + a | 0) < 0) {
          U() | 0;W(12);return -1;
        }c[i >> 2] = b + a;if ((b + a | 0) > (T() | 0) ? (S() | 0) == 0 : 0) {
          c[i >> 2] = b;W(12);return -1;
        }return b | 0;
      }function da(a) {
        a = a | 0;var b = 0;b = k;k = k + a | 0;k = k + 15 & -16;return b | 0;
      }function ea(a, b) {
        a = a | 0;b = b | 0;if (!m) {
          m = a;n = b;
        }
      }function fa(a, b) {
        a = a | 0;b = b | 0;k = a;l = b;
      }function ga(a) {
        a = a | 0;k = a;
      }function ha(a) {
        a = a | 0;x = a;
      }function ia() {
        return x | 0;
      }function ja() {
        return k | 0;
      }

      // EMSCRIPTEN_END_FUNCS
      return { _free: _, _malloc: Z, _memcpy: aa, _memset: ba, _sbrk: ca, establishStackSpace: fa, getTempRet0: ia, runPostSets: $, setTempRet0: ha, setThrew: ea, stackAlloc: da, stackRestore: ga, stackSave: ja };
    }(

    // EMSCRIPTEN_END_ASM
    e.g, e.h, buffer);
    e._free = Va._free;e._malloc = Va._malloc;e._memcpy = Va._memcpy;e._memset = Va._memset;e._sbrk = Va._sbrk;e.establishStackSpace = Va.establishStackSpace;e.getTempRet0 = Va.getTempRet0;e.runPostSets = Va.runPostSets;e.setTempRet0 = Va.setTempRet0;e.setThrew = Va.setThrew;e.stackAlloc = Va.stackAlloc;e.stackRestore = Va.stackRestore;e.stackSave = Va.stackSave;e.asm = Va;
    if (Pa) {
      if (String.prototype.startsWith ? !Pa.startsWith(Qa) : 0 !== Pa.indexOf(Qa)) {
        var Wa = Pa;Pa = e.locateFile ? e.locateFile(Wa, ha) : ha + Wa;
      }if (ea || fa) {
        var Xa = e.readBinary(Pa);ra.set(Xa, 8);
      } else {
        var Za = function Za() {
          e.readAsync(Pa, Ya, function () {
            throw "could not load memory initializer " + Pa;
          });
        };Ma++;e.monitorRunDependencies && e.monitorRunDependencies(Ma);var Ya = function Ya(a) {
          a.byteLength && (a = new Uint8Array(a));ra.set(a, 8);e.memoryInitializerRequest && delete e.memoryInitializerRequest.response;Ma--;e.monitorRunDependencies && e.monitorRunDependencies(Ma);0 == Ma && (null !== Na && (clearInterval(Na), Na = null), Oa && (a = Oa, Oa = null, a()));
        },
            $a = ka(Pa);if ($a) Ya($a.buffer);else if (e.memoryInitializerRequest) {
          var ab = function ab() {
            var a = e.memoryInitializerRequest,
                b = a.response;if (200 !== a.status && 0 !== a.status) if (b = ka(e.memoryInitializerRequestURL)) b = b.buffer;else {
              console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + a.status + ", retrying " + Pa);Za();return;
            }Ya(b);
          };e.memoryInitializerRequest.response ? setTimeout(ab, 0) : e.memoryInitializerRequest.addEventListener("load", ab);
        } else Za();
      }
    }e.then = function (a) {
      if (e.calledRun) a(e);else {
        var b = e.onRuntimeInitialized;e.onRuntimeInitialized = function () {
          b && b();a(e);
        };
      }return e;
    };Oa = function bb() {
      e.calledRun || cb();e.calledRun || (Oa = bb);
    };
    function cb() {
      function a() {
        if (!e.calledRun && (e.calledRun = !0, !pa)) {
          Ka || (Ka = !0, Fa(Ha));Fa(Ia);if (e.onRuntimeInitialized) e.onRuntimeInitialized();if (e.postRun) for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
            var a = e.postRun.shift();Ja.unshift(a);
          }Fa(Ja);
        }
      }if (!(0 < Ma)) {
        if (e.preRun) for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) {
          La();
        }Fa(Ga);0 < Ma || e.calledRun || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            e.setStatus("");
          }, 1);a();
        }, 1)) : a());
      }
    }e.run = cb;function qa(a) {
      if (e.onAbort) e.onAbort(a);void 0 !== a ? (ma(a), na(a), a = JSON.stringify(a)) : a = "";pa = !0;throw "abort(" + a + "). Build with -s ASSERTIONS=1 for more info.";
    }e.abort = qa;if (e.preInit) for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) {
      e.preInit.pop()();
    }e.noExitRuntime = !0;cb();function WrapperObject() {}WrapperObject.prototype = Object.create(WrapperObject.prototype);WrapperObject.prototype.constructor = WrapperObject;WrapperObject.prototype.b = WrapperObject;
    WrapperObject.c = {};e.WrapperObject = WrapperObject;function getCache(a) {
      return (a || WrapperObject).c;
    }e.getCache = getCache;function wrapPointer(a, b) {
      var c = getCache(b),
          d = c[a];if (d) return d;d = Object.create((b || WrapperObject).prototype);d.a = a;return c[a] = d;
    }e.wrapPointer = wrapPointer;function castObject(a, b) {
      return wrapPointer(a.a, b);
    }e.castObject = castObject;e.NULL = wrapPointer(0);
    function destroy(a) {
      if (!a.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";a.__destroy__();delete getCache(a.b)[a.a];
    }e.destroy = destroy;function compare(a, b) {
      return a.a === b.a;
    }e.compare = compare;function getPointer(a) {
      return a.a;
    }e.getPointer = getPointer;function getClass(a) {
      return a.b;
    }e.getClass = getClass;var db = 0,
        eb = 0,
        fb = 0,
        gb = [],
        hb = 0;function f() {
      throw "cannot construct a btCollisionShape, no constructor in IDL";
    }f.prototype = Object.create(WrapperObject.prototype);
    f.prototype.constructor = f;f.prototype.b = f;f.c = {};e.btCollisionShape = f;f.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionShape_setLocalScaling_1(b, a);
    };f.prototype.getLocalScaling = function () {
      return wrapPointer(btCollisionShape_getLocalScaling_0(this.a), h);
    };f.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCollisionShape_calculateLocalInertia_2(c, a, b);
    };
    f.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionShape_setMargin_1(b, a);
    };f.prototype.getMargin = function () {
      return btCollisionShape_getMargin_0(this.a);
    };f.prototype.__destroy__ = function () {
      btCollisionShape___destroy___0(this.a);
    };function k() {
      this.a = btCollisionObject_btCollisionObject_0();getCache(k)[this.a] = this;
    }k.prototype = Object.create(WrapperObject.prototype);k.prototype.constructor = k;k.prototype.b = k;k.c = {};e.btCollisionObject = k;
    k.prototype.setAnisotropicFriction = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCollisionObject_setAnisotropicFriction_2(c, a, b);
    };k.prototype.getCollisionShape = function () {
      return wrapPointer(btCollisionObject_getCollisionShape_0(this.a), f);
    };k.prototype.setContactProcessingThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setContactProcessingThreshold_1(b, a);
    };
    k.prototype.setActivationState = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setActivationState_1(b, a);
    };k.prototype.forceActivationState = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_forceActivationState_1(b, a);
    };k.prototype.activate = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);void 0 === a ? btCollisionObject_activate_0(b) : btCollisionObject_activate_1(b, a);
    };k.prototype.isActive = function () {
      return !!btCollisionObject_isActive_0(this.a);
    };
    k.prototype.isKinematicObject = function () {
      return !!btCollisionObject_isKinematicObject_0(this.a);
    };k.prototype.isStaticObject = function () {
      return !!btCollisionObject_isStaticObject_0(this.a);
    };k.prototype.isStaticOrKinematicObject = function () {
      return !!btCollisionObject_isStaticOrKinematicObject_0(this.a);
    };k.prototype.getRestitution = function () {
      return btCollisionObject_getRestitution_0(this.a);
    };
    k.prototype.setRestitution = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setRestitution_1(b, a);
    };k.prototype.getFriction = function () {
      return btCollisionObject_getFriction_0(this.a);
    };k.prototype.setFriction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setFriction_1(b, a);
    };k.prototype.getRollingFriction = function () {
      return btCollisionObject_getRollingFriction_0(this.a);
    };
    k.prototype.setRollingFriction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setRollingFriction_1(b, a);
    };k.prototype.getCollisionFlags = function () {
      return btCollisionObject_getCollisionFlags_0(this.a);
    };k.prototype.setCollisionFlags = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setCollisionFlags_1(b, a);
    };k.prototype.getWorldTransform = function () {
      return wrapPointer(btCollisionObject_getWorldTransform_0(this.a), l);
    };
    k.prototype.setWorldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setWorldTransform_1(b, a);
    };k.prototype.setCollisionShape = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setCollisionShape_1(b, a);
    };k.prototype.getCcdMotionThreshold = function () {
      return btCollisionObject_getCcdMotionThreshold_0(this.a);
    };k.prototype.setCcdMotionThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setCcdMotionThreshold_1(b, a);
    };
    k.prototype.getCcdSweptSphereRadius = function () {
      return btCollisionObject_getCcdSweptSphereRadius_0(this.a);
    };k.prototype.setCcdSweptSphereRadius = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setCcdSweptSphereRadius_1(b, a);
    };k.prototype.getUserIndex = function () {
      return btCollisionObject_getUserIndex_0(this.a);
    };k.prototype.setUserIndex = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setUserIndex_1(b, a);
    };
    k.prototype.getUserPointer = function () {
      return wrapPointer(btCollisionObject_getUserPointer_0(this.a), VoidPtr);
    };k.prototype.setUserPointer = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setUserPointer_1(b, a);
    };k.prototype.getInterpolationAngularVelocity = function () {
      return wrapPointer(btCollisionObject_getInterpolationAngularVelocity_0(this.a), h);
    };
    k.prototype.setInterpolationAngularVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setInterpolationAngularVelocity_1(b, a);
    };k.prototype.getInterpolationLinearVelocity = function () {
      return wrapPointer(btCollisionObject_getInterpolationLinearVelocity_0(this.a), h);
    };k.prototype.setInterpolationLinearVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionObject_setInterpolationLinearVelocity_1(b, a);
    };
    k.prototype.getBroadphaseHandle = function () {
      return wrapPointer(btCollisionObject_getBroadphaseHandle_0(this.a), ib);
    };k.prototype.getActivationState = function () {
      return btCollisionObject_getActivationState_0(this.a);
    };k.prototype.__destroy__ = function () {
      btCollisionObject___destroy___0(this.a);
    };function m() {
      throw "cannot construct a btTypedConstraint, no constructor in IDL";
    }m.prototype = Object.create(WrapperObject.prototype);m.prototype.constructor = m;m.prototype.b = m;m.c = {};e.btTypedConstraint = m;
    m.prototype.enableFeedback = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btTypedConstraint_enableFeedback_1(b, a);
    };m.prototype.getBreakingImpulseThreshold = function () {
      return btTypedConstraint_getBreakingImpulseThreshold_0(this.a);
    };m.prototype.setBreakingImpulseThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btTypedConstraint_setBreakingImpulseThreshold_1(b, a);
    };
    m.prototype.getParam = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);return btTypedConstraint_getParam_2(c, a, b);
    };m.prototype.setParam = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btTypedConstraint_setParam_3(d, a, b, c);
    };m.prototype.__destroy__ = function () {
      btTypedConstraint___destroy___0(this.a);
    };function n() {
      throw "cannot construct a btCollisionWorld, no constructor in IDL";
    }
    n.prototype = Object.create(WrapperObject.prototype);n.prototype.constructor = n;n.prototype.b = n;n.c = {};e.btCollisionWorld = n;n.prototype.getDispatcher = function () {
      return wrapPointer(btCollisionWorld_getDispatcher_0(this.a), jb);
    };n.prototype.rayTest = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btCollisionWorld_rayTest_3(d, a, b, c);
    };n.prototype.getPairCache = function () {
      return wrapPointer(btCollisionWorld_getPairCache_0(this.a), kb);
    };
    n.prototype.getDispatchInfo = function () {
      return wrapPointer(btCollisionWorld_getDispatchInfo_0(this.a), p);
    };n.prototype.addCollisionObject = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);void 0 === b ? btCollisionWorld_addCollisionObject_1(d, a) : void 0 === c ? btCollisionWorld_addCollisionObject_2(d, a, b) : btCollisionWorld_addCollisionObject_3(d, a, b, c);
    };
    n.prototype.removeCollisionObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionWorld_removeCollisionObject_1(b, a);
    };n.prototype.getBroadphase = function () {
      return wrapPointer(btCollisionWorld_getBroadphase_0(this.a), lb);
    };
    n.prototype.convexSweepTest = function (a, b, c, d, g) {
      var q = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);btCollisionWorld_convexSweepTest_5(q, a, b, c, d, g);
    };n.prototype.contactPairTest = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btCollisionWorld_contactPairTest_3(d, a, b, c);
    };
    n.prototype.contactTest = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCollisionWorld_contactTest_2(c, a, b);
    };n.prototype.updateSingleAabb = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCollisionWorld_updateSingleAabb_1(b, a);
    };n.prototype.__destroy__ = function () {
      btCollisionWorld___destroy___0(this.a);
    };function mb() {
      throw "cannot construct a btConcaveShape, no constructor in IDL";
    }mb.prototype = Object.create(f.prototype);
    mb.prototype.constructor = mb;mb.prototype.b = mb;mb.c = {};e.btConcaveShape = mb;mb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConcaveShape_setLocalScaling_1(b, a);
    };mb.prototype.getLocalScaling = function () {
      return wrapPointer(btConcaveShape_getLocalScaling_0(this.a), h);
    };mb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btConcaveShape_calculateLocalInertia_2(c, a, b);
    };
    mb.prototype.__destroy__ = function () {
      btConcaveShape___destroy___0(this.a);
    };function r(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = btCapsuleShape_btCapsuleShape_2(a, b);getCache(r)[this.a] = this;
    }r.prototype = Object.create(f.prototype);r.prototype.constructor = r;r.prototype.b = r;r.c = {};e.btCapsuleShape = r;r.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCapsuleShape_setMargin_1(b, a);
    };r.prototype.getMargin = function () {
      return btCapsuleShape_getMargin_0(this.a);
    };
    r.prototype.getUpAxis = function () {
      return btCapsuleShape_getUpAxis_0(this.a);
    };r.prototype.getRadius = function () {
      return btCapsuleShape_getRadius_0(this.a);
    };r.prototype.getHalfHeight = function () {
      return btCapsuleShape_getHalfHeight_0(this.a);
    };r.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCapsuleShape_setLocalScaling_1(b, a);
    };r.prototype.getLocalScaling = function () {
      return wrapPointer(btCapsuleShape_getLocalScaling_0(this.a), h);
    };
    r.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCapsuleShape_calculateLocalInertia_2(c, a, b);
    };r.prototype.__destroy__ = function () {
      btCapsuleShape___destroy___0(this.a);
    };function nb() {
      throw "cannot construct a btGImpactShapeInterface, no constructor in IDL";
    }nb.prototype = Object.create(mb.prototype);nb.prototype.constructor = nb;nb.prototype.b = nb;nb.c = {};e.btGImpactShapeInterface = nb;nb.prototype.updateBound = function () {
      btGImpactShapeInterface_updateBound_0(this.a);
    };
    nb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGImpactShapeInterface_setLocalScaling_1(b, a);
    };nb.prototype.getLocalScaling = function () {
      return wrapPointer(btGImpactShapeInterface_getLocalScaling_0(this.a), h);
    };nb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btGImpactShapeInterface_calculateLocalInertia_2(c, a, b);
    };nb.prototype.__destroy__ = function () {
      btGImpactShapeInterface___destroy___0(this.a);
    };
    function u() {
      throw "cannot construct a btDynamicsWorld, no constructor in IDL";
    }u.prototype = Object.create(n.prototype);u.prototype.constructor = u;u.prototype.b = u;u.c = {};e.btDynamicsWorld = u;u.prototype.addAction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDynamicsWorld_addAction_1(b, a);
    };u.prototype.removeAction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDynamicsWorld_removeAction_1(b, a);
    };
    u.prototype.getSolverInfo = function () {
      return wrapPointer(btDynamicsWorld_getSolverInfo_0(this.a), v);
    };u.prototype.getDispatcher = function () {
      return wrapPointer(btDynamicsWorld_getDispatcher_0(this.a), jb);
    };u.prototype.rayTest = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btDynamicsWorld_rayTest_3(d, a, b, c);
    };u.prototype.getPairCache = function () {
      return wrapPointer(btDynamicsWorld_getPairCache_0(this.a), kb);
    };
    u.prototype.getDispatchInfo = function () {
      return wrapPointer(btDynamicsWorld_getDispatchInfo_0(this.a), p);
    };u.prototype.addCollisionObject = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);void 0 === b ? btDynamicsWorld_addCollisionObject_1(d, a) : void 0 === c ? btDynamicsWorld_addCollisionObject_2(d, a, b) : btDynamicsWorld_addCollisionObject_3(d, a, b, c);
    };
    u.prototype.removeCollisionObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDynamicsWorld_removeCollisionObject_1(b, a);
    };u.prototype.getBroadphase = function () {
      return wrapPointer(btDynamicsWorld_getBroadphase_0(this.a), lb);
    };
    u.prototype.convexSweepTest = function (a, b, c, d, g) {
      var q = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);btDynamicsWorld_convexSweepTest_5(q, a, b, c, d, g);
    };u.prototype.contactPairTest = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btDynamicsWorld_contactPairTest_3(d, a, b, c);
    };
    u.prototype.contactTest = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btDynamicsWorld_contactTest_2(c, a, b);
    };u.prototype.updateSingleAabb = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDynamicsWorld_updateSingleAabb_1(b, a);
    };u.prototype.__destroy__ = function () {
      btDynamicsWorld___destroy___0(this.a);
    };function ob() {
      throw "cannot construct a btTriangleMeshShape, no constructor in IDL";
    }ob.prototype = Object.create(mb.prototype);
    ob.prototype.constructor = ob;ob.prototype.b = ob;ob.c = {};e.btTriangleMeshShape = ob;ob.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btTriangleMeshShape_setLocalScaling_1(b, a);
    };ob.prototype.getLocalScaling = function () {
      return wrapPointer(btTriangleMeshShape_getLocalScaling_0(this.a), h);
    };ob.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btTriangleMeshShape_calculateLocalInertia_2(c, a, b);
    };
    ob.prototype.__destroy__ = function () {
      btTriangleMeshShape___destroy___0(this.a);
    };function w() {
      this.a = btGhostObject_btGhostObject_0();getCache(w)[this.a] = this;
    }w.prototype = Object.create(k.prototype);w.prototype.constructor = w;w.prototype.b = w;w.c = {};e.btGhostObject = w;w.prototype.getNumOverlappingObjects = function () {
      return btGhostObject_getNumOverlappingObjects_0(this.a);
    };
    w.prototype.getOverlappingObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btGhostObject_getOverlappingObject_1(b, a), k);
    };w.prototype.setAnisotropicFriction = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btGhostObject_setAnisotropicFriction_2(c, a, b);
    };w.prototype.getCollisionShape = function () {
      return wrapPointer(btGhostObject_getCollisionShape_0(this.a), f);
    };
    w.prototype.setContactProcessingThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setContactProcessingThreshold_1(b, a);
    };w.prototype.setActivationState = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setActivationState_1(b, a);
    };w.prototype.forceActivationState = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_forceActivationState_1(b, a);
    };
    w.prototype.activate = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);void 0 === a ? btGhostObject_activate_0(b) : btGhostObject_activate_1(b, a);
    };w.prototype.isActive = function () {
      return !!btGhostObject_isActive_0(this.a);
    };w.prototype.isKinematicObject = function () {
      return !!btGhostObject_isKinematicObject_0(this.a);
    };w.prototype.isStaticObject = function () {
      return !!btGhostObject_isStaticObject_0(this.a);
    };w.prototype.isStaticOrKinematicObject = function () {
      return !!btGhostObject_isStaticOrKinematicObject_0(this.a);
    };
    w.prototype.getRestitution = function () {
      return btGhostObject_getRestitution_0(this.a);
    };w.prototype.setRestitution = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setRestitution_1(b, a);
    };w.prototype.getFriction = function () {
      return btGhostObject_getFriction_0(this.a);
    };w.prototype.setFriction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setFriction_1(b, a);
    };w.prototype.getRollingFriction = function () {
      return btGhostObject_getRollingFriction_0(this.a);
    };
    w.prototype.setRollingFriction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setRollingFriction_1(b, a);
    };w.prototype.getCollisionFlags = function () {
      return btGhostObject_getCollisionFlags_0(this.a);
    };w.prototype.setCollisionFlags = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setCollisionFlags_1(b, a);
    };w.prototype.getWorldTransform = function () {
      return wrapPointer(btGhostObject_getWorldTransform_0(this.a), l);
    };
    w.prototype.setWorldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setWorldTransform_1(b, a);
    };w.prototype.setCollisionShape = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setCollisionShape_1(b, a);
    };w.prototype.getCcdMotionThreshold = function () {
      return btGhostObject_getCcdMotionThreshold_0(this.a);
    };w.prototype.setCcdMotionThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setCcdMotionThreshold_1(b, a);
    };
    w.prototype.getCcdSweptSphereRadius = function () {
      return btGhostObject_getCcdSweptSphereRadius_0(this.a);
    };w.prototype.setCcdSweptSphereRadius = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setCcdSweptSphereRadius_1(b, a);
    };w.prototype.getUserIndex = function () {
      return btGhostObject_getUserIndex_0(this.a);
    };w.prototype.setUserIndex = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setUserIndex_1(b, a);
    };
    w.prototype.getUserPointer = function () {
      return wrapPointer(btGhostObject_getUserPointer_0(this.a), VoidPtr);
    };w.prototype.setUserPointer = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setUserPointer_1(b, a);
    };w.prototype.getInterpolationAngularVelocity = function () {
      return wrapPointer(btGhostObject_getInterpolationAngularVelocity_0(this.a), h);
    };
    w.prototype.setInterpolationAngularVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setInterpolationAngularVelocity_1(b, a);
    };w.prototype.getInterpolationLinearVelocity = function () {
      return wrapPointer(btGhostObject_getInterpolationLinearVelocity_0(this.a), h);
    };w.prototype.setInterpolationLinearVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGhostObject_setInterpolationLinearVelocity_1(b, a);
    };
    w.prototype.getBroadphaseHandle = function () {
      return wrapPointer(btGhostObject_getBroadphaseHandle_0(this.a), ib);
    };w.prototype.getActivationState = function () {
      return btGhostObject_getActivationState_0(this.a);
    };w.prototype.__destroy__ = function () {
      btGhostObject___destroy___0(this.a);
    };function pb(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = btConeShape_btConeShape_2(a, b);getCache(pb)[this.a] = this;
    }pb.prototype = Object.create(f.prototype);pb.prototype.constructor = pb;
    pb.prototype.b = pb;pb.c = {};e.btConeShape = pb;pb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeShape_setLocalScaling_1(b, a);
    };pb.prototype.getLocalScaling = function () {
      return wrapPointer(btConeShape_getLocalScaling_0(this.a), h);
    };pb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btConeShape_calculateLocalInertia_2(c, a, b);
    };pb.prototype.__destroy__ = function () {
      btConeShape___destroy___0(this.a);
    };
    function qb() {
      throw "cannot construct a btActionInterface, no constructor in IDL";
    }qb.prototype = Object.create(WrapperObject.prototype);qb.prototype.constructor = qb;qb.prototype.b = qb;qb.c = {};e.btActionInterface = qb;qb.prototype.updateAction = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btActionInterface_updateAction_2(c, a, b);
    };qb.prototype.__destroy__ = function () {
      btActionInterface___destroy___0(this.a);
    };
    function h(a, b, c) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);this.a = void 0 === a ? btVector3_btVector3_0() : void 0 === b ? btVector3_btVector3_1(a) : void 0 === c ? btVector3_btVector3_2(a, b) : btVector3_btVector3_3(a, b, c);getCache(h)[this.a] = this;
    }h.prototype = Object.create(WrapperObject.prototype);h.prototype.constructor = h;h.prototype.b = h;h.c = {};e.btVector3 = h;h.prototype.length = h.prototype.length = function () {
      return btVector3_length_0(this.a);
    };
    h.prototype.x = h.prototype.x = function () {
      return btVector3_x_0(this.a);
    };h.prototype.y = h.prototype.y = function () {
      return btVector3_y_0(this.a);
    };h.prototype.z = h.prototype.z = function () {
      return btVector3_z_0(this.a);
    };h.prototype.setX = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVector3_setX_1(b, a);
    };h.prototype.setY = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVector3_setY_1(b, a);
    };h.prototype.setZ = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVector3_setZ_1(b, a);
    };
    h.prototype.setValue = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btVector3_setValue_3(d, a, b, c);
    };h.prototype.normalize = h.prototype.normalize = function () {
      btVector3_normalize_0(this.a);
    };h.prototype.rotate = h.prototype.rotate = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);return wrapPointer(btVector3_rotate_2(c, a, b), h);
    };
    h.prototype.dot = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return btVector3_dot_1(b, a);
    };h.prototype.op_mul = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btVector3_op_mul_1(b, a), h);
    };h.prototype.op_add = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btVector3_op_add_1(b, a), h);
    };h.prototype.op_sub = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btVector3_op_sub_1(b, a), h);
    };h.prototype.__destroy__ = function () {
      btVector3___destroy___0(this.a);
    };
    function rb() {
      throw "cannot construct a btVehicleRaycaster, no constructor in IDL";
    }rb.prototype = Object.create(WrapperObject.prototype);rb.prototype.constructor = rb;rb.prototype.b = rb;rb.c = {};e.btVehicleRaycaster = rb;rb.prototype.castRay = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btVehicleRaycaster_castRay_3(d, a, b, c);
    };rb.prototype.__destroy__ = function () {
      btVehicleRaycaster___destroy___0(this.a);
    };
    function x() {
      throw "cannot construct a btQuadWord, no constructor in IDL";
    }x.prototype = Object.create(WrapperObject.prototype);x.prototype.constructor = x;x.prototype.b = x;x.c = {};e.btQuadWord = x;x.prototype.x = x.prototype.x = function () {
      return btQuadWord_x_0(this.a);
    };x.prototype.y = x.prototype.y = function () {
      return btQuadWord_y_0(this.a);
    };x.prototype.z = x.prototype.z = function () {
      return btQuadWord_z_0(this.a);
    };x.prototype.w = function () {
      return btQuadWord_w_0(this.a);
    };
    x.prototype.setX = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btQuadWord_setX_1(b, a);
    };x.prototype.setY = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btQuadWord_setY_1(b, a);
    };x.prototype.setZ = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btQuadWord_setZ_1(b, a);
    };x.prototype.setW = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btQuadWord_setW_1(b, a);
    };x.prototype.__destroy__ = function () {
      btQuadWord___destroy___0(this.a);
    };
    function sb(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = btCylinderShape_btCylinderShape_1(a);getCache(sb)[this.a] = this;
    }sb.prototype = Object.create(f.prototype);sb.prototype.constructor = sb;sb.prototype.b = sb;sb.c = {};e.btCylinderShape = sb;sb.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCylinderShape_setMargin_1(b, a);
    };sb.prototype.getMargin = function () {
      return btCylinderShape_getMargin_0(this.a);
    };
    sb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCylinderShape_setLocalScaling_1(b, a);
    };sb.prototype.getLocalScaling = function () {
      return wrapPointer(btCylinderShape_getLocalScaling_0(this.a), h);
    };sb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCylinderShape_calculateLocalInertia_2(c, a, b);
    };sb.prototype.__destroy__ = function () {
      btCylinderShape___destroy___0(this.a);
    };
    function tb() {
      throw "cannot construct a btConvexShape, no constructor in IDL";
    }tb.prototype = Object.create(f.prototype);tb.prototype.constructor = tb;tb.prototype.b = tb;tb.c = {};e.btConvexShape = tb;tb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConvexShape_setLocalScaling_1(b, a);
    };tb.prototype.getLocalScaling = function () {
      return wrapPointer(btConvexShape_getLocalScaling_0(this.a), h);
    };
    tb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btConvexShape_calculateLocalInertia_2(c, a, b);
    };tb.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConvexShape_setMargin_1(b, a);
    };tb.prototype.getMargin = function () {
      return btConvexShape_getMargin_0(this.a);
    };tb.prototype.__destroy__ = function () {
      btConvexShape___destroy___0(this.a);
    };
    function jb() {
      throw "cannot construct a btDispatcher, no constructor in IDL";
    }jb.prototype = Object.create(WrapperObject.prototype);jb.prototype.constructor = jb;jb.prototype.b = jb;jb.c = {};e.btDispatcher = jb;jb.prototype.getNumManifolds = function () {
      return btDispatcher_getNumManifolds_0(this.a);
    };jb.prototype.getManifoldByIndexInternal = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btDispatcher_getManifoldByIndexInternal_1(b, a), ub);
    };jb.prototype.__destroy__ = function () {
      btDispatcher___destroy___0(this.a);
    };
    function y(a, b, c, d, g) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);this.a = void 0 === d ? btGeneric6DofConstraint_btGeneric6DofConstraint_3(a, b, c) : void 0 === g ? btGeneric6DofConstraint_btGeneric6DofConstraint_4(a, b, c, d) : btGeneric6DofConstraint_btGeneric6DofConstraint_5(a, b, c, d, g);getCache(y)[this.a] = this;
    }y.prototype = Object.create(m.prototype);y.prototype.constructor = y;y.prototype.b = y;y.c = {};
    e.btGeneric6DofConstraint = y;y.prototype.setLinearLowerLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofConstraint_setLinearLowerLimit_1(b, a);
    };y.prototype.setLinearUpperLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofConstraint_setLinearUpperLimit_1(b, a);
    };y.prototype.setAngularLowerLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofConstraint_setAngularLowerLimit_1(b, a);
    };
    y.prototype.setAngularUpperLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofConstraint_setAngularUpperLimit_1(b, a);
    };y.prototype.getFrameOffsetA = function () {
      return wrapPointer(btGeneric6DofConstraint_getFrameOffsetA_0(this.a), l);
    };y.prototype.enableFeedback = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofConstraint_enableFeedback_1(b, a);
    };y.prototype.getBreakingImpulseThreshold = function () {
      return btGeneric6DofConstraint_getBreakingImpulseThreshold_0(this.a);
    };
    y.prototype.setBreakingImpulseThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofConstraint_setBreakingImpulseThreshold_1(b, a);
    };y.prototype.getParam = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);return btGeneric6DofConstraint_getParam_2(c, a, b);
    };
    y.prototype.setParam = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btGeneric6DofConstraint_setParam_3(d, a, b, c);
    };y.prototype.__destroy__ = function () {
      btGeneric6DofConstraint___destroy___0(this.a);
    };function wb() {
      throw "cannot construct a btStridingMeshInterface, no constructor in IDL";
    }wb.prototype = Object.create(WrapperObject.prototype);wb.prototype.constructor = wb;wb.prototype.b = wb;wb.c = {};e.btStridingMeshInterface = wb;
    wb.prototype.__destroy__ = function () {
      btStridingMeshInterface___destroy___0(this.a);
    };function xb() {
      throw "cannot construct a btMotionState, no constructor in IDL";
    }xb.prototype = Object.create(WrapperObject.prototype);xb.prototype.constructor = xb;xb.prototype.b = xb;xb.c = {};e.btMotionState = xb;xb.prototype.getWorldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btMotionState_getWorldTransform_1(b, a);
    };
    xb.prototype.setWorldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btMotionState_setWorldTransform_1(b, a);
    };xb.prototype.__destroy__ = function () {
      btMotionState___destroy___0(this.a);
    };function z() {
      throw "cannot construct a ConvexResultCallback, no constructor in IDL";
    }z.prototype = Object.create(WrapperObject.prototype);z.prototype.constructor = z;z.prototype.b = z;z.c = {};e.ConvexResultCallback = z;z.prototype.hasHit = function () {
      return !!ConvexResultCallback_hasHit_0(this.a);
    };
    z.prototype.get_m_collisionFilterGroup = function () {
      return ConvexResultCallback_get_m_collisionFilterGroup_0(this.a);
    };z.prototype.set_m_collisionFilterGroup = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ConvexResultCallback_set_m_collisionFilterGroup_1(b, a);
    };z.prototype.get_m_collisionFilterMask = function () {
      return ConvexResultCallback_get_m_collisionFilterMask_0(this.a);
    };
    z.prototype.set_m_collisionFilterMask = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ConvexResultCallback_set_m_collisionFilterMask_1(b, a);
    };z.prototype.get_m_closestHitFraction = function () {
      return ConvexResultCallback_get_m_closestHitFraction_0(this.a);
    };z.prototype.set_m_closestHitFraction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ConvexResultCallback_set_m_closestHitFraction_1(b, a);
    };z.prototype.__destroy__ = function () {
      ConvexResultCallback___destroy___0(this.a);
    };
    function yb() {
      throw "cannot construct a ContactResultCallback, no constructor in IDL";
    }yb.prototype = Object.create(WrapperObject.prototype);yb.prototype.constructor = yb;yb.prototype.b = yb;yb.c = {};e.ContactResultCallback = yb;
    yb.prototype.addSingleResult = function (a, b, c, d, g, q, t) {
      var ya = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);q && "object" === (typeof q === 'undefined' ? 'undefined' : _typeof(q)) && (q = q.a);t && "object" === (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && (t = t.a);return ContactResultCallback_addSingleResult_7(ya, a, b, c, d, g, q, t);
    };yb.prototype.__destroy__ = function () {
      ContactResultCallback___destroy___0(this.a);
    };
    function A() {
      throw "cannot construct a RayResultCallback, no constructor in IDL";
    }A.prototype = Object.create(WrapperObject.prototype);A.prototype.constructor = A;A.prototype.b = A;A.c = {};e.RayResultCallback = A;A.prototype.hasHit = function () {
      return !!RayResultCallback_hasHit_0(this.a);
    };A.prototype.get_m_collisionFilterGroup = function () {
      return RayResultCallback_get_m_collisionFilterGroup_0(this.a);
    };
    A.prototype.set_m_collisionFilterGroup = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RayResultCallback_set_m_collisionFilterGroup_1(b, a);
    };A.prototype.get_m_collisionFilterMask = function () {
      return RayResultCallback_get_m_collisionFilterMask_0(this.a);
    };A.prototype.set_m_collisionFilterMask = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RayResultCallback_set_m_collisionFilterMask_1(b, a);
    };A.prototype.get_m_closestHitFraction = function () {
      return RayResultCallback_get_m_closestHitFraction_0(this.a);
    };
    A.prototype.set_m_closestHitFraction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RayResultCallback_set_m_closestHitFraction_1(b, a);
    };A.prototype.get_m_collisionObject = function () {
      return wrapPointer(RayResultCallback_get_m_collisionObject_0(this.a), k);
    };A.prototype.set_m_collisionObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RayResultCallback_set_m_collisionObject_1(b, a);
    };A.prototype.__destroy__ = function () {
      RayResultCallback___destroy___0(this.a);
    };
    function zb() {
      throw "cannot construct a btMatrix3x3, no constructor in IDL";
    }zb.prototype = Object.create(WrapperObject.prototype);zb.prototype.constructor = zb;zb.prototype.b = zb;zb.c = {};e.btMatrix3x3 = zb;zb.prototype.setEulerZYX = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btMatrix3x3_setEulerZYX_3(d, a, b, c);
    };zb.prototype.getRotation = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btMatrix3x3_getRotation_1(b, a);
    };
    zb.prototype.getRow = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btMatrix3x3_getRow_1(b, a), h);
    };zb.prototype.__destroy__ = function () {
      btMatrix3x3___destroy___0(this.a);
    };function p() {
      throw "cannot construct a btDispatcherInfo, no constructor in IDL";
    }p.prototype = Object.create(WrapperObject.prototype);p.prototype.constructor = p;p.prototype.b = p;p.c = {};e.btDispatcherInfo = p;p.prototype.get_m_timeStep = function () {
      return btDispatcherInfo_get_m_timeStep_0(this.a);
    };
    p.prototype.set_m_timeStep = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_timeStep_1(b, a);
    };p.prototype.get_m_stepCount = function () {
      return btDispatcherInfo_get_m_stepCount_0(this.a);
    };p.prototype.set_m_stepCount = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_stepCount_1(b, a);
    };p.prototype.get_m_dispatchFunc = function () {
      return btDispatcherInfo_get_m_dispatchFunc_0(this.a);
    };
    p.prototype.set_m_dispatchFunc = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_dispatchFunc_1(b, a);
    };p.prototype.get_m_timeOfImpact = function () {
      return btDispatcherInfo_get_m_timeOfImpact_0(this.a);
    };p.prototype.set_m_timeOfImpact = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_timeOfImpact_1(b, a);
    };p.prototype.get_m_useContinuous = function () {
      return !!btDispatcherInfo_get_m_useContinuous_0(this.a);
    };
    p.prototype.set_m_useContinuous = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_useContinuous_1(b, a);
    };p.prototype.get_m_enableSatConvex = function () {
      return !!btDispatcherInfo_get_m_enableSatConvex_0(this.a);
    };p.prototype.set_m_enableSatConvex = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_enableSatConvex_1(b, a);
    };p.prototype.get_m_enableSPU = function () {
      return !!btDispatcherInfo_get_m_enableSPU_0(this.a);
    };
    p.prototype.set_m_enableSPU = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_enableSPU_1(b, a);
    };p.prototype.get_m_useEpa = function () {
      return !!btDispatcherInfo_get_m_useEpa_0(this.a);
    };p.prototype.set_m_useEpa = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_useEpa_1(b, a);
    };p.prototype.get_m_allowedCcdPenetration = function () {
      return btDispatcherInfo_get_m_allowedCcdPenetration_0(this.a);
    };
    p.prototype.set_m_allowedCcdPenetration = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_allowedCcdPenetration_1(b, a);
    };p.prototype.get_m_useConvexConservativeDistanceUtil = function () {
      return !!btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0(this.a);
    };p.prototype.set_m_useConvexConservativeDistanceUtil = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1(b, a);
    };
    p.prototype.get_m_convexConservativeDistanceThreshold = function () {
      return btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0(this.a);
    };p.prototype.set_m_convexConservativeDistanceThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1(b, a);
    };p.prototype.__destroy__ = function () {
      btDispatcherInfo___destroy___0(this.a);
    };function Ab() {
      this.a = LayaMotionState_LayaMotionState_0();getCache(Ab)[this.a] = this;
    }Ab.prototype = Object.create(xb.prototype);
    Ab.prototype.constructor = Ab;Ab.prototype.b = Ab;Ab.c = {};e.LayaMotionState = Ab;Ab.prototype.getWorldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);LayaMotionState_getWorldTransform_1(b, a);
    };Ab.prototype.setWorldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);LayaMotionState_setWorldTransform_1(b, a);
    };Ab.prototype.setNativeGetWorldTransform = function (a) {
      LayaMotionState_setNativeGetWorldTransform_1(this.a, a);
    };
    Ab.prototype.setNativeSetWorldTransform = function (a) {
      LayaMotionState_setNativeSetWorldTransform_1(this.a, a);
    };Ab.prototype.setRigidbody = function (a) {
      LayaMotionState_setRigidbody_1(this.a, a);
    };Ab.prototype.__destroy__ = function () {
      LayaMotionState___destroy___0(this.a);
    };function B() {
      throw "cannot construct a btWheelInfoConstructionInfo, no constructor in IDL";
    }B.prototype = Object.create(WrapperObject.prototype);B.prototype.constructor = B;B.prototype.b = B;B.c = {};e.btWheelInfoConstructionInfo = B;
    B.prototype.get_m_chassisConnectionCS = function () {
      return wrapPointer(btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0(this.a), h);
    };B.prototype.set_m_chassisConnectionCS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1(b, a);
    };B.prototype.get_m_wheelDirectionCS = function () {
      return wrapPointer(btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0(this.a), h);
    };
    B.prototype.set_m_wheelDirectionCS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1(b, a);
    };B.prototype.get_m_wheelAxleCS = function () {
      return wrapPointer(btWheelInfoConstructionInfo_get_m_wheelAxleCS_0(this.a), h);
    };B.prototype.set_m_wheelAxleCS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_wheelAxleCS_1(b, a);
    };B.prototype.get_m_suspensionRestLength = function () {
      return btWheelInfoConstructionInfo_get_m_suspensionRestLength_0(this.a);
    };
    B.prototype.set_m_suspensionRestLength = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_suspensionRestLength_1(b, a);
    };B.prototype.get_m_maxSuspensionTravelCm = function () {
      return btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0(this.a);
    };B.prototype.set_m_maxSuspensionTravelCm = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1(b, a);
    };B.prototype.get_m_wheelRadius = function () {
      return btWheelInfoConstructionInfo_get_m_wheelRadius_0(this.a);
    };
    B.prototype.set_m_wheelRadius = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_wheelRadius_1(b, a);
    };B.prototype.get_m_suspensionStiffness = function () {
      return btWheelInfoConstructionInfo_get_m_suspensionStiffness_0(this.a);
    };B.prototype.set_m_suspensionStiffness = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_suspensionStiffness_1(b, a);
    };B.prototype.get_m_wheelsDampingCompression = function () {
      return btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0(this.a);
    };
    B.prototype.set_m_wheelsDampingCompression = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1(b, a);
    };B.prototype.get_m_wheelsDampingRelaxation = function () {
      return btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0(this.a);
    };B.prototype.set_m_wheelsDampingRelaxation = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1(b, a);
    };B.prototype.get_m_frictionSlip = function () {
      return btWheelInfoConstructionInfo_get_m_frictionSlip_0(this.a);
    };
    B.prototype.set_m_frictionSlip = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_frictionSlip_1(b, a);
    };B.prototype.get_m_maxSuspensionForce = function () {
      return btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0(this.a);
    };B.prototype.set_m_maxSuspensionForce = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1(b, a);
    };B.prototype.get_m_bIsFrontWheel = function () {
      return !!btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0(this.a);
    };
    B.prototype.set_m_bIsFrontWheel = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1(b, a);
    };B.prototype.__destroy__ = function () {
      btWheelInfoConstructionInfo___destroy___0(this.a);
    };function Bb(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = void 0 === b ? btConvexTriangleMeshShape_btConvexTriangleMeshShape_1(a) : btConvexTriangleMeshShape_btConvexTriangleMeshShape_2(a, b);getCache(Bb)[this.a] = this;
    }Bb.prototype = Object.create(tb.prototype);
    Bb.prototype.constructor = Bb;Bb.prototype.b = Bb;Bb.c = {};e.btConvexTriangleMeshShape = Bb;Bb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConvexTriangleMeshShape_setLocalScaling_1(b, a);
    };Bb.prototype.getLocalScaling = function () {
      return wrapPointer(btConvexTriangleMeshShape_getLocalScaling_0(this.a), h);
    };
    Bb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btConvexTriangleMeshShape_calculateLocalInertia_2(c, a, b);
    };Bb.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConvexTriangleMeshShape_setMargin_1(b, a);
    };Bb.prototype.getMargin = function () {
      return btConvexTriangleMeshShape_getMargin_0(this.a);
    };Bb.prototype.__destroy__ = function () {
      btConvexTriangleMeshShape___destroy___0(this.a);
    };
    function lb() {
      throw "cannot construct a btBroadphaseInterface, no constructor in IDL";
    }lb.prototype = Object.create(WrapperObject.prototype);lb.prototype.constructor = lb;lb.prototype.b = lb;lb.c = {};e.btBroadphaseInterface = lb;lb.prototype.__destroy__ = function () {
      btBroadphaseInterface___destroy___0(this.a);
    };
    function Cb(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = void 0 === a ? btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0() : btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1(a);getCache(Cb)[this.a] = this;
    }Cb.prototype = Object.create(WrapperObject.prototype);Cb.prototype.constructor = Cb;Cb.prototype.b = Cb;Cb.c = {};e.btDefaultCollisionConfiguration = Cb;Cb.prototype.__destroy__ = function () {
      btDefaultCollisionConfiguration___destroy___0(this.a);
    };
    function C(a, b, c, d) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);this.a = void 0 === d ? btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3(a, b, c) : btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4(a, b, c, d);getCache(C)[this.a] = this;
    }C.prototype = Object.create(WrapperObject.prototype);C.prototype.constructor = C;C.prototype.b = C;C.c = {};e.btRigidBodyConstructionInfo = C;C.prototype.get_m_linearDamping = function () {
      return btRigidBodyConstructionInfo_get_m_linearDamping_0(this.a);
    };
    C.prototype.set_m_linearDamping = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_linearDamping_1(b, a);
    };C.prototype.get_m_angularDamping = function () {
      return btRigidBodyConstructionInfo_get_m_angularDamping_0(this.a);
    };C.prototype.set_m_angularDamping = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_angularDamping_1(b, a);
    };C.prototype.get_m_friction = function () {
      return btRigidBodyConstructionInfo_get_m_friction_0(this.a);
    };
    C.prototype.set_m_friction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_friction_1(b, a);
    };C.prototype.get_m_rollingFriction = function () {
      return btRigidBodyConstructionInfo_get_m_rollingFriction_0(this.a);
    };C.prototype.set_m_rollingFriction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_rollingFriction_1(b, a);
    };C.prototype.get_m_restitution = function () {
      return btRigidBodyConstructionInfo_get_m_restitution_0(this.a);
    };
    C.prototype.set_m_restitution = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_restitution_1(b, a);
    };C.prototype.get_m_linearSleepingThreshold = function () {
      return btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0(this.a);
    };C.prototype.set_m_linearSleepingThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1(b, a);
    };C.prototype.get_m_angularSleepingThreshold = function () {
      return btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0(this.a);
    };
    C.prototype.set_m_angularSleepingThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1(b, a);
    };C.prototype.get_m_additionalDamping = function () {
      return !!btRigidBodyConstructionInfo_get_m_additionalDamping_0(this.a);
    };C.prototype.set_m_additionalDamping = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_additionalDamping_1(b, a);
    };C.prototype.get_m_additionalDampingFactor = function () {
      return btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0(this.a);
    };
    C.prototype.set_m_additionalDampingFactor = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1(b, a);
    };C.prototype.get_m_additionalLinearDampingThresholdSqr = function () {
      return btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0(this.a);
    };
    C.prototype.set_m_additionalLinearDampingThresholdSqr = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1(b, a);
    };C.prototype.get_m_additionalAngularDampingThresholdSqr = function () {
      return btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0(this.a);
    };
    C.prototype.set_m_additionalAngularDampingThresholdSqr = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1(b, a);
    };C.prototype.get_m_additionalAngularDampingFactor = function () {
      return btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0(this.a);
    };
    C.prototype.set_m_additionalAngularDampingFactor = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1(b, a);
    };C.prototype.__destroy__ = function () {
      btRigidBodyConstructionInfo___destroy___0(this.a);
    };function Db() {
      throw "cannot construct a btCollisionConfiguration, no constructor in IDL";
    }Db.prototype = Object.create(WrapperObject.prototype);Db.prototype.constructor = Db;Db.prototype.b = Db;Db.c = {};e.btCollisionConfiguration = Db;
    Db.prototype.__destroy__ = function () {
      btCollisionConfiguration___destroy___0(this.a);
    };function ub() {
      this.a = btPersistentManifold_btPersistentManifold_0();getCache(ub)[this.a] = this;
    }ub.prototype = Object.create(WrapperObject.prototype);ub.prototype.constructor = ub;ub.prototype.b = ub;ub.c = {};e.btPersistentManifold = ub;ub.prototype.getBody0 = function () {
      return wrapPointer(btPersistentManifold_getBody0_0(this.a), k);
    };ub.prototype.getBody1 = function () {
      return wrapPointer(btPersistentManifold_getBody1_0(this.a), k);
    };
    ub.prototype.getNumContacts = function () {
      return btPersistentManifold_getNumContacts_0(this.a);
    };ub.prototype.getContactPoint = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btPersistentManifold_getContactPoint_1(b, a), D);
    };ub.prototype.__destroy__ = function () {
      btPersistentManifold___destroy___0(this.a);
    };function E(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = void 0 === a ? btCompoundShape_btCompoundShape_0() : btCompoundShape_btCompoundShape_1(a);getCache(E)[this.a] = this;
    }E.prototype = Object.create(f.prototype);
    E.prototype.constructor = E;E.prototype.b = E;E.c = {};e.btCompoundShape = E;E.prototype.addChildShape = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCompoundShape_addChildShape_2(c, a, b);
    };E.prototype.removeChildShapeByIndex = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCompoundShape_removeChildShapeByIndex_1(b, a);
    };E.prototype.getNumChildShapes = function () {
      return btCompoundShape_getNumChildShapes_0(this.a);
    };
    E.prototype.getChildShape = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btCompoundShape_getChildShape_1(b, a), f);
    };E.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCompoundShape_setMargin_1(b, a);
    };E.prototype.getMargin = function () {
      return btCompoundShape_getMargin_0(this.a);
    };
    E.prototype.updateChildTransform = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);void 0 === c ? btCompoundShape_updateChildTransform_2(d, a, b) : btCompoundShape_updateChildTransform_3(d, a, b, c);
    };E.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCompoundShape_setLocalScaling_1(b, a);
    };E.prototype.getLocalScaling = function () {
      return wrapPointer(btCompoundShape_getLocalScaling_0(this.a), h);
    };
    E.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCompoundShape_calculateLocalInertia_2(c, a, b);
    };E.prototype.__destroy__ = function () {
      btCompoundShape___destroy___0(this.a);
    };function F(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = ClosestConvexResultCallback_ClosestConvexResultCallback_2(a, b);getCache(F)[this.a] = this;
    }F.prototype = Object.create(z.prototype);F.prototype.constructor = F;
    F.prototype.b = F;F.c = {};e.ClosestConvexResultCallback = F;F.prototype.hasHit = function () {
      return !!ClosestConvexResultCallback_hasHit_0(this.a);
    };F.prototype.get_m_convexFromWorld = function () {
      return wrapPointer(ClosestConvexResultCallback_get_m_convexFromWorld_0(this.a), h);
    };F.prototype.set_m_convexFromWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestConvexResultCallback_set_m_convexFromWorld_1(b, a);
    };
    F.prototype.get_m_convexToWorld = function () {
      return wrapPointer(ClosestConvexResultCallback_get_m_convexToWorld_0(this.a), h);
    };F.prototype.set_m_convexToWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestConvexResultCallback_set_m_convexToWorld_1(b, a);
    };F.prototype.get_m_hitNormalWorld = function () {
      return wrapPointer(ClosestConvexResultCallback_get_m_hitNormalWorld_0(this.a), h);
    };
    F.prototype.set_m_hitNormalWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestConvexResultCallback_set_m_hitNormalWorld_1(b, a);
    };F.prototype.get_m_hitPointWorld = function () {
      return wrapPointer(ClosestConvexResultCallback_get_m_hitPointWorld_0(this.a), h);
    };F.prototype.set_m_hitPointWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestConvexResultCallback_set_m_hitPointWorld_1(b, a);
    };
    F.prototype.get_m_hitCollisionObject = function () {
      return wrapPointer(ClosestConvexResultCallback_get_m_hitCollisionObject_0(this.a), k);
    };F.prototype.set_m_hitCollisionObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestConvexResultCallback_set_m_hitCollisionObject_1(b, a);
    };F.prototype.get_m_collisionFilterGroup = function () {
      return ClosestConvexResultCallback_get_m_collisionFilterGroup_0(this.a);
    };
    F.prototype.set_m_collisionFilterGroup = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestConvexResultCallback_set_m_collisionFilterGroup_1(b, a);
    };F.prototype.get_m_collisionFilterMask = function () {
      return ClosestConvexResultCallback_get_m_collisionFilterMask_0(this.a);
    };F.prototype.set_m_collisionFilterMask = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestConvexResultCallback_set_m_collisionFilterMask_1(b, a);
    };F.prototype.get_m_closestHitFraction = function () {
      return ClosestConvexResultCallback_get_m_closestHitFraction_0(this.a);
    };
    F.prototype.set_m_closestHitFraction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestConvexResultCallback_set_m_closestHitFraction_1(b, a);
    };F.prototype.__destroy__ = function () {
      ClosestConvexResultCallback___destroy___0(this.a);
    };function G(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = AllHitsRayResultCallback_AllHitsRayResultCallback_2(a, b);getCache(G)[this.a] = this;
    }G.prototype = Object.create(A.prototype);G.prototype.constructor = G;G.prototype.b = G;G.c = {};
    e.AllHitsRayResultCallback = G;G.prototype.hasHit = function () {
      return !!AllHitsRayResultCallback_hasHit_0(this.a);
    };G.prototype.get_m_collisionObjects = function () {
      return wrapPointer(AllHitsRayResultCallback_get_m_collisionObjects_0(this.a), Eb);
    };G.prototype.set_m_collisionObjects = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllHitsRayResultCallback_set_m_collisionObjects_1(b, a);
    };
    G.prototype.get_m_rayFromWorld = function () {
      return wrapPointer(AllHitsRayResultCallback_get_m_rayFromWorld_0(this.a), h);
    };G.prototype.set_m_rayFromWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllHitsRayResultCallback_set_m_rayFromWorld_1(b, a);
    };G.prototype.get_m_rayToWorld = function () {
      return wrapPointer(AllHitsRayResultCallback_get_m_rayToWorld_0(this.a), h);
    };
    G.prototype.set_m_rayToWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllHitsRayResultCallback_set_m_rayToWorld_1(b, a);
    };G.prototype.get_m_hitNormalWorld = function () {
      return wrapPointer(AllHitsRayResultCallback_get_m_hitNormalWorld_0(this.a), H);
    };G.prototype.set_m_hitNormalWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllHitsRayResultCallback_set_m_hitNormalWorld_1(b, a);
    };
    G.prototype.get_m_hitPointWorld = function () {
      return wrapPointer(AllHitsRayResultCallback_get_m_hitPointWorld_0(this.a), H);
    };G.prototype.set_m_hitPointWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllHitsRayResultCallback_set_m_hitPointWorld_1(b, a);
    };G.prototype.get_m_hitFractions = function () {
      return wrapPointer(AllHitsRayResultCallback_get_m_hitFractions_0(this.a), Fb);
    };
    G.prototype.set_m_hitFractions = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllHitsRayResultCallback_set_m_hitFractions_1(b, a);
    };G.prototype.get_m_collisionFilterGroup = function () {
      return AllHitsRayResultCallback_get_m_collisionFilterGroup_0(this.a);
    };G.prototype.set_m_collisionFilterGroup = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllHitsRayResultCallback_set_m_collisionFilterGroup_1(b, a);
    };G.prototype.get_m_collisionFilterMask = function () {
      return AllHitsRayResultCallback_get_m_collisionFilterMask_0(this.a);
    };
    G.prototype.set_m_collisionFilterMask = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllHitsRayResultCallback_set_m_collisionFilterMask_1(b, a);
    };G.prototype.get_m_closestHitFraction = function () {
      return AllHitsRayResultCallback_get_m_closestHitFraction_0(this.a);
    };G.prototype.set_m_closestHitFraction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllHitsRayResultCallback_set_m_closestHitFraction_1(b, a);
    };
    G.prototype.get_m_collisionObject = function () {
      return wrapPointer(AllHitsRayResultCallback_get_m_collisionObject_0(this.a), k);
    };G.prototype.set_m_collisionObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllHitsRayResultCallback_set_m_collisionObject_1(b, a);
    };G.prototype.__destroy__ = function () {
      AllHitsRayResultCallback___destroy___0(this.a);
    };function Gb(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1(a);getCache(Gb)[this.a] = this;
    }
    Gb.prototype = Object.create(rb.prototype);Gb.prototype.constructor = Gb;Gb.prototype.b = Gb;Gb.c = {};e.btDefaultVehicleRaycaster = Gb;Gb.prototype.castRay = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btDefaultVehicleRaycaster_castRay_3(d, a, b, c);
    };Gb.prototype.__destroy__ = function () {
      btDefaultVehicleRaycaster___destroy___0(this.a);
    };function Hb() {
      this.a = btConstraintSetting_btConstraintSetting_0();getCache(Hb)[this.a] = this;
    }
    Hb.prototype = Object.create(WrapperObject.prototype);Hb.prototype.constructor = Hb;Hb.prototype.b = Hb;Hb.c = {};e.btConstraintSetting = Hb;Hb.prototype.get_m_tau = function () {
      return btConstraintSetting_get_m_tau_0(this.a);
    };Hb.prototype.set_m_tau = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConstraintSetting_set_m_tau_1(b, a);
    };Hb.prototype.get_m_damping = function () {
      return btConstraintSetting_get_m_damping_0(this.a);
    };
    Hb.prototype.set_m_damping = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConstraintSetting_set_m_damping_1(b, a);
    };Hb.prototype.get_m_impulseClamp = function () {
      return btConstraintSetting_get_m_impulseClamp_0(this.a);
    };Hb.prototype.set_m_impulseClamp = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConstraintSetting_set_m_impulseClamp_1(b, a);
    };Hb.prototype.__destroy__ = function () {
      btConstraintSetting___destroy___0(this.a);
    };
    function Ib() {
      throw "cannot construct a LocalShapeInfo, no constructor in IDL";
    }Ib.prototype = Object.create(WrapperObject.prototype);Ib.prototype.constructor = Ib;Ib.prototype.b = Ib;Ib.c = {};e.LocalShapeInfo = Ib;Ib.prototype.get_m_shapePart = function () {
      return LocalShapeInfo_get_m_shapePart_0(this.a);
    };Ib.prototype.set_m_shapePart = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);LocalShapeInfo_set_m_shapePart_1(b, a);
    };Ib.prototype.get_m_triangleIndex = function () {
      return LocalShapeInfo_get_m_triangleIndex_0(this.a);
    };
    Ib.prototype.set_m_triangleIndex = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);LocalShapeInfo_set_m_triangleIndex_1(b, a);
    };Ib.prototype.__destroy__ = function () {
      LocalShapeInfo___destroy___0(this.a);
    };function I(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = btRigidBody_btRigidBody_1(a);getCache(I)[this.a] = this;
    }I.prototype = Object.create(k.prototype);I.prototype.constructor = I;I.prototype.b = I;I.c = {};e.btRigidBody = I;
    I.prototype.getCenterOfMassTransform = function () {
      return wrapPointer(btRigidBody_getCenterOfMassTransform_0(this.a), l);
    };I.prototype.setCenterOfMassTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setCenterOfMassTransform_1(b, a);
    };I.prototype.setSleepingThresholds = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRigidBody_setSleepingThresholds_2(c, a, b);
    };I.prototype.getLinearSleepingThreshold = function () {
      return btRigidBody_getLinearSleepingThreshold_0(this.a);
    };
    I.prototype.getAngularSleepingThreshold = function () {
      return btRigidBody_getAngularSleepingThreshold_0(this.a);
    };I.prototype.setDamping = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRigidBody_setDamping_2(c, a, b);
    };I.prototype.setMassProps = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRigidBody_setMassProps_2(c, a, b);
    };
    I.prototype.setLinearFactor = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setLinearFactor_1(b, a);
    };I.prototype.applyTorque = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_applyTorque_1(b, a);
    };I.prototype.applyForce = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRigidBody_applyForce_2(c, a, b);
    };
    I.prototype.applyCentralForce = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_applyCentralForce_1(b, a);
    };I.prototype.applyTorqueImpulse = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_applyTorqueImpulse_1(b, a);
    };I.prototype.applyImpulse = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRigidBody_applyImpulse_2(c, a, b);
    };
    I.prototype.applyCentralImpulse = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_applyCentralImpulse_1(b, a);
    };I.prototype.updateInertiaTensor = function () {
      btRigidBody_updateInertiaTensor_0(this.a);
    };I.prototype.getLinearVelocity = function () {
      return wrapPointer(btRigidBody_getLinearVelocity_0(this.a), h);
    };I.prototype.getAngularVelocity = function () {
      return wrapPointer(btRigidBody_getAngularVelocity_0(this.a), h);
    };
    I.prototype.setLinearVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setLinearVelocity_1(b, a);
    };I.prototype.setAngularVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setAngularVelocity_1(b, a);
    };I.prototype.getMotionState = function () {
      return wrapPointer(btRigidBody_getMotionState_0(this.a), xb);
    };I.prototype.setMotionState = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setMotionState_1(b, a);
    };
    I.prototype.setAngularFactor = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setAngularFactor_1(b, a);
    };I.prototype.upcast = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btRigidBody_upcast_1(b, a), I);
    };I.prototype.getAabb = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRigidBody_getAabb_2(c, a, b);
    };I.prototype.applyGravity = function () {
      btRigidBody_applyGravity_0(this.a);
    };
    I.prototype.getGravity = function () {
      return wrapPointer(btRigidBody_getGravity_0(this.a), h);
    };I.prototype.setGravity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setGravity_1(b, a);
    };I.prototype.getTotalForce = function () {
      return wrapPointer(btRigidBody_getTotalForce_0(this.a), h);
    };I.prototype.getTotalTorque = function () {
      return wrapPointer(btRigidBody_getTotalTorque_0(this.a), h);
    };I.prototype.getFlags = function () {
      return btRigidBody_getFlags_0(this.a);
    };
    I.prototype.setFlags = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setFlags_1(b, a);
    };I.prototype.clearForces = function () {
      btRigidBody_clearForces_0(this.a);
    };I.prototype.setAnisotropicFriction = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRigidBody_setAnisotropicFriction_2(c, a, b);
    };I.prototype.getCollisionShape = function () {
      return wrapPointer(btRigidBody_getCollisionShape_0(this.a), f);
    };
    I.prototype.setContactProcessingThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setContactProcessingThreshold_1(b, a);
    };I.prototype.setActivationState = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setActivationState_1(b, a);
    };I.prototype.forceActivationState = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_forceActivationState_1(b, a);
    };
    I.prototype.activate = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);void 0 === a ? btRigidBody_activate_0(b) : btRigidBody_activate_1(b, a);
    };I.prototype.isActive = function () {
      return !!btRigidBody_isActive_0(this.a);
    };I.prototype.isKinematicObject = function () {
      return !!btRigidBody_isKinematicObject_0(this.a);
    };I.prototype.isStaticObject = function () {
      return !!btRigidBody_isStaticObject_0(this.a);
    };I.prototype.isStaticOrKinematicObject = function () {
      return !!btRigidBody_isStaticOrKinematicObject_0(this.a);
    };
    I.prototype.getRestitution = function () {
      return btRigidBody_getRestitution_0(this.a);
    };I.prototype.setRestitution = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setRestitution_1(b, a);
    };I.prototype.getFriction = function () {
      return btRigidBody_getFriction_0(this.a);
    };I.prototype.setFriction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setFriction_1(b, a);
    };I.prototype.getRollingFriction = function () {
      return btRigidBody_getRollingFriction_0(this.a);
    };
    I.prototype.setRollingFriction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setRollingFriction_1(b, a);
    };I.prototype.getCollisionFlags = function () {
      return btRigidBody_getCollisionFlags_0(this.a);
    };I.prototype.setCollisionFlags = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setCollisionFlags_1(b, a);
    };I.prototype.getWorldTransform = function () {
      return wrapPointer(btRigidBody_getWorldTransform_0(this.a), l);
    };
    I.prototype.setWorldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setWorldTransform_1(b, a);
    };I.prototype.setCollisionShape = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setCollisionShape_1(b, a);
    };I.prototype.getCcdMotionThreshold = function () {
      return btRigidBody_getCcdMotionThreshold_0(this.a);
    };I.prototype.setCcdMotionThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setCcdMotionThreshold_1(b, a);
    };
    I.prototype.getCcdSweptSphereRadius = function () {
      return btRigidBody_getCcdSweptSphereRadius_0(this.a);
    };I.prototype.setCcdSweptSphereRadius = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setCcdSweptSphereRadius_1(b, a);
    };I.prototype.getUserIndex = function () {
      return btRigidBody_getUserIndex_0(this.a);
    };I.prototype.setUserIndex = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setUserIndex_1(b, a);
    };
    I.prototype.getUserPointer = function () {
      return wrapPointer(btRigidBody_getUserPointer_0(this.a), VoidPtr);
    };I.prototype.setUserPointer = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setUserPointer_1(b, a);
    };I.prototype.getInterpolationAngularVelocity = function () {
      return wrapPointer(btRigidBody_getInterpolationAngularVelocity_0(this.a), h);
    };
    I.prototype.setInterpolationAngularVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setInterpolationAngularVelocity_1(b, a);
    };I.prototype.getInterpolationLinearVelocity = function () {
      return wrapPointer(btRigidBody_getInterpolationLinearVelocity_0(this.a), h);
    };I.prototype.setInterpolationLinearVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRigidBody_setInterpolationLinearVelocity_1(b, a);
    };
    I.prototype.getBroadphaseHandle = function () {
      return wrapPointer(btRigidBody_getBroadphaseHandle_0(this.a), ib);
    };I.prototype.getActivationState = function () {
      return btRigidBody_getActivationState_0(this.a);
    };I.prototype.__destroy__ = function () {
      btRigidBody___destroy___0(this.a);
    };function Jb() {
      this.a = btDbvtBroadphase_btDbvtBroadphase_0();getCache(Jb)[this.a] = this;
    }Jb.prototype = Object.create(WrapperObject.prototype);Jb.prototype.constructor = Jb;Jb.prototype.b = Jb;Jb.c = {};e.btDbvtBroadphase = Jb;
    Jb.prototype.getOverlappingPairCache = function () {
      return wrapPointer(btDbvtBroadphase_getOverlappingPairCache_0(this.a), kb);
    };Jb.prototype.__destroy__ = function () {
      btDbvtBroadphase___destroy___0(this.a);
    };function Kb(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = btCollisionDispatcher_btCollisionDispatcher_1(a);getCache(Kb)[this.a] = this;
    }Kb.prototype = Object.create(jb.prototype);Kb.prototype.constructor = Kb;Kb.prototype.b = Kb;Kb.c = {};e.btCollisionDispatcher = Kb;Kb.prototype.getNumManifolds = function () {
      return btCollisionDispatcher_getNumManifolds_0(this.a);
    };
    Kb.prototype.getManifoldByIndexInternal = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btCollisionDispatcher_getManifoldByIndexInternal_1(b, a), ub);
    };Kb.prototype.__destroy__ = function () {
      btCollisionDispatcher___destroy___0(this.a);
    };
    function Lb(a, b, c, d, g) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);this.a = void 0 === c ? btAxisSweep3_btAxisSweep3_2(a, b) : void 0 === d ? btAxisSweep3_btAxisSweep3_3(a, b, c) : void 0 === g ? btAxisSweep3_btAxisSweep3_4(a, b, c, d) : btAxisSweep3_btAxisSweep3_5(a, b, c, d, g);getCache(Lb)[this.a] = this;
    }Lb.prototype = Object.create(WrapperObject.prototype);Lb.prototype.constructor = Lb;Lb.prototype.b = Lb;Lb.c = {};
    e.btAxisSweep3 = Lb;Lb.prototype.__destroy__ = function () {
      btAxisSweep3___destroy___0(this.a);
    };function VoidPtr() {
      throw "cannot construct a VoidPtr, no constructor in IDL";
    }VoidPtr.prototype = Object.create(WrapperObject.prototype);VoidPtr.prototype.constructor = VoidPtr;VoidPtr.prototype.b = VoidPtr;VoidPtr.c = {};e.VoidPtr = VoidPtr;VoidPtr.prototype.__destroy__ = function () {
      VoidPtr___destroy___0(this.a);
    };
    function J(a, b, c, d) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);this.a = void 0 === c ? btConeTwistConstraint_btConeTwistConstraint_2(a, b) : void 0 === d ? btConeTwistConstraint_btConeTwistConstraint_3(a, b, c) : btConeTwistConstraint_btConeTwistConstraint_4(a, b, c, d);getCache(J)[this.a] = this;
    }J.prototype = Object.create(m.prototype);J.prototype.constructor = J;J.prototype.b = J;J.c = {};e.btConeTwistConstraint = J;
    J.prototype.setLimit = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btConeTwistConstraint_setLimit_2(c, a, b);
    };J.prototype.setAngularOnly = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeTwistConstraint_setAngularOnly_1(b, a);
    };J.prototype.setDamping = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeTwistConstraint_setDamping_1(b, a);
    };
    J.prototype.enableMotor = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeTwistConstraint_enableMotor_1(b, a);
    };J.prototype.setMaxMotorImpulse = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeTwistConstraint_setMaxMotorImpulse_1(b, a);
    };J.prototype.setMaxMotorImpulseNormalized = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeTwistConstraint_setMaxMotorImpulseNormalized_1(b, a);
    };
    J.prototype.setMotorTarget = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeTwistConstraint_setMotorTarget_1(b, a);
    };J.prototype.setMotorTargetInConstraintSpace = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeTwistConstraint_setMotorTargetInConstraintSpace_1(b, a);
    };J.prototype.enableFeedback = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeTwistConstraint_enableFeedback_1(b, a);
    };J.prototype.getBreakingImpulseThreshold = function () {
      return btConeTwistConstraint_getBreakingImpulseThreshold_0(this.a);
    };
    J.prototype.setBreakingImpulseThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeTwistConstraint_setBreakingImpulseThreshold_1(b, a);
    };J.prototype.getParam = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);return btConeTwistConstraint_getParam_2(c, a, b);
    };J.prototype.setParam = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btConeTwistConstraint_setParam_3(d, a, b, c);
    };
    J.prototype.__destroy__ = function () {
      btConeTwistConstraint___destroy___0(this.a);
    };
    function K(a, b, c, d, g, q, t) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);q && "object" === (typeof q === 'undefined' ? 'undefined' : _typeof(q)) && (q = q.a);t && "object" === (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && (t = t.a);this.a = void 0 === c ? btHingeConstraint_btHingeConstraint_2(a, b) : void 0 === d ? btHingeConstraint_btHingeConstraint_3(a, b, c) : void 0 === g ? btHingeConstraint_btHingeConstraint_4(a, b, c, d) : void 0 === q ? btHingeConstraint_btHingeConstraint_5(a, b, c, d, g) : void 0 === t ? btHingeConstraint_btHingeConstraint_6(a, b, c, d, g, q) : btHingeConstraint_btHingeConstraint_7(a, b, c, d, g, q, t);getCache(K)[this.a] = this;
    }K.prototype = Object.create(m.prototype);K.prototype.constructor = K;K.prototype.b = K;K.c = {};e.btHingeConstraint = K;
    K.prototype.setLimit = function (a, b, c, d, g) {
      var q = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);void 0 === g ? btHingeConstraint_setLimit_4(q, a, b, c, d) : btHingeConstraint_setLimit_5(q, a, b, c, d, g);
    };
    K.prototype.enableAngularMotor = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btHingeConstraint_enableAngularMotor_3(d, a, b, c);
    };K.prototype.setAngularOnly = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btHingeConstraint_setAngularOnly_1(b, a);
    };K.prototype.enableMotor = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btHingeConstraint_enableMotor_1(b, a);
    };
    K.prototype.setMaxMotorImpulse = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btHingeConstraint_setMaxMotorImpulse_1(b, a);
    };K.prototype.setMotorTarget = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btHingeConstraint_setMotorTarget_2(c, a, b);
    };K.prototype.enableFeedback = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btHingeConstraint_enableFeedback_1(b, a);
    };K.prototype.getBreakingImpulseThreshold = function () {
      return btHingeConstraint_getBreakingImpulseThreshold_0(this.a);
    };
    K.prototype.setBreakingImpulseThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btHingeConstraint_setBreakingImpulseThreshold_1(b, a);
    };K.prototype.getParam = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);return btHingeConstraint_getParam_2(c, a, b);
    };K.prototype.setParam = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btHingeConstraint_setParam_3(d, a, b, c);
    };
    K.prototype.__destroy__ = function () {
      btHingeConstraint___destroy___0(this.a);
    };function Mb() {
      throw "cannot construct a JSValueAsParam, no constructor in IDL";
    }Mb.prototype = Object.create(WrapperObject.prototype);Mb.prototype.constructor = Mb;Mb.prototype.b = Mb;Mb.c = {};e.JSValueAsParam = Mb;function Nb(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = btConeShapeZ_btConeShapeZ_2(a, b);getCache(Nb)[this.a] = this;
    }Nb.prototype = Object.create(pb.prototype);Nb.prototype.constructor = Nb;
    Nb.prototype.b = Nb;Nb.c = {};e.btConeShapeZ = Nb;Nb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeShapeZ_setLocalScaling_1(b, a);
    };Nb.prototype.getLocalScaling = function () {
      return wrapPointer(btConeShapeZ_getLocalScaling_0(this.a), h);
    };Nb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btConeShapeZ_calculateLocalInertia_2(c, a, b);
    };Nb.prototype.__destroy__ = function () {
      btConeShapeZ___destroy___0(this.a);
    };
    function Ob(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = btConeShapeX_btConeShapeX_2(a, b);getCache(Ob)[this.a] = this;
    }Ob.prototype = Object.create(pb.prototype);Ob.prototype.constructor = Ob;Ob.prototype.b = Ob;Ob.c = {};e.btConeShapeX = Ob;Ob.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConeShapeX_setLocalScaling_1(b, a);
    };Ob.prototype.getLocalScaling = function () {
      return wrapPointer(btConeShapeX_getLocalScaling_0(this.a), h);
    };
    Ob.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btConeShapeX_calculateLocalInertia_2(c, a, b);
    };Ob.prototype.__destroy__ = function () {
      btConeShapeX___destroy___0(this.a);
    };function Pb(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = void 0 === a ? btTriangleMesh_btTriangleMesh_0() : void 0 === b ? btTriangleMesh_btTriangleMesh_1(a) : btTriangleMesh_btTriangleMesh_2(a, b);getCache(Pb)[this.a] = this;
    }Pb.prototype = Object.create(wb.prototype);
    Pb.prototype.constructor = Pb;Pb.prototype.b = Pb;Pb.c = {};e.btTriangleMesh = Pb;Pb.prototype.addTriangle = function (a, b, c, d) {
      var g = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);void 0 === d ? btTriangleMesh_addTriangle_3(g, a, b, c) : btTriangleMesh_addTriangle_4(g, a, b, c, d);
    };Pb.prototype.__destroy__ = function () {
      btTriangleMesh___destroy___0(this.a);
    };
    function Qb() {
      this.a = btConvexHullShape_btConvexHullShape_0();getCache(Qb)[this.a] = this;
    }Qb.prototype = Object.create(f.prototype);Qb.prototype.constructor = Qb;Qb.prototype.b = Qb;Qb.c = {};e.btConvexHullShape = Qb;Qb.prototype.addPoint = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);void 0 === b ? btConvexHullShape_addPoint_1(c, a) : btConvexHullShape_addPoint_2(c, a, b);
    };
    Qb.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConvexHullShape_setMargin_1(b, a);
    };Qb.prototype.getMargin = function () {
      return btConvexHullShape_getMargin_0(this.a);
    };Qb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btConvexHullShape_setLocalScaling_1(b, a);
    };Qb.prototype.getLocalScaling = function () {
      return wrapPointer(btConvexHullShape_getLocalScaling_0(this.a), h);
    };
    Qb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btConvexHullShape_calculateLocalInertia_2(c, a, b);
    };Qb.prototype.__destroy__ = function () {
      btConvexHullShape___destroy___0(this.a);
    };function L() {
      this.a = btVehicleTuning_btVehicleTuning_0();getCache(L)[this.a] = this;
    }L.prototype = Object.create(WrapperObject.prototype);L.prototype.constructor = L;L.prototype.b = L;L.c = {};e.btVehicleTuning = L;L.prototype.get_m_suspensionStiffness = function () {
      return btVehicleTuning_get_m_suspensionStiffness_0(this.a);
    };
    L.prototype.set_m_suspensionStiffness = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVehicleTuning_set_m_suspensionStiffness_1(b, a);
    };L.prototype.get_m_suspensionCompression = function () {
      return btVehicleTuning_get_m_suspensionCompression_0(this.a);
    };L.prototype.set_m_suspensionCompression = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVehicleTuning_set_m_suspensionCompression_1(b, a);
    };L.prototype.get_m_suspensionDamping = function () {
      return btVehicleTuning_get_m_suspensionDamping_0(this.a);
    };
    L.prototype.set_m_suspensionDamping = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVehicleTuning_set_m_suspensionDamping_1(b, a);
    };L.prototype.get_m_maxSuspensionTravelCm = function () {
      return btVehicleTuning_get_m_maxSuspensionTravelCm_0(this.a);
    };L.prototype.set_m_maxSuspensionTravelCm = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVehicleTuning_set_m_maxSuspensionTravelCm_1(b, a);
    };L.prototype.get_m_frictionSlip = function () {
      return btVehicleTuning_get_m_frictionSlip_0(this.a);
    };
    L.prototype.set_m_frictionSlip = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVehicleTuning_set_m_frictionSlip_1(b, a);
    };L.prototype.get_m_maxSuspensionForce = function () {
      return btVehicleTuning_get_m_maxSuspensionForce_0(this.a);
    };L.prototype.set_m_maxSuspensionForce = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVehicleTuning_set_m_maxSuspensionForce_1(b, a);
    };function Rb() {
      throw "cannot construct a btCollisionObjectWrapper, no constructor in IDL";
    }Rb.prototype = Object.create(WrapperObject.prototype);
    Rb.prototype.constructor = Rb;Rb.prototype.b = Rb;Rb.c = {};e.btCollisionObjectWrapper = Rb;function Sb(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = btGImpactMeshShape_btGImpactMeshShape_1(a);getCache(Sb)[this.a] = this;
    }Sb.prototype = Object.create(nb.prototype);Sb.prototype.constructor = Sb;Sb.prototype.b = Sb;Sb.c = {};e.btGImpactMeshShape = Sb;Sb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGImpactMeshShape_setLocalScaling_1(b, a);
    };
    Sb.prototype.getLocalScaling = function () {
      return wrapPointer(btGImpactMeshShape_getLocalScaling_0(this.a), h);
    };Sb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btGImpactMeshShape_calculateLocalInertia_2(c, a, b);
    };Sb.prototype.updateBound = function () {
      btGImpactMeshShape_updateBound_0(this.a);
    };Sb.prototype.__destroy__ = function () {
      btGImpactMeshShape___destroy___0(this.a);
    };
    function Tb(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = void 0 === a ? btDefaultMotionState_btDefaultMotionState_0() : void 0 === b ? btDefaultMotionState_btDefaultMotionState_1(a) : btDefaultMotionState_btDefaultMotionState_2(a, b);getCache(Tb)[this.a] = this;
    }Tb.prototype = Object.create(xb.prototype);Tb.prototype.constructor = Tb;Tb.prototype.b = Tb;Tb.c = {};e.btDefaultMotionState = Tb;
    Tb.prototype.getWorldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDefaultMotionState_getWorldTransform_1(b, a);
    };Tb.prototype.setWorldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDefaultMotionState_setWorldTransform_1(b, a);
    };Tb.prototype.get_m_graphicsWorldTrans = function () {
      return wrapPointer(btDefaultMotionState_get_m_graphicsWorldTrans_0(this.a), l);
    };
    Tb.prototype.set_m_graphicsWorldTrans = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDefaultMotionState_set_m_graphicsWorldTrans_1(b, a);
    };Tb.prototype.__destroy__ = function () {
      btDefaultMotionState___destroy___0(this.a);
    };function M(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = btWheelInfo_btWheelInfo_1(a);getCache(M)[this.a] = this;
    }M.prototype = Object.create(WrapperObject.prototype);M.prototype.constructor = M;M.prototype.b = M;M.c = {};e.btWheelInfo = M;M.prototype.getSuspensionRestLength = function () {
      return btWheelInfo_getSuspensionRestLength_0(this.a);
    };
    M.prototype.updateWheel = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btWheelInfo_updateWheel_2(c, a, b);
    };M.prototype.get_m_suspensionStiffness = function () {
      return btWheelInfo_get_m_suspensionStiffness_0(this.a);
    };M.prototype.set_m_suspensionStiffness = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_suspensionStiffness_1(b, a);
    };M.prototype.get_m_frictionSlip = function () {
      return btWheelInfo_get_m_frictionSlip_0(this.a);
    };
    M.prototype.set_m_frictionSlip = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_frictionSlip_1(b, a);
    };M.prototype.get_m_engineForce = function () {
      return btWheelInfo_get_m_engineForce_0(this.a);
    };M.prototype.set_m_engineForce = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_engineForce_1(b, a);
    };M.prototype.get_m_rollInfluence = function () {
      return btWheelInfo_get_m_rollInfluence_0(this.a);
    };
    M.prototype.set_m_rollInfluence = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_rollInfluence_1(b, a);
    };M.prototype.get_m_suspensionRestLength1 = function () {
      return btWheelInfo_get_m_suspensionRestLength1_0(this.a);
    };M.prototype.set_m_suspensionRestLength1 = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_suspensionRestLength1_1(b, a);
    };M.prototype.get_m_wheelsRadius = function () {
      return btWheelInfo_get_m_wheelsRadius_0(this.a);
    };
    M.prototype.set_m_wheelsRadius = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_wheelsRadius_1(b, a);
    };M.prototype.get_m_wheelsDampingCompression = function () {
      return btWheelInfo_get_m_wheelsDampingCompression_0(this.a);
    };M.prototype.set_m_wheelsDampingCompression = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_wheelsDampingCompression_1(b, a);
    };M.prototype.get_m_wheelsDampingRelaxation = function () {
      return btWheelInfo_get_m_wheelsDampingRelaxation_0(this.a);
    };
    M.prototype.set_m_wheelsDampingRelaxation = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_wheelsDampingRelaxation_1(b, a);
    };M.prototype.get_m_steering = function () {
      return btWheelInfo_get_m_steering_0(this.a);
    };M.prototype.set_m_steering = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_steering_1(b, a);
    };M.prototype.get_m_maxSuspensionForce = function () {
      return btWheelInfo_get_m_maxSuspensionForce_0(this.a);
    };
    M.prototype.set_m_maxSuspensionForce = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_maxSuspensionForce_1(b, a);
    };M.prototype.get_m_maxSuspensionTravelCm = function () {
      return btWheelInfo_get_m_maxSuspensionTravelCm_0(this.a);
    };M.prototype.set_m_maxSuspensionTravelCm = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_maxSuspensionTravelCm_1(b, a);
    };M.prototype.get_m_wheelsSuspensionForce = function () {
      return btWheelInfo_get_m_wheelsSuspensionForce_0(this.a);
    };
    M.prototype.set_m_wheelsSuspensionForce = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_wheelsSuspensionForce_1(b, a);
    };M.prototype.get_m_bIsFrontWheel = function () {
      return !!btWheelInfo_get_m_bIsFrontWheel_0(this.a);
    };M.prototype.set_m_bIsFrontWheel = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_bIsFrontWheel_1(b, a);
    };M.prototype.get_m_raycastInfo = function () {
      return wrapPointer(btWheelInfo_get_m_raycastInfo_0(this.a), N);
    };
    M.prototype.set_m_raycastInfo = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_raycastInfo_1(b, a);
    };M.prototype.get_m_chassisConnectionPointCS = function () {
      return wrapPointer(btWheelInfo_get_m_chassisConnectionPointCS_0(this.a), h);
    };M.prototype.set_m_chassisConnectionPointCS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_chassisConnectionPointCS_1(b, a);
    };
    M.prototype.get_m_worldTransform = function () {
      return wrapPointer(btWheelInfo_get_m_worldTransform_0(this.a), l);
    };M.prototype.set_m_worldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_worldTransform_1(b, a);
    };M.prototype.get_m_wheelDirectionCS = function () {
      return wrapPointer(btWheelInfo_get_m_wheelDirectionCS_0(this.a), h);
    };M.prototype.set_m_wheelDirectionCS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_wheelDirectionCS_1(b, a);
    };
    M.prototype.get_m_wheelAxleCS = function () {
      return wrapPointer(btWheelInfo_get_m_wheelAxleCS_0(this.a), h);
    };M.prototype.set_m_wheelAxleCS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_wheelAxleCS_1(b, a);
    };M.prototype.get_m_rotation = function () {
      return btWheelInfo_get_m_rotation_0(this.a);
    };M.prototype.set_m_rotation = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_rotation_1(b, a);
    };M.prototype.get_m_deltaRotation = function () {
      return btWheelInfo_get_m_deltaRotation_0(this.a);
    };
    M.prototype.set_m_deltaRotation = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_deltaRotation_1(b, a);
    };M.prototype.get_m_brake = function () {
      return btWheelInfo_get_m_brake_0(this.a);
    };M.prototype.set_m_brake = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_brake_1(b, a);
    };M.prototype.get_m_clippedInvContactDotSuspension = function () {
      return btWheelInfo_get_m_clippedInvContactDotSuspension_0(this.a);
    };
    M.prototype.set_m_clippedInvContactDotSuspension = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_clippedInvContactDotSuspension_1(b, a);
    };M.prototype.get_m_suspensionRelativeVelocity = function () {
      return btWheelInfo_get_m_suspensionRelativeVelocity_0(this.a);
    };M.prototype.set_m_suspensionRelativeVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_suspensionRelativeVelocity_1(b, a);
    };M.prototype.get_m_skidInfo = function () {
      return btWheelInfo_get_m_skidInfo_0(this.a);
    };
    M.prototype.set_m_skidInfo = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btWheelInfo_set_m_skidInfo_1(b, a);
    };M.prototype.__destroy__ = function () {
      btWheelInfo___destroy___0(this.a);
    };
    function O(a, b, c, d) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);this.a = void 0 === a ? btVector4_btVector4_0() : void 0 === b ? btVector4_btVector4_1(a) : void 0 === c ? btVector4_btVector4_2(a, b) : void 0 === d ? btVector4_btVector4_3(a, b, c) : btVector4_btVector4_4(a, b, c, d);getCache(O)[this.a] = this;
    }O.prototype = Object.create(h.prototype);O.prototype.constructor = O;O.prototype.b = O;O.c = {};e.btVector4 = O;O.prototype.w = function () {
      return btVector4_w_0(this.a);
    };
    O.prototype.setValue = function (a, b, c, d) {
      var g = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);btVector4_setValue_4(g, a, b, c, d);
    };O.prototype.length = O.prototype.length = function () {
      return btVector4_length_0(this.a);
    };O.prototype.x = O.prototype.x = function () {
      return btVector4_x_0(this.a);
    };O.prototype.y = O.prototype.y = function () {
      return btVector4_y_0(this.a);
    };O.prototype.z = O.prototype.z = function () {
      return btVector4_z_0(this.a);
    };
    O.prototype.setX = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVector4_setX_1(b, a);
    };O.prototype.setY = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVector4_setY_1(b, a);
    };O.prototype.setZ = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVector4_setZ_1(b, a);
    };O.prototype.normalize = O.prototype.normalize = function () {
      btVector4_normalize_0(this.a);
    };
    O.prototype.rotate = O.prototype.rotate = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);return wrapPointer(btVector4_rotate_2(c, a, b), h);
    };O.prototype.dot = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return btVector4_dot_1(b, a);
    };O.prototype.op_mul = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btVector4_op_mul_1(b, a), h);
    };
    O.prototype.op_add = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btVector4_op_add_1(b, a), h);
    };O.prototype.op_sub = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btVector4_op_sub_1(b, a), h);
    };O.prototype.__destroy__ = function () {
      btVector4___destroy___0(this.a);
    };function Ub() {
      throw "cannot construct a JsValue, no constructor in IDL";
    }Ub.prototype = Object.create(WrapperObject.prototype);Ub.prototype.constructor = Ub;Ub.prototype.b = Ub;Ub.c = {};
    e.JsValue = Ub;function Vb() {
      this.a = btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0();getCache(Vb)[this.a] = this;
    }Vb.prototype = Object.create(WrapperObject.prototype);Vb.prototype.constructor = Vb;Vb.prototype.b = Vb;Vb.c = {};e.btDefaultCollisionConstructionInfo = Vb;Vb.prototype.__destroy__ = function () {
      btDefaultCollisionConstructionInfo___destroy___0(this.a);
    };function Wb() {
      throw "cannot construct a btVehicleRaycasterResult, no constructor in IDL";
    }Wb.prototype = Object.create(WrapperObject.prototype);
    Wb.prototype.constructor = Wb;Wb.prototype.b = Wb;Wb.c = {};e.btVehicleRaycasterResult = Wb;Wb.prototype.get_m_hitPointInWorld = function () {
      return wrapPointer(btVehicleRaycasterResult_get_m_hitPointInWorld_0(this.a), h);
    };Wb.prototype.set_m_hitPointInWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVehicleRaycasterResult_set_m_hitPointInWorld_1(b, a);
    };Wb.prototype.get_m_hitNormalInWorld = function () {
      return wrapPointer(btVehicleRaycasterResult_get_m_hitNormalInWorld_0(this.a), h);
    };
    Wb.prototype.set_m_hitNormalInWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVehicleRaycasterResult_set_m_hitNormalInWorld_1(b, a);
    };Wb.prototype.get_m_distFraction = function () {
      return btVehicleRaycasterResult_get_m_distFraction_0(this.a);
    };Wb.prototype.set_m_distFraction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btVehicleRaycasterResult_set_m_distFraction_1(b, a);
    };Wb.prototype.__destroy__ = function () {
      btVehicleRaycasterResult___destroy___0(this.a);
    };
    function Xb() {
      throw "cannot construct a btConstraintSolver, no constructor in IDL";
    }Xb.prototype = Object.create(WrapperObject.prototype);Xb.prototype.constructor = Xb;Xb.prototype.b = Xb;Xb.c = {};e.btConstraintSolver = Xb;Xb.prototype.__destroy__ = function () {
      btConstraintSolver___destroy___0(this.a);
    };function P(a, b, c) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);this.a = btRaycastVehicle_btRaycastVehicle_3(a, b, c);getCache(P)[this.a] = this;
    }P.prototype = Object.create(qb.prototype);
    P.prototype.constructor = P;P.prototype.b = P;P.c = {};e.btRaycastVehicle = P;P.prototype.applyEngineForce = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRaycastVehicle_applyEngineForce_2(c, a, b);
    };P.prototype.setSteeringValue = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRaycastVehicle_setSteeringValue_2(c, a, b);
    };
    P.prototype.getWheelTransformWS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btRaycastVehicle_getWheelTransformWS_1(b, a), l);
    };P.prototype.updateWheelTransform = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRaycastVehicle_updateWheelTransform_2(c, a, b);
    };
    P.prototype.addWheel = function (a, b, c, d, g, q, t) {
      var ya = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);q && "object" === (typeof q === 'undefined' ? 'undefined' : _typeof(q)) && (q = q.a);t && "object" === (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && (t = t.a);return wrapPointer(btRaycastVehicle_addWheel_7(ya, a, b, c, d, g, q, t), M);
    };P.prototype.getNumWheels = function () {
      return btRaycastVehicle_getNumWheels_0(this.a);
    };
    P.prototype.getRigidBody = function () {
      return wrapPointer(btRaycastVehicle_getRigidBody_0(this.a), I);
    };P.prototype.getWheelInfo = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btRaycastVehicle_getWheelInfo_1(b, a), M);
    };P.prototype.setBrake = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRaycastVehicle_setBrake_2(c, a, b);
    };
    P.prototype.setCoordinateSystem = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btRaycastVehicle_setCoordinateSystem_3(d, a, b, c);
    };P.prototype.getCurrentSpeedKmHour = function () {
      return btRaycastVehicle_getCurrentSpeedKmHour_0(this.a);
    };P.prototype.getChassisWorldTransform = function () {
      return wrapPointer(btRaycastVehicle_getChassisWorldTransform_0(this.a), l);
    };
    P.prototype.rayCast = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return btRaycastVehicle_rayCast_1(b, a);
    };P.prototype.updateVehicle = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRaycastVehicle_updateVehicle_1(b, a);
    };P.prototype.resetSuspension = function () {
      btRaycastVehicle_resetSuspension_0(this.a);
    };P.prototype.getSteeringValue = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return btRaycastVehicle_getSteeringValue_1(b, a);
    };
    P.prototype.updateWheelTransformsWS = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);void 0 === b ? btRaycastVehicle_updateWheelTransformsWS_1(c, a) : btRaycastVehicle_updateWheelTransformsWS_2(c, a, b);
    };P.prototype.setPitchControl = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRaycastVehicle_setPitchControl_1(b, a);
    };P.prototype.updateSuspension = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRaycastVehicle_updateSuspension_1(b, a);
    };
    P.prototype.updateFriction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRaycastVehicle_updateFriction_1(b, a);
    };P.prototype.getRightAxis = function () {
      return btRaycastVehicle_getRightAxis_0(this.a);
    };P.prototype.getUpAxis = function () {
      return btRaycastVehicle_getUpAxis_0(this.a);
    };P.prototype.getForwardAxis = function () {
      return btRaycastVehicle_getForwardAxis_0(this.a);
    };P.prototype.getForwardVector = function () {
      return wrapPointer(btRaycastVehicle_getForwardVector_0(this.a), h);
    };
    P.prototype.getUserConstraintType = function () {
      return btRaycastVehicle_getUserConstraintType_0(this.a);
    };P.prototype.setUserConstraintType = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRaycastVehicle_setUserConstraintType_1(b, a);
    };P.prototype.setUserConstraintId = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btRaycastVehicle_setUserConstraintId_1(b, a);
    };P.prototype.getUserConstraintId = function () {
      return btRaycastVehicle_getUserConstraintId_0(this.a);
    };
    P.prototype.updateAction = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btRaycastVehicle_updateAction_2(c, a, b);
    };P.prototype.__destroy__ = function () {
      btRaycastVehicle___destroy___0(this.a);
    };function H() {
      throw "cannot construct a tVector3Array, no constructor in IDL";
    }H.prototype = Object.create(WrapperObject.prototype);H.prototype.constructor = H;H.prototype.b = H;H.c = {};e.tVector3Array = H;H.prototype.size = H.prototype.size = function () {
      return tVector3Array_size_0(this.a);
    };
    H.prototype.at = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(tVector3Array_at_1(b, a), h);
    };H.prototype.clear = H.prototype.clear = function () {
      tVector3Array_clear_0(this.a);
    };H.prototype.push_back = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);tVector3Array_push_back_1(b, a);
    };H.prototype.pop_back = function () {
      tVector3Array_pop_back_0(this.a);
    };H.prototype.__destroy__ = function () {
      tVector3Array___destroy___0(this.a);
    };
    function Yb(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = btCylinderShapeX_btCylinderShapeX_1(a);getCache(Yb)[this.a] = this;
    }Yb.prototype = Object.create(sb.prototype);Yb.prototype.constructor = Yb;Yb.prototype.b = Yb;Yb.c = {};e.btCylinderShapeX = Yb;Yb.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCylinderShapeX_setMargin_1(b, a);
    };Yb.prototype.getMargin = function () {
      return btCylinderShapeX_getMargin_0(this.a);
    };
    Yb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCylinderShapeX_setLocalScaling_1(b, a);
    };Yb.prototype.getLocalScaling = function () {
      return wrapPointer(btCylinderShapeX_getLocalScaling_0(this.a), h);
    };Yb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCylinderShapeX_calculateLocalInertia_2(c, a, b);
    };Yb.prototype.__destroy__ = function () {
      btCylinderShapeX___destroy___0(this.a);
    };
    function Zb(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = btCylinderShapeZ_btCylinderShapeZ_1(a);getCache(Zb)[this.a] = this;
    }Zb.prototype = Object.create(sb.prototype);Zb.prototype.constructor = Zb;Zb.prototype.b = Zb;Zb.c = {};e.btCylinderShapeZ = Zb;Zb.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCylinderShapeZ_setMargin_1(b, a);
    };Zb.prototype.getMargin = function () {
      return btCylinderShapeZ_getMargin_0(this.a);
    };
    Zb.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCylinderShapeZ_setLocalScaling_1(b, a);
    };Zb.prototype.getLocalScaling = function () {
      return wrapPointer(btCylinderShapeZ_getLocalScaling_0(this.a), h);
    };Zb.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCylinderShapeZ_calculateLocalInertia_2(c, a, b);
    };Zb.prototype.__destroy__ = function () {
      btCylinderShapeZ___destroy___0(this.a);
    };
    function $b() {
      this.a = btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0();getCache($b)[this.a] = this;
    }$b.prototype = Object.create(WrapperObject.prototype);$b.prototype.constructor = $b;$b.prototype.b = $b;$b.c = {};e.btSequentialImpulseConstraintSolver = $b;$b.prototype.__destroy__ = function () {
      btSequentialImpulseConstraintSolver___destroy___0(this.a);
    };function N() {
      throw "cannot construct a RaycastInfo, no constructor in IDL";
    }N.prototype = Object.create(WrapperObject.prototype);
    N.prototype.constructor = N;N.prototype.b = N;N.c = {};e.RaycastInfo = N;N.prototype.get_m_contactNormalWS = function () {
      return wrapPointer(RaycastInfo_get_m_contactNormalWS_0(this.a), h);
    };N.prototype.set_m_contactNormalWS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RaycastInfo_set_m_contactNormalWS_1(b, a);
    };N.prototype.get_m_contactPointWS = function () {
      return wrapPointer(RaycastInfo_get_m_contactPointWS_0(this.a), h);
    };
    N.prototype.set_m_contactPointWS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RaycastInfo_set_m_contactPointWS_1(b, a);
    };N.prototype.get_m_suspensionLength = function () {
      return RaycastInfo_get_m_suspensionLength_0(this.a);
    };N.prototype.set_m_suspensionLength = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RaycastInfo_set_m_suspensionLength_1(b, a);
    };N.prototype.get_m_hardPointWS = function () {
      return wrapPointer(RaycastInfo_get_m_hardPointWS_0(this.a), h);
    };
    N.prototype.set_m_hardPointWS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RaycastInfo_set_m_hardPointWS_1(b, a);
    };N.prototype.get_m_wheelDirectionWS = function () {
      return wrapPointer(RaycastInfo_get_m_wheelDirectionWS_0(this.a), h);
    };N.prototype.set_m_wheelDirectionWS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RaycastInfo_set_m_wheelDirectionWS_1(b, a);
    };N.prototype.get_m_wheelAxleWS = function () {
      return wrapPointer(RaycastInfo_get_m_wheelAxleWS_0(this.a), h);
    };
    N.prototype.set_m_wheelAxleWS = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RaycastInfo_set_m_wheelAxleWS_1(b, a);
    };N.prototype.get_m_isInContact = function () {
      return !!RaycastInfo_get_m_isInContact_0(this.a);
    };N.prototype.set_m_isInContact = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RaycastInfo_set_m_isInContact_1(b, a);
    };N.prototype.get_m_groundObject = function () {
      return RaycastInfo_get_m_groundObject_0(this.a);
    };
    N.prototype.set_m_groundObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);RaycastInfo_set_m_groundObject_1(b, a);
    };N.prototype.__destroy__ = function () {
      RaycastInfo___destroy___0(this.a);
    };
    function ac(a, b, c, d, g, q, t, ya, vb) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);q && "object" === (typeof q === 'undefined' ? 'undefined' : _typeof(q)) && (q = q.a);t && "object" === (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && (t = t.a);ya && "object" === (typeof ya === 'undefined' ? 'undefined' : _typeof(ya)) && (ya = ya.a);vb && "object" === (typeof vb === 'undefined' ? 'undefined' : _typeof(vb)) && (vb = vb.a);this.a = btHeightfieldTerrainShape_btHeightfieldTerrainShape_9(a, b, c, d, g, q, t, ya, vb);getCache(ac)[this.a] = this;
    }ac.prototype = Object.create(mb.prototype);
    ac.prototype.constructor = ac;ac.prototype.b = ac;ac.c = {};e.btHeightfieldTerrainShape = ac;ac.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btHeightfieldTerrainShape_setMargin_1(b, a);
    };ac.prototype.getMargin = function () {
      return btHeightfieldTerrainShape_getMargin_0(this.a);
    };ac.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btHeightfieldTerrainShape_setLocalScaling_1(b, a);
    };
    ac.prototype.getLocalScaling = function () {
      return wrapPointer(btHeightfieldTerrainShape_getLocalScaling_0(this.a), h);
    };ac.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btHeightfieldTerrainShape_calculateLocalInertia_2(c, a, b);
    };ac.prototype.__destroy__ = function () {
      btHeightfieldTerrainShape___destroy___0(this.a);
    };
    function Q(a, b, c, d) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);this.a = btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4(a, b, c, d);getCache(Q)[this.a] = this;
    }Q.prototype = Object.create(u.prototype);Q.prototype.constructor = Q;Q.prototype.b = Q;Q.c = {};e.btDiscreteDynamicsWorld = Q;Q.prototype.setGravity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDiscreteDynamicsWorld_setGravity_1(b, a);
    };
    Q.prototype.getGravity = function () {
      return wrapPointer(btDiscreteDynamicsWorld_getGravity_0(this.a), h);
    };Q.prototype.addRigidBody = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);void 0 === b ? btDiscreteDynamicsWorld_addRigidBody_1(d, a) : void 0 === c ? btDiscreteDynamicsWorld_addRigidBody_2(d, a, b) : btDiscreteDynamicsWorld_addRigidBody_3(d, a, b, c);
    };
    Q.prototype.removeRigidBody = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDiscreteDynamicsWorld_removeRigidBody_1(b, a);
    };Q.prototype.addConstraint = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);void 0 === b ? btDiscreteDynamicsWorld_addConstraint_1(c, a) : btDiscreteDynamicsWorld_addConstraint_2(c, a, b);
    };Q.prototype.removeConstraint = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDiscreteDynamicsWorld_removeConstraint_1(b, a);
    };
    Q.prototype.stepSimulation = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);return void 0 === b ? btDiscreteDynamicsWorld_stepSimulation_1(d, a) : void 0 === c ? btDiscreteDynamicsWorld_stepSimulation_2(d, a, b) : btDiscreteDynamicsWorld_stepSimulation_3(d, a, b, c);
    };Q.prototype.clearForces = function () {
      btDiscreteDynamicsWorld_clearForces_0(this.a);
    };
    Q.prototype.setApplySpeculativeContactRestitution = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDiscreteDynamicsWorld_setApplySpeculativeContactRestitution_1(b, a);
    };Q.prototype.getApplySpeculativeContactRestitution = function () {
      return !!btDiscreteDynamicsWorld_getApplySpeculativeContactRestitution_0(this.a);
    };Q.prototype.getDispatcher = function () {
      return wrapPointer(btDiscreteDynamicsWorld_getDispatcher_0(this.a), jb);
    };
    Q.prototype.rayTest = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btDiscreteDynamicsWorld_rayTest_3(d, a, b, c);
    };Q.prototype.getPairCache = function () {
      return wrapPointer(btDiscreteDynamicsWorld_getPairCache_0(this.a), kb);
    };Q.prototype.getDispatchInfo = function () {
      return wrapPointer(btDiscreteDynamicsWorld_getDispatchInfo_0(this.a), p);
    };
    Q.prototype.addCollisionObject = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);void 0 === b ? btDiscreteDynamicsWorld_addCollisionObject_1(d, a) : void 0 === c ? btDiscreteDynamicsWorld_addCollisionObject_2(d, a, b) : btDiscreteDynamicsWorld_addCollisionObject_3(d, a, b, c);
    };Q.prototype.removeCollisionObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDiscreteDynamicsWorld_removeCollisionObject_1(b, a);
    };
    Q.prototype.getBroadphase = function () {
      return wrapPointer(btDiscreteDynamicsWorld_getBroadphase_0(this.a), lb);
    };Q.prototype.convexSweepTest = function (a, b, c, d, g) {
      var q = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);btDiscreteDynamicsWorld_convexSweepTest_5(q, a, b, c, d, g);
    };
    Q.prototype.contactPairTest = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btDiscreteDynamicsWorld_contactPairTest_3(d, a, b, c);
    };Q.prototype.contactTest = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btDiscreteDynamicsWorld_contactTest_2(c, a, b);
    };Q.prototype.updateSingleAabb = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDiscreteDynamicsWorld_updateSingleAabb_1(b, a);
    };
    Q.prototype.addAction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDiscreteDynamicsWorld_addAction_1(b, a);
    };Q.prototype.removeAction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btDiscreteDynamicsWorld_removeAction_1(b, a);
    };Q.prototype.getSolverInfo = function () {
      return wrapPointer(btDiscreteDynamicsWorld_getSolverInfo_0(this.a), v);
    };Q.prototype.__destroy__ = function () {
      btDiscreteDynamicsWorld___destroy___0(this.a);
    };
    function bc() {
      this.a = btGhostPairCallback_btGhostPairCallback_0();getCache(bc)[this.a] = this;
    }bc.prototype = Object.create(WrapperObject.prototype);bc.prototype.constructor = bc;bc.prototype.b = bc;bc.c = {};e.btGhostPairCallback = bc;bc.prototype.__destroy__ = function () {
      btGhostPairCallback___destroy___0(this.a);
    };function cc() {
      throw "cannot construct a btOverlappingPairCallback, no constructor in IDL";
    }cc.prototype = Object.create(WrapperObject.prototype);cc.prototype.constructor = cc;cc.prototype.b = cc;cc.c = {};
    e.btOverlappingPairCallback = cc;cc.prototype.__destroy__ = function () {
      btOverlappingPairCallback___destroy___0(this.a);
    };function R(a, b, c, d) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);this.a = btKinematicCharacterController_btKinematicCharacterController_4(a, b, c, d);getCache(R)[this.a] = this;
    }R.prototype = Object.create(qb.prototype);R.prototype.constructor = R;R.prototype.b = R;R.c = {};e.btKinematicCharacterController = R;
    R.prototype.setUp = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_setUp_1(b, a);
    };R.prototype.setWalkDirection = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_setWalkDirection_1(b, a);
    };R.prototype.setVelocityForTimeInterval = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btKinematicCharacterController_setVelocityForTimeInterval_2(c, a, b);
    };
    R.prototype.warp = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_warp_1(b, a);
    };R.prototype.preStep = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_preStep_1(b, a);
    };R.prototype.playerStep = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btKinematicCharacterController_playerStep_2(c, a, b);
    };
    R.prototype.setFallSpeed = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_setFallSpeed_1(b, a);
    };R.prototype.setJumpSpeed = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_setJumpSpeed_1(b, a);
    };R.prototype.setMaxJumpHeight = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_setMaxJumpHeight_1(b, a);
    };R.prototype.canJump = function () {
      return !!btKinematicCharacterController_canJump_0(this.a);
    };
    R.prototype.jump = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_jump_1(b, a);
    };R.prototype.setGravity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_setGravity_1(b, a);
    };R.prototype.getGravity = function () {
      return wrapPointer(btKinematicCharacterController_getGravity_0(this.a), h);
    };R.prototype.setMaxSlope = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_setMaxSlope_1(b, a);
    };
    R.prototype.getMaxSlope = function () {
      return btKinematicCharacterController_getMaxSlope_0(this.a);
    };R.prototype.getGhostObject = function () {
      return wrapPointer(btKinematicCharacterController_getGhostObject_0(this.a), S);
    };R.prototype.setUseGhostSweepTest = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_setUseGhostSweepTest_1(b, a);
    };R.prototype.onGround = function () {
      return !!btKinematicCharacterController_onGround_0(this.a);
    };
    R.prototype.setUpInterpolate = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btKinematicCharacterController_setUpInterpolate_1(b, a);
    };R.prototype.updateAction = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btKinematicCharacterController_updateAction_2(c, a, b);
    };R.prototype.__destroy__ = function () {
      btKinematicCharacterController___destroy___0(this.a);
    };
    function dc(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = btStaticPlaneShape_btStaticPlaneShape_2(a, b);getCache(dc)[this.a] = this;
    }dc.prototype = Object.create(mb.prototype);dc.prototype.constructor = dc;dc.prototype.b = dc;dc.c = {};e.btStaticPlaneShape = dc;dc.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btStaticPlaneShape_setLocalScaling_1(b, a);
    };
    dc.prototype.getLocalScaling = function () {
      return wrapPointer(btStaticPlaneShape_getLocalScaling_0(this.a), h);
    };dc.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btStaticPlaneShape_calculateLocalInertia_2(c, a, b);
    };dc.prototype.__destroy__ = function () {
      btStaticPlaneShape___destroy___0(this.a);
    };function kb() {
      throw "cannot construct a btOverlappingPairCache, no constructor in IDL";
    }kb.prototype = Object.create(WrapperObject.prototype);
    kb.prototype.constructor = kb;kb.prototype.b = kb;kb.c = {};e.btOverlappingPairCache = kb;kb.prototype.setInternalGhostPairCallback = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btOverlappingPairCache_setInternalGhostPairCallback_1(b, a);
    };kb.prototype.__destroy__ = function () {
      btOverlappingPairCache___destroy___0(this.a);
    };function Eb() {
      throw "cannot construct a tBtCollisionObjectArray, no constructor in IDL";
    }Eb.prototype = Object.create(WrapperObject.prototype);Eb.prototype.constructor = Eb;
    Eb.prototype.b = Eb;Eb.c = {};e.tBtCollisionObjectArray = Eb;Eb.prototype.size = Eb.prototype.size = function () {
      return tBtCollisionObjectArray_size_0(this.a);
    };Eb.prototype.at = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(tBtCollisionObjectArray_at_1(b, a), k);
    };Eb.prototype.clear = Eb.prototype.clear = function () {
      tBtCollisionObjectArray_clear_0(this.a);
    };Eb.prototype.push_back = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);tBtCollisionObjectArray_push_back_1(b, a);
    };
    Eb.prototype.pop_back = function () {
      tBtCollisionObjectArray_pop_back_0(this.a);
    };Eb.prototype.__destroy__ = function () {
      tBtCollisionObjectArray___destroy___0(this.a);
    };function ec(a, b, c, d) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);this.a = btFixedConstraint_btFixedConstraint_4(a, b, c, d);getCache(ec)[this.a] = this;
    }ec.prototype = Object.create(m.prototype);ec.prototype.constructor = ec;ec.prototype.b = ec;ec.c = {};
    e.btFixedConstraint = ec;ec.prototype.enableFeedback = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btFixedConstraint_enableFeedback_1(b, a);
    };ec.prototype.getBreakingImpulseThreshold = function () {
      return btFixedConstraint_getBreakingImpulseThreshold_0(this.a);
    };ec.prototype.setBreakingImpulseThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btFixedConstraint_setBreakingImpulseThreshold_1(b, a);
    };
    ec.prototype.getParam = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);return btFixedConstraint_getParam_2(c, a, b);
    };ec.prototype.setParam = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btFixedConstraint_setParam_3(d, a, b, c);
    };ec.prototype.__destroy__ = function () {
      btFixedConstraint___destroy___0(this.a);
    };
    function l(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = void 0 === a ? btTransform_btTransform_0() : void 0 === b ? btTransform_btTransform_1(a) : btTransform_btTransform_2(a, b);getCache(l)[this.a] = this;
    }l.prototype = Object.create(WrapperObject.prototype);l.prototype.constructor = l;l.prototype.b = l;l.c = {};e.btTransform = l;l.prototype.setIdentity = function () {
      btTransform_setIdentity_0(this.a);
    };
    l.prototype.setOrigin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btTransform_setOrigin_1(b, a);
    };l.prototype.setRotation = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btTransform_setRotation_1(b, a);
    };l.prototype.getOrigin = function () {
      return wrapPointer(btTransform_getOrigin_0(this.a), h);
    };l.prototype.getRotation = function () {
      return wrapPointer(btTransform_getRotation_0(this.a), T);
    };l.prototype.getBasis = function () {
      return wrapPointer(btTransform_getBasis_0(this.a), zb);
    };
    l.prototype.setFromOpenGLMatrix = function (a) {
      var b = this.a;if (hb) {
        for (var c = 0; c < gb.length; c++) {
          e._free(gb[c]);
        }gb.length = 0;e._free(db);db = 0;eb += hb;hb = 0;
      }db || (eb += 128, db = e._malloc(eb), assert(db));fb = 0;if ("object" == (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a))) {
        assert(db);c = a.length * ta.BYTES_PER_ELEMENT;c = c + 7 & -8;if (fb + c >= eb) {
          assert(0 < c);hb += c;var d = e._malloc(c);gb.push(d);
        } else d = db + fb, fb += c;d = c = d;switch (ta.BYTES_PER_ELEMENT) {case 2:
            d >>= 1;break;case 4:
            d >>= 2;break;case 8:
            d >>= 3;}for (var g = 0; g < a.length; g++) {
          ta[d + g] = a[g];
        }a = c;
      }btTransform_setFromOpenGLMatrix_1(b, a);
    };l.prototype.__destroy__ = function () {
      btTransform___destroy___0(this.a);
    };function U(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = ClosestRayResultCallback_ClosestRayResultCallback_2(a, b);getCache(U)[this.a] = this;
    }U.prototype = Object.create(A.prototype);U.prototype.constructor = U;U.prototype.b = U;U.c = {};e.ClosestRayResultCallback = U;U.prototype.hasHit = function () {
      return !!ClosestRayResultCallback_hasHit_0(this.a);
    };
    U.prototype.get_m_rayFromWorld = function () {
      return wrapPointer(ClosestRayResultCallback_get_m_rayFromWorld_0(this.a), h);
    };U.prototype.set_m_rayFromWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestRayResultCallback_set_m_rayFromWorld_1(b, a);
    };U.prototype.get_m_rayToWorld = function () {
      return wrapPointer(ClosestRayResultCallback_get_m_rayToWorld_0(this.a), h);
    };
    U.prototype.set_m_rayToWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestRayResultCallback_set_m_rayToWorld_1(b, a);
    };U.prototype.get_m_hitNormalWorld = function () {
      return wrapPointer(ClosestRayResultCallback_get_m_hitNormalWorld_0(this.a), h);
    };U.prototype.set_m_hitNormalWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestRayResultCallback_set_m_hitNormalWorld_1(b, a);
    };
    U.prototype.get_m_hitPointWorld = function () {
      return wrapPointer(ClosestRayResultCallback_get_m_hitPointWorld_0(this.a), h);
    };U.prototype.set_m_hitPointWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestRayResultCallback_set_m_hitPointWorld_1(b, a);
    };U.prototype.get_m_collisionFilterGroup = function () {
      return ClosestRayResultCallback_get_m_collisionFilterGroup_0(this.a);
    };
    U.prototype.set_m_collisionFilterGroup = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestRayResultCallback_set_m_collisionFilterGroup_1(b, a);
    };U.prototype.get_m_collisionFilterMask = function () {
      return ClosestRayResultCallback_get_m_collisionFilterMask_0(this.a);
    };U.prototype.set_m_collisionFilterMask = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestRayResultCallback_set_m_collisionFilterMask_1(b, a);
    };U.prototype.get_m_closestHitFraction = function () {
      return ClosestRayResultCallback_get_m_closestHitFraction_0(this.a);
    };
    U.prototype.set_m_closestHitFraction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestRayResultCallback_set_m_closestHitFraction_1(b, a);
    };U.prototype.get_m_collisionObject = function () {
      return wrapPointer(ClosestRayResultCallback_get_m_collisionObject_0(this.a), k);
    };U.prototype.set_m_collisionObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);ClosestRayResultCallback_set_m_collisionObject_1(b, a);
    };U.prototype.__destroy__ = function () {
      ClosestRayResultCallback___destroy___0(this.a);
    };
    function V(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = AllConvexResultCallback_AllConvexResultCallback_2(a, b);getCache(V)[this.a] = this;
    }V.prototype = Object.create(z.prototype);V.prototype.constructor = V;V.prototype.b = V;V.c = {};e.AllConvexResultCallback = V;V.prototype.hasHit = function () {
      return !!AllConvexResultCallback_hasHit_0(this.a);
    };V.prototype.get_m_convexFromWorld = function () {
      return wrapPointer(AllConvexResultCallback_get_m_convexFromWorld_0(this.a), h);
    };
    V.prototype.set_m_convexFromWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllConvexResultCallback_set_m_convexFromWorld_1(b, a);
    };V.prototype.get_m_convexToWorld = function () {
      return wrapPointer(AllConvexResultCallback_get_m_convexToWorld_0(this.a), h);
    };V.prototype.set_m_convexToWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllConvexResultCallback_set_m_convexToWorld_1(b, a);
    };
    V.prototype.get_m_hitNormalWorld = function () {
      return wrapPointer(AllConvexResultCallback_get_m_hitNormalWorld_0(this.a), H);
    };V.prototype.set_m_hitNormalWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllConvexResultCallback_set_m_hitNormalWorld_1(b, a);
    };V.prototype.get_m_hitPointWorld = function () {
      return wrapPointer(AllConvexResultCallback_get_m_hitPointWorld_0(this.a), H);
    };
    V.prototype.set_m_hitPointWorld = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllConvexResultCallback_set_m_hitPointWorld_1(b, a);
    };V.prototype.get_m_hitFractions = function () {
      return wrapPointer(AllConvexResultCallback_get_m_hitFractions_0(this.a), Fb);
    };V.prototype.set_m_hitFractions = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllConvexResultCallback_set_m_hitFractions_1(b, a);
    };
    V.prototype.get_m_collisionObjects = function () {
      return wrapPointer(AllConvexResultCallback_get_m_collisionObjects_0(this.a), Eb);
    };V.prototype.set_m_collisionObjects = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllConvexResultCallback_set_m_collisionObjects_1(b, a);
    };V.prototype.get_m_collisionFilterGroup = function () {
      return AllConvexResultCallback_get_m_collisionFilterGroup_0(this.a);
    };
    V.prototype.set_m_collisionFilterGroup = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllConvexResultCallback_set_m_collisionFilterGroup_1(b, a);
    };V.prototype.get_m_collisionFilterMask = function () {
      return AllConvexResultCallback_get_m_collisionFilterMask_0(this.a);
    };V.prototype.set_m_collisionFilterMask = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllConvexResultCallback_set_m_collisionFilterMask_1(b, a);
    };V.prototype.get_m_closestHitFraction = function () {
      return AllConvexResultCallback_get_m_closestHitFraction_0(this.a);
    };
    V.prototype.set_m_closestHitFraction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);AllConvexResultCallback_set_m_closestHitFraction_1(b, a);
    };V.prototype.__destroy__ = function () {
      AllConvexResultCallback___destroy___0(this.a);
    };function fc() {
      this.a = ConcreteContactResultCallback_ConcreteContactResultCallback_0();getCache(fc)[this.a] = this;
    }fc.prototype = Object.create(yb.prototype);fc.prototype.constructor = fc;fc.prototype.b = fc;fc.c = {};e.ConcreteContactResultCallback = fc;
    fc.prototype.addSingleResult = function (a, b, c, d, g, q, t) {
      var ya = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);q && "object" === (typeof q === 'undefined' ? 'undefined' : _typeof(q)) && (q = q.a);t && "object" === (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && (t = t.a);return ConcreteContactResultCallback_addSingleResult_7(ya, a, b, c, d, g, q, t);
    };fc.prototype.__destroy__ = function () {
      ConcreteContactResultCallback___destroy___0(this.a);
    };
    function hc(a, b, c) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);this.a = void 0 === c ? btBvhTriangleMeshShape_btBvhTriangleMeshShape_2(a, b) : btBvhTriangleMeshShape_btBvhTriangleMeshShape_3(a, b, c);getCache(hc)[this.a] = this;
    }hc.prototype = Object.create(ob.prototype);hc.prototype.constructor = hc;hc.prototype.b = hc;hc.c = {};e.btBvhTriangleMeshShape = hc;
    hc.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btBvhTriangleMeshShape_setLocalScaling_1(b, a);
    };hc.prototype.getLocalScaling = function () {
      return wrapPointer(btBvhTriangleMeshShape_getLocalScaling_0(this.a), h);
    };hc.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btBvhTriangleMeshShape_calculateLocalInertia_2(c, a, b);
    };hc.prototype.__destroy__ = function () {
      btBvhTriangleMeshShape___destroy___0(this.a);
    };
    function W(a, b, c, d, g) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);this.a = void 0 === d ? btSliderConstraint_btSliderConstraint_3(a, b, c) : void 0 === g ? btSliderConstraint_btSliderConstraint_4(a, b, c, d) : btSliderConstraint_btSliderConstraint_5(a, b, c, d, g);getCache(W)[this.a] = this;
    }W.prototype = Object.create(m.prototype);W.prototype.constructor = W;W.prototype.b = W;W.c = {};e.btSliderConstraint = W;
    W.prototype.setLowerLinLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btSliderConstraint_setLowerLinLimit_1(b, a);
    };W.prototype.setUpperLinLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btSliderConstraint_setUpperLinLimit_1(b, a);
    };W.prototype.setLowerAngLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btSliderConstraint_setLowerAngLimit_1(b, a);
    };
    W.prototype.setUpperAngLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btSliderConstraint_setUpperAngLimit_1(b, a);
    };W.prototype.enableFeedback = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btSliderConstraint_enableFeedback_1(b, a);
    };W.prototype.getBreakingImpulseThreshold = function () {
      return btSliderConstraint_getBreakingImpulseThreshold_0(this.a);
    };
    W.prototype.setBreakingImpulseThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btSliderConstraint_setBreakingImpulseThreshold_1(b, a);
    };W.prototype.getParam = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);return btSliderConstraint_getParam_2(c, a, b);
    };W.prototype.setParam = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btSliderConstraint_setParam_3(d, a, b, c);
    };
    W.prototype.__destroy__ = function () {
      btSliderConstraint___destroy___0(this.a);
    };function S() {
      this.a = btPairCachingGhostObject_btPairCachingGhostObject_0();getCache(S)[this.a] = this;
    }S.prototype = Object.create(w.prototype);S.prototype.constructor = S;S.prototype.b = S;S.c = {};e.btPairCachingGhostObject = S;S.prototype.setAnisotropicFriction = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btPairCachingGhostObject_setAnisotropicFriction_2(c, a, b);
    };
    S.prototype.getCollisionShape = function () {
      return wrapPointer(btPairCachingGhostObject_getCollisionShape_0(this.a), f);
    };S.prototype.setContactProcessingThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setContactProcessingThreshold_1(b, a);
    };S.prototype.setActivationState = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setActivationState_1(b, a);
    };
    S.prototype.forceActivationState = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_forceActivationState_1(b, a);
    };S.prototype.activate = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);void 0 === a ? btPairCachingGhostObject_activate_0(b) : btPairCachingGhostObject_activate_1(b, a);
    };S.prototype.isActive = function () {
      return !!btPairCachingGhostObject_isActive_0(this.a);
    };S.prototype.isKinematicObject = function () {
      return !!btPairCachingGhostObject_isKinematicObject_0(this.a);
    };
    S.prototype.isStaticObject = function () {
      return !!btPairCachingGhostObject_isStaticObject_0(this.a);
    };S.prototype.isStaticOrKinematicObject = function () {
      return !!btPairCachingGhostObject_isStaticOrKinematicObject_0(this.a);
    };S.prototype.getRestitution = function () {
      return btPairCachingGhostObject_getRestitution_0(this.a);
    };S.prototype.setRestitution = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setRestitution_1(b, a);
    };S.prototype.getFriction = function () {
      return btPairCachingGhostObject_getFriction_0(this.a);
    };
    S.prototype.setFriction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setFriction_1(b, a);
    };S.prototype.getRollingFriction = function () {
      return btPairCachingGhostObject_getRollingFriction_0(this.a);
    };S.prototype.setRollingFriction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setRollingFriction_1(b, a);
    };S.prototype.getCollisionFlags = function () {
      return btPairCachingGhostObject_getCollisionFlags_0(this.a);
    };
    S.prototype.setCollisionFlags = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setCollisionFlags_1(b, a);
    };S.prototype.getWorldTransform = function () {
      return wrapPointer(btPairCachingGhostObject_getWorldTransform_0(this.a), l);
    };S.prototype.setWorldTransform = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setWorldTransform_1(b, a);
    };
    S.prototype.setCollisionShape = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setCollisionShape_1(b, a);
    };S.prototype.getCcdMotionThreshold = function () {
      return btPairCachingGhostObject_getCcdMotionThreshold_0(this.a);
    };S.prototype.setCcdMotionThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setCcdMotionThreshold_1(b, a);
    };S.prototype.getCcdSweptSphereRadius = function () {
      return btPairCachingGhostObject_getCcdSweptSphereRadius_0(this.a);
    };
    S.prototype.setCcdSweptSphereRadius = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setCcdSweptSphereRadius_1(b, a);
    };S.prototype.getUserIndex = function () {
      return btPairCachingGhostObject_getUserIndex_0(this.a);
    };S.prototype.setUserIndex = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setUserIndex_1(b, a);
    };S.prototype.getUserPointer = function () {
      return wrapPointer(btPairCachingGhostObject_getUserPointer_0(this.a), VoidPtr);
    };
    S.prototype.setUserPointer = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setUserPointer_1(b, a);
    };S.prototype.getInterpolationAngularVelocity = function () {
      return wrapPointer(btPairCachingGhostObject_getInterpolationAngularVelocity_0(this.a), h);
    };S.prototype.setInterpolationAngularVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setInterpolationAngularVelocity_1(b, a);
    };
    S.prototype.getInterpolationLinearVelocity = function () {
      return wrapPointer(btPairCachingGhostObject_getInterpolationLinearVelocity_0(this.a), h);
    };S.prototype.setInterpolationLinearVelocity = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPairCachingGhostObject_setInterpolationLinearVelocity_1(b, a);
    };S.prototype.getBroadphaseHandle = function () {
      return wrapPointer(btPairCachingGhostObject_getBroadphaseHandle_0(this.a), ib);
    };S.prototype.getActivationState = function () {
      return btPairCachingGhostObject_getActivationState_0(this.a);
    };
    S.prototype.getNumOverlappingObjects = function () {
      return btPairCachingGhostObject_getNumOverlappingObjects_0(this.a);
    };S.prototype.getOverlappingObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btPairCachingGhostObject_getOverlappingObject_1(b, a), k);
    };S.prototype.__destroy__ = function () {
      btPairCachingGhostObject___destroy___0(this.a);
    };function D() {
      throw "cannot construct a btManifoldPoint, no constructor in IDL";
    }D.prototype = Object.create(WrapperObject.prototype);
    D.prototype.constructor = D;D.prototype.b = D;D.c = {};e.btManifoldPoint = D;D.prototype.getPositionWorldOnA = function () {
      return wrapPointer(btManifoldPoint_getPositionWorldOnA_0(this.a), h);
    };D.prototype.getPositionWorldOnB = function () {
      return wrapPointer(btManifoldPoint_getPositionWorldOnB_0(this.a), h);
    };D.prototype.getAppliedImpulse = function () {
      return btManifoldPoint_getAppliedImpulse_0(this.a);
    };D.prototype.getDistance = function () {
      return btManifoldPoint_getDistance_0(this.a);
    };
    D.prototype.get_m_localPointA = function () {
      return wrapPointer(btManifoldPoint_get_m_localPointA_0(this.a), h);
    };D.prototype.set_m_localPointA = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btManifoldPoint_set_m_localPointA_1(b, a);
    };D.prototype.get_m_localPointB = function () {
      return wrapPointer(btManifoldPoint_get_m_localPointB_0(this.a), h);
    };D.prototype.set_m_localPointB = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btManifoldPoint_set_m_localPointB_1(b, a);
    };
    D.prototype.get_m_positionWorldOnB = function () {
      return wrapPointer(btManifoldPoint_get_m_positionWorldOnB_0(this.a), h);
    };D.prototype.set_m_positionWorldOnB = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btManifoldPoint_set_m_positionWorldOnB_1(b, a);
    };D.prototype.get_m_positionWorldOnA = function () {
      return wrapPointer(btManifoldPoint_get_m_positionWorldOnA_0(this.a), h);
    };
    D.prototype.set_m_positionWorldOnA = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btManifoldPoint_set_m_positionWorldOnA_1(b, a);
    };D.prototype.get_m_normalWorldOnB = function () {
      return wrapPointer(btManifoldPoint_get_m_normalWorldOnB_0(this.a), h);
    };D.prototype.set_m_normalWorldOnB = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btManifoldPoint_set_m_normalWorldOnB_1(b, a);
    };D.prototype.__destroy__ = function () {
      btManifoldPoint___destroy___0(this.a);
    };
    function X(a, b, c, d) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);this.a = void 0 === c ? btPoint2PointConstraint_btPoint2PointConstraint_2(a, b) : void 0 === d ? btPoint2PointConstraint_btPoint2PointConstraint_3(a, b, c) : btPoint2PointConstraint_btPoint2PointConstraint_4(a, b, c, d);getCache(X)[this.a] = this;
    }X.prototype = Object.create(m.prototype);X.prototype.constructor = X;X.prototype.b = X;X.c = {};e.btPoint2PointConstraint = X;
    X.prototype.setPivotA = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPoint2PointConstraint_setPivotA_1(b, a);
    };X.prototype.setPivotB = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPoint2PointConstraint_setPivotB_1(b, a);
    };X.prototype.getPivotInA = function () {
      return wrapPointer(btPoint2PointConstraint_getPivotInA_0(this.a), h);
    };X.prototype.getPivotInB = function () {
      return wrapPointer(btPoint2PointConstraint_getPivotInB_0(this.a), h);
    };
    X.prototype.enableFeedback = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPoint2PointConstraint_enableFeedback_1(b, a);
    };X.prototype.getBreakingImpulseThreshold = function () {
      return btPoint2PointConstraint_getBreakingImpulseThreshold_0(this.a);
    };X.prototype.setBreakingImpulseThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPoint2PointConstraint_setBreakingImpulseThreshold_1(b, a);
    };
    X.prototype.getParam = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);return btPoint2PointConstraint_getParam_2(c, a, b);
    };X.prototype.setParam = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btPoint2PointConstraint_setParam_3(d, a, b, c);
    };X.prototype.get_m_setting = function () {
      return wrapPointer(btPoint2PointConstraint_get_m_setting_0(this.a), Hb);
    };
    X.prototype.set_m_setting = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btPoint2PointConstraint_set_m_setting_1(b, a);
    };X.prototype.__destroy__ = function () {
      btPoint2PointConstraint___destroy___0(this.a);
    };function ib() {
      throw "cannot construct a btBroadphaseProxy, no constructor in IDL";
    }ib.prototype = Object.create(WrapperObject.prototype);ib.prototype.constructor = ib;ib.prototype.b = ib;ib.c = {};e.btBroadphaseProxy = ib;ib.prototype.get_m_collisionFilterGroup = function () {
      return btBroadphaseProxy_get_m_collisionFilterGroup_0(this.a);
    };
    ib.prototype.set_m_collisionFilterGroup = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btBroadphaseProxy_set_m_collisionFilterGroup_1(b, a);
    };ib.prototype.get_m_collisionFilterMask = function () {
      return btBroadphaseProxy_get_m_collisionFilterMask_0(this.a);
    };ib.prototype.set_m_collisionFilterMask = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btBroadphaseProxy_set_m_collisionFilterMask_1(b, a);
    };ib.prototype.__destroy__ = function () {
      btBroadphaseProxy___destroy___0(this.a);
    };
    function Y(a, b, c, d, g) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);this.a = void 0 === d ? btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3(a, b, c) : void 0 === g ? btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_4(a, b, c, d) : btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5(a, b, c, d, g);getCache(Y)[this.a] = this;
    }Y.prototype = Object.create(y.prototype);
    Y.prototype.constructor = Y;Y.prototype.b = Y;Y.c = {};e.btGeneric6DofSpringConstraint = Y;Y.prototype.enableSpring = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btGeneric6DofSpringConstraint_enableSpring_2(c, a, b);
    };Y.prototype.setStiffness = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btGeneric6DofSpringConstraint_setStiffness_2(c, a, b);
    };
    Y.prototype.setDamping = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btGeneric6DofSpringConstraint_setDamping_2(c, a, b);
    };Y.prototype.setLinearLowerLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofSpringConstraint_setLinearLowerLimit_1(b, a);
    };Y.prototype.setLinearUpperLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofSpringConstraint_setLinearUpperLimit_1(b, a);
    };
    Y.prototype.setAngularLowerLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofSpringConstraint_setAngularLowerLimit_1(b, a);
    };Y.prototype.setAngularUpperLimit = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofSpringConstraint_setAngularUpperLimit_1(b, a);
    };Y.prototype.getFrameOffsetA = function () {
      return wrapPointer(btGeneric6DofSpringConstraint_getFrameOffsetA_0(this.a), l);
    };
    Y.prototype.enableFeedback = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofSpringConstraint_enableFeedback_1(b, a);
    };Y.prototype.getBreakingImpulseThreshold = function () {
      return btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0(this.a);
    };Y.prototype.setBreakingImpulseThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1(b, a);
    };
    Y.prototype.getParam = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);return btGeneric6DofSpringConstraint_getParam_2(c, a, b);
    };Y.prototype.setParam = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btGeneric6DofSpringConstraint_setParam_3(d, a, b, c);
    };Y.prototype.__destroy__ = function () {
      btGeneric6DofSpringConstraint___destroy___0(this.a);
    };
    function ic(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = btBoxShape_btBoxShape_1(a);getCache(ic)[this.a] = this;
    }ic.prototype = Object.create(f.prototype);ic.prototype.constructor = ic;ic.prototype.b = ic;ic.c = {};e.btBoxShape = ic;ic.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btBoxShape_setMargin_1(b, a);
    };ic.prototype.getMargin = function () {
      return btBoxShape_getMargin_0(this.a);
    };
    ic.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btBoxShape_setLocalScaling_1(b, a);
    };ic.prototype.getLocalScaling = function () {
      return wrapPointer(btBoxShape_getLocalScaling_0(this.a), h);
    };ic.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btBoxShape_calculateLocalInertia_2(c, a, b);
    };ic.prototype.__destroy__ = function () {
      btBoxShape___destroy___0(this.a);
    };
    function jc(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = btCapsuleShapeX_btCapsuleShapeX_2(a, b);getCache(jc)[this.a] = this;
    }jc.prototype = Object.create(r.prototype);jc.prototype.constructor = jc;jc.prototype.b = jc;jc.c = {};e.btCapsuleShapeX = jc;jc.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCapsuleShapeX_setMargin_1(b, a);
    };jc.prototype.getMargin = function () {
      return btCapsuleShapeX_getMargin_0(this.a);
    };jc.prototype.getUpAxis = function () {
      return btCapsuleShapeX_getUpAxis_0(this.a);
    };
    jc.prototype.getRadius = function () {
      return btCapsuleShapeX_getRadius_0(this.a);
    };jc.prototype.getHalfHeight = function () {
      return btCapsuleShapeX_getHalfHeight_0(this.a);
    };jc.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCapsuleShapeX_setLocalScaling_1(b, a);
    };jc.prototype.getLocalScaling = function () {
      return wrapPointer(btCapsuleShapeX_getLocalScaling_0(this.a), h);
    };
    jc.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCapsuleShapeX_calculateLocalInertia_2(c, a, b);
    };jc.prototype.__destroy__ = function () {
      btCapsuleShapeX___destroy___0(this.a);
    };function T(a, b, c, d) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);this.a = btQuaternion_btQuaternion_4(a, b, c, d);getCache(T)[this.a] = this;
    }T.prototype = Object.create(x.prototype);
    T.prototype.constructor = T;T.prototype.b = T;T.c = {};e.btQuaternion = T;T.prototype.setValue = function (a, b, c, d) {
      var g = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);btQuaternion_setValue_4(g, a, b, c, d);
    };T.prototype.setEulerZYX = function (a, b, c) {
      var d = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);btQuaternion_setEulerZYX_3(d, a, b, c);
    };
    T.prototype.setRotation = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btQuaternion_setRotation_2(c, a, b);
    };T.prototype.normalize = T.prototype.normalize = function () {
      btQuaternion_normalize_0(this.a);
    };T.prototype.length2 = function () {
      return btQuaternion_length2_0(this.a);
    };T.prototype.length = T.prototype.length = function () {
      return btQuaternion_length_0(this.a);
    };T.prototype.dot = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return btQuaternion_dot_1(b, a);
    };
    T.prototype.normalized = function () {
      return wrapPointer(btQuaternion_normalized_0(this.a), T);
    };T.prototype.getAxis = function () {
      return wrapPointer(btQuaternion_getAxis_0(this.a), h);
    };T.prototype.inverse = T.prototype.inverse = function () {
      return wrapPointer(btQuaternion_inverse_0(this.a), T);
    };T.prototype.getAngle = function () {
      return btQuaternion_getAngle_0(this.a);
    };T.prototype.getAngleShortestPath = function () {
      return btQuaternion_getAngleShortestPath_0(this.a);
    };
    T.prototype.angle = T.prototype.angle = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return btQuaternion_angle_1(b, a);
    };T.prototype.angleShortestPath = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return btQuaternion_angleShortestPath_1(b, a);
    };T.prototype.op_add = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btQuaternion_op_add_1(b, a), T);
    };
    T.prototype.op_sub = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btQuaternion_op_sub_1(b, a), T);
    };T.prototype.op_mul = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btQuaternion_op_mul_1(b, a), T);
    };T.prototype.op_mulq = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btQuaternion_op_mulq_1(b, a), T);
    };
    T.prototype.op_div = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return wrapPointer(btQuaternion_op_div_1(b, a), T);
    };T.prototype.x = T.prototype.x = function () {
      return btQuaternion_x_0(this.a);
    };T.prototype.y = T.prototype.y = function () {
      return btQuaternion_y_0(this.a);
    };T.prototype.z = T.prototype.z = function () {
      return btQuaternion_z_0(this.a);
    };T.prototype.w = function () {
      return btQuaternion_w_0(this.a);
    };T.prototype.setX = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btQuaternion_setX_1(b, a);
    };
    T.prototype.setY = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btQuaternion_setY_1(b, a);
    };T.prototype.setZ = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btQuaternion_setZ_1(b, a);
    };T.prototype.setW = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btQuaternion_setW_1(b, a);
    };T.prototype.__destroy__ = function () {
      btQuaternion___destroy___0(this.a);
    };
    function kc(a, b) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);this.a = btCapsuleShapeZ_btCapsuleShapeZ_2(a, b);getCache(kc)[this.a] = this;
    }kc.prototype = Object.create(r.prototype);kc.prototype.constructor = kc;kc.prototype.b = kc;kc.c = {};e.btCapsuleShapeZ = kc;kc.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCapsuleShapeZ_setMargin_1(b, a);
    };kc.prototype.getMargin = function () {
      return btCapsuleShapeZ_getMargin_0(this.a);
    };kc.prototype.getUpAxis = function () {
      return btCapsuleShapeZ_getUpAxis_0(this.a);
    };
    kc.prototype.getRadius = function () {
      return btCapsuleShapeZ_getRadius_0(this.a);
    };kc.prototype.getHalfHeight = function () {
      return btCapsuleShapeZ_getHalfHeight_0(this.a);
    };kc.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btCapsuleShapeZ_setLocalScaling_1(b, a);
    };kc.prototype.getLocalScaling = function () {
      return wrapPointer(btCapsuleShapeZ_getLocalScaling_0(this.a), h);
    };
    kc.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btCapsuleShapeZ_calculateLocalInertia_2(c, a, b);
    };kc.prototype.__destroy__ = function () {
      btCapsuleShapeZ___destroy___0(this.a);
    };function v() {
      throw "cannot construct a btContactSolverInfo, no constructor in IDL";
    }v.prototype = Object.create(WrapperObject.prototype);v.prototype.constructor = v;v.prototype.b = v;v.c = {};e.btContactSolverInfo = v;v.prototype.get_m_solverMode = function () {
      return btContactSolverInfo_get_m_solverMode_0(this.a);
    };
    v.prototype.set_m_solverMode = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btContactSolverInfo_set_m_solverMode_1(b, a);
    };v.prototype.get_m_splitImpulse = function () {
      return !!btContactSolverInfo_get_m_splitImpulse_0(this.a);
    };v.prototype.set_m_splitImpulse = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btContactSolverInfo_set_m_splitImpulse_1(b, a);
    };v.prototype.get_m_splitImpulsePenetrationThreshold = function () {
      return btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0(this.a);
    };
    v.prototype.set_m_splitImpulsePenetrationThreshold = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1(b, a);
    };v.prototype.get_m_numIterations = function () {
      return btContactSolverInfo_get_m_numIterations_0(this.a);
    };v.prototype.set_m_numIterations = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btContactSolverInfo_set_m_numIterations_1(b, a);
    };v.prototype.__destroy__ = function () {
      btContactSolverInfo___destroy___0(this.a);
    };
    function Fb() {
      throw "cannot construct a tScalarArray, no constructor in IDL";
    }Fb.prototype = Object.create(WrapperObject.prototype);Fb.prototype.constructor = Fb;Fb.prototype.b = Fb;Fb.c = {};e.tScalarArray = Fb;Fb.prototype.size = Fb.prototype.size = function () {
      return tScalarArray_size_0(this.a);
    };Fb.prototype.at = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);return tScalarArray_at_1(b, a);
    };Fb.prototype.clear = Fb.prototype.clear = function () {
      tScalarArray_clear_0(this.a);
    };
    Fb.prototype.push_back = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);tScalarArray_push_back_1(b, a);
    };Fb.prototype.pop_back = function () {
      tScalarArray_pop_back_0(this.a);
    };Fb.prototype.__destroy__ = function () {
      tScalarArray___destroy___0(this.a);
    };function lc(a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);this.a = btSphereShape_btSphereShape_1(a);getCache(lc)[this.a] = this;
    }lc.prototype = Object.create(f.prototype);lc.prototype.constructor = lc;lc.prototype.b = lc;lc.c = {};e.btSphereShape = lc;
    lc.prototype.setMargin = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btSphereShape_setMargin_1(b, a);
    };lc.prototype.getMargin = function () {
      return btSphereShape_getMargin_0(this.a);
    };lc.prototype.setLocalScaling = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btSphereShape_setLocalScaling_1(b, a);
    };lc.prototype.getLocalScaling = function () {
      return wrapPointer(btSphereShape_getLocalScaling_0(this.a), h);
    };
    lc.prototype.calculateLocalInertia = function (a, b) {
      var c = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);btSphereShape_calculateLocalInertia_2(c, a, b);
    };lc.prototype.__destroy__ = function () {
      btSphereShape___destroy___0(this.a);
    };
    function Z(a, b, c, d, g) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);b && "object" === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && (b = b.a);c && "object" === (typeof c === 'undefined' ? 'undefined' : _typeof(c)) && (c = c.a);d && "object" === (typeof d === 'undefined' ? 'undefined' : _typeof(d)) && (d = d.a);g && "object" === (typeof g === 'undefined' ? 'undefined' : _typeof(g)) && (g = g.a);this.a = LocalConvexResult_LocalConvexResult_5(a, b, c, d, g);getCache(Z)[this.a] = this;
    }Z.prototype = Object.create(WrapperObject.prototype);Z.prototype.constructor = Z;Z.prototype.b = Z;Z.c = {};e.LocalConvexResult = Z;
    Z.prototype.get_m_hitCollisionObject = function () {
      return wrapPointer(LocalConvexResult_get_m_hitCollisionObject_0(this.a), k);
    };Z.prototype.set_m_hitCollisionObject = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);LocalConvexResult_set_m_hitCollisionObject_1(b, a);
    };Z.prototype.get_m_localShapeInfo = function () {
      return wrapPointer(LocalConvexResult_get_m_localShapeInfo_0(this.a), Ib);
    };
    Z.prototype.set_m_localShapeInfo = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);LocalConvexResult_set_m_localShapeInfo_1(b, a);
    };Z.prototype.get_m_hitNormalLocal = function () {
      return wrapPointer(LocalConvexResult_get_m_hitNormalLocal_0(this.a), h);
    };Z.prototype.set_m_hitNormalLocal = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);LocalConvexResult_set_m_hitNormalLocal_1(b, a);
    };Z.prototype.get_m_hitPointLocal = function () {
      return wrapPointer(LocalConvexResult_get_m_hitPointLocal_0(this.a), h);
    };
    Z.prototype.set_m_hitPointLocal = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);LocalConvexResult_set_m_hitPointLocal_1(b, a);
    };Z.prototype.get_m_hitFraction = function () {
      return LocalConvexResult_get_m_hitFraction_0(this.a);
    };Z.prototype.set_m_hitFraction = function (a) {
      var b = this.a;a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);LocalConvexResult_set_m_hitFraction_1(b, a);
    };Z.prototype.__destroy__ = function () {
      LocalConvexResult___destroy___0(this.a);
    };
    (function () {
      function a() {
        e.BT_CONSTRAINT_ERP = enum_btConstraintParams_BT_CONSTRAINT_ERP();e.BT_CONSTRAINT_STOP_ERP = enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP();e.BT_CONSTRAINT_CFM = enum_btConstraintParams_BT_CONSTRAINT_CFM();e.BT_CONSTRAINT_STOP_CFM = enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM();e.PHY_FLOAT = enum_PHY_ScalarType_PHY_FLOAT();e.PHY_DOUBLE = enum_PHY_ScalarType_PHY_DOUBLE();e.PHY_INTEGER = enum_PHY_ScalarType_PHY_INTEGER();e.PHY_SHORT = enum_PHY_ScalarType_PHY_SHORT();e.PHY_FIXEDPOINT88 = enum_PHY_ScalarType_PHY_FIXEDPOINT88();e.PHY_UCHAR = enum_PHY_ScalarType_PHY_UCHAR();
      }e.calledRun ? a() : Ia.unshift(a);
    })();e._btGImpactCollisionAlgorithm_RegisterAlgorithm = function (a) {
      a && "object" === (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && (a = a.a);btGImpactCollisionAlgorithm_RegisterAlgorithm(a);
    };window.Physics3D = e;

    return Physics3D;
  };
}();
if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') module.exports = Physics3D;else if (typeof define === 'function' && define['amd']) define([], function () {
  return Physics3D;
});else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["Physics3D"] = Physics3D;
