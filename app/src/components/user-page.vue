<template>
  <div>
    <h1>Profile Info</h1>
    <p>Address: {{ $store.state.user.address }}</p>
    <p>Group: {{ groups[$store.state.user.group] }}.</p>
    <p>Balance: {{ getBalance }} SNT.</p>
    <h2>Your requests:</h2>
    <div v-for="request in $store.state.requestsList">
      <b-card class="mb-3" header-bg-variant="light" :header="types[request.rType]">
        <b-row class="mb-1">
          <b-col cols="auto" class="mr-auto">Request №{{ request.id }}</b-col>
          <b-col cols="auto">{{ request.beneficiary }}</b-col>
        </b-row>
        <b-row class="mb-1" v-if="request.rType < 4">
          <b-col cols="1" class="deskr">Tokens:</b-col>
          <b-col>{{ (request.tokensAmount / 10**18).toFixed(2) }} SNT</b-col>
        </b-row>
        <b-row class="mb-1" v-if="request.rType == 4">
          <b-col cols="1" class="deskr">Percentage:</b-col>
          <b-col>{{ request.percentage }}%</b-col>
        </b-row>
        <b-row class="mb-1" v-if="request.rType == 2">
          <b-col cols="1" class="deskr">Eth amount:</b-col>
          <b-col>{{ (request.ethAmount / 10**18).toFixed(3) }} Eth</b-col>
        </b-row>
        <!--<div class="mb-1" v-if="request.rType == 4">{{ request.percentage }}%</div>-->
        <!--<div class="mb-1" v-if="request.rType == 2"> {{ (request.ethAmount / 10**18).toFixed(3) }} Eth</div>-->
        <b-row>
          <b-col cols="auto" class="mr-auto">
            <b-button :to="{ name: 'request', params: {requestId: request.id} }" variant="primary">Go to request</b-button>
          </b-col>
          <b-col cols="auto">
            <h5><b-badge :variant="badge[request.isConfirmed]">{{ status[request.isConfirmed] }}</b-badge></h5>
          </b-col>
        </b-row>

      </b-card>
    </div>
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
        ],
        badge: [
          'warning',
          'danger',
          'success'
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

<style>
  .deskr {
    color: gray;
  }
</style>
