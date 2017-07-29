<template>
  <div id="app">
    <input type="text" v-model="domain" name="domain"/>
    <button type="button" name="button" v-on:click="lookup">Lookup</button>
    <div class="">
      {{ content }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      domain: '',
      content: ''
    }
  },
  methods: {
    lookup() {
      axios.get('api/domain/' + this.domain)
        .then((data) => {
          this.content = data.data
        })
        .catch((err) => {
          console.log('Error: ', err)
        })
    }
  }
}
</script>

<style lang="css" scoped>
#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
</style>
