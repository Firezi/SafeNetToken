<template>
  <h1>Requests List</h1>
</template>

<script>
export default {
  name: "requests-list",
  beforeCreate() {
    console.log('getRequestsList Action dispatched');
    this.$store.dispatch('getRequestsList');
  },
}
</script>

<style scoped>

</style>
