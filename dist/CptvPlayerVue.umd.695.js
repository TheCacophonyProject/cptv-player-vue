((typeof self !== 'undefined' ? self : this)["webpackChunkCptvPlayerVue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkCptvPlayerVue"] || []).push([[695],{

/***/ 2261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var regexpFlags = __webpack_require__(7066);
var stickyHelpers = __webpack_require__(2999);
var shared = __webpack_require__(2309);
var create = __webpack_require__(30);
var getInternalState = (__webpack_require__(9909).get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var UNSUPPORTED_NCG = __webpack_require__(8173);

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
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(str) {
    var re = this;
    var state = getInternalState(re);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
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

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
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

var fails = __webpack_require__(7293);

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
var RE = function (s, f) {
  return RegExp(s, f);
};

exports.UNSUPPORTED_Y = fails(function () {
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

/***/ 9441:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = fails(function () {
  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var re = RegExp('.', (typeof '').charAt(0));
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ 8173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = fails(function () {
  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
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

/***/ 8309:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var defineProperty = (__webpack_require__(3070).f);

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
var defineProperty = (__webpack_require__(3070).f);
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

/***/ 6695:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CptvPlayerContext: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.ih),
/* harmony export */   __wbg_buffer_085ec1f694018c4f: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.Zf),
/* harmony export */   __wbg_byteLength_47d11fa79875dee3: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.Hu),
/* harmony export */   __wbg_call_01734de55d61e11d: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.Nl),
/* harmony export */   __wbg_cptvplayercontext_new: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.WA),
/* harmony export */   __wbg_debug_9a6b3243fbbebb61: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.p1),
/* harmony export */   __wbg_error_788ae33f81d3b84b: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.kQ),
/* harmony export */   __wbg_error_f851667af71bcfc6: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.iX),
/* harmony export */   __wbg_get_97b561fb56f034b5: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.To),
/* harmony export */   __wbg_info_2e30e8204b29d91d: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.eZ),
/* harmony export */   __wbg_instanceof_Uint8Array_d8d9cb2b8e8ac1d4: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.ZT),
/* harmony export */   __wbg_length_72e2208bbc0efc61: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.Ky),
/* harmony export */   __wbg_log_1d3ae0273d8f4f8a: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.gE),
/* harmony export */   __wbg_new_43f1b47c28813cbd: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.XH),
/* harmony export */   __wbg_new_8125e318e6245eed: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.rU),
/* harmony export */   __wbg_new_abda76e883ba8a5f: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.a2),
/* harmony export */   __wbg_new_b51585de1b234aff: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.Tc),
/* harmony export */   __wbg_newwithbyteoffsetandlength_31ff1024ef0c63c7: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.uf),
/* harmony export */   __wbg_newwithlength_1efd26b345def7b3: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.Bv),
/* harmony export */   __wbg_read_b40399852b2f7b2b: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.uB),
/* harmony export */   __wbg_resolve_53698b95aaf7fcf8: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.ot),
/* harmony export */   __wbg_set_5cf90238115182c3: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.H6),
/* harmony export */   __wbg_set_bd72c078edfa51ad: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.aV),
/* harmony export */   __wbg_set_wasm: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.oT),
/* harmony export */   __wbg_stack_658279fe44541cf6: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.KM),
/* harmony export */   __wbg_then_b2267541e2a73865: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.w2),
/* harmony export */   __wbg_then_f7e06ee3c11698eb: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.vv),
/* harmony export */   __wbg_warn_d60e832f9882c1b2: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.iY),
/* harmony export */   __wbindgen_bigint_from_u64: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.Kx),
/* harmony export */   __wbindgen_boolean_get: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.HT),
/* harmony export */   __wbindgen_cb_drop: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.G6),
/* harmony export */   __wbindgen_closure_wrapper182: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__._1),
/* harmony export */   __wbindgen_debug_string: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.fY),
/* harmony export */   __wbindgen_error_new: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.hd),
/* harmony export */   __wbindgen_is_undefined: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.XP),
/* harmony export */   __wbindgen_memory: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.oH),
/* harmony export */   __wbindgen_number_new: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.pT),
/* harmony export */   __wbindgen_object_clone_ref: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.m_),
/* harmony export */   __wbindgen_object_drop_ref: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.ug),
/* harmony export */   __wbindgen_string_new: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.h4),
/* harmony export */   __wbindgen_throw: () => (/* reexport safe */ _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__.Or)
/* harmony export */ });
/* harmony import */ var _decoder_bg_wasm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4260);
/* harmony import */ var _decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(656);



