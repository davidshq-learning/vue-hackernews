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
  test('renders a link to the item.url with item.title as text', () => {
    const item = { // Create a mock item to pass in as prop data
      title: 'some title'
    }
    const wrapper = shallowMount(Item, {
      propsData: { item } // Passes prop data
    })
    // Finds an <a> element and checks text rendered is item.title
    expect(wrapper.find('a').text()).toBe(item.title)
  })
})
