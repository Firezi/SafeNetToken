import getContract from './getContract'


let getRequestConfirmStatus = function(address, requestId) {
  return new Promise(function(resolve, reject) {
    getContract.then((result) => {
      result.methods.checkOwner(address).call().then(isOwner => {
        result = Object.assign({}, result, {isOwner});
        resolve(result);
      })
    })
  })
    .then((result) => {
      return new Promise(function(resolve, reject) {
        result.methods.checkRequestConfirmedBy(requestId, address).call().then(isConfirmedByUser => {
          resolve({isOwner: result.isOwner, isConfirmedByUser});
        })
      })
    })
    .catch(e => {
      console.log(e);
    })
};


export default getRequestConfirmStatus;
