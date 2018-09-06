let getMetamaskStatus = new Promise(function (resolve, reject) {
  let web3js = window.web3;
  if (web3js !== undefined) {
    resolve(true);
  } else {
    resolve(false);
  }
});

export default getMetamaskStatus
