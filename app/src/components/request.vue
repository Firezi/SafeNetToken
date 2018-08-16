<template>
  <div>
    <h1>Request #{{ $route.params.requestId }}</h1>
    <h4>{{ types[$store.state.request.rType] }}</h4>
    <p>{{ $store.state.request.beneficiary }}</p>
    <p>{{ ($store.state.request.tokensAmount / 10**18).toFixed(2) }} SNT</p>
    <p v-if="$store.state.request.rType == 2"> {{ ($store.state.request.ethAmount / 10**18).toFixed(3) }} Eth</p>
    <pre v-if="$store.state.request.rType < 2">{{ treatyText }}</pre>
    <p>{{ $store.state.request.isConfirmed == 2 ? 'Confirmed' : 'Not confirmed' }}</p>
    <p>ConfirmedTokens: {{ ($store.state.request.tokensConfirmed / 10**18).toFixed(2) + ' / ' +  ($store.state.request.tokensInOwners / 10**18).toFixed(2) + ' SNT'}}</p>
    <button v-if="$store.state.request.isConfirmed == 0" v-on:click="transact()">Confirm</button>
  </div>
</template>

<script>
import ipfs from '../ipfs.js'
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
        treatyText: 'Loading...'
      }
    },
    beforeCreate() {
      this.$store.dispatch('getUser');
      let comp = this;
      this.$store.dispatch('getRequest', this.$route.params.requestId).then((res) => {
        if (res.rType == 0 || res.rType == 1) {
          ipfs.cat(this.$store.state.request.treatyHash, function(error, file) {
            if (error || !file) {
              console.log(error);
            } else {
              comp.treatyText = file.toString('utf8');
            }
          })
        }
      });
      this.$store.dispatch('getTreatiesContract');
    },
    methods: {
      transact: function () {
        this.$store.state.contractInstance.methods.confirmRequest(this.$store.state.request.id).send({
          from: this.$store.state.user.address
        });
      }
    }
  }
</script>
