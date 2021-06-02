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
;// CONCATENATED MODULE: ../cptv-rs/decoder.js






































































var CptvPlayerContext;
/**
 * NOTE: For browser usage, these imports need to be stubbed
 *  out in your webpack config using:
 *
 * resolve: {
 *  fallback: {
 *    fs
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


var FakeReader = function FakeReader(bytes) {
  var maxChunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
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
    key: "initWasm",
    value: function () {
      var _initWasm = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(isNode) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (initedWasm) {
                  _context.next = 13;
                  break;
                }

                if (!isNode) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return __webpack_require__.e(/* import() */ 626).then(__webpack_require__.t.bind(__webpack_require__, 6626, 19));

              case 4:
                CptvPlayerContext = _context.sent.CptvPlayerContext;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return __webpack_require__.e(/* import() */ 860).then(__webpack_require__.bind(__webpack_require__, 8860));

              case 9:
                CptvPlayerContext = _context.sent.CptvPlayerContext;

              case 10:
                initedWasm = true;
                _context.next = 19;
                break;

              case 13:
                if (!(initedWasm && this.inited)) {
                  _context.next = 19;
                  break;
                }

                this.playerContext.free();
                _context.t0 = this.reader;

                if (!_context.t0) {
                  _context.next = 19;
                  break;
                }

                _context.next = 19;
                return this.reader.cancel();

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initWasm(_x) {
        return _initWasm.apply(this, arguments);
      }

      return initWasm;
    }()
  }, {
    key: "initWithCptvUrlAndSize",
    value: function () {
      var _initWithCptvUrlAndSize = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, size) {
        var unlocker, _r;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                unlocker = new Unlocker();
                _context2.next = 3;
                return this.lockIsUncontended(unlocker);

              case 3:
                this.locked = true;
                this.framesRead = 0;
                this.prevFrameHeader = null;
                this.streamError = undefined;
                _context2.next = 9;
                return this.initWasm(false);

              case 9:
                _context2.prev = 9; // Use this expired JWT token to test that failure case (usually when a page has been open too long)
                // const oldJWT = "https://api.cacophony.org.nz/api/v1/signedUrl?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdHlwZSI6ImZpbGVEb3dubG9hZCIsImtleSI6InJhdy8yMDIxLzA0LzE1LzQ3MGU2YjY1LWZkOTgtNDk4Ny1iNWQ3LWQyN2MwOWIxODFhYSIsImZpbGVuYW1lIjoiMjAyMTA0MTUtMTE0MjE2LmNwdHYiLCJtaW1lVHlwZSI6ImFwcGxpY2F0aW9uL3gtY3B0diIsImlhdCI6MTYxODQ2MjUwNiwiZXhwIjoxNjE4NDYzMTA2fQ.p3RAOX7Ns52JqHWTMM5Se-Fn-UCyRtX2tveaGrRmiwo";

                this.consumed = false;
                _context2.next = 13;
                return fetch(url);

              case 13:
                this.response = _context2.sent;

                if (!(this.response.status === 200)) {
                  _context2.next = 27;
                  break;
                }

                this.reader = this.response.body.getReader();

                if (!size) {
                  size = Number(this.response.headers.get("Content-Length")) || 0;
                }

                this.expectedSize = size;
                _context2.next = 20;
                return CptvPlayerContext.newWithStream(this.reader);

              case 20:
                this.playerContext = _context2.sent;
                unlocker.unlock();
                this.inited = true;
                this.locked = false;
                return _context2.abrupt("return", true);

              case 27:
                unlocker.unlock();
                this.locked = false;
                _context2.prev = 29;
                _context2.next = 32;
                return this.response.json();

              case 32:
                _r = _context2.sent;
                return _context2.abrupt("return", _r.messages && _r.messages.pop() || _r.message || "Unknown error");

              case 36:
                _context2.prev = 36;
                _context2.t0 = _context2["catch"](29);
                _context2.next = 40;
                return r.text();

              case 40:
                return _context2.abrupt("return", _context2.sent);

              case 41:
                _context2.next = 47;
                break;

              case 43:
                _context2.prev = 43;
                _context2.t1 = _context2["catch"](9);
                this.locked = false;
                return _context2.abrupt("return", "Failed to load CPTV url ".concat(url, ", ").concat(_context2.t1));

              case 47:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[9, 43], [29, 36]]);
      }));

      function initWithCptvUrlAndSize(_x2, _x3) {
        return _initWithCptvUrlAndSize.apply(this, arguments);
      }

      return initWithCptvUrlAndSize;
    }()
  }, {
    key: "initWithCptvFile",
    value: function () {
      var _initWithCptvFile = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(filePath) {
        var file;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return promises_ignored_.readFile(filePath);

              case 2:
                file = _context3.sent;
                return _context3.abrupt("return", this.initWithFileBytes(file, filePath, true));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function initWithCptvFile(_x4) {
        return _initWithCptvFile.apply(this, arguments);
      }

      return initWithCptvFile;
    }()
  }, {
    key: "initWithFileBytes",
    value: function () {
      var _initWithFileBytes = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(fileBytes) {
        var filePath,
            isNode,
            unlocker,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                filePath = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : "";
                isNode = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : false; // Don't call this from a browser!

                this.framesRead = 0;
                this.streamError = undefined;
                unlocker = new Unlocker();
                _context4.next = 7;
                return this.lockIsUncontended(unlocker);

              case 7:
                this.prevFrameHeader = null;
                this.locked = true;
                _context4.next = 11;
                return this.initWasm(isNode);

              case 11:
                this.consumed = false;
                this.reader = new FakeReader(fileBytes, 100000);
                this.expectedSize = fileBytes.length;
                _context4.prev = 14;
                _context4.next = 17;
                return CptvPlayerContext.newWithStream(this.reader);

              case 17:
                this.playerContext = _context4.sent;
                unlocker.unlock();
                this.inited = true;
                this.locked = false;
                return _context4.abrupt("return", true);

              case 24:
                _context4.prev = 24;
                _context4.t0 = _context4["catch"](14);
                this.streamError = _context4.t0;
                unlocker.unlock();
                this.locked = false;
                return _context4.abrupt("return", "Failed to load CPTV file ".concat(filePath, ", ").concat(_context4.t0));

              case 30:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[14, 24]]);
      }));

      function initWithFileBytes(_x5) {
        return _initWithFileBytes.apply(this, arguments);
      }

      return initWithFileBytes;
    }()
  }, {
    key: "fetchNextFrame",
    value: function () {
      var _fetchNextFrame = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var unlocker, frameData, frameHeader, sameFrameAsPrev;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.reader) {
                  _context5.next = 3;
                  break;
                }

                console.warn("You need to initialise the player with the url of a CPTV file");
                return _context5.abrupt("return", null);

              case 3:
                if (!this.consumed) {
                  _context5.next = 6;
                  break;
                }

                console.warn("Stream has already been consumed and discarded");
                return _context5.abrupt("return", null);

              case 6:
                unlocker = new Unlocker();
                _context5.next = 9;
                return this.lockIsUncontended(unlocker);

              case 9:
                this.locked = true;

                if (!(this.playerContext && this.playerContext.ptr)) {
                  _context5.next = 22;
                  break;
                }

                _context5.prev = 11;
                _context5.next = 14;
                return CptvPlayerContext.fetchNextFrame(this.playerContext);

              case 14:
                this.playerContext = _context5.sent;
                _context5.next = 20;
                break;

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5["catch"](11);
                this.streamError = _context5.t0;

              case 20:
                _context5.next = 23;
                break;

              case 22:
                console.warn("Fetch next failed");

              case 23:
                unlocker.unlock();
                this.locked = false;

                if (!this.hasStreamError()) {
                  _context5.next = 27;
                  break;
                }

                return _context5.abrupt("return", null);

              case 27:
                frameData = this.playerContext.getNextFrame();
                frameHeader = this.playerContext.getFrameHeader(); // NOTE(jon): Work around a bug where the mlx sensor doesn't report timeOn times, just hardcodes 60000

                if (!(frameHeader && frameHeader.imageData.width !== 32)) {
                  _context5.next = 37;
                  break;
                }

                sameFrameAsPrev = frameHeader && this.prevFrameHeader && frameHeader.timeOnMs === this.prevFrameHeader.timeOnMs;

                if (!(sameFrameAsPrev && this.getTotalFrames() === null)) {
                  _context5.next = 36;
                  break;
                }

                this.prevFrameHeader = frameHeader;
                _context5.next = 35;
                return this.fetchNextFrame();

              case 35:
                return _context5.abrupt("return", _context5.sent);

              case 36:
                this.prevFrameHeader = frameHeader;

              case 37:
                if (!(frameData.length === 0)) {
                  _context5.next = 39;
                  break;
                }

                return _context5.abrupt("return", null);

              case 39:
                this.framesRead++;
                return _context5.abrupt("return", {
                  data: new Uint16Array(frameData),
                  meta: frameHeader
                });

              case 41:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[11, 17]]);
      }));

      function fetchNextFrame() {
        return _fetchNextFrame.apply(this, arguments);
      }

      return fetchNextFrame;
    }()
  }, {
    key: "countTotalFrames",
    value: function () {
      var _countTotalFrames = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var unlocker;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.reader) {
                  _context6.next = 3;
                  break;
                }

                console.warn("You need to initialise the player with the url of a CPTV file");
                return _context6.abrupt("return", 0);

              case 3:
                unlocker = new Unlocker();
                _context6.next = 6;
                return this.lockIsUncontended(unlocker);

              case 6:
                this.locked = true;

                if (!(this.playerContext && this.playerContext.ptr)) {
                  _context6.next = 18;
                  break;
                }

                _context6.prev = 8;
                _context6.next = 11;
                return CptvPlayerContext.countTotalFrames(this.playerContext);

              case 11:
                this.playerContext = _context6.sent;
                _context6.next = 17;
                break;

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6["catch"](8);
                this.streamError = _context6.t0;

              case 17:
                // We can't call any other methods that read frame data on this stream,
                // since we've exhausted it and thrown away the data after scanning for the info we want.
                this.consumed = true;

              case 18:
                unlocker.unlock();
                this.locked = false;
                return _context6.abrupt("return", this.getTotalFrames());

              case 21:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[8, 14]]);
      }));

      function countTotalFrames() {
        return _countTotalFrames.apply(this, arguments);
      }

      return countTotalFrames;
    }()
  }, {
    key: "getMetadata",
    value: function () {
      var _getMetadata = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var header, totalFrameCount, duration;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getHeader();

              case 2:
                header = _context7.sent;
                totalFrameCount = 0;

                if (!this.hasStreamError()) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", this.streamError);

              case 8:
                _context7.next = 10;
                return this.countTotalFrames();

              case 10:
                totalFrameCount = _context7.sent;
                duration = 1 / header.fps * totalFrameCount;
                return _context7.abrupt("return", (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, header), {}, {
                  duration: duration,
                  totalFrames: totalFrameCount
                }));

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getMetadata() {
        return _getMetadata.apply(this, arguments);
      }

      return getMetadata;
    }()
  }, {
    key: "getBytesMetadata",
    value: function () {
      var _getBytesMetadata = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(fileBytes) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.initWithFileBytes(fileBytes, "", !!promises_ignored_);

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

      function getBytesMetadata(_x6) {
        return _getBytesMetadata.apply(this, arguments);
      }

      return getBytesMetadata;
    }()
  }, {
    key: "getFileMetadata",
    value: function () {
      var _getFileMetadata = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(filePath) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.initWithCptvFile(filePath);

              case 2:
                _context9.next = 4;
                return this.getMetadata();

              case 4:
                return _context9.abrupt("return", _context9.sent);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getFileMetadata(_x7) {
        return _getFileMetadata.apply(this, arguments);
      }

      return getFileMetadata;
    }()
  }, {
    key: "getStreamMetadata",
    value: function () {
      var _getStreamMetadata = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(url, size) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.initWithCptvUrlAndSize(url, size);

              case 2:
                _context10.next = 4;
                return this.getMetadata();

              case 4:
                return _context10.abrupt("return", _context10.sent);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getStreamMetadata(_x8, _x9) {
        return _getStreamMetadata.apply(this, arguments);
      }

      return getStreamMetadata;
    }()
  }, {
    key: "lockIsUncontended",
    value: function () {
      var _lockIsUncontended = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(unlocker) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", new Promise(function (resolve) {
                  if (_this.locked) {
                    unlocker.fn = resolve;
                  } else {
                    resolve();
                  }
                }));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function lockIsUncontended(_x10) {
        return _lockIsUncontended.apply(this, arguments);
      }

      return lockIsUncontended;
    }()
  }, {
    key: "getHeader",
    value: function () {
      var _getHeader = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var unlocker, header;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (this.reader) {
                  _context12.next = 2;
                  break;
                }

                return _context12.abrupt("return", "You need to initialise the player with the url of a CPTV file");

              case 2:
                unlocker = new Unlocker();
                _context12.next = 5;
                return this.lockIsUncontended(unlocker);

              case 5:
                this.locked = true;

                if (!(this.playerContext && this.playerContext.ptr)) {
                  _context12.next = 10;
                  break;
                }

                _context12.next = 9;
                return CptvPlayerContext.fetchHeader(this.playerContext);

              case 9:
                this.playerContext = _context12.sent;

              case 10:
                if (!(this.playerContext && this.playerContext.ptr)) {
                  _context12.next = 16;
                  break;
                }

                header = this.playerContext.getHeader();

                if (header === "Unable to parse header") {
                  this.streamError = header;
                }

                unlocker.unlock();
                this.locked = false;
                return _context12.abrupt("return", header);

              case 16:
                return _context12.abrupt("return", this.streamError);

              case 17:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
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
        return this.framesRead;
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
    value: function hasStreamError() {
      return this.streamError !== undefined;
    }
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
      var data, result, _result, _result2, _result3, header, _header, _header2, frame, totalFrames, progress, _header3, hasError, error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = _ref.data;
              _context.t0 = data.type;
              _context.next = _context.t0 === "initWithUrl" ? 4 : _context.t0 === "initWithUrlAndSize" ? 9 : _context.t0 === "initWithPath" ? 14 : _context.t0 === "initWithLocalCptvFile" ? 19 : _context.t0 === "getBytesMetadata" ? 24 : _context.t0 === "getFileMetadata" ? 29 : _context.t0 === "getStreamMetadata" ? 34 : _context.t0 === "getNextFrame" ? 39 : _context.t0 === "getTotalFrames" ? 44 : _context.t0 === "getLoadProgress" ? 47 : _context.t0 === "getHeader" ? 50 : _context.t0 === "hasStreamError" ? 55 : _context.t0 === "getStreamError" ? 58 : 61;
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
              return _context.abrupt("break", 63);

            case 9:
              _context.next = 11;
              return player.initWithCptvUrlAndSize(data.url, data.size);

            case 11:
              _result = _context.sent;
              context.postMessage({
                type: data.type,
                data: _result
              });
              return _context.abrupt("break", 63);

            case 14:
              _context.next = 16;
              return player.initWithCptvFile(data.path);

            case 16:
              _result2 = _context.sent;
              context.postMessage({
                type: data.type,
                data: _result2
              });
              return _context.abrupt("break", 63);

            case 19:
              _context.next = 21;
              return player.initWithFileBytes(data.arrayBuffer);

            case 21:
              _result3 = _context.sent;
              context.postMessage({
                type: data.type,
                data: _result3
              });
              return _context.abrupt("break", 63);

            case 24:
              _context.next = 26;
              return player.getBytesMetadata(data.arrayBuffer);

            case 26:
              header = _context.sent;
              context.postMessage({
                type: data.type,
                data: header
              });
              return _context.abrupt("break", 63);

            case 29:
              _context.next = 31;
              return player.getFileMetadata(data.path);

            case 31:
              _header = _context.sent;
              context.postMessage({
                type: data.type,
                data: _header
              });
              return _context.abrupt("break", 63);

            case 34:
              _context.next = 36;
              return player.getStreamMetadata(data.url);

            case 36:
              _header2 = _context.sent;
              context.postMessage({
                type: data.type,
                data: _header2
              });
              return _context.abrupt("break", 63);

            case 39:
              _context.next = 41;
              return player.fetchNextFrame();

            case 41:
              frame = _context.sent;
              context.postMessage({
                type: data.type,
                data: frame
              });
              return _context.abrupt("break", 63);

            case 44:
              totalFrames = player.getTotalFrames();
              context.postMessage({
                type: data.type,
                data: totalFrames
              });
              return _context.abrupt("break", 63);

            case 47:
              progress = player.getLoadProgress();
              context.postMessage({
                type: data.type,
                data: progress
              });
              return _context.abrupt("break", 63);

            case 50:
              _context.next = 52;
              return player.getHeader();

            case 52:
              _header3 = _context.sent;
              context.postMessage({
                type: data.type,
                data: _header3
              });
              return _context.abrupt("break", 63);

            case 55:
              hasError = player.hasStreamError();
              context.postMessage({
                type: data.type,
                data: hasError
              });
              return _context.abrupt("break", 63);

            case 58:
              error = player.streamError;
              context.postMessage({
                type: data.type,
                data: error
              });
              return _context.abrupt("break", 63);

            case 61:
              context.postMessage(data);
              return _context.abrupt("return");

            case 63:
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

/***/ 4182:
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=CptvPlayerVue.umd.239.js.map