import mutations from '../mutations';

describe('mutations', () => {
  test('setItems sets state.items to items', () => {
    const items = [{id: 1}, {id: 2}] // Create items array to add to payload object
    const state = { // Fake state object
      items: []
    }
    mutations.setItems(state, { items }) // Call setItems with fake state and payload object
    expect(state.items).toBe(items)
  })
})
