"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/nano-memoize/index.js
var require_nano_memoize = __commonJS({
  "node_modules/nano-memoize/index.js"(exports, module2) {
    (function() {
      "use strict";
      var assign = Object.assign;
      if (typeof assign !== "function") {
        assign = function() {
          var a = arguments, o = arguments[0];
          if (o === null || o === void 0) {
            throw new TypeError("Cannot convert undefined or null to object");
          }
          o = Object(o);
          for (var i = 1; i < a.length; i++) {
            if (a[i] && typeof a[i] === "object") {
              for (var k in a[i]) {
                o[k] = a[i][k];
              }
            }
          }
          return o;
        };
      }
      function vrgs(f) {
        var s = f + "", i = s.indexOf("...");
        return i >= 0 && (i < s.indexOf(")") || s.indexOf("arguments") >= 0);
      }
      function nanomemoize(fn, o) {
        o || (o = {});
        var vargs = o.vargs || vrgs(fn), s = /* @__PURE__ */ Object.create(null), k = [], v = [], z, wm = /* @__PURE__ */ new WeakMap(), d = function(key, c2, k2) {
          return setTimeout(function() {
            if (k2) {
              c2.splice(key, 1);
              k2.splice(key, 1);
              return;
            }
            c2 instanceof WeakMap ? c2.delete(key) : delete c2[key];
          }, o.maxAge);
        }, c = o.maxAge > 0 && o.maxAge < Infinity ? d : 0, eq = o.equals ? o.equals : function(a, b) {
          return a === b;
        }, maxargs = o.maxArgs, srlz = o.serializer, f, u;
        if (fn.length === 1 && !o.equals && !vargs) {
          f = function(a) {
            var t = typeof a;
            if (!srlz && (t === "object" && a || t === "function")) {
              var r;
              return wm.get(a) || (!c || c(a, wm), wm.set(a, r = fn.call(this, a)), r);
            }
            var key = t === "number" || t === "boolean" || a == null ? a : t === "string" ? JSON.stringify(a) : srlz(a);
            return s[key] || (!c || c(key, s), s[key] = fn.call(this, a));
          }.bind(this);
          u = 1;
        } else {
          f = function() {
            var al = arguments.length;
            if (!al && z != null)
              return v[z];
            var l = maxargs || al, i;
            for (i = k.length - 1; i >= 0; i--) {
              if (!maxargs && k[i].length !== l)
                continue;
              for (var j = l - 1; j >= 0 && eq(k[i][j], arguments[j]); j--) {
                if (j === 0) {
                  return v[i];
                }
              }
            }
            i = k.length - (i + 1);
            if (!al && z == null)
              z = i;
            return !c || c(i, v, k), v[i] = fn.apply(this, k[i] = arguments);
          }.bind(this);
        }
        f.clear = function() {
          wm = /* @__PURE__ */ new WeakMap();
          s = /* @__PURE__ */ Object.create(null);
          k = [];
          v = [];
          z = void 0;
        };
        f.keys = function() {
          return u ? null : k.slice();
        };
        f.values = function() {
          return u ? null : v.slice();
        };
        f.keyValues = function() {
          return u ? { primitives: assign({}, s), objects: wm } : null;
        };
        return f;
      }
      if (typeof module2 !== "undefined") {
        module2.exports = nanomemoize;
      }
      if (typeof window !== "undefined") {
        window.nanomemoize = nanomemoize;
      }
    }).call(exports);
  }
});

