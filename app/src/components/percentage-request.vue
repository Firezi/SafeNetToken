<template>
  <div>
    <h1>Percentage Request</h1>
    <p>Current value is {{ currentPercentage }} %</p>
    <label for="request">SNT tokens amount:</label>
    <input v-model="requestPercentage" id="request"> <span>%</span>
    <p><button :disabled=!isValid v-on:click="transact()">Send Transaction</button></p>
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
