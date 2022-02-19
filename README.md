# vue-splitter

For splitting a Vue in two!

__[Demo](https://rmp135.github.io/vue-splitter/#usage)__

Compatible with Vue 2 and Vue 3.

## Installing

Install from npm.

`npm i @rmp135/vue-splitter`

Import the component.

```javascript
import VueSplitter from '@rmp135/vue-splitter'
```

Include it in the `components` section of the vue component.

```javascript
components: {
  VueSplitter
}
```
Use it in the html, populating the `left-pane` and `right-pane` slots.

```html
<vue-splitter>
  <div slot="left-pane">
    <div>Some left content here.</div>
  </div>
  <div slot="right-pane">
    <div>Some right content here.</div>
  </div>
</vue-splitter>
```

Bind to the `percent` prop for two-way binding on the splitter position.

See the [Documentation](https://rmp135.github.io/vue-splitter/#usage) for more props, events and styling.