# Magic Roundabout

A tiny JavaScript carousel

## Install

```
npm install magic-roundabout
```

## Usage

First, create the HTML structure for your slider.

```html
<div class="slideshow" id="slideshow">
  <div class="slideshow__slides">
    <div class="slideshow__slide">
      <!-- First slide content -->
    </div>

    <div class="slideshow__slide">
      <!-- Second slide content -->
    </div>
  </div>
</div>
```

Then, create a new instance of magic roundabout.

```js
import MagicRoundabout from 'magic-roundabout'

const magicRoundabout = new MagicRoundabout('#slideshow')
```

Magic Roundabout does not include any CSS, making it easy to style as you see fit. The following should be enough to get you started

```css
#your-selector {
  overflow: hidden;
}
  #your-selector .slideshow__slides {
    align-items: stretch;
    display: flex;
    flex-wrap: nowrap;
    transition: transform .3s;
    width: 100%;
  }
  #your-selector .slideshow__slide {
    flex: 0 0 100%;
  }
```

If you want to add navigation buttons, just add them into the main `.slideshow` element.

```html
<div class="slideshow" id="slideshow">
  <div class="slideshow__slides">
    <div class="slideshow__slide">
      <!-- First slide content -->
    </div>

    <div class="slideshow__slide">
      <!-- Second slide content -->
    </div>
  </div>

  <a href="javascript:void('')" class="slideshow__button slideshow__button--prev">Previous</a>
  <a href="javascript:void('')" class="slideshow__button slideshow__button--next">Next</a>
</div>
```

## Options

Magic Roundabout's full option list is shown below:

```js
const magicRoundabout = new MagicRoundabout('#your-element', {
  // Whether the slider should autoplay
  auto: false,

  // Whether next/previous buttons are in the container
  buttons: true,

  // If true, slides will be centered in the container
  // (Disabled if `limit` option is `true`)
  center: false,

  // If true, clicking a slide will transition to it
  click: true,

  // When auto == true, the time between transitions
  delay: 10000,

  // If true, the user can click-and-drag or swipe-and-drag the slideshow
  draggable: false,

  // If true, the arrow keys will control the slider while it is in the viewport
  keys: true,

  // If true, the slider will not be allowed to scroll past the last slide's right edge
  // (Disabled if `loop` option is `true`)
  limit: true,

  // Whether the slider should return to the start when at the end
  loop: true,

  // A function which is fired when the current slide changes
  onChange: (magicRoundabout) => {},

  // If true, the carousel will respond to swipe events
  touch: true,

  // If true, the carousel will respond to scroll events
  scroll: true,

  // If true, the carousel will transition vertically
  vertical: false
})
```
