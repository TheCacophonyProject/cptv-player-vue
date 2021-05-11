((typeof self !== 'undefined' ? self : this)["webpackChunkcptv_player_vue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkcptv_player_vue"] || []).push([[58],{

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

/***/ 3058:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CptvPlayerContext": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.ih),
/* harmony export */   "__wbg_buffer_ebc6c8e75510eae3": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.v3),
/* harmony export */   "__wbg_byteLength_7d55aca7ec6c42cb": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.tv),
/* harmony export */   "__wbg_call_f5e0576f61ee7461": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.S8),
/* harmony export */   "__wbg_cptvplayercontext_new": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.WA),
/* harmony export */   "__wbg_debug_3c0b82934d1dd91e": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.bf),
/* harmony export */   "__wbg_error_4bb6c2a97407129a": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.kF),
/* harmony export */   "__wbg_error_9ff84d33a850b1ef": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.Qw),
/* harmony export */   "__wbg_get_0c6963cbab34fbb6": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.et),
/* harmony export */   "__wbg_info_3b2058a219fa31b9": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.Jn),
/* harmony export */   "__wbg_instanceof_Uint8Array_d7349a138407a31e": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.QP),
/* harmony export */   "__wbg_length_317f0dd77f7a6673": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.rX),
/* harmony export */   "__wbg_log_386a8115a84a780d": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.IZ),
/* harmony export */   "__wbg_new_135e963dedf67b22": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.XV),
/* harmony export */   "__wbg_new_3ea8490cd276c848": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.fL),
/* harmony export */   "__wbg_new_59cb74e423758ede": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.h9),
/* harmony export */   "__wbg_new_68adb0d58759a4ed": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.qq),
/* harmony export */   "__wbg_new_7031805939a80203": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.SS),
/* harmony export */   "__wbg_newwithbyteoffsetandlength_9eb3327abeac2c52": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.MS),
/* harmony export */   "__wbg_newwithlength_90fbb2b2d057a3c0": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.bF),
/* harmony export */   "__wbg_read_2516fe8e4e56274e": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.Xy),
/* harmony export */   "__wbg_resolve_778af3f90b8e2b59": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.IL),
/* harmony export */   "__wbg_set_2e79e744454afade": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.Hl),
/* harmony export */   "__wbg_set_4a5072a31008e0cb": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.CV),
/* harmony export */   "__wbg_stack_558ba5917b466edd": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.Dz),
/* harmony export */   "__wbg_then_367b3e718069cfb9": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.DN),
/* harmony export */   "__wbg_then_ac66ca61394bfd21": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.xI),
/* harmony export */   "__wbg_warn_5fc232d538408d4a": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.QL),
/* harmony export */   "__wbindgen_boolean_get": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.HT),
/* harmony export */   "__wbindgen_cb_drop": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.G6),
/* harmony export */   "__wbindgen_closure_wrapper211": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.LC),
/* harmony export */   "__wbindgen_debug_string": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.fY),
/* harmony export */   "__wbindgen_is_undefined": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.XP),
/* harmony export */   "__wbindgen_memory": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.oH),
/* harmony export */   "__wbindgen_number_new": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.pT),
/* harmony export */   "__wbindgen_object_clone_ref": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.m_),
/* harmony export */   "__wbindgen_object_drop_ref": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.ug),
/* harmony export */   "__wbindgen_string_new": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.h4),
/* harmony export */   "__wbindgen_throw": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.Or)
/* harmony export */ });
/* harmony import */ var _index_bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8686);



/***/ }),

