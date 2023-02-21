import { shallowMount } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

describe('ItemList.vue', () => {
  test('renders an Item for each item in window.items', () => {
    window.items = [{}, {}, {}] // Sets items data for component to use
    const wrapper = shallowMount(ItemList)
    // Use a WrapperArray length property to check an Item is rendered for each item in window.items.
    expect(wrapper.findAll(Item))
      .toHaveLength(window.items.length)
  })
})
