pragma solidity ^0.4.21;

import "./SafeMath.sol";
import "./StandardToken.sol";

contract MintableToken is StandardToken {
	address public owner;

	bool public isMinted = false;

	function mint(address _to) public {
		assert(msg.sender == owner && !isMinted);

		balances[_to] = totalSupply;
		isMinted = true;
	}
}