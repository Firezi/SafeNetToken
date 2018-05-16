pragma solidity ^0.4.21;

import "./MintableToken.sol";

contract SafeNetToken is MintableToken {
	string public name = 'SafeNet Token';
	string public symbol = 'SNT';
	uint8 public decimals = 18; 

	function SafeNetToken(uint _totalSupply) public {
		owner = msg.sender;
		totalSupply = _totalSupply;
	}
}