/***/ 8686:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ih": () => (/* binding */ CptvPlayerContext),
  "v3": () => (/* binding */ __wbg_buffer_ebc6c8e75510eae3),
  "tv": () => (/* binding */ __wbg_byteLength_7d55aca7ec6c42cb),
  "S8": () => (/* binding */ __wbg_call_f5e0576f61ee7461),
  "WA": () => (/* binding */ __wbg_cptvplayercontext_new),
  "bf": () => (/* binding */ __wbg_debug_3c0b82934d1dd91e),
  "kF": () => (/* binding */ __wbg_error_4bb6c2a97407129a),
  "Qw": () => (/* binding */ __wbg_error_9ff84d33a850b1ef),
  "et": () => (/* binding */ __wbg_get_0c6963cbab34fbb6),
  "Jn": () => (/* binding */ __wbg_info_3b2058a219fa31b9),
  "QP": () => (/* binding */ __wbg_instanceof_Uint8Array_d7349a138407a31e),
  "rX": () => (/* binding */ __wbg_length_317f0dd77f7a6673),
  "IZ": () => (/* binding */ __wbg_log_386a8115a84a780d),
  "XV": () => (/* binding */ __wbg_new_135e963dedf67b22),
  "fL": () => (/* binding */ __wbg_new_3ea8490cd276c848),
  "h9": () => (/* binding */ __wbg_new_59cb74e423758ede),
  "qq": () => (/* binding */ __wbg_new_68adb0d58759a4ed),
  "SS": () => (/* binding */ __wbg_new_7031805939a80203),
  "MS": () => (/* binding */ __wbg_newwithbyteoffsetandlength_9eb3327abeac2c52),
  "bF": () => (/* binding */ __wbg_newwithlength_90fbb2b2d057a3c0),
  "Xy": () => (/* binding */ __wbg_read_2516fe8e4e56274e),
  "IL": () => (/* binding */ __wbg_resolve_778af3f90b8e2b59),
  "Hl": () => (/* binding */ __wbg_set_2e79e744454afade),
  "CV": () => (/* binding */ __wbg_set_4a5072a31008e0cb),
  "Dz": () => (/* binding */ __wbg_stack_558ba5917b466edd),
  "DN": () => (/* binding */ __wbg_then_367b3e718069cfb9),
  "xI": () => (/* binding */ __wbg_then_ac66ca61394bfd21),
  "QL": () => (/* binding */ __wbg_warn_5fc232d538408d4a),
  "HT": () => (/* binding */ __wbindgen_boolean_get),
  "G6": () => (/* binding */ __wbindgen_cb_drop),
  "LC": () => (/* binding */ __wbindgen_closure_wrapper211),
  "fY": () => (/* binding */ __wbindgen_debug_string),
  "XP": () => (/* binding */ __wbindgen_is_undefined),
  "oH": () => (/* binding */ __wbindgen_memory),
  "pT": () => (/* binding */ __wbindgen_number_new),
  "m_": () => (/* binding */ __wbindgen_object_clone_ref),
  "ug": () => (/* binding */ __wbindgen_object_drop_ref),
  "h4": () => (/* binding */ __wbindgen_string_new),
  "Or": () => (/* binding */ __wbindgen_throw)
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
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.uint16-array.js
var es_typed_array_uint16_array = __webpack_require__(8255);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.get.js
var es_reflect_get = __webpack_require__(4819);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(1165);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(6018);
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
// EXTERNAL MODULE: ../cptv-rs/pkg/index_bg.wasm
var index_bg = __webpack_require__(8811);
;// CONCATENATED MODULE: ../cptv-rs/pkg/index_bg.js














































































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

var lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;
var cachedTextDecoder = new lTextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== index_bg.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(index_bg.memory.buffer);
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
var lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;
var cachedTextEncoder = new lTextEncoder('utf-8');
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
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== index_bg.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(index_bg.memory.buffer);
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
        index_bg.__wbindgen_export_2.get(state.dtor)(a, state.b);
      } else {
        state.a = a;
      }
    }
  };

  real.original = state;
  return real;
}

function __wbg_adapter_22(arg0, arg1, arg2) {
  index_bg._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h58f26b25ebd66e81(arg0, arg1, addHeapObject(arg2));
}

