<template>
  <div>
    <h1>Requests List</h1>
    <div v-for="request in $store.state.requestsList">
      <b-card class="mb-3" header-bg-variant="light" :header="types[request.rType]">
        <b-row class="mb-1">
          <b-col cols="auto" class="mr-auto">Request №{{ request.id }}</b-col>
          <b-col cols="auto">{{ request.beneficiary }}</b-col>
        </b-row>
        <div class="mb-1" v-if="request.rType < 4">{{ (request.tokensAmount / 10**18).toFixed(2) }} SNT</div>
        <div class="mb-1" v-if="request.rType == 4">{{ request.percentage }}%</div>
        <div class="mb-1" v-if="request.rType == 2"> {{ (request.ethAmount / 10**18).toFixed(3) }} Eth</div>
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
      ],
      badge: [
        'warning',
        'danger',
        'success'
      ]
    }
  },
  beforeCreate() {
    this.$store.dispatch('getMetamaskStatus').then(result => {
      if (!result) {
        this.$router.push({ name: 'download-metamask' });
      }
    });
    this.$store.dispatch('getRequestsList');
  },
}
</script>