// node_modules/argv/lib/argv.js
var require_argv = __commonJS({
  "node_modules/argv/lib/argv.js"(exports, module2) {
    var PATH = require("path");
    var toString2 = Object.prototype.toString;
    var rhome = /^\~\//;
    var rroot = /^\//;
    var rlistcsv = /^(list|csv)\,[a-z]+$/;
    var rdash = /^\-/;
    var rddash = /^\-\-/;
    var ristarget = /^[^\-]/;
    var SCRIPT_NAME = (process.argv[1] || "").split("/").pop();
    var helpOption = {
      name: "help",
      short: "h",
      type: function() {
        return true;
      },
      description: "Displays help information about this script",
      example: "'" + SCRIPT_NAME + " -h' or '" + SCRIPT_NAME + " --help'",
      onset: function(args2) {
        self.help(args2.mod);
        process.exit(0);
      }
    };
    var boolTest = function(value) {
      return value == "true" || value == "false" || value == "1" || value == "0";
    };
    var self;
    module2.exports = self = {
      name: SCRIPT_NAME,
      description: "Usage: " + SCRIPT_NAME + " [options]",
      mods: {},
      short: { h: helpOption },
      options: { help: helpOption },
      types: {
        string: function(value) {
          return value.toString();
        },
        path: function(value) {
          var end = value[value.length - 1] == "/";
          if (rhome.exec(value)) {
            value = PATH.normalize(process.env.HOME + "/" + value.replace(rhome, ""));
          } else if (!rroot.exec(value)) {
            value = PATH.normalize(process.cwd() + "/" + value);
          }
          return value + (end && value[value.length - 1] != "/" ? "/" : "");
        },
        "int": function(value) {
          return parseInt(value, 10);
        },
        "float": function(value) {
          return parseFloat(value, 10);
        },
        "boolean": function(value) {
          return value == "true" || value === "1";
        },
        list: function(value, name, options) {
          if (!options[name]) {
            options[name] = [];
          }
          options[name].push(value);
          return options[name];
        },
        csv: function(value) {
          return value.split(",");
        },
        "listcsv-combo": function(type3) {
          var parts = type3.split(","), primary = parts.shift(), secondary = parts.shift();
          return function(value, name, options, args2) {
            if (!options[name]) {
              options[name] = [];
            }
            if (primary == "csv") {
              value.split(",").forEach(function(val) {
                options[name].push(self.types[secondary](val, name, options, args2));
              });
            } else {
              options[name].push(self.types[secondary](value, name, options, args2));
            }
            return options[name];
          };
        }
      },
      type: function(name, callback) {
        if (self.isObject(name)) {
          for (var i in name) {
            if (self.isFunction(name[i])) {
              self.types[i] = name[i];
            }
          }
        } else if (callback === void 0) {
          return self.types[name];
        } else if (self.isFunction(callback)) {
          self.types[name] = callback;
        } else if (callback === null && self.types.hasOwnProperty(name)) {
          delete self.types[name];
        }
        return self;
      },
      version: function(v) {
        self.option({
          _version: v,
          name: "version",
          type: function() {
            return true;
          },
          description: "Displays version info",
          example: self.name + " --version",
          onset: function(args2) {
            console.log(v + "\n");
            process.exit(0);
          }
        });
        return self;
      },
      option: function(mod2, object) {
        if (object === void 0) {
          object = mod2;
          mod2 = void 0;
        }
        if (self.isArray(object)) {
          object.forEach(function(entry) {
            self.option(mod2, entry);
          });
        } else if (!self.isObject(object)) {
          throw new Error("No option definition provided" + (mod2 ? " for module " + mod2 : ""));
        } else if (object.mod) {
          self.mod(object);
        } else {
          if (!object.name) {
            throw new Error("No name provided for option");
          } else if (!object.type) {
            throw new Error("No type proveded for option");
          }
          object.test = object.test || (object.type == "boolean" ? boolTest : null);
          object.description = object.description || "";
          object.type = self.isFunction(object.type) ? object.type : self.isString(object.type) && rlistcsv.exec(object.type) ? self.types["listcsv-combo"](object.type) : self.isString(object.type) && self.types[object.type] ? self.types[object.type] : self.types.string;
          if (mod2) {
            if (!self.mods[mod2]) {
              self.mods[mod2] = { mod: mod2, options: {}, short: {} };
            }
            mod2 = self.mods[mod2];
            mod2.options[object.name] = object;
            if (object.short) {
              mod2.short[object.short] = object;
            }
          } else {
            self.options[object.name] = object;
            if (object.short) {
              self.short[object.short] = object;
            }
          }
        }
        return self;
      },
      mod: function(object) {
        var mod2;
        if (self.isArray(object)) {
          object.forEach(function(value) {
            self.mod(value);
          });
        } else if (!self.isObject(object)) {
          throw new Error("No mod definition provided");
        } else if (!object.mod) {
          throw new Error("Expecting 'mod' entry for module");
        } else if (!self.mods[object.mod]) {
          self.mods[object.mod] = { mod: object.mod, options: {}, short: {} };
        }
        mod2 = self.mods[object.mod];
        mod2.description = object.description || mod2.description;
        self.option(mod2.mod, object.options);
        return self;
      },
      clear: function() {
        var version = self.options.version;
        self.short = {};
        self.options = {};
        self.mods = {};
        self.option(helpOption);
        if (version) {
          self.option(version);
        }
        return self;
      },
      info: function(mod2, description) {
        if (description === void 0) {
          self.description = mod2;
        } else if (self.mods[mod2]) {
          self.mods[mod2] = description;
        }
        return self;
      },
      help: function(mod2) {
        var output = [], name, option;
        if (mod2 && (mod2 = self.mods[mod2])) {
          output = ["", mod2.description, ""];
          for (name in mod2.options) {
            option = mod2.options[name];
            output.push("	--" + option.name + (option.short ? ", -" + option.short : ""));
            output.push("		" + option.description);
            if (option.example) {
              output.push("		" + option.example);
            }
            output.push("");
          }
        } else {
          output = ["", self.description, ""];
          for (name in self.options) {
            option = self.options[name];
            output.push("	--" + option.name + (option.short ? ", -" + option.short : ""));
            output.push("		" + option.description);
            if (option.example) {
              output.push("		" + option.example);
            }
            output.push("");
          }
        }
        console.log(output.join("\n") + "\n\n");
        return self;
      },
      _run: function(argv2) {
        var args2 = { targets: [], options: {} }, opts = self.options, shortOpts = self.short, skip = false;
        argv2 = self.isArray(argv2) ? argv2 : process.argv.slice(2);
        if (argv2.length && ristarget.exec(argv2[0]) && self.mods[argv2[0]]) {
          args2.mod = argv2.shift();
          opts = self.mods[args2.mod].options;
          shortOpts = self.mods[args2.mod].short;
        }
        argv2.forEach(function(arg, i) {
          var peek = argv2[i + 1], option, index, value;
          if (skip) {
            return skip = false;
          } else if (rddash.exec(arg)) {
            arg = arg.replace(rddash, "");
            if ((index = arg.indexOf("=")) !== -1) {
              value = arg.substr(index + 1);
              arg = arg.substr(0, index);
            } else {
              value = "true";
            }
            if (!(option = opts[arg])) {
              throw "Option '--" + arg + "' not supported";
            }
            args2.options[arg] = option.type(value, arg, args2.options, args2);
            if (self.isFunction(option.onset)) {
              option.onset(args2);
            }
          } else if (rdash.exec(arg)) {
            arg = arg.replace(rdash, "");
            if (arg.length > 1) {
              arg.split("").forEach(function(character) {
                if (!(option = shortOpts[character])) {
                  throw "Option '-" + character + "' not supported";
                }
                args2.options[option.name] = option.type("true", option.name, args2.options, args2);
              });
            } else {
              if (!(option = shortOpts[arg])) {
                throw "Option '-" + arg + "' not supported";
              }
              if (peek && option.test && option.test(peek, option.name, args2.options, args2)) {
                value = peek;
                skip = true;
              } else if (peek && !option.test && ristarget.exec(peek)) {
                value = peek;
                skip = true;
              } else {
                value = "true";
              }
              args2.options[option.name] = option.type(value, option.name, args2.options, args2);
              if (self.isFunction(option.onset)) {
                option.onset(args2);
              }
            }
          } else {
            args2.targets.push(arg);
          }
        });
        return args2;
      },
      run: function(argv2) {
        try {
          return self._run(argv2);
        } catch (e) {
          if (!self.isString(e)) {
            throw e;
          }
          console.log("\n" + e + ". Trigger '" + self.name + " -h' for more details.\n\n");
          process.exit(1);
        }
      }
    };
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(method2) {
      if (method2 == "Array") {
        return self.isArray = Array.isArray;
      } else if (method2 == "Error") {
        self.isError = function(object) {
          return object && object instanceof Error;
        };
        return;
      }
      var match = "[object " + method2 + "]";
      self["is" + method2] = function(object) {
        return object !== void 0 && object !== null && toString2.call(object) == match;
      };
    });
  }
});

