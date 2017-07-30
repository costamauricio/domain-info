<template>
  <md-whiteframe class="raw-data">
    <md-subheader class="md-primary">WHOIS</md-subheader>
    <pre>
      <slot></slot>
    </pre>
  </md-whiteframe>
</template>

<script>
export default {
  name: 'whois'
}
</script>

<style lang="css" scoped>
.raw-data {
  color: rgb(243, 243, 243);
  background: #000;
  padding: 0.8em;
  overflow: auto;
  margin: 0.5em 0;
}
</style>
