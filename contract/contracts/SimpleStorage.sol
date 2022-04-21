// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

contract SimpleStorage {
   
   event newValue(uint num, address sender);
   uint storageVar;
   
   function set(uint x) public{
       storageVar = x;
       emit newValue(x, msg.sender);
   }

   function get() public view returns (uint){
       return storageVar;
   }
}