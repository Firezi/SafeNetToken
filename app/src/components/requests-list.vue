<template>
  <div>
    <h1>Requests List</h1>
    <ul>
      <li v-for="request in $store.state.requestsList">
        <div>
          <router-link :to="{ name: 'request', params: {requestId: request.id} }">Request #{{ request.id }}</router-link>
          <p>{{ types[request.rType] }}</p>
          <p>{{ request.beneficiary }}</p>
          <p v-if="request.rType < 4">{{ (request.tokensAmount / 10**18).toFixed(2) }} SNT</p>
          <p v-if="request.rType == 4">{{ request.percentage }}%</p>
          <p v-if="request.rType == 2"> {{ (request.ethAmount / 10**18).toFixed(3) }} Eth</p>
          <p>{{ status[request.isConfirmed] }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "requests-list",
  data: function () {
    return {
      types: [
        'Owner',
        'Team',
        'Eth investor',
        'Fiat investor ',
        'Percentage change'
      ],
      status: [
        'Not confirmed',
        'Declined by Investor',
        'Confirmed'
      ]
    }
  },
  beforeCreate() {
    this.$store.dispatch('getRequestsList');
  },
}
</script>
