pragma solidity ^0.4.21;

import "./SafeMath.sol";
import "./SafeNetToken.sol";

contract Treaties {
    using SafeMath for uint;

    SafeNetToken public token; 

    address public creator;
    bool public creatorInited = false;

    address public wallet;

    address[] public owners;
    address[] public companies;
    address[] public holders;

    mapping (address => bool) inList;

    uint public tokensInUse = 0;

    mapping (address => uint) refunds;

    struct Request {
        uint8 rType; // 0 - owner, 1 - company, 2 - holder
        address beneficiary;
        string treatyHash;
        uint tokensAmount;
        uint ethAmount;

        uint8 isConfirmed; // 0 - pending, 1 - declined, 2 - accepted;
        address[] onwersConfirm;
    }

    Request[] public requests;

    modifier onlyOwner() {
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                _;
            }
        }
    }   

    event NewRequest(uint8 rType, address beneficiary, string treatyHash, uint tokensAmount, uint id);


    function Treaties(address _wallet, SafeNetToken _token) public {
        creator = msg.sender;
        token = _token;
        wallet = _wallet;
    }

    function() external payable {
        splitProfit(msg.value);
    }

    // after mint
    function initCreator(uint _tokensAmount) public {
        assert(msg.sender == creator && !creatorInited);

        owners.push(creator);
        assert(token.transfer(creator, _tokensAmount));
        tokensInUse += _tokensAmount;
        inList[creator] = true;
        creatorInited = true;
    }


    function createTreatyRequest(uint8 _rType, string _treatyHash, uint _tokensAmount) public {
        require(_rType <= 1);

        requests.push(Request({
            rType: _rType,
            beneficiary: msg.sender,
            treatyHash: _treatyHash,
            tokensAmount: _tokensAmount,
            ethAmount: 0,
            isConfirmed: 0,
            onwersConfirm: new address[](0)
            }));

        emit NewRequest(_rType, msg.sender, _treatyHash, _tokensAmount, requests.length - 1);
    }

    function createHolderRequest(uint _tokensAmount) public payable {
        assert(msg.value > 0);

        requests.push(Request({
            rType: 2,
            beneficiary: msg.sender,
            treatyHash: '',
            tokensAmount: _tokensAmount,
            ethAmount: msg.value,
            isConfirmed: 0,
            onwersConfirm: new address[](0)
            }));
    }

    function removeHolderRequest(uint id) public {
        require(id < requests.length);
        assert(requests[id].isConfirmed == 0 && requests[id].rType == 2);
        assert(requests[id].beneficiary == msg.sender);

        requests[id].isConfirmed = 1;
        assert(msg.sender.send(requests[id].ethAmount));
    }


    function confirmRequest(uint id) public onlyOwner {
        require(id < requests.length);
        assert(requests[id].isConfirmed == 0);

        uint tokensConfirmed = 0;
        for (uint i = 0; i < requests[id].onwersConfirm.length; i++) {
            assert(requests[id].onwersConfirm[i] != msg.sender);
            tokensConfirmed += token.balanceOf(requests[id].onwersConfirm[i]);
        }

        requests[id].onwersConfirm.push(msg.sender);
        tokensConfirmed += token.balanceOf(msg.sender);

        uint tokensInOwners = 0;
        for (i = 0; i < owners.length; i++) {
            tokensInOwners += token.balanceOf(owners[i]);
        }

        if (tokensConfirmed > tokensInOwners * 100 / 75) {
            if (!inList[requests[id].beneficiary]) {
                if (requests[id].rType == 0) {
                    owners.push(requests[id].beneficiary);
                }
                if (requests[id].rType == 1) {
                    companies.push(requests[id].beneficiary);
                }
                if (requests[id].rType == 2) {
                    holders.push(requests[id].beneficiary);
                }
                inList[requests[id].beneficiary] = true;
            }

            if (requests[id].rType == 2) {
                assert(wallet.send(requests[id].ethAmount));
            }
            
            token.transfer(requests[id].beneficiary, requests[id].tokensAmount);
            tokensInUse += requests[id].tokensAmount;
            requests[id].isConfirmed = 2;
        }
    }

    function rejectRequest(uint id) public onlyOwner {
        require(id < requests.length);
        assert(requests[id].isConfirmed == 0);

        for (uint i = 0; i < requests[id].onwersConfirm.length; i++) {
            if (requests[id].onwersConfirm[i] == msg.sender) {
                requests[id].onwersConfirm[i] = requests[id].onwersConfirm[requests[id].onwersConfirm.length - 1];
                requests[id].onwersConfirm.length--;
                break;
            }
        }
    }


    function splitProfit(uint profit) internal {
        uint rest = profit;
        uint refund;
        address addr;
        for (uint i = 0; i < owners.length; i++) {
            addr = owners[i];
            refund = profit.mul(token.balanceOf(addr)).mul(40).div(100).div(tokensInUse);
            refunds[addr] += refund;
            rest -= refund;
        }
        for (i = 0; i < companies.length; i++) {
            addr = companies[i];
            refund = profit.mul(token.balanceOf(addr)).mul(40).div(100).div(tokensInUse);
            refunds[addr] += refund;
            rest -= refund;
        }
        for (i = 0; i < holders.length; i++) {
            addr = holders[i];
            refund = profit.mul(token.balanceOf(addr)).mul(40).div(100).div(tokensInUse);
            refunds[addr] += refund;
            rest -= refund;
        }

        assert(wallet.send(rest));
    }

    function withdrawRefunds() public {
        assert(refunds[msg.sender] > 0);
        uint refund = refunds[msg.sender];
        refunds[msg.sender] = 0;
        assert(msg.sender.send(refund));
    }

}