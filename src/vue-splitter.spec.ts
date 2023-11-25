import { expect, test } from 'vitest'
import splitter from './vue-splitter.vue'
import { mount } from '@vue/test-utils'

test('isHorizontal false style', async () => {
  const comp = mount(splitter);
  const elDragger = comp.get('.vue-splitter')
  const splitters = comp.findAll('.splitter-pane')
  const leftPane = splitters[0]
  const rightPane = splitters[1]
  expect(leftPane.classes('left-pane')).toBe(true)
  expect(rightPane.classes('right-pane')).toBe(true)
  expect(elDragger.classes('vertical')).toBe(true)
  expect(elDragger.classes('horizontal')).toBe(false)
  const style = elDragger.attributes('style')
  expect(style.includes('user-select: auto')).toBe(true)
  expect(style.includes('grid-template: none / 50% auto 1fr')).toBe(true)
})

test('isHorizontal true style', async () => {
  const comp = mount(splitter, { props: { isHorizontal: true } });
  const elDragger = comp.get('.vue-splitter')
  const splitters = comp.findAll('.splitter-pane')
  const leftPane = splitters[0]
  const rightPane = splitters[1]
  expect(leftPane.classes('top-pane')).toBe(true)
  expect(rightPane.classes('bottom-pane')).toBe(true)
  expect(elDragger.classes('vertical')).toBe(false)
  expect(elDragger.classes('horizontal')).toBe(true)
  const style = elDragger.attributes('style')
  expect(style.includes('user-select: auto')).toBe(true)
  expect(style.includes('grid-template: 50% auto 1fr / none')).toBe(true)
})

test('splitter-click event on click', async () => {
  const comp = mount(splitter, { props: { isHorizontal: false } });
  const elDragger = comp.get('.splitter')
  await elDragger.trigger('click')
  expect(comp.emitted('splitter-click')).length(1)
})

test('moving the splitter should set the class to active', async () => {
  const comp = mount(splitter)
  const elDragger = comp.get('.splitter')
  expect(elDragger.classes('active')).toBe(false)
  await elDragger.trigger('mousedown')
  expect(elDragger.classes('active')).toBe(true)
})

