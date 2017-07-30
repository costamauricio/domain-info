<template>
  <div id="app">
    <md-layout md-flex md-column>

      <md-layout md-flex md-row md-align="center">
        <md-layout
          md-flex
          md-column
          md-flex-small="100"
          md-flex-xsmall="100"
          md-flex-medium="80"
          md-flex-large="50"
          md-flex-xlarge="33"
          >
          <md-whiteframe class="frame">
            <form novalidate @submit.stop.prevent="lookup">
              <md-input-container>
                <label>Domínio ou IP (v4, v6)</label>
                <md-input
                  v-model="domain"
                  name="domain"
                ></md-input>
              </md-input-container>
              <md-layout md-align="end">
                <md-button class="md-raised md-primary" v-on:click="lookup">Buscar</md-button>
              </md-layout>
            </form>
          </md-whiteframe>
        </md-layout>
      </md-layout>
      {{ error }}
      <md-layout md-flex md-row md-align="center">
        <md-layout
            md-flex
            md-column
            md-flex-small="100"
            md-flex-xsmall="100"
            md-flex-medium="100"
            md-flex-large="80"
            md-flex-xlarge="70"
            v-if="content && content.domain"
          >

          <md-whiteframe class="frame info" v-if="content.domain.name">
            <div v-if="content.domain">
              <span class="md-display-1">Domínio:</span>
              <span class="md-title">{{ content.domain.name }}</span>
            </div>
            <div v-if="content.dns && content.dns.A">
              <span class="md-display-1">IPv4:</span>
              <span class="md-title">{{ joinItems(content.dns.A) }}</span>
            </div>
            <div v-if="content.dns && content.dns.AAAA">
              <span class="md-display-1">IPv6:</span>
              <span class="md-title">{{ joinItems(content.dns.AAAA) }}</span>
            </div>
            <div v-if="content.dns && content.dns.NS">
              <span class="md-display-1">Name Servers:</span>
              <span class="md-title">{{ joinItems(content.dns.NS) }}</span>
            </div>
          </md-whiteframe>

          <whois>{{ content.domain.raw }}</whois>

        </md-layout>
      </md-layout>

      <md-layout md-flex md-row md-align="center">
        <md-layout
            md-flex
            md-column
            md-flex-small="100"
            md-flex-xsmall="100"
            md-flex-medium="100"
            md-flex-large="80"
            md-flex-xlarge="70"
            v-if="content && content.ip"
          >
            <md-layout md-flex md-column>
              <whois>{{ content.ip }}</whois>
            </md-layout>
        </md-layout>
      </md-layout>

    </md-layout>
    <div id="spinner" v-if="loading">
      <md-spinner md-indeterminate></md-spinner>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import whois from './WhoisRawData'

export default {
  name: 'app',
  components: {
    'whois': whois
  },
  data() {
    return {
      domain: '',
      content: null,
      loading: false,
      error: null
    }
  },
  methods: {
    lookup() {

      let endpoint = 'domain'

      if (this.domain.match(/^((\d{1,3}\.){3}\d{1,3}|([a-f0-9A-F]{0,4}\:){1,7}([a-f0-9A-F]{0,4})?)$/))
        endpoint = 'ip'

      this.loading = true
      this.error = null

      axios.get('api/' + endpoint + '/' + this.domain)
        .then((data) => {
          this.content = data.data
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          this.content = null
          this.error = 'Erro ao buscar informações do domínio'
        })
    },
    joinItems(prop) {
      return prop.join(', ');
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
  background: rgb(243, 243, 243);
  padding: 1em;
}

#spinner {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  background: black;
  z-index: 99;
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.frame {
  background: white;
  padding: 1em;
}

.frame.info {
  margin: 0.5em 0;
}
</style>
