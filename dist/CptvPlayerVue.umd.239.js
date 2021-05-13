((typeof self !== 'undefined' ? self : this)["webpackChunkCptvPlayerVue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkCptvPlayerVue"] || []).push([[239],{

/***/ 9239:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// UNUSED EXPORTS: default

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(5666);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(8973);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(7042);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8783);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(3948);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__(9653);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.uint16-array.js
var es_typed_array_uint16_array = __webpack_require__(8255);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.copy-within.js
var es_typed_array_copy_within = __webpack_require__(2990);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.every.js
var es_typed_array_every = __webpack_require__(8927);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.fill.js
var es_typed_array_fill = __webpack_require__(3105);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.filter.js
var es_typed_array_filter = __webpack_require__(5035);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find.js
var es_typed_array_find = __webpack_require__(4345);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find-index.js
var es_typed_array_find_index = __webpack_require__(7174);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.for-each.js
var es_typed_array_for_each = __webpack_require__(2846);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.includes.js
var es_typed_array_includes = __webpack_require__(4731);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.index-of.js
var es_typed_array_index_of = __webpack_require__(7209);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.iterator.js
var es_typed_array_iterator = __webpack_require__(6319);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.join.js
var es_typed_array_join = __webpack_require__(8867);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.last-index-of.js
var es_typed_array_last_index_of = __webpack_require__(7789);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.map.js
var es_typed_array_map = __webpack_require__(3739);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reduce.js
var es_typed_array_reduce = __webpack_require__(9368);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reduce-right.js
var es_typed_array_reduce_right = __webpack_require__(4483);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reverse.js
var es_typed_array_reverse = __webpack_require__(2056);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.set.js
var es_typed_array_set = __webpack_require__(3462);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.slice.js
var es_typed_array_slice = __webpack_require__(678);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.some.js
var es_typed_array_some = __webpack_require__(7462);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.sort.js
var es_typed_array_sort = __webpack_require__(3824);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.subarray.js
var es_typed_array_subarray = __webpack_require__(5021);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-locale-string.js
var es_typed_array_to_locale_string = __webpack_require__(2974);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-string.js
var es_typed_array_to_string = __webpack_require__(5016);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(3420);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(1328);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(5982);
// EXTERNAL MODULE: fs/promises (ignored)
var promises_ignored_ = __webpack_require__(8740);
// EXTERNAL MODULE: module (ignored)
var module_ignored_ = __webpack_require__(5811);
;// CONCATENATED MODULE: ../cptv-rs/decoder.js






































































var CptvPlayerContext;
/**
 * NOTE: For browser usage, these imports need to be stubbed
 *  out in your webpack config using:
 *
 * resolve: {
 *  fallback: {
 *    fs,
 *    module,
 *  }
 * }
 */




var Unlocker = /*#__PURE__*/function () {
  function Unlocker() {
    (0,classCallCheck/* default */.Z)(this, Unlocker);

    this.fn = null;
  }

  (0,createClass/* default */.Z)(Unlocker, [{
    key: "unlock",
    value: function unlock() {
      this.fn && this.fn();
    }
  }]);

  return Unlocker;
}(); // For use in nodejs to wrap an already loaded array buffer into a Reader interface


var FakeReader = function FakeReader(bytes, maxChunkSize) {
  var state = {
    offsets: []
  };
  state.bytes = bytes;
  state.offset = 0;
  var length = bytes.byteLength; // How many reader chunks to split the file into

  var numParts = 5;

  if (maxChunkSize !== 0) {
    numParts = Math.ceil(length / maxChunkSize);
  }

  var percentages = length / numParts;

  for (var i = 0; i < numParts; i++) {
    state.offsets.push(Math.ceil(percentages * i));
  }

  state.offsets.push(length);
  return {
    read: function read() {
      return new Promise(function (resolve) {
        state.offset += 1;
        var value = state.bytes.slice(state.offsets[state.offset - 1], state.offsets[state.offset]);
        resolve({
          value: value,
          done: state.offset === state.offsets.length - 1
        });
      });
    },
    cancel: function cancel() {
      // Does nothing.
      return new Promise(function (resolve) {
        resolve();
      });
    }
  };
}; // TODO(jon): This differs depending on whether the sensor is lepton 3 or 3.5
// TODO(jon): This is probably out of scope for this library, should be handled
//  at the player level.


var initedWasm = false;
var CptvDecoderInterface = /*#__PURE__*/function () {
  function CptvDecoderInterface() {
    (0,classCallCheck/* default */.Z)(this, CptvDecoderInterface);
  }

  (0,createClass/* default */.Z)(CptvDecoderInterface, [{
    key: "initWithCptvUrlAndSize",
    value: function () {
      var _initWithCptvUrlAndSize = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, size) {
        var unlocker, _r;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                unlocker = new Unlocker();
                _context.next = 3;
                return this.lockIsUncontended(unlocker);

              case 3:
                this.locked = true;
                this.prevFrameHeader = null;

                if (initedWasm) {
                  _context.next = 12;
                  break;
                }

                _context.next = 8;
                return __webpack_require__.e(/* import() */ 860).then(__webpack_require__.bind(__webpack_require__, 8860));

              case 8:
                CptvPlayerContext = _context.sent.CptvPlayerContext;
                initedWasm = true;
                _context.next = 18;
                break;

              case 12:
                if (!(initedWasm && this.inited)) {
                  _context.next = 18;
                  break;
                }

                this.playerContext.free();
                _context.t0 = this.reader;

                if (!_context.t0) {
                  _context.next = 18;
                  break;
                }

                _context.next = 18;
                return this.reader.cancel();

              case 18:
                _context.prev = 18; // Use this expired JWT token to test that failure case (usually when a page has been open too long)
                // const oldJWT = "https://api.cacophony.org.nz/api/v1/signedUrl?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdHlwZSI6ImZpbGVEb3dubG9hZCIsImtleSI6InJhdy8yMDIxLzA0LzE1LzQ3MGU2YjY1LWZkOTgtNDk4Ny1iNWQ3LWQyN2MwOWIxODFhYSIsImZpbGVuYW1lIjoiMjAyMTA0MTUtMTE0MjE2LmNwdHYiLCJtaW1lVHlwZSI6ImFwcGxpY2F0aW9uL3gtY3B0diIsImlhdCI6MTYxODQ2MjUwNiwiZXhwIjoxNjE4NDYzMTA2fQ.p3RAOX7Ns52JqHWTMM5Se-Fn-UCyRtX2tveaGrRmiwo";

                this.consumed = false;
                _context.next = 22;
                return fetch(url);

              case 22:
                this.response = _context.sent;

                if (!(this.response.status === 200)) {
                  _context.next = 36;
                  break;
                }

                this.reader = this.response.body.getReader();

                if (!size) {
                  size = Number(this.response.headers.get("Content-Length")) || 0;
                }

                this.expectedSize = size;
                _context.next = 29;
                return CptvPlayerContext.newWithStream(this.reader);

              case 29:
                this.playerContext = _context.sent;
                unlocker.unlock();
                this.inited = true;
                this.locked = false;
                return _context.abrupt("return", true);

              case 36:
                this.locked = false;
                _context.prev = 37;
                _context.next = 40;
                return this.response.json();

              case 40:
                _r = _context.sent;
                return _context.abrupt("return", _r.messages && _r.messages.pop() || _r.message || "Unknown error");

              case 44:
                _context.prev = 44;
                _context.t1 = _context["catch"](37);
                _context.next = 48;
                return r.text();

              case 48:
                return _context.abrupt("return", _context.sent);

              case 49:
                _context.next = 55;
                break;

              case 51:
                _context.prev = 51;
                _context.t2 = _context["catch"](18);
                this.locked = false;
                return _context.abrupt("return", "Failed to load CPTV url ".concat(url, ", ").concat(_context.t2));

              case 55:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[18, 51], [37, 44]]);
      }));

      function initWithCptvUrlAndSize(_x, _x2) {
        return _initWithCptvUrlAndSize.apply(this, arguments);
      }

      return initWithCptvUrlAndSize;
    }()
  }, {
    key: "initWithCptvFile",
    value: function () {
      var _initWithCptvFile = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(filePath) {
        var file;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return promises_ignored_.readFile(filePath);

              case 2:
                file = _context2.sent;
                return _context2.abrupt("return", this.initWithFileBytes(file, filePath));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initWithCptvFile(_x3) {
        return _initWithCptvFile.apply(this, arguments);
      }

      return initWithCptvFile;
    }()
  }, {
    key: "initWithFileBytes",
    value: function () {
      var _initWithFileBytes = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(fileBytes) {
        var filePath,
            wasm,
            unlocker,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                filePath = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : "";
                wasm = _args3.length > 2 ? _args3[2] : undefined; // Don't call this from a browser!

                unlocker = new Unlocker();
                _context3.next = 5;
                return this.lockIsUncontended(unlocker);

              case 5:
                this.prevFrameHeader = null;
                this.locked = true;

                if (initedWasm) {
                  _context3.next = 20;
                  break;
                }

                if (!module_ignored_.createRequire) {
                  _context3.next = 14;
                  break;
                }

                _context3.next = 11;
                return __webpack_require__.e(/* import() */ 626).then(__webpack_require__.t.bind(__webpack_require__, 6626, 19));

              case 11:
                CptvPlayerContext = _context3.sent.CptvPlayerContext;
                _context3.next = 17;
                break;

              case 14:
                _context3.next = 16;
                return __webpack_require__.e(/* import() */ 860).then(__webpack_require__.bind(__webpack_require__, 8860));

              case 16:
                CptvPlayerContext = _context3.sent.CptvPlayerContext;

              case 17:
                initedWasm = true;
                _context3.next = 26;
                break;

              case 20:
                if (!(initedWasm && this.inited)) {
                  _context3.next = 26;
                  break;
                }

                this.playerContext.free();
                _context3.t0 = this.reader;

                if (!_context3.t0) {
                  _context3.next = 26;
                  break;
                }

                _context3.next = 26;
                return this.reader.cancel();

              case 26:
                this.consumed = false;
                this.reader = new FakeReader(fileBytes, 100000);
                this.expectedSize = fileBytes.length;
                _context3.prev = 29;
                _context3.next = 32;
                return CptvPlayerContext.newWithStream(this.reader);

              case 32:
                this.playerContext = _context3.sent;
                unlocker.unlock();
                this.inited = true;
                this.locked = false;
                return _context3.abrupt("return", true);

              case 39:
                _context3.prev = 39;
                _context3.t1 = _context3["catch"](29);
                this.locked = false;
                return _context3.abrupt("return", "Failed to load CPTV file ".concat(filePath, ", ").concat(_context3.t1));

              case 43:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[29, 39]]);
      }));

      function initWithFileBytes(_x4) {
        return _initWithFileBytes.apply(this, arguments);
      }

      return initWithFileBytes;
    }()
  }, {
    key: "fetchNextFrame",
    value: function () {
      var _fetchNextFrame = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var unlocker, frameData, frameHeader, sameFrameAsPrev;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.reader) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", "You need to initialise the player with the url of a CPTV file");

              case 2:
                if (!this.consumed) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt("return", "Stream has already been consumed and discarded");

              case 4:
                unlocker = new Unlocker();
                _context4.next = 7;
                return this.lockIsUncontended(unlocker);

              case 7:
                this.locked = true;

                if (!(this.playerContext && this.playerContext.ptr)) {
                  _context4.next = 21;
                  break;
                }

                _context4.prev = 9;
                _context4.next = 12;
                return CptvPlayerContext.fetchNextFrame(this.playerContext);

              case 12:
                this.playerContext = _context4.sent;
                _context4.next = 19;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](9);
                this.streamError = _context4.t0;
                return _context4.abrupt("return", null);

              case 19:
                _context4.next = 22;
                break;

              case 21:
                console.warn("Fetch next failed");

              case 22:
                unlocker.unlock();
                this.locked = false;
                frameData = this.playerContext.getNextFrame();
                frameHeader = this.playerContext.getFrameHeader(); // NOTE(jon): Work around a bug where the mlx sensor doesn't report timeOn times, just hardcodes 60000

                if (!(frameHeader.imageData.width !== 32)) {
                  _context4.next = 34;
                  break;
                }

                sameFrameAsPrev = frameHeader && this.prevFrameHeader && frameHeader.timeOnMs === this.prevFrameHeader.timeOnMs;

                if (!(sameFrameAsPrev && this.getTotalFrames() === null)) {
                  _context4.next = 33;
                  break;
                }

                this.prevFrameHeader = frameHeader;
                _context4.next = 32;
                return this.fetchNextFrame();

              case 32:
                return _context4.abrupt("return", _context4.sent);

              case 33:
                this.prevFrameHeader = frameHeader;

              case 34:
                if (!(frameData.length === 0)) {
                  _context4.next = 36;
                  break;
                }

                return _context4.abrupt("return", null);

              case 36:
                return _context4.abrupt("return", {
                  data: new Uint16Array(frameData),
                  meta: frameHeader
                });

              case 37:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[9, 15]]);
      }));

      function fetchNextFrame() {
        return _fetchNextFrame.apply(this, arguments);
      }

      return fetchNextFrame;
    }()
  }, {
    key: "countTotalFrames",
    value: function () {
      var _countTotalFrames = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var unlocker;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.reader) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", "You need to initialise the player with the url of a CPTV file");

              case 2:
                unlocker = new Unlocker();
                _context5.next = 5;
                return this.lockIsUncontended(unlocker);

              case 5:
                this.locked = true;

                if (!(this.playerContext && this.playerContext.ptr)) {
                  _context5.next = 11;
                  break;
                }

                _context5.next = 9;
                return CptvPlayerContext.countTotalFrames(this.playerContext);

              case 9:
                this.playerContext = _context5.sent; // We can't call any other methods that read frame data on this stream,
                // since we've exhausted it and thrown away the data after scanning for the info we want.

                this.consumed = true;

              case 11:
                unlocker.unlock();
                this.locked = false;
                return _context5.abrupt("return", this.getTotalFrames());

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function countTotalFrames() {
        return _countTotalFrames.apply(this, arguments);
      }

      return countTotalFrames;
    }()
  }, {
    key: "getMetadata",
    value: function () {
      var _getMetadata = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var header, totalFrameCount, duration;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getHeader();

              case 2:
                header = _context6.sent;
                _context6.next = 5;
                return this.countTotalFrames();

              case 5:
                totalFrameCount = _context6.sent;
                duration = 1 / header.fps * totalFrameCount;
                return _context6.abrupt("return", (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, header), {}, {
                  duration: duration,
                  totalFrames: totalFrameCount
                }));

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getMetadata() {
        return _getMetadata.apply(this, arguments);
      }

      return getMetadata;
    }()
  }, {
    key: "getFileMetadata",
    value: function () {
      var _getFileMetadata = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(filePath) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.initWithCptvFile(filePath, true);

              case 2:
                _context7.next = 4;
                return this.getMetadata();

              case 4:
                return _context7.abrupt("return", _context7.sent);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getFileMetadata(_x5) {
        return _getFileMetadata.apply(this, arguments);
      }

      return getFileMetadata;
    }()
  }, {
    key: "getStreamMetadata",
    value: function () {
      var _getStreamMetadata = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(url, size) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.initWithCptvUrlAndSize(url, size);

              case 2:
                _context8.next = 4;
                return this.getMetadata();

              case 4:
                return _context8.abrupt("return", _context8.sent);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getStreamMetadata(_x6, _x7) {
        return _getStreamMetadata.apply(this, arguments);
      }

      return getStreamMetadata;
    }()
  }, {
    key: "lockIsUncontended",
    value: function () {
      var _lockIsUncontended = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(unlocker) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", new Promise(function (resolve) {
                  if (_this.locked) {
                    unlocker.fn = resolve;
                  } else {
                    resolve();
                  }
                }));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function lockIsUncontended(_x8) {
        return _lockIsUncontended.apply(this, arguments);
      }

      return lockIsUncontended;
    }()
  }, {
    key: "getHeader",
    value: function () {
      var _getHeader = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var unlocker, header;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.reader) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", "You need to initialise the player with the url of a CPTV file");

              case 2:
                unlocker = new Unlocker();
                _context10.next = 5;
                return this.lockIsUncontended(unlocker);

              case 5:
                this.locked = true;

                if (!(this.playerContext && this.playerContext.ptr)) {
                  _context10.next = 10;
                  break;
                }

                _context10.next = 9;
                return CptvPlayerContext.fetchHeader(this.playerContext);

              case 9:
                this.playerContext = _context10.sent;

              case 10:
                header = this.playerContext.getHeader();
                unlocker.unlock();
                this.locked = false;
                return _context10.abrupt("return", header);

              case 14:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getHeader() {
        return _getHeader.apply(this, arguments);
      }

      return getHeader;
    }()
  }, {
    key: "getTotalFrames",
    value: function getTotalFrames() {
      if (this.streamError) {
        return 1;
      }

      if (!this.locked && this.inited && this.playerContext.ptr && this.playerContext.streamComplete()) {
        return this.playerContext.totalFrames();
      }

      return null;
    }
  }, {
    key: "getLoadProgress",
    value: function getLoadProgress() {
      if (this.locked || !this.playerContext || !this.playerContext.ptr) {
        return null;
      } // This doesn't actually tell us how much has downloaded, just how much has been lazily read.


      return this.playerContext.bytesLoaded() / this.expectedSize;
    }
  }, {
    key: "hasStreamError",
    value: function () {
      var _hasStreamError = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this.streamError !== undefined);

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function hasStreamError() {
        return _hasStreamError.apply(this, arguments);
      }

      return hasStreamError;
    }()
  }]);

  return CptvDecoderInterface;
}();
// EXTERNAL MODULE: worker_threads (ignored)
var worker_threads_ignored_ = __webpack_require__(4182);
;// CONCATENATED MODULE: ../cptv-rs/decoder.worker.js





