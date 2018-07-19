<template>
  <div>
    <form id="createRequestForm">
      <p>Choose the role:</p>
      <select v-model="selectedType">
        <option v-for="type in types" v-bind:value="type.value">
          {{ type.text }}
        </option>
      </select>
      <p v-if="selectedType > 0">
        <label for="tokensAmount">SNT tokens amount:</label>
        <input v-model="tokensAmount" id="tokensAmount" placeholder="100.0"> <span>SNT</span>
      </p>
      <p v-if="selectedType === 3">
        <label for="ethAmount">Eth amount:</label>
        <input v-model="ethAmount" id="ethAmount" placeholder="100.0"> <span>ETH</span>
      </p>
      <p v-if="selectedType === 1 || selectedType === 2">
        <label for="treatyText">Text of the treaty:</label>
        <textarea v-model="treatyText" id="treatyText" placeholder="Enter here"></textarea>
      </p>
      <p v-if="selectedType > 0">
        <button :disabled=!isValid v-on:click="transact()">Send Transaction</button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'snt-request',
  data: function () {
    return {
      selectedType: 0,
      types: [
        {text: 'Owner', value: 1},
        {text: 'Team', value: 2},
        {text: 'Eth investor', value: 3},
        {text: 'Fiat investor ', value: 4},
      ],
      tokensAmount: '',
      ethAmount: '',
      treatyText: ''
    }
  },
  beforeCreate() {
    console.log('registerWeb3 Action dispatched');
    this.$store.dispatch('registerWeb3');
    console.log('dispatching getContractInstance');
    this.$store.dispatch('getContractInstance');
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
      // if (this.selectedType === 1 || this.selectedType === 2) {
      //
      // }
      // this.selectedType = 0;
      this.tokensAmount = '';
      this.ethAmount = '';
      this.treatyText = '';
    }
  }
}
</script>
