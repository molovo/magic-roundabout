(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

var _lethargy = require('./lethargy');

var _lethargy2 = _interopRequireDefault(_lethargy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var lethargy = new _lethargy2.default();

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
   * @type {Number}
   */

  /**
   * Options for the instance
   *
   * @type {object}
   */
  function MagicRoundabout(target, opts) {
    _classCallCheck(this, MagicRoundabout);

    this.opts = {
      auto: false,
      buttons: true,
      center: false,
      click: true,
      delay: 10000,
      draggable: false,
      duplicateSlidesWhenLooping: false,
      duplicateSlidesCount: 1,
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
       * @type {Number}
       */
    };
    this._current = 0;
    this.width = null;
    this.touch = null;

    if (typeof target === 'string') {
      this.container = document.querySelector(target);

      if (!this.container) {
        throw new TypeError('selector matched no elements');
      }
    } else if (target instanceof HTMLElement) {
      this.container = target;
    } else {
      throw new TypeError('target must be an instance of "HTMLElement" or a valid selector');
    }

    this.opts = _extends({}, this.opts, opts);

    this.wrapper = this.container.querySelector('.slideshow__slides');

    // Some HTML caching systems may leave duplicated slides in place when the
    // page loads. We clear them here to prevent duplicating the duplicates
    this.wrapper.querySelectorAll('.slideshow__slide--duplicate').forEach(function (slide) {
      slide.parentNode.removeChild(slide);
    });

    this.slides = Array.from(this.container.querySelectorAll('.slideshow__slide'));
    var i = 1;
    this.slides.forEach(function (slide) {
      slide.dataset.index = i++;
    });

    if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
      this.duplicatesAppend = this.slides.slice(0, this.opts.duplicateSlidesCount).map(function (slide) {
        return slide.cloneNode(true);
      });
      for (var _i = 0; _i < this.duplicatesAppend.length; _i++) {
        var duplicate = this.duplicatesAppend[_i];
        duplicate.classList.add('slideshow__slide--duplicate');
        duplicate.dataset.index = parseInt(duplicate.dataset.index) + this.slides.length;
        this.wrapper.appendChild(duplicate);
      }

      this.duplicatesPrepend = this.slides.slice(0 - this.opts.duplicateSlidesCount).map(function (slide) {
        return slide.cloneNode(true);
      });
      for (var j = this.duplicatesPrepend.length - 1; j >= 0; j--) {
        var _duplicate = this.duplicatesPrepend[j];
        _duplicate.classList.add('slideshow__slide--duplicate');
        _duplicate.dataset.index = parseInt(_duplicate.dataset.index) - this.slides.length;
        this.wrapper.insertBefore(_duplicate, this.wrapper.childNodes[0]);
      }
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
   * @return {Number}
   */


  /**
   * An object used for storing touch coordinates
   *
   * @type {object}
   */


  _createClass(MagicRoundabout, [{
    key: 'applyClasses',
    value: function applyClasses() {
      var _this = this;

      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var i = arguments[1];

      if (elements.length === 0) {
        return;
      }

      requestAnimationFrame(function (t) {
        var k = _this.opts.slidesPerView;
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

        _this.clearState(elements.filter(function (slide) {
          return selected.indexOf(slide) === -1;
        }));
      });
    }

    /**
     * Trigger a delayed instant transition, to allow us to silently flick from
     * a duplicated slide to its corresponding slide in the main list
     *
     * @param {Number} i
     */

  }, {
    key: 'changeInstantly',
    value: function changeInstantly(i) {
      var _this2 = this;

      // Prevent interaction to avoid the user navigating to a slide that does
      // not exist
      this.transitioning = true;

      var delay = getComputedStyle(this.wrapper).transitionDelay;
      var delayFloat = parseFloat(delay) * 1000;
      var duration = getComputedStyle(this.wrapper).transitionDuration;
      var durationFloat = parseFloat(duration) * 1000;

      setTimeout(function () {
        _this2.wrapper.style.transitionDelay = '0s';
        _this2.wrapper.style.transitionDuration = '0s';

        _this2.current = i;
        _this2.transitioning = false;

        setTimeout(function () {
          _this2.wrapper.style.transitionDelay = '';
          _this2.wrapper.style.transitionDuration = '';
        }, 50);
      }, delayFloat + durationFloat);
    }

    /**
     * Clear a slide state completely
     *
     * @param {NodeList|Array} slides
     */

  }, {
    key: 'clearState',
    value: function clearState(slides) {
      requestAnimationFrame(function (t) {
        slides.forEach(function (slide) {
          slide.classList.remove('slideshow__slide--active');
          slide.classList.remove('slideshow__slide--next');
          slide.classList.remove('slideshow__slide--prev');
        });
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

      // Handle swipe/drag events
      if (this.opts.touch || this.opts.draggable) {
        this.container.addEventListener('touchstart', this.handleTouchStart);
        this.container.addEventListener('touchmove', this.handleTouchMove);
        this.container.addEventListener('mousedown', this.handleMouseDown);
        this.container.addEventListener('mousemove', this.handleMouseMove);
        this.container.addEventListener('mouseup', this.handleMouseUp);
        this.container.addEventListener('mouseleave', this.handleMouseUp);
      }

      // Handle keyboard events
      if (this.opts.keys) {
        document.addEventListener('keyup', this.handleKeypress);
      }

      // Slide to clicked slide
      if (this.opts.click) {
        var fn = function fn(slide) {
          slide.addEventListener('click', function (e) {
            if (!_this3.dragging) {
              _this3.current = slide.dataset.index;
            }
          });
        };
        this.slides.forEach(fn);

        if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
          this.duplicatesAppend.forEach(fn);
          this.duplicatesPrepend.forEach(fn);
        }
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
        return this.handleDeltaChange(e, e.deltaY, true);
      }

      if (!this.opts.vertical && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return this.handleDeltaChange(e, e.deltaX, true);
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
     * Convert mousedown events to touchstart events
     *
     * @param {MouseEvent} e
     */

  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      e.touches = [{ clientX: e.clientX, clientY: e.clientY }];
      return this.handleTouchStart(e);
    }

    /**
     * Handle touchend events on the container
     *
     * @param {TouchEvent} e
     */

  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      var _this4 = this;

      clearTimeout(this.touchEndHandler);

      // If a touch hasn't been recorded, we can't calculate the distance,
      // so we ignore the movement
      if (!this.touch) {
        return;
      }

      // If there are multiple touches, ignore them so that we don't
      // interfere with pinch-to-zoom
      if (e.touches.length > 1) {
        return;
      }

      if (!this.opts.draggable) {
        this.touchEndHandler = setTimeout(this.handleTouchEnd.bind(this, e), 50);
        return;
      }

      if (!this.transitioning) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        var deltaX = this.touch.x - x;
        var deltaY = this.touch.y - y;
        var distance = void 0;

        if (this.opts.vertical && Math.abs(deltaY) > Math.abs(deltaX)) {
          distance = deltaY;
        }

        if (!this.opts.vertical && Math.abs(deltaX) > Math.abs(deltaY)) {
          distance = deltaX;
        }

        if (Math.abs(distance) > 25) {
          this.dragging = true;
        }

        this.offsetTransition(distance);

        // If the user has dragged more than the current slides width, reset the
        // touch point and silently update the current slide
        var threshold = function () {
          var slide = _this4.currentSlide;
          if (distance < 0) {
            slide = _this4.previousSlide;
          }

          if (slide) {
            if (_this4.opts.vertical) {
              return _this4.getOuterHeight(slide);
            }

            return _this4.getOuterWidth(slide);
          }

          return 0;
        }();

        if (Math.abs(distance) > threshold) {
          if (distance > 0) {
            this._current = this._current + 1;
          }
          if (distance < 0) {
            this._current = this._current - 1;
          }

          this.touch.x = x;
          this.touch.y = y;
        }
      }
    }

    /**
     * Convert mousemove events to touchmove events
     *
     * @param {MouseEvent} e
     */

  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      e.touches = [{ clientX: e.clientX, clientY: e.clientY }];
      return this.handleTouchMove(e);
    }

    /**
     * Handle touchend events on the container
     *
     * @param {TouchEvent|MouseEvent} e
     */

  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      // If a touch hasn't been recorded, we can't calculate the distance,
      // so we ignore the movement
      if (!this.touch) {
        return;
      }

      // If there are multiple touches, ignore them so that we don't
      // interfere with pinch-to-zoom
      if (e.touches.length > 1) {
        return;
      }

      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      var deltaX = this.touch.x - x;
      var deltaY = this.touch.y - y;

      this.touch = null;

      // Reset transition timing
      this.wrapper.style.transitionDelay = null;
      this.wrapper.style.transitionDuration = null;

      if (this.opts.vertical && Math.abs(deltaY) > Math.abs(deltaX)) {
        return this.handleDeltaChange(e, deltaY, false);
      }

      if (!this.opts.vertical && Math.abs(deltaX) > Math.abs(deltaY)) {
        return this.handleDeltaChange(e, deltaX, false);
      }
    }

    /**
     * Convert mouseup events to touchend events
     *
     * @param {MouseEvent} e
     */

  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      e.touches = [{ clientX: e.clientX, clientY: e.clientY }];
      return this.handleTouchEnd(e);
    }

    /**
     * Handle a swipe or scroll interaction
     *
     * @param {WheelEvent|TouchEvent|MouseEvent} e
     * @param {Number} distance
     * @param {Boolean} preventInteraction
     */

  }, {
    key: 'handleDeltaChange',
    value: function handleDeltaChange(e, distance) {
      var _this5 = this;

      var preventInteraction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (lethargy.check(e, this.opts.vertical) === false || this.transitioning) {
        e.stopPropagation();
        e.preventDefault();
        e.cancelBubble = true;
        return false;
      }

      var n = this.current;

      this.transitioning = true;

      e.stopPropagation();
      e.preventDefault();
      e.cancelBubble = true;

      if (this.opts.draggable) {
        var threshold = function () {
          var slide = _this5.currentSlide;
          if (distance < 0) {
            slide = _this5.previousSlide;
          }

          if (slide) {
            if (_this5.opts.vertical) {
              return _this5.getInnerHeight(slide) / 2;
            }

            return _this5.getInnerWidth(slide) / 2;
          }

          return 0;
        }();

        if (Math.abs(distance) > threshold) {
          if (distance > 0) {
            this.current = n + this.opts.slidesPerView;
          }

          if (distance < 0) {
            this.current = n - this.opts.slidesPerView;
          }
        } else {
          this.current = this.current;
        }
      } else {
        if (distance > 0) {
          this.current = n + this.opts.slidesPerView;
        }

        if (distance < 0) {
          this.current = n - this.opts.slidesPerView;
        }
      }

      if (preventInteraction) {
        var delay = getComputedStyle(this.wrapper).transitionDelay;
        var delayFloat = parseFloat(delay) * 1000;
        var duration = getComputedStyle(this.wrapper).transitionDuration;
        var durationFloat = parseFloat(duration) * 1000;

        setTimeout(function (t) {
          _this5.transitioning = false;
        }, delayFloat + durationFloat);

        return false;
      }

      setTimeout(function () {
        _this5.dragging = false;
      }, 50);

      this.transitioning = false;

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
     * Get the correct transition offset for the current slide
     *
     * @return Number
     */

  }, {
    key: 'getTransitionOffset',
    value: function getTransitionOffset() {
      var size = this.opts.vertical ? this.getOuterHeight : this.getOuterWidth;
      var innerSize = this.opts.vertical ? this.getInnerHeight : this.getInnerWidth;

      var offset = 0;

      if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
        this.duplicatesPrepend.slice(0, this.duplicatesPrepend.length + Math.min(this._current, 0)).forEach(function (duplicate) {
          offset += size(duplicate);
        });
      }

      for (var i = 0; i < Math.min(this._current, this.slides.length); i++) {
        offset += size(this.slides[i]);
      }

      for (var j = 0; j < this._current - this.slides.length; j++) {
        offset += size(this.duplicatesPrepend[j]);
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

        if (this.opts.buttons) {
          if (offset >= total - this.container.clientWidth) {
            this.buttons.next.classList.add('slideshow__button--disabled');
          } else {
            this.buttons.next.classList.remove('slideshow__button--disabled');
          }
        }
      }

      return offset * -1;
    }

    /**
     * Transition to the current slide
     */

  }, {
    key: 'transition',
    value: function transition() {
      var axis = this.opts.vertical ? 'translateY' : 'translateX';

      this.wrapper.style.transform = axis + '(' + this.getTransitionOffset() + 'px)';
    }

    /**
     * Offset the current transition position by the current pixel amount
     *
     * @param {Number} distance
     */

  }, {
    key: 'offsetTransition',
    value: function offsetTransition(distance) {
      var axis = this.opts.vertical ? 'translateY' : 'translateX';
      this.wrapper.style.transitionDelay = '0s';
      this.wrapper.style.transitionDuration = '0s';

      this.wrapper.style.transform = axis + '(' + (this.getTransitionOffset() - distance) + 'px)';
    }

    /**
     * Get the width of an element including padding, border and margin
     *
     * @param {HTMLElement} el
     *
     * @return {Number}
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
     * @return {Number}
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
     * @return {Number}
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
     * @return {Number}
     */

  }, {
    key: 'getInnerHeight',
    value: function getInnerHeight(el) {
      return parseFloat(el.getBoundingClientRect().height);
    }

    /**
     * Check if the slider is currently within the viewport
     *
     * @return {Boolean}
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
     * @param {Number} i
     */
    ,
    set: function set(i) {
      var _this6 = this;

      var fn = void 0;
      clearTimeout(this.auto);
      i = parseInt(i);
      i = i - (i - 1) % this.opts.slidesPerView;

      if (i < 1) {
        if (this.opts.loop) {
          if (!this.opts.duplicateSlidesWhenLooping) {
            i = this.slides.length - this.opts.slidesPerView + 1;
          } else {
            this.changeInstantly(Math.min(i + this.slides.length, this.slides.length + this.duplicatesAppend.length));
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
            this.changeInstantly(Math.max(i - this.slides.length, 1 - this.duplicatesPrepend.length));
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
        this.applyClasses(this.duplicatesPrepend, this.duplicatesPrepend.length - (this.slides.length - (this._current + this.slides.length)));
      }

      if (this.opts.auto) {
        this.auto = setTimeout(function () {
          _this6.current = _this6.current + _this6.opts.slidesPerView;
        }, this.opts.delay);
      }
    }

    /**
     * @return {HTMLElement}
     */

  }, {
    key: 'currentSlide',
    get: function get() {
      if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
        if (this._current >= this.slides.length) {
          return this.duplicatesAppend[this._current - this.slides.length];
        }

        if (this._current < 0) {
          return this.duplicatesPrepend[this.duplicatesPrepend.length - (this.slides.length - (this._current + this.slides.length))];
        }
      }

      return this.slides[this._current];
    }

    /**
     * @return {HTMLElement}
     */

  }, {
    key: 'previousSlide',
    get: function get() {
      if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
        if (this._current - 1 >= this.slides.length) {
          return this.duplicatesAppend[this._current - this.slides.length - 1];
        }

        if (this._current - 1 < 0) {
          return this.duplicatesPrepend[this.duplicatesPrepend.length - (this.slides.length - (this._current + this.slides.length)) - 1];
        }
      }

      return this.slides[this._current - 1];
    }

    /**
     * @return {HTMLElement}
     */

  }, {
    key: 'nextSlide',
    get: function get() {
      if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
        if (this._current + 1 >= this.slides.length) {
          return this.duplicatesAppend[this._current - this.slides.length + 1];
        }

        if (this._current + 1 < 0) {
          return this.duplicatesPrepend[this.duplicatesPrepend.length - (this.slides.length - (this._current + this.slides.length)) + 1];
        }
      }

      return this.slides[this._current + 1];
    }

    /**
     * Apply classes to the active (or its equivalent duplicate) slide,
     * and the surrounding next and previous slides
     *
     * @param {Array} elements
     * @param {Number} i
     */

  }]);

  return MagicRoundabout;
}(), (_applyDecoratedDescriptor(_class.prototype, 'applyClasses', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'applyClasses'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeInstantly', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'changeInstantly'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearState', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'clearState'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'registerListeners', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'registerListeners'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setContainerSize', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'setContainerSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleScroll', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleScroll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchStart', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseDown', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchMove', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseMove', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchEnd', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchEnd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseUp', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleDeltaChange', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleDeltaChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleKeypress', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleKeypress'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getTransitionOffset', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'getTransitionOffset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'transition', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'transition'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetTransition', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'offsetTransition'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getOuterWidth', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'getOuterWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getOuterHeight', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'getOuterHeight'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getInnerWidth', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'getInnerWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getInnerHeight', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'getInnerHeight'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isInViewport', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'isInViewport'), _class.prototype)), _class);
exports.default = MagicRoundabout;

},{"./lethargy":4,"decko":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

// Taken from https://github.com/d4nyll/lethargy,adapted
// for use as an ES6 module, with support for horizontal scrolling added
var Lethargy = (_class = function () {
  /**
   * @param {Number} stability
   * @param {Number} sensitivity
   * @param {Number} tolerance
   * @param {Number} delay
   */
  function Lethargy(stability, sensitivity, tolerance, delay) {
    _classCallCheck(this, Lethargy);

    this.stability = stability != null ? Math.abs(stability) : 8;
    this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 120;
    this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.05;
    this.delay = delay != null ? delay : 150;
    this.lastUpDeltas = function () {
      var i, ref, results;
      results = [];
      for (i = 1, ref = this.stability * 2; ref >= 1 ? i <= ref : i >= ref; ref >= 1 ? i++ : i--) {
        results.push(null);
      }
      return results;
    }.call(this);
    this.lastDownDeltas = function () {
      var i, ref, results;
      results = [];
      for (i = 1, ref = this.stability * 2; ref >= 1 ? i <= ref : i >= ref; ref >= 1 ? i++ : i--) {
        results.push(null);
      }
      return results;
    }.call(this);
    this.deltasTimestamp = function () {
      var i, ref, results;
      results = [];
      for (i = 1, ref = this.stability * 2; ref >= 1 ? i <= ref : i >= ref; ref >= 1 ? i++ : i--) {
        results.push(null);
      }
      return results;
    }.call(this);
  }

  /**
   * @param {MouseEvent} e
   */


  _createClass(Lethargy, [{
    key: 'check',
    value: function check(e) {
      var vertical = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var lastDelta;
      e = e.originalEvent || e;
      if (e.wheelDelta != null) {
        lastDelta = e.wheelDelta;
      } else if (vertical && e.deltaY != null) {
        lastDelta = e.deltaY * -40;
      } else if (!vertical && e.deltaX != null) {
        lastDelta = e.deltaX * -40;
      } else if (e.detail != null || e.detail === 0) {
        lastDelta = e.detail * -40;
      }
      this.deltasTimestamp.push(Date.now());
      this.deltasTimestamp.shift();
      if (lastDelta > 0) {
        this.lastUpDeltas.push(lastDelta);
        this.lastUpDeltas.shift();
        return this.isInertia(1);
      } else {
        this.lastDownDeltas.push(lastDelta);
        this.lastDownDeltas.shift();
        return this.isInertia(-1);
      }
    }

    /**
     * @param {Number} direction
     */

  }, {
    key: 'isInertia',
    value: function isInertia(direction) {
      var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
      lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
      if (lastDeltas[0] === null) {
        return direction;
      }
      if (this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[this.stability * 2 - 1]) {
        return false;
      }
      lastDeltasOld = lastDeltas.slice(0, this.stability);
      lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
      oldSum = lastDeltasOld.reduce(function (t, s) {
        return t + s;
      });
      newSum = lastDeltasNew.reduce(function (t, s) {
        return t + s;
      });
      oldAverage = oldSum / lastDeltasOld.length;
      newAverage = newSum / lastDeltasNew.length;
      if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && this.sensitivity < Math.abs(newAverage)) {
        return direction;
      } else {
        return false;
      }
    }

    /**
     *
     */

  }, {
    key: 'showLastUpDeltas',
    value: function showLastUpDeltas() {
      return this.lastUpDeltas;
    }

    /**
     *
     */

  }, {
    key: 'showLastDownDeltas',
    value: function showLastDownDeltas() {
      return this.lastDownDeltas;
    }
  }]);

  return Lethargy;
}(), (_applyDecoratedDescriptor(_class.prototype, 'check', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'check'), _class.prototype)), _class);
exports.default = Lethargy;

},{"decko":2}]},{},[1]);
