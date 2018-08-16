import Web3 from 'web3'
import getTreatiesContract from './getTreatiesContract'
import getTokenContract from './getTokenContract'


let getUser = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider);
  web3.eth.getCoinbase((err, coinbase) => {
    if (err) {
      reject(new Error('Unable to retrieve coinbase'));
    } else {
      resolve({address: coinbase});
    }
  })
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      getTreatiesContract.then(instance => {
        instance.methods.getGroup(result.address).call().then(group => {
          result = Object.assign({}, result, {group});
          resolve(result);
        })
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      getTokenContract.then(instance => {
        instance.methods.balanceOf(result.address).call().then(balance => {
          result = Object.assign({}, result, {balance});
          resolve(result);
        })
      })
    })
  }).catch(e => {
    console.log('Error in get user:', e);
  });


export default getUser
