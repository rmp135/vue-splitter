---
sidebarDepth: 3
---
<style lang="scss">
  .styling.vue-splitter {
    * {
      padding: 1rem;
      border: 1px solid #ccc;
    }
    .splitter {
      width: 30px;
      background: blue;
      &:hover {
        background: red;
      }
      &.active {
        background: green;
      }
    }
  }
</style>
<script setup>
import { reactive, computed } from 'vue'
import BaseDemo from './BaseDemo.vue'
import NestingDemo from './NestingDemo.vue'

const propsPercentData = reactive({
  percent: 25
})

const nestedData = reactive({
  isHorizontal: true
})

const isHorizontalData = reactive({
  isHorizontal: true
})

const eventData = reactive({
  percent: 50,
  percentLogs: ["Drag the splitter to see the events!"],
  clickPercent: 50,
  clickLogs: ["Click the splitter to see the events!"]
})

const helpersMinWidthData = reactive({
  percent: 50,
})

const helpersResetOnClickData = reactive({
  percent: 25,
})

function onHelpersResetOnClick() {
  helpersResetOnClickData.percent = 50
}

const helpersMinWidthCompPercent = computed({
  get() {
    return helpersMinWidthData.percent
  },
  set(val) {
    helpersMinWidthData.percent = Math.max(20, Math.min(60, val))
  }
})
function leftPad(num) {
  return num < 10 ? `0${num}` : num
}

function addToLog(event, logs) {
  const d = new Date()
  logs.unshift(`${d.getHours()}:${leftPad(d.getMinutes())}:${leftPad(d.getMinutes())}:${d.getMilliseconds()} - ${event}`)
}

function formatLogs(logs) {
  return logs.join('\n')
}

const stylingData = reactive({
  percent: 50
})

const stylingCompPercent = computed({
  get() {
    return stylingData.percent
  },
  set(val) {
    stylingData.percent = Math.max(20, Math.min(80, val))
  }
})

</script>

## Installation

::: info
This documentation will be written in Vue 3 but VueSplitter will also work in Vue 2.
:::

Install using npm or yarn.

```bash
npm i @rmp135/vue-splitter
```

Import the component and styling into your component. 

```js
import VueSplitter from '@rmp135/vue-splitter'
import '@rmp135/vue-splitter/dist/style.css'
```
And add to your components section if required

```js
components: {
  VueSplitter
}
```

## Usage 

### Basic

The simplest setup is shown below. By default in vertical orientation two slots are available to use, `left-pane` and `right-pane`.

Populate these with content for the respective slot.

Dragging the splitter bar will shift the content accordingly. You can continue to drag outside the container.

<BaseDemo />
```vue
  <vue-splitter>
    <template #left-pane>
      Left Pane content
    </template>
    <template #right-pane>
      Right Pane content
    </template>
  </vue-splitter>
```
### Nesting

