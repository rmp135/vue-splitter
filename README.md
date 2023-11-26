# vue-splitter

For splitting a Vue in two!

[![npm (scoped)](https://img.shields.io/npm/v/%40rmp135/vue-splitter)](https://www.npmjs.com/package/@rmp135/vue-splitter) [![Run Tests](https://github.com/rmp135/vue-splitter/actions/workflows/test.yml/badge.svg)](https://github.com/rmp135/vue-splitter/actions/workflows/test.yml)

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