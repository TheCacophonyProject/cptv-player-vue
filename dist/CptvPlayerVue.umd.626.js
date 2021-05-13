((typeof self !== 'undefined' ? self : this)["webpackChunkCptvPlayerVue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkCptvPlayerVue"] || []).push([[626],{

/***/ 6677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ 2423:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hiddenKeys = __webpack_require__(3501);
var isObject = __webpack_require__(111);
var has = __webpack_require__(6656);
var defineProperty = __webpack_require__(3070).f;
var uid = __webpack_require__(9711);
var FREEZING = __webpack_require__(6677);

var METADATA = uid('meta');
var id = 0;

// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ 2261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var regexpFlags = __webpack_require__(7066);
var stickyHelpers = __webpack_require__(2999);
var shared = __webpack_require__(2309);

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
// eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 7066:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(9670);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 2999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var fails = __webpack_require__(7293);

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ 3290:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var fill = __webpack_require__(1285);
var addToUnscopables = __webpack_require__(1223);

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ 9600:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var IndexedObject = __webpack_require__(8361);
var toIndexedObject = __webpack_require__(5656);
var arrayMethodIsStrict = __webpack_require__(9341);

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ 8309:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var defineProperty = __webpack_require__(3070).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ 3371:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var FREEZING = __webpack_require__(6677);
var fails = __webpack_require__(7293);
var isObject = __webpack_require__(111);
var onFreeze = __webpack_require__(2423).onFreeze;

// eslint-disable-next-line es/no-object-freeze -- safe
var $freeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { $freeze(1); });

// `Object.freeze` method
// https://tc39.es/ecma262/#sec-object.freeze
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it;
  }
});


/***/ }),

/***/ 4819:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var isObject = __webpack_require__(111);
var anObject = __webpack_require__(9670);
var has = __webpack_require__(6656);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var getPrototypeOf = __webpack_require__(9518);

// `Reflect.get` method
// https://tc39.es/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value')
    ? descriptor.value
    : descriptor.get === undefined
      ? undefined
      : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});


/***/ }),

/***/ 4916:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var exec = __webpack_require__(2261);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 8992:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(2109);
var toIndexedObject = __webpack_require__(5656);
var toLength = __webpack_require__(7466);

// `String.raw` method
// https://tc39.es/ecma262/#sec-string.raw
$({ target: 'String', stat: true }, {
  raw: function raw(template) {
    var rawTemplate = toIndexedObject(template.raw);
    var literalSegments = toLength(rawTemplate.length);
    var argumentsLength = arguments.length;
    var elements = [];
    var i = 0;
    while (literalSegments > i) {
      elements.push(String(rawTemplate[i++]));
      if (i < argumentsLength) elements.push(String(arguments[i]));
    } return elements.join('');
  }
});


/***/ }),

/***/ 1817:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var has = __webpack_require__(6656);
var isObject = __webpack_require__(111);
var defineProperty = __webpack_require__(3070).f;
var copyConstructorProperties = __webpack_require__(9920);

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ 2165:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var defineWellKnownSymbol = __webpack_require__(7235);

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ 5125:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var createTypedArrayConstructor = __webpack_require__(9843);

