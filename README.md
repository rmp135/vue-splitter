# vue-splitter

For splitting a Vue in two!

__[Demo](https://rmp135.github.io/vue-splitter/#usage)__

Compatible with Vue 3 only.

## Installing

Install from npm.

`npm i @rmp135/vue-splitter`

Import the component. The styling is included.

```javascript
import VueSplitter from '@rmp135/vue-splitter'
```

Use it in the HTML template, populating the `left-pane` and `right-pane` slots.

```html
<vue-splitter>
  <template #left-pane>
    <div>Some left content here.</div>
  </template>
  <template #right-pane>
    <div>Some right content here.</div>
  </template>
</vue-splitter>
```

Bind to the `percent` prop for two-way binding on the splitter position.

See the [Documentation](https://rmp135.github.io/vue-splitter/#usage) for more props, events and styling.