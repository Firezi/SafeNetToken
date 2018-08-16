import Web3 from 'web3'
import {treatiesAddress, treatiesAbi} from '../../contractsDetails'


let getTreatiesContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider);
  let treatyContract = new web3.eth.Contract(treatiesAbi, treatiesAddress);
  resolve(treatyContract);
});

export default getTreatiesContract
