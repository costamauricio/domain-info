import Vue from 'vue'
import App from './components/App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)

new Vue({
  el: '#app',
  template: '<app/>',
  components: { App }
})
