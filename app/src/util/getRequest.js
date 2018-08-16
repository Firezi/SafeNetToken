import getTreatiesContract from './getTreatiesContract'
import getUser from './getUser'


let getRequest = function(requestId) {
  return new Promise(function(resolve, reject) {
    getTreatiesContract.then(result => {
      result.methods.requests(requestId).call().then(request => {
        result = Object.assign({}, result, {request});
        resolve(result);
      })
    })
  })
    .then(result => {
      return new Promise(function(resolve, reject) {
        result.methods.getRequestConfirmation(requestId).call().then(confirmations => {
          result = Object.assign({}, result, {confirmations});
          resolve(result);
        })
      })
    })
    .then(result => {
      return new Promise(function(resolve, reject) {
        getUser.then(user => {
          result = Object.assign({}, result, {user});
          resolve(result);
        })
      })
    })
    .then(result => {
      return new Promise(function(resolve, reject) {
        result.methods.checkRequestConfirmedBy(requestId, result.user.address).call().then(isConfirmedByUser => {
          result = Object.assign({}, result.request, result.confirmations, result.user, {isConfirmedByUser});
          resolve(result);
        })
      })
    })
    .catch(e => {
      console.log('Error in get request:', e);
    })
};


export default getRequest;
