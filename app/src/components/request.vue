<template>
  <div>
    <h1>Request №{{ $route.params.requestId }}</h1>
    <b-row class="mb-1">
      <b-col class="deskr" cols="1">Type:</b-col>
      <b-col><strong>{{ types[$store.state.request.rType] }}</strong></b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="deskr" cols="1">Address:</b-col>
      <b-col>{{ $store.state.request.beneficiary }}</b-col>
    </b-row>
    <b-row v-if="$store.state.request.rType < 4" class="mb-1">
      <b-col class="deskr" cols="1">Tokens:</b-col>
      <b-col>{{ ($store.state.request.tokensAmount / 10**18).toFixed(2) }} SNT</b-col>
    </b-row>
    <b-row v-if="$store.state.request.rType == 2" class="mb-1">
      <b-col class="deskr" cols="1">Eth amount:</b-col>
      <b-col>{{ ($store.state.request.ethAmount / 10**18).toFixed(3) }} Eth</b-col>
    </b-row>
    <b-row v-if="$store.state.request.rType == 4" class="mb-1">
      <b-col class="deskr" cols="1">Percentage:</b-col>
      <b-col>{{ $store.state.request.percentage }}%</b-col>
    </b-row>
    <b-row v-if="$store.state.request.rType < 2" class="mb-1">
      <b-col class="deskr" cols="1">Treaty text:</b-col>
      <b-col>
        <b-card v-if="$store.state.request.rType < 2" body-bg-variant="light" class="mb-2" style="width: auto;">
          <pre >{{ treatyText }}</pre>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="deskr" cols="1">Status:</b-col>
      <b-col><h5><b-badge :variant="badge[$store.state.request.isConfirmed]">{{ status[$store.state.request.isConfirmed] }}</b-badge></h5></b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="deskr" cols="1">Confirmed:</b-col>
      <b-col>{{ ($store.state.request.tokensConfirmed / 10**18).toFixed(2) + ' / ' +  ($store.state.request.tokensInOwners / 10**18).toFixed(2) + ' SNT'}}</b-col>
    </b-row>
    <b-progress v-if="$store.state.request.isConfirmed == 0" :value="confirmedTokens" :max="tokensToConfirm" class="mb-4" striped animated>

    </b-progress>
    <b-button v-if="rejectButton" variant="danger" v-on:click="rejectRequest()">Reject confirmation</b-button>
    <b-button v-if="acceptButton" variant="success" v-on:click="acceptRequest()">Confirm</b-button>
    <b-button v-if="removeButton" variant="secondary" v-on:click="removeRequest()">Remove request and return funds</b-button>
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
          'Fiat investor ',
          'Percentage change'
        ],
        status: [
          'Not confirmed',
          'Declined by Investor',
          'Confirmed'
        ],
        treatyText: 'Loading...',
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
    computed: {
      acceptButton () {
        return this.$store.state.user.group == 1 && this.$store.state.request.isConfirmed == 0 && !this.$store.state.request.isConfirmedByUser;
      },
      rejectButton () {
        return this.$store.state.user.group == 1 && this.$store.state.request.isConfirmed == 0 && this.$store.state.request.isConfirmedByUser;
      },
      removeButton () {
        return this.$store.state.request.rType == 2 && this.$store.state.request.isConfirmed == 0
          && this.$store.state.request.beneficiary.toLowerCase() == this.$store.state.user.address.toLowerCase();
      },
      confirmedTokens () {
        return this.$store.state.request.tokensConfirmed / 10**18;
      },
      tokensToConfirm () {
        return this.$store.state.request.tokensInOwners / 10**18 / 2;
      }
    },
    methods: {
      acceptRequest: function () {
        this.$store.state.treatiesContract().methods.confirmRequest(this.$store.state.request.id).send({
          from: this.$store.state.user.address
        });
      },
      rejectRequest: function () {
        this.$store.state.treatiesContract().methods.rejectRequest(this.$store.state.request.id).send({
          from: this.$store.state.user.address
        });
      },
      removeRequest: function() {
        this.$store.state.treatiesContract().methods.removeEthInvestorRequest(this.$store.state.request.id).send({
          from: this.$store.state.user.address
        });
      }
    }
  }
</script>

<style>
  .deskr {
    white-space: nowrap;
    color: gray;
  }
</style>
