import { shallowMount } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import flushPromises from 'flush-promises'
import { fetchListData } from '../../api/api'
jest.mock('../../api/api.js')

describe('ItemList.vue', () => {
  test('renders an Item with data for each item', async () => {
    expect.assertions(4) // Defines for assertions, test fails if a promise is rejected
    const $bar = { // Add $bar mock
      start: () => {},
      finish: () => {}
    }
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    fetchListData.mockResolvedValueOnce(items) // Resolves with the items array
    const wrapper = shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises() // Wait for all promise callbacks to run
    const Items = wrapper.findAll(Item)
    expect(Items).toHaveLength(items.length)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on load', () => {
    // Create a fake $bar object
    const $bar = {
      start: jest.fn(), // Create a jest mock
      finish: () => {}
    }
    shallowMount(ItemList, { mocks: { $bar } }) // Make $bar available as this.$bar in ItemList
    expect($bar.start).toHaveBeenCalledWith() // Check if $bar.start was called
  })

  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      finish: jest.fn()
    }

    shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()

    expect($bar.finish).toHaveBeenCalled()
  })

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      fail: jest.fn()
    }
    fetchListData.mockRejectedValueOnce() // Rejects when fetchListData is called so we can test error case
    shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()

    expect($bar.fail).toHaveBeenCalled()
  })
})
