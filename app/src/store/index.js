import Vue from 'vue'
import Vuex from 'vuex'
import getUser from '../util/getUser'
import getRequestsList from '../util/getRequestsList'
import getRequest from '../util/getRequest'
import getTreatiesContract from "../util/getTreatiesContract";


Vue.use(Vuex);
export const store = new Vuex.Store({
  strict: true,
  state: {
    treatiesContract: null,
    user: {
      // address: null,
      // group: null,
      // balance: null
    },
    requestsList: null,
    request: {},
  },
  mutations: {
    registerUser (state, payload) {
      console.log('Register user:', payload);
      state.user = payload;
    },
    registerRequestsList (state, payload) {
      console.log('Requests list: ', payload);
      state.requestsList = payload;
    },
    registerRequest (state, payload) {
      console.log('Request: ', payload);
      state.request = payload;
    },
    registerTreatiesContract (state, payload) {
      console.log('Treaties instance: ', payload);
      state.treatiesContract = () => payload;
    }
  },
  actions: {
    getUser ({commit}) {
      return new Promise(function (resolve, reject) {
        getUser.then(result => {
          commit('registerUser', result);
          resolve(result);
        })
      })
    },
    getRequestsList ({commit}, payload) {
      return new Promise(function (resolve, reject) {
        getRequestsList.then(result => {
          if (payload) {
            result = result.filter(request => {
              return request.beneficiary.toLowerCase() === payload.toLowerCase();
            })
          }
          commit('registerRequestsList', result);
          resolve(result);
        })
      })
    },
    getRequest ({commit}, payload) {
      return new Promise(function (resolve, reject) {
        getRequest(payload).then(result => {
          commit('registerRequest', result);
          resolve(result);
        })
      })
    },
    getTreatiesContract ({commit}) {
      return new Promise(function (resolve, reject) {
        getTreatiesContract.then(result => {
          commit('registerTreatiesContract', result);
          resolve(result);
        })
      })
    }
  }
});
