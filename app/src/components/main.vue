<template>
  <div>
    <h1>Main Page</h1>
    <router-link :to="{ name: 'enter-request' }">Create request</router-link>
    <br>
    <router-link :to="{ name: 'requests-list' }">Requests list</router-link>
    <br>
    <router-link :to="{ name: 'user-page' }">Profile</router-link>
    <br>
    <router-link :to="{ name: 'percentage-request' }">Create percentage change request</router-link>
  </div>
</template>

<script>
  export default {
    name: "main",
    beforeCreate() {
      this.$store.dispatch('getMetamaskStatus').then(result => {
        if (!result) {
          this.$router.push({ name: 'download-metamask' });
        }
      });
    }
  }
</script>
