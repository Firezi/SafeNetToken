var fs = require('fs');
eval(fs.readFileSync('../deploy-config.js')+'');

var SafeNetToken = artifacts.require("./SafeNetToken.sol");
var Treaties = artifacts.require("./Treaties.sol");

module.exports = function (deployer) {
	var token;
	var treaties;
	deployer.deploy(SafeNetToken, '1000000000000000000000000')
		.then( () => SafeNetToken.deployed() )
		.then(function (_token) {
			token = _token;
			return deployer.deploy(Treaties, wallet, token.address);
		});
};