<template>
  <div>
    <h1>Request #{{ $route.params.requestId }}</h1>
      <h4>{{ types[$store.state.request.rType] }}</h4>
      <p>{{ $store.state.request.beneficiary }}</p>
      <p>{{ ($store.state.request.tokensAmount / 10**18).toFixed(2) }} SNT</p>
      <p v-if="$store.state.request.rType == 2"> {{ ($store.state.request.ethAmount / 10**18).toFixed(3) }} Eth</p>
      <p v-if="$store.state.request.rType < 2">Treaty: {{ $store.state.request.treatyHash }}</p>
      <p>{{ $store.state.request.isConfirmed == 2 ? 'Confirmed' : 'Not confirmed' }}</p>
      <p>ConfirmedTokens: {{ ($store.state.request.tokensConfirmed / 10**18).toFixed(2) + ' / ' +  ($store.state.request.tokensInOwners / 10**18).toFixed(2) + ' SNT'}}</p>
      <button v-if="$store.state.request.isConfirmed == 0" v-on:click="transact()">Confirm</button>
  </div>
</template>

<script>
  export default {
    name: "request",
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
      this.$store.dispatch('registerWeb3Action');
      this.$store.dispatch('getRequestAction', this.$route.params.requestId);
      this.$store.dispatch('getContractInstanceAction');
    },
    methods: {
      transact: function () {
        this.$store.state.contractInstance().methods.confirmRequest(this.$store.state.request.id).send({
          from:this.$store.state.web3.coinbase
        });
      }
    }
  }
</script>
