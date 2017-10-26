import { bind } from 'decko'

/**
 * A tiny JavaScript carousel
 */
export default class MagicRoundabout {
  /**
   * Options for the instance
   *
   * @type {object}
   */
  opts = {
    buttons: true,
    click: true,
    keys: true,
    onChange: () => {},
    touch: true,
    scroll: true,
    vertical: false
  }

  /**
   * The real index of the current slide
   *
   * @type {int}
   */
  _current = 0

  /**
   * The width of the slideshow container
   *
   * @type {int}
   */
  width = null

  /**
   * An object used for storing touch coordinates
   *
   * @type {object}
   */
  touch = null

  /**
   * Create the slideshow instance
   *
   * @param {HTMLElement|string} target
   * @param {object} opts
   */
  constructor (target, opts) {
    if (typeof target === 'string') {
      target = document.querySelector(target)
    }

    this.opts = {
      ...this.opts,
      ...opts
    }

    this.container = target
    this.wrapper = this.container.querySelector('.slideshow__slides')
    this.slides = this.container.querySelectorAll('.slideshow__slide')

    if (this.opts.buttons) {
      this.buttons = {}
      this.buttons.next = this.container.querySelector('.slideshow__button--next')
      this.buttons.prev = this.container.querySelector('.slideshow__button--prev')
    }

    this.setContainerSize()
    this.registerListeners()

    this.current = 1
  }

  /**
   * Get the current slide index
   *
   * @return {int}
   */
  get current () {
    return this._current + 1
  }

  /**
   * Set the current slide index
   *
   * @param {int} i
   */
  set current (i) {
    let fn

    if (i <= 1) {
      i = 1
    }

    if (i >= this.slides.length) {
      i = this.slides.length
    }

    if (this.opts.buttons) {
      fn = i === 1 ? 'add' : 'remove'
      this.buttons.prev.classList[fn]('slideshow__button--disabled')

      fn = i === this.slides.length ? 'add' : 'remove'
      this.buttons.next.classList[fn]('slideshow__button--disabled')
    }

    this._current = i - 1
    this.transition()

    this.opts.onChange(this)

    this.slides.forEach(slide => {
      slide.classList.remove('slideshow__slide--active')
      slide.classList.remove('slideshow__slide--next')
      slide.classList.remove('slideshow__slide--prev')
    })

    this.slides[this._current].classList.add('slideshow__slide--active')

    if (this.slides[this._current - 1]) {
      this.slides[this._current - 1].classList.add('slideshow__slide--prev')
    }

    if (this.slides[this._current + 1]) {
      this.slides[this._current + 1].classList.add('slideshow__slide--next')
    }
  }

  /**
   * Register listeners to handle user interactions
   */
  registerListeners () {
    // Set the container size
    window.addEventListener('resize', this.setContainerSize)

    // Handle scroll events
    if (this.opts.scroll) {
      this.container.addEventListener('wheel', this.handleScroll)
    }

    // Handle swipe events
    if (this.opts.touch) {
      this.container.addEventListener('touchstart', this.handleTouchStart)
      this.container.addEventListener('touchmove', this.handleTouchMove)
    }

    // Handle keyboard events
    if (this.opts.keys) {
      document.addEventListener('keyup', this.handleKeypress)
    }

    // Slide to clicked slide
    if (this.opts.click) {
      this.slides.forEach(slide => {
        slide.addEventListener('click', e => {
          this.current = Array.from(this.slides).indexOf(slide) + 1
        })
      })
    }

    // Handle pagination buttons
    if (this.opts.buttons) {
      this.buttons.next.addEventListener('click', e => {
        this.current = this.current + 1
      })

      this.buttons.prev.addEventListener('click', e => {
        this.current = this.current - 1
      })
    }
  }

  /**
   * Update the container width when the window resizes
   */
  @bind
  setContainerSize () {
    this.width = this.container.clientWidth
    this.transition()
  }

