# vue-splitter-comp

For splitting a view in two!

__[Example](https://rmp135.github.io/vue-splitter-comp/)__

## Installing

Import the component.

```javascript
import VueSplitter from "vue-splitter-comp"
```

Load it into the `components` section of the vue component.

```javascript
components: {
  VueSplitter
}
```
Load it into the html, populating the `left-pane` and `right-pane` slots.

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

The `onResize` event will be fired when the dragger is moved.

## Using

The dragger can be dragged left and right to move the panes. It can be clicked to reset to 50%.

## Styles

The `.splitter` class can be overwritten to apply the style you would like.
