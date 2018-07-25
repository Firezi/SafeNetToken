<template>
  <div>
    <h1>Requests List</h1>
    <ul>
      <li v-for="request in $store.state.requestsList">
        <div>
          <h3>Request #{{ request.id }}</h3>
          <h4>{{ types[request.rType] }}</h4>
          <p>{{ request.beneficiary }}</p>
          <p>{{ (request.tokensAmount / 10**18).toFixed(2) }} SNT</p>
          <p v-if="request.rType == 2"> {{ (request.ethAmount / 10**18).toFixed(3) }} Eth</p>
          <p v-if="request.rType < 2">Treaty: {{ request.treatyHash }}</p>
          <p>{{ request.isConfirmed == 1 ? 'Confirmed' : 'Not confirmed' }}</p>
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
        'Fiat investor '
      ],
    }
  },
  beforeCreate() {
    console.log('getRequestsList Action dispatched');
    this.$store.dispatch('getRequestsList');
  },
}
</script>
