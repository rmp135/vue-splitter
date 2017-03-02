# vue-splitter-comp

[![Build Status](https://travis-ci.org/rmp135/vue-splitter-comp.svg?branch=master)](https://travis-ci.org/rmp135/vue-splitter-comp)

For splitting a view in two!

__[Demo](https://rmp135.github.io/vue-splitter-comp/)__

## Installing

Install from npm.

`yarn add vue-splitter-comp`

Import the component.

```javascript
import VueSplitter from "vue-splitter-comp"
```

Include it in the `components` section of the vue component.

```javascript
components: {
  VueSplitter
}
```
Use it in the html, populating the `left-pane` and `right-pane` slots.

```html
<vue-splitter :margin="20">
  <div slot="left-pane">
    <div>Some left content here.</div>
  </div>
  <div slot="right-pane">
    <div>Some right content here.</div>
  </div>
</vue-splitter>
```

The `margin` prop can be used to set the percentage that the dragger should not exceed on either side. Defaults to 10%.

The `resize` event will be fired when the dragger is moved.

## Using

The dragger can be dragged left and right to move the panes. It can be clicked to reset to 50%.

## Styles

The following classes may be overridden to apply the style you would like.

The component is wrapped in a `.vue-splitter-comp` class.

Each pane has a `.splitter-pane` class, with a `.left-pane` and `.right-pane` class respectively.

The splitter bar has a `.splitter` class.