// `Int32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int32', function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 2472:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var createTypedArrayConstructor = __webpack_require__(9843);

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 934:
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 4190:
/***/ ((module) => {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 5645:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7042);

__webpack_require__(3371);

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

module.exports = _taggedTemplateLiteral;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 1001:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(2526);

__webpack_require__(1817);

__webpack_require__(1539);

__webpack_require__(2165);

__webpack_require__(6992);

__webpack_require__(8783);

__webpack_require__(3948);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports.default = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports.default = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 6626:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __dirname = "/";
__webpack_require__(8992);

__webpack_require__(3290);

__webpack_require__(6992);

__webpack_require__(1539);

__webpack_require__(2472);

__webpack_require__(2990);

__webpack_require__(8927);

__webpack_require__(3105);

__webpack_require__(5035);

__webpack_require__(4345);

__webpack_require__(7174);

__webpack_require__(2846);

__webpack_require__(4731);

__webpack_require__(7209);

__webpack_require__(6319);

__webpack_require__(8867);

__webpack_require__(7789);

__webpack_require__(3739);

__webpack_require__(9368);

__webpack_require__(4483);

__webpack_require__(2056);

__webpack_require__(3462);

__webpack_require__(678);

__webpack_require__(7462);

__webpack_require__(3824);

__webpack_require__(5021);

__webpack_require__(2974);

__webpack_require__(5016);

__webpack_require__(2526);

__webpack_require__(1817);

__webpack_require__(8309);

__webpack_require__(4916);

__webpack_require__(2222);

__webpack_require__(7042);

__webpack_require__(5125);

__webpack_require__(8674);

__webpack_require__(8255);

__webpack_require__(4819);

__webpack_require__(9600);

var _classCallCheck = __webpack_require__(934).default;

var _createClass = __webpack_require__(4190).default;

var _typeof = __webpack_require__(1001).default;

var _taggedTemplateLiteral = __webpack_require__(5645).default;

var _templateObject;

__webpack_require__(8992);

__webpack_require__(3290);

__webpack_require__(6992);

__webpack_require__(1539);

__webpack_require__(2472);

__webpack_require__(2990);

__webpack_require__(8927);

__webpack_require__(3105);

__webpack_require__(5035);

__webpack_require__(4345);

__webpack_require__(7174);

__webpack_require__(2846);

__webpack_require__(4731);

__webpack_require__(7209);

__webpack_require__(6319);

__webpack_require__(8867);

__webpack_require__(7789);

__webpack_require__(3739);

__webpack_require__(9368);

__webpack_require__(4483);

__webpack_require__(2056);

__webpack_require__(3462);

__webpack_require__(678);

__webpack_require__(7462);

__webpack_require__(3824);

__webpack_require__(5021);

__webpack_require__(2974);

__webpack_require__(5016);

__webpack_require__(2526);

__webpack_require__(1817);

__webpack_require__(8309);

__webpack_require__(4916);

__webpack_require__(2222);

__webpack_require__(7042);

__webpack_require__(5125);

__webpack_require__(8674);

__webpack_require__(8255);

__webpack_require__(4819);

__webpack_require__(9600);

var imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
var wasm;

var _require = __webpack_require__(1090)(String.raw(_templateObject || (_templateObject = _taggedTemplateLiteral(["util"])))),
    TextDecoder = _require.TextDecoder,
    TextEncoder = _require.TextEncoder;

var heap = new Array(32).fill(undefined);
heap.push(undefined, null, true, false);

function getObject(idx) {
  return heap[idx];
}

var heap_next = heap.length;

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  var ret = getObject(idx);
  dropObject(idx);
  return ret;
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  var idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}

var cachedTextDecoder = new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;

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
  var type = _typeof(val);

  if (type == 'number' || type == 'boolean' || val == null) {
    return "".concat(val);
  }

  if (type == 'string') {
    return "\"".concat(val, "\"");
  }

  if (type == 'symbol') {
    var description = val.description;

    if (description == null) {
      return 'Symbol';
    } else {
      return "Symbol(".concat(description, ")");
    }
  }

  if (type == 'function') {
    var name = val.name;

    if (typeof name == 'string' && name.length > 0) {
      return "Function(".concat(name, ")");
    } else {
      return 'Function';
    }
  } // objects


  if (Array.isArray(val)) {
    var length = val.length;
    var debug = '[';

    if (length > 0) {
      debug += debugString(val[0]);
    }

    for (var i = 1; i < length; i++) {
      debug += ', ' + debugString(val[i]);
    }

    debug += ']';
    return debug;
  } // Test for built-in


  var builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  var className;

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
  } // errors


  if (val instanceof Error) {
    return "".concat(val.name, ": ").concat(val.message, "\n").concat(val.stack);
  } // TODO we could test for more things here, like `Set`s and `Map`s.


  return className;
}

