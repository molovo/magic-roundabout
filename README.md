# Magic Roundabout

A tiny JavaScript carousel

## Install

```
npm install magic-roundabout
```

## Usage

```js
import MagicRoundabout from 'magic-roundabout'

const magicRoundabout = new MagicRoundabout('#your-element', {
  // Whether next/previous buttons are in the container
  buttons: true,

  // If true, clicking a slide will transition to it
  click: true,

  // If true, the arrow keys will control the slider while it is in the viewport
  keys: true,

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

Magic Roundabout does not include any CSS, making it easy to style as you see fit. The following should be enough to get you started

```css
#your-selector {
  overflow: hidden;
}
  #your-selector .slideshow__slides {
    align-items: stretch;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
  }
  #your-selector .slideshow__slide {
    flex: 0 0 100%;
    transition: transform .3s;
  }
```