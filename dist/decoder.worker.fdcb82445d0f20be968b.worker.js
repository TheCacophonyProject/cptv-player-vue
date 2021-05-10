/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "54eb45c3cc5cc775fc0b.wasm";

/***/ }),

/***/ 489:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 297:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 895:
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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = self.location + "";
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			794: 1
/******/ 		};
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./node_modules/cptv-decoder/pkg/index.js

let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_22(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h58f26b25ebd66e81(arg0, arg1, addHeapObject(arg2));
}

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    };
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
function __wbg_adapter_51(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h8c76bc75b4ce3cb1(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
*/
class CptvPlayerContext {

    static __wrap(ptr) {
        const obj = Object.create(CptvPlayerContext.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cptvplayercontext_free(ptr);
    }
    /**
    * @param {any} stream
    * @returns {any}
    */
    static newWithStream(stream) {
        var ret = wasm.cptvplayercontext_newWithStream(addHeapObject(stream));
        return takeObject(ret);
    }
    /**
    * @returns {boolean}
    */
    streamComplete() {
        var ret = wasm.cptvplayercontext_streamComplete(this.ptr);
        return ret !== 0;
    }
    /**
    * @param {CptvPlayerContext} context
    * @returns {any}
    */
    static countTotalFrames(context) {
        _assertClass(context, CptvPlayerContext);
        var ptr0 = context.ptr;
        context.ptr = 0;
        var ret = wasm.cptvplayercontext_countTotalFrames(ptr0);
        return takeObject(ret);
    }
    /**
    * @param {CptvPlayerContext} context
    * @returns {any}
    */
    static fetchNextFrame(context) {
        _assertClass(context, CptvPlayerContext);
        var ptr0 = context.ptr;
        context.ptr = 0;
        var ret = wasm.cptvplayercontext_fetchNextFrame(ptr0);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    totalFrames() {
        var ret = wasm.cptvplayercontext_totalFrames(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {number}
    */
    bytesLoaded() {
        var ret = wasm.cptvplayercontext_bytesLoaded(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {Uint16Array}
    */
    getNextFrame() {
        var ret = wasm.cptvplayercontext_getNextFrame(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    getFrameHeader() {
        var ret = wasm.cptvplayercontext_getFrameHeader(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {number}
    */
    getWidth() {
        var ret = wasm.cptvplayercontext_getWidth(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    getHeight() {
        var ret = wasm.cptvplayercontext_getHeight(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    getFrameRate() {
        var ret = wasm.cptvplayercontext_getFrameRate(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    getFramesPerIframe() {
        var ret = wasm.cptvplayercontext_getFramesPerIframe(this.ptr);
        return ret;
    }
    /**
    * @param {CptvPlayerContext} context
    * @returns {any}
    */
    static fetchHeader(context) {
        _assertClass(context, CptvPlayerContext);
        var ptr0 = context.ptr;
        context.ptr = 0;
        var ret = wasm.cptvplayercontext_fetchHeader(ptr0);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    getHeader() {
        var ret = wasm.cptvplayercontext_getHeader(this.ptr);
        return takeObject(ret);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL(/* asset import */ __webpack_require__(307), __webpack_require__.b);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_new_3ea8490cd276c848 = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_51(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            var ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        var ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithlength_90fbb2b2d057a3c0 = function(arg0) {
        var ret = new Uint16Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_memory = function() {
        var ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_ebc6c8e75510eae3 = function(arg0) {
        var ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_9eb3327abeac2c52 = function(arg0, arg1, arg2) {
        var ret = new Uint16Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_68adb0d58759a4ed = function() {
        var ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_2e79e744454afade = function(arg0, arg1, arg2) {
        getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        var ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
        var ret = getObject(arg1).stack;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbg_read_2516fe8e4e56274e = handleError(function(arg0) {
        var ret = getObject(arg0).read();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_then_ac66ca61394bfd21 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        var ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        var ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_d7349a138407a31e = function(arg0) {
        var ret = getObject(arg0) instanceof Uint8Array;
        return ret;
    };
    imports.wbg.__wbg_byteLength_7d55aca7ec6c42cb = function(arg0) {
        var ret = getObject(arg0).byteLength;
        return ret;
    };
    imports.wbg.__wbg_length_317f0dd77f7a6673 = function(arg0) {
        var ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_135e963dedf67b22 = function(arg0) {
        var ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_4a5072a31008e0cb = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_cptvplayercontext_new = function(arg0) {
        var ret = CptvPlayerContext.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_f5e0576f61ee7461 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_get_0c6963cbab34fbb6 = handleError(function(arg0, arg1) {
        var ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_7031805939a80203 = function(arg0, arg1) {
        var ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        var ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        var ret = debugString(getObject(arg1));
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_then_367b3e718069cfb9 = function(arg0, arg1) {
        var ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        var ret = false;
        return ret;
    };
    imports.wbg.__wbg_resolve_778af3f90b8e2b59 = function(arg0) {
        var ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_debug_3c0b82934d1dd91e = function(arg0) {
        console.debug(getObject(arg0));
    };
    imports.wbg.__wbg_error_9ff84d33a850b1ef = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_info_3b2058a219fa31b9 = function(arg0) {
        console.info(getObject(arg0));
    };
    imports.wbg.__wbg_log_386a8115a84a780d = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbg_warn_5fc232d538408d4a = function(arg0) {
        console.warn(getObject(arg0));
    };
    imports.wbg.__wbindgen_closure_wrapper211 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 49, __wbg_adapter_22);
        return addHeapObject(ret);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

/* harmony default export */ const pkg = (init);


// EXTERNAL MODULE: fs/promises (ignored)
var promises_ignored_ = __webpack_require__(489);
// EXTERNAL MODULE: module (ignored)
var module_ignored_ = __webpack_require__(297);
;// CONCATENATED MODULE: ./node_modules/cptv-decoder/decoder.js

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
      await pkg();
      initedWasm = true;
    } else if (initedWasm && this.inited) {
      this.playerContext.free();
      this.reader && await this.reader.cancel();
    }
    try {
      // Use this expired JWT token to test that failure case (usually when a page has been open too long)
      //const oldJWT = "https://api.cacophony.org.nz/api/v1/signedUrl?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdHlwZSI6ImZpbGVEb3dubG9hZCIsImtleSI6InJhdy8yMDIxLzA0LzE1LzQ3MGU2YjY1LWZkOTgtNDk4Ny1iNWQ3LWQyN2MwOWIxODFhYSIsImZpbGVuYW1lIjoiMjAyMTA0MTUtMTE0MjE2LmNwdHYiLCJtaW1lVHlwZSI6ImFwcGxpY2F0aW9uL3gtY3B0diIsImlhdCI6MTYxODQ2MjUwNiwiZXhwIjoxNjE4NDYzMTA2fQ.p3RAOX7Ns52JqHWTMM5Se-Fn-UCyRtX2tveaGrRmiwo";
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
    const path = require.resolve("./pkg/index_bg.wasm");
    const wasm = await promises_ignored_.readFile(path);
    return this.initWithFileBytes(file, filePath, wasm);
  }

  async initWithFileBytes(fileBytes, filePath = "", wasm) {
    // Don't call this from a browser!
    const unlocker = new Unlocker();
    await this.lockIsUncontended(unlocker);
    this.locked = true;
    if (!initedWasm) {
      await pkg(wasm);
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
var worker_threads_ignored_ = __webpack_require__(895);
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

})();

/******/ })()
;
//# sourceMappingURL=decoder.worker.fdcb82445d0f20be968b.worker.js.map