var WASM_VECTOR_LEN = 0;
var cachedTextEncoder = new TextEncoder('utf-8');
var encodeString = typeof cachedTextEncoder.encodeInto === 'function' ? function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function (arg, view) {
  var buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    var buf = cachedTextEncoder.encode(arg);

    var _ptr = malloc(buf.length);

    getUint8Memory0().subarray(_ptr, _ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return _ptr;
  }

  var len = arg.length;
  var ptr = malloc(len);
  var mem = getUint8Memory0();
  var offset = 0;

  for (; offset < len; offset++) {
    var code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }

    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    var view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    var ret = encodeString(arg, view);
    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

var cachegetInt32Memory0 = null;

function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }

  return cachegetInt32Memory0;
}

function makeMutClosure(arg0, arg1, dtor, f) {
  var state = {
    a: arg0,
    b: arg1,
    cnt: 1,
    dtor: dtor
  };

  var real = function real() {
    // First up with a closure we increment the internal reference
    // count. This ensures that the Rust closure environment won't
    // be deallocated while we're invoking it.
    state.cnt++;
    var a = state.a;
    state.a = 0;

    try {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return f.apply(void 0, [a, state.b].concat(args));
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
    throw new Error("expected instance of ".concat(klass.name));
  }

  return instance.ptr;
}

function __wbg_adapter_51(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen__convert__closures__invoke2_mut__h8c76bc75b4ce3cb1(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}
/**
*/


var CptvPlayerContext = /*#__PURE__*/function () {
  "use strict";

  function CptvPlayerContext() {
    _classCallCheck(this, CptvPlayerContext);
  }

  _createClass(CptvPlayerContext, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var ptr = this.ptr;
      this.ptr = 0;
      return ptr;
    }
  }, {
    key: "free",
    value: function free() {
      var ptr = this.__destroy_into_raw();

      wasm.__wbg_cptvplayercontext_free(ptr);
    }
    /**
    * @param {any} stream
    * @returns {any}
    */

  }, {
    key: "streamComplete",
    value:
    /**
    * @returns {boolean}
    */
    function streamComplete() {
      var ret = wasm.cptvplayercontext_streamComplete(this.ptr);
      return ret !== 0;
    }
    /**
    * @param {CptvPlayerContext} context
    * @returns {any}
    */

  }, {
    key: "totalFrames",
    value:
    /**
    * @returns {any}
    */
    function totalFrames() {
      var ret = wasm.cptvplayercontext_totalFrames(this.ptr);
      return takeObject(ret);
    }
    /**
    * @returns {number}
    */

  }, {
    key: "bytesLoaded",
    value: function bytesLoaded() {
      var ret = wasm.cptvplayercontext_bytesLoaded(this.ptr);
      return ret >>> 0;
    }
    /**
    * @returns {Uint16Array}
    */

  }, {
    key: "getNextFrame",
    value: function getNextFrame() {
      var ret = wasm.cptvplayercontext_getNextFrame(this.ptr);
      return takeObject(ret);
    }
    /**
    * @returns {any}
    */

  }, {
    key: "getFrameHeader",
    value: function getFrameHeader() {
      var ret = wasm.cptvplayercontext_getFrameHeader(this.ptr);
      return takeObject(ret);
    }
    /**
    * @returns {number}
    */

  }, {
    key: "getWidth",
    value: function getWidth() {
      var ret = wasm.cptvplayercontext_getWidth(this.ptr);
      return ret >>> 0;
    }
    /**
    * @returns {number}
    */

  }, {
    key: "getHeight",
    value: function getHeight() {
      var ret = wasm.cptvplayercontext_getHeight(this.ptr);
      return ret >>> 0;
    }
    /**
    * @returns {number}
    */

  }, {
    key: "getFrameRate",
    value: function getFrameRate() {
      var ret = wasm.cptvplayercontext_getFrameRate(this.ptr);
      return ret;
    }
    /**
    * @returns {number}
    */

  }, {
    key: "getFramesPerIframe",
    value: function getFramesPerIframe() {
      var ret = wasm.cptvplayercontext_getFramesPerIframe(this.ptr);
      return ret;
    }
    /**
    * @param {CptvPlayerContext} context
    * @returns {any}
    */

  }, {
    key: "getHeader",
    value:
    /**
    * @returns {any}
    */
    function getHeader() {
      var ret = wasm.cptvplayercontext_getHeader(this.ptr);
      return takeObject(ret);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(CptvPlayerContext.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "newWithStream",
    value: function newWithStream(stream) {
      var ret = wasm.cptvplayercontext_newWithStream(addHeapObject(stream));
      return takeObject(ret);
    }
  }, {
    key: "countTotalFrames",
    value: function countTotalFrames(context) {
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

  }, {
    key: "fetchNextFrame",
    value: function fetchNextFrame(context) {
      _assertClass(context, CptvPlayerContext);

      var ptr0 = context.ptr;
      context.ptr = 0;
      var ret = wasm.cptvplayercontext_fetchNextFrame(ptr0);
      return takeObject(ret);
    }
  }, {
    key: "fetchHeader",
    value: function fetchHeader(context) {
      _assertClass(context, CptvPlayerContext);

      var ptr0 = context.ptr;
      context.ptr = 0;
      var ret = wasm.cptvplayercontext_fetchHeader(ptr0);
      return takeObject(ret);
    }
  }]);

  return CptvPlayerContext;
}();

module.exports.CptvPlayerContext = CptvPlayerContext;

module.exports.__wbindgen_object_drop_ref = function (arg0) {
  takeObject(arg0);
};

module.exports.__wbg_new_3ea8490cd276c848 = function (arg0, arg1) {
  try {
    var state0 = {
      a: arg0,
      b: arg1
    };

    var cb0 = function cb0(arg0, arg1) {
      var a = state0.a;
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

module.exports.__wbindgen_number_new = function (arg0) {
  var ret = arg0;
  return addHeapObject(ret);
};

module.exports.__wbg_newwithlength_90fbb2b2d057a3c0 = function (arg0) {
  var ret = new Uint16Array(arg0 >>> 0);
  return addHeapObject(ret);
};

module.exports.__wbindgen_memory = function () {
  var ret = wasm.memory;
  return addHeapObject(ret);
};

module.exports.__wbg_buffer_ebc6c8e75510eae3 = function (arg0) {
  var ret = getObject(arg0).buffer;
  return addHeapObject(ret);
};

module.exports.__wbg_newwithbyteoffsetandlength_9eb3327abeac2c52 = function (arg0, arg1, arg2) {
  var ret = new Uint16Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
  return addHeapObject(ret);
};

module.exports.__wbg_new_68adb0d58759a4ed = function () {
  var ret = new Object();
  return addHeapObject(ret);
};

module.exports.__wbg_set_2e79e744454afade = function (arg0, arg1, arg2) {
  getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
};

module.exports.__wbindgen_string_new = function (arg0, arg1) {
  var ret = getStringFromWasm0(arg0, arg1);
  return addHeapObject(ret);
};

module.exports.__wbg_new_59cb74e423758ede = function () {
  var ret = new Error();
  return addHeapObject(ret);
};

module.exports.__wbg_stack_558ba5917b466edd = function (arg0, arg1) {
  var ret = getObject(arg1).stack;
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

module.exports.__wbg_error_4bb6c2a97407129a = function (arg0, arg1) {
  try {
    console.error(getStringFromWasm0(arg0, arg1));
  } finally {
    wasm.__wbindgen_free(arg0, arg1);
  }
};

module.exports.__wbg_read_2516fe8e4e56274e = handleError(function (arg0) {
  var ret = getObject(arg0).read();
  return addHeapObject(ret);
});

module.exports.__wbg_then_ac66ca61394bfd21 = function (arg0, arg1, arg2) {
  var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
  return addHeapObject(ret);
};

module.exports.__wbindgen_boolean_get = function (arg0) {
  var v = getObject(arg0);
  var ret = typeof v === 'boolean' ? v ? 1 : 0 : 2;
  return ret;
};

module.exports.__wbindgen_is_undefined = function (arg0) {
  var ret = getObject(arg0) === undefined;
  return ret;
};

module.exports.__wbg_instanceof_Uint8Array_d7349a138407a31e = function (arg0) {
  var ret = getObject(arg0) instanceof Uint8Array;
  return ret;
};

module.exports.__wbg_byteLength_7d55aca7ec6c42cb = function (arg0) {
  var ret = getObject(arg0).byteLength;
  return ret;
};

module.exports.__wbg_length_317f0dd77f7a6673 = function (arg0) {
  var ret = getObject(arg0).length;
  return ret;
};

module.exports.__wbg_new_135e963dedf67b22 = function (arg0) {
  var ret = new Uint8Array(getObject(arg0));
  return addHeapObject(ret);
};

module.exports.__wbg_set_4a5072a31008e0cb = function (arg0, arg1, arg2) {
  getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

module.exports.__wbg_cptvplayercontext_new = function (arg0) {
  var ret = CptvPlayerContext.__wrap(arg0);

  return addHeapObject(ret);
};

module.exports.__wbg_call_f5e0576f61ee7461 = handleError(function (arg0, arg1, arg2) {
  var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
  return addHeapObject(ret);
});
module.exports.__wbg_get_0c6963cbab34fbb6 = handleError(function (arg0, arg1) {
  var ret = Reflect.get(getObject(arg0), getObject(arg1));
  return addHeapObject(ret);
});

module.exports.__wbg_new_7031805939a80203 = function (arg0, arg1) {
  var ret = new Error(getStringFromWasm0(arg0, arg1));
  return addHeapObject(ret);
};

module.exports.__wbindgen_object_clone_ref = function (arg0) {
  var ret = getObject(arg0);
  return addHeapObject(ret);
};

module.exports.__wbindgen_debug_string = function (arg0, arg1) {
  var ret = debugString(getObject(arg1));
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

module.exports.__wbindgen_throw = function (arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbg_then_367b3e718069cfb9 = function (arg0, arg1) {
  var ret = getObject(arg0).then(getObject(arg1));
  return addHeapObject(ret);
};

module.exports.__wbindgen_cb_drop = function (arg0) {
  var obj = takeObject(arg0).original;

  if (obj.cnt-- == 1) {
    obj.a = 0;
    return true;
  }

  var ret = false;
  return ret;
};

module.exports.__wbg_resolve_778af3f90b8e2b59 = function (arg0) {
  var ret = Promise.resolve(getObject(arg0));
  return addHeapObject(ret);
};

module.exports.__wbg_debug_3c0b82934d1dd91e = function (arg0) {
  console.debug(getObject(arg0));
};

module.exports.__wbg_error_9ff84d33a850b1ef = function (arg0) {
  console.error(getObject(arg0));
};

module.exports.__wbg_info_3b2058a219fa31b9 = function (arg0) {
  console.info(getObject(arg0));
};

module.exports.__wbg_log_386a8115a84a780d = function (arg0) {
  console.log(getObject(arg0));
};

module.exports.__wbg_warn_5fc232d538408d4a = function (arg0) {
  console.warn(getObject(arg0));
};

module.exports.__wbindgen_closure_wrapper206 = function (arg0, arg1, arg2) {
  var ret = makeMutClosure(arg0, arg1, 51, __wbg_adapter_22);
  return addHeapObject(ret);
};

var path = __webpack_require__(217).join(__dirname, 'index_bg.wasm');

var bytes = __webpack_require__(9120).readFileSync(path);

var wasmModule = new WebAssembly.Module(bytes);
var wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

/***/ }),

/***/ 1090:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 1090;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 9120:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 217:
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=CptvPlayerVue.umd.626.js.map