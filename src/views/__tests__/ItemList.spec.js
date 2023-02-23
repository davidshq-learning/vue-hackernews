import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import mergeWith from 'lodash.mergewith'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ItemList.vue', () => {
  function customizer (objValue, srcValue) {
    // If property is an array, overwrite value rather than merging
    if (Array.isArray(srcValue)) {
      return srcValue
    }
    // If property is an empty object, overwrite with an empty object
    if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
      return srcValue
    }
  }

  function createStore (overrides) {
    const defaultStoreConfig = {
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    }
    return new Vuex.Store(defaultStoreConfig, overrides, customizer)
  }

  function createWrapper (overrides) {
    const defaultMountingOptions = {
      mocks: {
        $bar: {
          start: jest.fn(),
          finish: jest.fn(),
          fail: jest.fn()
        }
      },
      localVue,
      store: createStore()
    }
    return shallowMount(
      ItemList,
      mergeWith(
        defaultMountingOptions,
        overrides,
        customizer
      )
    )
  }

  test('renders an Item with data for each item in displayItems', () => {
    const items = [{}, {}, {}] // Mock items
    const store = createStore({ // Create store with mock items
      getters: {
        displayItems: () => items
      }
    })
    const wrapper = createWrapper({ store })
    const Items = wrapper.findAll(Item)
    expect(Items).toHaveLength(items.length)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on render', () => {
    const mocks = {
      $bar: {
        start: jest.fn()
      }
    }
    createWrapper({ mocks }) // No need to assign to a variable
    expect(mocks.$bar.start).toHaveBeenCalled()
  })

  test('calls $bar finish when load successful', async () => {
    const mocks = {
      $bar: {
        finish: jest.fn()
      }
    }
    createWrapper({ mocks })
    await flushPromises()
    expect(mocks.$bar.finish).toHaveBeenCalled()
  })

  test('dispatches fetchListData with top', async () => {
    const store = createStore()
    store.dispatch = jest.fn(() => Promise.resolve())
    createWrapper({ store })
    await flushPromises()
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
      type: 'top' })
  })

  test('calls $bar fail when fetchListData throws', async () => {
    const store = createStore({
      actions: { fetchListData: jest.fn(() => Promise.reject()) }
    })
    const mocks = {
      $bar: {
        fail: jest.fn()
      }
    }
    createWrapper({ mocks, store })
    await flushPromises()
    expect(mocks.$bar.fail).toHaveBeenCalled()
  })
})
