import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

const localVue = createLocalVue() // Create a localVue constructor
localVue.use(Vuex) // Install Vuex on constructor

describe('ItemList.vue', () => {
  // Define variables that will be reassigned before each test
  let storeOptions
  let store

  beforeEach(() => {
    storeOptions = { // Reassign storeOptions before each test
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fin(() => Promise.resolve())
      }
    }
    store = new Vuex.Store(storeOptions) // Reassign as fresh store before each test
  })
})