function handleError(f) {
  return function () {
    try {
      return f.apply(this, arguments);
    } catch (e) {
      index_bg.__wbindgen_exn_store(addHeapObject(e));
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
  index_bg.wasm_bindgen__convert__closures__invoke2_mut__h8c76bc75b4ce3cb1(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
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
      var ptr = this.ptr;
      this.ptr = 0;
      return ptr;
    }
  }, {
    key: "free",
    value: function free() {
      var ptr = this.__destroy_into_raw();

      index_bg.__wbg_cptvplayercontext_free(ptr);
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
      var ret = index_bg.cptvplayercontext_streamComplete(this.ptr);
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
      var ret = index_bg.cptvplayercontext_totalFrames(this.ptr);
      return takeObject(ret);
    }
    /**
    * @returns {number}
    */

  }, {
    key: "bytesLoaded",
    value: function bytesLoaded() {
      var ret = index_bg.cptvplayercontext_bytesLoaded(this.ptr);
      return ret >>> 0;
    }
    /**
    * @returns {Uint16Array}
    */

  }, {
    key: "getNextFrame",
    value: function getNextFrame() {
      var ret = index_bg.cptvplayercontext_getNextFrame(this.ptr);
      return takeObject(ret);
    }
    /**
    * @returns {any}
    */

  }, {
    key: "getFrameHeader",
    value: function getFrameHeader() {
      var ret = index_bg.cptvplayercontext_getFrameHeader(this.ptr);
      return takeObject(ret);
    }
    /**
    * @returns {number}
    */

  }, {
    key: "getWidth",
    value: function getWidth() {
      var ret = index_bg.cptvplayercontext_getWidth(this.ptr);
      return ret >>> 0;
    }
    /**
    * @returns {number}
    */

  }, {
    key: "getHeight",
    value: function getHeight() {
      var ret = index_bg.cptvplayercontext_getHeight(this.ptr);
      return ret >>> 0;
    }
    /**
    * @returns {number}
    */

  }, {
    key: "getFrameRate",
    value: function getFrameRate() {
      var ret = index_bg.cptvplayercontext_getFrameRate(this.ptr);
      return ret;
    }
    /**
    * @returns {number}
    */

  }, {
    key: "getFramesPerIframe",
    value: function getFramesPerIframe() {
      var ret = index_bg.cptvplayercontext_getFramesPerIframe(this.ptr);
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
      var ret = index_bg.cptvplayercontext_getHeader(this.ptr);
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
      var ret = index_bg.cptvplayercontext_newWithStream(addHeapObject(stream));
      return takeObject(ret);
    }
  }, {
    key: "countTotalFrames",
    value: function countTotalFrames(context) {
      _assertClass(context, CptvPlayerContext);

      var ptr0 = context.ptr;
      context.ptr = 0;
      var ret = index_bg.cptvplayercontext_countTotalFrames(ptr0);
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
      var ret = index_bg.cptvplayercontext_fetchNextFrame(ptr0);
      return takeObject(ret);
    }
  }, {
    key: "fetchHeader",
    value: function fetchHeader(context) {
      _assertClass(context, CptvPlayerContext);

      var ptr0 = context.ptr;
      context.ptr = 0;
      var ret = index_bg.cptvplayercontext_fetchHeader(ptr0);
      return takeObject(ret);
    }
  }]);

  return CptvPlayerContext;
}();
var __wbindgen_object_drop_ref = function __wbindgen_object_drop_ref(arg0) {
  takeObject(arg0);
};
var __wbg_new_3ea8490cd276c848 = function __wbg_new_3ea8490cd276c848(arg0, arg1) {
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
var __wbindgen_number_new = function __wbindgen_number_new(arg0) {
  var ret = arg0;
  return addHeapObject(ret);
};
var __wbg_newwithlength_90fbb2b2d057a3c0 = function __wbg_newwithlength_90fbb2b2d057a3c0(arg0) {
  var ret = new Uint16Array(arg0 >>> 0);
  return addHeapObject(ret);
};
var __wbindgen_memory = function __wbindgen_memory() {
  var ret = index_bg.memory;
  return addHeapObject(ret);
};
var __wbg_buffer_ebc6c8e75510eae3 = function __wbg_buffer_ebc6c8e75510eae3(arg0) {
  var ret = getObject(arg0).buffer;
  return addHeapObject(ret);
};
var __wbg_newwithbyteoffsetandlength_9eb3327abeac2c52 = function __wbg_newwithbyteoffsetandlength_9eb3327abeac2c52(arg0, arg1, arg2) {
  var ret = new Uint16Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
  return addHeapObject(ret);
};
var __wbg_new_68adb0d58759a4ed = function __wbg_new_68adb0d58759a4ed() {
  var ret = new Object();
  return addHeapObject(ret);
};
var __wbg_set_2e79e744454afade = function __wbg_set_2e79e744454afade(arg0, arg1, arg2) {
  getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
};
var __wbindgen_string_new = function __wbindgen_string_new(arg0, arg1) {
  var ret = getStringFromWasm0(arg0, arg1);
  return addHeapObject(ret);
};
var __wbg_new_59cb74e423758ede = function __wbg_new_59cb74e423758ede() {
  var ret = new Error();
  return addHeapObject(ret);
};
var __wbg_stack_558ba5917b466edd = function __wbg_stack_558ba5917b466edd(arg0, arg1) {
  var ret = getObject(arg1).stack;
  var ptr0 = passStringToWasm0(ret, index_bg.__wbindgen_malloc, index_bg.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};
var __wbg_error_4bb6c2a97407129a = function __wbg_error_4bb6c2a97407129a(arg0, arg1) {
  try {
    console.error(getStringFromWasm0(arg0, arg1));
  } finally {
    index_bg.__wbindgen_free(arg0, arg1);
  }
};
var __wbg_read_2516fe8e4e56274e = handleError(function (arg0) {
  var ret = getObject(arg0).read();
  return addHeapObject(ret);
});
var __wbg_then_ac66ca61394bfd21 = function __wbg_then_ac66ca61394bfd21(arg0, arg1, arg2) {
  var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
  return addHeapObject(ret);
};
var __wbindgen_boolean_get = function __wbindgen_boolean_get(arg0) {
  var v = getObject(arg0);
  var ret = typeof v === 'boolean' ? v ? 1 : 0 : 2;
  return ret;
};
var __wbindgen_is_undefined = function __wbindgen_is_undefined(arg0) {
  var ret = getObject(arg0) === undefined;
  return ret;
};
var __wbg_instanceof_Uint8Array_d7349a138407a31e = function __wbg_instanceof_Uint8Array_d7349a138407a31e(arg0) {
  var ret = getObject(arg0) instanceof Uint8Array;
  return ret;
};
var __wbg_byteLength_7d55aca7ec6c42cb = function __wbg_byteLength_7d55aca7ec6c42cb(arg0) {
  var ret = getObject(arg0).byteLength;
  return ret;
};
var __wbg_length_317f0dd77f7a6673 = function __wbg_length_317f0dd77f7a6673(arg0) {
  var ret = getObject(arg0).length;
  return ret;
};
var __wbg_new_135e963dedf67b22 = function __wbg_new_135e963dedf67b22(arg0) {
  var ret = new Uint8Array(getObject(arg0));
  return addHeapObject(ret);
};
var __wbg_set_4a5072a31008e0cb = function __wbg_set_4a5072a31008e0cb(arg0, arg1, arg2) {
  getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};
var __wbg_cptvplayercontext_new = function __wbg_cptvplayercontext_new(arg0) {
  var ret = CptvPlayerContext.__wrap(arg0);

  return addHeapObject(ret);
};
var __wbg_call_f5e0576f61ee7461 = handleError(function (arg0, arg1, arg2) {
  var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
  return addHeapObject(ret);
});
var __wbg_get_0c6963cbab34fbb6 = handleError(function (arg0, arg1) {
  var ret = Reflect.get(getObject(arg0), getObject(arg1));
  return addHeapObject(ret);
});
var __wbg_new_7031805939a80203 = function __wbg_new_7031805939a80203(arg0, arg1) {
  var ret = new Error(getStringFromWasm0(arg0, arg1));
  return addHeapObject(ret);
};
var __wbindgen_object_clone_ref = function __wbindgen_object_clone_ref(arg0) {
  var ret = getObject(arg0);
  return addHeapObject(ret);
};
var __wbindgen_debug_string = function __wbindgen_debug_string(arg0, arg1) {
  var ret = debugString(getObject(arg1));
  var ptr0 = passStringToWasm0(ret, index_bg.__wbindgen_malloc, index_bg.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};
var __wbindgen_throw = function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
};
var __wbg_then_367b3e718069cfb9 = function __wbg_then_367b3e718069cfb9(arg0, arg1) {
  var ret = getObject(arg0).then(getObject(arg1));
  return addHeapObject(ret);
};
var __wbindgen_cb_drop = function __wbindgen_cb_drop(arg0) {
  var obj = takeObject(arg0).original;

  if (obj.cnt-- == 1) {
    obj.a = 0;
    return true;
  }

  var ret = false;
  return ret;
};
var __wbg_resolve_778af3f90b8e2b59 = function __wbg_resolve_778af3f90b8e2b59(arg0) {
  var ret = Promise.resolve(getObject(arg0));
  return addHeapObject(ret);
};
var __wbg_debug_3c0b82934d1dd91e = function __wbg_debug_3c0b82934d1dd91e(arg0) {
  console.debug(getObject(arg0));
};
var __wbg_error_9ff84d33a850b1ef = function __wbg_error_9ff84d33a850b1ef(arg0) {
  console.error(getObject(arg0));
};
var __wbg_info_3b2058a219fa31b9 = function __wbg_info_3b2058a219fa31b9(arg0) {
  console.info(getObject(arg0));
};
var __wbg_log_386a8115a84a780d = function __wbg_log_386a8115a84a780d(arg0) {
  console.log(getObject(arg0));
};
var __wbg_warn_5fc232d538408d4a = function __wbg_warn_5fc232d538408d4a(arg0) {
  console.warn(getObject(arg0));
};
var __wbindgen_closure_wrapper211 = function __wbindgen_closure_wrapper211(arg0, arg1, arg2) {
  var ret = makeMutClosure(arg0, arg1, 49, __wbg_adapter_22);
  return addHeapObject(ret);
};

/***/ }),

/***/ 8811:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.id];

// export exports from WebAssembly module
module.exports = wasmExports;
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(8686);


// exec wasm module
wasmExports[""]()

/***/ })

}]);
//# sourceMappingURL=CptvPlayerVue.common.58.js.map