(0,_decoder_bg_js__WEBPACK_IMPORTED_MODULE_0__/* .__wbg_set_wasm */ .oT)(_decoder_bg_wasm__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ 656:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ih: () => (/* binding */ CptvPlayerContext),
  Zf: () => (/* binding */ __wbg_buffer_085ec1f694018c4f),
  Hu: () => (/* binding */ __wbg_byteLength_47d11fa79875dee3),
  Nl: () => (/* binding */ __wbg_call_01734de55d61e11d),
  WA: () => (/* binding */ __wbg_cptvplayercontext_new),
  p1: () => (/* binding */ __wbg_debug_9a6b3243fbbebb61),
  kQ: () => (/* binding */ __wbg_error_788ae33f81d3b84b),
  iX: () => (/* binding */ __wbg_error_f851667af71bcfc6),
  To: () => (/* binding */ __wbg_get_97b561fb56f034b5),
  eZ: () => (/* binding */ __wbg_info_2e30e8204b29d91d),
  ZT: () => (/* binding */ __wbg_instanceof_Uint8Array_d8d9cb2b8e8ac1d4),
  Ky: () => (/* binding */ __wbg_length_72e2208bbc0efc61),
  gE: () => (/* binding */ __wbg_log_1d3ae0273d8f4f8a),
  XH: () => (/* binding */ __wbg_new_43f1b47c28813cbd),
  rU: () => (/* binding */ __wbg_new_8125e318e6245eed),
  a2: () => (/* binding */ __wbg_new_abda76e883ba8a5f),
  Tc: () => (/* binding */ __wbg_new_b51585de1b234aff),
  uf: () => (/* binding */ __wbg_newwithbyteoffsetandlength_31ff1024ef0c63c7),
  Bv: () => (/* binding */ __wbg_newwithlength_1efd26b345def7b3),
  uB: () => (/* binding */ __wbg_read_b40399852b2f7b2b),
  ot: () => (/* binding */ __wbg_resolve_53698b95aaf7fcf8),
  H6: () => (/* binding */ __wbg_set_5cf90238115182c3),
  aV: () => (/* binding */ __wbg_set_bd72c078edfa51ad),
  oT: () => (/* binding */ __wbg_set_wasm),
  KM: () => (/* binding */ __wbg_stack_658279fe44541cf6),
  w2: () => (/* binding */ __wbg_then_b2267541e2a73865),
  vv: () => (/* binding */ __wbg_then_f7e06ee3c11698eb),
  iY: () => (/* binding */ __wbg_warn_d60e832f9882c1b2),
  Kx: () => (/* binding */ __wbindgen_bigint_from_u64),
  HT: () => (/* binding */ __wbindgen_boolean_get),
  G6: () => (/* binding */ __wbindgen_cb_drop),
  _1: () => (/* binding */ __wbindgen_closure_wrapper182),
  fY: () => (/* binding */ __wbindgen_debug_string),
  hd: () => (/* binding */ __wbindgen_error_new),
  XP: () => (/* binding */ __wbindgen_is_undefined),
  oH: () => (/* binding */ __wbindgen_memory),
  pT: () => (/* binding */ __wbindgen_number_new),
  m_: () => (/* binding */ __wbindgen_object_clone_ref),
  ug: () => (/* binding */ __wbindgen_object_drop_ref),
  h4: () => (/* binding */ __wbindgen_string_new),
  Or: () => (/* binding */ __wbindgen_throw)
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__(3290);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.uint8-array.js
var es_typed_array_uint8_array = __webpack_require__(2472);
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
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(2526);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(1817);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(8309);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(4916);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(7042);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.int32-array.js
var es_typed_array_int32_array = __webpack_require__(5125);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.get.js
var es_reflect_get = __webpack_require__(4819);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.uint16-array.js
var es_typed_array_uint16_array = __webpack_require__(8255);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(6462);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(8267);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(2165);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8783);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(3948);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js







function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
;// CONCATENATED MODULE: ./src/cptv-decoder/decoder/decoder_bg.js
/* module decorator */ module = __webpack_require__.hmd(module);













































































var wasm;
function __wbg_set_wasm(val) {
  wasm = val;
}
var heap = new Array(128).fill(undefined);
heap.push(undefined, null, true, false);

