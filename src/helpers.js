/**
 * Easing function, equivalent to easeOutCubic
 *
 * @see {https://gist.github.com/gre/1650294}
 *
 * @param {number} t
 *
 * @return {number}
 */
export const ease = (t) => (--t) * t * t + 1

/**
 * Animate a value
 *
 * @param {number}   from
 * @param {number}   to
 * @param {number}   duration
 * @param {function} callback
 *
 * @return {void}
 */
export const animate = (from, to, duration = 500, callback, easing = ease) => {
  const diff = to - from

  if (!diff) {
    return
  }

  let start, value

  /**
   * Set values for each step in the animation
   *
   *
   * @param {number} timestamp
   */
  const step = (timestamp) => {
    if (!start) {
      start = timestamp
    }

    var time = timestamp - start
    var percent = easing(Math.min(time / duration, 1))

    value = (from + diff * percent)

    if (time >= duration) {
      value = to
      callback(value)
      return
    }

    callback(value)
    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}
