/*!
 * @rundik/vue-zoom-on-hover v1.0.0
 * (c) Ivan Alexandrov
 * Released under the GPL-3.0 License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));
var __vue_create_injector__ = _interopDefault(require('vue-runtime-helpers/dist/inject-style/browser.js'));

//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: ["imgNormal", "imgZoom", "scale", "disabled"],
  data: function data() {
    return {
      scaleFactor: 1,
      resizeCheckInterval: null
    };
  },
  methods: {
    pageOffset: function pageOffset(el) {
      // -> {x: number, y: number}
      // get the left and top offset of a dom block element
      var rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        y: rect.top + scrollTop,
        x: rect.left + scrollLeft
      };
    },
    zoom: function zoom() {
      if (this.disabled) return;
      this.$refs.zoom.style.opacity = 1;
      this.$refs.normal.style.opacity = 0;
    },
    unzoom: function unzoom() {
      if (this.disabled) return;
      this.$refs.zoom.style.opacity = 0;
      this.$refs.normal.style.opacity = 1;
    },
    move: function move(event) {
      if (this.disabled) return;
      var offset = this.pageOffset(this.$el);
      var zoom = this.$refs.zoom;
      var normal = this.$refs.normal;
      var relativeX = event.clientX - offset.x + window.pageXOffset;
      var relativeY = event.clientY - offset.y + window.pageYOffset;
      var normalFactorX = relativeX / normal.offsetWidth;
      var normalFactorY = relativeY / normal.offsetHeight;
      var x = normalFactorX * (zoom.offsetWidth * this.scaleFactor - normal.offsetWidth);
      var y = normalFactorY * (zoom.offsetHeight * this.scaleFactor - normal.offsetHeight);
      zoom.style.left = -x + "px";
      zoom.style.top = -y + "px";
    },
    initEventLoaded: function initEventLoaded() {
      // emit the "loaded" event if all images have been loaded
      var promises = [this.$refs.zoom, this.$refs.normal].map(function (image) {
        return new Promise(function (resolve, reject) {
          image.addEventListener("load", resolve);
          image.addEventListener("error", reject);
        });
      });
      var component = this;
      Promise.all(promises).then(function () {
        component.$emit("loaded");
      });
    },
    initEventResized: function initEventResized() {
      var normal = this.$refs.normal;
      var previousWidth = normal.offsetWidth;
      var previousHeight = normal.offsetHeight;
      var component = this;
      this.resizeCheckInterval = setInterval(function () {
        if (previousWidth != normal.offsetWidth || previousHeight != normal.offsetHeight) {
          previousWidth = normal.offsetWidth;
          previousHeight = normal.offsetHeight;
          component.$emit("resized", {
            width: normal.width,
            height: normal.height,
            fullWidth: normal.naturalWidth,
            fullHeight: normal.naturalHeight
          });
        }
      }, 1000);
    }
  },
  mounted: function mounted() {
    if (this.$props.scale) {
      this.scaleFactor = parseInt(this.$props.scale);
      this.$refs.zoom.style.transform = "scale(" + this.scaleFactor + ")";
    }

    this.initEventLoaded();
    this.initEventResized();
  },
  updated: function updated() {
    this.initEventLoaded();
  },
  beforeDestroy: function beforeDestroy() {
    this.resizeCheckInterval && clearInterval(this.resizeCheckInterval);
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "zoom-on-hover",
    on: {
      "mousemove": _vm.move,
      "mouseenter": _vm.zoom,
      "mouseleave": _vm.unzoom
    }
  }, [_c('img', {
    ref: "normal",
    staticClass: "normal",
    attrs: {
      "src": _vm.imgNormal
    }
  }), _vm._v(" "), _c('img', {
    ref: "zoom",
    staticClass: "zoom",
    attrs: {
      "src": _vm.imgZoom || _vm.imgNormal
    }
  })]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-3a3e8c0f_0", {
    source: ".zoom-on-hover[data-v-3a3e8c0f]{position:relative;overflow:hidden}.zoom-on-hover .normal[data-v-3a3e8c0f]{width:100%}.zoom-on-hover .zoom[data-v-3a3e8c0f]{position:absolute;opacity:0;transform-origin:top left}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-3a3e8c0f";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

var ZoomOnHover = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

var index = {
  install: function install(Vue, options) {
    Vue.component("zoom-on-hover", ZoomOnHover);
  }
};

module.exports = index;