Splitter views can be nested within other splitter views. To make a splitter horizontal see the prop [is-horizontal](#is-horizontal).

<NestingDemo />

```vue
  <vue-splitter>
    <template #left-pane>
      Left Pane content
    </template>
    <template #right-pane>
      <vue-splitter is-horizontal>
        <template #top-pane>
          Top Pane content
        </template>
        <template #bottom-pane>
          Bottom Pane content
        </template>
      </vue-splitter>
    </template>
  </vue-splitter>
```

## Props

### percent

- type: `Number`

Binds how far, in percent of the component container, the splitter bar will be.

::: warning
When used, you must two-way bind the value using `v-model:percent` to allow the value to update.
:::

Current Percent: {{propsPercentData.percent}}
<button v-on:click="propsPercentData.percent = 50">Set to 50%</button>
<base-demo v-model:percent="propsPercentData.percent"/>

```vue
<vue-splitter :percent="50">
...
</vue-splitter>
```
### initial-percent

- type: `Number`

Sets the initial percentage of the splitter bar. This allows for a first load static value without having to two-way bind the value. 

<base-demo initial-percent="20"/>

```vue
<vue-splitter initial-percent="20">
...
</vue-splitter>
```

### is-horizontal

- type: `Boolean`
- default: `false`

Displays the splitter as a horizontal bar, placing content on top and below.

::: tip
For ease of use, the slot names can be referred to as `top-pane` and `bottom-pane` respectively. Left / right names will continue to work.
:::

<button v-on:click="isHorizontalData.isHorizontal = !isHorizontalData.isHorizontal">Toggle</button>
<base-demo :is-horizontal="isHorizontalData.isHorizontal"/>

<template v-if="isHorizontalData.isHorizontal">

```vue
  <vue-splitter :is-horizontal="true">
    <template #top-pane>
      Top Pane content
    </template>
    <template #bottom-pane>
      Bottom Pane content
    </template>
  </vue-splitter>
```
</template>
<template v-else>

```vue
  <vue-splitter :is-horizontal="false">
    <template #left-pane>
      Left Pane content
    </template>
    <template #right-pane>
      Right Pane content
    </template>
  </vue-splitter>
```
</template>

::: danger
Horizontal mode does not work on touch screen devices. The page will insist on scrolling.
:::

## Events

### update:percent

- type: Number

Triggers when the splitter bar moves. See prop [percent](#percent).
<base-demo v-model:percent="eventData.percent" v-on:update:percent="addToLog($event + '%', eventData.percentLogs)">
  <template v-slot:left-pane>{{formatLogs(eventData.percentLogs)}}</template>
</base-demo>

```vue
<vue-splitter @update:percent="onUpdatePercent">
...
</vue-splitter>
```

### splitter-click

- type: void

Triggers when the splitter bar is clicked.
<base-demo v-model:percent="eventData.clickPercent" v-on:splitter-click="addToLog('clicked', eventData.clickLogs)">
  <template v-slot:left-pane>{{formatLogs(eventData.clickLogs)}}</template>
</base-demo>

```vue
<vue-splitter @splitter-click="onSplitterClick">
...
</vue-splitter>
```

## Styling

Classes are applied to the splitter container, panes and bar. 

`.vue-splitter` - The entire component.

`.vue-splitter.vertical` - When the splitter is in vertical mode.

`.vue-splitter.horizontal` - When the splitter is in horizontal mode.

`.splitter-pane` - Applied to both panes.

`.splitter-pane.left-pane` - Container for the left pane in vertical mode.

`.splitter-pane.top-pane` - Container for the top pane in horizontal mode.

`.splitter-pane.right-pane` - Container for the right pane in vertical mode.

`.splitter-pane.bottom-pane` - Container for the bottom pane in horizontal mode.

`.splitter` - The splitter bar itself.

`.splitter.active` - When the bar is being actively moved.

<base-demo v-model:percent="stylingCompPercent" class="styling" />
```scss
.styling.vue-splitter {
  .splitter {
    width: 30px;
    background: blue;
    &:hover {
      background: red;
    }
    &.active {
      background: green;
    }
  }
}
```

::: warning
Adding padding with a larger splitter bar will may cause layout issues. The above limits the panes to set [min widths](#min-width).
:::

## Helpers

Some props were removed from version 1 of VueSplitter to make the component more flexible. Here's how you can acheive the same result with more flexibility.

### Min Width

To set the minimum width of each pane, bind a computed property to the [percent](#percent) prop.

The below has been limited between 20% and 60%.

Percent: {{helpersMinWidthData.percent}}%

<base-demo v-model:percent="helpersMinWidthCompPercent" />

```vue
<template>
    <vue-splitter v-model:percent="limitedPercent" />
</template>
<script setup>
import { ref, computed } from 'vue'

const percent = ref(50)
const limitedPercent = computed({
  get() {
    return percent.value
  },
  set(val) {
    percent.value = Math.max(20, Math.min(60, val))
  }
})
</script>

```

### Reset on Click

To reset the bar on click, listen the [splitter-click](#splitter-click) event and react accordingly.

The below will reset to 50% when the splitter bar is clicked.

Percent: {{helpersResetOnClickData.percent}}%

<base-demo v-on:splitter-click="onHelpersResetOnClick" v-model:percent="helpersResetOnClickData.percent" />

```vue
<template>
    <vue-splitter 
      v-model:percent="percent" 
      @splitter-click="onSplitterClick"
    />
</template>
<script setup>
import { ref } from 'vue'

const percent = ref(25)

function onSplitterClick() {
  percent.value = 50
}
</script>

```