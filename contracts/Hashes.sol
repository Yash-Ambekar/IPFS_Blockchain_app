//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Hashes{
    struct file{
        string fileName;
        string Hash;
    }
    file[] internal completeData;

    function addHashes(string memory _filename, string memory _hash) public {
       completeData.push(file(_filename, _hash));
   }

    function retriveHash(string memory _filename) public view returns( string memory){
            
            string memory _hash;
            for(uint i=0; i<completeData.length; i++){
                if(keccak256(abi.encodePacked((completeData[i].fileName))) == keccak256(abi.encodePacked((_filename)))){
                    _hash = completeData[i].Hash;
                }
            }

            return(_hash);
    }
}