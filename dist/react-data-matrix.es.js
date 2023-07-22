import Yr from "react";
var fr = { exports: {} }, K = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fr;
function he() {
  if (Fr)
    return K;
  Fr = 1;
  var n = Yr, s = Symbol.for("react.element"), b = Symbol.for("react.fragment"), d = Object.prototype.hasOwnProperty, y = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, R = { key: !0, ref: !0, __self: !0, __source: !0 };
  function T(f, v, x) {
    var h, g = {}, w = null, j = null;
    x !== void 0 && (w = "" + x), v.key !== void 0 && (w = "" + v.key), v.ref !== void 0 && (j = v.ref);
    for (h in v)
      d.call(v, h) && !R.hasOwnProperty(h) && (g[h] = v[h]);
    if (f && f.defaultProps)
      for (h in v = f.defaultProps, v)
        g[h] === void 0 && (g[h] = v[h]);
    return { $$typeof: s, type: f, key: w, ref: j, props: g, _owner: y.current };
  }
  return K.Fragment = b, K.jsx = T, K.jsxs = T, K;
}
var X = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dr;
function me() {
  return Dr || (Dr = 1, process.env.NODE_ENV !== "production" && function() {
    var n = Yr, s = Symbol.for("react.element"), b = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), T = Symbol.for("react.provider"), f = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), j = Symbol.for("react.offscreen"), A = Symbol.iterator, O = "@@iterator";
    function F(r) {
      if (r === null || typeof r != "object")
        return null;
      var e = A && r[A] || r[O];
      return typeof e == "function" ? e : null;
    }
    var C = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(r) {
      {
        for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), a = 1; a < e; a++)
          t[a - 1] = arguments[a];
        D("error", r, t);
      }
    }
    function D(r, e, t) {
      {
        var a = C.ReactDebugCurrentFrame, l = a.getStackAddendum();
        l !== "" && (e += "%s", t = t.concat([l]));
        var u = t.map(function(o) {
          return String(o);
        });
        u.unshift("Warning: " + e), Function.prototype.apply.call(console[r], console, u);
      }
    }
    var P = !1, M = !1, L = !1, N = !1, U = !1, W;
    W = Symbol.for("react.module.reference");
    function B(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === d || r === R || U || r === y || r === x || r === h || N || r === j || P || M || L || typeof r == "object" && r !== null && (r.$$typeof === w || r.$$typeof === g || r.$$typeof === T || r.$$typeof === f || r.$$typeof === v || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === W || r.getModuleId !== void 0));
    }
    function I(r, e, t) {
      var a = r.displayName;
      if (a)
        return a;
      var l = e.displayName || e.name || "";
      return l !== "" ? t + "(" + l + ")" : t;
    }
    function z(r) {
      return r.displayName || "Context";
    }
    function S(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case d:
          return "Fragment";
        case b:
          return "Portal";
        case R:
          return "Profiler";
        case y:
          return "StrictMode";
        case x:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case f:
            var e = r;
            return z(e) + ".Consumer";
          case T:
            var t = r;
            return z(t._context) + ".Provider";
          case v:
            return I(r, r.render, "ForwardRef");
          case g:
            var a = r.displayName || null;
            return a !== null ? a : S(r.type) || "Memo";
          case w: {
            var l = r, u = l._payload, o = l._init;
            try {
              return S(o(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Y = Object.assign, J = 0, dr, vr, pr, hr, mr, _r, br;
    function yr() {
    }
    yr.__reactDisabledLog = !0;
    function zr() {
      {
        if (J === 0) {
          dr = console.log, vr = console.info, pr = console.warn, hr = console.error, mr = console.group, _r = console.groupCollapsed, br = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: yr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: r,
            log: r,
            warn: r,
            error: r,
            group: r,
            groupCollapsed: r,
            groupEnd: r
          });
        }
        J++;
      }
    }
    function Vr() {
      {
        if (J--, J === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Y({}, r, {
              value: dr
            }),
            info: Y({}, r, {
              value: vr
            }),
            warn: Y({}, r, {
              value: pr
            }),
            error: Y({}, r, {
              value: hr
            }),
            group: Y({}, r, {
              value: mr
            }),
            groupCollapsed: Y({}, r, {
              value: _r
            }),
            groupEnd: Y({}, r, {
              value: br
            })
          });
        }
        J < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var nr = C.ReactCurrentDispatcher, ar;
    function Z(r, e, t) {
      {
        if (ar === void 0)
          try {
            throw Error();
          } catch (l) {
            var a = l.stack.trim().match(/\n( *(at )?)/);
            ar = a && a[1] || "";
          }
        return `
` + ar + r;
      }
    }
    var ir = !1, Q;
    {
      var qr = typeof WeakMap == "function" ? WeakMap : Map;
      Q = new qr();
    }
    function gr(r, e) {
      if (!r || ir)
        return "";
      {
        var t = Q.get(r);
        if (t !== void 0)
          return t;
      }
      var a;
      ir = !0;
      var l = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = nr.current, nr.current = null, zr();
      try {
        if (e) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (k) {
              a = k;
            }
            Reflect.construct(r, [], o);
          } else {
            try {
              o.call();
            } catch (k) {
              a = k;
            }
            r.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (k) {
            a = k;
          }
          r();
        }
      } catch (k) {
        if (k && a && typeof k.stack == "string") {
          for (var i = k.stack.split(`
`), E = a.stack.split(`
`), p = i.length - 1, m = E.length - 1; p >= 1 && m >= 0 && i[p] !== E[m]; )
            m--;
          for (; p >= 1 && m >= 0; p--, m--)
            if (i[p] !== E[m]) {
              if (p !== 1 || m !== 1)
                do
                  if (p--, m--, m < 0 || i[p] !== E[m]) {
                    var $ = `
` + i[p].replace(" at new ", " at ");
                    return r.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", r.displayName)), typeof r == "function" && Q.set(r, $), $;
                  }
                while (p >= 1 && m >= 0);
              break;
            }
        }
      } finally {
        ir = !1, nr.current = u, Vr(), Error.prepareStackTrace = l;
      }
      var q = r ? r.displayName || r.name : "", Ar = q ? Z(q) : "";
      return typeof r == "function" && Q.set(r, Ar), Ar;
    }
    function Hr(r, e, t) {
      return gr(r, !1);
    }
    function Jr(r) {
      var e = r.prototype;
      return !!(e && e.isReactComponent);
    }
    function rr(r, e, t) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return gr(r, Jr(r));
      if (typeof r == "string")
        return Z(r);
      switch (r) {
        case x:
          return Z("Suspense");
        case h:
          return Z("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case v:
            return Hr(r.render);
          case g:
            return rr(r.type, e, t);
          case w: {
            var a = r, l = a._payload, u = a._init;
            try {
              return rr(u(l), e, t);
            } catch {
            }
          }
        }
      return "";
    }
    var er = Object.prototype.hasOwnProperty, Er = {}, Rr = C.ReactDebugCurrentFrame;
    function tr(r) {
      if (r) {
        var e = r._owner, t = rr(r.type, r._source, e ? e.type : null);
        Rr.setExtraStackFrame(t);
      } else
        Rr.setExtraStackFrame(null);
    }
    function Gr(r, e, t, a, l) {
      {
        var u = Function.call.bind(er);
        for (var o in r)
          if (u(r, o)) {
            var i = void 0;
            try {
              if (typeof r[o] != "function") {
                var E = Error((a || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw E.name = "Invariant Violation", E;
              }
              i = r[o](e, o, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (p) {
              i = p;
            }
            i && !(i instanceof Error) && (tr(l), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, o, typeof i), tr(null)), i instanceof Error && !(i.message in Er) && (Er[i.message] = !0, tr(l), _("Failed %s type: %s", t, i.message), tr(null));
          }
      }
    }
    var Kr = Array.isArray;
    function or(r) {
      return Kr(r);
    }
    function Xr(r) {
      {
        var e = typeof Symbol == "function" && Symbol.toStringTag, t = e && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return t;
      }
    }
    function Zr(r) {
      try {
        return xr(r), !1;
      } catch {
        return !0;
      }
    }
    function xr(r) {
      return "" + r;
    }
    function Tr(r) {
      if (Zr(r))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Xr(r)), xr(r);
    }
    var G = C.ReactCurrentOwner, Qr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, wr, $r, sr;
    sr = {};
    function re(r) {
      if (er.call(r, "ref")) {
        var e = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (e && e.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function ee(r) {
      if (er.call(r, "key")) {
        var e = Object.getOwnPropertyDescriptor(r, "key").get;
        if (e && e.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function te(r, e) {
      if (typeof r.ref == "string" && G.current && e && G.current.stateNode !== e) {
        var t = S(G.current.type);
        sr[t] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', S(G.current.type), r.ref), sr[t] = !0);
      }
    }
    function ne(r, e) {
      {
        var t = function() {
          wr || (wr = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", e));
        };
        t.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function ae(r, e) {
      {
        var t = function() {
          $r || ($r = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", e));
        };
        t.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var ie = function(r, e, t, a, l, u, o) {
      var i = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: r,
        key: e,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(i, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(i, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: l
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function oe(r, e, t, a, l) {
      {
        var u, o = {}, i = null, E = null;
        t !== void 0 && (Tr(t), i = "" + t), ee(e) && (Tr(e.key), i = "" + e.key), re(e) && (E = e.ref, te(e, l));
        for (u in e)
          er.call(e, u) && !Qr.hasOwnProperty(u) && (o[u] = e[u]);
        if (r && r.defaultProps) {
          var p = r.defaultProps;
          for (u in p)
            o[u] === void 0 && (o[u] = p[u]);
        }
        if (i || E) {
          var m = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          i && ne(o, m), E && ae(o, m);
        }
        return ie(r, i, E, l, a, G.current, o);
      }
    }
    var lr = C.ReactCurrentOwner, jr = C.ReactDebugCurrentFrame;
    function V(r) {
      if (r) {
        var e = r._owner, t = rr(r.type, r._source, e ? e.type : null);
        jr.setExtraStackFrame(t);
      } else
        jr.setExtraStackFrame(null);
    }
    var ur;
    ur = !1;
    function cr(r) {
      return typeof r == "object" && r !== null && r.$$typeof === s;
    }
    function Cr() {
      {
        if (lr.current) {
          var r = S(lr.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function se(r) {
      {
        if (r !== void 0) {
          var e = r.fileName.replace(/^.*[\\\/]/, ""), t = r.lineNumber;
          return `

Check your code at ` + e + ":" + t + ".";
        }
        return "";
      }
    }
    var Pr = {};
    function le(r) {
      {
        var e = Cr();
        if (!e) {
          var t = typeof r == "string" ? r : r.displayName || r.name;
          t && (e = `

Check the top-level render call using <` + t + ">.");
        }
        return e;
      }
    }
    function Or(r, e) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var t = le(e);
        if (Pr[t])
          return;
        Pr[t] = !0;
        var a = "";
        r && r._owner && r._owner !== lr.current && (a = " It was passed a child from " + S(r._owner.type) + "."), V(r), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), V(null);
      }
    }
    function Sr(r, e) {
      {
        if (typeof r != "object")
          return;
        if (or(r))
          for (var t = 0; t < r.length; t++) {
            var a = r[t];
            cr(a) && Or(a, e);
          }
        else if (cr(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var l = F(r);
          if (typeof l == "function" && l !== r.entries)
            for (var u = l.call(r), o; !(o = u.next()).done; )
              cr(o.value) && Or(o.value, e);
        }
      }
    }
    function ue(r) {
      {
        var e = r.type;
        if (e == null || typeof e == "string")
          return;
        var t;
        if (typeof e == "function")
          t = e.propTypes;
        else if (typeof e == "object" && (e.$$typeof === v || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        e.$$typeof === g))
          t = e.propTypes;
        else
          return;
        if (t) {
          var a = S(e);
          Gr(t, r.props, "prop", a, r);
        } else if (e.PropTypes !== void 0 && !ur) {
          ur = !0;
          var l = S(e);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", l || "Unknown");
        }
        typeof e.getDefaultProps == "function" && !e.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ce(r) {
      {
        for (var e = Object.keys(r.props), t = 0; t < e.length; t++) {
          var a = e[t];
          if (a !== "children" && a !== "key") {
            V(r), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), V(null);
            break;
          }
        }
        r.ref !== null && (V(r), _("Invalid attribute `ref` supplied to `React.Fragment`."), V(null));
      }
    }
    function kr(r, e, t, a, l, u) {
      {
        var o = B(r);
        if (!o) {
          var i = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var E = se(l);
          E ? i += E : i += Cr();
          var p;
          r === null ? p = "null" : or(r) ? p = "array" : r !== void 0 && r.$$typeof === s ? (p = "<" + (S(r.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : p = typeof r, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", p, i);
        }
        var m = oe(r, e, t, l, u);
        if (m == null)
          return m;
        if (o) {
          var $ = e.children;
          if ($ !== void 0)
            if (a)
              if (or($)) {
                for (var q = 0; q < $.length; q++)
                  Sr($[q], r);
                Object.freeze && Object.freeze($);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Sr($, r);
        }
        return r === d ? ce(m) : ue(m), m;
      }
    }
    function fe(r, e, t) {
      return kr(r, e, t, !0);
    }
    function de(r, e, t) {
      return kr(r, e, t, !1);
    }
    var ve = de, pe = fe;
    X.Fragment = d, X.jsx = ve, X.jsxs = pe;
  }()), X;
}
process.env.NODE_ENV === "production" ? fr.exports = he() : fr.exports = me();
var c = fr.exports;
const H = (n) => n || {}, _e = (n, s) => (
  // if custom styles are passed remove default styles by returning a spread empty object
  n ? {
    top: "50%",
    left: "50%",
    height: "100%",
    textAlign: "center",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    ...s
  } : { ...H(n) }
), be = (n) => n ? { border: "1px solid black" } : {}, ye = (n, s) => n ? { width: "70rem", ...s } : { ...H(n) }, Mr = (n, s) => n ? {
  borderWidth: "0",
  padding: "1rem 0 1rem 0",
  ...s
} : { ...H(n) }, Lr = (n, s) => n ? {
  borderColor: "black",
  borderStyle: "solid",
  padding: "10rem 0 0 0",
  borderWidth: "0 0 0 10px",
  ...s
} : { ...H(n) }, Nr = (n, s) => n ? {
  padding: `0 ${0.5}rem 0 ${0.5}rem`,
  backgroundColor: "light-grey",
  border: "1px solid black",
  ...s
} : { ...H(n) }, Ur = (n, s) => n ? { fontSize: `${0.9}em`, fontWeight: "normal", ...s } : { ...H(n) }, Wr = (n, s) => {
  const b = new Map(
    Array.from(n, (d) => [d[s], []])
  );
  return n.forEach((d) => {
    const y = d[s];
    if (y !== void 0) {
      const R = b.get(y);
      R && R.push(d);
    }
  }), Array.from(b.values());
}, Br = (n) => n.toUpperCase(), ge = ({
  data: n,
  hasInlineStyles: s = !0,
  headerPrimaryUpper: b = !0,
  thRowStyles: d = {},
  thTitleStyles: y = {},
  thSubTitleStyles: R = {},
  thPrimaryTitleStyles: T = {},
  customHeaderRowIdValue: f = "",
  customDynamicHeaderTitleIdValue: v = "",
  customDynamicSubHeaderTitleIdValue: x = ""
}) => {
  const h = Lr(s, d), g = Nr(
    s,
    y
  ), w = Ur(
    s,
    R
  ), j = Mr(
    s,
    T
  ), A = b ? n == null ? void 0 : n.primary_header_title : Br(n == null ? void 0 : n.primary_header_title);
  return /* @__PURE__ */ c.jsxs("thead", { children: [
    /* @__PURE__ */ c.jsxs("tr", { id: "react-matrix-blank-headers-primary-title-row", children: [
      /* @__PURE__ */ c.jsx("th", { headers: "blank", colSpan: 4 }),
      /* @__PURE__ */ c.jsx(
        "th",
        {
          style: j,
          id: "react-matrix-header-primary-title",
          children: A
        }
      ),
      /* @__PURE__ */ c.jsx("th", { headers: "blank", colSpan: 2 })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "tr",
      {
        style: h,
        id: `react-matrix-dynamic-headers-row-${f}`,
        children: [
          /* @__PURE__ */ c.jsx("th", { headers: "blank", colSpan: 2 }),
          n.matrix_details.slice(0, n.matrix_size).map((O, F) => /* @__PURE__ */ c.jsxs(
            "th",
            {
              scope: "col",
              style: g,
              id: `react-matrix-dynamic-column-header-title${v ? `-${v}` : ""}`,
              children: [
                O.header_title,
                /* @__PURE__ */ c.jsx(
                  "div",
                  {
                    style: w,
                    id: `react-matrix-dynamic-column-header-sub-title${x ? `-${x}` : ""}`,
                    children: O.header_sub_title
                  }
                )
              ]
            },
            `${O.id}-${F}`
          ))
        ]
      }
    )
  ] });
}, Ee = ({
  data: n,
  tdStyles: s = {},
  hasInlineStyles: b = !0,
  customTableDataDynamicIdValue: d = ""
}) => {
  const y = (f) => {
    alert(
      `${f == null ? void 0 : f.description}, ${f == null ? void 0 : f.score_value} 
${f == null ? void 0 : f.response}`
    );
  }, T = b ? {
    cursor: "pointer",
    textAlign: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: "1px",
    backgroundColor: n == null ? void 0 : n.colour,
    ...s
  } : { ...s || {} };
  return /* @__PURE__ */ c.jsx(c.Fragment, { children: /* @__PURE__ */ c.jsxs(
    "td",
    {
      style: T,
      onClick: () => y(n),
      id: `react-matrix-dynamic-table-data${d ? `-${d}` : ""}`,
      children: [
        `${n == null ? void 0 : n.description}`,
        /* @__PURE__ */ c.jsx("br", {}),
        `(${n == null ? void 0 : n.score_value})`
      ]
    }
  ) });
}, Ir = ({
  data: n,
  rowPrimaryUpper: s = !0,
  hasInlineStyles: b = !0,
  reverseMatrixValues: d = !0,
  trRowStyles: y = {},
  trTitleStyles: R = {},
  trSubTitleStyles: T = {},
  trPrimaryTitleStyles: f = {},
  tdStyles: v = {},
  customRowDynamicIdValue: x = "",
  customRowHeaderDynamicIdValue: h = "",
  customTableDataDynamicIdValue: g = ""
}) => {
  const w = d ? Wr(n.matrix_values, "likelihood_descriptor").reverse().slice(0, n.matrix_size) : Wr(n.matrix_values, "likelihood_descriptor").slice(
    0,
    n.matrix_size
  ), j = Lr(b, y), A = Nr(
    b,
    R
  ), O = Ur(
    b,
    T
  ), F = Mr(
    b,
    f
  ), C = s ? Br(n.primary_row_header_title) : n.primary_row_header_title;
  return /* @__PURE__ */ c.jsxs("tbody", { children: [
    /* @__PURE__ */ c.jsx("tr", { id: "react-matrix-row-primary-title", children: /* @__PURE__ */ c.jsx("th", { scope: "row", rowSpan: 6, style: F, children: C }) }),
    w.map((_, D) => {
      var M, L, N, U, W, B;
      const P = d ? n.matrix_size - (D + 1) : D;
      return /* @__PURE__ */ c.jsxs(
        "tr",
        {
          style: j,
          id: `react-matrix-dynamic-rows-${(M = n.matrix_details[P]) == null ? void 0 : M.row_header_title}-${(L = n.matrix_details[P]) == null ? void 0 : L.row_header_sub_title}${x ? `-${x}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "th",
              {
                scope: "row",
                style: A,
                id: `react-matrix-dynamic-rows-${(N = n.matrix_details[P]) == null ? void 0 : N.row_header_title}-${(U = n.matrix_details[P]) == null ? void 0 : U.row_header_sub_title}${h ? `-${h}` : ""}`,
                children: [
                  (W = n.matrix_details[P]) == null ? void 0 : W.row_header_title,
                  /* @__PURE__ */ c.jsx("div", { style: O, children: (B = n.matrix_details[P]) == null ? void 0 : B.row_header_sub_title })
                ]
              }
            ),
            _.slice(0, n.matrix_size).map((I, z) => /* @__PURE__ */ c.jsx(
              Ee,
              {
                data: I,
                tdStyles: v,
                hasInlineStyles: b,
                customTableDataDynamicIdValue: g
              },
              `${I.id}-${z}`
            ))
          ]
        },
        `row-${D}`
      );
    })
  ] });
};
Ir.defaultProps = {};
const xe = ({
  data: n,
  tableStyles: s,
  hasTableBorder: b,
  hasInlineStyles: d,
  hasContainerStyles: y,
  tableContainerStyles: R,
  tableStyles: T = {},
  hasInlineStyles: f = !0,
  // MatrixHeaders
  headerPrimaryUpper: v = !0,
  thRowStyles: x = {},
  thTitleStyles: h = {},
  thSubTitleStyles: g = {},
  thPrimaryTitleStyles: w = {},
  customHeaderRowIdValue: j = "",
  customDynamicHeaderTitleIdValue: A = "",
  customDynamicSubHeaderTitleIdValue: O = "",
  // MatrixRows
  rowPrimaryUpper: F = !0,
  reverseMatrixValues: C = !0,
  trRowStyles: _ = {},
  trTitleStyles: D = {},
  trSubTitleStyles: P = {},
  trPrimaryTitleStyles: M = {},
  tdStyles: L = {},
  customRowDynamicIdValue: N = "",
  customRowHeaderDynamicIdValue: U = "",
  customTableDataDynamicIdValue: W = ""
}) => {
  const B = be(
    !!(d && b)
  ), I = ye(
    !!(d && s),
    T
  ), z = _e(
    !!(d && y),
    R ?? {}
  );
  return /* @__PURE__ */ c.jsxs("div", { style: z, children: [
    /* @__PURE__ */ c.jsx("h1", { children: n.matrix_name }),
    /* @__PURE__ */ c.jsx("h4", { children: n.matrix_description }),
    /* @__PURE__ */ c.jsxs("table", { id: "matrix-table", style: { ...I, ...B }, children: [
      /* @__PURE__ */ c.jsx(
        ge,
        {
          data: n,
          hasInlineStyles: f,
          headerPrimaryUpper: v,
          thRowStyles: x,
          thTitleStyles: h,
          thSubTitleStyles: g,
          thPrimaryTitleStyles: w,
          customHeaderRowIdValue: j,
          customDynamicHeaderTitleIdValue: A,
          customDynamicSubHeaderTitleIdValue: O
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ir,
        {
          data: n,
          rowPrimaryUpper: F,
          hasInlineStyles: f,
          reverseMatrixValues: C,
          trRowStyles: _,
          trTitleStyles: D,
          trSubTitleStyles: P,
          trPrimaryTitleStyles: M,
          tdStyles: L,
          customRowDynamicIdValue: N,
          customRowHeaderDynamicIdValue: U,
          customTableDataDynamicIdValue: W
        }
      )
    ] })
  ] });
};
export {
  xe as default
};
