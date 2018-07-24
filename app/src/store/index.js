import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import getContract from '../util/getContract'
import getRequestsList from '../util/getRequestsList'

Vue.use(Vuex);
export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance (state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload);
      let result = payload;
      let web3Copy = state.web3;
      web3Copy.coinbase = result.coinbase;
      web3Copy.balance = parseInt(result.balance, 10);
      web3Copy.web3Instance = result.web3;
      state.web3 = web3Copy;
    },
    registerContractInstance (state, payload) {
      console.log('Treaty contract instance: ', payload);
      state.contractInstance = () => payload;
    },
    registerRequestsList (state, payload) {
      console.log('Requests list: ', payload);
      state.requestsList = () => payload;
    }
  },
  actions: {
    registerWeb3 ({commit}) {
      getWeb3.then(result => {
        commit('registerWeb3Instance', result);
      }).catch(e => {
        console.log('error in action registerWeb3', e);
      })
    },
    getContractInstance ({commit}) {
      getContract.then(result => {
        commit('registerContractInstance', result);
      }).catch(e => {
        console.log(e);
      });
    },
    getRequestsList ({commit}) {
      getRequestsList.then(result => {
        commit('registerRequestsList', result);
      }).catch(e => {
        console.log(e);
      });
    }
  }
});
