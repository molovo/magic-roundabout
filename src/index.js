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
    draggable: false,
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
      this.container = document.querySelector(target)

      if (!this.container) {
        throw new TypeError('selector matched no elements')
      }
    } else if (target instanceof HTMLElement) {
      this.container = target
    } else {
      throw new TypeError('target must be an instance of "HTMLElement" or a valid selector')
    }

    this.opts = {
      ...this.opts,
      ...opts
    }

    this.wrapper = this.container.querySelector('.slideshow__slides')

    // Some HTML caching systems may leave duplicated slides in place when the
    // page loads. We clear them here to prevent duplicating the duplicates
    this.wrapper.querySelectorAll('.slideshow__slide--duplicate').forEach(slide => {
      slide.parentNode.removeChild(slide)
    })

    this.slides = Array.from(this.container.querySelectorAll('.slideshow__slide'))
    let i = 1
    this.slides.forEach(slide => {
      slide.dataset.index = i++
    })

    if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
      this.duplicatesAppend = this.slides.slice(0, this.opts.duplicateSlidesCount).map(slide => slide.cloneNode(true))
      for (let i = 0; i < this.duplicatesAppend.length; i++) {
        const duplicate = this.duplicatesAppend[i]
        duplicate.classList.add('slideshow__slide--duplicate')
        duplicate.dataset.index = parseInt(duplicate.dataset.index) + this.slides.length
        this.wrapper.appendChild(duplicate)
      }

      this.duplicatesPrepend = this.slides.slice(0 - this.opts.duplicateSlidesCount).map(slide => slide.cloneNode(true))
      for (let j = this.duplicatesPrepend.length - 1; j >= 0; j--) {
        const duplicate = this.duplicatesPrepend[j]
        duplicate.classList.add('slideshow__slide--duplicate')
        duplicate.dataset.index = parseInt(duplicate.dataset.index) - this.slides.length
        this.wrapper.insertBefore(duplicate, this.wrapper.childNodes[0])
      }
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
          this.changeInstantly(Math.min(i + this.slides.length, this.slides.length + this.duplicatesAppend.length))
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
          this.changeInstantly(Math.max(i - this.slides.length, 1 - this.duplicatesPrepend.length))
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
      this.applyClasses(this.duplicatesPrepend, this.duplicatesPrepend.length - (this.slides.length - (this._current + this.slides.length)))
    }

    if (this.opts.auto) {
      this.auto = setTimeout(() => {
        this.current = this.current + this.opts.slidesPerView
      }, this.opts.delay)
    }
  }

  /**
   * @return {HTMLElement}
   */
  get currentSlide () {
    if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
      if (this._current >= this.slides.length) {
        return this.duplicatesAppend[this._current - this.slides.length]
      }

      if (this._current < 0) {
        return this.duplicatesPrepend[this.duplicatesPrepend.length - (this.slides.length - (this._current + this.slides.length))]
      }
    }

    return this.slides[this._current]
  }

  /**
   * @return {HTMLElement}
   */
  get previousSlide () {
    if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
      if (this._current - 1 >= this.slides.length) {
        return this.duplicatesAppend[this._current - this.slides.length - 1]
      }

      if (this._current - 1 < 0) {
        return this.duplicatesPrepend[this.duplicatesPrepend.length - (this.slides.length - (this._current + this.slides.length)) - 1]
      }
    }

    return this.slides[this._current - 1]
  }

  /**
   * @return {HTMLElement}
   */
  get nextSlide () {
    if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
      if (this._current + 1 >= this.slides.length) {
        return this.duplicatesAppend[this._current - this.slides.length + 1]
      }

      if (this._current + 1 < 0) {
        return this.duplicatesPrepend[this.duplicatesPrepend.length - (this.slides.length - (this._current + this.slides.length)) + 1]
      }
    }

    return this.slides[this._current + 1]
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
    // Prevent interaction to avoid the user navigating to a slide that does
    // not exist
    this.transitioning = true

    const delay = getComputedStyle(this.wrapper).transitionDelay
    const delayFloat = parseFloat(delay, 10) * 1000
    const duration = getComputedStyle(this.wrapper).transitionDuration
    const durationFloat = parseFloat(duration, 10) * 1000

    setTimeout(() => {
      this.wrapper.style.transitionDelay = '0s'
      this.wrapper.style.transitionDuration = '0s'

      this.current = i
      this.transitioning = false

      setTimeout(() => {
        this.wrapper.style.transitionDelay = ''
        this.wrapper.style.transitionDuration = ''
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

    // Handle swipe/drag events
    if (this.opts.touch || this.opts.draggable) {
      this.container.addEventListener('touchstart', this.handleTouchStart)
      this.container.addEventListener('touchmove', this.handleTouchMove)
      this.container.addEventListener('mousedown', this.handleMouseDown)
      this.container.addEventListener('mousemove', this.handleMouseMove)
      this.container.addEventListener('mouseup', this.handleMouseUp)
      this.container.addEventListener('mouseleave', this.handleMouseUp)
    }

    // Handle keyboard events
    if (this.opts.keys) {
      document.addEventListener('keyup', this.handleKeypress)
    }

    // Slide to clicked slide
    if (this.opts.click) {
      const fn = slide => {
        slide.addEventListener('click', e => {
          if (!this.dragging) {
            this.current = slide.dataset.index
          }
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
      return this.handleDeltaChange(e, e.deltaY, true)
    }

    if (!this.opts.vertical && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      return this.handleDeltaChange(e, e.deltaX, true)
    }
  }

  /**
   * Handle touchstart events on the container
   *
   * @param {TouchEvent} e
   */
  @bind
  handleTouchStart (e) {
    this.touch = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  /**
   * Convert mousedown events to touchstart events
   *
   * @param {MousedownEvent} e
   */
  @bind
  handleMouseDown (e) {
    e.touches = [{ clientX: e.clientX, clientY: e.clientY }]
    return this.handleTouchStart(e)
  }

  /**
   * Handle touchend events on the container
   *
   * @param {TouchEvent} e
   */
  @bind
  handleTouchMove (e) {
    clearTimeout(this.touchEndHandler)

    // If a touch hasn't been recorded, we can't calculate the distance,
    // so we ignore the movement
    if (!this.touch) {
      return
    }

    // If there are multiple touches, ignore them so that we don't
    // interfere with pinch-to-zoom
    if (e.touches.length > 1) {
      return
    }

    if (!this.opts.draggable) {
      this.touchEndHandler = setTimeout(this.handleTouchEnd.bind(this, e), 50)
      return
    }

    if (!this.transitioning) {
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      const deltaX = this.touch.x - x
      const deltaY = this.touch.y - y
      let distance

      if (this.opts.vertical && Math.abs(deltaY) > Math.abs(deltaX)) {
        distance = deltaY
      }

      if (!this.opts.vertical && Math.abs(deltaX) > Math.abs(deltaY)) {
        distance = deltaX
      }

      if (Math.abs(distance) > 25) {
        this.dragging = true
      }

      this.offsetTransition(distance)

      // If the user has dragged more than the current slides width, reset the
      // touch point and silently update the current slide
      const threshold = (() => {
        let slide = this.currentSlide
        if (distance < 0) {
          slide = this.previousSlide
        }

        if (slide) {
          if (this.opts.vertical) {
            return this.getOuterHeight(slide)
          }

          return this.getOuterWidth(slide)
        }

        return 0
      })()

      if (Math.abs(distance) > threshold) {
        if (distance > 0) {
          this._current = this._current + 1
        }
        if (distance < 0) {
          this._current = this._current - 1
        }

        this.touch.x = x
        this.touch.y = y
      }
    }
  }

  /**
   * Convert mousemove events to touchmove events
   *
   * @param {MousemoveEvent} e
   */
  @bind
  handleMouseMove (e) {
    e.touches = [{ clientX: e.clientX, clientY: e.clientY }]
    return this.handleTouchMove(e)
  }

  /**
   * Handle touchend events on the container
   *
   * @param {TouchEvent} e
   */
  @bind
  handleTouchEnd (e) {
    // If a touch hasn't been recorded, we can't calculate the distance,
    // so we ignore the movement
    if (!this.touch) {
      return
    }

    // If there are multiple touches, ignore them so that we don't
    // interfere with pinch-to-zoom
    if (e.touches.length > 1) {
      return
    }

    const x = e.touches[0].clientX
    const y = e.touches[0].clientY

    const deltaX = this.touch.x - x
    const deltaY = this.touch.y - y

    this.touch = null

    // Reset transition timing
    this.wrapper.style.transitionDelay = null
    this.wrapper.style.transitionDuration = null

    if (this.opts.vertical && Math.abs(deltaY) > Math.abs(deltaX)) {
      return this.handleDeltaChange(e, deltaY, false)
    }

    if (!this.opts.vertical && Math.abs(deltaX) > Math.abs(deltaY)) {
      return this.handleDeltaChange(e, deltaX, false)
    }
  }

  /**
   * Convert mouseup events to touchend events
   *
   * @param {MouseupEvent} e
   */
  @bind
  handleMouseUp (e) {
    e.touches = [{ clientX: e.clientX, clientY: e.clientY }]
    return this.handleTouchEnd(e)
  }

  /**
   * Handle a swipe or scroll interaction
   *
   * @param {WheelEvent|TouchEvent} e
   * @param {int} distance
   * @param {bool} preventInteraction
   */
  @bind
  handleDeltaChange (e, distance, preventInteraction = false) {
    if (this.transitioning) {
      e.stopPropagation()
      e.preventDefault()
      e.cancelBubble = true
      return false
    }

    const n = this.current

    this.transitioning = true

    e.stopPropagation()
    e.preventDefault()
    e.cancelBubble = true

    if (this.opts.draggable) {
      const threshold = (() => {
        let slide = this.currentSlide
        if (distance < 0) {
          slide = this.previousSlide
        }

        if (slide) {
          if (this.opts.vertical) {
            return this.getInnerHeight(slide) / 2
          }

          return this.getInnerWidth(slide) / 2
        }

        return 0
      })()

      if (Math.abs(distance) > threshold) {
        if (distance > 0) {
          this.current = n + this.opts.slidesPerView
        }

        if (distance < 0) {
          this.current = n - this.opts.slidesPerView
        }
      } else {
        this.current = this.current
      }
    } else {
      if (distance > 0) {
        this.current = n + this.opts.slidesPerView
      }

      if (distance < 0) {
        this.current = n - this.opts.slidesPerView
      }
    }

    if (preventInteraction) {
      setTimeout(() => {
        this.transitioning = false
      }, 1250)

      return false
    }

    setTimeout(() => {
      this.dragging = false
    }, 50)

    this.transitioning = false

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
   * Get the correct transition offset for the current slide
   *
   * @return Number
   */
  @bind
  getTransitionOffset () {
    const size = this.opts.vertical ? this.getOuterHeight : this.getOuterWidth
    const innerSize = this.opts.vertical ? this.getInnerHeight : this.getInnerWidth

    let offset = 0

    if (this.opts.loop && this.opts.duplicateSlidesWhenLooping) {
      this.duplicatesPrepend.slice(0, this.duplicatesPrepend.length + Math.min(this._current, 0)).forEach(duplicate => {
        offset += size(duplicate)
      })
    }

    for (let i = 0; i < Math.min(this._current, this.slides.length); i++) {
      offset += size(this.slides[i])
    }

    for (let j = 0; j < this._current - this.slides.length; j++) {
      offset += size(this.duplicatesPrepend[j])
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

    return offset * -1
  }

  /**
   * Transition to the current slide
   */
  @bind
  transition () {
    const axis = this.opts.vertical ? 'translateY' : 'translateX'

    this.wrapper.style.transform = `${axis}(${this.getTransitionOffset()}px)`
  }

  /**
   * Offset the current transition position by the current pixel amount
   *
   * @param {Number} distance
   */
  @bind
  offsetTransition (distance) {
    const axis = this.opts.vertical ? 'translateY' : 'translateX'
    this.wrapper.style.transitionDelay = '0s'
    this.wrapper.style.transitionDuration = '0s'

    this.wrapper.style.transform = `${axis}(${this.getTransitionOffset() - distance}px)`
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
