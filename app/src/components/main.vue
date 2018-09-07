<template>
  <div>
    <h1>SafeNet Cooperation</h1>
    <h3>Welcome!</h3>
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
