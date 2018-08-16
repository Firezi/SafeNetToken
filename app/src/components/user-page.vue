<template>
  <div>
    <h1>Profile Info</h1>
    <p>Address: {{ $store.state.user.address }}</p>
    <p>Group: {{ groups[$store.state.user.group] }}.</p>
    <p>Balance: {{ getBalance }} SNT.</p>
  </div>
</template>

<script>
  export default {
    name: "user-page",
    beforeCreate() {
      this.$store.dispatch('getUser');
    },
    data: function () {
      return {
        groups: [
          'NoGroup',
          'Owner',
          'Team',
          'Investor'
        ]
      }
    },
    computed: {
      getBalance() {
        return this.$store.state.user.balance / (10 ** 18);
      }
    }
  }
</script>

