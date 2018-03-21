import MagicRoundabout from '../../src/index.js'

class App {
  /**
   * @type {NodeList}
   */
  examples = document.querySelectorAll('.example')

  /**
   * @type {MagicRoundabout[]}
   */
  slideshows = []

  /**
   * @return {self}
   */
  constructor () {
    this.createSliderInstances()
  }

  /**
   *
   */
  createSliderInstances () {
    this.examples.forEach(example => {
      const slideshow = example.querySelector('.slideshow')
      const opts = JSON.parse(example.dataset.opts)

      this.slideshows.push(new MagicRoundabout(slideshow, opts))
    })
  }
}

window.app = new App()
