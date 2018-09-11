<template>
  <div>
    <h1>Percentage Request</h1>
    <p>Current value is {{ currentPercentage }} %</p>
    <b-form-group label="New Percentage:" label-for="request">
      <b-input-group append="%">
        <b-form-input id="request" v-model="requestPercentage"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-button variant="primary" :disabled="!isValid" v-on:click="transact()">Send Transaction</b-button>
  </div>
</template>

<script>
  export default {
    name: 'percentage-request',
    data: function() {
      return {
        currentPercentage: '',
        requestPercentage: ''
      }
    },
    beforeCreate() {
      this.$store.dispatch('getMetamaskStatus').then(result => {
        if (!result) {
          this.$router.push({ name: 'download-metamask' });
        }
      });
      this.$store.dispatch('getUser');
      this.$store.dispatch('getTreatiesContract').then(instance => {
        instance.methods.walletPercentage().call().then(result => {
          this.currentPercentage = result;
        })
      })
    },
    computed: {
      isValid() {
        return Number.isInteger(parseFloat(this.requestPercentage)) && this.requestPercentage >= 0 && this.requestPercentage <= 100;
      }
    },
    methods: {
      transact: function () {
        this.$store.state.treatiesContract().methods.createPercentageRequest(this.requestPercentage).send({
          from:this.$store.state.user.address
        });
      }
    }
  }
</script>
