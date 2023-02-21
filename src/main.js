import Vue from 'vue'
import App from './App'
import ProgressBar from './components/ProgressBar'

Vue.config.productionTip = false

const bar = new Vue(ProgressBar).$mount() // Create a mounted ProgressBar instance
Vue.prototype.$bar = bar // Add to the abse Vue contructor prototype
document.body.appendChild(bar.$el) // Append to the DOM

new Vue({
  el: '#app',
  render: h => h(App)
})
