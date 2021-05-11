(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CptvPlayerVue"] = factory();
	else
		root["CptvPlayerVue"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8146:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// UNUSED EXPORTS: default

// EXTERNAL MODULE: fs/promises (ignored)
var promises_ignored_ = __webpack_require__(4489);
// EXTERNAL MODULE: module (ignored)
var module_ignored_ = __webpack_require__(7297);
;// CONCATENATED MODULE: ./node_modules/cptv-decoder/decoder.js
let CptvPlayerContext;

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




class Unlocker {
  constructor() {
    this.fn = null;
  }
  unlock() {
    this.fn && this.fn();
  }
}

// For use in nodejs to wrap an already loaded array buffer into a Reader interface
const FakeReader = function (bytes, maxChunkSize) {
  const state = {
    offsets: []
  };
  state.bytes = bytes;
  state.offset = 0;
  const length = bytes.byteLength;
  // How many reader chunks to split the file into
  let numParts = 5;
  if (maxChunkSize !== 0) {
    numParts = Math.ceil(length / maxChunkSize);
  }
  const percentages = length / numParts;
  for (let i = 0; i < numParts; i++) {
    state.offsets.push(Math.ceil(percentages * i));
  }
  state.offsets.push(length);
  return {
    read() {
      return new Promise((resolve) => {
        state.offset += 1;
        const value = state.bytes.slice(state.offsets[state.offset - 1], state.offsets[state.offset]);
        resolve({
          value,
          done: state.offset === state.offsets.length - 1
        });
      });
    },
    cancel() {
      // Does nothing.
      return new Promise((resolve) => {
        resolve()
      });
    }
  }
};

// TODO(jon): This differs depending on whether the sensor is lepton 3 or 3.5
// TODO(jon): This is probably out of scope for this library, should be handled
//  at the player level.
let initedWasm = false;

class CptvDecoderInterface {
  async initWithCptvUrlAndSize(url, size) {
    const unlocker = new Unlocker();
    await this.lockIsUncontended(unlocker);
    this.locked = true;
    if (!initedWasm) {
      CptvPlayerContext = (await __webpack_require__.e(/* import() */ 711).then(__webpack_require__.bind(__webpack_require__, 6711))).CptvPlayerContext;
      initedWasm = true;
    } else if (initedWasm && this.inited) {
      this.playerContext.free();
      this.reader && await this.reader.cancel();
    }
    try {
      // Use this expired JWT token to test that failure case (usually when a page has been open too long)
      // const oldJWT = "https://api.cacophony.org.nz/api/v1/signedUrl?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdHlwZSI6ImZpbGVEb3dubG9hZCIsImtleSI6InJhdy8yMDIxLzA0LzE1LzQ3MGU2YjY1LWZkOTgtNDk4Ny1iNWQ3LWQyN2MwOWIxODFhYSIsImZpbGVuYW1lIjoiMjAyMTA0MTUtMTE0MjE2LmNwdHYiLCJtaW1lVHlwZSI6ImFwcGxpY2F0aW9uL3gtY3B0diIsImlhdCI6MTYxODQ2MjUwNiwiZXhwIjoxNjE4NDYzMTA2fQ.p3RAOX7Ns52JqHWTMM5Se-Fn-UCyRtX2tveaGrRmiwo";
      this.consumed = false;
      this.response = await fetch(url);
      if (this.response.status === 200) {
        this.reader = this.response.body.getReader();
        if (!size) {
          size = Number(this.response.headers.get("Content-Length")) || 0;
        }
        this.expectedSize = size;
        this.playerContext = await CptvPlayerContext.newWithStream(this.reader);
        unlocker.unlock();
        this.inited = true;
        this.locked = false;
        return true;
      } else {
        this.locked = false;
        try {
          const r = await this.response.json();
          return (r.messages && r.messages.pop()) || r.message || "Unknown error";
        } catch (e) {
          return await r.text();
        }
      }
    } catch (e) {
      this.locked = false;
      return `Failed to load CPTV url ${url}, ${e}`;
    }
  }

  async initWithCptvFile(filePath) {
    // Don't call this from a browser!
    const file = await promises_ignored_.readFile(filePath);
    const require = (0,module_ignored_.createRequire)("file:///Users/jon/Dev/Cacophony/cptv-player-vue/node_modules/cptv-decoder/decoder.js");
    const path = require.resolve("./pkg-node/index_bg.wasm");
    const wasm = await promises_ignored_.readFile(path);
    return this.initWithFileBytes(file, filePath, wasm);
  }

  async initWithFileBytes(fileBytes, filePath = "", wasm) {
    // Don't call this from a browser!
    const unlocker = new Unlocker();
    await this.lockIsUncontended(unlocker);
    this.locked = true;
    if (!initedWasm) {
      if (module_ignored_.createRequire) {
        CptvPlayerContext = (await __webpack_require__.e(/* import() */ 423).then(__webpack_require__.t.bind(__webpack_require__, 7423, 19))).CptvPlayerContext;
      } else {
        CptvPlayerContext = (await __webpack_require__.e(/* import() */ 711).then(__webpack_require__.bind(__webpack_require__, 6711))).CptvPlayerContext;
      }
      initedWasm = true;
    } else if (initedWasm && this.inited) {
      this.playerContext.free();
      this.reader && await this.reader.cancel();
    }
    this.consumed = false;
    this.reader = new FakeReader(fileBytes, 100000);
    this.expectedSize = fileBytes.length;
    try {
      this.playerContext = await CptvPlayerContext.newWithStream(this.reader);
      unlocker.unlock();
      this.inited = true;
      this.locked = false;
      return true;
    } catch (e) {
      this.locked = false;
      return `Failed to load CPTV file ${filePath}, ${e}`;
    }
  }

  async fetchNextFrame() {
    if (!this.reader) {
      return "You need to initialise the player with the url of a CPTV file";
    }
    if (this.consumed) {
      return "Stream has already been consumed and discarded";
    }
    const unlocker = new Unlocker();
    await this.lockIsUncontended(unlocker);
    this.locked = true;
    if (this.playerContext && this.playerContext.ptr) {
      this.playerContext = await CptvPlayerContext.fetchNextFrame(this.playerContext);
    }
    unlocker.unlock();
    this.locked = false;
    const frameData = this.playerContext.getNextFrame();
    if (frameData.length === 0) {
      return null;
    }
    const frameHeader = this.playerContext.getFrameHeader();
    return { data: new Uint16Array(frameData), meta: frameHeader };
  }

  async countTotalFrames() {
    if (!this.reader) {
      return "You need to initialise the player with the url of a CPTV file";
    }
    const unlocker = new Unlocker();
    await this.lockIsUncontended(unlocker);
    this.locked = true;
    if (this.playerContext && this.playerContext.ptr) {
      this.playerContext = await CptvPlayerContext.countTotalFrames(this.playerContext);
      // We can't call any other methods that read frame data on this stream,
      // since we've exhausted it and thrown away the data after scanning for the info we want.
      this.consumed = true;
    }
    unlocker.unlock();
    this.locked = false;
    return this.getTotalFrames();
  }

  async getMetadata() {
    const header = await this.getHeader();
    const totalFrameCount = await this.countTotalFrames();
    const duration = (1 / header.fps) * totalFrameCount;
    return {
      ...header,
      duration
    }
  }

  async getFileMetadata(filePath) {
    await this.initWithCptvFile(filePath, true);
    return await this.getMetadata();
  }

  async getStreamMetadata(url, size) {
    await this.initWithCptvUrlAndSize(url, size);
    return await this.getMetadata();
  }

  async lockIsUncontended(unlocker) {
    return new Promise((resolve) => {
      if (this.locked) {
        unlocker.fn = resolve;
      } else {
        resolve();
      }
    });
  }

  async getHeader() {
    if (!this.reader) {
      return "You need to initialise the player with the url of a CPTV file";
    }
    const unlocker = new Unlocker();
    await this.lockIsUncontended(unlocker);
    this.locked = true;
    if (this.playerContext && this.playerContext.ptr) {
      this.playerContext = await CptvPlayerContext.fetchHeader(this.playerContext);
    }
    const header = this.playerContext.getHeader();
    unlocker.unlock();
    this.locked = false;
    return header;
  }

  getTotalFrames() {
    if (!this.locked && this.inited && this.playerContext.ptr && this.playerContext.streamComplete()) {
      return this.playerContext.totalFrames();
    }
    return null;
  }

  getLoadProgress() {
    if (this.locked || (!this.playerContext || !this.playerContext.ptr)) {
      return null;
    }
    // This doesn't actually tell us how much has downloaded, just how much has been lazily read.
    return this.playerContext.bytesLoaded() / this.expectedSize;
  }
}

// EXTERNAL MODULE: worker_threads (ignored)
var worker_threads_ignored_ = __webpack_require__(4895);
;// CONCATENATED MODULE: ./node_modules/cptv-decoder/decoder.worker.js


const context = worker_threads_ignored_.parentPort || (typeof self !== "undefined" ? self : false);
if (context) {
  const player = new CptvDecoderInterface();
  context.addEventListener("message", async ({data}) => {
    switch (data.type) {
      case "initWithUrl": {
        const result = await player.initWithCptvUrlAndSize(data.url);
        context.postMessage({type: data.type, data: result});
      }
        break;
      case "initWithUrlAndSize": {
        const result = await player.initWithCptvUrlAndSize(data.url, data.size);
        context.postMessage({type: data.type, data: result});
      }
        break;
      case "initWithPath": {
        const result = await player.initWithCptvFile(data.path);
        context.postMessage({type: data.type, data: result});
      }
        break;
      case "initWithLocalCptvFile": {
        const result = await player.initWithFileBytes(data.arrayBuffer);
        context.postMessage({type: data.type, data: result});
      }
        break;
      case "getFileMetadata": {
        const header = await player.getFileMetadata(data.path);
        context.postMessage({type: data.type, data: header});
      }
        break;
      case "getStreamMetadata": {
        const header = await player.getStreamMetadata(data.url);
        context.postMessage({type: data.type, data: header});
      }
        break;
      case "getNextFrame": {
        const frame = await player.fetchNextFrame();
        context.postMessage({type: data.type, data: frame});
      }
        break;
      case "getTotalFrames": {
        const totalFrames = player.getTotalFrames();
        context.postMessage({type: data.type, data: totalFrames});
      }
        break;
      case "getLoadProgress": {
        const progress = player.getLoadProgress();
        context.postMessage({type: data.type, data: progress});
      }
        break;
      case "getHeader": {
        const header = await player.getHeader();
        context.postMessage({type: data.type, data: header});
      }
        break;
      default:
        context.postMessage(data);
        return;
    }
  });
}
/* harmony default export */ const decoder_worker = (() => {
  return false;
});


/***/ }),

