// No longer need to import Vue, since using Vue Test Utils
import { mount } from '@vue/test-utils'
import Item from '../Item.vue'

describe('Item.vue', () => {
  test('renders "item"', () => {
    const wrapper = mount(Item) // Returns wrapper containing mounted Item
    expect(wrapper.text()).toContain('item') // Returns item text content, text is a helper method
  })
})

// Wrapper includes the Vue instance (vm) but also additional helper methods - e.g. to set props,
// check instance properties, perform actions on instance.
