/*!
 * styled-buttons-testing v2.2.7
 * (c) shubham digole
 * Released under the ISC License.
 */
'use strict';

var script = {
  name: 'TimePicker',
  props: {
    interval: {
      type: Number,
      "default": 1
    },
    inputClass: {
      type: String,
      "default": 'btn'
    },
    time: {
      type: Object,
      "default": function _default() {
        return {
          hours: 0,
          minutes: 0
        };
      }
    }
  },
  directives: {
    'click-outside': {
      bind: function bind(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          var compName = vNode.context.name;
          var warn = "[Vue-click-outside:] provided expression '".concat(binding.expression, "' is not a function, but has to be");

          if (compName) {
            warn += "Found in component '".concat(compName, "'");
          }

          console.warn(warn);
        } // Define Handler and cache it on the element


        var bubble = binding.modifiers.bubble;

        var handler = function handler(e) {
          if (bubble || !el.contains(e.target) && el !== e.target) {
            binding.value(e);
          }
        };

        el.__vueClickOutside__ = handler; // add Event Listeners

        document.addEventListener('click', handler);
      },
      unbind: function unbind(el) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
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
      this.$emit('selectHours', value);
    },
    minutesChanged: function minutesChanged(value) {
      this.displayMinutes = false;
      this.$emit('selectMinutes', value);
    },
    hideDialog: function hideDialog() {
      this.displayMinutes = false;
    },
    setMinutes: function setMinutes() {
      if (this.value !== 5 && this.value !== 1 && this.value !== 10 && this.value !== 15) {
        this.value = 1;
      }

      if (this.time.hours > 11) {
        this.time.hours = 0;
      }

      if (this.time.minutes % this.value !== 0) {
        this.time.minutes = 0;
      }

      for (var i = 1; i <= 59; i++) {
        if (i % this.value == 0) {
          this.mins.push(i);
        }
      }
    }
  },
  watch: {
    time: {
      handler: function handler() {
        this.$emit('selectTime', this.time);
      },
      deep: true
    }
  },
  computed: {
    formatHours: function formatHours() {
      if (this.time.hours < 10) {
        return "0" + this.time.hours;
      }

      return this.time.hours;
    },
    formatMinutes: function formatMinutes() {
      if (this.time.minutes < 10) {
        return "0" + this.time.minutes;
      }

      return this.time.minutes;
    }
  },
  mounted: function mounted() {
    this.setMinutes();
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

  return _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.hideDialog,
      expression: "hideDialog"
    }]
  }, [_c('link', {
    attrs: {
      "rel": "stylesheet",
      "href": "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
      "integrity": "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh",
      "crossorigin": "anonymous"
    }
  }), _vm._v(" "), _c('div', [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "input",
      "readonly": ""
    },
    domProps: {
      "value": _vm.formatHours + ' : ' + _vm.formatMinutes
    },
    on: {
      "click": _vm.openDialog
    }
  })]), _vm._v(" "), _vm.displayMinutes ? _c('div', [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.time.hours,
      expression: "time.hours"
    }],
    staticClass: "form-control btn-group",
    on: {
      "change": [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });

        _vm.$set(_vm.time, "hours", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
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
  }), 0), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.time.minutes,
      expression: "time.minutes"
    }],
    staticClass: "form-control btn-group",
    on: {
      "change": [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });

        _vm.$set(_vm.time, "minutes", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
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
  }), 0)]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-049db58b_0", {
    source: ".btn[data-v-049db58b]{border:1px solid gray}#colon[data-v-049db58b]{margin-top:10px;margin-left:10px;font-size:40px}input[data-v-049db58b]{padding-left:15px;width:88px}select[data-v-049db58b]{width:43px;padding:1px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-049db58b";
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
  install: function install(Vue) {
    Vue.component("TimePicker", __vue_component__);
  }
};

module.exports = index;