function getObject(idx) {
  return heap[idx];
}

var heap_next = heap.length;

function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  var ret = getObject(idx);
  dropObject(idx);
  return ret;
}

var lTextDecoder = typeof TextDecoder === "undefined" ? (0, module.require)("util").TextDecoder : TextDecoder;
var cachedTextDecoder = new lTextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
var cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }

  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  var idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}

function debugString(val) {
  // primitive types
  var type = _typeof(val);

  if (type == "number" || type == "boolean" || val == null) {
    return "".concat(val);
  }

  if (type == "string") {
    return "\"".concat(val, "\"");
  }

  if (type == "symbol") {
    var description = val.description;

    if (description == null) {
      return "Symbol";
    } else {
      return "Symbol(".concat(description, ")");
    }
  }

  if (type == "function") {
    var name = val.name;

    if (typeof name == "string" && name.length > 0) {
      return "Function(".concat(name, ")");
    } else {
      return "Function";
    }
  } // objects


  if (Array.isArray(val)) {
    var length = val.length;
    var debug = "[";

    if (length > 0) {
      debug += debugString(val[0]);
    }

    for (var i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }

    debug += "]";
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

  if (className == "Object") {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  } // errors


  if (val instanceof Error) {
    return "".concat(val.name, ": ").concat(val.message, "\n").concat(val.stack);
  } // TODO we could test for more things here, like `Set`s and `Map`s.


  return className;
}

var WASM_VECTOR_LEN = 0;
var lTextEncoder = typeof TextEncoder === "undefined" ? (0, module.require)("util").TextEncoder : TextEncoder;
var cachedTextEncoder = new lTextEncoder("utf-8");
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function (arg, view) {
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

    var _ptr = malloc(buf.length, 1) >>> 0;

    getUint8Memory0().subarray(_ptr, _ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return _ptr;
  }

  var len = arg.length;
  var ptr = malloc(len, 1) >>> 0;
  var mem = getUint8Memory0();
  var offset = 0;

  for (; offset < len; offset++) {
    var code = arg.charCodeAt(offset);
    if (code > 0x7f) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }

    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    var view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    var ret = encodeString(arg, view);
    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

var cachedInt32Memory0 = null;

function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }

  return cachedInt32Memory0;
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

function __wbg_adapter_26(arg0, arg1, arg2) {
  wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7220e89b344ffef7(arg0, arg1, addHeapObject(arg2));
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}

function __wbg_adapter_67(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen__convert__closures__invoke2_mut__h18b31808c97857b2(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}
/**
 */


var CptvPlayerContext = /*#__PURE__*/function () {
  function CptvPlayerContext() {
    (0,classCallCheck/* default */.Z)(this, CptvPlayerContext);
  }

  (0,createClass/* default */.Z)(CptvPlayerContext, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var ptr = this.__wbg_ptr;
      this.__wbg_ptr = 0;
      return ptr;
    }
  }, {
    key: "free",
    value: function free() {
      var ptr = this.__destroy_into_raw();

      wasm.__wbg_cptvplayercontext_free(ptr);
    }
    /**
     * @param {ReadableStreamDefaultReader} stream
     * @returns {Promise<CptvPlayerContext>}
     */

  }, {
    key: "streamComplete",
    value:
    /**
     * @returns {boolean}
     */
    function streamComplete() {
      var ret = wasm.cptvplayercontext_streamComplete(this.__wbg_ptr);
      return ret !== 0;
    }
    /**
     * @returns {Promise<void>}
     */

  }, {
    key: "countTotalFrames",
    value: function countTotalFrames() {
      var ret = wasm.cptvplayercontext_countTotalFrames(this.__wbg_ptr);
      return takeObject(ret);
    }
    /**
     * @returns {Promise<void>}
     */

  }, {
    key: "fetchNextFrame",
    value: function fetchNextFrame() {
      var ret = wasm.cptvplayercontext_fetchNextFrame(this.__wbg_ptr);
      return takeObject(ret);
    }
    /**
     * @returns {any}
     */

  }, {
    key: "totalFrames",
    value: function totalFrames() {
      var ret = wasm.cptvplayercontext_totalFrames(this.__wbg_ptr);
      return takeObject(ret);
    }
    /**
     * @returns {number}
     */

  }, {
    key: "bytesLoaded",
    value: function bytesLoaded() {
      var ret = wasm.cptvplayercontext_bytesLoaded(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @returns {Uint16Array}
     */

  }, {
    key: "getNextFrame",
    value: function getNextFrame() {
      var ret = wasm.cptvplayercontext_getNextFrame(this.__wbg_ptr);
      return takeObject(ret);
    }
    /**
     * @returns {any}
     */

  }, {
    key: "getFrameHeader",
    value: function getFrameHeader() {
      var ret = wasm.cptvplayercontext_getFrameHeader(this.__wbg_ptr);
      return takeObject(ret);
    }
    /**
     * @returns {number}
     */

  }, {
    key: "getWidth",
    value: function getWidth() {
      var ret = wasm.cptvplayercontext_getWidth(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @returns {number}
     */

  }, {
    key: "getHeight",
    value: function getHeight() {
      var ret = wasm.cptvplayercontext_getHeight(this.__wbg_ptr);
      return ret >>> 0;
    }
    /**
     * @returns {number}
     */

  }, {
    key: "getFrameRate",
    value: function getFrameRate() {
      var ret = wasm.cptvplayercontext_getFrameRate(this.__wbg_ptr);
      return ret;
    }
    /**
     * @returns {number}
     */

  }, {
    key: "getFramesPerIframe",
    value: function getFramesPerIframe() {
      var ret = wasm.cptvplayercontext_getFramesPerIframe(this.__wbg_ptr);
      return ret;
    }
    /**
     * @returns {Promise<void>}
     */

  }, {
    key: "fetchHeader",
    value: function fetchHeader() {
      var ret = wasm.cptvplayercontext_fetchHeader(this.__wbg_ptr);
      return takeObject(ret);
    }
    /**
     * @returns {any}
     */

  }, {
    key: "getHeader",
    value: function getHeader() {
      var ret = wasm.cptvplayercontext_getHeader(this.__wbg_ptr);
      return takeObject(ret);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      ptr = ptr >>> 0;
      var obj = Object.create(CptvPlayerContext.prototype);
      obj.__wbg_ptr = ptr;
      return obj;
    }
  }, {
    key: "newWithStream",
    value: function newWithStream(stream) {
      var ret = wasm.cptvplayercontext_newWithStream(addHeapObject(stream));
      return takeObject(ret);
    }
  }]);

  return CptvPlayerContext;
}();
function __wbindgen_object_drop_ref(arg0) {
  takeObject(arg0);
}
function __wbindgen_string_new(arg0, arg1) {
  var ret = getStringFromWasm0(arg0, arg1);
  return addHeapObject(ret);
}
function __wbg_cptvplayercontext_new(arg0) {
  var ret = CptvPlayerContext.__wrap(arg0);

  return addHeapObject(ret);
}
function __wbindgen_boolean_get(arg0) {
  var v = getObject(arg0);
  var ret = typeof v === "boolean" ? v ? 1 : 0 : 2;
  return ret;
}
function __wbindgen_is_undefined(arg0) {
  var ret = getObject(arg0) === undefined;
  return ret;
}
function __wbindgen_number_new(arg0) {
  var ret = arg0;
  return addHeapObject(ret);
}
function __wbindgen_cb_drop(arg0) {
  var obj = takeObject(arg0).original;

  if (obj.cnt-- == 1) {
    obj.a = 0;
    return true;
  }

  var ret = false;
  return ret;
}
function __wbindgen_object_clone_ref(arg0) {
  var ret = getObject(arg0);
  return addHeapObject(ret);
}
function __wbindgen_error_new(arg0, arg1) {
  var ret = new Error(getStringFromWasm0(arg0, arg1));
  return addHeapObject(ret);
}
function __wbindgen_bigint_from_u64(arg0) {
  var ret = BigInt.asUintN(64, arg0);
  return addHeapObject(ret);
}
function __wbg_set_bd72c078edfa51ad(arg0, arg1, arg2) {
  getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
}
function __wbg_new_abda76e883ba8a5f() {
  var ret = new Error();
  return addHeapObject(ret);
}
function __wbg_stack_658279fe44541cf6(arg0, arg1) {
  var ret = getObject(arg1).stack;
  var ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len1 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len1;
  getInt32Memory0()[arg0 / 4 + 0] = ptr1;
}
function __wbg_error_f851667af71bcfc6(arg0, arg1) {
  var deferred0_0;
  var deferred0_1;

  try {
    deferred0_0 = arg0;
    deferred0_1 = arg1;
    console.error(getStringFromWasm0(arg0, arg1));
  } finally {
    wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
  }
}
function __wbg_debug_9a6b3243fbbebb61(arg0) {
  console.debug(getObject(arg0));
}
function __wbg_error_788ae33f81d3b84b(arg0) {
  console.error(getObject(arg0));
}
function __wbg_info_2e30e8204b29d91d(arg0) {
  console.info(getObject(arg0));
}
function __wbg_log_1d3ae0273d8f4f8a(arg0) {
  console.log(getObject(arg0));
}
function __wbg_warn_d60e832f9882c1b2(arg0) {
  console.warn(getObject(arg0));
}
function __wbg_read_b40399852b2f7b2b(arg0) {
  var ret = getObject(arg0).read();
  return addHeapObject(ret);
}
function __wbg_get_97b561fb56f034b5() {
  return handleError(function (arg0, arg1) {
    var ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
  }, arguments);
}
function __wbg_new_b51585de1b234aff() {
  var ret = new Object();
  return addHeapObject(ret);
}
function __wbg_call_01734de55d61e11d() {
  return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  }, arguments);
}
function __wbg_new_43f1b47c28813cbd(arg0, arg1) {
  try {
    var state0 = {
      a: arg0,
      b: arg1
    };

    var cb0 = function cb0(arg0, arg1) {
      var a = state0.a;
      state0.a = 0;

      try {
        return __wbg_adapter_67(a, state0.b, arg0, arg1);
      } finally {
        state0.a = a;
      }
    };

    var ret = new Promise(cb0);
    return addHeapObject(ret);
  } finally {
    state0.a = state0.b = 0;
  }
}
function __wbg_resolve_53698b95aaf7fcf8(arg0) {
  var ret = Promise.resolve(getObject(arg0));
  return addHeapObject(ret);
}
function __wbg_then_f7e06ee3c11698eb(arg0, arg1) {
  var ret = getObject(arg0).then(getObject(arg1));
  return addHeapObject(ret);
}
function __wbg_then_b2267541e2a73865(arg0, arg1, arg2) {
  var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
  return addHeapObject(ret);
}
function __wbg_buffer_085ec1f694018c4f(arg0) {
  var ret = getObject(arg0).buffer;
  return addHeapObject(ret);
}
function __wbg_new_8125e318e6245eed(arg0) {
  var ret = new Uint8Array(getObject(arg0));
  return addHeapObject(ret);
}
function __wbg_set_5cf90238115182c3(arg0, arg1, arg2) {
  getObject(arg0).set(getObject(arg1), arg2 >>> 0);
}
function __wbg_length_72e2208bbc0efc61(arg0) {
  var ret = getObject(arg0).length;
  return ret;
}
function __wbg_newwithbyteoffsetandlength_31ff1024ef0c63c7(arg0, arg1, arg2) {
  var ret = new Uint16Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
  return addHeapObject(ret);
}
function __wbg_instanceof_Uint8Array_d8d9cb2b8e8ac1d4(arg0) {
  var result;

  try {
    result = getObject(arg0) instanceof Uint8Array;
  } catch (_unused) {
    result = false;
  }

  var ret = result;
  return ret;
}
function __wbg_byteLength_47d11fa79875dee3(arg0) {
  var ret = getObject(arg0).byteLength;
  return ret;
}
function __wbg_newwithlength_1efd26b345def7b3(arg0) {
  var ret = new Uint16Array(arg0 >>> 0);
  return addHeapObject(ret);
}
function __wbindgen_debug_string(arg0, arg1) {
  var ret = debugString(getObject(arg1));
  var ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len1 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len1;
  getInt32Memory0()[arg0 / 4 + 0] = ptr1;
}
function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}
function __wbindgen_memory() {
  var ret = wasm.memory;
  return addHeapObject(ret);
}
function __wbindgen_closure_wrapper182(arg0, arg1, arg2) {
  var ret = makeMutClosure(arg0, arg1, 58, __wbg_adapter_26);
  return addHeapObject(ret);
}

/***/ }),

/***/ 4260:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.id];
__webpack_require__.r(exports);
// export exports from WebAssembly module
for(var name in wasmExports) if(name) exports[name] = wasmExports[name];
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(656);


// exec wasm module
wasmExports[""]()

/***/ })

}]);
//# sourceMappingURL=CptvPlayerVue.umd.695.js.map