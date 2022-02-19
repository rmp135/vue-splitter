<template>
  <base-demo
  >
    <template #left-pane>
      {{lorumipsum}}
    </template>
    <template #right-pane>
      <vue-splitter
        class="container"
        :is-horizontal="true"
      >
        <template #top-pane>
          <div>{{lorumipsum}}</div>
        </template>
        <template #bottom-pane>
          <div>{{lorumipsum}}</div>
        </template>
      </vue-splitter>
    </template>
  </base-demo>
</template>
<script setup lang="ts">
import VueSplitter from '../src/vue-splitter.vue'
import BaseDemo from './BaseDemo.vue'
import { GenLorum } from './Helpers'

const lorumipsum = GenLorum()
</script>