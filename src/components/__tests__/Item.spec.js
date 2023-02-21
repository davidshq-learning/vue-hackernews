import { shallowMount } from '@vue/test-utils'
import Item from '../Item.vue'

describe('Item.vue', () => {
  test('renders item.url', () => {
    // Pass props to components in an options object
    const item = {
      url: 10
    }
    const wrapper = shallowMount(Item, {
      propsData: { item } // Passes item object as props to Item
    })
    // When testing that some text is rendered but doesn't matter where
    expect(wrapper.text()).toContain(item.url)
  })
})
