import Item from '../Item.vue'
import Vue from 'vue'

// Without using Vue Test Utils, involves boilerplate

describe('Item.vue', () => {
  test('renders "item"', () => {
    // Ctor = constructor
    const Ctor = Vue.extend(Item) // Create a Vue constructor from the options
    // Create an instance, convention is to refer to Vue instance as vm
    // Explicitly call $mount method because we don't have an el option in constructor so it doesn't auto mount
    const vm = new Ctor().$mount()
    // Vue generates DOM nodes, accessible with $el property
    expect(vm.$el.textContent).toContain('item')
  })
})
