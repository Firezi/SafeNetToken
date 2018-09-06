<template>
  <div>
    <h1>Profile Info</h1>
    <p>Address: {{ $store.state.user.address }}</p>
    <p>Group: {{ groups[$store.state.user.group] }}.</p>
    <p>Balance: {{ getBalance }} SNT.</p>
    <h2>Your requests:</h2>
    <ul>
      <li v-for="request in $store.state.requestsList">
        <div>
          <router-link :to="{ name: 'request', params: {requestId: request.id} }">Request #{{ request.id }}</router-link>
          <p>{{ types[request.rType] }}</p>
          <p>{{ request.beneficiary }}</p>
          <p>{{ (request.tokensAmount / 10**18).toFixed(2) }} SNT</p>
          <p v-if="request.rType == 2"> {{ (request.ethAmount / 10**18).toFixed(3) }} Eth</p>
          <p>{{ status[request.isConfirmed] }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "user-page",
    beforeCreate() {
      this.$store.dispatch('getMetamaskStatus').then(result => {
        if (!result) {
          this.$router.push({ name: 'download-metamask' });
        }
      });
      this.$store.dispatch('getUser').then((user) => {
        this.$store.dispatch('getRequestsList', user.address);
      });
    },
    data: function () {
      return {
        groups: [
          'NoGroup',
          'Owner',
          'Team',
          'Investor'
        ],
        types: [
          'Owner',
          'Team',
          'Eth investor',
          'Fiat investor '
        ],
        status: [
          'Not confirmed',
          'Declined by Investor',
          'Confirmed'
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

