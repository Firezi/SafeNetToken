import Web3 from 'web3'
import {address, abi} from '../../contractDetails'
let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider);
  let treatyContract = new web3.eth.Contract(abi, address);
  resolve(treatyContract);
});

export default getContract
