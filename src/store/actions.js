import { fetchListData } from '../api/api'

export default {
  fetchListData ({ commit }, { type }) {
    return fetchListData(type) // Returns promise so action can be used in a promise chain
      .then(items => {
        commit('setItems', { items })
      })
  }
}
