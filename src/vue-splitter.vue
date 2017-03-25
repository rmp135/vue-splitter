<template>
  <div :style="{ cursor, userSelect }" class="vue-splitter" @mouseup="onUp" @mousemove="onMouseMove" @touchmove="onMove" @touchend="onUp">
    <div :style="{ width: percent+'%' }" class="left-pane splitter-pane">
      <slot name="left-pane"></slot>
    </div>
    <div class="splitter" :class="{active}" @mousedown="onDown" @click="onClick" @touchstart.prevent="onDown"></div>
    <div :style="{ width: 100-percent+'%'}" class="right-pane splitter-pane">
      <slot name="right-pane"></slot>
    </div>
  </div>
</template>
<style lang="scss">
  .vue-splitter {
    height: inherit;
    display: flex;
    .splitter-pane {
      height: inherit;
    }
    .splitter {
      width: 5px;
      background-color: #9e9e9e;
      cursor: ew-resize;
    }
  }
</style>
<script>
  export default {
    props: {
      margin: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        active: false,
        percent: 50,
        hasMoved: false
      }
    },
    computed: {
      userSelect () { return this.active ? 'none' : '' },
      cursor () { return this.active ? 'ew-resize' : '' },
    },
    methods: {
      onClick () {
        if (!this.hasMoved) {
          this.percent = 50;
          this.$emit('resize');
        }
      },
      onDown (e) {
        this.active = true;
        this.hasMoved = false;
      },
      onUp () {
        this.active = false;
      },
      onMove (e) {
        if (this.active) {
          let offset = 0;
          let target = e.currentTarget;
          while (target) {
            offset += target.offsetLeft;
            target = target.offsetParent;
          }
          const percent =  Math.floor(((e.pageX - offset) / e.currentTarget.offsetWidth)*10000)/100;
          if (percent > this.margin && percent < 100 - this.margin) {
            this.percent = percent;
          }
          this.$emit('resize');
          this.hasMoved = true;
        }
      },
      onMouseMove (e) {
        if (e.buttons === 0 || e.which === 0) {
          this.active = false;
        }
        this.onMove(e);
      }
    }
  }
</script>
