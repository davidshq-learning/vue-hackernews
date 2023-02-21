import { shallowMount } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

describe('ItemList.vue', () => {
  test('renders an Item with data for each item in window.items', () => {
    window.items = [{}, {}, {}] // Sets items data for component to use
    const wrapper = shallowMount(ItemList)
    const items = wrapper.findAll(Item) // Creates WrapperArray of Item components
    expect(items).toHaveLength(window.items.length)
    items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.props().item).toBe(window.items[i])
    })
  })
})