  /**
   * Handle scroll events on the container
   *
   * @param {WheelEvent} e
   */
  @bind
  handleScroll (e) {
    if (this.opts.vertical && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      return this.handleDeltaChange(e, e.deltaY)
    }

    if (!this.opts.vertical && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      return this.handleDeltaChange(e, e.deltaX)
    }
  }

  /**
   * Handle touchstart events on the container
   *
   * @param {TouchEvent} e
   */
  @bind
  handleTouchStart (e) {
    this.touch = {x: e.touches[0].clientX, y: e.touches[0].clientY}
  }

  /**
   * Handle touchmove events on the container
   *
   * @param {TouchEvent} e
   */
  @bind
  handleTouchMove (e) {
    const x = e.touches[0].clientX
    const y = e.touches[0].clientY

    const deltaX = this.touch.x - x
    const deltaY = this.touch.y - y

    if (this.opts.vertical && Math.abs(deltaY) > Math.abs(deltaX)) {
      return this.handleDeltaChange(e, deltaY)
    }

    if (!this.opts.vertical && Math.abs(deltaX) > Math.abs(deltaY)) {
      return this.handleDeltaChange(e, deltaX)
    }
  }

  /**
   * Handle a swipe or scroll interaction
   *
   * @param {WheelEvent|TouchEvent} e
   * @param {int} d
   */
  @bind
  handleDeltaChange (e, d) {
    if (this.transitioning) {
      e.stopPropagation()
      e.preventDefault()
      e.cancelBubble = true
      return false
    }

    const n = this.current

    const atStart = d < -25 && n === 1
    const atEnd = d > 25 && n === this.slides.length

    if (atStart || atEnd) {
      return
    }

    this.transitioning = true

    e.stopPropagation()
    e.preventDefault()
    e.cancelBubble = true

    if (d > 0) {
      this.current = n + 1
    }

    if (d < 0) {
      this.current = n - 1
    }

    this.touch = null

    setTimeout(() => {
      this.transitioning = false
    }, 750)

    return false
  }

  /**
   * Handle keypresses on arrows whilst the slideshow is within the viewport
   *
   * @param {KeyboardEvent} e
   */
  @bind
  handleKeypress (e) {
    if (!this.isInViewport()) {
      return
    }

    const keys = {
      left: 37,
      up: 38,
      right: 39,
      down: 40
    }

    const key = e.keyCode || e.which

    if (this.opts.vertical) {
      if (key === keys.up) {
        this.current = this.current - 1
      }

      if (key === keys.down) {
        this.current = this.current + 1
      }

      return
    }

    if (key === keys.left) {
      this.current = this.current - 1
    }

    if (key === keys.right) {
      this.current = this.current + 1
    }
  }

  /**
   * Transition to the current slide
   */
  transition () {
    const axis = this.opts.vertical ? 'translateY' : 'translateX'
    const size = this.opts.vertical ? this.getOuterHeight : this.getOuterWidth

    let offset = 0
    for (var i = 0; i < this._current; i++) {
      offset += size(this.slides[i]) * -1
    }

    this.wrapper.style.transform = `${axis}(${offset}px)`
  }

  /**
   * Get the width of an element including padding, border and margin
   *
   * @param {HTMLElement} el
   *
   * @return {int}
   */
  getOuterWidth (el) {
    const style = window.getComputedStyle(el)

    return el.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight)
  }

  /**
   * Get the height of an element including padding, border and margin
   *
   * @param {HTMLElement} el
   * 
   * @return {int}
   */
  getOuterHeight (el) {
    const style = window.getComputedStyle(el)

    return el.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom)
  }

  /**
   * Check if the slider is currently within the viewport
   *
   * @return {bool}
   */
  isInViewport () {
    const {top, left, bottom, right} = this.container.getBoundingClientRect()

    return top <= window.innerHeight &&
           bottom >= 0 &&
           left <= window.innerWidth &&
           right >= 0
  }
}
