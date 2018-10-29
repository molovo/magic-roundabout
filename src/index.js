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
    auto: false,
    buttons: true,
    center: false,
    click: true,
    delay: 10000,
    duplicateSlidesWhenLooping: false,
    duplicateSlidesCount: 1,
    keys: true,
    limit: false,
    loop: true,
    onChange: () => {},
    touch: true,
    scroll: true,
    slidesPerView: 1,
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

    // Some HTML caching systems may leave duplicated slides in place when the
    // page loads. We clear them here to prevent duplicating the duplicates
    this.wrapper.querySelectorAll('.slideshow__slide--duplicate').forEach(slide => {
      slide.parentNode.removeChild(slide)
    })

    this.slides = Array.from(this.container.querySelectorAll('.slideshow__slide'))
    let i = 0
    this.slides.forEach(slide => {
      slide.dataset.index = i++
    })

    if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
      this.duplicatesAppend = this.slides.slice(0, this.opts.duplicateSlidesCount).map(slide => slide.cloneNode(true))
      this.duplicatesAppend.forEach(duplicate => {
        duplicate.classList.add('slideshow__slide--duplicate')
        duplicate.dataset.index = parseInt(duplicate.dataset.index) + this.slides.length
        this.wrapper.appendChild(duplicate)
      })

      this.duplicatesPrepend = this.slides.slice(0 - this.opts.duplicateSlidesCount).map(slide => slide.cloneNode(true))
      this.duplicatesPrepend.reverse().forEach(duplicate => {
        duplicate.classList.add('slideshow__slide--duplicate')
        duplicate.dataset.index = parseInt(duplicate.dataset.index) - this.slides.length
        this.wrapper.insertBefore(duplicate, this.wrapper.childNodes[0])
      })
    }

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
    clearTimeout(this.auto)
    i = parseInt(i)
    i = i - ((i - 1) % this.opts.slidesPerView)

    if (i < 1) {
      if (this.opts.loop) {
        if (!this.opts.duplicateSlidesWhenLooping) {
          i = this.slides.length - this.opts.slidesPerView + 1
        } else {
          this.changeInstantly(this.slides.length)
        }
      } else {
        i = 1
      }
    }

    if (i > this.slides.length - (i % this.opts.slidesPerView)) {
      if (this.opts.loop) {
        if (!this.opts.duplicateSlidesWhenLooping) {
          i = 1
        } else {
          this.changeInstantly(1)
        }
      } else {
        i = this.slides.length - (i % this.opts.slidesPerView)
      }
    }

    if (this.opts.buttons && !this.opts.loop) {
      fn = i === 1 ? 'add' : 'remove'
      this.buttons.prev.classList[fn]('slideshow__button--disabled')

      fn = i === this.slides.length ? 'add' : 'remove'
      this.buttons.next.classList[fn]('slideshow__button--disabled')
    }

    this._current = i - 1
    this.transition()

    this.opts.onChange(this)

    this.applyClasses(this.slides, this._current)

    if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
      this.applyClasses(this.duplicatesAppend, this._current - this.slides.length)
      this.applyClasses(this.duplicatesPrepend, this._current + this.slides.length - this.duplicatesPrepend.length - 1)
    }

    if (this.opts.auto) {
      this.auto = setTimeout(() => {
        this.current = this.current + this.opts.slidesPerView
      }, this.opts.delay)
    }
  }

  /**
   * Apply classes to the active (or its equivalent duplicate) slide,
   * and the surrounding next and previous slides
   *
   * @param {Array} elements
   * @param {int} i
   */
  @bind
  applyClasses (elements = [], i) {
    if (elements.length === 0) {
      return
    }

    requestAnimationFrame(t => {
      let k = this.opts.slidesPerView
      const selected = []

      if (i >= 0) {
        elements.slice(i, i + k).forEach(slide => {
          slide.classList.remove('slideshow__slide--next')
          slide.classList.remove('slideshow__slide--prev')
          slide.classList.add('slideshow__slide--active')
          selected.push(slide)
        })
      }

      if (i >= k) {
        elements.slice(i - k, i).forEach(slide => {
          slide.classList.remove('slideshow__slide--next')
          slide.classList.remove('slideshow__slide--active')
          slide.classList.add('slideshow__slide--prev')
          selected.push(slide)
        })
      }

      if (i + k >= 0) {
        elements.slice(i + k, i + k + k).forEach(slide => {
          slide.classList.remove('slideshow__slide--active')
          slide.classList.remove('slideshow__slide--prev')
          slide.classList.add('slideshow__slide--next')
          selected.push(slide)
        })
      }

      this.clearState(elements.filter(slide => {
        return selected.indexOf(slide) === -1
      }))
    })
  }

  /**
   * Trigger a delayed instant transition, to allow us to silently flick from
   * a duplicated slide to its corresponding slide in the main list
   *
   * @param {int} i
   */
  @bind
  changeInstantly (i) {
    const delay = getComputedStyle(this.wrapper).transitionDelay
    const delayFloat = parseFloat(delay, 10) * 1000
    const duration = getComputedStyle(this.wrapper).transitionDuration
    const durationFloat = parseFloat(duration, 10) * 1000

    setTimeout(() => {
      this.wrapper.style.transitionDelay = '0s'
      this.wrapper.style.transitionDuration = '0s'

      this.current = i

      setTimeout(() => {
        this.wrapper.style.transitionDelay = null
        this.wrapper.style.transitionDuration = null
      }, 50)
    }, delayFloat + durationFloat)
  }

  /**
   * Clear a slide state completely
   *
   * @param {NodeList|Array} slides
   *
   * @return {NodeList|Array}
   */
  @bind
  clearState (slides) {
    requestAnimationFrame(t => {
      slides.forEach(slide => {
        slide.classList.remove('slideshow__slide--active')
        slide.classList.remove('slideshow__slide--next')
        slide.classList.remove('slideshow__slide--prev')
      })
    })
  }

  /**
   * Register listeners to handle user interactions
   */
  @bind
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
      const fn = slide => {
        slide.addEventListener('click', e => {
          this.current = slide.dataset.index
        })
      }
      this.slides.forEach(fn)

      if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
        this.duplicatesAppend.forEach(fn)
        this.duplicatesPrepend.forEach(fn)
      }
    }

    // Handle pagination buttons
    if (this.opts.buttons) {
      this.buttons.next.addEventListener('click', e => {
        this.current = this.current + this.opts.slidesPerView
      })

      this.buttons.prev.addEventListener('click', e => {
        this.current = this.current - this.opts.slidesPerView
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
    // If there are multiple touches, ignore them so that we don't
    // interfere with pinch-to-zoom
    if (e.touches.length > 1) {
      return
    }

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
      this.current = n + this.opts.slidesPerView
    }

    if (d < 0) {
      this.current = n - this.opts.slidesPerView
    }

    this.touch = null

    setTimeout(() => {
      this.transitioning = false
    }, 1250)

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
        this.current = this.current - this.opts.slidesPerView
      }

      if (key === keys.down) {
        this.current = this.current + this.opts.slidesPerView
      }

      return
    }

    if (key === keys.left) {
      this.current = this.current - this.opts.slidesPerView
    }

    if (key === keys.right) {
      this.current = this.current + this.opts.slidesPerView
    }
  }

  /**
   * Transition to the current slide
   */
  @bind
  transition () {
    const axis = this.opts.vertical ? 'translateY' : 'translateX'
    const size = this.opts.vertical ? this.getOuterHeight : this.getOuterWidth
    const innerSize = this.opts.vertical ? this.getInnerHeight : this.getInnerWidth

    let offset = 0

    if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
      this.duplicatesPrepend.slice(0, this.duplicatesPrepend.length + Math.min(this._current, 0)).forEach(duplicate => {
        offset += size(duplicate)
      })
    }

    for (var i = 0; i < this._current; i++) {
      offset += size(this.slides[i])
    }

    if (this.opts.center && !this.opts.limit) {
      offset = offset + (size(this.container) / 2) - (innerSize(this.slides[this._current]) / 2)
    }

    if (this.opts.limit && !this.opts.loop) {
      let total = 0
      for (var k = 0; k < this.slides.length; k++) {
        total += size(this.slides[k])
      }

      offset = Math.min(offset, total - this.container.clientWidth)

      if (this.opts.buttons) {
        if (offset >= total - this.container.clientWidth) {
          this.buttons.next.classList.add('slideshow__button--disabled')
        } else {
          this.buttons.next.classList.remove('slideshow__button--disabled')
        }
      }
    }

    requestAnimationFrame(t => {
      this.wrapper.style.transform = `${axis}(${offset * -1}px)`
    })
  }

  /**
   * Get the width of an element including padding, border and margin
   *
   * @param {HTMLElement} el
   *
   * @return {float}
   */
  @bind
  getOuterWidth (el) {
    const style = window.getComputedStyle(el)

    return this.getInnerWidth(el) + parseFloat(style.marginLeft) + parseFloat(style.marginRight)
  }

  /**
   * Get the height of an element including padding, border and margin
   *
   * @param {HTMLElement} el
   *
   * @return {float}
   */
  @bind
  getOuterHeight (el) {
    const style = window.getComputedStyle(el)

    return this.getInnerHeight(el) + parseFloat(style.marginTop) + parseFloat(style.marginBottom)
  }

  /**
   * Get the width of an element including padding, border and margin
   *
   * @param {HTMLElement} el
   *
   * @return {float}
   */
  @bind
  getInnerWidth (el) {
    return parseFloat(el.getBoundingClientRect().width)
  }

  /**
   * Get the height of an element including padding, border and margin
   *
   * @param {HTMLElement} el
   *
   * @return {float}
   */
  @bind
  getInnerHeight (el) {
    return parseFloat(el.getBoundingClientRect().height)
  }

  /**
   * Check if the slider is currently within the viewport
   *
   * @return {bool}
   */
  @bind
  isInViewport () {
    const {top, left, bottom, right} = this.container.getBoundingClientRect()

    return top <= window.innerHeight &&
           bottom >= 0 &&
           left <= window.innerWidth &&
           right >= 0
  }
}
