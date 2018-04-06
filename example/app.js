(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../src/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {

  /**
   * @return {self}
   */

  /**
   * @type {NodeList}
   */
  function App() {
    _classCallCheck(this, App);

    this.examples = document.querySelectorAll('.example');
    this.slideshows = [];

    this.createSliderInstances();
  }

  /**
   *
   */


  /**
   * @type {MagicRoundabout[]}
   */


  _createClass(App, [{
    key: 'createSliderInstances',
    value: function createSliderInstances() {
      var _this = this;

      this.examples.forEach(function (example) {
        var slideshow = example.querySelector('.slideshow');
        var opts = JSON.parse(example.dataset.opts);

        _this.slideshows.push(new _index2.default(slideshow, opts));
      });
    }
  }]);

  return App;
}();

window.app = new App();

},{"../../src/index.js":3}],2:[function(require,module,exports){
(function(global,factory){if(typeof define === 'function' && define.amd){define(['exports'],factory);}else if(typeof exports !== 'undefined'){factory(exports);}else {var mod={exports:{}};factory(mod.exports);global.decko = mod.exports;}})(this,function(exports){'use strict';exports.__esModule = true;var EMPTY={};var HOP=Object.prototype.hasOwnProperty;var fns={memoize:function memoize(fn){var opt=arguments.length <= 1 || arguments[1] === undefined?EMPTY:arguments[1];var cache=opt.cache || {};return function(){for(var _len=arguments.length,a=Array(_len),_key=0;_key < _len;_key++) {a[_key] = arguments[_key];}var k=String(a[0]);if(opt.caseSensitive === false)k = k.toLowerCase();return HOP.call(cache,k)?cache[k]:cache[k] = fn.apply(this,a);};},debounce:function debounce(fn,opts){if(typeof opts === 'function'){var p=fn;fn = opts;opts = p;}var delay=opts && opts.delay || opts || 0,args=undefined,context=undefined,timer=undefined;return function(){for(var _len2=arguments.length,a=Array(_len2),_key2=0;_key2 < _len2;_key2++) {a[_key2] = arguments[_key2];}args = a;context = this;if(!timer)timer = setTimeout(function(){fn.apply(context,args);args = context = timer = null;},delay);};},bind:function bind(target,key,_ref){var fn=_ref.value;return {configurable:true,get:function get(){var value=fn.bind(this);Object.defineProperty(this,key,{value:value,configurable:true,writable:true});return value;}};}};var memoize=multiMethod(fns.memoize),debounce=multiMethod(fns.debounce),bind=multiMethod(function(f,c){return f.bind(c);},function(){return fns.bind;});exports.memoize = memoize;exports.debounce = debounce;exports.bind = bind;exports['default'] = {memoize:memoize,debounce:debounce,bind:bind};function multiMethod(inner,deco){deco = deco || inner.decorate || decorator(inner);var d=deco();return function(){for(var _len3=arguments.length,args=Array(_len3),_key3=0;_key3 < _len3;_key3++) {args[_key3] = arguments[_key3];}var l=args.length;return (l < 2?deco:l > 2?d:inner).apply(undefined,args);};}function decorator(fn){return function(opt){return typeof opt === 'function'?fn(opt):function(target,key,desc){desc.value = fn(desc.value,opt,target,key,desc);};};}});


},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _decko = require('decko');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * A tiny JavaScript carousel
 */
var MagicRoundabout = (_class = function () {

  /**
   * Create the slideshow instance
   *
   * @param {HTMLElement|string} target
   * @param {object} opts
   */


  /**
   * The width of the slideshow container
   *
   * @type {int}
   */

  /**
   * Options for the instance
   *
   * @type {object}
   */
  function MagicRoundabout(target, opts) {
    var _this = this;

    _classCallCheck(this, MagicRoundabout);

    this.opts = {
      auto: false,
      buttons: true,
      center: false,
      click: true,
      delay: 10000,
      duplicateSlidesWhenLooping: false,
      duplicateSlidesCount: 2,
      keys: true,
      limit: false,
      loop: true,
      onChange: function onChange() {},
      touch: true,
      scroll: true,
      slidesPerView: 1,
      vertical: false

      /**
       * The real index of the current slide
       *
       * @type {int}
       */
    };
    this._current = 0;
    this.width = null;
    this.touch = null;

    if (typeof target === 'string') {
      target = document.querySelector(target);
    }

    this.opts = _extends({}, this.opts, opts);

    this.container = target;
    this.wrapper = this.container.querySelector('.slideshow__slides');
    this.slides = Array.from(this.container.querySelectorAll('.slideshow__slide'));

    if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
      this.duplicatesAppend = this.slides.slice(0, this.opts.duplicateSlidesCount).map(function (slide) {
        return slide.cloneNode(true);
      });
      this.duplicatesAppend.forEach(function (duplicate) {
        duplicate.classList.add('slideshow__slide--duplicate');
        _this.wrapper.appendChild(duplicate);
      });

      this.duplicatesPrepend = this.slides.slice(0 - this.opts.duplicateSlidesCount).map(function (slide) {
        return slide.cloneNode(true);
      });
      this.duplicatesPrepend.reverse().forEach(function (duplicate) {
        duplicate.classList.add('slideshow__slide--duplicate');
        _this.wrapper.insertBefore(duplicate, _this.wrapper.childNodes[0]);
      });
    }

    if (this.opts.buttons) {
      this.buttons = {};
      this.buttons.next = this.container.querySelector('.slideshow__button--next');
      this.buttons.prev = this.container.querySelector('.slideshow__button--prev');
    }

    this.setContainerSize();
    this.registerListeners();

    this.current = 1;
  }

  /**
   * Get the current slide index
   *
   * @return {int}
   */


  /**
   * An object used for storing touch coordinates
   *
   * @type {object}
   */


  _createClass(MagicRoundabout, [{
    key: 'applyClasses',


    /**
     * Apply classes to the active (or its equivalent duplicate) slide,
     * and the surrounding next and previous slides
     *
     * @param {Array} elements
     * @param {int} i
     */
    value: function applyClasses() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var i = arguments[1];

      if (elements.length === 0) {
        return;
      }

      var k = this.opts.slidesPerView;
      var selected = [];

      if (i >= 0) {
        elements.slice(i, i + k).forEach(function (slide) {
          slide.classList.remove('slideshow__slide--next');
          slide.classList.remove('slideshow__slide--prev');
          slide.classList.add('slideshow__slide--active');
          selected.push(slide);
        });
      }

      if (i >= k) {
        elements.slice(i - k, i).forEach(function (slide) {
          slide.classList.remove('slideshow__slide--next');
          slide.classList.remove('slideshow__slide--active');
          slide.classList.add('slideshow__slide--prev');
          selected.push(slide);
        });
      }

      if (i + k >= 0) {
        elements.slice(i + k, i + k + k).forEach(function (slide) {
          slide.classList.remove('slideshow__slide--active');
          slide.classList.remove('slideshow__slide--prev');
          slide.classList.add('slideshow__slide--next');
          selected.push(slide);
        });
      }

      this.clearState(elements.filter(function (slide) {
        return selected.indexOf(slide) === -1;
      }));
    }

    /**
     * Trigger a delayed instant transition, to allow us to silently flick from
     * a duplicated slide to its corresponding slide in the main list
     *
     * @param {int} i
     */

  }, {
    key: 'changeInstantly',
    value: function changeInstantly(i) {
      var _this2 = this;

      var delay = getComputedStyle(this.wrapper).transitionDelay;
      var delayFloat = parseFloat(delay, 10) * 1000;
      var duration = getComputedStyle(this.wrapper).transitionDuration;
      var durationFloat = parseFloat(duration, 10) * 1000;

      setTimeout(function () {
        _this2.wrapper.style.transitionDelay = '0s';
        _this2.wrapper.style.transitionDuration = '0s';

        _this2.current = i;

        setTimeout(function () {
          _this2.wrapper.style.transitionDelay = null;
          _this2.wrapper.style.transitionDuration = null;
        }, 50);
      }, delayFloat + durationFloat);
    }

    /**
     * Clear a slide state completely
     *
     * @param {NodeList|Array} slides
     *
     * @return {NodeList|Array}
     */

  }, {
    key: 'clearState',
    value: function clearState(slides) {
      slides.forEach(function (slide) {
        slide.classList.remove('slideshow__slide--active');
        slide.classList.remove('slideshow__slide--next');
        slide.classList.remove('slideshow__slide--prev');
      });
    }

    /**
     * Register listeners to handle user interactions
     */

  }, {
    key: 'registerListeners',
    value: function registerListeners() {
      var _this3 = this;

      // Set the container size
      window.addEventListener('resize', this.setContainerSize);

      // Handle scroll events
      if (this.opts.scroll) {
        this.container.addEventListener('wheel', this.handleScroll);
      }

      // Handle swipe events
      if (this.opts.touch) {
        this.container.addEventListener('touchstart', this.handleTouchStart);
        this.container.addEventListener('touchmove', this.handleTouchMove);
      }

      // Handle keyboard events
      if (this.opts.keys) {
        document.addEventListener('keyup', this.handleKeypress);
      }

      // Slide to clicked slide
      if (this.opts.click) {
        this.slides.forEach(function (slide) {
          slide.addEventListener('click', function (e) {
            _this3.current = Array.from(_this3.slides).indexOf(slide) + 1;
          });
        });
      }

      // Handle pagination buttons
      if (this.opts.buttons) {
        this.buttons.next.addEventListener('click', function (e) {
          _this3.current = _this3.current + _this3.opts.slidesPerView;
        });

        this.buttons.prev.addEventListener('click', function (e) {
          _this3.current = _this3.current - _this3.opts.slidesPerView;
        });
      }
    }

    /**
     * Update the container width when the window resizes
     */

  }, {
    key: 'setContainerSize',
    value: function setContainerSize() {
      this.width = this.container.clientWidth;
      this.transition();
    }

    /**
     * Handle scroll events on the container
     *
     * @param {WheelEvent} e
     */

  }, {
    key: 'handleScroll',
    value: function handleScroll(e) {
      if (this.opts.vertical && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        return this.handleDeltaChange(e, e.deltaY);
      }

      if (!this.opts.vertical && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return this.handleDeltaChange(e, e.deltaX);
      }
    }

    /**
     * Handle touchstart events on the container
     *
     * @param {TouchEvent} e
     */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      this.touch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }

    /**
     * Handle touchmove events on the container
     *
     * @param {TouchEvent} e
     */

  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      var deltaX = this.touch.x - x;
      var deltaY = this.touch.y - y;

      if (this.opts.vertical && Math.abs(deltaY) > Math.abs(deltaX)) {
        return this.handleDeltaChange(e, deltaY);
      }

      if (!this.opts.vertical && Math.abs(deltaX) > Math.abs(deltaY)) {
        return this.handleDeltaChange(e, deltaX);
      }
    }

    /**
     * Handle a swipe or scroll interaction
     *
     * @param {WheelEvent|TouchEvent} e
     * @param {int} d
     */

  }, {
    key: 'handleDeltaChange',
    value: function handleDeltaChange(e, d) {
      var _this4 = this;

      if (this.transitioning) {
        e.stopPropagation();
        e.preventDefault();
        e.cancelBubble = true;
        return false;
      }

      var n = this.current;

      var atStart = d < -25 && n === 1;
      var atEnd = d > 25 && n === this.slides.length;

      if (atStart || atEnd) {
        return;
      }

      this.transitioning = true;

      e.stopPropagation();
      e.preventDefault();
      e.cancelBubble = true;

      if (d > 0) {
        this.current = n + this.opts.slidesPerView;
      }

      if (d < 0) {
        this.current = n - this.opts.slidesPerView;
      }

      this.touch = null;

      setTimeout(function () {
        _this4.transitioning = false;
      }, 2000);

      return false;
    }

    /**
     * Handle keypresses on arrows whilst the slideshow is within the viewport
     *
     * @param {KeyboardEvent} e
     */

  }, {
    key: 'handleKeypress',
    value: function handleKeypress(e) {
      if (!this.isInViewport()) {
        return;
      }

      var keys = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
      };

      var key = e.keyCode || e.which;

      if (this.opts.vertical) {
        if (key === keys.up) {
          this.current = this.current - this.opts.slidesPerView;
        }

        if (key === keys.down) {
          this.current = this.current + this.opts.slidesPerView;
        }

        return;
      }

      if (key === keys.left) {
        this.current = this.current - this.opts.slidesPerView;
      }

      if (key === keys.right) {
        this.current = this.current + this.opts.slidesPerView;
      }
    }

    /**
     * Transition to the current slide
     */

  }, {
    key: 'transition',
    value: function transition() {
      var axis = this.opts.vertical ? 'translateY' : 'translateX';
      var size = this.opts.vertical ? this.getOuterHeight : this.getOuterWidth;
      var innerSize = this.opts.vertical ? this.getInnerHeight : this.getInnerWidth;

      var offset = 0;

      if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
        this.duplicatesPrepend.slice(0, this.duplicatesPrepend.length + Math.min(this._current, 0)).forEach(function (duplicate) {
          offset += size(duplicate);
        });
      }

      for (var i = 0; i < this._current; i++) {
        offset += size(this.slides[i]);
      }

      if (this.opts.center && !this.opts.limit) {
        offset = offset + size(this.container) / 2 - innerSize(this.slides[this._current]) / 2;
      }

      if (this.opts.limit && !this.opts.loop) {
        var total = 0;
        for (var k = 0; k < this.slides.length; k++) {
          total += size(this.slides[k]);
        }

        offset = Math.min(offset, total - this.container.clientWidth);

        if (offset >= total - this.container.clientWidth) {
          if (this.opts.buttons) {
            this.buttons.next.classList.add('slideshow__button--disabled');
          } else {
            this.buttons.next.classList.remove('slideshow__button--disabled');
          }
        }
      }

      this.wrapper.style.transform = axis + '(' + offset * -1 + 'px)';
    }

    /**
     * Get the width of an element including padding, border and margin
     *
     * @param {HTMLElement} el
     *
     * @return {float}
     */

  }, {
    key: 'getOuterWidth',
    value: function getOuterWidth(el) {
      var style = window.getComputedStyle(el);

      return this.getInnerWidth(el) + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    /**
     * Get the height of an element including padding, border and margin
     *
     * @param {HTMLElement} el
     *
     * @return {float}
     */

  }, {
    key: 'getOuterHeight',
    value: function getOuterHeight(el) {
      var style = window.getComputedStyle(el);

      return this.getInnerHeight(el) + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    /**
     * Get the width of an element including padding, border and margin
     *
     * @param {HTMLElement} el
     *
     * @return {float}
     */

  }, {
    key: 'getInnerWidth',
    value: function getInnerWidth(el) {
      return parseFloat(el.getBoundingClientRect().width);
    }

    /**
     * Get the height of an element including padding, border and margin
     *
     * @param {HTMLElement} el
     *
     * @return {float}
     */

  }, {
    key: 'getInnerHeight',
    value: function getInnerHeight(el) {
      return parseFloat(el.getBoundingClientRect().height);
    }

    /**
     * Check if the slider is currently within the viewport
     *
     * @return {bool}
     */

  }, {
    key: 'isInViewport',
    value: function isInViewport() {
      var _container$getBoundin = this.container.getBoundingClientRect(),
          top = _container$getBoundin.top,
          left = _container$getBoundin.left,
          bottom = _container$getBoundin.bottom,
          right = _container$getBoundin.right;

      return top <= window.innerHeight && bottom >= 0 && left <= window.innerWidth && right >= 0;
    }
  }, {
    key: 'current',
    get: function get() {
      return this._current + 1;
    }

    /**
     * Set the current slide index
     *
     * @param {int} i
     */
    ,
    set: function set(i) {
      var _this5 = this;

      var fn = void 0;
      clearTimeout(this.auto);
      i = parseInt(i);
      i = i - (i - 1) % this.opts.slidesPerView;

      if (i < 1) {
        if (this.opts.loop) {
          if (!this.opts.duplicateSlidesWhenLooping) {
            i = this.slides.length - this.opts.slidesPerView + 1;
          } else {
            this.changeInstantly(this.slides.length);
          }
        } else {
          i = 1;
        }
      }

      if (i > this.slides.length - i % this.opts.slidesPerView) {
        if (this.opts.loop) {
          if (!this.opts.duplicateSlidesWhenLooping) {
            i = 1;
          } else {
            this.changeInstantly(1);
          }
        } else {
          i = this.slides.length - i % this.opts.slidesPerView;
        }
      }

      if (this.opts.buttons && !this.opts.loop) {
        fn = i === 1 ? 'add' : 'remove';
        this.buttons.prev.classList[fn]('slideshow__button--disabled');

        fn = i === this.slides.length ? 'add' : 'remove';
        this.buttons.next.classList[fn]('slideshow__button--disabled');
      }

      this._current = i - 1;
      this.transition();

      this.opts.onChange(this);

      this.applyClasses(this.slides, this._current);

      if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
        this.applyClasses(this.duplicatesAppend, this._current - this.slides.length);
        this.applyClasses(this.duplicatesPrepend, this._current + this.slides.length - this.duplicatesPrepend.length - 1);
      }

      if (this.opts.auto) {
        this.auto = setTimeout(function () {
          _this5.current = _this5.current + _this5.opts.slidesPerView;
        }, this.opts.delay);
      }
    }
  }]);

  return MagicRoundabout;
}(), (_applyDecoratedDescriptor(_class.prototype, 'setContainerSize', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'setContainerSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleScroll', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleScroll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchStart', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchMove', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleDeltaChange', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleDeltaChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleKeypress', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleKeypress'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getOuterWidth', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'getOuterWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getOuterHeight', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'getOuterHeight'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getInnerWidth', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'getInnerWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getInnerHeight', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'getInnerHeight'), _class.prototype)), _class);
exports.default = MagicRoundabout;

},{"decko":2}]},{},[1]);
