import Vue from 'vue'
import App from './App'
import { fetchListData } from './api/api'

Vue.config.productionTip = false

fetchListData('top')
  .then((items) => { // Callback function w/items returned from fetchListData
    window.items = items
    new Vue({ // Mount app when data is added to window.items
      el: '#app',
      render: h => h(App)
    })
  })
