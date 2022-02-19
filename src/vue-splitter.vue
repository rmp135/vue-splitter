<style lang="scss">
  .vue-splitter {
    display: grid;
    height: inherit;
    &.vertical {
      width: 100%;
      > .splitter {
        cursor: ew-resize;
        width: 5px;
      }
    }
    &.horizontal {
      height: 100%;
      > .splitter {
        cursor: ns-resize;
        height: 5px;
      }
    }
    .splitter {
      background-color: #9e9e9e;
    }
    .splitter-pane {
      overflow-y: auto;
    }
  }
</style>
<template>
  <div
    :style="{ userSelect, gridTemplate }"
    class="vue-splitter"
    :class="{ horizontal: isHorizontal, vertical: !isHorizontal }"
    ref="containerRef"
  >
    <div 
      class="splitter-pane"
      :class="leftPaneClass"
    >
      <slot name="left-pane"></slot>
      <slot name="top-pane"></slot>
    </div>
    <div
      class="splitter"
      :class="{ active: data.active }"
      @mousedown="onSplitterMouseDown"
      @touchstart.passive="onSplitterTouchDown"
      @click="onSplitterClick"
      ref="splitterRef"
    />
    <div 
      class="splitter-pane"
      :class="rightPaneClass">
      <slot name="right-pane"></slot>
      <slot name="bottom-pane"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  isHorizontal: {
    type: Boolean,
    default: false
  },
  percent: {
    default: undefined
  },
  initialPercent: {
    default:<number | string | null> null
  }
})

const emit = defineEmits<{
  (e: 'update:percent', val: number): void
  (e: 'splitter-click'): void
}>()

const containerRef = ref<HTMLElement>(null)
const splitterRef = ref<HTMLElement>(null)

const data = reactive({
  active: false,
  percent: 50,
  hasMoved: false,
  dragOffset: 0,
  /** Initial state of the touch-action property to reset after moving */
  initialTouchAction: ''
})

const modelPercent = computed<number>({
  get() {
    return props.percent || data.percent
  },
  set(value) {
    emit('update:percent', value)
    data.percent = value
  }
})

if (props.initialPercent) {
  modelPercent.value = Number(props.initialPercent)
}

const containerClass = computed(() => ({
  'user-select': data.active ? 'none' : 'auto',
  'horizontal': !props.isHorizontal
}))

const leftPaneClass = computed(() => props.isHorizontal ? 'top-pane' : 'left-pane')
const rightPaneClass = computed(() => props.isHorizontal ? 'bottom-pane' : 'right-pane')
const gridTemplate = computed(() => props.isHorizontal ? `${modelPercent.value}% auto 1fr / none` : `none / ${modelPercent.value}% auto 1fr`)
const userSelect = computed(() => data.active ? 'none' : 'auto')

function onSplitterClick() {
  if (!data.hasMoved) {
    emit('splitter-click')
  }
}

function onSplitterMouseDown(e: MouseEvent) {
  data.dragOffset = props.isHorizontal ? e.offsetY : e.offsetX
  onSplitterDown()
}

function onSplitterTouchDown(e: TouchEvent) {
  data.dragOffset = 0
  onSplitterDown()
}

function onSplitterDown() {
  data.active = true
  data.hasMoved = false
  addBodyListeners()
}

function addBodyListeners() {
  document.body.addEventListener('mousemove', onBodyMouseMove)
  document.body.addEventListener('touchmove', onBodyTouchMove)
  document.body.addEventListener('touchend', onBodyUp, { once: true })
  document.body.addEventListener('mouseup', onBodyUp, { once: true })
}

function onBodyTouchMove(e: TouchEvent) {
  if (data.active) {
    calculateSplitterPercent(e.touches[0])
  }
}

function onBodyMouseMove(e: MouseEvent) {
  if (e.buttons && e.buttons === 0) {
    data.active = false
    removeBodyListeners()
  }
  if (data.active) {
    calculateSplitterPercent(e)
  }
}

function calculateSplitterPercent(e: MouseEvent | Touch) {
  let offset = data.dragOffset
  let target = containerRef.value
  let percent = 0
  if (props.isHorizontal) {
    offset += target.offsetTop
    while (target.offsetParent) {
      target = target.offsetParent as HTMLElement
      offset += target.offsetTop
    }
    percent =  Math.floor(((e.pageY - offset) / containerRef.value.offsetHeight)*10000)/100
  } else {
    offset += target.offsetLeft
    while (target.offsetParent) {
      target = target.offsetParent as HTMLElement
      offset += target.offsetLeft
    }
    percent =  Math.floor(((e.pageX - offset) / containerRef.value.offsetWidth)*10000)/100
  }
  if (percent > 0 && percent < 100) {
    modelPercent.value = percent
    data.hasMoved = true
  }
}

function onBodyUp() {
  data.active = false
  removeBodyListeners()
}

function removeBodyListeners() {
  document.body.removeEventListener('touchmove', onBodyTouchMove)
  document.body.removeEventListener('mousemove', onBodyMouseMove)
}

</script>