var context = worker_threads_ignored_.parentPort || (typeof self !== "undefined" ? self : false);

if (context) {
  var player = new CptvDecoderInterface();
  context.addEventListener("message", /*#__PURE__*/function () {
    var _ref2 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var data, result, _result, _result2, _result3, header, _header, frame, totalFrames, progress, _header2, hasError;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = _ref.data;
              _context.t0 = data.type;
              _context.next = _context.t0 === "initWithUrl" ? 4 : _context.t0 === "initWithUrlAndSize" ? 9 : _context.t0 === "initWithPath" ? 14 : _context.t0 === "initWithLocalCptvFile" ? 19 : _context.t0 === "getFileMetadata" ? 24 : _context.t0 === "getStreamMetadata" ? 29 : _context.t0 === "getNextFrame" ? 34 : _context.t0 === "getTotalFrames" ? 39 : _context.t0 === "getLoadProgress" ? 42 : _context.t0 === "getHeader" ? 45 : _context.t0 === "hasStreamError" ? 50 : 55;
              break;

            case 4:
              _context.next = 6;
              return player.initWithCptvUrlAndSize(data.url);

            case 6:
              result = _context.sent;
              context.postMessage({
                type: data.type,
                data: result
              });
              return _context.abrupt("break", 57);

            case 9:
              _context.next = 11;
              return player.initWithCptvUrlAndSize(data.url, data.size);

            case 11:
              _result = _context.sent;
              context.postMessage({
                type: data.type,
                data: _result
              });
              return _context.abrupt("break", 57);

            case 14:
              _context.next = 16;
              return player.initWithCptvFile(data.path);

            case 16:
              _result2 = _context.sent;
              context.postMessage({
                type: data.type,
                data: _result2
              });
              return _context.abrupt("break", 57);

            case 19:
              _context.next = 21;
              return player.initWithFileBytes(data.arrayBuffer);

            case 21:
              _result3 = _context.sent;
              context.postMessage({
                type: data.type,
                data: _result3
              });
              return _context.abrupt("break", 57);

            case 24:
              _context.next = 26;
              return player.getFileMetadata(data.path);

            case 26:
              header = _context.sent;
              context.postMessage({
                type: data.type,
                data: header
              });
              return _context.abrupt("break", 57);

            case 29:
              _context.next = 31;
              return player.getStreamMetadata(data.url);

            case 31:
              _header = _context.sent;
              context.postMessage({
                type: data.type,
                data: _header
              });
              return _context.abrupt("break", 57);

            case 34:
              _context.next = 36;
              return player.fetchNextFrame();

            case 36:
              frame = _context.sent;
              context.postMessage({
                type: data.type,
                data: frame
              });
              return _context.abrupt("break", 57);

            case 39:
              totalFrames = player.getTotalFrames();
              context.postMessage({
                type: data.type,
                data: totalFrames
              });
              return _context.abrupt("break", 57);

            case 42:
              progress = player.getLoadProgress();
              context.postMessage({
                type: data.type,
                data: progress
              });
              return _context.abrupt("break", 57);

            case 45:
              _context.next = 47;
              return player.getHeader();

            case 47:
              _header2 = _context.sent;
              context.postMessage({
                type: data.type,
                data: _header2
              });
              return _context.abrupt("break", 57);

            case 50:
              _context.next = 52;
              return player.hasStreamError();

            case 52:
              hasError = _context.sent;
              context.postMessage({
                type: data.type,
                data: hasError
              });
              return _context.abrupt("break", 57);

            case 55:
              context.postMessage(data);
              return _context.abrupt("return");

            case 57:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}

/* harmony default export */ const decoder_worker = (function () {
  return false;
});

/***/ }),

/***/ 8740:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 5811:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 4182:
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=CptvPlayerVue.umd.239.js.map