/***/ 4489:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 7297:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 4895:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "CptvPlayerVue.umd." + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			372: 1,
/******/ 			146: 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = (typeof self !== 'undefined' ? self : this)["webpackChunkCptvPlayerVue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkCptvPlayerVue"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/wasm chunk loading */
/******/ 	(() => {
/******/ 		// object to store loaded and loading wasm modules
/******/ 		var installedWasmModules = {};
/******/ 		
/******/ 		function promiseResolve() { return Promise.resolve(); }
/******/ 		
/******/ 		var wasmImportedFuncCache0;
/******/ 		var wasmImportedFuncCache1;
/******/ 		var wasmImportedFuncCache2;
/******/ 		var wasmImportedFuncCache3;
/******/ 		var wasmImportedFuncCache4;
/******/ 		var wasmImportedFuncCache5;
/******/ 		var wasmImportedFuncCache6;
/******/ 		var wasmImportedFuncCache7;
/******/ 		var wasmImportedFuncCache8;
/******/ 		var wasmImportedFuncCache9;
/******/ 		var wasmImportedFuncCache10;
/******/ 		var wasmImportedFuncCache11;
/******/ 		var wasmImportedFuncCache12;
/******/ 		var wasmImportedFuncCache13;
/******/ 		var wasmImportedFuncCache14;
/******/ 		var wasmImportedFuncCache15;
/******/ 		var wasmImportedFuncCache16;
/******/ 		var wasmImportedFuncCache17;
/******/ 		var wasmImportedFuncCache18;
/******/ 		var wasmImportedFuncCache19;
/******/ 		var wasmImportedFuncCache20;
/******/ 		var wasmImportedFuncCache21;
/******/ 		var wasmImportedFuncCache22;
/******/ 		var wasmImportedFuncCache23;
/******/ 		var wasmImportedFuncCache24;
/******/ 		var wasmImportedFuncCache25;
/******/ 		var wasmImportedFuncCache26;
/******/ 		var wasmImportedFuncCache27;
/******/ 		var wasmImportedFuncCache28;
/******/ 		var wasmImportedFuncCache29;
/******/ 		var wasmImportedFuncCache30;
/******/ 		var wasmImportedFuncCache31;
/******/ 		var wasmImportedFuncCache32;
/******/ 		var wasmImportedFuncCache33;
/******/ 		var wasmImportedFuncCache34;
/******/ 		var wasmImportedFuncCache35;
/******/ 		var wasmImportedFuncCache36;
/******/ 		var wasmImportedFuncCache37;
/******/ 		var wasmImportObjects = {
/******/ 			1307: function() {
/******/ 				return {
/******/ 					"./index_bg.js": {
/******/ 						"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 							if(wasmImportedFuncCache0 === undefined) wasmImportedFuncCache0 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache0["ug"](p0i32);
/******/ 						},
/******/ 						"__wbg_new_3ea8490cd276c848": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache1 === undefined) wasmImportedFuncCache1 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache1["fL"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_number_new": function(p0f64) {
/******/ 							if(wasmImportedFuncCache2 === undefined) wasmImportedFuncCache2 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache2["pT"](p0f64);
/******/ 						},
/******/ 						"__wbg_newwithlength_90fbb2b2d057a3c0": function(p0i32) {
/******/ 							if(wasmImportedFuncCache3 === undefined) wasmImportedFuncCache3 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache3["bF"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_memory": function() {
/******/ 							if(wasmImportedFuncCache4 === undefined) wasmImportedFuncCache4 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache4["oH"]();
/******/ 						},
/******/ 						"__wbg_buffer_ebc6c8e75510eae3": function(p0i32) {
/******/ 							if(wasmImportedFuncCache5 === undefined) wasmImportedFuncCache5 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache5["v3"](p0i32);
/******/ 						},
/******/ 						"__wbg_newwithbyteoffsetandlength_9eb3327abeac2c52": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache6 === undefined) wasmImportedFuncCache6 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache6["MS"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_new_68adb0d58759a4ed": function() {
/******/ 							if(wasmImportedFuncCache7 === undefined) wasmImportedFuncCache7 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache7["qq"]();
/******/ 						},
/******/ 						"__wbg_set_2e79e744454afade": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache8 === undefined) wasmImportedFuncCache8 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache8["Hl"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache9 === undefined) wasmImportedFuncCache9 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache9["h4"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_new_59cb74e423758ede": function() {
/******/ 							if(wasmImportedFuncCache10 === undefined) wasmImportedFuncCache10 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache10["h9"]();
/******/ 						},
/******/ 						"__wbg_stack_558ba5917b466edd": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache11 === undefined) wasmImportedFuncCache11 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache11["Dz"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_error_4bb6c2a97407129a": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache12 === undefined) wasmImportedFuncCache12 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache12["kF"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_read_2516fe8e4e56274e": function(p0i32) {
/******/ 							if(wasmImportedFuncCache13 === undefined) wasmImportedFuncCache13 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache13["Xy"](p0i32);
/******/ 						},
/******/ 						"__wbg_then_ac66ca61394bfd21": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache14 === undefined) wasmImportedFuncCache14 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache14["xI"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbindgen_boolean_get": function(p0i32) {
/******/ 							if(wasmImportedFuncCache15 === undefined) wasmImportedFuncCache15 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache15["HT"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_is_undefined": function(p0i32) {
/******/ 							if(wasmImportedFuncCache16 === undefined) wasmImportedFuncCache16 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache16["XP"](p0i32);
/******/ 						},
/******/ 						"__wbg_instanceof_Uint8Array_d7349a138407a31e": function(p0i32) {
/******/ 							if(wasmImportedFuncCache17 === undefined) wasmImportedFuncCache17 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache17["QP"](p0i32);
/******/ 						},
/******/ 						"__wbg_byteLength_7d55aca7ec6c42cb": function(p0i32) {
/******/ 							if(wasmImportedFuncCache18 === undefined) wasmImportedFuncCache18 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache18["tv"](p0i32);
/******/ 						},
/******/ 						"__wbg_length_317f0dd77f7a6673": function(p0i32) {
/******/ 							if(wasmImportedFuncCache19 === undefined) wasmImportedFuncCache19 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache19["rX"](p0i32);
/******/ 						},
/******/ 						"__wbg_new_135e963dedf67b22": function(p0i32) {
/******/ 							if(wasmImportedFuncCache20 === undefined) wasmImportedFuncCache20 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache20["XV"](p0i32);
/******/ 						},
/******/ 						"__wbg_set_4a5072a31008e0cb": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache21 === undefined) wasmImportedFuncCache21 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache21["CV"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_cptvplayercontext_new": function(p0i32) {
/******/ 							if(wasmImportedFuncCache22 === undefined) wasmImportedFuncCache22 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache22["WA"](p0i32);
/******/ 						},
/******/ 						"__wbg_call_f5e0576f61ee7461": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache23 === undefined) wasmImportedFuncCache23 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache23["S8"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_get_0c6963cbab34fbb6": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache24 === undefined) wasmImportedFuncCache24 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache24["et"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_new_7031805939a80203": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache25 === undefined) wasmImportedFuncCache25 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache25["SS"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 							if(wasmImportedFuncCache26 === undefined) wasmImportedFuncCache26 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache26["m_"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache27 === undefined) wasmImportedFuncCache27 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache27["fY"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache28 === undefined) wasmImportedFuncCache28 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache28["Or"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_then_367b3e718069cfb9": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache29 === undefined) wasmImportedFuncCache29 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache29["DN"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_cb_drop": function(p0i32) {
/******/ 							if(wasmImportedFuncCache30 === undefined) wasmImportedFuncCache30 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache30["G6"](p0i32);
/******/ 						},
/******/ 						"__wbg_resolve_778af3f90b8e2b59": function(p0i32) {
/******/ 							if(wasmImportedFuncCache31 === undefined) wasmImportedFuncCache31 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache31["IL"](p0i32);
/******/ 						},
/******/ 						"__wbg_debug_3c0b82934d1dd91e": function(p0i32) {
/******/ 							if(wasmImportedFuncCache32 === undefined) wasmImportedFuncCache32 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache32["bf"](p0i32);
/******/ 						},
/******/ 						"__wbg_error_9ff84d33a850b1ef": function(p0i32) {
/******/ 							if(wasmImportedFuncCache33 === undefined) wasmImportedFuncCache33 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache33["Qw"](p0i32);
/******/ 						},
/******/ 						"__wbg_info_3b2058a219fa31b9": function(p0i32) {
/******/ 							if(wasmImportedFuncCache34 === undefined) wasmImportedFuncCache34 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache34["Jn"](p0i32);
/******/ 						},
/******/ 						"__wbg_log_386a8115a84a780d": function(p0i32) {
/******/ 							if(wasmImportedFuncCache35 === undefined) wasmImportedFuncCache35 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache35["IZ"](p0i32);
/******/ 						},
/******/ 						"__wbg_warn_5fc232d538408d4a": function(p0i32) {
/******/ 							if(wasmImportedFuncCache36 === undefined) wasmImportedFuncCache36 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache36["QL"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_closure_wrapper211": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache37 === undefined) wasmImportedFuncCache37 = __webpack_require__.c[3303].exports;
/******/ 							return wasmImportedFuncCache37["LC"](p0i32,p1i32,p2i32);
/******/ 						}
/******/ 					}
/******/ 				};
/******/ 			},
/******/ 		};
/******/ 		
/******/ 		var wasmModuleMap = {
/******/ 			"711": [
/******/ 				1307
/******/ 			]
/******/ 		};
/******/ 		
/******/ 		// object with all WebAssembly.instance exports
/******/ 		__webpack_require__.w = {};
/******/ 		
/******/ 		// Fetch + compile chunk loading for webassembly
/******/ 		__webpack_require__.f.wasm = function(chunkId, promises) {
/******/ 		
/******/ 			var wasmModules = wasmModuleMap[chunkId] || [];
/******/ 		
/******/ 			wasmModules.forEach(function(wasmModuleId, idx) {
/******/ 				var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/ 		
/******/ 				// a Promise means "currently loading" or "already loaded".
/******/ 				if(installedWasmModuleData)
/******/ 					promises.push(installedWasmModuleData);
/******/ 				else {
/******/ 					var importObject = wasmImportObjects[wasmModuleId]();
/******/ 					var req = fetch(__webpack_require__.p + "" + {"711":{"1307":"14f4ffee421e2ef7349c"}}[chunkId][wasmModuleId] + ".module.wasm");
/******/ 					var promise;
/******/ 					if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 						promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 							return WebAssembly.instantiate(items[0], items[1]);
/******/ 						});
/******/ 					} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 						promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 					} else {
/******/ 						var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 						promise = bytesPromise.then(function(bytes) {
/******/ 							return WebAssembly.instantiate(bytes, importObject);
/******/ 						});
/******/ 					}
/******/ 					promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 						return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 					}));
/******/ 				}
/******/ 			});
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(8146);
/******/ 	__webpack_exports__ = __webpack_exports__.default;
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=CptvPlayerVue.umd.372.js.map