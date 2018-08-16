import Web3 from 'web3'
import {tokenAddress, tokenAbi} from '../../contractsDetails'


let getTokenContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider);
  let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
  resolve(tokenContract);
});

export default getTokenContract

