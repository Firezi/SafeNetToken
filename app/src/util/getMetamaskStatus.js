let getMetamaskStatus = new Promise(function (resolve, reject) {
  let web3js = window.web3;
  if (web3js !== undefined) {
    console.log('TruE');
    resolve(true);
  } else {
    console.log('FalsE');
    resolve(false);
  }
});

export default getMetamaskStatus
