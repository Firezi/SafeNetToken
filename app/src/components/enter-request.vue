<template>
  <div>
    <h1>Create Request</h1>
    <b-form-group>
      <b-form-select v-model="selectedType">
        <option v-for="type in types" v-bind:value="type.value">
          {{ type.text }}
        </option>
      </b-form-select>
    </b-form-group>
    <b-form-group v-if="selectedType > 0" label="SNT tokens amount:" label-for="tokensAmount">
      <b-input-group append="SNT">
        <b-form-input id="tokensAmount" v-model="tokensAmount" placeholder="100.0"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-form-group v-if="selectedType == 3" label="Eth amount:" label-for="ethAmount">
      <b-input-group append="ETH">
        <b-form-input id="ethAmount" v-model="ethAmount" placeholder="100.0"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-form-group v-if="selectedType == 1 || selectedType == 2" label="Treaty text:" label-for="treatyText">
      <b-form-textarea id="treatyText" v-model="treatyText" :rows="4" placeholder="Enter here"></b-form-textarea>
    </b-form-group>
    <b-button variant="primary" v-if="selectedType > 0" :disabled="!isValid" v-on:click="transact()">
      Send Transaction
    </b-button>
  </div>
</template>

<script>
import ipfs from '../ipfs.js'
export default {
  name: 'enter-request',
  data: function () {
    return {
      selectedType: 0,
      types: [
        {text: 'Please select a role', value: 0},
        {text: 'Owner', value: 1},
        {text: 'Team', value: 2},
        {text: 'Eth investor', value: 3},
        {text: 'Fiat investor ', value: 4},
      ],
      tokensAmount: '',
      ethAmount: '',
      treatyText: '',
      showSuccess: false
    }
  },
  beforeCreate() {
    this.$store.dispatch('getMetamaskStatus').then(result => {
      if (!result) {
        this.$router.push({ name: 'download-metamask' });
      }
    });
    this.$store.dispatch('getUser');
    this.$store.dispatch('getTreatiesContract');
  },
  computed: {
    isValid() {
      if (this.selectedType === 1 || this.selectedType === 2) {
        return this.tokensAmount && this.treatyText;
      }
      if (this.selectedType === 3) {
        return this.tokensAmount && this.ethAmount;
      }
      if (this.selectedType === 4) {
        return this.tokensAmount;
      }
      return false;
    }
  },
  methods: {
    transact: function () {
      let tokensWei = (this.tokensAmount * 10 ** 9).toString() + "000000000";
      if (this.selectedType === 1 || this.selectedType === 2) {
        console.log('waiting...');
        ipfs.add(Buffer(this.treatyText), { onlyHash: true }, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log('ipfsHash:', result[0].hash);
            this.$store.state.treatiesContract().methods.createTreatyRequest(this.selectedType - 1, result[0].hash, tokensWei).send({
              from:this.$store.state.user.address
            });
            let text = this.treatyText;
            this.clear();
            ipfs.add(Buffer(text));
          }
        })
      }
      if (this.selectedType === 3) {
        let wei = (this.ethAmount * 10 ** 9).toString() + "000000000";
        this.$store.state.treatiesContract().methods.createEthInvestorRequest(tokensWei).send({
          from:this.$store.state.user.address,
          value: wei
        });
        this.clear();
      }
      if (this.selectedType === 4) {
        this.$store.state.treatiesContract().methods.createFiatInvestorRequest(tokensWei).send({
          from:this.$store.state.user.address
        });
        this.clear();
      }
    },
    clear: function () {
      this.selectedType = 0;
      this.tokensAmount = '';
      this.ethAmount = '';
      this.treatyText = '';
    }
  }
}
</script>
