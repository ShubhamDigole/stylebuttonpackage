/*!
 * styled-buttons-testing v2.2.6
 * (c) shubham digole
 * Released under the ISC License.
 */
'use strict';

var script = {
  name: 'Search',
  props: {
    interval: {
      type: Number,
      "default": 5
    },
    inputclass: {
      type: String,
      "default": 'btn'
    },
    timeObject: {
      type: Object,
      "default": function _default() {
        return {
          hours: 0,
          minutes: 13
        };
      }
    }
  },
  data: function data() {
    return {
      value: this.interval,
      mins: [0],
      displayMinutes: false
    };
  },
  methods: {
    openDialog: function openDialog() {
      this.displayMinutes = true;
    },
    hoursChanged: function hoursChanged(value) {
      this.$emit('hours', value);
    },
    minutesChanged: function minutesChanged(value) {
      this.displayMinutes = false;
      this.$emit('minutes', value);
    } // hideDialog(){
    //    if (this.displayMinutes) {
    //        this.displayMinutes = false;
    //    }
    // }

  },
  computed: {
    setMinutes: function setMinutes() {
      if (this.value !== 5 && this.value !== 1 && this.value !== 10 && this.value !== 15) {
        this.value = 1;
      }

      if (this.timeObject.hours > 11) {
        this.timeObject.hours = 0;
      }

      if (this.timeObject.minutes % this.value !== 0) {
        this.timeObject.minutes = 0;
      }

      for (var i = 1; i <= 59; i++) {
        if (i % this.value == 0) {
          this.mins.push(i);
        }
      }
    }
  },
  mounted: function mounted() {
    this.setMinutes; // document.addEventListener('click', this.hideDialog);
  },
  beforeDestroy: function beforeDestroy() {// document.removeEventListener('click', this.hideDialog);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('link', {
    attrs: {
      "rel": "stylesheet",
      "href": "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
      "integrity": "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh",
      "crossorigin": "anonymous"
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "form-control",
      "disabled": ""
    },
    domProps: {
      "value": _vm.timeObject.hours + ' : ' + _vm.timeObject.minutes
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn btn-danger",
    on: {
      "click": _vm.openDialog
    }
  }, [_vm._v(" Set Time")]), _vm._v(" "), _c('br'), _vm._v(" "), _vm.displayMinutes ? _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.timeObject.hours,
      expression: "timeObject.hours"
    }],
    "class": _vm.inputclass,
    on: {
      "change": [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });

        _vm.$set(_vm.timeObject, "hours", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }, function ($event) {
        return _vm.hoursChanged($event.target.value);
      }]
    }
  }, _vm._l(12, function (n) {
    return _c('option', {
      key: n,
      domProps: {
        "value": n - 1
      }
    }, [n - 1 <= 9 ? _c('span', [_vm._v(" 0" + _vm._s(n - 1) + " ")]) : _vm._e(), n - 1 > 9 ? _c('span', [_vm._v(" " + _vm._s(n - 1) + " ")]) : _vm._e()]);
  }), 0) : _vm._e(), _vm._v(" "), _vm.displayMinutes ? _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.timeObject.minutes,
      expression: "timeObject.minutes"
    }],
    "class": _vm.inputclass,
    on: {
      "change": [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });

        _vm.$set(_vm.timeObject, "minutes", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }, function ($event) {
        return _vm.minutesChanged($event.target.value);
      }]
    }
  }, _vm._l(this.mins, function (n) {
    return _c('option', {
      key: n,
      domProps: {
        "value": n
      }
    }, [n < 10 ? _c('span', [_vm._v(" 0" + _vm._s(n) + " ")]) : _vm._e(), n > 9 ? _c('span', [_vm._v(" " + _vm._s(n) + " ")]) : _vm._e()]);
  }), 0) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-70dd1814_0", {
    source: ".btn[data-v-70dd1814]{border:1px solid gray}#colon[data-v-70dd1814]{margin-top:10px;margin-left:10px;font-size:40px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-70dd1814";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var index = {
  install: function install(Vue, options) {
    Vue.component("styled-testing-button", __vue_component__);
  }
};

module.exports = index;
