// No longer need to import Vue, since using Vue Test Utils
import { mount, shallowMount } from '@vue/test-utils'
import Item from '../Item.vue'

describe('Item.vue', () => {
  test('renders "item"', () => {
    const wrapper = mount(Item) // Returns wrapper containing mounted Item
    expect(wrapper.text()).toContain('item') // Returns item text content, text is a helper method
  })
  test('renders "item" using shallowMount', () => {
    const wrapper = shallowMount(Item) // Stubs any children components and mounts Item, allows testing component in isolation
    expect(wrapper.text()).toContain('item')
  })
})

// Wrapper includes the Vue instance (vm) but also additional helper methods - e.g. to set props,
// check instance properties, perform actions on instance.
