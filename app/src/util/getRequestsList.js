import getTreatiesContract from './getTreatiesContract'


let getRequestsList = new Promise(function(resolve, reject) {
  getTreatiesContract.then(result => {
    result.methods.requestsCount().call().then(len => {
      let promisesList = [];
      for (let i = 0; i < len; i++) {
        promisesList[i] = result.methods.requests(i).call();
      }
      Promise.all(promisesList).then(requestsList => {
        resolve(requestsList);
      })
    })
  })
}).catch(e => {
  console.log('Error in get request list:', e);
});

export default getRequestsList;
