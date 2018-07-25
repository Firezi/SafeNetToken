import getContract from './getContract'


let getRequest = function(requestId) {
  return new Promise(function(resolve, reject) {
    getContract.then((result) => {
      result.methods.requests(requestId).call().then(request => {
        result = Object.assign({}, result, {request});
        resolve(result);
      })
    })
  })
    .then((result) => {
      return new Promise(function(resolve, reject) {
        result.methods.getRequestConfirmation(requestId).call().then(confirmations => {
          let request = Object.assign({}, result.request, confirmations);
          resolve(request);
        })
      })
    })
    .catch(e => {
      console.log(e);
    })
};


export default getRequest;
