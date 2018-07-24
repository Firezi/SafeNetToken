import getContract from './getContract'


let getRequestsList = new Promise(function(resolve, reject) {
  getContract.then(result => {
    result.methods.requestsCount().call().then((len) => {
      let promisesList = [];
      for (let i = 0; i < len; i++) {
        promisesList[i] = result.methods.requests(i).call();
      }
      Promise.all(promisesList).then((requestsList) => {
        resolve(requestsList);
      })
    })
  })
}).catch(e => {
  console.log(e);
});

export default getRequestsList;