// node_modules/argv/index.js
var require_argv2 = __commonJS({
  "node_modules/argv/index.js"(exports, module2) {
    module2.exports = require_argv();
  }
});

// node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}

// node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

// node_modules/ramda/es/internal/_arity.js
function _arity(n, fn) {
  switch (n) {
    case 0:
      return function() {
        return fn.apply(this, arguments);
      };
    case 1:
      return function(a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function(a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function(a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function(a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function(a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function(a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function(a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function(a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}

// node_modules/ramda/es/internal/_curryN.js
function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}

// node_modules/ramda/es/curryN.js
var curryN = /* @__PURE__ */ _curry2(function curryN2(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});
var curryN_default = curryN;

// node_modules/ramda/es/internal/_curry3.js
function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function(_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function(_c) {
          return fn(a, b, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function(_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

// node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};

// node_modules/ramda/es/internal/_isTransformer.js
function _isTransformer(obj) {
  return obj != null && typeof obj["@@transducer/step"] === "function";
}

// node_modules/ramda/es/internal/_dispatchable.js
function _dispatchable(methodNames, transducerCreator, fn) {
  return function() {
    if (arguments.length === 0) {
      return fn();
    }
    var obj = arguments[arguments.length - 1];
    if (!isArray_default(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === "function") {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}

// node_modules/ramda/es/internal/_xfBase.js
var xfBase_default = {
  init: function() {
    return this.xf["@@transducer/init"]();
  },
  result: function(result) {
    return this.xf["@@transducer/result"](result);
  }
};

// node_modules/ramda/es/internal/_isString.js
function _isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}

// node_modules/ramda/es/internal/_isArrayLike.js
var _isArrayLike = /* @__PURE__ */ _curry1(function isArrayLike(x) {
  if (isArray_default(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== "object") {
    return false;
  }
  if (_isString(x)) {
    return false;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
var isArrayLike_default = _isArrayLike;

// node_modules/ramda/es/internal/_xwrap.js
var XWrap = /* @__PURE__ */ function() {
  function XWrap2(fn) {
    this.f = fn;
  }
  XWrap2.prototype["@@transducer/init"] = function() {
    throw new Error("init not implemented on XWrap");
  };
  XWrap2.prototype["@@transducer/result"] = function(acc) {
    return acc;
  };
  XWrap2.prototype["@@transducer/step"] = function(acc, x) {
    return this.f(acc, x);
  };
  return XWrap2;
}();
function _xwrap(fn) {
  return new XWrap(fn);
}

// node_modules/ramda/es/bind.js
var bind = /* @__PURE__ */ _curry2(function bind2(fn, thisObj) {
  return _arity(fn.length, function() {
    return fn.apply(thisObj, arguments);
  });
});
var bind_default = bind;

// node_modules/ramda/es/internal/_reduce.js
function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf["@@transducer/step"](acc, list[idx]);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    idx += 1;
  }
  return xf["@@transducer/result"](acc);
}
function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf["@@transducer/step"](acc, step.value);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    step = iter.next();
  }
  return xf["@@transducer/result"](acc);
}
function _methodReduce(xf, acc, obj, methodName2) {
  return xf["@@transducer/result"](obj[methodName2](bind_default(xf["@@transducer/step"], xf), acc));
}
var symIterator = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
function _reduce(fn, acc, list) {
  if (typeof fn === "function") {
    fn = _xwrap(fn);
  }
  if (isArrayLike_default(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list["fantasy-land/reduce"] === "function") {
    return _methodReduce(fn, acc, list, "fantasy-land/reduce");
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === "function") {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === "function") {
    return _methodReduce(fn, acc, list, "reduce");
  }
  throw new TypeError("reduce: list must be array or iterable");
}

// node_modules/ramda/es/internal/_has.js
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// node_modules/ramda/es/internal/_isArguments.js
var toString = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
}();
var isArguments_default = _isArguments;

// node_modules/ramda/es/keys.js
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  "use strict";
  return arguments.propertyIsEnumerable("length");
}();
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var keys_default = keys;

// node_modules/ramda/es/internal/_isInteger.js
var isInteger_default = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

// node_modules/ramda/es/isNil.js
var isNil = /* @__PURE__ */ _curry1(function isNil2(x) {
  return x == null;
});
var isNil_default = isNil;

// node_modules/ramda/es/type.js
var type = /* @__PURE__ */ _curry1(function type2(val) {
  return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
});
var type_default = type;

// node_modules/ramda/es/internal/_arrayFromIterator.js
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}

// node_modules/ramda/es/internal/_includesWith.js
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}

// node_modules/ramda/es/internal/_functionName.js
function _functionName(f) {
  var match = String(f).match(/^function (\w*)/);
  return match == null ? "" : match[1];
}

// node_modules/ramda/es/internal/_objectIs.js
function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  } else {
    return a !== a && b !== b;
  }
}
var objectIs_default = typeof Object.is === "function" ? Object.is : _objectIs;

// node_modules/ramda/es/internal/_equals.js
function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }
  return !_includesWith(function(b2, aItem) {
    return !_includesWith(eq, aItem, b2);
  }, b, a);
}
function _equals(a, b, stackA, stackB) {
  if (objectIs_default(a, b)) {
    return true;
  }
  var typeA = type_default(a);
  if (typeA !== type_default(b)) {
    return false;
  }
  if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
    return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
  }
  if (typeof a.equals === "function" || typeof b.equals === "function") {
    return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
  }
  switch (typeA) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
        return a === b;
      }
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof a === typeof b && objectIs_default(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case "Date":
      if (!objectIs_default(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case "Error":
      return a.name === b.name && a.message === b.message;
    case "RegExp":
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }
  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }
  switch (typeA) {
    case "Map":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case "Set":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return false;
  }
  var keysA = keys_default(a);
  if (keysA.length !== keys_default(b).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}

// node_modules/ramda/es/equals.js
var equals = /* @__PURE__ */ _curry2(function equals2(a, b) {
  return _equals(a, b, [], []);
});
var equals_default = equals;

// node_modules/ramda/es/internal/_indexOf.js
function _indexOf(list, a, idx) {
  var inf, item;
  if (typeof list.indexOf === "function") {
    switch (typeof a) {
      case "number":
        if (a === 0) {
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === "number" && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        return list.indexOf(a, idx);
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return list.indexOf(a, idx);
      case "object":
        if (a === null) {
          return list.indexOf(a, idx);
        }
    }
  }
  while (idx < list.length) {
    if (equals_default(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}

// node_modules/ramda/es/internal/_includes.js
function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

// node_modules/ramda/es/internal/_toISOString.js
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};

// node_modules/ramda/es/internal/_complement.js
function _complement(f) {
  return function() {
    return !f.apply(this, arguments);
  };
}

// node_modules/ramda/es/internal/_filter.js
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}

// node_modules/ramda/es/internal/_isObject.js
function _isObject(x) {
  return Object.prototype.toString.call(x) === "[object Object]";
}

// node_modules/ramda/es/internal/_xfilter.js
var XFilter = /* @__PURE__ */ function() {
  function XFilter2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter2.prototype["@@transducer/init"] = xfBase_default.init;
  XFilter2.prototype["@@transducer/result"] = xfBase_default.result;
  XFilter2.prototype["@@transducer/step"] = function(result, input) {
    return this.f(input) ? this.xf["@@transducer/step"](result, input) : result;
  };
  return XFilter2;
}();
var _xfilter = /* @__PURE__ */ _curry2(function _xfilter2(f, xf) {
  return new XFilter(f, xf);
});
var xfilter_default = _xfilter;

// node_modules/ramda/es/filter.js
var filter = /* @__PURE__ */ _curry2(
  /* @__PURE__ */ _dispatchable(["fantasy-land/filter", "filter"], xfilter_default, function(pred, filterable) {
    return _isObject(filterable) ? _reduce(function(acc, key) {
      if (pred(filterable[key])) {
        acc[key] = filterable[key];
      }
      return acc;
    }, {}, keys_default(filterable)) : _filter(pred, filterable);
  })
);
var filter_default = filter;

// node_modules/ramda/es/reject.js
var reject = /* @__PURE__ */ _curry2(function reject2(pred, filterable) {
  return filter_default(_complement(pred), filterable);
});
var reject_default = reject;

// node_modules/ramda/es/remove.js
var remove = /* @__PURE__ */ _curry3(function remove2(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});
var remove_default = remove;

// node_modules/ramda/es/flip.js
var flip = /* @__PURE__ */ _curry1(function flip2(fn) {
  return curryN_default(fn.length, function(a, b) {
    var args2 = Array.prototype.slice.call(arguments, 0);
    args2[0] = b;
    args2[1] = a;
    return fn.apply(this, args2);
  });
});
var flip_default = flip;

// node_modules/ramda/es/insert.js
var insert = /* @__PURE__ */ _curry3(function insert2(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});
var insert_default = insert;

// node_modules/ramda/es/internal/_isNumber.js
function _isNumber(x) {
  return Object.prototype.toString.call(x) === "[object Number]";
}

// node_modules/ramda/es/range.js
var range = /* @__PURE__ */ _curry2(function range2(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError("Both arguments to range must be numbers");
  }
  var result = [];
  var n = from;
  while (n < to) {
    result.push(n);
    n += 1;
  }
  return result;
});
var range_default = range;

// node_modules/ramda/es/trim.js
var hasProtoTrim = typeof String.prototype.trim === "function";

// node_modules/ramda/es/without.js
var without = /* @__PURE__ */ _curry2(function(xs, list) {
  return reject_default(flip_default(_includes)(xs), list);
});
var without_default = without;

// node_modules/ramda/es/zip.js
var zip = /* @__PURE__ */ _curry2(function zip2(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }
  return rv;
});
var zip_default = zip;

// src/algorithm/helper/randomness.ts
function random(min, max) {
  if (min >= max) {
    throw new Error("Min value must be strictly smaller than max value");
  }
  return Math.floor(Math.random() * (max - min) + min);
}
function randomRange(length) {
  let i = random(0, length + 1);
  let j = i;
  let count = 0;
  while (i === j) {
    j = random(0, length);
    count++;
    if (count > 100) {
      console.log("stuck", i, j, length);
    }
  }
  if (j < i) {
    [i, j] = [j, i];
  }
  return { i, j };
}
function randomIndices(arrayLength, amount) {
  return shuffle(range_default(0, arrayLength)).slice(0, amount);
}

// src/algorithm/helper/arrayUtils.ts
function getMinBy(weightFn, array) {
  let minElement = array[0];
  let minValue = weightFn(minElement);
  for (let element of array.slice(1)) {
    const currentValue = weightFn(element);
    if (currentValue < minValue) {
      minElement = element;
      minValue = currentValue;
    }
  }
  return minElement;
}
function getMaxBy(weightFn, array) {
  let maxElement = array[0];
  let maxValue = weightFn(maxElement);
  for (let element of array.slice(1)) {
    const currentValue = weightFn(element);
    if (currentValue > maxValue) {
      maxElement = element;
      maxValue = currentValue;
    }
  }
  return maxElement;
}
function swapElements(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
  return array;
}
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  const arrayCopy = [...array];
  while (currentIndex > 0) {
    randomIndex = random(0, currentIndex--);
    swapElements(arrayCopy, currentIndex, randomIndex);
  }
  return arrayCopy;
}
function pickByIndices(indices, items) {
  const picked = [];
  for (let i of indices) {
    picked.push(items[i]);
  }
  return picked;
}
function getNonEmptyIndices(array) {
  return array.reduce((indices, item, index) => {
    if (item !== void 0) {
      indices.push(index);
    }
    return indices;
  }, []);
}

// src/algorithm/graph.ts
var Edge = class {
  v;
  u;
  weight;
  constructor(v, u, weight = 1) {
    this.v = v;
    this.u = u;
    this.weight = weight;
  }
  compareTo(other) {
    return compareEdges(this, other);
  }
};
function compareEdges(edge1, edge2) {
  return edge1.weight - edge2.weight;
}
var Graph = class {
  vertices = /* @__PURE__ */ new Set();
  edges = [];
  degrees;
  numVertices;
  adjacencyMatrix;
  neighboursCache;
  constructor(edges = [], vertices = []) {
    this.adjacencyMatrix = [];
    this.neighboursCache = [];
    this.degrees = [];
    this.numVertices = 0;
    this.addEdges(edges);
    this.addVertices(vertices);
  }
  copy() {
    const graph = new Graph();
    graph.adjacencyMatrix = this.adjacencyMatrix.map((array) => array.slice(0));
    graph.degrees = this.degrees.slice(0);
    graph.numVertices = this.numVertices;
    return graph;
  }
  getVertices() {
    return getNonEmptyIndices(this.adjacencyMatrix);
  }
  getNumVertices() {
    return this.numVertices;
  }
  getDegree(vertex) {
    return this.degrees[vertex];
  }
  getFillIn(vertex) {
    const neighbours = this.getNeighbours(vertex);
    let fillIn = 0;
    for (let i = 0; i < neighbours.length; i++) {
      for (let j = i + 1; j < neighbours.length; j++) {
        if (!this.areAdjacent(neighbours[i], neighbours[j])) {
          fillIn++;
        }
      }
    }
    return fillIn;
  }
  getMaxDegreeVertex() {
    return getMaxBy(this.getDegree.bind(this), this.getVertices());
  }
  getMinDegreeVertex() {
    return getMinBy(this.getDegree.bind(this), this.getVertices());
  }
  getEdges() {
    const vertices = this.getVertices();
    const edges = [];
    for (let v of vertices) {
      const neighbours = this.getNeighbours(v);
      for (let u of neighbours) {
        const edge = this.getEdge(v, u);
        if (edge) {
          edges.push(edge);
        }
      }
    }
    return edges;
  }
  getUndirectedEdges() {
    const vertices = this.getVertices();
    const seenVertices = /* @__PURE__ */ new Set();
    const edges = [];
    for (let v of vertices) {
      const neighbours = this.getNeighbours(v);
      for (let u of neighbours) {
        if (seenVertices.has(u)) {
          continue;
        }
        const edge = this.getEdge(v, u);
        if (edge) {
          edges.push(edge);
        }
      }
      seenVertices.add(v);
    }
    return edges;
  }
  getEdge(v, u) {
    if (!this.areAdjacent(v, u)) {
      return void 0;
    }
    const weight = this.adjacencyMatrix[v]?.[u];
    return new Edge(v, u, weight);
  }
  hasVertex(vertex) {
    return !isNil_default(this.adjacencyMatrix[vertex]);
  }
  addEdge(edge) {
    const { v, u, weight } = edge;
    this.addVertex(v);
    this.addVertex(u);
    this.adjacencyMatrix[v][u] = weight;
    this.adjacencyMatrix[u][v] = weight;
    this.degrees[u] += 1;
    this.degrees[v] += 1;
    delete this.neighboursCache[u];
    delete this.neighboursCache[v];
  }
  addEdges(edges) {
    edges.forEach(this.addEdge.bind(this));
  }
  addVertex(vertex) {
    if (!this.adjacencyMatrix[vertex]) {
      this.adjacencyMatrix[vertex] = [];
      this.degrees[vertex] = 0;
      this.numVertices++;
    }
  }
  removeVertex(v) {
    for (let u of this.getNeighbours(v)) {
      delete this.adjacencyMatrix[u][v];
      this.removeEdge(u, v);
    }
    delete this.adjacencyMatrix[v];
    delete this.degrees[v];
    this.numVertices--;
  }
  getNeighbours(vertex) {
    if (!this.adjacencyMatrix[vertex]) {
      return [];
    }
    if (this.neighboursCache[vertex]) {
      return this.neighboursCache[vertex];
    }
    const neighbours = getNonEmptyIndices(this.adjacencyMatrix[vertex]);
    this.neighboursCache[vertex] = neighbours;
    return neighbours;
  }
  addVertices(vertices) {
    vertices.forEach(this.addVertex.bind(this));
  }
  removeEdge(u, v) {
    this.degrees[u] -= 1;
    this.degrees[v] -= 1;
    delete this.adjacencyMatrix[u][v];
    delete this.adjacencyMatrix[v][u];
    delete this.neighboursCache[u];
    delete this.neighboursCache[v];
  }
  getInducedSubgraph(vertices) {
    const vertexSet = new Set(vertices);
    const subsetEdges = this.edges.filter((edge) => {
      return vertexSet.has(edge.v) && vertexSet.has(edge.u);
    });
    return new Graph(subsetEdges);
  }
  hasEdge(edge) {
    const { u, v, weight } = edge;
    return this.adjacencyMatrix[u][v] = weight;
  }
  areAdjacent(u, v) {
    return !!this.adjacencyMatrix[u][v];
  }
  formClique(vertices) {
    for (let i = 0; i < vertices.length; i++) {
      if (!this.hasVertex(vertices[i])) {
        throw new Error(`Graph does not contain vertex "${vertices[i]}"`);
      }
    }
    for (let i = 0; i < vertices.length; i++) {
      const v = vertices[i];
      for (let j = i + 1; j < vertices.length; j++) {
        const u = vertices[j];
        if (!this.areAdjacent(u, v)) {
          this.addEdge(new Edge(v, u, 1));
        }
      }
    }
  }
};

// src/algorithm/eliminationOrdering.ts
function getTreeBags(G, eliminationOrdering) {
  const H = G.copy();
  const bags = [];
  eliminationOrdering.init(H);
  const order = [];
  for (let vertex of eliminationOrdering) {
    const neighbours = H.getNeighbours(vertex);
    H.formClique(neighbours);
    H.removeVertex(vertex);
    const bag = /* @__PURE__ */ new Set([...neighbours, vertex]);
    bags.push(bag);
    order.push(vertex);
  }
  return { bags, order };
}
var buildTreeDecomposition = (G, eliminationOrdering) => {
  const { bags, order } = getTreeBags(G, eliminationOrdering);
  const tree = new Graph();
  tree.addVertices(range_default(0, bags.length));
  const V = order;
  for (let i = 0; i < bags.length; i++) {
    const bag = bags[i];
    for (let j = i + 1; j < order.length; j++) {
      if (bag.has(V[j])) {
        tree.addEdge(new Edge(i, j));
        break;
      }
    }
  }
  return { tree, bags };
};

// src/algorithm/Ordering.ts
var Ordering = class {
  graph;
  init(graph) {
    this.graph = graph;
  }
  *[Symbol.iterator]() {
    while (this.hasNext()) {
      yield this.next();
    }
  }
};
var PermutationOrdering = class extends Ordering {
  permutation;
  currentIndex;
  constructor(permutation) {
    super();
    this.permutation = permutation;
    this.currentIndex = 0;
  }
  next() {
    return this.permutation[this.currentIndex++];
  }
  hasNext() {
    return this.currentIndex < this.permutation.length;
  }
};
var MinDegreeOrdering = class extends Ordering {
  next() {
    return this.graph.getMinDegreeVertex();
  }
  hasNext() {
    return this.graph.getNumVertices() > 0;
  }
};
var MinFillInOrdering = class extends Ordering {
  next() {
    return getMinBy(
      (vertex) => this.graph.getFillIn(vertex),
      this.graph.getVertices()
    );
  }
  hasNext() {
    return this.graph.getNumVertices() > 0;
  }
};
var MinDegreeAndFillInOrdering = class extends Ordering {
  next() {
    return getMinBy(
      (vertex) => this.graph.getDegree(vertex) + this.graph.getFillIn(vertex),
      this.graph.getVertices()
    );
  }
  hasNext() {
    return this.graph.getNumVertices() > 0;
  }
};

// src/algorithm/genetic/fitness.ts
var import_nano_memoize = __toESM(require_nano_memoize());
function fitness(graph) {
  return (0, import_nano_memoize.default)((permutation) => {
    const { bags } = getTreeBags(graph, new PermutationOrdering(permutation));
    return -getTreeWidth(bags);
  });
}

// src/algorithm/genetic/mutation.ts
function insertionMutation(list, indices) {
  if (list.length <= 2) {
    return list;
  }
  if (!indices) {
    indices = randomRange(list.length);
  }
  const { i, j } = indices;
  const element = list[i];
  const listWithout = remove_default(i, 1, [...list]);
  return insert_default(j, element, listWithout);
}

// src/algorithm/genetic/orderBasedCrossover.ts
function orderBasedCrossover(listA, listB, indices) {
  if (!indices) {
    indices = randomIndices(listA.length, random(0, listA.length));
  }
  indices.sort();
  const keepFromA = pickByIndices(indices, listA);
  const keepFromB = without_default(keepFromA, listB);
  const indicesB = keepFromB.map((item) => listB.indexOf(item));
  const indicesA = without_default(indicesB, range_default(0, listA.length));
  const output = [];
  for (let i = 0; i < indicesA.length; i++) {
    output[indicesA[i]] = keepFromA[i];
  }
  for (let i = 0; i < indicesB.length; i++) {
    output[indicesB[i]] = keepFromB[i];
  }
  return output;
}

// src/algorithm/genetic/orderCrossover.ts
function orderCrossover(listA, listB, _range) {
  if (!_range) {
    _range = randomRange(listA.length);
  }
  const { i: start, j: end } = _range;
  const keepFromA = listA.slice(start, end);
  const keepFromB = without_default(keepFromA, listB);
  const indicesA = keepFromA.map((item) => listA.indexOf(item));
  const indicesB = without_default(indicesA, range_default(0, listA.length));
  const output = [];
  for (let i = 0; i < indicesA.length; i++) {
    output[indicesA[i]] = keepFromA[i];
  }
  for (let i = 0; i < indicesB.length; i++) {
    output[indicesB[i]] = keepFromB[i];
  }
  return output;
}

// src/algorithm/genetic/selection.ts
function selection(population, scores, tournamentSize = 3) {
  return population.map(() => tournament(population, scores, tournamentSize));
}
function tournament(population, scores, tournamentSize = 3) {
  const indices = randomIndices(population.length, tournamentSize);
  const pairs = zip_default(population, scores);
  const pickedPairs = pickByIndices(indices, pairs);
  const [best, _] = getMaxBy((pair) => pair[1], pickedPairs);
  return best;
}

// src/algorithm/genetic/geneticAlgorithm.ts
var GeneticAlgorithm = class {
  population;
  scores;
  graph;
  fitness;
  populationSize;
  elitismRatio;
  tournamentRatio;
  mutationRate;
  constructor(graph, permutations = [], {
    populationSize = 20,
    elitism = 0.1,
    tournamentRatio = 0.3,
    mutationRate = 0.8
  } = {}) {
    this.graph = graph;
    this.fitness = fitness(graph);
    this.elitismRatio = elitism;
    this.populationSize = populationSize;
    this.population = [
      ...permutations,
      ...this.createRandomPopulation(populationSize - permutations.length)
    ];
    this.scores = this.population.map(
      (permutation) => this.fitness(permutation)
    );
    this.tournamentRatio = tournamentRatio;
    this.mutationRate = mutationRate;
  }
  executeRound() {
    this.population = this.getNextPopulation();
    this.scores = this.population.map(
      (permutation) => this.fitness(permutation)
    );
    const paired = zip_default(this.population, this.scores);
    const [best, score] = getMaxBy((pair) => pair[1], paired);
    return { best, score };
  }
  createRandomPopulation(size) {
    const population = [];
    const vertices = this.graph.getVertices();
    for (let i = 0; i < size; i++) {
      population.push(shuffle(vertices));
    }
    return population;
  }
  getTournamentSize() {
    return Math.round(this.populationSize * this.tournamentRatio);
  }
  getNextPopulation() {
    const newPopulation = [];
    const selected = selection(
      this.population,
      this.scores,
      this.getTournamentSize()
    );
    const elites = this.getElites();
    newPopulation.push(...elites);
    const numParents = this.populationSize - this.getNumElites();
    for (let i = 0; i < numParents; i += 2) {
      const parent1 = selected[i];
      const parent2 = selected[i + 1];
      const children = this.crossover(parent1, parent2).map((child) => {
        return Math.random() < this.mutationRate ? this.mutate(child) : child;
      });
      newPopulation.push(...children);
    }
    return newPopulation;
  }
  mutate(permutation) {
    return insertionMutation(permutation);
  }
  getElites() {
    const population = this.population;
    const scores = this.scores;
    const sortedPopulation = zip_default(population, scores).sort((a, b) => b[1] - a[1]).map((item) => item[0]);
    return sortedPopulation.slice(0, this.getNumElites());
  }
  getNumElites() {
    const nonElites = this.populationSize * (1 - this.elitismRatio);
    const roundedNonElites = Math.round(nonElites / 2) * 2;
    return this.populationSize - roundedNonElites;
  }
  crossover(parent1, parent2) {
    const crossoverFunctions = [orderBasedCrossover, orderCrossover];
    let index = random(0, crossoverFunctions.length);
    const child1 = crossoverFunctions[index](parent1, parent2);
    index = random(0, crossoverFunctions.length);
    const child2 = crossoverFunctions[0](parent2, parent1);
    return [child1, child2];
  }
};

// src/algorithm/treeDecomposition.ts
function getTreeWidth(bags) {
  return bags.reduce((max, bag) => Math.max(max, bag.size), 0) - 1;
}
function greedyDegreeMethod(graph) {
  return buildTreeDecomposition(graph, new MinDegreeOrdering());
}
function greedyFillInMethod(graph) {
  return buildTreeDecomposition(graph, new MinFillInOrdering());
}
function greedyDegreeFillInMethod(graph) {
  return buildTreeDecomposition(graph, new MinDegreeAndFillInOrdering());
}
function geneticMethod(graph, repeats = 1e3) {
  const { order: order1 } = getTreeBags(graph, new MinDegreeOrdering());
  const { order: order2 } = getTreeBags(graph, new MinFillInOrdering());
  const { order: order3 } = getTreeBags(
    graph,
    new MinDegreeAndFillInOrdering()
  );
  const geneticAlgorithm = new GeneticAlgorithm(graph, [
    order1,
    order2,
    order3
  ]);
  let bestPermutation = graph.getVertices();
  for (let i = 0; i < repeats; i++) {
    const result = geneticAlgorithm.executeRound();
    bestPermutation = result.best;
  }
  return buildTreeDecomposition(
    graph,
    new PermutationOrdering(bestPermutation)
  );
}

// src/cli/grFileParser.ts
function parseGraphFile(contents) {
  const lines = filterComments(splitLines(contents));
  const details = getGraphDetails(lines);
  const edges = getEdges(lines);
  const graph = new Graph(edges);
  const actualNumVertices = graph.getNumVertices();
  const actualNumEdges = edges.length;
  if (details?.numEdges !== actualNumEdges || details.numVertices !== actualNumVertices) {
    process.stderr.write(
      "Problem descriptor does not match parsed vertices and edges. File is likely corrupt\n"
    );
    process.exit(1);
  }
  return graph;
}
function splitLines(contents) {
  return contents.split(/\r?\n/);
}
function filterComments(lines) {
  return lines.filter((line) => !(isBlank(line) || isComment(line)));
}
function isBlank(line) {
  return line.trim() === "";
}
function isComment(line) {
  return line.trim().startsWith("c");
}
function getGraphDetails(lines) {
  for (let line of lines) {
    if (isDetailsLine(line)) {
      return parseDetailsLine(line);
    }
  }
  throw new Error("Problem description missing");
}
function getEdges(lines) {
  const edges = [];
  for (let line of lines) {
    if (isEdgeLine(line)) {
      const edge = parseEdgeLine(line);
      edges.push(edge);
    }
  }
  return edges;
}
function isDetailsLine(line) {
  return /^p\s+tw\s+\d+\s+\d+$/.test(line.trim());
}
function isEdgeLine(line) {
  return /^\d+\s+\d+$/.test(line.trim());
}
function parseDetailsLine(line) {
  const tokens = splitTokens(line.trim());
  const numVertices = parseInt(tokens[2]);
  const numEdges = parseInt(tokens[3]);
  return { numVertices, numEdges };
}
function parseEdgeLine(line) {
  const tokens = splitTokens(line.trim());
  const v = parseInt(tokens[0]);
  const u = parseInt(tokens[1]);
  return new Edge(v, u);
}
function splitTokens(line) {
  return line.split(/\s+/);
}

// src/cli/tdFileOutput.ts
function treeDecompositionToString(problemGraph, treeDecomposition) {
  const solutionLine = getSolutionLine(problemGraph, treeDecomposition);
  const bagLines = getBagLines(treeDecomposition.bags);
  const edgeLines = getEdgeLines(treeDecomposition.tree);
  const lines = [solutionLine, ...bagLines, ...edgeLines];
  return lines.join("\n");
}
function getSolutionLine(problemGraph, { bags }) {
  const numVertices = problemGraph.getNumVertices();
  const numBags = bags.length;
  const treewidth = getTreeWidth(bags);
  return `s td ${numBags} ${treewidth + 1} ${numVertices}`;
}
function getBagLines(bags) {
  return bags.map(bagToString);
}
function getEdgeLines(tree) {
  return tree.getUndirectedEdges().map(edgeToString);
}
function bagToString(bag, index) {
  return `b ${index + 1} ${[...bag].join(" ")}`;
}
function edgeToString(edge) {
  return `${edge.v + 1} ${edge.u + 1}`;
}

// src/cli/main.ts
var argv = require_argv2();
var args = argv.option([
  {
    name: "method",
    short: "m",
    type: "string",
    description: "Defines tree decomposition heuristic used"
  },
  {
    name: "runs",
    short: "r",
    type: "int",
    description: "Defines the number of runs for the genetic evolution (default = 100)"
  },
  {
    name: "tw-only",
    short: "-w",
    type: "boolean",
    description: "Outputs only estimated treeWidth rather than tree decomposition"
  }
]).run();
var methods = {
  genetic: geneticMethod,
  minDegree: greedyDegreeMethod,
  minFillIn: greedyFillInMethod,
  minDegreeFillIn: greedyDegreeFillInMethod
};
if (!Object.hasOwn(methods, args.options.method)) {
  process.stderr.write(
    `Please specify a valid method, options are: ${Object.keys(methods).join(
      ", "
    )}
`
  );
  process.exit(1);
}
var methodName = args.options.method;
var method = methods[methodName];
process.stdin.on("data", (data) => {
  const graph = parseGraphFile(data.toString());
  let td;
  if (method === geneticMethod) {
    td = method(graph, args.options.runs);
  } else {
    td = method(graph);
  }
  if (args.options["tw-only"]) {
    console.log(getTreeWidth(td.bags));
  } else {
    const output = treeDecompositionToString(graph, td);
    console.log(output);
  }
});
